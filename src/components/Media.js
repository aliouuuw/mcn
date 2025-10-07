import { Mesh, Program, Texture } from 'ogl'

const vertexShader = `#define PI 3.1415926535897932384626433832795

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

// Enhanced parallax displacement function with hover intensification
vec3 applyParallax(vec3 pos, vec2 uv, float strength, float hover) {
    // Base parallax based on scroll strength
    vec2 parallaxOffset = (uv - 0.5) * strength * 0.15;

    // Mouse-driven parallax that intensifies on hover
    vec2 mouseParallax = (uMouse - 0.5) * strength * hover * 0.08;
    parallaxOffset += mouseParallax;

    // Add organic wave motion that responds to hover
    float waveFrequency = mix(1.0, 2.0, hover); // Faster waves on hover
    float waveAmplitude = mix(0.003, 0.008, hover); // Stronger waves on hover
    float wave = sin(uTime * 0.001 * waveFrequency + uv.x * PI * 2.0) * waveAmplitude;
    parallaxOffset.y += wave;

    // Add secondary wave for more organic movement
    float secondaryWave = cos(uTime * 0.0007 * waveFrequency + uv.y * PI * 1.5) * waveAmplitude * 0.5;
    parallaxOffset.x += secondaryWave;

    // Add subtle depth displacement on hover
    float depthOffset = hover * sin(uv.x * PI) * sin(uv.y * PI) * 0.01;
    parallaxOffset += vec2(depthOffset, depthOffset);

    return pos + vec3(parallaxOffset.x, parallaxOffset.y, 0.0);
}

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  // Apply wave deformation
  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength;

  // Apply enhanced parallax effects
  newPosition.xyz = applyParallax(newPosition.xyz, uv, uStrength, uHover);

  vUv = uv;

  gl_Position = projectionMatrix * newPosition;
}`

const fragmentShader = `precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform sampler2D tGrain;
uniform float uTime;
uniform float uHover;

varying vec2 vUv;

// Random function for procedural grain effect
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Generate procedural grain texture
float proceduralGrain(vec2 uv, float time) {
    float noise = random(uv + time);
    noise = random(vec2(noise, time));
    return (noise - 0.5) * 2.0; // Normalize to -1 to 1 range
}

// Sample grain texture or fall back to procedural
float getGrain(vec2 uv, float time, sampler2D grainTex) {
    vec4 grainSample = texture2D(grainTex, uv);
    // If grain texture is loaded (not default white), use it
    if (grainSample.r != 1.0 || grainSample.g != 1.0 || grainSample.b != 1.0) {
        return (grainSample.r - 0.5) * 2.0; // Convert to -1 to 1 range
    } else {
        // Fall back to procedural grain
        return proceduralGrain(uv, time);
    }
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

  // Add subtle vignette effect
  float dist = distance(vUv, vec2(0.5, 0.5));
  float vignette = 1.0 - smoothstep(0.7, 1.2, dist);
  color.rgb *= vignette;

  // Add grain effect that intensifies on hover
  float grainUvScale = 3.0; // Scale UV for more detailed grain
  vec2 grainUv = vUv * grainUvScale;
  float grainAmount = getGrain(grainUv, uTime * 0.1, tGrain);

  // Base grain intensity, increases on hover
  float baseGrainIntensity = 0.02;
  float hoverGrainIntensity = 0.08;
  float grainIntensity = mix(baseGrainIntensity, hoverGrainIntensity, uHover);

  // Apply grain as overlay blend mode
  color.rgb = mix(color.rgb, color.rgb + grainAmount * grainIntensity, 0.7);

  // Add subtle brightness boost on hover
  color.rgb *= (1.0 + uHover * 0.1);

  gl_FragColor = color;
}`

export default class Media {
  constructor({ element, geometry, gl, height, scene, screen, viewport }) {
    this.element = element
    this.image = this.element.querySelector('img')

    this.extra = 0
    this.height = height
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.screen = screen
    this.viewport = viewport

    this.createMesh()
    this.createBounds()

    this.onResize()
  }

  createMesh() {
    const image = new Image()
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    })

    // Load grain texture for enhanced visual effects
    const grainTexture = new Texture(this.gl, {
      generateMipmaps: false
    })
    const grainImage = new Image()
    grainImage.crossOrigin = 'anonymous'
    grainImage.onload = () => {
      grainTexture.image = grainImage
      // Ensure texture is updated when image loads
      if (program.uniforms.tGrain) {
        program.uniforms.tGrain.value = grainTexture
      }
    }
    grainImage.onerror = () => {
      console.warn('Grain texture failed to load, using procedural grain')
      // Keep default white texture for procedural fallback
    }
    grainImage.src = '/images/grain.png'

    image.src = this.image.src
    image.onload = () => {
      program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight]
      texture.image = image
    }

    const program = new Program(this.gl, {
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: texture },
        tGrain: { value: grainTexture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uStrength: { value: 0 },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uMouse: { value: [0.5, 0.5] }
      },
      transparent: true
    })

    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program
    })

    this.plane.setParent(this.scene)
  }

  createBounds() {
    this.bounds = this.element.getBoundingClientRect()

    this.updateScale()
    this.updateX()
    this.updateY()

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
  }

  updateScale() {
    this.plane.scale.x = this.viewport.width * this.bounds.width / this.screen.width
    this.plane.scale.y = this.viewport.height * this.bounds.height / this.screen.height
  }

  updateX(x = 0) {
    this.plane.position.x = -(this.viewport.width / 2) + (this.plane.scale.x / 2) + ((this.bounds.left - x) / this.screen.width) * this.viewport.width
  }

  updateY(y = 0) {
    this.plane.position.y = ((this.viewport.height / 2) - (this.plane.scale.y / 2) - ((this.bounds.top - y) / this.screen.height) * this.viewport.height) - this.extra
  }

  update(y, direction) {
    this.updateScale()
    this.updateX()
    this.updateY(y.current)

    const planeOffset = this.plane.scale.y / 2
    const viewportOffset = this.viewport.height / 2

    this.isBefore = this.plane.position.y + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.y - planeOffset > viewportOffset

    if (direction === 'up' && this.isBefore) {
      this.extra -= this.height

      this.isBefore = false
      this.isAfter = false
    }

    if (direction === 'down' && this.isAfter) {
      this.extra += this.height

      this.isBefore = false
      this.isAfter = false
    }

    // Enhanced dynamic strength calculation based on scroll velocity
    const scrollVelocity = Math.abs(y.current - y.last) / this.screen.width
    const baseStrength = scrollVelocity * 15 // Increased base strength
    
    // Add momentum-based strength for more dramatic effects
    const momentum = Math.min(scrollVelocity * 2, 1.0)
    const enhancedStrength = baseStrength + (momentum * 5)
    
    // Apply strength with smooth interpolation
    const targetStrength = Math.min(enhancedStrength, 2.0) // Cap maximum strength
    this.plane.program.uniforms.uStrength.value = targetStrength
    
    // Update time uniform for animations
    this.plane.program.uniforms.uTime.value = performance.now() * 0.001
  }

  onResize(sizes) {
    this.extra = 0

    if (sizes) {
      const { height, screen, viewport } = sizes

      if (height) this.height = height
      if (screen) this.screen = screen
      if (viewport) {
        this.viewport = viewport
        // Update viewport sizes uniform for responsive wave calculations
        if (this.plane && this.plane.program) {
          this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
        }
      }
    }

    this.createBounds()
  }
}
