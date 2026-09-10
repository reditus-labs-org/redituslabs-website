import React, { useRef } from 'react';
import { useReveal } from '../../animation/hooks';
import './RealImpact.css';

export const RealImpact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, { stagger: 0.15, y: 20 });

  return (
    <section className="real-impact-section">
      <div className="container">
        <div className="real-impact-eyebrow">REAL IMPACT</div>
        
        <div ref={containerRef} className="real-impact-grid">
          <div className="impact-col">
            <div className="impact-number">50+</div>
            <div className="impact-label">Products delivered</div>
          </div>

          <div className="impact-col">
            <div className="impact-number">7+</div>
            <div className="impact-label">Industries served</div>
          </div>

          <div className="impact-col">
            <div className="impact-number">∞</div >
            <div className="impact-label">Possibilities ahead</div>
          </div>
        </div>
      </div>
    </section>
  );
};
