'use client';

import { useState } from 'react';
import { Printer, Share2, Check, ZoomIn, ZoomOut, BookOpen, ExternalLink } from 'lucide-react';

interface LicaoActionBarProps {
  titulo: string;
  referencia: string;
  linkFonteExterna?: string;
}

export function LicaoActionBar({ titulo, referencia, linkFonteExterna }: LicaoActionBarProps) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${titulo} | Lições Bíblicas - BH DIGITAL`,
          text: `Confira este estudo bíblico: ${titulo} (${referencia})`,
          url,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleFontSize = () => {
    const root = document.getElementById('licao-reading-container');
    if (!root) return;

    if (fontSize === 'normal') {
      root.classList.remove('licao-text-xlarge');
      root.classList.add('licao-text-large');
      setFontSize('large');
    } else if (fontSize === 'large') {
      root.classList.remove('licao-text-large');
      root.classList.add('licao-text-xlarge');
      setFontSize('xlarge');
    } else {
      root.classList.remove('licao-text-large', 'licao-text-xlarge');
      setFontSize('normal');
    }
  };

  return (
    <div className="no-print sticky top-24 z-30 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#070D18]/90 backdrop-blur-xl border border-slate-800 shadow-xl">
      <div className="flex items-center gap-2 text-xs text-slate-300">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-bold text-[#E5C05B]">
          <BookOpen className="w-4 h-4" />
          <span>Ferramentas de Estudo</span>
        </span>
        {linkFonteExterna && (
          <a
            href={linkFonteExterna}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white hover:border-[#D4AF37]/50 transition-colors text-[11px]"
            title="Conferir lição na fonte oficial da CPAD"
          >
            <span>Fonte Oficial CPAD</span>
            <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
          </a>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Ajuste de Tamanho da Fonte */}
        <button
          onClick={toggleFontSize}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Alternar tamanho da fonte para leitura confortável"
          aria-label="Ajustar tamanho da fonte"
        >
          {fontSize === 'xlarge' ? (
            <ZoomOut className="w-3.5 h-3.5 text-[#D4AF37]" />
          ) : (
            <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
          )}
          <span className="font-mono text-[11px]">
            {fontSize === 'normal' && 'Texto Padrão'}
            {fontSize === 'large' && 'Texto Médio'}
            {fontSize === 'xlarge' && 'Texto Grande'}
          </span>
        </button>

        {/* Compartilhar */}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
          title="Compartilhar lição bíblica"
          aria-label="Compartilhar lição"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-[11px]">Link copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px]">Compartilhar</span>
            </>
          )}
        </button>

        {/* Imprimir / Salvar PDF */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs hover:brightness-110 shadow-md transition-all cursor-pointer"
          title="Imprimir ou exportar lição completa em PDF"
          aria-label="Imprimir ou exportar lição em PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / PDF</span>
        </button>
      </div>
    </div>
  );
}
