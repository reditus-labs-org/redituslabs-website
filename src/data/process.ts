export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconType: "search" | "cube" | "code" | "refresh" | "rocket";
  details: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand your idea, goals and challenges.",
    iconType: "search",
    details: [
      "In-depth technical architecture audit",
      "Goal alignment & bottleneck identification",
      "Scope & milestone mapping",
    ],
  },
  {
    number: "02",
    title: "REIMAGINE",
    description: "Plan, architect and design the right solution.",
    iconType: "cube",
    details: [
      "System topology & database schema design",
      "Component design system & wireframing",
      "Technical stack selection",
    ],
  },
  {
    number: "03",
    title: "ENGINEER",
    description: "Build, integrate and bring it to life.",
    iconType: "code",
    details: [
      "Modular production-grade code",
      "Continuous integration & unit testing",
      "AI model & API integrations",
    ],
  },
  {
    number: "04",
    title: "OPTIMIZE",
    description: "Test, refine and engineer for performance.",
    iconType: "refresh",
    details: [
      "Load testing & latency reduction",
      "Security audit & vulnerability hardening",
      "Code refactoring & clean architecture",
    ],
  },
  {
    number: "05",
    title: "REALIZE",
    description: "Deploy, scale and deliver real-world impact.",
    iconType: "rocket",
    details: [
      "Zero-downtime production deployment",
      "Automated CI/CD infrastructure",
      "Monitoring, analytics & hand-off",
    ],
  },
];
