import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ArrowLeft, 
  Check, 
  Crown, 
  Filter, 
  Share2,
  BookMarked
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, LivroItem } from '../types';
import { MOCK_LIVROS } from '../data/mockData';

interface LivrosPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const LivrosPage: React.FC<LivrosPageProps> = ({ onNavigate }) => {
  const [tipoFiltro, setTipoFiltro] = useState<'Todos' | 'Livros' | 'E-books'>('Todos');
  const [selectedLivro, setSelectedLivro] = useState<LivroItem | null>(null);

  const filteredLivros = MOCK_LIVROS.filter((livro) => {
    if (tipoFiltro === 'Todos') return true;
    if (tipoFiltro === 'Livros') return livro.tipo === 'Livro Físico' || livro.tipo === 'Ambos';
    if (tipoFiltro === 'E-books') return livro.tipo === 'E-book' || livro.tipo === 'Ambos';
    return true;
  });

  // DETAIL VIEW FOR INDIVIDUAL BOOK
  if (selectedLivro) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        <Breadcrumb
          items={[
            { label: 'Livros', route: '/livros' },
            { label: selectedLivro.titulo }
          ]}
          onNavigate={onNavigate}
        />

        <button
          onClick={() => setSelectedLivro(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o catálogo de livros</span>
        </button>

        <div className="p-6 sm:p-10 rounded-3xl bg-[#080E1B] border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Cover */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="w-60 sm:w-72 h-84 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50">
                  <img
                    src={selectedLivro.capa}
                    alt={selectedLivro.titulo}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-xl -z-10" />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <span>{selectedLivro.tipo}</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {selectedLivro.titulo}
                </h1>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  Autor: <strong className="text-slate-200">{selectedLivro.autor}</strong>
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                {selectedLivro.descricaoCompleta.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Action Buttons: Amazon & UICLAP */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                {selectedLivro.linkAmazon && (
                  <a
                    href={selectedLivro.linkAmazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Comprar na Amazon</span>
                    <ExternalLink className="w-4 h-4 text-slate-950" />
                  </a>
                )}

                {selectedLivro.linkUiclap && (
                  <a
                    href={selectedLivro.linkUiclap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all hover:border-[#D4AF37]/50"
                  >
                    <span>Comprar na UICLAP</span>
                    <ExternalLink className="w-4 h-4 text-[#E5C05B]" />
                  </a>
                )}
              </div>

              {/* Specifications Box */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-slate-500">Páginas</div>
                  <div className="font-bold text-white mt-0.5">{selectedLivro.paginas}</div>
                </div>
                <div className="border-x border-slate-800">
                  <div className="text-slate-500">Formato</div>
                  <div className="font-bold text-white mt-0.5">{selectedLivro.formato}</div>
                </div>
                <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-slate-500">Edição</div>
                  <div className="font-bold text-[#E5C05B] mt-0.5">{selectedLivro.ano}</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }

  // CATALOG LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb
        items={[{ label: 'Livros' }]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>Livraria & Publicações</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Catálogo de Livros
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Obras cristãs para edificação pessoal, ministério pastoral e liderança. Adquira exemplares físicos ou e-books pelas principais plataformas.
        </p>
      </div>

      {/* Filter Tabs: Todos, Livros, E-books */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setTipoFiltro('Todos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tipoFiltro === 'Todos'
              ? 'bg-[#D4AF37] text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setTipoFiltro('Livros')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tipoFiltro === 'Livros'
              ? 'bg-[#1E3A8A] text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Livros Impressos
        </button>

        <button
          onClick={() => setTipoFiltro('E-books')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tipoFiltro === 'E-books'
              ? 'bg-[#1E3A8A] text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          E-books Digitais
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLivros.map((livro) => (
          <div
            key={livro.id}
            className="p-6 rounded-3xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row gap-6 shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Book Cover */}
            <div className="w-full sm:w-44 h-60 rounded-xl overflow-hidden shadow-lg border border-slate-700/60 flex-shrink-0">
              <img
                src={livro.capa}
                alt={livro.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Body */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                  {livro.tipo}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {livro.titulo}
                </h3>
                <p className="text-xs text-slate-400">
                  Por <span className="text-slate-200">{livro.autor}</span>
                </p>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {livro.descricaoCurta}
                </p>
              </div>

              {/* Action Links */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  {livro.linkAmazon && (
                    <a
                      href={livro.linkAmazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm uppercase tracking-wider"
                    >
                      <span>COMPRAR NA AMAZON</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                    </a>
                  )}

                  {livro.linkUiclap && (
                    <a
                      href={livro.linkUiclap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-all hover:border-[#D4AF37]/50 uppercase tracking-wider"
                    >
                      <span>COMPRAR NA UICLAP</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E5C05B]" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedLivro(livro)}
                  className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Ver Detalhes do Livro →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLivros.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#080E1B] border border-slate-800 space-y-3">
          <BookOpen className="w-8 h-8 text-[#D4AF37] mx-auto opacity-70" />
          <h3 className="text-base font-bold text-white">Nenhum livro nesta categoria no momento</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Novas publicações e edições especiais estão sendo preparadas pela equipe editorial do BH DIGITAL.
          </p>
          <button
            onClick={() => setTipoFiltro('Todos')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white mt-2"
          >
            Ver Todas as Obras
          </button>
        </div>
      )}

    </div>
  );
};
