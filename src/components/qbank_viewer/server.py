"""
Local web server: browse structured-JSON questions, media, and batch export.

Run from repo root:
  uvicorn qbank_viewer.server:app --reload
"""

from __future__ import annotations

import html
import io
import json
import os
import re
import zipfile
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

REPO_ROOT = Path(__file__).resolve().parent.parent
STATIC_DIR = Path(__file__).resolve().parent / "static"

STRUCTURED_JSON_DIR = Path(
    os.environ.get("STRUCTURED_JSON_DIR", str(REPO_ROOT / "structured-JSON"))
)
ANKI_MEDIA_DIR = Path(
    os.environ.get("ANKI_MEDIA_DIR", str(REPO_ROOT / "anki" / "collection.media"))
)
GENERATED_QUESTIONS_DIR = Path(
    os.environ.get(
        "GENERATED_QUESTIONS_DIR",
        str(REPO_ROOT / "generated-questions"),
    )
)

# Bare AnKing-style media filenames (hash.ext)
ANKI_FILENAME_RE = re.compile(
    r"^[a-zA-Z0-9_.-]+\.(?:webp|jpg|jpeg|png|gif|svg|mp3|ogg|wav|webm)$"
)
IMG_SRC_RE = re.compile(
    r"""<img[^>]+src\s*=\s*(["'])([^"']+)\1""",
    re.IGNORECASE,
)

UPLOAD_MEDIA_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
MAX_UPLOAD_MEDIA_BYTES = 15 * 1024 * 1024

_manifest_cache: list[dict[str, Any]] | None = None
_generated_manifest_cache: list[dict[str, Any]] | None = None


def _sanitize_user_upload_filename(raw: str | None) -> str:
    if not raw:
        raw = "image.png"
    base = Path(raw).name
    if not base or ".." in base or "/" in base or "\\" in base:
        raise HTTPException(400, "Invalid filename")
    p = Path(base)
    suf = p.suffix.lower()
    if suf not in UPLOAD_MEDIA_SUFFIXES:
        raise HTTPException(400, "Use png, jpg, jpeg, webp, or gif")
    stem = re.sub(r"[^\w.-]+", "_", p.stem).strip("._") or "upload"
    stem = stem[:80]
    return f"{stem}{suf}"


def _safe_uworld_path(qid: str, rel_path: str) -> Path:
    if ".." in rel_path or rel_path.startswith("/"):
        raise HTTPException(400, "Invalid path")
    base = (STRUCTURED_JSON_DIR / qid).resolve()
    if not str(base).startswith(str(STRUCTURED_JSON_DIR.resolve())):
        raise HTTPException(400, "Invalid qid")
    full = (base / rel_path).resolve()
    try:
        full.relative_to(base)
    except ValueError:
        raise HTTPException(400, "Path escapes question directory")
    return full


def _safe_anking_filename(name: str) -> None:
    if not name or not ANKI_FILENAME_RE.match(name):
        raise HTTPException(400, "Invalid media filename")
    if ".." in name or "/" in name or "\\" in name:
        raise HTTPException(400, "Invalid media filename")


def _collect_anking_filenames_from_html(html: str) -> set[str]:
    out: set[str] = set()
    if not html:
        return out
    for m in IMG_SRC_RE.finditer(html):
        src = m.group(2).strip()
        # bare filename only (AnKing); skip URLs and relative UWorld paths
        if "/" in src or "\\" in src or src.startswith("data:"):
            continue
        if ANKI_FILENAME_RE.match(src):
            out.add(src)
    return out


def _collect_anking_filenames_from_question(data: dict[str, Any]) -> set[str]:
    names: set[str] = set()
    for card in data.get("anki_cards") or []:
        names |= _collect_anking_filenames_from_html(card.get("fact_html") or "")
        names |= _collect_anking_filenames_from_html(card.get("extra_html") or "")
    return names


def scan_manifest() -> list[dict[str, Any]]:
    global _manifest_cache
    if _manifest_cache is not None:
        return _manifest_cache

    rows: list[dict[str, Any]] = []
    if not STRUCTURED_JSON_DIR.is_dir():
        _manifest_cache = []
        return _manifest_cache

    for child in sorted(STRUCTURED_JSON_DIR.iterdir(), key=lambda p: p.name):
        if not child.is_dir():
            continue
        jp = child / "question.json"
        if not jp.is_file():
            continue
        try:
            with open(jp, encoding="utf-8") as f:
                data = json.load(f)
        except (OSError, json.JSONDecodeError):
            continue
        qid = str(data.get("question_id") or child.name)
        rows.append(
            {
                "question_id": qid,
                "subject": data.get("subject") or "",
                "system": data.get("system") or "",
                "topic": data.get("topic") or "",
                "outcome": data.get("outcome") or "",
                "pct_answered_correctly": data.get("pct_answered_correctly"),
                "source_file": data.get("source_file") or "",
            }
        )

    _manifest_cache = rows
    return rows


def invalidate_manifest_cache() -> None:
    global _manifest_cache
    _manifest_cache = None


def _generated_paths() -> tuple[Path, Path, Path]:
    root = GENERATED_QUESTIONS_DIR.resolve()
    examples_dir = (GENERATED_QUESTIONS_DIR / "examples").resolve()
    registry = (GENERATED_QUESTIONS_DIR / "viewer-registry.json").resolve()
    return root, examples_dir, registry


