'use client';

import { useState } from 'react';
import { trackFormSubmit } from '@/components/analytics/events';
import { useI18n } from '@/lib/i18n/I18nContext';

export function ContatoForm() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackFormSubmit({
      form_id: 'contato_page',
      page_path: '/contato',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submitted && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm">
          {t.contato.formSubmittedSuccess}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">{t.contato.nameLabel}</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
            placeholder={t.contato.namePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">{t.contato.emailLabel}</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
            placeholder={t.contato.emailPlaceholder}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">{t.contato.messageLabel}</label>
        <textarea
          rows={5}
          required
          className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none"
          placeholder={t.contato.messagePlaceholder}
        />
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-slate-950 font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        {t.contato.btnSubmit}
      </button>
    </form>
  );
}
