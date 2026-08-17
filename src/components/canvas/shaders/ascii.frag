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

  // Distance-based fade
  float depthFade = smoothstep(50.0, 100.0, vDepth);
  alpha *= (1.0 - depthFade * 0.7);

  // Pulsing glow
  float pulse = sin(uTime * 3.0 + vDepth * 0.1) * 0.3 + 0.7;
  alpha *= pulse;

  // Color: primary green with cyan accents
  vec3 color = mix(uColorPrimary, uColorSecondary, sin(uTime + vDepth * 0.05) * 0.5 + 0.5);

  // Emissive glow
  gl_FragColor = vec4(color * uIntensity, alpha * uIntensity);
}