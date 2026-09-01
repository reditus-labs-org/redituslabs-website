"use client";

import { useState } from "react";
import { ChevronDown, FileCode2 } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/data/process";
import SectionLabel from "./SectionLabel";
import GsapReveal from "./GsapReveal";
import ScrollText from "./ScrollText";
import { cn } from "@/lib/utils";

export default function Process() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="process" className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <ScrollText className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl drop-shadow-sm" from={0.3}>
            A system, not a sales call.
          </ScrollText>
          <GsapReveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-ink-soft">
              Five phases, each with a defined output and a benchmark. You know
              what ships at the end of every week, in writing, before we start.
            </p>
          </GsapReveal>
        </div>

        <div className="space-y-4">
          {PROCESS_STEPS.map((step, i) => {
            const isOpen = openIdx === i;
            return (
              <GsapReveal key={step.number} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 backdrop-blur-xl transition-all duration-300 hover:border-black/25 shadow-lg">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 p-6 text-left sm:gap-6"
                  >
                    <span className="font-mono text-sm font-bold text-petrol">{step.number}</span>
                    <span className="flex flex-col">
                      <span className="font-heading text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-petrol sm:text-2xl">
                        {step.title}
                      </span>
                      <span className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted">
                        {step.subtitle}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-ink-muted transition-transform duration-300",
                        isOpen && "rotate-180 text-petrol",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 border-t border-black/10 p-6 sm:grid-cols-2">
                        <div>
                          <p className="text-sm leading-relaxed text-ink-soft">
                            {step.description}
                          </p>
                          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-petrol/30 bg-petrol/10 px-3 py-1.5 font-mono text-[11px] text-petrol font-medium">
                            <FileCode2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {step.outputArtifact}
                          </div>
                        </div>
                        <ul className="space-y-2.5">
                          {step.details.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2.5 text-[13px] text-ink-soft"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-petrol"
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </GsapReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
