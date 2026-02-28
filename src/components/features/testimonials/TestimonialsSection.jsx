import './TestimonialsSection.css'

/* ── Individual testimonial card ───────────────────────────── */
function TestimonialCard({ rating, quote, name, avatarSrc, avatarAlt }) {
  const stars = Math.round(rating)

  return (
    <article className="testimonial-card" aria-label={`Testimonial from ${name}`}>
      {/* Top row: rating + decorative quote mark */}
      <div className="testimonial-card__header">
        <div className="testimonial-card__rating">
          <span className="testimonial-card__rating-text">{rating.toFixed(1)} / 5</span>
          <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`testimonial-card__star${i < stars ? ' testimonial-card__star--filled' : ''}`}
                aria-hidden="true"
              >
                ◆
              </span>
            ))}
          </div>
        </div>
        <span className="testimonial-card__quote-icon" aria-hidden="true">"</span>
      </div>

      {/* Quote body */}
      <blockquote className="testimonial-card__quote">{quote}</blockquote>

      {/* Author */}
      <footer className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatarAlt || name}
              className="testimonial-card__avatar-img"
              loading="lazy"
            />
          ) : (
            <span className="testimonial-card__avatar-placeholder" aria-hidden="true" />
          )}
        </div>
        <span className="testimonial-card__name">{name}</span>
      </footer>
    </article>
  )
}

/* ── Section ──────────────────────────────────────────────── */
function TestimonialsSection({ testimonials = [] }) {
  /* Duplicate the list so the marquee loop is seamless */
  const looped = [...testimonials, ...testimonials]

  return (
    <section className="testimonials" id="testimonials">

      {/* ── Dark heading block ─────────────────────────────── */}
      <div className="testimonials__heading-block">
        <div className="testimonials__heading-inner">

          {/* Section label */}
          <div className="testimonials__label-row">
            <span className="testimonials__label-dot" aria-hidden="true" />
            <span className="testimonials__label-text">{'{04}'} — Testimonials</span>
          </div>

          {/* Display heading */}
          <h2 className="testimonials__display">
            Don't take our<br />
            word for it<span className="testimonials__asterisk" aria-hidden="true">*</span>
          </h2>

          {/* Footnote */}
          <p className="testimonials__footnote">
            <span className="testimonials__footnote-mark" aria-hidden="true">*</span>
            {' '}Take theirs
          </p>

        </div>
      </div>

      {/* ── Light marquee strip ────────────────────────────── */}
      <div className="testimonials__marquee-strip">
        <div className="testimonials__viewport">
          <div className="testimonials__track">
            {looped.map((item, i) => (
              <TestimonialCard
                key={i}
                {...item}
                aria-hidden={i >= testimonials.length}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

export default TestimonialsSection
