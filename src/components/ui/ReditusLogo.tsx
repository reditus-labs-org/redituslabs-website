"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="relative shrink-0 transition-transform duration-300 hover:scale-105 overflow-hidden rounded-xs border border-petrol/40 bg-deep-ink flex items-center justify-center p-0.5"
    >
      <img
        src="/Reditus_Logo.svg"
        alt="REDITUS Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function ReditusLogo({ className = "", showText = true, size = "md" }: ReditusLogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-hidden ${className}`}>
      <ReditusIcon size={size} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-xl tracking-wider text-deep-ink group-hover:text-petrol transition-colors flex items-center gap-1.5">
            REDITUS
            <span className="w-1.5 h-1.5 bg-petrol rounded-full animate-pulse"></span>
          </span>
          <span className="font-mono text-[9px] text-graphite-muted tracking-widest uppercase pt-0.5">
            ENGINEERING STUDIO
          </span>
        </div>
      )}
    </Link>
  );
}