# Root-level JSON files that are not NBME-style question stems
_ROOT_QUESTION_JSON_DENYLIST = frozenset(
    {
        "index.json",
        "schema.json",
        "eval-schema.json",
        "viewer-registry.json",
    }
)


def _looks_like_generated_question(data: dict[str, Any]) -> bool:
    if not isinstance(data, dict):
        return False
    qidf = data.get("question_id")
    if qidf is not None and str(qidf).strip():
        return True
    if data.get("answer_choices"):
        return True
    opts = data.get("options")
    if isinstance(opts, dict) and opts:
        return True
    if data.get("stem") or data.get("question_text") or data.get("question_html"):
        return True
    return False


def _discover_generated_question_jsons() -> list[tuple[str, str]]:
    """Scan disk for question JSONs: examples/*.json then root *.json.

    Returns [(relative_path, qid), ...] unique by qid. If the same qid exists in
    both ``examples/`` and root, the ``examples/`` path wins.
    """
    root, examples_dir, _ = _generated_paths()
    by_qid: dict[str, str] = {}

    if examples_dir.is_dir():
        for jp in sorted(examples_dir.glob("*.json"), key=lambda p: p.name.lower()):
            raw = _read_json_file(jp)
            if not raw or not _looks_like_generated_question(raw):
                continue
            qid = str(raw.get("question_id") or jp.stem).strip()
            if not qid or not _generated_qid_ok(qid):
                continue
            by_qid[qid] = f"examples/{jp.name}"

    if root.is_dir():
        for jp in sorted(root.glob("*.json"), key=lambda p: p.name.lower()):
            name = jp.name
            if name.startswith("eval-"):
                continue
            if name in _ROOT_QUESTION_JSON_DENYLIST:
                continue
            raw = _read_json_file(jp)
            if not raw or not _looks_like_generated_question(raw):
                continue
            qid = str(raw.get("question_id") or jp.stem).strip()
            if not qid or not _generated_qid_ok(qid):
                continue
            if qid in by_qid:
                continue
            by_qid[qid] = name

    out = [(rel, qid) for qid, rel in by_qid.items()]
    out.sort(key=lambda t: (t[1].lower(), t[0].lower()))
    return out


def invalidate_generated_manifest_cache() -> None:
    global _generated_manifest_cache
    _generated_manifest_cache = None


def _generated_qid_ok(qid: str) -> bool:
    return bool(qid) and bool(re.match(r"^[a-zA-Z0-9_.-]+$", qid))


def _safe_generated_rel(rel: str) -> Path:
    base = GENERATED_QUESTIONS_DIR.resolve()
    if not rel or ".." in rel or rel.startswith(("/", "\\")):
        raise HTTPException(400, "Invalid path")
    full = (GENERATED_QUESTIONS_DIR / rel).resolve()
    try:
        full.relative_to(base)
    except ValueError:
        raise HTTPException(400, "Path escapes generated-questions directory")
    return full


def _registry_entry_key(entry: dict[str, Any]) -> str | None:
    qid = entry.get("question_id")
    if qid:
        return str(qid)
    ef = entry.get("example_file")
    if isinstance(ef, str) and ef.strip():
        stem = Path(ef.strip()).stem
        return stem or None
    return None


def _ensure_registry_defaults_for_examples(data: dict[str, Any]) -> None:
    root, _, _ = _generated_paths()
    if "questions" not in data or not isinstance(data["questions"], list):
        data["questions"] = []

    questions: list[dict[str, Any]] = data["questions"]
    by_qid: dict[str, dict[str, Any]] = {}
    for e in questions:
        if not isinstance(e, dict):
            continue
        k = _registry_entry_key(e)
        if k:
            if "question_id" not in e or not e["question_id"]:
                e["question_id"] = k
            by_qid[k] = e

    max_order = 0
    for e in questions:
        if not isinstance(e, dict):
            continue
        try:
            max_order = max(max_order, int(e.get("sort_order") or 0))
        except (TypeError, ValueError):
            pass

    for example_rel, qid in _discover_generated_question_jsons():
        eval_name = f"eval-{qid}.json"
        eval_rel = eval_name if (root / eval_name).is_file() else None

        if qid in by_qid:
            e = by_qid[qid]
            e["example_file"] = example_rel
            if eval_rel and not e.get("eval_file"):
                e["eval_file"] = eval_rel
            e.setdefault("hidden", False)
            e.setdefault("quiz_outcome", None)
            e.setdefault("quiz_selected_letter", None)
            if "tags" not in e or not isinstance(e.get("tags"), list):
                e["tags"] = []
            e.setdefault("notes", "")
            continue

        max_order += 1
        entry: dict[str, Any] = {
            "question_id": qid,
            "example_file": example_rel,
            "eval_file": eval_rel,
            "sort_order": max_order,
            "hidden": False,
            "quiz_outcome": None,
            "quiz_selected_letter": None,
            "tags": [],
            "notes": "",
        }
        questions.append(entry)
        by_qid[qid] = entry


