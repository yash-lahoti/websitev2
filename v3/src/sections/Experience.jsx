import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { journey } from '../data/content'
import Artifacts from '../components/Artifacts'
import './experience.css'

/*
 * Four chapters on a road. The ship is a small progress marker on a low road.
 * A large fixed reading panel (not world-attached) holds the era story and flagship
 * experiences so the content, not the ship, is the focus.
 */
const N = journey.stops.length
/* Short dwell + travel so four chapters fit in ~2–3 screens, not a long empty scrub. */
const DWELL = 0.7
const TOTAL = N * DWELL + (N - 1)
const EASE = [0.16, 1, 0.3, 1]

function travel(p) {
  let t = p * TOTAL
  for (let i = 0; i < N; i++) {
    if (t <= DWELL || i === N - 1) return i
    t -= DWELL
    if (t <= 1) return i + (1 - Math.cos(Math.PI * t)) / 2
    t -= 1
  }
  return N - 1
}

function geometry(w, h) {
  const mobile = w < 760
  const spacing = Math.round(Math.min(1500, Math.max(mobile ? 480 : 1000, w * 0.95)))
  const x0 = Math.round(mobile ? w * 0.42 : w * 0.22)
  const mid = mobile ? h * 0.82 : h * 0.86
  const amp = h * 0.028
  const k = Math.PI / spacing
  const worldW = Math.round(x0 + (N - 1) * spacing + w * 0.9)
  const y = (x) => mid - amp * Math.cos(k * (x - x0))
  const slope = (x) => amp * k * Math.sin(k * (x - x0))
  let d = ''
  for (let x = 0; x <= worldW; x += 12) d += (x ? ' L' : 'M') + x + ' ' + y(x).toFixed(1)
  const stops = journey.stops.map((_, i) => {
    const x = x0 + i * spacing
    return { x, y: y(x) }
  })
  return { w, h, mobile, spacing, x0, worldW, y, slope, d, stops }
}

const Ship = () => (
  <svg viewBox="0 0 72 36" width="36" height="18" aria-hidden="true">
    <defs>
      <linearGradient id="jr-flame" x1="1" x2="0" y1="0" y2="0">
        <stop offset="0" stopColor="#fff" />
        <stop offset="0.45" stopColor="#d9d7d0" stopOpacity="0.9" />
        <stop offset="1" stopColor="#d9d7d0" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g className="jr__flame"><path d="M15 18 L-6 11 Q2 18 -6 25 Z" fill="url(#jr-flame)" /></g>
    <path d="M20 10 L12 2 H22 L31 10 Z" fill="#b9b8b3" />
    <path d="M20 26 L12 34 H22 L31 26 Z" fill="#b9b8b3" />
    <path d="M14 10 H46 Q66 10 70 18 Q66 26 46 26 H14 Q10 18 14 10 Z" fill="#f4f3ef" />
    <rect x="33" y="10" width="3" height="16" fill="#0a0c13" opacity="0.35" />
    <circle cx="51" cy="18" r="4.2" fill="#0a0c13" stroke="#6f6f6c" strokeWidth="1.2" />
  </svg>
)

