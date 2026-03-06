import './ServicesSection.css'

/* ── Individual service capsule ────────────────────────────── */
function ServiceCapsule({ title, index, onClick }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <button
      className="service-capsule"
      style={{ '--index': index }}
      onClick={onClick}
      type="button"
    >
      <span className="service-capsule__num">{num}</span>
      <span className="service-capsule__title">{title}</span>
      <span className="service-capsule__arrow" aria-hidden="true">↗</span>
    </button>
  )
}

/* ── Section ──────────────────────────────────────────────── */
function ServicesSection({ services = [], onStartProject }) {
  return (
    <section className="services" id="services">
      <div className="services__inner">

        {/* Header */}
        <div className="services__header">
          <div className="services__label-row">
            <span className="services__label-dot" aria-hidden="true" />
            <span className="services__label-text">{'{02}'} — Services</span>
          </div>
          <h2 className="services__title">Services</h2>
          <p className="services__subtitle">Everything you need to launch and grow online.</p>
        </div>

        {/* Capsule list */}
        <div className="services__list">
          {services.map((svc, i) => (
            <ServiceCapsule key={i} {...svc} index={i} onClick={onStartProject} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="services__footer">
          <p className="services__footer-text">
            Ready to build something that works?
          </p>
          <button className="services__footer-cta" onClick={onStartProject}>
            Start a Project
            <span className="services__footer-arrow" aria-hidden="true">→</span>
          </button>
        </div>

      </div>
    </section>
  )
}

export default ServicesSection
