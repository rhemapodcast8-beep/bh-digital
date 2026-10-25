import Script from 'next/script';

/**
 * GoogleAdSense — AdSense Script Loader
 *
 * Injeta o script do Google AdSense via next/script com strategy="afterInteractive".
 * O Next.js deduplica scripts com o mesmo `id`, evitando carregamentos duplicados.
 *
 * Configuração:
 *   - Defina NEXT_PUBLIC_ADSENSE_PUBLISHER_ID na Vercel (ex.: ca-pub-XXXXXXXXXXXXXXXXX)
 *   - Sem essa variável, o componente retorna null e NÃO injeta nenhum script.
 *
 * NÃO inclua o identificador de editor diretamente neste arquivo.
 * Obtenha-o no painel do AdSense em:
 *   https://adsense.google.com → Conta → Informações da conta → ID do editor
 *
 * Referência:
 *   https://support.google.com/adsense/answer/9274516
 */
export function GoogleAdSense() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  // Se a variável não estiver configurada, não injeta nenhum script.
  // Isso evita requisições desnecessárias em ambientes de desenvolvimento.
  if (!publisherId) return null;

  // Valida formato mínimo para evitar erros silenciosos: ca-pub-XXXXXXXXXXXXXXXX
  if (!publisherId.startsWith('ca-pub-')) {
    console.warn(
      '[GoogleAdSense] NEXT_PUBLIC_ADSENSE_PUBLISHER_ID inválido. Esperado: ca-pub-XXXXXXXXXXXXXXXXX'
    );
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
