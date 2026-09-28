'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * PremiumPageBackground
 *
 * Reutilizável em todas as páginas internas.
 * Cada "variant" tem sua própria personalidade visual,
 * mas todas pertencem ao mesmo sistema do BH DIGITAL.
 *
 * Variants:
 *  - 'licoes'      → educacional, dourado discreto, linhas horizontais
 *  - 'estudos'     → biblioteca, mesh gradient azul-dourado
 *  - 'devocionais' → contemplativo, luz suave central
 *  - 'livros'      → editorial premium, profundidade
 *  - 'materiais'   → tecnológico, grid sutil
 *  - 'ferramentas' → geométrico, linhas técnicas
 *  - 'conteudos'   → editorial moderno
 *  - 'default'     → azul-marinho neutro
 */
export type PageBgVariant =
  | 'licoes'
  | 'estudos'
  | 'devocionais'
  | 'livros'
  | 'materiais'
  | 'ferramentas'
  | 'conteudos'
  | 'default';

interface PremiumPageBackgroundProps {
  variant?: PageBgVariant;
}

const VARIANT_CONFIG: Record<
  PageBgVariant,
  {
    baseGradient: string;
    accentGlow: string;
    accentGlow2?: string;
    particleCount: number;
    showGrid: boolean;
    showLines: boolean;
    showOrbs: boolean;
  }
> = {
  licoes: {
    baseGradient: 'linear-gradient(160deg, #050B18 0%, #06101F 50%, #050A16 100%)',
    accentGlow: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(212,175,55,0.07) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 40% 30% at 10% 80%, rgba(30,58,138,0.1) 0%, transparent 70%)',
    particleCount: 18,
    showGrid: false,
    showLines: true,
    showOrbs: true,
  },
  estudos: {
    baseGradient: 'linear-gradient(145deg, #050A18 0%, #060C1E 40%, #050916 100%)',
    accentGlow: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(30,58,138,0.12) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 50% 40% at 85% 70%, rgba(212,175,55,0.06) 0%, transparent 70%)',
    particleCount: 20,
    showGrid: false,
    showLines: false,
    showOrbs: true,
  },
  devocionais: {
    baseGradient: 'linear-gradient(180deg, #050814 0%, #060B1C 50%, #040810 100%)',
    accentGlow: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.09) 0%, rgba(212,175,55,0.03) 50%, transparent 75%)',
    accentGlow2: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(30,58,138,0.08) 0%, transparent 70%)',
    particleCount: 14,
    showGrid: false,
    showLines: false,
    showOrbs: true,
  },
  livros: {
    baseGradient: 'linear-gradient(135deg, #050A17 0%, #06101E 45%, #050B18 100%)',
    accentGlow: 'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(30,58,138,0.12) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 50% 40% at 75% 60%, rgba(212,175,55,0.07) 0%, transparent 70%)',
    particleCount: 16,
    showGrid: false,
    showLines: false,
    showOrbs: true,
  },
  materiais: {
    baseGradient: 'linear-gradient(150deg, #050B18 0%, #060D1F 50%, #050916 100%)',
    accentGlow: 'radial-gradient(ellipse 50% 40% at 20% 20%, rgba(30,58,138,0.1) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 40% 35% at 80% 80%, rgba(212,175,55,0.06) 0%, transparent 70%)',
    particleCount: 12,
    showGrid: true,
    showLines: false,
    showOrbs: false,
  },
  ferramentas: {
    baseGradient: 'linear-gradient(140deg, #050916 0%, #060D1E 45%, #040A14 100%)',
    accentGlow: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(30,58,138,0.12) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 40% 35% at 15% 70%, rgba(212,175,55,0.06) 0%, transparent 70%)',
    particleCount: 15,
    showGrid: true,
    showLines: false,
    showOrbs: false,
  },
  conteudos: {
    baseGradient: 'linear-gradient(155deg, #050A18 0%, #060C1C 50%, #050916 100%)',
    accentGlow: 'radial-gradient(ellipse 55% 45% at 60% 25%, rgba(30,58,138,0.1) 0%, transparent 70%)',
    accentGlow2: 'radial-gradient(ellipse 45% 35% at 25% 75%, rgba(212,175,55,0.06) 0%, transparent 70%)',
    particleCount: 14,
    showGrid: false,
    showLines: false,
    showOrbs: true,
  },
  default: {
    baseGradient: 'linear-gradient(160deg, #050816 0%, #060B16 50%, #050816 100%)',
    accentGlow: 'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(30,58,138,0.08) 0%, transparent 70%)',
    particleCount: 12,
    showGrid: false,
    showLines: false,
    showOrbs: false,
  },
};

/* ── Tiny particle dot ─────────────────────────────────────────────────── */
interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  da: number;
}

function useSubtleParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, count: number, enabled: boolean) {
  const animRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    dotsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.1 + 0.03),
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.25 + 0.05,
      da: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.alpha += d.da;
        if (d.alpha > 0.28 || d.alpha < 0.03) d.da *= -1;
        if (d.y < -5) { d.y = canvas.height + 5; d.x = Math.random() * canvas.width; }
        if (d.x < -5) d.x = canvas.width + 5;
        if (d.x > canvas.width + 5) d.x = -5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${d.alpha.toFixed(3)})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [enabled, count, canvasRef]);
}

export function PremiumPageBackground({ variant = 'default' }: PremiumPageBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const cfg = VARIANT_CONFIG[variant];
  const particlesEnabled = mounted && !reducedMotion;
  useSubtleParticles(canvasRef, cfg.particleCount, particlesEnabled);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: cfg.baseGradient }} />

      {/* Accent glow 1 */}
      <div
        className="absolute inset-0"
        style={{ background: cfg.accentGlow, mixBlendMode: 'screen' }}
      />

      {/* Accent glow 2 */}
      {cfg.accentGlow2 && (
        <div
          className="absolute inset-0"
          style={{ background: cfg.accentGlow2, mixBlendMode: 'screen' }}
        />
      )}

      {/* Floating orbs */}
      {cfg.showOrbs && !reducedMotion && (
        <>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 480,
              height: 480,
              top: '-10%',
              right: '-8%',
              background: 'radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'glowPulse 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 360,
              height: 360,
              bottom: '5%',
              left: '-5%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'glowPulse 16s ease-in-out infinite reverse',
            }}
          />
        </>
      )}

      {/* Subtle grid for materiais/ferramentas */}
      {cfg.showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30,58,138,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30,58,138,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Horizontal lines for licoes */}
      {cfg.showLines && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[20, 35, 55, 70, 85].map((pct) => (
            <div
              key={pct}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${pct}%`,
                background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.04) 30%, rgba(212,175,55,0.08) 50%, rgba(212,175,55,0.04) 70%, transparent 100%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Particle canvas */}
      {particlesEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.7 }}
        />
      )}

      {/* Bottom vignette fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,8,22,0.4) 0%, transparent 100%)' }}
      />
    </div>
  );
}
