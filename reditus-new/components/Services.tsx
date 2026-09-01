"use client";

import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import SectionLabel from "./SectionLabel";
import GsapReveal from "./GsapReveal";
import ScrollText from "./ScrollText";
import { useInquiry } from "./InquiryContext";

export default function Services() {
  const { open } = useInquiry();

  return (
    <section id="services" className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <GsapReveal className="mb-16">
          <ScrollText className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl drop-shadow-sm" from={0.3}>
            Four disciplines. One standard.
          </ScrollText>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            Every engagement runs on the same engineering discipline, whether
            it&apos;s a high-scale web platform or a mission-critical AI pipeline.
          </p>
        </GsapReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <GsapReveal key={s.id} delay={(i % 2) * 0.06} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-petrol/40 hover:bg-white shadow-xl">
                <div>
                  <div className="mb-6 flex items-start justify-between border-b border-black/10 pb-4">
                    <span className="font-mono text-xl font-bold text-petrol">{s.number}</span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-ink group-hover:text-petrol transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.description}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-black/10 pt-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                        <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-petrol" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => open(s.title)}
                  className="mt-8 inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-ink transition-colors hover:text-petrol cursor-pointer pt-4 border-t border-black/5"
                >
                  DISCUSS THIS DISCIPLINE <ArrowUpRight className="h-3.5 w-3.5 text-petrol" />
                </button>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
