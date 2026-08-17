"use client";

import React from "react";

/**
 * Aesthetic Asymmetrical Broken Double Border component for Service Cards.
 * Features double-line architectural borders with uneven line breaks & no diamond symbols.
 */
export function BrokenDoubleBorder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* Outer Border Frame with Asymmetrical Corner L-Brackets */}
      <div className="absolute inset-0 border border-graphite/25 group-hover:border-petrol/70 transition-colors">
        {/* Top-Left Corner: Wide Horizontal L-Bracket */}
        <div className="absolute -top-px -left-px w-8 h-3 border-t-[2.5px] border-l-[2.5px] border-petrol" />
        {/* Top-Right Corner: Tall Vertical L-Bracket */}
        <div className="absolute -top-px -right-px w-3 h-9 border-t-[2.5px] border-r-[2.5px] border-petrol" />
        {/* Bottom-Left Corner: Medium Vertical L-Bracket */}
        <div className="absolute -bottom-px -left-px w-4 h-8 border-b-[2.5px] border-l-[2.5px] border-petrol" />
        {/* Bottom-Right Corner: Extra Wide Horizontal L-Bracket */}
        <div className="absolute -bottom-px -right-px w-10 h-3 border-b-[2.5px] border-r-[2.5px] border-petrol" />
      </div>

      {/* Inner Parallel Line Frame (6px inset) with Asymmetrical Broken Dashes */}
      <div className="absolute inset-[6px]">

        {/* Top Edge: Uneven break gap at 64% */}
        <div className="absolute top-0 left-0 w-[58%] border-t border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        <div className="absolute top-0 right-0 w-[28%] border-t border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        {/* Clean linear tick mark at top break gap */}
        <div className="absolute -top-[1.5px] left-[61%] w-2.5 h-[3px] bg-petrol" />

        {/* Bottom Edge: Uneven break gap at 30% */}
        <div className="absolute bottom-0 left-0 w-[24%] border-b border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        <div className="absolute bottom-0 right-0 w-[64%] border-b border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        {/* Clean linear tick mark at bottom break gap */}
        <div className="absolute -bottom-[1.5px] left-[27%] w-2.5 h-[3px] bg-petrol" />

        {/* Left Vertical Edge: High break gap at 18% */}
        <div className="absolute top-0 left-0 h-[14%] border-l border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        <div className="absolute bottom-0 left-0 h-[74%] border-l border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        {/* Left break tick mark */}
        <div className="absolute top-[16%] -left-[1.5px] w-[3px] h-2.5 bg-petrol" />

        {/* Right Vertical Edge: Low break gap at 72% */}
        <div className="absolute top-0 right-0 h-[68%] border-r border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        <div className="absolute bottom-0 right-0 h-[18%] border-r border-dashed border-graphite/40 group-hover:border-petrol/60 transition-colors" />
        {/* Right break tick mark */}
        <div className="absolute top-[70%] -right-[1.5px] w-[3px] h-2.5 bg-petrol" />

      </div>
    </div>
  );
}

/* ── Decorative Line Elements ── */
export function DecorativePill({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="190" height="40" rx="20" stroke={color} strokeWidth="2" />
      <path d="M 175 3 L 177 8 L 183 10 L 177 12 L 175 17 L 173 12 L 167 10 L 173 8 Z" fill={color} />
      <path d="M 25 43 L 27 48 L 33 50 L 27 52 L 25 57 L 23 52 L 17 50 L 23 48 Z" fill={color} />
    </svg>
  );
}

