import { useNavigate } from 'react-router-dom'
import './Home.css'
import Navbar from '../components/features/navbar'
import Hero from '../components/features/hero'
import ServicesSection from '../components/features/services'
import WorksSection from '../components/features/works'
import TestimonialsSection from '../components/features/testimonials'
import FaqSection from '../components/features/faq'
import FooterSection from '../components/features/footer'
import img2 from '../assets/images/2.jpeg'
import img3 from '../assets/images/3.png'
import img4 from '../assets/images/4.jpeg'
import img5 from '../assets/images/5.jpeg'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
]

/* ── Services data ──────────────────────────────────────────
   titleLine1 / titleLine2 → rendered as two separate block lines
   tagline    → the hook — what result the client gets (larger)
   description → supporting detail (smaller, hidden on mobile)
────────────────────────────────────────────────────────────── */
const SERVICES = [
  { title: 'Web Design & Development' },
  { title: 'Branding & Identity' },
  { title: 'UI/UX & Product Design' },
  { title: 'Motion & 3D' },
  { title: 'App Development' },
  { title: 'Dashboard & Analytics' },
  { title: 'Shopify & E-commerce' },
]

/* ── Works data ─────────────────────────────────────────────
   wide: true  → full-row card (16:7)
   wide: false → paired card   (1:1)
────────────────────────────────────────────────────────────── */

/* ── Testimonials data ───────────────────────────────────────
   rating     → number (e.g. 5.0)
   quote      → the review text
   name       → reviewer name
   avatarSrc  → optional path to avatar image
   avatarAlt  → alt text for avatar
─────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    rating: 5.0,
    quote: 'They completely understood our brand vision — better than we even imagined. The result is sharp, fast, and makes us stand out in a crowded market.',
    name: 'Priya Mehta',
  },
  {
    rating: 5.0,
    quote: 'From wireframes to final build, the Valframe team was insanely detail-oriented. Our bounce rate dropped by 42% after the redesign!',
    name: 'Arjun Sinha',
  },
  {
    rating: 5.0,
    quote: 'They gave us more than a website — they gave us a brand identity. The aesthetics, responsiveness, and speed are on point!',
    name: 'Ayesha Khan',
  },
  {
    rating: 5.0,
    quote: 'Their design thinking is top notch. Every element on our site now feels intentional and elegant. Clients always compliment the UI!',
    name: 'Radhika Iyer',
  },
]

/* ── FAQ data ────────────────────────────────────────────────
   Targeted at startups and premium brand founders.
─────────────────────────────────────────────────────────── */
const FAQS = [
  {
    question: 'What kind of businesses do you work with?',
    answer: 'We work exclusively with startups and premium brands that take design seriously. Whether you\'re pre-launch and building your first digital presence, or an established brand ready to elevate your identity — if quality and craft matter to you, we\'re a fit.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'A focused branding or website project typically runs 3–6 weeks from kickoff to launch. Larger builds — multi-page platforms, custom dashboards, or full brand systems — are scoped individually. We don\'t rush, and we don\'t drag.',
  },
  {
    question: 'What does working with Valframe actually look like?',
    answer: 'We start with a deep-dive discovery call to understand your brand, goals, and audience. From there we move through strategy, design, feedback, and build in tight sprint cycles. You\'re never left waiting — communication is direct, async-friendly, and transparent throughout.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. Every project includes a post-launch support window. Beyond that, we offer retainer arrangements for brands that want a long-term design partner — ongoing iterations, new features, or seasonal campaigns.',
  },
  {
    question: 'How is pricing structured?',
    answer: 'We price per project, not per hour. After a discovery call we send a fixed-scope proposal with a clear deliverables list and a single number. No hourly creep, no surprise invoices. Premium work at a price that respects your growth stage.',
  },
  {
    question: 'Can you handle both design and development?',
    answer: 'Absolutely — that\'s the core of what we do. We design and build in-house, so there\'s no translation gap between the vision and the final product. Pixel-perfect design meets production-ready code, always.',
  },
]

const WORKS_ITEMS = [
  {
    client: 'Vesenex',
    country: 'Australia',
    category: 'Branding & 3D Website',
    src: img5,
    alt: 'Vesenex — Brews Coffee website design',
    wide: true,
    parallaxSpeed: 0.22,
  },
  {
    client: 'Summr',
    country: 'India',
    category: 'Branding & 3D Website',
    src: img2,
    alt: 'Summr — product bottle held against sky',
    wide: false,
    parallaxSpeed: 0.3,
  },
  {
    client: 'BCF Cast Factory',
    country: '',
    category: 'UIUX & Web',
    src: img4,
    alt: 'BCF Cast Factory — industrial motor component',
    wide: false,
    parallaxSpeed: 0.18,
  },
  {
    client: 'Hashmint',
    country: 'India',
    category: '3D Website & Photography',
    src: img3,
    alt: 'Hashmint — tablet on a brown desk',
    wide: true,
    parallaxSpeed: 0.25,
  },
  {
    client: 'Brews Coffee',
    country: 'India',
    category: 'Web Design & Development',
    src: img5,
    alt: 'Brews Coffee — website design',
    wide: false,
    parallaxSpeed: 0.2,
  },
]

function Home() {
  const navigate = useNavigate()

  function handleStartProject() {
    navigate('/contact')
  }

  return (
    <main className="home">

      <Navbar
        links={NAV_LINKS}
        ctaLabel="Contact Us"
        onCtaClick={handleStartProject}
      />

      <Hero
        primaryCta="Start a Project"
        secondaryCta="View Work"
        onPrimaryClick={handleStartProject}
        descriptionText="I craft experience-driven digital products that connect brands with people — clean, purposeful, and built to last."
      />

      <ServicesSection
        services={SERVICES}
        onStartProject={handleStartProject}
      />

      <WorksSection items={WORKS_ITEMS} />

      <TestimonialsSection testimonials={TESTIMONIALS} />

      <FaqSection faqs={FAQS} />

      <FooterSection />

    </main>
  )
}

export default Home
