'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { HeroParticleLayer } from './HeroParticleLayer';

interface MousePosition {
  x: number;
  y: number;
}

export function AnimatedHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const targetRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Lerped parallax state applied via transform
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const bibleLayerRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -1..1 from center
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const LERP_FACTOR = 0.04;

    const tick = () => {
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, LERP_FACTOR);
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, LERP_FACTOR);

      const { x, y } = mouseRef.current;

      // Background: very subtle movement (furthest layer)
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate(${x * 6}px, ${y * 4}px) scale(1.04)`;
      }
      // Bible: mid-speed movement
      if (bibleLayerRef.current) {
        bibleLayerRef.current.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
      }
      // Glow: follows bible, slightly delayed
      if (glowLayerRef.current) {
        glowLayerRef.current.style.transform = `translate(${x * 10}px, ${y * 7}px)`;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [reducedMotion, handleMouseMove]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── LAYER 1: Deep gradient base ──────────────────────────────────── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background: 'linear-gradient(135deg, #050816 0%, #060d1f 40%, #07111f 70%, #050810 100%)',
          zIndex: 1,
        }}
      />

      {/* ── LAYER 2: Bible image with slow zoom + parallax ───────────────── */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          zIndex: 2,
          transition: reducedMotion ? 'none' : undefined,
        }}
      >
        <Image
          src="/images/bible-hero-bg.jpg"
          alt="Bíblia Sagrada — background cinematográfico"
          fill
          priority
          quality={85}
          className="object-cover object-center select-none"
          style={{
            opacity: 0.22,
            mixBlendMode: 'luminosity',
            filter: 'saturate(0.7) contrast(1.1)',
            animation: reducedMotion ? 'none' : 'bibleSlowZoom 30s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* ── LAYER 3: Golden glow behind Bible ────────────────────────────── */}
      <div
        ref={glowLayerRef}
        className="absolute will-change-transform pointer-events-none"
        style={{
          zIndex: 3,
          top: '5%',
          left: '45%',
          width: '55%',
          height: '90%',
          background: 'radial-gradient(ellipse 60% 70% at 60% 50%, rgba(212,175,55,0.11) 0%, rgba(212,175,55,0.05) 45%, transparent 75%)',
          filter: 'blur(40px)',
          animation: reducedMotion ? 'none' : 'glowPulse 8s ease-in-out infinite',
        }}
      />

      {/* ── LAYER 3b: Bible floating element (parallax) ──────────────────── */}
      <div
        ref={bibleLayerRef}
        className="absolute will-change-transform pointer-events-none hidden sm:block"
        style={{
          zIndex: 3,
          top: '-5%',
          right: '-5%',
          width: '60%',
          height: '110%',
          opacity: 0.12,
          filter: 'blur(0px) drop-shadow(0 0 80px rgba(212,175,55,0.25))',
          animation: reducedMotion ? 'none' : 'bibleDrift 20s ease-in-out infinite alternate',
        }}
      >
        <Image
          src="/images/bible-hero-bg.jpg"
          alt=""
          fill
          quality={60}
          className="object-contain object-center select-none"
          style={{ filter: 'saturate(0.5) brightness(0.7)' }}
        />
      </div>

      {/* ── LAYER 4: Particle canvas ──────────────────────────────────────── */}
      <HeroParticleLayer />

      {/* ── LAYER 5: Light rays (subtle) ──────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 5,
          top: '-20%',
          left: '35%',
          width: '500px',
          height: '700px',
          background: 'conic-gradient(from 270deg at 50% 0%, transparent 0deg, rgba(212,175,55,0.03) 15deg, transparent 30deg)',
          transform: 'translateX(-50%)',
          animation: reducedMotion ? 'none' : 'lightRayDrift 25s linear infinite',
          filter: 'blur(8px)',
        }}
      />

      {/* ── LAYER 5b: Blue accent glow left ──────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 5,
          top: '10%',
          left: '-10%',
          width: '50%',
          height: '80%',
          background: 'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(30,58,138,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── LAYER 6: Cinematic vignette + dark overlay ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, transparent 30%, rgba(5,8,22,0.55) 100%),
            linear-gradient(to bottom, rgba(5,8,22,0.3) 0%, rgba(5,8,22,0.1) 40%, rgba(5,8,22,0.6) 100%)
          `,
        }}
      />

      {/* ── Animated gold horizontal accent line ─────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 5,
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 30%, rgba(229,192,91,0.5) 50%, rgba(212,175,55,0.3) 70%, transparent 100%)',
          animation: reducedMotion ? 'none' : 'borderGlow 4s ease-in-out infinite',
        }}
      />
    </div>
  );
}
