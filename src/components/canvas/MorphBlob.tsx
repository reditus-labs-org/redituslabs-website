"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { 
  Mesh, 
  ShaderMaterial, 
  IcosahedronGeometry, 
  AdditiveBlending,
  Vector3,
  Color,
  DoubleSide
} from "three";
import { blobSubdivisions } from "@/lib/performance";

const blobVertex = `
varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouseVelocity;
uniform float uBlobIntensity;
uniform float uMorphFactor;

float snoise(vec3 v);
float fbm(vec3 p, int octaves);
vec3 domainWarp(vec3 p, float time);

void main() {
  vNormal = normalMatrix * normal;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vUv = uv;

  vec3 pos = position;

  vec3 warped = domainWarp(pos * 1.5, uTime * 0.5);
  
  float disp = fbm(warped * 2.0 + uTime * 0.3, 5);
  disp = pow(disp * 0.5 + 0.5, 1.5);
  
  float ripple = length(uMouseVelocity) * 0.01;
  float rippleWave = sin(length(pos.xz) * 15.0 - uTime * 8.0 + ripple * 50.0) * 0.08;
  
  float morph = sin(uTime * 0.7) * 0.1 * uMorphFactor;
  
  float totalDisp = disp + rippleWave + morph;
  vDisplacement = totalDisp;
  
  pos += normal * totalDisp * uBlobIntensity;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const blobFragment = `
varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouseVelocity;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uCameraPosition;

void main() {
  vec3 viewDir = normalize(uCameraPosition - vWorldPos);
  float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);
  
  float scan = sin(vWorldPos.y * 60.0 + uTime * 15.0) * 0.03;
  
  float vel = length(uMouseVelocity);
  float ripple = sin(length(vWorldPos.xz) * 12.0 - uTime * 6.0 + vel * 30.0) * 0.15 * vel;
  
  float dispColor = vDisplacement * 0.5 + 0.5;
  
  vec3 baseColor = mix(uColorA, uColorB, dispColor);
  
  vec3 glow = vec3(0.0, 1.0, 0.6) * fresnel * 1.5;
  
  vec3 emission = baseColor * (0.3 + fresnel * 0.7 + ripple + scan);
  
  vec3 color = (emission + glow) * uIntensity;
  
  float alpha = (0.2 + fresnel * 0.6 + ripple * 0.3) * uIntensity;
  
  gl_FragColor = vec4(color, alpha);
}
`;

// Include noise functions
const noiseFunctions = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p, int octaves) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

vec3 domainWarp(vec3 p, float time) {
  vec3 q = vec3(
    fbm(p + vec3(time * 0.1, 0.0, 0.0), 4),
    fbm(p + vec3(0.0, time * 0.1, 0.0), 4),
    fbm(p + vec3(0.0, 0.0, time * 0.1), 4)
  );
  return p + q * 0.3;
}
`;

export function MorphBlob({ quality = "high" }: { quality: "high" | "medium" | "low" }) {
  const subdivisions = blobSubdivisions[quality];
  const { camera } = useThree();
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);
  const geometryRef = useRef<IcosahedronGeometry | null>(null);

  useEffect(() => {
    const geometry = new IcosahedronGeometry(3, subdivisions);
    geometryRef.current = geometry;
    if (meshRef.current) {
      meshRef.current.geometry = geometry;
    }
  }, [subdivisions]);

  useEffect(() => {
    const material = new ShaderMaterial({
      vertexShader: noiseFunctions + blobVertex,
      fragmentShader: blobFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      side: DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uMouseVelocity: { value: new Vector3() },
        uBlobIntensity: { value: 1 },
        uMorphFactor: { value: 0 },
        uIntensity: { value: 1 },
        uColorA: { value: new Color(0x00ff66) },
        uColorB: { value: new Color(0x00f0ff) },
        uCameraPosition: { value: new Vector3() },
      },
    });
    materialRef.current = material;
    if (meshRef.current) {
      meshRef.current.material = material;
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const material = materialRef.current;
    const uniforms = material.uniforms;

    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uCameraPosition.value.copy(camera.position);
  });

  return (
    <mesh ref={meshRef} geometry={geometryRef.current!} material={materialRef.current!} />
  );
}