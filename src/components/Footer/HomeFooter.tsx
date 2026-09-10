import React from 'react';
import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import './HomeFooter.css';

interface HomeFooterProps {
  onNavigate?: (page: string) => void;
}

export const HomeFooter: React.FC<HomeFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="home-footer">
      <div className="container">
        <div className="home-footer-inner">
          <div className="home-footer-brand-wrap">
            <span className="home-footer-brand">REDITUS</span>
            <span className="home-footer-motto">RETURN. REIMAGINE. REALIZE.</span>
          </div>

          <nav className="home-footer-nav" aria-label="Footer Navigation">
            <a href="#home">Home</a>
            <a href="#capabilities">What We Build</a>
            <a href="#approach">Approach</a>
            <a href="#industries">Industries</a>
            <a href="#insights">Insights</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="home-footer-socials">
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
