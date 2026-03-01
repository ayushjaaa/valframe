import { useRef, useCallback, useEffect } from 'react'
import MonitorCanvas, { getScreenQuad } from './MonitorCanvas'
import './Hero.css'

// Point-in-convex-quad test using cross products (works for any convex quad)
function pointInQuad(px, py, tl, tr, br, bl) {
  function cross(ax, ay, bx, by, cx, cy) {
    return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)
  }
  const d0 = cross(tl.x, tl.y, tr.x, tr.y, px, py)
  const d1 = cross(tr.x, tr.y, br.x, br.y, px, py)
  const d2 = cross(br.x, br.y, bl.x, bl.y, px, py)
  const d3 = cross(bl.x, bl.y, tl.x, tl.y, px, py)
  const hasNeg = (d0 < 0) || (d1 < 0) || (d2 < 0) || (d3 < 0)
  const hasPos = (d0 > 0) || (d1 > 0) || (d2 > 0) || (d3 > 0)
  return !(hasNeg && hasPos)
}

function Hero({
  primaryCta = 'Start a Project',
  secondaryCta = 'View Work',
  onPrimaryClick,
  onSecondaryClick,
  descriptionLeft = 'Web Design & Development\nIndia 🌐 Worldwide',
  descriptionRight = 'Digital Studio +\nValframe Solution',
  mobileSubheading = 'High-converting websites for startups & businesses.',
}) {
  const pillRef        = useRef(null)
  const canvasRef      = useRef(null)   // set via MonitorCanvas callback ref
  const progRef        = useRef(0)      // mirrors scroll progress
  const quadRef        = useRef(null)   // cached screen quad — recomputed only when prog changes
  const canvasSizeRef  = useRef({ w: 0, h: 0 }) // cached canvas dimensions
  const mousePendingRef = useRef(null)  // rAF handle for mousemove batching
  const wrapperRef     = useRef(null)   // ref to the canvas wrapper for ResizeObserver

  // Cache canvas dimensions via ResizeObserver — zero reflow on mousemove
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const ro = new ResizeObserver((entries) => {
      const e = entries[0]
      if (!e) return
      canvasSizeRef.current = { w: e.contentRect.width, h: e.contentRect.height }
      // Invalidate cached quad when size changes
      quadRef.current = null
    })
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [])

  const handleMouseMove = useCallback((e) => {
    const pill = pillRef.current
    if (!pill) return

    // Capture event coords synchronously (e is pooled, can't use inside rAF)
    const clientX = e.clientX
    const clientY = e.clientY
    const wrapperEl = wrapperRef.current

    if (mousePendingRef.current) return  // already a frame queued — skip
    mousePendingRef.current = requestAnimationFrame(() => {
      mousePendingRef.current = null
      if (!wrapperEl) return

      // Single layout read — getBoundingClientRect once per rAF frame
      const rect = wrapperEl.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      // Batch all writes together after the single read
      pill.style.left      = x + 'px'
      pill.style.top       = y + 'px'
      pill.style.transform = 'translate(-50%, -50%)'

      // Use cached quad — recompute only when progress or canvas size changed
      if (!quadRef.current) {
        const { w, h } = canvasSizeRef.current
        if (w > 0 && h > 0) {
          quadRef.current = getScreenQuad(w, h, progRef.current)
        }
      }
      if (quadRef.current) {
        const { tl, tr, br, bl } = quadRef.current
        const inside = pointInQuad(x, y, tl, tr, br, bl)
        pill.classList.toggle('hero__showreel-pill--visible', inside)
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (mousePendingRef.current) {
      cancelAnimationFrame(mousePendingRef.current)
      mousePendingRef.current = null
    }
    if (pillRef.current) pillRef.current.classList.remove('hero__showreel-pill--visible')
  }, [])

  const handleProgress = useCallback((p) => {
    progRef.current = p
    quadRef.current = null  // invalidate cached quad on scroll
  }, [])

  return (
    <section className="hero" data-section="dark">
      <div className="hero__sticky">

      <div className="hero__container">

        {/* ── Heading Block — desktop ────────────────────── */}
        <div className="hero__heading-block">
          <h1 className="hero__heading">
            <span className="hero__line">Hi! we're <span className="hero__highlight--blue">Valframe</span></span>
            <span className="hero__line">a <span className="hero__pill--blue">Web Solution</span> from <span className="hero__highlight--white">India</span></span>
            <span className="hero__line">turning your ideas into</span>
          </h1>
        </div>

        {/* ── Heading Block — mobile only ─────────────────── */}
        <div className="hero__heading-block--mobile">
          <h1 className="hero__heading--mobile">
            <span className="hero__line">We Build</span>
            <span className="hero__line hero__line--accent">Web Solutions</span>
          </h1>
          <p className="hero__subheading--mobile">{mobileSubheading}</p>
        </div>

        {/* ── Buttons Row ───────────────────────────────── */}
        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={onPrimaryClick}>
            {primaryCta}
            <span className="hero__btn-arrow" aria-hidden="true">→</span>
          </button>
          <button className="hero__btn hero__btn--secondary" onClick={onSecondaryClick}>
            {secondaryCta}
          </button>
        </div>

        {/* ── Canvas Monitor ────────────────────────────── */}
        <div
          ref={wrapperRef}
          className="hero__canvas-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <MonitorCanvas canvasElRef={canvasRef} onScrollProgress={handleProgress} />
          {/* ── Play Showreel Pill — follows cursor ───── */}
          <div ref={pillRef} className="hero__showreel-pill" aria-hidden="true">
            <span className="hero__showreel-dot" />
            PLAY SHOWREEL
          </div>
        </div>

        {/* ── Bottom Description ────────────────────────── */}
        <div className="hero__description">
          <span className="hero__description-col">{descriptionLeft}</span>
          <span className="hero__description-col">{descriptionRight}</span>
        </div>

      </div>

      </div>
    </section>
  )
}

export default Hero
