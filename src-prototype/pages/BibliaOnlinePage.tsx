import React, { useState } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  Volume2, 
  Search, 
  ChevronRight, 
  Share2, 
  Sun, 
  Moon, 
  Sparkles,
  Info,
  Smartphone,
  ExternalLink,
  Check
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, LivroBiblico } from '../types';
import { LIVROS_BIBLICOS, VERSICULOS_DEMO_EXEMPLOS } from '../data/mockData';

interface BibliaOnlinePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAppModal: () => void;
}

export const BibliaOnlinePage: React.FC<BibliaOnlinePageProps> = ({ 
  onNavigate,
  onOpenAppModal
}) => {
  const [testamento, setTestamento] = useState<'Antigo' | 'Novo'>('Antigo');
  const [livroSelecionado, setLivroSelecionado] = useState<LivroBiblico>(LIVROS_BIBLICOS[0]);
  const [capituloSelecionado, setCapituloSelecionado] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorito = (num: number) => {
    if (favoritos.includes(num)) {
      setFavoritos(favoritos.filter(f => f !== num));
      showToast(`Versículo ${num} removido dos favoritos.`);
    } else {
      setFavoritos([...favoritos, num]);
      showToast(`Versículo ${num} adicionado aos seus favoritos!`);
    }
  };

  const livrosFiltrados = LIVROS_BIBLICOS.filter(l => {
    const matchesTestamento = l.testamento === testamento;
    const matchesSearch = l.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.abreviacao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTestamento && matchesSearch;
  });

  // Get demo verses for currently selected book and chapter
  const keyDemo = `${livroSelecionado.id}-${capituloSelecionado}`;
  const versiculosDemo = VERSICULOS_DEMO_EXEMPLOS[keyDemo] || {
    tituloCapitulo: `${livroSelecionado.nome} ${capituloSelecionado}`,
    versiculos: [
      { numero: 1, texto: `[Texto de demonstração] Este é o primeiro versículo ilustrativo do capítulo ${capituloSelecionado} de ${livroSelecionado.nome} no protótipo BH DIGITAL.` },
      { numero: 2, texto: `[Texto de demonstração] Interface de leitura bíblica navegável com formatação, tipografia de alta legibilidade e ajuste de tamanho de fonte.` },
      { numero: 3, texto: `[Texto de demonstração] No aplicativo oficial BÍBLIA SAGRADA BH, o leitor conta com o texto bíblico integral e recursos completos.` },
      { numero: 4, texto: `[Texto de demonstração] Recursos de marcar versículos, adicionar anotações e ouvir a narração em áudio de alta fidelidade.` },
      { numero: 5, texto: `[Texto de demonstração] Guarde a Palavra em seu coração e compartilhe esta edificação com sua igreja e família.` }
    ]
  };

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb 
        items={[{ label: 'Bíblia Online' }]} 
        onNavigate={onNavigate} 
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A8A] text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-blue-400/40 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#E5C05B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Leitor Digital Interativo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Bíblia Online BH
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Navegue pelos livros do Antigo e Novo Testamento com capítulos e leitura responsiva.
          </p>
        </div>

        {/* Google Play App Callout */}
        <div className="flex items-center gap-2">
          <a
            href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Baixar App Completo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Demonstrative Notice Warning Box */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-900/50 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#E5C05B] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Aviso de Protótipo:</strong> Esta interface é um modelo navegável demonstrativo para a experiência visual do site BH DIGITAL. Por diretriz do projeto, textos bíblicos integrais são representados de forma demonstrativa, direcionando a experiência completa para o aplicativo oficial e futura integração com banco de dados.
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar: Books & Chapters Selection */}
        <div className="lg:col-span-4 bg-[#080E1B] rounded-2xl border border-slate-800 p-5 space-y-5">
          
          {/* Testament Switcher */}
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => {
                setTestamento('Antigo');
                const first = LIVROS_BIBLICOS.find(l => l.testamento === 'Antigo');
                if (first) {
                  setLivroSelecionado(first);
                  setCapituloSelecionado(1);
                }
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                testamento === 'Antigo'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Antigo Testamento (39)
            </button>
            <button
              onClick={() => {
                setTestamento('Novo');
                const first = LIVROS_BIBLICOS.find(l => l.testamento === 'Novo');
                if (first) {
                  setLivroSelecionado(first);
                  setCapituloSelecionado(1);
                }
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                testamento === 'Novo'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Novo Testamento (27)
            </button>
          </div>

          {/* Book Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar livro bíblico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Books List Grid */}
          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 pb-1">
              Livros Disponíveis
            </div>
            {livrosFiltrados.map((livro) => {
              const active = livro.id === livroSelecionado.id;
              return (
                <button
                  key={livro.id}
                  onClick={() => {
                    setLivroSelecionado(livro);
                    setCapituloSelecionado(1);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                    active
                      ? 'bg-[#1E3A8A]/50 text-[#E5C05B] border border-blue-800/60 font-bold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-mono text-[11px] text-slate-500">{livro.abreviacao}</span>
                    <span>{livro.nome}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{livro.capitulosCount} caps</span>
                </button>
              );
            })}
          </div>

          {/* Chapters Selector */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Capítulos de {livroSelecionado.nome}</span>
              <span className="text-[11px] text-[#E5C05B]">{livroSelecionado.capitulosCount} no total</span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 max-h-40 overflow-y-auto pr-1">
              {Array.from({ length: livroSelecionado.capitulosCount }, (_, i) => i + 1).map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapituloSelecionado(cap)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    capituloSelecionado === cap
                      ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Main Reader View */}
        <div className="lg:col-span-8 bg-[#080E1B] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* Reader Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                {livroSelecionado.grupo} • {testamento} Testamento
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {livroSelecionado.nome} {capituloSelecionado}
              </h2>
            </div>

            {/* Reading Toolbar */}
            <div className="flex items-center gap-2">
              {/* Audio Narration Toggle */}
              <button
                onClick={() => {
                  setIsPlayingAudio(!isPlayingAudio);
                  showToast(isPlayingAudio ? 'Áudio pausado' : 'Reproduzindo áudio demonstrativo');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isPlayingAudio
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Capítulo'}</span>
              </button>

              {/* Font Size controls */}
              <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-slate-400'}`}
                  title="Fonte Normal"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'large' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-slate-400'}`}
                  title="Fonte Grande"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded-lg ${fontSize === 'xlarge' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-slate-400'}`}
                  title="Fonte Muito Grande"
                >
                  A++
                </button>
              </div>

              {/* Share button */}
              <button
                onClick={() => showToast('Link de compartilhamento copiado para a área de transferência!')}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapter Title / Subtitle */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-xs font-semibold text-[#E5C05B]">
            {versiculosDemo.tituloCapitulo}
          </div>

          {/* Verses Container */}
          <div className={`space-y-4 text-slate-200 ${fontClasses[fontSize]}`}>
            {versiculosDemo.versiculos.map((v) => {
              const isFav = favoritos.includes(v.numero);
              return (
                <div 
                  key={v.numero}
                  className={`p-3 rounded-xl transition-all flex items-start gap-3 group ${
                    isFav 
                      ? 'bg-[#1E3A8A]/20 border border-blue-800/50' 
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <button
                    onClick={() => toggleFavorito(v.numero)}
                    className={`font-mono text-xs font-bold mt-1 px-1.5 py-0.5 rounded transition-colors ${
                      isFav 
                        ? 'text-slate-950 bg-[#E5C05B]' 
                        : 'text-[#E5C05B] group-hover:bg-slate-800'
                    }`}
                    title="Favoritar versículo"
                  >
                    {v.numero}
                  </button>

                  <p className="flex-1 font-serif-reading">
                    {v.texto}
                  </p>

                  <button
                    onClick={() => toggleFavorito(v.numero)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-[#E5C05B] ${
                      isFav ? 'opacity-100 text-[#E5C05B]' : ''
                    }`}
                    title="Salvar"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Chapter Pagination */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (capituloSelecionado > 1) {
                  setCapituloSelecionado(capituloSelecionado - 1);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }
              }}
              disabled={capituloSelecionado === 1}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-all"
            >
              ← Capítulo Anterior
            </button>

            <span className="text-xs text-slate-400 font-medium">
              Capítulo {capituloSelecionado} de {livroSelecionado.capitulosCount}
            </span>

            <button
              onClick={() => {
                if (capituloSelecionado < livroSelecionado.capitulosCount) {
                  setCapituloSelecionado(capituloSelecionado + 1);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }
              }}
              disabled={capituloSelecionado === livroSelecionado.capitulosCount}
              className="px-4 py-2 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-all"
            >
              Próximo Capítulo →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
