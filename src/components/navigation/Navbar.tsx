"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
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
    { label: "SOLUTIONS", href: "#solutions" },
    { label: "OUR WORK", href: "#work" },
    { label: "PRICING", href: "#pricing" },
    { label: "REVIEWS", href: "#reviews" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1114]/90 backdrop-blur-md border-b border-[#242C30] py-3 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <ReditusLogo size="md" />
          </a>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-xs font-semibold tracking-widest text-[#F1EDE3]/80 hover:text-[#A8E6CF] transition-colors duration-200 uppercase relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#087F8C] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Primary CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenInquiry()}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#087F8C] to-[#0d9fb0] hover:from-[#066670] hover:to-[#087F8C] text-[#F1EDE3] px-6 py-2.5 rounded-full font-display text-xs font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#087F8C]/20 active:scale-95 border border-[#A8E6CF]/30 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A8E6CF] animate-pulse" />
              <span>LET&apos;S BUILD</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#A8E6CF]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F1EDE3] hover:text-[#A8E6CF] focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1114] border-b border-[#242C30] px-6 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-bold text-sm tracking-wider text-[#F1EDE3] hover:text-[#A8E6CF] transition-colors py-2 border-b border-[#242C30]/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-[#087F8C] text-[#F1EDE3] hover:bg-[#066670] px-4 py-3 rounded-full font-display text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#A8E6CF]/30"
              >
                <span>LET&apos;S BUILD</span>
                <ArrowRight className="w-4 h-4 text-[#A8E6CF]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
