import { useEffect, useRef, useCallback } from 'react'
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
function drawMonitor(canvas, ctx, dpr, prog, video) {
  const W = canvas.width  / dpr
  const H = canvas.height / dpr
  ctx.clearRect(0, 0, W, H)

  const monW  = W  * 0.68
  const monH  = H  * 0.74
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

  // ── Screen fill — video if ready, dark fallback otherwise ──────────────
  fillQuad(ctx, stl, str, sbr, sbl, '#0a090b')

  if (video && video.readyState >= 2) {
    const vw = video.videoWidth  || 1280
    const vh = video.videoHeight || 720

    // Perspective-correct mapping via affine triangle subdivision.
    // STEPS=6 → 72 triangles per frame, fast enough for smooth 60fps RAF.
    const STEPS = 6

    // Pre-compute all grid points once outside the triangle loop
    const pts = []
    for (let row = 0; row <= STEPS; row++) {
      pts[row] = []
      for (let col = 0; col <= STEPS; col++) {
        const tr_ = row / STEPS
        const tc_ = col / STEPS
        const tx = stl.x + (str.x - stl.x) * tc_
        const ty = stl.y + (str.y - stl.y) * tc_
        const bx = sbl.x + (sbr.x - sbl.x) * tc_
        const by = sbl.y + (sbr.y - sbl.y) * tc_
        pts[row][col] = {
          x: tx + (bx - tx) * tr_,
          y: ty + (by - ty) * tr_,
          u: tc_ * vw,
          v: tr_ * vh,
        }
      }
    }

    // Capture current DPR transform so setTransform can restore it per triangle
    const dprScale = dpr

    ctx.save()
    pathQuad(ctx, stl, str, sbr, sbl)
    ctx.clip()

    for (let row = 0; row < STEPS; row++) {
      for (let col = 0; col < STEPS; col++) {
        const p00 = pts[row    ][col    ]
        const p10 = pts[row    ][col + 1]
        const p01 = pts[row + 1][col    ]
        const p11 = pts[row + 1][col + 1]

        // Draw one triangle: p0, p1, p2
        // Uses setTransform (absolute) so DPR base transform is not compounded
        function drawTri(p0, p1, p2) {
          const det = (p1.u - p0.u) * (p2.v - p0.v) - (p2.u - p0.u) * (p1.v - p0.v)
          if (Math.abs(det) < 0.001) return
          const a = ((p1.x - p0.x) * (p2.v - p0.v) - (p2.x - p0.x) * (p1.v - p0.v)) / det
          const b = ((p1.y - p0.y) * (p2.v - p0.v) - (p2.y - p0.y) * (p1.v - p0.v)) / det
          const c = ((p2.x - p0.x) * (p1.u - p0.u) - (p1.x - p0.x) * (p2.u - p0.u)) / det
          const d = ((p2.y - p0.y) * (p1.u - p0.u) - (p1.y - p0.y) * (p2.u - p0.u)) / det
          const e = p0.x - a * p0.u - c * p0.v
          const f = p0.y - b * p0.u - d * p0.v

          ctx.save()
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.closePath()
          ctx.clip()
          // setTransform is absolute — replaces the current matrix entirely
          ctx.setTransform(a * dprScale, b * dprScale, c * dprScale, d * dprScale, e * dprScale, f * dprScale)
          ctx.drawImage(video, 0, 0, vw, vh)
          ctx.restore()
        }

        drawTri(p00, p10, p01)
        drawTri(p10, p11, p01)
      }
    }

    ctx.restore()
  }

  // Screen glare overlay
  {
    const gg = ctx.createLinearGradient(stl.x, stl.y, sbr.x, sbr.y)
    gg.addColorStop(0,   'rgba(255,255,255,0.06)')
    gg.addColorStop(0.5, 'rgba(255,255,255,0.01)')
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

// ─── Exported helper: screen quad corners for hit-testing ─────────────────
export function getScreenQuad(W, H, prog) {
  const monW  = W  * 0.68
  const monH  = H  * 0.74
  const monD  = W  * 0.052
  const bezel = monH * 0.044
  const hd    = monD / 2
  const hw    = monW / 2
  const hh    = monH / 2
  const Pt    = (x, y, z) => project(x, y, z, W, H, prog)
  return {
    tl: Pt(-hw + bezel, -hh + bezel, -hd),
    tr: Pt( hw - bezel, -hh + bezel, -hd),
    br: Pt( hw - bezel,  hh - bezel, -hd),
    bl: Pt(-hw + bezel,  hh - bezel, -hd),
  }
}

// ─── Component ────────────────────────────────────────────────────────────
function MonitorCanvas({ canvasElRef, onScrollProgress }) {
  const canvasRef      = useRef(null)
  const dprRef         = useRef(window.devicePixelRatio || 1)
  const ctxRef         = useRef(null)
  const videoRef       = useRef(null)
  const progRef        = useRef(0)
  const rafRef         = useRef(null)
  const pendingDrawRef = useRef(null)

  // Stable callback ref — prevents useMonitorScroll from re-running its effect
  // on every render (which repeatedly adds/removes the scroll listener mid-scroll).
  // progRef is written here so the RAF loop always reads the latest value.
  const onProgress = useCallback((rawProg) => {
    progRef.current = rawProg
    if (onScrollProgress) onScrollProgress(rawProg)
    // When no RAF loop is running (video not ready), schedule a draw via rAF
    // so it never blocks the scroll event handler on the main thread (fixes INP)
    if (!rafRef.current && !pendingDrawRef.current) {
      pendingDrawRef.current = requestAnimationFrame(() => {
        pendingDrawRef.current = null
        const canvas = canvasRef.current
        const ctx    = ctxRef.current
        if (canvas && ctx) drawMonitor(canvas, ctx, dprRef.current, progRef.current, videoRef.current)
      })
    }
  }, [onScrollProgress])

  useMonitorScroll(canvasRef, onProgress)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx

    // Create video element
    const video = document.createElement('video')
    video.src = new URL('../../../assets/videos/showreel.mp4', import.meta.url).href
    video.muted = true
    video.loop  = true
    video.playsInline = true
    video.autoplay = true
    videoRef.current = video

    function resize() {
      dprRef.current = window.devicePixelRatio || 1
      const dpr  = dprRef.current
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width  = Math.round(rect.width  * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width  = rect.width  + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawMonitor(canvas, ctx, dprRef.current, progRef.current, video)
    }

    // Visibility flag — RAF loop pauses when canvas is off-screen
    let isVisible = true

    // RAF loop — runs only while video is playing AND canvas is in viewport.
    function loop() {
      if (!isVisible) {
        rafRef.current = null
        return
      }
      drawMonitor(canvas, ctx, dprRef.current, progRef.current, video)
      rafRef.current = requestAnimationFrame(loop)
    }

    function startLoop() {
      if (rafRef.current) return   // already running — never start a second loop
      if (isVisible) loop()
    }

    function stopLoop() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    // IntersectionObserver — pause RAF when hero leaves viewport, resume on re-entry
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
        if (isVisible && video.readyState >= 2) startLoop()
        else stopLoop()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    video.addEventListener('canplay', () => {
      video.play().catch(() => {})
      startLoop()
    })

    resize()  // sets canvas size + initial static draw
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      stopLoop()
      if (pendingDrawRef.current) cancelAnimationFrame(pendingDrawRef.current)
      video.pause()
    }
  }, [])

  return (
    <canvas
      ref={(node) => { canvasRef.current = node; if (canvasElRef) canvasElRef.current = node }}
      className="monitor-canvas"
      aria-label="Valframe project preview"
    />
  )
}

export default MonitorCanvas
