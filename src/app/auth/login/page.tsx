'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, BookOpen } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function LoginPage() {
  const router = useRouter();
  const { t, localizePath } = useI18n();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setError(error.message || t.auth.loginError);
      setLoading(false);
    } else {
      window.location.href = localizePath('/perfil');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">

        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/50 flex items-center justify-center shadow-xl">
            <span className="text-[#E5C05B] font-extrabold text-2xl">BH</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{t.auth.loginTitle}</h1>
          <p className="text-sm text-slate-400">{t.auth.loginSubtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-[#080E1B] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email-login" className="text-xs font-semibold text-slate-300 block">
                {t.auth.email}
              </label>
              <input
                id="email-login"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="senha-login" className="text-xs font-semibold text-slate-300 block">
                {t.auth.password}
              </label>
              <div className="relative">
                <input
                  id="senha-login"
                  type={showSenha ? 'text' : 'password'}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full px-4 py-3 pr-11 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Mostrar/ocultar senha"
                >
                  {showSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" className="text-xs text-[#E5C05B] hover:text-white transition-colors">
                  {t.auth.forgotPassword}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">{t.nav.loading}</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{t.auth.btnLogin}</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400">
              {t.auth.dontHaveAccount}{' '}
              <Link href={localizePath('/auth/cadastro')} className="text-[#E5C05B] font-semibold hover:text-white transition-colors">
                {t.auth.linkRegister}
              </Link>
            </p>
            <Link
              href={localizePath('/')}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.nav.backToHome}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
