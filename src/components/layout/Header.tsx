'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useI18n } from '@/lib/i18n/I18nContext';
import { LanguageSelector } from '@/components/layout/LanguageSelector';
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
  Layers,
  LogOut,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, localizePath } = useI18n();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const navItems = [
    { label: t.nav.biblia, href: '/biblia', icon: BookOpen },
    { label: t.nav.estudos, href: '/estudos', icon: BookMarked },
    { label: t.nav.devocionais, href: '/devocionais', icon: Sparkles },
    { label: t.nav.licoesAdultos, href: '/licoes', icon: Layers },
    { label: t.nav.licoesJovens, href: '/licoes-jovens', icon: Layers },
    { label: t.nav.materiais, href: '/materiais', icon: Layers },
    { label: t.nav.livros, href: '/livros', icon: BookOpen },
    { label: t.nav.ferramentas, href: '/ferramentas', icon: Wrench },
    { label: t.nav.conteudos, href: '/conteudos', icon: Tv },
  ];

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    
    // Check initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthChecked(true);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = localizePath('/');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isCurrent = (href: string) => {
    // Normalise path by removing locale prefix if present
    const normalized = pathname.replace(/^\/(?:en|es)(?=\/|$)/, '') || '/';
    if (href === '/') return normalized === '/';
    return normalized.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#070D18]/96 backdrop-blur-2xl shadow-xl shadow-black/30'
          : 'bg-[#070D18]/82 backdrop-blur-xl'
      }`}
      style={{
        borderBottom: scrolled
          ? '1px solid rgba(212,175,55,0.12)'
          : '1px solid rgba(30,58,138,0.25)',
        boxShadow: scrolled
          ? '0 1px 0 rgba(212,175,55,0.06), 0 4px 24px rgba(0,0,0,0.35)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
          <Link href={localizePath('/')} className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div
              className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #1E3A8A, #0A1124)',
                border: '1px solid rgba(212,175,55,0.35)',
                boxShadow: '0 0 0 0 rgba(212,175,55,0)',
              }}
            >
              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: '0 0 12px rgba(212,175,55,0.25), 0 0 0 1px rgba(212,175,55,0.5)' }}
              />
              <span className="text-[#E5C05B] font-bold text-base tracking-wider font-mono relative z-10">BH</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  BH DIGITAL
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#E5C05B] border border-[#D4AF37]/30">
                  {t.nav.ecosystem}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 tracking-wide hidden sm:block">
                {t.nav.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => {
              const active = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={localizePath(item.href)}
                  className={`px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 relative group/nav ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={active ? {
                    background: 'rgba(30,58,138,0.25)',
                    boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.08)',
                  } : {}}
                >
                  <span>{item.label}</span>
                  {active ? (
                    <span className="nav-link-active-bar" />
                  ) : (
                    <span className="absolute bottom-1 left-2.5 right-2.5 h-0.5 rounded-full bg-slate-600/0 group-hover/nav:bg-slate-600/60 transition-all duration-200" />
                  )}
                </Link>
              );
            })}

            {/* Premium Shortcut */}
            <Link
              href={localizePath('/premium')}
              className={`ml-1 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isCurrent('/premium')
                  ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#E5C05B]'
                  : 'border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E5C05B] hover:bg-[#D4AF37]/20'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{t.nav.premium}</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2 xl:gap-2.5">
            {/* Language Selector beside sign in */}
            <LanguageSelector variant="desktop" />

            {!authChecked ? (
              <div className="w-24 h-8 bg-slate-800/50 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={localizePath('/perfil')}
                  className="px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>{t.nav.minhaConta}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-2 text-xs xl:text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                  aria-label={t.nav.sair}
                  title={t.nav.sair}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href={localizePath('/auth/login')}
                  className="px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.entrar}
                </Link>
                <Link
                  href={localizePath('/auth/cadastro')}
                  className="px-3 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white shadow-md shadow-blue-950/40 border border-blue-400/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.nav.criarConta}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions: Premium & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={localizePath('/premium')}
              className="px-2.5 py-1 text-[11px] font-semibold text-[#E5C05B] bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg flex items-center gap-1"
            >
              <Crown className="w-3 h-3" />
              <span>{t.nav.premium}</span>
            </Link>
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-[#070D18]/98 backdrop-blur-2xl border-b border-slate-800 px-5 pt-4 pb-8 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl animate-fadeIn">
          {/* Mobile Language Selector */}
          <LanguageSelector variant="mobile" />

          <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-2 pt-2">
            {t.nav.mainNav}
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={localizePath(item.href)}
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
                </Link>
              );
            })}
          </div>

          {/* Sub-categorias */}
          <div className="pt-2 border-t border-slate-800/70">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
              {t.nav.estudos}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: t.estudos.filterEsbocos, slug: 'esbocos' },
                { label: t.estudos.filterBiblicos, slug: 'estudos-biblicos' },
                { label: t.estudos.filterPersonagens, slug: 'personagens' },
                { label: t.estudos.filterParabolas, slug: 'parabolas' },
                { label: t.estudos.filterFe, slug: 'fe' },
                { label: t.estudos.filterOracao, slug: 'oracao' },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  href={localizePath(`/estudos/${cat.slug}`)}
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-slate-300 text-left hover:text-white hover:border-slate-700 transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Auth */}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            {user ? (
              <>
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href={localizePath('/perfil')}
                    className="w-full py-3 text-center flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{t.nav.minhaConta}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-center flex items-center justify-center gap-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 text-sm font-semibold border border-red-900/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav.sair}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={localizePath('/auth/login')}
                    className="w-full py-3 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
                  >
                    {t.nav.entrar}
                  </Link>
                  <Link
                    href={localizePath('/auth/cadastro')}
                    className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-sm font-bold shadow-md"
                  >
                    {t.nav.criarConta}
                  </Link>
                </div>
              </>
            )}
            <div className="flex items-center justify-center pt-2 text-xs text-slate-400">
              <Link href={localizePath('/admin')} className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Painel Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
