import './ServicesSection.css'

/* ── Individual service capsule ────────────────────────────── */
function ServiceCapsule({ title, index, onClick }) {
  return (
    <article
      className="service-capsule"
      style={{ '--index': index }}
      onClick={onClick}
    >
      <h3 className="service-capsule__title">{title}</h3>
    </article>
  )
}

/* ── Section ──────────────────────────────────────────────── */
function ServicesSection({ services = [], onStartProject }) {
  return (
    <section className="services" id="services">
      <div className="services__inner">

        {/* Header */}
        <div className="services__header">
          <h2 className="services__title">Services</h2>
        </div>

        {/* Centered capsule stack */}
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
