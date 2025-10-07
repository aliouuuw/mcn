import React, { useRef, useEffect, useState } from 'react'
import WebGLGallery from './WebGLGallery.js'

const artifacts = [
  {
    type: "image",
    src: "/artifacts/artifact-1.jpg",
    titles: {
      fr: "Masque Traditionnel",
      en: "Traditional Mask",
    },
  },
  {
    type: "image",
    src: "/artifacts/artifact-2.jpg",
    titles: {
      fr: "Textile Kente",
      en: "Kente Textile",
    },
  },
  {
    type: "image",
    src: "/artifacts/artifact-3.jpg",
    titles: {
      fr: "Sculpture Ancienne",
      en: "Ancient Sculpture",
    },
  },
  {
    type: "image",
    src: "/artifacts/artifact-4.jpg",
    titles: {
      fr: "Masque Cerémonial",
      en: "Ceremonial Mask",
    },
  },
  {
    type: "video",
    src: "/artifacts/video-placeholder.png",
    thumbnail: "/artifacts/video-placeholder.png",
    titles: {
      fr: "Rituel Funéraire",
      en: "Funeral Ritual",
    },
  },
]

// Use original artifacts array - Media.js handles infinite looping
const infiniteArtifacts = artifacts

// Artistic asymmetric layout function inspired by template
const getArtisticLayout = (index) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1200
  
  if (isMobile) {
    // Mobile layout - simpler, more vertical, ensure full visibility
    const mobileLayouts = [
      { top: 0, left: 5, width: 85, height: 280, rotation: -1, borderRadius: 8 },
      { top: 300, left: 8, width: 82, height: 260, rotation: 1, borderRadius: 6 },
      { top: 580, left: 3, width: 88, height: 270, rotation: -0.5, borderRadius: 7 },
      { top: 870, left: 6, width: 84, height: 250, rotation: 0.8, borderRadius: 6 },
      { top: 1140, left: 4, width: 86, height: 290, rotation: -1.2, borderRadius: 8 },
      { top: 1450, left: 7, width: 83, height: 265, rotation: 1.1, borderRadius: 7 }
    ]
    return mobileLayouts[index % mobileLayouts.length]
  }
  
  if (isTablet) {
    // Tablet layout - medium complexity, ensure full visibility
    const tabletLayouts = [
      { top: 0, left: 5, width: 42, height: 380, rotation: -1.5, borderRadius: 10 },
      { top: 20, left: 50, width: 38, height: 340, rotation: 1.2, borderRadius: 8 },
      { top: 400, left: 6, width: 40, height: 360, rotation: -1, borderRadius: 9 },
      { top: 420, left: 52, width: 36, height: 320, rotation: 1.8, borderRadius: 7 },
      { top: 780, left: 4, width: 42, height: 390, rotation: -1.3, borderRadius: 11 },
      { top: 800, left: 48, width: 39, height: 350, rotation: 1.5, borderRadius: 8 },
      { top: 1200, left: 5, width: 41, height: 370, rotation: -1.1, borderRadius: 10 },
      { top: 1220, left: 51, width: 37, height: 330, rotation: 1.6, borderRadius: 8 }
    ]
    return tabletLayouts[index % tabletLayouts.length]
  }
  
  // Desktop layout - full artistic complexity, ensure full visibility
  const desktopLayouts = [
    // Artifact 1 - Large left panel
    { top: 0, left: 5, width: 38, height: 450, rotation: -2, borderRadius: 12 },
    // Artifact 2 - Medium right panel
    { top: 30, left: 48, width: 33, height: 380, rotation: 1.5, borderRadius: 8 },
    // Artifact 3 - Medium left panel, offset
    { top: 480, left: 6, width: 36, height: 420, rotation: -1, borderRadius: 10 },
    // Artifact 4 - Small right panel, higher
    { top: 100, left: 75, width: 26, height: 320, rotation: 2.5, borderRadius: 6 },
    // Artifact 5 - Large right panel
    { top: 450, left: 50, width: 40, height: 480, rotation: -1.5, borderRadius: 14 },
    // Artifact 6 - Medium left panel, lower
    { top: 920, left: 4, width: 34, height: 400, rotation: 1, borderRadius: 9 },
    // Artifact 7 - Large right panel, offset
    { top: 950, left: 45, width: 43, height: 460, rotation: -2.5, borderRadius: 16 },
    // Artifact 8 - Small right panel, middle
    { top: 520, left: 72, width: 28, height: 350, rotation: 1.8, borderRadius: 7 },
    // Artifact 9 - Medium left panel, spaced
    { top: 1350, left: 7, width: 37, height: 410, rotation: -1.2, borderRadius: 11 },
    // Artifact 10 - Small right panel, upper
    { top: 1430, left: 68, width: 30, height: 340, rotation: 2.2, borderRadius: 8 },
    // Artifact 11 - Extra large right panel
    { top: 1420, left: 47, width: 46, height: 520, rotation: -1.8, borderRadius: 18 },
    // Artifact 12 - Medium left panel, final
    { top: 1780, left: 5, width: 35, height: 390, rotation: 1.3, borderRadius: 10 }
  ]
  
  return desktopLayouts[index % desktopLayouts.length]
}

