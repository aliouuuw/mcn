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
    this.isDestroyed = false
    this.animationId = null
    this.isPaused = false

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
    this.gl.canvas.style.pointerEvents = 'auto'
    
    // Store reference to canvas for proper cleanup
    this.canvas = this.gl.canvas
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

    // Add mouse tracking for hover effects and click detection
    this.mouse = { x: 0.5, y: 0.5 }
    this.hoveredMedia = null
    this.clickedMedia = null

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onTouchDown(event) {
    this.isDown = true
    this.isDragging = false
    this.dragThreshold = 5 // pixels

    this.scroll.position = this.scroll.current
    this.start = event.touches ? event.touches[0].clientY : event.clientY
    this.startX = event.touches ? event.touches[0].clientX : event.clientX
    this.startY = event.touches ? event.touches[0].clientY : event.clientY
  }

  onTouchMove(event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const y = event.touches ? event.touches[0].clientY : event.clientY
    
    // Check if we've moved enough to consider this a drag
    const deltaX = Math.abs(x - this.startX)
    const deltaY = Math.abs(y - this.startY)
    
    if (deltaX > this.dragThreshold || deltaY > this.dragThreshold) {
      this.isDragging = true
    }

    const distance = (this.start - y) * 2
    this.scroll.target = this.scroll.position + distance
  }

  onTouchUp(event) {
    // If we weren't dragging, treat this as a potential click
    if (this.isDown && !this.isDragging) {
      this.onClick(event)
    }
    
    this.isDown = false
    this.isDragging = false
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

    // Add delay to ensure grid layout has settled before updating media positions
    setTimeout(() => {
      if (this.medias) {
        this.medias.forEach(media => media.onResize({
          height: this.galleryHeight,
          screen: this.screen,
          viewport: this.viewport
        }))
      }
    }, 100) // Slightly longer delay for grid layout
  }

  update() {
    if (this.isDestroyed || this.isPaused) return

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

    this.animationId = window.requestAnimationFrame(this.update.bind(this))
  }

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
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
          
          // Add cursor pointer to indicate clickability
          this.hoveredMedia.element.style.cursor = 'pointer'
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
      
      // Reset cursor
      this.hoveredMedia.element.style.cursor = ''

      this.hoveredMedia = null
    }
  }

  onClick(event) {
    // Prevent default to avoid any unwanted behaviors
    event.preventDefault()
    event.stopPropagation()

    // Get click coordinates - handle both mouse and touch events
    const rect = this.gl.canvas.getBoundingClientRect()
    let clientX, clientY

    if (event.touches || event.changedTouches) {
      // Touch event
      const touch = event.changedTouches ? event.changedTouches[0] : event.touches[0]
      clientX = touch.clientX
      clientY = touch.clientY
    } else {
      // Mouse event
      clientX = event.clientX
      clientY = event.clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    // Convert to normalized coordinates
    const normalizedX = x / rect.width
    const normalizedY = 1.0 - (y / rect.height) // Flip Y coordinate

    // Find which media element was clicked
    const clickedMedia = this.getMediaAtPosition(normalizedX, normalizedY)

    if (clickedMedia) {
      this.showArtifactDetails(clickedMedia)
    }
  }

  getMediaAtPosition(x, y) {
    if (!this.medias) return null

    // Convert normalized coordinates to viewport coordinates
    const viewportX = (x - 0.5) * this.viewport.width
    const viewportY = (y - 0.5) * this.viewport.height

    // Check each media element to see if the click is within its bounds
    for (let i = 0; i < this.medias.length; i++) {
      const media = this.medias[i]
      if (!media.plane) continue

      const plane = media.plane
      const halfWidth = plane.scale.x / 2
      const halfHeight = plane.scale.y / 2

      // Check if click is within the plane bounds
      if (viewportX >= plane.position.x - halfWidth &&
          viewportX <= plane.position.x + halfWidth &&
          viewportY >= plane.position.y - halfHeight &&
          viewportY <= plane.position.y + halfHeight) {
        return media
      }
    }

    return null
  }

  showArtifactDetails(media) {
    if (!media || !media.element) return

    // Get artifact data from the element
    const img = media.element.querySelector('img')
    if (!img) return

    // Find the artifact data from the original artifacts array
    const artifactIndex = Array.from(this.mediasElements).indexOf(media.element)
    
    // Dispatch custom event with artifact details
    const artifactClickEvent = new CustomEvent('artifactClick', {
      detail: {
        index: artifactIndex,
        element: media.element,
        image: img,
        media: media
      }
    })

    // Dispatch the event on the gallery element so Collections can listen
    this.gallery.dispatchEvent(artifactClickEvent)
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

    // Add mouse tracking for enhanced visual effects and click detection
    this.gl.canvas.addEventListener('mousemove', this.onMouseMove)
    this.gl.canvas.addEventListener('mouseenter', this.onMouseEnter)
    this.gl.canvas.addEventListener('mouseleave', this.onMouseLeave)
    this.gl.canvas.addEventListener('click', this.onClick)

    // Add touch event listeners for mobile click detection
    this.gl.canvas.addEventListener('touchstart', this.onTouchDown.bind(this))
    this.gl.canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
    this.gl.canvas.addEventListener('touchend', this.onTouchUp.bind(this))
  }

  destroy() {
    if (this.isDestroyed) return
    this.isDestroyed = true

    console.log('WebGLGallery: Starting cleanup...')

    // Cancel animation frame
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId)
      this.animationId = null
    }

    // Remove all event listeners
    const removeEventListeners = () => {
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('mousewheel', this.onWheel)
      window.removeEventListener('wheel', this.onWheel)
      window.removeEventListener('mousedown', this.onTouchDown)
      window.removeEventListener('mousemove', this.onTouchMove)
      window.removeEventListener('mouseup', this.onTouchUp)
      window.removeEventListener('touchstart', this.onTouchDown)
      window.removeEventListener('touchmove', this.onTouchMove)
      window.removeEventListener('touchend', this.onTouchUp)

      // Clean up mouse tracking event listeners
      if (this.canvas) {
        this.canvas.removeEventListener('mousemove', this.onMouseMove)
        this.canvas.removeEventListener('mouseenter', this.onMouseEnter)
        this.canvas.removeEventListener('mouseleave', this.onMouseLeave)
        this.canvas.removeEventListener('click', this.onClick)

        // Clean up touch event listeners
        this.canvas.removeEventListener('touchstart', this.onTouchDown)
        this.canvas.removeEventListener('touchmove', this.onTouchMove)
        this.canvas.removeEventListener('touchend', this.onTouchUp)
      }
    }

    // Use try-catch to handle potential errors during listener removal
    try {
      removeEventListeners()
    } catch (error) {
      console.warn('Error removing event listeners:', error)
    }

    // Clean up media objects
    if (this.medias) {
      this.medias.forEach((media, index) => {
        try {
          if (media && media.destroy) {
            media.destroy()
          }
        } catch (error) {
          console.warn(`Error destroying media ${index}:`, error)
        }
      })
      this.medias = null
    }

    // Clean up geometry
    if (this.planeGeometry) {
      try {
        this.planeGeometry.dispose()
      } catch (error) {
        console.warn('Error disposing plane geometry:', error)
      }
      this.planeGeometry = null
    }

    // Clean up renderer and canvas
    if (this.renderer) {
      try {
        this.renderer.dispose()
      } catch (error) {
        console.warn('Error disposing renderer:', error)
      }
      this.renderer = null
    }

    // Force WebGL context loss
    if (this.gl && this.gl.getExtension) {
      try {
        const loseContext = this.gl.getExtension('WEBGL_lose_context')
        if (loseContext) {
          loseContext.loseContext()
        }
      } catch (error) {
        console.warn('Error forcing WebGL context loss:', error)
      }
    }

    // Remove canvas from DOM
    if (this.canvas && this.canvas.parentNode) {
      try {
        this.canvas.parentNode.removeChild(this.canvas)
      } catch (error) {
        console.warn('Error removing canvas from DOM:', error)
      }
    }

    // Clear canvas content and references
    if (this.canvas) {
      this.canvas.width = 0
      this.canvas.height = 0
      this.canvas = null
    }

    // Clear all other references
    this.hoveredMedia = null
    this.mediasElements = null
    this.gallery = null
    this.gl = null
    this.camera = null
    this.scene = null

    console.log('WebGLGallery: Cleanup completed')
  }
}
