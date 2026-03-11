import { useNavigate } from 'react-router-dom'
import useParallax from '../../../hooks/useParallax'
import './WorksSection.css'

/* ── Individual work card ─────────────────────────────────── */
function WorkCard({ slug, externalUrl, client, country, category, src, alt, wide, parallaxSpeed = 0.25, objectFit = 'cover', objectPosition = 'center', aspectRatio }) {
  const imgRef  = useParallax(parallaxSpeed)
  const navigate = useNavigate()

  function handleClick() {
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer')
    } else if (slug) {
      navigate(`/work/${slug}`)
    }
  }

  return (
    <article
      className={`works-card${wide ? ' works-card--wide' : ''}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={handleClick}
      role={slug ? 'button' : undefined}
      tabIndex={slug ? 0 : undefined}
      onKeyDown={slug ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() } : undefined}
    >
      {/* Parallax image layer */}
      <div className="works-card__media-wrap">
        <img
          ref={imgRef}
          className="works-card__img"
          src={src}
          alt={alt}
          loading="lazy"
          style={{ objectFit, objectPosition }}
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
