import React, { useState } from 'react';
import { 
  Download, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  Crown, 
  ExternalLink,
  ChevronRight,
  Layers,
  Smartphone,
  BookMarked,
  ShieldCheck,
  Send,
  Youtube,
  Instagram,
  MessageCircle,
  Clock,
  Compass,
  FileText,
  Search,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { SmartphoneMockup } from '../components/SmartphoneMockup';
import { PageRoute, EstudoItem, DevocionalItem, LicaoBiblica } from '../types';
import { 
  CATEGORIAS_ESTUDOS, 
  MOCK_ESTUDOS, 
  MOCK_DEVOCIONAIS, 
  MOCK_LIVROS, 
  MOCK_CONTEUDOS, 
  MOCK_FERRAMENTAS,
  SERIE_LICOES,
  MOCK_LICOES
} from '../data/mockData';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectEstudo: (estudo: EstudoItem) => void;
  onSelectDevocional: (devocional: DevocionalItem) => void;
  onOpenAppModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectEstudo,
  onSelectDevocional,
  onOpenAppModal
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Siga o BH Digital Newsletter State
  const [newsletterNome, setNewsletterNome] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterEnviado, setNewsletterEnviado] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterNome.trim() && newsletterEmail.trim()) {
      setNewsletterEnviado(true);
      setTimeout(() => {
        setNewsletterNome('');
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-6 sm:pt-12 pb-8 sm:pb-12 overflow-hidden">
        
        {/* Glows de ambientação */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-radial from-[#1E3A8A]/25 via-[#080E1B]/80 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-24 right-12 w-[380px] h-[380px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Coluna Esquerda: Texto Institucional & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1E3D] border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-semibold tracking-wide shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C05B]" />
                <span className="font-bold tracking-wider">PLATAFORMA CRISTÃ INTEGRADA</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                  BH DIGITAL
                </h1>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E5C05B] tracking-tight leading-snug">
                  Palavra • Estudos • Livros • Ferramentas
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Uma plataforma digital profissional criada para reunir conteúdos edificantes, livros, aplicativos e recursos bíblicos em um único ecossistema seguro e inspirador.
              </p>

              {/* Botões Requeridos do Hero */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('secao-biblia-sagrada')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  EXPLORAR PLATAFORMA
                </button>

                <button
                  onClick={onOpenAppModal}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Smartphone className="w-4 h-4 text-[#E5C05B]" />
                  <span>CONHECER A BÍBLIA BH</span>
                </button>
              </div>

              {/* Quick Pillars */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Palavra</div>
                  <div className="text-xs font-bold text-white mt-0.5">Versão ACF Oficial</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estudos</div>
                  <div className="text-xs font-bold text-white mt-0.5">Lições & Exegese</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Livros</div>
                  <div className="text-xs font-bold text-white mt-0.5">Amazon & UICLAP</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Projetos</div>
                  <div className="text-xs font-bold text-white mt-0.5">Estuda-Fácil & CRM</div>
                </div>
              </div>

            </div>

            {/* Coluna Direita: Smartphone Mockup da Bíblia Sagrada BH */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group cursor-pointer" onClick={onOpenAppModal}>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-[#D4AF37]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />
                <SmartphoneMockup onOpenAppModal={onOpenAppModal} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BÍBLIA SAGRADA BH (APRESENTAÇÃO DO APLICATIVO OFICIAL)                  */}
      {/* ========================================================================= */}
      <section id="secao-biblia-sagrada" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0C1833] via-[#091226] to-[#070D1C] border border-[#1E3A8A]/70 shadow-2xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-[#E5C05B]" />
                <span>APLICATIVO OFICIAL PARA ANDROID</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
                BÍBLIA SAGRADA BH
              </h2>

              <div className="inline-block px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-extrabold uppercase tracking-wider">
                DESTAQUE: Versão ACF — Almeida Corrigida Fiel
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Desenvolvido para oferecer uma experiência de leitura limpa, reverente e sem distrações. Tenha os 66 livros das Sagradas Escrituras sempre com você, com total privacidade e funcionamento sem internet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={onOpenAppModal}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>CONHECER O APLICATIVO</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/biblia')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <BookOpen className="w-4 h-4 text-[#E5C05B]" />
                <span>LEITURA ONLINE NO NAVEGADOR</span>
              </button>
            </div>
          </div>

          {/* 4 Recursos Principais Requeridos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950 text-[#E5C05B] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Leitura Limpa</h4>
                <p className="text-xs text-slate-400">Design tipográfico fluido com controle de tamanho de fontes e tema escuro suave.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950 text-[#E5C05B] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Modo Offline</h4>
                <p className="text-xs text-slate-400">Acesso completo a todos os 66 livros da Bíblia sem depender de conexão de dados.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950 text-[#E5C05B] flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Planos de Leitura</h4>
                <p className="text-xs text-slate-400">Roteiros estruturados para leitura anual, dos Evangelhos e livros históricos.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950 text-[#E5C05B] flex items-center justify-center shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Compartilhamento</h4>
                <p className="text-xs text-slate-400">Compartilhe versículos em formato de imagem e texto para WhatsApp e redes.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ESTUDOS BÍBLICOS                                                       */}
      {/* ========================================================================= */}
      <section id="secao-estudos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Crescimento Teológico e Edificação</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              ESTUDOS BÍBLICOS
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Conteúdos bíblicos organizados por eixos temáticos para enriquecer seu conhecimento das Escrituras.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/estudos')}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>VER TODOS OS ESTUDOS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categorias em Destaque: Exegese, Teologia, Vida Cristã, Liderança */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Exegese', 'Teologia', 'Vida Cristã', 'Liderança', 'Família', 'Oração'].map((catName) => (
            <button
              key={catName}
              onClick={() => onNavigate('/estudos')}
              className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Grid de Estudos em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_ESTUDOS.slice(0, 3).map((estudo) => (
            <div 
              key={estudo.id}
              className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg"
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
                  <div className="text-[11px] font-medium text-[#D4AF37]">
                    {estudo.referencia}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                    {estudo.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {estudo.resumo}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{estudo.data}</span>
                  <button
                    onClick={() => onSelectEstudo(estudo)}
                    className="text-xs font-bold text-white group-hover:text-[#E5C05B] flex items-center gap-1 transition-colors"
                  >
                    <span>Ler estudo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. DEVOCIONAIS                                                            */}
      {/* ========================================================================= */}
      <section id="secao-devocionais" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspiração para o Seu Dia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              DEVOCIONAIS
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Mensagens curtas para reflexão diária e renovação espiritual pela manhã e à noite.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/devocionais')}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>VER DEVOCIONAIS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_DEVOCIONAIS.map((dev) => (
            <div
              key={dev.id}
              className="rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md group"
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
                  <span className="text-[11px] font-bold text-[#E5C05B]">
                    {dev.referenciaBiblica}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-slate-100 line-clamp-2">
                    {dev.titulo}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {dev.resumo}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onSelectDevocional(dev)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-white border border-slate-800 flex items-center justify-center gap-1 transition-all"
                >
                  <span>Ler Devocional</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5C05B]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. LIÇÕES BÍBLICAS (SÉRIE "O DEUS DA ALIANÇA")                             */}
      {/* ========================================================================= */}
      <section id="secao-licoes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#070D18] border-2 border-[#D4AF37]/50 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header da Série */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>SÉRIE DE ESTUDOS EM DESTAQUE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
                {SERIE_LICOES.titulo}
              </h2>

              <p className="text-base sm:text-lg text-[#E5C05B] font-semibold">
                {SERIE_LICOES.subtitulo}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {SERIE_LICOES.descricao}
              </p>
            </div>

            <button
              onClick={() => onNavigate('/licoes')}
              className="self-start lg:self-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/30 flex items-center gap-2 transition-all shrink-0"
            >
              <span>VER TODAS AS LIÇÕES</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Lista Amostral das Lições (Visual das 13 Lições) */}
          <div className="space-y-3 relative z-10 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300">
                Índice Temático das 13 Lições Estruturadas
              </span>
              <span className="text-[#E5C05B] font-mono">13 tópicos bíblicos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOCK_LICOES.slice(0, 6).map((licao) => (
                <div
                  key={licao.numero}
                  onClick={() => onNavigate('/licoes')}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 cursor-pointer flex items-start gap-3 transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#E5C05B] font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-colors">
                    {licao.numero < 10 ? `0${licao.numero}` : licao.numero}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#E5C05B] transition-colors truncate">
                      {licao.titulo}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      {licao.referenciaBiblica}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('/licoes')}
                className="text-xs font-bold text-[#E5C05B] hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Explorar todas as 13 lições e materiais com referências bíblicas completas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. LIVROS (QUANDO DEUS SOPRAR & JESUS EM PARÁBOLAS DE MATEUS)               */}
      {/* ========================================================================= */}
      <section id="secao-livros" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Publicações Oficiais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              LIVROS
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Obras publicadas disponíveis nas principais livrarias e plataformas editoriais.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/livros')}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>VER CATÁLOGO COMPLETO</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2 Livros Reais em Destaque */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_LIVROS.map((livro) => (
            <div
              key={livro.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row gap-6 shadow-xl transition-all"
            >
              {/* Capa */}
              <div className="w-full sm:w-44 h-64 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 shrink-0 bg-slate-950">
                <img
                  src={livro.capa}
                  alt={livro.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações & Botões Oficiais Requeridos */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                    {livro.tipo}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {livro.titulo}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Por <strong className="text-slate-200">{livro.autor}</strong>
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {livro.descricaoCurta}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {livro.linkAmazon && (
                      <a
                        href={livro.linkAmazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider shadow-sm"
                      >
                        <span>COMPRAR NA AMAZON</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                      </a>
                    )}

                    {livro.linkUiclap && (
                      <a
                        href={livro.linkUiclap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all hover:border-[#D4AF37]/50 uppercase tracking-wider"
                      >
                        <span>COMPRAR NA UICLAP</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#E5C05B]" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate('/livros')}
                    className="w-full text-center text-xs text-slate-400 hover:text-white py-1 font-medium transition-colors"
                  >
                    Ver detalhes editoriais e sinopse completa →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. FERRAMENTAS                                                            */}
      {/* ========================================================================= */}
      <section id="secao-ferramentas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <Compass className="w-3.5 h-3.5" />
              <span>Tecnologia a Serviço da Palavra</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              FERRAMENTAS DIGITAIS
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Recursos interativos para otimizar e apoiar sua rotina diária de estudo bíblico.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/ferramentas')}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>ACESSAR TODAS AS FERRAMENTAS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Recursos Requeridos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-[#E5C05B] flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Consulta Bíblica Rápida</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Busca instantânea por termos, palavras-chave e versículos com navegação fluida em toda a Bíblia ACF.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/biblia')}
              className="text-xs font-bold text-[#E5C05B] hover:text-white flex items-center gap-1"
            >
              <span>Abrir consulta</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-[#E5C05B] flex items-center justify-center">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Planos de Estudo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cronogramas diários para leitura completa das Escrituras com acompanhamento de progresso.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ferramentas')}
              className="text-xs font-bold text-[#E5C05B] hover:text-white flex items-center gap-1"
            >
              <span>Ver cronogramas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-[#E5C05B] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Comparador de Versões</h3>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Demo</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ferramenta comparativa para observar nuances textuais lado a lado entre diferentes traduções bíblicas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ferramentas')}
              className="text-xs font-bold text-[#E5C05B] hover:text-white flex items-center gap-1"
            >
              <span>Testar comparador</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 text-[#E5C05B] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Auxílio para Estudo Bíblico</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Roteiros exegéticos, quadros históricos e resumos temáticos para preparação de mensagens e aulas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/materiais')}
              className="text-xs font-bold text-[#E5C05B] hover:text-white flex items-center gap-1"
            >
              <span>Ver materiais de apoio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. ESTUDA-FÁCIL / WIPE CRM (OUTROS PROJETOS DIGITAIS)                      */}
      {/* ========================================================================= */}
      <section id="secao-projetos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <Layers className="w-3.5 h-3.5" />
              <span>Inovação & Soluções Digitais</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              OUTROS PROJETOS
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Conheça as demais soluções em tecnologia e produtividade do nosso ecossistema.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Projetos em fase ativa de desenvolvimento
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: ESTUDA-FÁCIL */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B1528] to-[#070D18] border border-blue-900/60 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-400 flex items-center justify-center font-bold text-lg">
                  EF
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-700/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Em desenvolvimento
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  ESTUDA-FÁCIL
                </h3>
                <div className="text-xs font-semibold text-[#E5C05B] mt-0.5">
                  Plataforma de Estudos Inteligentes
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Plataforma de estudos inteligentes com organização de cronogramas, flashcards, simulados e planejamento de aprendizagem para estudantes, concurseiros e vestibulandos.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Organização automatizada de rotinas e matérias</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Revisões espaçadas e flashcards com métricas</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Painel de desempenho e foco contínuo</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/ferramentas')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all hover:border-[#D4AF37]/60"
              >
                <span>CONHECER PROJETO ESTUDA-FÁCIL</span>
                <ChevronRight className="w-4 h-4 text-[#E5C05B]" />
              </button>
            </div>
          </div>

          {/* Card: WIPE CRM */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B1528] to-[#070D18] border border-blue-900/60 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  WC
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/50 border border-amber-700/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Em desenvolvimento
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  WIPE CRM
                </h3>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                  Gestão de Relacionamento e Vendas
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sistema moderno de gestão de relacionamento e processos comerciais, projetado para automação de atendimento, funis e organização de leads com interface intuitiva.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Gestão visual de funil de vendas (Kanban)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Histórico unificado de conversas e clientes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Relatórios de conversão e produtividade</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => onNavigate('/ferramentas')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all hover:border-[#D4AF37]/60"
              >
                <span>CONHECER PROJETO WIPE CRM</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 9. BIBLIOTECA PREMIUM                                                     */}
      {/* ========================================================================= */}
      <section id="secao-premium" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0F1E3D] via-[#091326] to-[#040812] border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden text-center space-y-8">
          
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-6 right-8 text-[#D4AF37]/20 pointer-events-none">
            <Crown className="w-28 h-28" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>FUTURA ÁREA PAGA</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
              BIBLIOTECA PREMIUM
            </h2>
            <p className="text-lg sm:text-xl text-[#E5C05B] font-semibold">
              Ferramentas e conteúdos para ajudar você a estudar, ensinar e preparar mensagens.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Um ambiente digital inteligente com recursos exegéticos avançados, geradores didáticos e materiais diagramados.
            </p>
          </div>

          {/* Destaque para os 4 Recursos Requeridos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Gerador de Esboços</h4>
              <p className="text-[11px] text-slate-400">Estruturação homilética com temas, proposições e aplicações práticas.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Explicação de Passagens</h4>
              <p className="text-[11px] text-slate-400">Apoio exegético, histórico e devocional respeitoso para cada versículo.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Estudos Avançados</h4>
              <p className="text-[11px] text-slate-400">Biografias de personagens, séries temáticas e questionários reflexivos.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Materiais Exclusivos</h4>
              <p className="text-[11px] text-slate-400">Apostilas em PDF, manuais de professores e materiais para líderes.</p>
            </div>
          </div>

          {/* Botão Oficial Requerido & Observação Obrigatória */}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => onNavigate('/premium')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#D4AF37]/25 transition-all hover:scale-105 active:scale-95"
            >
              CONHECER BIBLIOTECA PREMIUM
            </button>
            <div className="text-xs text-[#E5C05B] font-medium">
              "Assinatura e valores serão disponibilizados em breve."
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SEÇÃO "SIGA O BH DIGITAL" (ENGAJAMENTO & CAPTAÇÃO)                     */}
      {/* ========================================================================= */}
      <section id="secao-siga" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0C1832] via-[#091122] to-[#080E1B] border border-blue-900/70 shadow-2xl space-y-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <Send className="w-3.5 h-3.5" />
              <span>Comunidade & Notificações</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              SIGA O BH DIGITAL
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              Receba novos estudos, devocionais, lições e novidades da plataforma diretamente em seu e-mail.
            </p>
          </div>

          {/* Formulário de Captação */}
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
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
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
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>QUERO RECEBER CONTEÚDOS</span>
            </button>

            {newsletterEnviado && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs text-center animate-in fade-in">
                ✓ Cadastro demonstrativo realizado! Você receberá nossas atualizações em breve.
              </div>
            )}
          </form>

          {/* Redes Sociais Requeridas */}
          <div className="pt-6 border-t border-slate-800/80 text-center space-y-3">
            <span className="text-xs text-slate-400 block">
              Acompanhe também em nossos canais oficiais:
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); alert('Canal do YouTube em preparação editorial.'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-red-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>YouTube</span>
              </a>

              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); alert('Perfil do Instagram em preparação editorial.'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram</span>
              </a>

              <a
                href="#whatsapp"
                onClick={(e) => { e.preventDefault(); alert('Canal no WhatsApp em preparação editorial.'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#telegram"
                onClick={(e) => { e.preventDefault(); alert('Canal no Telegram em preparação editorial.'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONTEÚDOS (VÍDEOS, ÁUDIOS E MATERIAIS DE APOIO)                       */}
      {/* ========================================================================= */}
      <section id="secao-conteudos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              <Play className="w-3.5 h-3.5" />
              <span>Mídia e Ministrações</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
              CONTEÚDOS EM MULTIMÍDIA
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Vídeos, mensagens em áudio e materiais de apoio para complementar seus momentos de estudo.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/conteudos')}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
          >
            <span>VER MAIS CONTEÚDOS</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CONTEUDOS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item.titulo)}
              className="rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.thumbnail}
                    alt={item.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-white">
                    {item.duracao}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                    {item.plataforma}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                    {item.titulo}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-xs font-semibold text-slate-400 group-hover:text-white flex items-center gap-1">
                <span>Assistir demonstração</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#E5C05B]" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 12. CTA FINAL                                                             */}
      {/* ========================================================================= */}
      <section id="secao-cta-final" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#0C1730] via-[#081022] to-[#040814] border border-[#1E3A8A]/60 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E3A8A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A8A]/30 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <span>COMECE AGORA MESMO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
              Faça Parte do Ecossistema <span className="text-[#E5C05B]">BH DIGITAL</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Tenha as Sagradas Escrituras em suas mãos, acerte o ritmo do seu ministério com ferramentas exclusivas e aprofunde seus estudos bíblicos com seriedade e reverência.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onOpenAppModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>BAIXAR BÍBLIA SAGRADA BH</span>
              </button>

              <button
                onClick={() => onNavigate('/cadastro')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-slate-500 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>CRIAR CONTA GRATUITA</span>
              </button>

              <button
                onClick={() => onNavigate('/premium')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-transparent hover:bg-slate-900/60 text-[#E5C05B] font-semibold text-xs sm:text-sm border border-[#D4AF37]/40 hover:border-[#D4AF37] flex items-center justify-center gap-1.5 transition-all"
              >
                <Crown className="w-4 h-4 text-[#E5C05B]" />
                <span>CONHECER A BIBLIOTECA</span>
              </button>
            </div>

            {/* Selos de Confiança */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Aplicativo Gratuito no Google Play
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Versão ACF — Almeida Corrigida Fiel
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Ecossistema Bíblico Seguro
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Modal de Vídeo Demonstrativo */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A1124] border border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Visualização de Conteúdo</h4>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Fechar
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-slate-800">
              <Play className="w-12 h-12 text-[#E5C05B] mb-2" />
              <div className="text-sm font-bold text-white">{selectedVideo}</div>
              <div className="text-xs text-slate-400 mt-1">Vídeo de demonstração do ecossistema BH DIGITAL</div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 bg-[#1E3A8A] hover:bg-[#1E40AF] text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Continuar Navegando
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
