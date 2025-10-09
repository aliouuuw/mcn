import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

const RootComponent = () => {
  const { t } = useTranslation()
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
                {t('nav.museum')}
              </motion.span>
            </Link>
            <motion.span
              className="nav-tagline hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {t('nav.tagline')}
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
                {t('nav.collections')}
              </motion.span>
            </Link>
            <Link to="/agenda">
              <motion.span
                className="nav-link"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {t('nav.agenda')}
              </motion.span>
            </Link>
            <Link to="/visite">
              <motion.span
                className="nav-link"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                {t('nav.visit')}
              </motion.span>
            </Link>
          </motion.div>
          
          <motion.div
            className="nav-actions"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {/* Desktop Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
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
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <div className="mobile-nav-links">
                  <Link to="/collections" onClick={closeMobileMenu}>
                    <motion.span
                      className={`mobile-nav-link ${isHomePage ? 'text-white' : ''}`}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {t('nav.collections')}
                    </motion.span>
                  </Link>
                  <Link to="/agenda" onClick={closeMobileMenu}>
                    <motion.span
                      className={`mobile-nav-link ${isHomePage ? 'text-white' : ''}`}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {t('nav.agenda')}
                    </motion.span>
                  </Link>
                  <Link to="/visite" onClick={closeMobileMenu}>
                    <motion.span
                      className={`mobile-nav-link ${isHomePage ? 'text-white' : ''}`}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {t('nav.visit')}
                    </motion.span>
                  </Link>
                </div>

                <div className="mobile-nav-actions">
                  <LanguageSwitcher />
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
