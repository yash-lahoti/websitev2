import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { brand } from '../data/content'
import './preloader.css'

/* Wavy ring path: 10 lobes, r=150, amplitude 12, starting at top-right and going clockwise. */
function wavyRingPath(cx, cy, r, lobes, amp, startDeg) {
  const pts = []
  const N = 360
  for (let i = 0; i <= N; i++) {
    const a = ((startDeg + (i / N) * 360) * Math.PI) / 180
    const rr = r + amp * Math.sin(lobes * a)
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)])
  }
  return 'M' + pts.map((p) => p[0].toFixed(2) + ' ' + p[1].toFixed(2)).join(' L ')
}

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const path = useRef(null)
  const dot = useRef(null)
  const word = useRef(null)
  const period = useRef(null)
  const done = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const skip = sessionStorage.getItem('yl:seen') === '1' && location.hash
    const ctx = gsap.context(() => {
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
        .set(period.current, { autoAlpha: 0 })
        .fromTo(word.current, { autoAlpha: 0, letterSpacing: '0.6em' }, { autoAlpha: 1, letterSpacing: '0.32em', duration: 0.6, ease: 'power3.out' }, 0)
        .to(path.current, { drawSVG: '0% 100%', duration: 1.05 }, 0.15)
        .to(dot.current, { motionPath: { path: path.current, align: path.current, alignOrigin: [0.5, 0.5] }, duration: 1.05 }, 0.15)
        .to(dot.current, { x: '+=0', duration: 0.01 })
        .to(path.current, { drawSVG: '100% 100%', duration: 0.45, ease: 'power2.in' }, 1.25)
        .to(dot.current, { scale: 0.6, autoAlpha: 0, duration: 0.25 }, 1.55)
        .to(period.current, { autoAlpha: 1, duration: 0.2 }, 1.5)
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, 2.0)
        .set(root.current, { display: 'none' })
      window.__preloaderTl = tl
      if (skip) tl.progress(1)
    }, root)
    return () => ctx.revert()
  }, [])

  const d = wavyRingPath(260, 200, 150, 10, 11, -62)

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__stage">
        <svg className="preloader__ring" viewBox="0 0 520 400" width="520" height="400">
          <path ref={path} d={d} fill="none" stroke="#F4F3EF" strokeWidth="2" strokeLinecap="round" />
          <circle ref={dot} r="5" fill="#fff" className="preloader__dot" />
        </svg>
        <div className="preloader__word" ref={word}>
          {brand.wordmark}
          <span className="preloader__period" ref={period}>.</span>
        </div>
      </div>
    </div>
  )
}
