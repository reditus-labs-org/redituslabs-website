"use client";

import React from "react";
import { SERVICES, ServiceItem } from "@/data/services";
import { ArrowRight, Check } from "lucide-react";
import { BrokenDoubleBorder, DecorativePill } from "@/components/ascii/DecorativeLines";
import {
  WebDigitalIllustration,
  SoftwareAppsIllustration,
  AIPipelinesIllustration,
  SaaSProductsIllustration,
} from "./ServiceIllustrations";

interface ServicesProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function Services({ onOpenInquiry }: ServicesProps) {
  const renderIllustration = (type: ServiceItem["visualType"]) => {
    switch (type) {
      case "isometric-web":
        return <WebDigitalIllustration />;
      case "stacked-blocks":
        return <SoftwareAppsIllustration />;
      case "ai-network":
        return <AIPipelinesIllustration />;
      case "saas-blocks":
        return <SaaSProductsIllustration />;
    }
  };

  return (
    <section id="services" className="py-24 bg-bone relative border-b border-graphite/15 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-20" aria-hidden="true">
        <DecorativePill className="w-56 h-auto" color="#087F8C" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-petrol inline-block"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-petrol uppercase">
              WHAT WE DO
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep-ink leading-tight">
            Engineering the future. <br />
            Solving today&apos;s problems.
          </h2>

          <p className="font-sans text-base sm:text-lg text-graphite-muted leading-relaxed pt-2">
            From high-performance websites to AI pipelines and SaaS platforms — we design, build and scale solutions that are future-ready.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-bone-card p-9 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Aesthetic Broken Double Border Overlay (Asymmetrical, No Diamonds) */}
              <BrokenDoubleBorder />

              {/* Top Bar with Number & Category */}
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-graphite/15 pb-4 mb-6">
                  <span className="font-mono font-bold text-lg text-petrol">
                    SERVICE {service.number}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-graphite-muted uppercase bg-bone px-2.5 py-1 border border-graphite/10">
                    {service.category}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h3 className="font-display font-bold text-2xl text-deep-ink mb-3 group-hover:text-petrol transition-colors">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-graphite-muted leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Visual Illustration Container */}
                <div className="my-6 flex items-center justify-center relative w-full overflow-hidden">
                  {renderIllustration(service.visualType)}
                </div>

                {/* Feature Bullet points */}
                <ul className="space-y-2 mb-8 font-sans text-xs text-graphite">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-petrol shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA Button */}
              <div className="pt-4 border-t border-graphite/10 relative z-10">
                <button
                  onClick={() => onOpenInquiry(service.id)}
                  className="w-full bg-bone hover:bg-petrol hover:text-bone text-deep-ink border border-graphite/30 hover:border-petrol py-3 px-4 font-display text-xs font-bold tracking-wider flex items-center justify-between transition-all duration-200 cursor-pointer"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
