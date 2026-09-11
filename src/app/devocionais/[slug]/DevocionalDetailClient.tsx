'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar,
  Clock,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Target,
  HeartHandshake,
  Coffee
} from 'lucide-react';
import { DevocionalItem } from '@/types';

interface NavigationItem {
  slug: string;
  titulo: string;
}

interface Props {
  devocional: DevocionalItem;
  anterior: NavigationItem | null;
  proximo: NavigationItem | null;
}

function formatDatePtBR(dateString: string) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return new Intl.DateTimeFormat('pt-BR', { 
    dateStyle: 'full' 
  }).format(date);
}

export function DevocionalDetailClient({ devocional, anterior, proximo }: Props) {
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/devocionais" className="hover:text-white transition-colors">Devocionais</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold truncate max-w-[200px]">{devocional.titulo}</span>
      </nav>

      {/* Back Button */}
      <Link
        href="/devocionais"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para devocionais</span>
      </Link>

      {/* Header Container */}
      <div className="space-y-6 text-center pt-4">
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            {devocional.categoria}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {devocional.titulo}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 capitalize">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDatePtBR(devocional.data)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{devocional.tempoLeitura} de leitura</span>
          </div>
        </div>
      </div>

      {/* Versículo Destaque */}
      <div className="py-8 my-8 border-y border-slate-800 text-center space-y-4">
        <Sparkles className="w-6 h-6 text-[#E5C05B] mx-auto opacity-50" />
        <p className="text-xl sm:text-2xl font-serif text-white italic leading-relaxed px-4">
          {devocional.versiculoPrincipal}
        </p>
        <p className="text-sm font-bold tracking-wider text-[#E5C05B] uppercase">
          {devocional.referenciaBiblica}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between py-2 border-b border-slate-800">
        <button
          onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <span className="font-serif font-bold text-sm">Aa</span>
          Tamanho da Fonte
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-lg border transition-colors ${isFavorited
                ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                : 'bg-transparent border-slate-700 text-slate-400 hover:text-white'
              }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className={`space-y-10 text-slate-300 font-normal ${fontSize === 'large' ? 'text-lg leading-loose' : 'text-base leading-relaxed'
        }`}>

        {/* Reflexão */}
        <section className="space-y-4">
          <p>{devocional.reflexao}</p>
        </section>

        {/* Aplicação Prática */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Aplicação Diária
          </h3>
          <p>{devocional.aplicacao}</p>
        </section>

        {/* Desafio do Dia */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/50 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Coffee className="w-5 h-5 text-emerald-400" />
            Desafio do Dia
          </h3>
          <p className="text-emerald-100/80 italic">{devocional.desafioDoDia}</p>
        </section>

        {/* Pergunta para Reflexão */}
        <section className="text-center py-6">
          <h3 className="text-sm font-bold text-[#E5C05B] uppercase tracking-widest mb-3">
            Para Refletir
          </h3>
          <p className="text-xl text-white font-serif italic">
            "{devocional.perguntaReflexao}"
          </p>
        </section>

        {/* Oração Final */}
        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800/60 text-center space-y-4">
          <HeartHandshake className="w-6 h-6 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Oração</h3>
          <p className="italic text-slate-400 max-w-lg mx-auto">
            {devocional.oracao}
          </p>
        </section>

      </div>
      
      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-800 mt-8">
        {anterior ? (
          <Link
            href={`/devocionais/${anterior.slug}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-900 transition-colors group"
          >
            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 text-slate-400 group-hover:text-indigo-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Devocional Anterior</span>
              <span className="text-sm font-bold text-white truncate max-w-[200px]">{anterior.titulo}</span>
            </div>
          </Link>
        ) : <div />}

        {proximo ? (
          <Link
            href={`/devocionais/${proximo.slug}`}
            className="flex items-center justify-end gap-3 p-4 rounded-xl border border-slate-800 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-900 transition-colors group text-right"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Próximo Devocional</span>
              <span className="text-sm font-bold text-white truncate max-w-[200px]">{proximo.titulo}</span>
            </div>
            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-indigo-500/20 text-slate-400 group-hover:text-indigo-400 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        ) : <div />}
      </div>

    </div>
  );
}
