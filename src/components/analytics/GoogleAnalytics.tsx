import Script from 'next/script';

/**
 * GoogleAnalytics — GA4 Script Loader
 *
 * Injeta o gtag.js via next/script com strategy="afterInteractive"
 * (carrega após hidratação, sem bloquear o render nem o LCP).
 *
 * send_page_view: false → o page_view é disparado exclusivamente pelo
 * RouteTracker, evitando duplicações na primeira carga e nas trocas de rota.
 *
 * O Next.js deduplica scripts com o mesmo `id`, então este componente
 * pode estar no Server Component do root layout sem risco de duplicação.
 *
 * Não coleta PII. A anonimização de IP é padrão no GA4.
 */
export function GoogleAnalytics() {
  const measurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0RNEK4PZCS';

  if (!measurementId) return null;

  return (
    <>
      {/* 1. Carrega o script do Google Analytics */}
      <Script
        id="ga4-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      {/* 2. Inicializa o gtag sem page_view automático */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
          });
        `}
      </Script>
    </>
  );
}
