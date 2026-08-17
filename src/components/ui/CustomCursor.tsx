"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, useReducedMotion } from "@/components/hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  char: string;
  alpha: number;
  scale: number;
  vx: number;
  vy: number;
  life: number;
}

const CHARS = ["0", "1"];

export function CustomCursor() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastSpawnRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const now = performance.now();
      
      // Spawn particles
      if (now - lastSpawnRef.current > 30) {
        lastSpawnRef.current = now;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        particlesRef.current = [
          ...particlesRef.current.slice(-14), // Max 15 particles
          {
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            char,
            alpha: 1,
            scale: 0.8 + Math.random() * 0.4,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20 - 10,
            life: 1,
          },
        ];
      }

      // Update particles
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx * 0.016,
          y: p.y + p.vy * 0.016,
          alpha: p.alpha * 0.92,
          scale: p.scale * 0.98,
          life: p.life - 0.02,
          vy: p.vy + 5 * 0.016, // Gravity
        }))
        .filter((p) => p.alpha > 0.02 && p.life > 0);

      // Draw
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particlesRef.current.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = `rgb(0, ${Math.floor(255 * (0.7 + p.alpha * 0.3))}, ${Math.floor(102 * (0.5 + p.alpha * 0.5))})`;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.scale, p.scale);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      aria-hidden="true"
    />
  );
}