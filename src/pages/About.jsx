import { openWhatsApp } from '../utils/openWhatsApp'
import Navbar from '../components/features/navbar'
import AboutSection from '../components/features/about/AboutSection'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function About() {
  return (
    <>
      <Navbar
        links={NAV_LINKS}
        ctaLabel="Contact Us"
        onCtaClick={openWhatsApp}
      />
      <AboutSection />
      <FooterSection />
    </>
  )
}

export default About
