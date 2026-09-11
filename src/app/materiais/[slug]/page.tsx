import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Download, Lock, Crown, FileText, BookOpen, CheckCircle2,
  Users, Layers, ChevronRight, Star, Clock, BarChart3
} from 'lucide-react';
import { MOCK_MATERIAIS } from '@/lib/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_MATERIAIS
    .filter((m) => m.slug)
    .map((m) => ({ slug: m.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mat = MOCK_MATERIAIS.find((m) => m.slug === slug);
  if (!mat) return { title: 'Material Não Encontrado | BH DIGITAL' };
  return {
    title: `${mat.titulo} | Materiais | BH DIGITAL`,
    description: mat.descricao,
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { slug } = await params;
  const mat = MOCK_MATERIAIS.find((m) => m.slug === slug);
  if (!mat) notFound();

  const isPremium = mat.premium;

  const descricaoExpandida: Record<string, string> = {
    'Esboços': 'Este esboço foi desenvolvido seguindo as melhores práticas homiléticas, com introdução contextualizada, desenvolvimento temático e conclusão prática. Ideal para pregadores e líderes que desejam uma estrutura sólida para suas mensagens, economizando tempo na preparação sem abrir mão da profundidade.',
    'Estudos Bíblicos': 'Este estudo bíblico aprofundado foi elaborado com base em comentários exegéticos e teológicos reconhecidos. Aborda o contexto histórico, o desenvolvimento doutrinário e a aplicação prática para a vida cristã contemporânea. Uma ferramenta indispensável para quem deseja crescer no conhecimento das Escrituras.',
    'Lições': 'Material pedagógico estruturado para ser utilizado em sala de aula, com objetivos definidos, atividades interativas e perguntas de revisão. Ideal para professores de Escola Bíblica Dominical e líderes de grupos de estudo que buscam ensinar com eficácia.',
    'Devocionais': 'Coletânea de meditações diárias ricamente comentadas, com reflexões bíblicas, orações guiadas e desafios práticos para fortalecer a intimidade com Deus. Um recurso transformador para começar o dia em comunhão com o Senhor.',
    'Apostilas': 'Apostila de formação teológica desenvolvida para uso individual ou em grupos, com conteúdo progressivo, atividades práticas e referências bibliográficas selecionadas. Excelente para programas de treinamento e capacitação ministerial.',
    'Professores': 'Guia completo para professores de EBD, com planos de aula detalhados, sugestões metodológicas, dinâmicas de grupo e recursos visuais para enriquecer as aulas. Desenvolvido por educadores cristãos com larga experiência em educação bíblica.',
    'Liderança': 'Material de capacitação para líderes ministeriais, abordando fundamentos bíblicos de liderança, gestão de conflitos, formação de discípulos e visão estratégica para o ministério. Um recurso essencial para pastores, obreiros e líderes de ministério.',
    'Evangelismo': 'Recursos práticos para evangelização pessoal e em grupo, com argumentos bíblicos, estratégias de abordagem e roteiros para discipulado. Desenvolvido para equipar cada crente a compartilhar o Evangelho com clareza e confiança.',
  };

  const descExtendida = descricaoExpandida[mat.categoria] || mat.descricao;

  const inclui: Record<string, string[]> = {
    'Esboços': ['Introdução contextualizada e envolvente', 'Pontos de desenvolvimento numerados e estruturados', 'Referências bíblicas comentadas para cada ponto', 'Ilustrações e aplicações práticas ao cotidiano', 'Conclusão com chamado à decisão ou ação'],
    'Estudos Bíblicos': ['Contexto histórico e cultural da passagem', 'Análise exegética do texto bíblico', 'Desenvolvimento doutrinário progressivo', 'Aplicação prática para a vida cristã atual', 'Perguntas para reflexão individual e em grupo'],
    'Lições': ['Objetivos pedagógicos claramente definidos', 'Atividades e dinâmicas interativas', 'Material completo para o professor e sugestões para o aluno', 'Perguntas de fixação e revisão do conteúdo', 'Sugestões de recursos visuais e complementares'],
    'Devocionais': ['30 meditações diárias ricamente comentadas', 'Versículo central e tema de cada dia', 'Reflexão espiritual aprofundada', 'Oração guiada ao final de cada meditação', 'Desafio prático para aplicação diária'],
    'Apostilas': ['Conteúdo teológico progressivo e sistemático', 'Exercícios de fixação por módulo temático', 'Glossário de termos teológicos', 'Referências bibliográficas selecionadas', 'Questões para avaliação e autoavaliação'],
    'Professores': ['Planos de aula completos e prontos para uso', 'Estratégias metodológicas variadas e testadas', 'Sugestões de dinâmicas criativas para engajamento', 'Recursos visuais e materiais de apoio pedagógico', 'Avaliações e fichas de acompanhamento do aluno'],
    'Liderança': ['Fundamentos bíblicos de liderança serva', 'Modelos e estilos de liderança cristã contemporânea', 'Gestão de pessoas, equipes e conflitos ministeriais', 'Visão e planejamento estratégico para o ministério', 'Estudo de caso com líderes bíblicos e contemporâneos'],
    'Evangelismo': ['Argumentos bíblicos fundamentais para o evangelismo', 'Roteiro prático de apresentação do Evangelho', 'Respostas às principais objeções ao Evangelho', 'Estratégias de discipulado pós-conversão', 'Modelos de follow-up e acompanhamento do novo convertido'],
  };

  const itensIncluidos = inclui[mat.categoria] || [
    'Conteúdo estruturado e revisado pela equipe editorial',
    'Referências bíblicas comentadas',
    'Aplicação prática ao contexto contemporâneo',
    'Material em formato digital de alta qualidade',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/materiais" className="hover:text-white transition-colors">Materiais</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-[#E5C05B] font-semibold truncate">{mat.titulo}</span>
      </nav>

      {/* Voltar */}
      <div>
        <Link
          href="/materiais"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#D4AF37]/50 text-xs font-semibold transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para Materiais</span>
        </Link>
      </div>

      {/* Header do Material */}
      <header className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#070D18] border border-[#D4AF37]/30 shadow-2xl">
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-950">
          <img
            src={mat.imagem}
            alt={mat.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1326] via-[#0A1326]/50 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
            {isPremium ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#D4AF37] text-slate-950 shadow-lg">
                <Crown className="w-3.5 h-3.5" />
                CONTEÚDO PREMIUM
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" />
                GRATUITO
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-700/80">
              {mat.tipo} • {mat.tamanho}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#E5C05B] bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/20">
              {mat.categoria}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{mat.nivel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {mat.titulo}
          </h1>
          <p className="text-slate-300 leading-relaxed">{mat.descricao}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {mat.publicoAlvo}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
              {mat.nivel}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-slate-500" />
              {mat.downloads.toLocaleString('pt-BR')} downloads
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Publicado em {mat.dataUpload}
            </span>
          </div>
        </div>
      </header>

      {/* Sobre Este Material */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-4">
        <h2 className="flex items-center gap-2 text-white font-bold text-xl">
          <BookOpen className="w-5 h-5 text-[#E5C05B]" />
          Sobre Este Material
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{descExtendida}</p>
      </section>

      {/* O que está incluído */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#080E1B] border border-slate-800 space-y-5">
        <h2 className="flex items-center gap-2 text-white font-bold text-xl">
          <Layers className="w-5 h-5 text-[#E5C05B]" />
          O Que Está Incluído
        </h2>
        <ul className="space-y-3">
          {itensIncluidos.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      {isPremium ? (
        <section className="p-8 rounded-2xl bg-gradient-to-br from-[#1A1200] via-[#1A0E00] to-[#100A00] border border-[#D4AF37]/30 shadow-xl space-y-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center border border-[#D4AF37]/30">
            <Crown className="w-7 h-7 text-[#E5C05B]" />
          </div>
          <h2 className="text-xl font-bold text-white">Conteúdo Premium</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            Este material faz parte da Biblioteca Premium do BH DIGITAL. Assine para ter acesso a centenas de materiais exclusivos e atualizações mensais.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/premium"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
            >
              <Crown className="w-4 h-4" />
              ASSINAR PREMIUM
            </Link>
            <Link
              href="/materiais"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-all"
            >
              Ver Materiais Gratuitos
            </Link>
          </div>
        </section>
      ) : (
        <section className="p-8 rounded-2xl bg-[#060E1A] border border-emerald-800/30 shadow-xl space-y-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <FileText className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Acesso Gratuito</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            Este material está disponível gratuitamente. Faça o login para acessar o download completo.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
          >
            <Download className="w-4 h-4" />
            ACESSAR MATERIAL
          </Link>
          <p className="text-xs text-slate-500">
            Formato {mat.tipo} • {mat.tamanho}
          </p>
        </section>
      )}

      {/* Mais materiais */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Explorar Mais em {mat.categoria}</h2>
        <Link
          href="/materiais"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/40 text-slate-300 hover:text-white text-sm font-semibold transition-all"
        >
          <Layers className="w-4 h-4 text-[#E5C05B]" />
          <span>Ver todos os materiais</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
