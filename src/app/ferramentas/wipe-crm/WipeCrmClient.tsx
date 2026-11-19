'use client';

import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick, trackWapiCrmView } from '@/components/analytics/events';
import { useEffect } from 'react';

/**
 * WipeCrmAnalytics
 *
 * Client Component responsável por:
 * 1. Rastrear a visualização da página WIPE CRM (wapi_crm_view).
 * 2. Rastrear o clique no botão de WhatsApp (whatsapp_click).
 *
 * Separado do page.tsx para que este continue sendo Server Component.
 */
export function WipeCrmAnalytics() {
  // Dispara wapi_crm_view quando a página é montada
  useEffect(() => {
    trackWapiCrmView();
  }, []);

  return null;
}

/**
 * WhatsAppCTA — botão de CTA do WIPE CRM com rastreamento GA4.
 * Substitui o elemento <a> estático da página.
 */
export function WhatsAppCTA() {
  const handleClick = () => {
    trackWhatsAppClick({
      label: 'wipe_crm_hero_cta',
      page_path: '/ferramentas/wipe-crm',
    });
  };

  return (
    <a
      href="https://wa.me/5582987616759?text=Ol%C3%A1%21+Tenho+interesse+no+WIPE+CRM+e+gostaria+de+saber+mais+sobre+o+teste+gr%C3%A1tis+de+7+dias."
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-900/50"
    >
      <MessageCircle className="w-5 h-5" />
      TESTAR 7 DIAS GRÁTIS
    </a>
  );
}
