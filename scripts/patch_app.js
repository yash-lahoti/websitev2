import fs from 'fs';

let code = fs.readFileSync('public/medjarvis/app.js', 'utf8');

code = code.replace(/function manifestUrl\(\) \{[\s\S]*?\}/, 'function manifestUrl() { return "/medjarvis-manifest.json"; }');

code = code.replace(/function invalidateUrl\(\) \{[\s\S]*?\}/, 'function invalidateUrl() { return null; }');

code = code.replace(/async function patchOutcome[\s\S]*?return r\.json\(\);\n  \}/, 'async function patchOutcome(qid, outcome, letter) { return { status: "ignored" }; }');

const fetchQ = `async function fetchQuestion(qid) {
    const row = manifest.questions.find(q => q.question_id === qid);
    if (!row || !row.source_file) return null;
    
    const url = \`/generated-questions/\${row.source_file}\`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const raw = await r.json();

    const stemBlock = raw.stem ? \`<div class="nbme-stem">\${escParagraphs(raw.stem)}</div>\` : "";
    const leadBlock = raw.lead_in ? \`<p class="nbme-lead-in"><strong>\${escapeHtml(raw.lead_in)}</strong></p>\` : "";
    const correct = (raw.correct_answer || "").trim().toUpperCase().substring(0,4);

    const answer_choices = [];
    if (raw.options) {
       const letters = Object.keys(raw.options).sort();
       for (const letter of letters) {
          const let_u = letter.trim().toUpperCase().substring(0,4);
          answer_choices.push({
             letter: let_u,
             text: raw.options[letter],
             is_correct: let_u === correct,
             is_selected: false
          });
       }
    }

    return Object.assign({}, raw, {
      question_html: stemBlock + leadBlock,
      question_text: \`\${raw.stem || ""}\\n\\n\${raw.lead_in || ""}\`.trim(),
      answer_choices: answer_choices,
      explanation_html: escParagraphs(raw.explanation || ""),
      _generated_meta: { tags: raw.tags || [] }
    });
  }`;

code = code.replace(/async function fetchQuestion\(qid\) \{[\s\S]*?return r\.json\(\);\n  \}/, fetchQ);

fs.writeFileSync('public/medjarvis/app.js', code);
console.log("Patched public/medjarvis/app.js");
