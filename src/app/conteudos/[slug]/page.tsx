import { notFound } from 'next/navigation';
import { MOCK_CONTEUDOS } from '@/lib/mockData';
import { ConteudoItem } from '@/types';
import { ConteudoDetailClient } from './ConteudoDetailClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const conteudos = MOCK_CONTEUDOS as unknown as ConteudoItem[];
  return conteudos.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const conteudos = MOCK_CONTEUDOS as unknown as ConteudoItem[];
  const item = conteudos.find((c) => c.slug === resolvedParams.slug);

  if (!item) {
    return {
      title: 'Conteúdo não encontrado | BH DIGITAL',
    };
  }

  return {
    title: `${item.titulo} | BH DIGITAL`,
    description: item.resumo,
  };
}

export default async function ConteudoPage({ params }: Props) {
  const resolvedParams = await params;
  const conteudos = MOCK_CONTEUDOS as unknown as ConteudoItem[];
  const conteudo = conteudos.find((c) => c.slug === resolvedParams.slug);

  if (!conteudo) {
    notFound();
  }

  // Get related contents (scoring by category and keyword match)
  const stopwords = ['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'que', 'como', 'sobre'];
  const titleWords = conteudo.titulo.toLowerCase().split(/\s+/).filter(w => !stopwords.includes(w) && w.length > 3);
  
  const relacionados = conteudos
    .filter((c) => c.id !== conteudo.id)
    .map(c => {
      let score = 0;
      if (c.categoria === conteudo.categoria) score += 5;
      const otherTitleWords = c.titulo.toLowerCase();
      titleWords.forEach(tw => {
        if (otherTitleWords.includes(tw)) score += 2;
      });
      return { item: c, score };
    })
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(c => c.item)
    .slice(0, 3);
  
  // Se não achar nada muito relacionado, apenas pega da mesma categoria
  if (relacionados.length === 0) {
    relacionados.push(...conteudos.filter((c) => c.categoria === conteudo.categoria && c.id !== conteudo.id).slice(0, 3));
  }

  // Get prev/next contents
  const currentIndex = conteudos.findIndex((c) => c.id === conteudo.id);
  const anterior = currentIndex > 0 ? conteudos[currentIndex - 1] : null;
  const proximo = currentIndex < conteudos.length - 1 ? conteudos[currentIndex + 1] : null;

  return (
    <ConteudoDetailClient 
      conteudo={conteudo} 
      relacionados={relacionados} 
      anterior={anterior}
      proximo={proximo}
    />
  );
}
