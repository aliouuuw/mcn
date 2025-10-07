precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform sampler2D tGrain;
uniform float uTime;
uniform float uHover;

varying vec2 vUv;

// Enhanced random function for grain effect
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Generate procedural grain texture
float grain(vec2 uv, float time) {
    float noise = random(uv + time);
    noise = random(vec2(noise, time));
    return noise;
}

// Enhanced noise function
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Film grain effect
float filmGrain(vec2 uv, float time) {
    float grain = 0.0;
    grain += noise(uv * 200.0 + time) * 0.1;
    grain += noise(uv * 100.0 + time * 0.5) * 0.05;
    grain += noise(uv * 50.0 + time * 0.25) * 0.025;
    return grain;
}

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 color = texture2D(tMap, uv);
  
  // Enhanced vignette effect with hover interaction
  float dist = distance(vUv, vec2(0.5, 0.5));
  float vignette = 1.0 - smoothstep(0.6, 1.0, dist);
  vignette = mix(vignette, 1.0, uHover * 0.3); // Reduce vignette on hover
  color.rgb *= vignette;

  // Enhanced grain effect with hover interaction
  float grainAmount = filmGrain(vUv, uTime) * 0.02;
  grainAmount = mix(grainAmount, grainAmount * 0.5, uHover); // Reduce grain on hover
  color.rgb += grainAmount;

  // Subtle color grading
  color.rgb = pow(color.rgb, vec3(0.95)); // Slight desaturation
  
  // Add subtle glow effect on hover
  if (uHover > 0.0) {
    float glow = sin(uTime * 0.003) * 0.02 * uHover;
    color.rgb += glow;
  }

  gl_FragColor = color;
}