def load_merged_viewer_registry() -> dict[str, Any]:
    _, _, reg_path = _generated_paths()
    if reg_path.is_file():
        try:
            with open(reg_path, encoding="utf-8") as f:
                data = json.load(f)
        except (OSError, json.JSONDecodeError):
            data = {}
    else:
        data = {}
    if not isinstance(data, dict):
        data = {}
    data.setdefault("version", 1)
    _ensure_registry_defaults_for_examples(data)
    return data


def _save_viewer_registry(data: dict[str, Any]) -> None:
    _, _, reg_path = _generated_paths()
    reg_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        with open(reg_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError as e:
        raise HTTPException(500, f"Failed to save viewer-registry.json: {e}") from e
    invalidate_generated_manifest_cache()


def _read_json_file(path: Path) -> dict[str, Any] | None:
    if not path.is_file():
        return None
    for enc in ("utf-8", "utf-8-sig", "cp1252"):
        try:
            with open(path, encoding=enc) as f:
                data = json.load(f)
            return data if isinstance(data, dict) else None
        except (UnicodeDecodeError, json.JSONDecodeError):
            continue
    return None


def _eval_totals(eval_data: dict[str, Any] | None) -> tuple[int | None, int | None]:
    if not eval_data or not isinstance(eval_data, dict):
        return None, None
    ts = eval_data.get("total_score")
    tm = eval_data.get("total_max")
    try:
        return (int(ts) if ts is not None else None, int(tm) if tm is not None else None)
    except (TypeError, ValueError):
        return None, None


def _eval_report_summary(eval_data: dict[str, Any] | None) -> dict[str, Any] | None:
    if not eval_data or not isinstance(eval_data, dict):
        return None
    ts, tm = _eval_totals(eval_data)
    return {
        "eval_id": eval_data.get("eval_id"),
        "question_id": eval_data.get("question_id"),
        "total_score": ts,
        "total_max": tm,
        "tier": eval_data.get("tier"),
        "evaluated_date": eval_data.get("evaluated_date"),
        "summary_line": (
            f"Eval score: {ts}/{tm}" if ts is not None and tm is not None else "Eval report"
        ),
    }


def scan_generated_manifest() -> list[dict[str, Any]]:
    global _generated_manifest_cache
    if _generated_manifest_cache is not None:
        return _generated_manifest_cache

    merged = load_merged_viewer_registry()
    root, _, _ = _generated_paths()
    rows: list[dict[str, Any]] = []

    discovered = _discover_generated_question_jsons()
    hydrated: list[tuple[int, str, dict[str, Any], str, dict[str, Any]]] = []

    for ex_rel, qid in discovered:
        entry = _find_registry_question(merged, qid) or {}
        if entry.get("hidden"):
            continue
        try:
            ex_path = _safe_generated_rel(ex_rel)
        except HTTPException:
            continue
        if not ex_path.is_file():
            continue
        raw = _read_json_file(ex_path)
        if not raw:
            continue

        sort_order = 0
        try:
            sort_order = int(entry.get("sort_order") or 0)
        except (TypeError, ValueError):
            pass
        hydrated.append((sort_order, qid, entry, ex_rel, raw))

    hydrated.sort(key=lambda t: (t[0], t[1].lower()))

    for _so, qid, entry, ex_rel, raw in hydrated:
        concepts = raw.get("source_concepts") or []
        subject = ""
        if isinstance(concepts, list) and concepts:
            subject = str(concepts[0])
        eval_data: dict[str, Any] | None = None
        ev_rel = entry.get("eval_file")
        if not ev_rel:
            ename = f"eval-{qid}.json"
            if (root / ename).is_file():
                ev_rel = ename
        if ev_rel:
            try:
                ev_path = _safe_generated_rel(str(ev_rel))
                eval_data = _read_json_file(ev_path)
            except HTTPException:
                eval_data = None
        if not isinstance(eval_data, dict):
            eval_data = None

        ts, tm = _eval_totals(eval_data)
        oc = entry.get("quiz_outcome")
        outcome_str = ""
        if oc is not None:
            o = str(oc).strip()
            if o.lower() in ("correct", "incorrect"):
                outcome_str = "Correct" if o.lower() == "correct" else "Incorrect"

        try:
            row_sort = int(entry.get("sort_order") or 0)
        except (TypeError, ValueError):
            row_sort = 0

        eval_file_out = str(ev_rel) if ev_rel else None

        rows.append(
            {
                "question_id": qid,
                "bank": "generated",
                "subject": subject,
                "system": raw.get("system") or "",
                "topic": raw.get("topic") or "",
                "subtopic": raw.get("subtopic") or "",
                "difficulty": raw.get("difficulty") or "",
                "question_type": raw.get("question_type") or "",
                "review_status": raw.get("review_status") or "",
                "outcome": outcome_str,
                "pct_answered_correctly": None,
                "source_file": str(ex_rel),
                "eval_file": eval_file_out,
                "eval_total_score": ts,
                "eval_total_max": tm,
                "sort_order": row_sort,
                "registry_tags": list(entry.get("tags") or [])
                if isinstance(entry.get("tags"), list)
                else [],
                "registry_notes": str(entry.get("notes") or ""),
            }
        )

    _generated_manifest_cache = rows
    return rows


def _find_registry_question(
    data: dict[str, Any], qid: str
) -> dict[str, Any] | None:
    for e in data.get("questions") or []:
        if isinstance(e, dict) and str(e.get("question_id")) == qid:
            return e
    return None


def _get_or_create_registry_question(data: dict[str, Any], qid: str) -> dict[str, Any]:
    """Return registry row for qid, appending a minimal entry if on disk but not in file."""
    e = _find_registry_question(data, qid)
    if e is not None:
        return e
    disc = _discover_generated_question_jsons()
    rel = None
    for r, q in disc:
        if q == qid:
            rel = r
            break
    if rel is None:
        raise HTTPException(404, "Question not found")
    root, _, _ = _generated_paths()
    ename = f"eval-{qid}.json"
    eval_rel = ename if (root / ename).is_file() else None
    max_order = 0
    for x in data.get("questions") or []:
        if isinstance(x, dict):
            try:
                max_order = max(max_order, int(x.get("sort_order") or 0))
            except (TypeError, ValueError):
                pass
    max_order += 1
    e = {
        "question_id": qid,
        "example_file": rel,
        "eval_file": eval_rel,
        "sort_order": max_order,
        "hidden": False,
        "quiz_outcome": None,
        "quiz_selected_letter": None,
        "tags": [],
        "notes": "",
    }
    data.setdefault("questions", [])
    data["questions"].append(e)
    return e


def _load_generated_bundle(qid: str) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any] | None]:
    if not _generated_qid_ok(qid):
        raise HTTPException(400, "Invalid question id")
    merged = load_merged_viewer_registry()
    entry = _find_registry_question(merged, qid)
    if entry is None:
        root, _, _ = _generated_paths()
        disc = _discover_generated_question_jsons()
        rel = None
        for r, q in disc:
            if q == qid:
                rel = r
                break
        if rel is None:
            raise HTTPException(404, "Question not found")
        ename = f"eval-{qid}.json"
        entry = {
            "question_id": qid,
            "example_file": rel,
            "eval_file": ename if (root / ename).is_file() else None,
            "quiz_outcome": None,
            "quiz_selected_letter": None,
        }
    ex_rel = entry.get("example_file") or f"examples/{qid}.json"
    try:
        ex_path = _safe_generated_rel(str(ex_rel))
    except HTTPException as err:
        raise HTTPException(404, "Example file not found") from err
    if not ex_path.is_file():
        found = False
        for r, q in _discover_generated_question_jsons():
            if q != qid:
                continue
            try:
                cand = _safe_generated_rel(r)
            except HTTPException:
                continue
            if cand.is_file():
                ex_path = cand
                entry["example_file"] = r
                found = True
                break
        if not found:
            raise HTTPException(404, "Example file not found")
    raw = _read_json_file(ex_path)
    if not raw:
        raise HTTPException(500, "Invalid example JSON")

    eval_data: dict[str, Any] | None = None
    ev_rel = entry.get("eval_file")
    if not ev_rel:
        root, _, _ = _generated_paths()
        ename = f"eval-{qid}.json"
        if (root / ename).is_file():
            ev_rel = ename
    if ev_rel:
        try:
            ev_path = _safe_generated_rel(str(ev_rel))
            eval_data = _read_json_file(ev_path)
        except HTTPException:
            eval_data = None
    if not isinstance(eval_data, dict):
        eval_data = None

    return raw, entry, eval_data


