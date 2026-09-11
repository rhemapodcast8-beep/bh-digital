import React, { useState } from 'react';
import { 
  Tv, 
  Play, 
  ExternalLink, 
  Search, 
  Filter, 
  Sparkles,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, ConteudoItem } from '../types';
import { MOCK_CONTEUDOS } from '../data/mockData';

interface ConteudosPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ConteudosPage: React.FC<ConteudosPageProps> = ({ onNavigate }) => {
  const [plataformaFiltro, setPlataformaFiltro] = useState<'Todas' | 'YouTube' | 'TikTok' | 'Kwai'>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState<ConteudoItem | null>(null);

  const filteredConteudos = MOCK_CONTEUDOS.filter((item) => {
    const matchesPlatform = plataformaFiltro === 'Todas' || item.plataforma === plataformaFiltro;
    const matchesSearch = item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb
        items={[{ label: 'Conteúdos' }]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <Tv className="w-4 h-4" />
          <span>Multimídia & Transmissões</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Biblioteca de Conteúdos
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Acompanhe vídeos, ensinamentos e mensagens em vídeo no YouTube, TikTok e Kwai reunidos em um só ambiente.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-[#080E1B] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar vídeos, temas ou palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setPlataformaFiltro('Todas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              plataformaFiltro === 'Todas'
                ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Todas as Plataformas
          </button>

          <button
            onClick={() => setPlataformaFiltro('YouTube')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              plataformaFiltro === 'YouTube'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            YouTube
          </button>

          <button
            onClick={() => setPlataformaFiltro('TikTok')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              plataformaFiltro === 'TikTok'
                ? 'bg-cyan-600 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            TikTok
          </button>

          <button
            onClick={() => setPlataformaFiltro('Kwai')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              plataformaFiltro === 'Kwai'
                ? 'bg-amber-600 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Kwai
          </button>
        </div>
      </div>

      {/* Grid of Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredConteudos.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveVideoModal(item)}
            className="group cursor-pointer rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            <div>
              {/* Thumbnail with overlay badge */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.thumbnail}
                  alt={item.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Platform Badge */}
                <div className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10px] font-bold text-white shadow-md ${
                  item.plataforma === 'YouTube' ? 'bg-red-600' :
                  item.plataforma === 'TikTok' ? 'bg-cyan-700' : 'bg-amber-600'
                }`}>
                  {item.plataforma}
                </div>

                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                  {item.duracao}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-11 h-11 rounded-full bg-white/90 text-slate-950 flex items-center justify-center pl-0.5 shadow-xl">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Card Text */}
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-semibold text-[#E5C05B] uppercase tracking-wider">
                  {item.categoria}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors line-clamp-2 leading-snug">
                  {item.titulo}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.descricao}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-800/60 mt-2">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{item.visualizacoes}</span>
              </span>
              <span>{item.data}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player Mockup */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#080E1B] border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                  activeVideoModal.plataforma === 'YouTube' ? 'bg-red-600' :
                  activeVideoModal.plataforma === 'TikTok' ? 'bg-cyan-700' : 'bg-amber-600'
                }`}>
                  {activeVideoModal.plataforma}
                </span>
                <h4 className="text-sm font-bold text-white truncate max-w-md">{activeVideoModal.titulo}</h4>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="aspect-video rounded-2xl bg-slate-950 flex flex-col items-center justify-center p-8 border border-slate-800 text-center space-y-3 relative overflow-hidden">
              <img
                src={activeVideoModal.thumbnail}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#D4AF37] text-slate-950 flex items-center justify-center pl-1 shadow-2xl">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <div className="relative z-10 space-y-1">
                <div className="text-base font-bold text-white">{activeVideoModal.titulo}</div>
                <div className="text-xs text-slate-400">Player de visualização demonstrativa • BH DIGITAL</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">{activeVideoModal.visualizacoes}</span>
              <a
                href={activeVideoModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Assistir no {activeVideoModal.plataforma}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
