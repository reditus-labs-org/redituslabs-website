"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Terminal, Sparkles, Layers, Code2, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const marqueeItems = [
  { label: "FULL-STACK ENGINEERING", icon: Code2 },
  { label: "AI PIPELINES & AGENTS", icon: Cpu },
  { label: "VIBE-CODE RESCUE", icon: Layers },
  { label: "NEXT.JS 15 & TURBOPACK", icon: Terminal },
  { label: "WEBGL & THREE.JS", icon: Sparkles },
  { label: "PRODUCTION RE-ENGINEERING", icon: Zap },
];

export function TechMarqueeStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marqueeInner = marqueeRef.current;
      if (!marqueeInner) return;

      const tween = gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      // Modulate speed with scroll velocity
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = 1 + velocity / 300;
          gsap.to(tween, { timeScale, duration: 0.3, overwrite: "auto" });
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative py-4 bg-[#12191d] border-y border-[#242C30] overflow-hidden select-none"
    >
      <div className="flex whitespace-nowrap marquee-track w-max">
        {/* Double array for seamless loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-8 font-mono text-xs font-bold tracking-widest text-[#F1EDE3]/80 uppercase group cursor-default"
            >
              <Icon className="w-4 h-4 text-[#A8E6CF] group-hover:rotate-12 transition-transform" />
              <span className="group-hover:text-[#A8E6CF] transition-colors">{item.label}</span>
              <span className="text-[#087F8C] font-extrabold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
