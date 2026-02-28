import './AboutSection.css'
import founderPhoto from '../../../assets/images/founder.jpeg'

function AboutSection() {
  return (
    <section className="about">

      {/* ── Dark Hero Panel ── */}
      <div className="about__hero-panel" data-section="dark">
        <div className="about__inner">
          <div className="about__hero">

            <div className="about__hero-left">
              <p className="about__eyebrow">About Valframe</p>
              <h1 className="about__headline">
                We help premium brands &amp; startups build digital products that stand out.
              </h1>
              <p className="about__subline">
                Clarity, strategy, and execution — under one roof.
              </p>
            </div>

            <div className="about__founder-card">
              <div className="about__founder-img-wrap">
                <img src={founderPhoto} alt="Ayush Jaiswal" />
              </div>
              <div className="about__founder-meta">
                <p className="about__founder-role">Founder &amp; Lead</p>
                <h2 className="about__founder-name">Ayush Jaiswal</h2>
                <div className="about__founder-contacts">
                  <a className="about__contact-chip" href="tel:+917222918898">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.95-1.95a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    +91 72229 18898
                  </a>
                  <a
                    className="about__contact-chip"
                    href="https://www.linkedin.com/in/aayush-jaiswaal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Light Content Panel ── */}
      <div className="about__content-panel">
        <div className="about__inner">

          <div className="about__story">
            <div className="about__story-label">Our Story</div>
            <div className="about__story-body">
              <p className="about__body">
                Valframe is a design and development studio focused on crafting high-quality digital experiences. Whether you're an established brand looking to elevate your online presence or a startup launching your first product, we bring clarity, strategy, and execution together under one roof.
              </p>
              <p className="about__body">
                From web design and development to branding, UI/UX, motion, and e-commerce — we partner closely with clients to understand their goals and build solutions that deliver real results. We don't just build websites; we build tools that grow businesses.
              </p>
            </div>
          </div>

          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-number">50+</span>
              <span className="about__stat-label">Projects delivered</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">2+</span>
              <span className="about__stat-label">Years of experience</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-number">100%</span>
              <span className="about__stat-label">Client satisfaction</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default AboutSection
