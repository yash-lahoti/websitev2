import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { research } from '../data/content'
import { useCardTextures } from '../lib/use-card-textures'
import './research.css'

/*
 * Concave "curved wall" carousel: cards are cylinder segments on the inside of a cylinder
 * of radius R; the camera sits inside, slightly forward of centre, looking at the back wall.
 * Side cards therefore bend toward the viewer — matching reference frames 51–74.
 */
const N = research.items.length
const R = 5.0
const STEP = THREE.MathUtils.degToRad(44)      // angular spacing between cards
const ARC = THREE.MathUtils.degToRad(34)       // angular width of one card
const CARD_H = R * ARC * 0.62                  // keep 16:10

function Wall({ progress, drag }) {
  const group = useRef()
  const textures = useCardTextures(research.items, 'pub', { mirror: true })
  const { camera } = useThree()
  useEffect(() => { camera.position.set(0, 0, 2.2); camera.lookAt(0, 0, -R) }, [camera])
  const geo = useMemo(() => new THREE.CylinderGeometry(R, R, CARD_H, 32, 1, true, -ARC / 2, ARC), [])
  useFrame(() => {
    if (!group.current) return
    // card i sits at angle a_i = π + i*STEP (π = back wall, facing the camera). Rotate so the
    // active card is at the back.
    const target = -progress.current * STEP * (N - 1) + drag.current
    group.current.rotation.y += (target - group.current.rotation.y) * 0.12
    group.current.children.forEach((m, i) => {
      const a = group.current.rotation.y + i * STEP // 0 = back wall
      const d = Math.abs(((a + Math.PI) % (Math.PI * 2)) - Math.PI) // angular distance from back
      m.material.opacity = THREE.MathUtils.clamp(1.05 - d * 0.55, 0.15, 1)
    })
  })
  return (
    <group ref={group}>
      {research.items.map((it, i) => (
        // CylinderGeometry's thetaStart=0 faces +Z; rotate by π + i*STEP to put card i on the back wall.
        <mesh key={it.id} geometry={geo} rotation={[0, Math.PI + i * STEP, 0]}>
          <meshBasicMaterial map={textures[i]} transparent toneMapped={false} side={THREE.BackSide} />
        </mesh>
      ))}
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
    const onMove = (e) => { if (!down) return; drag.current = ((e.clientX - sx) / window.innerWidth) * 1.0 }
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
        <Canvas dpr={dpr} camera={{ fov: 34, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <Suspense fallback={null}>
            <Wall progress={progress} drag={drag} />
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
