import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_DEVOCIONAIS } from '@/lib/data/devocionais';
import { DevocionalDetailClient } from './DevocionalDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_DEVOCIONAIS.map((dev) => ({
    slug: dev.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const devocional = MOCK_DEVOCIONAIS.find((d) => d.slug === slug);
  if (!devocional) {
    return { title: 'Devocional Não Encontrado' };
  }
  return {
    title: `${devocional.titulo} | BH Digital`,
    description: devocional.resumo,
  };
}

export default async function DevocionalDetailPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = MOCK_DEVOCIONAIS.findIndex((d) => d.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const devocional = MOCK_DEVOCIONAIS[currentIndex];
  
  // Previous is visually "Yesterday" (index - 1)
  const anterior = currentIndex > 0 ? {
    slug: MOCK_DEVOCIONAIS[currentIndex - 1].slug,
    titulo: MOCK_DEVOCIONAIS[currentIndex - 1].titulo
  } : null;

  // Next is visually "Tomorrow" (index + 1)
  const proximo = currentIndex < MOCK_DEVOCIONAIS.length - 1 ? {
    slug: MOCK_DEVOCIONAIS[currentIndex + 1].slug,
    titulo: MOCK_DEVOCIONAIS[currentIndex + 1].titulo
  } : null;

  return (
    <DevocionalDetailClient 
      devocional={devocional} 
      anterior={anterior} 
      proximo={proximo} 
    />
  );
}
