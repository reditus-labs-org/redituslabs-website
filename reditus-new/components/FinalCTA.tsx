"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "./InquiryContext";
import ScrollText from "./ScrollText";

export default function FinalCTA() {
  const { open } = useInquiry();
  const reduced = useReducedMotion();

  return (
    <section id="final-cta" className="relative overflow-hidden border-t border-black/10 bg-transparent py-24 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-8 sm:p-20 text-center backdrop-blur-2xl shadow-2xl">
          <ScrollText
            className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl drop-shadow-sm"
            from={0.3}
          >
            Got an app that <span className="text-petrol">almost works?</span>
            <br />
            Let&apos;s make it real.
          </ScrollText>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            Vibe-coded prototype, stalled product, or an idea that needs real
            engineering. Tell us what you&apos;re building. We&apos;ll respond
            within 24 hours with an actionable blueprint.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => open("Vibe-Code Rescue")}
              className="inline-flex items-center gap-2 rounded-lg border border-ink bg-ink px-8 py-4 font-heading text-xs font-bold tracking-wider text-white transition-all hover:bg-petrol hover:border-petrol cursor-pointer shadow-lg shadow-black/10"
            >
              START YOUR PROJECT <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href="mailto:hello@redituslabs.com"
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-black/5 px-8 py-4 font-heading text-xs font-bold tracking-wider text-ink backdrop-blur-md transition-colors hover:border-black/30 hover:bg-black/10"
            >
              HELLO@REDITUSLABS.COM
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
