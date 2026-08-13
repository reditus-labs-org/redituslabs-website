"use client";

import React from "react";

export function IsometricHeroLogo() {
  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background Dotted Coordinate Grid */}
      <div className="absolute inset-0 bg-tech-grid-light opacity-60 rounded-lg"></div>

      {/* Outer Technical Blueprint Box */}
      <div className="absolute inset-2 border border-graphite/20 pointer-events-none flex flex-col justify-between p-3">
        <div className="flex justify-between font-mono text-[9px] text-graphite-muted">
          <span>COORDINATES: [37.7749, -122.4194]</span>
          <span>SCALE: 1:1.0</span>
        </div>
        <div className="flex justify-between font-mono text-[9px] text-graphite-muted">
          <span>DWG_NO: REDITUS-R-ISO-2026</span>
          <span className="text-petrol">STATUS: ACTIVE</span>
        </div>
      </div>

      {/* Corner Crosshairs */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-petrol"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-petrol"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-petrol"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-petrol"></div>

      {/* Architectural Line-Art Isometric "R" SVG */}
      <svg
        viewBox="0 0 500 500"
        className="w-4/5 h-4/5 drop-shadow-lg relative z-10 transition-transform duration-500 hover:scale-[1.02]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="petrolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#087F8C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#066670" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="seafoamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8E6CF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#76C7AA" stopOpacity="0.1" />
          </linearGradient>

          <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#242C30" fillOpacity="0.2" />
          </pattern>
        </defs>

        {/* Isometric Grid Background Construction Lines */}
        <g stroke="#242C30" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3">
          <line x1="50" y1="120" x2="450" y2="350" />
          <line x1="450" y1="120" x2="50" y2="350" />
          <line x1="250" y1="50" x2="250" y2="450" />
          <circle cx="250" cy="250" r="180" />
          <circle cx="250" cy="250" r="100" />
        </g>

        {/* Isometric "R" Main Architectural Solid & Line Structures */}
        {/* Left Vertical Pillar Back Shadow/Side Face */}
        <path
          d="M 140 120 L 190 90 L 190 390 L 140 420 Z"
          fill="#242C30"
          fillOpacity="0.08"
          stroke="#242C30"
          strokeWidth="1.5"
        />

        {/* Left Vertical Pillar Main Front Face */}
        <path
          d="M 190 90 L 240 120 L 240 420 L 190 390 Z"
          fill="url(#petrolGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Top Horizontal Loop Outer Isometric Cube Face */}
        <path
          d="M 240 120 L 350 180 L 350 250 L 240 190 Z"
          fill="url(#seafoamGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Top Loop Curve / Inner Block */}
        <path
          d="M 350 180 L 400 150 L 400 220 L 350 250 Z"
          fill="#087F8C"
          fillOpacity="0.2"
          stroke="#087F8C"
          strokeWidth="1.5"
        />

        {/* Middle Connector Joint */}
        <path
          d="M 190 240 L 350 250 L 300 280 L 190 270 Z"
          fill="#B99A5B"
          fillOpacity="0.3"
          stroke="#B99A5B"
          strokeWidth="1.5"
        />

        {/* Diagonal Leg Extension Isometric Front */}
        <path
          d="M 240 270 L 360 410 L 310 440 L 190 300 Z"
          fill="url(#petrolGrad)"
          stroke="#087F8C"
          strokeWidth="2"
        />

        {/* Diagonal Leg Side Face */}
        <path
          d="M 360 410 L 400 380 L 350 410 L 310 440 Z"
          fill="#A8E6CF"
          fillOpacity="0.5"
          stroke="#087F8C"
          strokeWidth="1.5"
        />

        {/* Technical Node Dots & Dimension Lines */}
        <g stroke="#087F8C" strokeWidth="1">
          {/* Top Node */}
          <circle cx="190" cy="90" r="5" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          <circle cx="400" cy="150" r="5" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          <circle cx="360" cy="410" r="5" fill="#A8E6CF" stroke="#087F8C" strokeWidth="2" />
          <circle cx="190" cy="390" r="5" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />

          {/* Dimension arrows */}
          <line x1="120" y1="120" x2="120" y2="420" stroke="#242C30" strokeOpacity="0.4" strokeDasharray="2 2" />
          <text x="95" y="275" fill="#242C30" fontSize="11" fontFamily="var(--font-jetbrains-mono)">H: 300px</text>
        </g>
      </svg>

      {/* Floating Monospace ASCII Indicators around R */}
      <div className="absolute top-6 right-6 font-mono text-[10px] bg-deep-ink/90 text-seafoam border border-graphite/40 px-2 py-1 shadow-md">
        ISOMETRIC_R :: OK
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-graphite-muted bg-bone/90 border border-graphite/20 px-2 py-1">
        SYS.GEOMETRY // 3D_VECTOR
      </div>
    </div>
  );
}
