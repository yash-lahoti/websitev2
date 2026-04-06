# Qbank viewer

Run from `step2-wiki`: `uvicorn qbank_viewer.server:app --reload`.  
Set `GENERATED_QUESTIONS_DIR` if `generated-questions` is not under `step2-wiki/generated-questions`.  
After adding new `examples/*.json` files, call `POST /api/generated/registry/sync` to write merged defaults to `viewer-registry.json`.

`generated-questions/index.json` is for skill/concept → ID mapping; **`viewer-registry.json`** is the viewer’s source of truth for paths, **sort_order**, **hidden**, **tags**, **notes**, **eval_file**, and **quiz_outcome** / **quiz_selected_letter** (persisted when you answer in the UI).

**API:** `GET /api/generated/concepts` — reads `index.json` for concept slugs (used by the **Generate question** button to build `/nbme-gen` copy-paste commands).

**Study UI:** Use the **Study** filter (unanswered / incorrect / flagged) and optional local attempt tracking in Settings. After a wrong answer, turn off **“immediately highlight the correct option”** to read the explanation first; use **Show correct answer** when you want the green highlight.
