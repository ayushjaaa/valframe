import { Link } from 'react-router-dom'
import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function NotFound() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" />
      <main className="not-found">
        <div className="not-found__inner">
          <p className="not-found__code">404</p>
          <h1 className="not-found__heading">Page not found</h1>
          <p className="not-found__body">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="not-found__home-link">Go back home</Link>
        </div>
      </main>
      <FooterSection />
    </>
  )
}

export default NotFound
