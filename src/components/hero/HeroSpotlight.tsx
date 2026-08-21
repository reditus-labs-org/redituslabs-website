"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Code2, Layout, Cpu, Sparkles, Layers } from "lucide-react";

interface HeroSpotlightProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function HeroSpotlight({ onOpenInquiry }: HeroSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline sequence
      gsap.from(".hero-anim-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Floating badges sequence
      gsap.from(".hero-badge", {
        opacity: 0,
        scale: 0.7,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        delay: 0.3,
        ease: "back.out(1.7)",
      });

      // Spotlight glow pulse
      gsap.fromTo(
        spotlightRef.current,
        { scale: 0.85, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax tilt on mouse move over stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgesRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".parallax-badge-1", { x: x * 35, y: y * 35, duration: 0.6, ease: "power2.out" });
    gsap.to(".parallax-badge-2", { x: x * -40, y: y * -30, duration: 0.6, ease: "power2.out" });
    gsap.to(".parallax-badge-3", { x: x * 30, y: y * -35, duration: 0.6, ease: "power2.out" });
    gsap.to(".parallax-badge-4", { x: x * -25, y: y * 25, duration: 0.6, ease: "power2.out" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between items-center bg-[#0B1114] text-[#F1EDE3] overflow-hidden bg-grid-pattern"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none hero-stage-glow z-0" />

      {/* Top Tagline & Headline */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-6">
        <div className="hero-anim-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12191d] border border-[#A8E6CF]/30 text-[#A8E6CF] text-xs font-mono tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
          <span>REDITUS — RETURN. REIMAGINE. REALIZE.</span>
        </div>

        <h1
          ref={headlineRef}
          className="hero-anim-text text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight uppercase leading-[0.9] mb-6 text-white"
        >
          IDEAS MEET <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1EDE3] via-[#A8E6CF] to-[#087F8C]">
            PURPOSE WITH
          </span>{" "}
          <br />
          IMPACT
        </h1>

        <p className="hero-anim-text max-w-xl mx-auto text-sm sm:text-base text-[#F1EDE3]/70 font-mono mb-8">
          We turn ambitious ideas into high-performance web platforms, custom AI tools, and production-ready software systems with real measurable results.
        </p>

        {/* Dual Action CTA Buttons */}
        <div className="hero-anim-text flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#A8E6CF] text-[#A8E6CF] hover:bg-[#A8E6CF] hover:text-[#0B1114] font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,230,207,0.2)] hover:shadow-[0_0_30px_rgba(168,230,207,0.5)]"
          >
            <span>SEE OUR WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={() => onOpenInquiry()}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#087F8C] hover:bg-[#066670] text-[#F1EDE3] font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-[#087F8C]/40 border border-[#A8E6CF]/20 cursor-pointer"
          >
            <span>GET A QUOTE</span>
            <Sparkles className="w-4 h-4 text-[#A8E6CF]" />
          </button>
        </div>
      </div>

      {/* Central Interactive 3D Stage & Floating Badges */}
      <div
        ref={badgesRef}
        className="relative z-10 w-full max-w-5xl mx-auto h-[320px] sm:h-[400px] flex items-center justify-center"
      >
        {/* Glowing Stage Disk Podium Floor */}
        <div
          ref={spotlightRef}
          className="absolute bottom-4 w-[320px] sm:w-[560px] md:w-[680px] h-[100px] sm:h-[160px] hero-podium-ellipse pointer-events-none transform -rotate-2"
        />

        {/* Floating Badge 1: WEB (Top Left) */}
        <div className="hero-badge parallax-badge-1 absolute top-4 left-6 sm:left-16 z-20 animate-float-slow">
          <div className="glass-badge px-5 py-3 rounded-2xl flex items-center gap-3 text-[#F1EDE3] transition-all cursor-pointer group">
            <div className="p-2.5 rounded-xl bg-[#087F8C]/30 text-[#A8E6CF] group-hover:bg-[#087F8C]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-xs tracking-wider uppercase text-[#A8E6CF]">WEB APPS</div>
              <div className="font-mono text-[10px] text-[#F1EDE3]/60">Full-Stack Platforms</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 2: UI/UX (Top Right) */}
        <div className="hero-badge parallax-badge-2 absolute top-8 right-6 sm:right-16 z-20 animate-float-fast">
          <div className="glass-badge px-5 py-3 rounded-2xl flex items-center gap-3 text-[#F1EDE3] transition-all cursor-pointer group">
            <div className="p-2.5 rounded-xl bg-[#A8E6CF]/20 text-[#A8E6CF] group-hover:bg-[#A8E6CF] group-hover:text-[#0B1114]">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-xs tracking-wider uppercase text-white">PRODUCT DESIGN</div>
              <div className="font-mono text-[10px] text-[#F1EDE3]/60">Next-Gen Interfaces</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 3: AI PIPELINES (Bottom Left) */}
        <div className="hero-badge parallax-badge-3 absolute bottom-12 left-10 sm:left-28 z-20 animate-float-fast">
          <div className="glass-badge px-5 py-3 rounded-2xl flex items-center gap-3 text-[#F1EDE3] transition-all cursor-pointer group">
            <div className="p-2.5 rounded-xl bg-[#B99A5B]/30 text-[#B99A5B] group-hover:bg-[#B99A5B] group-hover:text-[#0B1114]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-xs tracking-wider uppercase text-[#B99A5B]">AI SYSTEMS</div>
              <div className="font-mono text-[10px] text-[#F1EDE3]/60">Agents & Automations</div>
            </div>
          </div>
        </div>

        {/* Floating Badge 4: VIBE-RESCUE (Bottom Right) */}
        <div className="hero-badge parallax-badge-4 absolute bottom-10 right-10 sm:right-28 z-20 animate-float-slow">
          <div className="glass-badge px-5 py-3 rounded-2xl flex items-center gap-3 text-[#F1EDE3] transition-all cursor-pointer group">
            <div className="p-2.5 rounded-xl bg-[#087F8C]/30 text-[#A8E6CF] group-hover:bg-[#087F8C]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-xs tracking-wider uppercase text-[#A8E6CF]">VIBE RESCUE</div>
              <div className="font-mono text-[10px] text-[#F1EDE3]/60">Code Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
