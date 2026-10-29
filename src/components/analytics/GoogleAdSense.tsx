/**
 * GoogleAdSense — AdSense Official Script Loader
 *
 * Injeta o script oficial do Google AdSense diretamente no HTML inicial com os atributos
 * `async` e `crossOrigin="anonymous"`.
 * No React 19 / Next.js App Router (root layout), tags <script async> são automaticamente
 * içadas (hoisted) pelo React para o <head> do documento HTML estático na renderização pelo servidor (SSR).
 * Isso garante que o rastreador de validação do Google AdSense (Mediapartners-Google)
 * e os bots de auditoria encontrem a tag literal exata dentro de <head> sem depender de JavaScript/hidratação.
 *
 * Requisito:
 *   - Defina NEXT_PUBLIC_ADSENSE_PUBLISHER_ID no ambiente (ex.: ca-pub-1513920784666809).
 *   - Validação explícita: emite alerta claro se a variável estiver ausente ou fora do formato ca-pub-XXXXXXXXXXXXXXXX.
 */
export function GoogleAdSense() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    console.error(
      '[GoogleAdSense] ERRO DE CONFIGURAÇÃO: A variável NEXT_PUBLIC_ADSENSE_PUBLISHER_ID não está definida. ' +
      'O script do Google AdSense NÃO foi carregado. Defina a variável nas configurações de ambiente com o ID oficial ca-pub-1513920784666809.'
    );
    return null;
  }

  // Validação estrita do formato ca-pub- + 16 dígitos
  if (!/^ca-pub-\d{16}$/.test(publisherId)) {
    console.error(
      `[GoogleAdSense] ERRO DE CONFIGURAÇÃO: O valor "${publisherId}" em NEXT_PUBLIC_ADSENSE_PUBLISHER_ID é inválido. ` +
      'Esperado: ca-pub-XXXXXXXXXXXXXXXX (ca-pub- seguido de 16 dígitos).'
    );
    return null;
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}
