import i18n from 'i18next'

import en from './locales/en.json'
import de from './locales/de.json'
import es from './locales/es.json'

export const resources = { en: { translation: en }, de: { translation: de }, es: { translation: es } }

export type SupportedLanguage = 'en' | 'de' | 'es'

export function initI18n(language: SupportedLanguage = 'en') {
  return i18n.init({
    lng: language,
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  })
}

export default i18n
