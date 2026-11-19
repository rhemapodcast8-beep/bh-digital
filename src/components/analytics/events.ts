/**
 * analytics/events.ts
 *
 * Funções de conveniência para disparar eventos GA4 customizados do BH Digital.
 *
 * REGRAS DE PRIVACIDADE:
 * - NUNCA envie nome, e-mail, telefone ou qualquer PII para o GA4.
 * - Parâmetros permitidos: strings de contexto não sensíveis
 *   (página, rota, label de botão, etc.)
 */

import { trackEvent } from './RouteTracker';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface WhatsAppEventParams {
  /** Rótulo descritivo do CTA que foi clicado, ex: "wipe_crm_hero" */
  label: string;
  /** Caminho da página atual, ex: "/ferramentas/wipe-crm" */
  page_path?: string;
}

interface ContactEventParams {
  /** Rótulo do botão/link de contato, ex: "footer_link" */
  label: string;
  page_path?: string;
}

interface FormSubmitEventParams {
  /** Identificador do formulário, ex: "contato_page" */
  form_id: string;
  page_path?: string;
}

// ─── Eventos ──────────────────────────────────────────────────────────────────

/**
 * whatsapp_click
 * Disparado quando o usuário clica em qualquer link de WhatsApp.
 * NÃO inclui número de telefone nem texto da mensagem.
 */
export function trackWhatsAppClick(params: WhatsAppEventParams) {
  trackEvent('whatsapp_click', {
    event_label: params.label,
    page_path: params.page_path ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}

/**
 * contact_click
 * Disparado em cliques de botões/links de contato que NÃO são WhatsApp.
 */
export function trackContactClick(params: ContactEventParams) {
  trackEvent('contact_click', {
    event_label: params.label,
    page_path: params.page_path ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}

/**
 * wapi_crm_view
 * Disparado quando a página /ferramentas/wipe-crm é visualizada.
 */
export function trackWapiCrmView() {
  trackEvent('wapi_crm_view', {
    page_path: '/ferramentas/wipe-crm',
  });
}

/**
 * form_submit
 * Disparado ao envio bem-sucedido de um formulário.
 * NÃO inclui conteúdo do formulário.
 */
export function trackFormSubmit(params: FormSubmitEventParams) {
  trackEvent('form_submit', {
    form_id: params.form_id,
    page_path: params.page_path ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}
