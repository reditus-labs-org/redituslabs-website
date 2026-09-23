import { responsiveImage } from '../responsiveImage';
import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './CaseStudies.css';
import { caseItems } from '../../pages/content';

export const CaseStudies: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(1);
  const item = caseItems[currentIdx - 1];
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, { y: 20 });

  return (
    <section id="cases" className="case-studies-section">
      <div className="container">
        <div className="case-studies-header">
          <div>
            <h2 className="case-studies-title">Case studies</h2>
            <div className="case-studies-eyebrow">REAL PROBLEMS. REAL ENGINEERING.</div>
          </div>

          <a href="#case-studies" className="case-studies-all-link">
            <span>View all</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div ref={containerRef}><a href={`#case-study/${item.slug}`} className="case-study-hero-card" aria-label={item.title}>
          <img
            src={item.image} {...responsiveImage(item.image, "(max-width: 1440px) 100vw, 1440px")}
            alt={item.title}
            className="case-study-img"
          />
          <div className="case-study-overlay" />

          <div className="case-study-content-bottom">
            <h3 className="case-study-project-title">
              {item.title}
            </h3>

            <div className="case-study-footer-row">
              <div className="case-study-tags">
{item.tags?.map(tag => <span key={tag} className="case-study-tag">{tag}</span>)}
              </div>

              <div className="case-study-action-bubble">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </a></div>

        <div className="case-studies-controls">
          <div className="case-counter" aria-live="polite">0{currentIdx} / 03</div>
          <div className="case-nav-arrows">
            <button
              className="case-arrow-btn"
              onClick={() => setCurrentIdx(prev => prev > 1 ? prev - 1 : 3)}
              aria-label="Previous case"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              className="case-arrow-btn"
              onClick={() => setCurrentIdx(prev => prev < 3 ? prev + 1 : 1)}
              aria-label="Next case"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
