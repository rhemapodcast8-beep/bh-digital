import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Sparkles,
  Target,
  Quote,
  Calendar,
  Lightbulb,
  MessageCircle,
  ListChecks,
  Activity,
  BookMarked,
  ScrollText,
  User,
  Music,
  Bookmark,
} from 'lucide-react';
import { MOCK_LICOES } from '@/lib/mockData';
import { LicaoActionBar } from '@/components/licoes/LicaoActionBar';

interface Props {
  params: Promise<{ slug: string }>;
}

const LEGACY_SLUGS: Record<string, string> = {
  '02-moises-e-a-nova-geracao': '02-recapitulando-a-jornada-no-deserto',
  '03-o-resumo-da-lei': '03-a-fidelidade-de-deus-diante-da-infidelidade-de-israel',
  '04-lembrando-o-passado': '04-o-chamado-a-obediencia',
  '05-a-alianca-no-horebe': '05-o-grande-mandamento',
  '06-o-perigo-da-idolatria': '06-a-alianca-e-as-bencaos-da-obediencia',
  '07-a-eleicao-de-israel': '07-maldicoes-e-bencaos-da-alianca',
  '08-as-bencaos-da-obediencia': '08-escolhendo-a-vida-ou-a-morte',
  '09-a-terra-prometida': '09-a-sucessao-de-moises',
  '10-a-justica-social-na-lei': '10-o-cantico-de-moises-advertencia-e-esperanca',
  '11-profetas-sacerdotes-e-reis': '11-a-bencao-final-de-moises',
  '12-a-renovacao-da-alianca': '12-a-morte-de-moises-e-a-continuidade-da-promessa',
  '13-a-morte-de-moises': '13-o-cumprimento-de-deuteronomio-em-cristo',
};

