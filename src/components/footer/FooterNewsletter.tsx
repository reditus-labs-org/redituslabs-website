"use client";

import React, { useState } from "react";
import { ArrowRight, Send, Check } from "lucide-react";
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
    }, 2000);
  };

  return (
    <footer id="contact" className="py-20 bg-[#0B1114] text-[#F1EDE3] border-t border-[#242C30] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner & Studio Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#242C30]">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              SMART STRATEGY AND CREATIVE <br />
              <span className="text-[#087F8C]">DESIGN CRAFTED</span> TO BRING YOUR <br />
              BRAND VISION TO LIFE
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end font-mono text-xs text-[#F1EDE3]/80 space-y-2">
            <a href="mailto:hello@reditus.agency" className="hover:text-[#A8E6CF] transition-colors font-bold text-sm">
              HELLO@REDITUS.AGENCY
            </a>
            <p>(+1) 800-455-800</p>
            <p className="text-[#A8E6CF]">NEW YORK • LONDON • SINGAPORE</p>
          </div>
        </div>

        {/* Links Columns & Newsletter Signup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-[#242C30]">
          {/* Brand Info */}
          <div className="md:col-span-3">
            <ReditusLogo size="md" />
            <p className="font-mono text-xs text-[#F1EDE3]/60 mt-4 leading-relaxed">
              REDITUS is a high-performance software engineering agency building production web apps, AI tools, and scalable digital products.
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs font-bold text-[#A8E6CF] tracking-widest uppercase mb-4">
              SERVICES
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-[#F1EDE3]/70">
              <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">BRANDING STRATEGY</a></li>
              <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">WEB DESIGN</a></li>
              <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">WEB DEVELOPMENT</a></li>
              <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">AI PIPELINES</a></li>
              <li><a href="#solutions" className="hover:text-[#A8E6CF] transition-colors">PRODUCT DESIGN</a></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs font-bold text-[#A8E6CF] tracking-widest uppercase mb-4">
              SUPPORT
            </h3>
            <ul className="space-y-2.5 font-mono text-xs text-[#F1EDE3]/70">
              <li><a href="#contact" className="hover:text-[#A8E6CF] transition-colors">CONTACT US</a></li>
              <li><a href="#pricing" className="hover:text-[#A8E6CF] transition-colors">PRICING & PACKAGES</a></li>
              <li><a href="/terms" className="hover:text-[#A8E6CF] transition-colors">TERMS & POLICIES</a></li>
              <li><a href="/privacy" className="hover:text-[#A8E6CF] transition-colors">PRIVACY POLICY</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter Box */}
          <div className="md:col-span-5">
            <div className="p-6 rounded-3xl bg-[#12191d] border border-[#242C30]">
              <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-2">
                JOIN THE LIST
              </h3>
              <p className="font-mono text-xs text-[#F1EDE3]/70 mb-6">
                SIGN UP TO GET THE LATEST INSIGHTS, CASE STUDIES AND UPDATES FROM OUR DIGITAL AGENCY.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL"
                  required
                  className="flex-grow px-4 py-3 rounded-full bg-[#0B1114] border border-[#242C30] text-[#F1EDE3] placeholder-[#F1EDE3]/40 font-mono text-xs focus:outline-none focus:border-[#087F8C]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#087F8C] hover:bg-[#066670] text-[#F1EDE3] font-display text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#A8E6CF]/30 shrink-0"
                >
                  {subscribed ? (
                    <>
                      <span>SUBSCRIBED</span>
                      <Check className="w-4 h-4 text-[#A8E6CF]" />
                    </>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight className="w-4 h-4 text-[#A8E6CF]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#F1EDE3]/50">
          <div>© {new Date().getFullYear()} REDITUS AGENCY. ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-[#A8E6CF] transition-colors">TERMS & CONDITIONS</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-[#A8E6CF] transition-colors">PRIVACY POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
