import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'
import './CaseStudyPage.css'

/* ── Image URLs — resolved at build time via import.meta.url
   Only the slug that matches is fetched by the browser.
──────────────────────────────────────────────────────────────── */
const img2      = new URL('../assets/images/works/2.png',                               import.meta.url).href
const img5      = new URL('../assets/images/works/porfolioimage1.webp',                 import.meta.url).href
const colorapp1 = new URL('../assets/images/works/colorapp1Valframe.webp',              import.meta.url).href
const colorapp  = new URL('../assets/images/works/colorappValframe.webp',               import.meta.url).href
const macbook13 = new URL('../assets/images/works/MacBook  13.webp',                   import.meta.url).href
const pharmacare= new URL('../assets/images/works/pharamycareappValframe.webp',         import.meta.url).href
const fashone   = new URL('../assets/images/works/fashoneProjectSowcasevalframe.webp',  import.meta.url).href

/* ── Case study data ──────────────────────────────────────────
   Add more projects here as you complete them.
   screenshots: array of { label, src, alt } — each is a page section
──────────────────────────────────────────────────────────────── */
const CASE_STUDIES = {
  elanora: {
    client: 'Elanora',
    country: 'Australia',
    category: 'Branding & 3D Website',
    year: '2025',
    tagline: 'A premium brand identity and immersive 3D web experience for the Australian luxury market.',
    overview: 'Elanora needed a digital presence that matched its position as a premium lifestyle brand. We crafted a full brand identity system — from typography and colour palette to a fully animated 3D website that puts the product front and centre.',
    services: ['Brand Identity', '3D Website Design', 'Motion Design', 'Development'],
    coverSrc: img5,
    screenshots: [
      { label: 'Homepage', src: img5, alt: 'Elanora — Homepage' },
    ],
  },
  summr: {
    client: 'Summr',
    country: 'India',
    category: 'Branding & 3D Website',
    year: '2025',
    tagline: 'Bold branding and a product-first 3D website for an Indian beverage startup.',
    overview: 'Summr is an energy drink brand targeting Gen-Z. We built an expressive identity and a high-energy 3D website that feels as vibrant as the product itself.',
    services: ['Brand Identity', '3D Website Design', 'Motion Design', 'Development'],
    coverSrc: img2,
    screenshots: [
      { label: 'Homepage', src: img2, alt: 'Summr — Homepage' },
    ],
  },
  'bcf-cast-factory': {
    client: 'BCF Cast Factory',
    country: 'India',
    category: 'UI/UX & Web',
    year: '2025',
    tagline: 'A clean, conversion-focused industrial website that builds trust at first glance.',
    overview: 'BCF Cast Factory required a professional web presence that communicated precision engineering and reliability. We designed a structured UI/UX focused on showcasing their product range and driving enquiry.',
    services: ['UI/UX Design', 'Web Design', 'Development'],
    coverSrc: colorapp1,
    screenshots: [
      { label: 'Homepage', src: colorapp1, alt: 'BCF Cast Factory — Homepage' },
    ],
  },
  hashmint: {
    client: 'Hashmint',
    country: 'India',
    category: '3D Website & Photography',
    year: '2025',
    tagline: 'A tech-forward 3D website paired with editorial product photography.',
    overview: 'Hashmint is a fintech product that needed to feel both trustworthy and cutting-edge. We combined a 3D interactive website with a full product photography shoot to create a complete digital narrative.',
    services: ['3D Website Design', 'Product Photography', 'Development'],
    coverSrc: macbook13,
    screenshots: [
      { label: 'Homepage', src: macbook13, alt: 'Hashmint — Homepage' },
    ],
  },
  pharmacare: {
    client: 'Pharmacare',
    country: 'India',
    category: 'App Design',
    year: '2025',
    tagline: 'A clean, intuitive app design for a modern pharmacy platform.',
    overview: 'Pharmacare needed a mobile app experience that made finding and ordering medicines effortless. We designed a clear, trustworthy UI that guides users from search to checkout with minimal friction.',
    services: ['UI/UX Design', 'App Design', 'Prototyping'],
    coverSrc: pharmacare,
    screenshots: [
      { label: 'Homepage', src: pharmacare, alt: 'Pharmacare — Homepage' },
    ],
  },
  'brews-coffee': {
    client: 'Brews Coffee',
    country: 'India',
    category: 'Web Design & Development',
    year: '2025',
    tagline: 'A warm, story-driven website for a specialty coffee brand.',
    overview: 'Brews Coffee wanted a digital home that reflected their craft and community. We built an immersive, content-rich website that guides visitors through the brand story, the menu, and into the shop.',
    services: ['Web Design', 'Development', 'UI/UX Design'],
    coverSrc: colorapp,
    screenshots: [
      { label: 'Homepage', src: colorapp, alt: 'Brews Coffee — Homepage' },
    ],
  },
  fashone: {
    client: 'Fashone',
    country: 'India',
    category: 'Fashion & E-commerce',
    year: '2025',
    tagline: 'A fashion-forward e-commerce experience built for modern consumers.',
    overview: 'Fashone needed a bold, editorial digital presence that matched the energy of their fashion brand. We designed a full e-commerce experience that puts the product front and centre with a clean, conversion-focused layout.',
    services: ['E-commerce Design', 'UI/UX Design', 'Development'],
    coverSrc: fashone,
    screenshots: [
      { label: 'Homepage', src: fashone, alt: 'Fashone — Homepage' },
    ],
  },
}

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

