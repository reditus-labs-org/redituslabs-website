import { responsiveImage } from '../responsiveImage';
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './Insights.css';
import { articleItems } from '../../pages/content';

const dates = ['AUG 12, 2024', 'JUL 28, 2024', 'JUL 10, 2024'];
const articles = articleItems;

export const Insights: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, { stagger: 0.1, y: 20 });

  return (
    <section id="insights" className="insights-section">
      <div className="container">
        <div className="insights-header">
          <div>
            <h2 className="insights-title">
              <span className="text-light">Latest </span>
              <span className="text-black">Insights.</span>
            </h2>
            <div className="insights-subline">
              <span className="text-regular">IDEAS. </span>
              <span className="text-medium">ENGINEERING. </span>
              <span className="text-bold">PERSPECTIVE.</span>
            </div>
          </div>

          <a href="#all-insights" className="insights-view-all">
            <span>View all</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div ref={containerRef} className="insights-grid">
          {articles.map((item, idx) => (
            <a key={item.slug} href={`#insight/${item.slug}`} className="insight-card">
              <div className="insight-thumb-box">
                <img src={item.image} {...responsiveImage(item.image, "(max-width: 380px) 160vw, (max-width: 1440px) 60vw, 780px")} alt={item.title} className="insight-thumb" />
              </div>

              <div className="insight-body">
                <h3 className="insight-card-title">{item.title}</h3>
                
                <div className="insight-meta">
                  <span className="insight-category">{item.category}</span>
                  <span className="insight-date">{dates[idx]}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
