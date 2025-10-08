import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'

const VisiteComponent = () => {
  const [selectedTab, setSelectedTab] = useState('infos')

  const visitInfo = {
    horaires: [
      { jour: 'Mardi - Dimanche', heures: '10h00 - 18h00' },
      { jour: 'Lundi', heures: 'Fermé' },
      { jour: 'Jours fériés', heures: '10h00 - 16h00' }
    ],
    tarifs: [
      { type: 'Adulte', prix: '5 000 FCFA', description: 'Tarif plein' },
      { type: 'Étudiant', prix: '2 500 FCFA', description: 'Sur présentation de la carte' },
      { type: 'Enfant (-12 ans)', prix: 'Gratuit', description: 'Accompagné d\'un adulte' },
      { type: 'Groupe (10+)', prix: '3 500 FCFA', description: 'Par personne' },
      { type: 'Visite guidée', prix: '+ 2 000 FCFA', description: 'En supplément' }
    ],
    services: [
      {
        icon: '🎧',
        titre: 'Audioguides',
        description: 'Disponibles en français, anglais et wolof'
      },
      {
        icon: '♿',
        titre: 'Accessibilité',
        description: 'Musée entièrement accessible aux personnes à mobilité réduite'
      },
      {
        icon: '📸',
        titre: 'Photographie',
        description: 'Autorisée sans flash dans les espaces permanents'
      },
      {
        icon: '🍽️',
        titre: 'Restauration',
        description: 'Café-restaurant avec terrasse panoramique'
      },
      {
        icon: '🛍️',
        titre: 'Boutique',
        description: 'Librairie et boutique de souvenirs artisanaux'
      },
      {
        icon: '🅿️',
        titre: 'Parking',
        description: 'Parking gratuit pour les visiteurs'
      }
    ]
  }

  const visitsTypes = [
    {
      id: 1,
      titre: 'Visite Libre',
      duree: 'À votre rythme',
      prix: 'Inclus dans le billet',
      description: 'Explorez le musée à votre propre rythme avec nos panneaux explicatifs détaillés.',
      points: [
        'Accès à toutes les collections permanentes',
        'Plan du musée fourni',
        'Audioguide disponible en location'
      ],
      image: '/artefacts/masque-ceremoniel-serere-senegal.png'
    },
    {
      id: 2,
      titre: 'Visite Guidée Générale',
      duree: '1h30',
      prix: '2 000 FCFA',
      description: 'Découvrez les points forts du musée avec un guide expert.',
      points: [
        'Présentation des œuvres majeures',
        'Contexte historique et culturel',
        'Questions-réponses avec le guide',
        'Départs à 11h00 et 15h00'
      ],
      image: '/artefacts/statue-dogon-de-lesprit-protecteur-mali.png'
    },
    {
      id: 3,
      titre: 'Visite Thématique',
      duree: '2h00',
      prix: '3 000 FCFA',
      description: 'Approfondissez un thème spécifique avec un conservateur.',
      points: [
        'Royaumes et empires africains',
        'Art et spiritualité',
        'Textiles et parures',
        'Sur réservation uniquement'
      ],
      image: '/artefacts/bracelet-en-or-de-lempire-ashanti-ghana.png'
    },
    {
      id: 4,
      titre: 'Visite Scolaire',
      duree: '1h00',
      prix: 'Gratuit',
      description: 'Programme éducatif adapté aux groupes scolaires.',
      points: [
        'Adapté aux différents niveaux',
        'Activités pédagogiques interactives',
        'Dossier pédagogique fourni',
        'Réservation obligatoire'
      ],
      image: '/artefacts/Reproduction_du_crâne_Homo_Senegalensis_senegal.jpg'
    }
  ]

  const acces = {
    adresse: 'Route de l\'Aéroport, Dakar, Sénégal',
    telephone: '+221 33 849 92 00',
    email: 'contact@mcn.sn',
    transports: [
      {
        type: 'Bus',
        details: 'Lignes 7, 15, 23 - Arrêt "Musée des Civilisations Noires"'
      },
      {
        type: 'Taxi',
        details: 'Demandez "MCN" ou "Musée des Civilisations Noires"'
      },
      {
        type: 'Voiture',
        details: 'Parking gratuit disponible sur place'
      }
    ]
  }

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
            Planifiez Votre Visite
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Toutes les informations pratiques pour votre visite au musée
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'infos', label: 'Informations Pratiques' },
              { id: 'visites', label: 'Types de Visites' },
              { id: 'acces', label: 'Accès & Contact' }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                  selectedTab === tab.id
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
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {/* Informations Pratiques */}
          {selectedTab === 'infos' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Horaires */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Horaires d'Ouverture
                </h2>
                <div className="space-y-4">
                  {visitInfo.horaires.map((horaire, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                      <span className="font-medium text-gray-800">{horaire.jour}</span>
                      <span className="text-gray-600">{horaire.heures}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarifs */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Tarifs
                </h2>
                <div className="space-y-4">
                  {visitInfo.tarifs.map((tarif, index) => (
                    <div key={index} className="flex justify-between items-start py-3 border-b border-gray-200 last:border-0">
                      <div>
                        <span className="font-medium text-gray-800 block">{tarif.type}</span>
                        <span className="text-sm text-gray-600">{tarif.description}</span>
                      </div>
                      <span className="text-lg font-bold text-[var(--color-terracotta)]">{tarif.prix}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Services & Équipements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visitInfo.services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{service.titre}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Types de Visites */}
          {selectedTab === 'visites' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {visitsTypes.map((visite, index) => (
                <motion.div
                  key={visite.id}
                  className="glass-panel rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={visite.image}
                      alt={visite.titre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {visite.titre}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {visite.duree}
                      </span>
                      <span className="font-bold text-[var(--color-terracotta)]">{visite.prix}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{visite.description}</p>
                    <ul className="space-y-2">
                      {visite.points.map((point, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 mt-0.5 text-[var(--color-terracotta)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Accès & Contact */}
          {selectedTab === 'acces' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Contact */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Contact
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 text-[var(--color-terracotta)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-800">Adresse</p>
                      <p className="text-gray-600">{acces.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 text-[var(--color-terracotta)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-800">Téléphone</p>
                      <p className="text-gray-600">{acces.telephone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 text-[var(--color-terracotta)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-gray-600">{acces.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transports */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Comment Venir
                </h2>
                <div className="space-y-4">
                  {acces.transports.map((transport, index) => (
                    <div key={index} className="flex items-start py-3 border-b border-gray-200 last:border-0">
                      <div className="w-20 font-bold text-[var(--color-terracotta)]">{transport.type}</div>
                      <p className="text-gray-600 flex-1">{transport.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-panel rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                  Localisation
                </h2>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Carte interactive à venir</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/visite')({
  component: VisiteComponent,
})
