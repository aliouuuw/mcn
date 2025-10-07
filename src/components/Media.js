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

varying vec2 vUv;

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength;

  vUv = uv;

  gl_Position = projectionMatrix * newPosition;
}`

const fragmentShader = `precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;
uniform float uTime;

varying vec2 vUv;

// Random function for grain effect
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Generate grain texture
float grain(vec2 uv, float time) {
    float noise = random(uv + time);
    noise = random(vec2(noise, time));
    return noise;
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

  // Add grain effect
  float grainAmount = grain(vUv * 2.0, uTime) * 0.03;
  color.rgb += grainAmount;

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
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uStrength: { value: 0 },
        uTime: { value: 0 }
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

    // Calculate dynamic strength based on scroll velocity
    const scrollVelocity = Math.abs(y.current - y.last) / this.screen.width
    this.plane.program.uniforms.uStrength.value = scrollVelocity * 10
    
    // Update time uniform for potential animations
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
