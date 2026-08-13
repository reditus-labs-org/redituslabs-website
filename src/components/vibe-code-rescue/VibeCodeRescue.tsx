"use client";

import React from "react";
import { ArrowRight, Wrench, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";

interface VibeCodeRescueProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function VibeCodeRescue({ onOpenInquiry }: VibeCodeRescueProps) {
  return (
    <section id="vibe-rescue" className="bg-deep-ink text-bone py-20 relative overflow-hidden border-y border-petrol/40">
      {/* Dark Technical Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Eyebrow, Headline, Description, CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-seafoam bg-seafoam/10 border border-seafoam/30 px-3 py-1.5 rounded-xs">
              <Wrench className="w-3.5 h-3.5 text-seafoam" />
              <span>OUR SPECIAL EDGE</span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-bone leading-tight">
              Vibe-code rescue &amp; <br />
              <span className="text-petrol">re-engineering</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 font-sans text-base text-bone/80 max-w-xl leading-relaxed">
              <p>
                Vibe-coded something that almost works?
              </p>
              <p className="text-seafoam/90 font-medium">
                We take it over the finish line, optimize the architecture and transform it into a product you can rely on.
              </p>
            </div>

            {/* Supported Vibe-Coding Tools Pills */}
            <div className="pt-2">
              <div className="font-mono text-xs text-graphite-muted mb-2">RESCUING PROJECTS BUILT WITH:</div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {["Cursor", "v0", "Bolt.new", "Lovable", "Replit", "Claude", "ChatGPT"].map((tool) => (
                  <span
                    key={tool}
                    className="bg-graphite/60 border border-graphite-border text-seafoam/90 px-2.5 py-1 rounded-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => onOpenInquiry("vibe-rescue")}
                className="group bg-petrol text-bone hover:bg-petrol-hover px-7 py-4 font-display text-sm font-bold tracking-wider flex items-center justify-center gap-3 transition-all duration-200 shadow-xl border border-petrol cursor-pointer"
              >
                <span>RESCUE MY PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: ASCII Terminal Build Status Graphic */}
          <div className="lg:col-span-5">
            <div className="bg-graphite/80 border border-petrol/60 p-6 rounded-xs shadow-2xl font-mono text-xs text-seafoam">
              
              {/* Terminal Window Top Header */}
              <div className="flex items-center justify-between border-b border-graphite-border pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-petrol animate-spin" />
                  <span className="font-bold text-bone">&gt; BUILD.STATUS</span>
                </div>
                <span className="text-[10px] text-brass border border-brass/40 px-2 py-0.5">
                  RE-ENGINEERING_PIPELINE
                </span>
              </div>

              {/* Status List */}
              <div className="space-y-3 font-mono leading-relaxed">
                <div className="flex items-center justify-between">
                  <span className="text-bone/80">prototype ....................</span>
                  <span className="text-seafoam font-bold">DONE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bone/80">architecture ...............</span>
                  <span className="text-brass font-bold">REWORK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bone/80">performance ...............</span>
                  <span className="text-petrol font-bold">OPTIMIZE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-bone/80">security ....................</span>
                  <span className="text-seafoam-dark font-bold">HARDEN</span>
                </div>
                <div className="flex items-center justify-between border-t border-graphite-border pt-3 mt-3">
                  <span className="text-bone font-bold">production .................</span>
                  <span className="text-seafoam font-extrabold underline decoration-petrol underline-offset-4">
                    READY
                  </span>
                </div>
              </div>

              {/* Terminal Bottom Indicator */}
              <div className="mt-6 pt-3 border-t border-graphite-border flex items-center justify-between text-[11px] text-graphite-muted">
                <span>VERIFIED BY REDITUS ENGINE</span>
                <span className="text-seafoam animate-pulse">● LIVE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
