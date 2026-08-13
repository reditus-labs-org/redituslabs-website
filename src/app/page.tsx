"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { TechStrip } from "@/components/technology-strip/TechStrip";
import { Services } from "@/components/services/Services";
import { VibeCodeRescue } from "@/components/vibe-code-rescue/VibeCodeRescue";
import { Projects } from "@/components/projects/Projects";
import { Process } from "@/components/process/Process";
import { Metrics } from "@/components/metrics/Metrics";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { InquiryModal } from "@/components/modal/InquiryModal";

export default function Home() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [initialInquiryType, setInitialInquiryType] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (initialType?: string) => {
    setInitialInquiryType(initialType);
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
    setInitialInquiryType(undefined);
  };

  return (
    <main className="min-h-screen bg-bone text-deep-ink selection:bg-petrol selection:text-bone">
      {/* 01 Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* 02 Hero Section */}
      <Hero onOpenInquiry={handleOpenInquiry} />

      {/* 03 Technology Strip */}
      <TechStrip />

      {/* 04 Services Section */}
      <Services onOpenInquiry={handleOpenInquiry} />

      {/* 05 Vibe-Code Rescue Feature */}
      <VibeCodeRescue onOpenInquiry={handleOpenInquiry} />

      {/* 06 Featured Work */}
      <Projects onOpenInquiry={handleOpenInquiry} />

      {/* 07 Process Section */}
      <Process />

      {/* 08 Metrics / Trust Section */}
      <Metrics />

      {/* 09 Testimonials Section */}
      <Testimonials />

      {/* 10 Final CTA */}
      <FinalCTA onOpenInquiry={handleOpenInquiry} />

      {/* 11 Footer */}
      <Footer />

      {/* 12 Interactive Project & Vibe-Rescue Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        initialType={initialInquiryType}
      />
    </main>
  );
}
