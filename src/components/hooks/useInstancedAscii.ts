"use client";

import { useMemo } from "react";
import { InstancedBufferAttribute, BufferAttribute, Vector3 } from "three";
import { GLYPH_COUNT, getGlyphUV } from "@/lib/asciiAtlas";

interface AsciiInstanceData {
  positions: Float32Array;
  offsets: Float32Array;
  scales: Float32Array;
  speeds: Float32Array;
  phases: Float32Array;
  opacities: Float32Array;
}

export function useInstancedAscii(count: number, bounds: number = 40): AsciiInstanceData {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count * 2);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution with noise
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = bounds * (0.3 + Math.random() * 0.7);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random glyph from atlas
      const glyphIndex = Math.floor(Math.random() * GLYPH_COUNT);
      const uv = getGlyphUV(glyphIndex);
      offsets[i * 2] = uv.u - 0.5 / 8; // Center in glyph cell
      offsets[i * 2 + 1] = uv.v - 0.5 / 8;

      scales[i] = 0.5 + Math.random() * 1.0;
      speeds[i] = 0.1 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
      opacities[i] = 0.3 + Math.random() * 0.7;
    }

    return { positions, offsets, scales, speeds, phases, opacities };
  }, [count, bounds]);
}

export function createAsciiAttributes(data: AsciiInstanceData) {
  return {
    instancePosition: new InstancedBufferAttribute(data.positions, 3),
    instanceOffset: new InstancedBufferAttribute(data.offsets, 2),
    instanceScale: new InstancedBufferAttribute(data.scales, 1),
    instanceSpeed: new InstancedBufferAttribute(data.speeds, 1),
    instancePhase: new InstancedBufferAttribute(data.phases, 1),
    instanceOpacity: new InstancedBufferAttribute(data.opacities, 1),
  };
}