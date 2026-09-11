'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { ConteudoItem } from '@/types';

interface Props {
  conteudo: ConteudoItem;
  relacionados: ConteudoItem[];
  anterior: ConteudoItem | null;
  proximo: ConteudoItem | null;
}

export function ConteudoDetailClient({ conteudo, relacionados, anterior, proximo }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Navigation Top */}
      <nav className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link 
          href="/conteudos" 
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para Biblioteca
        </Link>
        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#D4AF37]/10 text-[#E5C05B] uppercase tracking-wider">
          {conteudo.categoria}
        </span>
      </nav>

      {/* Header */}
      <header className="space-y-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {conteudo.titulo}
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {conteudo.resumo}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {conteudo.data}
          </span>
        </div>
      </header>

      {/* Main Image */}
      <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
        <img
          src={conteudo.imagem}
          alt={conteudo.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040810] via-transparent to-transparent"></div>
      </div>

      {/* Content Body */}
      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-[#E5C05B] hover:prose-a:text-[#D4AF37]">
        
        {/* Introdução */}
        <p className="lead text-xl text-slate-200 border-l-4 border-[#D4AF37] pl-6 py-2 bg-slate-900/30 rounded-r-lg">
          {conteudo.introducao}
        </p>

        <div className="my-12 w-16 h-1 bg-slate-800 mx-auto rounded-full"></div>

        {/* Desenvolvimento */}
        {conteudo.desenvolvimento.map((secao, idx) => (
          <div key={idx} className="space-y-4 mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-[#D4AF37] opacity-50">0{idx + 1}.</span>
              {secao.titulo}
            </h2>
            <p className="leading-relaxed">
              {secao.conteudo}
            </p>
          </div>
        ))}

        {/* Referências Bíblicas */}
        {conteudo.referenciasBiblicas && conteudo.referenciasBiblicas.length > 0 && (
          <div className="my-12 p-6 sm:p-8 bg-slate-900/50 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#E5C05B]" />
              Referências Bíblicas Principais
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {conteudo.referenciasBiblicas.map((ref, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Aplicação e Conclusão */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Aplicação Prática</h2>
          <p className="leading-relaxed">{conteudo.aplicacaoPratica}</p>
          
          <h2 className="text-2xl font-bold text-white pt-4">Conclusão</h2>
          <p className="leading-relaxed">{conteudo.conclusao}</p>
        </div>
      </div>

      {/* Prev/Next Navigation */}
      <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        {anterior ? (
          <Link 
            href={`/conteudos/${anterior.slug}`}
            className="flex-1 w-full p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-[#D4AF37] flex items-center justify-center shrink-0 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Anterior</div>
              <div className="text-sm font-bold text-white truncate">{anterior.titulo}</div>
            </div>
          </Link>
        ) : <div className="flex-1"></div>}

        {proximo ? (
          <Link 
            href={`/conteudos/${proximo.slug}`}
            className="flex-1 w-full p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group flex items-center gap-4 text-right"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Próximo</div>
              <div className="text-sm font-bold text-white truncate">{proximo.titulo}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-[#D4AF37] flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-950" />
            </div>
          </Link>
        ) : <div className="flex-1"></div>}
      </div>

      {/* Related Contents */}
      {relacionados.length > 0 && (
        <div className="pt-16 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Você também pode gostar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relacionados.map((item) => (
              <Link
                key={item.id}
                href={`/conteudos/${item.slug}`}
                className="group cursor-pointer rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-32 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider">
                    {item.categoria}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2 leading-snug">
                    {item.titulo}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
