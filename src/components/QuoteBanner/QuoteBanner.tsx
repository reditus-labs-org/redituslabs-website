import React, { useRef } from 'react';
import { Play } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './QuoteBanner.css';

export const QuoteBanner: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  useReveal(quoteRef, { y: 20 });

  return (
    <section className="quote-banner-section">
      <div className="quote-banner-bg">
        <img
          src="/assets/images/mountain_mist_horizon.jpg"
          alt="Atmospheric majestic mountain vista"
          className="quote-banner-img"
        />
        <div className="quote-banner-overlay" />
      </div>

      <div className="container quote-banner-container">
        <div ref={quoteRef} className="quote-banner-content">
          <blockquote className="quote-text">
            “<span className="text-light">Technology is a means.</span>{' '}
            <span className="text-medium">People, progress</span>{' '}
            <span className="text-bold">and possibility</span>{' '}
            <span className="text-black">are the outcome.</span>”
          </blockquote>

          <a href="#story" className="quote-watch-btn">
            <span className="quote-play-bubble">
              <Play size={12} fill="currentColor" />
            </span>
            <span>Watch our story</span>
          </a>
        </div>
      </div>
    </section>
  );
};
