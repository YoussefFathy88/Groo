// Pure helpers for picking and using the app language. No React, easy to test.

export const LANGUAGES = ['ar', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Arabic-first: English only when the phone's first language is English. */
export function pickLanguage(phoneLanguageCode: string | null | undefined): Language {
  return phoneLanguageCode?.toLowerCase() === 'en' ? 'en' : 'ar';
}

export function isRTL(language: Language): boolean {
  return language === 'ar';
}

/** Arabic shows Arabic digits (٣/٥); English shows Western digits (3/5). */
export function formatNumber(value: number, language: Language): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US').format(value);
}
