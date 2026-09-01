import GsapReveal from "./GsapReveal";

const METRICS = [
  { value: "98.4%", label: "Query accuracy" },
  { value: "<15ms", label: "Cached latency" },
  { value: "99.99%", label: "Uptime guarantee" },
  { value: "10x", label: "Processing speed" },
];

export default function Metrics() {
  return (
    <section className="relative border-t border-black/10 bg-transparent py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 sm:gap-6 sm:px-8 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <GsapReveal key={m.label} delay={i * 0.08} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-petrol/40 hover:bg-white shadow-xl">
              <span className="font-display text-4xl font-bold text-petrol sm:text-5xl">
                {m.value}
              </span>
              <span className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted font-medium">
                {m.label}
              </span>
            </div>
          </GsapReveal>
        ))}
      </div>
    </section>
  );
}
