import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const RootComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Check if we're on the home page (hero section)
  const isHomePage = location.pathname === '/'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen relative">
      {/* Navigation Header - Positioned absolutely to overlay content */}
      <motion.header 
        className="absolute top-0 left-0 right-0 px-6 pt-6 md:px-12 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.nav
          className={`nav-shell ${isHomePage ? 'nav-shell-hero' : 'nav-shell-default'}`}
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
            <Link to="/" onClick={closeMobileMenu}>
              <motion.span 
                className="nav-brand"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                Musée des Civilisations Noires
              </motion.span>
            </Link>
            <motion.span 
              className="nav-tagline hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              Civilisations noires · Patrimoine mondial
            </motion.span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <motion.div 
            className="nav-links hidden md:flex"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/collections">
              <motion.span 
                className="nav-link"
                whileHover={{ 
                  y: -2, 
                  transition: { duration: 0.2 } 
                }}
              >
                Collections
              </motion.span>
            </Link>
            <motion.a 
              href="#agenda" 
              className="nav-link"
              whileHover={{ 
                y: -2, 
                transition: { duration: 0.2 } 
              }}
            >
              Agenda
            </motion.a>
            <motion.a 
              href="#visite" 
              className="nav-link"
              whileHover={{ 
                y: -2, 
                transition: { duration: 0.2 } 
              }}
            >
              Visite
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="nav-actions"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {/* Desktop Language Pills */}
            <div className="hidden md:flex gap-2">
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
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className="md:hidden mobile-menu-button"
              onClick={toggleMobileMenu}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.8,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="hamburger-icon">
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              </div>
            </motion.button>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="mobile-menu-content"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="mobile-nav-links">
                  <Link to="/collections" onClick={closeMobileMenu}>
                    <motion.span 
                      className="mobile-nav-link"
                      whileHover={{ 
                        x: 4,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      Collections
                    </motion.span>
                  </Link>
                  <motion.a 
                    href="#agenda" 
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                    whileHover={{ 
                      x: 4,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    Agenda
                  </motion.a>
                  <motion.a 
                    href="#visite" 
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                    whileHover={{ 
                      x: 4,
                      transition: { duration: 0.2 } 
                    }}
                  >
                    Visite
                  </motion.a>
                </div>
                
                <div className="mobile-nav-actions">
                  {[{ lang: "FR", active: true }, { lang: "EN", active: false }].map((item, index) => (
                    <motion.button 
                      key={item.lang}
                      type="button" 
                      className={`mobile-nav-pill ${item.active ? 'is-active' : ''}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.9 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.lang}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main content area */}
      <main className="relative">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
