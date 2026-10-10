import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Platform } from 'react-native';

import ar from './ar.json';
import en from './en.json';
import { isRTL, pickLanguage, type Language } from './language';

export { formatNumber, type Language } from './language';

function phoneLanguage(): Language {
  // The static web export runs in Node, where there is no phone language yet.
  if (Platform.OS === 'web' && typeof window === 'undefined') return 'ar';
  return pickLanguage(getLocales()[0]?.languageCode);
}

/** Flip the layout. Web: instantly via <html dir>. Native: follows the phone (supportsRTL). */
export function applyDirection(language: Language) {
  const rtl = isRTL(language);
  if (Platform.OS === 'web') {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
    return;
  }
  I18nManager.allowRTL(true);
}

const language = phoneLanguage();

const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  lng: language,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false }, // React already escapes.
});

applyDirection(language);

export default i18n;
