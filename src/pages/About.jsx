import Navbar from '../components/features/navbar'
import AboutSection from '../components/features/about/AboutSection'
import TeamSection from '../components/features/team/TeamSection'
import FooterSection from '../components/features/footer'
import founderImg from '../assets/images/founder.jpeg'

const TEAM_MEMBERS = [
  { name: 'Ayush Jaiswal',       role: 'CEO & Founder',         src: founderImg, alt: 'Ayush Jaiswal' },
  { name: 'Balakrishna Paramar', role: 'Software Developer',    src: null },
  { name: 'Harsh Jaiswal',       role: 'Software Developer',    src: null },
  { name: 'Devashinsh Bhavasr',  role: 'TL & Senior Developer', src: null },
  { name: 'Mainsha',             role: 'UI & UX Designer',      src: null },
]

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
        ctaHref="/contact"
      />
      <AboutSection />
      <TeamSection
        heading="The people behind Valframe"
        members={TEAM_MEMBERS}
      />
      <FooterSection />
    </>
  )
}

export default About
