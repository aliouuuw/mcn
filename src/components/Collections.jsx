import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useTexture, Text } from '@react-three/drei'
import * as THREE from 'three'

// Mock artifacts data with images and videos - expanded collection
const artifacts = [
  // Column 1 - Ancient artifacts
  {
    id: 1,
    type: 'image',
    src: '/artifacts/jayanth-muppaneni-DiIP-FT2hjc-unsplash.jpg',
    title: 'Masque Traditionnel',
    period: 'XIVe siècle',
    culture: 'Culture Dogon',
    column: 0
  },
  {
    id: 2,
    type: 'video',
    src: '/artifacts/sample-video-3.mp4',
    thumbnail: '/artifacts/the-cleveland-museum-of-art-lJ13ir2oClo-unsplash.jpg',
    title: 'Rituel Funéraire',
    period: 'XVe siècle',
    culture: 'Civilisation Ashanti',
    column: 0
  },
  {
    id: 3,
    type: 'image',
    src: '/artifacts/wadi-lissa-H0PgP6Ng440-unsplash.jpg',
    title: 'Textile Kente',
    period: 'XIXe siècle',
    culture: 'Peuple Akan',
    column: 0
  },

  // Column 2 - Sculptures and ceremonial pieces
  {
    id: 4,
    type: 'image',
    src: '/artifacts/the-cleveland-museum-of-art-lJ13ir2oClo-unsplash.jpg',
    title: 'Sculpture Ancienne',
    period: 'XVIe siècle',
    culture: 'Royaume du Bénin',
    column: 1
  },
  {
    id: 5,
    type: 'video',
    src: '/artifacts/sample-video-1.mp4',
    thumbnail: '/artifacts/pyx-photography-8BuIYlCzI8A-unsplash.jpg',
    title: 'Danse Rituelle',
    period: 'Contemporain',
    culture: 'Tradition Yoruba',
    column: 1
  },
  {
    id: 6,
    type: 'image',
    src: '/artifacts/jayanth-muppaneni-DiIP-FT2hjc-unsplash.jpg',
    title: 'Masque Cerémonial',
    period: 'XVIIe siècle',
    culture: 'Culture Senufo',
    column: 1
  },

  // Column 3 - Contemporary and modern works
  {
    id: 7,
    type: 'video',
    src: '/artifacts/sample-video-2.mp4',
    thumbnail: '/artifacts/jayanth-muppaneni-DiIP-FT2hjc-unsplash.jpg',
    title: 'Cérémonie Ancestrale',
    period: 'Tradition orale',
    culture: 'Culture Bambara',
    column: 2
  },
  {
    id: 8,
    type: 'image',
    src: '/artifacts/pyx-photography-8BuIYlCzI8A-unsplash.jpg',
    title: 'Art Contemporain',
    period: 'XXIe siècle',
    culture: 'Artiste Moderne',
    column: 2
  },
  {
    id: 9,
    type: 'video',
    src: '/artifacts/sample-video-4.mp4',
    thumbnail: '/artifacts/wadi-lissa-H0PgP6Ng440-unsplash.jpg',
    title: 'Performance Culturelle',
    period: '2020',
    culture: 'Fusion Contemporaine',
    column: 2
  }
]

// Column configuration
const COLUMNS = 3
const SCROLL_SPEEDS = [0.3, 0.5, 0.2] // Different speeds for each column

// 3D Gallery Item Component
function GalleryItem({ artifact, index, columnIndex, scrollProgress, isDuplicate = false }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Load texture based on type
  const texture = useTexture(artifact.type === 'video' ? artifact.thumbnail : artifact.src)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  // Column spacing and positioning
  const columnSpacing = 8 // Space between columns
  const columnX = (columnIndex - 1) * columnSpacing // Center around column 1

  // Get artifacts in this column
  const columnArtifacts = artifacts.filter(art => art.column === columnIndex)
  const itemsInColumn = columnArtifacts.length
  const spacing = 8 // Increased spacing for better visibility
  const totalColumnHeight = itemsInColumn * spacing * 2 // Double for seamless loop

  // Individual scroll progress for this column
  const columnScrollSpeed = SCROLL_SPEEDS[columnIndex]
  const columnScrollProgress = scrollProgress * columnScrollSpeed

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Calculate base position
    let baseY = -index * spacing
    if (isDuplicate) {
      baseY -= itemsInColumn * spacing // Offset duplicates
    }

    // Apply scroll offset
    const scrollOffset = (columnScrollProgress * totalColumnHeight) % totalColumnHeight
    let yPos = baseY + scrollOffset

    // Seamless looping - normalize position within the loop range
    while (yPos > totalColumnHeight / 2) {
      yPos -= totalColumnHeight
    }
    while (yPos < -totalColumnHeight / 2) {
      yPos += totalColumnHeight
    }

    meshRef.current.position.y = yPos
    meshRef.current.position.x = columnX

    // Parallax and depth effects
    const distanceFromCenter = Math.abs(yPos)
    const maxDistance = 20
    const scale = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7)
    const zPos = -distanceFromCenter * 0.1 - 2 - (columnIndex * 0.3)

    meshRef.current.scale.setScalar(scale * (hovered ? 1.1 : 1))
    meshRef.current.position.z = zPos

    // Subtle rotation with column-specific timing
    meshRef.current.rotation.y = Math.sin(time * 0.2 + index + columnIndex) * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.15 + index * 0.3 + columnIndex * 0.5) * 0.01

    // Opacity based on distance with smoother falloff
    if (meshRef.current.material) {
      const opacity = Math.max(0.1, 1 - (distanceFromCenter / maxDistance))
      meshRef.current.material.opacity = opacity
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[columnX, -index * spacing, -2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[3.5, 4.5]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Video indicator for video items */}
      {artifact.type === 'video' && (
        <mesh position={[columnX, -index * spacing, -1.8]}>
          <circleGeometry args={[0.25, 32]} />
          <meshBasicMaterial color="#CD853F" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  )
}

// 3D Scene Component
function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={0.3} />

      <Suspense fallback={null}>
        {/* Render artifacts by column */}
        {Array.from({ length: COLUMNS }, (_, columnIndex) => {
          const columnArtifacts = artifacts.filter(art => art.column === columnIndex)

          return (
            <group key={`column-${columnIndex}`}>
              {/* Original items */}
              {columnArtifacts.map((artifact, index) => (
                <GalleryItem
                  key={`${artifact.id}-original`}
                  artifact={artifact}
                  index={index}
                  columnIndex={columnIndex}
                  scrollProgress={scrollProgress}
                  isDuplicate={false}
                />
              ))}

              {/* Duplicate items for seamless looping */}
              {columnArtifacts.map((artifact, index) => (
                <GalleryItem
                  key={`${artifact.id}-duplicate`}
                  artifact={artifact}
                  index={index}
                  columnIndex={columnIndex}
                  scrollProgress={scrollProgress}
                  isDuplicate={true}
                />
              ))}
            </group>
          )
        })}
      </Suspense>
    </>
  )
}

