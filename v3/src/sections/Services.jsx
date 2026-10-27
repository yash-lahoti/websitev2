import { useEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/gsap'
import { services, brand } from '../data/content'
import './services.css'

export default function Services() {
  const root = useRef(null)
  const [open, setOpen] = useState(2)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      gsap.set(q('.svc__title'), { clipPath: 'inset(0 0 100% 0)' })
      gsap.set(q('.svc__sub'), { opacity: 0, y: 10 })
      gsap.set(q('.svc__row'), { opacity: 0, y: 18 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
      tl.to(q('.svc__title'), { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out' })
        .to(q('.svc__sub'), { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(q('.svc__row'), { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.35)
      if (reducedMotion) tl.progress(1)
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // animate heights
    root.current.querySelectorAll('.svc__row').forEach((row, i) => {
      const panel = row.querySelector('.svc__panel')
      const isOpen = i === open
      gsap.to(panel, { height: isOpen ? panel.scrollHeight : 0, opacity: isOpen ? 1 : 0, duration: reducedMotion ? 0 : 0.5, ease: 'power3.inOut' })
    })
  }, [open])

  return (
    <section id="services" className="svc theme-light" ref={root}>
      <div className="grain" />
      <div className="svc__head">
        <h2 className="svc__title display">{services.title}</h2>
        <p className="svc__sub mono">{services.sub}</p>
      </div>
      <ul className="svc__list">
        {services.items.map((s, i) => (
          <li className={'svc__row' + (open === i ? ' is-open' : '')} key={s.n}>
            <button className="svc__trigger" aria-expanded={open === i} aria-controls={'svc-' + i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="svc__n mono">{s.n}</span>
              <span className="svc__name mono">{s.title}</span>
              <span className="svc__chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6" /></svg>
              </span>
            </button>
            <div className="svc__panel" id={'svc-' + i}>
              <div className="svc__panel-in">
                <p className="svc__body">{s.body}</p>
                <div className="svc__foot">
                  <span className="mono svc__deliv">{s.deliverables}</span>
                  <a className="mono svc__inquire" href={'mailto:' + brand.email + '?subject=' + encodeURIComponent(s.title)}>{services.inquire} <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
