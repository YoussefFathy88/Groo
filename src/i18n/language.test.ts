import ar from './ar.json';
import en from './en.json';
import { formatNumber, isRTL, pickLanguage } from './language';

function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('translations', () => {
  it('Arabic and English have exactly the same keys', () => {
    expect(keys(en).sort()).toEqual(keys(ar).sort());
  });

  it('has no empty strings', () => {
    for (const dict of [ar, en]) {
      for (const key of keys(dict)) {
        const value = key.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], dict);
        expect(String(value).trim()).not.toBe('');
      }
    }
  });
});

describe('pickLanguage', () => {
  it('uses English only when the phone is in English', () => {
    expect(pickLanguage('en')).toBe('en');
    expect(pickLanguage('EN')).toBe('en');
  });

  it('defaults to Arabic for Arabic, other languages, or unknown', () => {
    expect(pickLanguage('ar')).toBe('ar');
    expect(pickLanguage('fr')).toBe('ar');
    expect(pickLanguage(null)).toBe('ar');
    expect(pickLanguage(undefined)).toBe('ar');
  });
});

describe('direction and digits', () => {
  it('Arabic is right-to-left, English is left-to-right', () => {
    expect(isRTL('ar')).toBe(true);
    expect(isRTL('en')).toBe(false);
  });

  it('formats digits per language', () => {
    expect(formatNumber(35, 'ar')).toBe('٣٥');
    expect(formatNumber(35, 'en')).toBe('35');
  });
});
