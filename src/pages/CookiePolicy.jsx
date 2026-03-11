import './legal-page.css'
import Navbar from '../components/features/navbar'
import FooterSection from '../components/features/footer'

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

function CookiePolicy() {
  return (
    <>
      <Navbar links={NAV_LINKS} ctaLabel="Contact Us" ctaHref="/contact" />

      <main className="legal-page">

        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="legal-page__hero">
          <div className="legal-page__hero-inner">
            <p className="legal-page__eyebrow">Legal</p>
            <h1 className="legal-page__title">Cookie Policy</h1>
            <p className="legal-page__date">Effective Date: March 2026</p>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="legal-page__content">

          <p className="legal-page__intro">
            This Cookie Policy explains how Valframe Web Solutions ("Valframe", "we", "our", or "us") uses cookies and similar tracking technologies when you visit our website at valframe.com. By continuing to use our website, you consent to the use of cookies as described in this policy.
          </p>

          {/* Section 1 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">1. What Are Cookies</h2>
            <p className="legal-page__body">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) by a website when you visit it. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to the website owner.
            </p>
            <p className="legal-page__body">
              Cookies do not contain any information that personally identifies you, but personal information that we store about you may be linked to the information stored in and obtained from cookies.
            </p>
          </section>

          {/* Section 2 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">2. Types of Cookies We Use</h2>
            <p className="legal-page__body">We may use the following categories of cookies on our website:</p>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">Essential Cookies</h3>
              <p className="legal-page__body">
                These cookies are strictly necessary for the website to function properly. They enable core features such as page navigation, security, and access to protected areas. The website cannot function correctly without these cookies. They do not collect any personal information.
              </p>
            </div>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">Functional Cookies</h3>
              <p className="legal-page__body">
                These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, more personal features. The information these cookies collect may be anonymized and they cannot track your browsing activity on other websites.
              </p>
            </div>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">Analytics Cookies</h3>
              <p className="legal-page__body">
                These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages from web pages. All information collected by these cookies is aggregated and anonymous. We use this data to improve how our website works.
              </p>
            </div>

            <div className="legal-page__subsection">
              <h3 className="legal-page__subsection-title">Performance Cookies</h3>
              <p className="legal-page__body">
                These cookies help us understand and improve the performance of our website. They may record things such as how long you spend on a page or any error messages you encounter. This data is only used to improve the website.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">3. How We Use Cookies</h2>
            <p className="legal-page__body">Valframe Web Solutions uses cookies for the following purposes:</p>
            <ul className="legal-page__list">
              <li>To ensure the website functions correctly and securely</li>
              <li>To remember your preferences and settings during your visit</li>
              <li>To analyze website traffic and understand how visitors interact with our content</li>
              <li>To improve the overall performance and user experience of our website</li>
              <li>To detect and prevent fraudulent activity or security threats</li>
            </ul>
            <p className="legal-page__body">
              We do not use cookies to collect sensitive personal information or for targeted advertising purposes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">4. Third-Party Cookies</h2>
            <p className="legal-page__body">
              Some cookies on our website are placed by third-party services that appear on our pages. These may include analytics providers (such as Google Analytics), font services, and embedded content. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of their services.
            </p>
            <p className="legal-page__body">
              Third-party cookies are governed by the respective privacy policies of those third parties. We recommend reviewing the cookie and privacy policies of any third-party services you interact with.
            </p>
            <ul className="legal-page__list">
              <li>Analytics providers — to measure website traffic and usage patterns</li>
              <li>Font and asset delivery services — to load web fonts efficiently</li>
              <li>Embedded social media or portfolio content — if applicable</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">5. How to Control Cookies</h2>
            <p className="legal-page__body">
              You have the right to accept or decline cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Please note that disabling cookies may affect the functionality of this website.
            </p>
            <p className="legal-page__body">You can control cookies through your browser settings. Here is how to do it in common browsers:</p>
            <ul className="legal-page__list">
              <li>Google Chrome — Settings → Privacy and Security → Cookies and other site data</li>
              <li>Mozilla Firefox — Settings → Privacy & Security → Cookies and Site Data</li>
              <li>Safari — Preferences → Privacy → Manage Website Data</li>
              <li>Microsoft Edge — Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="legal-page__body">
              You can also opt out of analytics cookies by visiting your analytics provider's opt-out page. For Google Analytics, visit: g.co/analyticsoptout
            </p>
          </section>

          {/* Section 6 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">6. Cookie Consent</h2>
            <p className="legal-page__body">
              By continuing to use our website after being informed of our use of cookies through this policy, you consent to our use of cookies as described herein.
            </p>
            <p className="legal-page__body">
              If you do not consent to our use of cookies, you can disable them via your browser settings as described above, or discontinue use of our website. Please be aware that restricting cookies may impact your experience on our website.
            </p>
          </section>

          {/* Section 7 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">7. Changes to This Cookie Policy</h2>
            <p className="legal-page__body">
              We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our business practices. Any updates will be posted on this page with a revised effective date. We encourage you to review this policy periodically to stay informed about how we use cookies.
            </p>
          </section>

          {/* Section 8 */}
          <section className="legal-page__section">
            <h2 className="legal-page__section-title">8. Contact Information</h2>
            <p className="legal-page__body">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default CookiePolicy
