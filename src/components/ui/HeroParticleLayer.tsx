'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDelta: number;
  layer: number; // 1 = far (small/slow), 2 = mid, 3 = near (larger/faster)
}

const PARTICLE_COUNT = 38;
const GOLD_COLORS = ['rgba(212,175,55,', 'rgba(229,192,91,', 'rgba(197,155,39,', 'rgba(245,215,110,'];

export function HeroParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const layer = Math.ceil(Math.random() * 3) as 1 | 2 | 3;
        const speed = layer === 1 ? 0.08 : layer === 2 ? 0.14 : 0.22;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: -(Math.random() * speed + 0.04),
          size: layer === 1 ? Math.random() * 1.2 + 0.4 : layer === 2 ? Math.random() * 1.8 + 0.8 : Math.random() * 2.4 + 1.2,
          opacity: Math.random() * 0.35 + 0.05,
          opacityDelta: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
          layer,
        };
      });
    };
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDelta;

        if (p.opacity > 0.4 || p.opacity < 0.03) p.opacityDelta *= -1;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        // Draw particle
        const colorIdx = Math.floor(p.x * 4 / (canvas.width + 1));
        const color = GOLD_COLORS[Math.min(colorIdx, GOLD_COLORS.length - 1)];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${p.opacity.toFixed(2)})`;
        ctx.fill();

        // Soft glow for near-layer particles
        if (p.layer === 3) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          grad.addColorStop(0, `rgba(212,175,55,${(p.opacity * 0.4).toFixed(2)})`);
          grad.addColorStop(1, 'rgba(212,175,55,0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 4 }}
    />
  );
}
