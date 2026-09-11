'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Check, 
  ChevronRight,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react';
import { EstudoItem } from '@/types';

interface EstudoDetailClientProps {
  estudo: EstudoItem;
  categoriaSlug?: string;
  anterior?: { slug: string; titulo: string } | null;
  proximo?: { slug: string; titulo: string } | null;
  relacionados?: EstudoItem[];
}

export function EstudoDetailClient({ estudo, categoriaSlug, anterior, proximo, relacionados }: EstudoDetailClientProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/estudos" className="hover:text-white transition-colors">Estudos Bíblicos</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold truncate max-w-[200px]">{estudo.titulo}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/estudos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para todos os estudos</span>
      </Link>

      {/* Study Header Container */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
            {estudo.categoria}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            {estudo.nivel}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            {estudo.referencia}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {estudo.titulo}
        </h1>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{estudo.autor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{estudo.data}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{estudo.tempoLeitura} de leitura</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isFavorited
                  ? 'bg-[#E5C05B] text-slate-950 border-[#E5C05B]'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isFavorited ? 'Favoritado' : 'Favoritar'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Header Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 h-72 sm:h-96 w-full shadow-2xl relative">
        <img
          src={estudo.imagem}
          alt={estudo.titulo}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B16] via-transparent to-transparent opacity-60" />
      </div>

      {/* Font adjustment & Resumo */}
      <div className="flex justify-between items-start gap-4">
        <p className="text-xl text-slate-300 italic flex-1">
          "{estudo.resumo}"
        </p>
        <button
          onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
          className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          title="Ajustar Tamanho da Fonte"
        >
          <span className="font-serif font-bold">Aa</span>
        </button>
      </div>

      {/* Main Rich Content */}
      <div className={`space-y-12 text-slate-200 font-normal ${
        fontSize === 'large' ? 'text-lg sm:text-xl leading-loose' : 'text-base sm:text-lg leading-relaxed'
      }`}>
        
        {/* Introdução & Contexto */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#E5C05B]">Introdução</h2>
          <p>{estudo.introducao}</p>
        </section>

        <section className="space-y-4 p-6 rounded-2xl bg-blue-950/20 border border-blue-900/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Contexto Bíblico
          </h2>
          <p className="text-slate-300">{estudo.contextoBiblico}</p>
        </section>

        {/* Desenvolvimento */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[#E5C05B]">Desenvolvimento</h2>
          
          <div className="space-y-8">
            {estudo.desenvolvimento.map((ponto, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#D4AF37] text-slate-950 text-sm font-bold">
                    {index + 1}
                  </span>
                  {ponto.titulo}
                </h3>
                <p>{ponto.explicacao}</p>
                
                <div className="pl-4 border-l-2 border-slate-700 my-4 py-2">
                  <div className="text-sm font-bold text-[#D4AF37] mb-1">{ponto.referenciaBiblica}</div>
                  <p className="italic text-slate-400">{ponto.comentario}</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Aplicação Prática:</strong>
                  {ponto.aplicacaoPratica}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lições Principais & Aplicação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#E5C05B]" />
              Lições Principais
            </h3>
            <ul className="space-y-3">
              {estudo.licoesPrincipais.map((licao, i) => (
                <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{licao}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#E5C05B]" />
              Aplicação para a Vida
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              {estudo.aplicacaoParaVida}
            </p>
          </section>
        </div>

        {/* Perguntas e Meditação */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 space-y-4">
          <h3 className="text-xl font-bold text-white">Perguntas para Reflexão</h3>
          <ul className="list-decimal list-inside space-y-2 text-slate-300">
            {estudo.perguntasReflexao.map((pergunta, i) => (
              <li key={i}>{pergunta}</li>
            ))}
          </ul>
        </section>

        <section className="text-center space-y-4 py-6">
          <Heart className="w-8 h-8 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Para Meditar</h3>
          <p className="text-xl italic text-slate-400 max-w-2xl mx-auto">
            "{estudo.paraMeditar}"
          </p>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-8">
          <h2 className="text-2xl font-bold text-[#E5C05B]">Conclusão</h2>
          <p>{estudo.conclusao}</p>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-2">Oração Final</h3>
          <p className="italic text-slate-400">{estudo.oracaoFinal}</p>
        </section>
        
        {/* Navegação Anterior / Próximo */}
        {(anterior || proximo) && (
          <div className="flex items-center justify-between border-t border-slate-800 pt-8 mt-8">
            {anterior ? (
              <Link
                href={`/estudos/${categoriaSlug}/${anterior.slug}`}
                className="group flex flex-col space-y-1 text-left max-w-[45%]"
              >
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 group-hover:text-white transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Anterior
                </span>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-[#E5C05B] truncate transition-colors">
                  {anterior.titulo}
                </span>
              </Link>
            ) : (
              <div className="w-1/2"></div>
            )}

            {proximo ? (
              <Link
                href={`/estudos/${categoriaSlug}/${proximo.slug}`}
                className="group flex flex-col space-y-1 text-right max-w-[45%] items-end"
              >
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 group-hover:text-white transition-colors">
                  Próximo <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold text-slate-300 group-hover:text-[#E5C05B] truncate transition-colors">
                  {proximo.titulo}
                </span>
              </Link>
            ) : (
              <div className="w-1/2"></div>
            )}
          </div>
        )}

        {/* Você também pode estudar (Relacionados) */}
        {relacionados && relacionados.length > 0 && (
          <div className="border-t border-slate-800 pt-10 mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Você também pode estudar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relacionados.map((relacionado) => (
                <Link
                  key={relacionado.id}
                  href={`/estudos/${categoriaSlug}/${relacionado.slug}`}
                  className="group block rounded-xl overflow-hidden bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={relacionado.imagem}
                      alt={relacionado.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                      {relacionado.titulo}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
