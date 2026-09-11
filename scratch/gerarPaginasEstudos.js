const fs = require('fs');
const path = require('path');

const categorias = [
  { slug: 'esbocos', titulo: 'Esboços de Pregação', mock: 'MOCK_ESBOCOS' },
  { slug: 'estudos-biblicos', titulo: 'Estudos Bíblicos', mock: 'MOCK_ESTUDOS_BIBLICOS' },
  { slug: 'personagens', titulo: 'Personagens Bíblicos', mock: 'MOCK_PERSONAGENS' },
  { slug: 'parabolas', titulo: 'Parábolas', mock: 'MOCK_PARABOLAS' },
  { slug: 'fe', titulo: 'Estudos sobre Fé', mock: 'MOCK_FE' }
];

const pageTemplate = (titulo, mock) => `import type { Metadata } from 'next';
import Link from 'next/link';
import { BookMarked, ChevronRight } from 'lucide-react';
import { ${mock} } from '@/lib/data/mockCategorias';

export const metadata: Metadata = {
  title: '${titulo}',
  description: '${titulo} para sua edificação e ministério.',
};

export default function CategoriaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="space-y-4">
        <Link href="/estudos" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Voltar para Estudos</span>
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">${titulo}</h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
          Navegue por nossa biblioteca de conteúdos exclusivos sobre este tema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {${mock}.map((estudo) => (
          <Link href={\`/estudos/conteudo/\${estudo.slug}\`} key={estudo.id} className="group rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer">
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-800 group-hover:scale-105 transition-transform">
                [Imagem: {estudo.titulo}]
              </div>
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
    </div>
  );
}
`;

categorias.forEach(cat => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'estudos', cat.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageTemplate(cat.titulo, cat.mock));
});

console.log('Páginas de categorias criadas!');
