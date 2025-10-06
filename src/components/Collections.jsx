import React, { useRef, useEffect, useState } from 'react'
import Lenis from 'lenis'

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

// Single artifact component
function ArtifactItem({ artifact, index, scrollY, cycleHeight }) {
  const ref = useRef()
  
  // Calculate position within the infinite loop
  const itemHeight = 600
  const basePosition = (index % artifacts.length) * itemHeight
  
  // Calculate parallax offset
  const parallaxOffset = scrollY * 0.1 * (index % 2 === 0 ? 1 : -1)
  
  // Calculate opacity based on scroll position with circular logic
  const viewportHeight = window.innerHeight
  const scrollCenter = scrollY + viewportHeight / 2
  
  // Distance from scroll center, accounting for circular nature
  let distanceFromCenter = Math.abs(scrollCenter - (basePosition + itemHeight / 2))
  
  // Handle circular distance calculation
  const halfCycle = cycleHeight / 2
  if (distanceFromCenter > halfCycle) {
    distanceFromCenter = cycleHeight - distanceFromCenter
  }
  
  const maxDistance = viewportHeight
  const opacity = Math.max(0.2, 1 - (distanceFromCenter / maxDistance))
  
  // Random horizontal offset for staggered layout
  const xOffset = index % 2 === 0 ? '10%' : '-10%'
  
  return (
    <div
      ref={ref}
      className="relative flex justify-center items-center mb-32"
      style={{
        transform: `translateX(${xOffset}) translateY(${parallaxOffset}px)`,
        opacity: opacity,
        transition: 'opacity 0.3s ease-out'
      }}
    >
      <div className="relative group">
        <img
          src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
          alt={artifact.titles?.en || 'Artifact'}
          className="max-w-md max-h-96 object-contain shadow-lg transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            filter: `brightness(${0.9 + opacity * 0.1})`,
          }}
        />
        
        {/* Video indicator */}
        {artifact.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Collections component
const Collections = () => {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef()
  
  // Single cycle of artifacts for circular loop
  const singleCycleHeight = artifacts.length * 600
  
  // Create enough copies to ensure seamless looping
  const infiniteArtifacts = [
    ...artifacts,
    ...artifacts,
    ...artifacts
  ]
  
  useEffect(() => {
    let animationId
    let currentScroll = 0
    
    // Custom smooth scroll handler for true circular looping
    const handleWheel = (e) => {
      e.preventDefault()
      
      // Adjust scroll speed
      const delta = e.deltaY * 2
      currentScroll += delta
      
      // Keep scroll within one cycle for seamless looping
      currentScroll = ((currentScroll % singleCycleHeight) + singleCycleHeight) % singleCycleHeight
      
      setScrollY(currentScroll)
    }
    
    // Smooth scroll animation
    const smoothScroll = () => {
      animationId = requestAnimationFrame(smoothScroll)
    }
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    smoothScroll()
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [singleCycleHeight])
  
  return (
    <div className="min-h-screen bg-white">
      {/* Content container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${infiniteArtifacts.length * 600}px` }}
      >
        {/* Artifacts */}
        <div className="relative z-10 pt-20 pb-20">
          {infiniteArtifacts.map((artifact, index) => (
            <ArtifactItem
              key={`${artifact.src}-${index}`}
              artifact={artifact}
              index={index}
              scrollY={scrollY}
              cycleHeight={singleCycleHeight}
            />
          ))}
        </div>
      </div>
      
      {/* Subtle gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>
      
      {/* Circular scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-1 h-16 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gray-400 rounded-full transition-all duration-300 ease-out"
            style={{ 
              height: `${(scrollY / singleCycleHeight) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Collections
