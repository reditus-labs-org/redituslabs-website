"use client";

import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  imageBg: string;
}

const projects: Project[] = [
  {
    id: "hutto",
    category: "FOOD & BEVERAGE",
    title: "HUTTO ENGINE",
    description: "High-throughput e-commerce platform with automated inventory routing, real-time analytics, and sleek mobile-first design.",
    tags: ["Next.js 15", "Three.js", "Shopify Plus"],
    gradient: "from-[#087F8C] to-[#0B1114]",
    imageBg: "bg-[#12191d]",
  },
  {
    id: "sukin",
    category: "SKINCARE & CARE",
    title: "SUKIN WELLNESS",
    description: "Personalized AI recommendation engine and subscription platform crafted for clean beauty consumer products.",
    tags: ["React 19", "Node.js", "AI Pipelines"],
    gradient: "from-[#A8E6CF]/30 to-[#087F8C]",
    imageBg: "bg-[#162228]",
  },
  {
    id: "vibe-rescue",
    category: "VIBE-CODE RESCUE",
    title: "SYNTEX CORE",
    description: "Complete re-engineering of a prototype AI tool into an enterprise-grade SaaS application with sub-50ms latency.",
    tags: ["TypeScript", "Golang", "PostgreSQL"],
    gradient: "from-[#B99A5B]/30 to-[#0B1114]",
    imageBg: "bg-[#1a2327]",
  },
  {
    id: "fintech",
    category: "FINTECH & WEB3",
    title: "NEXUS PAY",
    description: "Institutional digital asset management platform with multi-signature authorization and real-time WebGL charts.",
    tags: ["WebGL", "Tailwind CSS", "Security Audit"],
    gradient: "from-[#087F8C] to-[#A8E6CF]/20",
    imageBg: "bg-[#0f171b]",
  },
];

export function PortfolioShowcase() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 420;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="py-28 bg-[#0B1114] text-[#F1EDE3] overflow-hidden border-t border-[#242C30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12191d] text-[#A8E6CF] text-xs font-mono tracking-wider mb-4 border border-[#A8E6CF]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED WORK & CASE STUDIES</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              BUILDING THE FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8E6CF] to-[#087F8C]">
                CONSUMER BRANDS & SYSTEMS
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-[#12191d] border border-[#242C30] text-[#F1EDE3] hover:border-[#A8E6CF] hover:text-[#A8E6CF] transition-colors cursor-pointer"
              aria-label="Scroll Left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-[#087F8C] text-[#F1EDE3] hover:bg-[#066670] transition-colors cursor-pointer border border-[#A8E6CF]/30"
              aria-label="Scroll Right"
            >
              <ArrowRight className="w-5 h-5 text-[#A8E6CF]" />
            </button>
          </div>
        </div>

        <p className="max-w-xl text-sm sm:text-base text-[#F1EDE3]/70 font-mono mt-4">
          We partner with ambitious founders and engineering leaders to design, build, and scale production digital software.
        </p>
      </div>

      {/* Horizontal Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-16 pb-8 snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-none w-[320px] sm:w-[420px] snap-start rounded-3xl bg-[#12191d] border border-[#242C30] hover:border-[#087F8C]/60 overflow-hidden hover-glow-card transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Visual Image Preview Header */}
            <div className={`relative h-64 ${project.imageBg} p-6 flex flex-col justify-between overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none" />

              {/* Badge Pill */}
              <div className="relative z-10 self-start px-3 py-1 rounded-full bg-[#0B1114]/80 backdrop-blur-md border border-[#A8E6CF]/30 text-[#A8E6CF] font-mono text-[10px] tracking-wider uppercase font-bold">
                {project.category}
              </div>

              {/* Graphic Mockup Element */}
              <div className="relative z-10 w-full h-32 rounded-xl bg-[#0B1114]/70 backdrop-blur-md border border-[#242C30] p-4 flex items-center justify-between transform group-hover:scale-[1.02] transition-transform">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#087F8C]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A8E6CF]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B99A5B]" />
                  </div>
                  <div className="font-mono text-xs font-bold text-[#F1EDE3] tracking-widest uppercase">
                    {project.title}
                  </div>
                </div>

                <div className="w-16 h-16 rounded-lg bg-[#12191d] border border-[#A8E6CF]/30 p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/reditus-logo.svg"
                    alt={`${project.title} Preview`}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white mb-3 group-hover:text-[#A8E6CF] transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#F1EDE3]/70 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#242C30] flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#0B1114] text-[#F1EDE3]/80 border border-[#242C30]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
