import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin)

gsap.defaults({ ease: 'power3.out', duration: 0.8 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText }

// test hook (used by tests/visual.mjs to step pinned timelines deterministically)
if (typeof window !== 'undefined') window.__ST = ScrollTrigger
