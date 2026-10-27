import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { brand } from '../data/content'
import './preloader.css'

/* Wavy elliptical ring: 12 lobes, starting at top-right and going clockwise. */
function wavyRingPath(cx, cy, rx, ry, lobes, amp, startDeg) {
  const pts = []
  const N = 420
  for (let i = 0; i <= N; i++) {
    const a = ((startDeg + (i / N) * 360) * Math.PI) / 180
    const w = amp * Math.sin(lobes * a)
    pts.push([cx + (rx + w) * Math.cos(a), cy + (ry + w) * Math.sin(a)])
  }
  return 'M' + pts.map((p) => p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' L ')
}

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const path = useRef(null)
  const dot = useRef(null)
  const word = useRef(null)
  const sub = useRef(null)
  const dots = useRef(null)
  const done = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const skip = sessionStorage.getItem('yl:seen') === '1' && location.hash
    const ctx = gsap.context(() => {
      const dotEls = dots.current.children
      gsap.set(dotEls, { autoAlpha: 0.15 })
      gsap.to(dotEls, { autoAlpha: 1, duration: 0.28, stagger: 0.18, repeat: -1, yoyo: true, repeatDelay: 0.1, ease: 'sine.inOut' })

      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        onComplete: () => {
          if (done.current) return
          done.current = true
          sessionStorage.setItem('yl:seen', '1')
          onDoneRef.current?.()
        },
      })
      tl.set(path.current, { drawSVG: '0%' })
        .fromTo(word.current, { autoAlpha: 0, letterSpacing: '0.42em' }, { autoAlpha: 1, letterSpacing: '0.2em', duration: 0.7, ease: 'power3.out' }, 0)
        .fromTo(sub.current, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.3)
        .to(path.current, { drawSVG: '0% 100%', duration: 1.1 }, 0.15)
        .to(dot.current, { motionPath: { path: path.current, align: path.current, alignOrigin: [0.5, 0.5] }, duration: 1.1 }, 0.15)
        .to(path.current, { drawSVG: '100% 100%', duration: 0.45, ease: 'power2.in' }, 1.3)
        .to(dot.current, { scale: 0.6, autoAlpha: 0, duration: 0.25 }, 1.6)
        .to(sub.current, { autoAlpha: 0, duration: 0.25 }, 1.75)
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 2.0)
        .set(root.current, { display: 'none' })
      window.__preloaderTl = tl
      if (skip) tl.progress(1)
    }, root)
    return () => ctx.revert()
  }, [])

  const d = wavyRingPath(360, 200, 300, 150, 12, 10, -62)

  return (
    <div className="preloader" ref={root} role="status" aria-label={brand.loaderName + ' loading'}>
      <div className="preloader__stage">
        <svg className="preloader__ring" viewBox="0 0 720 400" aria-hidden="true">
          <path ref={path} d={d} fill="none" stroke="#F4F3EF" strokeWidth="2" strokeLinecap="round" />
          <circle ref={dot} r="5" fill="#fff" className="preloader__dot" />
        </svg>
        <div className="preloader__text">
          <div className="preloader__word" ref={word}>{brand.loaderName}</div>
          <div className="preloader__sub mono" ref={sub} aria-hidden="true">
            {brand.loaderSub}
            <span className="preloader__dots" ref={dots}><span>.</span><span>.</span><span>.</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
