"use client";

import React from "react";
import { PROCESS_STEPS, ProcessStep } from "@/data/process";
import { Search, Box, Code, RefreshCw, Rocket, CheckCircle2 } from "lucide-react";

export function Process() {
  const getIcon = (type: ProcessStep["iconType"]) => {
    switch (type) {
      case "search":
        return <Search className="w-5 h-5 text-petrol" />;
      case "cube":
        return <Box className="w-5 h-5 text-petrol" />;
      case "code":
        return <Code className="w-5 h-5 text-petrol" />;
      case "refresh":
        return <RefreshCw className="w-5 h-5 text-petrol" />;
      case "rocket":
        return <Rocket className="w-5 h-5 text-seafoam" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-bone relative border-b border-graphite/15 overflow-hidden">
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 bg-tech-grid-light opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-petrol inline-block"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-petrol uppercase">
              HOW WE WORK
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep-ink leading-tight">
            A clear process. <br />
            Built for success.
          </h2>
        </div>

        {/* Process Steps Connected via Dotted Lines */}
        <div className="relative">

          {/* Desktop Connecting Dotted Technical Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-petrol/40 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="group bg-bone-card border border-graphite/20 hover:border-petrol p-6 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Step Header with Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-bone border border-petrol/40 flex items-center justify-center group-hover:bg-petrol group-hover:text-bone transition-colors duration-200">
                      {getIcon(step.iconType)}
                    </div>
                    <span className="font-mono font-extrabold text-2xl text-petrol">
                      {step.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-xl text-deep-ink mb-2 group-hover:text-petrol transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-graphite-muted leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Sub-deliverables list */}
                <div className="pt-4 border-t border-graphite/15 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 font-mono text-[10px] text-graphite">
                      <span className="text-petrol font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
