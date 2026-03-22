import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    // Add more languages here:
    // bn: { translation: bn },
    // ta: { translation: ta },
    // kn: { translation: kn },
    // mr: { translation: mr },
    // gu: { translation: gu },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
export { useTranslation } from 'react-i18next';

// Typed helper for type-safe translations
export const t = (key: string, params?: Record<string, any>) => i18n.t(key, params);
