import { useEffect, useRef } from 'react'
import useMonitorScroll from '../../../hooks/useMonitorScroll'
import './MonitorCanvas.css'

// ─── 3D Projection (module-level, pure functions) ─────────────────────────
function project(wx, wy, wz, W, H, prog) {
  // At prog=0: viewing from below-left — yaw slightly left, negative pitch (bottom tilts toward viewer)
  // At prog=1: face-on, centered
  const yaw   = (1 - prog) * -28 * (Math.PI / 180)
  const pitch = (1 - prog) * -18 * (Math.PI / 180)   // negative = bottom tilts toward viewer
  const x1 =  wx * Math.cos(yaw) + wz * Math.sin(yaw)
  const z1 = -wx * Math.sin(yaw) + wz * Math.cos(yaw)
  const y2 = wy  * Math.cos(pitch) - z1 * Math.sin(pitch)
  const z2 = wy  * Math.sin(pitch) + z1 * Math.cos(pitch)
  const focalLen = 2400
  const s = focalLen / (focalLen + z2 + 600)
  // At prog=0: centre sits in lower portion of canvas (we see from below)
  // cy: projection centre Y. Clamped so monitor never clips above y=0.
  // At prog=0 (tilted): centre at H*0.36 → top of monitor ~H*0.10 (safe)
  // At prog=1 (face-on): centre at H*0.46
  const cy = H * (0.46 + (1 - prog) * 0.02)
  return { x: W * 0.50 + x1 * s, y: cy + y2 * s, s }
}

function pathQuad(ctx, a, b, c, d) {
  ctx.beginPath()
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.lineTo(c.x, c.y)
  ctx.lineTo(d.x, d.y)
  ctx.closePath()
}

function fillQuad(ctx, a, b, c, d, style) {
  pathQuad(ctx, a, b, c, d)
  ctx.fillStyle = style
  ctx.fill()
}

