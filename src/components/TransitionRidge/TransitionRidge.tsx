import React, { useRef } from 'react';
import { useReveal } from '../../animation/hooks';
import './TransitionRidge.css';

export const TransitionRidge: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  useReveal(textRef, { y: 20 });

  return (
    <section className="transition-ridge-section">
      <div className="transition-ridge-bg">
        <img 
          src="/assets/images/mountain_mist_horizon.jpg" 
          alt="Atmospheric mountain ridges" 
          className="transition-ridge-img"
        />
        <div className="transition-ridge-overlay" />
      </div>

      <div className="container">
        <div ref={textRef} className="transition-ridge-content">
          <div className="transition-ridge-cross">✦</div>
          <div className="transition-ridge-text">
            SAME PROBLEMS.<br />
            HIGHER POSSIBILITIES.
          </div>
        </div>
      </div>
    </section>
  );
};
