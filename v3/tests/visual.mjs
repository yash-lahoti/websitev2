/*
 * Visual test loop.
 *   node tests/visual.mjs             → uses running dev server at $URL or starts `vite preview`
 *   node tests/visual.mjs --preview   → builds nothing; starts `vite preview` on 4173
 * Captures every pinned sequence at several progress points + load states, checks for console
 * errors, and writes tests/shots/*.png + tests/report.json + tests/shots/contact.png
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, 'shots')
const args = process.argv.slice(2)
const W = Number(process.env.W || 1440), H = Number(process.env.H || 900)
let url = process.env.URL || 'http://localhost:4173'
let server

async function waitFor(u, ms = 20000) {
  const t0 = Date.now()
  while (Date.now() - t0 < ms) {
    try { const r = await fetch(u); if (r.ok) return true } catch {}
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error('server not reachable: ' + u)
}

if (!process.env.URL) {
  server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { cwd: join(here, '..'), stdio: 'ignore' })
  await waitFor(url)
}

if (existsSync(outDir)) rmSync(outDir, { recursive: true })
mkdirSync(outDir, { recursive: true })

const launch = { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }
if (process.env.CHROMIUM_PATH || existsSync('/opt/pw-browsers/chromium')) launch.executablePath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium'
const browser = await chromium.launch(launch)
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
const errors = [], warnings = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); else if (m.type() === 'warning') warnings.push(m.text()) })
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()))

const T0 = Date.now()
const log = (m) => process.stdout.write(((Date.now() - T0) / 1000).toFixed(1) + 's  ' + m + '\n')
const shots = []
async function shot(name) {
  const file = join(outDir, name + '.png')
  await page.screenshot({ path: file })
  shots.push(name)
  log('📸 ' + name)
}

log('goto ' + url)
await page.goto(url, { waitUntil: 'domcontentloaded' })
log('dcl; waiting for preloader timeline')
await page.waitForFunction(() => !!window.__preloaderTl, null, { timeout: 30000 })
log('preloader timeline present')
// step the preloader timeline deterministically (software GL makes wall-clock timing unreliable)
await page.evaluate(() => { window.__preloaderTl.pause() })
for (const f of [0.15, 0.3, 0.5, 0.66]) {
  await page.evaluate((ff) => { window.__preloaderTl.progress(ff) }, f)
  await page.waitForTimeout(150)
  await shot('00-preloader-p' + Math.round(f * 100))
}
await page.evaluate(() => { window.__preloaderTl.play() })
log('waiting for ready')
await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 })
log('ready')
await page.waitForTimeout(250)
await shot('01-hero-reveal')
await page.waitForTimeout(1600)
await shot('02-hero-settled')

// Deterministic scrolling through every pinned ScrollTrigger.
const pins = await page.evaluate(() => {
  const ST = window.__ST
  ST.refresh()
  return ST.getAll().filter((t) => t.pin).map((t) => ({ id: t.trigger.id || t.trigger.className, start: t.start, end: t.end }))
})
console.log('pinned sequences:', pins)

async function scrollTo(y) {
  await page.evaluate((yy) => {
    if (window.__lenis) window.__lenis.scrollTo(yy, { immediate: true, force: true })
    window.scrollTo(0, yy)
    window.__ST.update()
  }, y)
  await page.waitForTimeout(1200)
}

const steps = { about: [0.05, 0.3, 0.45, 0.7, 1], experience: [0, 0.25, 0.5, 0.75, 1], research: [0, 0.3, 0.6, 1], works: [0, 0.15, 0.3, 0.5, 0.75, 1] }
let k = 3
for (const p of pins) {
  const list = steps[p.id] || [0, 0.5, 1]
  for (const f of list) {
    await scrollTo(p.start + (p.end - p.start) * f)
    await shot(`${String(k).padStart(2, '0')}-${p.id}-p${Math.round(f * 100)}`)
  }
  k++
}
// services + footer
const docH = await page.evaluate(() => document.documentElement.scrollHeight)
const svcY = await page.evaluate(() => document.querySelector('#services').getBoundingClientRect().top + window.scrollY - 80)
await scrollTo(svcY); await page.waitForTimeout(600); await shot(`${k++}-services`)
await scrollTo(docH); await page.waitForTimeout(900); await shot(`${k++}-footer`)

// mobile pass (hero + about open + footer)
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(500)
await page.evaluate(() => window.__ST.refresh())
await scrollTo(0); await shot(`${k++}-mobile-hero`)
await scrollTo(docH); await page.waitForTimeout(600); await shot(`${k++}-mobile-footer`)

const report = { url, viewport: [W, H], shots, errors, warnings: warnings.slice(0, 20), pins }
writeFileSync(join(here, 'report.json'), JSON.stringify(report, null, 2))
console.log('\nerrors:', errors.length ? errors : 'none')
await browser.close()
server?.kill()

// contact sheet via python/PIL if available
try {
  const { execSync } = await import('node:child_process')
  execSync(`python3 - <<'PY'
from PIL import Image, ImageDraw
import glob, os
files=sorted(glob.glob('${outDir}/*.png'))
files=[f for f in files if 'mobile' not in f]
ims=[Image.open(f) for f in files]
w=480; tiles=[im.resize((w,int(im.height*w/im.width))) for im in ims]
cols=4; rows=(len(tiles)+cols-1)//cols; h=max(t.height for t in tiles)+18
sheet=Image.new('RGB',(cols*w,rows*h),'black'); d=ImageDraw.Draw(sheet)
for i,(f,t) in enumerate(zip(files,tiles)):
    x=(i%cols)*w; y=(i//cols)*h; sheet.paste(t,(x,y+18)); d.text((x+4,y+3),os.path.basename(f),fill='yellow')
sheet.save('${outDir}/contact.png')
PY`)
  console.log('contact sheet:', join(outDir, 'contact.png'))
} catch (e) { console.log('no contact sheet:', e.message) }
process.exit(errors.filter((e) => !e.includes('favicon')).length ? 1 : 0)
