"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroTypography() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        taglineRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div className="font-mono text-fg text-sm tracking-widest mb-6 opacity-50">
            <span className="text-cyan">\u003E_</span> INIT // TECH_CREATIVE
          </div>

          <h1
            ref={titleRef}
            className="hero-title font-display text-fg leading-[0.9]"
            aria-label="TECH CREATIVE"
          >
            <span className="block">TECH</span>
            <span className="block text-cyan">//</span>
            <span className="block">CREATIVE</span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-mono text-fg-dim text-base md:text-lg mt-8 tracking-wide max-w-2xl mx-auto"
          >
            Brutalist-cyberpunk digital experiences engineered from ground zero.
            WebGL. Three.js. Real-time 3D. Interactive systems.
          </p>

          <div
            ref={taglineRef}
            className="font-mono text-muted text-xs tracking-widest mt-10 flex items-center justify-center gap-4"
          >
            <span className="relative">
              <span className="blink">\u003E_</span> READY
            </span>
            <span className="w-24 h-px bg-border"></span>
            <span>DEPLOY</span>
          </div>
        </div>
      </div>

      <div id="hero" className="section-marker" />
    </section>
  );
}