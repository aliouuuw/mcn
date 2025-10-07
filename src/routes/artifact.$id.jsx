import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

// Import artifacts data (we'll need to make this available globally or import it)
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
    audio: {
      src: "/audio/traditional-mask-narration.mp3",
      duration: "2:45",
      languages: ["fr", "en", "wo"]
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
    audio: {
      src: "/audio/kente-textile-narration.mp3",
      duration: "3:12",
      languages: ["fr", "en", "wo"]
    },
    description: {
      fr: "Le kente est un tissu africain traditionnel tissé à la main, symbole de statut et d'héritage culturel. Chaque motif raconte une histoire et transmet des valeurs ancestrales à travers des générations.",
      en: "Kente is a traditional African handwoven fabric, symbol of status and cultural heritage. Each pattern tells a story and transmits ancestral values across generations.",
      wo: "Kente se yon twal afriken tradisyonèl ki tise ak men, senbòl estati ak eritaj kiltirèl. Chak motif rakonte yon istwa epi li transmèt valè zansèstral atravè jenerasyon.",
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
    audio: {
      src: "/audio/ancient-sculpture-narration.mp3",
      duration: "2:58",
      languages: ["fr", "en", "wo"]
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
    audio: {
      src: "/audio/ceremonial-mask-narration.mp3",
      duration: "3:34",
      languages: ["fr", "en", "wo"]
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
    audio: {
      src: "/audio/funeral-ritual-narration.mp3",
      duration: "4:12",
      languages: ["fr", "en", "wo"]
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const heroVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const navVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export const Route = createFileRoute('/artifact/$id')({
  component: ArtifactPage,
})

function ArtifactPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [currentLanguage, setCurrentLanguage] = useState('fr')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)

  // Find the artifact by ID
  const artifact = artifacts.find(a => a.id === id)

  if (!artifact) {
    return (
      <div className="min-h-screen bg-[#f4f4f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#2f2f2f] mb-4">Artifact not found</h1>
          <button
            onClick={() => navigate({ to: '/collections' })}
            className="px-6 py-2 bg-[#CD853F] text-white rounded-lg hover:bg-[#b8682a] transition-colors"
          >
            Return to Collections
          </button>
        </div>
      </div>
    )
  }

  // Get current artifact index for navigation
  const currentIndex = artifacts.findIndex(a => a.id === id)
  const nextArtifact = artifacts[(currentIndex + 1) % artifacts.length]
  const prevArtifact = artifacts[(currentIndex - 1 + artifacts.length) % artifacts.length]

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang)
  }

  const handleNext = () => {
    navigate({ to: `/artifact/${nextArtifact.id}` })
  }

  const handlePrev = () => {
    navigate({ to: `/artifact/${prevArtifact.id}` })
  }

  const handleBackToCollections = () => {
    navigate({ to: '/collections' })
  }

  // Audio player controls
  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e) => {
    setAudioProgress(e.target.value)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ backgroundColor: 'var(--color-warm-white)' }}
    >
      {/* Background overlay similar to home page */}
      <div className="absolute inset-0 artifact-bg-overlay" aria-hidden="true" />

      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-16 px-6 md:px-12 relative"
        variants={heroVariants}
      >
        {/* Side Navigation Buttons */}
        <motion.button
          onClick={handlePrev}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex items-center gap-3 text-[var(--color-soft-black)] hover:text-[var(--color-terracotta)] transition-colors group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20 shadow-lg"
          variants={navVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="text-left hidden xl:block">
            <div className="text-xs opacity-60" style={{ fontFamily: 'var(--font-accent)' }}>
              {currentLanguage === 'fr' ? 'Précédent' :
               currentLanguage === 'en' ? 'Previous' :
               'Anvan'}
            </div>
            <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{prevArtifact.titles[currentLanguage]}</div>
          </div>
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex items-center gap-3 text-[var(--color-soft-black)] hover:text-[var(--color-terracotta)] transition-colors group bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20 shadow-lg"
          variants={navVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-right hidden xl:block">
            <div className="text-xs opacity-60" style={{ fontFamily: 'var(--font-accent)' }}>
              {currentLanguage === 'fr' ? 'Suivant' :
               currentLanguage === 'en' ? 'Next' :
               'Apre'}
            </div>
            <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{nextArtifact.titles[currentLanguage]}</div>
          </div>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Artifact Media */}
            <motion.div
              className="relative"
              variants={heroVariants}
            >
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                <div className={`absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl transition-opacity duration-500 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                <img
                  src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
                  alt={artifact.titles[currentLanguage]}
                  className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-500 ${
                    isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {artifact.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Artifact Info */}
            <motion.div
              className="space-y-8"
              variants={textVariants}
            >
              <div>
                <motion.h1
                  className="hero-title"
                  variants={textVariants}
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    background: 'linear-gradient(135deg, var(--color-soft-black) 0%, var(--color-earth) 50%, var(--color-terracotta) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    marginBottom: '1.5rem'
                  }}
                >
                  {artifact.titles[currentLanguage]}
                </motion.h1>
                <motion.p
                  className="hero-subtitle"
                  variants={textVariants}
                >
                  {artifact.description[currentLanguage]}
                </motion.p>
              </div>

              {/* Audio Player */}
              {artifact.audio && (
                <motion.div
                  className="mt-8"
                  variants={textVariants}
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={toggleAudio}
                        className="flex items-center justify-center w-12 h-12 bg-[var(--color-terracotta)] text-white rounded-full hover:bg-[var(--color-earth)] transition-colors shadow-lg"
                      >
                        {isPlaying ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span style={{ color: 'var(--color-soft-black)', fontFamily: 'var(--font-accent)' }}>
                            {currentLanguage === 'fr' ? 'Narration Audio' :
                             currentLanguage === 'en' ? 'Audio Narration' :
                             'Narasyon Odio'}
                          </span>
                          <span style={{ color: 'var(--color-soft-black)', opacity: 0.7 }}>
                            {formatTime(audioProgress)} / {artifact.audio.duration}
                          </span>
                        </div>

                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={audioProgress}
                            onChange={handleProgressChange}
                            className="w-full h-2 bg-white/50 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <div className="absolute top-0 left-0 h-2 bg-[var(--color-terracotta)] rounded-lg pointer-events-none"
                               style={{ width: `${audioProgress}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--color-soft-black)', opacity: 0.8 }}>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                        </svg>
                        {artifact.audio.languages.includes(currentLanguage) ?
                         (currentLanguage === 'fr' ? 'Disponible' :
                          currentLanguage === 'en' ? 'Available' :
                          'Disponib') :
                         (currentLanguage === 'fr' ? 'Non disponible' :
                          currentLanguage === 'en' ? 'Not available' :
                          'Pa disponib')}
                      </span>
                      <span className="text-xs opacity-60">
                        {currentLanguage === 'fr' ? 'Langues: FR, EN, WO' :
                         currentLanguage === 'en' ? 'Languages: FR, EN, WO' :
                         'Lang: FR, EN, WO'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Details Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                {Object.entries(artifact.details).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    variants={textVariants}
                  >
                    <div
                      className="text-sm uppercase tracking-wider mb-1 opacity-70"
                      style={{
                        color: 'var(--color-soft-black)',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.75rem'
                      }}
                    >
                      {key === 'origin' && (currentLanguage === 'fr' ? 'Origine' : currentLanguage === 'en' ? 'Origin' : 'Orijin')}
                      {key === 'period' && (currentLanguage === 'fr' ? 'Période' : currentLanguage === 'en' ? 'Period' : 'Peryòd')}
                      {key === 'material' && (currentLanguage === 'fr' ? 'Matériau' : currentLanguage === 'en' ? 'Material' : 'Materyèl')}
                      {key === 'dimensions' && (currentLanguage === 'fr' ? 'Dimensions' : currentLanguage === 'en' ? 'Dimensions' : 'Dimansyon')}
                      {key === 'duration' && (currentLanguage === 'fr' ? 'Durée' : currentLanguage === 'en' ? 'Duration' : 'Dire')}
                    </div>
                    <div
                      className="font-medium"
                      style={{
                        color: 'var(--color-soft-black)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      {value[currentLanguage]}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation (visible on smaller screens) */}
        <div className="lg:hidden mt-12 flex items-center justify-between">
          <motion.button
            onClick={handlePrev}
            className="flex items-center gap-2 text-[var(--color-soft-black)] hover:text-[var(--color-terracotta)] transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg"
            variants={navVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-60" style={{ fontFamily: 'var(--font-accent)' }}>
                {currentLanguage === 'fr' ? 'Précédent' :
                 currentLanguage === 'en' ? 'Previous' :
                 'Anvan'}
              </div>
              <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{prevArtifact.titles[currentLanguage]}</div>
            </div>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 text-[var(--color-soft-black)] hover:text-[var(--color-terracotta)] transition-colors group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg"
            variants={navVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-right">
              <div className="text-xs opacity-60" style={{ fontFamily: 'var(--font-accent)' }}>
                {currentLanguage === 'fr' ? 'Suivant' :
                 currentLanguage === 'en' ? 'Next' :
                 'Apre'}
              </div>
              <div className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{nextArtifact.titles[currentLanguage]}</div>
            </div>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.section>

      {/* Cultural Context Section */}
      <motion.section
        className="py-16 px-6 md:px-12 bg-white/30 backdrop-blur-sm"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={textVariants}
          >
            <h2 className="text-3xl md:text-4xl font-light text-[var(--color-soft-black)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {currentLanguage === 'fr' ? 'Contexte Culturel' :
               currentLanguage === 'en' ? 'Cultural Context' :
               'Kontèks Kiltirèl'}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-terracotta)] to-transparent mx-auto"></div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto"
            variants={textVariants}
            style={{
              color: 'var(--color-soft-black)',
              fontFamily: 'var(--font-body)',
              opacity: 0.9
            }}
          >
            {artifact.cultural_context[currentLanguage]}
          </motion.p>
        </div>
      </motion.section>

    </motion.div>
  )
}
