/*
 * Renders a "landing page" style card to a canvas so every 3D card looks finished.
 * Returns an HTMLCanvasElement (1024×640). Images are optional and loaded async; call
 * again via the returned promise's resolution to upgrade the texture.
 */
const W = 1024, H = 640

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath()
}

function drawArt(ctx, kind, theme, x, y, w, h) {
  const fg = theme === 'dark' ? 'rgba(244,243,239,' : 'rgba(18,18,18,'
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  if (kind === 'ecg') {
    ctx.strokeStyle = fg + '0.85)'; ctx.lineWidth = 3; ctx.lineJoin = 'round'
    ctx.beginPath()
    const mid = y + h * 0.55
    let px = x
    ctx.moveTo(px, mid)
    while (px < x + w) {
      const seg = [[18, 0], [10, -6], [10, 6], [8, 0], [6, -60], [8, 90], [8, -40], [10, 0], [16, -14], [16, 0], [30, 0]]
      for (const [dx, dy] of seg) { px += dx; ctx.lineTo(px, mid + dy * (h / 240)) }
    }
    ctx.stroke()
    ctx.strokeStyle = fg + '0.12)'; ctx.lineWidth = 1
    for (let gx = x; gx < x + w; gx += 24) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); ctx.stroke() }
    for (let gy = y; gy < y + h; gy += 24) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke() }
  } else if (kind === 'retina') {
    const cx = x + w / 2, cy = y + h / 2, R = Math.min(w, h) * 0.46
    for (let i = 0; i < 9; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, R * (i + 1) / 9, 0, Math.PI * 2)
      ctx.strokeStyle = fg + (0.15 + i * 0.07) + ')'; ctx.lineWidth = i % 3 === 0 ? 2 : 1; ctx.stroke()
    }
    // vessels
    ctx.lineWidth = 2.5
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2 + 0.3
      ctx.beginPath(); ctx.moveTo(cx, cy)
      let px = cx, py = cy
      for (let s = 1; s <= 10; s++) {
        px = cx + Math.cos(a + Math.sin(s) * 0.25) * (R / 10) * s
        py = cy + Math.sin(a + Math.cos(s) * 0.25) * (R / 10) * s
        ctx.lineTo(px, py)
      }
      ctx.strokeStyle = fg + '0.7)'; ctx.stroke()
    }
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.3)
    g.addColorStop(0, fg + '0.9)'); g.addColorStop(1, fg + '0)')
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  } else {
    // typographic stripes fallback
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = fg + (0.05 + (i % 3) * 0.05) + ')'
      ctx.fillRect(x, y + (i * h) / 14, w, h / 28)
    }
  }
  ctx.restore()
}

/* Where the slide sits inside a lecture card, as fractions of the card (used for the viewer FLIP). */
export const LECTURE_SLIDE = { x: 28 / W, y: 24 / H, w: 968 / W, h: 544 / H }

export function renderLectureCard(item, cover) {
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  const sx = 28, sy = 24, sw = 968, sh = 544
  const draw = (img) => {
    ctx.fillStyle = '#0c0d11'; ctx.fillRect(0, 0, W, H)
    ctx.save(); roundRect(ctx, sx, sy, sw, sh, 10); ctx.clip()
    ctx.fillStyle = '#16181f'; ctx.fillRect(sx, sy, sw, sh)
    if (img) {
      const s = Math.min(sw / img.width, sh / img.height)
      const iw = img.width * s, ih = img.height * s
      ctx.drawImage(img, sx + (sw - iw) / 2, sy + (sh - ih) / 2, iw, ih)
    } else {
      ctx.fillStyle = '#f4f3ef'; ctx.font = '800 54px Archivo, Arial'
      ctx.fillText(item.title.toUpperCase().slice(0, 26), sx + 40, sy + sh / 2)
      ctx.fillStyle = '#8d8d89'; ctx.font = '500 16px "JetBrains Mono", monospace'
      ctx.fillText('LOADING SLIDES', sx + 42, sy + sh / 2 + 44)
    }
    ctx.restore()
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2; roundRect(ctx, sx, sy, sw, sh, 10); ctx.stroke()
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#f4f3ef'; ctx.font = '700 24px Archivo, Arial'
    ctx.fillText(item.title, sx + 4, 604)
    ctx.textAlign = 'right'; ctx.fillStyle = '#8d8d89'; ctx.font = '500 13px "JetBrains Mono", monospace'
    ctx.fillText((item.event + '  ·  ' + item.date).toUpperCase(), W - sx - 4, 604)
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
  }
  draw(null)
  const ready = (cover ? cover() : Promise.resolve(null)).then((p) => new Promise((res) => {
    if (!p) return res(c)
    const img = new Image()
    img.onload = () => { draw(img); res(c) }
    img.onerror = () => res(c)
    img.src = p.url
  }), () => c)
  return { canvas: c, ready }
}

