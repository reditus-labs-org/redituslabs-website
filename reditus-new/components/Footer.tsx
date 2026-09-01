import Logo from "./Logo";

const NAV = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

const SERVICES = [
  "Web & Digital",
  "Software & Apps",
  "AI Pipelines & Tools",
  "SaaS Products",
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              A technology engineering agency building websites, software, AI
              pipelines, and SaaS products. We build what&apos;s possible.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Return · Reimagine · Realize
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-ink-soft hover:text-petrol transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-ink-soft hover:text-petrol transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-ink-muted">
            © {new Date().getFullYear()} REDITUS Labs. All rights reserved.
          </p>
          <div className="flex gap-6 font-mono text-[11px] text-ink-muted">
            <a href="#top" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#top" className="hover:text-ink transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
