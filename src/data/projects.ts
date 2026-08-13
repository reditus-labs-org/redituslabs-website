export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: "AI / ML" | "Web Platform" | "Enterprise SaaS" | "Pipeline";
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  visualType: "neural" | "restaurant" | "network" | "medical" | "document";
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "athenalm",
    title: "ATHENALM",
    category: "AI RAG Platform",
    tag: "AI / ML",
    description:
      "Intelligent knowledge interaction powered by retrieval-augmented generation.",
    challenge:
      "Enterprise unstructured document clutter causing low query accuracy and high LLM hallucination rates in internal knowledge discovery.",
    solution:
      "Engineered an automated semantic chunking and vector indexing pipeline paired with a high-speed hybrid retrieval engine and citations.",
    techStack: ["Next.js", "Python", "LangChain", "Vector DB", "OpenAI"],
    visualType: "neural",
    metrics: [
      { label: "Query Accuracy", value: "98.4%" },
      { label: "Latency", value: "<350ms" },
    ],
  },
  {
    id: "foodpandora",
    title: "FOODPANDORA",
    category: "Restaurant Management System",
    tag: "Enterprise SaaS",
    description:
      "A modern digital platform for managing restaurant operations.",
    challenge:
      "Fragmented point-of-sale systems, kitchen workflow bottlenecks, and un-optimized inventory tracking across multiple branch locations.",
    solution:
      "Architected a real-time event-driven POS & inventory portal with offline syncing and granular analytics dashboards.",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "WebSockets"],
    visualType: "restaurant",
    metrics: [
      { label: "Order Velocity", value: "+40%" },
      { label: "Uptime", value: "99.99%" },
    ],
  },
  {
    id: "onboardhub",
    title: "ONBOARDHUB",
    category: "Vendor Onboarding Platform",
    tag: "Enterprise SaaS",
    description:
      "AI-powered onboarding infrastructure connecting vendors and distributors.",
    challenge:
      "Manual document verification created 3-week delays in onboarding enterprise distributors and compliance friction.",
    solution:
      "Created an automated compliance workflow engine utilizing multi-modal AI document verification and real-time validation APIs.",
    techStack: ["Next.js", "TypeScript", "Python", "AWS", "Tailwind CSS"],
    visualType: "network",
    metrics: [
      { label: "Cycle Time", value: "-85%" },
      { label: "Vendors Onboarded", value: "12,000+" },
    ],
  },
  {
    id: "mhn-pipeline",
    title: "MHN PIPELINE",
    category: "AI Medical Intelligence",
    tag: "Pipeline",
    description:
      "Intelligent document processing and medical information extraction pipeline.",
    challenge:
      "Processing thousands of complex medical records and lab reports daily with strict HIPAA compliance requirements.",
    solution:
      "Built a secure, deterministic data extraction pipeline with named entity recognition and automated medical taxonomy mapping.",
    techStack: ["Python", "FastAPI", "Docker", "HIPAA Cloud", "Transformers"],
    visualType: "medical",
    metrics: [
      { label: "Processing Speed", value: "10x" },
      { label: "Extraction Precision", value: "99.2%" },
    ],
  },
  {
    id: "resume-intelligence",
    title: "RESUME INTELLIGENCE",
    category: "AI Resume Parser",
    tag: "AI / ML",
    description:
      "AI-powered resume analysis and structured candidate intelligence.",
    challenge:
      "Traditional ATS parsers failing on modern multi-column resume formats, misclassifying candidate skills and work histories.",
    solution:
      "Designed a layout-aware neural parsing engine that converts arbitrary PDF formats into structured JSON candidate profiles.",
    techStack: ["Next.js", "Python", "OpenAI", "Tailwind CSS", "PostgreSQL"],
    visualType: "document",
    metrics: [
      { label: "Parse Accuracy", value: "97.8%" },
      { label: "Formats Supported", value: "100+" },
    ],
  },
];
