import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
const data = new Uint8Array(fs.readFileSync(path.join(root, 'reference/Lahoti_Yash_Publications.pdf')))
const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise

const allLines = []
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p)
  const viewport = page.getViewport({ scale: 1 })
  const mid = viewport.width / 2
  const tc = await page.getTextContent()

  const buckets = { L: new Map(), R: new Map() }
  for (const it of tc.items) {
    const x = it.transform[4]
    const y = Math.round(it.transform[5] * 2) / 2
    const col = x < mid - 10 ? 'L' : 'R'
    if (!buckets[col].has(y)) buckets[col].set(y, [])
    buckets[col].get(y).push({ x, str: it.str })
  }

  for (const col of ['L', 'R']) {
    const rows = [...buckets[col].entries()].sort((a, b) => b[0] - a[0])
    for (const [, cells] of rows) {
      let text = cells.sort((a, b) => a.x - b.x).map((c) => c.str).join(' ').replace(/\s+/g, ' ').trim()
      if (!text) continue
      // unwrap duplicated fragments like "Foo Foo" / "Bar Bar"
      text = undupe(text)
      allLines.push(text)
    }
    allLines.push('---COL---')
  }
  allLines.push('---PAGE---')
}

function undupe(s) {
  // exact doubled string
  const half = Math.floor(s.length / 2)
  if (s.length > 8 && s.slice(0, half).trim() === s.slice(half).trim()) return s.slice(0, half).trim()
  // word-wise: "A B A B" → "A B"
  const w = s.split(' ')
  if (w.length >= 4 && w.length % 2 === 0) {
    const h = w.length / 2
    if (w.slice(0, h).join(' ') === w.slice(h).join(' ')) return w.slice(0, h).join(' ')
  }
  // consecutive duplicated tokens "Type: Type:" → "Type:"
  const out = []
  for (let i = 0; i < w.length; i++) {
    if (w[i] === w[i + 1] && /:$/.test(w[i])) { out.push(w[i]); i++; continue }
    out.push(w[i])
  }
  return out.join(' ')
}

fs.writeFileSync(path.join(root, 'reference/pubs-lines.txt'), allLines.join('\n'))

const LABELS = [
  'Type:', 'Author(s):', 'Author(s)/Presenter(s):', 'Chapter Author(s):',
  'First/Senior Author:', 'Publication Name:', 'Issue Number:', 'Year:',
  'PubMed ID:', 'Publication Volume:', 'Pages:', 'Website (if indicated):',
  'Event/Meeting:', 'Address:', 'Month/Year:', 'Book Title:', 'Editor(s):',
  'Publisher(s):', 'Publication Status:',
]

function parseBlock(block) {
  const map = {}
  let titleParts = []
  let mode = 'title'
  for (const line of block) {
    const label = LABELS.find((l) => line === l || line.startsWith(l + ' ') || line.startsWith(l))
    if (label && (line === label || line.startsWith(label))) {
      mode = label
      const rest = line.slice(label.length).replace(/^[:\s]+/, '').trim()
      map[label] = rest ? [rest] : []
      continue
    }
    if (mode === 'title') {
      if (!/^(PUBLICATIONS|Peer-Reviewed|Presentations|Other Publications|---)/i.test(line)) titleParts.push(line)
    } else if (mode) {
      map[mode] = map[mode] || []
      map[mode].push(line)
    }
  }
  const get = (l) => (map[l] || []).join(' ').replace(/\s+/g, ' ').trim()
  let title = undupe(titleParts.join(' ').replace(/\s+/g, ' ').trim())
  // strip leading junk from previous field bleed
  title = title.replace(/^(yes|no|N\/A|NA|\d+)\s+/i, '').trim()
  return { title, get }
}

