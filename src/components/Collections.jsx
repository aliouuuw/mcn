import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import WebGLGallery from './WebGLGallery.js'

const artifacts = [
  {
    id: "traditional-mask",
    type: "image",
    src: "/artifacts/artifact-1.jpg",
    titles: {
      fr: "Masque Traditionnel",
      en: "Traditional Mask",
      wo: "Masq Tradisyonèl",
    },
    description: {
      fr: "Ce masque traditionnel incarne l'esprit des anciens et raconte l'histoire des rites initiatiques de nos ancêtres. Fabriqué selon des techniques ancestrales, il représente la connexion profonde entre l'homme et les forces spirituelles.",
      en: "This traditional mask embodies the spirit of the ancients and tells the story of our ancestors' initiation rites. Crafted using ancestral techniques, it represents the deep connection between man and spiritual forces.",
      wo: "Masq sa a enkòne lespri ansyen yo epi li rakonte istwa rit inisyasyon zansèt nou yo. Fabrike selon teknik ansèstral, li reprezante koneksyon pwofon ant moun ak fòs espirityèl yo.",
    },
    details: {
      origin: {
        fr: "Région du Sine-Saloum, Sénégal",
        en: "Sine-Saloum Region, Senegal",
        wo: "Rejyon Sine-Saloum, Senegal",
      },
      period: {
        fr: "XIXe siècle",
        en: "19th Century",
        wo: "19yèm syèk",
      },
      material: {
        fr: "Bois sculpté et pigments naturels",
        en: "Carved wood and natural pigments",
        wo: "Bwa skilte ak pigman natirèl",
      },
      dimensions: {
        fr: "45cm x 30cm x 8cm",
        en: "45cm x 30cm x 8cm",
        wo: "45cm x 30cm x 8cm",
      },
    },
    cultural_context: {
      fr: "Les masques traditionnels jouent un rôle central dans les cérémonies sociales et spirituelles. Ils servent de médiateurs entre le monde visible et invisible, permettant aux ancêtres de communiquer avec les vivants.",
      en: "Traditional masks play a central role in social and spiritual ceremonies. They serve as mediators between the visible and invisible worlds, allowing ancestors to communicate with the living.",
      wo: "Masq tradisyonèl yo jwe yon wòl santral nan seremoni sosyal ak espirityèl. Yo sèvi kòm medyatè ant mond vizib la ak mond envizib la, sa ki pèmèt zansèt yo kominike ak moun vivan yo.",
    },
  },
  {
    id: "kente-textile",
    type: "image",
    src: "/artifacts/artifact-2.jpg",
    titles: {
      fr: "Textile Kente",
      en: "Kente Textile",
      wo: "Tekstil Kente",
    },
    description: {
      fr: "Le kente est un tissu africain traditionnel tissé à la main, symbole de statut et d'héritage culturel. Chaque motif raconte une histoire et transmet des valeurs ancestrales à travers des générations.",
      en: "Kente is a traditional African handwoven fabric, symbol of status and cultural heritage. Each pattern tells a story and transmits ancestral values across generations.",
      wo: "Kente se yon twal afriken tradisyonèl ki tise ak men, senbòl estati ak eritaj kiltirèl. Chak motif rakonte yon istwa epi li transmèt valè zansètral atravè jenerasyon.",
    },
    details: {
      origin: {
        fr: "Ghana (Région d'Ashanti)",
        en: "Ghana (Ashanti Region)",
        wo: "Ghana (Rejyon Ashanti)",
      },
      period: {
        fr: "XXe siècle",
        en: "20th Century",
        wo: "20yèm syèk",
      },
      material: {
        fr: "Coton filé et teint naturellement",
        en: "Hand-spun and naturally dyed cotton",
        wo: "Koton file ak men epi li te ye natirèlman",
      },
      dimensions: {
        fr: "200cm x 45cm",
        en: "200cm x 45cm",
        wo: "200cm x 45cm",
      },
    },
    cultural_context: {
      fr: "Le kente est porté lors d'occasions spéciales et de cérémonies importantes. Les motifs symbolisent des proverbes, des événements historiques et des qualités morales, créant un langage visuel riche.",
      en: "Kente is worn on special occasions and important ceremonies. The patterns symbolize proverbs, historical events and moral qualities, creating a rich visual language.",
      wo: "Kente yo mete nan okazyon espesyal ak seremoni enpòtan. Motif yo senbolize pwovèb, evènman istorik ak kalite moral, sa ki kreye yon langaj vizyèl rich.",
    },
  },
  {
    id: "ancient-sculpture",
    type: "image",
    src: "/artifacts/artifact-3.jpg",
    titles: {
      fr: "Sculpture Ancienne",
      en: "Ancient Sculpture",
      wo: "Sikilti Ansyen",
    },
    description: {
      fr: "Cette sculpture ancienne représente une figure spirituelle protectrice, gardienne des traditions et des valeurs ancestrales. Son style minimaliste et expressif capture l'essence de l'art africain traditionnel.",
      en: "This ancient sculpture represents a protective spiritual figure, guardian of traditions and ancestral values. Its minimalist and expressive style captures the essence of traditional African art.",
      wo: "Sikilti ansyen sa a reprezante yon figi espirityèl pwotèktè, gadyen tradisyon ak valè zansètral. Style minimalist ak ekspresif li a kaptire sans atizay afriken tradisyonèl la.",
    },
    details: {
      origin: {
        fr: "Région du Mali",
        en: "Mali Region",
        wo: "Rejyon Mali",
      },
      period: {
        fr: "XVIe siècle",
        en: "16th Century",
        wo: "16yèm syèk",
      },
      material: {
        fr: "Bois dur et patine naturelle",
        en: "Hardwood and natural patina",
        wo: "Bwa di ak patin natirèl",
      },
      dimensions: {
        fr: "120cm x 25cm x 20cm",
        en: "120cm x 25cm x 20cm",
        wo: "120cm x 25cm x 20cm",
      },
    },
    cultural_context: {
      fr: "Les sculptures anciennes servaient de supports spirituels dans les rituels quotidiens et les cérémonies importantes. Elles étaient placées dans les autels domestiques pour protéger la famille.",
      en: "Ancient sculptures served as spiritual supports in daily rituals and important ceremonies. They were placed in domestic altars to protect the family.",
      wo: "Sikilti ansyen yo te sèvi kòm sipò espirityèl nan rit quotilyen ak seremoni enpòtan. Yo te plase yo nan lotèl domestik pou pwoteje fanmi an.",
    },
  },
  {
    id: "ceremonial-mask",
    type: "image",
    src: "/artifacts/artifact-4.jpg",
    titles: {
      fr: "Masque Cerémonial",
      en: "Ceremonial Mask",
      wo: "Mas Seremoni",
    },
    description: {
      fr: "Ce masque cérémonial est utilisé lors des rites de passage et des célébrations communautaires. Ses formes stylisées et ses motifs symboliques racontent l'histoire de la communauté et de ses traditions.",
      en: "This ceremonial mask is used during rites of passage and community celebrations. Its stylized forms and symbolic patterns tell the story of the community and its traditions.",
      wo: "Mas seremoni sa a yo itilize pandan rit pasaj ak selebrasyon kominotè. Fòm stilize li yo ak motif senbolik rakonte istwa kominote a ak tradisyon li yo.",
    },
    details: {
      origin: {
        fr: "Côte d'Ivoire",
        en: "Ivory Coast",
        wo: "Kòt Ivwa",
      },
      period: {
        fr: "XVIIIe siècle",
        en: "18th Century",
        wo: "18yèm syèk",
      },
      material: {
        fr: "Bois sculpté avec incrustations de cauris",
        en: "Carved wood with cowrie shell inlays",
        wo: "Bwa skilte ak enklistasyon kauri",
      },
      dimensions: {
        fr: "60cm x 40cm x 15cm",
        en: "60cm x 40cm x 15cm",
        wo: "60cm x 40cm x 15cm",
      },
    },
    cultural_context: {
      fr: "Les masques cérémoniels sont portés par des danseurs initiés lors des grandes cérémonies. Ils incarnent les esprits des ancêtres et servent de lien entre les générations passées et présentes.",
      en: "Ceremonial masks are worn by initiated dancers during major ceremonies. They embody the spirits of ancestors and serve as a link between past and present generations.",
      wo: "Mas seremoni yo danse yo mete pandan gwo seremoni. Yo enkòne lespri zansèt yo epi yo sèvi kòm lyen ant jenerasyon pase ak prezan yo.",
    },
  },
  {
    id: "funeral-ritual",
    type: "video",
    src: "/artifacts/video-placeholder.png",
    thumbnail: "/artifacts/video-placeholder.png",
    titles: {
      fr: "Rituel Funéraire",
      en: "Funeral Ritual",
      wo: "Rit Fonèb",
    },
    description: {
      fr: "Cette vidéo documentaire capture un rituel funéraire traditionnel, montrant comment les communautés africaines honorent leurs défunts et accompagnent leur passage vers l'au-delà.",
      en: "This documentary video captures a traditional funeral ritual, showing how African communities honor their deceased and accompany their passage to the afterlife.",
      wo: "Videyo dokimantè sa a kaptire yon rit fonèb tradisyonèl, ki montre kijan kominote afriken yo onore moun ki mouri yo epi akonpaye pasaj yo nan lòt bò a.",
    },
    details: {
      origin: {
        fr: "Sénégal",
        en: "Senegal",
        wo: "Senegal",
      },
      period: {
        fr: "Contemporain",
        en: "Contemporary",
        wo: "Kontanporen",
      },
      material: {
        fr: "Documentaire vidéo",
        en: "Video documentary",
        wo: "Dokimantè videyo",
      },
      duration: {
        fr: "12 minutes",
        en: "12 minutes",
        wo: "12 minit",
      },
    },
    cultural_context: {
      fr: "Les rituels funéraires sont essentiels dans les cultures africaines. Ils permettent de maintenir les liens avec les ancêtres et d'assurer la continuité spirituelle de la communauté.",
      en: "Funeral rituals are essential in African cultures. They allow maintaining links with ancestors and ensuring the spiritual continuity of the community.",
      wo: "Rit fonèb yo esansyèl nan kilti afriken yo. Yo pèmèt kenbe lyen ak zansèt yo epi asire kontinwite espirityèl kominote a.",
    },
  },
]

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
