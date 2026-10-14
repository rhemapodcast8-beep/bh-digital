import { SupportedLocale, DEFAULT_LOCALE } from './locales';
import { ptBR, TranslationType } from './dictionaries/pt-BR';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';

const dictionaries: Record<SupportedLocale, TranslationType> = {
  'pt-BR': ptBR,
  'en': en,
  'es': es,
};

export function getDictionary(locale: SupportedLocale): TranslationType {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
