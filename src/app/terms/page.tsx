"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { InquiryModal } from "@/components/modal/InquiryModal";
import { FileText, ShieldAlert, ArrowLeft, CheckCircle2, ChevronRight, Scale } from "lucide-react";

export default function TermsOfService() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services-scope", title: "2. Services & Statements of Work" },
    { id: "intellectual-property", title: "3. Intellectual Property Rights" },
    { id: "vibe-rescue-terms", title: "4. Vibe-Code Rescue Special Terms" },
    { id: "payment-terms", title: "5. Payment, Fees & Invoicing" },
    { id: "client-responsibilities", title: "6. Client Responsibilities" },
    { id: "warranties-disclaimers", title: "7. Warranties & Disclaimers" },
    { id: "limitation-liability", title: "8. Limitation of Liability" },
    { id: "confidentiality", title: "9. Confidentiality & NDA" },
    { id: "termination", title: "10. Termination & Governing Law" },
  ];

  return (
    <main className="min-h-screen bg-bone text-deep-ink selection:bg-petrol selection:text-bone">
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-bone border-b border-graphite/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-lines pointer-events-none opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-petrol hover:text-petrol-hover mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-petrol bg-petrol/10 border border-petrol/30 px-3 py-1">
              <Scale className="w-3.5 h-3.5" />
              <span>LEGAL AGREEMENT // TERMS OF SERVICE</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-deep-ink">
              Terms of Service
            </h1>

            <p className="font-sans text-base text-graphite-muted leading-relaxed">
              Last Updated: August 14, 2026 · Effective Date: August 14, 2026
            </p>
          </div>

        </div>
      </section>

      {/* Content Layout */}
      <section className="py-16 bg-bone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 bg-bone-card border border-graphite/20 p-6 space-y-4">
                <div className="font-mono text-xs font-bold text-petrol uppercase tracking-wider border-b border-graphite/15 pb-3">
                  TABLE OF CONTENTS
                </div>
                <nav className="space-y-2 font-mono text-xs">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-graphite hover:text-petrol py-1 transition-colors flex items-center justify-between group"
                    >
                      <span>{s.title}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-petrol transition-opacity" />
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Terms Body */}
            <div className="lg:col-span-8 space-y-12 font-sans text-sm text-graphite leading-relaxed">
              
              {/* Section 1 */}
              <div id="acceptance" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  1. Acceptance of Terms
                </h2>
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Client&rdquo;, &ldquo;User&rdquo;, or &ldquo;you&rdquo;) and <strong>REDITUS Agency</strong> (&ldquo;REDITUS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
                </p>
                <p>
                  By accessing our website (<code className="font-mono text-xs bg-bone-card px-1.5 py-0.5 border border-graphite/20 text-petrol">reditus.dev</code>), executing a Statement of Work (SOW), or engaging REDITUS for custom web development, software engineering, AI pipeline construction, SaaS product development, or Vibe-Code Rescue services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>

              {/* Section 2 */}
              <div id="services-scope" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  2. Services &amp; Statements of Work (SOW)
                </h2>
                <p>
                  REDITUS provides software engineering and technological transformation services. Specific project scope, timelines, deliverables, milestones, and fees will be documented in a mutually executed Statement of Work (SOW) or Proposal.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Core Service Categories:</strong> Web &amp; Digital Development, Custom Software Applications, AI Pipelines &amp; Tools, SaaS Products, and Vibe-Code Rescue &amp; Re-engineering.</li>
                  <li><strong>Scope Adjustments &amp; Change Orders:</strong> Any requested modifications to approved project deliverables will require a written Change Order detailing impact on cost and delivery timeline.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="intellectual-property" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8 bg-bone-card border border-graphite/20 p-6 rounded-xs">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  3. Intellectual Property Rights
                </h2>
                <h3 className="font-display font-bold text-lg text-petrol pt-1">A. Full Client Ownership of Deliverables</h3>
                <p>
                  Upon full payment of all fees due under the applicable Statement of Work, <strong>Client owns 100% of all custom source code, application architecture, UI/UX designs, and deliverables</strong> created specifically for Client by REDITUS.
                </p>

                <h3 className="font-display font-bold text-lg text-petrol pt-2">B. Pre-existing Agency Assets</h3>
                <p>
                  REDITUS retains ownership of its pre-existing developer tools, internal boilerplate code, modular design systems, and open-source utility libraries. REDITUS grants Client a perpetual, worldwide, royalty-free, non-exclusive license to use, modify, and distribute any pre-existing assets incorporated into final deliverables.
                </p>
              </div>

              {/* Section 4 */}
              <div id="vibe-rescue-terms" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8 bg-seafoam/10 border border-seafoam-dark p-6 rounded-xs">
                <div className="flex items-center gap-2 text-petrol font-mono text-xs font-bold uppercase">
                  <ShieldAlert className="w-4 h-4 text-petrol" />
                  <span>4. Vibe-Code Rescue &amp; Re-engineering Special Terms</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  Vibe-Code Audit &amp; Technical Debt Terms
                </h2>
                <p>
                  For projects involving <strong>Vibe-Code Rescue</strong> (taking prototypes or applications built via AI coding assistants such as Cursor, v0, Bolt, Lovable, Replit, Claude, or ChatGPT and re-engineering them for production):
                </p>
                <ul className="list-disc pl-5 space-y-2 text-deep-ink">
                  <li><strong>Initial Audit &amp; Discovery:</strong> REDITUS performs a comprehensive technical audit of submitted prototypes to identify architecture flaws, memory leaks, security vulnerabilities, and unscalable dependencies.</li>
                  <li><strong>Legacy Code Disclaimer:</strong> REDITUS accepts no liability for system crashes, data corruption, or third-party license violations resulting from legacy vibe-coded prototypes prior to REDITUS&apos;s refactoring and production hardening.</li>
                  <li><strong>Production Readiness Guarantee:</strong> Refactored modules delivered by REDITUS under an SOW are guaranteed to adhere to enterprise security, performance, and maintainability standards.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div id="payment-terms" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  5. Payment, Fees &amp; Invoicing
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Payment Schedule:</strong> Projects typically require an initial deposit upon SOW execution, followed by milestone-based or bi-weekly invoices as outlined in the contract.</li>
                  <li><strong>Invoice Terms:</strong> Invoices are payable within fourteen (14) calendar days of issue date unless otherwise agreed in writing.</li>
                  <li><strong>Late Payments:</strong> Overdue invoices accrue interest at 1.5% per month or the maximum rate permitted by law. REDITUS reserves the right to pause active engineering work on accounts with overdue balances exceeding 30 days.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="client-responsibilities" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  6. Client Responsibilities &amp; Cooperation
                </h2>
                <p>Client agrees to facilitate project progress by:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Providing timely access to required third-party API keys, cloud hosting credentials, and design assets.</li>
                  <li>Designating a primary point of contact for sprint sign-offs and feedback reviews within agreed timelines.</li>
                  <li>Ensuring that all client-supplied assets (data, media, trademarks) do not infringe third-party IP rights.</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div id="warranties-disclaimers" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  7. Warranties &amp; 60-Day Post-Launch Warranty
                </h2>
                <p>
                  <strong>60-Day Bug-Fix Warranty:</strong> REDITUS warrants that all custom code delivered will perform substantially in accordance with approved specifications for a period of sixty (60) days following production launch. During this period, REDITUS will repair any reproducible software bugs or defects caused by REDITUS code at no additional charge.
                </p>
                <p className="text-xs text-graphite-muted pt-1">
                  EXCEPT AS EXPRESSLY STATED IN AN SOW, SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                </p>
              </div>

              {/* Section 8 */}
              <div id="limitation-liability" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  8. Limitation of Liability
                </h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL REDITUS BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION). REDITUS&apos;S TOTAL AGGREGATE LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS OR ANY SOW SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT TO REDITUS UNDER THE APPLICABLE SOW IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </div>

              {/* Section 9 */}
              <div id="confidentiality" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  9. Confidentiality &amp; Mutual NDA
                </h2>
                <p>
                  Both parties agree to treat all non-public information, source code, business strategies, technical designs, and financial terms shared during the engagement as strictly confidential. Neither party shall disclose Confidential Information to third parties without prior written consent, except as required by law.
                </p>
              </div>

              {/* Section 10 */}
              <div id="termination" className="scroll-mt-32 space-y-4 bg-deep-ink text-bone p-6 rounded-xs border border-petrol">
                <h2 className="font-display font-bold text-2xl text-seafoam">
                  10. Termination &amp; Governing Law
                </h2>
                <p className="text-bone/80 text-xs">
                  Either party may terminate an active SOW for convenience with thirty (30) days written notice, or immediately upon written notice if the other party breaches a material term and fails to cure within fourteen (14) days. Upon termination, Client shall pay REDITUS for all work completed up to the effective termination date.
                </p>
                <div className="font-mono text-xs space-y-1 text-seafoam pt-2 border-t border-graphite-border">
                  <div><strong>GOVERNING LAW:</strong> Governed by the laws of the jurisdiction specified in the SOW.</div>
                  <div><strong>LEGAL INQUIRIES:</strong> legal@reditus.dev / hello@reditus.dev</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </main>
  );
}
