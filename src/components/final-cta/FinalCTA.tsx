"use client";

import React from "react";
import { ArrowRight, Mail, MapPin, Globe } from "lucide-react";

interface FinalCTAProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function FinalCTA({ onOpenInquiry }: FinalCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-seafoam/20 via-bone to-seafoam-light relative overflow-hidden border-b border-graphite/20">

      {/* Background Architectural Watermark SVG */}
      <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] pointer-events-none opacity-15">
        <svg viewBox="0 0 500 500" className="w-full h-full text-petrol stroke-current fill-none stroke-2">
          <path d="M 190 90 L 240 120 L 240 420 L 190 390 Z" />
          <path d="M 240 120 L 350 180 L 350 250 L 240 190 Z" />
          <path d="M 240 270 L 360 410 L 310 440 L 190 300 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-petrol bg-petrol/10 border border-petrol/30 px-3 py-1.5 rounded-xs">
            <span>READY TO BUILD</span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-deep-ink leading-tight">
            Let&apos;s build what&apos;s <br />
            <span className="text-petrol">possible. Together.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="font-sans text-base sm:text-lg text-graphite-muted max-w-xl mx-auto leading-relaxed">
            Share your idea and let&apos;s create something extraordinary.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onOpenInquiry("cta")}
              className="group bg-petrol text-bone hover:bg-petrol-hover px-9 py-5 font-display text-sm font-bold tracking-wider flex items-center gap-3 transition-all duration-200 shadow-xl border border-petrol cursor-pointer"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Contact Info & Location Strip */}
          <div className="pt-12 border-t border-graphite/20 flex flex-wrap items-center justify-between gap-6 text-sm font-mono">
            <div className="flex items-center gap-2 text-deep-ink font-semibold">
              <Mail className="w-4 h-4 text-petrol" />
              <span>hello@reditus.dev</span>
            </div>

            <div className="flex items-center gap-2 text-graphite-muted">
              <MapPin className="w-4 h-4 text-petrol" />
              <span>Remote · Global</span>
            </div>

            {/* Social Icons Inline SVGs */}
            <div className="flex items-center gap-5 text-graphite">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-petrol transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-petrol transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-petrol transition-colors" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-petrol transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
