/**
 * Generated question bank viewer (NBME-style examples).
 */
(function () {
  "use strict";

  const STORAGE_THEME = "qbank_theme";
  const THEME_CYCLE = ["dark", "light", "cream"];

  function normalizeStoredTheme(raw) {
    return THEME_CYCLE.includes(raw) ? raw : "dark";
  }

  function nextThemeName(current) {
    const i = THEME_CYCLE.indexOf(current);
    const idx = i >= 0 ? i : 0;
    return THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
  }

  function themeToggleLabelForNextAfter(current) {
    const n = nextThemeName(current);
    if (n === "dark") return "Dark";
    if (n === "light") return "Light";
    return "Cream";
  }
  const STORAGE_STUDY = "qbank_study_v1";
  let manifest = { count: 0, questions: [] };
  /** @type {"library"|"flagged"|"insights"} */
  let activeTab = "library";
  let sortKey = "qid";
  let sortDir = 1;
  /** @type {Set<string>} */
  const selectedQids = new Set();
  /** QIDs the user has submitted an answer for while quiz mode is on (this page load). Ignores server `outcome` until then. */
  const quizModeAnsweredQids = new Set();
  /** @type {{ qids: string[], i: number } | null} */
  let quizSession = null;
  /** @type {any | null} */
  let openQuestion = null;

  const $ = (id) => document.getElementById(id);

  const MOBILE_SIDEBAR_MQ =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(max-width: 900px)")
      : null;

  function syncSidebarDrawerForViewport() {
    const panel = $("sidebar-panel");
    const btn = $("btn-sidebar-toggle");
    if (!panel || !btn) return;
    if (!MOBILE_SIDEBAR_MQ || !MOBILE_SIDEBAR_MQ.matches) {
      panel.classList.remove("sidebar--open");
      btn.setAttribute("aria-expanded", "false");
    }
  }

  function flagStorageKey() {
    return "qbank_flagged_generated";
  }

  function loadFlagged() {
    try {
      const raw = localStorage.getItem(flagStorageKey());
      const a = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(a) ? a.map(String) : []);
    } catch {
      return new Set();
    }
  }

  function saveFlagged(set) {
    localStorage.setItem(flagStorageKey(), JSON.stringify([...set]));
  }

  function loadStudyMap() {
    try {
      const raw = localStorage.getItem(STORAGE_STUDY);
      const o = raw ? JSON.parse(raw) : {};
      return o && typeof o === "object" ? o : {};
    } catch {
      return {};
    }
  }

  /** @param {string} qid @param {boolean} wasCorrect */
  function recordStudyAttempt(qid, wasCorrect, letter = null) {
    const track = $("set-track-attempts");
    if (!track || !track.checked) return;
    const map = loadStudyMap();
    const prev = map[qid] || { attempts: 0, correct: 0, lastAt: 0, lastLetter: null };
    map[qid] = {
      attempts: (Number(prev.attempts) || 0) + 1,
      correct: (Number(prev.correct) || 0) + (wasCorrect ? 1 : 0),
      lastAt: Date.now(),
      lastLetter: letter || prev.lastLetter,
    };
    localStorage.setItem(STORAGE_STUDY, JSON.stringify(map));

    const qRow = (manifest.questions || []).find(q => String(q.question_id) === String(qid));
    if (qRow) {
      qRow.outcome = wasCorrect ? "Correct" : "Incorrect";
      renderTable();
    }
  }

  function localStudyAccuracySummary() {
    const map = loadStudyMap();
    let att = 0;
    let cor = 0;
    for (const k of Object.keys(map)) {
      const e = map[k];
      if (!e || typeof e !== "object") continue;
      att += Number(e.attempts) || 0;
      cor += Number(e.correct) || 0;
    }
    if (att === 0) return null;
    return { attempts: att, correct: cor, pct: Math.round((100 * cor) / att) };
  }

  function syncNbmeGenBtn() {
    const b = $("btn-nbme-gen");
    if (b) b.classList.remove("hidden");
  }

  function rowQid(row) {
    return String(row.question_id ?? "");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escParagraphs(text) {
    const t = String(text || "").trim();
    if (!t) return "";
    const parts = t.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    if (!parts.length) return `<p>${escapeHtml(t)}</p>`;
    return parts.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  }

  function questionStemHtml(q, qid) {
    let h = "";
    if (q.question_html) h = q.question_html;
    else if (q.stem) h = q.stem;
    else h = escParagraphs(q.question_text || "");
    return h;
  }

  function explanationHtml(q) {
    if (q.explanation_html) return q.explanation_html;
    return escParagraphs(q.explanation || "");
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function manifestUrl() { return "/medjarvis-manifest.json"; }

  function invalidateUrl() { return null; }

  async function loadManifest() {
    $("load-msg").classList.remove("hidden");
    $("err-msg").classList.add("hidden");
    try {
      const r = await fetch(manifestUrl());
      if (!r.ok) throw new Error(await r.text());
      manifest = await r.json();

      // Override static manifest with local browser memory attempts
      const map = loadStudyMap();
      for (const q of (manifest.questions || [])) {
        const sm = map[String(q.question_id)];
        if (sm && sm.attempts > 0) {
          q.outcome = (sm.correct > 0) ? "Correct" : "Incorrect";
        }
      }
    } catch (e) {
      $("err-msg").textContent = String(e);
      $("err-msg").classList.remove("hidden");
      manifest = { count: 0, questions: [] };
    }
    $("load-msg").classList.add("hidden");
    updatePctHeader();
    populateFilterOptions();
    renderTable();
    updateStats();
    syncNbmeGenBtn();
    updateInsightsIfNeeded();
  }

  function updatePctHeader() {
    const btn = $("th-pct-btn");
    if (!btn) return;
    btn.childNodes[0].textContent = "Eval score";
  }

  function displaySubject(r) {
    const s = String(r.subject || "").trim();
    return s || "(no subject)";
  }

  function displayTopic(r) {
    const t = String(r.topic || "").trim();
    return t || "(no topic)";
  }

  function populateFilterOptions() {
    const subjects = new Set();
    const systems = new Set();
    const topics = new Set();
    for (const r of manifest.questions || []) {
      subjects.add(displaySubject(r));
      if (r.system) systems.add(String(r.system));
      topics.add(displayTopic(r));
    }
    fillSelect($("flt-subject"), subjects);
    fillSelect($("flt-system"), systems);
    fillSelect($("flt-topic"), topics);
  }

  function fillSelect(sel, values) {
    const cur = sel.value;
    const first = sel.querySelector("option");
    sel.innerHTML = "";
    sel.appendChild(first);
    for (const v of [...values].sort((a, b) => a.localeCompare(b))) {
      const o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      sel.appendChild(o);
    }
    if ([...sel.options].some((o) => o.value === cur)) sel.value = cur;
  }

  function fuzzyMatch(row, q) {
    if (!q) return true;
    const hay = [
      rowQid(row),
      row.subject,
      row.system,
      row.topic,
      row.subtopic,
      row.question_type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function getFilteredRows() {
    let rows = [...(manifest.questions || [])];
    if (activeTab === "flagged") {
      const f = loadFlagged();
      rows = rows.filter((r) => f.has(rowQid(r)));
    }
    const sub = ($("flt-subject").value || "").trim();
    const sys = ($("flt-system").value || "").trim();
    const top = ($("flt-topic").value || "").trim();
    const oc = ($("flt-outcome").value || "").trim();
    const study = ($("flt-study").value || "").trim().toLowerCase();
    const search = ($("flt-search").value || "").trim().toLowerCase();
    const flaggedSet = study === "flagged" ? loadFlagged() : null;
    return rows.filter((r) => {
      if (sub && displaySubject(r) !== sub) return false;
      if (sys && String(r.system || "") !== sys) return false;
      if (top && displayTopic(r) !== top) return false;
      if (oc && String(r.outcome || "") !== oc) return false;
      if (study === "unanswered") {
        if (String(r.outcome || "").trim()) return false;
      } else if (study === "incorrect") {
        if (String(r.outcome || "").toLowerCase() !== "incorrect") return false;
      } else if (study === "correct") {
        if (String(r.outcome || "").toLowerCase() !== "correct") return false;
      } else if (study === "flagged" && flaggedSet) {
        if (!flaggedSet.has(rowQid(r))) return false;
      }
      if (search && !fuzzyMatch(r, search)) return false;
      return true;
    });
  }

  function sortRows(rows) {
    const mult = sortDir;
    const key = sortKey;
    return [...rows].sort((a, b) => {
      let va;
      let vb;
      if (key === "qid") {
        const na = Number(rowQid(a));
        const nb = Number(rowQid(b));
        if (!Number.isNaN(na) && !Number.isNaN(nb)) {
          va = na;
          vb = nb;
        } else {
          va = rowQid(a);
          vb = rowQid(b);
        }
      } else if (key === "pct") {
        va =
          a.eval_total_score != null && a.eval_total_max != null
            ? a.eval_total_score / Math.max(1, a.eval_total_max)
            : -1;
        vb =
          b.eval_total_score != null && b.eval_total_max != null
            ? b.eval_total_score / Math.max(1, b.eval_total_max)
            : -1;
      } else {
        va = String(a[key] ?? "").toLowerCase();
        vb = String(b[key] ?? "").toLowerCase();
      }
      if (va < vb) return -1 * mult;
      if (va > vb) return 1 * mult;
      return rowQid(a).localeCompare(rowQid(b)) * mult;
    });
  }

  function pctCell(row) {
    if (row.eval_total_score != null && row.eval_total_max != null) {
      return `${row.eval_total_score}/${row.eval_total_max}`;
    }
    return "—";
  }

  function outcomeClass(o) {
    const s = String(o || "").toLowerCase();
    if (s === "correct") return "oc-correct";
    if (s === "incorrect") return "oc-incorrect";
    return "oc-unk";
  }

  function renderTable() {
    const tbody = $("tbody");
    tbody.innerHTML = "";
    const rows = sortRows(getFilteredRows());
    const flagged = loadFlagged();

    let cor = 0,
      inc = 0,
      unk = 0;
    for (const r of rows) {
      const o = String(r.outcome || "").toLowerCase();
      if (o === "correct") cor++;
      else if (o === "incorrect") inc++;
      else unk++;
    }
    const total = rows.length;
    updateOutcomeViz(cor, inc, unk, total);

    for (const r of rows) {
      const qid = rowQid(r);
      const tr = document.createElement("tr");
      tr.dataset.qid = qid;
      const checked = selectedQids.has(qid);
      const isFlag = flagged.has(qid);
      tr.innerHTML = `
        <td><input type="checkbox" class="row-chk" data-qid="${escapeHtml(qid)}" ${checked ? "checked" : ""} /></td>
        <td><code>${escapeHtml(qid)}</code></td>
        <td><span class="outcome-pill ${outcomeClass(r.outcome)}">${escapeHtml(r.outcome || "—")}</span></td>
        <td>${escapeHtml(displaySubject(r))}</td>
        <td>${escapeHtml(r.system || "")}</td>
        <td>${escapeHtml(displayTopic(r))}</td>
        <td>${escapeHtml(pctCell(r))}</td>
        <td class="td-actions"><button type="button" class="btn-open" data-qid="${escapeHtml(qid)}">Open</button></td>
      `;
      if (isFlag) tr.classList.add("row-flagged");
      tbody.appendChild(tr);
    }

    tbody.querySelectorAll(".row-chk").forEach((el) => {
      el.addEventListener("change", () => {
        const id = el.getAttribute("data-qid");
        if (el.checked) selectedQids.add(id);
        else selectedQids.delete(id);
        updateStats();
      });
    });
    tbody.querySelectorAll(".btn-open").forEach((el) => {
      el.addEventListener("click", () =>
        openModal(el.getAttribute("data-qid"), false)
      );
    });

    syncHeaderCheck();

    let meta = `${rows.length} shown`;
    const s = localStudyAccuracySummary();
    if (s) meta += ` · local quiz ${s.pct}% (${s.correct}/${s.attempts})`;
    $("toolbar-meta").textContent = meta;
    $("btn-random-quiz").disabled = rows.length === 0;
    syncHeaderCheck();
  }

  function updateOutcomeViz(cor, inc, unk, total) {
    const viz = $("library-outcome-viz");
    if (!total) {
      viz.classList.add("hidden");
      return;
    }
    viz.classList.remove("hidden");
    $("outcome-viz-total").textContent = `${total} in view`;
    const pct = (n) => (total ? Math.round((100 * n) / total) : 0);
    $("stacked-seg-correct").style.width = pct(cor) + "%";
    $("stacked-seg-incorrect").style.width = pct(inc) + "%";
    $("stacked-seg-unknown").style.width = pct(unk) + "%";
    $("lg-cor").textContent = String(cor);
    $("lg-inc").textContent = String(inc);
    $("lg-oth").textContent = String(unk);
  }

  function syncHeaderCheck() {
    const chks = [...document.querySelectorAll(".row-chk")];
    const all = chks.length && chks.every((c) => c.checked);
    const some = chks.some((c) => c.checked);
    const head = $("chk-all-page");
    head.checked = all;
    head.indeterminate = some && !all;
  }

  function updateStats() {
    const rows = getFilteredRows();
    const flagged = loadFlagged();
    let fc = 0;
    for (const r of manifest.questions || []) {
      if (flagged.has(rowQid(r))) fc++;
    }
    $("stat-total").textContent = String(manifest.count ?? 0);
    $("stat-filtered").textContent = String(rows.length);
    $("stat-selected").textContent = String(selectedQids.size);
    $("stat-flagged").textContent = String(fc);
    $("tab-flag-count").textContent = String(fc);
    $("btn-quiz-selected").disabled = selectedQids.size === 0;
    const sbMeta = $("sidebar-toggle-meta");
    if (sbMeta) {
      sbMeta.textContent = `${rows.length} shown · ${selectedQids.size} sel · ${fc} flag`;
    }
  }

  function setTab(tab) {
    activeTab = tab;
    const lib = tab === "library" || tab === "flagged";
    $("tab-library").classList.toggle("active", tab === "library");
    $("tab-library").setAttribute("aria-selected", tab === "library");
    $("tab-flagged").classList.toggle("active", tab === "flagged");
    $("tab-flagged").setAttribute("aria-selected", tab === "flagged");
    $("tab-insights").classList.toggle("active", tab === "insights");
    $("tab-insights").setAttribute("aria-selected", tab === "insights");

    $("panel-library").classList.toggle("hidden", !lib);
    $("panel-insights").classList.toggle("hidden", tab !== "insights");

    $("browse-heading").textContent = tab === "flagged" ? "Flagged" : "Library";

    if (tab === "insights") updateInsightsIfNeeded();
    else renderTable();
  }

  function buildTopicAggregates() {
    const buckets = new Map();
    for (const r of manifest.questions || []) {
      const sub = displaySubject(r);
      const top = displayTopic(r);
      const key = sub + "\0" + top;
      let b = buckets.get(key);
      if (!b) {
        b = { sub, top, count: 0, correct: 0, incorrect: 0 };
        buckets.set(key, b);
      }
      b.count += 1;
      const o = String(r.outcome || "").trim().toLowerCase();
      if (o === "correct") b.correct += 1;
      else if (o === "incorrect") b.incorrect += 1;
    }
    const rows = [...buckets.values()];
    rows.sort((a, b2) => {
      const t = a.top.localeCompare(b2.top);
      if (t) return t;
      return a.sub.localeCompare(b2.sub);
    });
    return rows;
  }

  function topicAggregateAccuracyPct(row) {
    const scored = row.correct + row.incorrect;
    if (!scored) return null;
    return Math.round((100 * row.correct) / scored);
  }

  function jumpTopicToLibrary(sub, top) {
    $("flt-subject").value = sub;
    $("flt-topic").value = top;
    $("flt-search").value = "";
    setTab("library");
    updateStats();
  }

  function renderTopicBrowser(filterText) {
    const list = $("insights-topic-list");
    const meta = $("insights-topic-meta");
    if (!list) return;
    const q = (filterText || "").trim().toLowerCase();
    const rows = buildTopicAggregates().filter((row) => {
      if (!q) return true;
      const hay = `${row.sub} ${row.top}`.toLowerCase();
      return hay.includes(q);
    });
    list.innerHTML = "";
    if (meta) meta.textContent = rows.length ? `${rows.length} topic pair(s)` : "No topics";
    if (!rows.length) {
      list.innerHTML = `<p class="muted insights-topic-empty">${manifest.questions?.length ? "No matches." : "No questions loaded."}</p>`;
      return;
    }
    for (const row of rows) {
      const acc = topicAggregateAccuracyPct(row);
      const accStr = acc != null ? `${acc}%` : "—";
      const wrap = document.createElement("div");
      wrap.className = "insights-topic-row";
      wrap.setAttribute("role", "listitem");
      const main = document.createElement("div");
      main.className = "insights-topic-main";
      const title = document.createElement("div");
      title.className = "insights-topic-title";
      title.textContent = row.top;
      const subEl = document.createElement("div");
      subEl.className = "insights-topic-sub muted small";
      subEl.textContent = row.sub;
      main.appendChild(title);
      main.appendChild(subEl);
      const stats = document.createElement("div");
      stats.className = "insights-topic-stats";
      const s1 = document.createElement("span");
      s1.textContent = `${row.count} Q`;
      const s2 = document.createElement("span");
      s2.textContent = accStr;
      stats.appendChild(s1);
      stats.appendChild(s2);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-secondary insights-topic-btn";
      btn.textContent = "View in library";
      btn.addEventListener("click", () => jumpTopicToLibrary(row.sub, row.top));
      wrap.appendChild(main);
      wrap.appendChild(stats);
      wrap.appendChild(btn);
      list.appendChild(wrap);
    }
  }

  function updateInsightsIfNeeded() {
    const search = $("insights-topic-search");
    renderTopicBrowser(search ? search.value : "");
  }

  async function fetchQuestion(qid) {
    const row = manifest.questions.find(q => q.question_id === qid);
    if (!row || !row.source_file) return null;

    const url = `/generated-questions/${row.source_file}`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const raw = await r.json();

    const stemBlock = raw.stem ? `<div class="nbme-stem">${escParagraphs(raw.stem)}</div>` : "";
    const leadBlock = raw.lead_in ? `<p class="nbme-lead-in"><strong>${escapeHtml(raw.lead_in)}</strong></p>` : "";
    const correct = (raw.correct_answer || "").trim().toUpperCase().substring(0, 4);

    const map = loadStudyMap();
    const lc = map[qid] ? map[qid].lastLetter : null;

    const answer_choices = [];
    if (raw.options) {
      const letters = Object.keys(raw.options).sort();
      for (const letter of letters) {
        const let_u = letter.trim().toUpperCase().substring(0, 4);
        answer_choices.push({
          letter: let_u,
          text: raw.options[letter],
          is_correct: let_u === correct,
          is_selected: (lc === let_u)
        });
      }
    }

    return Object.assign({}, raw, {
      question_html: stemBlock + leadBlock,
      question_text: `${raw.stem || ""}\n\n${raw.lead_in || ""}`.trim(),
      answer_choices: answer_choices,
      explanation_html: escParagraphs(raw.explanation || ""),
      _generated_meta: { tags: raw.tags || [] }
    });
  }

  async function patchOutcome(qid, outcome, letter) { return { status: "ignored" }; }

  function modalTextZoom() {
    return Number(document.documentElement.style.getPropertyValue("--modal-text-zoom") || 1) || 1;
  }

  function setModalTextZoom(z) {
    document.documentElement.style.setProperty("--modal-text-zoom", String(z));
  }

  function generatedMetaRows(meta) {
    if (!meta || typeof meta !== "object") return [];
    const rows = [];
    const add = (label, val) => {
      if (val == null || val === "") return;
      if (Array.isArray(val) && val.length === 0) return;
      rows.push([label, val]);
    };
    add("Generated date", meta.generated_date);
    if (Array.isArray(meta.source_concepts) && meta.source_concepts.length)
      rows.push(["Source concepts", meta.source_concepts.join(", ")]);
    add("Source UWorld", meta.source_uworld);
    add("Subtopic", meta.subtopic);
    add("Difficulty", meta.difficulty);
    add("Question type", meta.question_type);
    add("Review status", meta.review_status);
    if (Array.isArray(meta.tags) && meta.tags.length)
      rows.push(["Tags", meta.tags.join(", ")]);
    return rows;
  }

  function buildMetaDl(meta) {
    const rows = generatedMetaRows(meta);
    if (!rows.length) return "";
    const body = rows
      .map(
        ([k, v]) =>
          `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(String(v))}</dd>`
      )
      .join("");
    return `<dl class="meta-dl">${body}</dl>`;
  }

  function buildEvalPanelHtml(er) {
    if (!er || typeof er !== "object") return "";
    const score =
      er.total_score != null && er.total_max != null
        ? `${er.total_score}/${er.total_max}`
        : "";
    const parts = [
      er.summary_line ? `<p class="eval-summary"><strong>${escapeHtml(String(er.summary_line))}</strong></p>` : "",
      score ? `<p class="muted small">Score: ${escapeHtml(score)}</p>` : "",
      er.tier ? `<p class="muted small">${escapeHtml(String(er.tier))}</p>` : "",
      er.evaluated_date
        ? `<p class="muted small">Evaluated: ${escapeHtml(String(er.evaluated_date))}</p>`
        : "",
      er.eval_id ? `<p class="muted small mono">${escapeHtml(String(er.eval_id))}</p>` : "",
    ].filter(Boolean);
    if (!parts.length) return "";
    return `<div class="eval-score-card">${parts.join("")}</div>`;
  }

  function buildDistractorGrid(dr) {
    if (!dr || typeof dr !== "object") return "";
    const entries = Object.entries(dr).filter(
      ([k]) => String(k).trim() !== ""
    );
    if (!entries.length) return "";
    const cards = entries
      .map(
        ([k, v]) =>
          `<div class="distractor-card"><span class="distractor-letter">${escapeHtml(String(k).toUpperCase())}.</span>${escapeHtml(String(v))}</div>`
      )
      .join("");
    return `<div class="distractor-grid">${cards}</div>`;
  }

  function buildLearnPanelsHtml(q, answered, explainHtml, ankiBlock) {
    if (!answered) {
      return `<div class="learn-placeholder" id="panel-explain">Answer the question to reveal the explanation.</div>`;
    }

    const explainInner = `<div class="html-bubble">${explainHtml}</div>${ankiBlock}`;
    const teaching = q._teaching_point
      ? `<div class="html-bubble">${escParagraphs(q._teaching_point)}</div>`
      : "";
    const optionsGrid = buildDistractorGrid(q._distractor_rationale);
    const evalHtml = buildEvalPanelHtml(q._eval_report);
    const refDl = buildMetaDl(q._generated_meta);

    const tabs = [];
    if (explainInner.trim()) tabs.push({ id: "explain", label: "Explanation" });
    if (teaching) tabs.push({ id: "teaching", label: "Teaching" });
    if (optionsGrid) tabs.push({ id: "options", label: "Options" });
    if (evalHtml) tabs.push({ id: "eval", label: "Eval" });
    if (refDl) tabs.push({ id: "reference", label: "Reference" });

    if (tabs.length === 0) {
      return `<div class="learn-tab-panel active" data-learn-panel="explain"><div class="muted small">No explanation content.</div></div>`;
    }

    if (tabs.length === 1) {
      const t = tabs[0];
      let inner = "";
      if (t.id === "explain") inner = explainInner;
      else if (t.id === "teaching") inner = teaching;
      else if (t.id === "options") inner = optionsGrid;
      else if (t.id === "eval") inner = evalHtml;
      else inner = refDl;
      return `<div class="learn-panel-stack" id="learn-stack"><div class="learn-tab-panel active" data-learn-panel="${escapeHtml(t.id)}">${inner}</div></div>`;
    }

    const tabBtns = tabs
      .map((t, i) => {
        const act = i === 0 ? " active" : "";
        return `<button type="button" class="learn-tab${act}" data-learn-panel="${escapeHtml(t.id)}" role="tab">${escapeHtml(t.label)}</button>`;
      })
      .join("");

    function panelHtml(id, inner, i) {
      const act = i === 0 ? " active" : "";
      const hid = i === 0 ? "" : " hidden";
      return `<div class="learn-tab-panel${act}${hid}" data-learn-panel="${escapeHtml(id)}">${inner}</div>`;
    }

    const panels = [];
    let idx = 0;
    for (const t of tabs) {
      let inner = "";
      if (t.id === "explain") inner = explainInner;
      else if (t.id === "teaching") inner = teaching;
      else if (t.id === "options") inner = optionsGrid;
      else if (t.id === "eval") inner = evalHtml;
      else inner = refDl;
      panels.push(panelHtml(t.id, inner, idx));
      idx++;
    }

    return `
      <div class="learn-tabs" role="tablist" id="learn-tabs-bar">
        ${tabBtns}
      </div>
      <div class="learn-panel-stack" id="learn-stack">
        ${panels.join("")}
      </div>`;
  }

  function choicesShowAnsweredState(q, qid) {
    const quizMode = $("set-quiz-mode").checked;
    if (!quizMode) return !!(q._quizAnswered || q.outcome);
    if (q._quizAnswered) return true;
    return quizModeAnsweredQids.has(String(qid));
  }

  function wireLearnTabSwitching(root) {
    const stack = root.querySelector("#learn-stack");
    const bar = root.querySelector("#learn-tabs-bar");
    if (!stack || !bar) return;
    const tabs = bar.querySelectorAll(".learn-tab[data-learn-panel]");
    if (tabs.length <= 1) return;
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-learn-panel");
        bar.querySelectorAll(".learn-tab").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        stack.querySelectorAll(".learn-tab-panel").forEach((p) => {
          const on = p.getAttribute("data-learn-panel") === id;
          p.classList.toggle("active", on);
          p.classList.toggle("hidden", !on);
        });
      });
    });
  }

  function renderModalBody(q, qid) {
    const quizMode = $("set-quiz-mode").checked;
    const ghost = $("set-ghost-mode").checked;
    const shuffle = $("set-shuffle").checked;
    const highlightCorrect = $("set-highlight-correct").checked;

    let choices = [...(q.answer_choices || [])];
    if (shuffle) choices = shuffleArray(choices);

    const answered = choicesShowAnsweredState(q, qid);
    const outcomeLower = String(q.outcome || "").toLowerCase();
    const concealCorrect =
      answered &&
      !highlightCorrect &&
      outcomeLower === "incorrect" &&
      !q._revealCorrectChoice;

    const stemHtml = questionStemHtml(q, qid);
    const ulLocked = quizMode && answered ? " choices-locked" : "";
    const choicesHtml = choices
      .map((ch) => {
        const L = String(ch.letter || "").toUpperCase();
        const pending = quizMode && !answered ? " quiz-pending" : "";
        let cls = "choice" + pending;
        if (answered) {
          if (ch.is_correct) {
            if (concealCorrect) cls += " correct-hidden";
            else cls += " correct";
          } else if (ch.is_selected) cls += " wrong-sel";
        }
        const pct =
          ch.pct_answered_correctly != null
            ? `<span class="choice-pct">${escapeHtml(String(ch.pct_answered_correctly))}%</span>`
            : "";
        return `<li class="${cls}" data-letter="${escapeHtml(L)}" role="button" tabindex="0"><span class="choice-letter">${escapeHtml(L)}.</span><span class="choice-text">${ch.text || ""}</span>${pct}</li>`;
      })
      .join("");

    const explainHtml = explanationHtml(q);
    const ghostCls = ghost && !answered ? " ghost-choices-hidden" : "";
    const revealBtn =
      ghost && !answered
        ? `<button type="button" class="btn-reveal-choices btn-secondary">Show answer choices</button>`
        : "";
    const showCorrectBtn = concealCorrect
      ? `<button type="button" class="btn-show-correct btn-secondary">Show correct answer</button>`
      : "";

    const anki = q.anki_cards || [];
    let ankiBlock = "";
    if (anki.length) {
      ankiBlock = anki
        .map(
          (c, i) => `
        <details class="anki-card"><summary>Anki ${i + 1}</summary>
          <div class="html-bubble anki-fact">${c.fact_html || ""}</div>
          <div class="html-bubble anki-extra">${c.extra_html || ""}</div>
        </details>`
        )
        .join("");
    }

    const learnInner = buildLearnPanelsHtml(q, answered, explainHtml, ankiBlock);
    const learnWrap = `<div class="learn-shell">${learnInner}</div>`;

    return `
      <div class="modal-col modal-col-q">
        <div class="section">
          <h3>Question</h3>
          <div class="html-bubble">${stemHtml}</div>
        </div>
        <div class="section sec-answer-choices${ghostCls}" id="sec-choices">
          <h3>Answer choices</h3>
          ${revealBtn}
          <ul class="choice-list${ulLocked}">${choicesHtml}</ul>
          ${showCorrectBtn}
        </div>
      </div>
      <div class="modal-col modal-col-learn">
        ${learnWrap}
      </div>`;
  }

  function wireModalInteractions(qid, q) {
    const body = $("modal-body");
    const sec = $("sec-choices");
    if (body) wireLearnTabSwitching(body);

    if (!sec) return;
    const reveal = sec.querySelector(".btn-reveal-choices");
    if (reveal) {
      reveal.addEventListener("click", () => {
        sec.classList.add("choices-revealed");
        reveal.remove();
      });
    }

    const showCorrect = sec.querySelector(".btn-show-correct");
    if (showCorrect) {
      showCorrect.addEventListener("click", () => {
        if (!openQuestion) return;
        openQuestion._revealCorrectChoice = true;
        const id = String(openQuestion.question_id ?? "");
        $("modal-body").innerHTML = renderModalBody(openQuestion, id);
        wireModalInteractions(id, openQuestion);
        updateModalFlag(id);
      });
    }

    const answered = choicesShowAnsweredState(q, qid);

    sec.querySelectorAll(".choice.quiz-pending").forEach((li) => {
      const go = () => {
        if (sec.dataset.graded === "1") return;
        sec.dataset.graded = "1";
        const ul = sec.querySelector(".choice-list");
        if (ul) ul.classList.add("choices-locked");

        const L = li.getAttribute("data-letter");
        const ch = (q.answer_choices || []).find(
          (c) => String(c.letter).toUpperCase() === L
        );
        const ok = !!(ch && ch.is_correct);
        const preserveReveal = !!(openQuestion && openQuestion._revealCorrectChoice);
        patchOutcome(qid, ok ? "correct" : "incorrect", L)
          .then(() => {
            if ($("set-quiz-mode").checked) quizModeAnsweredQids.add(String(qid));
            recordStudyAttempt(qid, ok, L);
            return fetchQuestion(qid);
          })
          .then((fq) => {
            fq._quizAnswered = true;
            if (preserveReveal) fq._revealCorrectChoice = true;
            openQuestion = fq;
            $("modal-body").innerHTML = renderModalBody(fq, qid);
            wireModalInteractions(qid, fq);
            return loadManifest();
          })
          .catch((e) => {
            sec.dataset.graded = "";
            const u = sec.querySelector(".choice-list");
            if (u) u.classList.remove("choices-locked");
            alert(String(e));
          });
      };
      li.addEventListener("click", go);
      li.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          go();
        }
      });
    });

    if (answered) {
      sec.querySelectorAll(".choice").forEach((li) => {
        li.classList.remove("quiz-pending");
      });
    }
  }

  async function openModal(qid, fromQuiz) {
    $("modal-backdrop").classList.remove("hidden");
    $("quiz-nav-inline").classList.toggle("hidden", !fromQuiz || !quizSession);
    $("modal-title").textContent = `Question ${qid}`;
    $("modal-meta").textContent = "Generated bank";
    $("modal-body").innerHTML =
      '<p class="muted" style="padding:1rem">Loading…</p>';
    try {
      const q = await fetchQuestion(qid);
      openQuestion = q;
      $("modal-body").innerHTML = renderModalBody(q, qid);
      wireModalInteractions(qid, q);
      updateModalFlag(qid);
      if (fromQuiz && quizSession) updateQuizProgress();
    } catch (e) {
      $("modal-body").innerHTML = `<p class="err">${escapeHtml(String(e))}</p>`;
    }
  }

  function updateModalFlag(qid) {
    const btn = $("modal-flag");
    const f = loadFlagged();
    const on = f.has(qid);
    btn.classList.toggle("flagged", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function updateQuizProgress() {
    if (!quizSession) return;
    const { qids, i } = quizSession;
    $("quiz-progress").textContent = `${i + 1} / ${qids.length}`;
    $("quiz-prev").disabled = i <= 0;
    $("quiz-next").disabled = i >= qids.length - 1;
  }

  function closeModal() {
    $("modal-backdrop").classList.add("hidden");
    quizSession = null;
    openQuestion = null;
  }

  function startQuiz(qids) {
    if (!qids.length) return;
    for (const id of qids) quizModeAnsweredQids.delete(String(id));
    quizSession = { qids, i: 0 };
    $("quiz-nav-inline").classList.remove("hidden");
    openModal(qids[0], true);
  }

  /* --- init --- */
  function initTheme() {
    const cur = normalizeStoredTheme(localStorage.getItem(STORAGE_THEME));
    document.documentElement.setAttribute("data-theme", cur);
    const btn = $("btn-theme");
    if (btn) btn.textContent = themeToggleLabelForNextAfter(cur);
  }

  $("btn-theme").addEventListener("click", () => {
    const cur = normalizeStoredTheme(
      document.documentElement.getAttribute("data-theme")
    );
    const next = nextThemeName(cur);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_THEME, next);
    const btn = $("btn-theme");
    if (btn) btn.textContent = themeToggleLabelForNextAfter(next);
  });

  $("tab-library").addEventListener("click", () => setTab("library"));
  $("tab-flagged").addEventListener("click", () => setTab("flagged"));
  $("tab-insights").addEventListener("click", () => setTab("insights"));

  const btnSidebarToggle = $("btn-sidebar-toggle");
  if (btnSidebarToggle) {
    btnSidebarToggle.addEventListener("click", () => {
      const panel = $("sidebar-panel");
      if (!panel) return;
      const open = !panel.classList.contains("sidebar--open");
      panel.classList.toggle("sidebar--open", open);
      btnSidebarToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (MOBILE_SIDEBAR_MQ) {
    if (typeof MOBILE_SIDEBAR_MQ.addEventListener === "function") {
      MOBILE_SIDEBAR_MQ.addEventListener("change", syncSidebarDrawerForViewport);
    } else if (typeof MOBILE_SIDEBAR_MQ.addListener === "function") {
      MOBILE_SIDEBAR_MQ.addListener(syncSidebarDrawerForViewport);
    }
  }
  syncSidebarDrawerForViewport();

  const insightsSearch = $("insights-topic-search");
  if (insightsSearch) {
    insightsSearch.addEventListener("input", () => updateInsightsIfNeeded());
  }

  [
    "flt-subject",
    "flt-system",
    "flt-topic",
    "flt-outcome",
    "flt-study",
    "flt-search",
  ].forEach((id) => {
    $(id).addEventListener("input", () => renderTable());
    $(id).addEventListener("change", () => renderTable());
  });

  $("btn-clear-filters").addEventListener("click", () => {
    $("flt-subject").value = "";
    $("flt-system").value = "";
    $("flt-topic").value = "";
    $("flt-outcome").value = "";
    $("flt-study").value = "";
    $("flt-search").value = "";
    renderTable();
  });

  $("btn-select-visible").addEventListener("click", () => {
    for (const r of getFilteredRows()) selectedQids.add(rowQid(r));
    renderTable();
    updateStats();
  });

  $("btn-clear-selection").addEventListener("click", () => {
    selectedQids.clear();
    renderTable();
    updateStats();
  });

  $("chk-all-page").addEventListener("change", () => {
    const on = $("chk-all-page").checked;
    document.querySelectorAll(".row-chk").forEach((c) => {
      c.checked = on;
      const id = c.getAttribute("data-qid");
      if (on) selectedQids.add(id);
      else selectedQids.delete(id);
    });
    updateStats();
  });

  document.querySelectorAll("th[data-sort-key]").forEach((th) => {
    th.querySelector(".th-sort")?.addEventListener("click", () => {
      const k = th.getAttribute("data-sort-key");
      if (sortKey === k) sortDir *= -1;
      else {
        sortKey = k;
        sortDir = 1;
      }
      document.querySelectorAll("th[data-sort-key]").forEach((h) => {
        const sk = h.getAttribute("data-sort-key");
        h.setAttribute(
          "aria-sort",
          sk === sortKey ? (sortDir > 0 ? "ascending" : "descending") : "none"
        );
        const ind = h.querySelector(".sort-ind");
        if (ind)
          ind.textContent =
            sk === sortKey ? (sortDir > 0 ? "▲" : "▼") : "";
      });
      renderTable();
    });
  });

  $("btn-random-quiz").addEventListener("click", () => {
    const n = Math.max(1, parseInt($("inp-random-n").value, 10) || 1);
    const rows = shuffleArray(getFilteredRows()).slice(0, n);
    startQuiz(rows.map(rowQid));
  });

  $("btn-quiz-selected").addEventListener("click", () => {
    startQuiz([...selectedQids]);
  });

  $("btn-refresh").addEventListener("click", async () => {
    try {
      await fetch(invalidateUrl(), { method: "POST" });
    } catch (_) { }
    loadManifest();
  });

  $("modal-close").addEventListener("click", closeModal);
  $("modal-backdrop").addEventListener("click", (ev) => {
    if (ev.target.id === "modal-backdrop") closeModal();
  });

  $("modal-flag").addEventListener("click", () => {
    if (!openQuestion) return;
    const qid = String(openQuestion.question_id ?? "");
    const f = loadFlagged();
    if (f.has(qid)) f.delete(qid);
    else f.add(qid);
    saveFlagged(f);
    updateModalFlag(qid);
    updateStats();
    if (activeTab === "flagged") renderTable();
  });

  $("quiz-prev").addEventListener("click", () => {
    if (!quizSession || quizSession.i <= 0) return;
    quizSession.i--;
    openModal(quizSession.qids[quizSession.i], true);
  });

  $("quiz-next").addEventListener("click", () => {
    if (!quizSession || quizSession.i >= quizSession.qids.length - 1) return;
    quizSession.i++;
    openModal(quizSession.qids[quizSession.i], true);
  });

  $("modal-zoom-in").addEventListener("click", () =>
    setModalTextZoom(Math.min(1.6, modalTextZoom() + 0.08))
  );
  $("modal-zoom-out").addEventListener("click", () =>
    setModalTextZoom(Math.max(0.75, modalTextZoom() - 0.08))
  );
  $("modal-zoom-reset").addEventListener("click", () => setModalTextZoom(1));

  [
    "set-quiz-mode",
    "set-shuffle",
    "set-ghost-mode",
    "set-highlight-correct",
    "set-track-attempts",
  ].forEach((id) => {
    $(id).addEventListener("change", () => {
      if (openQuestion) {
        const qid = String(openQuestion.question_id ?? "");
        $("modal-body").innerHTML = renderModalBody(openQuestion, qid);
        wireModalInteractions(qid, openQuestion);
      }
    });
  });

  function updateGenCommandPreview() {
    const slug = ($("gen-concept-select").value || "").trim();
    const cmd = slug ? `/nbme-gen concept=${slug}` : `/nbme-gen`;
    $("gen-command-text").textContent = cmd;
  }

  function closeGenModal() {
    $("gen-modal-backdrop").classList.add("hidden");
  }

  async function openGenModal() {
    $("gen-modal-backdrop").classList.remove("hidden");
    const sel = $("gen-concept-select");
    sel.innerHTML = '<option value="">(default)</option>';
    try {
      const r = await fetch("/api/generated/concepts");
      if (r.ok) {
        const data = await r.json();
        for (const c of data.concepts || []) {
          const slug = String(c.slug || "");
          if (!slug) continue;
          const o = document.createElement("option");
          o.value = slug;
          o.textContent = slug;
          sel.appendChild(o);
        }
      }
    } catch (_) { }
    updateGenCommandPreview();
  }

  $("btn-nbme-gen")?.addEventListener("click", () => openGenModal());
  $("gen-concept-select")?.addEventListener("change", updateGenCommandPreview);
  $("gen-modal-close")?.addEventListener("click", closeGenModal);
  $("gen-modal-dismiss")?.addEventListener("click", closeGenModal);
  $("gen-modal-backdrop")?.addEventListener("click", (ev) => {
    if (ev.target.id === "gen-modal-backdrop") closeGenModal();
  });
  $("gen-copy-cmd")?.addEventListener("click", async () => {
    const t = $("gen-command-text").textContent || "";
    try {
      await navigator.clipboard.writeText(t);
    } catch (e) {
      alert(String(e));
    }
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Escape") return;
    if (!$("gen-modal-backdrop").classList.contains("hidden")) {
      closeGenModal();
      return;
    }
    if (!$("modal-backdrop").classList.contains("hidden")) {
      closeModal();
    }
  });

  initTheme();
  $("panel-library").classList.remove("hidden");
  syncNbmeGenBtn();
  loadManifest();
})();
