import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute } from '../types';

interface AuthPageProps {
  initialMode: 'login' | 'cadastro';
  onNavigate: (route: PageRoute) => void;
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode,
  onNavigate,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'cadastro'>(initialMode);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulated Authentication Delay
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        setMessage('Login demonstrativo realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          onLoginSuccess();
          onNavigate('/perfil');
        }, 1200);
      } else {
        setMessage('Cadastro demonstrativo realizado com sucesso! Bem-vindo ao BH DIGITAL.');
        setTimeout(() => {
          onLoginSuccess();
          onNavigate('/perfil');
        }, 1200);
      }
    }, 900);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Instruções de redefinição de senha demonstrativas enviadas para: ${forgotEmail || 'seu e-mail'}`);
    setForgotPasswordOpen(false);
    setForgotEmail('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 animate-fadeIn">
      
      {/* Brand Icon Header */}
      <div className="text-center space-y-2">
        <div 
          onClick={() => onNavigate('/')} 
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C05B] font-bold text-lg mx-auto shadow-xl cursor-pointer"
        >
          BH
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {mode === 'login' ? 'Acessar BH DIGITAL' : 'Criar sua Conta'}
        </h1>
        <p className="text-xs text-slate-400">
          Palavra • Estudos • Livros • Ferramentas
        </p>
      </div>

      {/* Auth Card */}
      <div className="p-8 rounded-3xl bg-[#080E1B] border border-slate-800 shadow-2xl space-y-6">
        
        {/* Toggle Mode Tabs */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-[#1E3A8A] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('cadastro');
              setMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'cadastro'
                ? 'bg-[#1E3A8A] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Criar conta
          </button>
        </div>

        {/* Prototype Notice */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 text-center">
          <span className="text-[#E5C05B] font-semibold">Protótipo navegável:</span> Insira qualquer dado demonstrativo para testar o fluxo de acesso.
        </div>

        {/* Success / Feedback message */}
        {message && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nome (Only in Cadastro) */}
          {mode === 'cadastro' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Nome Completo</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* E-mail */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">E-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Senha</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] text-[#E5C05B] hover:underline"
                >
                  Esqueci minha senha
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Confirmar Senha (Only in Cadastro) */}
          {mode === 'cadastro' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirmar Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white font-bold text-xs tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="animate-pulse">Validando acesso...</span>
            ) : mode === 'login' ? (
              <>
                <span>Entrar no Sistema</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Criar Conta Gratuita</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Preset Button */}
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              setEmail('demo@bhdigital.com.br');
              setSenha('bhdigital123');
              if (mode === 'cadastro') {
                setNome('Visitante Demonstrativo');
                setConfirmarSenha('bhdigital123');
              }
            }}
            className="w-full py-2 text-center text-[11px] font-semibold text-slate-400 hover:text-slate-200 bg-slate-900/60 rounded-lg border border-slate-800 hover:border-slate-700"
          >
            Preencher com Dados de Teste
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#080E1B] border border-slate-700 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-white">Recuperar Senha</h3>
            <p className="text-xs text-slate-400">
              Digite seu e-mail cadastrado para receber o link de redefinição demonstrativo.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4AF37] text-slate-950 font-bold rounded-lg text-xs"
                >
                  Enviar Instruções
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
