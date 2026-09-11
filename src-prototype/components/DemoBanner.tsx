import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Shield, Navigation } from 'lucide-react';
import { PageRoute } from '../types';

interface DemoBannerProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  currentRoute,
  onNavigate,
  isLoggedIn,
  onToggleLogin,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickRoutes: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'Bíblia Online', route: '/biblia' },
    { label: 'Estudos', route: '/estudos' },
    { label: 'Esboços', route: '/estudos/esbocos' },
    { label: 'Fé', route: '/estudos/fe' },
    { label: 'Oração', route: '/estudos/oracao' },
    { label: 'Devocionais', route: '/devocionais' },
    { label: 'Livros', route: '/livros' },
    { label: 'Conteúdos', route: '/conteudos' },
    { label: 'Ferramentas', route: '/ferramentas' },
    { label: 'Biblioteca Premium', route: '/premium' },
    { label: 'Login', route: '/login' },
    { label: 'Cadastro', route: '/cadastro' },
    { label: 'Área do Usuário', route: '/perfil' },
    { label: 'Painel Admin', route: '/admin' },
  ];

  return (
    <div className="bg-[#0A1124] border-b border-[#D4AF37]/30 text-xs text-slate-300 py-1.5 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Notice */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C05B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <span className="font-semibold text-[#E5C05B]">PROTÓTIPO VISUAL BH DIGITAL</span>
          <span className="text-slate-400 hidden sm:inline">• Dados demonstrativos para referência Next.js + Supabase</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          
          {/* Quick Login State Simulator */}
          <button
            onClick={onToggleLogin}
            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
              isLoggedIn 
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isLoggedIn ? '● Logado (Demo)' : '○ Deslogado (Demo)'}
          </button>

          {/* Quick Route Switcher dropdown toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700"
          >
            <Navigation className="w-3 h-3 text-[#E5C05B]" />
            <span>Rotas do Protótipo ({quickRoutes.length})</span>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Switcher Bar */}
      {isOpen && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-1.5 pb-1 animate-fadeIn">
          {quickRoutes.map((r) => (
            <button
              key={r.route}
              onClick={() => {
                onNavigate(r.route);
                setIsOpen(false);
              }}
              className={`p-1 text-center rounded text-[11px] font-medium transition-all truncate ${
                currentRoute === r.route
                  ? 'bg-[#1E3A8A] text-white font-bold border border-blue-400/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
