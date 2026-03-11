import './legal-page.css'
import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

function PrivacyPolicy() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" ctaHref="/contact" />

      <main className="legal-page">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="legal-page__hero">
          <div className="legal-page__hero-inner">
            <p className="legal-page__eyebrow">Legal</p>
            <h1 className="legal-page__title">Privacy Policy</h1>
            <p className="legal-page__date">Effective Date: March 2026</p>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="legal-page__content">

          <p className="legal-page__intro">
            Valframe Web Solutions ("Valframe", "we", "our", or "us") respects your privacy and is committed to protecting the personal information of visitors, clients, and users of our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website valframe.com or interact with our services. By using our website, you agree to the practices described in this Privacy Policy.
          </p>

          {/* Section 1 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">1. Information We Collect</h2>
            <p className="legal-page__body">
              We may collect several types of information to provide and improve our services.
            </p>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">1.1 Personal Information</h3>
              <p className="legal-page__body">
                When you contact us, request a quote, or communicate with us through our website, we may collect personal information such as:
              </p>
              <ul className="legal-page__list">
                <li>Full name</li>
                <li>Email address</li>
                <li>Company or business name</li>
                <li>Phone number (if provided)</li>
                <li>Project details or requirements</li>
                <li>Any files or documents shared with us for project discussions</li>
              </ul>
              <p className="legal-page__body">Providing this information is voluntary.</p>
            </div>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">1.2 Automatically Collected Information</h3>
              <p className="legal-page__body">
                When you visit our website, certain information may be collected automatically through standard internet technologies. This may include:
              </p>
              <ul className="legal-page__list">
                <li>Internet Protocol (IP) address</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited on our website</li>
                <li>Time and date of visits</li>
                <li>Referring websites</li>
                <li>Usage behavior on the website</li>
              </ul>
              <p className="legal-page__body">This information helps us improve the functionality and performance of our website.</p>
            </div>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">1.3 Cookies and Tracking Technologies</h3>
              <p className="legal-page__body">
                Our website may use cookies or similar technologies to remember user preferences, improve website functionality, and analyze website traffic and performance. Cookies are small data files stored on your device by your browser. You may disable cookies through your browser settings, though some parts of the website may not function properly without them.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">2. How We Use the Information</h2>
            <p className="legal-page__body">Valframe Web Solutions uses collected information for purposes including:</p>
            <ul className="legal-page__list">
              <li>Responding to inquiries and project requests</li>
              <li>Communicating with potential clients and partners</li>
              <li>Delivering web development and digital services</li>
              <li>Improving website functionality and performance</li>
              <li>Maintaining security and preventing fraudulent activity</li>
              <li>Analyzing user behavior to improve user experience</li>
            </ul>
            <p className="legal-page__body">We only use personal information for legitimate business purposes.</p>
          </section>

          {/* Section 3 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">3. Confidentiality of Client Information</h2>
            <p className="legal-page__body">
              As a web development and digital solutions agency, Valframe understands the importance of protecting client ideas, product concepts, designs, and confidential business information. Any information shared with us during project discussions or collaboration is treated as confidential and will not be disclosed without client consent unless required by law.
            </p>
          </section>

          {/* Section 4 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">4. Information Sharing and Disclosure</h2>
            <p className="legal-page__body">
              Valframe Web Solutions does not sell, rent, or trade personal information to third parties. Information may only be shared in limited situations such as:
            </p>
            <ul className="legal-page__list">
              <li>With trusted service providers necessary for operating the website or delivering services</li>
              <li>When required by law or legal process</li>
              <li>When necessary to protect our rights, users, or security of the website</li>
            </ul>
            <p className="legal-page__body">
              Categories of third-party service providers we may work with include: website hosting and infrastructure providers, email and communication tools, analytics platforms, and project management software. These providers are only given access to information necessary to perform their specific functions and are not permitted to use it for other purposes.
            </p>
          </section>

          {/* Section 5 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">5. Data Security</h2>
            <p className="legal-page__body">
              We implement reasonable technical and organizational security measures to protect personal information against unauthorized access, misuse, alteration, or disclosure. However, no method of internet transmission or electronic storage is completely secure. Therefore, absolute security cannot be guaranteed.
            </p>
          </section>

          {/* Section 6 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">6. Third-Party Links</h2>
            <p className="legal-page__body">
              Our website may contain links to third-party websites such as social media platforms, development resources, or portfolio references. Valframe Web Solutions does not control and is not responsible for the privacy practices or content of those external websites. Users are encouraged to review the privacy policies of any third-party websites they visit.
            </p>
          </section>

          {/* Section 7 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">7. Data Retention</h2>
            <p className="legal-page__body">
              We retain personal information only as long as necessary to fulfill the purposes described in this Privacy Policy or to comply with legal obligations.
            </p>
          </section>

          {/* Section 8 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">8. Your Rights</h2>
            <p className="legal-page__body">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="legal-page__list">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of personal data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="legal-page__body">Requests can be made by contacting us using the contact details below.</p>
          </section>

          {/* Section 9 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">9. Children's Privacy</h2>
            <p className="legal-page__body">
              Our website and services are not directed toward individuals under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Section 10 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">10. Changes to This Privacy Policy</h2>
            <p className="legal-page__body">
              Valframe Web Solutions may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Updated versions will be posted on this page with the revised effective date.
            </p>
          </section>

          {/* Section 11 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">11. Contact Information</h2>
            <p className="legal-page__body">
              If you have any questions regarding this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy
