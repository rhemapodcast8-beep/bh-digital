import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react';
import { MOCK_LICOES, SERIE_LICOES } from '@/lib/mockData';
import { Pagination } from '@/components/ui/Pagination';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Lições Bíblicas',
  description: 'Série de estudos bíblicos estruturados: O Deus da Aliança — Advertências, promessas e bênçãos no livro de Deuteronômio.',
};

const ITEMS_PER_PAGE = 12;

export default async function LicoesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const totalItems = MOCK_LICOES.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const currentItems = MOCK_LICOES.slice(startIndex, endIndex);

  return (
    <>
      {/* ── Background exclusivo da página ── */}
      <PremiumPageBackground variant="licoes" />

      <div className="page-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">

        {/* ── Page Hero ── */}
        <PageHero
          badge="Série de Estudos Bíblicos"
          title="LIÇÕES BÍBLICAS"
          description="Estudos expositivos estruturados semana a semana para crescimento teológico, edificação pessoal e preparo para o ensino."
          accentColor="#D4AF37"
          decorationVariant="lines"
        >
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-[#E5C05B]">
              <Layers className="w-3.5 h-3.5" />
              {SERIE_LICOES.totalLicoes} Lições Completas
            </span>
            <span>·</span>
            <span>Livro de Deuteronômio</span>
            <span>·</span>
            <span>4º Trimestre de 2026</span>
            <span>·</span>
            <span className="text-[#E5C05B]">Comentarista: Osiel Gomes</span>
          </div>
        </PageHero>

        {/* ── Header da Série (Apenas na página 1) ── */}
        {currentPage === 1 && (
          <AnimatedSection delay={80}>
            <Link
              href="/licoes"
              className="block relative p-8 sm:p-12 rounded-3xl overflow-hidden group premium-card"
              style={{
                background: 'linear-gradient(135deg, rgba(15,30,58,0.95) 0%, rgba(10,19,38,0.95) 50%, rgba(7,13,24,0.95) 100%)',
                borderColor: 'rgba(212,175,55,0.4)',
              }}
            >
              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
                }}
              />
              {/* Gold top border */}
              <div
                className="absolute top-0 inset-x-0 h-px rounded-t-3xl"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5) 40%, rgba(229,192,91,0.8) 50%, rgba(212,175,55,0.5) 60%, transparent)',
                }}
              />

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5" />
                    <span>SÉRIE DE ESTUDOS EM DESTAQUE</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {SERIE_LICOES.titulo}
                  </h2>
                  <p className="text-lg text-[#E5C05B] font-semibold">{SERIE_LICOES.subtitulo}</p>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{SERIE_LICOES.descricao}</p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                    <span className="font-bold text-[#E5C05B] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      {SERIE_LICOES.totalLicoes} Lições Completas
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">Livro de Deuteronômio</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">4º Trimestre de 2026</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[#E5C05B] font-semibold">Comentarista: Osiel Gomes</span>
                  </div>
                </div>
                <div className="shrink-0 w-48 sm:w-64">
                  <img
                    src="/images/licoes/adultos/capa-o-deus-da-alianca.png"
                    alt="Lições Bíblicas Adultos — 4º Trimestre 2026 — O Deus da Aliança"
                    className="w-full h-auto object-contain rounded-xl shadow-2xl border border-slate-700/50 group-hover:scale-[1.03] transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(212,175,55,0.1))' }}
                  />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        )}

        {/* ── Índice das Lições ── */}
        <AnimatedSection delay={160} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {currentPage === 1
                ? `Índice Completo das ${SERIE_LICOES.totalLicoes} Lições`
                : `Índice das Lições (Página ${currentPage})`}
            </h2>
            <div className="text-xs text-slate-500 font-mono">
              {currentItems.length}/{totalItems} lições
            </div>
          </div>

          <div className="divider-gold" />

          <div className="space-y-3">
            {currentItems.map((licao, idx) => (
              <AnimatedSection key={licao.numero} delay={200 + idx * 30}>
                <Link
                  href={`/licoes/${licao.slug}`}
                  className="group p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 premium-card"
                  style={{ borderColor: 'rgba(30,58,138,0.3)' }}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {licao.imagemCapa ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700/50 shrink-0 bg-slate-900 shadow-lg">
                        <img
                          src={licao.imagemCapa}
                          alt={licao.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#E5C05B] font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-colors border border-[#D4AF37]/20">
                        {licao.numero < 10 ? `0${licao.numero}` : licao.numero}
                      </div>
                    )}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                          {licao.titulo}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 self-start sm:self-auto">
                          {licao.referenciaBiblica}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{licao.subtitulo}</p>
                      <div className="flex items-center gap-3 pt-1">
                        {licao.status === 'Disponível para Estudo' ? (
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {licao.status}
                          </span>
                        ) : (
                          <span className="text-[11px] text-amber-400">{licao.status}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 sm:pt-0 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs shadow-md group-hover:shadow-[#D4AF37]/30 group-hover:brightness-110 transition-all uppercase tracking-wider">
                      <span>ESTUDAR LIÇÃO</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <Pagination totalPages={totalPages} />
        </AnimatedSection>

        {/* ── CTA Material PDF ── */}
        <AnimatedSection delay={100}>
          <div
            className="p-8 rounded-3xl text-center space-y-4 premium-card"
            style={{ borderColor: 'rgba(30,58,138,0.35)' }}
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)' }}
            >
              <BookOpen className="w-5 h-5 text-[#E5C05B]" />
            </div>
            <h3 className="text-xl font-bold text-white">Comentário Completo da Série</h3>
            <p className="text-sm text-slate-400">
              Baixe o material de apoio com o comentário teológico completo das 13 lições.
            </p>
            <Link
              href="/materiais"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:brightness-110 hover:shadow-[#D4AF37]/30"
            >
              <span>VER MATERIAIS DISPONÍVEIS</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </>
  );
}
