import React from 'react';
import { 
  Smartphone, 
  BookMarked, 
  Layers, 
  ExternalLink, 
  Check, 
  Wrench, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Download
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute } from '../types';
import { MOCK_FERRAMENTAS } from '../data/mockData';

interface FerramentasPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const FerramentasPage: React.FC<FerramentasPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <Breadcrumb
        items={[{ label: 'Ferramentas' }]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <Wrench className="w-4 h-4" />
          <span>Ecossistema de Soluções</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ferramentas Digitais
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Aplicativos, plataformas de estudo e sistemas de gestão integrados em um ecossistema cristão profissional.
        </p>
      </div>

      {/* Detailed Showcase for Each of the 3 Tools */}
      <div className="space-y-8">
        
        {/* 1. BÍBLIA SAGRADA BH */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B1528] via-[#091122] to-[#080E1B] border border-blue-900/50 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Aplicativo Oficial Android</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  BÍBLIA SAGRADA BH
                </h2>
                <p className="text-sm font-semibold text-slate-400 mt-1">
                  Palavra de Deus, estudos, devocionais, áudio e favoritos na palma da sua mão.
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Leia a Bíblia completa, acompanhe devocionais diários, ouça capítulos narrados com clareza, crie favoritos, configure lembretes diários e utilize o modo escuro sem distrações em uma experiência ágil e intuitiva.
              </p>

              {/* Bullet features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {MOCK_FERRAMENTAS[0].recursos.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar no Google Play</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onNavigate('/biblia')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-all"
                >
                  Acessar Versão Web Online
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-4 max-w-xs w-full shadow-inner">
                <div className="w-16 h-16 rounded-2xl bg-blue-950 border border-blue-700/50 mx-auto flex items-center justify-center text-[#E5C05B] shadow-lg">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">BÍBLIA SAGRADA BH</div>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">br.com.bibliasagradabh.app</div>
                </div>
                <div className="text-xs text-slate-400">
                  Compatível com dispositivos Android 8.0 ou superior. 100% gratuito.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. ESTUDA-FÁCIL */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080E1B] border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800/60 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <BookMarked className="w-3.5 h-3.5" />
                <span>Plataforma Web de Estudos</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ESTUDA-FÁCIL
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ambiente digital focado em simplificar a criação de esboços, catalogar tópicos bíblicos, fazer referências cruzadas e organizar anotações de aulas e sermões com máxima clareza metodológica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {MOCK_FERRAMENTAS[1].recursos.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/estudos')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#E5C05B] font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all hover:border-[#D4AF37]/50"
                >
                  <span>Explorar Biblioteca de Esboços</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3 max-w-xs w-full">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-[#E5C05B]">
                  <BookMarked className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white">ESTUDA-FÁCIL</div>
                <p className="text-xs text-slate-400">
                  Ideal para pregadores, professores de Escola Bíblica e estudantes das Escrituras.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. WIPE CRM */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080E1B] border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800/60 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Gestão & Relacionamento</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                WIPE CRM
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Plataforma moderna de CRM para gestão de contatos, membros, acompanhamento de etapas, comunicação integrada e organização de fluxos ministeriais e corporativos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {MOCK_FERRAMENTAS[2].recursos.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => alert('Wipe CRM: Demonstração de integração corporativa no protótipo BH DIGITAL.')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all hover:border-slate-500"
                >
                  <span>Conhecer Wipe CRM</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3 max-w-xs w-full">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-indigo-400">
                  <Layers className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white">WIPE CRM</div>
                <p className="text-xs text-slate-400">
                  Organização profissional de membros, lideranças, projetos e atendimento.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
