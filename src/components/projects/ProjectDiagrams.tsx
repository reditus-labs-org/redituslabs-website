"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/projects";

export function ProjectDiagram({ visualType }: { visualType: ProjectItem["visualType"] }) {
  switch (visualType) {
    case "neural":
      return (
        <div className="w-full h-48 sm:h-56 flex items-center justify-center relative">
          <Image
            src="/images/project-athenalm.png"
            alt="ATHENALM AI RAG Platform Architecture"
            width={500}
            height={400}
            className="w-full h-full object-contain mix-blend-multiply scale-105"
            priority
          />
        </div>
      );
    case "restaurant":
      return (
        <div className="w-full h-48 sm:h-56 flex items-center justify-center relative">
          <Image
            src="/images/project-foodpandora.png"
            alt="FOODPANDORA Restaurant Management System"
            width={500}
            height={400}
            className="w-full h-full object-contain mix-blend-multiply scale-105"
            priority
          />
        </div>
      );
    case "network":
      return (
        <div className="w-full h-48 sm:h-56 flex items-center justify-center relative">
          <Image
            src="/images/project-onboardhub.png"
            alt="ONBOARDHUB Vendor Onboarding Platform"
            width={500}
            height={400}
            className="w-full h-full object-contain mix-blend-multiply scale-105"
            priority
          />
        </div>
      );
    case "medical":
      return (
        <svg viewBox="0 0 300 180" className="w-full h-40 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Medical Document Intelligence Pipeline */}
          <g stroke="#087F8C" strokeWidth="1.5">
            <path d="M 60 30 L 140 30 L 160 50 L 160 140 L 60 140 Z" fill="#FAF8F3" stroke="#242C30" />
            <line x1="80" y1="60" x2="140" y2="60" stroke="#087F8C" strokeWidth="2" />
            <line x1="80" y1="80" x2="120" y2="80" stroke="#087F8C" strokeWidth="2" />
            <line x1="80" y1="100" x2="140" y2="100" stroke="#B99A5B" strokeWidth="2" />
            <circle cx="210" cy="85" r="30" fill="#A8E6CF" fillOpacity="0.3" stroke="#087F8C" />
            <path d="M 210 65 L 210 105 M 190 85 L 230 85" stroke="#087F8C" strokeWidth="2" />
          </g>
          <text x="85" y="165" fill="#242C30" fontSize="10" fontFamily="var(--font-jetbrains-mono)">MHN_NLP // EXTRACTION</text>
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 300 180" className="w-full h-40 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Resume AI Parser Visual */}
          <g stroke="#087F8C" strokeWidth="1.5">
            <rect x="80" y="25" width="140" height="125" fill="#FAF8F3" stroke="#242C30" />
            <circle cx="110" cy="55" r="14" fill="#087F8C" fillOpacity="0.3" />
            <line x1="135" y1="48" x2="200" y2="48" stroke="#242C30" strokeWidth="2" />
            <line x1="135" y1="62" x2="180" y2="62" stroke="#242C30" strokeWidth="2" />
            <line x1="95" y1="90" x2="205" y2="90" stroke="#087F8C" strokeWidth="2" />
            <line x1="95" y1="105" x2="190" y2="105" stroke="#A8E6CF" strokeWidth="2" />
            <line x1="95" y1="120" x2="160" y2="120" stroke="#B99A5B" strokeWidth="2" />
          </g>
          <text x="90" y="168" fill="#242C30" fontSize="10" fontFamily="var(--font-jetbrains-mono)">RESUME_PARSER // JSON</text>
        </svg>
      );
  }
}
