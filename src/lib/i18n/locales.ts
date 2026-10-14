export type SupportedLocale = 'pt-BR' | 'en' | 'es';

export interface LocaleInfo {
  code: SupportedLocale;
  label: string;
  flag: string;
  prefix: string; // '' for pt-BR, '/en' for en, '/es' for es
  htmlLang: string;
}

export const LOCALES: Record<SupportedLocale, LocaleInfo> = {
  'pt-BR': {
    code: 'pt-BR',
    label: 'Português',
    flag: '🇧🇷',
    prefix: '',
    htmlLang: 'pt-BR',
  },
  'en': {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
    prefix: '/en',
    htmlLang: 'en',
  },
  'es': {
    code: 'es',
    label: 'Español',
    flag: '🇪🇸',
    prefix: '/es',
    htmlLang: 'es',
  },
};

export const DEFAULT_LOCALE: SupportedLocale = 'pt-BR';
export const LOCALE_COOKIE_NAME = 'bh_locale';
