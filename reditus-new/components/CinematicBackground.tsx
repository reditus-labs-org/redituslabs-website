"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { id: "hero", src: "/images/hero-monolith.jpg", targetId: "top", alt: "Architectural Portal Core" },
  { id: "manifesto", src: "/images/manifesto-diorama.jpg", targetId: "manifesto", alt: "Floating Diorama Plateau" },
  { id: "services", src: "/images/project-athenalm.jpg", targetId: "services", alt: "Vector Polyhedron Topography" },
  { id: "process", src: "/images/project-onboardhub.jpg", targetId: "process", alt: "Highland Skybridge" },
  { id: "work", src: "/images/project-resume.jpg", targetId: "work", alt: "Slate Monolith Architecture" },
  { id: "pricing", src: "/images/project-mhn.jpg", targetId: "pricing", alt: "Ethereal Frosted Pavilion" },
  { id: "cta", src: "/images/cta-horizon.jpg", targetId: "final-cta", alt: "Cantilevered Overlook Horizon" },
];

export default function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Initialize scenes: Scene 0 is visible (opacity 1), all others opacity 0
      scenesRef.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          scale: 1,
          transformOrigin: "center center",
        });
      });

      if (reduce) return;

      // Create scroll-driven crossfades and subtle camera flythrough motions
      SCENES.forEach((scene, idx) => {
        if (idx === 0) {
          // Hero scene subtle zoom-out as you scroll past
          const heroEl = scenesRef.current[0];
          const target = document.getElementById("top") || document.getElementById("manifesto");
          if (heroEl && target) {
            gsap.to(heroEl, {
              scale: 1.08,
              yPercent: -3,
              ease: "none",
              scrollTrigger: {
                trigger: target,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }
          return;
        }

        const currentSceneEl = scenesRef.current[idx];
        const prevSceneEl = scenesRef.current[idx - 1];
        const targetSection = document.getElementById(scene.targetId);

        if (currentSceneEl && targetSection) {
          // Camera push-in motion for the current scene
          gsap.fromTo(
            currentSceneEl,
            { scale: 1.05, yPercent: 4 },
            {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: targetSection,
                start: "top 95%",
                end: "center 40%",
                scrub: true,
              },
            },
          );

          // Smooth crossfade into current scene
          gsap.fromTo(
            currentSceneEl,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: targetSection,
                start: "top 80%",
                end: "top 25%",
                scrub: 0.8,
                onEnter: () => {
                  if (prevSceneEl) gsap.to(prevSceneEl, { opacity: 0, duration: 0.4 });
                },
                onLeaveBack: () => {
                  if (prevSceneEl) gsap.to(prevSceneEl, { opacity: 1, duration: 0.4 });
                },
              },
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden bg-black"
    >
      {/* Visual Scene Layers */}
      {SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          ref={(el) => {
            scenesRef.current[idx] = el;
          }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <Image
            src={scene.src}
            alt={scene.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            quality={100}
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
