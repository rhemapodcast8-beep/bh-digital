export type PageRoute = 
  | '/'
  | '/biblia'
  | '/estudos'
  | '/estudos/esbocos'
  | '/estudos/estudos-biblicos'
  | '/estudos/personagens'
  | '/estudos/parabolas'
  | '/estudos/fe'
  | '/estudos/oracao'
  | '/estudos/familia'
  | '/estudos/vida-crista'
  | '/estudos/evangelismo'
  | '/licoes'
  | '/devocionais'
  | '/livros'
  | '/materiais'
  | '/conteudos'
  | '/ferramentas'
  | '/premium'
  | '/login'
  | '/cadastro'
  | '/perfil'
  | '/admin';

export type EstudoCategoria = 
  | 'Esboços'
  | 'Estudos Bíblicos'
  | 'Personagens Bíblicos'
  | 'Parábolas'
  | 'Fé'
  | 'Oração'
  | 'Família'
  | 'Vida Cristã'
  | 'Evangelismo';

export interface EstudoItem {
  id: string;
  slug: string;
  titulo: string;
  categoria: EstudoCategoria;
  referencia: string;
  autor: string;
  data: string;
  tempoLeitura: string;
  resumo: string;
  conteudo: string[];
  imagem: string;
  destaque?: boolean;
}

export interface DevocionalItem {
  id: string;
  slug: string;
  titulo: string;
  referenciaBiblica: string;
  resumo: string;
  conteudo: string[];
  data: string;
  tempoLeitura: string;
  imagem: string;
  versiculoChave: string;
}

export interface LivroItem {
  id: string;
  slug: string;
  titulo: string;
  autor: string;
  descricaoCurta: string;
  descricaoCompleta: string[];
  capa: string;
  tipo: 'Livro Físico' | 'E-book' | 'Ambos';
  linkAmazon: string;
  linkUiclap: string;
  paginas?: number;
  ano?: string;
  formato?: string;
}

export interface ConteudoItem {
  id: string;
  titulo: string;
  plataforma: 'YouTube' | 'TikTok' | 'Kwai';
  descricao: string;
  duracao: string;
  data: string;
  url: string;
  visualizacoes: string;
  thumbnail: string;
  categoria: string;
}

export interface FerramentaItem {
  id: string;
  nome: string;
  subtitulo: string;
  descricao: string;
  recursos: string[];
  logo: string;
  url: string;
  badge?: string;
  tipo: 'Aplicativo' | 'Plataforma Web' | 'Sistema CRM';
}

export interface LivroBiblico {
  id: string;
  nome: string;
  abreviacao: string;
  testamento: 'Antigo' | 'Novo';
  capitulosCount: number;
  grupo: 'Pentateuco' | 'Históricos' | 'Poéticos' | 'Profetas' | 'Evangelhos' | 'Epístolas' | 'Revelação';
}

export interface VersiculoDemonstrativo {
  numero: number;
  texto: string;
}

export interface LicaoBiblica {
  numero: number;
  titulo: string;
  subtitulo: string;
  referenciaBiblica: string;
  temaCentral: string;
  resumo: string;
  objetivos: string[];
  estudoComplementar: string;
  videoDemoUrl?: string;
  linkFonteExterna?: string;
  status: 'Disponível para Estudo' | 'Em Preparação Editorial';
}

export type MaterialCategoria = 
  | 'Esboços'
  | 'Estudos Bíblicos'
  | 'Lições'
  | 'Devocionais'
  | 'Apostilas'
  | 'Professores'
  | 'Liderança'
  | 'Evangelismo';

export interface MaterialItem {
  id: string;
  titulo: string;
  categoria: MaterialCategoria;
  descricao: string;
  imagem: string;
  tipoAcesso: 'Gratuito' | 'Premium';
  formato: 'PDF' | 'Apostila' | 'Esboço' | 'Roteiro';
  paginas?: number;
  data: string;
  downloadUrl?: string;
  autor?: string;
}