def _esc_para(text: str) -> str:
    s = (text or "").strip()
    if not s:
        return ""
    parts = [p.strip() for p in s.split("\n\n") if p.strip()]
    if not parts:
        return f"<p>{html.escape(s)}</p>"
    return "".join(f"<p>{html.escape(p)}</p>" for p in parts)


def normalize_generated_question(qid: str) -> dict[str, Any]:
    raw, reg, eval_data = _load_generated_bundle(qid)
    stem = raw.get("stem") or ""
    lead = raw.get("lead_in") or ""
    stem_block = f'<div class="nbme-stem">{_esc_para(stem)}</div>' if stem else ""
    lead_block = f'<p class="nbme-lead-in"><strong>{html.escape(lead)}</strong></p>' if lead else ""
    question_html = stem_block + lead_block

    correct = str(raw.get("correct_answer") or "").strip().upper()[:4]
    opts = raw.get("options") or {}
    selected = reg.get("quiz_selected_letter")
    sel_let = str(selected).strip().upper()[:4] if selected else ""

    answer_choices: list[dict[str, Any]] = []
    if isinstance(opts, dict):
        letters = sorted(opts.keys(), key=lambda x: str(x).upper())
        for letter in letters:
            let_u = str(letter).strip().upper()[:4]
            txt = opts.get(letter)
            answer_choices.append(
                {
                    "letter": let_u,
                    "text": str(txt) if txt is not None else "",
                    "is_correct": bool(let_u and let_u == correct),
                    "is_selected": bool(sel_let and let_u == sel_let),
                }
            )

    expl = raw.get("explanation") or ""
    explanation_html = _esc_para(str(expl)) if expl else ""

    oc = reg.get("quiz_outcome")
    outcome_val = None
    if oc is not None:
        lo = str(oc).strip().lower()
        if lo == "correct":
            outcome_val = "Correct"
        elif lo == "incorrect":
            outcome_val = "Incorrect"

    concepts = raw.get("source_concepts") or []
    subject_first = ""
    if isinstance(concepts, list) and concepts:
        subject_first = str(concepts[0])

    return {
        "question_id": qid,
        "question_html": question_html,
        "question_text": f"{stem}\n\n{lead}".strip(),
        "answer_choices": answer_choices,
        "explanation_html": explanation_html,
        "explanation": expl,
        "outcome": outcome_val or "",
        "subject": subject_first,
        "system": raw.get("system") or "",
        "topic": raw.get("topic") or "",
        "bank": "generated",
        "_generated_meta": {
            "generated_date": raw.get("generated_date"),
            "source_concepts": concepts if isinstance(concepts, list) else [],
            "source_uworld": raw.get("source_uworld"),
            "subtopic": raw.get("subtopic"),
            "difficulty": raw.get("difficulty"),
            "question_type": raw.get("question_type"),
            "review_status": raw.get("review_status"),
            "tags": raw.get("tags") if isinstance(raw.get("tags"), list) else [],
        },
        "_eval_report": _eval_report_summary(eval_data),
        "_teaching_point": raw.get("teaching_point"),
        "_distractor_rationale": raw.get("distractor_rationale")
        if isinstance(raw.get("distractor_rationale"), dict)
        else None,
    }


