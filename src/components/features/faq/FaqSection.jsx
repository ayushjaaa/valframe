import { useState } from 'react'
import './FaqSection.css'

/* ── Individual FAQ item ────────────────────────────────────── */
function FaqItem({ question, answer, index, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <button
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="faq-item__index">0{index + 1}/</span>
        <span className="faq-item__question">{question}</span>
        <span className="faq-item__icon" aria-hidden="true" />
      </button>

      <div
        className="faq-item__body"
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div className="faq-item__body-inner">
          <p className="faq-item__answer">{answer}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Section ──────────────────────────────────────────────── */
function FaqSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null)

  function handleToggle(i) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <section className="faq" id="faq">
      <div className="faq__inner">

        <div className="faq__header">
          <div className="faq__label-row">
            <span className="faq__label-dot" aria-hidden="true" />
            <span className="faq__label-text">{'{05}'} — FAQ</span>
          </div>
          <h2 className="faq__display">Got Questions?</h2>
        </div>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              {...item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default FaqSection
