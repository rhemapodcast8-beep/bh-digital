import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
import { MOCK_DEVOCIONAIS } from '@/lib/data/devocionais';

export const metadata: Metadata = {
  title: 'Devocionais',
  description: 'Mensagens curtas diárias para reflexão e renovação espiritual baseadas nas Sagradas Escrituras.',
};

function formatDatePtBR(dateString: string) {
  // Parses YYYY-MM-DD
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return new Intl.DateTimeFormat('pt-BR', { 
    dateStyle: 'full' 
  }).format(date);
}

export default function DevocionalPage() {
  // Get today's date adjusted to local time, simple approach for "YYYY-MM-DD"
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  
  // Find index of today's devocional, fallback to first if not found (e.g. leap year issues or different year)
  let todayIndex = MOCK_DEVOCIONAIS.findIndex(d => d.data === todayStr);
  if (todayIndex === -1) todayIndex = 0;

  const destaque = MOCK_DEVOCIONAIS[todayIndex];
  
  // Get previous 6 devotionals (wrap around to previous year if we implemented it, but here just clamp to 0)
  const startIndex = Math.max(0, todayIndex - 6);
  const anteriores = MOCK_DEVOCIONAIS.slice(startIndex, todayIndex).reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">

      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Inspiração para o Seu Dia</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">DEVOCIONAIS</h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
          Mensagens curtas e reflexivas para renovação espiritual diária, baseadas nas Sagradas Escrituras.
        </p>
      </div>

      {/* Devocional em Destaque */}
      {destaque && (
        <Link 
          href={`/devocionais/${destaque.slug}`}
          className="block rounded-3xl bg-gradient-to-br from-[#0C1833] via-[#091226] to-[#070D1C] border border-blue-900/70 overflow-hidden shadow-2xl group transition-all hover:border-[#D4AF37]/50"
        >
          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={destaque.imagem}
              alt={destaque.titulo}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1833] via-[#0C1833]/60 to-transparent" />
            <div className="absolute top-4 left-6 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
              Devocional de Hoje
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
            <div className="text-xs text-slate-500 capitalize">{formatDatePtBR(destaque.data)} · {destaque.tempoLeitura} de leitura</div>
            <div
              className="inline-flex py-3 px-6 rounded-xl bg-slate-900 group-hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 items-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <span>LER DEVOCIONAL COMPLETO</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#E5C05B] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      )}

      {/* Outros Devocionais */}
      {anteriores.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Devocionais Anteriores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anteriores.map((dev) => (
              <Link
                href={`/devocionais/${dev.slug}`}
                key={dev.id}
                className="rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-slate-700 hover:border-[#D4AF37]/30 overflow-hidden flex flex-col transition-all hover:-translate-y-1 shadow-md group"
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
                  <h3 className="text-sm font-bold text-white">{dev.titulo}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">{dev.resumo}</p>
                  <blockquote className="text-xs italic text-slate-400 border-l border-[#D4AF37]/50 pl-3 line-clamp-2">
                    {dev.versiculoPrincipal}
                  </blockquote>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
