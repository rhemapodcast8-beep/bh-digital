'use client';

import { ReactNode } from 'react';

/**
 * PageHero — hero compacto para páginas internas.
 *
 * Cada página tem sua própria cor de acento, ícone e decoração,
 * mas compartilha o mesmo layout e linguagem visual.
 */
interface PageHeroProps {
  badge?: string;
  title: string;
  description?: string;
  accentColor?: string;      // Tailwind inline ou hex
  children?: ReactNode;
  decorationVariant?: 'dots' | 'lines' | 'cross' | 'none';
}

const GOLD = '#D4AF37';
const GOLD_LIGHT = '#E5C05B';

export function PageHero({
  badge,
  title,
  description,
  accentColor = GOLD,
  children,
  decorationVariant = 'dots',
}: PageHeroProps) {
  return (
    <div className="relative py-10 sm:py-14 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-x-0 top-0 h-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 0%, rgba(30,58,138,0.12) 0%, transparent 70%)`,
        }}
      />
      {/* Top border line — gold gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor}44 25%, ${accentColor}88 50%, ${accentColor}44 75%, transparent 100%)`,
        }}
      />

      {/* Decorative elements */}
      {decorationVariant === 'dots' && (
        <div
          aria-hidden="true"
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2.5 pointer-events-none"
        >
          {[0, 1, 2, 3, 4].map((row) => (
            <div key={row} className="flex gap-2.5">
              {[0, 1, 2, 3].map((col) => (
                <div
                  key={col}
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: accentColor,
                    opacity: 0.08 + (row + col) * 0.02,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {decorationVariant === 'lines' && (
        <div
          aria-hidden="true"
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-px mb-4"
              style={{
                width: 80 - i * 16,
                background: accentColor,
                opacity: 0.12 - i * 0.02,
              }}
            />
          ))}
        </div>
      )}

      {decorationVariant === 'cross' && (
        <div
          aria-hidden="true"
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center pointer-events-none"
          style={{ width: 48, height: 48 }}
        >
          {/* Horizontal */}
          <div className="absolute w-12 h-px" style={{ background: accentColor, opacity: 0.15 }} />
          {/* Vertical */}
          <div className="absolute w-px h-12" style={{ background: accentColor, opacity: 0.15 }} />
          {/* Center dot */}
          <div className="w-2 h-2 rounded-full" style={{ background: accentColor, opacity: 0.2 }} />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {badge && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border"
              style={{
                color: GOLD_LIGHT,
                borderColor: `${GOLD}50`,
                background: `${GOLD}12`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: accentColor }}
              />
              {badge}
            </div>
          )}

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {title}
          </h1>

          {description && (
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}

          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(30,58,138,0.3) 30%, rgba(30,58,138,0.5) 50%, rgba(30,58,138,0.3) 70%, transparent 100%)',
        }}
      />
    </div>
  );
}
