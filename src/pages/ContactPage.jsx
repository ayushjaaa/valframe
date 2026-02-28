import { useNavigate } from 'react-router-dom'
import Navbar from '../components/features/navbar'
import ContactHero from '../components/features/contact/ContactHero'
import ContactForm from '../components/features/contact/ContactForm'
import MapSection from '../components/features/contact/MapSection'
import FAQSection from '../components/features/contact/FAQSection'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

function ContactPage() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        logo="Valframe"
        links={NAV_LINKS}
        ctaLabel="Contact Us"
        onCtaClick={() => navigate('/contact')}
      />
      <ContactHero />
      <ContactForm />
      <MapSection />
      <FAQSection />
      <FooterSection />
    </>
  )
}

export default ContactPage