// ─── Draw the monitor into a canvas context ───────────────────────────────
function drawMonitor(canvas, ctx, dpr, prog) {
  const W = canvas.width  / dpr
  const H = canvas.height / dpr
  ctx.clearRect(0, 0, W, H)

  const monW  = W  * 0.84
  const monH  = H  * 0.62
  const monD  = W  * 0.052
  const bezel = monH * 0.044
  const hd    = monD / 2
  const hw    = monW / 2
  const hh    = monH / 2

  const Pt = (x, y, z) => project(x, y, z, W, H, prog)

  const ftl = Pt(-hw, -hh, -hd)
  const ftr = Pt( hw, -hh, -hd)
  const fbr = Pt( hw,  hh, -hd)
  const fbl = Pt(-hw,  hh, -hd)
  const btl = Pt(-hw, -hh,  hd)
  const btr = Pt( hw, -hh,  hd)
  const bbr = Pt( hw,  hh,  hd)
  const bbl = Pt(-hw,  hh,  hd)

  // Drop shadow — tracks monitor bottom centre
  {
    const shadowPt = Pt(0, hh + monH * 0.08, 0)
    const sx = shadowPt.x
    const sy = shadowPt.y
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, monW * 0.42)
    sg.addColorStop(0,   'rgba(0,0,0,0.50)')
    sg.addColorStop(0.5, 'rgba(0,0,0,0.16)')
    sg.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = sg
    ctx.beginPath()
    ctx.ellipse(sx, sy, monW * 0.40, monW * 0.05, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // Back face
  fillQuad(ctx, btl, btr, bbr, bbl, '#020202')

  // Top face — hidden when viewed from below (dark, no rim)
  {
    pathQuad(ctx, btl, btr, ftr, ftl)
    const g = ctx.createLinearGradient(btl.x, btl.y, ftl.x, ftl.y)
    g.addColorStop(0, '#050505'); g.addColorStop(1, '#080808')
    ctx.fillStyle = g; ctx.fill()
  }

  // Bottom face — prominent when viewed from below
  {
    pathQuad(ctx, fbl, fbr, bbr, bbl)
    const litAmt = 1 - prog   // 1 at tilted, 0 at face-on
    const col0 = `rgb(${Math.round(22 + litAmt * 20)},${Math.round(22 + litAmt * 20)},${Math.round(22 + litAmt * 20)})`
    const col1 = `rgb(${Math.round(10 + litAmt * 8)},${Math.round(10 + litAmt * 8)},${Math.round(10 + litAmt * 8)})`
    const g = ctx.createLinearGradient(fbl.x, fbl.y, bbl.x, bbl.y)
    g.addColorStop(0, col0); g.addColorStop(1, col1)
    ctx.fillStyle = g; ctx.fill()
    // Bottom rim highlight — bright edge facing viewer
    const rimAlpha = 0.08 + litAmt * 0.22
    ctx.strokeStyle = `rgba(255,255,255,${rimAlpha.toFixed(2)})`; ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.moveTo(fbl.x, fbl.y); ctx.lineTo(fbr.x, fbr.y); ctx.stroke()
  }

  // Left face — slightly visible from left yaw
  {
    pathQuad(ctx, ftl, btl, bbl, fbl)
    const litAmt = 1 - prog
    const g = ctx.createLinearGradient(ftl.x, ftl.y, btl.x, btl.y)
    g.addColorStop(0, `rgba(30,30,30,${0.4 + litAmt * 0.5})`)
    g.addColorStop(1, `rgba(8,8,8,${0.4 + litAmt * 0.5})`)
    ctx.fillStyle = g; ctx.fill()
    ctx.strokeStyle = `rgba(255,255,255,${(0.04 + litAmt * 0.08).toFixed(2)})`; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(ftl.x, ftl.y); ctx.lineTo(fbl.x, fbl.y); ctx.stroke()
  }

  // Right face — dark
  {
    pathQuad(ctx, ftr, btr, bbr, fbr)
    ctx.fillStyle = '#060606'; ctx.fill()
  }

  // Front face (bezel) — bottom rim is bright, top is dim (viewed from below)
  fillQuad(ctx, ftl, ftr, fbr, fbl, '#0d0d0d')
  // Bottom bezel edge — catches most light when viewed from below
  const botRimAlpha = 0.20 + (1 - prog) * 0.18
  ctx.strokeStyle = `rgba(255,255,255,${botRimAlpha.toFixed(2)})`; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(fbl.x, fbl.y); ctx.lineTo(fbr.x, fbr.y); ctx.stroke()
  // Top bezel edge — dim
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(ftl.x, ftl.y); ctx.lineTo(ftr.x, ftr.y); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(ftl.x, ftl.y); ctx.lineTo(fbl.x, fbl.y); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(ftr.x, ftr.y); ctx.lineTo(fbr.x, fbr.y); ctx.stroke()

  // ── Screen content ──────────────────────────────────────────────────────
  ctx.save()
  pathQuad(ctx, ftl, ftr, fbr, fbl)
  ctx.clip()

  const stl = Pt(-hw + bezel, -hh + bezel, -hd)
  const str = Pt( hw - bezel, -hh + bezel, -hd)
  const sbr = Pt( hw - bezel,  hh - bezel, -hd)
  const sbl = Pt(-hw + bezel,  hh - bezel, -hd)

  const scrW = 1440
  const scrH = 900

  const SC = (sx, sy) => {
    const wx = -hw + bezel + (sx / scrW) * (monW - bezel * 2)
    const wy = -hh + bezel + (sy / scrH) * (monH - bezel * 2)
    return Pt(wx, wy, -hd)
  }

  const SR = (sx, sy, sw, sh, color) => {
    const a = SC(sx, sy); const b = SC(sx + sw, sy)
    const c = SC(sx + sw, sy + sh); const d = SC(sx, sy + sh)
    pathQuad(ctx, a, b, c, d); ctx.fillStyle = color; ctx.fill()
  }

  const SRS = (sx, sy, sw, sh, color, lw) => {
    const a = SC(sx, sy); const b = SC(sx + sw, sy)
    const c = SC(sx + sw, sy + sh); const d = SC(sx, sy + sh)
    pathQuad(ctx, a, b, c, d); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke()
  }

  const SHL = (x1, y, x2, color, lw) => {
    const p1 = SC(x1, y); const p2 = SC(x2, y)
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y)
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke()
  }

  const SVL = (x, y1, y2, color, lw) => {
    const p1 = SC(x, y1); const p2 = SC(x, y2)
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y)
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke()
  }

  fillQuad(ctx, stl, str, sbr, sbl, '#0a090b')
  for (let gx = 0; gx < scrW; gx += 120) SVL(gx, 0, scrH, 'rgba(255,255,255,0.018)', 0.5)
  for (let gy = 0; gy < scrH; gy += 120) SHL(0, gy, scrW, 'rgba(255,255,255,0.018)', 0.5)

  const NAV_H = 60
  SR(0, 0, scrW, NAV_H, 'rgba(10,9,11,0.95)')
  SHL(0, NAV_H, scrW, 'rgba(255,255,255,0.06)', 0.8)
  SR(32, 18, 90, 24, 'rgba(255,255,255,0.90)')
  ;[220, 320, 420, 540].forEach(nx => SR(nx, 22, 60, 16, 'rgba(255,255,255,0.22)'))
  SR(scrW - 160, 16, 100, 28, 'rgba(80,100,240,0.85)')
  SR(scrW - 44,  18,  24, 24, 'rgba(255,255,255,0.08)')

  const HERO_TOP = NAV_H + 60
  SR(60, HERO_TOP - 36, 160, 22, 'rgba(80,100,240,0.30)')
  SRS(60, HERO_TOP - 36, 160, 22, 'rgba(80,100,240,0.55)', 0.8)
  SR(70, HERO_TOP - 32, 100, 14, 'rgba(180,190,255,0.50)')
  SR(60, HERO_TOP,       760, 72, 'rgba(255,255,255,0.92)')
  SR(60, HERO_TOP + 90,  560, 72, 'rgba(255,255,255,0.92)')
  SR(60, HERO_TOP + 180, 380, 72, 'rgba(255,255,255,0.92)')
  SR(60, HERO_TOP + 278, 420, 12, 'rgba(255,255,255,0.30)')
  SR(60, HERO_TOP + 298, 380, 12, 'rgba(255,255,255,0.20)')
  SR(60, HERO_TOP + 318, 340, 12, 'rgba(255,255,255,0.14)')
  SR(60,  HERO_TOP + 350, 160, 44, 'rgba(80,100,240,0.90)')
  SRS(240, HERO_TOP + 350, 140, 44, 'rgba(255,255,255,0.28)', 1)

  SR(880, HERO_TOP - 10, 480, 380, 'rgba(255,255,255,0.04)')
  SRS(880, HERO_TOP - 10, 480, 380, 'rgba(255,255,255,0.10)', 0.8)
  {
    const bc = SC(1120, HERO_TOP + 180)
    const be = SC(1120 + 150, HERO_TOP + 180)
    const br = Math.abs(be.x - bc.x)
    if (br > 0) {
      const bg = ctx.createRadialGradient(bc.x, bc.y, 0, bc.x, bc.y, br * 1.4)
      bg.addColorStop(0,   'rgba(100,120,255,0.35)')
      bg.addColorStop(0.4, 'rgba(80,60,200,0.18)')
      bg.addColorStop(0.8, 'rgba(60,40,150,0.06)')
      bg.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = bg
      ctx.beginPath(); ctx.arc(bc.x, bc.y, br * 1.5, 0, Math.PI * 2); ctx.fill()
    }
  }
  SR(900, HERO_TOP + 20, 200, 14, 'rgba(255,255,255,0.18)')
  SR(900, HERO_TOP + 42, 140, 10, 'rgba(255,255,255,0.10)')
  SR(1280, HERO_TOP + 20, 60, 60, 'rgba(255,255,255,0.06)')
  SRS(1280, HERO_TOP + 20, 60, 60, 'rgba(255,255,255,0.20)', 0.8)
  ;[0, 130, 260].forEach(tx => {
    SR(900 + tx, HERO_TOP + 290, 110, 28, 'rgba(255,255,255,0.06)')
    SRS(900 + tx, HERO_TOP + 290, 110, 28, 'rgba(255,255,255,0.15)', 0.7)
  })

  const MQ_Y = HERO_TOP + 430
  SR(0, MQ_Y, scrW, 44, 'rgba(255,255,255,0.03)')
  SHL(0, MQ_Y, scrW, 'rgba(255,255,255,0.06)', 0.7)
  SHL(0, MQ_Y + 44, scrW, 'rgba(255,255,255,0.06)', 0.7)
  ;[0, 260, 520, 780, 1040, 1300].forEach(tx => {
    SR(tx + 30, MQ_Y + 14, 180, 16, 'rgba(255,255,255,0.16)')
    SR(tx + 222, MQ_Y + 18, 8, 8, 'rgba(255,255,255,0.30)')
  })

  const GRID_TOP = MQ_Y + 60
  const CARD_W   = 660
  const CARD_H   = 200
  ;[[60, GRID_TOP], [740, GRID_TOP]].forEach(([cx, cy]) => {
    SR(cx, cy, CARD_W, CARD_H, 'rgba(255,255,255,0.04)')
    SRS(cx, cy, CARD_W, CARD_H, 'rgba(255,255,255,0.10)', 0.7)
    SR(cx + 12, cy + 12, CARD_W - 24, CARD_H * 0.55, 'rgba(255,255,255,0.06)')
    SR(cx + 12, cy + CARD_H * 0.65,      CARD_W * 0.55, 14, 'rgba(255,255,255,0.60)')
    SR(cx + 12, cy + CARD_H * 0.65 + 22, CARD_W * 0.35, 10, 'rgba(255,255,255,0.22)')
    SR(cx + CARD_W - 80, cy + CARD_H - 32, 68, 20, 'rgba(80,100,240,0.30)')
    SRS(cx + CARD_W - 80, cy + CARD_H - 32, 68, 20, 'rgba(80,100,240,0.55)', 0.7)
  })

  const FOOT_Y = scrH - 52
  SHL(0, FOOT_Y, scrW, 'rgba(255,255,255,0.06)', 0.7)
  SR(60, FOOT_Y + 14, 100, 12, 'rgba(255,255,255,0.40)')
  SR(60, FOOT_Y + 32, 220, 10, 'rgba(255,255,255,0.14)')
  SR(scrW - 200, FOOT_Y + 14, 40, 12, 'rgba(255,255,255,0.18)')
  SR(scrW - 148, FOOT_Y + 14, 40, 12, 'rgba(255,255,255,0.18)')
  SR(scrW - 96,  FOOT_Y + 14, 40, 12, 'rgba(255,255,255,0.18)')

  SVL(56, NAV_H, FOOT_Y, 'rgba(255,255,255,0.04)', 0.7)
  ;[[56, NAV_H], [56, FOOT_Y], [scrW - 56, NAV_H], [scrW - 56, FOOT_Y]].forEach(([px, py]) => {
    const arm = 8
    const lx = SC(px - arm, py); const rx = SC(px + arm, py)
    const ty = SC(px, py - arm); const by = SC(px, py + arm)
    ctx.strokeStyle = 'rgba(255,255,255,0.24)'; ctx.lineWidth = 0.8
    ctx.beginPath(); ctx.moveTo(lx.x, lx.y); ctx.lineTo(rx.x, rx.y); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ty.x, ty.y); ctx.lineTo(by.x, by.y); ctx.stroke()
  })

  {
    const g1 = SC(0, 0); const g2 = SC(scrW * 0.5, scrH * 0.4)
    const gg = ctx.createLinearGradient(g1.x, g1.y, g2.x, g2.y)
    gg.addColorStop(0,   'rgba(255,255,255,0.07)')
    gg.addColorStop(0.5, 'rgba(255,255,255,0.02)')
    gg.addColorStop(1,   'rgba(255,255,255,0.00)')
    ctx.fillStyle = gg; pathQuad(ctx, stl, str, sbr, sbl); ctx.fill()
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1
  pathQuad(ctx, stl, str, sbr, sbl); ctx.stroke()
  ctx.restore()

  // Camera dot
  const cam = Pt(0, -hh + bezel * 0.5, -hd)
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath(); ctx.arc(cam.x, cam.y, 4 * cam.s, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(0,0,0,0.6)'
  ctx.beginPath(); ctx.arc(cam.x, cam.y, 2 * cam.s, 0, Math.PI * 2); ctx.fill()

  // ── Stand ───────────────────────────────────────────────────────────────
  ctx.globalAlpha = 1

  const NK_RX   = monW * 0.025
  const NK_RZ   = monD * 0.65
  const NK_Y0   = hh
  const NK_LEN  = H * 0.12
  const NK_Y1   = NK_Y0 + NK_LEN
  const NK_SEGS = 32
  const nkTop = [], nkBot = []
  for (let i = 0; i <= NK_SEGS; i++) {
    const a = (i / NK_SEGS) * Math.PI * 2
    nkTop.push(Pt(Math.cos(a) * NK_RX, NK_Y0, Math.sin(a) * NK_RZ))
    nkBot.push(Pt(Math.cos(a) * NK_RX, NK_Y1, Math.sin(a) * NK_RZ))
  }
  const half = NK_SEGS / 2

  ctx.beginPath()
  ctx.moveTo(nkTop[half].x, nkTop[half].y)
  for (let i = half + 1; i <= NK_SEGS; i++) ctx.lineTo(nkTop[i].x, nkTop[i].y)
  for (let i = NK_SEGS; i >= half; i--) ctx.lineTo(nkBot[i].x, nkBot[i].y)
  ctx.closePath(); ctx.fillStyle = '#050505'; ctx.fill()

  ctx.beginPath()
  ctx.moveTo(nkTop[0].x, nkTop[0].y)
  for (let i = 1; i <= half; i++) ctx.lineTo(nkTop[i].x, nkTop[i].y)
  for (let i = half; i >= 0; i--) ctx.lineTo(nkBot[i].x, nkBot[i].y)
  ctx.closePath()
  {
    const ng = ctx.createLinearGradient(nkTop[half].x, 0, nkTop[0].x, 0)
    ng.addColorStop(0,   '#060606'); ng.addColorStop(0.4, '#111111')
    ng.addColorStop(0.6, '#161616'); ng.addColorStop(1,   '#0a0a0a')
    ctx.fillStyle = ng; ctx.fill()
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
  const spec0 = nkTop[Math.floor(NK_SEGS * 0.25)]
  const spec1 = nkBot[Math.floor(NK_SEGS * 0.25)]
  ctx.beginPath(); ctx.moveTo(spec0.x, spec0.y); ctx.lineTo(spec1.x, spec1.y); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(nkTop[0].x, nkTop[0].y)
  for (let i = 1; i <= NK_SEGS; i++) ctx.lineTo(nkTop[i].x, nkTop[i].y)
  ctx.closePath(); ctx.fillStyle = '#0d0d0d'; ctx.fill()

  // Base — 3D world-space flat ellipse (tilts with the monitor)
  const BASE_RX   = W * 0.72          // large world-space half-width
  const BASE_RZ   = monD * 1.1        // depth matches monitor depth
  const BASE_Y    = NK_Y1             // sits at bottom of neck
  const BASE_SEGS = 64

  const baseTop = [], baseBot = []
  const BASE_THICK = H * 0.018        // world-space height (thin slab)
  for (let i = 0; i <= BASE_SEGS; i++) {
    const a = (i / BASE_SEGS) * Math.PI * 2
    const cx = Math.cos(a) * BASE_RX
    const cz = Math.sin(a) * BASE_RZ
    baseTop.push(Pt(cx, BASE_Y,             cz))
    baseBot.push(Pt(cx, BASE_Y + BASE_THICK, cz))
  }

  // Bottom rim (drawn first so top covers it)
  ctx.beginPath()
  ctx.moveTo(baseBot[0].x, baseBot[0].y)
  for (let i = 1; i <= BASE_SEGS; i++) ctx.lineTo(baseBot[i].x, baseBot[i].y)
  ctx.closePath(); ctx.fillStyle = '#070707'; ctx.fill()

  // Side band — draw front half as thin quad strips
  for (let i = 0; i < BASE_SEGS; i++) {
    const a = (i / BASE_SEGS) * Math.PI * 2
    if (Math.sin(a) > 0) continue   // only front-facing segments
    const t0 = baseTop[i], t1 = baseTop[i + 1]
    const b0 = baseBot[i], b1 = baseBot[i + 1]
    pathQuad(ctx, t0, t1, b1, b0)
    ctx.fillStyle = '#0a0a0a'; ctx.fill()
  }

  // Top face
  ctx.beginPath()
  ctx.moveTo(baseTop[0].x, baseTop[0].y)
  for (let i = 1; i <= BASE_SEGS; i++) ctx.lineTo(baseTop[i].x, baseTop[i].y)
  ctx.closePath()
  {
    const tl = Pt(-BASE_RX, BASE_Y, 0)
    const tr = Pt( BASE_RX, BASE_Y, 0)
    const sg = ctx.createLinearGradient(tl.x, tl.y, tr.x, tr.y)
    sg.addColorStop(0,    'rgba(255,255,255,0)')
    sg.addColorStop(0.15, 'rgba(255,255,255,0.06)')
    sg.addColorStop(0.5,  'rgba(255,255,255,0.12)')
    sg.addColorStop(0.85, 'rgba(255,255,255,0.06)')
    sg.addColorStop(1,    'rgba(255,255,255,0)')
    ctx.fillStyle = '#0c0c0c'; ctx.fill()
    ctx.save(); ctx.beginPath()
    ctx.moveTo(baseTop[0].x, baseTop[0].y)
    for (let i = 1; i <= BASE_SEGS; i++) ctx.lineTo(baseTop[i].x, baseTop[i].y)
    ctx.closePath(); ctx.clip()
    ctx.fillStyle = sg
    const tl2 = Pt(-BASE_RX, BASE_Y, 0)
    const tr2 = Pt( BASE_RX, BASE_Y, 0)
    ctx.fillRect(Math.min(tl2.x, tr2.x) - 2, baseTop[0].y - 2,
                 Math.abs(tr2.x - tl2.x) + 4, BASE_THICK * 0.5 + 4)
    ctx.restore()
  }

  // Top rim highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(baseTop[0].x, baseTop[0].y)
  for (let i = 1; i <= BASE_SEGS; i++) ctx.lineTo(baseTop[i].x, baseTop[i].y)
  ctx.closePath(); ctx.stroke()

  // Hole
  const HOLE_SEGS = 32
  const hRing = []
  for (let i = 0; i <= HOLE_SEGS; i++) {
    const a = (i / HOLE_SEGS) * Math.PI * 2
    hRing.push(Pt(Math.cos(a) * NK_RX * 1.05, NK_Y1, Math.sin(a) * NK_RZ * 1.05))
  }
  ctx.beginPath()
  ctx.moveTo(hRing[0].x, hRing[0].y)
  for (let i = 1; i < hRing.length; i++) ctx.lineTo(hRing[i].x, hRing[i].y)
  ctx.closePath(); ctx.fillStyle = '#000000'; ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.8; ctx.stroke()

  ctx.globalAlpha = 1
}

// ─── Component ────────────────────────────────────────────────────────────
function MonitorCanvas() {
  const canvasRef = useRef(null)
  const dprRef    = useRef(window.devicePixelRatio || 1)
  const ctxRef    = useRef(null)

  // Called on every scroll event by the hook
  const onProgress = (rawProg) => {
    const canvas = canvasRef.current
    const ctx    = ctxRef.current
    if (!canvas || !ctx) return
    drawMonitor(canvas, ctx, dprRef.current, rawProg)
  }

  useMonitorScroll(canvasRef, onProgress)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx

    function resize() {
      dprRef.current = window.devicePixelRatio || 1
      const dpr  = dprRef.current
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = Math.round(rect.width  * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Draw at current scroll progress
      const maxScroll = window.innerHeight * 0.65
      const prog = Math.min(window.scrollY / maxScroll, 1)
      drawMonitor(canvas, ctx, dpr, prog)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="monitor-canvas"
      aria-label="Valframe project preview"
    />
  )
}

export default MonitorCanvas
