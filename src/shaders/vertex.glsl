#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;

varying vec2 vUv;

// Enhanced wave deformation function
vec3 applyWaveDeformation(vec3 pos, vec2 uv, float strength, vec2 viewportSizes) {
    // Primary wave deformation based on Y position
    float waveY = sin(pos.y / viewportSizes.y * PI + PI / 2.0) * -strength;
    
    // Secondary wave for more complex deformation
    float waveX = sin(pos.x / viewportSizes.x * PI * 0.5) * strength * 0.3;
    
    // Time-based wave animation
    float timeWave = sin(uTime * 0.002 + pos.y * 0.01) * strength * 0.1;
    
    return pos + vec3(0.0, 0.0, waveY + waveX + timeWave);
}

// Enhanced parallax displacement function
vec3 applyParallax(vec3 pos, vec2 uv, float strength, float hover) {
    // Subtle parallax based on depth and mouse position
    vec2 parallaxOffset = (uv - 0.5) * strength * 0.1;
    parallaxOffset += (uMouse - 0.5) * strength * hover * 0.05;
    
    // Add subtle wave motion
    float wave = sin(uTime * 0.001 + uv.x * PI) * 0.002;
    parallaxOffset.y += wave;
    
    return pos + vec3(parallaxOffset.x, parallaxOffset.y, 0.0);
}

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  // Apply enhanced wave deformation
  newPosition.xyz = applyWaveDeformation(newPosition.xyz, uv, uStrength, uViewportSizes);

  // Apply enhanced parallax effects
  newPosition.xyz = applyParallax(newPosition.xyz, uv, uStrength, uHover);

  vUv = uv;

  gl_Position = projectionMatrix * newPosition;
}
