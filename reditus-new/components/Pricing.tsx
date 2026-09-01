"use client";

import { Check, ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import GsapReveal from "./GsapReveal";
import ScrollText from "./ScrollText";
import { useInquiry } from "./InquiryContext";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Standard",
    tagline: "MVP & design builds",
    price: "$300",
    preset: "New Software Build",
    featured: false,
    features: [
      "Dedicated Senior Engineer",
      "1x sprint / week updates",
      "Frontend & landing page build",
      "Custom turnaround timeline",
    ],
  },
  {
    name: "Professional",
    tagline: "Scaling SaaS & AI products",
    price: "$800",
    preset: "SaaS Platform",
    featured: true,
    features: [
      "Full-stack web app development",
      "2x sprint / week async updates",
      "UI/UX architecture included",
      "Dedicated engineering squad",
      "Priority sprint delivery",
    ],
  },
  {
    name: "Senior",
    tagline: "Tailored custom requirements",
    price: "Custom",
    preset: "New Software Build",
    featured: false,
    features: [
      "Dedicated full squad (lead + dev + QA)",
      "Custom architecture & security audits",
      "Advanced AI agent integration",
      "Continuous 24/7 SLA support",
    ],
  },
];

export default function Pricing() {
  const { open } = useInquiry();

  return (
    <section id="pricing" className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <ScrollText
          className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl drop-shadow-sm"
          from={0.3}
        >
          Pricing that matches your pace.
        </ScrollText>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          Dedicated engineering squads on a transparent sprint retainer. Pick
          the cadence that fits how fast you want to move.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <GsapReveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col justify-between rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 shadow-xl",
                  tier.featured
                    ? "border-2 border-petrol bg-white/95 shadow-2xl shadow-petrol/10 scale-[1.02]"
                    : "border-black/10 bg-white/80 hover:border-black/25",
                )}
              >
                <div>
                  {tier.featured && (
                    <span className="absolute right-6 top-6 rounded-full border border-petrol/40 bg-petrol/10 px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-petrol font-bold backdrop-blur-md">
                      Featured
                    </span>
                  )}
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                    {tier.tagline}
                  </div>
                  <div className="mt-3 font-heading text-2xl font-bold text-ink">
                    {tier.name}
                  </div>
                  <div className="mt-6 flex items-baseline gap-2 border-b border-black/10 pb-6">
                    <span className="font-display text-4xl font-bold text-petrol">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="font-mono text-[11px] uppercase text-ink-muted">
                        / sprint
                      </span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[13px] text-ink-soft"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-petrol"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => open(tier.preset)}
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3.5 font-heading text-xs font-bold tracking-wider transition-all cursor-pointer shadow-md",
                    tier.featured
                      ? "border-petrol bg-petrol text-white hover:bg-ink hover:border-ink shadow-lg"
                      : "border-ink bg-ink text-white hover:bg-petrol hover:border-petrol",
                  )}
                >
                  {tier.price === "Custom" ? "TALK TO US" : "GET STARTED"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
