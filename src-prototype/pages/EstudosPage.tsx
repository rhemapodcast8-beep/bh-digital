import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookMarked, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, EstudoItem, EstudoCategoria } from '../types';
import { CATEGORIAS_ESTUDOS, MOCK_ESTUDOS } from '../data/mockData';

interface EstudosPageProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onSelectEstudo: (estudo: EstudoItem) => void;
  initialCategory?: EstudoCategoria | 'Todas';
}

export const EstudosPage: React.FC<EstudosPageProps> = ({
  currentRoute,
  onNavigate,
  onSelectEstudo,
  initialCategory = 'Todas'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EstudoCategoria | 'Todas'>(() => {
    // Detect category from route slug if applicable
    const matched = CATEGORIAS_ESTUDOS.find(c => currentRoute === `/estudos/${c.slug}`);
    return matched ? matched.id : initialCategory;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter studies based on search and category
  const filteredEstudos = useMemo(() => {
    return MOCK_ESTUDOS.filter((estudo) => {
      const matchesCategory = selectedCategory === 'Todas' || estudo.categoria === selectedCategory;
      const matchesSearch = 
        estudo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudo.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estudo.referencia.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredEstudos.length / itemsPerPage) || 1;
  const paginatedEstudos = filteredEstudos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: EstudoCategoria | 'Todas', slug?: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'Todas') {
      onNavigate('/estudos');
    } else if (slug) {
      onNavigate(`/estudos/${slug}` as PageRoute);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Estudos Bíblicos', route: selectedCategory !== 'Todas' ? '/estudos' : undefined },
          ...(selectedCategory !== 'Todas' ? [{ label: selectedCategory }] : [])
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Section */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <BookMarked className="w-4 h-4" />
          <span>Biblioteca de Estudos & Esboços</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Estudos Bíblicos
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Conteúdo completo para estudar, ensinar e compartilhar a Palavra. Pesquise por tema, categoria ou referência das Escrituras.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-[#080E1B] p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por título, palavra-chave ou passagem bíblica..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Quick Clear */}
          {(searchTerm || selectedCategory !== 'Todas') && (
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('Todas');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Limpar Filtros
            </button>
          )}

        </div>

        {/* Categories Horizontal Pills (All 9 requested categories) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('Todas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'Todas'
                ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Todas as Categorias
          </button>

          {CATEGORIAS_ESTUDOS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id, cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1E3A8A] text-white font-bold border border-blue-400 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat.id}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Exibindo <span className="font-bold text-white">{filteredEstudos.length}</span> estudos encontrados
          {selectedCategory !== 'Todas' && <span> na categoria <strong className="text-[#E5C05B]">{selectedCategory}</strong></span>}
        </div>
      </div>

      {/* Studies Cards Grid */}
      {paginatedEstudos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEstudos.map((estudo) => (
            <div
              key={estudo.id}
              className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={estudo.imagem}
                  alt={estudo.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070D18]/90 backdrop-blur-sm border border-[#D4AF37]/40 text-[#E5C05B] text-[11px] font-bold">
                  {estudo.categoria}
                </div>
                <div className="absolute bottom-2 right-3 text-[10px] text-slate-300 bg-black/70 px-2 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{estudo.tempoLeitura}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#E5C05B]">
                    {estudo.referencia}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                    {estudo.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {estudo.resumo}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{estudo.data}</span>
                  </span>
                  
                  <button
                    onClick={() => onSelectEstudo(estudo)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 group-hover:bg-[#1E3A8A] text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                  >
                    <span>Ler estudo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5C05B]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-[#080E1B] border border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Nenhum estudo encontrado</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tente buscar com outros termos ou selecione uma categoria diferente acima.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              handleCategoryChange('Todas');
            }}
            className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-semibold rounded-xl"
          >
            Ver todos os estudos
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                currentPage === pg
                  ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
