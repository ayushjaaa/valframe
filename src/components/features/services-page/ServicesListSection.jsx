import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesListSection.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesListSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    const section = sectionRef.current;

    if (!section || cards.length === 0) return;

    const totalCards = cards.length;
    const cardSpacing = 12; // Percentage spacing between cards to show full headers
    const startPosition = 20; // First card pins at 10% from top
    const lastCardTopPosition = startPosition + ((totalCards - 1) * cardSpacing);

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Calculate sticky position from top: 10% + 7% for each card
        const topPosition = startPosition + (index * cardSpacing);

        // Set z-index so later cards stack on top of earlier ones
        gsap.set(card, { zIndex: index + 1 });

        ScrollTrigger.create({
          trigger: card,
          start: `top ${topPosition}%`,
          // Use the last card as the end trigger for all cards
          endTrigger: cards[totalCards - 1],
          // Unpin when last card reaches its position
          end: `top ${lastCardTopPosition}%`,
          pin: true,
          pinSpacing: false,
        });
      });
    }, section);

    return () => {
      // Properly revert all GSAP animations and ScrollTriggers in this context
      try {
        if (ctx) {
          ctx.revert() // This will unpin and cleanup all animations
        }
        // Also manually kill any remaining ScrollTriggers for this section
        ScrollTrigger.getAll()?.forEach(trigger => {
          if (trigger.vars?.trigger && section?.contains(trigger.vars.trigger)) {
            trigger.kill(true) // Kill and revert
          }
        })
      } catch (e) {
        // Silently handle cleanup errors
      }
    };
  }, []);

  const services = [
    {
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      subtitle: 'Custom Systems. Built to Scale.',
      tags: ['Scalable Architecture', 'High Performance', 'Enterprise Security'],
      description: 'We build custom software engineered for performance, security, and long-term growth — no templates, only strategic development.',
      imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80'
    },
    {
      number: '02',
      title: 'BRAND STRATEGY & SHOOT',
      subtitle: 'Positioning That Feels Premium.',
      tags: ['Brand Direction', 'Visual Identity', 'High-Impact Assets'],
      description: 'We craft powerful brand identities and premium visuals that build authority, trust, and strong market presence.',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80'
    },
    {
      number: '03',
      title: 'CYBER SECURITY',
      subtitle: 'Protection You Can Trust.',
      tags: ['Threat Prevention', 'Data Security', 'Risk Monitoring'],
      description: 'We secure your infrastructure with advanced protection systems that safeguard your data and reputation.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80'
    },
    {
      number: '04',
      title: 'CLOUD SERVICES',
      subtitle: 'Flexible. Fast. Scalable.',
      tags: ['Cloud Migration', 'Performance Optimization', 'Cost Efficiency'],
      description: 'We design scalable cloud environments that improve speed, flexibility, and operational efficiency.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
    },
    {
      number: '05',
      title: 'AI & ML SERVICES',
      subtitle: 'Intelligence That Works for You.',
      tags: ['Predictive Insights', 'Automation', 'Custom AI Models'],
      description: 'We develop smart AI solutions that optimize processes and unlock smarter decision-making.',
      imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80'
    },
    {
      number: '06',
      title: 'WEB DEVELOPMENT',
      subtitle: 'Websites That Convert.',
      tags: ['Custom Builds', 'Speed Optimization', 'Conversion Strategy'],
      description: 'We create high-performance websites designed to engage users and drive measurable results.',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
    },
    {
      number: '07',
      title: 'UI/UX DESIGN',
      subtitle: 'Clean. Intuitive. Impactful.',
      tags: ['User Research', 'Modern Interfaces', 'Experience Optimization'],
      description: 'We design user-focused digital experiences that feel seamless, clear, and conversion-driven.',
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80'
    }
  ];

  return (
    <section className="services-list-section" ref={sectionRef}>
      <div className="services-list-container">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            className="card"
          >
            <div className="service-header">
              <div className="service-number">{service.number}</div>
              <h2 className="service-title">{service.title}</h2>
              <p className="service-subtitle">{service.subtitle}</p>
            </div>

            <div className="service-content-wrapper">
              <div className="service-body">
                <div className="service-left">
                  <div className="service-tags">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="service-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-right">
                  <div className="service-image" style={{ backgroundImage: `url(${service.imageUrl})` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesListSection;
