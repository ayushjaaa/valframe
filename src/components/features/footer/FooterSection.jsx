import { Link } from 'react-router-dom'
import './FooterSection.css'

/* ── Social icon SVGs — inline for zero HTTP requests ──────── */
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function IconDribbble() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function IconBehance() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 6h7.5C10.43 6 12 7.57 12 9.5S10.43 13 8.5 13H1V6zm0 7h8.5C11.43 13 13 14.57 13 16.5S11.43 20 9.5 20H1v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 7h6M15 12.5c0-2.49 2.01-4.5 4.5-4.5S24 10.01 24 12.5c0 .17-.01.34-.03.5H15.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Footer component ────────────────────────────────────────── */
function FooterSection() {
  function handleNewsletterSubmit(e) {
    e.preventDefault()
  }

  return (
    <footer className="site-footer" aria-label="Site footer">

      {/* ── Top band ─────────────────────────────────────────── */}
      <div className="site-footer__top">
        <div className="site-footer__inner">

          {/* Left: tagline */}
          <div className="site-footer__tagline-col">
            <p className="site-footer__tagline">
              <span className="site-footer__tagline-asterisk" aria-hidden="true">*</span>
              <span className="site-footer__tagline-text">
                WE BUILD WHAT<br />OTHERS ONLY IMAGINE.
              </span>
            </p>
          </div>

          {/* Centre: nav */}
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <ul className="site-footer__nav-list">
              <li><Link to="/work"     className="site-footer__nav-link">Work</Link></li>
              <li><Link to="/services" className="site-footer__nav-link">Services</Link></li>
              <li><Link to="/about"    className="site-footer__nav-link">About</Link></li>
              <li><Link to="/blog"     className="site-footer__nav-link">Blog</Link></li>
              <li><Link to="/contact"  className="site-footer__nav-link">Contact</Link></li>
            </ul>

            <ul className="site-footer__nav-list site-footer__nav-list--legal">
              <li><Link to="/privacy" className="site-footer__nav-link site-footer__nav-link--muted">Privacy Policy</Link></li>
              <li><Link to="/terms"   className="site-footer__nav-link site-footer__nav-link--muted">Terms Of Service</Link></li>
              <li><Link to="/cookies" className="site-footer__nav-link site-footer__nav-link--muted">Cookie Policy</Link></li>
            </ul>
          </nav>

          {/* Right: newsletter + social + contact */}
          <div className="site-footer__newsletter-col">
            <p className="site-footer__newsletter-label">Get valuable insights</p>
            <form
              className="site-footer__newsletter-form"
              onSubmit={handleNewsletterSubmit}
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                name="email"
                className="site-footer__newsletter-input"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              <button
                type="submit"
                className="site-footer__newsletter-btn"
                aria-label="Subscribe"
              >
                <IconArrow />
              </button>
            </form>

            {/* Social row */}
            <div className="site-footer__social" aria-label="Social media links">
              <a href="https://linkedin.com"  className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <IconLinkedIn />
              </a>
              <a href="https://x.com"         className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <IconX />
              </a>
              <a href="https://instagram.com" className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href="https://dribbble.com"  className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                <IconDribbble />
              </a>
              <a href="https://behance.net"   className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                <IconBehance />
              </a>
            </div>

            {/* Contact */}
            <address className="site-footer__contact">
              <span className="site-footer__contact-label">Let's chat</span>
              <a
                href="mailto:hello@valframesolution.com"
                className="site-footer__contact-email"
              >
                hello@valframesolution.com
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* ── Giant brand wordmark ─────────────────────────────── */}
      <div className="site-footer__wordmark-row" aria-hidden="true">
        <span className="site-footer__wordmark">VALFRAME</span>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__copyright">
            © Valframe Solution {new Date().getFullYear()}
          </p>
          <nav className="site-footer__bottom-nav" aria-label="Legal navigation">
            <Link to="/privacy" className="site-footer__bottom-link">Privacy Policy</Link>
            <span className="site-footer__bottom-sep" aria-hidden="true">•</span>
            <Link to="/terms"   className="site-footer__bottom-link">Terms Of Service</Link>
            <span className="site-footer__bottom-sep" aria-hidden="true">•</span>
            <Link to="/cookies" className="site-footer__bottom-link">Cookie Policy</Link>
          </nav>
        </div>
      </div>

    </footer>
  )
}

export default FooterSection
