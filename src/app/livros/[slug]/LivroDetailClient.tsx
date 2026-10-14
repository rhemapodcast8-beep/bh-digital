'use client';

import Link from 'next/link';
import { ChevronLeft, BookOpen, ExternalLink } from 'lucide-react';
import { LivroItem } from '@/types';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function LivroDetailClient({ 
  livro, 
  relacionados 
}: { 
  livro: LivroItem; 
  relacionados: LivroItem[]; 
}) {
  const { t, localizePath } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Breadcrumb e Voltar */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link href={localizePath('/livros')} className="hover:text-white transition-colors flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          {t.nav?.livros || 'Livros'}
        </Link>
        <span>/</span>
        <span className="text-white truncate">{livro.titulo}</span>
      </div>

      <article className="space-y-12">
        {/* Header do Livro */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Capa */}
          <div className="w-full md:w-64 shrink-0 flex justify-center">
            <div className="relative w-48 md:w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-950">
              <img
                src={livro.imagemCapa}
                alt={`Capa do livro ${livro.titulo}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Informações Básicas */}
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-1 rounded border border-[#D4AF37]/20">
                {livro.categoria}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {livro.titulo}
              </h1>
              <p className="text-lg text-slate-300">
                Por <strong className="text-[#E5C05B] font-semibold">{livro.autor}</strong>
              </p>
            </div>

            <p className="text-base text-slate-300 leading-relaxed border-l-2 border-[#D4AF37]/50 pl-4 py-1 italic">
              {livro.descricao}
            </p>

            {/* Metadados */}
            <div className="flex flex-wrap gap-4 py-4 border-y border-slate-800/80 text-sm text-slate-400">
              {livro.paginas && <span><strong className="text-slate-200">{livro.paginas}</strong> páginas</span>}
              <span>Formato: <strong className="text-slate-200">{livro.formato}</strong></span>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {livro.linkAmazon && (
                <a
                  href={livro.linkAmazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
                >
                  <span>COMPRAR NA AMAZON</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {livro.linkUiclap && (
                <a
                  href={livro.linkUiclap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
                >
                  <span>COMPRAR NA UICLAP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo Rico */}
        {livro.sobre && (
          <div className="space-y-12 pt-8 border-t border-slate-800">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                Sobre esta obra
              </h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{livro.sobre}</p>
            </section>

            {livro.contexto && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Contexto da obra</h3>
                <p className="text-slate-300 leading-relaxed">{livro.contexto}</p>
              </section>
            )}

            {livro.temas && livro.temas.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Principais temas</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {livro.temas.map((tema, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                      <span>{tema}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {livro.importancia && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Por que esta obra é importante?</h3>
                <p className="text-slate-300 leading-relaxed bg-gradient-to-r from-slate-900 to-transparent p-5 rounded-xl border-l-4 border-[#D4AF37]">
                  {livro.importancia}
                </p>
              </section>
            )}

            {livro.reflexoes && (
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white">Aplicações e reflexões</h3>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>{livro.reflexoes}</p>
                  {livro.aplicacoes && <p className="text-[#D4AF37]">{livro.aplicacoes}</p>}
                </div>
              </section>
            )}
          </div>
        )}
      </article>

      {/* Livros Relacionados */}
      {relacionados.length > 0 && (
        <section className="pt-12 border-t border-slate-800 space-y-8">
          <h2 className="text-2xl font-bold text-white">Leia também</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relacionados.map((relacionado) => (
              <Link 
                key={relacionado.id} 
                href={`/livros/${relacionado.slug}`}
                className="group flex flex-col space-y-3 bg-[#080E1B] p-4 rounded-2xl border border-slate-800 hover:border-[#D4AF37]/40 transition-all shadow-lg"
              >
                <div className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={relacionado.imagemCapa}
                    alt={`Capa de ${relacionado.titulo}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-bold text-white text-sm line-clamp-1">{relacionado.titulo}</h3>
                  <p className="text-xs text-slate-400">{relacionado.autor}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer Nav */}
      <div className="pt-8 flex justify-center">
        <Link
          href={localizePath('/livros')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.nav?.back || 'Voltar para Livros'}
        </Link>
      </div>

    </div>
  );
}
