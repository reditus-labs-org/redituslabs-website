export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: "search" | "cube" | "code" | "refresh" | "rocket";
  details: string[];
  outputArtifact: string;
  benchmarkTarget: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "SYSTEM AUDIT & ARCHITECTURAL DISCOVERY",
    description:
      "We begin with a deep-dive diagnostic of your current codebase, target workloads, and product requirements to identify architectural bottlenecks before writing a single line of code.",
    iconType: "search",
    details: [
      "Architectural Bottleneck & Latency Diagnostic",
      "Data Schema & Workload Scale Mapping",
      "Security, Compliance & Feasibility Audit",
      "Modular Execution & Sprint Roadmap",
    ],
    outputArtifact: "SPECS_MANIFEST_v1.0.json",
    benchmarkTarget: "100% SCOPE CLARITY",
  },
  {
    number: "02",
    title: "REIMAGINE",
    subtitle: "SYSTEM TOPOLOGY & BLUEPRINTING",
    description:
      "We map out component boundaries, event-driven pipelines, database indexing strategies, and component design systems to establish an unshakeable technical foundation.",
    iconType: "cube",
    details: [
      "High-Availability System Topology & Schemas",
      "Design Token & Component UI Library",
      "API Contract & Microservice Interface Specs",
      "AI Model & Vector Index Pipeline Strategy",
    ],
    outputArtifact: "SYSTEM_TOPOLOGY_DIAGRAM.svg",
    benchmarkTarget: "ZERO ARCHITECTURE BLINDSPOTS",
  },
  {
    number: "03",
    title: "ENGINEER",
    subtitle: "RIGOROUS PRODUCTION DEVELOPMENT",
    description:
      "Our core phase transforms specifications into bulletproof production software — leveraging strict type discipline, clean code architecture, and automated test-driven pipelines.",
    iconType: "code",
    details: [
      "Type-Safe Modular Full-Stack Development",
      "Low-Latency AI & RAG Retrieval Engines",
      "Automated Unit & Integration Test Suites",
      "Granular Error Boundary & Fallback Handling",
    ],
    outputArtifact: "PRODUCTION_BUILD_VERIFIED",
    benchmarkTarget: "100% TYPE SAFETY & COVERAGE",
  },
  {
    number: "04",
    title: "OPTIMIZE",
    subtitle: "BENCHMARKING & SECURITY HARDENING",
    description:
      "We subject every pipeline to stress testing, memory profiling, bundle optimization, and security audits to guarantee peak sub-15ms responsiveness and zero memory leaks.",
    iconType: "refresh",
    details: [
      "Load Stress Testing & Latency Reduction (<15ms)",
      "Pentesting & Vulnerability Hardening Audit",
      "Memory Leak Profiling & Bundle Tree-Shaking",
      "Edge Caching & Core Web Vitals Peak Tuning",
    ],
    outputArtifact: "BENCHMARK_REPORT_PASSED",
    benchmarkTarget: "< 15MS CACHED LATENCY",
  },
  {
    number: "05",
    title: "REALIZE",
    subtitle: "ZERO-DOWNTIME DEPLOYMENT & HANDOFF",
    description:
      "We deploy your software to multi-region cloud infrastructure equipped with automated CI/CD pipelines, live telemetry dashboards, and comprehensive technical documentation.",
    iconType: "rocket",
    details: [
      "Zero-Downtime Multi-Region Production Rollout",
      "Automated CI/CD Infrastructure & Health Probes",
      "Real-Time Telemetry, Logging & Alerting",
      "Full Codebase Ownership & Architectural Hand-Off",
    ],
    outputArtifact: "PRODUCTION_ONLINE_100%",
    benchmarkTarget: "99.99% UPTIME GUARANTEE",
  },
];
