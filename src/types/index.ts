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
  | 'Bíblia'
  | 'Teologia'
  | 'Vida Cristã'
  | 'Família'
  | 'Oração'
  | 'Fé'
  | 'Evangelização'
  | 'Liderança'
  | 'Jovens'
  | 'Doutrina'
  | 'Personagens Bíblicos'
  | 'Antigo Testamento'
  | 'Novo Testamento'
  | 'Escatologia'
  | 'Espiritualidade'
  | 'Esboço'
  | 'Esboços'
  | 'Personagem'
  | 'Parábola'
  | 'Parábolas'
  | 'Evangelismo'
  | 'Estudo Bíblico';

export interface EstudoPonto {
  titulo: string;
  explicacao: string;
  referenciaBiblica: string;
  comentario: string;
  aplicacaoPratica: string;
}

export interface EstudoItem {
  id: string;
  slug: string;
  titulo: string;
  categoria: EstudoCategoria;
  referencia: string;
  autor: string;
  data: string;
  tempoLeitura: string;
  nivel: 'Básico' | 'Intermediário' | 'Avançado';
  resumo: string;
  
  introducao: string;
  contextoBiblico: string;
  desenvolvimento: EstudoPonto[];
  
  licoesPrincipais: string[];
  aplicacaoParaVida: string;
  perguntasReflexao: string[];
  paraMeditar: string;
  conclusao: string;
  oracaoFinal: string;
  
  imagem: string;
  destaque?: boolean;
}

export type DevocionalCategoria = 
  | 'Fé' | 'Esperança' | 'Oração' | 'Família' | 'Propósito' | 'Perseverança' 
  | 'Ansiedade e Preocupações' | 'Relacionamentos' | 'Vida com Deus' 
  | 'Santidade' | 'Gratidão' | 'Chamado' | 'Coragem' | 'Amor';

export interface DevocionalItem {
  id: string;
  slug: string;
  titulo: string;
  categoria: DevocionalCategoria;
  referenciaBiblica: string;
  versiculoPrincipal: string;
  resumo: string;
  
  reflexao: string;
  aplicacao: string;
  perguntaReflexao: string;
  oracao: string;
  desafioDoDia: string;
  
  data: string;
  tempoLeitura: string;
  imagem: string;
  versiculoChave?: string;
}

export interface LivroItem {
  id: string;
  slug: string;
  titulo: string;
  autor: string;
  descricao: string;
  categoria: string;
  formato: string;
  paginas?: number;
  imagemCapa: string;
  preco: string;
  linkCompra: string;
  linkAmazon?: string;
  linkUiclap?: string;
  destaque: boolean;
  sobre?: string;
  contexto?: string;
  temas?: string[];
  importancia?: string;
  reflexoes?: string;
  aplicacoes?: string;
}

export interface ConteudoItem {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  imagem: string;
  introducao: string;
  desenvolvimento: { titulo: string; conteudo: string }[];
  referenciasBiblicas?: string[];
  referencia?: string;
  aplicacaoPratica: string;
  conclusao: string;
  data: string;
  tempoLeitura?: string;
  autor?: string;
  relacionados?: string[];
  destaque?: boolean;
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
  bookNumber?: number;
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

export interface LeituraDiaria {
  dia: string;
  referencia: string;
  tema: string;
}

export interface LeituraClasse {
  referencia: string;
  texto: string;
}

export interface TopicoLicao {
  titulo: string;
  pontos: { titulo: string; conteudo: string }[];
  sinopse: string;
  aplicacao: string;
  auxilio: string;
}

export interface PerguntaRevisao {
  pergunta: string;
  resposta: string;
}

export interface Dinamica {
  titulo: string;
  objetivo: string;
  material: string;
  preparacao: string;
  execucao: string;
  aplicacao: string;
}

export interface Vocabulario {
  termo: string;
  definicao: string;
}

export interface LicaoBiblica {
  numero: number;
  slug: string;
  titulo: string;
  subtitulo: string; // Frase de apresentação
  trimestre: string;
  imagemCapa?: string;
  temaTrimestre: string;
  referenciaBiblica: string;
  comentarista?: string;
  data?: string;
  hinosSugeridos?: string;
  subsidioProfessor?: string;
  
  textoAureo: { referencia: string; texto: string; comentario: string };
  verdadePratica: { frase: string; explicacao: string };
  leituraDiaria: LeituraDiaria[];
  leituraClasse: LeituraClasse;
  
  introducao: string;
  palavraChave: { termo: string; explicacao: string };
  
  desenvolvimento: TopicoLicao[];
  
  comentarioProfundo: string;
  verdadeBiblica: string[];
  
  aplicacaoHoje: {
    pessoal: string;
    familia: string;
    igreja: string;
    ministerio: string;
    espiritual: string;
  };
  
  perguntasReflexao: string[];
  revisandoConteudo: PerguntaRevisao[];
  
  fraseAula: string;
  conclusao: string;
  
  dinamica: Dinamica;
  vocabulario: Vocabulario[];
  
  status: 'Disponível para Estudo' | 'Em Preparação Editorial';
  videoDemoUrl?: string;
  linkFonteExterna?: string;
}

export interface TopicoJovem {
  titulo: string;
  pontos: { titulo: string; conteudo: string }[];
  sinopse: string;
  aplicacaoJovem: string;
}

export interface LicaoBiblicaJovens {
  numero: number;
  slug: string;
  titulo: string;
  subtitulo: string; 
  trimestre: string;
  temaTrimestre: string;
  imagemCapa?: string;
  referenciaBiblica: string;
  comentarista: string;
  
  textoAureo: { referencia: string; texto: string; comentario: string };
  verdadePratica: { frase: string; explicacao: string };
  leituraDiaria: LeituraDiaria[];
  leituraClasse: LeituraClasse;
  
  introducao: string;
  palavraChave: { termo: string; explicacao: string };
  
  desenvolvimento: TopicoJovem[];
  
  comentarioBiblico: string;
  oQueABibliaEnsina: string[];
  
  aplicacaoJovem: string[];
  paraPensar: string;
  perguntasReflexao: string[];
  desafioSemana: string[];
  revisandoConteudo: PerguntaRevisao[];
  
  conclusao: string;
  
  dinamica?: Dinamica;
  vocabulario: Vocabulario[];
  
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
  slug?: string;
  titulo: string;
  categoria: MaterialCategoria;
  descricao: string;
  tipo: string;
  nivel: string;
  publicoAlvo: string;
  tamanho: string;
  downloads: number;
  dataUpload: string;
  icone: string;
  imagem: string;
  premium: boolean;
}

export interface SerieInfo {
  titulo: string;
  subtitulo: string;
  descricao: string;
  autor: string;
  totalLicoes: number;
  lancamento: string;
}
