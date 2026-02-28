import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../../assets/svg/logo.svg'
import './Navbar.css'

function Navbar({ logo, logoAlt = 'Valframe', links = [], ctaLabel = 'Contact Us', onCtaClick }) {
  const logoSrc = logo || logoImg
  const [open, setOpen] = useState(false)

  function closeDrawer() { setOpen(false) }

  return (
    <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          <img src={logoSrc} alt={logoAlt} />
        </div>

        <nav className="navbar__menu" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="navbar__link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__cta">
          <button className="navbar__btn" onClick={onCtaClick}>
            <span className="navbar__btn-dot" aria-hidden="true" />
            {ctaLabel}
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`navbar__hamburger${open ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>

      </div>

      {/* Overlay */}
      {open && (
        <div className="navbar__overlay" onClick={closeDrawer} aria-hidden="true" />
      )}

      {/* Drawer */}
      <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`} aria-hidden={!open}>
        <button className="navbar__drawer-close" onClick={closeDrawer} aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <nav className="navbar__drawer-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="navbar__drawer-link"
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="navbar__drawer-cta">
          <button className="navbar__btn" onClick={() => { closeDrawer(); onCtaClick?.() }}>
            <span className="navbar__btn-dot" aria-hidden="true" />
            {ctaLabel}
          </button>
        </div>
      </div>

    </header>
  )
}

export default Navbar
