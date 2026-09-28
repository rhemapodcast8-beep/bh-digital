'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatedHeroBackground } from '@/components/ui/AnimatedHeroBackground';
import {
  Download,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  Crown,
  ExternalLink,
  ChevronRight,
  Layers,
  Smartphone,
  BookMarked,
  Send,
  Clock,
  Compass,
  Search,
  Sliders,
  CheckCircle2,
  Users,
  Heart,
} from 'lucide-react';
import {
  MOCK_ESTUDOS,
  MOCK_DEVOCIONAIS,
  MOCK_LIVROS,
  SERIE_LICOES,
  MOCK_LICOES,
} from '@/lib/mockData';
import { Modal } from '@/components/ui/Modal';
import { ApoioModal } from '@/components/ui/ApoioModal';

export default function HomePage() {
  const [newsletterNome, setNewsletterNome] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterEnviado, setNewsletterEnviado] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isApoioModalOpen, setIsApoioModalOpen] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterNome.trim() && newsletterEmail.trim()) {
      setNewsletterEnviado(true);
      setTimeout(() => {
        setNewsletterNome('');
        setNewsletterEmail('');
        setNewsletterEnviado(false);
      }, 4000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="space-y-20 sm:space-y-28 pb-20">

        {/* ================================================================ */}
        {/* 1. HERO                                                          */}
        {/* ================================================================ */}
        <section id="hero" className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 overflow-hidden isolate">
          {/* ── Cinematic animated background ── */}
          <AnimatedHeroBackground />

          {/* Content: must stay above background (z-index 10) */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Texto */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1E3D] border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-semibold tracking-wide shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wider">PLATAFORMA CRISTÃ INTEGRADA</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    BH DIGITAL
                  </h1>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E5C05B] tracking-tight leading-snug">
                    Palavra • Estudos • Livros • Ferramentas
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Uma plataforma digital profissional criada para reunir conteúdos edificantes, livros, aplicativos e recursos bíblicos em um único ecossistema seguro e inspirador.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => scrollToSection('secao-biblia-sagrada')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    EXPLORAR PLATAFORMA
                  </button>
                  <button
                    onClick={() => setIsAppModalOpen(true)}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Smartphone className="w-4 h-4 text-[#E5C05B]" />
                    <span>CONHECER A BÍBLIA BH</span>
                  </button>
                </div>

                {/* Quick Pillars */}
                <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  {[
                    { label: 'Palavra', sub: 'Versão ACF Oficial' },
                    { label: 'Estudos', sub: 'Lições & Exegese' },
                    { label: 'Livros', sub: 'Amazon & UICLAP' },
                    { label: 'Projetos', sub: 'Estuda-Fácil & CRM' },
                  ].map((p) => (
                    <div key={p.label} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{p.label}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{p.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coluna direita: App visual */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setIsAppModalOpen(true)}
                  style={{ animation: 'heroFloat 6s ease-in-out infinite' }}
                >
                  {/* Outer glow ring — animated */}
                  <div className="absolute -inset-6 rounded-[52px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(212,175,55,0.12) 0%, rgba(30,58,138,0.1) 60%, transparent 100%)',
                      filter: 'blur(20px)',
                      animation: 'glowPulse 6s ease-in-out infinite',
                    }}
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-[#D4AF37]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />
                  {/* Smartphone mockup simplificado */}
                  <div className="relative w-[280px] sm:w-[300px] rounded-[44px] p-3 bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] shadow-2xl border border-slate-700/60">
                    <div className="relative w-full h-[560px] rounded-[36px] overflow-hidden flex flex-col bg-[#070D18]">
                      {/* Status bar */}
                      <div className="pt-3 px-5 flex justify-between items-center">
                        <span className="text-[11px] text-slate-400">09:41</span>
                        <div className="w-20 h-5 bg-[#0A1124] rounded-full mx-auto" />
                        <span className="text-[11px] text-slate-400">100%</span>
                      </div>
                      {/* App header */}
                      <div className="px-5 pt-4 pb-3 border-b border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/40 flex items-center justify-center">
                            <span className="text-[#E5C05B] font-bold text-xs">BH</span>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white">BÍBLIA SAGRADA BH</div>
                            <div className="text-[10px] text-slate-400">Almeida Corrigida Fiel</div>
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex-1 px-5 pt-4 space-y-3">
                        <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Salmos 23:1-6</div>
                        <div className="space-y-2">
                          {[
                            { n: 1, t: 'O Senhor é o meu pastor; nada me faltará.' },
                            { n: 2, t: 'Deitar-me faz em verdes pastos; guia-me mansamente a águas tranquilas.' },
                            { n: 3, t: 'Refrigera a minha alma; guia-me pelas veredas da justiça...' },
                          ].map((v) => (
                            <div key={v.n} className="flex gap-2">
                              <span className="text-[10px] text-[#D4AF37] font-bold w-4 shrink-0">{v.n}</span>
                              <span className="text-[11px] text-slate-200 leading-relaxed">{v.t}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-800/60 flex items-center justify-center gap-2">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                            <BookOpen className="w-3.5 h-3.5 text-[#E5C05B]" />
                            <span className="text-[10px] text-[#E5C05B] font-semibold">Ler Bíblia Completa</span>
                          </div>
                        </div>
                      </div>
                      {/* Bottom nav */}
                      <div className="px-3 py-3 border-t border-slate-800/60 flex justify-around">
                        {['Bíblia', 'Devoc.', 'Áudio', 'Perfil'].map((t) => (
                          <div key={t} className="text-[9px] text-slate-400 text-center">{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. BÍBLIA SAGRADA BH                                            */}
        {/* ================================================================ */}
        <section id="secao-biblia-sagrada" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0C1833] via-[#091226] to-[#070D1C] border border-[#1E3A8A]/70 shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
                  <Smartphone className="w-3.5 h-3.5 text-[#E5C05B]" />
                  <span>APLICATIVO OFICIAL PARA ANDROID</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  BÍBLIA SAGRADA BH
                </h2>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-extrabold uppercase tracking-wider">
                  DESTAQUE: Versão ACF — Almeida Corrigida Fiel
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Desenvolvido para oferecer uma experiência de leitura limpa, reverente e sem distrações. Tenha os 66 livros das Sagradas Escrituras sempre com você.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <button
                  onClick={() => setIsAppModalOpen(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>CONHECER O APLICATIVO</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <Link
                  href="/biblia"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#E5C05B]" />
                  <span>LEITURA ONLINE NO NAVEGADOR</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              {[
                { Icon: BookOpen, title: 'Leitura Limpa', desc: 'Design tipográfico fluido com controle de fontes e tema escuro.' },
                { Icon: CheckCircle2, title: 'Modo Offline', desc: 'Acesso completo a todos os 66 livros sem conexão de dados.' },
                { Icon: Layers, title: 'Planos de Leitura', desc: 'Roteiros estruturados para leitura anual e dos Evangelhos.' },
                { Icon: Send, title: 'Compartilhamento', desc: 'Compartilhe versículos em formato de imagem para WhatsApp.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-950 text-[#E5C05B] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">{title}</h4>
                    <p className="text-xs text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. ESTUDOS BÍBLICOS                                             */}
        {/* ================================================================ */}
        <section id="secao-estudos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <BookMarked className="w-3.5 h-3.5" />
                <span>Crescimento Teológico e Edificação</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">ESTUDOS BÍBLICOS</h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Conteúdos bíblicos organizados por eixos temáticos para enriquecer seu conhecimento das Escrituras.
              </p>
            </div>
            <Link
              href="/estudos"
              className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <span>VER TODOS OS ESTUDOS</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {['Exegese', 'Teologia', 'Vida Cristã', 'Liderança', 'Família', 'Oração'].map((cat) => (
              <Link
                key={cat}
                href="/estudos"
                className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ESTUDOS.slice(0, 3).map((estudo) => {
              const catSlug = estudo.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              return (
              <Link
                key={estudo.id}
                href={`/estudos/${catSlug}/${estudo.slug}`}
                className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={estudo.imagem}
                    alt={estudo.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070D18]/90 backdrop-blur-sm border border-[#D4AF37]/40 text-[#E5C05B] text-[11px] font-bold">
                    {estudo.categoria}
                  </div>
                  <div className="absolute bottom-2 right-3 text-[10px] text-slate-300 bg-black/70 px-2 py-0.5 rounded">
                    {estudo.tempoLeitura}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-medium text-[#D4AF37]">{estudo.referencia}</div>
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                      {estudo.titulo}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{estudo.resumo}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{estudo.data}</span>
                    <span
                      className="text-xs font-bold text-white group-hover:text-[#E5C05B] flex items-center gap-1 transition-colors"
                    >
                      <span>Ler estudo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. DEVOCIONAIS                                                   */}
        {/* ================================================================ */}
        <section id="secao-devocionais" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inspiração para o Seu Dia</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">DEVOCIONAIS</h2>
              <p className="text-sm sm:text-base text-slate-300">
                Mensagens curtas para reflexão diária e renovação espiritual.
              </p>
            </div>
            <Link
              href="/devocionais"
              className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <span>VER DEVOCIONAIS</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_DEVOCIONAIS.map((dev) => (
              <Link
                key={dev.id}
                href="/devocionais"
                className="rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md group cursor-pointer"
              >
                <div>
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={dev.imagem}
                      alt={dev.titulo}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080E1B] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded">
                      {dev.data}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[11px] font-bold text-[#E5C05B]">{dev.referenciaBiblica}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-2">{dev.titulo}</h4>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{dev.resumo}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 group-hover:bg-slate-800 text-xs font-semibold text-white border border-slate-800 flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Ler Devocional</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#E5C05B]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. LIÇÕES BÍBLICAS                                              */}
        {/* ================================================================ */}
        <section id="secao-licoes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#070D18] border-2 border-[#D4AF37]/50 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>SÉRIE DE ESTUDOS EM DESTAQUE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {SERIE_LICOES.titulo}
                </h2>
                <p className="text-base sm:text-lg text-[#E5C05B] font-semibold">{SERIE_LICOES.subtitulo}</p>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">{SERIE_LICOES.descricao}</p>
                
                <div className="pt-4">
                  <Link
                    href="/licoes"
                    className="inline-flex px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg items-center gap-2 transition-all shrink-0"
                  >
                    <span>VER TODAS AS LIÇÕES</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="shrink-0 w-48 sm:w-56 hidden sm:block">
                <Link href="/licoes">
                  <img 
                    src="/images/licoes/capa-adultos-4-trimestre-2026.png" 
                    alt="Lições Bíblicas Adultos — 4º Trimestre 2026 — O Deus da Aliança" 
                    className="w-full h-auto object-contain rounded-xl shadow-2xl border border-slate-700/50 hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
            </div>

            <div className="space-y-3 relative z-10 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold uppercase tracking-wider text-slate-300">Índice das 13 Lições</span>
                <span className="text-[#E5C05B] font-mono">13 tópicos bíblicos</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {MOCK_LICOES.slice(0, 6).map((licao) => (
                  <Link
                    key={licao.numero}
                    href={`/licoes/${licao.slug}`}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 flex items-start gap-3 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#E5C05B] font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-colors">
                      {licao.numero < 10 ? `0${licao.numero}` : licao.numero}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#E5C05B] transition-colors truncate">
                        {licao.titulo}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-mono block">{licao.referenciaBiblica}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pt-2 text-center">
                <Link
                  href="/licoes"
                  className="text-xs font-bold text-[#E5C05B] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explorar todas as 13 lições com referências bíblicas completas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. LIVROS                                                        */}
        {/* ================================================================ */}
        <section id="secao-livros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Publicações Oficiais</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">LIVROS</h2>
              <p className="text-sm sm:text-base text-slate-300">
                Obras publicadas disponíveis nas principais livrarias e plataformas editoriais.
              </p>
            </div>
            <Link
              href="/livros"
              className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <span>VER CATÁLOGO COMPLETO</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {MOCK_LIVROS.map((livro) => (
              <div
                key={livro.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row gap-6 shadow-xl transition-all"
              >
                <div className="w-full sm:w-44 h-64 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 shrink-0 bg-slate-950">
                  <img
                    src={livro.imagemCapa}
                    alt={livro.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                      {livro.formato}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">{livro.titulo}</h3>
                    <p className="text-xs text-slate-400">Por <strong className="text-slate-200">{livro.autor}</strong></p>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{livro.descricao}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={livro.linkCompra}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
                      >
                        <span>COMPRAR AGORA</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <Link
                      href="/livros"
                      className="w-full text-center text-xs text-slate-400 hover:text-white py-1 font-medium transition-colors block"
                    >
                      Ver detalhes editoriais e sinopse completa →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. FERRAMENTAS DIGITAIS                                          */}
        {/* ================================================================ */}
        <section id="secao-ferramentas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Compass className="w-3.5 h-3.5" />
                <span>Tecnologia a Serviço da Palavra</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">FERRAMENTAS DIGITAIS</h2>
              <p className="text-sm sm:text-base text-slate-300">
                Recursos interativos para otimizar sua rotina de estudo bíblico.
              </p>
            </div>
            <Link
              href="/ferramentas"
              className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <span>ACESSAR TODAS AS FERRAMENTAS</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Search, title: 'Consulta Bíblica Rápida', desc: 'Busca instantânea por termos e versículos com navegação fluida na Bíblia ACF.', href: '/biblia', cta: 'Abrir consulta' },
              { Icon: BookMarked, title: 'Planos de Estudo', desc: 'Cronogramas diários para leitura completa das Escrituras com progresso.', href: '/ferramentas', cta: 'Ver cronogramas' },
              { Icon: Sliders, title: 'Comparador de Versões', desc: 'Ferramenta comparativa para observar nuances lado a lado entre traduções.', href: '/ferramentas', cta: 'Testar comparador', badge: 'Demo' },
              { Icon: Sparkles, title: 'Auxílio para Estudo', desc: 'Roteiros exegéticos e quadros históricos para preparação de mensagens.', href: '/materiais', cta: 'Ver materiais de apoio' },
            ].map(({ Icon, title, desc, href, cta, badge }) => (
              <div key={title} className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-[#E5C05B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{title}</h3>
                    {badge && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{badge}</span>}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
                <Link href={href} className="text-xs font-bold text-[#E5C05B] hover:text-white flex items-center gap-1">
                  <span>{cta}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. OUTROS PROJETOS (ESTUDA-FÁCIL / WIPE CRM)                    */}
        {/* ================================================================ */}
        <section id="secao-projetos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Layers className="w-3.5 h-3.5" />
                <span>Inovação & Soluções Digitais</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">OUTROS PROJETOS</h2>
              <p className="text-sm sm:text-base text-slate-300">
                Conheça as demais soluções em tecnologia e produtividade do nosso ecossistema.
              </p>
            </div>
            <div className="text-xs text-slate-400">Projetos em fase ativa de desenvolvimento</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                code: 'EF',
                color: 'blue',
                name: 'ESTUDA-FÁCIL',
                sub: 'Plataforma de Estudos Inteligentes',
                desc: 'Plataforma de estudos inteligentes com organização de cronogramas, flashcards, simulados e planejamento de aprendizagem para estudantes, concurseiros e vestibulandos.',
                items: ['Organização automatizada de rotinas e matérias', 'Revisões espaçadas e flashcards com métricas', 'Painel de desempenho e foco contínuo'],
                cta: 'CONHECER PROJETO ESTUDA-FÁCIL',
                ctaColor: '[#E5C05B]',
              },
              {
                code: 'WC',
                color: 'emerald',
                name: 'WIPE CRM',
                sub: 'Gestão de Relacionamento e Vendas',
                desc: 'Sistema moderno de gestão de relacionamento e processos comerciais, projetado para automação de atendimento, funis e organização de leads.',
                items: ['Gestão visual de funil de vendas (Kanban)', 'Histórico unificado de conversas e clientes', 'Relatórios de conversão e produtividade'],
                cta: 'CONHECER PROJETO WIPE CRM',
                ctaColor: 'emerald-400',
              },
            ].map((p) => (
              <div
                key={p.name}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#0B1528] to-[#070D18] border border-blue-900/60 shadow-xl space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${p.color === 'blue' ? 'bg-blue-950/80 border-blue-700/50 text-blue-400' : 'bg-emerald-950/80 border-emerald-700/50 text-emerald-400'} border flex items-center justify-center font-bold text-lg`}>
                      {p.code}
                    </div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-700/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Em desenvolvimento
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">{p.name}</h3>
                    <div className={`text-xs font-semibold ${p.color === 'blue' ? 'text-[#E5C05B]' : 'text-emerald-400'} mt-0.5`}>{p.sub}</div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                  <div className="space-y-2 pt-2">
                    {p.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <Link
                    href="/ferramentas"
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all hover:border-[#D4AF37]/60"
                  >
                    <span>{p.cta}</span>
                    <ChevronRight className={`w-4 h-4 ${p.color === 'blue' ? 'text-[#E5C05B]' : 'text-emerald-400'}`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. BIBLIOTECA PREMIUM                                           */}
        {/* ================================================================ */}
        <section id="secao-premium" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0F1E3D] via-[#091326] to-[#040812] border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden text-center space-y-8">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-6 right-8 text-[#D4AF37]/20 pointer-events-none">
              <Crown className="w-28 h-28" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              <span>FUTURA ÁREA PREMIUM</span>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">BIBLIOTECA PREMIUM</h2>
              <p className="text-lg sm:text-xl text-[#E5C05B] font-semibold">
                Ferramentas e conteúdos para estudar, ensinar e preparar mensagens.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Um ambiente digital inteligente com recursos exegéticos avançados, geradores didáticos e materiais diagramados.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
              {[
                { title: 'Gerador de Esboços', desc: 'Estruturação homilética com temas e aplicações práticas.' },
                { title: 'Explicação de Passagens', desc: 'Apoio exegético e histórico para cada versículo.' },
                { title: 'Estudos Avançados', desc: 'Biografias, séries temáticas e questionários reflexivos.' },
                { title: 'Materiais Exclusivos', desc: 'Apostilas em PDF, manuais e materiais para líderes.' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                    <Crown className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <Link
                href="/premium"
                className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/25 transition-all hover:scale-105 active:scale-95"
              >
                CONHECER BIBLIOTECA PREMIUM
              </Link>
              <div className="text-xs text-[#E5C05B] font-medium">
                &ldquo;Assinatura e valores serão disponibilizados em breve.&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 10. COMUNIDADE BH DIGITAL                                       */}
        {/* ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-slate-900 border border-[#D4AF37]/20 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  <Users className="w-4 h-4" />
                  <span>Comunidade BH DIGITAL</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Faça parte da nossa comunidade</h2>
                <p className="text-slate-300">
                  Faça parte da nossa comunidade. Crie seu perfil para salvar seus estudos favoritos, fazer anotações e acessar ferramentas exclusivas.
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center text-slate-400 bg-slate-800 z-${10-i}`}>
                        <Users className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-slate-400">
                    Junte-se a pessoas que desejam<br />conhecer mais a Palavra de Deus
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto shrink-0">
                <Link
                  href="/auth/cadastro"
                  className="w-full md:w-auto px-8 py-4 rounded-2xl bg-[#1E3A8A] hover:bg-[#1e3a8a]/80 border border-[#D4AF37]/50 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#E5C05B]" />
                  <span>CRIAR MINHA CONTA</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 11. APOIE O BH DIGITAL                                          */}
        {/* ================================================================ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#D4AF37]/10 via-[#E5C05B]/5 to-transparent border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Heart className="w-4 h-4" />
                <span>Projeto Voluntário</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Apoie o BH DIGITAL</h2>
              <p className="text-slate-300">
                O BH DIGITAL é um projeto que visa abençoar a igreja disponibilizando ferramentas de estudo de forma acessível. Se este projeto tem te abençoado, considere nos apoiar. Qualquer valor é bem-vindo.
              </p>
            </div>
            
            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsApoioModalOpen(true)}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/25 transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>APOIAR O BH DIGITAL</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 12. NEWSLETTER / SIGA O BH DIGITAL                              */}
        {/* ================================================================ */}
        <section id="secao-siga" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0C1832] via-[#091122] to-[#080E1B] border border-blue-900/70 shadow-2xl space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Send className="w-3.5 h-3.5" />
                <span>Comunidade & Notificações</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">SIGA O BH DIGITAL</h2>
              <p className="text-sm sm:text-base text-slate-300">
                Receba novos estudos, devocionais, lições e novidades diretamente em seu e-mail.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={newsletterNome}
                    onChange={(e) => setNewsletterNome(e.target.value)}
                    placeholder="Digite seu nome..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Seu E-mail</label>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Digite seu melhor e-mail..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>QUERO RECEBER CONTEÚDOS</span>
              </button>
              {newsletterEnviado && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs text-center animate-fadeIn">
                  ✓ Cadastro realizado! Você receberá nossas atualizações em breve.
                </div>
              )}
            </form>
          </div>
        </section>

      </div>

      {/* Modal Download App */}
      <Modal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        title="Baixar Aplicativo BÍBLIA SAGRADA BH"
      >
        <div className="space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E3A8A] border border-[#D4AF37]/60 flex items-center justify-center text-[#E5C05B] shadow-xl flex-shrink-0">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Bíblia Sagrada BH para Android</h4>
              <p className="text-xs text-slate-400">Pacote oficial: br.com.bibliasagradabh.app</p>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Disponível gratuitamente no Google Play</div>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tenha a Bíblia completa no seu celular com recursos de áudio narrado, estudos, devocionais diários, marcação de versículos, anotações e modo noturno.
          </p>
          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            {['Texto bíblico completo com busca rápida', 'Narração em áudio de alta qualidade', 'Devocionais diários com notificações'].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setIsAppModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Fechar
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Ir para o Google Play</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Modal>

      <ApoioModal isOpen={isApoioModalOpen} onClose={() => setIsApoioModalOpen(false)} />
    </>
  );
}
