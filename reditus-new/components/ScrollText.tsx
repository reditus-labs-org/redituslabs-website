"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Big text that scales up from a small size as it scrolls into view.
 * The signature "text grows on scroll" minimal effect.
 */
export default function ScrollText({
  children,
  className,
  from = 0.25,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from, opacity: from < 0.4 ? 0.35 : 1, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 40%",
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [from]);

  return (
    <Tag
      ref={ref as never}
      className={cn("text-grow", className)}
    >
      {children}
    </Tag>
  );
}
