import SectionLabel from "./SectionLabel";
import ScrollText from "./ScrollText";
import GsapReveal from "./GsapReveal";

const PREMISE = [
  {
    index: "01",
    word: "RETURN",
    subtitle: "Root Cause Architecture",
    body: "Most software gets shipped and abandoned. We go back to the code that almost works and take it apart until we understand its structural dependencies and edge conditions.",
  },
  {
    index: "02",
    word: "REIMAGINE",
    subtitle: "Deterministic Engineering",
    body: "Blueprint before build. We map the data flow, failure modes, and microservices — then design a resilient system that holds up under real production load.",
  },
  {
    index: "03",
    word: "REALIZE",
    subtitle: "Autonomous Scale",
    body: "We ship it, we run it, and we hand over verified ownership. Production-ready software, stress-tested and documented, completely owned by your team.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative border-t border-black/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">

        <ScrollText
          className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl drop-shadow-sm"
          from={0.3}
        >
          Somebody has to do the unglamorous part of software:{" "}
          <span className="text-petrol">the part that actually works.</span>
        </ScrollText>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {PREMISE.map((p, i) => (
            <GsapReveal key={p.word} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-petrol/40 hover:bg-white shadow-xl">
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
                    <span className="font-mono text-xs font-bold text-petrol">{p.index}</span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted">{p.subtitle}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-petrol">
                    {p.word}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.body}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-black/5 font-mono text-[10px] text-petrol font-medium">
                  STANDARD // ENFORCED
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
