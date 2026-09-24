import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './PreFooterCTA.css';

interface PreFooterCTAProps {
  onStartConversation?: () => void;
}

export const PreFooterCTA: React.FC<PreFooterCTAProps> = ({ onStartConversation }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useReveal(contentRef, { y: 20 });

  return (
    <section className="prefooter-cta-section">
      <div className="container">
        <div ref={contentRef} className="prefooter-cta-content">
          <h2 className="prefooter-title">
            <span className="text-light">Ready to build </span>
            <span className="text-black">what’s next?</span>
          </h2>
          <p className="prefooter-subtitle">
            <span className="text-medium">Whether you’re starting from an idea,</span>{' '}
            <span className="text-regular">scaling a product, or reimagining what’s possible</span> —{' '}
            <span className="text-light">we’re here to engineer the outcome.</span>
          </p>

          <div className="prefooter-buttons">
            <button 
              className="pill-btn pill-btn-dark"
              onClick={onStartConversation}
            >
              <span>Start a conversation</span>
              <ArrowRight className="btn-arrow" size={14} />
            </button>

            <a href="#playbook" className="pill-btn pill-btn-dark-outline">
              <span>View playbook</span>
              <ArrowRight className="btn-arrow" size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
