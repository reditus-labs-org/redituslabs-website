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
          <h2 className="prefooter-title">Ready to build what’s next?</h2>
          <p className="prefooter-subtitle">
            Whether you’re starting from an idea, scaling a product, or reimagining what’s possible — we’re here to help.
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
