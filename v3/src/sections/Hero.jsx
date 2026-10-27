import { useEffect, useRef } from 'react'
import { gsap, SplitText, reducedMotion } from '../lib/gsap'
import { hero } from '../data/content'
import './hero.css'

export default function Hero({ ready }) {
  const root = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    if (!ready || played.current) return
    played.current = true
    const ctx = gsap.context(() => {
      const l1 = new SplitText('.hero__l1', { type: 'words', wordsClass: 'word' })
      const l2 = new SplitText('.hero__l2', { type: 'words', wordsClass: 'word' })
      const words = [...l1.words, ...l2.words]
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(words, { filter: 'blur(18px)', opacity: 0, y: 30 }, { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.9, stagger: 0.08, clearProps: 'filter,willChange' }, 0)
        .fromTo('.hero__portrait', { opacity: 0, y: 40, scale: 1.04 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.15)
        .fromTo('.hero__corner', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.5)
        .fromTo('.hero__cta', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.7)
      if (!reducedMotion) {
        gsap.to('.hero__portrait', { y: 6, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.3 })
        gsap.to('.hero__cta-arrow', { x: 2, y: 2, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      }
      if (reducedMotion) tl.progress(1)
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="home" className="hero theme-light" ref={root}>
      <div className="grain" />
      <h1 className="hero__title display">
        <span className="hero__l1">{hero.line1}</span>
        <span className="hero__l2" data-text={hero.line2}>{hero.line2}</span>
      </h1>
      <img className="hero__portrait" src="/img/hero-portrait.png" alt="Yash Lahoti" width="960" height="1088" fetchpriority="high" />
      <div className="hero__corner hero__corner--bl">
        <p className="mono">{hero.est}</p>
        <a className="hero__cta" href="#about" aria-label="Scroll to about">
          <svg className="hero__cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 8v10H8" /></svg>
        </a>
      </div>
      <div className="hero__corner hero__corner--br">
        <p className="mono hero__manifesto">{hero.manifesto}</p>
        <ul className="hero__services mono">
          {hero.services.map((s, i) => (<li key={s} style={{ opacity: 0.55 + i * 0.22 }}>{s}</li>))}
        </ul>
      </div>
    </section>
  )
}
