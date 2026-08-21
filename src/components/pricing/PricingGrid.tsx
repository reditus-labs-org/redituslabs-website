"use client";

import React from "react";
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from "lucide-react";

interface PricingGridProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function PricingGrid({ onOpenInquiry }: PricingGridProps) {
  return (
    <section id="pricing" className="py-28 bg-[#F1EDE3] text-[#0B1114] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1114] text-[#A8E6CF] text-xs font-mono tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT SPRINT RETAINERS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-pixel font-bold tracking-tight uppercase leading-[0.92] text-[#0B1114] mb-6">
            FLEXIBLE PRICING FOR <br />
            <span className="text-[#087F8C]">CREATIVE SOLUTIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#242C30]/80 font-mono">
            Choose a retainer plan that fits your execution pace, designed to accelerate your products with dedicated engineering squads.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Standard */}
          <div className="p-8 rounded-3xl bg-[#ffffff] text-[#0B1114] border border-[#242C30]/20 shadow-md flex flex-col justify-between hover-glow-card transition-all duration-300">
            <div>
              <div className="font-display font-bold text-lg uppercase tracking-tight text-[#0B1114]">
                Standard
              </div>
              <p className="font-mono text-xs text-[#242C30]/70 mb-6">Best for MVP & design builds</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-display font-extrabold tracking-tight text-[#0B1114]">
                  $300
                </span>
                <span className="font-mono text-xs text-[#242C30]/70 uppercase font-semibold">/ SPRINT</span>
              </div>

              <ul className="space-y-4 mb-8 font-mono text-xs text-[#242C30]">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <span>Dedicated Senior Engineer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <span>1x Sprint / Week Updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <span>Frontend & Landing Page Build</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#087F8C] shrink-0" />
                  <span>Custom turnaround timeline</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenInquiry("Standard Plan")}
              className="w-full py-3.5 rounded-full bg-[#0B1114] hover:bg-[#242C30] text-[#F1EDE3] font-display text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              GET STARTED
            </button>
          </div>

          {/* Tier 2: Professional (Featured / Highlighted) */}
          <div className="relative p-8 rounded-3xl bg-[#087F8C] text-[#F1EDE3] border-2 border-[#A8E6CF] shadow-2xl flex flex-col justify-between hover-glow-card transition-all duration-300 transform md:-translate-y-4">
            {/* Most Popular Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#A8E6CF] text-[#0B1114] font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#087F8C]" />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <div className="font-display font-bold text-lg uppercase tracking-tight text-white mt-2">
                Professional
              </div>
              <p className="font-mono text-xs text-[#A8E6CF] mb-6">Ideal for scaling SaaS & AI products</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-display font-extrabold tracking-tight text-white">
                  $800
                </span>
                <span className="font-mono text-xs text-[#A8E6CF] uppercase font-semibold">/ SPRINT</span>
              </div>

              <ul className="space-y-4 mb-8 font-mono text-xs text-[#F1EDE3]">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                  <span>Full-Stack Web App Development</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                  <span>2x Sprint / Week Async Updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                  <span>UI/UX Architecture Included</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                  <span>Dedicated Engineering Squad</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#A8E6CF] shrink-0" />
                  <span>Priority Sprint Delivery</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenInquiry("Professional Plan")}
              className="w-full py-3.5 rounded-full bg-[#A8E6CF] hover:bg-[#7fd4b5] text-[#0B1114] font-display text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
            >
              GET STARTED
            </button>
          </div>

          {/* Tier 3: Enterprise Custom */}
          <div className="p-8 rounded-3xl bg-[#0B1114] text-[#F1EDE3] border border-[#242C30] shadow-md flex flex-col justify-between hover-glow-card transition-all duration-300">
            <div>
              <div className="font-display font-bold text-lg uppercase tracking-tight text-white">
                Senior Plan
              </div>
              <p className="font-mono text-xs text-[#B99A5B] mb-6">Tailored for custom requirements</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-display font-extrabold tracking-tight text-white">
                  Talk to Us!
                </span>
              </div>

              <ul className="space-y-4 mb-8 font-mono text-xs text-[#F1EDE3]/80">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#B99A5B] shrink-0" />
                  <span>Dedicated Full Squad (Lead + Dev + QA)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#B99A5B] shrink-0" />
                  <span>Custom Architecture & Security Audits</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#B99A5B] shrink-0" />
                  <span>Advanced AI Agent Integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#B99A5B] shrink-0" />
                  <span>Continuous 24/7 SLA Support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenInquiry("Custom Enterprise Plan")}
              className="w-full py-3.5 rounded-full bg-[#12191d] hover:bg-[#242C30] text-[#F1EDE3] font-display text-xs font-bold tracking-widest uppercase border border-[#242C30] transition-colors cursor-pointer"
            >
              TALK TO US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
