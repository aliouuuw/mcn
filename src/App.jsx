// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const kickerVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
}

const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

const contextVariants = {
  hidden: { 
    opacity: 0,
    y: 15
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHoveringHero, setIsHoveringHero] = useState(false)
  const [trailElements, setTrailElements] = useState([])
  
  // Cursor tracking for sandy mask effect with trail
  useEffect(() => {
    let trailId = 0
    let lastTrailTime = 0
    const trailThrottle = 200 // Create trail every 200ms for slower, more subtle effect
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      // Add trail element (throttled)
      if (isHoveringHero) {
        const now = Date.now()
        if (now - lastTrailTime > trailThrottle) {
          const newTrail = {
            id: trailId++,
            x: e.clientX,
            y: e.clientY,
            timestamp: now
          }
          
          setTrailElements(prev => {
            // Limit to max 12 trail elements for more subtle effect
            const updated = [...prev, newTrail]
            return updated.length > 12 ? updated.slice(-12) : updated
          })
          
          // Remove trail element after animation
          setTimeout(() => {
            setTrailElements(prev => prev.filter(trail => trail.id !== newTrail.id))
          }, 3000) // 3 second trail life for more gradual fade
          
          lastTrailTime = now
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHoveringHero])
  
  // Pre-calculate character positions for cleaner code
  const titleText = "Explorez l'héritage des Civilisations Noires"
  const words = titleText.split(" ")
  let globalCharIndex = 0
  return (
    <div 
      className="hero-root relative min-h-screen overflow-hidden text-black"
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={() => setIsHoveringHero(false)}
    >
      <div className="absolute inset-0 hero-bg-smooth" aria-hidden="true" />
      <div className="absolute inset-0 hero-overlay-smooth" aria-hidden="true" />
      
      {/* Cursor-following sandy mask */}
      <div 
        className={`cursor-sandy-mask ${isHoveringHero ? 'active' : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
      
      {/* Sandy trail elements */}
      {trailElements.map(trail => (
        <div
          key={trail.id}
          className="sandy-trail-element"
          style={{
            left: trail.x,
            top: trail.y,
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col">
        <motion.header 
          className="px-6 pt-6 md:px-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.nav 
            className="nav-shell"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="nav-branding"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span 
                className="nav-brand"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Musée des Civilisations Noires
              </motion.span>
              <motion.span 
                className="nav-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                Civilisations noires · Patrimoine mondial
              </motion.span>
            </motion.div>
            
            <motion.div 
              className="nav-links"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {["Collections", "Agenda", "Visite"].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    y: -2, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="nav-actions"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[{ lang: "FR", active: true }, { lang: "EN", active: false }].map((item, index) => (
                <motion.button 
                  key={item.lang}
                  type="button" 
                  className={`nav-pill ${item.active ? 'is-active' : ''}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.lang}
                </motion.button>
              ))}
            </motion.div>
          </motion.nav>
        </motion.header>

        <main className="flex flex-1 items-center justify-center px-6 md:px-12">
          <motion.section 
            className="hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="hero-kicker"
              variants={kickerVariants}
            >
              Mémoire · Culture · Identité
            </motion.p>
            
            <motion.h1 
              className="hero-title"
              variants={titleVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { 
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              style={{ cursor: "default" }}
            >
{words.map((word, wordIndex) => {
                const wordSpan = (
                  <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.split("").map((char, charIndex) => {
                      const currentGlobalIndex = globalCharIndex++;
                      return (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: hoveredIndex === currentGlobalIndex ? -3 : 0,
                            scale: hoveredIndex === currentGlobalIndex ? 1.05 : 1,
                            transition: {
                              opacity: {
                                duration: 0.05,
                                delay: 1.5 + currentGlobalIndex * 0.03,
                                ease: "easeOut"
                              },
                              y: {
                                type: "spring",
                                stiffness: hoveredIndex === currentGlobalIndex ? 400 : 300,
                                damping: hoveredIndex === currentGlobalIndex ? 25 : 30,
                                mass: hoveredIndex === currentGlobalIndex ? 0.5 : 0.8
                              },
                              scale: {
                                type: "spring",
                                stiffness: hoveredIndex === currentGlobalIndex ? 400 : 300,
                                damping: hoveredIndex === currentGlobalIndex ? 25 : 30,
                                mass: hoveredIndex === currentGlobalIndex ? 0.5 : 0.8
                              }
                            }
                          }}
                          onMouseEnter={() => setHoveredIndex(currentGlobalIndex)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          style={{ 
                            display: "inline-block",
                            cursor: "pointer",
                            color: hoveredIndex === currentGlobalIndex ? "#CD853F" : "inherit"
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
                
                // Add space after word (except last word)
                if (wordIndex < words.length - 1) {
                  globalCharIndex++; // Account for space character
                  return [wordSpan, " "];
                }
                return wordSpan;
              })}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              variants={textVariants}
            >
              Explorez <strong>18 000</strong> œuvres qui retracent l'évolution des civilisations noires à travers le temps et l'espace.
            </motion.p>
            
            <motion.div 
              className="hero-meta"
              variants={textVariants}
            >
              <motion.a 
                href="#galerie" 
                className="cta-button hero-cta"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Découvrir les collections
              </motion.a>
              
              <motion.div 
                className="hero-context"
                variants={containerVariants}
              >
                <motion.span variants={contextVariants}>
                  18 000 œuvres
                </motion.span>
                <motion.span variants={contextVariants}>
                  Cultures du monde noir
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.section>
        </main>

      </div>
    </div>
  )
}

export default App
