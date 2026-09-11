'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ChevronRight,
  Sparkles,
  Loader2,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function GeradorSermaoPage() {
  const [tema, setTema] = useState('');
  const [publico, setPublico] = useState('Geral');
  const [estilo, setEstilo] = useState('Expositivo');
  const [isLoading, setIsLoading] = useState(false);
  const [sermao, setSermao] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema.trim()) return;

    setIsLoading(true);
    setError(null);
    setSermao(null);

    try {
      const res = await fetch('/api/gerador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tema, publico, estilo }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao gerar sermão');
      }

      setSermao(data.sermao);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">Gerador de Sermão IA</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inteligência Artificial (Gemini)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Gerador de Sermão Assistido
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          Informe o tema e o contexto, e nossa inteligência artificial estruturará um esboço bíblico completo para ajudar na sua preparação.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#080E1B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#E5C05B]" />
              Configurar Esboço
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tema ou Versículo Principal</label>
                <input
                  type="text"
                  required
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ex: A graça de Deus (Efésios 2)"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Público-Alvo</label>
                <select
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="Geral (Culto Público)">Geral (Culto Público)</option>
                  <option value="Jovens">Jovens</option>
                  <option value="Casais">Casais</option>
                  <option value="Líderes / Obreiros">Líderes / Obreiros</option>
                  <option value="Crianças (Escola Bíblica)">Crianças</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Estilo de Pregação</label>
                <select
                  value={estilo}
                  onChange={(e) => setEstilo(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="Expositivo">Expositiva (Versículo por Versículo)</option>
                  <option value="Temático">Temática (Assunto específico)</option>
                  <option value="Devocional">Devocional / Inspiracional</option>
                  <option value="Apologético">Apologética (Defesa da Fé)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !tema.trim()}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gerando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar Esboço</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-2">
          {error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-sm mb-6">
              {error}
            </div>
          )}

          {sermao ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-lg font-bold text-[#E5C05B] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Seu Esboço Gerado
                </h3>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Assistente Gemini AI
                </span>
              </div>
              <div className="prose prose-invert prose-slate prose-headings:text-[#D4AF37] prose-a:text-[#E5C05B] max-w-none text-sm sm:text-base">
                <ReactMarkdown>{sermao}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center bg-slate-900/30 border border-slate-800/50 border-dashed rounded-2xl p-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-500">
                  O esboço gerado aparecerá aqui.<br/>
                  Preencha as configurações ao lado para iniciar.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
