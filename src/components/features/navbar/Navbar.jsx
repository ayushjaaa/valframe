import './Navbar.css'

function Navbar({ logo = 'Valframe', links = [], ctaLabel = 'Contact Us', onCtaClick }) {
  return (
    <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          {logo}
        </div>

        <nav className="navbar__menu" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__cta">
          <button className="navbar__btn" onClick={onCtaClick}>
            <span className="navbar__btn-dot" aria-hidden="true" />
            {ctaLabel}
          </button>
        </div>

      </div>
    </header>
  )
}

export default Navbar
