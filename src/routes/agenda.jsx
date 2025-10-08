import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AgendaComponent = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('tous')

  const events = [
    {
      id: 1,
      title: "Exposition : Royaumes d'Afrique",
      date: "15 Octobre 2025",
      time: "10h00 - 18h00",
      category: "exposition",
      description: "Découvrez les trésors des grands royaumes africains à travers une collection exceptionnelle d'artefacts royaux.",
      location: "Salle d'exposition principale",
      image: "/artefacts/bracelet-en-or-de-lempire-ashanti-ghana.png"
    },
    {
      id: 2,
      title: "Conférence : L'Art Dogon",
      date: "20 Octobre 2025",
      time: "15h00 - 17h00",
      category: "conference",
      description: "Une exploration approfondie de l'art et de la cosmologie Dogon avec le Dr. Amadou Diallo.",
      location: "Auditorium",
      image: "/artefacts/statue-dogon-de-lesprit-protecteur-mali.png"
    },
    {
      id: 3,
      title: "Atelier : Tissage Traditionnel",
      date: "25 Octobre 2025",
      time: "14h00 - 16h00",
      category: "atelier",
      description: "Apprenez les techniques ancestrales du tissage avec des artisans experts.",
      location: "Salle pédagogique",
      image: "/artefacts/pagne-tisse-lebou-senegal.png"
    },
    {
      id: 4,
      title: "Visite Guidée : Masques Sacrés",
      date: "28 Octobre 2025",
      time: "11h00 - 12h30",
      category: "visite",
      description: "Visite guidée exclusive de notre collection de masques cérémoniels.",
      location: "Galerie des masques",
      image: "/artefacts/Masque_Ndomo_mali.jpg"
    },
    {
      id: 5,
      title: "Concert : Musique Traditionnelle",
      date: "2 Novembre 2025",
      time: "19h00 - 21h00",
      category: "spectacle",
      description: "Soirée musicale avec des instruments traditionnels africains.",
      location: "Cour intérieure",
      image: "/artefacts/tambour-royal-du-royaume-du-djolof-senegal.png"
    },
    {
      id: 6,
      title: "Exposition : Paléontologie Africaine",
      date: "5 Novembre 2025",
      time: "10h00 - 18h00",
      category: "exposition",
      description: "Les origines de l'humanité : découvertes paléontologiques majeures.",
      location: "Salle des sciences",
      image: "/artefacts/Reproduction_du_crâne_Homo_Senegalensis_senegal.jpg"
    }
  ]

  const categories = [
    { id: 'tous', label: t('agenda.allEvents') },
    { id: 'exposition', label: t('agenda.exhibitions') },
    { id: 'conference', label: t('agenda.conferences') },
    { id: 'atelier', label: t('agenda.workshops') },
    { id: 'visite', label: t('agenda.guidedTours') },
    { id: 'spectacle', label: t('agenda.shows') }
  ]

  const filteredEvents = selectedCategory === 'tous' 
    ? events 
    : events.filter(event => event.category === selectedCategory)

  return (
    <div className="min-h-screen relative bg-[#f4f4f0]">
      {/* Background Overlay */}
      <div className="artifact-bg-overlay" />
      
      {/* Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="max-w-6xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            style={{ 
              fontFamily: 'var(--font-hero)',
              color: 'var(--color-soft-black)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('agenda.title')}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('agenda.subtitle')}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[var(--color-earth)] to-[var(--color-terracotta)] text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="glass-panel rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-gray-800">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-3 text-gray-900"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <motion.button
                  className="w-full px-4 py-2 bg-gradient-to-r from-[var(--color-earth)] to-[var(--color-terracotta)] text-white rounded-lg font-medium text-sm uppercase tracking-wider"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('agenda.learnMore')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              {t('agenda.noEvents')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/agenda')({
  component: AgendaComponent,
})
