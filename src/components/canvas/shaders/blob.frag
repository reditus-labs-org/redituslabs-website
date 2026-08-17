uniform float uTime;
uniform vec2 uMouseVelocity;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uCameraPosition;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying float vDisplacement;
varying vec2 vUv;

void main() {
  vec3 viewDir = normalize(uCameraPosition - vWorldPos);
  float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);
  
  // Scanlines
  float scan = sin(vWorldPos.y * 60.0 + uTime * 15.0) * 0.03;
  
  // Ripple from mouse velocity
  float vel = length(uMouseVelocity);
  float ripple = sin(length(vWorldPos.xz) * 12.0 - uTime * 6.0 + vel * 30.0) * 0.15 * vel;
  
  // Displacement-based color variation
  float dispColor = vDisplacement * 0.5 + 0.5;
  
  // Color mix: green to cyan
  vec3 baseColor = mix(uColorA, uColorB, dispColor);
  
  // Fresnel glow
  vec3 glow = vec3(0.0, 1.0, 0.6) * fresnel * 1.5;
  
  // Core emission
  vec3 emission = baseColor * (0.3 + fresnel * 0.7 + ripple + scan);
  
  // Final color with intensity
  vec3 color = (emission + glow) * uIntensity;
  
  // Alpha based on fresnel and displacement
  float alpha = (0.2 + fresnel * 0.6 + ripple * 0.3) * uIntensity;
  
  gl_FragColor = vec4(color, alpha);
}