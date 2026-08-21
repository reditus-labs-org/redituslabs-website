"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Cpu, Layers, Zap } from "lucide-react";
import { IsometricHeroLogo } from "./IsometricHeroLogo";

interface HeroProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  const [activePhase, setActivePhase] = useState<"build" | "reimagine" | "realize">("realize");

  const phases = [
    {
      id: "build" as const,
      label: "01. BUILD",
      icon: Layers,
      title: "We build.",
      tagline: "High-performance digital products engineered from ground zero.",
      metric: "ZERO-LATENCY",
    },
    {
      id: "reimagine" as const,
      label: "02. REIMAGINE",
      icon: Cpu,
      title: "We reimagine.",
      tagline: "Architectural overhauls that transform legacy chaos into streamlined pipelines.",
      metric: "SCALABLE AI",
    },
    {
      id: "realize" as const,
      label: "03. REALIZE",
      icon: Zap,
      title: "We realize.",
      tagline: "From idea to impact. From chaos to clarity — production-ready execution.",
      metric: "100% VERIFIED",
    },
  ];

  const current = phases.find((p) => p.id === activePhase) || phases[2];

  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-bone overflow-hidden border-b border-graphite/15">
      {/* Background Architectural Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-blueprint-lines pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Ultra-Unique Blueprint Terminal & Interactive Manifest */}
          <div className="lg:col-span-7 space-y-7">

            {/* Technical Eyebrow Terminal Tag */}
            <div className="inline-flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-petrol bg-bone-card border border-petrol/30 px-4 py-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-petrol animate-ping shrink-0" />
              <span className="text-graphite-muted">SYS::DETECTED //</span>
              <span className="text-petrol uppercase">&gt; POSSIBILITIES.DETECTED</span>
            </div>

            {/* Unique Headline with Interactive Phase Selection */}
            <div className="space-y-4">
              {/* Interactive Phase Selectors */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                {phases.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePhase(p.id)}
                    className={`px-3 py-1.5 border transition-all duration-200 cursor-pointer flex items-center gap-2 ${activePhase === p.id
                        ? "bg-graphite text-seafoam border-petrol shadow-sm"
                        : "bg-bone-card text-graphite-muted border-graphite/20 hover:border-petrol/50"
                      }`}
                  >
                    <span>{p.label}</span>
                    {activePhase === p.id && <span className="w-1.5 h-1.5 bg-seafoam animate-pulse" />}
                  </button>
                ))}
              </div>

              {/* Main Dynamic Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep-ink leading-[1.1] tracking-tight">
                {activePhase === "build" && (
                  <span className="text-deep-ink">We build <span className="text-petrol">relentlessly.</span></span>
                )}
                {activePhase === "reimagine" && (
                  <span className="text-deep-ink">We reimagine <span className="text-petrol">everything.</span></span>
                )}
                {activePhase === "realize" && (
                  <span className="text-deep-ink">
                    We build. We reimagine. <br />
                    <span className="text-petrol relative inline-block">
                      We realize.
                      <svg className="absolute -bottom-2 left-0 w-full h-2 text-seafoam-dark" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0 10 Q 50 0, 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                    </span>
                  </span>
                )}
              </h1>
            </div>

            {/* Unique Blueprint Briefing Card Frame */}
            <div className="bg-bone-card border border-graphite/20 p-5 sm:p-6 relative shadow-sm rounded-xs">
              {/* Top Corner Blueprint Marks */}
              <span className="absolute -top-1 -left-1 text-[10px] font-mono text-petrol font-bold">+</span>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono text-petrol font-bold">+</span>
              <span className="absolute -bottom-1 -left-1 text-[10px] font-mono text-petrol font-bold">+</span>
              <span className="absolute -bottom-1 -right-1 text-[10px] font-mono text-petrol font-bold">+</span>

              <div className="flex items-center justify-between border-b border-graphite/15 pb-3 mb-3 font-mono text-xs">
                <span className="text-petrol font-bold uppercase flex items-center gap-2">
                  <current.icon className="w-4 h-4 text-petrol" />
                  LOGIC_MANIFEST // {current.metric}
                </span>
                <span className="text-graphite-muted text-[11px]">[ IDEA &rarr; IMPACT ]</span>
              </div>

              <p className="font-sans text-base sm:text-lg text-deep-ink font-medium leading-relaxed mb-3">
                {current.tagline}
              </p>

              <div className="pt-2 border-t border-graphite/10 flex items-center justify-between text-xs font-mono text-graphite-muted">
                <span>// FROM CHAOS TO CLARITY</span>
                <span className="text-petrol font-bold">&gt;_ READY_TO_SCALE</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
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

            {/* Hero Technical Telemetry Strip */}
            <div className="pt-4 border-t border-graphite/15 flex flex-wrap items-center gap-6 text-xs font-mono text-graphite-muted">
              <div className="flex items-center gap-2">
                <span className="text-petrol font-bold">&gt;_ ENGINE:</span>
                <span className="text-deep-ink font-semibold uppercase">ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-graphite-muted">LATENCY:</span>
                <span className="text-petrol font-bold">&lt; 18ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-graphite-muted">EXECUTION:</span>
                <span className="text-petrol font-bold">100% PRODUCTION</span>
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
