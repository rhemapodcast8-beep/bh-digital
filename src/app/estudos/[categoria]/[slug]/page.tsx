import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_ESTUDOS } from '@/lib/mockData';
import { EstudoDetailClient } from '@/components/estudos/EstudoDetailClient';

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface Props {
  params: Promise<{ categoria: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, slug } = await params;
  const estudo = MOCK_ESTUDOS.find((e) => slugify(e.categoria) === categoria && e.slug === slug);
  
  if (!estudo) {
    return { title: 'Estudo Não Encontrado' };
  }
  return {
    title: `${estudo.titulo} | BH Digital`,
    description: estudo.resumo,
  };
}

export default async function CategoriaEstudoDetailPage({ params }: Props) {
  const { categoria, slug } = await params;
  
  const estudosDaCategoria = MOCK_ESTUDOS.filter(e => slugify(e.categoria) === categoria);
  const currentIndex = estudosDaCategoria.findIndex(e => e.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const estudo = estudosDaCategoria[currentIndex];
  
  const anterior = currentIndex > 0 
    ? { slug: estudosDaCategoria[currentIndex - 1].slug, titulo: estudosDaCategoria[currentIndex - 1].titulo } 
    : null;
    
  const proximo = currentIndex < estudosDaCategoria.length - 1 
    ? { slug: estudosDaCategoria[currentIndex + 1].slug, titulo: estudosDaCategoria[currentIndex + 1].titulo } 
    : null;

  const relacionados = estudosDaCategoria
    .filter(e => e.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <EstudoDetailClient 
      estudo={estudo} 
      categoriaSlug={categoria} 
      anterior={anterior} 
      proximo={proximo} 
      relacionados={relacionados}
    />
  );
}
