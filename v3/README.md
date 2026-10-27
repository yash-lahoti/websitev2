# Yash Lahoti — Portfolio v3

A single-page, motion-led portfolio that reproduces the structure and choreography of the
reference recording (`docs/reference/`) with Yash's own content: preloader → blur-in hero →
pinned "About" card reveal → horizontal experience timeline → curved 3D research wall →
hexagon-to-drum project cycler → services accordion → footer reveal.

**Stack:** Vite 5 · React 18 · GSAP 3.13 (ScrollTrigger, SplitText, DrawSVG, MotionPath — all free) ·
Lenis smooth scroll · Three.js via @react-three/fiber · self-hosted variable fonts.

## Run

```bash
cd v3
npm install
npm run dev          # http://localhost:5174
npm run build        # → dist/
npm run preview      # serves dist/ on :4173
npm run test:visual  # Playwright capture loop (see below)
```

## Project layout

```
v3/
├─ index.html                 meta, font preloads
├─ public/
│  ├─ fonts/                  Archivo, Instrument Sans, JetBrains Mono (woff2, latin)
│  └─ img/                    optimised portraits + project figures (≈1.7 MB total)
├─ src/
│  ├─ data/content.js         ALL copy and links — edit this to change what the site says
│  ├─ lib/
│  │  ├─ gsap.js              plugin registration, reduced-motion flag, test hook
│  │  ├─ smooth-scroll.jsx    Lenis provider synced to GSAP ticker
│  │  ├─ swirl.js             procedural monochrome "starry" background for About
│  │  ├─ card-texture.js      renders each 3D card as a finished landing page (canvas)
│  │  └─ use-card-textures.js CanvasTexture lifecycle for R3F
│  ├─ components/             Preloader, Nav
│  ├─ sections/               Hero, About, Experience, Research, Works, Services, Footer (+css)
│  └─ styles/                 tokens.css (design tokens), global.css
├─ tests/visual.mjs           Playwright loop → tests/shots/*.png + contact.png + report.json
└─ docs/                      DESIGN.md (palette/type/layout), MOTION.md (per-section timings), reference frames
```

## Editing content

Everything textual is in `src/data/content.js` (nav, hero lines, about copy, experience
panels, research cards, works cards, services, footer links). Images live in `public/img`.
Card artwork for the two 3D sections is *rendered* from that data by `card-texture.js`, so a
new project only needs a name, title, subtitle, optional image and `theme: 'light' | 'dark'`.

## Visual test loop

`npm run test:visual` builds nothing by itself; it starts `vite preview` (or uses `URL=` for a
dev server), steps the preloader timeline deterministically, scrolls every pinned
ScrollTrigger to fixed progress points, screenshots each state at 1440×900 and 390×844, fails on
console errors, and writes `tests/shots/contact.png` for a one-glance comparison with
`docs/reference/00-contact-sheet-1fps.jpg`. Run `npm run test:visual:ci` to build first.

The script uses the system Chromium at `/opt/pw-browsers/chromium` when present; set
`CHROMIUM_PATH` to override, or run `npx playwright install chromium` locally.

## Deploy (Vercel)

This folder is self-contained. In the Vercel project settings set **Root Directory** to `v3`
(or create a new project pointing at it). `vercel.json` already declares the Vite framework,
SPA rewrite and immutable caching for fonts/images. Node 18+ is required.

To deploy from the CLI: `cd v3 && npx vercel --prod`.

## Performance notes

* Three.js is split into its own chunk (≈220 KB gz) and only two small scenes are mounted.
* Canvas textures are 1024×640; raster images are ≤1800 px and grayscale.
* `prefers-reduced-motion` keeps layout but jumps scrubbed timelines to their end state.
