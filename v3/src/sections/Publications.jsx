import { Fragment, forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand, publications, lectures } from '../data/content'
import { openLecture } from '../lib/viewer-store'
import { PUB_FOCUS } from '../lib/pub-focus'
import './publications.css'

/*
 * Publications / CV — Apple-inspired scope bar: search primary, quiet segmented type,
 * understated field/year links. No oversized AI-style toggle pills.
 */
const EASE = [0.16, 1, 0.3, 1]
const ITEMS = publications.items
const TYPES = ['All', 'Manuscript', 'Presentation', 'Abstract']
const FIELDS = [...new Set(ITEMS.map((p) => p.field))]
const YEARS = [...new Set(ITEMS.map((p) => p.year))].sort((a, b) => b - a)
const lecById = Object.fromEntries(lectures.items.map((l) => [l.id, l]))
const plural = { Manuscript: 'Manuscripts', Presentation: 'Presentations', Abstract: 'Abstracts' }

function Authors({ text }) {
  return text.split(/(Lahoti\s+Y[A-Z]*)/).map((part, i) => (/^Lahoti\s+Y/.test(part) ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))
}

function Links({ p, tab = 0 }) {
  const lec = p.slides && lecById[p.slides]
  return (
    <div className="pb__links">
      {p.pdf && (
        <button type="button" className="pb__link" tabIndex={tab} onClick={(e) => { e.stopPropagation(); openLecture(p.id, { el: e.currentTarget }) }}>
          Read paper <span aria-hidden="true">↗</span>
        </button>
      )}
      {lec && (
        <button type="button" className="pb__link" tabIndex={tab} onClick={(e) => { e.stopPropagation(); openLecture(lec.id, { el: e.currentTarget }) }}>
          View slides <span aria-hidden="true">↗</span>
        </button>
      )}
      {p.url && (
        <a className="pb__link" href={p.url} target="_blank" rel="noreferrer" tabIndex={tab} onClick={(e) => e.stopPropagation()}>
          {/pubmed/.test(p.url) ? 'PubMed' : 'Source'} <span aria-hidden="true">↗</span>
        </a>
      )}
      <a className="pb__link pb__link--quiet" href={'https://scholar.google.com/scholar?q=' + encodeURIComponent(p.title)} target="_blank" rel="noreferrer" tabIndex={tab} onClick={(e) => e.stopPropagation()}>
        Find on Scholar <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

const Row = forwardRef(function Row({ p, open, onToggle }, ref) {
  return (
    <motion.li
      ref={ref}
      layout="position"
      id={'pub-' + p.id}
      className={'pb__row' + (open ? ' is-open' : '')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <button type="button" className="pb__head" onClick={onToggle} aria-expanded={open} aria-controls={'pub-body-' + p.id}>
        <span className="pb__type mono">{p.type}{p.status ? ' · ' + p.status : ''}{p.first ? ' · First author' : ''}</span>
        <span className="pb__title">{p.title}</span>
        <span className="pb__venue">{p.venue} · <Authors text={p.authors} /></span>
        <span className="pb__plus" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={'pub-body-' + p.id}
            className="pb__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="pb__body-in">
              <p className="pb__abs">{p.abstract}</p>
              <Links p={p} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
})

export default function Publications() {
  const root = useRef(null)
  const [type, setType] = useState('All')
  const [field, setField] = useState(null)
  const [year, setYear] = useState(null)
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)

  const counts = useMemo(() => Object.fromEntries(TYPES.slice(1).map((t) => [t, ITEMS.filter((p) => p.type === t).length])), [])
  const featured = useMemo(() => ITEMS.filter((p) => p.featured), [])

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ITEMS.filter((p) =>
      (type === 'All' || p.type === type) &&
      (!field || p.field === field) &&
      (!year || p.year === year) &&
      (!needle || (p.title + ' ' + p.authors + ' ' + p.venue + ' ' + p.abstract).toLowerCase().includes(needle)),
    ).sort((a, b) => b.year - a.year)
  }, [type, field, year, q])

  const groups = useMemo(() => {
    const m = new Map()
    list.forEach((p) => { if (!m.has(p.year)) m.set(p.year, []); m.get(p.year).push(p) })
    return [...m]
  }, [list])

  const focus = (id) => {
    setType('All'); setField(null); setYear(null); setQ(''); setOpen(id)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById('pub-' + id)
      if (!el) return
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -140, duration: 1.4 })
      else el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }))
  }

  useEffect(() => {
    const on = (e) => focus(e.detail)
    window.addEventListener(PUB_FOCUS, on)
    return () => window.removeEventListener(PUB_FOCUS, on)
  }, [])

  const filtered = type !== 'All' || field || year || q

  return (
    <section id="publications" className="pb theme-dark" ref={root}>
      <header className="pb__top">
        <motion.h2
          className="pb__h display"
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 30 }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {publications.title}
        </motion.h2>
        <div className="pb__stats">
          {TYPES.slice(1).map((t) => (
            <p key={t} className="pb__stat"><span className="pb__stat-n">{String(counts[t]).padStart(2, '0')}</span><span className="pb__stat-l mono">{plural[t]}</span></p>
          ))}
        </div>
        <div className="pb__cta">
          <button type="button" className="pill pill--solid" onClick={(e) => openLecture('cv', { el: e.currentTarget })}>View resume <span aria-hidden="true">↗</span></button>
          <button type="button" className="pill pill--ghost" onClick={(e) => openLecture('pubs-list', { el: e.currentTarget })}>Publication list <span aria-hidden="true">↗</span></button>
          <a className="pill pill--ghost" href={brand.cv} download>Download resume</a>
          <a className="pill pill--ghost" href={publications.scholar} target="_blank" rel="noreferrer">Google Scholar <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <ul className="pb__feat" aria-label="Standout work">
        {featured.map((p, i) => (
          <motion.li
            key={p.id}
            className="pb__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
          >
            <button type="button" className="pb__card-hit" onClick={() => focus(p.id)} aria-label={'Open abstract: ' + p.title} />
            <div className={'pb__card-art' + (p.img ? '' : ' pb__card-art--type')}>
              {p.img ? <img src={p.img} alt="" loading="lazy" /> : <span className="display">{p.venue}</span>}
            </div>
            <p className="pb__card-meta mono">{p.venue} · {p.year}{p.status ? ' · ' + p.status : ''}</p>
            <p className="pb__card-title">{p.title}</p>
            <p className="pb__card-more mono">Read abstract <span aria-hidden="true">↘</span></p>
          </motion.li>
        ))}
      </ul>

      {/* Quiet scope bar: search + text-style filters (not toggle chips) */}
      <div className="pb__scope">
        <label className="pb__search">
          <span className="visually-hidden">Search publications</span>
          <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
          <input type="search" placeholder="Search title, author, venue" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>

        <div className="pb__scope-row" role="tablist" aria-label="Type">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={type === t}
              className={'pb__scope-t' + (type === t ? ' is-on' : '')}
              onClick={() => setType(t)}
            >
              {t === 'All' ? 'All' : plural[t]}
            </button>
          ))}
        </div>

        <div className="pb__scope-meta">
          <div className="pb__scope-group" aria-label="Field">
            <span className="pb__scope-k mono">Field</span>
            <button type="button" className={'pb__scope-a' + (!field ? ' is-on' : '')} onClick={() => setField(null)}>Any</button>
            {FIELDS.map((f) => (
              <button key={f} type="button" className={'pb__scope-a' + (field === f ? ' is-on' : '')} aria-pressed={field === f} onClick={() => setField(field === f ? null : f)}>{f}</button>
            ))}
          </div>
          <div className="pb__scope-group" aria-label="Year">
            <span className="pb__scope-k mono">Year</span>
            <button type="button" className={'pb__scope-a' + (!year ? ' is-on' : '')} onClick={() => setYear(null)}>Any</button>
            {YEARS.map((y) => (
              <button key={y} type="button" className={'pb__scope-a' + (year === y ? ' is-on' : '')} aria-pressed={year === y} onClick={() => setYear(year === y ? null : y)}>{y}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="pb__count mono" aria-live="polite">
        {list.length} of {ITEMS.length}
        {filtered ? <button type="button" className="pb__reset" onClick={() => { setType('All'); setField(null); setYear(null); setQ('') }}>Clear</button> : null}
      </p>

      <div className="pb__list">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map(([y, rows]) => (
            <motion.section
              key={y}
              layout="position"
              className="pb__year"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <h3 className="pb__year-n display">{y}</h3>
              <ul className="pb__rows">
                <AnimatePresence mode="popLayout" initial={false}>
                  {rows.map((p) => (
                    <Row key={p.id} p={p} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
                  ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
        {!list.length && <p className="pb__empty">Nothing matches that search. Try a venue like ARVO or a topic like scoliosis.</p>}
      </div>
    </section>
  )
}
