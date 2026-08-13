"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { ArrowRight, ArrowUpRight, CheckCircle, ExternalLink, X } from "lucide-react";
import { ProjectDiagram } from "./ProjectDiagrams";

interface ProjectsProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function Projects({ onOpenInquiry }: ProjectsProps) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const tags = ["All", "AI / ML", "Enterprise SaaS", "Pipeline"];

  const filteredProjects =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeTag);

  return (
    <section id="work" className="py-24 bg-bone relative border-b border-graphite/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-petrol inline-block"></span>
              <span className="font-mono text-xs font-bold tracking-widest text-petrol uppercase">
                FEATURED WORK
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep-ink leading-tight">
              Turning ideas into <br />
              impactful products.
            </h2>
          </div>

          <button
            onClick={() => onOpenInquiry("work")}
            className="group inline-flex items-center gap-2 bg-transparent text-petrol hover:text-petrol-hover font-display text-sm font-bold tracking-wider underline underline-offset-4 decoration-petrol cursor-pointer"
          >
            <span>VIEW ALL WORK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-graphite/15 pb-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`font-mono text-xs px-4 py-2 border transition-all duration-200 cursor-pointer ${
                activeTag === tag
                  ? "bg-petrol text-bone border-petrol font-bold shadow-xs"
                  : "bg-bone-card text-graphite hover:text-petrol border-graphite/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-bone-card border border-graphite/20 hover:border-petrol p-6 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header Tag & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold text-petrol uppercase bg-petrol/10 border border-petrol/30 px-2 py-0.5">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-graphite-muted">
                    [{project.tag}]
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-deep-ink mb-2 group-hover:text-petrol transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-petrol" />
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-graphite-muted leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technical Line-Art Diagram */}
                <div className="bg-bone border border-graphite/10 p-2 mb-6 rounded-xs flex items-center justify-center">
                  <ProjectDiagram visualType={project.visualType} />
                </div>
              </div>

              {/* Tech Stack Pills & Metrics */}
              <div className="pt-4 border-t border-graphite/15 space-y-3">
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex items-center justify-between text-xs font-mono bg-bone px-3 py-1.5 border border-graphite/10">
                    <span className="text-graphite-muted">{project.metrics[0].label}:</span>
                    <span className="text-petrol font-bold">{project.metrics[0].value}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-graphite-muted">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="bg-bone px-2 py-0.5 border border-graphite/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-deep-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bone border border-petrol max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-graphite hover:text-petrol p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-mono text-xs text-petrol font-bold mb-2">
              &gt; PROJECT_CASE_STUDY // {selectedProject.category}
            </div>

            <h3 className="font-display font-bold text-3xl text-deep-ink mb-4">
              {selectedProject.title}
            </h3>

            <p className="font-sans text-sm text-graphite-muted leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="space-y-4 mb-6 text-xs font-sans">
              <div className="bg-bone-card border border-graphite/20 p-4">
                <div className="font-mono font-bold text-graphite mb-1">THE CHALLENGE</div>
                <p className="text-graphite-muted leading-relaxed">{selectedProject.challenge}</p>
              </div>

              <div className="bg-seafoam/10 border border-seafoam-dark p-4">
                <div className="font-mono font-bold text-petrol mb-1">OUR SOLUTION</div>
                <p className="text-deep-ink leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Metrics */}
            {selectedProject.metrics && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="bg-deep-ink text-bone p-3 font-mono border border-graphite">
                    <div className="text-[10px] text-seafoam uppercase">{m.label}</div>
                    <div className="text-xl font-bold text-petrol">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-graphite/20">
              <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                {selectedProject.techStack.map((t) => (
                  <span key={t} className="bg-bone-card border px-2 py-0.5 text-graphite">{t}</span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenInquiry(`project-${selectedProject.id}`);
                }}
                className="bg-petrol text-bone hover:bg-petrol-hover px-4 py-2 font-display text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>BUILD SIMILAR PRODUCT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
