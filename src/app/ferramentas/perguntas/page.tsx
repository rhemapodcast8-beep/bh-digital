'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowLeft, 
  MessageCircle, 
  Copy, 
  Check, 
  RefreshCw,
  Plus
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function PerguntasPage() {
  const [tema, setTema] = useState('');
  const [texto, setTexto] = useState('');
  const [quantidade, setQuantidade] = useState('5');
  const [nivel, setNivel] = useState('Intermediário');
  const [tipo, setTipo] = useState('Pequeno Grupo');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema && !texto) {
      setError('Preencha o Tema ou o Texto Bíblico para continuar.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/gerador/perguntas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, texto, quantidade, nivel, tipo })
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
        <span className="text-white font-semibold">Gerador de Perguntas</span>
      </nav>

      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />
          <span>Ferramenta IA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Gerador de Perguntas para Grupos
        </h1>
        <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
          Crie perguntas dinâmicas e direcionadas para discussão em pequenos grupos, estudos bíblicos ou Escola Dominical.
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
              <label className="text-sm font-semibold text-white">Tema Principal</label>
              <input 
                type="text" 
                value={tema}
                onChange={e => setTema(e.target.value)}
                placeholder="Ex: Oração em tempos difíceis" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Texto Bíblico Base</label>
              <input 
                type="text" 
                value={texto}
                onChange={e => setTexto(e.target.value)}
                placeholder="Ex: Filipenses 4:6-7" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white">Quantidade</label>
                <input 
                  type="number" 
                  value={quantidade}
                  onChange={e => setQuantidade(e.target.value)}
                  min="3" max="15"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-white">Nível</label>
                <select 
                  value={nivel}
                  onChange={e => setNivel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                  disabled={loading}
                >
                  <option>Básico</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-white">Tipo de Grupo</label>
              <select 
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                disabled={loading}
              >
                <option>Pequeno Grupo</option>
                <option>EBD</option>
                <option>Jovens</option>
                <option>Adultos</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Gerando perguntas...
                </>
              ) : 'GERAR PERGUNTAS'}
            </button>
          </form>
        </div>

        <div className={`lg:col-span-8 ${!result && !loading && 'hidden lg:block'}`}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[500px] flex flex-col shadow-lg">
            
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4">
                <MessageCircle className="w-16 h-16 opacity-20" />
                <p>Preencha um tema ou texto bíblico para gerar as perguntas.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
                <RefreshCw className="w-12 h-12 animate-spin text-orange-500" />
                <p className="animate-pulse">Formulando questões de observação e aplicação...</p>
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
                    <Plus className="w-3.5 h-3.5" /> NOVAS PERGUNTAS
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'COPIADO!' : 'COPIAR RESULTADO'}
                  </button>
                </div>
                
                <div className="prose prose-invert prose-orange max-w-none">
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
