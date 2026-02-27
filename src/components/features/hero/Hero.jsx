import { useRef, useCallback } from 'react'
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
}) {
  const pillRef     = useRef(null)
  const canvasRef   = useRef(null)   // set via MonitorCanvas callback ref
  const progRef     = useRef(0)      // mirrors scroll progress

  const handleMouseMove = useCallback((e) => {
    const pill   = pillRef.current
    const canvas = canvasRef.current
    if (!pill) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Always move pill to cursor
    pill.style.left      = x + 'px'
    pill.style.top       = y + 'px'
    pill.style.transform = 'translate(-50%, -50%)'

    // Check if cursor is inside the monitor screen quad
    if (canvas) {
      const W    = canvas.offsetWidth
      const H    = canvas.offsetHeight
      const quad = getScreenQuad(W, H, progRef.current)
      const inside = pointInQuad(x, y, quad.tl, quad.tr, quad.br, quad.bl)
      pill.classList.toggle('hero__showreel-pill--visible', inside)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (pillRef.current) pillRef.current.classList.remove('hero__showreel-pill--visible')
  }, [])

  const handleProgress = useCallback((p) => {
    progRef.current = p
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
        <div className="hero__canvas-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
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
