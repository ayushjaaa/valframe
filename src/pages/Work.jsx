import { openWhatsApp } from '../utils/openWhatsApp'
import Navbar from '../components/features/navbar'
import WorkSection from '../components/features/work/WorkSection'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function Work() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" onCtaClick={openWhatsApp} />
      <WorkSection />
      <FooterSection />
    </>
  )
}

export default Work
