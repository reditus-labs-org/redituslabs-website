export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote:
      "REDITUS turned our fragile prototype into a rock-solid enterprise platform in 4 weeks. Their engineering discipline and technical execution are unmatched.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Aether Dynamics",
    industry: "AI Solutions",
  },
  {
    id: "testimonial-2",
    quote:
      "We had a vibe-coded MVP that couldn't handle more than 50 concurrent users. REDITUS re-architected the system, fixed memory leaks, and delivered a production ready SaaS.",
    author: "Elena Rostova",
    role: "Founder & CEO",
    company: "SentryFlow",
    industry: "FinTech & Data",
  },
  {
    id: "testimonial-3",
    quote:
      "From strategic discovery to final deployment, REDITUS brought clarity to our complex data pipeline requirements. They build what others declare impossible.",
    author: "David Chen",
    role: "VP of Product",
    company: "Helix Health Systems",
    industry: "HealthTech",
  },
];