function CaseStudyPage() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const study      = CASE_STUDIES[slug]

  if (!study) {
    return (
      <>
        <Navbar links={NAV_LINKS} ctaLabel="Contact Us" ctaHref="/contact" />
        <div className="case-study-404">
          <p className="case-study-404__text">Project not found.</p>
          <button className="case-study-404__back" onClick={() => navigate('/')}>
            Back to home
          </button>
        </div>
        <FooterSection />
      </>
    )
  }

  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" ctaHref="/contact" />

      <main className="case-study">

        {/* ── Hero ──────────────────────────────────── */}
        <section className="case-study__hero">
          <div className="case-study__hero-inner">
            <div className="case-study__meta-row">
              <span className="case-study__label">{study.category}</span>
              <span className="case-study__dot" aria-hidden="true" />
              <span className="case-study__label">{study.country}</span>
              <span className="case-study__dot" aria-hidden="true" />
              <span className="case-study__label">{study.year}</span>
            </div>
            <h1 className="case-study__client">{study.client}</h1>
            <p className="case-study__tagline">{study.tagline}</p>
          </div>

          <div className="case-study__cover">
            <img
              className="case-study__cover-img"
              src={study.coverSrc}
              alt={`${study.client} — cover`}
              fetchpriority="high"
            />
          </div>
        </section>

        {/* ── Overview ──────────────────────────────── */}
        <section className="case-study__overview">
          <div className="case-study__overview-inner">
            <div className="case-study__overview-left">
              <span className="case-study__section-label">Overview</span>
              <p className="case-study__overview-text">{study.overview}</p>
            </div>
            <div className="case-study__overview-right">
              <span className="case-study__section-label">Services delivered</span>
              <ul className="case-study__services-list">
                {study.services.map((s) => (
                  <li key={s} className="case-study__service-item">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Screenshots ───────────────────────────── */}
        <section className="case-study__screens">
          <div className="case-study__screens-inner">
            {study.screenshots.map((screen) => (
              <div key={screen.label} className="case-study__screen">
                <div className="case-study__screen-label-row">
                  <span className="case-study__screen-label">{screen.label}</span>
                </div>
                <div className="case-study__screen-frame">
                  <img
                    className="case-study__screen-img"
                    src={screen.src}
                    alt={screen.alt}
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Back nav ──────────────────────────────── */}
        <section className="case-study__back-section">
          <div className="case-study__back-inner">
            <button className="case-study__back-btn" onClick={() => navigate('/#work')}>
              <span className="case-study__back-arrow" aria-hidden="true">←</span>
              Back to works
            </button>
          </div>
        </section>

      </main>

      <FooterSection />
    </>
  )
}

export default CaseStudyPage
