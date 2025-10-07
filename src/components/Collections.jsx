import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import WebGLGallery from './WebGLGallery.js'

// Import real artifacts data
import artifactsData from '../../artifacts_data.json'

const artifacts = artifactsData

// Use original artifacts array - Media.js handles infinite looping
const infiniteArtifacts = artifacts

// Enhanced artistic asymmetric layout function with more dynamic positioning
const getArtisticLayout = (index) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1200

  if (isMobile) {
    // Enhanced mobile layout with more variety
    const mobileLayouts = [
      { left: '5%', top: '0rem', width: '90%', height: '25rem', rotation: -1, borderRadius: 8, zIndex: 1 },
      { left: '10%', top: '30rem', width: '80%', height: '30rem', rotation: 1, borderRadius: 6, zIndex: 1 },
      { left: '0%', top: '65rem', width: '85%', height: '28rem', rotation: -0.5, borderRadius: 7, zIndex: 1 },
      { right: '5%', top: '98rem', width: '75%', height: '26rem', rotation: 0.8, borderRadius: 6, zIndex: 1 },
      { left: '8%', top: '129rem', width: '82%', height: '32rem', rotation: -1.2, borderRadius: 8, zIndex: 1 },
      { right: '3%', top: '166rem', width: '88%', height: '29rem', rotation: 1.1, borderRadius: 7, zIndex: 1 }
    ]
    return mobileLayouts[index % mobileLayouts.length]
  }

  if (isTablet) {
    // Tablet layout - inspired by template but adapted for tablet
    const tabletLayouts = [
      { left: '5%', top: '0rem', width: '45%', height: '35rem', rotation: -1.5, borderRadius: 10, zIndex: 1 },
      { right: '5%', top: '15rem', width: '40%', height: '40rem', rotation: 1.2, borderRadius: 8, zIndex: 1 },
      { left: '10%', top: '45rem', width: '50%', height: '38rem', rotation: -1, borderRadius: 9, zIndex: 1 },
      { right: '8%', top: '65rem', width: '42%', height: '35rem', rotation: 1.8, borderRadius: 7, zIndex: 1 },
      { left: '3%', top: '95rem', width: '48%', height: '45rem', rotation: -1.3, borderRadius: 11, zIndex: 1 },
      { right: '12%', top: '115rem', width: '45%', height: '40rem', rotation: 1.5, borderRadius: 8, zIndex: 1 },
      { left: '15%', top: '150rem', width: '52%', height: '42rem', rotation: -1.1, borderRadius: 10, zIndex: 1 },
      { right: '0%', top: '175rem', width: '47%', height: '38rem', rotation: 1.6, borderRadius: 8, zIndex: 1 }
    ]
    return tabletLayouts[index % tabletLayouts.length]
  }

  // Enhanced desktop layout with more artistic positioning
  const desktopLayouts = [
    { left: '0rem', top: '0rem', width: '35rem', height: '20rem', rotation: -2, borderRadius: 12, zIndex: 1 },
    { left: '42.5rem', top: '15rem', width: '20rem', height: '25rem', rotation: 1.5, borderRadius: 8, zIndex: 1 },
    { left: '7.5rem', top: '30rem', width: '30rem', height: '25rem', rotation: -1, borderRadius: 10, zIndex: 1 },
    { right: '0rem', top: '5rem', width: '25rem', height: '15rem', rotation: 2.5, borderRadius: 6, zIndex: 1 },
    { right: '7.5rem', top: '27.5rem', width: '20rem', height: '30rem', rotation: -1.5, borderRadius: 14, zIndex: 1 },
    { left: '2.5rem', top: '60rem', width: '28.75rem', height: '37.5rem', rotation: 1, borderRadius: 9, zIndex: 1 },
    { right: '0rem', top: '65rem', width: '25rem', height: '35rem', rotation: -2.5, borderRadius: 16, zIndex: 1 },
    { left: '42.5rem', top: '47.5rem', width: '20rem', height: '25rem', rotation: 1.8, borderRadius: 7, zIndex: 1 },
    { left: '37.5rem', top: '77.5rem', width: '25rem', height: '32.5rem', rotation: -1.2, borderRadius: 11, zIndex: 1 },
    { right: '0rem', top: '107.5rem', width: '15rem', height: '21.5rem', rotation: 2.2, borderRadius: 8, zIndex: 1 },
    { left: '35rem', top: '117.5rem', width: '40rem', height: '25rem', rotation: -1.8, borderRadius: 18, zIndex: 1 },
    { left: '0rem', top: '105rem', width: '25rem', height: '35rem', rotation: 1.3, borderRadius: 10, zIndex: 1 }
  ]

  return desktopLayouts[index % desktopLayouts.length]
}


