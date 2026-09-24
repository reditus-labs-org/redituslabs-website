import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId || page);
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const isDarkNav = ['home', 'all', 'story', 'about'].includes(currentPage);
  const ctaLabel = currentPage === 'approach' ? "Let's Talk" : "Let's Build";

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${!isDarkNav ? 'navbar-light-mode' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <div className="navbar-brand-group">
            <a 
              href="#home" 
              className="navbar-brand" 
              onClick={(e) => { e.preventDefault(); handleNav('home'); }}
            >
              <span className="text-light">REDI</span><span className="text-black">TUS</span>
            </a>
          </div>

          <nav id="primary-navigation" className={`navbar-links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Main Navigation">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
              onClick={() => handleNav('home')}
            >
              Home
            </button>
            <button 
              className="nav-link" 
              onClick={() => handleNav('home', 'capabilities')}
            >
              What We Build
            </button>
            <button 
              className={`nav-link ${currentPage === 'approach' ? 'active' : ''}`} 
              onClick={() => handleNav('approach')}
            >
              Approach
            </button>
            <button 
              className={`nav-link ${currentPage === 'industries' ? 'active' : ''}`} 
              onClick={() => handleNav('industries')}
            >
              Industries
            </button>
          </nav>

          <div className="navbar-actions">
            <button 
              className={`pill-btn ${isDarkNav ? 'pill-btn-outline' : 'pill-btn-dark-outline'}`}
              onClick={() => handleNav('industries', 'contact')}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="btn-arrow" size={14} />
            </button>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen} aria-controls="primary-navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
