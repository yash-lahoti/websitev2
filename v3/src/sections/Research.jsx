import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { lectures } from '../data/content'
import { useCardTextures } from '../lib/use-card-textures'
import { LECTURE_SLIDE } from '../lib/card-texture'
import { openLecture, registerOrigin, getViewerState } from '../lib/viewer-store'
import { cachedPage, renderPage } from '../lib/pdf'
import './research.css'

/*
 * Featured Lectures on the "wavy ribbon" (reference frames 51–74). Cards sit on a convex arc
 * with an S-shaped vertical ramp; scrolling slides them along it. Each card is the lecture's
 * first slide rendered by pdf.js. Clicking the centre card opens the slide viewer from the
 * card's projected screen rect.
 */
const ITEMS = lectures.items
const N = ITEMS.length
const R = 6.0
const STEP = THREE.MathUtils.degToRad(31)
const ARC = THREE.MathUtils.degToRad(27)
const CARD_H = R * ARC * 0.6
const RAMP = 1.1
const SEG = 32

function ribbonPoint(theta, v, out) {
  const t = theta / (Math.PI / 2)
  const y = RAMP * t * t * t + v * CARD_H
  out.set(Math.sin(theta) * R, y, Math.cos(theta) * R - R)
  return out
}

function Card({ index, id, texture, offset }) {
  const mesh = useRef()
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1, SEG, 4), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const pos = geo.attributes.position
    const center = index * STEP + offset.current
    for (let i = 0; i < pos.count; i++) {
      const u = geo.attributes.uv.getX(i) - 0.5
      const v = geo.attributes.uv.getY(i) - 0.5
      ribbonPoint(center + u * ARC, v, tmp)
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z)
    }
    pos.needsUpdate = true
    const d = Math.abs(center)
    const far = THREE.MathUtils.degToRad(72)
    const vs = getViewerState()
    const lifted = vs.id === id && vs.source === 'ribbon' && (vs.open || vs.returning)
    mesh.current.material.opacity = lifted ? 0 : d > far ? 0 : THREE.MathUtils.clamp(1.1 - d * 0.5, 0.25, 1)
    mesh.current.visible = d <= far
  })
  return (
    <mesh ref={mesh} geometry={geo} frustumCulled={false}>
      <meshBasicMaterial map={texture} transparent toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Ribbon({ progress, drag, api }) {
  const textures = useCardTextures(ITEMS, 'lecture')
  const offset = useRef(0)
  const { camera, gl, size } = useThree()
  useEffect(() => {
    // keep the centre card within ~82% of the viewport width on portrait screens
    const fit = (R * ARC) / 0.82 / 2 / (Math.tan(THREE.MathUtils.degToRad(16)) * (size.width / size.height))
    const lift = size.width < 760 ? -0.9 : 0
    camera.position.set(0, 0.05 + lift, Math.max(7.2, fit))
    camera.lookAt(0, -0.05 + lift, 0)
  }, [camera, size.width, size.height])
  useFrame(() => {
    const target = -progress.current * STEP * (N - 1) + drag.current
    offset.current += (target - offset.current) * 0.16
  })
  // Projected screen rect of card i's slide area (for the viewer's FLIP in/out).
  useEffect(() => {
    const v = new THREE.Vector3()
    api.current = {
      rect(i) {
        const box = gl.domElement.getBoundingClientRect()
        const center = i * STEP + offset.current
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
        for (const u of [-0.5, -0.25, 0, 0.25, 0.5]) for (const vv of [-0.5, 0.5]) {
          ribbonPoint(center + u * ARC, vv, v).project(camera)
          const sx = box.left + ((v.x + 1) / 2) * box.width
          const sy = box.top + ((1 - v.y) / 2) * box.height
          x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy)
        }
        const w = x1 - x0, h = y1 - y0
        return { left: x0 + w * LECTURE_SLIDE.x, top: y0 + h * LECTURE_SLIDE.y, width: w * LECTURE_SLIDE.w, height: h * LECTURE_SLIDE.h }
      },
      offset: () => offset.current,
    }
  }, [api, camera, gl])
  return (
    <group>
      {ITEMS.map((it, i) => (<Card key={it.id} index={i} id={it.id} texture={textures[i]} offset={offset} />))}
    </group>
  )
}

