import './WorkSection.css'
import img1 from '../../../assets/images/1.png'
import img2 from '../../../assets/images/2.jpeg'
import img3 from '../../../assets/images/3.png'
import img4 from '../../../assets/images/4.jpeg'
import img5 from '../../../assets/images/5.jpeg'

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
              <img src={img2} alt="Fashion app project" />
            </div>

            <div className="work__card">
              <img src={img5} alt="Brews Coffee website" />
            </div>

            <div className="work__card">
              <img src={img4} alt="Real estate app" />
            </div>

            <div className="work__card">
              <img src={img1} alt="Mobile app mockup" />
            </div>

            <div className="work__card work__card--wide">
              <img src={img3} alt="Multi-device project mockup" />
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default WorkSection
