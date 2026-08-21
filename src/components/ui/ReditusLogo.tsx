"use client";

import React from "react";
import Link from "next/link";

interface ReditusLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ReditusIcon({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 32 : size === "md" ? 40 : 48;

  return (
    <div
      style={{ width: dim, height: dim }}
      className="relative shrink-0 transition-transform duration-300 hover:scale-105 overflow-hidden rounded-xl border border-[#087F8C]/40 bg-[#12191d] flex items-center justify-center p-1"
    >
      <img
        src="/reditus-logo.svg"
        alt="REDITUS Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function ReditusLogo({ className = "", showText = true, size = "md" }: ReditusLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      <ReditusIcon size={size} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-xl tracking-wider text-[#F1EDE3] group-hover:text-[#A8E6CF] transition-colors flex items-center gap-1.5">
            REDITUS
            <span className="w-1.5 h-1.5 bg-[#087F8C] rounded-full animate-pulse"></span>
          </span>
          <span className="font-mono text-[9px] text-[#A8E6CF] tracking-widest uppercase pt-0.5">
            ENGINEERING STUDIO
          </span>
        </div>
      )}
    </Link>
  );
}
