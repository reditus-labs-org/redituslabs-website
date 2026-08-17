"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const postFragment = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uIntensity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 color = texture2D(tDiffuse, uv);

  float scan = sin(uv.y * uResolution.y * 0.5 + uTime * 10.0) * 0.02;
  color.rgb += scan;

  float vignette = 1.0 - length(uv - 0.5) * 0.5;
  color.rgb *= vignette;

  float aberration = 0.0003 * uIntensity;
  vec2 offset = (uv - 0.5) * aberration;
  color.r = texture2D(tDiffuse, uv + offset).r;
  color.b = texture2D(tDiffuse, uv - offset).b;

  color.rgb = pow(color.rgb, vec3(1.0 / 2.2));

  gl_FragColor = color;
}
`;

const postVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export function PostProcessing() {
  const { gl, size, camera, scene } = useThree();
  const materialRef = useRef<ShaderMaterial | null>(null);
  const quadRef = useRef<THREE.Mesh | null>(null);
  const rtRef = useRef<THREE.WebGLRenderTarget | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const material = new ShaderMaterial({
      vertexShader: postVertex,
      fragmentShader: postFragment,
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uIntensity: { value: 1 },
        uResolution: { value: new Vector2(size.width, size.height) },
      },
      depthWrite: false,
      transparent: true,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    quad.frustumCulled = false;
    quadRef.current = quad;

    const rt = new THREE.WebGLRenderTarget(size.width * Math.min(window.devicePixelRatio, 2), size.height * Math.min(window.devicePixelRatio, 2), {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });
    rtRef.current = rt;

    return () => {
      material.dispose();
      geometry.dispose();
      rt.dispose();
    };
  }, [size]);

  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
    }
  });

  useFrame(() => {
    if (!quadRef.current || !materialRef.current || !rtRef.current) return;

    // Render scene to render target
    gl.setRenderTarget(rtRef.current);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Update material with render target texture
    materialRef.current.uniforms.tDiffuse.value = rtRef.current.texture;

    // Render fullscreen quad with effect
    gl.render(quadRef.current, camera);
  }, 1);

  return null;
}