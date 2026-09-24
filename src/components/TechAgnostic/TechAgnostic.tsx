import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './TechAgnostic.css';

const principles = [
  'IDEAS',
  'SYSTEMS',
  'INTELLIGENCE',
  'PEOPLE',
  'IMPACT',
];

export const TechAgnostic: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // 'INTELLIGENCE' is active by default as shown in reference
  useReveal(contentRef, { y: 20 });

  return (
    <section className="tech-agnostic-section">
      <div className="tech-agnostic-bg">
        <img 
          src="/assets/images/tech_agnostic_celestial.jpg" 
          alt="Celestial glowing curved portal rising above calm reflective mountain lake at twilight" 
          className="tech-agnostic-img"
          loading="eager"
        />
        <div className="tech-agnostic-overlay" />
      </div>

      <div className="container tech-agnostic-container">
        <div ref={contentRef} className="tech-agnostic-grid">
          {/* Left Column Content */}
          <div className="tech-agnostic-left">
            <h2 className="tech-agnostic-title">
              <span className="text-light">Technology</span><br />
              <span className="text-regular">agnostic.</span><br />
              <span className="text-black">Outcome focused.</span>
            </h2>

            <p className="tech-agnostic-desc">
              You bring the problem.<br />
              We choose the right architecture,<br />
              technology and implementation.
            </p>

            <a href="#approach" className="tech-btn-outline">
              <span className="btn-text">Learn how</span>
              <ArrowRight className="btn-arrow" size={15} />
            </a>
          </div>

          {/* Right Column Stack with Tracking Line and Node Indicator */}
          <div className="tech-agnostic-right">
            <div className="principles-tracker">
              {/* Vertical Guide Line with Active Dot Marker */}
              <div className="tracker-axis" aria-hidden="true">
                <div 
                  className="tracker-node" 
                  style={{ top: `${activeIndex * 36 + 8}px` }} 
                />
              </div>

              {/* Principle Items */}
              <div className="principles-list">
                {principles.map((p, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div 
                      key={p} 
                      className={`principle-row ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <span className="principle-name">{p}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Horizontal Accent Line */}
              <div className="tracker-bottom-bar" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
