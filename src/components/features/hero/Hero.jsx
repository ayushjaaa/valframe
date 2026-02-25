import './Hero.css'

function Hero({
  primaryCta = 'Start a Project',
  secondaryCta = 'View Work',
  onPrimaryClick,
  onSecondaryClick,
  mockupSrc,
  mockupAlt = 'Valframe project mockup',
  descriptionText = 'I craft experience-driven digital products that connect brands with people — clean, purposeful, and built to last.',
}) {
  return (
    <section className="hero" data-section="dark">

      <div className="hero__container">

        {/* ── Heading Block ─────────────────────────────── */}
        <div className="hero__heading-block">
          <h1 className="hero__heading">
            <span className="hero__line">Hi! we're <span className="hero__highlight--blue">Valframe</span></span>
            <span className="hero__line">a <span className="hero__pill--blue">Web Solution</span> from <span className="hero__highlight--white">India</span></span>
            <span className="hero__line">turning your ideas into</span>
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

        {/* ── Monitor Mockup ────────────────────────────── */}
        {mockupSrc && (
          <div className="hero__mockup-wrapper">
            <img
              className="hero__mockup"
              src={mockupSrc}
              alt={mockupAlt}
            />
          </div>
        )}

        {/* ── Bottom Description ────────────────────────── */}
        <p className="hero__description">
          {descriptionText}
        </p>

      </div>

    </section>
  )
}

export default Hero
