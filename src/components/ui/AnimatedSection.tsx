'use client';

import React, { useEffect, useRef, ReactNode, CSSProperties, ElementType } from 'react';

/**
 * AnimatedSection — scroll-reveal com fade + translateY suave.
 * Usa Intersection Observer nativo, sem dependência externa.
 * Respeita prefers-reduced-motion.
 */
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number; // ms
  threshold?: number; // 0-1
  as?: ElementType;
}

export function AnimatedSection({
  children,
  className = '',
  style,
  delay = 0,
  threshold = 0.08,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Initial hidden state
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
