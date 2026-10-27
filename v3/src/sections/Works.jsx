import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { works } from '../data/content'
import { useCardTextures } from '../lib/use-card-textures'
import './works.css'

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
const FOLD_START = 0.2, FOLD_END = 0.34
const lerp = THREE.MathUtils.lerp
const smooth = (t) => t * t * (3 - 2 * t)

const _m = new THREE.Matrix4(), _qa = new THREE.Quaternion(), _qb = new THREE.Quaternion()
const _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3()

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
  const { camera } = useThree()
  useEffect(() => { camera.position.set(0, 0, 7.4); camera.lookAt(0, 0, 0) }, [camera])

  useFrame(() => {
    if (!group.current) return
    const p = progress.current
    const fold = smooth(THREE.MathUtils.clamp((p - FOLD_START) / (FOLD_END - FOLD_START), 0, 1))
    const hexSpin = -p * 0.6
    const drumP = THREE.MathUtils.clamp((p - FOLD_END) / (1 - FOLD_END), 0, 1)
    const drumAngle = drumP * STEP * (N - 1) - drag.current
    const radius = lerp(R_HEX, R_DRUM, fold)

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
        end: '+=600%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
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
    const onMove = (e) => { if (!down) return; drag.current = ((e.clientY - sy) / window.innerHeight) * 1.5 }
    const onUp = () => { down = false; gsap.to(drag, { current: 0, duration: 0.8, ease: 'power3.out' }) }
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
      <p className="wk__hint mono">{works.hint}</p>
      <ul className="visually-hidden">
        {works.items.map((w) => (<li key={w.id}>{w.name}: {w.title} {w.sub}</li>))}
      </ul>
    </section>
  )
}
