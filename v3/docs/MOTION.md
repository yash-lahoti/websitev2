# Motion Spec — measured from the reference

Times are seconds in the reference video (30 fps). Scroll-driven sequences are given in
scroll progress `p ∈ [0,1]` of the pinned ScrollTrigger. Easing names are GSAP eases.

## 0. Preloader (t = 0.0 → 1.5 s)
* Dark `#0B0B0D` full-screen. Wordmark centred, 44 px, tracking 0.32em, white.
* A glowing dot (8 px, blur 6 px) draws a **wavy ring** (10 lobes, r = 150 px, amplitude 12 px)
  clockwise starting at the top-right. Stroke 2 px white; DrawSVG 0 → 100 % over 1.0 s,
  `power1.inOut`. The dot follows the path (MotionPath).
* At 100 % the dot lands at the right of the wordmark and becomes the full stop: `YASH.`
* Hold 0.25 s, then the overlay **wipes up** (`yPercent: -100`, 0.8 s, `power4.inOut`)
  while the hero starts its blur-in 0.2 s before the wipe ends.

## 1. Hero load (t = 1.75 → 2.5 s)
* Headline words: `filter: blur(18px)` + `opacity 0` + `y 30` → clear, 0.9 s, stagger 0.08,
  `power3.out`. Line 2 has the gradient fade baked in (not animated).
* Portrait: `opacity 0, y 40, scale 1.04` → rest, 1.1 s, `power3.out`, starts at +0.15 s.
* Corner copy (left est., right manifesto, service list): `opacity 0 → 1`, 0.6 s, +0.5 s.
* Nav pills: fade in, stagger 0.04, +0.3 s.
* Idle: portrait has a 6 s `y ±6px` sine loop; headline none.

## 2. About (pinned, 300 vh)
Timeline on the pinned section, scrubbed (`scrub: 0.6`):

| p | What |
|---|------|
| 0.00–0.10 | hero scrolls away normally; dark swirl section slides in beneath (z-order, no transform). |
| 0.00–0.35 | Card scales `0.18 → 1.0` (from 220×300 centred to full card). `ABOUT`/`ME` stay centred in the card until p = 0.25. |
| 0.25–0.45 | `ABOUT` translates `x: -42vw`, `ME` translates `x: +42vw`; both fade 1 → 0 by p = 0.5. |
| 0.30–0.55 | Portrait inside card: `scale 1.15 → 1`, `opacity 0.4 → 1`; spotlight beam `opacity 0 → 1`. |
| 0.55–0.75 | Copy: top-left manifesto, top-right location, bottom-left paragraph, bottom-right buttons — `y 24, opacity 0 → 1` stagger 0.08. |
| 0.75–1.00 | Hold; swirl background drifts `x: -3%` for parallax. |

Swirl background: 1.0× → 1.08× scale over the pin; brightness 0.9 → 0.7 as copy appears.

## 3. Experience (pinned, horizontal, (panels−1) × 100 vw of scroll)
* Track translates `x: 0 → -(N-1)*100vw`, linear with scroll.
* Ghost text layer (one long line: role names + years) translates at **0.45×** the track
  speed (parallax), opacity 0.07, size `clamp(140px, 22vw, 320px)`.
* Each panel's H2 enters with `clipPath` wipe from bottom (`inset(100% 0 0 0)` → `inset(0)`),
  0.6 s, when the panel passes 60 % visibility; milestones stagger 0.06 after it.
* Skew-on-velocity: the whole track gets `skewX = clamp(velocity/-300, -6, 6)` deg, decayed
  with `power3.out` 0.4 s (this reproduces the "smear" visible in frames 38–44).
* Top-right progress bar: width `p`.
* Bottom-left tabs highlight the category of the active panel.

## 4. Publications carousel (pinned, 400 vh)
* R3F scene: 6 cards on a **wavy ribbon**. The ribbon is a convex arc (radius `R = 6`, cards
  27° wide, spaced 31°) so both ends recede and shrink, plus a vertical S ramp
  `y = 1.1·(θ/90°)³` so the left end dips and the right end rises while the centre stays flat.
  Each card is a 32-segment plane whose vertices are re-projected onto that path every frame,
  which gives the curved card tops seen in frames 52–56. Cards beyond ±72° are hidden.
* Scroll slides the cards along the ribbon: `offset = -p · 31° · (N-1)`, eased at 16 %/frame.
  Horizontal drag nudges ±0.9 rad and springs back.
* Active index = round(p * (N-1)); caption (title, subtitle, `01 / 06`) crossfades
  (`opacity 0→1, y 8→0`, 0.35 s) on change.
* Side planes are tilted by `rotation.y` naturally; add `material.opacity` falloff
  `1 - 0.35*|angleFromFront|/π`.
* Section label `PUBLICATIONS` bottom-left; title `FEATURED RESEARCH` fades in at p = 0.
* Hover: pointer-drag rotates ±0.6 rad with spring back (drei `useGesture`-free manual).

## 5. Works '26 drum (pinned, 600 vh)
Two phases.

**Phase A — hexagon (p 0.00–0.20).** 6 cards (1.28 × 0.8 units) lie in the view plane on a
ring of radius 1.3, each oriented along the ring tangent so together they form the hexagon's
edges (top card upright). Centre text `WORKS '26`, right-side mono index, bottom hint
`↓ SCROLL OR DRAG DRUM TO CYCLE`. The ring slowly spins (−0.6 rad over the pin).

**Fold (p 0.20–0.34, smoothstep).** Each card's orientation is slerped from the "flat" basis
to a "drum" basis (normal radial-out, long edge horizontal) while the group rotates −90° about
Y so the ring's axis becomes horizontal; radius grows 1.3 → 1.7. Back-half cards fade out
(`smoothstep(cosθ, −0.15, 0.6)`), a soft shadow plane sits behind each card.

**Phase B — drum (p 0.34–1.00).** Ring angle advances `60° × (N−1)` over the remaining scroll:
the front card is centred (scaled ×1.12), the next peeks from the top foreshortened, the
previous exits at the bottom. Left label and right index update on index change
(`y 12 → 0`, 0.4 s). Vertical drag nudges the drum and springs back.

## 6. Services (not pinned)
* Heading `clipPath` wipe + sub-copy fade when 70 % visible.
* Rows stagger `y 16, opacity 0 → 1`, 0.08.
* Accordion: open row background `#121212`, text chalk, height auto via GSAP `Flip`-free
  approach: measure `scrollHeight`, tween `height` 0.45 s `power3.inOut`; chevron rotates 180°.

## 7. Footer reveal
* Footer is `position: sticky; bottom: 0; z-index: 0` under the page (`main` has
  `z-index: 1; margin-bottom: 100vh` equivalent via wrapper). Visually the services section
  slides up to uncover it — matches frames 108–109.
* `LET'S TALK` letters: `yPercent 110 → 0`, stagger 0.03, `power4.out` 0.9 s on enter.
* Pills: `scale 0.9, opacity 0 → 1`, stagger 0.05.

## Global
* Lenis smooth scroll: `lerp 0.1`, `wheelMultiplier 1`, synced to `gsap.ticker`.
* `ScrollTrigger.normalizeScroll(true)` is **not** used (conflicts with Lenis).
* Reduced motion: all pins keep `pin: true` but scrub tweens are replaced by `progress(1)`.
