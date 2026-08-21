"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechBlueprintSvg() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw SVG circuit paths on scroll
      gsap.from(".draw-path", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1,
        },
        strokeDashoffset: 1000,
        stagger: 0.2,
      });

      // Pulse nodes
      gsap.to(".blueprint-node", {
        scale: 1.3,
        opacity: 0.6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#0B1114] text-[#F1EDE3] relative overflow-hidden border-t border-[#242C30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12191d] text-[#A8E6CF] text-xs font-mono tracking-wider mb-4 border border-[#A8E6CF]/20">
              <Terminal className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase text-white">
              ENGINEERED FOR <span className="text-[#087F8C]">HIGH LATENCY RESILIENCE</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A8E6CF] flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse text-[#087F8C]" />
            <span>REAL-TIME DIAGNOSTIC CANVAS</span>
          </div>
        </div>

        {/* Blueprint Canvas Container */}
        <div className="relative p-6 sm:p-12 rounded-3xl bg-[#12191d] border border-[#242C30] overflow-hidden shadow-2xl">
          
          {/* SVG Circuit Canvas */}
          <svg
            ref={svgRef}
            viewBox="0 0 1000 400"
            className="w-full h-auto select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grid Pattern */}
            <defs>
              <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(36, 44, 48, 0.6)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="400" fill="url(#blueprint-grid)" />

            {/* Circuit Paths */}
            <g stroke="#087F8C" strokeWidth="2" fill="none" strokeDasharray="1000" className="draw-path">
              <path d="M 50,200 L 200,200 L 280,100 L 450,100 L 520,200 L 700,200 L 780,300 L 950,300" />
              <path d="M 150,300 L 300,300 L 380,200 L 600,200 L 680,100 L 850,100" stroke="#A8E6CF" opacity="0.7" />
              <path d="M 250,50 L 400,50 L 480,150 L 650,150 L 730,250 L 900,250" stroke="#B99A5B" opacity="0.6" />
            </g>

            {/* Pulsing Nodes */}
            <g>
              <circle cx="200" cy="200" r="8" fill="#A8E6CF" className="blueprint-node" />
              <circle cx="450" cy="100" r="8" fill="#087F8C" className="blueprint-node" />
              <circle cx="700" cy="200" r="8" fill="#A8E6CF" className="blueprint-node" />
              <circle cx="380" cy="200" r="8" fill="#B99A5B" className="blueprint-node" />
              <circle cx="680" cy="100" r="8" fill="#087F8C" className="blueprint-node" />
            </g>
          </svg>

          {/* Overlay Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#242C30] font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#0B1114] border border-[#242C30] flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#A8E6CF]" />
              <div>
                <div className="text-white font-bold">PARALLEL PROCESSING</div>
                <div className="text-[#F1EDE3]/60 text-[10px]">Multi-Threaded Pipelines</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1114] border border-[#242C30] flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#087F8C]" />
              <div>
                <div className="text-white font-bold">ZERO-TRUST AUTH</div>
                <div className="text-[#F1EDE3]/60 text-[10px]">Encrypted Data Transmission</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1114] border border-[#242C30] flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#B99A5B]" />
              <div>
                <div className="text-white font-bold">SUB-50MS LATENCY</div>
                <div className="text-[#F1EDE3]/60 text-[10px]">Edge Compute Optimization</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
