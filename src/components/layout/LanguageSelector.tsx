'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { LOCALES, SupportedLocale } from '@/lib/i18n/locales';

export function LanguageSelector({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentInfo = LOCALES[locale];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div className="w-full space-y-2 pt-2 pb-1 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Idioma / Language / Idioma</span>
        </div>
        <div className="grid grid-cols-3 gap-2 px-1">
          {(Object.keys(LOCALES) as SupportedLocale[]).map((loc) => {
            const item = LOCALES[loc];
            const isSelected = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#E5C05B] shadow-sm shadow-[#D4AF37]/10'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="text-sm">{item.flag}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#D4AF37]/40 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar idioma"
      >
        <span className="text-sm leading-none">{currentInfo.flag}</span>
        <span className="hidden xl:inline text-xs font-semibold">{currentInfo.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#D4AF37]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#080E1B]/98 backdrop-blur-2xl border border-slate-800 shadow-2xl py-1.5 z-50 animate-fadeIn"
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 1px 1px rgba(212,175,55,0.15)',
          }}
        >
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] border-b border-slate-800/80">
            Selecione o Idioma
          </div>
          <div className="py-1">
            {(Object.keys(LOCALES) as SupportedLocale[]).map((loc) => {
              const item = LOCALES[loc];
              const isSelected = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 text-[#E5C05B] font-bold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span>{item.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E5C05B]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
