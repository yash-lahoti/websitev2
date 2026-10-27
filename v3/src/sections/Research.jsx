import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { research } from '../data/content'
import { useCardTextures } from '../lib/use-card-textures'
import './research.css'

/*
 * "Wavy ribbon" carousel (reference frames 51–74). Cards sit side by side on a ribbon that:
 *   • curves away from the viewer at both ends (convex arc, radius R) so edge cards shrink,
 *   • ramps vertically in an S: left end dips, right end rises, centre flat (cubic in angle),
 *   • bends each card's geometry along that path, so the tops of edge cards read as curved.
 * The ribbon shape is fixed in screen space; scrolling slides the cards along it.
 */
const N = research.items.length
const R = 6.0
const STEP = THREE.MathUtils.degToRad(31)   // angular spacing between card centres
const ARC = THREE.MathUtils.degToRad(27)    // angular width of one card
const CARD_H = R * ARC * 0.6                // ≈16:10 before bending
const RAMP = 1.1                            // vertical offset at ±90°
const SEG = 32

function ribbonPoint(theta, v, out) {
  // theta: angle along ribbon (0 = front/centre), v: -0.5..0.5 across height
  const t = theta / (Math.PI / 2)
  const y = RAMP * t * t * t + v * CARD_H
  out.set(Math.sin(theta) * R, y, Math.cos(theta) * R - R)
  return out
}

function Card({ index, texture, offset }) {
  const mesh = useRef()
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1, SEG, 4), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const pos = geo.attributes.position
    const center = (index * STEP) + offset.current
    for (let i = 0; i < pos.count; i++) {
      const u = geo.attributes.uv.getX(i) - 0.5    // -0.5..0.5 along width
      const v = geo.attributes.uv.getY(i) - 0.5
      ribbonPoint(center + u * ARC, v, tmp)
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    // fade with distance from centre
    const d = Math.abs(center)
    const far = THREE.MathUtils.degToRad(72)
    mesh.current.material.opacity = d > far ? 0 : THREE.MathUtils.clamp(1.1 - d * 0.5, 0.25, 1)
    mesh.current.visible = d <= far
  })
  return (
    <mesh ref={mesh} geometry={geo} frustumCulled={false}>
      <meshBasicMaterial map={texture} transparent toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Ribbon({ progress, drag }) {
  const textures = useCardTextures(research.items, 'pub')
  const offset = useRef(0)
  const { camera } = useThree()
  useEffect(() => { camera.position.set(0, 0.05, 7.2); camera.lookAt(0, -0.05, 0) }, [camera])
  useFrame(() => {
    const target = -progress.current * STEP * (N - 1) + drag.current
    offset.current += (target - offset.current) * 0.16
  })
  return (
    <group>
      {research.items.map((it, i) => (<Card key={it.id} index={i} texture={textures[i]} offset={offset} />))}
    </group>
  )
}

export default function Research() {
  const root = useRef(null)
  const progress = useRef(0)
  const drag = useRef(0)
  const [idx, setIdx] = useState(0)
  const capRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      gsap.set(q('.rs__title'), { clipPath: 'inset(0 0 100% 0)' })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => gsap.to(q('.rs__title'), { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out' }),
        onUpdate: (self) => {
          progress.current = self.progress
          const i = Math.min(N - 1, Math.round(self.progress * (N - 1)))
          setIdx((prev) => (prev === i ? prev : i))
        },
      })
      if (reducedMotion) gsap.set(q('.rs__title'), { clearProps: 'clipPath' })
    }, root)
    let down = false, sx = 0
    const el = root.current
    const onDown = (e) => { down = true; sx = e.clientX }
    const onMove = (e) => { if (!down) return; drag.current = ((e.clientX - sx) / window.innerWidth) * 0.9 }
    const onUp = () => { down = false; gsap.to(drag, { current: 0, duration: 0.8, ease: 'power3.out' }) }
    el.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp)
    return () => { ctx.revert(); el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
  }, [])

  useEffect(() => {
    if (!capRef.current) return
    gsap.fromTo(capRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
  }, [idx])

  const item = research.items[idx]
  const dpr = useMemo(() => [1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1)], [])

  return (
    <section id="research" className="rs theme-light" ref={root}>
      <div className="grain" />
      <h2 className="rs__title display">{research.title}</h2>
      <div className="rs__canvas">
        <Canvas dpr={dpr} camera={{ fov: 32, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Suspense fallback={null}>
            <Ribbon progress={progress} drag={drag} />
          </Suspense>
        </Canvas>
      </div>
      <div className="rs__caption" ref={capRef} aria-live="polite">
        <p className="rs__cap-title">{item.title}</p>
        <p className="rs__cap-sub">{item.sub}</p>
        <p className="rs__cap-n mono">{String(idx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</p>
      </div>
      <p className="rs__label display">{research.label}</p>
      <ul className="visually-hidden">
        {research.items.map((it) => (<li key={it.id}>{it.venue}: {it.title}. {it.sub}</li>))}
      </ul>
    </section>
  )
}
