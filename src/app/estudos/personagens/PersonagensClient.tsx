"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PersonagemBiblico } from '@/lib/data/personagens';

interface Props {
  personagens: PersonagemBiblico[];
}

export default function PersonagensClient({ personagens }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersonagens = personagens.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.nome.toLowerCase().includes(term) ||
      p.categoria.toLowerCase().includes(term) ||
      p.resumo.toLowerCase().includes(term) ||
      p.quemFoi.toLowerCase().includes(term) ||
      p.caracteristicasDaFe.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className="mb-8 relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Pesquisar personagem (ex: rei, profeta, fé...)"
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-shadow text-gray-700 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPersonagens.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow-sm border border-gray-100">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum personagem encontrado</h3>
          <p className="text-gray-500">
            Não encontramos resultados para "{searchTerm}". Tente usar outros termos.
          </p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-900 font-medium rounded-lg hover:bg-blue-200 transition-colors"
          >
            Limpar pesquisa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPersonagens.map((personagem) => (
            <Link 
              key={personagem.id} 
              href={`/estudos/personagens/${personagem.slug}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative"
            >
              <div className="aspect-[4/3] relative w-full overflow-hidden bg-gray-100">
                <Image
                  src={personagem.imagem}
                  alt={personagem.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm border border-blue-800/50">
                    {personagem.categoria}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col relative z-10 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors">
                  {personagem.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {personagem.resumo}
                </p>
                <div className="text-blue-900 text-sm font-bold flex items-center mt-auto opacity-90 group-hover:opacity-100">
                  Estudar personagem
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