// Split into blocks on Type:
const items = []
let buf = []
let capturing = false
for (const line of allLines) {
  if (line === '---COL---' || line === '---PAGE---') {
    if (capturing && buf.length) { flush(buf); buf = []; capturing = false }
    continue
  }
  if (line === 'Type:' || line.startsWith('Type: ')) {
    if (capturing && buf.length) flush(buf)
    buf = [line.startsWith('Type:') ? line : 'Type:']
    if (line.length > 5) buf.push(line) // rare
    // normalize
    buf = ['Type:']
    const rest = line.slice(5).replace(/^[:\s]+/, '').trim()
    if (rest) buf.push(rest)
    capturing = true
    continue
  }
  if (capturing) buf.push(line)
}
if (capturing && buf.length) flush(buf)

function flush(block) {
  // prepend title lines: walk wasn't used; titles sit BEFORE Type: so we need a different approach
}

// Better: find Type: indices and take title from preceding non-label lines within same col buffer
const starts = []
for (let i = 0; i < allLines.length; i++) {
  if (allLines[i] === 'Type:' || allLines[i].startsWith('Type: ')) starts.push(i)
}

for (let s = 0; s < starts.length; s++) {
  const from = starts[s]
  let to = s + 1 < starts.length ? starts[s + 1] : allLines.length
  // don't cross column/page markers
  for (let k = from + 1; k < to; k++) {
    if (allLines[k] === '---COL---' || allLines[k] === '---PAGE---') { to = k; break }
  }
  const titleParts = []
  for (let j = from - 1; j >= 0; j--) {
    const p = allLines[j]
    if (p === '---COL---' || p === '---PAGE---') break
    if (p === 'Type:' || LABELS.some((l) => p === l || p.startsWith(l + ' '))) break
    if (/^(PUBLICATIONS|Peer-Reviewed|Presentations|Other Publications)$/i.test(p)) break
    titleParts.unshift(p)
  }
  const block = allLines.slice(from, to)
  // If first line is "Type: Peer-Reviewed..."
  if (block[0].startsWith('Type:') && block[0].length > 5) {
    block[0] = block[0].slice(5).replace(/^[:\s]+/, '').trim()
    block.unshift('Type:')
  }

  const { title: t0, get } = parseBlock([...titleParts.map((x) => x), ...block])
  // parseBlock expects title then fields; rebuild manually
  const getF = (label) => {
    const i = block.findIndex((l) => l === label || l.startsWith(label + ' '))
    if (i < 0) return ''
    if (block[i].startsWith(label) && block[i].length > label.length) {
      const rest = block[i].slice(label.length).replace(/^[:\s]+/, '').trim()
      if (rest) return rest
    }
    const vals = []
    for (let j = i + 1; j < block.length; j++) {
      const l = block[j]
      if (LABELS.some((lb) => l === lb || l.startsWith(lb + ' ')) || l === 'Type:') break
      vals.push(l)
    }
    return vals.join(' ').replace(/\s+/g, ' ').trim()
  }

  let title = undupe(titleParts.join(' ').replace(/\s+/g, ' ').trim())
  title = title.replace(/^(yes|no|N\/A|NA|\d+|Epub ahead of print|Submitted|In Press|In revision)\s+/i, '').trim()
  // strip trailing URL fragments that leaked
  title = title.replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim()
  if (!title || title.length < 15) continue
  if (/^(24\/|37\/|09\/|20\/|81\/|47\/|66\/|86\/)/.test(title)) continue

  const typeRaw = getF('Type:') || (block[1] || '')
  const authors = getF('Author(s):') || getF('Author(s)/Presenter(s):') || getF('Chapter Author(s):')
  const yearRaw = getF('Year:') || getF('Month/Year:')
  const year = Number(String(yearRaw).match(/\d{4}/)?.[0]) || 0
  let venue = getF('Publication Name:') || getF('Book Title:') || getF('Event/Meeting:')
  venue = venue.replace(/\s+/g, ' ').trim()
  const pubmed = getF('PubMed ID:')
  const first = /^yes$/i.test(getF('First/Senior Author:'))
  let status = getF('Publication Status:') || undefined
  let url = getF('Website (if indicated):').replace(/\s+/g, '')
  if (url && !/^https?:/.test(url)) url = ''
  // fix broken pubmed urls like ...42071024/ split
  if (url) url = url.replace(/(pubmed\.ncbi\.nlm\.nih\.gov\/\d+)\s*(\d+\/)/, '$1$2').replace(/\s+/g, '')
  if (!url && pubmed && !/^N\/?A$/i.test(pubmed)) url = `https://pubmed.ncbi.nlm.nih.gov/${pubmed}/`

  let type = 'Abstract'
  if (/Book Chapter/i.test(typeRaw)) type = 'Chapter'
  else if (/Article/i.test(typeRaw)) type = 'Manuscript'
  else if (/Presentation/i.test(typeRaw)) type = 'Presentation'
  else if (/Abstract/i.test(typeRaw)) type = 'Abstract'

  if (/Not Published/i.test(typeRaw) && !status) status = 'Submitted'
  if (/In Press/i.test(status || typeRaw)) status = 'In Press'
  if (/revision/i.test(status || '')) status = 'In revision'
  if (/Submitted/i.test(status || '')) status = 'Submitted'

  let fieldTag = 'Orthopedics'
  const blob = title + ' ' + venue
  if (/Ophthal|Vision|Glaucoma|Retinal|IOVS|Investigative Ophthalmology|ARVO|Eye|TVST|AIVO|Artificial Intelligence in Vision|Doppler holography|FAZ|perfusion|cup-to-disc/i.test(blob)) fieldTag = 'Ophthalmology'
  else if (/Gastro|Crohn|IBD|body composition|inflammatory bowel|Gastroenterology|fistulizing/i.test(blob)) fieldTag = 'Gastroenterology'
  else if (/mtDNA|Nature Methods|biobank|Mitochondrial/i.test(blob)) fieldTag = 'Genomics'

  const slug = (title.toLowerCase().match(/[a-z0-9]+/g) || []).slice(0, 6).join('-')
  const id = `${slug}-${year || 'x'}`

  const abstract = (() => {
    const lead = first ? 'First-author' : 'Collaborative'
    if (type === 'Manuscript') return `${lead} manuscript in ${venue || 'peer review'}${year ? ` (${year})` : ''}. ${title}.`
    if (type === 'Presentation') return `${lead} presentation at ${venue || 'meeting'}${year ? ` (${year})` : ''}. ${title}.`
    if (type === 'Chapter') return `Book chapter${year ? ` (${year})` : ''}. ${title}.`
    return `${lead} abstract in ${venue || 'proceedings'}${year ? ` (${year})` : ''}. ${title}.`
  })()

  items.push({
    id, type, field: fieldTag, venue, year: year || undefined,
    status: status || undefined,
    featured: false,
    first,
    title,
    authors: authors.replace(/\s+/g, ' ').trim(),
    url: url || undefined,
    pubmed: pubmed && !/^N\/?A$/i.test(pubmed) ? pubmed : undefined,
    abstract,
  })
}

