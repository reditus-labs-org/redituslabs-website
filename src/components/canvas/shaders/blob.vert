#include <common>
#include <noise>

uniform float uTime;
uniform vec2 uMouseVelocity;
uniform float uBlobIntensity;
uniform float uMorphFactor;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
varying vec2 vUv;

void main() {
  vNormal = normalMatrix * normal;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vUv = uv;

  vec3 pos = position;

  // Domain warp for organic base shape
  vec3 warped = domainWarp(pos * 1.5, uTime * 0.5);
  
  // FBM displacement
  float disp = fbm(warped * 2.0 + uTime * 0.3, 5);
  disp = pow(disp * 0.5 + 0.5, 1.5);
  
  // Mouse velocity ripple
  float ripple = length(uMouseVelocity) * 0.01;
  float rippleWave = sin(length(pos.xz) * 15.0 - uTime * 8.0 + ripple * 50.0) * 0.08;
  
  // Morph factor for section transitions
  float morph = sin(uTime * 0.7) * 0.1 * uMorphFactor;
  
  float totalDisp = disp + rippleWave + morph;
  vDisplacement = totalDisp;
  
  pos += normal * totalDisp * uBlobIntensity;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}