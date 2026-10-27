import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { brand, nav, socials } from '../data/content'
import { useLenis } from '../lib/smooth-scroll.jsx'
import './nav.css'

/*
 * Functional-layer glass bar (Apple Liquid Glass: blur only on navigation, not content).
 * Active item gets a soft luminous pill — monochrome, one accent of light at a time.
 */
const Icon = ({ k }) => {
  switch (k) {
    case 'linkedin':
      return (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>)
    case 'scholar':
      return (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 4 7 4s7-2.3 7-4v-3.8l-7 3.8z"/></svg>)
    case 'x':
      return (<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3zm-1.2 18h1.9L7.4 3.9H5.4z"/></svg>)
    default:
      return (<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>)
  }
}

const SHORT = {
  Home: 'Home',
  About: 'About',
  Journey: 'Path',
  Lectures: 'Talks',
  Works: 'Works',
  Publications: 'Pubs',
  Capabilities: 'Craft',
}

function sampleDark() {
  const el = document.elementFromPoint(window.innerWidth / 2, Math.min(40, window.innerHeight * 0.06))
  const sec = el?.closest('section, footer')
  return !!sec && sec.classList.contains('theme-dark')
}

export default function Nav() {
  const root = useRef(null)
  const dock = useRef(null)
  const openRef = useRef(false)
  const lenis = useLenis()
  const [active, setActive] = useState('#home')
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => { openRef.current = open }, [open])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(root.current, { autoAlpha: 0, y: -12 })
      gsap.to(root.current, { autoAlpha: 1, y: 0, duration: 0.8, delay: 2.4, ease: 'power3.out' })
      let last = 0
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          const dir = y > last ? 1 : -1
          last = y
          if (!openRef.current) {
            gsap.to(root.current, { yPercent: dir > 0 && y > 200 ? -110 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
          } else {
            gsap.to(root.current, { yPercent: 0, duration: 0.3, overwrite: 'auto' })
          }
          const d = sampleDark()
          setDark(d)
          root.current?.classList.toggle('nav--dark', d)
          dock.current?.classList.toggle('nav-dock--dark', d)
        },
      })
    }, root)
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => { ctx.revert(); io.disconnect() }
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (!target) return
    if (lenis?.current) lenis.current.scrollTo(target, { offset: 0, duration: 1.4 })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={'nav' + (dark ? ' nav--dark' : '') + (open ? ' is-open' : '')} ref={root}>
        <a className="nav__logo" href="#home" onClick={(e) => go(e, '#home')} aria-label={brand.name + ' — home'}>
          {brand.wordmark}<span className="nav__dot" />
        </a>

        <nav className="nav__glass" aria-label="Primary">
          <ul className="nav__links">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  className={'nav__link' + (active === n.href ? ' is-active' : '')}
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  aria-current={active === n.href ? 'page' : undefined}
                >
                  <span className="nav__glow" aria-hidden="true" />
                  <span className="nav__label">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__end">
          <div className="nav__social">
            {socials.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="nav__icon">
                <Icon k={s.key} />
              </a>
            ))}
          </div>
          <button
            type="button"
            className="nav__menu"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <nav ref={dock} className={'nav-dock' + (dark ? ' nav-dock--dark' : '')} aria-label="Sections">
        <ul className="nav-dock__glass">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                className={'nav-dock__link' + (active === n.href ? ' is-active' : '')}
                href={n.href}
                onClick={(e) => go(e, n.href)}
                aria-current={active === n.href ? 'page' : undefined}
              >
                <span className="nav-dock__glow" aria-hidden="true" />
                <span>{SHORT[n.label] || n.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="nav-drawer" className={'nav-drawer' + (open ? ' is-open' : '') + (dark ? ' nav-drawer--dark' : '')} hidden={!open}>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <a className={active === n.href ? 'is-active' : ''} href={n.href} onClick={(e) => go(e, n.href)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
