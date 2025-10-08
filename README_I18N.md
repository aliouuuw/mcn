# Internationalization (i18n) Setup

This project now supports internationalization with two languages:
- **French (fr)** - Default language
- **English (en)**

## Features

### Language Switcher
A language switcher component is available in the navigation bar, allowing users to switch between French and English.

### Automatic Language Detection
The application automatically detects the user's browser language and sets it as the default if available. Otherwise, it falls back to French.

### Persistent Language Selection
The selected language is stored in localStorage, so the user's preference is remembered across sessions.

## File Structure

```
src/
├── i18n/
│   ├── config.js           # i18n configuration
│   └── locales/
│       ├── fr.json         # French translations
│       └── en.json         # English translations
└── components/
    └── LanguageSwitcher.jsx # Language switcher component
```

## Usage

### In Components

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.museum')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### With HTML Content

For translations containing HTML tags:

```jsx
<p dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />
```

### Changing Language Programmatically

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <button onClick={() => changeLanguage('en')}>
      Switch to English
    </button>
  );
}
```

## Adding New Translations

1. Add the translation key and value to both language files:
   - `src/i18n/locales/fr.json`
   - `src/i18n/locales/en.json`

2. Use the translation in your component:
   ```jsx
   {t('your.new.key')}
   ```

## Translation Keys

### Navigation
- `nav.museum` - Museum name
- `nav.tagline` - Museum tagline
- `nav.collections` - Collections link
- `nav.agenda` - Events/Agenda link
- `nav.visit` - Visit link

### Hero Section
- `hero.kicker` - Hero kicker text
- `hero.title` - Main hero title
- `hero.subtitle` - Hero subtitle (supports HTML)
- `hero.cta` - Call-to-action button text
- `hero.works` - Works count text
- `hero.cultures` - Cultures text

### Artifacts
- `artifact.origin` - Origin label
- `artifact.period` - Period label
- `artifact.material` - Material label
- `artifact.culturalContext` - Cultural context label
- `artifact.listen` - Listen button text
- `artifact.share` - Share button text
- `artifact.backToCollections` - Back to collections link

### Collections
- `collections.title` - Collections page title
- `collections.subtitle` - Collections page subtitle
- `collections.viewDetails` - View details button

### Common
- `common.loading` - Loading text
- `common.error` - Error message
- `common.close` - Close button text

## Dependencies

- `i18next` - Core i18n framework
- `react-i18next` - React bindings for i18next
- `i18next-browser-languagedetector` - Automatic language detection

## Configuration

The i18n configuration is located in `src/i18n/config.js`:

```javascript
{
  fallbackLng: 'fr',           // Default language
  debug: true,                  // Enable debug mode (set to false in production)
  interpolation: {
    escapeValue: false          // React already escapes values
  },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  },
  react: {
    useSuspense: false          // Disable suspense for better compatibility
  }
}
