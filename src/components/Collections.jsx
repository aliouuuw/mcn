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

const Collections = () => {
  const galleryRef = useRef()
  const webglGalleryRef = useRef()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize WebGL gallery after component mounts
    if (galleryRef.current && !webglGalleryRef.current) {
      webglGalleryRef.current = new WebGLGallery(galleryRef.current)
      
      // Hide loading state after a short delay
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    // Cleanup on unmount
    return () => {
      if (webglGalleryRef.current) {
        webglGalleryRef.current.destroy()
        webglGalleryRef.current = null
      }
    }
  }, [])

  return (
    <div className="collections-root min-h-screen relative overflow-hidden">
      {/* Background overlay */}
      <div className="collections-overlay-smooth" style={{ zIndex: 2 }} aria-hidden="true" />

      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f4f0]">
          <div className="text-[#2f2f2f] text-xl font-light tracking-wider">Loading Gallery...</div>
        </div>
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 p-8 pointer-events-none">
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
          height: `${artifacts.length * 450}px`, // Height for WebGL calculations
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {infiniteArtifacts.map((artifact, index) => {
          // Create regular 2-column grid layout
          const isLeftColumn = index % 2 === 0
          const rowIndex = Math.floor(index / 2)
          
          return (
            <div 
              key={`${artifact.src}-${index}`}
              className="gallery-item"
              style={{
                position: 'absolute',
                top: `${rowIndex * 450}px`,
                left: isLeftColumn ? '10%' : '55%',
                width: '35%',
                height: '400px'
              }}
            >
              <img 
                src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
                alt={artifact.titles?.en || 'Artifact'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
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
