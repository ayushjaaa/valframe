import { useNavigate } from 'react-router-dom'
import Navbar from '../components/features/navbar'
import ServicesHero from '../components/features/services-page/ServicesHero'
import ServicesCarousel from '../components/features/services-page/ServicesCarousel'
import ServicesListSection from '../components/features/services-page/ServicesListSection'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function Services() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        links={NAV_LINKS}
        ctaLabel="Contact Us"
        onCtaClick={() => navigate('/contact')}
      />
      <ServicesHero />
      <ServicesCarousel />
      <ServicesListSection />
      <FooterSection />
    </>
  )
}

export default Services
