import { motion } from 'motion/react'
import { brand, capabilities } from '../data/content'
import './capabilities.css'

/*
 * Capabilities: what I bring (competencies with proof), how deep (a ticked skills matrix),
 * what is live right now (active works), and how to start a conversation (intent-specific mail).
 */
const EASE = [0.16, 1, 0.3, 1]
const TICKS = 10
const inView = { once: true, margin: '-12% 0px' }
const mail = (subject) => 'mailto:' + brand.email + '?subject=' + encodeURIComponent(subject)

export default function Capabilities() {
  const c = capabilities
  return (
    <section id="capabilities" className="cap theme-light">
      <div className="grain" />
      <header className="cap__head">
        <motion.h2
          className="cap__h display"
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 30 }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {c.title}
        </motion.h2>
        <motion.p className="cap__lede" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}>
          {c.lede}
        </motion.p>
      </header>

      <ol className="cap__comp">
        {c.competencies.map((k, i) => (
          <motion.li
            key={k.title}
            className="cap__comp-i"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.07 + Math.floor(i / 3) * 0.1 }}
          >
            <span className="cap__comp-n mono">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="cap__comp-t">{k.title}</h3>
            <p className="cap__comp-p">{k.proof}</p>
          </motion.li>
        ))}
      </ol>

      <div className="cap__split">
        <div className="cap__skills">
          <p className="cap__k mono">Toolkit</p>
          <div className="cap__matrix">
            {c.skills.map((g, gi) => (
              <div key={g.group} className="cap__group">
                <p className="cap__group-t">{g.group}</p>
                <ul>
                  {g.items.map(([name, level], i) => {
                    const on = Math.round(level / TICKS)
                    return (
                      <li key={name} className="cap__skill">
                        <span className="cap__skill-n">{name}</span>
                        <span className="cap__ticks" role="img" aria-label={`${name}: ${level} of 100`}>
                          {Array.from({ length: TICKS }, (_, t) => (
                            <motion.i
                              key={t}
                              className={t < on ? 'is-on' : ''}
                              initial={{ scaleY: 0.2, opacity: 0.2 }}
                              whileInView={{ scaleY: 1, opacity: 1 }}
                              viewport={inView}
                              transition={{ duration: 0.45, ease: EASE, delay: gi * 0.12 + i * 0.05 + t * 0.025 }}
                            />
                          ))}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="cap__active">
          <p className="cap__k mono">Active now</p>
          <ul>
            {c.active.map((a, i) => {
              const Tag = a.href ? 'a' : 'div'
              return (
                <motion.li key={a.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView} transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}>
                  <Tag className="cap__work" {...(a.href ? { href: a.href, target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className={'cap__dot cap__dot--' + a.status.toLowerCase()} aria-hidden="true" />
                    <span className="cap__work-n">{a.name}</span>
                    <span className="cap__work-note">{a.note}</span>
                    <span className="cap__work-s mono">{a.status}{a.href ? <span aria-hidden="true"> ↗</span> : null}</span>
                  </Tag>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="cap__connect">
        <p className="cap__connect-t display">Start a conversation</p>
        <ul className="cap__connect-l">
          {c.connect.map((x, i) => (
            <motion.li key={x.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.06 }}>
              <a className="cap__intent" href={mail(x.subject)}>
                <span>{x.label}</span>
                <span className="cap__intent-a" aria-hidden="true">↗</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
