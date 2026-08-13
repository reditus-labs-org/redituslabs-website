"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, Terminal, CheckCircle2 } from "lucide-react";
import { IsometricHeroLogo } from "./IsometricHeroLogo";

interface HeroProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-bone overflow-hidden border-b border-graphite/15">
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-blueprint-lines pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Technical Eyebrow, Main Headline, Paragraph, CTAs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Technical Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-petrol bg-petrol/10 border border-petrol/30 px-3 py-1.5 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-petrol animate-ping"></span>
              <span>&gt; POSSIBILITIES.DETECTED</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep-ink leading-[1.1] tracking-tight">
                We build. <br />
                We reimagine. <br />
                We <span className="text-petrol relative inline-block">
                  realize.
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-seafoam-dark" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 10 Q 50 0, 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="font-sans text-base sm:text-lg text-graphite-muted max-w-xl leading-relaxed">
              From idea to impact. From chaos to clarity. We build digital products, AI systems and pipelines that drive real-world results.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onOpenInquiry("build")}
                className="group bg-petrol text-bone hover:bg-petrol-hover px-7 py-4 font-display text-sm font-bold tracking-wider flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg active:translate-y-0.5 border border-petrol cursor-pointer"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#work"
                className="group bg-transparent text-graphite hover:text-deep-ink border border-graphite/30 hover:border-graphite px-6 py-4 font-display text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 hover:bg-bone-card"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Hero Decorative ASCII & Terminal Strip */}
            <div className="pt-4 border-t border-graphite/15 flex flex-wrap items-center gap-6 text-xs font-mono text-graphite-muted">
              <div className="flex items-center gap-2">
                <span className="text-petrol font-bold">&gt;_ INIT_SYSTEM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-seafoam-dark font-bold">[████████░░]</span>
                <span className="text-deep-ink font-bold">82%</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-graphite-muted">
                <span>:: POSSIBLE</span>
                <span>:: PROCESS</span>
                <span className="text-petrol font-semibold">:: REALIZED</span>
              </div>
            </div>

          </div>

          {/* Right Column: Isometric Architectural R Symbol */}
          <div className="lg:col-span-5 relative">
            <IsometricHeroLogo />
          </div>

        </div>
      </div>
    </section>
  );
}
