import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'motion/react'
import { brand, lectures, publications } from '../data/content'
import { closeLecture, endReturn, getViewerState, openLecture, originFor, useViewer } from '../lib/viewer-store'
import { cachedPage, pageCount, renderPage } from '../lib/pdf'
import './slide-viewer.css'

/*
 * Lecture viewer. The slide lifts off its card (3D ribbon or DOM origin) with a FLIP, then
 * becomes a stage with keyboard / wheel / swipe / edge-zone navigation, an auto-hiding
 * filmstrip, a grid overview (G or pinch-in), double-click zoom with pan, and deep links
 * (#lecture/<id>/<page>). There is deliberately no download affordance.
 */
const EASE = [0.16, 1, 0.3, 1]
const byId = Object.fromEntries([
  ...lectures.items.map((l) => [l.id, l]),
  ...publications.items.filter((p) => p.pdf).map((p) => [p.id, { id: p.id, title: p.title, event: p.venue, date: String(p.year), src: p.pdf }]),
  ['cv', { id: 'cv', title: 'Residency Application', event: brand.name, date: 'Resume', src: brand.cv }],
  ['pubs-list', { id: 'pubs-list', title: 'Publication List', event: brand.name, date: 'Pubs', src: brand.pubsList }],
])
const pad = (v) => String(v).padStart(2, '0')
const DPR = () => Math.min(2, window.devicePixelRatio || 1)

function fitRect(aspect, vw, vh) {
  const mobile = vw < 760
  const padX = mobile ? 12 : Math.max(76, vw * 0.075)
  const padTop = mobile ? 72 : 86
  const padBot = mobile ? 118 : 108
  const maxW = vw - padX * 2
  const maxH = vh - padTop - padBot
  const w = Math.min(maxW, maxH * aspect)
  const h = w / aspect
  return { left: (vw - w) / 2, top: padTop + (maxH - h) / 2, width: w, height: h }
}

const onScreen = (r) => r && r.width > 24 && r.top < window.innerHeight && r.top + r.height > 0 && r.left < window.innerWidth && r.left + r.width > 0

function flipFrom(r, frame) {
  if (!onScreen(r)) return { x: 0, y: 28, scaleX: 0.96, scaleY: 0.96, opacity: 0 }
  const ra = r.width / r.height
  const fa = frame.width / frame.height
  if (Math.abs(ra - fa) / fa > 0.18) {
    // origin isn't page-shaped (a button, a row): grow uniformly out of its centre instead of stretching
    const s = Math.min(r.width / frame.width, r.height / frame.height) * 1.6
    return {
      x: r.left + r.width / 2 - (frame.width * s) / 2 - frame.left,
      y: r.top + r.height / 2 - (frame.height * s) / 2 - frame.top,
      scaleX: s, scaleY: s, opacity: 0,
    }
  }
  return { x: r.left - frame.left, y: r.top - frame.top, scaleX: r.width / frame.width, scaleY: r.height / frame.height, opacity: 1 }
}

function usePage(src, p, width) {
  const [img, setImg] = useState(() => cachedPage(src, p))
  useEffect(() => {
    let alive = true
    const have = cachedPage(src, p)
    if (have) setImg(have)
    if (have && have.w >= width * 0.92) return
    renderPage(src, p, width).then((v) => { if (alive) setImg(v) }, () => {})
    return () => { alive = false }
  }, [src, p, width])
  return img
}

function useThumbs(src, n, start) {
  const [urls, setUrls] = useState([])
  useEffect(() => {
    if (!n || !start) return
    let alive = true
    ;(async () => {
      for (let p = 1; p <= n && alive; p++) {
        try {
          const v = await renderPage(src, p, 384)
          if (alive) setUrls((u) => { const c = u.slice(); c[p - 1] = v.url; return c })
        } catch { /* skip unreadable page */ }
      }
    })()
    return () => { alive = false }
  }, [src, n, start])
  return urls
}

