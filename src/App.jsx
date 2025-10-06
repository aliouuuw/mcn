function App() {
  return (
    <div className="hero-root relative min-h-screen overflow-hidden text-black">
      <div className="absolute inset-0 hero-bg-smooth" aria-hidden="true" />
      <div className="absolute inset-0 hero-overlay-smooth" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 pt-6 md:px-12">
          <nav className="nav-shell">
            <div className="nav-branding">
              <span className="nav-brand">Musée des Civilisations Noires</span>
              <span className="nav-tagline">Récits africains · Dakar</span>
            </div>
            <div className="nav-links">
              <a href="#experience" className="nav-link">
                Expérience
              </a>
              <a href="#collections" className="nav-link">
                Collections
              </a>
              <a href="#agenda" className="nav-link">
                Agenda
              </a>
              <a href="#impact" className="nav-link">
                Impact
              </a>
            </div>
            <div className="nav-actions">
              <button type="button" className="nav-pill is-active">
                FR
              </button>
              <button type="button" className="nav-pill">
                WO
              </button>
              <button type="button" className="nav-pill">
                EN
              </button>
            </div>
          </nav>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16 md:px-12">
          <section className="hero-copy">
            <p className="hero-kicker">Racines · Rythmes · Renaissance</p>
            <h1 className="hero-title">Entrez dans l’âme des Civilisations Noires</h1>
            <p className="hero-subtitle">
              Un manifeste vivant où chaque œuvre respire au rythme du continent. Découvrez des artefacts animés,
              des voix ancestrales et des scénographies numériques qui relient passé, présent et futur.
            </p>
            <div className="hero-meta">
              <a href="#galerie" className="cta-button hero-cta">
                Entrer dans la galerie
              </a>
              <div className="hero-context">
                <span>Immersion audiovisuelle</span>
                <span>Artéfacts vivants</span>
                <span>Parcours curatoriaux</span>
              </div>
            </div>
          </section>
        </main>

        <footer className="px-6 pb-12 md:px-12">
          <div className="hero-footer">
            <span className="hero-divider" />
            <span className="hero-footer-text">Chaque artefact révèle une cosmologie</span>
            <span className="hero-divider" />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
