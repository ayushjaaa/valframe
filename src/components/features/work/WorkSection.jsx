import './WorkSection.css'
import imgA from '../../../assets/images/works/2.png'
import imgB from '../../../assets/images/works/porfolioimage1.webp'

function WorkSection() {
  return (
    <section className="work">

      {/* ── Dark Hero Panel ── */}
      <div className="work__hero-panel" data-section="dark">
        <div className="work__inner">
          <p className="work__eyebrow">Our Work</p>
          <h1 className="work__headline">
            Projects we've built for premium brands &amp; startups.
          </h1>
        </div>
      </div>

      {/* ── Projects Panel ── */}
      <div className="work__projects-panel">
        <div className="work__inner">
          <div className="work__grid">

            <div className="work__card work__card--featured">
              <img src={imgA} alt="Fashion app project" />
            </div>

            <div className="work__card">
              <img src={imgB} alt="Brews Coffee website" />
            </div>

            <div className="work__card">
              <img src={imgA} alt="Real estate app" />
            </div>

            <div className="work__card">
              <img src={imgB} alt="Mobile app mockup" />
            </div>

            <div className="work__card work__card--wide">
              <img src={imgA} alt="Multi-device project mockup" />
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default WorkSection
