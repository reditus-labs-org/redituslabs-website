"use client";

import { useState, useEffect, useRef } from "react";

export interface MouseVelocity {
  x: number;
  y: number;
  magnitude: number;
}

export function useMouseVelocity(smoothing = 0.15): MouseVelocity {
  const [velocity, setVelocity] = useState<MouseVelocity>({ x: 0, y: 0, magnitude: 0 });
  const prevPos = useRef({ x: 0, y: 0 });
  const prevTime = useRef(performance.now());
  const smoothedVel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = (now - prevTime.current) / 1000; // seconds
      prevTime.current = now;

      if (dt === 0) return;

      const rawVelX = (e.clientX - prevPos.current.x) / dt;
      const rawVelY = (e.clientY - prevPos.current.y) / dt;

      // Exponential smoothing
      smoothedVel.current.x += (rawVelX - smoothedVel.current.x) * smoothing;
      smoothedVel.current.y += (rawVelY - smoothedVel.current.y) * smoothing;

      prevPos.current = { x: e.clientX, y: e.clientY };

      const mag = Math.sqrt(
        smoothedVel.current.x ** 2 + smoothedVel.current.y ** 2
      );

      setVelocity({
        x: smoothedVel.current.x,
        y: smoothedVel.current.y,
        magnitude: Math.min(mag / 1000, 2), // Normalize to 0-2 range
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothing]);

  return velocity;
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}