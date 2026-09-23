import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './Approach.css';

// Bespoke architectural sketch wireframe icons matching reference
const IconDiscover = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="approach-svg-icon">
    <polygon points="24,6 29,15 39,17 32,25 35,36 24,30 13,36 16,25 9,17 19,15" />
    <line x1="24" y1="6" x2="24" y2="21" />
    <line x1="24" y1="21" x2="39" y2="17" />
    <line x1="24" y1="21" x2="9" y2="17" />
    <line x1="24" y1="21" x2="35" y2="36" />
    <line x1="24" y1="21" x2="13" y2="36" />
    <line x1="24" y1="21" x2="24" y2="30" />
    <circle cx="24" cy="21" r="1.5" fill="currentColor" />
  </svg>
);

const IconDesign = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="approach-svg-icon">
    <path d="M 33 13 A 16 16 0 1 0 24 40" />
    <path d="M 18 19 L 28 15 L 38 19 L 28 23 Z" />
    <path d="M 18 19 L 18 29 L 28 33 L 38 29 L 38 19" />
    <line x1="28" y1="23" x2="28" y2="33" />
    <line x1="23" y1="21" x2="23" y2="31" strokeDasharray="1.5 2" />
    <line x1="33" y1="21" x2="33" y2="31" strokeDasharray="1.5 2" />
  </svg>
);

const IconEngineer = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="approach-svg-icon">
    <path d="M 24 13 L 36 19 L 24 25 L 12 19 Z" />
    <path d="M 12 19 L 12 31 L 24 37 L 36 31 L 36 19" />
    <line x1="24" y1="25" x2="24" y2="37" />
    <line x1="36" y1="19" x2="42" y2="16" />
    <line x1="12" y1="31" x2="6" y2="34" />
    <line x1="24" y1="13" x2="24" y2="7" />
    <circle cx="24" cy="25" r="2" fill="currentColor" />
  </svg>
);

const IconDeploy = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="approach-svg-icon">
    <circle cx="24" cy="24" r="16" />
    <rect x="17" y="17" width="14" height="14" rx="2.5" />
    <circle cx="24" cy="24" r="3" />
    <line x1="24" y1="14" x2="24" y2="16" />
    <line x1="24" y1="32" x2="24" y2="34" />
  </svg>
);

const IconIterate = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="approach-svg-icon">
    <path d="M 24 8 L 38 33 L 10 33 Z" />
    <path d="M 24 17 L 31 29 L 17 29 Z" />
    <line x1="24" y1="8" x2="24" y2="17" />
    <line x1="38" y1="33" x2="31" y2="29" />
    <line x1="10" y1="33" x2="17" y2="29" />
    <circle cx="24" cy="8" r="1.5" fill="currentColor" />
    <line x1="10" y1="33" x2="6" y2="37" />
    <line x1="38" y1="33" x2="42" y2="37" />
  </svg>
);

const steps = [
  { num: '01', title: 'Discover', desc: 'Understand. Define. Align.', icon: IconDiscover },
  { num: '02', title: 'Design', desc: 'Product. Architecture. Experience.', icon: IconDesign },
  { num: '03', title: 'Engineer', desc: 'Build. Integrate. Test.', icon: IconEngineer },
  { num: '04', title: 'Deploy', desc: 'Release. Scale. Secure.', icon: IconDeploy },
  { num: '05', title: 'Iterate', desc: 'Monitor. Improve. Grow.', icon: IconIterate },
];

export const Approach: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  useReveal(listRef, { stagger: 0.1, y: 20 });

  return (
    <section id="approach" className="approach-section">
      <div className="container">
        {/* Header Grid */}
        <div className="approach-hero-grid">
          <div className="approach-headline-col">
            <div className="approach-eyebrow">OUR APPROACH</div>
            <h1 className="approach-headline">
              A clearer path<br />to what’s possible.
            </h1>
            <p className="approach-subline">
              A structured approach. Real collaboration.<br />
              Measurable outcomes.
            </p>
          </div>

          <div className="approach-indicator-col">
            <div className="approach-top-guide-line" />
            <div className="approach-side-label">
              <span>IDEA</span>
              <span>TO IMPACT</span>
            </div>
            <div className="approach-bottom-accent-dash" />
          </div>
        </div>
      </div>

      {/* Full-bleed Monumental curved architectural terrace pavilion */}
      <div className="approach-cinematic-banner">
        <img 
          src="/assets/images/approach_pavilion_master.jpg" 
          alt="Monumental curved concrete architectural pavilion overlooking mountain peaks" 
          className="approach-banner-img"
        />
        <div className="approach-banner-fade-overlay" />
      </div>

      <div className="container">
        {/* 5 Process Steps with Continuous Vertical Timeline Line */}
        <div ref={listRef} className="approach-timeline-wrap">
          <div className="approach-vertical-track" />
          <div className="approach-steps-list">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={step.num} className="approach-step-row">
                  {/* Timeline Number Badge */}
                  <div className="step-num-col">
                    {idx === 0 ? (
                      <span className="step-num-left step-colon">:</span>
                    ) : (
                      <span className="step-num-left">{step.num}</span>
                    )}
                    <span className="step-num-right">{step.num}</span>
                  </div>

                  {/* Step Title & Description */}
                  <div className="step-body-col">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>

                  {/* Bespoke Architectural Wireframe Sketch Icon */}
                  <div className="step-icon-col">
                    <div className="step-sketch-icon-wrap">
                      <IconComponent />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Row with Flanking Dashes and Rectangular Outline Button */}
        <div className="approach-bottom-cta-row">
          <span className="cta-flank-dash cta-left-dash">--</span>
          <a href="#playbook" className="approach-rect-btn">
            <span>Learn about our approach</span>
            <ArrowRight className="btn-arrow" size={14} />
          </a>
          <span className="cta-flank-dash cta-right-dash">&mdash;&mdash;</span>
        </div>
      </div>
    </section>
  );
};
