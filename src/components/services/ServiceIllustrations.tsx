"use client";

import React from "react";

export function WebDigitalIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-32 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric Browser & Architectural Blocks */}
      <g stroke="#087F8C" strokeWidth="1.5">
        {/* Main Base Grid */}
        <polygon points="100,20 170,55 100,90 30,55" fill="#FAF8F3" stroke="#242C30" strokeWidth="1" />
        
        {/* Raised Web Window Block 1 */}
        <polygon points="100,30 150,55 100,80 50,55" fill="#087F8C" fillOpacity="0.15" />
        <polygon points="150,55 150,85 100,110 100,80" fill="#087F8C" fillOpacity="0.4" />
        <polygon points="100,80 100,110 50,85 50,55" fill="#A8E6CF" fillOpacity="0.6" />

        {/* Secondary Architectural Cube */}
        <polygon points="130,70 170,90 130,110 90,90" fill="#B99A5B" fillOpacity="0.3" stroke="#B99A5B" />
        <polygon points="170,90 170,120 130,140 130,110" fill="#B99A5B" fillOpacity="0.6" stroke="#B99A5B" />

        {/* Monospace Code Indicator lines */}
        <line x1="60" y1="65" x2="85" y2="78" stroke="#087F8C" strokeWidth="2" />
        <line x1="60" y1="72" x2="75" y2="80" stroke="#087F8C" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function SoftwareAppsIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-32 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stacked Architecture Software Layered Blocks */}
      <g stroke="#087F8C" strokeWidth="1.5">
        {/* Layer 1 - Infrastructure */}
        <polygon points="100,80 160,110 100,140 40,110" fill="#242C30" fillOpacity="0.1" stroke="#242C30" />
        <polygon points="160,110 160,120 100,150 100,140" fill="#242C30" fillOpacity="0.2" stroke="#242C30" />
        
        {/* Layer 2 - API Layer */}
        <polygon points="100,50 160,80 100,110 40,80" fill="#087F8C" fillOpacity="0.2" />
        <polygon points="160,80 160,90 100,120 100,110" fill="#087F8C" fillOpacity="0.5" />

        {/* Layer 3 - Application Layer */}
        <polygon points="100,20 160,50 100,80 40,50" fill="#A8E6CF" fillOpacity="0.7" />
        <polygon points="160,50 160,60 100,90 100,80" fill="#76C7AA" fillOpacity="0.9" />

        {/* Vertical Data Flow Pillar */}
        <line x1="100" y1="20" x2="100" y2="140" stroke="#087F8C" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="100" cy="50" r="3" fill="#F1EDE3" />
        <circle cx="100" cy="80" r="3" fill="#F1EDE3" />
        <circle cx="100" cy="110" r="3" fill="#F1EDE3" />
      </g>
    </svg>
  );
}

export function AIPipelinesIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-32 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Abstract AI Brain Network & Line Art */}
      <g stroke="#087F8C" strokeWidth="1.5">
        {/* Network Connection Lines */}
        <line x1="50" y1="80" x2="100" y2="30" stroke="#087F8C" />
        <line x1="50" y1="80" x2="100" y2="130" stroke="#087F8C" />
        <line x1="100" y1="30" x2="150" y2="80" stroke="#087F8C" />
        <line x1="100" y1="130" x2="150" y2="80" stroke="#087F8C" />
        <line x1="100" y1="30" x2="100" y2="130" stroke="#B99A5B" strokeDasharray="2 2" />

        {/* Central Intelligence Node */}
        <circle cx="100" cy="80" r="22" fill="#087F8C" fillOpacity="0.2" stroke="#087F8C" strokeWidth="2" />
        <circle cx="100" cy="80" r="10" fill="#A8E6CF" />

        {/* Satellite Nodes */}
        <circle cx="50" cy="80" r="8" fill="#F1EDE3" stroke="#242C30" strokeWidth="2" />
        <circle cx="100" cy="30" r="8" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
        <circle cx="150" cy="80" r="8" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
        <circle cx="100" cy="130" r="8" fill="#F1EDE3" stroke="#B99A5B" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function SaaSProductsIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-32 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Isometric Modular Product Blocks */}
      <g stroke="#087F8C" strokeWidth="1.5">
        {/* Base Block 1 */}
        <polygon points="60,60 100,80 60,100 20,80" fill="#087F8C" fillOpacity="0.3" />
        <polygon points="100,80 100,120 60,140 60,100" fill="#087F8C" fillOpacity="0.6" />
        
        {/* Base Block 2 */}
        <polygon points="140,60 180,80 140,100 100,80" fill="#A8E6CF" fillOpacity="0.4" />
        <polygon points="180,80 180,120 140,140 140,100" fill="#76C7AA" fillOpacity="0.8" />

        {/* Top Floating Core Block */}
        <polygon points="100,20 140,40 100,60 60,40" fill="#B99A5B" fillOpacity="0.4" stroke="#B99A5B" />
        <polygon points="140,40 140,70 100,90 100,60" fill="#B99A5B" fillOpacity="0.8" stroke="#B99A5B" />
        <polygon points="100,60 100,90 60,70 60,40" fill="#F1EDE3" stroke="#B99A5B" />
      </g>
    </svg>
  );
}