app = FastAPI(title="Qbank JSON Viewer")


class ExportBody(BaseModel):
    qids: list[str] = Field(..., min_length=1)


class OutcomePatchBody(BaseModel):
    """Persist quiz result to question.json (outcome + which choice was selected)."""

    outcome: str = Field(..., min_length=1)
    selected_letter: str | None = Field(
        default=None,
        description="Letter of the option the user chose (e.g. A, B)",
    )


class QuestionImagesBody(BaseModel):
    """Add or remove an entry in question_images (vignette-linked media)."""

    link: str | None = Field(
        default=None,
        description="Relative UWorld path (e.g. images/foo.png) or anking:filename.webp",
    )
    unlink: str | None = Field(
        default=None,
        description="Same format as stored in question_images to remove",
    )


class GeneratedQuizPatchBody(BaseModel):
    outcome: str = Field(..., min_length=1)
    selected_letter: str | None = None


class GeneratedRegistryPatchBody(BaseModel):
    tags: list[str] | None = None
    notes: str | None = None
    hidden: bool | None = None
    sort_order: int | None = None
    eval_file: str | None = None


@app.get("/api/manifest")
def api_manifest() -> dict[str, Any]:
    rows = scan_manifest()
    return {"count": len(rows), "questions": rows}


@app.post("/api/manifest/invalidate")
def api_manifest_invalidate() -> dict[str, str]:
    invalidate_manifest_cache()
    return {"status": "ok"}


@app.get("/api/generated/manifest")
def api_generated_manifest() -> dict[str, Any]:
    rows = scan_generated_manifest()
    return {"count": len(rows), "questions": rows}


@app.post("/api/generated/manifest/invalidate")
def api_generated_manifest_invalidate() -> dict[str, str]:
    invalidate_generated_manifest_cache()
    return {"status": "ok"}


@app.get("/api/generated/concepts")
def api_generated_concepts() -> dict[str, Any]:
    """Concept slugs from generated-questions/index.json for /nbme-gen UI helpers."""
    idx = GENERATED_QUESTIONS_DIR / "index.json"
    if not idx.is_file():
        return {"concepts": [], "next_id": None, "hint": "index.json not found"}
    raw = _read_json_file(idx)
    if not raw:
        return {"concepts": [], "next_id": None, "hint": "Could not parse index.json"}
    concepts: list[dict[str, Any]] = []
    for k, v in raw.items():
        if k.startswith("_"):
            continue
        if isinstance(v, list):
            concepts.append({"slug": k, "question_ids": [str(x) for x in v]})
        else:
            concepts.append({"slug": k, "question_ids": [str(v)]})
    concepts.sort(key=lambda x: str(x.get("slug") or ""))
    return {
        "concepts": concepts,
        "next_id": raw.get("_next_id"),
        "commands": {
            "default": "/nbme-gen",
            "with_concept_tpl": "/nbme-gen concept=<slug>",
            "batch_tpl": "/nbme-gen batch=N",
        },
    }


@app.post("/api/generated/registry/sync")
def api_generated_registry_sync() -> dict[str, Any]:
    merged = load_merged_viewer_registry()
    _save_viewer_registry(merged)
    invalidate_generated_manifest_cache()
    n = len([q for q in (merged.get("questions") or []) if isinstance(q, dict)])
    return {"status": "ok", "registry_questions": n}


@app.get("/api/generated/question/{qid}")
def api_generated_question(qid: str) -> dict[str, Any]:
    return normalize_generated_question(qid)


@app.patch("/api/generated/question/{qid}/quiz")
def api_generated_quiz_patch(qid: str, body: GeneratedQuizPatchBody) -> dict[str, Any]:
    if not _generated_qid_ok(qid):
        raise HTTPException(400, "Invalid question id")
    raw = body.outcome.strip().lower()
    if raw not in ("correct", "incorrect"):
        raise HTTPException(400, "outcome must be 'Correct' or 'Incorrect'")
    canonical = "Correct" if raw == "correct" else "Incorrect"

    data = load_merged_viewer_registry()
    entry = _get_or_create_registry_question(data, qid)

    entry["quiz_outcome"] = canonical
    if body.selected_letter is not None:
        let = body.selected_letter.strip().upper()[:4]
        entry["quiz_selected_letter"] = let if let else None

    _save_viewer_registry(data)
    return {"ok": True, "outcome": canonical}


