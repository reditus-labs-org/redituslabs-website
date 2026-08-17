"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-deep-ink text-bone pt-16 pb-12 border-t border-graphite/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-graphite-border">

          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-petrol text-bone font-display font-bold text-lg flex items-center justify-center">
                R
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-bone">
                REDITUS
              </span>
            </Link>

            <p className="font-mono text-xs text-seafoam tracking-widest uppercase font-bold">
              RETURN. REIMAGINE. REALIZE.
            </p>

            <p className="font-sans text-xs text-graphite-muted max-w-sm leading-relaxed pt-1">
              The return of what&apos;s possible. Premium software engineering agency building products from scratch and transforming vibe-coded applications into production-ready systems.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3 font-mono text-xs">
            <div className="font-bold text-seafoam uppercase tracking-wider mb-2">
              COMPANY
            </div>
            <ul className="space-y-2 text-bone/70">
              <li><a href="#hero" className="hover:text-petrol transition-colors">About Us</a></li>
              <li><a href="#process" className="hover:text-petrol transition-colors">Our Process</a></li>
              <li><a href="#metrics" className="hover:text-petrol transition-colors">Careers</a></li>
              <li><a href="#testimonials" className="hover:text-petrol transition-colors">Blog &amp; Insights</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3 font-mono text-xs">
            <div className="font-bold text-seafoam uppercase tracking-wider mb-2">
              SERVICES
            </div>
            <ul className="space-y-2 text-bone/70">
              <li><a href="#services" className="hover:text-petrol transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-petrol transition-colors">Software Development</a></li>
              <li><a href="#services" className="hover:text-petrol transition-colors">AI Pipelines &amp; Tools</a></li>
              <li><a href="#services" className="hover:text-petrol transition-colors">SaaS Development</a></li>
              <li><a href="#vibe-rescue" className="hover:text-petrol transition-colors text-petrol font-semibold">Vibe-Code Rescue</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <div className="font-mono text-xs font-bold text-seafoam uppercase tracking-wider">
              STAY IN THE LOOP
            </div>
            <p className="font-sans text-xs text-graphite-muted leading-relaxed">
              Get insights on AI, engineering and building digital products.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 font-mono text-xs text-seafoam bg-seafoam/10 border border-seafoam/30 p-2.5">
                <Check className="w-4 h-4 text-seafoam" />
                <span>SUBSCRIBED TO INSIGHTS</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-graphite/60 border border-graphite-border text-bone placeholder:text-graphite-muted text-xs px-3 py-2.5 w-full focus:outline-hidden focus:border-petrol font-mono"
                />
                <button
                  type="submit"
                  className="bg-petrol text-bone hover:bg-petrol-hover px-4 py-2.5 border border-petrol transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-graphite-muted gap-4">
          <div>
            © 2026 REDITUS. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-bone transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-bone transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
