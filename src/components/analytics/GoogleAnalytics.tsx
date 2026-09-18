import Script from 'next/script';

/**
 * GoogleAnalytics — GA4 Script Loader
 *
 * Injeta o gtag.js via next/script com strategy="afterInteractive"
 * (carrega apos hidratacao, sem bloquear o render nem o LCP).
 *
 * Usado diretamente no root layout (Server Component) — seguro porque
 * next/script com strategy="afterInteractive" e suportado em layouts.
 *
 * Nao coleta PII. A anonimizacao de IP e padrao no GA4.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Se a variavel nao estiver configurada, nao injeta nada.
  if (!measurementId) return null;

  const initScript = [
    'window.dataLayer = window.dataLayer || [];',
    'function gtag(){dataLayer.push(arguments);}',
    "gtag('js', new Date());",
    "gtag('config', '" + measurementId + "', {",
    '  send_page_view: false,',
    '  allow_google_signals: false,',
    '  allow_ad_personalization_signals: false,',
    '});',
  ].join('\n');

  return (
    <>
      {/* 1. Carrega o script do Google Analytics */}
      <Script
        src={'https://www.googletagmanager.com/gtag/js?id=' + measurementId}
        strategy="afterInteractive"
        id="ga4-script"
      />

      {/* 2. Inicializa o gtag com configuracoes de privacidade */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: initScript }}
      />
    </>
  );
}
