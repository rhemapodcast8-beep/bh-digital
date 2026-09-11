import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bookmark, 
  Share2, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Copy,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, DevocionalItem } from '../types';
import { MOCK_DEVOCIONAIS } from '../data/mockData';

interface DevocionaisPageProps {
  onNavigate: (route: PageRoute) => void;
  selectedDevocional: DevocionalItem | null;
  onSelectDevocional: (dev: DevocionalItem | null) => void;
}

export const DevocionaisPage: React.FC<DevocionaisPageProps> = ({
  onNavigate,
  selectedDevocional,
  onSelectDevocional
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const filteredDevocionais = MOCK_DEVOCIONAIS.filter((d) => {
    return (
      d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.referenciaBiblica.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.resumo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleFavorite = (id: string) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(f => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // IF AN INDIVIDUAL DEVOTIONAL IS SELECTED, RENDER DETAIL VIEW
  if (selectedDevocional) {
    const isFav = favoritos.includes(selectedDevocional.id);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        <Breadcrumb
          items={[
            { label: 'Devocionais', route: '/devocionais' },
            { label: selectedDevocional.titulo }
          ]}
          onNavigate={onNavigate}
        />

        <button
          onClick={() => onSelectDevocional(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a lista de devocionais</span>
        </button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
              Devocional Diário
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              {selectedDevocional.referenciaBiblica}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {selectedDevocional.titulo}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{selectedDevocional.data}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedDevocional.tempoLeitura}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(selectedDevocional.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isFav
                    ? 'bg-[#E5C05B] text-slate-950 border-[#E5C05B]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isFav ? 'Salvo nos Favoritos' : 'Favoritar'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 h-64 sm:h-80 w-full shadow-2xl relative">
          <img
            src={selectedDevocional.imagem}
            alt={selectedDevocional.titulo}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Verse Highlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#0A1224] to-slate-900 border-l-4 border-[#D4AF37] border-y border-r border-slate-800 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#E5C05B]">
            Versículo Chave • {selectedDevocional.referenciaBiblica}
          </div>
          <p className="text-base sm:text-lg text-white font-medium italic">
            {selectedDevocional.versiculoChave}
          </p>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-5 text-base sm:text-lg text-slate-200 leading-relaxed">
          {selectedDevocional.conteudo.map((paragrafo, idx) => (
            <p key={idx} className="text-slate-300">
              {paragrafo}
            </p>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onSelectDevocional(null)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700"
          >
            ← Voltar para lista
          </button>
          <button
            onClick={() => onNavigate('/biblia')}
            className="px-5 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#1E40AF] text-white text-xs font-semibold"
          >
            Abrir na Bíblia Online →
          </button>
        </div>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb
        items={[{ label: 'Devocionais' }]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Palavra Diária de Edificação</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Devocionais
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Uma palavra para fortalecer sua caminhada todos os dias. Meditações práticas e orações para cultivar comunhão diária com Deus.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-[#080E1B] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar por título, tema ou passagem bíblica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Devotionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevocionais.map((dev) => (
          <div
            key={dev.id}
            className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={dev.imagem}
                  alt={dev.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 text-[11px] font-bold text-white bg-black/70 px-2.5 py-1 rounded-md border border-slate-700">
                  {dev.data}
                </div>
                <div className="absolute bottom-2 right-3 text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded">
                  {dev.tempoLeitura}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-xs font-bold text-[#E5C05B]">
                  {dev.referenciaBiblica}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors leading-snug">
                  {dev.titulo}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {dev.resumo}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <button
                onClick={() => onSelectDevocional(dev)}
                className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-[#1E3A8A] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Ler Devocional Completo</span>
                <ChevronRight className="w-4 h-4 text-[#E5C05B]" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
