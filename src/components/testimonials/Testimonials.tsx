"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-bone relative border-b border-graphite/15 overflow-hidden">
      
      {/* Background Subtle Isometric Wireframe Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] text-petrol stroke-current fill-none stroke-1">
          <polygon points="250,50 450,150 450,350 250,450 50,350 50,150" />
          <line x1="250" y1="50" x2="250" y2="450" />
          <line x1="450" y1="150" x2="50" y2="350" />
          <line x1="50" y1="150" x2="450" y2="350" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-petrol inline-block"></span>
              <span className="font-mono text-xs font-bold tracking-widest text-petrol uppercase">
                WHAT CLIENTS SAY
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep-ink leading-tight">
              Results they love. <br />
              Partnerships we value.
            </h2>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 bg-bone-card border border-graphite/20 hover:border-petrol text-graphite hover:text-petrol transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-bone-card border border-graphite/20 hover:border-petrol text-graphite hover:text-petrol transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid & Active Carousel Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`bg-bone-card border p-8 transition-all duration-300 shadow-xs flex flex-col justify-between cursor-pointer relative ${
                  isActive
                    ? "border-petrol shadow-xl -translate-y-1 bg-white"
                    : "border-graphite/20 hover:border-petrol/60 opacity-80"
                }`}
              >
                <div>
                  {/* Top Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-petrol opacity-80" />
                    {item.isPlaceholder && (
                      <span className="font-mono text-[9px] text-graphite-muted bg-bone px-2 py-0.5 border border-graphite/10">
                        DEVELOPMENT PLACEHOLDER
                      </span>
                    )}
                  </div>

                  {/* Quote Body */}
                  <p className="font-sans text-sm text-graphite leading-relaxed mb-8 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Metadata */}
                <div className="pt-4 border-t border-graphite/15 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-base text-deep-ink">
                      {item.author}
                    </div>
                    <div className="font-sans text-xs text-graphite-muted">
                      {item.role}, <span className="text-petrol font-semibold">{item.company}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-brass bg-brass/10 px-2 py-0.5 border border-brass/30">
                    {item.industry}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all duration-200 cursor-pointer ${
                idx === activeIndex ? "w-8 bg-petrol" : "w-2 bg-graphite/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
