"use client";

import React from "react";
import { TECHNOLOGIES } from "@/data/technologies";

export function TechStrip() {
  // Duplicate list to achieve a seamless, continuous infinite loop ticker
  const marqueeItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="bg-deep-ink text-bone py-7 border-b border-petrol/30 relative overflow-hidden">
      {/* Dark Grid Background */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-deep-ink to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-deep-ink to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
        
        {/* Fixed Label on the left */}
        <div className="flex items-center gap-3 shrink-0 bg-deep-ink z-30 pr-5 md:border-r border-graphite-border/60 py-1">
          <span className="w-2.5 h-2.5 bg-seafoam animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-seafoam uppercase whitespace-nowrap">
            ENGINEERING_STACK
          </span>
        </div>

        {/* Continuous Smooth Infinite Marquee */}
        <div className="w-full overflow-hidden relative">
          <div className="animate-marquee flex items-center gap-4 sm:gap-5">
            {marqueeItems.map((tech, idx) => (
              <div
                key={`${tech.id}-${idx}`}
                className="group flex items-center gap-3 bg-graphite/70 hover:bg-graphite border border-petrol/40 hover:border-seafoam px-5 py-2.5 rounded-xs transition-all duration-200 cursor-default shrink-0 shadow-md"
              >
                <span className="font-mono text-xs font-bold text-seafoam/70 group-hover:text-seafoam transition-colors">
                  0{(idx % TECHNOLOGIES.length) + 1}.
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-bone group-hover:text-seafoam tracking-wide transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
                <span className="font-mono text-[10px] font-semibold text-graphite-muted uppercase bg-deep-ink px-2 py-0.5 border border-graphite/50 whitespace-nowrap">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
