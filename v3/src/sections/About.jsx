import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { about } from '../data/content'
import { drawSwirl } from '../lib/swirl'
import './about.css'

export default function About() {
  const root = useRef(null)
  const bg = useRef(null)

  useEffect(() => {
    const canvas = bg.current
    const paint = () => drawSwirl(canvas, { width: Math.max(960, window.innerWidth), height: Math.max(600, window.innerHeight) })
    paint()
    let raf
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint) }
    window.addEventListener('resize', onResize)

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      })
      // card grows from a small tile to the full frame
      tl.fromTo(q('.about__card'), { scale: 0.3, y: '6vh', clipPath: 'inset(0% 31% 0% 31% round 40px)' }, { scale: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 0.35, ease: 'power1.inOut' }, 0)
        // words slide apart and fade
        .to(q('.about__wordA'), { xPercent: -260, duration: 0.22, ease: 'power2.in' }, 0.25)
        .to(q('.about__wordB'), { xPercent: 260, duration: 0.22, ease: 'power2.in' }, 0.25)
        .to(q('.about__words'), { opacity: 0, duration: 0.1 }, 0.4)
        // portrait + spotlight reveal
        .fromTo(q('.about__photo'), { scale: 1.18, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.26)
        .fromTo(q('.about__beam'), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.32)
        // copy
        .fromTo(q('.about__copy'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.14, stagger: 0.04, ease: 'power2.out' }, 0.56)
        // background drift & dim
        .fromTo(q('.about__bg'), { scale: 1.02, xPercent: 0, filter: 'brightness(0.95)' }, { scale: 1.1, xPercent: -3, filter: 'brightness(0.6)', duration: 1 }, 0)
      if (reducedMotion) tl.progress(1)
    }, root)
    return () => { ctx.revert(); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section id="about" className="about theme-dark" ref={root}>
      <canvas className="about__bg" ref={bg} aria-hidden="true" />
      <div className="about__frame">
        <div className="about__card">
          <img className="about__photo" src="/img/about-portrait.jpg" alt="Yash Lahoti, black and white profile portrait" loading="lazy" />
          <div className="about__beam" aria-hidden="true" />
          <div className="about__vignette" aria-hidden="true" />
          <div className="about__words display" aria-hidden="true">
            <span className="about__wordA">{about.wordA}</span>
            <span className="about__wordB">{about.wordB}</span>
          </div>
          <p className="about__copy about__headline">{about.headline}</p>
          <p className="about__copy about__locale mono">{about.locale}</p>
          <div className="about__copy about__bottom">
            <div className="about__bio">
              <p className="mono about__discipline">
                <strong>{about.disciplineLabel}</strong>
                <span className="about__rule" />
                <span>{about.disciplines.join('  •  ')}</span>
              </p>
              <p className="about__body">{about.body}</p>
            </div>
            <div className="about__ctas">
              <a className="pill pill--solid" href={about.ctaPrimary.href}>{about.ctaPrimary.label} <span aria-hidden="true">↗</span></a>
              <a className="pill pill--ghost" href={about.ctaSecondary.href}>{about.ctaSecondary.label}</a>
            </div>
          </div>
        </div>
      </div>
      <h2 className="visually-hidden">About me</h2>
    </section>
  )
}
