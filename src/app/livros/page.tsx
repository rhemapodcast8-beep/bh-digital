import type { Metadata } from 'next';
import { BookOpen, ExternalLink, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_LIVROS } from '@/lib/mockData';
import { Pagination } from '@/components/ui/Pagination';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Livros | BH DIGITAL',
  description: 'Catálogo oficial de livros cristãos — Quando Deus Sopra, Jesus em Parábolas de Mateus e outros títulos edificantes para pastores, líderes e cristãos.',
};

const ITEMS_PER_PAGE = 12;

export default async function LivrosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const destaques = MOCK_LIVROS.filter((l) => l.destaque);
  const todosOutros = MOCK_LIVROS.filter((l) => !l.destaque);
  
  const totalItems = todosOutros.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const outros = todosOutros.slice(startIndex, endIndex);

  return (
    <>
      <PremiumPageBackground variant="livros" />

      <div className="page-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

        {/* ── Page Hero ── */}
        <PageHero
          badge="Publicações Oficiais"
          title="LIVROS"
          description="Obras publicadas para edificação, formação teológica e crescimento espiritual. Disponíveis nos formatos físico e e-book nas principais plataformas editoriais."
          accentColor="#D4AF37"
          decorationVariant="lines"
        />

        {/* ── Destaques (Apenas na página 1) ── */}
        {currentPage === 1 && destaques.length > 0 && (
          <AnimatedSection delay={80} as="section" className="space-y-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Star className="w-5 h-5 text-[#D4AF37]" />
              Publicações em Destaque
            </h2>
            <div className="space-y-10">
              {destaques.map((livro, i) => (
                <AnimatedSection key={livro.id} delay={120 + i * 60}>
                  <div
                    className={`p-8 sm:p-12 rounded-3xl flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-start premium-card`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(12,24,40,0.95) 0%, rgba(8,14,27,0.95) 100%)',
                      borderColor: 'rgba(212,175,55,0.25)',
                    }}
                  >
                    {/* Book cover */}
                    <div className="w-full lg:w-56 shrink-0 flex justify-center">
                      <Link
                        href={`/livros/${livro.slug}`}
                        className="relative w-52 h-72 rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 bg-slate-950 block group/cover"
                        style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(212,175,55,0.08))' }}
                      >
                        <img
                          src={livro.imagemCapa}
                          alt={`Capa do livro ${livro.titulo}`}
                          className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-[#D4AF37] text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          Destaque
                        </div>
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                            {livro.categoria}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                            {livro.formato}
                          </span>
                        </div>
                        <Link href={`/livros/${livro.slug}`} className="block hover:text-[#D4AF37] transition-colors">
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{livro.titulo}</h2>
                        </Link>
                        <p className="text-sm text-slate-400">
                          Por <strong className="text-[#E5C05B] font-semibold">{livro.autor}</strong>
                        </p>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">{livro.descricao}</p>

                      {livro.paginas && (
                        <div className="flex flex-wrap gap-4 py-3 border-t border-slate-800/80 text-xs text-slate-400">
                          <span><strong className="text-slate-200">{livro.paginas}</strong> páginas</span>
                          <span>{livro.formato}</span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link
                          href={`/livros/${livro.slug}`}
                          className="flex-1 py-3.5 px-4 rounded-xl bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md hover:shadow-[#00A3FF]/25"
                        >
                          <span>VER LIVRO COMPLETO</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                        {(livro as { linkAmazon?: string }).linkAmazon ? (
                          <a
                            href={(livro as { linkAmazon: string }).linkAmazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
                          >
                            <span>AMAZON</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                        {(livro as { linkUiclap?: string }).linkUiclap ? (
                          <a
                            href={(livro as { linkUiclap: string }).linkUiclap}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
                          >
                            <span>UICLAP</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* ── Outros Livros ── */}
        {outros.length > 0 && (
          <AnimatedSection delay={100} as="section" className="space-y-8">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
              {currentPage === 1 ? 'Mais Títulos' : `Mais Títulos (Página ${currentPage})`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {outros.map((livro, idx) => (
                <AnimatedSection key={livro.id} delay={130 + idx * 45}>
                  <div className="p-6 rounded-2xl flex gap-6 items-start premium-card">
                    <div className="w-24 shrink-0">
                      <Link
                        href={`/livros/${livro.slug}`}
                        className="block w-24 h-32 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 bg-slate-950 hover:opacity-80 transition-opacity"
                        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))' }}
                      >
                        <img
                          src={livro.imagemCapa}
                          alt={`Capa: ${livro.titulo}`}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>

                    <div className="flex-1 space-y-3 min-w-0">
                      <div>
                        <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider">{livro.categoria}</span>
                        <h3 className="text-base font-bold text-white leading-tight mt-1">{livro.titulo}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">por {livro.autor}</p>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{livro.descricao}</p>
                      <div className="flex items-center gap-2">
                        {livro.linkAmazon ? (
                          <a href={livro.linkAmazon} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                            Amazon <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : livro.linkCompra && livro.linkCompra !== '#em-breve' ? (
                          <Link href={`/livros/${livro.slug}`}
                            className="text-xs font-bold text-[#00A3FF] hover:text-[#0082CC] flex items-center gap-1 transition-colors">
                            Ver detalhes <ChevronRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Em breve</span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <Pagination totalPages={totalPages} />
          </AnimatedSection>
        )}

      </div>
    </>
  );
}
