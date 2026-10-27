import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { experience } from '../data/content'
import './experience.css'

export default function Experience() {
  const root = useRef(null)
  const track = useRef(null)
  const ghost = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.xp__panel', root.current)
      const n = panels.length
      const getDist = () => track.current.scrollWidth - window.innerWidth

      const scrollTween = gsap.to(track.current, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + getDist(),
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
            // skew on velocity (the "smear" from the reference)
            const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -400)
            gsap.to(track.current, { skewX: v, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(track.current, { skewX: 0, duration: 0.6, ease: 'power3.out', delay: 0.1, overwrite: false })
            const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)))
            root.current.querySelectorAll('.xp__tab').forEach((t) => t.classList.toggle('is-active', t.dataset.tag === panels[idx].dataset.tag))
            root.current.querySelector('.xp__eyebrow').textContent = panels[idx].dataset.eyebrow
          },
        },
      })
      // ghost text parallax at 0.45× speed
      gsap.to(ghost.current, {
        x: () => -getDist() * 0.45,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + getDist(), scrub: 0.7, invalidateOnRefresh: true },
      })
      // per-panel entrances tied to the horizontal tween
      panels.forEach((p, i) => {
        if (i === 0) return
        const h = p.querySelector('.xp__h2')
        const ms = p.querySelectorAll('.xp__ms')
        const body = p.querySelector('.xp__body')
        const meta = p.querySelector('.xp__meta')
        gsap.set([h, body, meta], { clipPath: 'inset(0 0 100% 0)' })
        gsap.set(ms, { opacity: 0, y: 14 })
        ScrollTrigger.create({
          trigger: p,
          containerAnimation: scrollTween,
          start: 'left 70%',
          onEnter: () => {
            gsap.to([meta, h, body], { clipPath: 'inset(0 0 0% 0)', duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: true })
            gsap.to(ms, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.25, ease: 'power3.out', overwrite: true })
          },
          onLeaveBack: () => {
            gsap.set([meta, h, body], { clipPath: 'inset(0 0 100% 0)' })
            gsap.set(ms, { opacity: 0, y: 14 })
          },
        })
      })
      if (reducedMotion) gsap.set(root.current.querySelectorAll('.xp__h2,.xp__body,.xp__meta,.xp__ms'), { clearProps: 'all' })
    }, root)
    return () => ctx.revert()
  }, [])

  const { eyebrow, pill, title, intro, tabs, ghost: ghostText, panels } = experience

  return (
    <section id="experience" className="xp theme-dark" ref={root}>
      <div className="xp__ghost display" ref={ghost} aria-hidden="true">{ghostText}{ghostText}</div>
      <p className="xp__eyebrow mono">{eyebrow}</p>
      <div className="xp__progress" aria-hidden="true"><span ref={bar} /></div>
      <div className="xp__track" ref={track}>
        <article className="xp__panel xp__panel--intro" data-tag="RESEARCH" data-eyebrow={eyebrow}>
          <span className="xp__pill mono">{pill}</span>
          <h2 className="xp__h2 display">{title[0]}<br />{title[1]}</h2>
          <p className="xp__intro">{intro}</p>
        </article>
        {panels.map((p, i) => (
          <article className="xp__panel" key={i} data-tag={p.tag} data-eyebrow={p.org}>
            <p className="xp__meta mono">
              <span>{p.years}</span><span className="xp__rule" /><span>{p.org}</span><span className="xp__tag">{p.tag}</span>
            </p>
            <h2 className="xp__h2 display">{p.title[0]}<br />{p.title[1]}</h2>
            <p className="xp__body">{p.body}</p>
            <ul className="xp__milestones">
              {p.milestones.map(([k, v]) => (
                <li className="xp__ms" key={k}><span className="mono">{k}</span><p>{v}</p></li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="xp__tabs" role="tablist" aria-label="Experience categories">
        {tabs.map((t) => (<span className={'xp__tab mono' + (t === 'RESEARCH' ? ' is-active' : '')} data-tag={t} key={t}>{t}</span>))}
      </div>
    </section>
  )
}
