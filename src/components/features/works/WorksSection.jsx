import useParallax from '../../../hooks/useParallax'
import './WorksSection.css'

/* ── Individual work card ─────────────────────────────────── */
function WorkCard({ client, country, category, src, alt, wide, parallaxSpeed = 0.25 }) {
  const imgRef = useParallax(parallaxSpeed)

  return (
    <article className={`works-card${wide ? ' works-card--wide' : ''}`}>
      {/* Parallax image layer */}
      <div className="works-card__media-wrap">
        <img
          ref={imgRef}
          className="works-card__img"
          src={src}
          alt={alt}
          loading="lazy"
        />
      </div>

      {/* Overlay content */}
      <div className="works-card__overlay">
        <div className="works-card__meta">
          <span className="works-card__client">{client}</span>
          <span className="works-card__country">{country}</span>
        </div>
        <span className="works-card__category">{category}</span>
      </div>
    </article>
  )
}

/* ── Section ──────────────────────────────────────────────── */
function WorksSection({ items = [], onViewAll }) {
  return (
    <section className="works" id="work">
      <div className="works__inner">
        {/* Header row */}
        <div className="works__header">
          <h2 className="works__title">Works</h2>
          <button
            className="works__cta"
            onClick={onViewAll}
            aria-label="View all works"
          >
            +
          </button>
        </div>

        {/* Grid */}
        <div className="works__grid">
          {items.map((item, i) => (
            <WorkCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorksSection
