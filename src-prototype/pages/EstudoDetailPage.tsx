import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Check, 
  Copy,
  ChevronRight
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, EstudoItem } from '../types';

interface EstudoDetailPageProps {
  estudo: EstudoItem;
  onNavigate: (route: PageRoute) => void;
}

export const EstudoDetailPage: React.FC<EstudoDetailPageProps> = ({ estudo, onNavigate }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Estudos Bíblicos', route: '/estudos' },
          { label: estudo.categoria, route: `/estudos` },
          { label: estudo.titulo }
        ]}
        onNavigate={onNavigate}
      />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/estudos')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para todos os estudos</span>
      </button>

      {/* Study Header Container */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
            {estudo.categoria}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            {estudo.referencia}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {estudo.titulo}
        </h1>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{estudo.autor}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{estudo.data}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{estudo.tempoLeitura} de leitura</span>
            </div>
          </div>

          {/* Action buttons: Favoritar & Compartilhar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isFavorited
                  ? 'bg-[#E5C05B] text-slate-950 border-[#E5C05B]'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isFavorited ? 'Favoritado' : 'Favoritar'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Header Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 h-72 sm:h-96 w-full shadow-2xl relative">
        <img
          src={estudo.imagem}
          alt={estudo.titulo}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060B16] via-transparent to-transparent opacity-60" />
      </div>

      {/* Biblical Reference Callout Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 to-slate-900 border-l-4 border-[#D4AF37] border-y border-r border-slate-800 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#E5C05B]">
          Passagem Base
        </div>
        <div className="text-lg sm:text-xl font-bold text-white">
          {estudo.referencia}
        </div>
        <p className="text-sm text-slate-300 italic">
          "{estudo.resumo}"
        </p>
      </div>

      {/* Main Rich Content */}
      <div className={`space-y-6 text-slate-200 leading-relaxed font-normal ${
        fontSize === 'large' ? 'text-lg sm:text-xl leading-loose' : 'text-base sm:text-lg leading-relaxed'
      }`}>
        {estudo.conteudo.map((paragrafo, index) => (
          <p key={index} className="text-slate-300">
            {paragrafo}
          </p>
        ))}

        {/* Demonstrative Study Outline Box */}
        <div className="mt-8 p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E5C05B]" />
            <span>Perguntas para Reflexão e Aplicação</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
            <li>Como esta verdade bíblica desafia suas prioridades na semana atual?</li>
            <li>De que forma você pode aplicar este princípio no seu lar ou no seu trabalho?</li>
            <li>Qual oração específica nasce no seu coração a partir deste texto sagrado?</li>
          </ul>
        </div>
      </div>

      {/* Footer Share and Bottom Navigation */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500">
          Publicado pela equipe editorial BH DIGITAL • Conteúdo demonstrativo
        </div>

        <button
          onClick={() => onNavigate('/estudos')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700 transition-colors"
        >
          Ver outros estudos bíblicos →
        </button>
      </div>

    </div>
  );
};
