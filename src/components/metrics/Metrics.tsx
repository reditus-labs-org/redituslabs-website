"use client";

import React from "react";
import { Terminal, ShieldCheck, Activity } from "lucide-react";

export function Metrics() {
  const metricsData = [
    { value: "50+", label: "Projects Delivered", detail: "Web, AI & Software Platforms" },
    { value: "30+", label: "Happy Clients", detail: "Startups & Enterprise Partners" },
    { value: "10+", label: "Industries Served", detail: "FinTech, Health, AI & SaaS" },
    { value: "99%", label: "Client Satisfaction", detail: "Engineering Excellence Rate" },
  ];

  return (
    <section id="metrics" className="bg-deep-ink text-bone py-24 relative overflow-hidden border-b border-graphite/40">
      {/* Dark Technical Blueprint Overlay */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-seafoam uppercase bg-seafoam/10 border border-seafoam/30 px-3 py-1">
            <ShieldCheck className="w-3.5 h-3.5 text-seafoam" />
            <span>TRUSTED BY INNOVATORS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-bone">
            Engineering impact at scale.
          </h2>

          <p className="font-mono text-xs text-graphite-muted">
            [ METRICS_VERIFICATION_LOG // RECORDED_METRICS ]
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metricsData.map((m, idx) => (
            <div
              key={idx}
              className="bg-graphite/60 border border-graphite-border p-8 rounded-xs hover:border-petrol transition-all duration-300 relative group"
            >
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-petrol group-hover:text-seafoam transition-colors mb-2">
                {m.value}
              </div>
              <div className="font-display font-bold text-base text-bone mb-1">
                {m.label}
              </div>
              <div className="font-sans text-xs text-graphite-muted">
                {m.detail}
              </div>
              <div className="absolute top-4 right-4 font-mono text-[9px] text-brass opacity-60">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* ASCII System Status Decoration Block */}
        <div className="max-w-xl mx-auto bg-deep-ink border border-petrol/40 p-6 shadow-2xl font-mono text-xs text-seafoam rounded-xs">
          <div className="flex items-center justify-between border-b border-graphite-border pb-2 mb-3 text-graphite-muted">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-petrol" />
              <span className="text-bone font-bold">$ system.status</span>
            </div>
            <span className="text-brass text-[10px]">PRODUCTION_MONITOR</span>
          </div>

          <pre className="text-seafoam leading-relaxed select-none">
            {`projects = 50+
clients  = 30+
impact   = HIGH
status   = BUILDING`}
          </pre>

          <div className="mt-3 pt-2 border-t border-graphite-border flex items-center justify-between text-[10px] text-graphite-muted">
            <span>ENGINEERED WITH PRECISION</span>
            <span className="text-seafoam font-bold">ONLINE 100%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
