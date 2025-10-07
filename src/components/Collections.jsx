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

// Artistic asymmetric layout function using CSS Grid with proper spacing
const getArtisticLayout = (index) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1200

  if (isMobile) {
    // Mobile layout - single column grid with generous spacing
    const mobileLayouts = [
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: -1, borderRadius: 8, zIndex: 1, shadow: '0 4px 20px rgba(0,0,0,0.1)' },
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: 1, borderRadius: 6, zIndex: 1, shadow: '0 3px 15px rgba(0,0,0,0.08)' },
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: -0.5, borderRadius: 7, zIndex: 1, shadow: '0 2px 12px rgba(0,0,0,0.06)' },
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: 0.8, borderRadius: 6, zIndex: 1, shadow: '0 2px 10px rgba(0,0,0,0.05)' },
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: -1.2, borderRadius: 8, zIndex: 1, shadow: '0 1px 8px rgba(0,0,0,0.04)' },
      { gridColumn: '1 / -1', gridRow: 'auto', rotation: 1.1, borderRadius: 7, zIndex: 1, shadow: '0 1px 6px rgba(0,0,0,0.03)' }
    ]
    return mobileLayouts[index % mobileLayouts.length]
  }

  if (isTablet) {
    // Tablet layout - 2 column grid with generous spacing
    const tabletLayouts = [
      { gridColumn: index % 2 === 0 ? '1 / 2' : '2 / 3', gridRow: 'auto', rotation: -1.5, borderRadius: 10, zIndex: 1, shadow: '0 6px 25px rgba(0,0,0,0.12)' },
      { gridColumn: index % 2 === 0 ? '2 / 3' : '1 / 2', gridRow: 'auto', rotation: 1.2, borderRadius: 8, zIndex: 1, shadow: '0 5px 20px rgba(0,0,0,0.1)' },
      { gridColumn: index % 2 === 0 ? '1 / 2' : '2 / 3', gridRow: 'auto', rotation: -1, borderRadius: 9, zIndex: 1, shadow: '0 4px 18px rgba(0,0,0,0.08)' },
      { gridColumn: index % 2 === 0 ? '2 / 3' : '1 / 2', gridRow: 'auto', rotation: 1.8, borderRadius: 7, zIndex: 1, shadow: '0 3px 15px rgba(0,0,0,0.06)' },
      { gridColumn: index % 2 === 0 ? '1 / 2' : '2 / 3', gridRow: 'auto', rotation: -1.3, borderRadius: 11, zIndex: 1, shadow: '0 3px 12px rgba(0,0,0,0.05)' },
      { gridColumn: index % 2 === 0 ? '2 / 3' : '1 / 2', gridRow: 'auto', rotation: 1.5, borderRadius: 8, zIndex: 1, shadow: '0 2px 10px rgba(0,0,0,0.04)' },
      { gridColumn: index % 2 === 0 ? '1 / 2' : '2 / 3', gridRow: 'auto', rotation: -1.1, borderRadius: 10, zIndex: 1, shadow: '0 2px 8px rgba(0,0,0,0.03)' },
      { gridColumn: index % 2 === 0 ? '2 / 3' : '1 / 2', gridRow: 'auto', rotation: 1.6, borderRadius: 8, zIndex: 1, shadow: '0 1px 6px rgba(0,0,0,0.02)' }
    ]
    return tabletLayouts[index % tabletLayouts.length]
  }

  // Desktop layout - 3 column grid with generous spacing
  const desktopLayouts = [
    { gridColumn: '1 / 2', gridRow: 'auto', rotation: -2, borderRadius: 12, zIndex: 1, shadow: '0 4px 20px rgba(0,0,0,0.1)' },
    { gridColumn: '2 / 3', gridRow: 'auto', rotation: 1.5, borderRadius: 8, zIndex: 1, shadow: '0 3px 15px rgba(0,0,0,0.08)' },
    { gridColumn: '3 / 4', gridRow: 'auto', rotation: -1, borderRadius: 10, zIndex: 1, shadow: '0 2px 12px rgba(0,0,0,0.06)' },
    { gridColumn: '1 / 3', gridRow: 'auto', rotation: 2.5, borderRadius: 6, zIndex: 1, shadow: '0 2px 10px rgba(0,0,0,0.05)' },
    { gridColumn: '2 / 4', gridRow: 'auto', rotation: -1.5, borderRadius: 14, zIndex: 1, shadow: '0 1px 8px rgba(0,0,0,0.04)' },
    { gridColumn: '1 / 2', gridRow: 'auto', rotation: 1, borderRadius: 9, zIndex: 1, shadow: '0 1px 6px rgba(0,0,0,0.03)' },
    { gridColumn: '3 / 4', gridRow: 'auto', rotation: -2.5, borderRadius: 16, zIndex: 1, shadow: '0 1px 4px rgba(0,0,0,0.02)' },
    { gridColumn: '2 / 3', gridRow: 'auto', rotation: 1.8, borderRadius: 7, zIndex: 1, shadow: '0 1px 3px rgba(0,0,0,0.01)' },
    { gridColumn: '1 / 3', gridRow: 'auto', rotation: -1.2, borderRadius: 11, zIndex: 1, shadow: '0 1px 2px rgba(0,0,0,0.01)' },
    { gridColumn: '3 / 4', gridRow: 'auto', rotation: 2.2, borderRadius: 8, zIndex: 1, shadow: '0 1px 2px rgba(0,0,0,0.01)' },
    { gridColumn: '2 / 4', gridRow: 'auto', rotation: -1.8, borderRadius: 18, zIndex: 1, shadow: '0 1px 2px rgba(0,0,0,0.01)' },
    { gridColumn: '1 / 2', gridRow: 'auto', rotation: 1.3, borderRadius: 10, zIndex: 1, shadow: '0 1px 2px rgba(0,0,0,0.01)' }
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

      {/* Hidden gallery container for WebGL to reference - CSS Grid with generous spacing */}
      <div
        ref={galleryRef}
        className="gallery-container"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '3000px', // Generous height for grid layout
          visibility: 'hidden',
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(200px, auto)',
          gap: '40px', // Generous spacing between grid items
          padding: '40px'
        }}
      >
        {infiniteArtifacts.map((artifact, index) => {
          // Artistic asymmetric layout with CSS Grid and generous spacing
          const layout = getArtisticLayout(index)

          return (
            <div
              key={`${artifact.src}-${index}`}
              className="gallery-item"
              style={{
                gridColumn: layout.gridColumn,
                gridRow: layout.gridRow,
                transform: `rotate(${layout.rotation}deg)`,
                borderRadius: `${layout.borderRadius}px`,
                zIndex: layout.zIndex || 1,
                boxShadow: layout.shadow || 'none',
                transition: 'all 0.3s ease-out',
                width: '100%',
                height: '100%',
                position: 'relative'
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
