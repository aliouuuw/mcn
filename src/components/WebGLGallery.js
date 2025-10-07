import { Renderer, Camera, Transform, Plane } from 'ogl'
import NormalizeWheel from 'normalize-wheel'
import { lerp } from '../utils/math'
import Media from './Media.js'

export default class WebGLGallery {
  constructor(galleryElement) {
    this.scroll = {
      ease: 0.05,
      current: 0,
      target: 0,
      last: 0
    }

    this.speed = 2

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createGallery(galleryElement)

    this.onResize()

    this.createGeometry()
    this.createMedias()

    this.update()

    this.addEventListeners()
  }

  createGallery(galleryElement) {
    this.gallery = galleryElement
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true
    })

    this.gl = this.renderer.gl
    this.gl.canvas.style.position = 'fixed'
    this.gl.canvas.style.top = '0'
    this.gl.canvas.style.left = '0'
    this.gl.canvas.style.width = '100%'
    this.gl.canvas.style.height = '100%'
    this.gl.canvas.style.zIndex = '1'
    
    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 5
  }

  createScene() {
    this.scene = new Transform()
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 10
    })
  }

  createMedias() {
    this.mediasElements = this.gallery.querySelectorAll('.gallery-item')
    this.medias = Array.from(this.mediasElements).map(element => {
      let media = new Media({
        element,
        geometry: this.planeGeometry,
        gl: this.gl,
        height: this.galleryHeight,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport
      })

      return media
    })

    // Add mouse tracking for hover effects
    this.mouse = { x: 0.5, y: 0.5 }
    this.hoveredMedia = null

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onTouchDown(event) {
    this.isDown = true

    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove(event) {
    if (!this.isDown) return

    const y = event.touches ? event.touches[0].clientY : event.clientY
    const distance = (this.start - y) * 2

    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp() {
    this.isDown = false
  }

  onWheel(event) {
    const normalized = NormalizeWheel(event)
    const speed = normalized.pixelY

    this.scroll.target += speed * 0.5
  }

  onResize() {
    this.screen = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.renderer.setSize(this.screen.width, this.screen.height)

    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    })

    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.viewport = {
      height,
      width
    }

    this.galleryBounds = this.gallery.getBoundingClientRect()
    this.galleryHeight = this.viewport.height * this.galleryBounds.height / this.screen.height

    if (this.medias) {
      this.medias.forEach(media => media.onResize({
        height: this.galleryHeight,
        screen: this.screen,
        viewport: this.viewport
      }))
    }
  }

  update() {
    this.scroll.target += this.speed

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)

    if (this.scroll.current > this.scroll.last) {
      this.direction = 'down'
      this.speed = 2
    } else if (this.scroll.current < this.scroll.last) {
      this.direction = 'up'
      this.speed = -2
    }

    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, this.direction))
    }

    this.renderer.render({
      scene: this.scene,
      camera: this.camera
    })

    this.scroll.last = this.scroll.current

    window.requestAnimationFrame(this.update.bind(this))
  }

  onMouseMove(event) {
    this.mouse.x = event.clientX / this.screen.width
    this.mouse.y = 1.0 - (event.clientY / this.screen.height)

    // Update mouse position for all media
    if (this.medias) {
      this.medias.forEach(media => {
        if (media.plane && media.plane.program) {
          media.plane.program.uniforms.uMouse.value = [this.mouse.x, this.mouse.y]
        }
      })
    }
  }

  onMouseEnter(event) {
    // Find which media element is being hovered
    const element = event.target.closest('.gallery-item')
    if (element) {
      const index = Array.from(this.mediasElements).indexOf(element)
      if (index !== -1 && this.medias[index]) {
        this.hoveredMedia = this.medias[index]
        if (this.hoveredMedia.plane && this.hoveredMedia.plane.program) {
          // Smooth hover transition with easing
          this.hoveredMedia.hoverStartTime = performance.now()
          this.hoveredMedia.plane.program.uniforms.uHover.value = 1.0

          // Enhanced scale effect with more dramatic impact
          const originalScaleX = this.hoveredMedia.plane.scale.x
          const originalScaleY = this.hoveredMedia.plane.scale.y
          this.hoveredMedia.originalScale = { x: originalScaleX, y: originalScaleY }

          // Scale up more dramatically
          this.hoveredMedia.plane.scale.x = originalScaleX * 1.08
          this.hoveredMedia.plane.scale.y = originalScaleY * 1.08

          // Add subtle rotation for organic feel
          this.hoveredMedia.plane.rotation.z = Math.random() * 0.02 - 0.01

          // Increase z-index for layering
          this.hoveredMedia.element.style.zIndex = '15'
        }
      }
    }
  }

  onMouseLeave() {
    if (this.hoveredMedia && this.hoveredMedia.plane && this.hoveredMedia.plane.program) {
      // Smooth hover transition out
      this.hoveredMedia.plane.program.uniforms.uHover.value = 0.0

      // Reset scale effect
      if (this.hoveredMedia.originalScale) {
        this.hoveredMedia.plane.scale.x = this.hoveredMedia.originalScale.x
        this.hoveredMedia.plane.scale.y = this.hoveredMedia.originalScale.y
      }

      // Reset rotation
      this.hoveredMedia.plane.rotation.z = 0

      // Reset z-index
      this.hoveredMedia.element.style.zIndex = ''

      this.hoveredMedia = null
    }
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this))

    window.addEventListener('mousewheel', this.onWheel.bind(this))
    window.addEventListener('wheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    // Add mouse tracking for enhanced visual effects
    this.gl.canvas.addEventListener('mousemove', this.onMouseMove)
    this.gl.canvas.addEventListener('mouseenter', this.onMouseEnter)
    this.gl.canvas.addEventListener('mouseleave', this.onMouseLeave)
  }

  destroy() {
    // Remove all event listeners
    window.removeEventListener('resize', this.onResize.bind(this))
    window.removeEventListener('mousewheel', this.onWheel.bind(this))
    window.removeEventListener('wheel', this.onWheel.bind(this))
    window.removeEventListener('mousedown', this.onTouchDown.bind(this))
    window.removeEventListener('mousemove', this.onTouchMove.bind(this))
    window.removeEventListener('mouseup', this.onTouchUp.bind(this))
    window.removeEventListener('touchstart', this.onTouchDown.bind(this))
    window.removeEventListener('touchmove', this.onTouchMove.bind(this))
    window.removeEventListener('touchend', this.onTouchUp.bind(this))

    // Clean up mouse tracking event listeners
    if (this.gl.canvas) {
      this.gl.canvas.removeEventListener('mousemove', this.onMouseMove)
      this.gl.canvas.removeEventListener('mouseenter', this.onMouseEnter)
      this.gl.canvas.removeEventListener('mouseleave', this.onMouseLeave)
    }

    // Clean up media objects
    if (this.medias) {
      this.medias.forEach(media => {
        if (media.plane) {
          // Dispose of geometry and program
          if (media.plane.geometry) {
            media.plane.geometry.dispose()
          }
          if (media.plane.program) {
            media.plane.program.dispose()
          }
          // Remove from scene
          if (media.plane.parent) {
            media.plane.parent.removeChild(media.plane)
          }
        }
      })
      this.medias = null
    }

    // Clean up renderer and canvas
    if (this.renderer) {
      this.renderer.dispose()
    }

    if (this.gl.canvas && this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas)
    }

    // Clear references
    this.hoveredMedia = null
    this.mediasElements = null
    this.gallery = null
  }
}
