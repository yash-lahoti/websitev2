import { useEffect, useRef } from 'react'
import { gsap, SplitText, reducedMotion } from '../lib/gsap'
import { footer } from '../data/content'
import './footer.css'

export default function Footer() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const split = new SplitText(q('.ft__talk'), { type: 'words,chars', wordsClass: 'word', charsClass: 'char' })
      gsap.set(split.chars, { yPercent: 110 })
      gsap.set(q('.ft__pill'), { opacity: 0, scale: 0.9 })
      gsap.set(q('.ft__legal'), { opacity: 0 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 60%', once: true } })
      tl.to(split.chars, { yPercent: 0, duration: 0.9, stagger: 0.03, ease: 'power4.out' })
        .to(q('.ft__pill'), { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.6)' }, 0.4)
        .to(q('.ft__legal'), { opacity: 1, duration: 0.6 }, 0.8)
      if (reducedMotion) tl.progress(1)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <footer id="contact" className="ft theme-dark" ref={root}>
      <div className="ft__in">
        <h2 className="ft__talk display" aria-label={footer.talk}>{footer.talk}</h2>
        <ul className="ft__links">
          {footer.links.map((l) => (
            <li key={l.label}>
              <a className={'pill ft__pill ' + (l.primary ? 'pill--solid' : 'pill--ghost')} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
        <p className="ft__legal ft__legal--l mono">{footer.left}</p>
        <p className="ft__legal ft__legal--r mono">{footer.right}</p>
      </div>
    </footer>
  )
}
