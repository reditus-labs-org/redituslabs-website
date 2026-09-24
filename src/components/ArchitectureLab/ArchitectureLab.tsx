import React, { useState, useRef } from 'react';
import { useReveal } from '../../animation/hooks';
import './ArchitectureLab.css';

const stackTags = [
  'Web App',
  'SaaS',
  'AI',
  'RAG',
  'Agent',
  'Automation',
  'Real-Time',
  'Enterprise',
];

export const ArchitectureLab: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTag, setActiveTag] = useState('AI');
  useReveal(contentRef, { y: 20 });

  return (
    <section className="architecture-lab-section" id="architectures">
      <div className="architecture-container">
        <div ref={contentRef} className="architecture-content-wrapper">
          {/* Top Row: Left Editorial Headline & Outline CTA; Right Vertical Hairline Tech Selector */}
          <div className="architecture-top-row">
            <div className="architecture-left">
              <h2 className="architecture-title">
                <span className="text-light">Built for</span><br />
                <span className="text-black">what’s next.</span>
              </h2>
              <p className="architecture-desc">
                Modern architectures. Scalable systems.<br />
                Real-world solutions.
              </p>

              <a href={`#architecture/${activeTag.toLowerCase().replace(/ /g, '-')}`} className="arch-rect-btn">
                <span>View architectures</span>
                <span className="arch-arrow">→</span>
              </a>
            </div>

            <div className="architecture-right">
              <div className="arch-tech-container">
                <div className="arch-tech-line" />
                <ul className="arch-tech-list">
                  {stackTags.map((tag) => {
                    const isActive = activeTag === tag;
                    return (
                      <li
                        key={tag}
                        className={`arch-tech-row ${isActive ? 'active' : ''}`}

                      >
                        <div className="arch-tech-col-indicator">
                          {isActive ? (
                            <span className="arch-indicator-active">
                              <span className="arch-colon">:</span>
                              <span className="arch-caret">›</span>
                            </span>
                          ) : tag === 'SaaS' ? (
                            <span className="arch-indicator-faint">:</span>
                          ) : null}
                        </div>
                        <button className="arch-tech-col-name" aria-pressed={isActive} onClick={() => setActiveTag(tag)}>{tag}</button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Monumental Centered 3D Translucent Crystal Glass Stack */}
          <div className="architecture-visual-stage">
            <div className="architecture-ambient-glow" />
            <img 
              src="/assets/images/architecture_crystal_stack.jpg" 
              alt="Isometric translucent 3D crystal glass slabs glowing with warm amber core" 
              className="architecture-crystal-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
