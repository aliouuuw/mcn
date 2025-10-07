import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import ShareComponent from '../components/ShareComponent'

// Import real artifacts data
import artifactsData from '../../artifacts_data.json'

const artifacts = artifactsData

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const uiText = {
  back: {
    fr: 'Retour aux collections',
    en: 'Back to collections',
    wo: 'Dellusi ci koleksiyoŋ'
  },
  story: {
    fr: 'L’histoire',
    en: 'The story',
    wo: 'Leeral gi'
  },
  quickInfo: {
    fr: 'Détails essentiels',
    en: 'Key details',
    wo: 'Liem yi gëna am solo'
  },
  origin: {
    fr: 'Origine',
    en: 'Origin',
    wo: 'Orijin'
  },
  listen: {
    fr: 'Écouter la narration',
    en: 'Listen to the narration',
    wo: 'Degg waxinu waxtaan'
  },
  available: {
    fr: 'Disponible',
    en: 'Available',
    wo: 'Disponib'
  },
  notAvailable: {
    fr: 'Non disponible',
    en: 'Not available',
    wo: 'Pa disponib'
  },
  previous: {
    fr: 'Précédent',
    en: 'Previous',
    wo: 'Anvan'
  },
  next: {
    fr: 'Suivant',
    en: 'Next',
    wo: 'Apre'
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
  const audioRef = useRef(null)

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

  // Get audio file path based on artifact ID and language
  const getAudioPath = (artifactId, language) => {
    const audioMap = {
      'masque-ceremoniel-serere-senegal': {
        fr: '/audios/masque_serere_fr.mp3',
        en: '/audios/masque_serere_en.mp3',
        wo: '/audios/masque_serere_wo.mp3'
      },
      'tambour-royal-du-royaume-du-djolof-senegal': {
        fr: '/audios/tambour_djolof_fr.mp3',
        en: '/audios/tambour_djolof_en.mp3',
        wo: '/audios/tambour_djolof_wo.mp3'
      },
      'pagne-tisse-lebou-senegal': {
        fr: '/audios/pagne_lebou_fr.mp3',
        en: '/audios/pagne_lebou_en.mp3',
        wo: '/audios/pagne_lebou_wo.mp3'
      },
      'statue-dogon-de-lesprit-protecteur-mali': {
        fr: '/audios/statue_dogon_fr.mp3',
        en: '/audios/statue_dogon_en.mp3',
        wo: '/audios/statue_dogon_wo.mp3'
      },
      'bracelet-en-or-de-lempire-ashanti-ghana': {
        wo: '/audios/bracelet_ashanti_wo.mp3'
      }
    }
    return audioMap[artifactId]?.[language] || null
  }

  // Audio player controls
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (e) => {
    const newProgress = e.target.value
    setAudioProgress(newProgress)
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioDuration
    }
  }

  const formatTime = (seconds) => {
    const secs = Math.max(seconds, 0)
    const mins = Math.floor(secs / 60)
    const remaining = Math.floor(secs % 60)
    return `${mins}:${remaining.toString().padStart(2, '0')}`
  }

  const currentAudioPath = getAudioPath(artifact.id, currentLanguage)

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const updateDuration = () => {
      setAudioDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setAudioProgress(0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentAudioPath])

  // Reset audio when language changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      setAudioProgress(0)
    }
  }, [currentLanguage])

  const languageOptions = ['fr', 'en', 'wo']
  const titleText = artifact.titles[currentLanguage] || artifact.titles.fr || artifact.titles.en
  const descriptionText = artifact.description[currentLanguage] || artifact.description.fr || artifact.description.en
  const originText =
    (artifact.details?.origin?.[currentLanguage]) ??
    artifact.details?.origin?.fr ??
    artifact.details?.origin?.en ??
    artifact.details?.origin?.wo ??
    ''

  return (
    <motion.div
      className="min-h-screen bg-[#f4f4f0] text-[#2f2f2f]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-32 md:pb-16 md:pt-32">
        <motion.header
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          variants={textVariants}
        >
          <button
            onClick={() => navigate({ to: '/collections' })}
            className="flex w-fit items-center gap-2 rounded-full border border-[#e5dbcf] bg-white/70 px-4 py-2 text-sm font-medium text-[#4a4136] transition hover:border-[#d1c1ad] hover:bg-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{uiText.back[currentLanguage]}</span>
          </button>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 md:w-auto md:justify-end">
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
              {languageOptions.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    currentLanguage === lang
                      ? 'bg-[#CD853F] text-white shadow-sm'
                      : 'border border-transparent bg-white/70 text-[#4a4136] hover:border-[#e5dbcf]'
                  }`}
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'Wolof'}
                </button>
              ))}
            </div>
            <ShareComponent
              artifactId={artifact.id}
              artifactTitle={titleText}
              artifactUrl={`${window.location.origin}/artifact/${artifact.id}`}
              currentLanguage={currentLanguage}
            />
          </div>
        </motion.header>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
          <motion.div
            className="relative h-full max-h-[600px]"
            variants={textVariants}
          >
            <div
              className={`absolute inset-0 bg-[#f4ede3] transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src={artifact.type === 'video' ? artifact.thumbnail : artifact.src}
              alt={titleText}
              className={`h-full w-full object-contain transition-all duration-500 ${
                isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
            {artifact.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black/60 p-4">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={textVariants}>
              <span
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-[#8b7359]"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                <span className="h-1 w-1 rounded-full bg-[#CD853F]" aria-hidden="true" />
                {uiText.story[currentLanguage]}
              </span>
              <h1
                className="mt-4 text-3xl font-semibold leading-tight text-[#2f241a] md:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {titleText}
              </h1>
              <p
                className="mt-4 text-base leading-relaxed text-[#40352d] md:text-lg"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {descriptionText}
              </p>
            </motion.div>

            {currentAudioPath && (
              <motion.div
                className="rounded-3xl border border-[#e5dbcf] bg-white/80 p-5"
                variants={textVariants}
              >
                <audio ref={audioRef} src={currentAudioPath} preload="metadata" style={{ display: 'none' }} />
                <div className="flex items-start gap-4">
                  <button
                    onClick={toggleAudio}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#CD853F] text-white transition hover:bg-[#b8682a]"
                  >
                    {isPlaying ? (
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="h-7 w-7 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-sm font-medium text-[#3a2f24]"
                          style={{ fontFamily: 'var(--font-accent)' }}
                        >
                          {uiText.listen[currentLanguage]}
                        </span>
                        <span className="text-xs uppercase tracking-[0.4em] text-[#95806a]">
                          {currentLanguage.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-[#6d5b47]">
                        {formatTime((audioProgress / 100) * audioDuration)} / {formatTime(audioDuration)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={audioProgress}
                          onChange={handleProgressChange}
                          className="block h-2 w-full appearance-none rounded-full bg-[#e7ded2]"
                        />
                        <div
                          className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-[#CD853F]"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-[#6d5b47]">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                          </svg>
                          {uiText.available[currentLanguage]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {originText && (
              <motion.div
                className="rounded-2xl border border-[#e5dbcf] bg-white/80 px-4 py-3"
                variants={textVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#CD853F]/15 p-1.5 text-[#CD853F]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span
                      className="text-xs uppercase tracking-[0.2em] text-[#8b7359]"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      {uiText.origin[currentLanguage]}
                    </span>
                    <p
                      className="text-sm font-medium text-[#2f241a]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {originText}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 border-t border-[#e5dbcf] pt-6"
          variants={textVariants}
        >
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#e5dbcf] bg-white/80 text-[#CD853F] transition hover:border-[#d1c1ad] hover:bg-[#CD853F] hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-sm text-[#95806a]" style={{ fontFamily: 'var(--font-accent)' }}>
              {currentIndex + 1} / {artifacts.length}
            </span>
            
            <button
              onClick={handleNext}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#e5dbcf] bg-white/80 text-[#CD853F] transition hover:border-[#d1c1ad] hover:bg-[#CD853F] hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
