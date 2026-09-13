'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus, BookOpen, Check } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          nome: nome,
        }
      }
    });

    if (error) {
      setError(error.message || 'Erro ao criar conta. Verifique os dados fornecidos.');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Criar Conta Gratuita</h1>
          <p className="text-sm text-slate-400">Junte-se à comunidade BH DIGITAL e acesse todos os conteúdos.</p>
        </div>

        {/* Card */}
        <div className="bg-[#080E1B] border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          {success ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cadastro Realizado com Sucesso!</h3>
              <p className="text-xs text-slate-300">
                Sua conta foi criada. Você já pode fazer login para acessar seus favoritos e preferências.
              </p>
              <Link
                href="/auth/login"
                className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-slate-950 font-bold text-xs uppercase shadow-md"
              >
                Ir para o Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="nome-cadastro" className="text-xs font-semibold text-slate-300 block">
                  Nome Completo
                </label>
                <input
                  id="nome-cadastro"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo..."
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email-cadastro" className="text-xs font-semibold text-slate-300 block">
                  E-mail
                </label>
                <input
                  id="email-cadastro"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="senha-cadastro" className="text-xs font-semibold text-slate-300 block">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="senha-cadastro"
                    type={showSenha ? 'text' : 'password'}
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Mínimo 6 caracteres..."
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
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmar-senha" className="text-xs font-semibold text-slate-300 block">
                  Confirmar Senha
                </label>
                <input
                  id="confirmar-senha"
                  type={showSenha ? 'text' : 'password'}
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha..."
                  className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="animate-pulse">Criando conta...</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>CRIAR MINHA CONTA</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-[#E5C05B] font-semibold hover:text-white transition-colors">
                Fazer login
              </Link>
            </p>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Voltar para a plataforma</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
