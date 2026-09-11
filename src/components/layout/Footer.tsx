'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ApoioModal } from '@/components/ui/ApoioModal';
import {
  BookOpen,
  Sparkles,
  BookMarked,
  Smartphone,
  Wrench,
  ShieldCheck,
  ExternalLink,
  ArrowUp,
} from 'lucide-react';

export function Footer() {
  const [isApoioModalOpen, setIsApoioModalOpen] = useState(false);

  return (
    <footer className="bg-[#040812] border-t border-slate-800/80 text-slate-300">

      {/* Top Banner / Mission */}
      <div className="border-b border-slate-800/50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C05B] font-bold text-xl shadow-lg">
              BH
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">BH DIGITAL</h3>
              <p className="text-sm text-slate-400">
                Palavra • Estudos • Livros • Ferramentas — Um ecossistema digital para edificação cristã.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all hover:border-[#D4AF37]/60"
            >
              <Smartphone className="w-4 h-4 text-[#E5C05B]" />
              <span>Bíblia Sagrada BH (Google Play)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 7 Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-sm">

          {/* Col 1: BH DIGITAL */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-bold text-[#D4AF37] tracking-wider text-xs uppercase">BH DIGITAL</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma digital profissional integrando conteúdos bíblicos, literatura, aplicativos e ferramentas tecnológicas.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Versão:</div>
              <div className="font-mono text-[11px] text-[#E5C05B]">v2.0 • Next.js + Supabase</div>
            </div>
          </div>

          {/* Col 2: Estudos */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Estudos</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: 'Todos os Estudos', href: '/estudos' },
                { label: 'Esboços de Pregação', href: '/estudos/esbocos' },
                { label: 'Estudos Bíblicos', href: '/estudos/estudos-biblicos' },
                { label: 'Personagens', href: '/estudos/personagens' },
                { label: 'Parábolas', href: '/estudos/parabolas' },
                { label: 'Fé e Oração', href: '/estudos/fe' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Devocionais */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Devocionais</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: 'Devocional de Hoje', href: '/devocionais' },
                { label: 'Palavra Diária', href: '/devocionais' },
                { label: 'Lições Bíblicas', href: '/licoes' },
                { label: 'Leitura Bíblica', href: '/biblia' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Livros */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Livros</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/livros" className="hover:text-white transition-colors">
                  Catálogo de Livros
                </Link>
              </li>
              <li>
                <Link href="/livros" className="hover:text-[#E5C05B] font-medium transition-colors">
                  Quando Deus Soprar
                </Link>
              </li>
              <li>
                <a
                  href="https://www.amazon.com.br/dp/B0HFBBSG25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  Amazon Brasil <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://loja.uiclap.com/titulo/ua192400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  UICLAP Loja <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Aplicativos */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Aplicativos</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5C05B] font-semibold flex items-center gap-1"
                >
                  BÍBLIA SAGRADA BH
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/biblia" className="hover:text-white transition-colors">
                  Bíblia Online Web
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-[11px]">Versão Android disponível</span>
              </li>
            </ul>
          </div>

          {/* Col 6: Ferramentas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Ferramentas</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: 'ESTUDA-FÁCIL', href: '/ferramentas' },
                { label: 'WIPE CRM', href: '/ferramentas' },
                { label: 'Biblioteca Premium', href: '/premium' },
                { label: 'Materiais Digitais', href: '/materiais' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="hover:text-[#E5C05B] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 7: Suporte */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Suporte</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato & Dúvidas
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Painel Admin</span>
                </Link>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => setIsApoioModalOpen(true)}
                  className="text-xs bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#E5C05B] border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1"
                >
                  Apoie o BH DIGITAL
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Redes Sociais:</span>
            {[
              { label: 'YouTube', href: 'https://www.youtube.com/channel/UC0iUfFE9lOdzj_ycZGzkIdg', hoverClass: 'hover:bg-red-950/40 hover:text-red-400' },
              { label: 'TikTok', href: 'https://www.tiktok.com/@noite.comdeus', hoverClass: 'hover:bg-slate-800 hover:text-cyan-300' },
              { label: 'Noite com Deus', href: 'https://www.youtube.com/@Noite.comDeus', hoverClass: 'hover:bg-red-950/40 hover:text-red-400' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all ${social.hoverClass}`}
              >
                <span>{social.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>

          <div className="text-xs text-slate-500 text-center sm:text-right">
            <span>© {new Date().getFullYear()} </span>
            <strong className="text-slate-300 font-semibold">BH DIGITAL</strong>
            <span>. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>

      <ApoioModal isOpen={isApoioModalOpen} onClose={() => setIsApoioModalOpen(false)} />
    </footer>
  );
}
