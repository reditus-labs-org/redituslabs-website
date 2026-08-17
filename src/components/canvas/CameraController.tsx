"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { cameraPaths, CameraPath } from "@/lib/cameraPaths";

interface CameraControllerProps {
  reducedMotion: boolean;
}

const DEFAULT_POSITION = new Vector3(0, 0, 35);
const DEFAULT_TARGET = new Vector3(0, 0, 0);

export function CameraController({ reducedMotion }: CameraControllerProps) {
  const { camera } = useThree();
  const currentPathRef = useRef<CameraPath | null>(null);
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const setCameraPath = (section: string) => {
    if (reducedMotion) {
      const path = cameraPaths[section] || cameraPaths.hero;
      camera.position.copy(new Vector3(...path.keyframes[0].position));
      camera.lookAt(new Vector3(...path.keyframes[0].target));
      return;
    }

    const path = cameraPaths[section] || cameraPaths.hero;
    currentPathRef.current = path;
    progressRef.current = 0;
    isAnimatingRef.current = true;

    gsap.to(progressRef, {
      current: 1,
      duration: path.totalDuration,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        currentPathRef.current = null;
      },
    });
  };

  // Expose to window for sidebar navigation
  useEffect(() => {
    (window as any).setCameraPath = setCameraPath;
    return () => {
      delete (window as any).setCameraPath;
    };
  }, [reducedMotion]);

  useFrame(() => {
    if (!currentPathRef.current || isAnimatingRef.current === false) return;

    const path = currentPathRef.current;
    const t = progressRef.current;

    // Find current keyframe segment
    let accumulated = 0;
    let currentSegment = path.keyframes[0];
    let nextSegment = path.keyframes[1] || path.keyframes[0];

    for (let i = 0; i < path.keyframes.length - 1; i++) {
      const segmentDuration = path.keyframes[i].duration / path.totalDuration;
      if (t >= accumulated && t < accumulated + segmentDuration) {
        currentSegment = path.keyframes[i];
        nextSegment = path.keyframes[i + 1];
        break;
      }
      accumulated += segmentDuration;
    }

    const segmentProgress = (t - accumulated) / (path.keyframes[0].duration / path.totalDuration);
    const easedProgress = segmentProgress < 0.5
      ? 2 * segmentProgress * segmentProgress
      : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;

    const pos = new Vector3(...currentSegment.position).lerp(
      new Vector3(...nextSegment.position),
      easedProgress
    );
    const target = new Vector3(...currentSegment.target).lerp(
      new Vector3(...nextSegment.target),
      easedProgress
    );

    camera.position.copy(pos);
    camera.lookAt(target);
  });

  return null;
}