@app.patch("/api/generated/registry/{qid}")
def api_generated_registry_patch(
    qid: str, body: GeneratedRegistryPatchBody
) -> dict[str, Any]:
    if not _generated_qid_ok(qid):
        raise HTTPException(400, "Invalid question id")
    data = load_merged_viewer_registry()
    entry = _get_or_create_registry_question(data, qid)

    patch = body.model_dump(exclude_unset=True)
    if "eval_file" in patch:
        ev = patch["eval_file"]
        if ev:
            evs = str(ev).strip()
            _safe_generated_rel(evs)
            entry["eval_file"] = evs
        else:
            entry["eval_file"] = None
    if "tags" in patch:
        entry["tags"] = list(patch["tags"] or [])
    if "notes" in patch:
        entry["notes"] = str(patch["notes"] or "")
    if "hidden" in patch and patch["hidden"] is not None:
        entry["hidden"] = bool(patch["hidden"])
    if "sort_order" in patch and patch["sort_order"] is not None:
        entry["sort_order"] = int(patch["sort_order"])

    _save_viewer_registry(data)
    return {"ok": True, "question_id": qid}


def _insight_bucket() -> dict[str, int]:
    return {"count": 0, "correct": 0, "incorrect": 0}


def _insight_add_outcome(bucket: dict[str, int], outcome_raw: Any) -> None:
    bucket["count"] += 1
    o = str(outcome_raw or "").strip().lower()
    if o == "correct":
        bucket["correct"] += 1
    elif o == "incorrect":
        bucket["incorrect"] += 1


def _insight_row_finish(bucket: dict[str, int]) -> dict[str, Any]:
    scored = bucket["correct"] + bucket["incorrect"]
    pct = round(100 * bucket["correct"] / scored, 1) if scored else None
    return {
        "count": bucket["count"],
        "correct": bucket["correct"],
        "incorrect": bucket["incorrect"],
        "scored": scored,
        "accuracy_pct": pct,
    }


@app.get("/api/insights")
def api_insights() -> dict[str, Any]:
    """Aggregate counts + accuracy (among questions with recorded outcome) for dashboard."""
    rows = scan_manifest()
    by_subject: dict[str, dict[str, int]] = {}
    by_system: dict[str, dict[str, int]] = {}
    by_pair: dict[tuple[str, str], dict[str, int]] = {}

    def sub_bucket(d: dict[Any, dict[str, int]], key: Any) -> dict[str, int]:
        if key not in d:
            d[key] = _insight_bucket()
        return d[key]

    for r in rows:
        sub = (r.get("subject") or "").strip() or "(no subject)"
        sys_ = (r.get("system") or "").strip() or "(no system)"
        top = (r.get("topic") or "").strip() or "(no topic)"
        oc = r.get("outcome")
        _insight_add_outcome(sub_bucket(by_subject, sub), oc)
        _insight_add_outcome(sub_bucket(by_system, sys_), oc)
        _insight_add_outcome(sub_bucket(by_pair, (sub, top)), oc)

    def top_by_count_items(d: dict[Any, dict[str, int]], n: int) -> list[tuple[Any, dict[str, int]]]:
        return sorted(d.items(), key=lambda kv: -kv[1]["count"])[:n]

    top_subjects = [
        {"subject": s, **_insight_row_finish(agg)}
        for s, agg in top_by_count_items(by_subject, 20)
    ]
    top_systems = [
        {"system": s, **_insight_row_finish(agg)}
        for s, agg in top_by_count_items(by_system, 20)
    ]
    top_subject_topics = [
        {"subject": pair[0], "topic": pair[1], **_insight_row_finish(agg)}
        for pair, agg in top_by_count_items(by_pair, 20)
    ]
    return {
        "total": len(rows),
        "top_subjects": top_subjects,
        "top_systems": top_systems,
        "top_subject_topics": top_subject_topics,
    }


