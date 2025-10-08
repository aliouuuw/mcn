import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import WebGLGallery from './WebGLGallery.js'

// Import real artifacts data
import artifactsData from '../../artifacts_data.json'

const artifacts = artifactsData

// Use original artifacts array - Media.js handles infinite looping
const infiniteArtifacts = artifacts


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

      {/* Gallery container using CSS Grid with improved scattered layout */}
      <div
        ref={galleryRef}
        className="gallery-container"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          minHeight: '100vh',
          visibility: 'hidden',
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateColumns: typeof window !== 'undefined' && window.innerWidth < 768
            ? 'repeat(2, 1fr)' // Mobile: 2 columns
            : typeof window !== 'undefined' && window.innerWidth < 1200
            ? 'repeat(4, 1fr)' // Tablet: 4 columns
            : 'repeat(6, 1fr)', // Desktop: 6 columns for better spacing
          gap: '2rem',
          padding: '3rem',
          alignItems: 'start' // Align items to top to prevent vertical overlap
        }}
      >
        {infiniteArtifacts.map((artifact, index) => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
          const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1200

          // Calculate grid spans for scattered effect on larger screens
          let gridColumnSpan = 'span 1'
          let gridRowSpan = 'span 1'

          if (!isMobile && !isTablet) {
            // Desktop: Enhanced randomization to create more spaced-out, organic layout
            const seed = index * 17 % 100 // Different seed for more variety

            // Column spans: favor smaller spans for better spacing
            let colSpan
            if (seed < 60) colSpan = 1 // 60% chance for 1-column (most common)
            else if (seed < 85) colSpan = 2 // 25% chance for 2-column
            else colSpan = 3 // 15% chance for 3-column (rare)

            // Row spans: create vertical variety
            const rowSeed = index * 23 % 100
            let rowSpan
            if (rowSeed < 55) rowSpan = 1 // 55% chance for 1-row
            else if (rowSeed < 85) rowSpan = 2 // 30% chance for 2-row
            else rowSpan = 3 // 15% chance for 3-row

            // Advanced logic to prevent consecutive large spans and create gaps
            if (index > 0) {
              const prevSeed = (index - 1) * 17 % 100
              let prevColSpan = 1
              if (prevSeed >= 60 && prevSeed < 85) prevColSpan = 2
              else if (prevSeed >= 85) prevColSpan = 3

              // If previous was large, prefer smaller spans and add spacing
              if (prevColSpan >= 2) {
                colSpan = Math.max(1, colSpan - 1)
                // Occasionally skip a column by using auto-placement
                if (seed % 7 === 0) {
                  gridColumnSpan = 'span 1'
                  // Add random column start to create gaps
                  const colStart = 1 + (seed % 5)
                  gridColumnSpan = `${colStart} / span 1`
                }
              }
            }

            gridColumnSpan = `span ${colSpan}`
            gridRowSpan = `span ${rowSpan}`
          }

          // Calculate responsive dimensions with more consistent heights
          let itemHeight
          if (isMobile) {
            itemHeight = `${22 + (index % 3) * 6}rem` // Mobile: 22rem, 28rem, 34rem
          } else if (isTablet) {
            itemHeight = `${28 + (index % 4) * 5}rem` // Tablet: 28rem, 33rem, 38rem, 43rem
          } else {
            // Desktop: Height based on row span with more variation
            const baseHeights = {1: 28, 2: 38, 3: 48}
            const spanNum = parseInt(gridRowSpan.split(' ')[1]) || 1
            const variation = (index % 5) * 3 // More subtle variation
            itemHeight = `${baseHeights[spanNum] + variation}rem`
          }

          // Add random positioning within grid cells for organic feel
          const justifyOptions = ['start', 'center', 'end']
          const alignOptions = ['start', 'center', 'end']
          const justifySelf = justifyOptions[index % justifyOptions.length]
          const alignSelf = alignOptions[(index * 2) % alignOptions.length]

          return (
            <div
              key={`${artifact.src}-${index}`}
              className="gallery-item"
              style={{
                height: itemHeight,
                borderRadius: `${10 + (index % 3) * 2}px`, // More subtle border radius variation
                overflow: 'hidden',
                transition: 'all 0.4s ease-out',
                gridColumn: gridColumnSpan,
                gridRow: gridRowSpan,
                justifySelf: justifySelf,
                alignSelf: alignSelf,
                // Add margin for extra spacing between items
                margin: `${(index % 2) * 0.5}rem`,
                // Ensure minimum spacing
                minWidth: isMobile ? '120px' : isTablet ? '150px' : '180px'
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
