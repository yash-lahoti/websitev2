import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const LenisCtx = createContext(null)
export const useLenis = () => useContext(LenisCtx)

export function SmoothScroll({ children, enabled = true }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true })
    ref.current = lenis
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      ref.current = null
    }
  }, [enabled])
  return <LenisCtx.Provider value={ref}>{children}</LenisCtx.Provider>
}
