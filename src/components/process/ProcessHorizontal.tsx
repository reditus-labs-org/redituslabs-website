"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Compass, Code, Rocket, Sparkles, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    number: "01",
    title: "DISCOVERY & CODE AUDIT",
    description: "Deep architecture review, performance profiling, and tech debt analysis to map out scalable solutions.",
    icon: Search,
    color: "from-[#087F8C] to-[#0B1114]",
    accent: "#087F8C",
    deliverables: ["Tech Debt Audit Report", "Architecture Blueprint", "Sprint Roadmap"],
  },
  {
    number: "02",
    title: "RADICAL UI & SYSTEM PROTOTYPE",
    description: "Engineering interactive WebGL/UI prototypes and high-throughput backend schemas before production coding.",
    icon: Compass,
    color: "from-[#A8E6CF]/20 to-[#087F8C]",
    accent: "#A8E6CF",
    deliverables: ["Interactive UI Kit", "API Schema Spec", "3D WebGL Prototypes"],
  },
  {
    number: "03",
    title: "FULL-STACK SPRINT EXECUTION",
    description: "Rapid agile development sprints with continuous CI/CD integration, sub-50ms query optimization, and test suites.",
    icon: Code,
    color: "from-[#B99A5B]/20 to-[#0B1114]",
    accent: "#B99A5B",
    deliverables: ["Production Codebase", "AI Pipeline Integration", "Automated QA Suites"],
  },
  {
    number: "04",
    title: "PRODUCTION LAUNCH & RESCUE",
    description: "Zero-downtime deployment, infrastructure scaling, SLA monitoring, and post-launch optimization.",
    icon: Rocket,
    color: "from-[#087F8C] to-[#A8E6CF]/30",
    accent: "#087F8C",
    deliverables: ["Zero-Downtime Deploy", "24/7 SLA Monitoring", "Vibe-Code Rescue Guarantee"],
  },
];

export function ProcessHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      if (!section || !trigger) return;

      // Horizontal Scroll Tween (MUST use ease: "none" per GSAP best practice)
      const scrollTween = gsap.to(section, {
        xPercent: -100 * (processSteps.length - 1) / processSteps.length,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          snap: 1 / (processSteps.length - 1),
          end: () => "+=" + trigger.offsetWidth * 2,
        },
      });

      // Child animations using containerAnimation
      processSteps.forEach((_, idx) => {
        gsap.from(`.process-card-${idx}`, {
          scale: 0.85,
          opacity: 0.5,
          duration: 1,
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: `.process-card-${idx}`,
            start: "left center+=200",
            end: "center center",
            scrub: true,
          },
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={triggerRef} className="relative bg-[#0B1114] text-[#F1EDE3] overflow-hidden border-t border-[#242C30]">
      {/* Pinned Viewport Container */}
      <div className="h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12191d] text-[#A8E6CF] text-xs font-mono tracking-wider mb-3 border border-[#A8E6CF]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE REDITUS METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase text-white">
              ENGINEERING <span className="text-[#087F8C]">WORKFLOW &amp; PROCESS</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A8E6CF] flex items-center gap-2">
            <span>SCROLL DOWN TO EXPLORE PHASES</span>
            <span className="w-8 h-0.5 bg-[#087F8C] animate-pulse" />
          </div>
        </div>

        {/* Horizontal Sliding Track */}
        <div className="w-full flex-grow flex items-center overflow-hidden my-auto">
          <div
            ref={sectionRef}
            className="flex w-[400vw] h-[480px] sm:h-[520px]"
          >
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="w-[100vw] h-full flex items-center justify-center px-4 sm:px-12"
                >
                  <div
                    className={`process-card-${idx} relative w-full max-w-2xl h-full p-8 sm:p-12 rounded-3xl bg-[#12191d] border border-[#242C30] hover:border-[#087F8C]/60 shadow-2xl flex flex-col justify-between overflow-hidden transition-all group`}
                  >
                    {/* Background Ambient Glow */}
                    <div
                      className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
                      style={{ backgroundColor: step.accent }}
                    />

                    {/* Step Header */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-5xl sm:text-6xl font-pixel font-bold text-[#A8E6CF] opacity-90">
                          {step.number}
                        </span>
                        <div className="p-3.5 rounded-2xl bg-[#0B1114] border border-[#242C30] text-[#A8E6CF]">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-white tracking-tight mb-4">
                        {step.title}
                      </h3>

                      <p className="font-mono text-xs sm:text-sm text-[#F1EDE3]/70 leading-relaxed mb-8">
                        {step.description}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div className="pt-6 border-t border-[#242C30]">
                      <div className="font-mono text-[10px] text-[#A8E6CF] uppercase font-bold tracking-widest mb-3">
                        PHASE DELIVERABLES:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        {step.deliverables.map((deliv) => (
                          <div
                            key={deliv}
                            className="flex items-center gap-2 p-2 rounded-lg bg-[#0B1114] border border-[#242C30] text-[#F1EDE3]/80 text-[11px]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#087F8C] shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Counter Indicator Footer */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-xs text-[#F1EDE3]/50 border-t border-[#242C30]/50 pt-4 shrink-0">
          <span>PHASE 01 — 04</span>
          <span>PINNED HORIZONTAL SCROLL</span>
        </div>

      </div>
    </section>
  );
}
