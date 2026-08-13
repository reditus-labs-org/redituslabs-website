"use client";

import React from "react";
import { TECHNOLOGIES } from "@/data/technologies";
import { Cpu, Database, Server, Code, Sparkles, Box, Shield, Terminal } from "lucide-react";

export function TechStrip() {
  const getIcon = (id: string) => {
    switch (id) {
      case "nextjs":
      case "react":
        return <Code className="w-4 h-4 text-petrol" />;
      case "python":
        return <Terminal className="w-4 h-4 text-petrol" />;
      case "langchain":
      case "openai":
        return <Sparkles className="w-4 h-4 text-brass" />;
      case "postgresql":
      case "vectordb":
        return <Database className="w-4 h-4 text-petrol" />;
      case "docker":
        return <Box className="w-4 h-4 text-petrol" />;
      case "aws":
        return <Server className="w-4 h-4 text-petrol" />;
      default:
        return <Cpu className="w-4 h-4 text-petrol" />;
    }
  };

  return (
    <section className="bg-deep-ink text-bone py-8 border-b border-graphite/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 bg-seafoam rounded-full"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-seafoam uppercase">
              BUILT WITH MODERN TECHNOLOGIES
            </span>
          </div>

          {/* Technology Badges Grid */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
            {TECHNOLOGIES.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-2 bg-graphite/50 hover:bg-graphite border border-graphite/80 px-3 py-1.5 rounded-xs transition-colors duration-200 group cursor-default"
                title={`${tech.name} — ${tech.description}`}
              >
                {getIcon(tech.id)}
                <span className="font-mono text-xs font-medium text-bone/90 group-hover:text-seafoam transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