export function renderCard(item, { kind = 'work' } = {}) {
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  const dark = item.theme === 'dark'
  const bg = dark ? '#0c0c0e' : '#f8f7f4'
  const fg = dark ? '#f4f3ef' : '#121212'
  const mute = dark ? '#8d8d89' : '#7a7a76'

  const draw = (img) => {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
    // nav row
    ctx.fillStyle = fg; ctx.font = '700 20px Archivo, Arial'; ctx.textBaseline = 'alphabetic'
    ctx.fillText((item.name || item.venue || 'YASH').toUpperCase().slice(0, 18), 40, 52)
    ctx.font = '500 13px "JetBrains Mono", monospace'; ctx.fillStyle = mute
    const navItems = kind === 'work' ? ['OVERVIEW', 'METHOD', 'RESULTS', 'TEAM'] : ['ABSTRACT', 'FIGURES', 'CITE']
    let nx = W / 2 - 160
    for (const n of navItems) { ctx.fillText(n, nx, 50); nx += ctx.measureText(n).width + 36 }
    // cta pill
    roundRect(ctx, W - 160, 30, 120, 32, 16); ctx.fillStyle = fg; ctx.fill()
    ctx.fillStyle = bg; ctx.font = '500 12px "JetBrains Mono", monospace'; ctx.fillText(kind === 'work' ? 'LAUNCH ↗' : 'READ ↗', W - 134, 51)

    // image / art area
    const ax = 40, ay = 96, aw = img ? W - 80 : W - 80, ah = 300
    ctx.save(); roundRect(ctx, ax, ay, aw, ah, 14); ctx.clip()
    if (img) {
      const s = Math.max(aw / img.width, ah / img.height)
      const iw = img.width * s, ih = img.height * s
      ctx.filter = 'grayscale(1) contrast(1.05)'
      ctx.drawImage(img, ax + (aw - iw) / 2, ay + (ah - ih) / 2, iw, ih)
      ctx.filter = 'none'
      const g = ctx.createLinearGradient(0, ay, 0, ay + ah)
      g.addColorStop(0, dark ? 'rgba(12,12,14,0)' : 'rgba(241,239,234,0)')
      g.addColorStop(1, dark ? 'rgba(12,12,14,0.9)' : 'rgba(241,239,234,0.9)')
      ctx.fillStyle = g; ctx.fillRect(ax, ay, aw, ah)
    } else {
      ctx.fillStyle = dark ? '#121316' : '#e4e2dc'; ctx.fillRect(ax, ay, aw, ah)
      drawArt(ctx, item.art || 'stripes', item.theme, ax, ay, aw, ah)
    }
    ctx.restore()

    // headline over art bottom
    ctx.fillStyle = fg
    ctx.font = '800 44px Archivo, Arial'
    const title = (item.title || '').replace(/\.$/, '.')
    ctx.fillText(title, 56, 360)
    ctx.font = '400 18px "Instrument Sans", Arial'; ctx.fillStyle = mute
    ctx.fillText(item.sub || '', 56, 392)

    // bottom meta
    ctx.strokeStyle = dark ? 'rgba(244,243,239,0.15)' : 'rgba(18,18,18,0.12)'
    ctx.beginPath(); ctx.moveTo(40, 440); ctx.lineTo(W - 40, 440); ctx.stroke()
    ctx.font = '500 12px "JetBrains Mono", monospace'; ctx.fillStyle = mute
    ctx.fillText((item.tags || item.venue || '').toUpperCase(), 40, 470)
    ctx.textAlign = 'right'; ctx.fillStyle = fg
    ctx.font = '700 14px "JetBrains Mono", monospace'
    ctx.fillText((item.metric || 'YASH LAHOTI').toUpperCase(), W - 40, 470)
    ctx.textAlign = 'left'
    // faux paragraph lines
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = dark ? 'rgba(244,243,239,' + (0.12 - i * 0.03) + ')' : 'rgba(18,18,18,' + (0.12 - i * 0.03) + ')'
      roundRect(ctx, 40, 500 + i * 26, (W - 80) * (0.92 - i * 0.18), 10, 5); ctx.fill()
    }
    // border
    ctx.strokeStyle = dark ? 'rgba(255,255,255,0.12)' : 'rgba(18,18,18,0.16)'; ctx.lineWidth = 3
    ctx.strokeRect(1.5, 1.5, W - 3, H - 3)
    // footer label
    ctx.fillStyle = mute; ctx.font = '500 11px "JetBrains Mono", monospace'
    ctx.fillText((item.name || item.venue || '').toUpperCase() + '  ·  YASH LAHOTI', 40, H - 28)
    ctx.textAlign = 'right'; ctx.fillText('© 2026', W - 40, H - 28); ctx.textAlign = 'left'
  }

  draw(null)
  let ready = Promise.resolve(c)
  if (item.img) {
    ready = new Promise((res) => {
      const img = new Image()
      img.onload = () => { draw(img); res(c) }
      img.onerror = () => res(c)
      img.src = item.img
    })
  }
  return { canvas: c, ready }
}
