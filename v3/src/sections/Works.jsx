import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { AnimatePresence, motion } from 'motion/react'
import { works, publications, lectures } from '../data/content'
import { useCardTextures } from '../lib/use-card-textures'
import { openLecture } from '../lib/viewer-store'
import { focusPublication } from '../lib/pub-focus'
import Artifacts from '../components/Artifacts'
import './works.css'

const pubById = Object.fromEntries(publications.items.map((p) => [p.id, p]))
const lecById = Object.fromEntries(lectures.items.map((l) => [l.id, l]))
const EASE = [0.16, 1, 0.3, 1]

function Detail({ item, i, visible }) {
  const pubs = (item.pubs || []).map((id) => pubById[id]).filter(Boolean)
  const lec = item.slides && lecById[item.slides]
  const arts = (item.artifacts || []).filter((a) => a.kind !== 'image')
  return (
    <aside className={'wk__detail' + (visible ? ' is-on' : '')} aria-hidden={!visible}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.id}
          className="wk__detail-in"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          <p className="wk__d-n mono">{String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} · {item.tags}</p>
          <h3 className="wk__d-title">{item.title}</h3>
          <p className="wk__d-abs">{item.abstract}</p>

          {arts.length > 0 && (
            <div className="wk__d-art">
              <Artifacts items={arts} tone="light" layout="row" />
            </div>
          )}

          <dl className="wk__d-metrics">
            {item.metrics.map(([v, l], k) => (
              <motion.div key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + k * 0.05, duration: 0.4, ease: EASE }}>
                <dt>{v}</dt><dd>{l}</dd>
              </motion.div>
            ))}
          </dl>

          {pubs.length > 0 && (
            <div className="wk__d-pubs">
              <p className="wk__d-k mono">Publications</p>
              <ul>
                {pubs.slice(0, 3).map((p) => (
                  <li key={p.id}>
                    <button type="button" tabIndex={visible ? 0 : -1} onClick={() => focusPublication(p.id)} title={p.title}>
                      <span className="wk__d-pub-v">{p.venue}</span>
                      <span className="wk__d-pub-y mono">{p.year}</span>
                      <span aria-hidden="true">↘</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(lec || item.link) && (
            <div className="wk__d-actions">
              {lec && (
                <button type="button" className="pill pill--solid" tabIndex={visible ? 0 : -1} onClick={(e) => openLecture(lec.id, { el: e.currentTarget })}>
                  View slides <span aria-hidden="true">↗</span>
                </button>
              )}
              {item.link && (
                <a className="pill" href={item.link.href} target="_blank" rel="noreferrer" tabIndex={visible ? 0 : -1}>
                  {item.link.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}

/*
 * Phase A (hex): six cards lie flat in the view plane as the edges of a hexagon.
 * Fold: each card rotates onto the ring's outer surface while the whole ring turns 90° so
 *       its axis becomes horizontal.
 * Phase B (drum): the ring spins about that axis; the front card faces the camera, the next
 *       one peeks from the top, foreshortened (reference frames 82–102).
 */
const N = works.items.length
const STEP = (Math.PI * 2) / N
const R_HEX = 1.3
const R_DRUM = 1.7
const CARD_W = 1.28, CARD_H = 0.8
/* Fold early so most of the (short) pin distance is spent cycling projects. */
const FOLD_START = 0.04, FOLD_END = 0.14
const lerp = THREE.MathUtils.lerp
const smooth = (t) => t * t * (3 - 2 * t)

const _m = new THREE.Matrix4(), _qa = new THREE.Quaternion(), _qb = new THREE.Quaternion()
const _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3()

/*
 * Fit the camera to the live canvas size. CSS reserves the detail panel / bottom sheet,
 * so R3F's size already reflects the usable frame — keep the drum centered in that frame.
 */
function frameDrum(camera, width, height, fold) {
  const w = Math.max(1, width)
  const h = Math.max(1, height)
  const aspect = w / h
  const fov = (camera.fov * Math.PI) / 180
  // Fill more of narrow/tall canvases; leave air on wide desktop strips.
  const fillX = aspect > 1.35 ? 0.52 : aspect > 0.95 ? 0.6 : 0.72
  const fillY = h < 420 ? 0.7 : h < 560 ? 0.62 : 0.55
  const distW = (CARD_W / fillX) / (2 * Math.tan(fov / 2) * aspect)
  const distH = ((CARD_H * 2.15) / fillY) / (2 * Math.tan(fov / 2))
  // Hex is wider in-frame; ease out a little while folding into the drum.
  const dist = Math.max(distW, distH) * lerp(1.18, 1, fold)
  const lift = h < 480 ? 0.12 : 0
  camera.position.set(0, lift, dist)
  camera.lookAt(0, lift * 0.35, 0)
}

function Drum({ progress, drag }) {
  const group = useRef()
  const cards = useRef([])
  const textures = useCardTextures(works.items, 'work')
  const shadow = useMemo(() => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 160
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(128, 80, 10, 128, 80, 120)
    g.addColorStop(0, 'rgba(0,0,0,0.5)'); g.addColorStop(0.6, 'rgba(0,0,0,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 160)
    const t = new THREE.CanvasTexture(c); return t
  }, [])
  const { camera, size } = useThree()

  useFrame(() => {
    if (!group.current) return
    const p = progress.current
    const fold = smooth(THREE.MathUtils.clamp((p - FOLD_START) / (FOLD_END - FOLD_START), 0, 1))
    frameDrum(camera, size.width, size.height, fold)

    const hexSpin = -p * 0.55
    const drumP = THREE.MathUtils.clamp((p - FOLD_END) / (1 - FOLD_END), 0, 1)
    const drumAngle = drumP * STEP * (N - 1) - drag.current
    // Slightly tighter ring on short canvases so neighbors don't clip.
    const rScale = size.height < 480 ? 0.9 : size.height < 600 ? 0.95 : 1
    const radius = lerp(R_HEX, R_DRUM, fold) * rScale

    // ring plane is local XY. Rotating the group by -90° about Y maps local +X → world +Z (camera).
    group.current.rotation.set(0, lerp(0, -Math.PI / 2, fold), 0)

    cards.current.forEach((m, i) => {
      if (!m) return
      const a = lerp(i * STEP + Math.PI / 2 + hexSpin, i * STEP - drumAngle, fold)
      m.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0)
      // hex basis: x along tangent (a - 90°), y radial-out, normal +Z (faces camera, text upright at top)
      _x.set(Math.sin(a), -Math.cos(a), 0); _y.set(Math.cos(a), Math.sin(a), 0); _z.set(0, 0, 1)
      _m.makeBasis(_x, _y, _z); _qa.setFromRotationMatrix(_m)
      // drum basis: x along local -Z (→ world +X after group turn), y along tangent, normal radial-out
      _x.set(0, 0, -1); _y.set(-Math.sin(a), Math.cos(a), 0); _z.set(Math.cos(a), Math.sin(a), 0)
      _m.makeBasis(_x, _y, _z); _qb.setFromRotationMatrix(_m)
      m.quaternion.slerpQuaternions(_qa, _qb, fold)

      const front = Math.cos(a) // 1 when the card is at local +X (the drum's front)
      const fade = THREE.MathUtils.smoothstep(front, -0.15, 0.6) // back half of the drum is invisible
      m.material.opacity = lerp(1, fade, fold)
      const s = lerp(1, 1 + 0.12 * Math.max(0, front), fold)
      m.scale.set(s, s, 1)
      if (m.children[0]) m.children[0].material.opacity = 0.55 * m.material.opacity
    })
  })
  return (
    <group ref={group}>
      {works.items.map((it, i) => (
        <mesh key={it.id} ref={(el) => (cards.current[i] = el)}>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={textures[i]} transparent toneMapped={false} side={THREE.DoubleSide} />
          <mesh position={[0, -0.03, -0.01]} scale={[1.08, 1.14, 1]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial map={shadow} transparent toneMapped={false} depthWrite={false} opacity={0.55} side={THREE.DoubleSide} />
          </mesh>
        </mesh>
      ))}
    </group>
  )
}

export default function Works() {
  const root = useRef(null)
  const progress = useRef(0)
  const drag = useRef(0)
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('hex')
  const nameRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        /* ~1.5 screens total: quick fold, then ~0.2 screens per project. */
        end: () => '+=' + Math.round(window.innerHeight * (0.55 + N * 0.18)),
        pin: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress
          progress.current = p
          const ph = p < (FOLD_START + FOLD_END) / 2 ? 'hex' : 'drum'
          setPhase((prev) => (prev === ph ? prev : ph))
          const drumP = THREE.MathUtils.clamp((p - FOLD_END) / (1 - FOLD_END), 0, 1)
          const i = Math.min(N - 1, Math.round(drumP * (N - 1)))
          setIdx((prev) => (prev === i ? prev : i))
        },
      })
      gsap.fromTo(q('.wk__center'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, scrollTrigger: { trigger: root.current, start: 'top 60%', once: true } })
      if (reducedMotion) progress.current = 1
    }, root)
    let down = false, sy = 0
    const el = root.current
    const onDown = (e) => { down = true; sy = e.clientY }
    const onMove = (e) => { if (!down) return; drag.current = ((e.clientY - sy) / window.innerHeight) * 2.2 }
    const onUp = () => { down = false; gsap.to(drag, { current: 0, duration: 0.55, ease: 'power3.out' }) }
    el.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp)
    return () => { ctx.revert(); el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
  }, [])

  useEffect(() => {
    if (!nameRef.current) return
    if (phase !== 'drum') { gsap.set(nameRef.current, { opacity: 0 }); return }
    gsap.fromTo(nameRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
  }, [idx, phase])

  const dpr = useMemo(() => [1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)], [])
  const item = works.items[idx]

  return (
    <section id="works" className={'wk theme-light wk--' + phase} ref={root}>
      <div className="grain" />
      <div className="wk__canvas">
        <Canvas dpr={dpr} camera={{ fov: 30, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Suspense fallback={null}>
            <Drum progress={progress} drag={drag} />
          </Suspense>
        </Canvas>
      </div>
      <p className="wk__center display">{works.label}</p>
      <h2 className="wk__name display" ref={nameRef}>{item.name}</h2>
      <ul className="wk__index mono" aria-label="Project index">
        {works.items.map((w, i) => (<li key={w.id} className={i === idx && phase === 'drum' ? 'is-active' : ''}>{w.name}</li>))}
      </ul>
      <Detail item={item} i={idx} visible={phase === 'drum'} />
      <p className="wk__hint mono">{works.hint}</p>
      <ul className="visually-hidden">
        {works.items.map((w) => (<li key={w.id}>{w.name}: {w.title} {w.sub}</li>))}
      </ul>
    </section>
  )
}
