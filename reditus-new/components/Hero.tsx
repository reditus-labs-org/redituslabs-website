"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Activity, Zap, ShieldCheck } from "lucide-react";
import { useInquiry } from "./InquiryContext";
import ScrollText from "./ScrollText";

export default function Hero() {
  const { open } = useInquiry();
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-transparent pt-32 sm:pt-40 pb-16">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 w-full">
        {/* Headline */}
        <div className="pb-12 pt-6 text-center sm:pb-16 sm:pt-10">
          <h1 className="font-display font-bold leading-[0.92] tracking-tight text-ink drop-shadow-sm">
            <ScrollText as="span" from={0.3} className="block text-[clamp(3.5rem,12vw,9.5rem)] text-ink">
              We build
            </ScrollText>
            <ScrollText as="span" from={0.3} className="block text-[clamp(3.5rem,12vw,9.5rem)] text-petrol">
              what&apos;s possible.
            </ScrollText>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            REDITUS is a technology engineering agency. We design, build, and
            scale high-performance web systems, AI pipelines, and SaaS platforms — and we
            turn vibe-coded applications into production-grade software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => open()}
              className="inline-flex items-center gap-2 rounded-lg border border-ink bg-ink px-8 py-4 font-heading text-xs font-bold tracking-wider text-white transition-all hover:bg-petrol hover:border-petrol cursor-pointer shadow-lg shadow-black/10"
            >
              START A PROJECT <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white/70 px-8 py-4 font-heading text-xs font-bold tracking-wider text-ink backdrop-blur-md transition-colors hover:border-black/30 hover:bg-white shadow-sm"
            >
              EXPLORE ARCHITECTURE
            </a>
          </motion.div>
        </div>

        {/* Live Telemetry Floating Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl"
        >
          <div className="grid gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/10">
            <div className="flex items-center gap-4 sm:pr-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-petrol/20 bg-petrol/10 text-petrol">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-ink">&lt;350ms</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-muted">Pipeline Latency</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-petrol/20 bg-petrol/10 text-petrol">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-petrol">99.99%</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-muted">Production Uptime</div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-petrol/20 bg-petrol/10 text-petrol">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-ink">Full-Stack</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-muted">AI &amp; Cloud Infra</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 flex justify-center pb-6">
          <a
            href="#manifesto"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted transition-colors hover:text-petrol"
          >
            Scroll Down
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
