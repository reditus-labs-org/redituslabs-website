"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Terminal } from "lucide-react";
import { ReditusLogo } from "@/components/ui/ReditusLogo";

interface NavbarProps {
  onOpenInquiry: (initialType?: string) => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "SERVICES", href: "#services" },
    { label: "WORK", href: "#work" },
    { label: "PROCESS", href: "#process" },
    { label: "ABOUT", href: "#metrics" },
    { label: "TESTIMONIALS", href: "#testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bone/90 backdrop-blur-md border-b border-graphite/20 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo / Mark */}
          <ReditusLogo size="md" />

          {/* Center: Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-xs font-semibold tracking-wider text-graphite hover:text-petrol transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-petrol transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenInquiry()}
              className="group inline-flex items-center gap-2 bg-petrol text-bone hover:bg-petrol-hover px-5 py-2.5 font-display text-xs font-bold tracking-wider transition-all duration-200 shadow-sm active:translate-y-0.5 border border-petrol cursor-pointer"
            >
              <span>LET&apos;S BUILD</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-graphite hover:text-petrol focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bone border-b border-graphite/30 px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            <div className="font-mono text-[10px] text-graphite-muted border-b border-graphite/10 pb-2 flex items-center justify-between">
              <span>SYSTEM_NAV</span>
              <span className="text-petrol">&gt;_ ACTIVE</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-bold text-sm tracking-wider text-deep-ink hover:text-petrol transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-graphite/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-petrol text-bone hover:bg-petrol-hover px-4 py-3 font-display text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>LET&apos;S BUILD TOGETHER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
