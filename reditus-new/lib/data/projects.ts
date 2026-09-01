export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: "AI / ML" | "Web Platform" | "Enterprise SaaS" | "Pipeline";
  description: string;
  image: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "athenalm",
    title: "ATHENALM",
    category: "AI RAG Platform",
    tag: "AI / ML",
    image: "/images/project-athenalm.jpg",
    description:
      "Intelligent knowledge interaction powered by retrieval-augmented generation.",
    techStack: ["Next.js", "Python", "LangChain", "Vector DB", "OpenAI"],
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
    image: "/images/project-foodpandora.jpg",
    description:
      "A modern digital platform for managing restaurant operations.",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "WebSockets"],
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
    image: "/images/project-onboardhub.jpg",
    description:
      "AI-powered onboarding infrastructure connecting vendors and distributors.",
    techStack: ["Next.js", "TypeScript", "Python", "AWS", "Tailwind CSS"],
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
    image: "/images/project-mhn.jpg",
    description:
      "Intelligent document processing and medical information extraction pipeline.",
    techStack: ["Python", "FastAPI", "Docker", "HIPAA Cloud", "Transformers"],
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
    image: "/images/project-resume.jpg",
    description:
      "AI-powered resume analysis and structured candidate intelligence.",
    techStack: ["Next.js", "Python", "OpenAI", "Tailwind CSS", "PostgreSQL"],
    metrics: [
      { label: "Parse Accuracy", value: "97.8%" },
      { label: "Formats Supported", value: "100+" },
    ],
  },
];
