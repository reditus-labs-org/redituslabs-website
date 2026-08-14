"use client";

import React from "react";
import Link from "next/link";

interface ReditusLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ReditusIcon({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 32 : size === "md" ? 40 : 48;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="logoPetrolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#087F8C" />
          <stop offset="100%" stopColor="#066670" />
        </linearGradient>
        <linearGradient id="logoSeafoamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A8E6CF" />
          <stop offset="100%" stopColor="#76C7AA" />
        </linearGradient>
      </defs>

      {/* Dark Architectural Base Container */}
      <rect width="100" height="100" rx="4" fill="#0B1114" stroke="#087F8C" strokeWidth="2" />
      
      {/* Background Dotted Matrix */}
      <circle cx="20" cy="20" r="1.5" fill="#242C30" />
      <circle cx="50" cy="20" r="1.5" fill="#242C30" />
      <circle cx="80" cy="20" r="1.5" fill="#242C30" />
      <circle cx="20" cy="50" r="1.5" fill="#242C30" />
      <circle cx="80" cy="50" r="1.5" fill="#242C30" />
      <circle cx="20" cy="80" r="1.5" fill="#242C30" />
      <circle cx="50" cy="80" r="1.5" fill="#242C30" />
      <circle cx="80" cy="80" r="1.5" fill="#242C30" />

      {/* Architectural Isometric "R" Vector Geometry */}
      {/* Left Stem - Front Face */}
      <polygon points="25,18 42,26 42,82 25,74" fill="url(#logoPetrolGrad)" stroke="#087F8C" strokeWidth="1" />
      {/* Left Stem - Side Face */}
      <polygon points="42,26 48,22 48,78 42,82" fill="#A8E6CF" fillOpacity="0.4" stroke="#087F8C" strokeWidth="1" />

      {/* Top Loop - Outer Arc Block */}
      <polygon points="42,26 72,40 72,52 42,38" fill="url(#logoSeafoamGrad)" stroke="#087F8C" strokeWidth="1" />
      {/* Top Loop - Side Face */}
      <polygon points="72,40 78,35 78,47 72,52" fill="#087F8C" stroke="#087F8C" strokeWidth="1" />

      {/* Middle Bar */}
      <polygon points="42,50 68,52 62,57 42,55" fill="#B99A5B" stroke="#B99A5B" strokeWidth="1" />

      {/* Diagonal Leg - Isometric Front */}
      <polygon points="42,55 74,80 62,86 35,60" fill="url(#logoPetrolGrad)" stroke="#087F8C" strokeWidth="1" />
      {/* Diagonal Leg - Side Face */}
      <polygon points="74,80 80,74 68,80 62,86" fill="#A8E6CF" stroke="#087F8C" strokeWidth="1" />

      {/* Corner Blueprint Crosshair Marks */}
      <line x1="6" y1="12" x2="16" y2="12" stroke="#087F8C" strokeWidth="1.5" />
      <line x1="12" y1="6" x2="12" y2="16" stroke="#087F8C" strokeWidth="1.5" />

      <line x1="84" y1="88" x2="94" y2="88" stroke="#A8E6CF" strokeWidth="1.5" />
      <line x1="88" y1="84" x2="88" y2="94" stroke="#A8E6CF" strokeWidth="1.5" />
    </svg>
  );
}

export function ReditusLogo({ className = "", showText = true, size = "md" }: ReditusLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-hidden ${className}`}>
      <ReditusIcon size={size} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-xl tracking-wider text-deep-ink group-hover:text-petrol transition-colors flex items-center gap-1.5">
            REDITUS
            <span className="w-1.5 h-1.5 bg-petrol rounded-full animate-pulse"></span>
          </span>
          <span className="font-mono text-[9px] text-graphite-muted tracking-widest uppercase pt-0.5">
            ENGINEERING STUDIO
          </span>
        </div>
      )}
    </Link>
  );
}
