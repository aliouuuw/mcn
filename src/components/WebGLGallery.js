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
  }

  destroy() {
    window.removeEventListener('resize', this.onResize.bind(this))
    window.removeEventListener('mousewheel', this.onWheel.bind(this))
    window.removeEventListener('wheel', this.onWheel.bind(this))
    window.removeEventListener('mousedown', this.onTouchDown.bind(this))
    window.removeEventListener('mousemove', this.onTouchMove.bind(this))
    window.removeEventListener('mouseup', this.onTouchUp.bind(this))
    window.removeEventListener('touchstart', this.onTouchDown.bind(this))
    window.removeEventListener('touchmove', this.onTouchMove.bind(this))
    window.removeEventListener('touchend', this.onTouchUp.bind(this))

    if (this.gl.canvas && this.gl.canvas.parentNode) {
      this.gl.canvas.parentNode.removeChild(this.gl.canvas)
    }
  }
}
