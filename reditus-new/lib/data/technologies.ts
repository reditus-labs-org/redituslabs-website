export interface Technology {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "AI & ML" | "Infrastructure" | "Database";
  description: string;
}

export const TECHNOLOGIES: Technology[] = [
  { id: "nextjs", name: "Next.js", category: "Frontend", description: "React Framework for Production" },
  { id: "react", name: "React", category: "Frontend", description: "UI Component Architecture" },
  { id: "python", name: "Python", category: "Backend", description: "Backend & Data Engineering" },
  { id: "langchain", name: "LangChain", category: "AI & ML", description: "LLM & Agent Workflows" },
  { id: "postgresql", name: "PostgreSQL", category: "Database", description: "Relational Data Storage" },
  { id: "docker", name: "Docker", category: "Infrastructure", description: "Containerized Workloads" },
  { id: "aws", name: "AWS", category: "Infrastructure", description: "Cloud Infrastructure" },
  { id: "openai", name: "OpenAI API", category: "AI & ML", description: "Generative AI Integration" },
  { id: "vectordb", name: "Vector DBs", category: "Database", description: "Embeddings & Semantic Search" },
];
