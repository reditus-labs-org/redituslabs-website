"use client";

import React from "react";

export function IsometricHeroLogo() {
  const hatchId = React.useId().replace(/:/g, "");
  const hatch = `url(#${hatchId})`;

  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Outer Technical Blueprint Canvas Container */}
      <div className="absolute inset-0 bg-tech-grid-light opacity-80 rounded-sm border border-graphite/20 shadow-xs"></div>

      {/* Blueprint Outer Frame Lines & Dimensions */}
      <div className="absolute inset-3 border border-graphite/30 pointer-events-none flex flex-col justify-between p-4">
        <div className="flex justify-between font-mono text-[10px] text-graphite-muted tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-petrol inline-block"></span>
            SYS.DWG // REDITUS_ISOMETRIC_R_v2.4
          </span>
          <span>SCALE 1:1.0 · AXIS 30°/150°</span>
        </div>

        <div className="flex justify-between items-end font-mono text-[10px] text-graphite-muted">
          <div>
            <div>GRID: 24x24 UNIT_MESH</div>
            <div>STATUS: VERIFIED_PROPRIETARY</div>
          </div>
          <div className="text-right">
            <span className="text-petrol font-bold bg-petrol/10 border border-petrol/30 px-2 py-0.5">
              ISOMETRIC_SOLID
            </span>
          </div>
        </div>
      </div>

      {/* Blueprint Corner Crosshairs */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-petrol"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-petrol"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-petrol"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-petrol"></div>

      {/* High-Precision Architectural SVG */}
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full p-6 drop-shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Impossible isometric R"
        className="h-full w-full"
      >
        <defs>
          {/* Custom Gradients */}
          <linearGradient id="heroPetrolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#087F8C" />
            <stop offset="100%" stopColor="#054E56" />
          </linearGradient>

          <linearGradient id="heroSeafoamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8E6CF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#76C7AA" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="heroBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B99A5B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A6E35" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 1. Isometric Grid Construction Lines */}
        <g stroke="#242C30" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4">
          <line x1="60" y1="150" x2="540" y2="450" />
          <line x1="540" y1="150" x2="60" y2="450" />
          <line x1="300" y1="40" x2="300" y2="560" />
          <circle cx="300" cy="300" r="240" />
          <circle cx="300" cy="300" r="140" fill="none" stroke="#087F8C" strokeOpacity="0.2" />
        </g>

        {/* 2. Architectural 3D Base Shadow Floor */}
        <polygon
          points="150,480 300,560 450,480 300,400"
          fill="#242C30"
          fillOpacity="0.08"
          stroke="#242C30"
          strokeWidth="1"
        />

        {/* 3. ISOMETRIC "R" MAIN SOLID FACES */}
        
        {/* Left Vertical Pillar - Back Shadow Face */}
        <polygon
          points="150,140 210,105 210,470 150,505"
          fill="#242C30"
          fillOpacity="0.15"
          stroke="#242C30"
          strokeWidth="1.5"
        />

        {/* Left Vertical Pillar - Main Front Face */}
        <polygon
          points="210,105 270,140 270,505 210,470"
          fill="url(#heroPetrolGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Left Pillar Top Cap */}
        <polygon
          points="150,140 210,105 270,140 210,175"
          fill="#A8E6CF"
          fillOpacity="0.6"
          stroke="#087F8C"
          strokeWidth="1.5"
        />

        {/* Top Loop Outer Block - Main Front Face */}
        <polygon
          points="270,140 430,225 430,310 270,225"
          fill="url(#heroSeafoamGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Top Loop Outer Block - Right Side Face */}
        <polygon
          points="430,225 490,190 490,275 430,310"
          fill="url(#heroPetrolGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Top Loop Top Cap */}
        <polygon
          points="270,140 430,225 490,190 330,105"
          fill="#A8E6CF"
          fillOpacity="0.3"
          stroke="#087F8C"
          strokeWidth="1.5"
        />

        {/* Middle Joint Connector Block */}
        <polygon
          points="270,285 410,300 350,335 210,320"
          fill="url(#heroBrassGrad)"
          stroke="#B99A5B"
          strokeWidth="2"
        />

        {/* Diagonal Leg - Main Isometric Front Face */}
        <polygon
          points="270,320 440,490 380,525 210,355"
          fill="url(#heroPetrolGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Diagonal Leg - Right Side Face */}
        <polygon
          points="440,490 490,455 430,490 380,525"
          fill="#A8E6CF"
          fillOpacity="0.8"
          stroke="#087F8C"
          strokeWidth="1.5"
        />

        {/* 4. TECHNICAL ANNOTATIONS & DIMENSION MARKS */}
        <g stroke="#087F8C" strokeWidth="1">
          {/* Vertices & Node Dots */}
          <circle cx="210" cy="105" r="6" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          <circle cx="490" cy="190" r="6" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          <circle cx="440" cy="490" r="6" fill="#A8E6CF" stroke="#087F8C" strokeWidth="2" />
          <circle cx="270" cy="505" r="6" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          <circle cx="350" cy="335" r="5" fill="#B99A5B" stroke="#B99A5B" strokeWidth="2" />

          {/* Dimension Guidelines & Labels */}
          <line x1="120" y1="140" x2="120" y2="505" stroke="#242C30" strokeOpacity="0.4" strokeDasharray="3 3" />
          <line x1="110" y1="140" x2="130" y2="140" stroke="#242C30" />
          <line x1="110" y1="505" x2="130" y2="505" stroke="#242C30" />
          <text x="75" y="325" fill="#242C30" fontSize="12" fontFamily="var(--font-jetbrains-mono)">H: 365px</text>

          <line x1="270" y1="540" x2="440" y2="540" stroke="#087F8C" strokeDasharray="3 3" />
          <text x="325" y="558" fill="#087F8C" fontSize="11" fontFamily="var(--font-jetbrains-mono)">W: 170px</text>
        </g>
      </svg>

      {/* Floating Monospace ASCII Indicators */}
      <div className="absolute top-8 right-8 font-mono text-[10px] bg-deep-ink text-seafoam border border-petrol/60 px-3 py-1.5 shadow-xl">
        ISOMETRIC_R :: RENDER_OK
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-graphite-muted bg-bone-card border border-graphite/20 px-3 py-1.5 shadow-xs">
        STRUCT: RE-ENGINEERED_VECT
      </div>

    </div>
  );
}
