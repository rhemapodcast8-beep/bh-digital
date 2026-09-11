import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Crown, 
  Check, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Sparkles, 
  BookMarked, 
  Users, 
  Compass, 
  Share2, 
  Lock, 
  Layers,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { PageRoute, MaterialItem, MaterialCategoria } from '../types';
import { MOCK_MATERIAIS, CATEGORIAS_MATERIAIS } from '../data/mockData';

interface MateriaisPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const MateriaisPage: React.FC<MateriaisPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategoria | 'Todas'>('Todas');
  const [accessFilter, setAccessFilter] = useState<'Todos' | 'Gratuito' | 'Premium'>('Todos');
  const [activeMaterialModal, setActiveMaterialModal] = useState<MaterialItem | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Filter logic
  const filteredMateriais = useMemo(() => {
    return MOCK_MATERIAIS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'Todas' && item.categoria !== selectedCategory) {
        return false;
      }
      // Access filter
      if (accessFilter !== 'Todos' && item.tipoAcesso !== accessFilter) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = item.titulo.toLowerCase().includes(query);
        const matchDesc = item.descricao.toLowerCase().includes(query);
        const matchCat = item.categoria.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchCat;
      }
      return true;
    });
  }, [searchTerm, selectedCategory, accessFilter]);

  const handleDownloadClick = (material: MaterialItem) => {
    if (material.tipoAcesso === 'Premium') {
      setActiveMaterialModal(material);
    } else {
      setDownloadSuccessToast(`Download demonstrativo iniciado: "${material.titulo}"`);
      setTimeout(() => setDownloadSuccessToast(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 pb-24">
      
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-sm font-medium">{downloadSuccessToast}</span>
        </div>
      )}

      {/* Breadcrumb Header */}
      <div className="border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#E5C05B] font-semibold">Materiais</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/premium')}
              className="inline-flex items-center gap-1.5 text-xs text-[#E5C05B] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Biblioteca Premium</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-slate-800/60 bg-gradient-to-b from-[#0B1528] via-[#080E1C] to-[#060B16]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-semibold mb-4 tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              <span>CENTRO DE MATERIAIS E RECURSOS DIGITAIS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Materiais Bíblicos e Pedagógicos
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Acesse esboços para mensagens, estudos detalhados, apostilas para professores, manuais de liderança e conteúdos práticos para a edificação do corpo de Cristo.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar por título, tema, categoria ou palavra-chave..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-sm shadow-xl transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-800 p-1 rounded-md"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filters Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
              Filtrar por Categoria
            </span>

            {/* Access Type Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setAccessFilter('Todos')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  accessFilter === 'Todos'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos ({MOCK_MATERIAIS.length})
              </button>
              <button
                onClick={() => setAccessFilter('Gratuito')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  accessFilter === 'Gratuito'
                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gratuitos
              </button>
              <button
                onClick={() => setAccessFilter('Premium')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  accessFilter === 'Premium'
                    ? 'bg-[#D4AF37]/20 text-[#E5C05B] border border-[#D4AF37]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Categories Pill Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('Todas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === 'Todas'
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Todas as Categorias
            </button>

            {CATEGORIAS_MATERIAIS.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-md'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-xs text-slate-400">
          <span>
            Mostrando <strong className="text-white">{filteredMateriais.length}</strong> materiais encontrados
          </span>
          {selectedCategory !== 'Todas' && (
            <button
              onClick={() => setSelectedCategory('Todas')}
              className="text-[#E5C05B] hover:underline"
            >
              Limpar filtro de categoria
            </button>
          )}
        </div>

        {/* Grid of Materials */}
        {filteredMateriais.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMateriais.map((mat) => {
              const isPremium = mat.tipoAcesso === 'Premium';

              return (
                <div
                  key={mat.id}
                  className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col hover:shadow-xl hover:shadow-blue-950/20"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={mat.imagem}
                      alt={mat.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Access Tag */}
                    <div className="absolute top-3 left-3">
                      {isPremium ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#D4AF37] text-slate-950 shadow-md">
                          <Crown className="w-3 h-3" />
                          CONTEÚDO PREMIUM
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 shadow-md">
                          <Check className="w-3 h-3" />
                          GRATUITO
                        </span>
                      )}
                    </div>

                    {/* Format Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700/80">
                        {mat.formato} • {mat.paginas} págs
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-[#E5C05B]">
                      {mat.categoria}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2 leading-snug mb-2">
                        {mat.titulo}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {mat.descricao}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{mat.autor}</span>
                        <span>{mat.data}</span>
                      </div>

                      {/* Action Button */}
                      {isPremium ? (
                        <button
                          onClick={() => handleDownloadClick(mat)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#E5C05B] flex items-center justify-center gap-2 transition-all group-hover:border-[#E5C05B]"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>CONTEÚDO PREMIUM</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDownloadClick(mat)}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center justify-center gap-2 transition-all hover:border-slate-600"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                          <span>LEIA GRATUITAMENTE</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-300 font-medium mb-2">Nenhum material encontrado com os filtros selecionados.</p>
            <p className="text-xs text-slate-500 mb-4">Tente buscar por termos mais genéricos ou resetar os filtros de categoria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
                setAccessFilter('Todos');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Resetar Todos os Filtros
            </button>
          </div>
        )}

      </main>

      {/* Modal for Premium Material Interception */}
      {activeMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActiveMaterialModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C05B]">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#E5C05B] block mb-1">
                Material Exclusivo da Biblioteca Premium
              </span>
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {activeMaterialModal.titulo}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeMaterialModal.descricao}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Formato:</span>
                <strong className="text-white">{activeMaterialModal.formato}</strong>
              </div>
              <div className="flex justify-between">
                <span>Páginas estimadas:</span>
                <strong className="text-white">{activeMaterialModal.paginas} páginas</strong>
              </div>
              <div className="flex justify-between">
                <span>Categoria:</span>
                <strong className="text-[#E5C05B]">{activeMaterialModal.categoria}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
              <strong className="block text-white mb-0.5">Assinatura em breve</strong>
              Os materiais Premium farão parte do Plano Premium da Biblioteca. Você poderá assinar em breve assim que os planos forem disponibilizados.
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setActiveMaterialModal(null);
                  onNavigate('/premium');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/30 transition-all"
              >
                Conhecer a Biblioteca Premium
              </button>

              <button
                onClick={() => setActiveMaterialModal(null)}
                className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors text-center"
              >
                Fechar e continuar explorando
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