// Info Panel Component
function InfoPanel({ artifact, visible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="fixed right-4 md:right-8 top-auto md:top-1/2 bottom-24 md:bottom-auto md:-translate-y-1/2 z-30 max-w-[calc(100%-2rem)] md:max-w-sm"
    >
      <div className="glass-panel p-4 md:p-6 rounded-2xl">
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          {artifact.title}
        </motion.h3>
        <p className="text-xs md:text-sm text-gray-600 mb-1">{artifact.period}</p>
        <p className="text-xs md:text-sm text-amber-700 font-medium">{artifact.culture}</p>
        
        {artifact.type === 'video' && (
          <motion.button
            className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-full text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
            Lire la vidéo
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

const Collections = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentArtifact, setCurrentArtifact] = useState(artifacts[0])
  const containerRef = useRef()

  useEffect(() => {
    let rafId = null
    let scrollY = 0
    let targetScrollY = 0
    let touchStartY = 0
    let touchStartScrollY = 0

    const handleWheel = (e) => {
      e.preventDefault()
      targetScrollY += e.deltaY * 0.0008 // Slower, smoother scrolling
      // Normalize to 0-1 range for infinite loop
      targetScrollY = ((targetScrollY % 1) + 1) % 1
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchStartScrollY = targetScrollY
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      targetScrollY = touchStartScrollY + deltaY * 0.0015
      // Normalize to 0-1 range for infinite loop
      targetScrollY = ((targetScrollY % 1) + 1) % 1
    }

    const animate = () => {
      // Smooth lerp with slower interpolation for more cinematic feel
      scrollY += (targetScrollY - scrollY) * 0.08
      
      // Normalize scroll progress to prevent infinite growth
      const normalizedScrollY = ((scrollY % 1) + 1) % 1
      setScrollProgress(normalizedScrollY)

      // Update current artifact based on scroll - find the most visible artifact
      const centerY = 0 // Center of viewport
      let closestArtifact = artifacts[0]
      let minDistance = Infinity

      artifacts.forEach(artifact => {
        const columnArtifacts = artifacts.filter(art => art.column === artifact.column)
        const itemsInColumn = columnArtifacts.length
        const spacing = 8
        const totalColumnHeight = itemsInColumn * spacing * 2
        const columnScrollSpeed = SCROLL_SPEEDS[artifact.column]
        const columnScrollProgress = normalizedScrollY * columnScrollSpeed

        const itemIndex = columnArtifacts.findIndex(art => art.id === artifact.id)
        const baseY = -itemIndex * spacing
        const scrollOffset = (columnScrollProgress * totalColumnHeight) % totalColumnHeight
        let yPos = baseY + scrollOffset

        // Normalize position within loop range
        while (yPos > totalColumnHeight / 2) {
          yPos -= totalColumnHeight
        }
        while (yPos < -totalColumnHeight / 2) {
          yPos += totalColumnHeight
        }

        const distance = Math.abs(yPos - centerY)
        if (distance < minDistance) {
          minDistance = distance
          closestArtifact = artifact
        }
      })

      setCurrentArtifact(closestArtifact)

      rafId = requestAnimationFrame(animate)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      container.addEventListener('touchstart', handleTouchStart, { passive: false })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      animate()
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="collections-root relative min-h-screen w-full overflow-hidden bg-[#f4f4f0]"
    >
      {/* Background overlay similar to hero */}
      <div className="absolute inset-0 collections-overlay-smooth" aria-hidden="true" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl" />
      </div>


      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Info Panel */}
      <InfoPanel artifact={currentArtifact} visible={true} />

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-600 uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-amber-600 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-30">
        <div className="w-1 h-24 md:h-32 bg-gray-300/50 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-amber-600 origin-top"
            style={{ 
              height: '100%',
              scaleY: scrollProgress
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Collections
