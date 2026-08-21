"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSpotlight } from "@/components/hero/HeroSpotlight";
import { SolutionsBento } from "@/components/metrics/SolutionsBento";
import { PortfolioShowcase } from "@/components/projects/PortfolioShowcase";
import { PricingGrid } from "@/components/pricing/PricingGrid";
import { TestimonialSpotlight } from "@/components/testimonials/TestimonialSpotlight";
import { FooterNewsletter } from "@/components/footer/FooterNewsletter";
import { InquiryModal } from "@/components/modal/InquiryModal";

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (initialType?: string) => {
    setInquiryType(initialType);
    setIsInquiryOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#0B1114] text-[#F1EDE3] font-display overflow-x-hidden selection:bg-[#087F8C] selection:text-[#F1EDE3]">
      {/* Sleek Floating Header Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Section 1: Hero Stage & Floating Badges */}
      <HeroSpotlight onOpenInquiry={handleOpenInquiry} />

      {/* Section 2: Creative Solutions Stats Bento Grid */}
      <SolutionsBento />

      {/* Section 3: Featured Work Showcase */}
      <PortfolioShowcase />

      {/* Section 4: Flexible Pricing Retainer Tiers */}
      <PricingGrid onOpenInquiry={handleOpenInquiry} />

      {/* Section 5: Editorial Testimonials & Pixel Grid */}
      <TestimonialSpotlight />

      {/* Section 6: Footer & Newsletter Conversion */}
      <FooterNewsletter />

      {/* Global Interactive Project Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialType={inquiryType}
      />
    </main>
  );
}