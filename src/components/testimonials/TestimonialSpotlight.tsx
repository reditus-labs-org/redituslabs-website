"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Quote, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "daniel",
    name: "DANIEL BRIGGS",
    role: "Senior Product Designer",
    company: "Finova Digital",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Working with Reditus helped us improve our product experience tremendously and deliver bulletproof results to our users ahead of schedule.",
  },
  {
    id: "sarah",
    name: "SARAH CHEN",
    role: "VP of Engineering",
    company: "Apex AI Labs",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    quote: "They took our rough AI prototype and completely re-engineered it into a clean, scalable production application. Absolute lifesavers.",
  },
  {
    id: "marcus",
    name: "MARCUS VANCE",
    role: "Founder & CEO",
    company: "Lumen Tech",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "The speed of execution and attention to visual detail sets Reditus apart from traditional agencies. Highly recommended.",
  },
];

export function TestimonialSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  const activeTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    animateQuote(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  const handlePrev = () => {
    animateQuote(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const animateQuote = (callback: () => void) => {
    if (!quoteRef.current) {
      callback();
      return;
    }

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        callback();
        gsap.to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <section id="reviews" className="py-28 bg-[#0B1114] text-[#F1EDE3] overflow-hidden border-t border-[#242C30] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Container: Profile Avatar & Pixel Matrix Decoration */}
        <div className="flex items-center justify-between mb-12">
          {/* Left: Avatar & Info */}
          <div className="flex items-center gap-4">
            <div className="relative p-1 rounded-full bg-gradient-to-r from-[#087F8C] via-[#A8E6CF] to-[#B99A5B] shadow-lg">
              <img
                src={activeTestimonial.avatarUrl}
                alt={activeTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0B1114]"
              />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                {activeTestimonial.name}
              </h4>
              <p className="font-mono text-xs text-[#A8E6CF]">
                {activeTestimonial.role}, {activeTestimonial.company}
              </p>
            </div>
          </div>

          {/* Right: Pixel Grid Matrix Graphic (Matching reference image) */}
          <div className="hidden sm:block">
            <div className="pixel-matrix-grid">
              <div className="pixel-matrix-dot active-seafoam" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-petrol" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-brass" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-seafoam" />

              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-seafoam" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-petrol" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-brass" />
              <div className="pixel-matrix-dot" />

              <div className="pixel-matrix-dot active-petrol" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-brass" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-seafoam" />
              <div className="pixel-matrix-dot" />
              <div className="pixel-matrix-dot active-petrol" />
            </div>
          </div>
        </div>

        {/* Big Quote Box with Cream / Warm Accent Banner */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-[#F1EDE3] text-[#0B1114] shadow-2xl overflow-hidden">
          <Quote className="w-16 h-16 text-[#087F8C] mb-6 opacity-80" />

          <div ref={quoteRef}>
            <blockquote className="text-2xl sm:text-4xl font-display font-semibold text-[#0B1114] leading-snug tracking-tight mb-8">
              &ldquo;{activeTestimonial.quote}&rdquo;
            </blockquote>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#0B1114] text-[#F1EDE3] hover:bg-[#087F8C] transition-colors cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#0B1114] text-[#F1EDE3] hover:bg-[#087F8C] transition-colors cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4 text-[#A8E6CF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
