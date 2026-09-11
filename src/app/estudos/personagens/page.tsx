import { Metadata } from 'next';
import Link from 'next/link';
import { PERSONAGENS_BIBLICOS } from '@/lib/data/personagens';
import PersonagensClient from './PersonagensClient';

export const metadata: Metadata = {
  title: 'Personagens Bíblicos | BH DIGITAL',
  description: 'Conheça a história, contexto e lições dos grandes personagens da Bíblia.',
};

export default function PersonagensPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12">
          <Link href="/estudos" className="text-blue-900 hover:text-blue-700 font-medium mb-4 inline-flex items-center transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Estudos
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personagens Bíblicos</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore a vida de homens e mulheres da Bíblia. Aprenda com suas vitórias, falhas e, acima de tudo, com a forma como Deus agiu através deles para cumprir Seus propósitos soberanos.
          </p>
        </div>

        <PersonagensClient personagens={PERSONAGENS_BIBLICOS} />
      </div>
    </main>
  );
}
