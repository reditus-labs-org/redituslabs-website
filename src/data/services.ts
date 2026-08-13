export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  visualType: "isometric-web" | "stacked-blocks" | "ai-network" | "saas-blocks";
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "web-digital",
    number: "01",
    category: "WEB & DIGITAL",
    title: "Web & Digital",
    description:
      "Bold, modern, responsive websites and digital experiences engineered for performance and conversion.",
    visualType: "isometric-web",
    features: [
      "High-Performance Web Applications",
      "Editorial Design & Component Systems",
      "SEO & Core Web Vitals Optimization",
      "Headless Content Management",
    ],
  },
  {
    id: "software-apps",
    number: "02",
    category: "SOFTWARE & APPS",
    title: "Software & Apps",
    description:
      "Custom software applications built for performance, scalability and growth.",
    visualType: "stacked-blocks",
    features: [
      "Full-Stack Web & Mobile Applications",
      "Scalable API & Microservice Architecture",
      "Legacy Code Refactoring & Modernization",
      "Enterprise Infrastructure",
    ],
  },
  {
    id: "ai-pipelines",
    number: "03",
    category: "AI PIPELINES & TOOLS",
    title: "AI Pipelines & Tools",
    description:
      "Intelligent pipelines, AI tools and automations that unlock new possibilities.",
    visualType: "ai-network",
    features: [
      "Retrieval-Augmented Generation (RAG)",
      "Autonomous Agent & Workflow Engineering",
      "Custom LLM Fine-Tuning & Prompt Pipelines",
      "Vector Search & Knowledge Extraction",
    ],
  },
  {
    id: "saas-products",
    number: "04",
    category: "SAAS PRODUCTS",
    title: "SaaS Products",
    description:
      "End-to-end SaaS products designed, built and scaled to perfection.",
    visualType: "saas-blocks",
    features: [
      "Multi-Tenant Architecture",
      "Subscription & Payment Orchestration",
      "Analytics & Dashboard Tooling",
      "Production Security & Compliance",
    ],
  },
];
