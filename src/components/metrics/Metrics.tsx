"use client";

import React from "react";
import { Terminal, ShieldCheck, Activity, Zap, CheckCircle2, Gauge, Layers, Lock, Server } from "lucide-react";

export function Metrics() {
  const systemBenchmarks = [
    {
      code: "01",
      tag: "PERFORMANCE_BENCHMARK",
      value: "< 15ms",
      label: "Cached API Latency Target",
      detail: "Sub-second response targets, optimized database indexing & edge caching.",
      status: "BENCHMARK MET",
      icon: Gauge,
    },
    {
      code: "02",
      tag: "CODE_INTEGRITY",
      value: "100%",
      label: "Type Safety & Coverage",
      detail: "Strict TypeScript end-to-end, modular architecture & zero technical debt.",
      status: "MODULAR & RIGOROUS",
      icon: Layers,
    },
    {
      code: "03",
      tag: "SECURITY_PROTOCOL",
      value: "0 Leaks",
      label: "Hardened Security & Auth",
      detail: "Zero vulnerability tolerance, automated environment isolation & JWT security.",
      status: "HARDENED PIPELINE",
      icon: Lock,
    },
    {
      code: "04",
      tag: "DEPLOYMENT_READY",
      value: "99.9%",
      label: "System Resilience Target",
      detail: "Automated CI/CD deployments, live health monitoring & failover protocols.",
      status: "PRODUCTION READY",
      icon: Server,
    },
  ];

  return (
    <section id="metrics" className="bg-deep-ink text-bone py-24 relative overflow-hidden border-y border-petrol/40">
      {/* Dark Technical Blueprint & Subtle Hatch Overlay */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-petrol/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header - Styled after VibeCodeRescue dark portion */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-16 border-b border-petrol/30 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-seafoam bg-seafoam/10 border border-seafoam/30 px-3.5 py-1.5 rounded-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-seafoam" />
              <span>ENGINEERING STANDARDS // SYSTEM BENCHMARKS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-bone leading-tight tracking-tight uppercase">
              BUILT FOR SCALE. <br />
              <span className="font-mono text-seafoam border-b-2 border-seafoam pb-1 text-2xl sm:text-3xl lg:text-4xl tracking-normal inline-block mt-2">
                &gt; OUR ARCHITECTURAL SPECIFICATIONS
              </span>
            </h2>

            <div className="font-mono text-xs sm:text-sm text-seafoam-muted/90 bg-graphite/50 border border-petrol/30 border-l-4 border-l-seafoam p-4 leading-relaxed rounded-xs shadow-inner">
              <span className="text-seafoam font-bold">&gt; LABS BRIEFING:</span> We engineer every system to unyielding production standards — prioritizing zero-latency pipelines, hardened security, and modular scalability from day one.
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-graphite-muted bg-graphite/80 border border-petrol/40 px-4 py-2 rounded-xs">
            <Activity className="w-4 h-4 text-seafoam animate-pulse" />
            <span>BENCHMARK_STATUS: <strong className="text-seafoam">ACTIVE_MONITORING</strong></span>
          </div>
        </div>

        {/* 4 Technical Specification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {systemBenchmarks.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.code}
                className="bg-graphite/80 border border-petrol/40 hover:border-seafoam p-7 rounded-xs transition-all duration-300 relative group shadow-xl flex flex-col justify-between"
              >
                {/* Corner Accents */}
                <div className="absolute -top-px -left-px w-2.5 h-2.5 border-t border-l border-seafoam opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-px -right-px w-2.5 h-2.5 border-t border-r border-seafoam opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b border-l border-seafoam opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b border-r border-seafoam opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between border-b border-graphite-border/60 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-seafoam font-bold tracking-wider uppercase bg-seafoam/10 px-2 py-0.5 border border-seafoam/20">
                      {m.tag}
                    </span>
                    <span className="font-mono text-[10px] text-brass font-bold">
                      {m.code}
                    </span>
                  </div>

                  <div className="font-display font-black text-4xl sm:text-5xl text-seafoam group-hover:text-bone transition-colors mb-2 tracking-tight">
                    {m.value}
                  </div>

                  <div className="font-display font-bold text-base text-bone mb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-seafoam shrink-0" />
                    <span>{m.label}</span>
                  </div>

                  <p className="font-sans text-xs text-bone/80 leading-relaxed">
                    {m.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-graphite-border/50 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-graphite-muted flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-seafoam" />
                    STATUS
                  </span>
                  <span className="text-seafoam font-bold">{m.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ASCII / Monospace System Status Terminal */}
        <div className="max-w-2xl mx-auto bg-graphite/90 border border-petrol/50 p-6 shadow-2xl font-mono text-xs text-seafoam rounded-xs relative">
          {/* Corner Accents */}
          <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-seafoam" />
          <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-seafoam" />
          <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-seafoam" />
          <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-seafoam" />

          <div className="flex items-center justify-between border-b border-graphite-border pb-3 mb-4 text-graphite-muted">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-seafoam animate-pulse" />
              <span className="text-bone font-bold text-xs">$ system.specifications</span>
            </div>
            <span className="text-brass text-[10px] font-bold tracking-widest">REDITUS_PRODUCTION_MONITOR</span>
          </div>

          <div className="space-y-2 text-[11px] text-bone/90 bg-deep-ink/80 p-4 border border-petrol/30 rounded-xs mb-4">
            <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
              <span>&gt; CODEBASE ARCHITECTURE ........</span>
              <span className="text-seafoam font-bold">CLEAN MODULAR MICRO-SERVICES</span>
            </div>
            <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
              <span>&gt; LATENCY TARGET ..............</span>
              <span className="text-seafoam font-bold">CACHED SUB-15MS RESPONSE</span>
            </div>
            <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
              <span>&gt; AUTH &amp; SECURITY PROTOCOL .....</span>
              <span className="text-seafoam font-bold">HARDENED JWT &amp; ZERO LEAKS</span>
            </div>
            <div className="flex justify-between border-b border-graphite-border/50 pb-1.5">
              <span>&gt; DEPLOYMENT READINESS ........</span>
              <span className="text-seafoam font-extrabold">100% PRODUCTION READY</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] text-graphite-muted">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-seafoam" />
              ENGINEERED WITH ARCHITECTURAL RIGOR
            </span>
            <span className="text-seafoam font-bold">SYSTEM BENCHMARKS: VERIFIED</span>
          </div>
        </div>

      </div>
    </section>
  );
}

