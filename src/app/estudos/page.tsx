import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, ChevronRight } from 'lucide-react';
import { MOCK_ESTUDOS } from '@/lib/mockData';
import { Pagination } from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Estudos Bíblicos',
  description: 'Conteúdos bíblicos organizados por eixos temáticos: exegese, teologia, vida cristã, liderança, família e oração.',
};

const CATEGORIAS = [
  { label: 'Todos', slug: '' },
  { label: 'Esboços', slug: 'esbocos' },
  { label: 'Estudos Bíblicos', slug: 'estudos-biblicos' },
  { label: 'Personagens Bíblicos', slug: 'personagens' },
  { label: 'Parábolas', slug: 'parabolas' },
  { label: 'Fé', slug: 'fe' },
  { label: 'Oração', slug: 'oracao' },
  { label: 'Família', slug: 'familia' },
  { label: 'Vida Cristã', slug: 'vida-crista' },
  { label: 'Evangelismo', slug: 'evangelismo' },
];

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const ITEMS_PER_PAGE = 12;

export default async function EstudosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const totalItems = MOCK_ESTUDOS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const currentItems = MOCK_ESTUDOS.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Crescimento Teológico e Edificação</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">ESTUDOS BÍBLICOS</h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
          Conteúdos bíblicos organizados por eixos temáticos para enriquecer seu conhecimento das Escrituras e preparar mensagens de impacto.
        </p>
      </div>

      {/* Filtro de Categorias */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug ? `/estudos/${cat.slug}` : '/estudos'}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              !cat.slug
                ? 'bg-[#1E3A8A] text-white border-blue-800'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Grid de Estudos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((estudo) => (
          <Link
            href={`/estudos/${slugify(estudo.categoria)}/${estudo.slug}`}
            key={estudo.id}
            className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={estudo.imagem}
                alt={estudo.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070D18]/90 backdrop-blur-sm border border-[#D4AF37]/40 text-[#E5C05B] text-[11px] font-bold">
                {estudo.categoria}
              </div>
              {estudo.destaque && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#D4AF37] text-slate-950 text-[10px] font-extrabold">
                  DESTAQUE
                </div>
              )}
              <div className="absolute bottom-2 right-3 text-[10px] text-slate-300 bg-black/70 px-2 py-0.5 rounded">
                {estudo.tempoLeitura}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] font-medium text-[#D4AF37]">{estudo.referencia}</div>
                <h2 className="text-lg font-bold text-white leading-snug group-hover:text-[#E5C05B] transition-colors line-clamp-2">
                  {estudo.titulo}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{estudo.resumo}</p>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{estudo.data} · {estudo.autor}</span>
                <span
                  className="text-xs font-bold text-white group-hover:text-[#E5C05B] flex items-center gap-1 transition-colors"
                >
                  <span>Ler</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination totalPages={totalPages} />

    </div>
  );
}
