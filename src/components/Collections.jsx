import { motion } from 'framer-motion'

const Collections = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Collections
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez notre riche patrimoine de 18 000 œuvres qui retracent l'évolution des civilisations noires à travers le temps et l'espace.
          </motion.p>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Page en construction
            </h2>
            <p className="text-gray-600">
              Cette page sera bientôt disponible avec l'ensemble de nos collections exceptionnelles.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Collections
