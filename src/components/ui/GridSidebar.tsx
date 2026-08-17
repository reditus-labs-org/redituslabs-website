"use client";

import { useState, useEffect } from "react";

interface SidebarItem {
  id: string;
  label: string;
  section: string;
}

const items: SidebarItem[] = [
  { id: "hero", label: "OVERVIEW", section: "hero" },
  { id: "ascii", label: "ASCII FIELD", section: "asciiField" },
  { id: "blob", label: "MORPH BLOB", section: "morphBlob" },
  { id: "projects", label: "PROJECTS", section: "projects" },
  { id: "about", label: "SPECIFICATIONS", section: "about" },
  { id: "contact", label: "TRANSMISSION", section: "contact" },
];

export function GridSidebar() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveId(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section: string) => {
    if (typeof window !== "undefined" && (window as any).setCameraPath) {
      (window as any).setCameraPath(section);
    }
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="grid-sidebar" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.section)}
          className={`grid-sidebar-item ${activeId === item.id ? "active" : ""}`}
          aria-current={activeId === item.id ? "page" : undefined}
        >
          {item.label}
        </button>
      ))}
      <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid #1a1a1a" }}>
        <div className="font-mono text-[10px] text-muted tracking-widest">
          SYSTEM STATUS
        </div>
        <div className="font-mono text-[11px] text-fg mt-2 tracking-wide">
          {"\u003E_ ONLINE"}
        </div>
      </div>
    </nav>
  );
}