"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { AsciiField } from "./AsciiField";
import { MorphBlob } from "./MorphBlob";
import { CameraController } from "./CameraController";
import { PostProcessing } from "./PostProcessing";
import { MobileFallback } from "./MobileFallback";
import { useIsMobile, useReducedMotion } from "@/components/hooks/useMediaQuery";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function SceneContent({ quality }: { quality: "high" | "medium" | "low" }) {
  const reducedMotion = useReducedMotion();
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.set(0, 0, 35);
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.fov = 50;
    perspectiveCamera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <AsciiField quality={quality} />
      <MorphBlob quality={quality} />
      <CameraController reducedMotion={reducedMotion} />
      <PostProcessing />
    </>
  );
}

export function Scene() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (isMobile) {
    return <MobileFallback />;
  }

  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 2;

  return (
    <Canvas
      camera={{ position: [0, 0, 35], fov: 50 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }}
      shadows={false}
      dpr={dpr}
    >
      <Suspense fallback={null}>
        <SceneContent quality="high" />
      </Suspense>
    </Canvas>
  );
}