const Collections = () => {
  const galleryRef = useRef()
  const webglGalleryRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()

  // Handle artifact click events
  useEffect(() => {
    const handleArtifactClick = (event) => {
      const { index } = event.detail
      const artifact = artifacts[index % artifacts.length]

      if (artifact && artifact.id) {
        // Navigate to artifact detail page using the artifact ID
        navigate({ to: `/artifact/${artifact.id}` })
      }
    }

    if (galleryRef.current) {
      galleryRef.current.addEventListener('artifactClick', handleArtifactClick)
    }

    return () => {
      if (galleryRef.current) {
        galleryRef.current.removeEventListener('artifactClick', handleArtifactClick)
      }
    }
  }, [navigate])

  useEffect(() => {
    let isMounted = true
    let initTimeout = null

    const initGallery = async () => {
      try {
        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        
        if (!gl) {
          throw new Error('WebGL not supported')
        }

        // Check for required extensions
        const requiredExtensions = ['OES_texture_float', 'OES_texture_half_float']
        const missingExtensions = requiredExtensions.filter(ext => !gl.getExtension(ext))
        
        if (missingExtensions.length > 0) {
          console.warn('Some WebGL extensions not available:', missingExtensions)
        }

        // Initialize WebGL gallery after component mounts
        if (galleryRef.current && !webglGalleryRef.current && isMounted) {
          // Add loading delay for smooth transition
          await new Promise(resolve => setTimeout(resolve, 500))
          
          if (!isMounted) return // Check if component is still mounted
          
          webglGalleryRef.current = new WebGLGallery(galleryRef.current)
          
          // Enhanced loading state with smooth transition
          initTimeout = setTimeout(() => {
            if (isMounted) {
              setIsLoading(false)
            }
          }, 1500)
        }
      } catch (error) {
        console.error('Failed to initialize WebGL gallery:', error)
        if (isMounted) {
          setHasError(true)
          setIsLoading(false)
        }
      }
    }

    initGallery()

    // Enhanced cleanup on unmount
    return () => {
      isMounted = false
      
      // Clear any pending timeouts
      if (initTimeout) {
        clearTimeout(initTimeout)
        initTimeout = null
      }

      // Force cleanup when component unmounts
      if (webglGalleryRef.current) {
        try {
          console.log('Collections: Cleaning up WebGL gallery...')
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => {
                  setHasError(false)
                  setIsLoading(true)
                  // Force re-initialization
                  if (webglGalleryRef.current) {
                    webglGalleryRef.current.destroy()
                    webglGalleryRef.current = null
                  }
                }}
                className="px-6 py-2 bg-[#dc2626] text-white rounded-lg hover:bg-[#b91c1c] transition-colors"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#f3f4f6] text-[#374151] rounded-lg hover:bg-[#e5e7eb] transition-colors"
              >
                Reload Page
              </button>
            </div>
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

      {/* Hidden gallery container for WebGL to reference - Absolute positioning like template */}
      <div
        ref={galleryRef}
        className="gallery-container"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '200rem', // Sufficient height for absolute positioned items
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {infiniteArtifacts.map((artifact, index) => {
          // Artistic asymmetric layout with absolute positioning and proper spacing
          const layout = getArtisticLayout(index)

          return (
            <div
              key={`${artifact.src}-${index}`}
              className="gallery-item"
              style={{
                position: 'absolute',
                left: layout.left,
                right: layout.right,
                top: layout.top,
                width: layout.width,
                height: layout.height,
                transform: `rotate(${layout.rotation}deg)`,
                borderRadius: `${layout.borderRadius}px`,
                zIndex: layout.zIndex || 1,
                transition: 'all 0.3s ease-out'
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

      {/* Overlay d'instructions */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="text-[#2f2f2f]/50 text-sm text-center">
          <p>Cliquez sur un artefact pour en savoir plus • Défilez pour explorer</p>
        </div>
      </div>


      {/* Gradient overlays for depth - matching hero section brownish tint */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#fbf9f7] via-[#f8f0e6]/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f4f0] via-[#f1e8d8]/60 to-transparent" />
      </div>
    </div>
  )
}

export default Collections
