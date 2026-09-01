"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { useInquiry } from "./InquiryContext";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "New Software Build",
  "Vibe-Code Rescue",
  "AI Pipeline / Agent",
  "SaaS Platform",
  "Web & Digital",
];

const BUDGETS = ["< $10k", "$10k - $25k", "$25k - $50k", "$50k+"];
const TIMELINES = ["Immediate / Urgent", "1-2 Months", "3+ Months"];

function mapPreset(preset: string): string {
  if (!preset) return "New Software Build";
  const match = PROJECT_TYPES.find((t) => t.toLowerCase() === preset.toLowerCase());
  if (match) return match;
  if (/softw|app|software/i.test(preset)) return "New Software Build";
  if (/ai|pipeline|agent/i.test(preset)) return "AI Pipeline / Agent";
  if (/saas|product/i.test(preset)) return "SaaS Platform";
  if (/web|digital|site/i.test(preset)) return "Web & Digital";
  if (/rescue|vibe|coded/i.test(preset)) return "Vibe-Code Rescue";
  return "New Software Build";
}

export default function InquiryModal() {
  const { isOpen, close, preset } = useInquiry();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input, select, button")?.focus();
    }, 60);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Project inquiry"
        >
          <motion.div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-8 w-full max-w-2xl border border-line bg-canvas"
          >
            <button
              onClick={close}
              aria-label="Close modal"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center border border-line text-ink-soft transition-colors hover:border-petrol hover:text-petrol"
            >
              <X className="h-4 w-4" />
            </button>
            <ModalContent
              key={isOpen ? `open-${preset}` : "closed"}
              preset={preset}
              onClose={close}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full border border-line bg-panel px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-petrol focus:outline-none";

function ModalContent({
  preset,
  onClose,
}: {
  preset: string;
  onClose: () => void;
}) {
  const [projectType, setProjectType] = useState(
    () => mapPreset(preset),
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$10k - $25k",
    timeline: "1-2 Months",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="relative p-6 sm:p-10">
      {submitted ? (
        <div className="space-y-5 py-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center border border-petrol bg-petrol/10 text-petrol">
            <Check className="h-8 w-8" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-petrol">
            [ INQUIRY_RECEIVED // STATUS: QUEUED ]
          </p>
          <h3 className="font-display text-3xl font-bold text-ink">
            We&apos;ve got your specs.
          </h3>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-soft">
            Our engineering team is reviewing your requirements. We will
            analyze your architecture and respond within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 border border-petrol bg-petrol px-6 py-3 font-heading text-xs font-bold tracking-wider text-canvas transition-colors hover:bg-petrol/90"
          >
            RETURN TO WEBSITE <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 space-y-2 border-b border-line pb-5">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-petrol">
              PROJECT INQUIRY &amp; DISCOVERY
            </p>
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Let&apos;s build what&apos;s possible.
            </h3>
            <p className="text-xs leading-relaxed text-ink-soft">
              Have an idea, an unfinished product, or something that almost
              works? Let&apos;s turn it into something real.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block font-mono text-[11px] font-semibold tracking-wider text-ink">
                PROJECT CATEGORY
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProjectType(t)}
                    className={cn(
                      "cursor-pointer border p-2.5 text-left font-mono text-[11px] transition-colors",
                      projectType === t
                        ? "border-petrol bg-petrol font-semibold text-canvas"
                        : "border-line text-ink-soft hover:border-petrol hover:text-ink",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="YOUR NAME *">
                <input
                  required
                  type="text"
                  placeholder="Alex Mercer"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="WORK EMAIL *">
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="COMPANY / ORG">
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="BUDGET RANGE">
                <select
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                  className={cn(inputCls, "appearance-none")}
                >
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="TIMELINE">
                <select
                  value={form.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                  className={cn(inputCls, "appearance-none")}
                >
                  {TIMELINES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="PROJECT SUMMARY & GOALS *">
              <textarea
                required
                rows={3}
                placeholder="Tell us what you want to build or what needs to be fixed..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={cn(inputCls, "resize-none")}
              />
            </Field>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 border border-petrol bg-petrol px-6 py-4 font-heading text-xs font-bold tracking-wider text-canvas transition-colors hover:bg-petrol/90"
            >
              START YOUR PROJECT <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[11px] font-semibold tracking-wider text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
