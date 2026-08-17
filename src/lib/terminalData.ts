export interface TerminalProject {
  id: string;
  title: string;
  status: "COMPILING" | "DEPLOYED" | "ARCHIVED" | "OPTIMIZING";
  tech: string[];
  metrics: {
    fps: number;
    bundle: string;
    latency: string;
  };
  description: string;
  link: string;
  progress: number;
}

export const terminalProjects: TerminalProject[] = [
  {
    id: "neural-interface",
    title: "NEURAL-INTERFACE.v3",
    status: "DEPLOYED",
    tech: ["R3F", "GSAP", "WebGL2", "WebGPU"],
    metrics: { fps: 60, bundle: "47kb", latency: "<16ms" },
    description:
      "Real-time neural network visualization with WebGL compute shaders. Interactive weight exploration and gradient flow analysis.",
    link: "/work/neural-interface",
    progress: 100,
  },
  {
    id: "quantum-renderer",
    title: "QUANTUM-RENDERER",
    status: "OPTIMIZING",
    tech: ["Three.js", "WASM", "SIMD", "WebWorkers"],
    metrics: { fps: 58, bundle: "89kb", latency: "<18ms" },
    description:
      "Path-traced global illumination engine running entirely in-browser. Denoising via temporal accumulation and spatial filtering.",
    link: "/work/quantum-renderer",
    progress: 72,
  },
  {
    id: "cyber-defense",
    title: "CYBER-DEFENSE.GRID",
    status: "DEPLOYED",
    tech: ["R3F", "Cannon.js", "WebRTC", "Workers"],
    metrics: { fps: 60, bundle: "62kb", latency: "<12ms" },
    description:
      "Distributed threat visualization platform. Real-time network topology with physics-based force-directed layouts.",
    link: "/work/cyber-defense",
    progress: 100,
  },
  {
    id: "synth-engine",
    title: "SYNTH-ENGINE.CORE",
    status: "COMPILING",
    tech: ["AudioWorklet", "WASM", "WebAssembly", "SIMD"],
    metrics: { fps: 55, bundle: "112kb", latency: "<8ms" },
    description:
      "Polyphonic wavetable synthesizer with FM, additive, and granular engines. MIDI Polyphonic Expression (MPE) support.",
    link: "/work/synth-engine",
    progress: 45,
  },
  {
    id: "data-constellation",
    title: "DATA-CONSTELLATION",
    status: "DEPLOYED",
    tech: ["R3F", "D3", "WebGL", "IndexedDB"],
    metrics: { fps: 60, bundle: "38kb", latency: "<10ms" },
    description:
      "High-dimensional data exploration through interactive 3D scatter projections. UMAP/t-SNE with real-time parameter tuning.",
    link: "/work/data-constellation",
    progress: 100,
  },
  {
    id: "agent-runtime",
    title: "AGENT-RUNTIME.v2",
    status: "ARCHIVED",
    tech: ["TypeScript", "WASM", "WebWorkers", "R3F"],
    metrics: { fps: 52, bundle: "156kb", latency: "<24ms" },
    description:
      "Autonomous agent orchestration framework. Visual debugging of multi-agent workflows with temporal replay capability.",
    link: "/work/agent-runtime",
    progress: 100,
  },
];

export function formatStatus(status: TerminalProject["status"]): string {
  const labels: Record<TerminalProject["status"], string> = {
    COMPILING: "▓▓▓▓▓░░░░░ 42%",
    DEPLOYED: "██████████ 100%",
    ARCHIVED: "░░░░░░░░░░ ARCHIVED",
    OPTIMIZING: "▓▓▓▓▓▓▓░░░ 72%",
  };
  return labels[status];
}

export function formatTechStack(tech: string[]): string {
  return tech.map((t) => `[${t}]`).join(" ");
}

export function formatMetrics(metrics: TerminalProject["metrics"]): string {
  return `FPS: ${metrics.fps} | BUNDLE: ${metrics.bundle} | LATENCY: ${metrics.latency}`;
}