function Chapter({ stop, i }) {
  return (
    <motion.article
      key={stop.role}
      className="jr__chapter"
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="jr__read">
        <header className="jr__chapter-head">
          <p className="jr__meta mono">
            <span>{String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
            <span>{stop.years}</span>
            <span className="jr__kind">{stop.kind}</span>
          </p>
          <h3 className="jr__role">{stop.role}</h3>
          <p className="jr__place">{stop.place}</p>
          <p className="jr__body">{stop.body}</p>
        </header>
        <ul className="jr__exps">
          {stop.experiences.map((ex) => (
            <li key={ex.title} className="jr__exp">
              <p className="jr__exp-flag mono">{ex.flag}</p>
              <div className="jr__exp-copy">
                <h4 className="jr__exp-title">{ex.title}</h4>
                <p className="jr__exp-where">{ex.where} · {ex.when}</p>
                <ul className="jr__points">
                  {ex.points.map((pt) => (<li key={pt}>{pt}</li>))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {stop.artifacts?.length > 0 && (
        <aside className="jr__artifacts" aria-label="Chapter artifacts">
          <p className="jr__artifacts-k mono">Artifacts</p>
          <Artifacts items={stop.artifacts} tone="dark" layout="rail" />
        </aside>
      )}
    </motion.article>
  )
}

export default function Experience() {
  const root = useRef(null)
  const world = useRef(null)
  const stars = useRef(null)
  const ship = useRef(null)
  const lit = useRef(null)
  const ghost = useRef(null)
  const bar = useRef(null)
  const beacons = useRef([])
  const markers = useRef([])
  const idxRef = useRef(0)
  const [idx, setIdx] = useState(0)
  const [dims, setDims] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const g = useMemo(() => geometry(dims.w, dims.h), [dims])

  useEffect(() => {
    let raf
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setDims((prev) => {
        const w = window.innerWidth, h = window.innerHeight
        return w === prev.w && Math.abs(h - prev.h) < 120 ? prev : { w, h }
      }))
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf) }
  }, [])

  const mounted = useRef(false)
  useEffect(() => {
    const ctx = gsap.context(() => setup(), root)
    let raf
    if (mounted.current) raf = requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh() })
    mounted.current = true
    return () => { cancelAnimationFrame(raf); ctx.revert() }
  }, [g])

  function setup() {
    const state = { target: 0, s: 0, last: -1 }
    const flame = ship.current.querySelector('.jr__flame')

    const apply = () => {
      const s = state.s
      const shipX = g.x0 + s * g.spacing
      const shipY = g.y(shipX)
      const angle = (Math.atan(g.slope(shipX)) * 180) / Math.PI
      const anchor = g.mobile ? g.w * 0.42 : g.w * 0.22
      const cam = reducedMotion ? 0 : Math.max(0, Math.min(g.worldW - g.w, shipX - anchor))
      const speed = Math.min(1, Math.abs(s - state.last) * 45)
      world.current.style.transform = `translate3d(${-cam}px,0,0)`
      stars.current.style.transform = `translate3d(${-cam * 0.12}px,0,0)`
      ghost.current.style.transform = `translate3d(${-cam * 0.35}px,-50%,0)`
      ship.current.style.transform = `translate3d(${shipX}px,${shipY}px,0) rotate(${angle}deg)`
      flame.style.transform = `scaleX(${0.35 + speed * 1.1})`
      lit.current.setAttribute('width', String(Math.max(0, shipX)))
      bar.current.style.transform = `scaleX(${s / Math.max(1, N - 1)})`

      for (let i = 0; i < N; i++) {
        const docked = Math.abs(s - i) < 0.28
        const visited = !docked && s > i
        beacons.current[i]?.classList.toggle('is-docked', docked)
        beacons.current[i]?.classList.toggle('is-visited', visited || s >= i)
        markers.current[i]?.classList.toggle('is-docked', docked)
        markers.current[i]?.classList.toggle('is-visited', visited || s >= i)
      }
      const near = Math.min(N - 1, Math.round(s))
      if (near !== idxRef.current) { idxRef.current = near; setIdx(near) }
      state.last = s
    }

    if (reducedMotion) { apply(); return }

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: () => '+=' + Math.round(window.innerHeight * N * 0.65),
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => { state.target = travel(self.progress) },
    })
    state.target = state.s = travel(st.progress)
    apply()

    const tick = () => {
      const ds = state.target - state.s
      if (Math.abs(ds) < 0.0004 && Math.abs(state.s - state.last) < 0.0004) return
      state.s = Math.abs(ds) < 0.0004 ? state.target : state.s + ds * 0.18
      apply()
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }

  const { title, intro: lede, ghost: ghostText, stops } = journey
  const cur = stops[idx]

  return (
    <section id="journey" className={'jr theme-dark' + (reducedMotion ? ' jr--static' : '')} ref={root}>
      <div className="jr__stars" ref={stars} aria-hidden="true" />
      <div className="jr__ghost display" ref={ghost} aria-hidden="true">{ghostText}{ghostText}</div>

      <div className="jr__stage" aria-live="polite">
        <h2 className="jr__eyebrow mono">{title.join(' ')} · {lede}</h2>
        <AnimatePresence mode="wait" initial={false}>
          <Chapter key={cur.role} stop={cur} i={idx} />
        </AnimatePresence>
      </div>

      <div className="jr__viewport">
        <div className="jr__world" ref={world} style={{ width: g.worldW }}>
          <svg className="jr__road" width={g.worldW} height={g.h} viewBox={`0 0 ${g.worldW} ${g.h}`} aria-hidden="true">
            <defs>
              <clipPath id="jr-lit"><rect ref={lit} x="0" y="0" width="0" height={g.h} /></clipPath>
            </defs>
            <path d={g.d} className="jr__asphalt" />
            <path d={g.d} className="jr__shoulder" />
            <path d={g.d} className="jr__lane" />
            <g clipPath="url(#jr-lit)">
              <path d={g.d} className="jr__glow" />
              <path d={g.d} className="jr__litlane" />
            </g>
          </svg>
          {g.stops.map((p, i) => (
            <span key={'b' + i} className="jr__beacon" ref={(el) => (beacons.current[i] = el)} style={{ left: p.x, top: p.y }} aria-hidden="true" />
          ))}
          {g.stops.map((p, i) => (
            <div key={'m' + i} className="jr__marker" ref={(el) => (markers.current[i] = el)} style={{ left: p.x, top: p.y }} aria-hidden="true">
              <span className="jr__marker-n mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="jr__marker-t">{stops[i].role}</span>
            </div>
          ))}
          <div className="jr__ship" ref={ship}><Ship /></div>
        </div>
      </div>

      <div className="jr__hud mono" aria-hidden="true">
        <span className="jr__hud-year">{cur.years}</span>
        <span className="jr__progress"><span ref={bar} /></span>
        <span>{String(idx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
