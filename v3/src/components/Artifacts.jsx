import { motion } from 'motion/react'
import './artifacts.css'

/*
 * Artifacts: images, marks (logo-like chips), metrics and links that sit beside a chapter
 * or work. Content layer only — no glass (Apple: glass belongs on the functional layer).
 */
const EASE = [0.16, 1, 0.3, 1]

export default function Artifacts({ items = [], tone = 'dark', layout = 'stack' }) {
  if (!items.length) return null
  return (
    <ul className={'af af--' + tone + ' af--' + layout} aria-label="Artifacts">
      {items.map((a, i) => (
        <motion.li
          key={(a.label || a.src || a.value || '') + i}
          className={'af__item af__item--' + a.kind}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.08 + i * 0.05 }}
        >
          {a.kind === 'image' && (
            <figure className="af__fig">
              <img src={a.src} alt={a.alt || a.caption || ''} loading="lazy" />
              {a.caption && <figcaption className="af__cap mono">{a.caption}</figcaption>}
            </figure>
          )}
          {a.kind === 'mark' && (
            <div className="af__mark">
              <span className="af__mark-l display">{a.label}</span>
              {a.note && <span className="af__mark-n">{a.note}</span>}
            </div>
          )}
          {a.kind === 'metric' && (
            <div className="af__metric">
              <span className="af__metric-v display">{a.value}</span>
              <span className="af__metric-n">{a.note}</span>
            </div>
          )}
          {a.kind === 'link' && (
            <a className="af__link" href={a.href} {...(/^https?:/.test(a.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span>{a.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
