import { PROJECTS } from "@/lib/data/projects";
import SectionLabel from "./SectionLabel";
import GsapReveal from "./GsapReveal";
import ScrollText from "./ScrollText";
import { ArrowUpRight } from "lucide-react";

const TAG_STYLE: Record<string, string> = {
  "AI / ML": "text-teal-700 border-teal-600/30 bg-teal-50",
  "Web Platform": "text-cyan-700 border-cyan-600/30 bg-cyan-50",
  "Enterprise SaaS": "text-amber-800 border-amber-600/30 bg-amber-50",
  Pipeline: "text-emerald-700 border-emerald-600/30 bg-emerald-50",
};

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <GsapReveal className="mb-16">
          <ScrollText className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl drop-shadow-sm" from={0.3}>
            Built in the open. Judged by the numbers.
          </ScrollText>
        </GsapReveal>

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <GsapReveal key={p.id} delay={(i % 2) * 0.05}>
              <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-petrol/40 hover:bg-white shadow-xl sm:p-10">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Info Column */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-petrol">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-black/20">/</span>
                      <span className="font-mono text-[11px] tracking-widest uppercase text-ink-muted">
                        {p.category}
                      </span>
                      <span
                        className={`ml-auto rounded-full border px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase lg:ml-3 font-semibold ${TAG_STYLE[p.tag]}`}
                      >
                        {p.tag}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <h3 className="font-heading text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-petrol sm:text-4xl">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-petrol" />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
                      {p.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-black/10 bg-black/[0.03] px-3 py-1 font-mono text-[11px] text-ink-soft transition-colors group-hover:border-black/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics & Signal Column */}
                  <div className="flex flex-col justify-center gap-6 border-t border-black/10 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <div className="grid grid-cols-2 gap-6">
                      {p.metrics?.map((m) => (
                        <div key={m.label} className="rounded-xl border border-black/5 bg-black/[0.02] p-4 backdrop-blur-sm">
                          <div className="font-heading text-2xl font-bold text-petrol">
                            {m.value}
                          </div>
                          <div className="mt-1 font-mono text-[10px] tracking-widest uppercase text-ink-muted">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-petrol font-medium">
                      <span>ARCHITECTURE VERIFIED</span>
                      <span className="text-ink-muted">PRODUCTION READY</span>
                    </div>
                  </div>
                </div>
              </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