// Deduplicate near-identical titles
const uniq = []
for (const it of items) {
  const key = it.title.toLowerCase().slice(0, 48)
  if (uniq.some((u) => u.title.toLowerCase().slice(0, 48) === key)) continue
  uniq.push(it)
}

const publishedMs = uniq.filter((it) => it.type === 'Manuscript' && (!it.status || /Press/i.test(it.status || '')))
  .sort((a, b) => (b.first - a.first) || ((b.year || 0) - (a.year || 0)))
publishedMs.slice(0, 4).forEach((it) => { it.featured = true })

fs.writeFileSync(path.join(root, 'reference/pubs-parsed.json'), JSON.stringify(uniq, null, 2))
console.log('count', uniq.length)
console.log('by type', Object.fromEntries(['Manuscript', 'Abstract', 'Presentation', 'Chapter'].map((t) => [t, uniq.filter((i) => i.type === t).length])))
console.log('featured:')
uniq.filter((i) => i.featured).forEach((i) => console.log(' -', i.year, i.title.slice(0, 72)))
uniq.forEach((it, i) => console.log(String(i + 1).padStart(2), it.type.padEnd(13), String(it.year || '—').padEnd(4), (it.venue || '').slice(0, 22).padEnd(22), it.first ? '*' : ' ', it.title.slice(0, 60)))
