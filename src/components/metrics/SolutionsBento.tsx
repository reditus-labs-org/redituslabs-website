"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, CheckCircle2, Globe2, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SolutionsBento() {
  const containerRef = useRef<HTMLDivElement>(null);
  const count1Ref = useRef<HTMLHeadingElement>(null);
  const count2Ref = useRef<HTMLHeadingElement>(null);
  const count3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in cards
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Animated counters
      if (count1Ref.current) {
        gsap.to(count1Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          innerText: 120,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.out",
          onUpdate: function () {
            if (count1Ref.current) {
              count1Ref.current.innerText = `${Math.ceil(Number(count1Ref.current.innerText))}++`;
            }
          },
        });
      }

      if (count2Ref.current) {
        gsap.to(count2Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          innerText: 98,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.out",
          onUpdate: function () {
            if (count2Ref.current) {
              count2Ref.current.innerText = `${Math.ceil(Number(count2Ref.current.innerText))}%`;
            }
          },
        });
      }

      if (count3Ref.current) {
        gsap.to(count3Ref.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          innerText: 45,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.out",
          onUpdate: function () {
            if (count3Ref.current) {
              count3Ref.current.innerText = `${Math.ceil(Number(count3Ref.current.innerText))}++`;
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solutions"
      ref={containerRef}
      className="relative py-28 bg-[#F1EDE3] text-[#0B1114] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Bold Headline & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B1114] text-[#A8E6CF] text-xs font-mono tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MEASURABLE ENGINEERING</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-pixel font-bold tracking-tight uppercase leading-[0.92] text-[#0B1114] mb-8">
                CREATIVE <br />
                SOLUTIONS <br />
                BUILT FOR <br />
                <span className="text-[#087F8C]">REAL IMPACT</span>
              </h2>

              <p className="max-w-md text-sm sm:text-base text-[#242C30]/80 font-mono leading-relaxed">
                We synthesize deep technical expertise with radical product design to engineer applications that drive tangible enterprise growth, seamless user adoption, and bulletproof scalability.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-4 pt-12">
              <div className="w-12 h-[2px] bg-[#087F8C]" />
              <span className="font-mono text-xs text-[#242C30] uppercase tracking-widest">
                SCALABLE • RELIABLE • PRODUCTION-READY
              </span>
            </div>
          </div>

          {/* Right Column: 3 Bento Stat Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Stat Card 1: High Contrast Seafoam Green Box */}
            <div className="bento-card relative p-8 rounded-3xl bg-[#A8E6CF] text-[#0B1114] shadow-lg hover-glow-card transition-all duration-300 border border-[#087F8C]/20">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="font-display font-bold text-xs tracking-widest uppercase text-[#087F8C] mb-1">
                    PERFORMANCE METRIC
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-tight text-[#0B1114]">
                    TOTAL PROJECTS DELIVERED
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-[#0B1114] text-[#A8E6CF]">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 ref={count1Ref} className="text-6xl sm:text-7xl font-display font-extrabold tracking-tighter text-[#0B1114]">
                  120++
                </h3>
                <span className="font-mono text-xs text-[#0B1114]/70 font-semibold">THIS YEAR</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stat Card 2: Petrol Teal Card */}
              <div className="bento-card p-7 rounded-3xl bg-[#087F8C] text-[#F1EDE3] shadow-lg hover-glow-card transition-all duration-300 border border-[#A8E6CF]/30 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-8">
                  <div className="font-display font-semibold text-xs tracking-wider uppercase text-[#A8E6CF]">
                    SUCCESS RATE
                  </div>
                  <div className="p-2.5 rounded-full bg-[#0B1114]/40 text-[#A8E6CF]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 ref={count2Ref} className="text-5xl font-display font-extrabold tracking-tighter text-[#F1EDE3] mb-2">
                    98%
                  </h3>
                  <p className="font-mono text-xs text-[#F1EDE3]/80 uppercase leading-snug">
                    CLIENT PROBLEMS SUCCESSFULLY SOLVED
                  </p>
                </div>
              </div>

              {/* Stat Card 3: Deep Ink Card */}
              <div className="bento-card p-7 rounded-3xl bg-[#0B1114] text-[#F1EDE3] shadow-lg hover-glow-card transition-all duration-300 border border-[#242C30] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-8">
                  <div className="font-display font-semibold text-xs tracking-wider uppercase text-[#B99A5B]">
                    GLOBAL REACH
                  </div>
                  <div className="p-2.5 rounded-full bg-[#242C30] text-[#B99A5B]">
                    <Globe2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 ref={count3Ref} className="text-5xl font-display font-extrabold tracking-tighter text-[#F1EDE3] mb-2">
                    45++
                  </h3>
                  <p className="font-mono text-xs text-[#F1EDE3]/70 uppercase leading-snug">
                    TRUSTED BY NUMEROUS CLIENTS WORLDWIDE
                  </p>
                </div>
              </div>
            </div>

            {/* Pagination / Dots indicator styling from reference */}
            <div className="flex items-center justify-end gap-2 pt-2 pr-2">
              <span className="w-8 h-1.5 rounded-full bg-[#087F8C]" />
              <span className="w-2 h-1.5 rounded-full bg-[#242C30]/40" />
              <span className="w-2 h-1.5 rounded-full bg-[#242C30]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
