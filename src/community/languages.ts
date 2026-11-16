import { ConnectorLanguageCode, LanguagePreference, LocalizedText, RegionVariety } from './types';

export interface LanguageOption {
  code: ConnectorLanguageCode;
  label: LocalizedText;
  /** Regional varieties offered for this language, with localized labels. */
  varieties?: Array<{ value: RegionVariety; label: LocalizedText }>;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: { en: 'English', es: 'Inglés' } },
  {
    code: 'es',
    label: { en: 'Spanish', es: 'Español' },
    varieties: [
      { value: 'mexico', label: { en: 'Mexico', es: 'México' } },
      { value: 'spain', label: { en: 'Spain', es: 'España' } },
      { value: 'latin-america', label: { en: 'Latin America', es: 'Latinoamérica' } },
      { value: 'other', label: { en: 'Other variety', es: 'Otra variedad' } }
    ]
  },
  {
    code: 'pt',
    label: { en: 'Portuguese', es: 'Portugués' },
    varieties: [
      { value: 'brazil', label: { en: 'Brazil', es: 'Brasil' } },
      { value: 'portugal', label: { en: 'Portugal', es: 'Portugal' } },
      { value: 'other', label: { en: 'Other variety', es: 'Otra variedad' } }
    ]
  },
  { code: 'zh-Hans', label: { en: 'Mandarin', es: 'Mandarín' } },
  { code: 'zh-Hant', label: { en: 'Cantonese', es: 'Cantonés' } },
  { code: 'vi', label: { en: 'Vietnamese', es: 'Vietnamita' } },
  { code: 'tl', label: { en: 'Tagalog', es: 'Tagalo' } },
  { code: 'ko', label: { en: 'Korean', es: 'Coreano' } },
  { code: 'other', label: { en: 'Other / No preference', es: 'Otro / Sin preferencia' } }
];

export function languageLabel(pref: LanguagePreference | null, uiLanguage: 'en' | 'es'): string {
  if (!pref) return uiLanguage === 'en' ? 'Not confirmed' : 'No confirmado';
  if (pref.noPreference || pref.code === 'other') {
    return uiLanguage === 'en' ? 'No language preference' : 'Sin preferencia de idioma';
  }
  const option = LANGUAGE_OPTIONS.find((item) => item.code === pref.code);
  const base = option ? option.label[uiLanguage] : pref.code;
  if (!pref.variety) return base;
  const variety = option?.varieties?.find((item) => item.value === pref.variety);
  const varietyLabel = variety ? variety.label[uiLanguage] : pref.variety;
  return `${base} (${varietyLabel})`;
}

/**
 * Language used for assistant explanations. Only EN/ES have automated copy in
 * this prototype; every other preference falls back to English plus an explicit
 * offer of a human interpreter.
 */
export function assistantLanguageFor(
  pref: LanguagePreference | null,
  appLanguage: 'en' | 'es'
): 'en' | 'es' {
  if (pref && !pref.noPreference && pref.code === 'es') return 'es';
  if (pref && !pref.noPreference && pref.code === 'en') return 'en';
  return appLanguage;
}
