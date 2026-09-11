'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Copy, 
  Check, 
  RefreshCw,
  Plus
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ExegesePage() {
  const [referencia, setReferencia] = useState('');
  const [duvida, setDuvida] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referencia) {
      setError('Preencha a Referência Bíblica para continuar.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/gerador/exegese', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referencia, duvida })
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
    setReferencia('');
    setDuvida('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/ferramentas" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Ferramentas
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-semibold">Explicador Exegético</span>
      </nav>

      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
          <Search className="w-4 h-4" />
          <span>Ferramenta IA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explicador Exegético
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Faça uma exegese profunda e clara de qualquer texto bíblico considerando o contexto histórico, literário e teológico.
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
              <label className="text-sm font-semibold text-white">Referência Bíblica <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={referencia}
                onChange={e => setReferencia(e.target.value)}
                placeholder="Ex: João 3:16" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Dúvida Específica (Opcional)</label>
              <textarea 
                value={duvida}
                onChange={e => setDuvida(e.target.value)}
                placeholder="Ex: Qual o significado original da palavra 'Mundo' nesta passagem?" 
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Analisando passagem...
                </>
              ) : 'EXPLICAR PASSAGEM'}
            </button>
          </form>
        </div>

        <div className={`lg:col-span-8 ${!result && !loading && 'hidden lg:block'}`}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[500px] flex flex-col shadow-lg">
            
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                <Search className="w-16 h-16 opacity-20" />
                <p>Preencha a referência e clique em explicar para ver a exegese.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                <RefreshCw className="w-12 h-12 animate-spin text-purple-500" />
                <p className="animate-pulse">Buscando originais e contexto histórico...</p>
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
                    <Plus className="w-3.5 h-3.5" /> NOVA EXEGESE
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'COPIADO!' : 'COPIAR RESULTADO'}
                  </button>
                </div>
                
                <div className="prose prose-invert prose-purple max-w-none">
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
