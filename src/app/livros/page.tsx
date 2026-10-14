import type { Metadata } from 'next';
import { MOCK_LIVROS } from '@/lib/mockData';
import { LivrosClient } from './LivrosClient';

export const metadata: Metadata = {
  title: 'Livros | BH DIGITAL',
  description: 'Obras de Bruno Henrique: Quando Deus Sopra e Jesus em Parábolas de Mateus. Formação teológica, espiritualidade e edificação cristã.',
};

export default function LivrosPage() {
  // As duas obras principais do autor Bruno Henrique
  const obrasPrincipais = MOCK_LIVROS.filter((l) => l.destaque);

  return <LivrosClient obrasPrincipais={obrasPrincipais} />;
}
