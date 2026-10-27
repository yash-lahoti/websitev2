# Design System — Yash Lahoti Portfolio v3

Derived frame-by-frame (116 frames at 4 fps, 29 s) from the reference screen recording
(`docs/reference/`). The reference is a single-page creative portfolio with a strict
monochrome palette, an editorial grotesque display face, pinned scroll sequences and two
WebGL set-pieces. This document records what was measured and the tokens we ship.

## 1. Structure (scroll order)

| # | Section        | Theme | Pin | Reference frames | Our content |
|---|----------------|-------|-----|------------------|-------------|
| 0 | Preloader      | dark  | –   | 1–7   (0.0–1.5 s)  | wordmark `YASH` + wavy-ring draw |
| 1 | Hero           | light | no  | 8–14  (1.75–3.25 s) | `EXPLORE MY / PORTFOLIO`, headshot silhouette |
| 2 | About          | dark  | yes | 16–31 (3.75–7.5 s)  | card expand, `ABOUT`/`ME` split, spotlight portrait, bio |
| 3 | Experience     | dark  | yes | 32–48 (7.75–11.75 s) | horizontal panels, giant ghost text |
| 4 | Publications   | light | yes | 49–74 (12–18.25 s)  | curved 3D carousel (ref: "Landing Pages") |
| 5 | Works '26      | light | yes | 75–103 (18.5–25.5 s) | hex ring → drum cycle (ref: "Works '26") |
| 6 | Services       | light | no  | 103–108 (25.5–26.75 s) | numbered accordion, dark open card |
| 7 | Footer         | dark  | reveal | 108–116 (26.75–29 s) | `LET'S TALK`, pill links |

## 2. Colour

Monochrome, no accent hue. Sampled from the screen (phone camera, so values were
normalised toward neutral and rounded).

| Token            | Value     | Use |
|------------------|-----------|-----|
| `--paper`        | `#EFEDE8` | light section background (warm off-white) |
| `--paper-2`      | `#E6E4DE` | accordion rows, nav pill fill |
| `--ink`          | `#121212` | display text on paper |
| `--ink-2`        | `#3A3A38` | body text on paper |
| `--ink-3`        | `#8A8A86` | mono labels, muted |
| `--night`        | `#0B0B0D` | dark section background |
| `--night-2`      | `#141518` | cards on dark, footer |
| `--night-3`      | `#1E1F23` | borders on dark |
| `--chalk`        | `#F4F3EF` | display text on dark |
| `--chalk-2`      | `#B9B8B3` | body text on dark |
| `--chalk-3`      | `#6F6F6C` | mono labels on dark / ghost text |
| `--ghost`        | `rgba(244,243,239,0.07)` | giant background type in Experience |

Gradients used:
* Hero second line: `linear-gradient(180deg, #121212 0%, #121212 35%, rgba(18,18,18,0) 100%)` clipped to text.
* `LET'S TALK`: `linear-gradient(180deg, #FFFFFF 0%, #DADAD6 55%, #8E8E8A 100%)` clipped to text.
* Spotlight beam: conic/linear white → transparent from top-right, `mix-blend-mode: screen`.

## 3. Typography

Reference uses a heavy geometric grotesque for display, a humanist grotesque for body and
a monospace for labels. We self-host (see `public/fonts/`):

| Role    | Family            | Weights | Notes |
|---------|-------------------|---------|-------|
| Display | Archivo (variable, wdth 100–125) | 700–900 | `font-stretch: 112%` for hero/footer, `letter-spacing: -0.03em` |
| Body    | Instrument Sans   | 400–700 | 15–18 px, `line-height 1.5` |
| Mono    | JetBrains Mono    | 400–500 | 10–12 px, uppercase, `letter-spacing: 0.14em` |

Measured sizes (desktop, 1440 wide):

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Hero line 1/2 | `clamp(64px, 11.5vw, 176px)` | 800 | -0.035em |
| Section H2 (`WHERE I'VE BEEN`, `FULL STACK DEVELOPER`) | `clamp(48px, 6.4vw, 96px)` | 800 | -0.03em |
| `LET'S TALK` | `clamp(72px, 12vw, 190px)` | 800 | -0.04em |
| Section label (`LANDING PAGES`, `WORKS '26`) | 28–40 px | 700 | -0.02em |
| Nav items | 11 px mono/uppercase | 500 | 0.12em |
| Mono micro labels | 10–11 px | 500 | 0.14–0.18em |
| Body copy | 15–17 px | 400/500 | 0 |

## 4. Spacing & shape

* Page gutter: `clamp(20px, 3.2vw, 48px)`.
* Pill radius: `999px`; card radius: `18px` (about card), `12px` (3D cards), `14px` (services).
* Nav: 64 px tall, logo left, centred pill group, 4 icon buttons right (24 px hit areas).
* About card small state: ~`220×300` px, centred, `translateY(6vh)`; open state: `min(88vw, 1320px) × 78vh`.
* Experience panels: each `100vw`, content column `max-width: 62vw`, milestones 3-col grid at `gap: 48px`.
* Services rows: `max-width: 1180px`, 64 px tall collapsed, open card ~220 px.
* Footer: `100vh` dark, pill row centred at ~62% height, legal row at bottom corners.

## 5. Imagery treatment

* Hero portrait: transparent PNG, `filter: grayscale(1) contrast(1.25) brightness(0.55)`,
  bottom fade via `mask-image: linear-gradient(to bottom, #000 55%, transparent 100%)`.
* About portrait: B&W, `filter: contrast(1.1)`; spotlight beam overlaid; card inner shadow.
* About background: procedural "swirl" canvas (flow-field strokes, 8–10 bright vortices),
  grayscale, drawn once to an offscreen canvas and slowly drifted (`translate3d`) while pinned.
* 3D card textures: rendered to canvas at 1024×640 (light or dark variants) so every card
  looks like a finished landing page even when the source figure is weak.

## 6. Accessibility / performance budget

* `prefers-reduced-motion`: pins keep layout but tweens jump to end state; 3D stays static.
* All text is real DOM text (SplitText splits are re-joined for screen readers).
* Images ≤ 1800 px, total `public/img` ≈ 1.7 MB; fonts ≈ 150 KB; JS target < 450 KB gz.
* Lighthouse target: Perf ≥ 85 desktop, A11y ≥ 95.
