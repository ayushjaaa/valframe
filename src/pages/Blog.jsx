import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function Blog() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" />
      <main className="page-placeholder">
        <h1>Blog</h1>
        <p>Coming soon.</p>
      </main>
      <FooterSection />
    </>
  )
}

export default Blog
