/*
 * Procedural monochrome "swirl" background (flow-field strokes + vortices), evoking the
 * reference's ink-drawn night sky without shipping a 2 MB raster. Draws once to a canvas.
 */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function drawSwirl(canvas, { width, height, seed = 7, strokes = 2600 } = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  const rnd = mulberry32(seed)

  // base: deep charcoal with soft vertical gradient
  const g = ctx.createLinearGradient(0, 0, 0, height)
  g.addColorStop(0, '#15161a'); g.addColorStop(0.6, '#0e0f12'); g.addColorStop(1, '#070708')
  ctx.fillStyle = g; ctx.fillRect(0, 0, width, height)

  // vortices (stars / moon)
  const vortices = []
  const nV = 9
  for (let i = 0; i < nV; i++) {
    vortices.push({
      x: (0.06 + 0.88 * rnd()) * width,
      y: (0.05 + 0.6 * rnd()) * height,
      r: (0.05 + rnd() * 0.09) * Math.min(width, height),
      s: rnd() > 0.5 ? 1 : -1,
      k: 0.6 + rnd() * 1.4,
    })
  }
  // one big moon top-right
  vortices.push({ x: width * 0.82, y: height * 0.18, r: Math.min(width, height) * 0.16, s: 1, k: 2.2, moon: true })

  function field(x, y) {
    // base horizontal drift with gentle wave
    let vx = 1, vy = 0.35 * Math.sin(y / 90 + x / 400)
    for (const v of vortices) {
      const dx = x - v.x, dy = y - v.y
      const d2 = dx * dx + dy * dy
      const d = Math.sqrt(d2) + 1e-3
      const fall = Math.exp(-d2 / (2 * (v.r * 1.6) ** 2))
      // tangential component
      vx += (-dy / d) * v.s * v.k * fall * 3
      vy += (dx / d) * v.s * v.k * fall * 3
    }
    const m = Math.hypot(vx, vy) || 1
    return [vx / m, vy / m]
  }

  ctx.lineCap = 'round'
  for (let i = 0; i < strokes; i++) {
    let x = rnd() * width, y = rnd() * height
    const len = 18 + rnd() * 60
    const step = 2.2
    let near = 0
    for (const v of vortices) {
      const d = Math.hypot(x - v.x, y - v.y)
      near = Math.max(near, Math.exp(-(d * d) / (2 * (v.r * 1.4) ** 2)))
    }
    const base = 0.12 + rnd() * 0.3
    const lum = Math.min(1, base + near * 0.8)
    const w = 0.6 + rnd() * 1.6 + near * 1.2
    ctx.strokeStyle = `rgba(${Math.round(200 * lum + 30)},${Math.round(200 * lum + 30)},${Math.round(196 * lum + 30)},${0.25 + near * 0.55})`
    ctx.lineWidth = w
    ctx.beginPath(); ctx.moveTo(x, y)
    for (let s = 0; s < len; s += step) {
      const [fx, fy] = field(x, y)
      x += fx * step; y += fy * step
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  // glow cores
  for (const v of vortices) {
    const rg = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, v.r * (v.moon ? 0.9 : 0.55))
    rg.addColorStop(0, v.moon ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)')
    rg.addColorStop(0.35, 'rgba(255,255,255,0.28)')
    rg.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = rg
    ctx.beginPath(); ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2); ctx.fill()
  }

  // horizon: dark hills with fine hatching
  ctx.fillStyle = '#050506'
  ctx.beginPath()
  ctx.moveTo(0, height)
  ctx.lineTo(0, height * 0.78)
  for (let x = 0; x <= width; x += 20) {
    const y = height * (0.78 - 0.07 * Math.sin(x / 260 + 1.2) - 0.03 * Math.sin(x / 90))
    ctx.lineTo(x, y)
  }
  ctx.lineTo(width, height)
  ctx.closePath(); ctx.fill()

  // spires (cypress / city) silhouettes left
  ctx.fillStyle = '#030304'
  const spires = [[0.06, 0.26], [0.1, 0.4], [0.13, 0.3], [0.17, 0.22], [0.2, 0.36], [0.24, 0.3]]
  for (const [px, ph] of spires) {
    const bx = px * width, h = ph * height, w = 0.012 * width + rnd() * 0.01 * width
    ctx.beginPath(); ctx.moveTo(bx - w, height * 0.86); ctx.lineTo(bx, height * 0.86 - h); ctx.lineTo(bx + w, height * 0.86); ctx.closePath(); ctx.fill()
    // window glints
    for (let k = 0; k < 10; k++) {
      if (rnd() < 0.5) continue
      const yy = height * 0.86 - rnd() * h * 0.75
      const ww = (1 - (height * 0.86 - yy) / h) * w * 0.9
      ctx.fillStyle = 'rgba(255,255,255,' + (0.3 + rnd() * 0.5) + ')'
      ctx.fillRect(bx - ww + rnd() * ww * 2, yy, 1.6, 1.6)
      ctx.fillStyle = '#030304'
    }
  }
  return canvas
}
