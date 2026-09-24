import { responsiveImage } from '../responsiveImage';
import React from 'react';
import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="grand-footer">
      <div className="container">
        <div className="grand-footer-top">
          <div className="grand-footer-brand">
            <h2 className="grand-brand-name">
              <span className="text-light">REDI</span><span className="text-black">TUS</span>
            </h2>
            <div className="grand-brand-sub">
              <span className="text-medium">A PRODUCT</span>{' '}
              <span className="text-light">ENGINEERING STUDIO</span>
            </div>
          </div>

          <div className="grand-footer-nav-grid">
            <div className="footer-nav-col">
              <a href="#home">Home</a>
              <a href="#capabilities">What We Build</a>
              <a href="#approach">Approach</a>
              <a href="#industries">Industries</a>
            </div>
            <div className="footer-nav-col">
              <a href="#cases">Case Studies</a>
              <a href="#insights">Insights</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>

        <div className="grand-footer-middle">
          <blockquote className="grand-footer-quote">
            “<span className="text-light">A brighter tomorrow</span>{' '}
            <span className="text-black">is a well engineered today.</span>”
          </blockquote>

          <div className="grand-footer-visual">
            <img
              src="/assets/images/4k/footer-4k.jpg"
              {...responsiveImage("/assets/images/4k/footer-4k.jpg", "100vw")}
              alt="Mountain misty horizon"
              className="footer-mist-img"
            />
          </div>
        </div>

        <div className="grand-footer-bottom">
          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>

          <div className="footer-copyright">
            © 2024 REDITUS. All rights reserved.
          </div>

          <div className="footer-social-icons">
            <a href={(import.meta as any).env.VITE_SOCIAL_LINKEDIN || "https://linkedin.com"} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={15} />
            </a>
            <a href={(import.meta as any).env.VITE_SOCIAL_X || "https://twitter.com"} target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter size={15} />
            </a>
            <a href={(import.meta as any).env.VITE_SOCIAL_YOUTUBE || "https://youtube.com"} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={15} />
            </a>
            <a href={(import.meta as any).env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com"} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
