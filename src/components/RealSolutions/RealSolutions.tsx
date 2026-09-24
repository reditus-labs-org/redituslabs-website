import { responsiveImage } from '../responsiveImage';
import React, { useRef } from 'react';
import { useReveal } from '../../animation/hooks';
import './RealSolutions.css';

export const RealSolutions: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  useReveal(textRef, { y: 20 });

  return (
    <section className="real-solutions-section">
      <div className="container">
        <div className="real-solutions-card">
          <img
            src="/assets/images/4k/solutions-4k.jpg"
              {...responsiveImage("/assets/images/4k/solutions-4k.jpg", "100vw")}
            alt="Panoramic architectural concrete hall with dawn sunrise"
            className="real-solutions-img"
          />
          <div className="real-solutions-overlay" />

          <div ref={textRef} className="real-solutions-text">
            <span className="sol-line-1">REAL</span>
            <span className="sol-line-2">SOLUTIONS</span>
            <span className="sol-line-3">FOR A WIDER</span>
            <span className="sol-line-4">TOMORROW.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
