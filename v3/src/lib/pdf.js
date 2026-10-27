/*
 * Lazy pdf.js access. Pages are rendered once per (src, page, width) and cached as object URLs,
 * so the 3D lecture covers, the viewer stage, the filmstrip and the grid all share bitmaps.
 */
let libPromise
function lib() {
  if (!libPromise) {
    libPromise = Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(([pdfjs, worker]) => {
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default
      return pdfjs
    })
  }
  return libPromise
}

const docs = new Map()
export function loadPdf(src) {
  if (!docs.has(src)) docs.set(src, lib().then((pdfjs) => pdfjs.getDocument({ url: src, isEvalSupported: false }).promise))
  return docs.get(src)
}

export async function pageCount(src) {
  return (await loadPdf(src)).numPages
}

const pages = new Map()
export function renderPage(src, pageNo, width) {
  const w = Math.round(width / 64) * 64 || 64
  const key = src + '#' + pageNo + '@' + w
  if (!pages.has(key)) {
    const p = (async () => {
      const doc = await loadPdf(src)
      const page = await doc.getPage(pageNo)
      const base = page.getViewport({ scale: 1 })
      const viewport = page.getViewport({ scale: w / base.width })
      const canvas = document.createElement('canvas')
      canvas.width = Math.ceil(viewport.width)
      canvas.height = Math.ceil(viewport.height)
      await page.render({ canvas, viewport }).promise
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92))
      return { url: URL.createObjectURL(blob), w: canvas.width, h: canvas.height }
    })()
    p.then((v) => { p.settled = v }, () => {})
    pages.set(key, p)
  }
  return pages.get(key)
}

/* Synchronous lookup of the best already-rendered bitmap for a page (for instant placeholders). */
export function cachedPage(src, pageNo) {
  let best = null
  for (const [key, p] of pages) {
    if (!key.startsWith(src + '#' + pageNo + '@')) continue
    const w = Number(key.split('@')[1])
    if (p.settled && (!best || w > best.w)) best = p.settled
  }
  return best
}
