"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { 
  InstancedMesh, 
  PointsMaterial, 
  BufferGeometry, 
  CanvasTexture, 
  AdditiveBlending, 
  Vector3,
  Color,
  Matrix4,
  Float32BufferAttribute,
  InstancedBufferAttribute
} from "three";
import { useInstancedAscii, createAsciiAttributes } from "@/components/hooks/useInstancedAscii";
import { instanceCounts } from "@/lib/performance";

const asciiVertex = `
attribute vec3 instancePosition;
attribute vec2 instanceOffset;
attribute float instanceScale;
attribute float instanceSpeed;
attribute float instancePhase;
attribute float instanceOpacity;

uniform float uTime;
uniform mat4 uViewMatrix;
uniform vec3 uCameraPosition;
uniform vec3 uBlobCenter;
uniform float uBlobInfluence;
uniform float uMouseInfluence;

varying vec2 vUv;
varying float vOpacity;
varying float vDepth;

void main() {
  vec3 pos = instancePosition;

  pos.x += sin(uTime * instanceSpeed + instancePhase) * 3.0;
  pos.y += cos(uTime * instanceSpeed * 0.7 + instancePhase) * 2.0;
  pos.z += sin(uTime * instanceSpeed * 0.5 + instancePhase * 1.3) * 3.0;

  vec3 toBlob = uBlobCenter - pos;
  float dist = length(toBlob);
  if (dist < uBlobInfluence && uMouseInfluence > 0.5) {
    float influence = (uBlobInfluence - dist) / uBlobInfluence;
    pos += normalize(toBlob) * influence * 0.5 * uMouseInfluence;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float scale = instanceScale * (200.0 / -mvPosition.z);
  gl_PointSize = scale;
  gl_Position = projectionMatrix * mvPosition;

  vUv = uv + instanceOffset;
  vOpacity = instanceOpacity * (1.0 - smoothstep(0.0, uBlobInfluence, dist));
  vDepth = -mvPosition.z;
}
`;

const asciiFragment = `
uniform sampler2D uAtlas;
uniform float uTime;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform float uIntensity;

varying vec2 vUv;
varying float vOpacity;
varying float vDepth;

void main() {
  vec4 tex = texture2D(uAtlas, vUv);
  float alpha = tex.r * vOpacity;

  if (alpha < 0.05) discard;

  float depthFade = smoothstep(50.0, 100.0, vDepth);
  alpha *= (1.0 - depthFade * 0.7);

  float pulse = sin(uTime * 3.0 + vDepth * 0.1) * 0.3 + 0.7;
  alpha *= pulse;

  vec3 color = mix(uColorPrimary, uColorSecondary, sin(uTime + vDepth * 0.05) * 0.5 + 0.5);
  gl_FragColor = vec4(color * uIntensity, alpha * uIntensity);
}
`;

export function AsciiField({ quality = "high" }: { quality: "high" | "medium" | "low" }) {
  const count = instanceCounts[quality];
  const { camera } = useThree();
  const data = useInstancedAscii(count, 45);
  const attributes = useMemo(() => createAsciiAttributes(data), [data]);
  const meshRef = useRef<InstancedMesh<BufferGeometry, PointsMaterial>>(null);
  const materialRef = useRef<PointsMaterial | null>(null);
  const atlasRef = useRef<CanvasTexture | null>(null);
  const uniformsRef = useRef<any>(null);

  // Create atlas texture
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.font = "bold 89px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";

    const GLYPHS = [
      "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
      "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
      "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
      "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ",
      "▲","◆","◎","▣","▦","▧","▨","▩","○","●",
      "█","▓","▒","░","▄","▀","▌","▐","■","□",
      "0","1","{","}","[","]","<",">","|","_",
    ];

    GLYPHS.forEach((glyph, i) => {
      const col = i % 8;
      const row = Math.floor(i / 8);
      ctx.fillText(glyph, col * 128 + 64, row * 128 + 64);
    });

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    atlasRef.current = texture;
    if (materialRef.current) {
      materialRef.current.map = texture;
      materialRef.current.needsUpdate = true;
    }
  }, []);

  // Create material with custom shaders
  useEffect(() => {
    const material = new PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: false,
      map: atlasRef.current,
      alphaTest: 0.01,
    });
    
    (material as any).onBeforeCompile = (shader: any) => {
      shader.vertexShader = asciiVertex;
      shader.fragmentShader = asciiFragment;
      shader.uniforms.uAtlas = { value: atlasRef.current };
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uColorPrimary = { value: new Color(0x00ff66) };
      shader.uniforms.uColorSecondary = { value: new Color(0x00f0ff) };
      shader.uniforms.uIntensity = { value: 1 };
      shader.uniforms.uViewMatrix = { value: new Matrix4() };
      shader.uniforms.uCameraPosition = { value: new Vector3() };
      shader.uniforms.uBlobCenter = { value: new Vector3() };
      shader.uniforms.uBlobInfluence = { value: 15 };
      shader.uniforms.uMouseInfluence = { value: 0 };
      
      // Store uniforms ref for useFrame access
      uniformsRef.current = shader.uniforms;
    };
    
    materialRef.current = material;
    if (meshRef.current) {
      meshRef.current.material = material;
    }
  }, []);

  // Update uniforms per frame
  useFrame((state) => {
    if (!meshRef.current || !uniformsRef.current) return;

    const uniforms = uniformsRef.current;

    if (uniforms.uTime) uniforms.uTime.value = state.clock.getElapsedTime();
    if (uniforms.uViewMatrix) uniforms.uViewMatrix.value.copy(camera.matrixWorldInverse);
    if (uniforms.uCameraPosition) uniforms.uCameraPosition.value.copy(camera.position);
  });

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute([0, 0, 0], 3));
    geo.setAttribute("uv", new Float32BufferAttribute([0.5, 0.5], 2));
    return geo;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, materialRef.current!, count]}
      frustumCulled={false}
    >
      {Object.entries(attributes).map(([name, attr]) => (
        <primitive
          key={name}
          object={attr}
          attach={`attributes-${name}`}
        />
      ))}
    </instancedMesh>
  );
}