"use client";

import React, { useState } from "react";
import { X, ArrowRight, Check, Wrench, Sparkles, Terminal } from "lucide-react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}

export function InquiryModal({ isOpen, onClose, initialType }: InquiryModalProps) {
  const isVibeInit = initialType === "vibe-rescue";

  const [projectType, setProjectType] = useState<string>(
    isVibeInit ? "Vibe-Code Rescue" : "New Software Build"
  );
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [issues, setIssues] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$25k - $50k",
    timeline: "1-2 Months",
    productUrl: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const vibeTools = ["Cursor", "v0", "Bolt", "Lovable", "Replit", "Claude", "ChatGPT", "Other"];
  const issueOptions = [
    "Intermittent Bugs & Crashes",
    "High Latency & Performance Drops",
    "Unscalable Architecture",
    "Spaghetti / Fragile Code",
    "Security & Auth Vulnerabilities",
    "Deployment / Production Failures",
  ];

  const handleToolToggle = (t: string) => {
    setSelectedTools((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const handleIssueToggle = (issue: string) => {
    setIssues((prev) =>
      prev.includes(issue) ? prev.filter((item) => item !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-deep-ink/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-bone border border-petrol max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-graphite hover:text-petrol p-1 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          /* Submission Confirmation View */
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 bg-seafoam/20 text-petrol border border-petrol rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div className="font-mono text-xs text-petrol font-bold uppercase tracking-widest">
              [ INQUIRY_RECEIVED // STATUS: QUEUED ]
            </div>

            <h3 className="font-display font-extrabold text-3xl text-deep-ink">
              We&apos;ve got your project specs.
            </h3>

            <p className="font-sans text-sm text-graphite-muted max-w-md mx-auto leading-relaxed">
              Our engineering team is reviewing your requirements. We will analyze your architecture and get back to you within 24 hours.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-petrol text-bone hover:bg-petrol-hover px-6 py-3 font-display text-xs font-bold tracking-wider cursor-pointer"
              >
                RETURN TO WEBSITE →
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div>
            
            {/* Header */}
            <div className="mb-6 space-y-2 border-b border-graphite/15 pb-4">
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-petrol bg-petrol/10 border border-petrol/30 px-2.5 py-1">
                <Terminal className="w-3 h-3 text-petrol" />
                <span>PROJECT INQUIRY &amp; DISCOVERY</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-deep-ink">
                Let&apos;s build what&apos;s possible.
              </h3>

              <p className="font-sans text-xs text-graphite-muted">
                Have an idea, an unfinished product, or something that almost works? Let&apos;s turn it into something real.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Project Type Switcher */}
              <div>
                <label className="block font-mono text-xs font-bold text-deep-ink mb-2">
                  PROJECT CATEGORY
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {["New Software Build", "Vibe-Code Rescue", "AI Pipeline / Agent", "SaaS Platform"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`p-2.5 border text-left font-medium transition-colors cursor-pointer ${
                        projectType === type
                          ? "bg-petrol text-bone border-petrol font-bold"
                          : "bg-bone-card text-graphite border-graphite/20 hover:border-petrol"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Vibe-Code Rescue Section Fields */}
              {projectType === "Vibe-Code Rescue" && (
                <div className="bg-deep-ink/5 border border-petrol/40 p-4 space-y-4 rounded-xs">
                  
                  {/* Tool Selection */}
                  <div>
                    <label className="block font-mono text-xs font-bold text-petrol mb-1.5 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>WHAT DID YOU BUILD IT WITH?</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {vibeTools.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => handleToolToggle(t)}
                          className={`font-mono text-[10px] px-2.5 py-1 border transition-colors cursor-pointer ${
                            selectedTools.includes(t)
                              ? "bg-petrol text-bone border-petrol font-bold"
                              : "bg-bone text-graphite border-graphite/30 hover:border-petrol"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Issue Selection */}
                  <div>
                    <label className="block font-mono text-xs font-bold text-petrol mb-1.5">
                      WHAT ISN&apos;T WORKING?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {issueOptions.map((iss) => (
                        <button
                          type="button"
                          key={iss}
                          onClick={() => handleIssueToggle(iss)}
                          className={`font-mono text-[10px] p-2 border text-left transition-colors cursor-pointer ${
                            issues.includes(iss)
                              ? "bg-seafoam/20 text-deep-ink border-petrol font-bold"
                              : "bg-bone text-graphite-muted border-graphite/20 hover:border-petrol"
                          }`}
                        >
                          {iss}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* Standard Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-sans focus:outline-hidden focus:border-petrol"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-sans focus:outline-hidden focus:border-petrol"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                    COMPANY / ORG
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-sans focus:outline-hidden focus:border-petrol"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                    BUDGET RANGE
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-mono focus:outline-hidden focus:border-petrol"
                  >
                    <option>&lt; $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                    TIMELINE
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-mono focus:outline-hidden focus:border-petrol"
                  >
                    <option>Immediate / Urgent</option>
                    <option>1-2 Months</option>
                    <option>3+ Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                  EXISTING PRODUCT / CODEBASE URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/org/repo or https://my-app.lovable.app"
                  value={formData.productUrl}
                  onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                  className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-sans focus:outline-hidden focus:border-petrol"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] font-bold text-graphite mb-1">
                  PROJECT SUMMARY &amp; GOALS *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you want to build or what needs to be fixed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-bone-card border border-graphite/30 p-2.5 text-xs text-deep-ink font-sans focus:outline-hidden focus:border-petrol"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-petrol text-bone hover:bg-petrol-hover px-6 py-4 font-display text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
