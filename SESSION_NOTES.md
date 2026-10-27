# Session Notes — websitev2

Running log of key takeaways per working session. Newest first.

## 2026-10-27 — v3 redesign from reference video

**Goal.** Rebuild the personal site to match a reference portfolio recording (ECHO / "I hate
boring portfolio websites") frame by frame, with Yash's content, in a deploy-ready folder.

**What was done.**
- Extracted the 29 s reference at 1 fps and 4 fps (116 frames), cropped to the laptop viewport,
  and documented palette, type scale, layout and per-section motion in `v3/docs/DESIGN.md`
  and `v3/docs/MOTION.md`. Key reference frames are in `v3/docs/reference/`.
- Built `v3/` (Vite + React + GSAP + Lenis + react-three-fiber). Sections mirror the
  reference 1:1: preloader, hero, about (pinned card reveal), experience (horizontal), research
  (curved 3D wall), works (hex → drum), services (accordion), footer (reveal).
- Wrote a Playwright loop (`v3/tests/visual.mjs`) that steps every pinned timeline to fixed
  progress values, screenshots, and fails on console errors; iterated until states matched.

**Decisions.**
- Monochrome only (no accent hue), warm off-white paper `#EFEDE8` and near-black `#0B0B0D`.
- Fonts self-hosted from Google Fonts (Archivo / Instrument Sans / JetBrains Mono) because
  Fontshare is blocked by the sandbox proxy; swap in Clash Display/Satoshi later if preferred.
- 3D cards are rendered from data to canvas textures, so every card looks like a finished
  landing page even where the source figure is weak (e.g. generic book covers).
- The About background is procedural (flow-field strokes) rather than a licensed artwork.
- v3 lives beside the v2 app; Vercel should point its Root Directory at `v3`.

**Gotchas learned.**
- `background-clip: text` breaks when SplitText children are transformed → put the gradient on
  the split spans, not the parent.
- R3F does not recompile a material when `map` goes from undefined → texture; create
  CanvasTextures synchronously (useMemo) so the first render has them.
- For a ring rotated −90° about Y, local +X maps to world +Z (toward the camera); getting the
  sign wrong puts the faded back card in front.
- Under software GL (headless), GSAP lag smoothing distorts wall-clock timing; step timelines
  via `progress()` in tests instead.
- Vite walks up to the parent repo's `postcss.config.cjs`; a local `postcss.config.js` isolates v3.

**Open questions for Yash.**
1. Wordmark: `YASH.` is used as the brand (reference: `ECHO.`). Prefer `LAHOTI.` or `YL.`?
2. Hero portrait: the transparent headshot is used as a silhouette. A dedicated
   front-facing, dark, rim-lit photo would match the reference more closely.
3. Services section currently lists Clinical AI consulting, admissions advising and talks.
   Confirm wording/order and the contact email.
4. Works '26 shows six projects; swap in any you want featured and provide 16:10 images.
5. Fonts: keep the Google-hosted trio or license Clash Display + Satoshi?

**Next.**
- Review `v3/tests/shots/contact.png` vs `v3/docs/reference/00-contact-sheet-1fps.jpg`.
- Mobile pass (hex drum and horizontal panels at 390 px).
- Hook up a contact form or keep `mailto:`.
