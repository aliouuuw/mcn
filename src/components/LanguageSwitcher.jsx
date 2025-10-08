import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language?.split('-')[0] || 'fr');

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng.split('-')[0]);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (lng) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="nav-actions">
      {languages.map((lang, index) => (
        <motion.button
          key={lang.code}
          type="button"
          className={`nav-pill ${currentLang === lang.code ? 'is-active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
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
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
