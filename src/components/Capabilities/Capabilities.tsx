import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../../animation/hooks';
import './Capabilities.css';

interface CapabilityData {
  number: string;
  titleLines: string[];
  descLines: string[];
  imageSrc: string;
  alt: string;
}

const capabilities: CapabilityData[] = [
  {
    number: '01',
    titleLines: ['Product', 'Engineering'],
    descLines: ['Web, mobile,', 'SaaS and more.'],
    imageSrc: '/assets/images/capabilities/cap_01_product.png',
    alt: 'Product Engineering - 3D glass isometric cube',
  },
  {
    number: '02',
    titleLines: ['AI', 'Engineering'],
    descLines: ['Agents, RAG,', 'multimodal systems.'],
    imageSrc: '/assets/images/capabilities/cap_02_ai.png',
    alt: 'AI Engineering - 3D translucent teal glass sphere',
  },
  {
    number: '03',
    titleLines: ['System & Cloud', 'Engineering'],
    descLines: ['APIs, data,', 'infrastructure.'],
    imageSrc: '/assets/images/capabilities/cap_03_system.png',
    alt: 'System & Cloud Engineering - 3D floating glass plates',
  },
  {
    number: '04',
    titleLines: ['Automation', '& Integration'],
    descLines: ['Workflows,', 'business automation.'],
    imageSrc: '/assets/images/capabilities/cap_04_automation.png',
    alt: 'Automation & Integration - 3D overlapping glass lenses',
  },
  {
    number: '05',
    titleLines: ['Re-engineering', '& Modernization'],
    descLines: ['Refactor, optimize,', 'migrate, rescue.'],
    imageSrc: '/assets/images/capabilities/cap_05_reengineering.png',
    alt: 'Re-engineering & Modernization - 3D faceted crystal block',
  },
];

export const Capabilities: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef, { stagger: 0.08, y: 15 });

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="container">
        {/* Header Area */}
        <div className="capabilities-header">
          <div className="capabilities-title-area">
            <h2 className="capabilities-heading">
              <span className="text-light">What we </span>
              <span className="text-black">build.</span>
            </h2>
            <p className="capabilities-subtitle">
              <span className="text-medium">End-to-end product engineering</span>{' '}
              <span className="text-light">across web, mobile, AI, cloud and beyond.</span>
            </p>
          </div>

          <a href="#services" className="capabilities-link">
            <span className="capabilities-link-text">Explore all capabilities</span>
            <ArrowRight size={17} className="capabilities-link-arrow" />
          </a>
        </div>

        {/* 5-Column Grid */}
        <div ref={containerRef} className="capabilities-grid-wrapper">
          <div className="capabilities-grid">
            {capabilities.map((item, index) => (
              <a href={`#services/${item.number}`} key={item.number} className="capability-col">
                {/* Architectural divider with slanted top notch */}
                <div className="col-divider col-divider-left" aria-hidden="true">
                  <svg
                    className="divider-svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 8 500"
                  >
                    <path
                      d="M7 0 L1 14 V500"
                      stroke="rgba(18, 20, 22, 0.16)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="capability-content">
                  {/* Column Number */}
                  <div className="capability-num-row">
                    <span className="capability-number">{item.number}</span>
                  </div>

                  {/* 3D Glass Artwork */}
                  <div className="capability-visual-wrap">
                    <img
                      src={item.imageSrc}
                      alt={item.alt}
                      className="capability-glass-img"
                      loading="eager"
                    />
                  </div>

                  {/* Text Description */}
                  <div className="capability-info">
                    <h3 className="capability-title">
                      {item.titleLines.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < item.titleLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                    <p className="capability-desc">
                      {item.descLines.map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < item.descLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Final right boundary divider for column 05 */}
                {index === capabilities.length - 1 && (
                  <div className="col-divider col-divider-right" aria-hidden="true">
                    <svg
                      className="divider-svg"
                      preserveAspectRatio="none"
                      viewBox="0 0 8 500"
                    >
                      <path
                        d="M7 0 L1 14 V500"
                        stroke="rgba(18, 20, 22, 0.16)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
