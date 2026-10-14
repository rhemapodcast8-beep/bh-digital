'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { LivroItem } from '@/types';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useI18n } from '@/lib/i18n/I18nContext';

interface LivrosClientProps {
  obrasPrincipais: LivroItem[];
}

export function LivrosClient({ obrasPrincipais }: LivrosClientProps) {
  const { t, localizePath } = useI18n();

  return (
    <>
      <PremiumPageBackground variant="livros" />

      <div className="page-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
        {/* ── Page Hero ── */}
        <PageHero
          badge={t.livros?.pageBadge || 'Publicações Oficiais'}
          title={t.livros?.pageTitle || 'LIVROS'}
          description={t.livros?.pageDesc || 'Obras publicadas para edificação, formação teológica e crescimento espiritual. Disponíveis nos formatos físico e e-book nas principais plataformas editoriais.'}
          accentColor="#D4AF37"
          decorationVariant="lines"
        />

        {/* ── Grid Principal das Duas Obras (Lado a lado no Desktop, empilhado no Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-2">
          {obrasPrincipais.map((livro, index) => {
            return (
              <AnimatedSection key={livro.id} delay={100 + index * 80} className="h-full flex flex-col">
                <article
                  className="flex-1 rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 premium-card transition-all duration-300 hover:border-[#D4AF37]/50 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(12,24,40,0.95) 0%, rgba(8,14,27,0.98) 100%)',
                    borderColor: 'rgba(212,175,55,0.28)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="space-y-6">
                    {/* Imagem da Capa Original */}
                    <div className="w-full flex justify-center">
                      <Link
                        href={localizePath(`/livros/${livro.slug}`)}
                        className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[1/1.45] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/25 bg-slate-950 block group/cover"
                        style={{
                          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(212,175,55,0.12))',
                        }}
                      >
                        <img
                          src={livro.imagemCapa}
                          alt={`Capa original do livro ${livro.titulo}`}
                          className="w-full h-full object-cover group-hover/cover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
                          {t.livros?.featuredBadge ? 'Destaque' : 'Destaque'}
                        </div>
                      </Link>
                    </div>

                    {/* Metadados e Título */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/15 px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                          {livro.categoria}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#D4AF37]" />
                          {livro.formato}
                        </span>
                      </div>

                      <Link href={localizePath(`/livros/${livro.slug}`)} className="block group-hover:text-[#D4AF37] transition-colors">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                          {livro.titulo}
                        </h2>
                      </Link>

                      <p className="text-sm text-slate-400">
                        {t.livros?.byAuthor || 'Por'}{' '}
                        <strong className="text-[#E5C05B] font-bold text-base">{livro.autor}</strong>
                      </p>

                      <p className="text-sm text-slate-300 leading-relaxed pt-1">
                        {livro.descricao}
                      </p>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                    <Link
                      href={localizePath(`/livros/${livro.slug}`)}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md hover:shadow-[#00A3FF]/25"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{t.livros?.viewFullBook || 'VER LIVRO COMPLETO'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {livro.linkAmazon ? (
                      <a
                        href={livro.linkAmazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md hover:brightness-105"
                      >
                        <span>AMAZON</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}

                    {livro.linkUiclap ? (
                      <a
                        href={livro.linkUiclap}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md hover:brightness-105"
                      >
                        <span>UICLAP</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </>
  );
}