export default function SlideViewer({ ready }) {
  const vs = useViewer()
  const lec = vs.id ? byId[vs.id] : null

  useEffect(() => {
    if (!ready) return
    const fromHash = () => {
      const m = window.location.hash.match(/^#lecture\/([\w-]+)(?:\/(\d+))?/)
      if (!m || !byId[m[1]]) return
      const cur = getViewerState()
      if (!cur.open || cur.id !== m[1]) openLecture(m[1], { page: Number(m[2]) || 1 })
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [ready])

  return (
    <AnimatePresence onExitComplete={endReturn}>
      {vs.open && lec && <Viewer key={vs.id + vs.at} lec={lec} vs={vs} />}
    </AnimatePresence>
  )
}

function Viewer({ lec, vs }) {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight })
  const [n, setN] = useState(0)
  const [page, setPage] = useState(vs.page)
  const [dir, setDir] = useState(1)
  const [mode, setMode] = useState('stage')
  const [zoom, setZoom] = useState(1)
  const [chrome, setChrome] = useState(true)
  const [closing, setClosing] = useState(null)
  const [enterFrom, setEnterFrom] = useState(() => vs.origin || vs.el?.getBoundingClientRect() || null)
  const [gridFrom, setGridFrom] = useState(null)
  const [aspect, setAspect] = useState(() => (vs.cover ? vs.cover.w / vs.cover.h : cachedPage(lec.src, 1) ? cachedPage(lec.src, 1).w / cachedPage(lec.src, 1).h : 16 / 9))
  const [hint, setHint] = useState(() => !sessionStorage.getItem('sv-hint'))
  const root = useRef(null)
  const closeBtn = useRef(null)
  const strip = useRef(null)
  const hold = useRef(false)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const frame = fitRect(aspect, vp.w, vp.h)
  const stageW = Math.min(3200, Math.round(frame.width * DPR()))
  const thumbs = useThumbs(lec.src, n, true)
  const cover = vs.cover?.url || cachedPage(lec.src, 1)?.url

  useEffect(() => {
    pageCount(lec.src).then(setN, () => {})
    renderPage(lec.src, 1, 640).then((v) => setAspect(v.w / v.h), () => {})
  }, [lec.src])

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    const prevFocus = document.activeElement
    const prevHash = window.location.hash.startsWith('#lecture/') ? '' : window.location.hash
    window.__lenis?.stop()
    document.documentElement.classList.add('is-viewing')
    closeBtn.current?.focus({ preventScroll: true })
    return () => {
      window.removeEventListener('resize', onResize)
      window.__lenis?.start()
      document.documentElement.classList.remove('is-viewing')
      history.replaceState(null, '', window.location.pathname + window.location.search + prevHash)
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (!closing) history.replaceState(null, '', `#lecture/${lec.id}/${page}`)
  }, [lec.id, page, closing])

  useEffect(() => {
    if (!hint) return
    const t = setTimeout(() => { setHint(false); sessionStorage.setItem('sv-hint', '1') }, 3600)
    return () => clearTimeout(t)
  }, [hint])

  // neighbours render ahead so flips are instant
  useEffect(() => {
    if (!n) return
    ;[page + 1, page - 1, page + 2].forEach((q) => { if (q >= 1 && q <= n) renderPage(lec.src, q, stageW).catch(() => {}) })
  }, [page, n, lec.src, stageW])

  useEffect(() => {
    const el = strip.current?.children[page - 1]
    if (!el || !strip.current) return
    const s = strip.current
    animate(s.scrollLeft, el.offsetLeft - s.clientWidth / 2 + el.clientWidth / 2, { duration: 0.6, ease: EASE, onUpdate: (v) => { s.scrollLeft = v } })
  }, [page, thumbs.length])

  const go = useCallback((p) => {
    setPage((cur) => {
      const max = n || cur
      const next = Math.max(1, Math.min(max, p))
      if (next !== cur) { setDir(next > cur ? 1 : -1); setZoom(1); panX.set(0); panY.set(0) }
      return next
    })
  }, [n, panX, panY])

  const zoomAt = useCallback((cx, cy) => {
    if (zoom > 1) {
      setZoom(1)
      animate(panX, 0, { duration: 0.5, ease: EASE }); animate(panY, 0, { duration: 0.5, ease: EASE })
      return
    }
    const px = cx - (frame.left + frame.width / 2)
    const py = cy - (frame.top + frame.height / 2)
    setZoom(2)
    animate(panX, Math.max(-frame.width / 2, Math.min(frame.width / 2, -px)), { duration: 0.6, ease: EASE })
    animate(panY, Math.max(-frame.height / 2, Math.min(frame.height / 2, -py)), { duration: 0.6, ease: EASE })
  }, [zoom, frame.left, frame.top, frame.width, frame.height, panX, panY])

  const close = useCallback(() => {
    if (closing) return
    const r = vs.el ? vs.el.getBoundingClientRect() : vs.source === 'ribbon' ? originFor(lec.id) : vs.origin
    setClosing({ to: r })
    setChrome(false)
    requestAnimationFrame(() => requestAnimationFrame(closeLecture))
  }, [closing, vs, lec.id])

  const openGrid = useCallback(() => {
    if (!n) return
    setZoom(1); panX.set(0); panY.set(0)
    setGridFrom(fitRect(aspect, window.innerWidth, window.innerHeight))
    setMode('grid')
  }, [n, aspect, panX, panY])

  const pick = useCallback((p, el) => {
    setEnterFrom(el ? el.getBoundingClientRect() : null)
    setDir(p >= page ? 1 : -1)
    setPage(p)
    setMode('stage')
  }, [page])

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && /^[sp]$/i.test(e.key)) { e.preventDefault(); return }
      if (e.key === 'Escape') {
        e.preventDefault()
        if (zoom > 1) zoomAt(0, 0)
        else if (mode === 'grid') pick(page, root.current?.querySelector(`[data-p="${page}"]`))
        else close()
        return
      }
      if (e.key === 'g' || e.key === 'G') { mode === 'grid' ? pick(page, root.current?.querySelector(`[data-p="${page}"]`)) : openGrid(); return }
      if (mode !== 'stage') return
      if (['ArrowRight', 'PageDown', ' ', 'l'].includes(e.key)) { e.preventDefault(); go(page + 1) }
      else if (['ArrowLeft', 'PageUp', 'h'].includes(e.key)) { e.preventDefault(); go(page - 1) }
      else if (e.key === 'Home') go(1)
      else if (e.key === 'End') go(n)
      else if (e.key === 'z' || e.key === 'Z') zoomAt(frame.left + frame.width / 2, frame.top + frame.height / 2)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, n, mode, zoom, go, zoomAt, close, openGrid, pick, frame.left, frame.top, frame.width, frame.height])

  // wheel / trackpad: one flip per gesture; ctrl+wheel (trackpad pinch) zooms or opens the grid
  const wheel = useRef({ acc: 0, locked: false, lockAt: 0, last: 0 })
  useEffect(() => {
    const el = root.current
    const onWheel = (e) => {
      if (e.target.closest('[data-lenis-prevent]')) return
      e.preventDefault()
      if (mode !== 'stage' || closing) return
      const w = wheel.current
      const now = performance.now()
      const gap = now - w.last
      w.last = now
      if (zoom > 1 && !e.ctrlKey) {
        panX.set(Math.max(-frame.width / 2, Math.min(frame.width / 2, panX.get() - e.deltaX)))
        panY.set(Math.max(-frame.height / 2, Math.min(frame.height / 2, panY.get() - e.deltaY)))
        return
      }
      if (w.locked && (gap > 160 || now - w.lockAt > 1000)) w.locked = false
      if (w.locked) return
      if (gap > 160) w.acc = 0
      if (e.ctrlKey) {
        w.acc += e.deltaY
        if (w.acc < -12) { zoomAt(e.clientX, e.clientY); w.locked = true; w.lockAt = now; w.acc = 0 }
        else if (w.acc > 12) { if (zoom > 1) zoomAt(0, 0); else openGrid(); w.locked = true; w.lockAt = now; w.acc = 0 }
        return
      }
      w.acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(w.acc) > 40) { go(page + Math.sign(w.acc)); w.locked = true; w.lockAt = now; w.acc = 0 }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [mode, zoom, closing, page, go, zoomAt, openGrid, panX, panY, frame.width, frame.height])

  // touch pinch: in → grid, out → zoom
  const pinch = useRef({ pts: new Map(), d0: 0 })
  const onPointerDown = (e) => {
    poke()
    if (e.pointerType !== 'touch') return
    const P = pinch.current
    P.pts.set(e.pointerId, [e.clientX, e.clientY])
    if (P.pts.size === 2) { const [a, b] = [...P.pts.values()]; P.d0 = Math.hypot(a[0] - b[0], a[1] - b[1]) }
  }
  const onPointerMove = (e) => {
    if (e.pointerType !== 'touch') { poke(); return }
    const P = pinch.current
    if (P.pts.has(e.pointerId)) P.pts.set(e.pointerId, [e.clientX, e.clientY])
  }
  const onPointerUp = (e) => {
    const P = pinch.current
    if (P.pts.size === 2 && P.d0) {
      const [a, b] = [...P.pts.values()]
      const r = Math.hypot(a[0] - b[0], a[1] - b[1]) / P.d0
      if (r < 0.7 && mode === 'stage') zoom > 1 ? zoomAt(0, 0) : openGrid()
      else if (r > 1.35 && mode === 'stage' && zoom === 1) zoomAt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
      P.d0 = 0
    }
    P.pts.delete(e.pointerId)
  }

  // chrome auto-hide
  const idle = useRef(0)
  const poke = useCallback(() => {
    if (closing) return
    setChrome(true)
    clearTimeout(idle.current)
    idle.current = setTimeout(() => { if (!hold.current) setChrome(false) }, 2600)
  }, [closing])
  useEffect(() => { poke(); return () => clearTimeout(idle.current) }, [poke])
  const holdOn = { onMouseEnter: () => { hold.current = true }, onMouseLeave: () => { hold.current = false; poke() } }

  const showChrome = (chrome || mode === 'grid') && !closing
  const exitTo = closing ? flipFrom(closing.to, frame) : { opacity: 0 }

  return (
    <motion.div
      ref={root}
      className={'sv' + (zoom > 1 ? ' is-zoomed' : '') + (showChrome ? '' : ' is-quiet')}
      role="dialog"
      aria-modal="true"
      aria-label={lec.title + ' slides'}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <motion.div
        className="sv__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE, delay: 0.08 } }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <motion.div
        className="sv__progress"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: n ? page / n : 0, opacity: closing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      <motion.header
        className="sv__bar"
        {...holdOn}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showChrome ? 1 : 0, y: showChrome ? 0 : -10 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.45, ease: EASE, delay: closing ? 0 : 0.15 }}
      >
        <div className="sv__identity">
          <p className="sv__meta mono">{lec.event} · {lec.date}</p>
          <h2 className="sv__title">{lec.title}</h2>
        </div>
        <div className="sv__tools">
          <span className="sv__count mono" aria-live="polite">
            <span className="sv__count-roll">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.span
                  key={page}
                  custom={dir}
                  initial={{ y: dir > 0 ? '100%' : '-100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: dir > 0 ? '-100%' : '100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {pad(page)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sv__count-of">/ {n ? pad(n) : '··'}</span>
          </span>
          <button type="button" className={'sv__btn' + (mode === 'grid' ? ' is-on' : '')} onClick={() => (mode === 'grid' ? pick(page, root.current?.querySelector(`[data-p="${page}"]`)) : openGrid())} aria-pressed={mode === 'grid'} aria-label="Overview (G)">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" /></svg>
          </button>
          <button type="button" ref={closeBtn} className="sv__btn" onClick={close} aria-label="Close (Esc)">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
          </button>
        </div>
      </motion.header>

      {mode === 'stage' && (
        <>
          <button type="button" className="sv__edge sv__edge--prev" style={{ width: frame.left }} onClick={() => go(page - 1)} disabled={page <= 1 || !!closing} aria-label="Previous slide">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="sv__edge sv__edge--next" style={{ width: frame.left }} onClick={() => go(page + 1)} disabled={(n && page >= n) || !!closing} aria-label="Next slide">
            <span aria-hidden="true">→</span>
          </button>
          <motion.div
            className="sv__frame"
            style={{ left: frame.left, top: frame.top, width: frame.width, height: frame.height, originX: 0, originY: 0 }}
            initial={flipFrom(enterFrom, frame)}
            animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            exit={{ ...exitTo, transition: { duration: 0.62, ease: EASE } }}
            transition={{ duration: enterFrom ? 0.8 : 0.6, ease: EASE }}
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={page}
                className="sv__slide"
                custom={dir}
                variants={{
                  enter: (d) => ({ x: d > 0 ? '14%' : '-14%', opacity: 0, scale: 0.98 }),
                  center: { x: '0%', opacity: 1, scale: 1 },
                  exit: (d) => ({ x: d > 0 ? '-14%' : '14%', opacity: 0, scale: 0.98 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                <Pan
                  src={lec.src}
                  page={page}
                  width={zoom > 1 ? Math.min(4096, stageW * 2) : stageW}
                  zoom={zoom}
                  frame={frame}
                  panX={panX}
                  panY={panY}
                  onSwipe={(s) => go(page + s)}
                  onZoom={zoomAt}
                  canSwipe={!closing}
                />
              </motion.div>
            </AnimatePresence>
            {closing && page !== 1 && cover && (
              <motion.img className="sv__cover" src={cover} alt="" draggable={false} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.25 }} />
            )}
          </motion.div>
        </>
      )}

      {mode === 'grid' && (
        <Grid n={n} page={page} aspect={aspect} thumbs={thumbs} from={gridFrom} onPick={pick} />
      )}

      <motion.div
        className="sv__strip"
        data-lenis-prevent
        {...holdOn}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: showChrome && mode === 'stage' ? 1 : 0, y: showChrome && mode === 'stage' ? 0 : 40 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: EASE, delay: closing ? 0 : 0.2 }}
        style={{ pointerEvents: showChrome && mode === 'stage' ? 'auto' : 'none' }}
      >
        <div className="sv__strip-in" ref={strip}>
          {Array.from({ length: n }, (_, i) => (
            <button key={i} type="button" className={'sv__thumb' + (i + 1 === page ? ' is-active' : '')} style={{ aspectRatio: aspect }} onClick={() => go(i + 1)} aria-label={`Slide ${i + 1}`} aria-current={i + 1 === page ? 'true' : undefined}>
              {thumbs[i] ? <img src={thumbs[i]} alt="" draggable={false} /> : <span className="sv__ph" />}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {hint && !closing && (
          <motion.p className="sv__hint mono" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <kbd>←</kbd><kbd>→</kbd> navigate · <kbd>G</kbd> overview · double-click to zoom · <kbd>Esc</kbd> close
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Pan({ src, page, width, zoom, frame, panX, panY, onSwipe, onZoom, canSwipe }) {
  const img = usePage(src, page, width)
  const zoomed = zoom > 1
  const bounds = { left: -frame.width / 2, right: frame.width / 2, top: -frame.height / 2, bottom: frame.height / 2 }
  return (
    <motion.div
      className="sv__pan"
      style={{ x: panX, y: panY }}
      animate={{ scale: zoom }}
      transition={{ duration: 0.6, ease: EASE }}
      drag={zoomed ? true : canSwipe ? 'x' : false}
      dragConstraints={zoomed ? bounds : { left: 0, right: 0 }}
      dragElastic={zoomed ? 0.06 : 0.32}
      dragMomentum={zoomed}
      onDragEnd={(_, info) => {
        if (zoomed) return
        if (info.offset.x < -70 || info.velocity.x < -500) onSwipe(1)
        else if (info.offset.x > 70 || info.velocity.x > 500) onSwipe(-1)
      }}
      onDoubleClick={(e) => onZoom(e.clientX, e.clientY)}
    >
      {img ? <img className="sv__img" src={img.url} alt={`Slide ${page}`} draggable={false} /> : <span className="sv__ph sv__ph--stage" />}
    </motion.div>
  )
}

function Grid({ n, page, aspect, thumbs, from, onPick }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const box = ref.current
    const el = box.querySelector(`[data-p="${page}"]`)
    if (!el) return
    const r0 = el.getBoundingClientRect()
    if (r0.bottom > window.innerHeight - 24 || r0.top < 80) box.scrollTop += r0.top - window.innerHeight / 2 + r0.height / 2
    const r = el.getBoundingClientRect()
    if (from) {
      el.style.transformOrigin = '0 0'
      el.style.zIndex = '3'
      animate(el, { x: [from.left - r.left, 0], y: [from.top - r.top, 0], scaleX: [from.width / r.width, 1], scaleY: [from.height / r.height, 1] }, { duration: 0.7, ease: EASE })
        .then(() => { el.style.zIndex = '' })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div className="sv__grid" data-lenis-prevent ref={ref} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <motion.p className="sv__grid-head mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        Overview · {n} slides
      </motion.p>
      <div className="sv__grid-in">
        {Array.from({ length: n }, (_, i) => {
          const p = i + 1
          const cur = p === page
          return (
            <motion.button
              key={p}
              type="button"
              data-p={p}
              className={'sv__tile' + (cur ? ' is-current' : '')}
              style={{ aspectRatio: aspect }}
              initial={cur ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: cur ? 0 : 0.12 + Math.min(i * 0.015, 0.4) }}
              onClick={(e) => onPick(p, e.currentTarget)}
              aria-label={`Slide ${p}`}
            >
              {thumbs[i] ? <img src={thumbs[i]} alt="" draggable={false} /> : <span className="sv__ph" />}
              <span className="sv__tile-n mono">{pad(p)}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
