"use client";

import { useEffect, useRef } from "react";

export function MobileFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const prevTimeRef = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = (now - prevTimeRef.current) / 1000;
      prevTimeRef.current = now;

      if (dt > 0) {
        velocityRef.current.x = (e.clientX - prevMouseRef.current.x) / dt / 1000;
        velocityRef.current.y = (e.clientY - prevMouseRef.current.y) / dt / 1000;
      }
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      timeRef.current += 1 / 60;
      draw(ctx, canvas.width / dpr, canvas.height / dpr);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const time = timeRef.current;
    const vel = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    const maxRadius = Math.min(width, height) * 0.4;

    // Clear
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = "rgba(0, 255, 102, 0.03)";
    ctx.lineWidth = 1;
    const gridSize = 30;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Blob layers
    const layers = [
      { radius: maxRadius * 0.9, color: "rgba(0, 240, 255, 0.08)", speed: 0.3 },
      { radius: maxRadius * 0.7, color: "rgba(0, 255, 102, 0.12)", speed: 0.5 },
      { radius: maxRadius * 0.5, color: "rgba(0, 255, 102, 0.18)", speed: 0.8 },
      { radius: maxRadius * 0.3, color: "rgba(0, 255, 102, 0.25)", speed: 1.2 },
    ];

    layers.forEach((layer, i) => {
      const points = 60;
      const baseRadius = layer.radius * (1 + vel * 0.5);
      
      ctx.beginPath();
      for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        const noise = Math.sin(angle * 3 + time * layer.speed + i) * 0.15 +
                      Math.sin(angle * 5 + time * layer.speed * 0.7 + i * 2) * 0.08 +
                      Math.sin(angle * 7 + time * layer.speed * 0.5 + i * 3) * 0.04;
        const radius = baseRadius * (1 + noise);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Fill
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius);
      gradient.addColorStop(0, layer.color.replace("0.08", "0.2").replace("0.12", "0.25").replace("0.18", "0.3").replace("0.25", "0.35"));
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Stroke
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Core glow
    const coreGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, maxRadius * 0.4
    );
    coreGradient.addColorStop(0, `rgba(0, 255, 102, ${0.3 + vel * 0.3})`);
    coreGradient.addColorStop(0.5, `rgba(0, 240, 255, ${0.15 + vel * 0.2})`);
    coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Scanlines
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y + (time * 50) % 4);
      ctx.lineTo(width, y + (time * 50) % 4);
      ctx.stroke();
    }

    // ASCII particles around blob
    ctx.font = "12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(0, 255, 102, 0.15)";
    const glyphs = ["0", "1", "▲", "◆", "█", "▓", "▒", "░"];
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2 + time * 0.2;
      const r = maxRadius * (0.6 + Math.sin(time + i) * 0.3);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      const glyph = glyphs[i % glyphs.length];
      ctx.fillText(glyph, x, y);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="mobile-blob-canvas"
      aria-hidden="true"
    />
  );
}