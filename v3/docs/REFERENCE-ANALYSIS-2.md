# Second reference analysis (supplied by Yash, 2 fps pass)

Source reel: https://www.instagram.com/reel/DexTHhNTeh0/ by EchoBuilds (@echo__builds).
This file preserves the independent 2 fps breakdown Yash shared so the two readings can be
compared. Where it differs from `DESIGN.md` / `MOTION.md` (built from a 4 fps pass):

| Topic | 2 fps reading | 4 fps reading (what v3 implements) |
|---|---|---|
| Featured Project carousel | 2D sine-wave strip, cards rotate to local slope | **Agree on the wave, refined:** convex ribbon that recedes at both ends (edge cards shrink ~2×), S-shaped vertical ramp (left dips, right rises, centre flat), card geometry bent along the path. Implemented as a deformed Three.js ribbon. |
| Works '26 | 2D rotating ring, front-bottom card scales up | Hexagon ring that **folds into a vertical drum** (frames 82–84 show the fold; 85+ show the next card peeking from the top). Kept. |
| Dark background | near-black navy `#0A0D1A` | Adopted a navy tint: `--night #0A0C13`. |
| About card | thin light border | Border raised to 14 % white. |
| Services CTA | pill at card's right edge | `INQUIRE ↗` rendered as a pill. |
| Stack | Next.js + GSAP, Three.js optional | Vite + React + GSAP + react-three-fiber (two small scenes). |

Verbatim copy bank, token estimates and the per-section notes from that pass follow in the
original wording of the document Yash provided; treat hex values and durations there as
estimates read from 720p frames.