@app.patch("/api/question/{qid}/outcome")
def api_patch_question_outcome(qid: str, body: OutcomePatchBody) -> dict[str, Any]:
    """Update stored outcome (e.g. Incorrect → Correct) and optional is_selected on choices."""
    if not qid.isdigit():
        raise HTTPException(400, "Invalid question id")
    jp = STRUCTURED_JSON_DIR / qid / "question.json"
    if not jp.is_file():
        raise HTTPException(404, "Question not found")

    raw = body.outcome.strip().lower()
    if raw not in ("correct", "incorrect"):
        raise HTTPException(400, "outcome must be 'Correct' or 'Incorrect'")
    canonical = "Correct" if raw == "correct" else "Incorrect"

    try:
        with open(jp, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        raise HTTPException(500, f"Invalid question.json: {e}") from e

    data["outcome"] = canonical

    if body.selected_letter is not None:
        let = body.selected_letter.strip().upper()[:4]
        for ch in data.get("answer_choices") or []:
            if not isinstance(ch, dict):
                continue
            letter = str(ch.get("letter", "")).strip().upper()
            ch["is_selected"] = letter == let and bool(let)

    try:
        with open(jp, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError as e:
        raise HTTPException(500, f"Failed to save JSON: {e}") from e

    invalidate_manifest_cache()
    return {"ok": True, "outcome": canonical}


@app.post("/api/question/{qid}/upload-media")
async def api_question_upload_media(qid: str, file: UploadFile = File(...)):
    """Save an image under structured-JSON/{qid}/images/user/ and append to question_images."""
    if not qid.isdigit():
        raise HTTPException(400, "Invalid question id")
    qdir = STRUCTURED_JSON_DIR / qid
    jp = qdir / "question.json"
    if not jp.is_file():
        raise HTTPException(404, "Question not found")

    safe_name = _sanitize_user_upload_filename(file.filename)
    user_dir = qdir / "images" / "user"
    user_dir.mkdir(parents=True, exist_ok=True)
    dest = user_dir / safe_name
    if dest.exists():
        stem, suf = dest.stem, dest.suffix
        for i in range(1, 1000):
            alt = user_dir / f"{stem}_{i}{suf}"
            if not alt.exists():
                dest = alt
                safe_name = dest.name
                break
        else:
            raise HTTPException(500, "Too many files with the same name")

    body = await file.read()
    if len(body) > MAX_UPLOAD_MEDIA_BYTES:
        raise HTTPException(400, "File too large (max 15MB)")
    dest.write_bytes(body)

    rel_posix = f"images/user/{safe_name}"
    try:
        with open(jp, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        dest.unlink(missing_ok=True)
        raise HTTPException(500, f"Invalid question.json: {e}") from e

    imgs = data.get("question_images")
    if not isinstance(imgs, list):
        imgs = []
        data["question_images"] = imgs
    if rel_posix not in imgs:
        imgs.append(rel_posix)

    try:
        with open(jp, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError as e:
        dest.unlink(missing_ok=True)
        raise HTTPException(500, f"Failed to save JSON: {e}") from e

    invalidate_manifest_cache()
    return {"ok": True, "path": rel_posix}


def _normalize_question_image_ref(raw: str) -> str:
    s = (raw or "").strip().replace("\\", "/").lstrip("/")
    low = s.lower()
    if low.startswith("anking:"):
        rest = s.split(":", 1)[1].strip().lstrip("/")
        return f"anking:{rest}" if rest else s
    return s


def _question_images_index(imgs: list[Any], target: str) -> int:
    t = _normalize_question_image_ref(target)
    for i, x in enumerate(imgs):
        if _normalize_question_image_ref(str(x)) == t:
            return i
    return -1


@app.post("/api/question/{qid}/question-images")
def api_question_patch_question_images(qid: str, body: QuestionImagesBody) -> dict[str, Any]:
    """Append or remove a question_images entry so the file shows with the vignette."""
    if not qid.isdigit():
        raise HTTPException(400, "Invalid question id")
    jp = STRUCTURED_JSON_DIR / qid / "question.json"
    if not jp.is_file():
        raise HTTPException(404, "Question not found")

    lk = (body.link or "").strip()
    ul = (body.unlink or "").strip()
    if bool(lk) == bool(ul):
        raise HTTPException(400, "Provide exactly one of link or unlink")

    try:
        with open(jp, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        raise HTTPException(500, f"Invalid question.json: {e}") from e

    imgs = data.get("question_images")
    if not isinstance(imgs, list):
        imgs = []
        data["question_images"] = imgs

    if ul:
        ix = _question_images_index(imgs, ul)
        if ix < 0:
            raise HTTPException(404, "That image is not linked to the vignette")
        imgs.pop(ix)
        norm = _normalize_question_image_ref(ul)
    else:
        ref = _normalize_question_image_ref(lk)
        if not ref:
            raise HTTPException(400, "Invalid link ref")
        low = ref.lower()
        if low.startswith("anking:"):
            fn = ref.split(":", 1)[1].strip()
            _safe_anking_filename(fn)
            if not (ANKI_MEDIA_DIR / fn).is_file():
                raise HTTPException(404, "AnKing media file not found on disk")
        else:
            if ".." in ref or ref.startswith("/"):
                raise HTTPException(400, "Invalid path")
            full = _safe_uworld_path(qid, ref)
            if not full.is_file():
                raise HTTPException(404, "File not found under this question folder")

        if _question_images_index(imgs, ref) >= 0:
            return {"ok": True, "already": True, "ref": ref}
        imgs.append(ref)
        norm = ref

    try:
        with open(jp, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError as e:
        raise HTTPException(500, f"Failed to save JSON: {e}") from e

    invalidate_manifest_cache()
    return {"ok": True, "ref": norm, "unlinked": bool(ul)}


@app.get("/api/question/{qid}")
def api_question(qid: str) -> dict[str, Any]:
    # qid must be numeric folder name style
    if not qid.isdigit():
        raise HTTPException(400, "Invalid question id")
    jp = STRUCTURED_JSON_DIR / qid / "question.json"
    if not jp.is_file():
        raise HTTPException(404, "Question not found")
    try:
        with open(jp, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        raise HTTPException(500, f"Failed to read JSON: {e}") from e


@app.get("/media/uworld/{qid}/{path:path}")
def media_uworld(qid: str, path: str):
    if not qid.isdigit():
        raise HTTPException(400, "Invalid question id")
    full = _safe_uworld_path(qid, path)
    if not full.is_file():
        raise HTTPException(404, "File not found")
    return FileResponse(full)


@app.get("/media/anking/{filename}")
def media_anking(filename: str):
    _safe_anking_filename(filename)
    full = ANKI_MEDIA_DIR / filename
    if not full.is_file():
        raise HTTPException(404, "Media not found")
    try:
        full.resolve().relative_to(ANKI_MEDIA_DIR.resolve())
    except ValueError:
        raise HTTPException(400, "Invalid path")
    return FileResponse(full)


@app.post("/api/export")
def api_export(body: ExportBody):
    buf = io.BytesIO()
    manifest_export: dict[str, Any] = {
        "qids": body.qids,
        "files": [],
        "missing_anking_media": [],
    }
    seen_anking: set[str] = set()

    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
        for qid in body.qids:
            if not str(qid).isdigit():
                continue
            qid = str(qid)
            qdir = STRUCTURED_JSON_DIR / qid
            jp = qdir / "question.json"
            if not jp.is_file():
                continue
            arc_json = f"{qid}/question.json"
            zf.write(jp, arc_json)
            manifest_export["files"].append(arc_json)

            try:
                with open(jp, encoding="utf-8") as f:
                    data = json.load(f)
            except (OSError, json.JSONDecodeError):
                data = {}

            img_dir = qdir / "images"
            if img_dir.is_dir():
                for fpath in img_dir.rglob("*"):
                    if fpath.is_file():
                        rel = fpath.relative_to(qdir)
                        arc = f"{qid}/{rel.as_posix()}"
                        zf.write(fpath, arc)
                        manifest_export["files"].append(arc)

            for fname in _collect_anking_filenames_from_question(data):
                if fname in seen_anking:
                    continue
                seen_anking.add(fname)
                src = ANKI_MEDIA_DIR / fname
                arc = f"anking_media/{fname}"
                if src.is_file():
                    zf.write(src, arc)
                    manifest_export["files"].append(arc)
                else:
                    manifest_export["missing_anking_media"].append(fname)

        manifest_export["files"].append("export_manifest.json")
        zf.writestr(
            "export_manifest.json",
            json.dumps(manifest_export, indent=2, ensure_ascii=False),
        )

    buf.seek(0)
    return StreamingResponse(
        buf,
        media_type="application/zip",
        headers={
            "Content-Disposition": 'attachment; filename="uworld_structured_export.zip"'
        },
    )


WIKI_DIR = REPO_ROOT / "wiki"


def _safe_wiki_path(rel: str) -> Path:
    """Validate that rel stays inside WIKI_DIR and is a .md file."""
    if not rel or ".." in rel or rel.startswith(("/", "\\")):
        raise HTTPException(400, "Invalid wiki path")
    full = (WIKI_DIR / rel).resolve()
    try:
        full.relative_to(WIKI_DIR.resolve())
    except ValueError:
        raise HTTPException(400, "Path escapes wiki directory")
    if full.suffix.lower() != ".md":
        raise HTTPException(400, "Only .md files are served")
    return full


def _build_wiki_tree(directory: Path, base: Path) -> list[dict]:
    """Recursively build a JSON-serialisable folder/file tree."""
    entries: list[dict] = []
    try:
        children = sorted(directory.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    except PermissionError:
        return entries
    for child in children:
        rel = child.relative_to(base).as_posix()
        if child.is_dir():
            entries.append({
                "name": child.name,
                "type": "dir",
                "path": rel,
                "children": _build_wiki_tree(child, base),
            })
        elif child.suffix.lower() == ".md":
            entries.append({
                "name": child.name,
                "type": "file",
                "path": rel,
            })
    return entries


@app.get("/api/wiki/tree")
def api_wiki_tree() -> dict:
    """Return the nested folder/file tree for the wiki/ directory."""
    if not WIKI_DIR.is_dir():
        return {"tree": [], "hint": "wiki/ directory not found"}
    return {"tree": _build_wiki_tree(WIKI_DIR, WIKI_DIR)}


@app.get("/api/wiki/file")
def api_wiki_file(path: str) -> dict:
    """Return the raw markdown content of a wiki file."""
    full = _safe_wiki_path(path)
    if not full.is_file():
        raise HTTPException(404, "File not found")
    for enc in ("utf-8", "utf-8-sig", "cp1252"):
        try:
            content = full.read_text(encoding=enc)
            return {"path": path, "content": content}
        except UnicodeDecodeError:
            continue
    raise HTTPException(500, "Could not decode file")


@app.get("/wiki", response_class=HTMLResponse)
def wiki_index():
    wiki_html = STATIC_DIR / "wiki.html"
    if not wiki_html.is_file():
        return HTMLResponse("<p>Missing static/wiki.html</p>", status_code=500)
    return HTMLResponse(wiki_html.read_text(encoding="utf-8"))


@app.get("/", response_class=HTMLResponse)
def root_index():
    index = STATIC_DIR / "index.html"
    if not index.is_file():
        return HTMLResponse("<p>Missing static/index.html</p>", status_code=500)
    return HTMLResponse(index.read_text(encoding="utf-8"))


app.mount(
    "/static",
    StaticFiles(directory=str(STATIC_DIR)),
    name="static",
)
