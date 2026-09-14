import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, ChevronRight } from 'lucide-react';
import { MOCK_ESTUDOS } from '@/lib/mockData';
import { Pagination } from '@/components/ui/Pagination';

const CATEGORIAS_MAP: Record<string, string> = {
  'parabolas': 'Parábolas',
  'fe': 'Fé',
  'oracao': 'Oração',
  'familia': 'Família',
  'vida-crista': 'Vida Cristã',
  'evangelismo': 'Evangelismo',
  'esbocos': 'Esboços',
  'estudos-biblicos': 'Estudos Bíblicos'
};

interface Props {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const nomeCategoria = CATEGORIAS_MAP[categoria];
  
  if (!nomeCategoria) {
    return { title: 'Categoria Não Encontrada' };
  }
  
  return {
    title: `${nomeCategoria} | Estudos Bíblicos`,
    description: `Navegue pelos estudos bíblicos da categoria ${nomeCategoria}.`,
  };
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const ITEMS_PER_PAGE = 12;

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { categoria } = await params;
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const nomeCategoria = CATEGORIAS_MAP[categoria];
  
  if (!nomeCategoria) {
    notFound();
  }

  const estudosDaCategoria = MOCK_ESTUDOS.filter(e => slugify(e.categoria) === categoria);
  const totalItems = estudosDaCategoria.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = estudosDaCategoria.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="space-y-4">
        <Link href="/estudos" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Voltar para Estudos</span>
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{nomeCategoria}</h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
          Navegue por nossa biblioteca de conteúdos exclusivos sobre este tema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((estudo) => (
          <Link href={`/estudos/${categoria}/${estudo.slug}`} key={estudo.id} className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer">
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
                <span className="text-[11px] text-slate-500">{estudo.data}</span>
                <span className="text-xs font-bold text-white group-hover:text-[#E5C05B] flex items-center gap-1 transition-colors">
                  <span>Estudar</span>
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
