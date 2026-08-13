"use client";

import React from "react";
import { ProjectItem } from "@/data/projects";

export function ProjectDiagram({ visualType }: { visualType: ProjectItem["visualType"] }) {
  switch (visualType) {
    case "neural":
      return (
        <svg viewBox="0 0 300 180" className="w-full h-40 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Neural Vector Grid */}
          <g stroke="#087F8C" strokeWidth="1.2">
            <line x1="40" y1="40" x2="150" y2="90" opacity="0.6" />
            <line x1="40" y1="140" x2="150" y2="90" opacity="0.6" />
            <line x1="150" y1="90" x2="260" y2="40" stroke="#A8E6CF" strokeWidth="1.5" />
            <line x1="150" y1="90" x2="260" y2="140" stroke="#A8E6CF" strokeWidth="1.5" />
            
            <circle cx="40" cy="40" r="10" fill="#F1EDE3" stroke="#242C30" strokeWidth="2" />
            <circle cx="40" cy="140" r="10" fill="#F1EDE3" stroke="#242C30" strokeWidth="2" />
            <circle cx="150" cy="90" r="18" fill="#087F8C" fillOpacity="0.3" stroke="#087F8C" strokeWidth="2" />
            <circle cx="150" cy="90" r="8" fill="#A8E6CF" />
            <circle cx="260" cy="40" r="12" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
            <circle cx="260" cy="140" r="12" fill="#F1EDE3" stroke="#087F8C" strokeWidth="2" />
          </g>
          <text x="110" y="160" fill="#242C30" fontSize="10" fontFamily="var(--font-jetbrains-mono)">RAG_RETRIEVAL // EMBED_VEC</text>
        </svg>
      );
    case "restaurant":
      return (
        <svg viewBox="0 0 300 180" className="w-full h-40 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Isometric Restaurant POS Block */}
          <g stroke="#087F8C" strokeWidth="1.5">
            <polygon points="150,20 230,60 150,100 70,60" fill="#F1EDE3" stroke="#242C30" />
            <polygon points="230,60 230,120 150,160 150,100" fill="#087F8C" fillOpacity="0.3" />
            <polygon points="150,100 150,160 70,120 70,60" fill="#A8E6CF" fillOpacity="0.5" />
            <rect x="115" y="45" width="70" height="30" fill="#242C30" rx="2" transform="rotate(-15 150 60)" />
          </g>
          <text x="90" y="170" fill="#242C30" fontSize="10" fontFamily="var(--font-jetbrains-mono)">POS_SYSTEM // SYNC_OK</text>
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 300 180" className="w-full h-40 text-petrol" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connected Geometric Onboarding Mesh */}
          <g stroke="#087F8C" strokeWidth="1.5">
            <rect x="30" y="50" width="60" height="60" fill="#087F8C" fillOpacity="0.2" stroke="#087F8C" />
            <rect x="120" y="30" width="60" height="60" fill="#A8E6CF" fillOpacity="0.4" stroke="#087F8C" />
            <rect x="210" y="60" width="60" height="60" fill="#B99A5B" fillOpacity="0.2" stroke="#B99A5B" />
            <path d="M 90 80 L 120 60 M 180 60 L 210 90" stroke="#087F8C" strokeWidth="2" strokeDasharray="3 3" />
          </g>
          <text x="80" y="155" fill="#242C30" fontSize="10" fontFamily="var(--font-jetbrains-mono)">VENDOR_API // MESH_NET</text>
        </svg>
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
