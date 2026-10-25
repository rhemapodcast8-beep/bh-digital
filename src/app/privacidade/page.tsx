'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function PrivacidadePage() {
  const { t, locale, localizePath } = useI18n();

  return (
    <div className="min-h-screen bg-[#080E1B] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pb-8 border-b border-slate-800">
          <h1 className="text-4xl font-extrabold text-white">{t.privacidade.pageTitle}</h1>
          <p className="text-lg text-slate-400">
            {t.privacidade.lastUpdate}: {new Date().toLocaleDateString(locale)}
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{t.privacidade.sec1Title}</h2>
            <p>{t.privacidade.sec1Text}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{t.privacidade.sec2Title}</h2>
            <p>{t.privacidade.sec2Text}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{t.privacidade.sec3Title}</h2>
            <p>{t.privacidade.sec3Text}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{t.privacidade.sec4Title}</h2>
            <p>{t.privacidade.sec4Text}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">{t.privacidade.sec5Title}</h2>
            <p>{t.privacidade.sec5Text}</p>
          </section>
        </div>

        <div className="text-center pt-12 border-t border-slate-800">
          <Link href={localizePath('/')} className="inline-flex items-center gap-2 text-[#E5C05B] hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>{t.nav.backToHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
