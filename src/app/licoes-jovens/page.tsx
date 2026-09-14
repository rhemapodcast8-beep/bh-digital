import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  ChevronRight, 
  Flame, 
  Layers, 
  Target,
  Users
} from 'lucide-react';
import { MOCK_LICOES_JOVENS } from '@/lib/mockData';
import { Pagination } from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Lições Bíblicas Jovens | BH DIGITAL',
  description: 'Estudos bíblicos desenvolvidos especialmente para a juventude cristã, conectando a Palavra aos desafios do dia a dia.',
};

const ITEMS_PER_PAGE = 12;

export default async function LicoesJovensPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const totalItems = MOCK_LICOES_JOVENS.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const currentItems = MOCK_LICOES_JOVENS.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Jovens */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1E3A8A]/20 border border-[#2563EB]/30 text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">
          <Users className="w-4 h-4" />
          <span>Classe de Jovens</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Lições Bíblicas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#E5C05B]">Jovens</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium">
          Aprofunde suas raízes na Palavra com estudos dinâmicos e focados na realidade da juventude de hoje.
        </p>
      </section>

      {/* Revista Atual (Apenas na página 1) */}
      {currentPage === 1 && (
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F1E3A] via-[#0A1326] to-[#070D18] border border-[#2563EB]/30 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Flame className="w-64 h-64 text-blue-500" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/50 border border-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-widest">
                <span>CPAD • 4º Trimestre 2026</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Regozijai-vos no Senhor
              </h2>
              
              <p className="text-lg text-blue-200 font-medium">
                Vivendo com propósito à luz da Carta aos Filipenses
              </p>
              
              <div className="pt-2">
                <span className="text-sm text-slate-400 block mb-1 uppercase tracking-wider font-semibold">Comentarista</span>
                <span className="text-base text-white font-bold">Reynaldo Odilo</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
              <div className="shrink-0 w-48 sm:w-56 order-first lg:order-last">
                <Link href="/licoes-jovens">
                  <img 
                    src="/images/licoes/capas/capa-jovens-4-trimestre-2026.jpg" 
                    alt="Lições Bíblicas Jovens — 4º Trimestre 2026 — Regozijai-vos no Senhor" 
                    className="w-full h-auto object-contain rounded-xl shadow-2xl border border-slate-700/50 hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
              
              <div className="bg-[#060B14]/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Por que estudar esta revista?
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Descubra como manter a alegria verdadeira mesmo sob pressão na escola ou no trabalho.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Aprenda com Paulo sobre ter o foco e o propósito alinhados a Cristo.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Receba direcionamentos práticos para os conflitos diários da juventude.
                </li>
              </ul>
            </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid de Lições */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <Layers className="w-6 h-6 text-blue-400" />
            Índice de Lições
          </h3>
          <span className="text-sm font-medium text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            {totalItems} Lições
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((licao) => (
            <Link 
              href={`/licoes-jovens/${licao.slug}`} 
              key={licao.numero}
              className="group flex flex-col p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:bg-slate-800/80 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                {licao.imagemCapa ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700/50 shrink-0 bg-slate-900 shadow-md">
                    <img
                      src={licao.imagemCapa}
                      alt={licao.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <span className="text-5xl font-extrabold text-slate-800 group-hover:text-blue-900/50 transition-colors">
                    {licao.numero < 10 ? `0${licao.numero}` : licao.numero}
                  </span>
                )}
                <span className="px-2.5 py-1 h-fit text-[10px] uppercase font-bold tracking-wider rounded-lg bg-[#0F1E3A] text-blue-300 border border-blue-900/50">
                  {licao.trimestre.split(' ')[0]} Trimestre
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors">
                {licao.titulo}
              </h4>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{licao.referenciaBiblica.split(':')[0]}</span>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Ver Lição <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <Pagination totalPages={totalPages} />
      </section>

    </div>
  );
}
