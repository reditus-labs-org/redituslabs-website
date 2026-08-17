uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uIntensity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 color = texture2D(tDiffuse, uv);

  // Scanlines
  float scan = sin(uv.y * uResolution.y * 0.5 + uTime * 10.0) * 0.02;
  color.rgb += scan;

  // Subtle vignette
  float vignette = 1.0 - length(uv - 0.5) * 0.5;
  color.rgb *= vignette;

  // Chromatic aberration (very subtle)
  float aberration = 0.0003 * uIntensity;
  vec2 offset = (uv - 0.5) * aberration;
  color.r = texture2D(tDiffuse, uv + offset).r;
  color.b = texture2D(tDiffuse, uv - offset).b;

  // Gamma correction
  color.rgb = pow(color.rgb, vec3(1.0 / 2.2));

  gl_FragColor = color;
}