export async function generateStaticParams() {
  return MOCK_LICOES.map((licao) => ({ slug: licao.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = LEGACY_SLUGS[slug] || slug;
  const licao = MOCK_LICOES.find((l) => l.slug === resolvedSlug);
  if (!licao) return { title: 'Lição Não Encontrada' };
  return {
    title: `Lição ${licao.numero < 10 ? `0${licao.numero}` : licao.numero}: ${licao.titulo} | EBD Premium | BH DIGITAL`,
    description: `${licao.subtitulo} — Comentarista: ${licao.comentarista || 'Osiel Gomes'}. Texto bíblico: ${licao.referenciaBiblica}.`,
  };
}

export default async function LicaoDetailPage({ params }: Props) {
  const { slug } = await params;

  // Redireciona slugs antigos de forma transparente
  if (LEGACY_SLUGS[slug]) {
    redirect(`/licoes/${LEGACY_SLUGS[slug]}`);
  }

  const licaoIndex = MOCK_LICOES.findIndex((l) => l.slug === slug);
  if (licaoIndex === -1) notFound();

  const licao = MOCK_LICOES[licaoIndex];
  const prevLicao = licaoIndex > 0 ? MOCK_LICOES[licaoIndex - 1] : null;
  const nextLicao = licaoIndex < MOCK_LICOES.length - 1 ? MOCK_LICOES[licaoIndex + 1] : null;

  // Quebra a Leitura Bíblica em Classe em versículos para exibição de alta qualidade
  const versiculosClasse = licao.leituraClasse.texto
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  return (
    <div
      id="licao-reading-container"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 transition-all duration-300"
    >
      {/* ── NAVEGAÇÃO SUPERIOR / BREADCRUMB ── */}
      <div className="no-print flex items-center justify-between gap-4">
        <Link
          href="/licoes"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#D4AF37]/50 text-xs font-semibold transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para todas as lições</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <span>/</span>
          <Link href="/licoes" className="hover:text-white transition-colors">Lições Bíblicas</Link>
          <span>/</span>
          <span className="text-[#E5C05B]">Lição {licao.numero < 10 ? `0${licao.numero}` : licao.numero}</span>
        </div>
      </div>

      {/* ── 1. CABEÇALHO DA LIÇÃO (IDENTIFICAÇÃO OFICIAL E PROFISSIONAL) ── */}
      <header className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#070D18] border-2 border-[#D4AF37]/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Lição {licao.numero < 10 ? `0${licao.numero}` : licao.numero} • {licao.trimestre}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{licao.status}</span>
          </span>
        </div>

        <div className="space-y-3">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
            Tema Geral: <span className="text-slate-200">{licao.temaTrimestre}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {licao.titulo}
          </h1>
          <p className="text-base sm:text-lg text-[#E5C05B] font-medium leading-relaxed">
            {licao.subtitulo}
          </p>
        </div>

        {/* Metadados Oficiais: Comentarista, Texto Bíblico, Data, Hinos */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-3 text-xs">
          {licao.comentarista && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 font-medium">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span><strong>Comentarista:</strong> {licao.comentarista}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span><strong>Texto Bíblico Principal:</strong> {licao.referenciaBiblica}</span>
          </div>

          {licao.data && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span><strong>Data:</strong> {licao.data}</span>
            </div>
          )}

          {licao.hinosSugeridos && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300">
              <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span><strong>Hinos Sugeridos:</strong> {licao.hinosSugeridos}</span>
            </div>
          )}
        </div>
      </header>

      {/* ── BARRA DE AÇÕES (LEITURA, IMPRESSÃO, PDF, FONTE OFICIAL) ── */}
      <LicaoActionBar
        titulo={licao.titulo}
        referencia={licao.referenciaBiblica}
        linkFonteExterna={licao.linkFonteExterna}
      />

      {/* ── ÍNDICE RÁPIDO DE NAVEGAÇÃO DOS TÓPICOS ── */}
      <nav
        aria-label="Índice dos tópicos"
        className="no-print p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-3"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5C05B]">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Sumário e Navegação Rápida da Lição</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <a
            href="#texto-aureo"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Texto Áureo
          </a>
          <a
            href="#leitura-diaria"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Leitura Diária
          </a>
          <a
            href="#leitura-classe"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Leitura Bíblica
          </a>
          <a
            href="#introducao"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Introdução
          </a>
          {licao.desenvolvimento.map((topico, idx) => (
            <a
              key={idx}
              href={`#topico-${idx + 1}`}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors truncate max-w-xs"
            >
              {topico.titulo.split('.')[0] || `Tópico ${idx + 1}`}
            </a>
          ))}
          <a
            href="#conclusao"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Conclusão
          </a>
          <a
            href="#revisao"
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors"
          >
            Revisão
          </a>
        </div>
      </nav>

      {/* ── 2 & 3. TEXTO ÁUREO E VERDADE PRÁTICA ── */}
      <div id="texto-aureo" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-36">
        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-[#E5C05B] font-bold uppercase tracking-wider text-sm">
            <Quote className="w-4 h-4" /> Texto Áureo
          </h2>
          <blockquote className="text-lg font-serif italic text-white leading-relaxed border-l-4 border-[#D4AF37] pl-4">
            &ldquo;{licao.textoAureo.texto}&rdquo;
          </blockquote>
          <div className="text-xs text-[#E5C05B] font-mono font-semibold">
            {licao.textoAureo.referencia}
          </div>
          <p className="text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
            {licao.textoAureo.comentario}
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-[#E5C05B] font-bold uppercase tracking-wider text-sm">
            <Target className="w-4 h-4" /> Verdade Prática
          </h2>
          <p className="text-lg font-semibold text-white leading-relaxed border-l-4 border-emerald-500 pl-4">
            {licao.verdadePratica.frase}
          </p>
          <div className="text-xs text-emerald-400 font-mono font-semibold">
            Aplicação Teológica
          </div>
          <p className="text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
            {licao.verdadePratica.explicacao}
          </p>
        </section>
      </div>

      {/* ── 4. LEITURA DIÁRIA (SEGUNDA A SÁBADO) ── */}
      <section id="leitura-diaria" className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4 scroll-mt-36">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Calendar className="w-5 h-5 text-[#D4AF37]" /> Leitura Diária
          </h2>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Devocional Semanal
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {licao.leituraDiaria.map((leitura, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#E5C05B] uppercase tracking-wider">
                  {leitura.dia}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-medium">
                  {leitura.referencia}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">
                {leitura.tema}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. LEITURA BÍBLICA EM CLASSE ── */}
      <section id="leitura-classe" className="p-6 sm:p-8 rounded-2xl bg-[#06101E] border border-[#D4AF37]/30 space-y-5 scroll-mt-36">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h2 className="flex items-center gap-2 text-white font-bold text-xl">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Leitura Bíblica em Classe
          </h2>
          <span className="text-xs font-mono text-[#E5C05B] bg-[#D4AF37]/10 px-3 py-1 rounded-lg border border-[#D4AF37]/30 w-fit">
            {licao.leituraClasse.referencia}
          </span>
        </div>

        {/* Versículos organizados com alta legibilidade bíblica */}
        <div className="space-y-3 pt-2">
          {versiculosClasse.map((linha, idx) => {
            const isSeparador = linha.startsWith('[...]');
            if (isSeparador) {
              return (
                <div key={idx} className="py-2 text-center text-xs text-slate-500 font-mono">
                  ── [...] ──
                </div>
              );
            }

            const match = linha.match(/^(\d+)\s*—\s*(.+)$/);
            if (match) {
              const num = match[1];
              const txt = match[2];
              return (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/40 transition-colors">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-[#D4AF37]/15 text-[#E5C05B] font-bold font-mono text-xs flex items-center justify-center border border-[#D4AF37]/30">
                    {num}
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed pt-1">
                    {txt}
                  </p>
                </div>
              );
            }

            return (
              <p key={idx} className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed italic border-l-2 border-[#D4AF37]/40 pl-3">
                {linha}
              </p>
            );
          })}
        </div>
      </section>

      {/* ── 6 & 7. INTRODUÇÃO E PALAVRA-CHAVE ── */}
      <div id="introducao" className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-36">
        <section className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Compass className="w-5 h-5 text-[#D4AF37]" /> Introdução à Lição
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {licao.introducao}
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A1326] border border-slate-800 space-y-4 flex flex-col justify-center text-center">
          <h2 className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Palavra-Chave
          </h2>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#E5C05B]">
            {licao.palavraChave.termo}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
            {licao.palavraChave.explicacao}
          </p>
        </section>
      </div>

      {/* ── 8. DESENVOLVIMENTO DA LIÇÃO (TÓPICOS E SUBTÓPICOS RIGOROSAMENTE OFICIAIS) ── */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-white font-bold text-2xl">
            <Layers className="w-6 h-6 text-[#D4AF37]" />
            <h2>Desenvolvimento da Lição</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {licao.desenvolvimento.length} Tópicos Expositivos
          </span>
        </div>

        <div className="space-y-10">
          {licao.desenvolvimento.map((topico, i) => (
            <article
              key={i}
              id={`topico-${i + 1}`}
              className="rounded-3xl bg-[#080E1B] border-2 border-slate-800/90 overflow-hidden shadow-xl scroll-mt-36"
            >
              {/* Título Oficial do Tópico */}
              <div className="p-6 sm:p-7 bg-gradient-to-r from-slate-900 via-[#0A1326] to-slate-900 border-b border-slate-800">
                <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                  Tópico {i + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {topico.titulo}
                </h3>
                {topico.sinopse && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 italic flex items-center gap-2">
                    <span className="font-bold text-[#E5C05B] not-italic">Sinopse {i + 1}:</span>
                    <span>{topico.sinopse}</span>
                  </div>
                )}
              </div>

              {/* Subtópicos Oficiais */}
              <div className="p-6 sm:p-8 space-y-7">
                {topico.pontos.map((ponto, j) => (
                  <div key={j} className="space-y-3 pb-6 border-b border-slate-800/50 last:border-b-0 last:pb-0">
                    <h4 className="text-base sm:text-lg font-bold text-[#E5C05B] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#D4AF37]/15 text-[#E5C05B] text-xs font-mono flex items-center justify-center shrink-0">
                        {j + 1}
                      </span>
                      <span>{ponto.titulo}</span>
                    </h4>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed pl-8">
                      {ponto.conteudo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Auxílio Bibliológico e Aplicação Prática do Tópico */}
              {(topico.aplicacao || topico.auxilio) && (
                <div className="p-6 bg-slate-950/90 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {topico.auxilio && (
                    <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <h5 className="text-xs font-bold text-[#E5C05B] uppercase tracking-wider flex items-center gap-2">
                        <ScrollText className="w-4 h-4 text-[#D4AF37]" />
                        <span>Auxílio Bibliológico</span>
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        &ldquo;{topico.auxilio}&rdquo;
                      </p>
                    </div>
                  )}

                  {topico.aplicacao && (
                    <div className="space-y-2 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Aplicação do Tópico</span>
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {topico.aplicacao}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── 9 & 10. COMENTÁRIO BÍBLICO PROFUNDO E VERDADES CENTRAIS ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <ScrollText className="w-5 h-5 text-[#D4AF37]" /> Comentário Teológico Profundo
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {licao.comentarioProfundo}
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-[#0F1E3A]/40 border border-[#D4AF37]/25 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Lightbulb className="w-5 h-5 text-[#E5C05B]" /> Verdades Bíblicas Centrais
          </h2>
          <ul className="space-y-3">
            {licao.verdadeBiblica.map((v, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 leading-relaxed">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 11. APLICAÇÃO PRÁTICA PARA HOJE ── */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#080E1B] to-[#050A14] border border-[#D4AF37]/30 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-white font-bold text-xl">
            <Activity className="w-6 h-6 text-[#E5C05B]" /> Aplicação para Hoje
          </h2>
          <span className="text-xs text-slate-400 font-mono">5 Dimensões Práticas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(licao.aplicacaoHoje).map(([area, texto]) => (
            <div key={area} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider capitalize">
                {area}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {texto as string}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 12 & 13. PARA REFLEXÃO E REVISANDO O CONTEÚDO ── */}
      <section id="revisao" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-36">
        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <MessageCircle className="w-5 h-5 text-[#D4AF37]" /> Para Reflexão
          </h2>
          <ul className="space-y-3.5 list-decimal list-inside text-sm text-slate-300">
            {licao.perguntasReflexao.map((p, i) => (
              <li key={i} className="leading-relaxed pl-1">
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-white font-bold text-lg">
              <ListChecks className="w-5 h-5 text-[#D4AF37]" /> Revisando o Conteúdo
            </h2>
            <span className="text-xs font-mono text-[#E5C05B]">Questionário Oficial</span>
          </div>

          <div className="space-y-4">
            {licao.revisandoConteudo.map((rev, i) => (
              <div key={i} className="space-y-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <p className="text-xs sm:text-sm font-bold text-slate-200">
                  {i + 1}. {rev.pergunta}
                </p>
                <p className="text-xs text-[#E5C05B] leading-relaxed">
                  <strong>R:</strong> {rev.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. FRASE DE DESTAQUE PARA A AULA ── */}
      <section className="p-8 sm:p-10 rounded-2xl bg-[#D4AF37]/10 border-2 border-[#D4AF37]/35 text-center relative overflow-hidden">
        <Quote className="w-8 h-8 mx-auto text-[#E5C05B] mb-3 opacity-60" />
        <p className="text-lg sm:text-2xl font-serif italic text-white leading-relaxed max-w-2xl mx-auto">
          &ldquo;{licao.fraseAula}&rdquo;
        </p>
      </section>

      {/* ── 15 & 16. CONCLUSÃO, DINÂMICA PEDAGÓGICA E VOCABULÁRIO ── */}
      <div id="conclusao" className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-36">
        <section className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-6">
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-white font-bold text-xl">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Conclusão e Aplicação Prática
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed border-l-4 border-[#D4AF37]/40 pl-4">
              {licao.conclusao}
            </p>
          </div>

          {licao.dinamica && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-[#E5C05B] uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Sugestão Didática: {licao.dinamica.titulo}
              </h3>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p><strong className="text-slate-100">Objetivo:</strong> {licao.dinamica.objetivo}</p>
                <p><strong className="text-slate-100">Material:</strong> {licao.dinamica.material}</p>
                <p><strong className="text-slate-100">Preparação:</strong> {licao.dinamica.preparacao}</p>
                <p><strong className="text-slate-100">Execução:</strong> {licao.dinamica.execucao}</p>
                <p className="text-emerald-400"><strong className="text-emerald-300">Aplicação:</strong> {licao.dinamica.aplicacao}</p>
              </div>
            </div>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <BookMarked className="w-5 h-5 text-[#D4AF37]" /> Vocabulário Teológico
          </h2>
          <div className="space-y-3.5">
            {licao.vocabulario.map((voc, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-xs font-bold text-[#E5C05B] block mb-1">
                  {voc.termo}
                </span>
                <span className="text-xs text-slate-400 leading-relaxed block">
                  {voc.definicao}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 17. NAVEGAÇÃO ENTRE AS 13 LIÇÕES DO TRIMESTRE ── */}
      <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevLicao ? (
          <Link
            href={`/licoes/${prevLicao.slug}`}
            className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex items-center gap-3 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-[#D4AF37] group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lição Anterior</span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#E5C05B] transition-colors">
                {prevLicao.numero < 10 ? `0${prevLicao.numero}` : prevLicao.numero}. {prevLicao.titulo}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 opacity-50 cursor-not-allowed">
            <span className="text-[10px] text-slate-500 block">Início da Série</span>
            <span className="text-xs text-slate-600 font-medium">Primeira Lição da Série</span>
          </div>
        )}

        {nextLicao ? (
          <Link
            href={`/licoes/${nextLicao.slug}`}
            className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex items-center justify-between gap-3 text-right transition-all group"
          >
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Próxima Lição</span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-[#E5C05B] transition-colors">
                {nextLicao.numero < 10 ? `0${nextLicao.numero}` : nextLicao.numero}. {nextLicao.titulo}
              </h4>
            </div>
            <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 text-right opacity-50 cursor-not-allowed">
            <span className="text-[10px] text-slate-500 block">Fim da Série</span>
            <span className="text-xs text-slate-600 font-medium">Última Lição da Série</span>
          </div>
        )}
      </div>

      {/* ── BOTÃO VOLTAR PARA TODAS AS LIÇÕES ── */}
      <div className="no-print pt-6 text-center border-t border-slate-800/80">
        <Link
          href="/licoes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todas as lições</span>
        </Link>
      </div>
    </div>
  );
}
