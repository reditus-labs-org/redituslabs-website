"use client";

import React, { useState } from "react";
import { PROCESS_STEPS, ProcessStep } from "@/data/process";
import {
  Search,
  Box,
  Code,
  RefreshCw,
  Rocket,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileCode,
  ShieldCheck,
} from "lucide-react";

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">("right");
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSteps = PROCESS_STEPS.length;
  const current = PROCESS_STEPS[activeStep];

  const goToStep = (index: number) => {
    if (index === activeStep) return;
    setSlideDirection(index > activeStep ? "right" : "left");
    setActiveStep(index);
  };

  const handlePrev = () => {
    setSlideDirection("left");
    setActiveStep((prev) => (prev === 0 ? totalSteps - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideDirection("right");
    setActiveStep((prev) => (prev === totalSteps - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const getIcon = (type: ProcessStep["iconType"]) => {
    switch (type) {
      case "search":
        return <Search className="w-6 h-6 text-seafoam" />;
      case "cube":
        return <Box className="w-6 h-6 text-seafoam" />;
      case "code":
        return <Code className="w-6 h-6 text-seafoam" />;
      case "refresh":
        return <RefreshCw className="w-6 h-6 text-seafoam" />;
      case "rocket":
        return <Rocket className="w-6 h-6 text-seafoam animate-pulse" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-bone relative border-b border-graphite/15 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-tech-grid-light opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-petrol inline-block"></span>
            <span className="font-mono text-xs font-bold tracking-widest text-petrol uppercase">
              ARCHITECTURAL WORKFLOW // SWIPEABLE ENGINE
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-deep-ink leading-tight">
            A battle-tested process. <br />
            <span className="text-petrol">Engineered for perfection.</span>
          </h2>
        </div>

        {/* Unified Single Box Swipeable Card Container */}
        <div className="bg-deep-ink border border-graphite/60 shadow-2xl rounded-sm overflow-hidden">

          {/* Top Status & Pipeline Step Selector Header */}
          <div className="border-b border-graphite/40 bg-deep-ink/90 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 font-mono text-xs">
              <div className="flex items-center gap-3 text-bone/80">
                <span className="w-2.5 h-2.5 rounded-full bg-seafoam inline-block animate-pulse" />
                <span className="font-bold tracking-wider text-seafoam uppercase">
                  WORKFLOW_ENGINE // STAGE [{current.number}/0{totalSteps}]
                </span>
              </div>
              <div className="flex items-center gap-2 text-graphite-muted text-[11px]">
                <span className="text-seafoam">&bull;</span>
                <span className="text-bone/80 font-mono">SWIPE OR CLICK STEPS</span>
                <span className="text-seafoam font-bold">&rarr;</span>
              </div>
            </div>

            {/* Interactive Step Selector Tabs / Pipeline Buttons */}
            <div className="grid grid-cols-5 gap-1.5 font-mono text-xs">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={step.number}
                  onClick={() => goToStep(idx)}
                  className={`py-2.5 px-2 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
                    activeStep === idx
                      ? "bg-petrol text-bone border-seafoam font-bold shadow-md scale-[1.02]"
                      : "bg-deep-ink/60 text-bone/60 border-graphite/30 hover:border-petrol/60 hover:text-bone"
                  }`}
                >
                  <span className="text-[10px] text-seafoam/80 sm:text-xs">{step.number}.</span>
                  <span className="truncate text-[10px] sm:text-xs font-semibold tracking-wider">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Stage Progress Bar Line */}
            <div className="w-full bg-graphite/40 h-1 mt-4 relative overflow-hidden">
              <div
                className="bg-seafoam h-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Swipeable Content Box */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="p-6 sm:p-10 lg:p-12 relative min-h-[420px] flex flex-col justify-between select-none overflow-hidden"
          >
            {/* Background Watermark Number */}
            <div className="absolute right-6 bottom-6 font-mono font-black text-8xl sm:text-9xl text-graphite/15 pointer-events-none select-none">
              {current.number}
            </div>

            {/* Animated Step Container with Slide Keyframes */}
            <div
              key={activeStep}
              className={`relative z-10 space-y-7 ${
                slideDirection === "right"
                  ? "animate-process-slide-right"
                  : "animate-process-slide-left"
              }`}
            >
              {/* Header: Icon, Badge, Subtitle & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite/30 pb-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 bg-petrol/25 border border-petrol/60 flex items-center justify-center shadow-inner shrink-0 mt-1 sm:mt-0">
                    {getIcon(current.iconType)}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-seafoam font-bold tracking-widest uppercase flex items-center gap-2">
                      <span>STAGE {current.number}</span>
                      <span className="text-graphite-muted">//</span>
                      <span className="text-bone/70">{current.subtitle}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-bone mt-1 tracking-tight">
                      {current.title}
                    </h3>
                  </div>
                </div>

                {/* Navigation Arrows inside Card Header */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous step"
                    className="w-10 h-10 bg-graphite/40 hover:bg-petrol text-bone border border-graphite/60 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-seafoam" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next step"
                    className="w-10 h-10 bg-graphite/40 hover:bg-petrol text-bone border border-graphite/60 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-seafoam" />
                  </button>
                </div>
              </div>

              {/* Step Description */}
              <p className="font-sans text-base sm:text-lg text-bone/90 font-normal leading-relaxed max-w-3xl">
                {current.description}
              </p>

              {/* Technical Deliverables Grid */}
              <div className="space-y-3">
                <div className="font-mono text-xs text-seafoam font-bold uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-seafoam" />
                  <span>// ARCHITECTURAL_DELIVERABLES:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {current.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="bg-graphite/25 border border-graphite/40 p-3.5 flex items-start gap-3 rounded-xs transition-colors hover:border-petrol/60 hover:bg-graphite/40"
                    >
                      <CheckCircle2 className="w-4 h-4 text-seafoam shrink-0 mt-0.5" />
                      <span className="font-mono text-xs text-bone/90 leading-snug">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Technical Output & Benchmark Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Output Artifact */}
                <div className="bg-deep-ink border border-petrol/40 px-4 py-3 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2.5 text-bone/80">
                    <FileCode className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] text-graphite-muted">OUTPUT_ARTIFACT:</span>
                    <span className="text-seafoam font-bold">{current.outputArtifact}</span>
                  </div>
                  <span className="text-[10px] text-seafoam/80 bg-petrol/20 px-2 py-0.5 border border-petrol/40 uppercase font-semibold">
                    VERIFIED
                  </span>
                </div>

                {/* Benchmark Target */}
                <div className="bg-deep-ink border border-petrol/40 px-4 py-3 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2.5 text-bone/80">
                    <ShieldCheck className="w-4 h-4 text-seafoam" />
                    <span className="text-[11px] text-graphite-muted">TARGET_BENCHMARK:</span>
                    <span className="text-seafoam font-bold">{current.benchmarkTarget}</span>
                  </div>
                  <span className="text-[10px] text-seafoam/80 bg-petrol/20 px-2 py-0.5 border border-petrol/40 uppercase font-semibold">
                    TARGET
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Swipe Controls & Indicator Footer */}
            <div className="relative z-10 pt-8 mt-8 border-t border-graphite/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="text-graphite-muted text-[11px] flex items-center gap-2">
                <span>STAGE {activeStep + 1} OF {totalSteps}</span>
                <span className="text-petrol">&bull;</span>
                <span className="text-seafoam font-bold">{current.title}</span>
                <span className="text-graphite-muted">({current.subtitle})</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-graphite/40 hover:bg-graphite text-bone/80 hover:text-seafoam border border-graphite/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-petrol hover:bg-petrol-hover text-bone font-bold border border-petrol text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <span>NEXT STAGE</span>
                  <ArrowRight className="w-4 h-4 text-seafoam" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
