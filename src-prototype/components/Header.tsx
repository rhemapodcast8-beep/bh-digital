import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  BookOpen, 
  Sparkles, 
  BookMarked, 
  Tv, 
  Wrench, 
  User, 
  ShieldCheck, 
  Crown,
  ChevronRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { PageRoute } from '../types';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentRoute, 
  onNavigate,
  isLoggedIn = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Bíblia Online', route: '/biblia', icon: BookOpen },
    { label: 'Estudos', route: '/estudos', icon: BookMarked },
    { label: 'Devocionais', route: '/devocionais', icon: Sparkles },
    { label: 'Lições', route: '/licoes', icon: Layers },
    { label: 'Materiais', route: '/materiais', icon: Layers },
    { label: 'Livros', route: '/livros', icon: BookOpen },
    { label: 'Ferramentas', route: '/ferramentas', icon: Wrench },
    { label: 'Conteúdos', route: '/conteudos', icon: Tv },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrent = (route: PageRoute) => {
    if (route === '/') return currentRoute === '/';
    return currentRoute.startsWith(route);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070D18]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/40 flex items-center justify-center shadow-lg shadow-blue-950/50 group-hover:border-[#E5C05B] transition-all">
              <span className="text-[#E5C05B] font-bold text-base tracking-wider font-mono">BH</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  BH DIGITAL
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E5C05B] border border-[#D4AF37]/30">
                  Ecosistema
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 tracking-wide hidden sm:block">
                Palavra • Estudos • Livros • Ferramentas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isCurrent(item.route);
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    active
                      ? 'text-white bg-slate-800/70 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Premium Shortcut */}
            <button
              onClick={() => handleNavClick('/premium')}
              className={`ml-1 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                currentRoute === '/premium'
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#E5C05B]'
                  : 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E5C05B] hover:bg-[#D4AF37]/20'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Premium</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('/perfil')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-all"
                >
                  <User className="w-4 h-4 text-[#E5C05B]" />
                  <span>Minha Conta</span>
                </button>
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800"
                  title="Painel Administrativo"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/login')}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={() => handleNavClick('/cadastro')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white shadow-md shadow-blue-950/40 border border-blue-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Criar conta
                </button>
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="ml-1 p-2 text-slate-500 hover:text-slate-300 rounded-lg text-xs"
                  title="Acesso de demonstração ao Painel Admin"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('/premium')}
              className="px-2.5 py-1 text-[11px] font-semibold text-[#E5C05B] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg flex items-center gap-1"
            >
              <Crown className="w-3 h-3" />
              <span>Premium</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#070D18]/98 backdrop-blur-2xl border-b border-slate-800 px-5 pt-4 pb-8 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl">
          
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-2">
            Navegação Principal
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.route);
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#1E3A8A]/40 to-slate-800 text-[#E5C05B] border border-blue-900/60 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-[#E5C05B]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          {/* Sub-categories for Estudos */}
          <div className="pt-2 border-t border-slate-800/70">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
              Categorias de Estudos
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => handleNavClick('/estudos/esbocos')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Esboços
              </button>
              <button onClick={() => handleNavClick('/estudos/estudos-biblicos')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Estudos Bíblicos
              </button>
              <button onClick={() => handleNavClick('/estudos/personagens')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Personagens
              </button>
              <button onClick={() => handleNavClick('/estudos/parabolas')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Parábolas
              </button>
              <button onClick={() => handleNavClick('/estudos/fe')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Fé
              </button>
              <button onClick={() => handleNavClick('/estudos/oracao')} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white">
                Oração
              </button>
            </div>
          </div>

          {/* Mobile Auth & Fast Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('/login')}
                className="w-full py-3 text-center rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700"
              >
                Entrar
              </button>
              <button
                onClick={() => handleNavClick('/cadastro')}
                className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-sm font-bold shadow-md"
              >
                Criar conta
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <button onClick={() => handleNavClick('/perfil')} className="flex items-center gap-1.5 hover:text-slate-200">
                <User className="w-4 h-4 text-[#E5C05B]" />
                <span>Área do Usuário</span>
              </button>
              <button onClick={() => handleNavClick('/admin')} className="flex items-center gap-1.5 hover:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Painel Admin</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
