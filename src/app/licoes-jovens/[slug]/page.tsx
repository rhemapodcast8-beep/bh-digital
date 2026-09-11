import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight,
  Compass, FileText, Layers, Sparkles, Target, Quote, Calendar, Lightbulb,
  MessageCircle, ListChecks, HelpCircle, Activity, BookMarked, ScrollText,
  Flame, Crosshair, MapPin, Users
} from 'lucide-react';
import { MOCK_LICOES_JOVENS } from '@/lib/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_LICOES_JOVENS.map((licao) => ({ slug: licao.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const licao = MOCK_LICOES_JOVENS.find((l) => l.slug === slug);
  if (!licao) return { title: 'Lição Não Encontrada' };
  return {
    title: `Lição ${licao.numero < 10 ? `0${licao.numero}` : licao.numero}: ${licao.titulo} | Jovens | BH DIGITAL`,
    description: licao.subtitulo,
  };
}

export default async function LicaoJovemDetailPage({ params }: Props) {
  const { slug } = await params;
  const licaoIndex = MOCK_LICOES_JOVENS.findIndex((l) => l.slug === slug);
  if (licaoIndex === -1) notFound();

  const licao = MOCK_LICOES_JOVENS[licaoIndex];
  const prevLicao = licaoIndex > 0 ? MOCK_LICOES_JOVENS[licaoIndex - 1] : null;
  const nextLicao = licaoIndex < MOCK_LICOES_JOVENS.length - 1 ? MOCK_LICOES_JOVENS[licaoIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
      
      {/* Voltar */}
      <div>
        <Link href="/licoes-jovens" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 text-xs font-semibold transition-all group">
          <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para Lições Jovens</span>
        </Link>
      </div>

      {/* 1. CABEÇALHO DA LIÇÃO */}
      <header className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F1E3A] via-[#0A1326] to-[#070D18] border-2 border-blue-500/30 shadow-2xl shadow-blue-900/20 space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Flame className="w-48 h-48 text-blue-500" />
        </div>
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
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
          <div className="flex flex-col gap-2 pt-2 border-t border-blue-900/30">
            <p className="text-sm text-slate-400"><strong className="text-blue-300">Tema:</strong> {licao.temaTrimestre}</p>
            <p className="text-sm text-slate-400"><strong className="text-blue-300">Comentarista:</strong> {licao.comentarista}</p>
          </div>
        </div>
      </header>

      {/* 2 & 3. TEXTO ÁUREO E VERDADE PRÁTICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-sm">
            <Quote className="w-4 h-4" /> Texto Áureo
          </h2>
          <blockquote className="text-lg font-serif italic text-white leading-relaxed border-l-2 border-blue-500 pl-4">
            "{licao.textoAureo.texto}"
          </blockquote>
          <div className="text-xs text-slate-400 font-mono">{licao.textoAureo.referencia}</div>
          <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800">{licao.textoAureo.comentario}</p>
        </section>

        <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-sm">
            <Target className="w-4 h-4" /> Verdade Prática
          </h2>
          <p className="text-lg font-medium text-white leading-relaxed">
            {licao.verdadePratica.frase}
          </p>
          <p className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded-lg border-l-2 border-emerald-500/50">
            {licao.verdadePratica.explicacao}
          </p>
        </section>
      </div>

      {/* 4. LEITURA DIÁRIA */}
      <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
        <h2 className="flex items-center gap-2 text-white font-bold text-lg">
          <Calendar className="w-5 h-5 text-blue-400" /> Leitura Diária
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {licao.leituraDiaria.map((leitura, i) => (
            <div key={i} className="flex flex-col p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase">{leitura.dia}</span>
                <span className="text-[11px] font-mono text-slate-400">{leitura.referencia}</span>
              </div>
              <span className="text-sm text-slate-200">{leitura.tema}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LEITURA BÍBLICA EM CLASSE */}
      <section className="p-6 rounded-2xl bg-[#06101E] border border-blue-900/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-blue-400" /> Leitura Bíblica em Classe
          </h2>
          <span className="text-xs font-mono text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-800/50">
            {licao.leituraClasse.referencia}
          </span>
        </div>
        <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed italic border-l-4 border-blue-500/30 pl-4 py-2">
          {licao.leituraClasse.texto}
        </p>
      </section>

      {/* 6 & 7. INTRODUÇÃO E PALAVRA CHAVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Compass className="w-5 h-5 text-blue-400" /> Introdução
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {licao.introducao}
          </p>
        </section>
        
        <section className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-900/40 space-y-4 flex flex-col justify-center text-center">
          <h2 className="flex items-center justify-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" /> Palavra-Chave
          </h2>
          <div className="text-2xl font-extrabold text-white">{licao.palavraChave.termo}</div>
          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
            {licao.palavraChave.explicacao}
          </p>
        </section>
      </div>

      {/* 8. DESENVOLVIMENTO DA LIÇÃO */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-2xl border-b border-slate-800 pb-4">
          <Layers className="w-6 h-6 text-blue-400" />
          <h2>Desenvolvimento</h2>
        </div>

        <div className="space-y-8">
          {licao.desenvolvimento.map((topico, i) => (
            <div key={i} className="rounded-2xl bg-[#080E1B] border border-slate-800 overflow-hidden">
              <div className="p-5 sm:p-6 bg-slate-900/50 border-b border-slate-800">
                <h3 className="text-lg sm:text-xl font-bold text-white">{topico.titulo}</h3>
                {topico.sinopse && (
                  <p className="text-sm text-slate-400 mt-2 italic flex items-start gap-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
                    {topico.sinopse}
                  </p>
                )}
              </div>
              <div className="p-5 sm:p-6 space-y-6">
                {topico.pontos.map((ponto, j) => (
                  <div key={j} className="space-y-2">
                    <h4 className="text-sm font-bold text-blue-300">{ponto.titulo}</h4>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{ponto.conteudo}</p>
                  </div>
                ))}
              </div>
              {topico.aplicacaoJovem && (
                <div className="p-5 bg-blue-950/20 border-t border-slate-800">
                  <h5 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Crosshair className="w-4 h-4"/> Aplicação para o Jovem
                  </h5>
                  <p className="text-sm text-slate-200">{topico.aplicacaoJovem}</p>
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
            <ScrollText className="w-5 h-5 text-blue-400" /> Comentário Bíblico
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {licao.comentarioBiblico}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0F1E3A]/40 border border-blue-900/30 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Lightbulb className="w-5 h-5 text-blue-400" /> O que a Bíblia ensina?
          </h2>
          <ul className="space-y-3">
            {licao.oQueABibliaEnsina.map((v, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 & 12. APLICAÇÃO JOVEM E PARA PENSAR */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-[#080E1B] to-[#050A14] border border-blue-500/20 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-xl">
            <Activity className="w-6 h-6 text-blue-400" /> Aplicação Prática
          </h2>
          <div className="space-y-3">
            {licao.aplicacaoJovem.map((app, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <Target className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">{app}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center text-center space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" /> Para Pensar
          </h2>
          <p className="text-lg font-serif italic text-[#E5C05B] leading-relaxed">
            {licao.paraPensar}
          </p>
        </div>
      </section>

      {/* 13 & 14. PERGUNTAS E DESAFIO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <MessageCircle className="w-5 h-5 text-blue-400" /> Perguntas para Reflexão
          </h2>
          <ul className="space-y-3 list-decimal list-inside text-sm text-slate-300">
            {licao.perguntasReflexao.map((p, i) => (
              <li key={i} className="leading-relaxed">{p}</li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-900/30 space-y-4">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <Flame className="w-5 h-5 text-orange-500" /> Desafio da Semana
          </h2>
          <ul className="space-y-3">
            {licao.desafioSemana.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 15. REVISANDO O CONTEÚDO */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-6">
        <h2 className="flex items-center gap-2 text-white font-bold text-lg">
          <ListChecks className="w-5 h-5 text-blue-400" /> Revisando o Conteúdo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {licao.revisandoConteudo.map((rev, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
              <p className="text-sm font-semibold text-white">{i+1}. {rev.pergunta}</p>
              <p className="text-xs text-blue-300 border-l-2 border-blue-500/50 pl-2">R: {rev.resposta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 16 & 17. DINÂMICA E VOCABULÁRIO E 18. CONCLUSÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-3">
            <h2 className="flex items-center gap-2 text-white font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-400" /> Conclusão
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{licao.conclusao}</p>
          </div>
          
          {licao.dinamica && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-blue-400 uppercase flex items-center gap-2">
                <Users className="w-4 h-4" /> Dinâmica: {licao.dinamica.titulo}
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 space-y-2">
                <p><strong className="text-white">Objetivo:</strong> {licao.dinamica.objetivo}</p>
                <p><strong className="text-white">Material:</strong> {licao.dinamica.material}</p>
                <p><strong className="text-white">Execução:</strong> {licao.dinamica.execucao}</p>
                <p><strong className="text-emerald-400">Aplicação:</strong> {licao.dinamica.aplicacao}</p>
              </div>
            </div>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4 h-fit">
          <h2 className="flex items-center gap-2 text-white font-bold text-lg">
            <BookMarked className="w-5 h-5 text-blue-400" /> Vocabulário
          </h2>
          <div className="space-y-4">
            {licao.vocabulario.map((voc, i) => (
              <div key={i} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                <span className="text-xs font-bold text-blue-300 block mb-1">{voc.termo}</span>
                <span className="text-xs text-slate-400 leading-relaxed">{voc.definicao}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 19. NAVEGAÇÃO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        {prevLicao ? (
          <Link href={`/licoes-jovens/${prevLicao.slug}`} className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-blue-500/30 flex items-center gap-3 transition-all group">
            <ChevronLeft className="w-5 h-5 text-blue-400 group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lição Anterior</span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                {prevLicao.numero < 10 ? `0${prevLicao.numero}` : prevLicao.numero}. {prevLicao.titulo}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 opacity-50 cursor-not-allowed">
            <span className="text-[10px] text-slate-500 block">Início do Trimestre</span>
            <span className="text-xs text-slate-600 font-medium">Primeira Lição de Jovens</span>
          </div>
        )}

        {nextLicao ? (
          <Link href={`/licoes-jovens/${nextLicao.slug}`} className="p-4 sm:p-5 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-blue-500/30 flex items-center justify-between gap-3 text-right transition-all group">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Próxima Lição</span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                {nextLicao.numero < 10 ? `0${nextLicao.numero}` : nextLicao.numero}. {nextLicao.titulo}
              </h4>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 text-right opacity-50 cursor-not-allowed">
            <span className="text-[10px] text-slate-500 block">Fim do Trimestre</span>
            <span className="text-xs text-slate-600 font-medium">Última Lição de Jovens</span>
          </div>
        )}
      </div>

      <div className="pt-6 text-center border-t border-slate-800/80">
        <Link href="/licoes-jovens" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/30 transition-all">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Lições Jovens</span>
        </Link>
      </div>
    </div>
  );
}
