'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  ChevronRight,
  Library,
  ArrowRight
} from 'lucide-react';
import { ConteudoItem } from '@/types';
import { MOCK_CONTEUDOS } from '@/lib/data/conteudos';

const ALL_CATEGORIES = [
  "Curiosidades Bíblicas", "Você Sabia?", "Personagens Bíblicos", "Lugares da Bíblia", 
  "Palavras da Bíblia", "Perguntas Bíblicas", "Contexto Bíblico", "História Bíblica", 
  "Geografia Bíblica", "Profecias", "Parábolas", "Bíblia e Vida Prática", "Fé", 
  "Oração", "Família", "Jovens", "Evangelismo", "Devocional Curto", "Doutrina Cristã",
  "Teologia Bíblica", "Cronologia Bíblica", "Perguntas Difíceis", "Como Estudar a Bíblia"
];

const ITEMS_PER_PAGE = 12;

export function ConteudosClient() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const conteudos = MOCK_CONTEUDOS as unknown as ConteudoItem[];

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [categoriaFiltro, searchTerm]);

  const filteredConteudos = conteudos.filter((item) => {
    const matchesCategory = categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro;
    
    // Normalize text for search
    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const term = normalize(searchTerm);
    const matchesSearch = term === '' || 
                          normalize(item.titulo).includes(term) ||
                          normalize(item.resumo).includes(term) ||
                          normalize(item.categoria).includes(term) ||
                          (item.introducao && normalize(item.introducao).includes(term)) ||
                          (item.desenvolvimento && item.desenvolvimento.some(d => 
                            normalize(d.titulo).includes(term) || normalize(d.conteudo).includes(term)
                          ));
    return matchesCategory && matchesSearch;
  });

  const visibleItems = filteredConteudos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredConteudos.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const destaques = conteudos.filter(c => c.destaque).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">Conteúdos</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <Library className="w-4 h-4" />
          <span>Biblioteca Digital</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Biblioteca de Conteúdos
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Conheça a Bíblia, descubra curiosidades, aprofunde sua fé e encontre conteúdos para fortalecer sua caminhada com Deus.
        </p>
      </div>

      {/* Destaques (only show if no search/filter is active) */}
      {categoriaFiltro === 'Todas' && searchTerm === '' && destaques.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Conteúdos em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destaques.map((item) => (
              <Link
                key={item.id}
                href={`/conteudos/${item.slug}`}
                className="group cursor-pointer rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-md bg-[#D4AF37]/90 text-slate-950">
                    Destaque
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-[#E5C05B] uppercase tracking-wider">
                      {item.categoria}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2 leading-snug">
                      {item.titulo}
                    </h3>
                  </div>
                  <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 mt-auto">
                    LER CONTEÚDO <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Explorar Biblioteca</h2>
        
        {/* Filter Tabs & Search */}
        <div className="bg-[#080E1B] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar conteúdo bíblico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            {(searchTerm !== '' || categoriaFiltro !== 'Todas') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategoriaFiltro('Todas');
                }}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-colors whitespace-nowrap"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Escolha um Tema:</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCategoriaFiltro('Todas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  categoriaFiltro === 'Todas'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                Todos
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    categoriaFiltro === cat
                      ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>Mostrando {visibleItems.length} de {filteredConteudos.length} {filteredConteudos.length === 1 ? 'conteúdo' : 'conteúdos'}</span>
        </div>

        {/* Grid of Content Cards */}
        {filteredConteudos.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/conteudos/${item.slug}`}
                  className="group cursor-pointer rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  </div>

                  {/* Card Text */}
                  <div className="p-5 space-y-3 flex flex-col flex-1">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                        {item.categoria}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2 leading-snug">
                        {item.titulo}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed flex-1">
                      {item.resumo}
                    </p>
                    <div className="pt-4 border-t border-slate-800/60 mt-auto">
                      <div className="text-xs font-bold text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        LER CONTEÚDO <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 rounded-full bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 font-bold transition-colors shadow-lg"
                >
                  Carregar mais conteúdos
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-[#080E1B] rounded-2xl border border-slate-800 border-dashed">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Nenhum conteúdo encontrado</h3>
              <p className="text-sm text-slate-400">Tente buscar por outras palavras-chave ou limpar os filtros.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoriaFiltro('Todas');
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-colors inline-flex mt-4"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
