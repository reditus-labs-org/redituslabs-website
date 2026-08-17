import { Vector3 } from "three";

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  duration: number;
  ease?: string;
}

export interface CameraPath {
  keyframes: CameraKeyframe[];
  totalDuration: number;
}

export const cameraPaths: Record<string, CameraPath> = {
  hero: {
    keyframes: [
      {
        position: [0, 0, 35],
        target: [0, 0, 0],
        duration: 1.5,
        ease: "power2.out",
      },
    ],
    totalDuration: 1.5,
  },
  asciiField: {
    keyframes: [
      {
        position: [15, 10, 25],
        target: [0, 0, 0],
        duration: 2,
        ease: "power3.inOut",
      },
      {
        position: [0, 5, 15],
        target: [0, 0, 0],
        duration: 1.5,
        ease: "power2.out",
      },
    ],
    totalDuration: 3.5,
  },
  morphBlob: {
    keyframes: [
      {
        position: [0, 0, 8],
        target: [0, 0, 0],
        duration: 1.8,
        ease: "power2.inOut",
      },
    ],
    totalDuration: 1.8,
  },
  projects: {
    keyframes: [
      {
        position: [-20, 5, 20],
        target: [-10, 0, 0],
        duration: 2,
        ease: "power3.inOut",
      },
      {
        position: [0, 3, 12],
        target: [0, 0, 0],
        duration: 1.5,
        ease: "power2.out",
      },
    ],
    totalDuration: 3.5,
  },
  about: {
    keyframes: [
      {
        position: [0, 15, 20],
        target: [0, 0, 0],
        duration: 2,
        ease: "power2.inOut",
      },
    ],
    totalDuration: 2,
  },
  contact: {
    keyframes: [
      {
        position: [0, -10, 25],
        target: [0, 0, 0],
        duration: 2,
        ease: "power2.inOut",
      },
    ],
    totalDuration: 2,
  },
};

export function getCameraPath(section: string): CameraPath {
  return cameraPaths[section] || cameraPaths.hero;
}

export function lerpVector3(
  current: Vector3,
  target: Vector3,
  alpha: number
): Vector3 {
  return current.clone().lerp(target, alpha);
}