const Collections = () => {
  const galleryRef = useRef()
  const webglGalleryRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const initGallery = async () => {
      try {
        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        
        if (!gl) {
          throw new Error('WebGL not supported')
        }

        // Initialize WebGL gallery after component mounts
        if (galleryRef.current && !webglGalleryRef.current) {
          webglGalleryRef.current = new WebGLGallery(galleryRef.current)
          
          // Hide loading state after a short delay
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }
      } catch (error) {
        console.error('Failed to initialize WebGL gallery:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    initGallery()

    // Cleanup on unmount
    return () => {
      if (webglGalleryRef.current) {
        try {
          webglGalleryRef.current.destroy()
        } catch (error) {
          console.error('Error during cleanup:', error)
        }
        webglGalleryRef.current = null
      }
    }
  }, [])

  return (
    <div className={`collections-root min-h-screen relative overflow-hidden ${!isLoading ? 'loaded' : ''} ${hasError ? 'error' : ''}`}>
      {/* Background overlay */}
      <div className="collections-overlay-smooth" style={{ zIndex: 2 }} aria-hidden="true" />

      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f4f0] loading-screen">
          <div className="text-center">
            <div className="text-[#2f2f2f] text-xl font-light tracking-wider mb-4">Loading Gallery...</div>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      )}

      {/* Error screen */}
      {hasError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fef2f2]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-[#dc2626] text-2xl font-light tracking-wider mb-4">Gallery Unavailable</div>
            <p className="text-[#7f1d1d] text-sm mb-6">
              We're unable to load the WebGL gallery. This might be due to your browser not supporting WebGL or a graphics hardware issue.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-20 p-8 pointer-events-none header ${!isLoading ? 'header-visible' : ''}`}>
        <h1 className="text-[#1a1a1a] text-4xl font-light tracking-wider text-center">
          Musée des Civilisations Noires
        </h1>
        <p className="text-[#2f2f2f]/70 text-center mt-2">
          Infinite Gallery Experience
        </p>
      </div>

      {/* Hidden gallery container for WebGL to reference */}
      <div 
        ref={galleryRef}
        className="gallery-container"
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '2200px', // Increased height for artistic layout
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {infiniteArtifacts.map((artifact, index) => {
          // Artistic asymmetric layout inspired by template
          const layout = getArtisticLayout(index)
          
          return (
            <div 
              key={`${artifact.src}-${index}`}
              className="gallery-item"
              style={{
                position: 'absolute',
                top: `${layout.top}px`,
                left: `${layout.left}%`,
                width: `${layout.width}%`,
                height: `${layout.height}px`,
                transform: `rotate(${layout.rotation}deg)`,
                borderRadius: `${layout.borderRadius}px`
              }}
            >
              <img 
                src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
                alt={artifact.titles?.en || 'Artifact'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit'
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Instructions overlay */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="text-[#2f2f2f]/50 text-sm text-center">
          <p>Scroll to explore • Auto-scrolling enabled</p>
          <p className="text-xs mt-1">WebGL Infinite Gallery</p>
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f4f4f0] via-[#f4f4f0]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f4f0] via-[#f4f4f0]/50 to-transparent" />
      </div>
    </div>
  )
}

export default Collections
