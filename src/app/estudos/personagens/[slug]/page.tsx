import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PERSONAGENS_BIBLICOS } from '@/lib/data/personagens';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return PERSONAGENS_BIBLICOS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const personagem = PERSONAGENS_BIBLICOS.find((p) => p.slug === slug);
  
  if (!personagem) {
    return {
      title: 'Personagem não encontrado | BH DIGITAL',
    };
  }

  return {
    title: `${personagem.nome} | Personagens Bíblicos | BH DIGITAL`,
    description: personagem.resumo,
  };
}

export default async function PersonagemDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = PERSONAGENS_BIBLICOS.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const personagem = PERSONAGENS_BIBLICOS[currentIndex];
  
  // Navigation
  const prevPersonagem = currentIndex > 0 ? PERSONAGENS_BIBLICOS[currentIndex - 1] : null;
  const nextPersonagem = currentIndex < PERSONAGENS_BIBLICOS.length - 1 ? PERSONAGENS_BIBLICOS[currentIndex + 1] : null;

  // Related (just the next 3, looping around)
  const related = [];
  for (let i = 1; i <= 3; i++) {
    related.push(PERSONAGENS_BIBLICOS[(currentIndex + i) % PERSONAGENS_BIBLICOS.length]);
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Header Banner */}
      <div className="bg-blue-900 text-white pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={personagem.imagem}
            alt="Background"
            fill
            className="object-cover blur-md"
          />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href="/estudos/personagens" className="text-blue-200 hover:text-white font-medium mb-6 inline-flex items-center transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Personagens
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {personagem.categoria}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{personagem.nome}</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl font-light">
            {personagem.resumo}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-4xl px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Image Col */}
            <div className="md:col-span-1 border-r border-gray-100">
              <div className="aspect-[3/4] md:aspect-auto md:h-full relative w-full bg-gray-100">
                <Image
                  src={personagem.imagem}
                  alt={personagem.nome}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Quick Info Col */}
            <div className="md:col-span-2 p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-900 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                Quem foi {personagem.nome}?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {personagem.quemFoi}
              </p>
              
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 shadow-sm">
                <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Referências Bíblicas Principais
                </h3>
                <p className="text-amber-800 font-medium">
                  {personagem.referenciasBiblicas}
                </p>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-100" />
          
          {/* Detailed Content */}
          <div className="p-8 lg:p-10 space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-900 pl-4">Contexto Histórico e Bíblico</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Cenário da Época</h4>
                  <p className="text-gray-700 leading-relaxed">{personagem.contextoHistorico}</p>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Significado Teológico</h4>
                  <p className="text-gray-700 leading-relaxed">{personagem.contextoBiblico}</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-900 pl-4">Principais Acontecimentos</h3>
              <ul className="space-y-4">
                {personagem.principaisAcontecimentos.map((evento, idx) => (
                  <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-50">
                    <span className="flex-shrink-0 bg-blue-100 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 shadow-sm">{idx + 1}</span>
                    <span className="text-gray-700 leading-relaxed mt-1">{evento}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Características da Fé
                </h3>
                <p className="text-gray-700 leading-relaxed">{personagem.caracteristicasDaFe}</p>
              </section>
              
              <section className="bg-red-50/30 rounded-xl p-6 border border-red-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Acertos e Desafios
                </h3>
                <p className="text-gray-700 leading-relaxed">{personagem.acertosEDesafios}</p>
              </section>
            </div>
            
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-blue-900 pl-4">Lições Espirituais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {personagem.licoes.map((licao, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-blue-900 mb-3">
                      <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">{licao}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-10 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-yellow-400">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Aplicação Prática
              </h3>
              <div className="bg-blue-800/50 p-6 rounded-xl border border-blue-700/50">
                <p className="text-blue-50 text-lg leading-relaxed font-light">
                  {personagem.aplicacaoPratica}
                </p>
              </div>
            </section>
            
          </div>
        </div>
        
        {/* Navigation Between Characters */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevPersonagem ? (
            <Link 
              href={`/estudos/personagens/${prevPersonagem.slug}`}
              className="group flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Anterior</div>
                <div className="font-bold text-gray-900 group-hover:text-blue-900">{prevPersonagem.nome}</div>
              </div>
            </Link>
          ) : <div className="hidden sm:block w-full max-w-[200px]" />}
          
          <Link 
            href="/estudos/personagens"
            className="flex flex-col items-center justify-center p-3 text-gray-500 hover:text-blue-900 transition-colors"
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-sm font-medium">Todos</span>
          </Link>

          {nextPersonagem ? (
            <Link 
              href={`/estudos/personagens/${nextPersonagem.slug}`}
              className="group flex items-center justify-center w-full sm:w-auto px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Próximo</div>
                <div className="font-bold text-gray-900 group-hover:text-blue-900">{nextPersonagem.nome}</div>
              </div>
              <svg className="w-5 h-5 ml-3 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div className="hidden sm:block w-full max-w-[200px]" />}
        </div>
        
        {/* Related Characters */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Você também pode estudar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link 
                key={rel.id} 
                href={`/estudos/personagens/${rel.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full"
              >
                <div className="aspect-[4/3] relative w-full overflow-hidden bg-gray-100">
                  <Image
                    src={rel.imagem}
                    alt={rel.nome}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                      {rel.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                    {rel.nome}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {rel.resumo}
                  </p>
                  <div className="text-blue-900 text-sm font-bold flex items-center mt-auto">
                    Estudar
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
      </div>
    </main>
  );
}
