"use client";

import { Scene } from "@/components/canvas/Scene";
import { GridSidebar } from "@/components/ui/GridSidebar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HeroTypography } from "@/components/ui/HeroTypography";
import { ProjectTimeline } from "@/components/ui/ProjectTimeline";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg text-fg font-mono overflow-x-hidden">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Grid Sidebar Navigation */}
      <GridSidebar />

      {/* Custom Cursor Trail */}
      <CustomCursor />

      {/* Hero Section */}
      <HeroTypography />

      {/* Projects Timeline */}
      <ProjectTimeline />

      {/* Additional Sections */}
      <section id="asciiField" className="section-marker min-h-screen" />
      <section id="morphBlob" className="section-marker min-h-screen" />
      <section id="about" className="section-marker min-h-screen" />
      <section id="contact" className="section-marker min-h-screen" />
    </main>
  );
}