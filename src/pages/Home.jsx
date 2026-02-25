import './Home.css'
import Navbar from '../components/features/navbar'
import Hero from '../components/features/hero'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
]

function Home() {
  return (
    <main className="home">

      <Navbar
        logo="Valframe"
        links={NAV_LINKS}
        ctaLabel="Contact Us"
      />

      <Hero
        primaryCta="Start a Project"
        secondaryCta="View Work"
        descriptionText="I craft experience-driven digital products that connect brands with people — clean, purposeful, and built to last."
      />

    </main>
  )
}

export default Home
