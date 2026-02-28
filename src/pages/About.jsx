import { useNavigate } from 'react-router-dom'
import Navbar from '../components/features/navbar'
import AboutSection from '../components/features/about/AboutSection'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function About() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        logo="Valframe"
        links={NAV_LINKS}
        ctaLabel="Contact Us"
        onCtaClick={() => navigate('/contact')}
      />
      <AboutSection />
      <FooterSection />
    </>
  )
}

export default About
