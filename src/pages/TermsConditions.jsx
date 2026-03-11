import './legal-page.css'
import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

function TermsConditions() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" ctaHref="/contact" />

      <main className="legal-page">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="legal-page__hero">
          <div className="legal-page__hero-inner">
            <p className="legal-page__eyebrow">Legal</p>
            <h1 className="legal-page__title">Terms and Conditions</h1>
            <p className="legal-page__date">Effective Date: March 2026</p>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="legal-page__content">

          <p className="legal-page__intro">
            These Terms and Conditions govern your use of the Valframe Web Solutions website located at valframe.com. By accessing or using this website, you confirm that you are at least 13 years of age and agree to comply with these Terms. If you do not agree, please discontinue use of the website immediately.
          </p>

          {/* Section 1 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">1. About Valframe Web Solutions</h2>
            <p className="legal-page__body">
              Valframe Web Solutions is a digital agency providing services including:
            </p>
            <ul className="legal-page__list">
              <li>Website design and development</li>
              <li>Web applications</li>
              <li>UI/UX design</li>
              <li>Digital product development</li>
              <li>Technical consulting and digital solutions</li>
            </ul>
            <p className="legal-page__body">
              Information provided on this website is intended for general informational purposes about our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">2. Website Use</h2>
            <p className="legal-page__body">Users agree to use this website only for lawful purposes. You must not:</p>
            <ul className="legal-page__list">
              <li>Attempt to gain unauthorized access to website systems</li>
              <li>Distribute malicious software or harmful code</li>
              <li>Disrupt website functionality</li>
              <li>Misuse website content or services</li>
            </ul>
            <p className="legal-page__body">Any misuse of the website may result in legal action.</p>
          </section>

          {/* Section 3 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">3. Intellectual Property Rights</h2>
            <p className="legal-page__body">
              All content available on this website including:
            </p>
            <ul className="legal-page__list">
              <li>Website design</li>
              <li>Logos and branding</li>
              <li>Graphics and illustrations</li>
              <li>Written content</li>
              <li>Layouts and design elements</li>
              <li>Source code and technical materials</li>
            </ul>
            <p className="legal-page__body">
              are the intellectual property of Valframe Web Solutions, unless otherwise stated. Unauthorized reproduction, distribution, or modification of website content is prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">4. Project Engagement</h2>
            <p className="legal-page__body">
              Submitting an inquiry or contact form on this website does not establish a formal business relationship. Project scope, deliverables, timelines, and pricing are defined through direct agreements between Valframe Web Solutions and the client.
            </p>
          </section>

          {/* Section 5 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">5. Service Availability</h2>
            <p className="legal-page__body">
              We aim to keep the website accessible and functioning properly. However, we do not guarantee uninterrupted availability and may temporarily suspend services for maintenance or technical updates.
            </p>
          </section>

          {/* Section 6 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">6. Third-Party Services</h2>
            <p className="legal-page__body">
              Our website may reference or link to third-party platforms, tools, or services. Valframe Web Solutions does not control and is not responsible for the policies or content of external websites.
            </p>
          </section>

          {/* Section 7 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">7. Limitation of Liability</h2>
            <p className="legal-page__body">
              Valframe Web Solutions shall not be liable for any damages arising from:
            </p>
            <ul className="legal-page__list">
              <li>The use of this website</li>
              <li>Inability to access the website</li>
              <li>Reliance on website information</li>
              <li>External links or third-party services</li>
            </ul>
            <p className="legal-page__body">All website content is provided "as is" without warranties of any kind.</p>
          </section>

          {/* Section 8 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">8. Indemnification</h2>
            <p className="legal-page__body">
              Users agree to indemnify and hold harmless Valframe Web Solutions from any claims, damages, or liabilities resulting from misuse of the website or violation of these Terms.
            </p>
          </section>

          {/* Section 9 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">9. Changes to Terms</h2>
            <p className="legal-page__body">
              We reserve the right to modify or update these Terms and Conditions at any time. Continued use of the website after updates indicates acceptance of the revised terms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">10. Governing Law</h2>
            <p className="legal-page__body">
              These Terms shall be governed and interpreted in accordance with the applicable laws of the jurisdiction in which Valframe Web Solutions operates.
            </p>
          </section>

          {/* Section 11 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">11. Contact Information</h2>
            <p className="legal-page__body">
              For questions regarding these Terms and Conditions, please contact:
            </p>
            <div className="legal-page__contact-block">
              <p>Valframe Web Solutions</p>
              <p>Email: <a href="mailto:hello@valframe.com">hello@valframe.com</a></p>
              <p>Website: <a href="https://valframe.com" target="_blank" rel="noopener noreferrer">valframe.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <FooterSection />
    </>
  )
}

export default TermsConditions
