'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  BookOpen, Bookmark, Volume2, VolumeX, Search, ChevronRight, Share2, Info, Smartphone, ExternalLink, Check, BookmarkMinus, Copy
} from 'lucide-react';
import { LivroBiblico } from '@/types';
import { LIVROS_BIBLICOS } from '@/lib/mockData';
import bibliaDataRaw from '@/lib/data/biblia_full.json';

const bibliaData = bibliaDataRaw as Record<string, Record<string, { numero: number; texto: string }[]>>;


export type BookmarkItem = {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  createdAt: number;
};

export type SearchResult = {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
};

export function BibliaClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [testamento, setTestamento] = useState<'Antigo' | 'Novo'>('Antigo');
  const [livroSelecionado, setLivroSelecionado] = useState<LivroBiblico>(LIVROS_BIBLICOS[0]);
  const [capituloSelecionado, setCapituloSelecionado] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [favoritos, setFavoritos] = useState<BookmarkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem('@BHDigital:Bookmarks');
    if (saved) {
      try { setFavoritos(JSON.parse(saved)); } catch (e) {}
    }
    synthRef.current = window.speechSynthesis;
    
    // Parse URL on mount
    const bookParam = searchParams.get('livro');
    const capParam = searchParams.get('capitulo');
    const verseParam = searchParams.get('versiculo');
    
    if (bookParam) {
      const book = LIVROS_BIBLICOS.find(l => l.id === bookParam || l.bookNumber === Number(bookParam));
      if (book) {
        setLivroSelecionado(book);
        setTestamento(book.testamento);
        if (capParam) setCapituloSelecionado(Number(capParam));
        if (verseParam) {
          setHighlightedVerse(Number(verseParam));
          setTimeout(() => {
            const el = document.getElementById(`verse-${verseParam}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 500);
        }
      }
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('@BHDigital:Bookmarks', JSON.stringify(favoritos));
  }, [favoritos]);
  
  const updateUrl = (bookId: string, cap: number) => {
    const newUrl = `/biblia?livro=${bookId}&capitulo=${cap}`;
    window.history.replaceState(null, '', newUrl);
  };

  const handleBookSelect = (livro: LivroBiblico, cap: number = 1) => {
    setLivroSelecionado(livro);
    setTestamento(livro.testamento);
    setCapituloSelecionado(cap);
    setHighlightedVerse(null);
    updateUrl(livro.id, cap);
    stopAudio();
  };

  const handleCapituloSelect = (cap: number) => {
    setCapituloSelecionado(cap);
    setHighlightedVerse(null);
    updateUrl(livroSelecionado.id, cap);
    stopAudio();
    
  };

  const isFavorito = (num: number) => {
    return favoritos.some(f => f.bookId === livroSelecionado.id && f.chapter === capituloSelecionado && f.verse === num);
  };

  const toggleFavorito = (num: number, texto: string) => {
    if (isFavorito(num)) {
      setFavoritos(favoritos.filter(f => !(f.bookId === livroSelecionado.id && f.chapter === capituloSelecionado && f.verse === num)));
      showToast(`Versículo ${num} removido dos marcadores.`);
    } else {
      setFavoritos([...favoritos, {
        bookId: livroSelecionado.id,
        bookName: livroSelecionado.nome,
        chapter: capituloSelecionado,
        verse: num,
        text: texto,
        createdAt: Date.now()
      }]);
      showToast(`Versículo ${num} marcado com sucesso!`);
    }
  };


  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (!synthRef.current) return;
    
    if (isPlayingAudio) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
      showToast('Áudio parado');
      return;
    }
    
    const textoCompleto = versiculosCapitulo.map(v => v.texto).join('. ');
    const utterance = new SpeechSynthesisUtterance(textoCompleto);
    utterance.lang = 'pt-BR';
    utterance.onend = () => setIsPlayingAudio(false);
    utteranceRef.current = utterance;
    
    synthRef.current.speak(utterance);
    setIsPlayingAudio(true);
    showToast(`Reproduzindo áudio: ${livroSelecionado.nome} ${capituloSelecionado}`);
  };

  const handleShare = async (verseNum?: number, verseText?: string) => {
    const url = `${window.location.origin}/biblia?livro=${livroSelecionado.id}&capitulo=${capituloSelecionado}${verseNum ? `&versiculo=${verseNum}` : ''}`;
    
    let text = `${livroSelecionado.nome} ${capituloSelecionado}\n`;
    if (verseNum && verseText) {
        text = `${livroSelecionado.nome} ${capituloSelecionado}:${verseNum}\n"${verseText}"\n\nBÍBLIA SAGRADA BH`;
    } else {
        text += `Leia no BH DIGITAL: ${url}`;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bíblia Sagrada BH',
          text: text,
          url: url,
        });
        return;
      } catch (err) {}
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copiado para a área de transferência!');
    } catch(e) {
        showToast('Erro ao copiar.');
    }
  };

  const executeSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const results: SearchResult[] = [];
    
    // Check reference format "João 3:16" or "Mateus 1"
    const refMatch = term.match(/([a-zA-Zãáéíóúçê\s]+)\s*(\d+)?(?:[:\s]+(\d+))?/i);
    let handledAsRef = false;
    
    if (refMatch) {
        const [, bookStr, capStr, verStr] = refMatch;
        const bname = bookStr.trim().toLowerCase();
        const book = LIVROS_BIBLICOS.find(l => l.nome.toLowerCase() === bname || l.abreviacao.toLowerCase() === bname);
        
        if (book) {
            handledAsRef = true;
            const cap = capStr ? Math.min(Number(capStr), book.capitulosCount) : 1;
            const ver = verStr ? Number(verStr) : null;
            
            handleBookSelect(book, cap);
            if (ver) {
               setHighlightedVerse(ver);
               setTimeout(() => {
                 document.getElementById(`verse-${ver}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
               }, 500);
            }
            setSearchTerm('');
            setIsSearching(false);
            return;
        }
    }
    
    // Text search fallback
    const lterm = term.toLowerCase();
    for (const book of LIVROS_BIBLICOS) {
        const bookData = bibliaData[String(book.bookNumber)];
        if (!bookData) continue;
        
        for (let cap = 1; cap <= book.capitulosCount; cap++) {
            const verses = bookData[String(cap)];
            if (!verses) continue;
            
            for (const v of verses) {
                if (v.texto.toLowerCase().includes(lterm)) {
                    results.push({
                        bookId: book.id,
                        bookName: book.nome,
                        chapter: cap,
                        verse: v.numero,
                        text: v.texto
                    });
                    if (results.length >= 50) break;
                }
            }
            if (results.length >= 50) break;
        }
        if (results.length >= 50) break;
    }
    
    setSearchResults(results);
  };

  const livrosFiltrados = LIVROS_BIBLICOS.filter(l => {
    const matchesTestamento = l.testamento === testamento;
    const matchesSearch = l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.abreviacao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTestamento && matchesSearch;
  });

  const bookNumStr = String(livroSelecionado.bookNumber || 1);
  const capNumStr = String(capituloSelecionado);
  const versiculosCapitulo = bibliaData[bookNumStr]?.[capNumStr] || [];
  const tituloCapitulo = `${livroSelecionado.nome} ${capituloSelecionado} — João Ferreira de Almeida`;

  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">Bíblia Online</span>
      </nav>

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
            <span>Leitor Digital Interativo Integral</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Bíblia Online BH
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Texto bíblico completo (66 livros). Baseado na tradição da versão João Ferreira de Almeida — edição histórica de domínio público.
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

      {/* Info Notice Box */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-900/50 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#E5C05B] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Tradução Bíblica:</strong> João Ferreira de Almeida Revista e Corrigida (Domínio Público). Texto integral de 66 livros disponível para leitura e estudo no BH Digital.
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
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${testamento === 'Antigo'
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
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${testamento === 'Novo'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
                }`}
            >
              Novo Testamento (27)
            </button>
          </div>

          {/* Book / Text Search */}
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar livro, capítulo ou palavra..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value === '') {
                     setIsSearching(false);
                     setSearchResults([]);
                  }
                }}
                onKeyDown={(e) => e.key === 'Enter' && executeSearch(searchTerm)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button 
              onClick={() => executeSearch(searchTerm)}
              className="bg-[#1E3A8A] hover:bg-blue-700 text-white p-2 rounded-xl border border-blue-800 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
          
          {/* Toggle Bookmarks */}
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowBookmarks(!showBookmarks)} className="text-xs text-[#E5C05B] flex items-center gap-1 hover:underline">
              {showBookmarks ? <BookOpen className="w-3.5 h-3.5"/> : <Bookmark className="w-3.5 h-3.5"/>}
              {showBookmarks ? 'Voltar aos Livros' : `Meus Marcadores (${favoritos.length})`}
            </button>
          </div>

          {/* Search Results / Bookmarks / Books List */}
          {isSearching && searchTerm.trim() !== '' ? (
             <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-1 pb-1">
                  Resultados Textuais ({searchResults.length}{searchResults.length === 50 ? '+' : ''})
                </div>
                {searchResults.length === 0 ? (
                   <p className="text-xs text-slate-400 p-2">Nenhum resultado encontrado.</p>
                ) : (
                   searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => {
                           const b = LIVROS_BIBLICOS.find(l => l.id === res.bookId);
                           if (b) {
                             handleBookSelect(b, res.chapter);
                             setHighlightedVerse(res.verse);
                             setTimeout(() => {
                               document.getElementById(`verse-${res.verse}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                             }, 500);
                           }
                        }}
                        className="w-full text-left p-3 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 transition-all"
                      >
                         <div className="text-[#E5C05B] text-[11px] font-bold mb-1">{res.bookName} {res.chapter}:{res.verse}</div>
                         <div className="text-slate-300 text-xs line-clamp-2">{res.text}</div>
                      </button>
                   ))
                )}
             </div>
          ) : showBookmarks ? (
             <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-1 pb-1 flex justify-between">
                  <span>Meus Marcadores</span>
                  <button onClick={() => { if(confirm('Remover todos?')) setFavoritos([])}} className="text-slate-500 hover:text-red-400">Limpar</button>
                </div>
                {favoritos.length === 0 ? (
                   <p className="text-xs text-slate-400 p-2">Nenhum versículo marcado.</p>
                ) : (
                   [...favoritos].sort((a,b) => b.createdAt - a.createdAt).map((fav, i) => (
                      <div key={i} className="group relative w-full text-left p-3 bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-800 transition-all">
                         <button 
                           onClick={() => {
                             const b = LIVROS_BIBLICOS.find(l => l.id === fav.bookId);
                             if (b) {
                               handleBookSelect(b, fav.chapter);
                               setHighlightedVerse(fav.verse);
                               setTimeout(() => {
                                 document.getElementById(`verse-${fav.verse}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                               }, 500);
                             }
                           }}
                           className="block w-full text-left pr-6"
                         >
                            <div className="text-[#E5C05B] text-[11px] font-bold mb-1">{fav.bookName} {fav.chapter}:{fav.verse}</div>
                            <div className="text-slate-300 text-xs line-clamp-2">{fav.text}</div>
                         </button>
                         <button 
                           onClick={(e) => { e.stopPropagation(); setFavoritos(favoritos.filter(f => f.createdAt !== fav.createdAt)); }}
                           className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 bg-slate-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                           title="Remover marcador"
                         >
                           <BookmarkMinus className="w-3.5 h-3.5" />
                         </button>
                      </div>
                   ))
                )}
             </div>
          ) : (
          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1 pb-1">
              Livros Disponíveis ({livrosFiltrados.length})
            </div>
            {livrosFiltrados.map((livro) => {
              const active = livro.id === livroSelecionado.id;
              return (
                <button
                  key={livro.id}
                  onClick={() => {
                    handleBookSelect(livro, 1);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${active
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

          )}

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
                  onClick={() => handleCapituloSelect(cap)}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${capituloSelecionado === cap
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
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${isPlayingAudio
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                  }`}
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Parar Áudio' : 'Ouvir Capítulo'}</span>
              </button>

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

              <button
                onClick={() => handleShare()}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapter Title / Subtitle */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-xs font-semibold text-[#E5C05B]">
            {tituloCapitulo}
          </div>

          {/* Verses Container */}
          <div className={`space-y-4 text-slate-200 ${fontClasses[fontSize]}`}>
            {versiculosCapitulo.length > 0 ? (
              versiculosCapitulo.map((v) => {
                const isFav = isFavorito(v.numero);
                const isHighlighted = highlightedVerse === v.numero;
                return (
                  <div
                    key={v.numero}
                    id={`verse-${v.numero}`}
                    className={`p-3 rounded-xl transition-all flex items-start gap-3 group ${
                        isHighlighted ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50 shadow-inner' :
                        isFav
                        ? 'bg-[#1E3A8A]/20 border border-blue-800/50'
                        : 'hover:bg-slate-900/60 border border-transparent'
                      }`}
                  >
                    <button
                      onClick={() => toggleFavorito(v.numero, v.texto)}
                      className={`font-mono text-xs font-bold mt-1 px-1.5 py-0.5 rounded transition-colors ${isFav
                          ? 'text-slate-950 bg-[#E5C05B]'
                          : 'text-[#E5C05B] group-hover:bg-slate-800'
                        }`}
                      title={isFav ? "Remover marcador" : "Marcar versículo"}
                    >
                      {v.numero}
                    </button>

                    <p className="flex-1">
                      {v.texto}
                    </p>

                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFavorito(v.numero, v.texto)}
                          className={`p-1.5 text-slate-400 hover:text-[#E5C05B] rounded-lg hover:bg-slate-800 ${isFav ? 'opacity-100 text-[#E5C05B]' : ''}`}
                          title="Salvar"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(v.numero, v.texto)}
                          className={`p-1.5 text-slate-400 hover:text-[#E5C05B] rounded-lg hover:bg-slate-800`}
                          title="Compartilhar versículo"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                Carregando versículos...
              </div>
            )}
          </div>

          {/* Contextual Study Actions */}
          <div className="py-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/estudos"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white transition-all text-sm font-semibold group"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Estudar este capítulo</span>
            </Link>
            <button
              onClick={() => showToast('Abrindo comentários exegéticos... (Em breve)')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white transition-all text-sm font-semibold group"
            >
              <Info className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Ver contexto</span>
            </button>
            <Link
              href="/devocionais"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-white transition-all text-sm font-semibold group"
            >
              <Check className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Reflexão Diária</span>
            </Link>
          </div>

          {/* Bottom Chapter Pagination */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (capituloSelecionado > 1) {
                  handleCapituloSelect(capituloSelecionado - 1);
                  
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
                  handleCapituloSelect(capituloSelecionado + 1);
                  
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
}
