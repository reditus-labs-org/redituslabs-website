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

  // Drift animation
  pos.x += sin(uTime * instanceSpeed + instancePhase) * 3.0;
  pos.y += cos(uTime * instanceSpeed * 0.7 + instancePhase) * 2.0;
  pos.z += sin(uTime * instanceSpeed * 0.5 + instancePhase * 1.3) * 3.0;

  // Magnetism toward blob
  vec3 toBlob = uBlobCenter - pos;
  float dist = length(toBlob);
  if (dist < uBlobInfluence && uMouseInfluence > 0.5) {
    float influence = (uBlobInfluence - dist) / uBlobInfluence;
    pos += normalize(toBlob) * influence * 0.5 * uMouseInfluence;
  }

  // Billboard rotation to face camera
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Scale based on distance
  float scale = instanceScale * (200.0 / -mvPosition.z);
  gl_PointSize = scale;
  gl_Position = projectionMatrix * mvPosition;

  vUv = uv + instanceOffset;
  vOpacity = instanceOpacity * (1.0 - smoothstep(0.0, uBlobInfluence, dist));
  vDepth = -mvPosition.z;
}