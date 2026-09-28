import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import { MOCK_DEVOCIONAIS } from '@/lib/data/devocionais';
import { Pagination } from '@/components/ui/Pagination';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Devocionais',
  description: 'Mensagens curtas diárias para reflexão e renovação espiritual baseadas nas Sagradas Escrituras.',
};

function formatDatePtBR(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date);
}

const ITEMS_PER_PAGE = 12;

export default async function DevocionalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  let todayIndex = MOCK_DEVOCIONAIS.findIndex(d => d.data === todayStr);
  if (todayIndex === -1) todayIndex = 0;

  const destaque = MOCK_DEVOCIONAIS[todayIndex];
  const todosAnteriores = MOCK_DEVOCIONAIS.slice(0, todayIndex).reverse();
  const totalItems = todosAnteriores.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const anteriores = todosAnteriores.slice(startIndex, endIndex);

  return (
    <>
      <PremiumPageBackground variant="devocionais" />

      <div className="page-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">

        {/* ── Page Hero ── */}
        <PageHero
          badge="Inspiração para o Seu Dia"
          title="DEVOCIONAIS"
          description="Mensagens curtas e reflexivas para renovação espiritual diária, baseadas nas Sagradas Escrituras."
          accentColor="#D4AF37"
          decorationVariant="cross"
        />

        {/* ── Devocional em Destaque (Apenas na página 1) ── */}
        {currentPage === 1 && destaque && (
          <AnimatedSection delay={80}>
            <Link
              href={`/devocionais/${destaque.slug}`}
              className="block rounded-3xl overflow-hidden group transition-all premium-card"
              style={{
                background: 'linear-gradient(135deg, rgba(12,24,51,0.95) 0%, rgba(9,18,38,0.95) 50%, rgba(7,13,28,0.95) 100%)',
                borderColor: 'rgba(30,58,138,0.6)',
              }}
            >
              {/* Hero image */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={destaque.imagem}
                  alt={destaque.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1833] via-[#0C1833]/60 to-transparent" />
                {/* Glow overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
                />
                <div className="absolute top-4 left-6 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                  ✦ Devocional de Hoje
                </div>
              </div>

              <div className="p-8 sm:p-12 space-y-6">
                <div className="space-y-2">
                  <span className="text-sm font-bold text-[#E5C05B]">{destaque.referenciaBiblica}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{destaque.titulo}</h2>
                </div>
                <blockquote className="border-l-2 border-[#D4AF37] pl-5 text-base text-slate-300 italic leading-relaxed">
                  {destaque.versiculoPrincipal}
                </blockquote>
                <div className="space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">{destaque.reflexao}</p>
                </div>
                <div className="text-xs text-slate-500 capitalize">
                  {formatDatePtBR(destaque.data)} · {destaque.tempoLeitura} de leitura
                </div>
                <div className="inline-flex py-3 px-6 rounded-xl bg-slate-900/90 group-hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 group-hover:border-[#D4AF37]/40 items-center gap-1.5 transition-all uppercase tracking-wider">
                  <span>LER DEVOCIONAL COMPLETO</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5C05B] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        )}

        {/* ── Devocionais Anteriores ── */}
        {anteriores.length > 0 && (
          <AnimatedSection delay={120} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                {currentPage === 1 ? 'Devocionais Anteriores' : `Devocionais Anteriores (Página ${currentPage})`}
              </h3>
              <Sparkles className="w-4 h-4 text-[#D4AF37]/50" />
            </div>

            <div className="divider-gold" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anteriores.map((dev, idx) => (
                <AnimatedSection key={dev.id} delay={140 + idx * 35} as="article">
                  <Link
                    href={`/devocionais/${dev.slug}`}
                    className="group rounded-2xl overflow-hidden flex flex-col h-full premium-card"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={dev.imagem}
                        alt={dev.titulo}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080E1B] via-transparent to-transparent opacity-75" />
                      <div className="absolute top-2.5 left-2.5 text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded capitalize">
                        {formatDatePtBR(dev.data).split('-')[0]}
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <span className="text-[11px] font-bold text-[#E5C05B]">{dev.referenciaBiblica}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors">{dev.titulo}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed flex-1">{dev.resumo}</p>
                      <blockquote className="text-xs italic text-slate-400 border-l border-[#D4AF37]/50 pl-3 line-clamp-2">
                        {dev.versiculoPrincipal}
                      </blockquote>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <Pagination totalPages={totalPages} />
          </AnimatedSection>
        )}
      </div>
    </>
  );
}
