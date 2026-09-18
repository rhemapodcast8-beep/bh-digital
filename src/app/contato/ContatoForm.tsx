'use client';

import { trackFormSubmit, trackContactClick } from '@/components/analytics/events';

/**
 * ContatoForm — formulário de contato com rastreamento GA4.
 *
 * Client Component separado para manter a ContatoPage como Server Component.
 * Rastreia:
 * - form_submit: quando o botão Enviar é clicado (sem dados do formulário).
 * - contact_click: cliques em links de contato direto (se forem adicionados).
 *
 * NÃO envia nenhum dado preenchido no formulário para o GA4.
 */
export function ContatoForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Rastreia o envio — sem dados do formulário
    trackFormSubmit({
      form_id: 'contato_page',
      page_path: '/contato',
    });
    // TODO: Implementar envio real do formulário (ex: API Route, Server Action)
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Nome</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
            placeholder="Seu nome"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">E-mail</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
            placeholder="seu@email.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">Mensagem</label>
        <textarea
          rows={5}
          required
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
          placeholder="Como podemos ajudar?"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-slate-950 font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Enviar Mensagem
      </button>
    </form>
  );
}
