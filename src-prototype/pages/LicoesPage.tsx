import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  Layers, 
  ExternalLink, 
  Video, 
  CheckCircle2, 
  Share2, 
  Calendar, 
  Clock, 
  Bookmark, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Download,
  Info
} from 'lucide-react';
import { PageRoute, LicaoBiblica } from '../types';
import { SERIE_LICOES, MOCK_LICOES } from '../data/mockData';

interface LicoesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const LicoesPage: React.FC<LicoesPageProps> = ({ onNavigate }) => {
  const [selectedLicao, setSelectedLicao] = useState<LicaoBiblica | null>(MOCK_LICOES[0]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyLink = (numero: number) => {
    setCopiedId(numero);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#E5C05B] font-semibold">Lições Bíblicas</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/biblia')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E5C05B]" />
              <span>Bíblia Online</span>
            </button>
            <button
              onClick={() => onNavigate('/materiais')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver Materiais</span>
            </button>
          </div>
        </div>
      </div>

      {/* Series Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-800/60 bg-gradient-to-b from-[#0B1528] via-[#080E1C] to-[#060B16]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-semibold mb-4 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SÉRIE DE ESTUDOS BÍBLICOS SISTEMÁTICOS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {SERIE_LICOES.titulo}
            </h1>
            
            <p className="text-lg sm:text-xl font-medium text-[#E5C05B] mb-4">
              {SERIE_LICOES.subtitulo}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              {SERIE_LICOES.descricao}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="font-semibold text-white">{SERIE_LICOES.totalLicoes} Lições Estruturadas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Livro-base: <strong className="text-white">{SERIE_LICOES.livro}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Roteiros com Referências e Objetivos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Index on Left, Detail Viewer on Right */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Notice of Editorial Integrity */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-[#E5C05B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Nota de Integridade Editorial e Direitos Autorais</strong>
            <span>
              Este índice exibe exclusivamente a estrutura temática, referências bíblicas e objetivos pedagógicos. 
              Textos integrais e comentários exegéticos suplementares são cadastrados exclusivamente sob permissão autoral expressa no Painel Administrativo.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Index Sidebar (13 Lessons) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Índice das 13 Lições
              </h2>
              <span className="text-xs text-[#E5C05B] font-mono">13 tópicos</span>
            </div>

            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1 custom-scrollbar">
              {MOCK_LICOES.map((licao) => {
                const isSelected = selectedLicao?.numero === licao.numero;
                return (
                  <button
                    key={licao.numero}
                    onClick={() => {
                      setSelectedLicao(licao);
                      // On mobile, scroll to viewer
                      if (window.innerWidth < 1024) {
                        document.getElementById('licao-detalhe-viewer')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 group relative ${
                      isSelected
                        ? 'bg-blue-950/40 border-[#D4AF37] shadow-lg shadow-blue-950/30'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#D4AF37] text-slate-950 font-extrabold shadow-sm'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                    }`}>
                      {licao.numero < 10 ? `0${licao.numero}` : licao.numero}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`font-semibold truncate ${isSelected ? 'text-[#E5C05B]' : 'text-slate-200 group-hover:text-white'}`}>
                          {licao.titulo}
                        </span>
                        {isSelected && (
                          <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#E5C05B]">
                            Ativa
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {licao.referenciaBiblica}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Lesson Detail View */}
          <div id="licao-detalhe-viewer" className="lg:col-span-7">
            {selectedLicao ? (
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* Header of Active Lesson */}
                <div className="border-b border-slate-800/80 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B]">
                      LIÇÃO {selectedLicao.numero} DE 13
                    </span>

                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {selectedLicao.status}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-2">
                    {selectedLicao.titulo}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 font-medium">
                    {selectedLicao.subtitulo}
                  </p>
                </div>

                {/* Reference Box */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-400 block mb-0.5">
                      Texto Bíblico Base
                    </span>
                    <span className="text-base font-bold text-white font-mono">
                      {selectedLicao.referenciaBiblica}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('/biblia')}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition-all self-start sm:self-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ler na Bíblia Online</span>
                  </button>
                </div>

                {/* Theme & Summary */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tema Central da Lição
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 leading-relaxed font-medium">
                    {selectedLicao.temaCentral}
                  </div>
                </div>

                {/* Resumo */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Resumo Exegético e Contexto
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedLicao.resumo}
                  </p>
                </div>

                {/* Pedagogical Objectives */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Objetivos Didáticos da Lição
                  </h4>
                  <ul className="space-y-2">
                    {selectedLicao.objetivos.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estudo Complementar & Material Próprio */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Estudo Complementar & Teologia Bíblica
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                    {selectedLicao.estudoComplementar}
                  </p>
                </div>

                {/* Vídeo e Fonte Externa (Placeholder preparado) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-800/40 flex items-center justify-center text-red-400">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Vídeo Aula</span>
                        <span className="text-[10px] text-slate-400">Em preparação editorial</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                      Demonstração
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/50 border border-blue-800/40 flex items-center justify-center text-blue-400">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Fonte da Lição</span>
                        <span className="text-[10px] text-slate-400">Link configurável</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                      Admin
                    </span>
                  </div>
                </div>

                {/* Footer Navigation within Lessons */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    disabled={selectedLicao.numero === 1}
                    onClick={() => {
                      const prev = MOCK_LICOES.find(l => l.numero === selectedLicao.numero - 1);
                      if (prev) setSelectedLicao(prev);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-all"
                  >
                    ← Lição Anterior
                  </button>

                  <button
                    onClick={() => handleCopyLink(selectedLicao.numero)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#E5C05B] hover:text-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedId === selectedLicao.numero ? 'Link Copiado!' : 'Compartilhar'}</span>
                  </button>

                  <button
                    disabled={selectedLicao.numero === MOCK_LICOES.length}
                    onClick={() => {
                      const next = MOCK_LICOES.find(l => l.numero === selectedLicao.numero + 1);
                      if (next) setSelectedLicao(next);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 border border-blue-700/50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-white transition-all"
                  >
                    Próxima Lição →
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
                Selecione uma lição no índice ao lado para visualizar os detalhes.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};
