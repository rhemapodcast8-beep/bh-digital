import type { MetadataRoute } from 'next';
import {
  MOCK_LIVROS,
  MOCK_LICOES,
  MOCK_LICOES_JOVENS,
  MOCK_DEVOCIONAIS,
  MOCK_MATERIAIS,
  CATEGORIAS_ESTUDOS,
} from '@/lib/mockData';

const BASE_URL = 'https://bhdigitaltech.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas institucionais e pilares públicos principais
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/biblia`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/estudos`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/devocionais`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/licoes`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/licoes-jovens`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/livros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/materiais`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ferramentas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/conteudos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/premium`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Categorias de estudos
  const categoriaEstudosRoutes: MetadataRoute.Sitemap = CATEGORIAS_ESTUDOS.map(
    (cat) => ({
      url: `${BASE_URL}/estudos/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  );

  // Livros
  const livroRoutes: MetadataRoute.Sitemap = MOCK_LIVROS.map((livro) => ({
    url: `${BASE_URL}/livros/${livro.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Lições Adultos
  const licaoRoutes: MetadataRoute.Sitemap = MOCK_LICOES.map((licao) => ({
    url: `${BASE_URL}/licoes/${licao.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Lições Jovens
  const licaoJovensRoutes: MetadataRoute.Sitemap = MOCK_LICOES_JOVENS.map(
    (licao) => ({
      url: `${BASE_URL}/licoes-jovens/${licao.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  );

  // Materiais
  const materialRoutes: MetadataRoute.Sitemap = MOCK_MATERIAIS.map((mat) => ({
    url: `${BASE_URL}/materiais/${mat.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Devocionais
  const devocionalRoutes: MetadataRoute.Sitemap = MOCK_DEVOCIONAIS.map((dev) => ({
    url: `${BASE_URL}/devocionais/${dev.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoriaEstudosRoutes,
    ...livroRoutes,
    ...licaoRoutes,
    ...licaoJovensRoutes,
    ...materialRoutes,
    ...devocionalRoutes,
  ];
}

