import { TESTIMONIALS } from "@/lib/data/testimonials";
import SectionLabel from "./SectionLabel";
import GsapReveal from "./GsapReveal";
import ScrollText from "./ScrollText";

export default function Testimonials() {
  return (
    <section className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <GsapReveal className="mb-16">
          <ScrollText className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl drop-shadow-sm" from={0.3}>
            What the people we built for say.
          </ScrollText>
        </GsapReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <GsapReveal key={t.id} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-petrol/40 hover:bg-white shadow-xl">
                <div>
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl font-bold leading-none text-petrol/30"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 text-[15px] leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-8 border-t border-black/10 pt-5">
                  <div className="font-heading font-bold text-ink">{t.author}</div>
                  <div className="mt-0.5 font-mono text-[11px] text-petrol font-medium">
                    {t.role} · {t.company}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest uppercase text-ink-muted">
                    {t.industry}
                  </div>
                </figcaption>
              </figure>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
