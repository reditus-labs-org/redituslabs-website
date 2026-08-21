"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { ReditusLogo } from "@/components/ui/ReditusLogo";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <footer id="contact" className="pt-24 pb-12 bg-[#0B1114] text-[#F1EDE3] border-t border-[#242C30] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Experience Slogan & Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#242C30]/50">
          
          {/* Left Column: Slogan & Newsletter */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12191d] text-[#A8E6CF] text-xs font-mono tracking-wider mb-6 border border-[#A8E6CF]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>REDITUS LABS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
                EXPERIENCE THE RETURN <br />
                OF <span className="text-[#087F8C]">WHAT&apos;S POSSIBLE</span>
              </h2>
              <p className="font-mono text-xs text-[#F1EDE3]/70 max-w-md leading-relaxed mb-8">
                Building scalable web apps, custom software architecture, AI pipelines, and high-performance digital products for modern enterprises.
              </p>
            </div>

            {/* Newsletter Subscription Bar */}
            <div className="p-4 rounded-2xl bg-[#12191d] border border-[#242C30] max-w-md">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email..."
                  required
                  className="flex-grow px-4 py-2.5 rounded-xl bg-[#0B1114] border border-[#242C30] text-[#F1EDE3] placeholder-[#F1EDE3]/40 font-mono text-xs focus:outline-none focus:border-[#087F8C]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#087F8C] hover:bg-[#066670] text-[#F1EDE3] font-display text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer border border-[#A8E6CF]/30 shrink-0"
                >
                  {subscribed ? (
                    <Check className="w-4 h-4 text-[#A8E6CF]" />
                  ) : (
                    <>
                      <span>JOIN</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A8E6CF]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Columns: Product & Resources */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Services */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#A8E6CF] tracking-widest uppercase mb-4">
                SERVICES
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#F1EDE3]/70">
                <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">Web Applications</a></li>
                <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">Product Design</a></li>
                <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">AI Pipelines &amp; Agents</a></li>
                <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">Vibe-Code Rescue</a></li>
                <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">SaaS Platforms</a></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="font-mono text-xs font-bold text-[#A8E6CF] tracking-widest uppercase mb-4">
                RESOURCES
              </h3>
              <ul className="space-y-3 font-mono text-xs text-[#F1EDE3]/70">
                <li><a href="#work" className="hover:text-[#A8E6CF] transition-colors">Case Studies</a></li>
                <li><a href="#pricing" className="hover:text-[#A8E6CF] transition-colors">Retainers &amp; Pricing</a></li>
                <li><a href="#reviews" className="hover:text-[#A8E6CF] transition-colors">Client Reviews</a></li>
                <li><a href="/terms" className="hover:text-[#A8E6CF] transition-colors">Engineering Docs</a></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-mono text-xs font-bold text-[#B99A5B] tracking-widest uppercase mb-4">
                CONTACT
              </h3>
              <div className="space-y-3 font-mono text-xs text-[#F1EDE3]/70">
                <a href="mailto:hello@reditus.agency" className="block text-[#A8E6CF] hover:underline font-bold">
                  hello@reditus.agency
                </a>
                <p>(+1) 800-455-800</p>
                <p className="text-[10px] text-[#F1EDE3]/50">NEW YORK • SINGAPORE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: MASSIVE Creative Full-Width "Reditus Labs" Typography */}
        <div className="py-12 text-center overflow-hidden border-b border-[#242C30]/50 select-none group">
          <h1 className="text-[14vw] sm:text-[15vw] leading-none font-pixel font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#F1EDE3] via-[#F1EDE3]/90 to-[#087F8C]/60 hover:from-[#A8E6CF] hover:to-[#087F8C] transition-all duration-700 transform group-hover:scale-[1.01] drop-shadow-[0_10px_30px_rgba(8,127,140,0.2)]">
            Reditus Labs
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#F1EDE3]/50">
          <div className="flex items-center gap-3">
            <ReditusLogo size="sm" />
            <span>© {new Date().getFullYear()} REDITUS LABS. ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-[#A8E6CF] transition-colors">TERMS &amp; CONDITIONS</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-[#A8E6CF] transition-colors">PRIVACY POLICY</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
