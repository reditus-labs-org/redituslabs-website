import { TECHNOLOGIES } from "@/lib/data/technologies";

export default function TechStrip() {
  return (
    <section
      aria-label="Technologies we work with"
      className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-heading text-sm font-semibold tracking-wide text-ink-muted">
        {TECHNOLOGIES.map((t, idx) => (
          <span key={t.id} className="inline-flex items-center gap-8">
            <span className="hover:text-ink transition-colors cursor-default">
              {t.name}
            </span>
            {idx < TECHNOLOGIES.length - 1 && (
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-petrol/60" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
