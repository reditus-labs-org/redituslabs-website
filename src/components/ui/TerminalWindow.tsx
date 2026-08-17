"use client";

import { TerminalProject } from "@/lib/terminalData";

interface TerminalWindowProps {
  project: TerminalProject;
  index: number;
}

export function TerminalWindow({ project, index }: TerminalWindowProps) {
  const statusColors: Record<TerminalProject["status"], string> = {
    COMPILING: "text-warning",
    DEPLOYED: "text-fg",
    ARCHIVED: "text-muted",
    OPTIMIZING: "text-cyan",
  };

  const statusDots: Record<TerminalProject["status"], string> = {
    COMPILING: "terminal-dot yellow",
    DEPLOYED: "terminal-dot green",
    ARCHIVED: "terminal-dot red",
    OPTIMIZING: "terminal-dot cyan",
  };

  return (
    <div
      className="terminal-window snap-center flex-shrink-0 w-[380px] md:w-[420px] lg:w-[460px]"
      style={{ minWidth: "380px" }}
    >
      <div className="terminal-titlebar flex items-center gap-2">
        <span className={`${statusDots[project.status]}`} />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot red" />
        <span className="font-mono text-xs text-muted ml-2">{project.title}</span>
      </div>

      <div className="terminal-content">
        <div className="mb-4 font-mono text-xs text-muted">
          STATUS: <span className={`${statusColors[project.status]} font-bold`}>{project.status}</span>
        </div>

        <div className="mb-4 font-mono text-xs text-fg-dim">
          TECH: <span className="text-fg">{project.tech.map((t) => `[${t}]`).join(" ")}</span>
        </div>

        <div className="mb-4 font-mono text-xs text-muted border-t border-border pt-4">
          {project.description}
        </div>

        <div className="font-mono text-[10px] text-fg grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-fg">{project.metrics.fps}</div>
            <div className="text-muted">FPS</div>
          </div>
          <div>
            <div className="text-fg">{project.metrics.bundle}</div>
            <div className="text-muted">BUNDLE</div>
          </div>
          <div>
            <div className="text-fg">{project.metrics.latency}</div>
            <div className="text-muted">LATENCY</div>
          </div>
        </div>
      </div>

      <div className="terminal-status">
        <span>PROGRESS: {project.progress}%</span>
        <span className="text-cyan">
          {project.status === "DEPLOYED" 
            ? ">_ BUILD SUCCESSFUL" 
            : project.status === "COMPILING"
            ? ">_ COMPILING..."
            : project.status === "OPTIMIZING"
            ? ">_ OPTIMIZING..."
            : ">_ ARCHIVED"}
        </span>
      </div>
    </div>
  );
}