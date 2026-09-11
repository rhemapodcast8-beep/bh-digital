'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  Copy, 
  Check, 
  RefreshCw,
  Plus
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SermaoPage() {
  const [tema, setTema] = useState('');
  const [texto, setTexto] = useState('');
  const [tipo, setTipo] = useState('Expositivo');
  const [publico, setPublico] = useState('Igreja Geral');
  const [duracao, setDuracao] = useState('30 minutos');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema || !texto) {
      setError('Tema e Texto Bíblico são obrigatórios.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/gerador/sermao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, texto, tipo, publico, duracao })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro desconhecido');
      }
      setResult(data.resultado);
    } catch (err: any) {
      setError(err.message || 'Não foi possível gerar agora. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTema('');
    setTexto('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/ferramentas" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Ferramentas
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-semibold">Preparador de Sermão</span>
      </nav>

      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>Ferramenta Avançada IA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Preparador Completo de Sermões
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Desenvolva um sermão completo e detalhado, com transições, ilustrações sugeridas, aplicações contextuais e estrutura rigorosa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className={`lg:col-span-4 space-y-6 ${result && 'hidden lg:block'}`}>
          <form onSubmit={handleGenerate} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-5 shadow-lg">
            
            {error && (
              <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Tema do Sermão <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={tema}
                onChange={e => setTema(e.target.value)}
                placeholder="Ex: A Fidelidade de Deus" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Texto Bíblico <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder="Ex: Lamentações 3:21-23" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Tipo de Sermão</label>
              <select 
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                disabled={loading}
              >
                <option>Expositivo</option>
                <option>Temático</option>
                <option>Textual</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white">Público</label>
                <select 
                  value={publico}
                  onChange={e => setPublico(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                  disabled={loading}
                >
                  <option>Igreja Geral</option>
                  <option>Adultos</option>
                  <option>Jovens</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white">Duração</label>
                <select 
                  value={duracao}
                  onChange={e => setDuracao(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none"
                  disabled={loading}
                >
                  <option>15 minutos</option>
                  <option>30 minutos</option>
                  <option>45 minutos</option>
                  <option>60 minutos</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Preparando sermão...
                </>
              ) : 'PREPARAR SERMÃO'}
            </button>
          </form>
        </div>

        <div className={`lg:col-span-8 ${!result && !loading && 'hidden lg:block'}`}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[500px] flex flex-col shadow-lg">
            
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                <FileText className="w-16 h-16 opacity-20" />
                <p>Preencha os campos e clique em preparar para gerar o sermão.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                <RefreshCw className="w-12 h-12 animate-spin text-[#D4AF37]" />
                <p className="animate-pulse">Homilética, ilustrações e desenvolvimento em andamento...</p>
              </div>
            )}

            {result && !loading && (
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap items-center justify-end gap-3 mb-6 pb-4 border-b border-slate-800">
                  <button 
                    onClick={() => setResult(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> GERAR NOVAMENTE
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> NOVO SERMÃO
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] text-slate-950 text-xs font-semibold hover:bg-[#E5C05B] transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'COPIADO!' : 'COPIAR RESULTADO'}
                  </button>
                </div>
                
                <div className="prose prose-invert prose-yellow max-w-none">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
