import { useState, useCallback } from 'react'
import './Navbar.css'

function Navbar({ logo = 'Valframe', links = [], ctaLabel = 'Contact Us', onCtaClick }) {
  const [open, setOpen] = useState(false)

  const toggleMenu = useCallback(() => setOpen(prev => !prev), [])
  const closeMenu  = useCallback(() => setOpen(false), [])

  return (
    <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          {logo}
        </div>

        {/* ── Desktop nav ──────────────────────────────────── */}
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

        {/* ── Hamburger (mobile only) ───────────────────────── */}
        <button
          className={`navbar__hamburger${open ? ' navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>

      </div>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`} aria-hidden={!open}>
        <nav className="navbar__drawer-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__drawer-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="navbar__drawer-cta">
          <button className="navbar__btn" onClick={() => { closeMenu(); onCtaClick?.() }}>
            <span className="navbar__btn-dot" aria-hidden="true" />
            {ctaLabel}
          </button>
        </div>
      </div>

      {/* ── Overlay (closes drawer on tap outside) ─────────── */}
      {open && (
        <div className="navbar__overlay" aria-hidden="true" onClick={closeMenu} />
      )}
    </header>
  )
}

export default Navbar
