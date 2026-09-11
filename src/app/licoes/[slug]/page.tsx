import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight,
  Compass, FileText, Layers, Sparkles, Target, Quote, Calendar, Lightbulb,
  MessageCircle, ListChecks, HelpCircle, Activity, BookMarked, ScrollText
} from 'lucide-react';
import { MOCK_LICOES } from '@/lib/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_LICOES.map((licao) => ({ slug: licao.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const licao = MOCK_LICOES.find((l) => l.slug === slug);
  if (!licao) return { title: 'Lição Não Encontrada' };
  return {
    title: `Lição ${licao.numero < 10 ? `0${licao.numero}` : licao.numero}: ${licao.titulo} | BH DIGITAL`,
    description: licao.subtitulo,
  };
}

export default async function LicaoDetailPage({ params }: Props) {
  const { slug } = await params;
  const licaoIndex = MOCK_LICOES.findIndex((l) => l.slug === slug);
  if (licaoIndex === -1) notFound();

  const licao = MOCK_LICOES[licaoIndex];
  const prevLicao = licaoIndex > 0 ? MOCK_LICOES[licaoIndex - 1] : null;
  const nextLicao = licaoIndex < MOCK_LICOES.length - 1 ? MOCK_LICOES[licaoIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      {/* Voltar */}
      <div>
        <Link href="/licoes" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#D4AF37]/50 text-xs font-semibold transition-all group">
          <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para todas as lições</span>
        </Link>
      </div>

      {/* 1. CABEÇALHO DA LIÇÃO */}
      <header className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#070D18] border-2 border-[#D4AF37]/40 shadow-2xl space-y-5">
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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {licao.titulo}
        </h1>
        <p className="text-base sm:text-lg text-[#E5C05B] font-medium leading-relaxed">
          {licao.subtitulo}
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>{licao.referenciaBiblica}</span>
          </div>
        </div>
      </header>

      {/* 2 & 3. TEXTO ÁUREO E VERDADE PRÁTICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-[#E5C05B] font-bold uppercase tracking-wider text-sm">
            <Quote className="w-4 h-4" /> Texto Áureo
          </h2>
          <blockquote className="text-lg font-serif italic text-white leading-relaxed border-l-2 border-[#D4AF37] pl-4">
            "{licao.textoAureo.texto}"
          </blockquote>
          <div className="text-xs text-slate-400 font-mono">{licao.textoAureo.referencia}</div>
          <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg">{licao.textoAureo.comentario}</p>
        </section>

        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-[#E5C05B] font-bold uppercase tracking-wider text-sm">
            <Target className="w-4 h-4" /> Verdade Prática
          </h2>
          <p className="text-lg font-medium text-white leading-relaxed">
            {licao.verdadePratica.frase}
          </p>
          <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border-l-2 border-emerald-500/50">
            {licao.verdadePratica.explicacao}
          </p>
        </section>
      </div>

      {/* 4. LEITURA DIÁRIA */}
      <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
        <h2 className="flex items-center gap-2 text-white font-bold text-lg">
          <Calendar className="w-5 h-5 text-[#D4AF37]" /> Leitura Diária
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {licao.leituraDiaria.map((leitura, i) => (
            <div key={i} className="flex flex-col p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-[#E5C05B] uppercase">{leitura.dia}</span>
                <span className="text-[11px] font-mono text-slate-400">{leitura.referencia}</span>
              </div>
              <span className="text-sm text-slate-200">{leitura.tema}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LEITURA BÍBLICA EM CLASSE */}
      <section className="p-6 rounded-2xl bg-[#06101E] border border-[#D4AF37]/20 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Leitura Bíblica em Classe
          </h2>
          <span className="text-xs font-mono text-[#E5C05B] bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
            {licao.leituraClasse.referencia}
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed italic border-l-4 border-[#D4AF37]/30 pl-4 py-2">
          {licao.leituraClasse.texto}
        </p>
      </section>

      {/* 6 & 7. INTRODUÇÃO E PALAVRA CHAVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Compass className="w-5 h-5 text-[#D4AF37]" /> Introdução
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {licao.introducao}
          </p>
        </section>
        
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-center text-center">
          <h2 className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Palavra-Chave
          </h2>
          <div className="text-2xl font-extrabold text-[#E5C05B]">{licao.palavraChave.termo}</div>
          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
            {licao.palavraChave.explicacao}
          </p>
        </section>
      </div>

      {/* 8. DESENVOLVIMENTO DA LIÇÃO */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-2xl border-b border-slate-800 pb-4">
          <Layers className="w-6 h-6 text-[#D4AF37]" />
          <h2>Desenvolvimento da Lição</h2>
        </div>

        <div className="space-y-8">
          {licao.desenvolvimento.map((topico, i) => (
            <div key={i} className="rounded-2xl bg-[#080E1B] border border-slate-800 overflow-hidden">
              <div className="p-5 sm:p-6 bg-slate-900/50 border-b border-slate-800">
                <h3 className="text-lg sm:text-xl font-bold text-white">{topico.titulo}</h3>
                {topico.sinopse && (
                  <p className="text-sm text-slate-400 mt-2 italic">{topico.sinopse}</p>
                )}
              </div>
              <div className="p-5 sm:p-6 space-y-6">
                {topico.pontos.map((ponto, j) => (
                  <div key={j} className="space-y-2">
                    <h4 className="text-sm font-bold text-[#E5C05B]">{ponto.titulo}</h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{ponto.conteudo}</p>
                  </div>
                ))}
              </div>
              {(topico.aplicacao || topico.auxilio) && (
                <div className="p-5 bg-slate-950/80 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topico.aplicacao && (
                    <div>
                      <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5"/> Aplicação</h5>
                      <p className="text-xs text-slate-300">{topico.aplicacao}</p>
                    </div>
                  )}
                  {topico.auxilio && (
                    <div>
                      <h5 className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5"/> Auxílio</h5>
                      <p className="text-xs text-slate-300">{topico.auxilio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9 & 10. COMENTÁRIO BÍBLICO E VERDADE BÍBLICA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <ScrollText className="w-5 h-5 text-[#D4AF37]" /> Comentário Bíblico Profundo
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {licao.comentarioProfundo}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0F1E3A]/40 border border-[#D4AF37]/20 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Lightbulb className="w-5 h-5 text-[#E5C05B]" /> Verdade Bíblica Central
          </h2>
          <ul className="space-y-3">
            {licao.verdadeBiblica.map((v, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. APLICAÇÃO PRÁTICA PARA HOJE */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#080E1B] to-[#050A14] border border-[#D4AF37]/30 space-y-6">
        <h2 className="flex items-center gap-2 text-white font-bold text-xl">
          <Activity className="w-6 h-6 text-[#E5C05B]" /> Aplicação para Hoje
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(licao.aplicacaoHoje).map(([area, texto]) => (
            <div key={area} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 capitalize">{area}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{texto as string}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12 & 13. PERGUNTAS E REVISÃO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <MessageCircle className="w-5 h-5 text-[#D4AF37]" /> Para Reflexão
          </h2>
          <ul className="space-y-3 list-decimal list-inside text-sm text-slate-300">
            {licao.perguntasReflexao.map((p, i) => (
              <li key={i} className="leading-relaxed">{p}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <ListChecks className="w-5 h-5 text-[#D4AF37]" /> Revisando o Conteúdo
          </h2>
          <div className="space-y-4">
            {licao.revisandoConteudo.map((rev, i) => (
              <div key={i} className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">{i+1}. {rev.pergunta}</p>
                <p className="text-xs text-[#E5C05B] italic">R: {rev.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FRASE PARA AULA */}
      <section className="p-8 rounded-2xl bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 text-center">
        <Quote className="w-8 h-8 mx-auto text-[#E5C05B] mb-4 opacity-50" />
        <p className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
          {licao.fraseAula}
        </p>
      </section>

      {/* 15 & 16. DINÂMICA E VOCABULÁRIO E CONCLUSÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-6">
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-white font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> Conclusão
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{licao.conclusao}</p>
          </div>
          
          {licao.dinamica && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-[#E5C05B] uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Dinâmica: {licao.dinamica.titulo}
              </h3>
              <div className="text-xs text-slate-300 space-y-2">
                <p><strong>Objetivo:</strong> {licao.dinamica.objetivo}</p>
                <p><strong>Material:</strong> {licao.dinamica.material}</p>
                <p><strong>Execução:</strong> {licao.dinamica.execucao}</p>
                <p><strong>Aplicação:</strong> {licao.dinamica.aplicacao}</p>
              </div>
            </div>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <BookMarked className="w-5 h-5 text-[#D4AF37]" /> Vocabulário
          </h2>
          <div className="space-y-3">
            {licao.vocabulario.map((voc, i) => (
              <div key={i}>
                <span className="text-xs font-bold text-[#E5C05B] block">{voc.termo}</span>
                <span className="text-xs text-slate-400">{voc.definicao}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 18. Navegação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevLicao ? (
          <Link href={`/licoes/${prevLicao.slug}`} className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex items-center gap-3 transition-all group">
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
          <Link href={`/licoes/${nextLicao.slug}`} className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex items-center justify-between gap-3 text-right transition-all group">
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

      <div className="pt-6 text-center border-t border-slate-800/80">
        <Link href="/licoes" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para todas as lições</span>
        </Link>
      </div>
    </div>
  );
}
