"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useInquiry } from "./InquiryContext";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const { open } = useInquiry();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] bg-transparent py-3">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Primary"
      >
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] font-medium tracking-wider text-ink/80 hover:text-petrol transition-colors drop-shadow-sm"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => open()}
            className="hidden rounded-lg border border-ink bg-ink px-5 py-2.5 font-heading text-xs font-bold tracking-wider text-white transition-all hover:bg-petrol hover:border-petrol sm:inline-flex cursor-pointer shadow-md"
          >
            START A PROJECT
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-lg border border-black/10 bg-white/70 text-ink backdrop-blur-md lg:hidden cursor-pointer shadow-sm"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-black/10 bg-white/95 backdrop-blur-2xl transition-[max-height] duration-300 shadow-xl",
          menuOpen ? "max-h-[420px]" : "max-h-0 border-t-0",
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-mono text-sm tracking-wider text-ink hover:text-petrol"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            className="mt-2 rounded-lg border border-ink bg-ink px-5 py-3 text-left font-heading text-xs font-bold tracking-wider text-white cursor-pointer"
          >
            START A PROJECT
          </button>
        </div>
      </div>
    </header>
  );
}
