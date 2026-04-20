import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('./public');

// --- QBank Manifest Builder ---
const GENERATED_DIR = path.join(PUBLIC_DIR, 'generated-questions');
const QB_MANIFEST_PATH = path.join(PUBLIC_DIR, 'medjarvis-manifest.json');

function buildQBankManifest() {
    if (!fs.existsSync(GENERATED_DIR)) {
        console.log(`[MedJarvis] No ${GENERATED_DIR} found. Creating empty manifest.`);
        fs.writeFileSync(QB_MANIFEST_PATH, JSON.stringify({ count: 0, questions: [] }, null, 2));
        return;
    }

    const examplesDir = path.join(GENERATED_DIR, 'examples');
    const files = [];

    if (fs.existsSync(examplesDir)) {
        const items = fs.readdirSync(examplesDir).filter(f => f.endsWith('.json'));
        for (const f of items) {
            if (f.startsWith('eval-')) continue;
            try {
                const data = JSON.parse(fs.readFileSync(path.join(examplesDir, f), 'utf8'));
                if (data.question_id || data.stem) files.push({ relName: `examples/${f}`, data });
            } catch (e) { }
        }
    }

    const rootItems = fs.readdirSync(GENERATED_DIR).filter(f => f.endsWith('.json'));
    for (const f of rootItems) {
        if (f.startsWith('eval-') || ['index.json', 'schema.json', 'eval-schema.json', 'viewer-registry.json'].includes(f)) continue;
        try {
            const data = JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, f), 'utf8'));
            const qid = data.question_id || f.replace('.json', '');
            if ((data.question_id || data.stem) && !files.find(x => (x.data.question_id || '') === qid)) {
                files.push({ relName: f, data });
            }
        } catch (e) { }
    }

    let registry = { questions: [] };
    const regPath = path.join(GENERATED_DIR, 'viewer-registry.json');
    if (fs.existsSync(regPath)) {
        try { registry = JSON.parse(fs.readFileSync(regPath, 'utf8')); } catch (e) { }
    }

    const rows = files.map(({ relName, data }) => {
        const qid = data.question_id;
        let evalTotal = null, evalMax = null;
        const evalPath = path.join(GENERATED_DIR, `eval-${qid}.json`);
        if (fs.existsSync(evalPath)) {
            try {
                const ev = JSON.parse(fs.readFileSync(evalPath, 'utf8'));
                evalTotal = ev.total_score ? parseInt(ev.total_score) : null;
                evalMax = ev.total_max ? parseInt(ev.total_max) : null;
            } catch (e) { }
        }

        const entry = registry.questions.find(q => q.question_id === qid) || {};
        const outcome = entry.quiz_outcome ? (entry.quiz_outcome.toLowerCase() === 'correct' ? 'Correct' : 'Incorrect') : '';
        const concepts = data.source_concepts || [];

        return {
            question_id: qid,
            bank: "generated",
            subject: concepts.length > 0 ? concepts[0] : "",
            system: data.system || "",
            topic: data.topic || "",
            subtopic: data.subtopic || "",
            difficulty: data.difficulty || "",
            question_type: data.question_type || "",
            outcome,
            pct_answered_correctly: null,
            source_file: relName,
            eval_file: fs.existsSync(evalPath) ? `eval-${qid}.json` : null,
            eval_total_score: evalTotal,
            eval_total_max: evalMax,
            sort_order: parseInt(entry.sort_order || 0),
            registry_tags: Array.isArray(entry.tags) ? entry.tags : [],
            registry_notes: entry.notes || "",
        };
    });

    fs.writeFileSync(QB_MANIFEST_PATH, JSON.stringify({ count: rows.length, questions: rows }, null, 2));
    console.log(`[MedJarvis] Generated QBank manifest: ${rows.length} questions`);
}

// --- Wiki Manifest Builder ---
const WIKI_DIR = path.join(PUBLIC_DIR, 'wiki');
const WIKI_MANIFEST_PATH = path.join(PUBLIC_DIR, 'wiki-manifest.json');

function walkWikiDir(dir, baseRoute = '') {
    const result = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        // Ignore hidden files and specific dirs
        if (item.startsWith('.')) continue;
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        const relRoute = baseRoute ? `${baseRoute}/${item}` : item;

        if (stat.isDirectory()) {
            result.push({
                type: 'directory',
                name: item,
                path: relRoute,
                children: walkWikiDir(fullPath, relRoute)
            });
        } else if (item.endsWith('.md')) {
            result.push({
                type: 'file',
                name: item,
                path: relRoute
            });
        }
    }
    // Sort dirs first, then files
    return result.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'directory' ? -1 : 1;
    });
}

function buildWikiManifest() {
    if (!fs.existsSync(WIKI_DIR)) {
        console.log(`[MedJarvis] No ${WIKI_DIR} found. Creating empty wiki manifest.`);
        fs.writeFileSync(WIKI_MANIFEST_PATH, JSON.stringify([], null, 2));
        return;
    }

    const tree = walkWikiDir(WIKI_DIR);
    // Optional: We only want concepts, factoids, and questions directories based on previous constraints requested by the user, but we'll include all for now and filter visually.
    fs.writeFileSync(WIKI_MANIFEST_PATH, JSON.stringify(tree, null, 2));
    console.log('[MedJarvis] Generated Wiki manifest tree');
}

buildQBankManifest();
buildWikiManifest();
