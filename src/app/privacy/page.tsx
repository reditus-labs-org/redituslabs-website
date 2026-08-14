"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { InquiryModal } from "@/components/modal/InquiryModal";
import { Shield, Lock, FileText, ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const sections = [
    { id: "introduction", title: "1. Introduction & Overview" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "ai-data-security", title: "3. AI Data Security & Code Confidentiality" },
    { id: "use-of-information", title: "4. How We Use Information" },
    { id: "third-party", title: "5. Third-Party Services & Integrations" },
    { id: "retention-security", title: "6. Data Retention & Security Measures" },
    { id: "user-rights", title: "7. Your Rights & Compliance (GDPR / CCPA)" },
    { id: "contact", title: "8. Contact Information" },
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
              <Shield className="w-3.5 h-3.5" />
              <span>LEGAL DOCUMENTATION // COMPLIANCE</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-deep-ink">
              Privacy Policy
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

            {/* Main Policy Body */}
            <div className="lg:col-span-8 space-y-12 font-sans text-sm text-graphite leading-relaxed">
              
              {/* Section 1 */}
              <div id="introduction" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  1. Introduction &amp; Overview
                </h2>
                <p>
                  At <strong>REDITUS Agency</strong> (&ldquo;REDITUS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your privacy and are committed to protecting the personal data, proprietary source code, technical assets, and AI dataset inputs shared with us.
                </p>
                <p>
                  This Privacy Policy explains how REDITUS collects, uses, discloses, and safeguards your information when you visit our official website (<code className="font-mono text-xs bg-bone-card px-1.5 py-0.5 border border-graphite/20 text-petrol">reditus.dev</code>), engage our technology engineering services (including Web &amp; Digital Development, Custom Software Applications, AI Pipelines &amp; Tools, SaaS Products, and Vibe-Code Rescue &amp; Re-engineering), or interact with our team.
                </p>
              </div>

              {/* Section 2 */}
              <div id="collection" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  2. Information We Collect
                </h2>
                <p>
                  We collect information to deliver high-performance software engineering services, assess project requirements, and maintain secure communication with our clients.
                </p>
                
                <h3 className="font-display font-bold text-lg text-deep-ink pt-2">A. Information Provided Voluntarily</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Contact &amp; Inquiry Details:</strong> Full name, corporate email address, phone number, company name, and job title when submitting project inquiries or newsletter subscriptions.</li>
                  <li><strong>Project Specifications &amp; Vibe-Code Details:</strong> Project descriptions, budget ranges, target timelines, existing product repository URLs, and details regarding vibe-coding tools used (e.g., Cursor, v0, Bolt, Lovable, Replit, Claude, ChatGPT).</li>
                  <li><strong>Codebase &amp; Infrastructure Credentials:</strong> Source code repositories, API keys, database credentials, or server access grants provided under mutual confidentiality agreements during engineering sprints or project audits.</li>
                </ul>

                <h3 className="font-display font-bold text-lg text-deep-ink pt-2">B. Automatically Collected Technical Data</h3>
                <p>
                  When navigating our website, standard web server logs collect IP addresses, browser types, operating system details, referring URLs, access timestamps, and device analytics to optimize site performance and security.
                </p>
              </div>

              {/* Section 3 */}
              <div id="ai-data-security" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8 bg-seafoam/10 border border-seafoam-dark p-6 rounded-xs">
                <div className="flex items-center gap-2 text-petrol font-mono text-xs font-bold uppercase">
                  <Lock className="w-4 h-4 text-petrol" />
                  <span>3. AI Data Security &amp; Code Confidentiality (CRITICAL GUARANTEE)</span>
                </div>
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  Strict Confidentiality for Code &amp; AI Data
                </h2>
                <p className="text-deep-ink font-medium">
                  We understand that your software algorithms, application prototypes, and proprietary datasets represent vital business IP. REDITUS enforces absolute data isolation principles:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-deep-ink">
                  <li><strong>Zero Public Model Training:</strong> Client source code, vector database embeddings, LLM prompts, and Vibe-Code Rescue inputs are <strong>NEVER</strong> submitted to public AI models for model training or fine-tuning.</li>
                  <li><strong>Enterprise Isolation:</strong> All AI pipeline engineering utilizes enterprise API endpoints governed by strict zero-data-retention (ZDR) agreements.</li>
                  <li><strong>Encrypted Storage &amp; Transit:</strong> Source code and technical artifacts are encrypted using AES-256 at rest and TLS 1.3 in transit.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div id="use-of-information" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  4. How We Use Information
                </h2>
                <p>REDITUS processes your data strictly for legitimate operational purposes:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-bone-card border border-graphite/20 p-4">
                    <div className="font-mono text-xs font-bold text-petrol mb-1">SERVICE DELIVERY</div>
                    <p className="text-xs text-graphite-muted">Architecting, building, debugging, refactoring, and deploying custom software platforms and AI pipelines.</p>
                  </div>
                  <div className="bg-bone-card border border-graphite/20 p-4">
                    <div className="font-mono text-xs font-bold text-petrol mb-1">VIBE-CODE AUDITING</div>
                    <p className="text-xs text-graphite-muted">Analyzing submitted prototypes for structural defects, performance bottlenecks, and security vulnerabilities.</p>
                  </div>
                  <div className="bg-bone-card border border-graphite/20 p-4">
                    <div className="font-mono text-xs font-bold text-petrol mb-1">CLIENT COMMUNICATION</div>
                    <p className="text-xs text-graphite-muted">Sending milestone updates, technical proposals, billing invoices, and responding to inquiries.</p>
                  </div>
                  <div className="bg-bone-card border border-graphite/20 p-4">
                    <div className="font-mono text-xs font-bold text-petrol mb-1">SECURITY &amp; COMPLIANCE</div>
                    <p className="text-xs text-graphite-muted">Protecting our infrastructure against unauthorized access, DDoS attacks, and complying with legal obligations.</p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div id="third-party" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  5. Third-Party Services &amp; Integrations
                </h2>
                <p>
                  In delivering software products, REDITUS integrates reputable, compliance-certified third-party infrastructure providers. These third parties process data solely under our directed scope:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Cloud Infrastructure:</strong> Amazon Web Services (AWS), Vercel, Docker Hub.</li>
                  <li><strong>Database &amp; Vector Search:</strong> PostgreSQL, Pinecone, Weaviate, Qdrant.</li>
                  <li><strong>AI Model Services:</strong> OpenAI Enterprise, Anthropic, LangChain Cloud.</li>
                  <li><strong>Code Repositories:</strong> GitHub, GitLab.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="retention-security" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  6. Data Retention &amp; Security Measures
                </h2>
                <p>
                  We retain personal information and project data only as long as necessary to fulfill project deliverables or meet contractual, accounting, and legal requirements. Upon project completion and client sign-off, transient repository clones and temporary API keys used during development are securely purged according to our Data Destruction Standard.
                </p>
              </div>

              {/* Section 7 */}
              <div id="user-rights" className="scroll-mt-32 space-y-4 border-b border-graphite/15 pb-8">
                <h2 className="font-display font-bold text-2xl text-deep-ink">
                  7. Your Rights &amp; Global Compliance (GDPR / CCPA)
                </h2>
                <p>Depending on your jurisdiction, you possess specific data privacy rights:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Right to Access &amp; Portability:</strong> Request copies of the personal data we hold about you.</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information.</li>
                  <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request deletion of your personal data where legally permissible.</li>
                  <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from technical newsletters at any time via the email footer link.</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div id="contact" className="scroll-mt-32 space-y-4 bg-deep-ink text-bone p-6 rounded-xs border border-petrol">
                <h2 className="font-display font-bold text-2xl text-seafoam">
                  8. Contact Information &amp; Data Protection Officer
                </h2>
                <p className="text-bone/80 text-xs">
                  If you have questions regarding this Privacy Policy, wish to exercise data rights, or require an executed Non-Disclosure Agreement (NDA) prior to sharing codebase access, please contact our legal team:
                </p>
                <div className="font-mono text-xs space-y-1 text-seafoam pt-2 border-t border-graphite-border">
                  <div><strong>EMAIL:</strong> privacy@reditus.dev / hello@reditus.dev</div>
                  <div><strong>LOCATION:</strong> Remote · Global Operations</div>
                  <div><strong>RESPONSE SLA:</strong> Within 24 Business Hours</div>
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
