import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_LIVROS } from '@/lib/mockData';
import LivroDetailClient from './LivroDetailClient';

export function generateStaticParams() {
  return MOCK_LIVROS.map((livro) => ({
    slug: livro.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const livro = MOCK_LIVROS.find((l) => l.slug === slug);

  if (!livro) {
    return {
      title: 'Livro não encontrado | BH DIGITAL',
    };
  }

  return {
    title: `${livro.titulo} | BH DIGITAL`,
    description: livro.descricao,
  };
}

export default async function LivroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const livro = MOCK_LIVROS.find((l) => l.slug === slug);

  if (!livro) {
    notFound();
  }

  const relacionados = MOCK_LIVROS
    .filter((l) => l.id !== livro.id && l.categoria === livro.categoria)
    .slice(0, 3);
    
  if (relacionados.length < 3) {
      const adicionais = MOCK_LIVROS.filter((l) => l.id !== livro.id && !relacionados.includes(l)).slice(0, 3 - relacionados.length);
      relacionados.push(...adicionais);
  }

  return <LivroDetailClient livro={livro} relacionados={relacionados} />;
}
