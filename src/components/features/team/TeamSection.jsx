import './TeamSection.css'

/* ── Individual photo card ──────────────────────────────────── */
function TeamCard({ name, role, src, alt }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="team__photo-card">
      <div className="team__photo-wrap">
        {src ? (
          <img
            className="team__photo-img"
            src={src}
            alt={alt || name}
            loading="lazy"
          />
        ) : (
          <div className="team__photo-placeholder" aria-hidden="true">
            <span className="team__photo-placeholder-initials">{initials}</span>
          </div>
        )}
      </div>
      <div className="team__member-info">
        <p className="team__member-name">{name}</p>
        <p className="team__member-role">{role}</p>
      </div>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
function TeamSection({ heading, members = [] }) {
  const topTwo    = members.slice(0, 2)
  const bottomThree = members.slice(2, 5)

  return (
    <section className="team" id="team">
      <div className="team__inner">

        {/* Top row: heading left + first 2 photos right */}
        <div className="team__top-row">

          <div className="team__heading-block">
            <div className="team__label-row">
              <span className="team__label-dot" aria-hidden="true" />
              <span className="team__label-text">{'{06}'} — Team</span>
            </div>
            <h2 className="team__heading">{heading}</h2>
          </div>

          <div className="team__photos-top">
            {topTwo.map((member, i) => (
              <TeamCard key={i} {...member} />
            ))}
          </div>

        </div>

        {/* Bottom row: remaining 3 photos */}
        <div className="team__bottom-row">
          {bottomThree.map((member, i) => (
            <TeamCard key={i} {...member} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeamSection
