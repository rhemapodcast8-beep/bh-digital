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
    dataLayer: unknown[];
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
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0RNEK4PZCS';
  window.gtag('event', eventName, {
    ...params,
    send_to: measurementId,
  });
}

/**
 * RouteTracker — Client Component que rastreia page_view no GA4
 * a cada mudança de rota subsequente no App Router.
 *
 * A carga inicial da página é rastreada nativamente pelo `gtag('config')`
 * em GoogleAnalytics. O RouteTracker intercepta as transições client-side (SPA).
 */
export function RouteTracker() {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0RNEK4PZCS';
  const isFirstRender = useRef(true);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!measurementId) return;

    // Garante que o dataLayer e gtag existem
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function gtag() {
          window.dataLayer.push(arguments);
        };
      }
    }

    // Na primeira carga, o page_view é registrado nativamente pelo gtag('config').
    // Evita duplicar o evento de visualização da landing page inicial.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Evita duplicar o event na mesma rota
    if (prevPathnameRef.current === pathname) return;
    prevPathnameRef.current = pathname;

    // Aguarda atualização do document.title após transição de rota no App Router
    setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
        send_to: measurementId,
      });
    }, 100);
  }, [pathname, measurementId]);

  return null;
}
