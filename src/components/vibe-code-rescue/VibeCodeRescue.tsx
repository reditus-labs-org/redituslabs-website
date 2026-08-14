"use client";

import React, { useState } from "react";
import { ArrowRight, Wrench, RefreshCw, ShieldCheck, Zap, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";
import { AsciiAtom } from "@/components/ascii/AsciiSystem";
import { BrokenDoubleBorder } from "@/components/ascii/DecorativeLines";

interface VibeCodeRescueProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function VibeCodeRescue({ onOpenInquiry }: VibeCodeRescueProps) {
  const [activeTab, setActiveTab] = useState<"prototype" | "engineered">("engineered");

  return (
    <section id="vibe-rescue" className="bg-deep-ink text-bone py-24 relative overflow-hidden border-y border-petrol/40">
      {/* Dark Technical Grid Pattern & Subtle Hatch Gradient */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-petrol/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16 border-b border-petrol/30 pb-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-seafoam bg-seafoam/10 border border-seafoam/30 px-3.5 py-1.5 rounded-xs">
              <Wrench className="w-3.5 h-3.5 text-seafoam" />
              <span>OUR SPECIAL EDGE // RE-ENGINEERING</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-bone leading-tight tracking-tight uppercase">
              AI built 80% of your prototype. <br />
              <span className="font-mono text-seafoam border-b-2 border-seafoam pb-1 text-2xl sm:text-3xl lg:text-4xl tracking-normal inline-block mt-2">
                &gt; WE ENGINEER THE 20% THAT SCALES
              </span>
            </h2>

            <div className="font-mono text-xs sm:text-sm text-seafoam-muted/90 bg-graphite/50 border border-petrol/30 border-l-4 border-l-seafoam p-4 leading-relaxed rounded-xs shadow-inner">
              <span className="text-seafoam font-bold">&gt; BRIEFING:</span> Vibe-coding gets products off the ground fast — but taking them live demands architectural rigor, zero-latency pipelines, and enterprise security.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry("vibe-rescue")}
              className="group bg-petrol text-bone hover:bg-petrol-hover px-7 py-4 font-display text-xs sm:text-sm font-bold tracking-wider flex items-center gap-3 transition-all duration-200 shadow-xl border border-petrol cursor-pointer"
            >
              <span>RESCUE MY PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Diagnostic Terminal & ASCII Orbital Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Interactive Telemetry Terminal */}
          <div className="lg:col-span-7 space-y-6">

            {/* Terminal Switcher Header */}
            <div className="bg-graphite/90 border border-petrol/50 p-6 relative shadow-2xl rounded-xs">

              {/* Corner Accents */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-seafoam" />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-seafoam" />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-seafoam" />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-seafoam" />

              {/* Mode Toggle Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-graphite-border pb-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-bone">
                  <Cpu className="w-4 h-4 text-seafoam animate-pulse" />
                  <span>SYSTEM_DIAGNOSTIC // ENGINE_MODE</span>
                </div>

                <div className="flex items-center gap-2 bg-deep-ink/80 p-1 border border-petrol/30 rounded-xs">
                  <button
                    onClick={() => setActiveTab("prototype")}
                    className={`px-3 py-1.5 font-mono text-[11px] font-bold transition-all cursor-pointer ${activeTab === "prototype"
                        ? "bg-brass/20 text-brass border border-brass/50"
                        : "text-bone/50 hover:text-bone"
                      }`}
                  >
                    01. PROTOTYPE (FRAGILE)
                  </button>
                  <button
                    onClick={() => setActiveTab("engineered")}
                    className={`px-3 py-1.5 font-mono text-[11px] font-bold transition-all cursor-pointer ${activeTab === "engineered"
                        ? "bg-seafoam/20 text-seafoam border border-seafoam/50"
                        : "text-bone/50 hover:text-bone"
                      }`}
                  >
                    02. RE-ENGINEERED (LIVE)
                  </button>
                </div>
              </div>

              {/* Telemetry Details */}
              {activeTab === "prototype" ? (
                <div className="space-y-4 font-mono text-xs animate-fadeIn">
                  <div className="flex items-center justify-between bg-brass/10 border border-brass/30 p-3 text-brass">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="font-bold">STATUS: VIBE-CODE PROTOTYPE DETECTED</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-brass/20 px-2 py-0.5">UNSTABLE</span>
                  </div>

                  <div className="space-y-2 text-bone/70 text-[11px] leading-relaxed">
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Codebase Architecture ........</span>
                      <span className="text-brass font-bold">Spaghetti State &amp; Duplication</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Database &amp; API Latency .....</span>
                      <span className="text-brass font-bold">Unindexed Queries (&gt;850ms)</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Security &amp; Auth Edge Cases ..</span>
                      <span className="text-brass font-bold">Exposed Keys &amp; Race Conditions</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Production Readiness ........</span>
                      <span className="text-brass font-bold">20% Prototype Only</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 font-mono text-xs animate-fadeIn">
                  <div className="flex items-center justify-between bg-seafoam/10 border border-seafoam/30 p-3 text-seafoam">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-seafoam" />
                      <span className="font-bold">STATUS: REDITUS RE-ENGINEERED PIPELINE</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-seafoam/20 px-2 py-0.5">100% PRODUCTION READY</span>
                  </div>

                  <div className="space-y-2 text-bone/90 text-[11px] leading-relaxed">
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Codebase Architecture ........</span>
                      <span className="text-seafoam font-bold">Clean Modular Micro-Services</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Database &amp; API Latency .....</span>
                      <span className="text-seafoam font-bold">Cached Sub-12ms Response</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Security &amp; Auth Edge Cases ..</span>
                      <span className="text-seafoam font-bold">Hardened JWT &amp; Zero Leaks</span>
                    </div>
                    <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
                      <span>&gt; Production Readiness ........</span>
                      <span className="text-seafoam font-extrabold">VERIFIED &amp; SCALABLE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Footer */}
              <div className="mt-6 pt-4 border-t border-graphite-border flex flex-wrap items-center justify-between text-[10px] font-mono text-graphite-muted gap-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-seafoam" />
                  REDITUS LABS RESCUE PROTOCOL
                </span>
                <span className="text-seafoam font-bold">DIAGNOSTIC RUN COMPLETE</span>
              </div>
            </div>

            {/* AI Tools Supported Chips */}
            <div className="space-y-3 pt-2">
              <div className="font-mono text-xs font-semibold tracking-wider text-graphite-muted uppercase flex items-center gap-2">
                <span>RESCUING &amp; HARDENING CODE FROM:</span>
                <div className="h-px bg-graphite-border flex-1" />
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {[
                  { name: "Cursor", status: "Supported" },
                  { name: "v0 by Vercel", status: "Supported" },
                  { name: "Bolt.new", status: "Supported" },
                  { name: "Lovable", status: "Supported" },
                  { name: "Replit Agent", status: "Supported" },
                  { name: "Claude 3.5 Sonnet", status: "Supported" },
                  { name: "ChatGPT o1/o3", status: "Supported" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-graphite/60 border border-petrol/30 hover:border-seafoam text-seafoam/90 px-3 py-1.5 rounded-xs flex items-center gap-2 transition-all group"
                  >
                    <CheckCircle2 className="w-3 h-3 text-seafoam group-hover:scale-110 transition-transform" />
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Borderless ASCII Orbital Atom */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative flex items-center justify-center p-4">
              {/* Ambient Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 rounded-full bg-seafoam/10 blur-3xl" />
              </div>

              {/* Clean ASCII Orbital Atom */}
              <AsciiAtom color="text-seafoam/60 hover:text-seafoam transition-colors" className="relative z-10 scale-100 sm:scale-110" />

              {/* Floating Monospace Label */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-seafoam/60 tracking-widest whitespace-nowrap">
                AI_ORBITAL // ARCHITECTURE_SCAN
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
