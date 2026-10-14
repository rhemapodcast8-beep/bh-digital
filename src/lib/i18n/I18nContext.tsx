'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SupportedLocale, DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE_NAME } from './locales';
import { getDictionary } from './getDictionary';
import { TranslationType } from './dictionaries/pt-BR';

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (newLocale: SupportedLocale) => void;
  t: TranslationType;
  localizePath: (path: string, targetLocale?: SupportedLocale) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectLocaleFromPath(pathname: string): { locale: SupportedLocale; strippedPath: string } {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    const stripped = pathname.replace(/^\/en/, '') || '/';
    return { locale: 'en', strippedPath: stripped };
  }
  if (pathname.startsWith('/es/') || pathname === '/es') {
    const stripped = pathname.replace(/^\/es/, '') || '/';
    return { locale: 'es', strippedPath: stripped };
  }
  return { locale: 'pt-BR', strippedPath: pathname };
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect locale from current path
  const detected = useMemo(() => detectLocaleFromPath(pathname), [pathname]);
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(detected.locale);

  useEffect(() => {
    setCurrentLocale(detected.locale);
    // Update document lang attribute
    document.documentElement.lang = LOCALES[detected.locale].htmlLang;
  }, [detected.locale]);

  const localizePath = (path: string, targetLocale?: SupportedLocale): string => {
    const loc = targetLocale || currentLocale;
    // Strip any existing locale prefix
    let clean = path;
    if (clean.startsWith('/en/') || clean === '/en') clean = clean.replace(/^\/en/, '') || '/';
    if (clean.startsWith('/es/') || clean === '/es') clean = clean.replace(/^\/es/, '') || '/';

    if (loc === 'pt-BR') {
      return clean;
    }
    return `/${loc}${clean === '/' ? '' : clean}`;
  };

  const handleSetLocale = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) return;

    // Set cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Localize current URL and push
    const targetUrl = localizePath(pathname, newLocale);
    router.push(targetUrl);
  };

  const t = useMemo(() => getDictionary(currentLocale), [currentLocale]);

  return (
    <I18nContext.Provider
      value={{
        locale: currentLocale,
        setLocale: handleSetLocale,
        t,
        localizePath,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Return fallback if rendered outside provider (e.g. edge cases)
    const t = getDictionary(DEFAULT_LOCALE);
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t,
      localizePath: (path: string) => path,
    };
  }
  return context;
}
