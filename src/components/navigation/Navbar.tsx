"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onOpenInquiry: (initialType?: string) => void;
}

const links = [
  { label: "Capabilities", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Engage", href: "/#pricing" },
];

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={styles.brand} aria-label="REDITUS home">
        <span className={styles.mark}>R</span>
        <span><strong>REDITUS</strong><small>ENGINEERING STUDIO</small></span>
      </Link>

      <nav className={styles.desktopNav} aria-label="Primary navigation">
        {links.map((link, index) => <a key={link.label} href={link.href}><span>0{index + 1}</span>{link.label}</a>)}
      </nav>

      <div className={styles.status}><i /><span>AVAILABLE / Q3</span></div>
      <button className={styles.cta} onClick={() => onOpenInquiry()}>Start a project <ArrowUpRight size={14} /></button>
      <button className={styles.menuButton} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>

      {open && <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
        <div><span>NAVIGATION / SYSTEM</span><strong>ONLINE</strong></div>
        {links.map((link, index) => <a key={link.label} href={link.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={16} /></a>)}
        <button onClick={() => { setOpen(false); onOpenInquiry(); }}>Initiate project <ArrowUpRight size={16} /></button>
      </nav>}
    </header>
  );
}