export default function Research() {
  const root = useRef(null)
  const progress = useRef(0)
  const drag = useRef(0)
  const api = useRef(null)
  const [idx, setIdx] = useState(0)
  const [near, setNear] = useState(false)
  const capRef = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect() } }, { rootMargin: '150% 0px' })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const offs = ITEMS.map((it, i) => registerOrigin(it.id, () => (api.current ? api.current.rect(i) : null)))
    return () => offs.forEach((f) => f())
  }, [])

  const open = (i) => {
    const it = ITEMS[i]
    const origin = api.current?.rect(i) || null
    const cover = cachedPage(it.src, 1)
    openLecture(it.id, { origin, cover, source: 'ribbon' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      gsap.set(q('.rs__title'), { clipPath: 'inset(0 0 100% 0)' })
      let shown = false
      const reveal = () => {
        if (shown) return
        shown = true
        gsap.to(q('.rs__title'), { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out' })
      }
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=' + (N * 42) + '%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onToggle: (self) => { if (self.isActive) reveal() },
        onUpdate: (self) => {
          reveal()
          progress.current = self.progress
          const i = Math.min(N - 1, Math.round(self.progress * (N - 1)))
          setIdx((prev) => (prev === i ? prev : i))
        },
      })
      if (reducedMotion) gsap.set(q('.rs__title'), { clearProps: 'clipPath' })
    }, root)
    let down = false, sx = 0, sy = 0, moved = false
    const el = root.current.querySelector('.rs__canvas')
    const onDown = (e) => { down = true; moved = false; sx = e.clientX; sy = e.clientY }
    const onMove = (e) => {
      if (!down) return
      if (Math.hypot(e.clientX - sx, e.clientY - sy) > 6) moved = true
      drag.current = ((e.clientX - sx) / window.innerWidth) * 0.9
    }
    const onUp = (e) => {
      if (!down) return
      down = false
      gsap.to(drag, { current: 0, duration: 0.8, ease: 'power3.out' })
      if (moved || !api.current) return
      const i = Math.min(N - 1, Math.round(progress.current * (N - 1)))
      const r = api.current.rect(i)
      if (e.clientX >= r.left && e.clientX <= r.left + r.width && e.clientY >= r.top && e.clientY <= r.top + r.height) open(i)
    }
    el.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp)
    return () => { ctx.revert(); el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
  }, [])

  useEffect(() => {
    if (!capRef.current) return
    gsap.fromTo(capRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    // warm the viewer: render the current lecture's first pages ahead of a click
    if (near) ITEMS[idx] && renderPage(ITEMS[idx].src, 1, 1600).catch(() => {})
  }, [idx, near])

  const item = ITEMS[idx]
  const dpr = useMemo(() => [1, Math.min(2, window.devicePixelRatio || 1)], [])

  return (
    <section id="lectures" className="rs theme-light" ref={root}>
      <div className="grain" />
      <h2 className="rs__title display">{lectures.title}</h2>
      <div className="rs__canvas">
        {near && (
          <Canvas dpr={dpr} camera={{ fov: 32, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
            <Suspense fallback={null}>
              <Ribbon progress={progress} drag={drag} api={api} />
            </Suspense>
          </Canvas>
        )}
      </div>
      <div className="rs__caption" ref={capRef} aria-live="polite">
        <p className="rs__cap-meta mono">{item.event} · {item.date}</p>
        <p className="rs__cap-title">{item.title}</p>
        <p className="rs__cap-sub">{item.summary}</p>
        <button type="button" className="pill pill--solid rs__enter" onClick={() => open(idx)}>
          {lectures.enter} <span aria-hidden="true">↗</span>
        </button>
        <p className="rs__cap-n mono">{String(idx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</p>
      </div>
      <p className="rs__label display">{lectures.label}</p>
      <ul className="visually-hidden">
        {ITEMS.map((it) => (<li key={it.id}>{it.event}, {it.date}: {it.title}. {it.summary}</li>))}
      </ul>
    </section>
  )
}
