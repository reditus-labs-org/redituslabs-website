import { responsiveImage } from '../responsiveImage';
import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './Industries.css';
import { industryItems } from '../../pages/content';



export const Industries: React.FC = () => {
  const [start, setStart] = useState(0);
  const industries = Array.from({length: 5}, (_, i) => industryItems[(start + i) % industryItems.length]);
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, { stagger: 0.08, y: 20 });

  return (
    <section id="industries" className="industries-section">
      <div className="container">
        <div className="industries-header">
          <div>
            <h1 className="industries-title">Industries</h1>
            <div className="industries-subline">DIFFERENT WORLDS. SAME POSSIBILITIES.</div>
          </div>

          <a href="#all-industries" className="industries-view-all">
            <span>View all industries</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="industries-carousel-wrapper">
          <button className="carousel-nav-btn prev-btn" aria-label="Previous industries" onClick={() => setStart(s => (s - 1 + industryItems.length) % industryItems.length)}>
            <ArrowLeft size={16} />
          </button>

          <div ref={containerRef} className="industries-grid">
            {industries.map((ind, idx) => (
              <a key={ind.slug} href={`#industry/${ind.slug}`} className="industry-vertical-card">
                <img src={ind.image} {...responsiveImage(ind.image, "(max-width: 768px) 42vw, (max-width: 1440px) 20vw, 260px")} alt={ind.title} className="industry-card-img" />
                <div className="industry-card-gradient" />
                <div className="industry-card-label">
                  {ind.title.replace(' & ', '\n& ').split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <button className="carousel-nav-btn next-btn" aria-label="Next industries" onClick={() => setStart(s => (s + 1) % industryItems.length)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
