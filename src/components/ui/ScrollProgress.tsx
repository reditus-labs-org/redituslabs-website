"use client";

import { useScrollPosition } from "@/components/hooks/useScrollPosition";

export function ScrollProgress() {
  const progress = useScrollPosition();

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}