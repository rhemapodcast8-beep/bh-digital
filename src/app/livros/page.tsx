import type { Metadata } from 'next';
import { BookOpen, ExternalLink, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_LIVROS } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'Livros | BH DIGITAL',
  description: 'Catálogo oficial de livros cristãos — Quando Deus Sopra, Jesus em Parábolas de Mateus e outros títulos edificantes para pastores, líderes e cristãos.',
};

export default function LivrosPage() {
  const destaques = MOCK_LIVROS.filter((l) => l.destaque);
  const outros = MOCK_LIVROS.filter((l) => !l.destaque);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Publicações Oficiais</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">LIVROS</h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
          Obras publicadas para edificação, formação teológica e crescimento espiritual. Disponíveis nos formatos físico e e-book nas principais plataformas editoriais.
        </p>
      </div>

      {/* Destaques */}
      {destaques.length > 0 && (
        <section className="space-y-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Star className="w-5 h-5 text-[#D4AF37]" />
            Publicações em Destaque
          </h2>
          <div className="space-y-10">
            {destaques.map((livro, i) => (
              <div
                key={livro.id}
                className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C1828] to-[#080E1B] border border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/5 flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-start`}
              >
                {/* Capa */}
                <div className="w-full lg:w-56 shrink-0 flex justify-center">
                  <Link href={`/livros/${livro.slug}`} className="relative w-52 h-72 rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-slate-950 block hover:opacity-90 transition-opacity">
                    <img
                      src={livro.imagemCapa}
                      alt={`Capa do livro ${livro.titulo}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#D4AF37] text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                      Destaque
                    </div>
                  </Link>
                </div>

                {/* Conteúdo */}
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

                  {/* Botões */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                      href={`/livros/${livro.slug}`}
                      className="flex-1 py-3.5 px-4 rounded-xl bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-md"
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
            ))}
          </div>
        </section>
      )}

      {/* Outros Livros */}
      {outros.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Mais Títulos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outros.map((livro) => (
              <div
                key={livro.id}
                className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/30 flex gap-6 items-start transition-all shadow-lg"
              >
                {/* Capa pequena */}
                <div className="w-24 shrink-0">
                  <Link href={`/livros/${livro.slug}`} className="block w-24 h-32 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 bg-slate-950 hover:opacity-80 transition-opacity">
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
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
