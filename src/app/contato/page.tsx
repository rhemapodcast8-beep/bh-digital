'use client';

import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ContatoForm } from './ContatoForm';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function ContatoPage() {
  const { t, localizePath } = useI18n();

  return (
    <div className="min-h-screen bg-[#080E1B] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-white">{t.contato.pageTitle}</h1>
          <p className="text-lg text-slate-400">
            {t.contato.pageSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.contato.emailTitle}</h3>
            <p className="text-slate-400 text-sm">{t.contato.emailValue}</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.contato.whatsappTitle}</h3>
            <p className="text-slate-400 text-sm">{t.contato.whatsappValue}</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{t.contato.addressTitle}</h3>
            <p className="text-slate-400 text-sm">{t.contato.addressValue}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">{t.contato.formTitle}</h2>
          <ContatoForm />
        </div>

        <div className="text-center pt-8">
          <Link href={localizePath('/')} className="inline-flex items-center gap-2 text-[#E5C05B] hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>{t.nav.backToHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
