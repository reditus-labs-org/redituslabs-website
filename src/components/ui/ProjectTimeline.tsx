"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { terminalProjects } from "@/lib/terminalData";
import { TerminalWindow } from "./TerminalWindow";

gsap.registerPlugin(ScrollTrigger);

export function ProjectTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<any>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setShowHint(self.progress > 0.05 && self.progress < 0.95);
        },
      },
    });

    triggerRef.current = scrollTween.scrollTrigger;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const direction = e.key === "ArrowRight" ? 1 : -1;
        const scrollAmount = window.innerWidth * 0.8;
        container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
      scrollTween.kill();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-fg text-sm tracking-widest mb-4 opacity-50">
            <span className="text-cyan">\u003E_</span> SELECT // PROJECTS
          </div>
          <h2 className="font-display text-fg text-3xl md:text-4xl font-bold tracking-tight">
            DEPLOYED SYSTEMS
          </h2>
          <p className="font-mono text-muted text-sm mt-2 max-w-xl">
            Horizontal scroll to navigate. Arrow keys for keyboard control.
          </p>
        </div>

        <div
          ref={containerRef}
          className="scroll-snap-x flex gap-6 pb-8 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {terminalProjects.map((project, index) => (
            <TerminalWindow key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-fg to-cyan z-50 origin-left transition-transform duration-100 scroll-progress" />

        <div
          className={`scroll-hint ${showHint ? "visible" : ""}`}
          aria-hidden="true"
        >
          <span className="text-fg">\u003C\u003C</span>
          <span>SCROLL</span>
          <span className="text-fg">\u003E\u003E</span>
        </div>
      </div>

      <div id="projects" className="section-marker" />
    </section>
  );
}