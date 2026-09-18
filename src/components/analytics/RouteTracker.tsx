'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Declaração global do gtag para TypeScript.
 * Evita dependência da biblioteca @types/gtag.js.
 */
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * trackEvent — helper tipado para disparar eventos GA4.
 *
 * Não envia informações pessoais identificáveis (PII).
 * Parâmetros permitidos: strings não sensíveis (página, rota, label).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/**
 * RouteTracker — Client Component que rastreia page_view no GA4
 * a cada mudança de rota no App Router.
 *
 * Deve ser incluído UMA VEZ no root layout, como filho de <body>.
 * Não renderiza nenhum elemento visual.
 */
export function RouteTracker() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Aguarda o gtag estar disponível antes de enviar o evento
    if (!measurementId || typeof window.gtag !== 'function') return;
    // Evita duplicar o event na mesma rota
    if (prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;

    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, measurementId]);

  return null;
}
