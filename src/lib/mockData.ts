import { 
  EstudoItem, 
  DevocionalItem, 
  LivroItem, 
  ConteudoItem, 
  FerramentaItem, 
  LivroBiblico, 
  EstudoCategoria,
  LicaoBiblica,
  MaterialItem,
  MaterialCategoria
} from '@/types';

// Re-exportações das lições (Adultos e Jovens)
export { MOCK_LICOES } from './mockLicoes';
export { MOCK_LICOES_JOVENS } from './mockLicoesJovens';

// Dados Dinâmicos Gerados Massivamente
import { MOCK_ESTUDOS_COMPLETOS } from './data/estudos';
import { MOCK_ESTUDOS_GERADOS } from './data/estudos_gerados';
import { MOCK_ESBOCOS_GERADOS } from './data/esbocos_gerados';
export const MOCK_ESTUDOS = [...MOCK_ESTUDOS_COMPLETOS, ...MOCK_ESTUDOS_GERADOS, ...MOCK_ESBOCOS_GERADOS];
export { MOCK_DEVOCIONAIS } from './data/devocionais';
export { MOCK_MATERIAIS_COMPLETOS as MOCK_MATERIAIS } from './data/materiais';
export { MOCK_LIVROS_COMPLETOS as MOCK_LIVROS } from './data/livros';
export { MOCK_CONTEUDOS } from './data/conteudos';

// Constantes e Categorias (Mantidas aqui para configurações do site)
export const CATEGORIAS_ESTUDOS: { id: EstudoCategoria; slug: string; desc: string }[] = [
  { id: 'Bíblia', slug: 'biblia', desc: 'Introdução, panorama e doutrinas da Palavra' },
  { id: 'Teologia', slug: 'teologia', desc: 'Estudos profundos sobre os mistérios de Deus' },
  { id: 'Vida Cristã', slug: 'vida-crista', desc: 'Caminhada diária e santificação' },
  { id: 'Família', slug: 'familia', desc: 'Casamento, filhos e o lar cristão' },
  { id: 'Oração', slug: 'oracao', desc: 'Intimidade com o Senhor e intercessão' },
  { id: 'Fé', slug: 'fe', desc: 'Perseverança e milagres em meio às lutas' },
  { id: 'Evangelização', slug: 'evangelizacao', desc: 'Como compartilhar Jesus no dia a dia' },
  { id: 'Liderança', slug: 'lideranca', desc: 'Princípios para obreiros e ministros' },
  { id: 'Jovens', slug: 'jovens', desc: 'Temas contemporâneos e cristãos' },
  { id: 'Doutrina', slug: 'doutrina', desc: 'Os pilares inegociáveis da fé cristã' },
  { id: 'Personagens Bíblicos', slug: 'personagens-biblicos', desc: 'O que podemos aprender com heróis da fé' },
  { id: 'Antigo Testamento', slug: 'antigo-testamento', desc: 'A sombra dos bens vindouros' },
  { id: 'Novo Testamento', slug: 'novo-testamento', desc: 'A revelação do Cordeiro' },
  { id: 'Escatologia', slug: 'escatologia', desc: 'O fim dos tempos e o porvir' },
  { id: 'Espiritualidade', slug: 'espiritualidade', desc: 'Avivamento e dons espirituais' }
];

export const CATEGORIAS_MATERIAIS: { id: MaterialCategoria; desc: string; icon: string }[] = [
  { id: 'Esboços', desc: 'Estruturas analíticas e homiléticas para pregação', icon: 'FileText' },
  { id: 'Estudos Bíblicos', desc: 'Tratados e comentários temáticos detalhados', icon: 'BookOpen' },
  { id: 'Lições', desc: 'Roteiros de ensino bíblico e classes', icon: 'GraduationCap' },
  { id: 'Devocionais', desc: 'Coletâneas de meditações diárias comentadas', icon: 'Sparkles' },
  { id: 'Apostilas', desc: 'Cadernos de estudo sistemático e formação teológica', icon: 'BookMarked' },
  { id: 'Professores', desc: 'Planos de aula, dinâmicas e roteiros didáticos', icon: 'Users' },
  { id: 'Liderança', desc: 'Guias e orientações para pastores e líderes de ministério', icon: 'Compass' },
  { id: 'Evangelismo', desc: 'Folhetos digitais, argumentos e estratégias de discipulado', icon: 'Share2' }
];

export const MOCK_FERRAMENTAS: FerramentaItem[] = [
  {
    id: 'biblia-sagrada-bh',
    nome: 'BÍBLIA SAGRADA BH',
    subtitulo: 'Aplicativo Oficial para Android',
    descricao: 'Leia a Bíblia completa, acompanhe devocionais diários, ouça capítulos narrados com clareza, crie favoritos, configure lembretes e utilize o modo escuro sem distrações.',
    recursos: [
      'Texto bíblico completo e navegação ágil',
      'Devocionais diários com notificações',
      'Áudio dos capítulos para ouvir onde estiver',
      'Marcadores, favoritos e anotações pessoais',
      'Lembretes personalizados de leitura diária',
      'Modo escuro confortável para leitura noturna'
    ],
    logo: 'Smartphone',
    url: 'https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app',
    badge: 'App Oficial Google Play',
    tipo: 'Aplicativo'
  },
  {
    id: 'estuda-facil',
    nome: 'ESTUDA-FÁCIL',
    subtitulo: 'Plataforma de Organização de Estudos',
    descricao: 'Ambiente digital focado em simplificar a criação de esboços, catalogar tópicos bíblicos, fazer referências cruzadas e organizar anotações de aulas e sermões.',
    recursos: [
      'Editor de esboços com formatação bíblica',
      'Biblioteca temática de tópicos e referências',
      'Exportação para PDF e compartilhamento rápido',
      'Pastas por séries de pregações e temas'
    ],
    logo: 'BookOpenCheck',
    url: '#estuda-facil',
    badge: 'Ferramenta de Estudos',
    tipo: 'Plataforma Web'
  },
  {
    id: 'wipe-crm',
    nome: 'WIPE CRM',
    subtitulo: 'Gestão e Relacionamento Inteligente',
    descricao: 'Plataforma moderna de CRM para gestão de contatos, membros, acompanhamento de etapas, comunicação integrada e organização de fluxos ministeriais e corporativos.',
    recursos: [
      'Gestão centralizada de contatos e membros',
      'Pipelines visuais de acompanhamento',
      'Histórico de interações e tarefas',
      'Relatórios e métricas de engajamento'
    ],
    logo: 'Layers',
    url: '#wipe-crm',
    badge: 'CRM Integrado',
    tipo: 'Sistema CRM'
  }
];

export const LIVROS_BIBLICOS: LivroBiblico[] = [
  // Antigo Testamento (39)
  { id: 'gn', bookNumber: 1, nome: 'Gênesis', abreviacao: 'Gn', testamento: 'Antigo', capitulosCount: 50, grupo: 'Pentateuco' },
  { id: 'ex', bookNumber: 2, nome: 'Êxodo', abreviacao: 'Êx', testamento: 'Antigo', capitulosCount: 40, grupo: 'Pentateuco' },
  { id: 'lv', bookNumber: 3, nome: 'Levítico', abreviacao: 'Lv', testamento: 'Antigo', capitulosCount: 27, grupo: 'Pentateuco' },
  { id: 'nm', bookNumber: 4, nome: 'Números', abreviacao: 'Nm', testamento: 'Antigo', capitulosCount: 36, grupo: 'Pentateuco' },
  { id: 'dt', bookNumber: 5, nome: 'Deuteronômio', abreviacao: 'Dt', testamento: 'Antigo', capitulosCount: 34, grupo: 'Pentateuco' },
  { id: 'js', bookNumber: 6, nome: 'Josué', abreviacao: 'Js', testamento: 'Antigo', capitulosCount: 24, grupo: 'Históricos' },
  { id: 'jz', bookNumber: 7, nome: 'Juízes', abreviacao: 'Jz', testamento: 'Antigo', capitulosCount: 21, grupo: 'Históricos' },
  { id: 'rt', bookNumber: 8, nome: 'Rute', abreviacao: 'Rt', testamento: 'Antigo', capitulosCount: 4, grupo: 'Históricos' },
  { id: '1sm', bookNumber: 9, nome: '1 Samuel', abreviacao: '1Sm', testamento: 'Antigo', capitulosCount: 31, grupo: 'Históricos' },
  { id: '2sm', bookNumber: 10, nome: '2 Samuel', abreviacao: '2Sm', testamento: 'Antigo', capitulosCount: 24, grupo: 'Históricos' },
  { id: '1rs', bookNumber: 11, nome: '1 Reis', abreviacao: '1Rs', testamento: 'Antigo', capitulosCount: 22, grupo: 'Históricos' },
  { id: '2rs', bookNumber: 12, nome: '2 Reis', abreviacao: '2Rs', testamento: 'Antigo', capitulosCount: 25, grupo: 'Históricos' },
  { id: '1cr', bookNumber: 13, nome: '1 Crônicas', abreviacao: '1Cr', testamento: 'Antigo', capitulosCount: 29, grupo: 'Históricos' },
  { id: '2cr', bookNumber: 14, nome: '2 Crônicas', abreviacao: '2Cr', testamento: 'Antigo', capitulosCount: 36, grupo: 'Históricos' },
  { id: 'ed', bookNumber: 15, nome: 'Esdras', abreviacao: 'Ed', testamento: 'Antigo', capitulosCount: 10, grupo: 'Históricos' },
  { id: 'ne', bookNumber: 16, nome: 'Neemias', abreviacao: 'Ne', testamento: 'Antigo', capitulosCount: 13, grupo: 'Históricos' },
  { id: 'et', bookNumber: 17, nome: 'Ester', abreviacao: 'Et', testamento: 'Antigo', capitulosCount: 10, grupo: 'Históricos' },
  { id: 'jo', bookNumber: 18, nome: 'Jó', abreviacao: 'Jó', testamento: 'Antigo', capitulosCount: 42, grupo: 'Poéticos' },
  { id: 'sl', bookNumber: 19, nome: 'Salmos', abreviacao: 'Sl', testamento: 'Antigo', capitulosCount: 150, grupo: 'Poéticos' },
  { id: 'pv', bookNumber: 20, nome: 'Provérbios', abreviacao: 'Pv', testamento: 'Antigo', capitulosCount: 31, grupo: 'Poéticos' },
  { id: 'ec', bookNumber: 21, nome: 'Eclesiastes', abreviacao: 'Ec', testamento: 'Antigo', capitulosCount: 12, grupo: 'Poéticos' },
  { id: 'ct', bookNumber: 22, nome: 'Cânticos', abreviacao: 'Ct', testamento: 'Antigo', capitulosCount: 8, grupo: 'Poéticos' },
  { id: 'is', bookNumber: 23, nome: 'Isaías', abreviacao: 'Is', testamento: 'Antigo', capitulosCount: 66, grupo: 'Profetas' },
  { id: 'jr', bookNumber: 24, nome: 'Jeremias', abreviacao: 'Jr', testamento: 'Antigo', capitulosCount: 52, grupo: 'Profetas' },
  { id: 'lm', bookNumber: 25, nome: 'Lamentações', abreviacao: 'Lm', testamento: 'Antigo', capitulosCount: 5, grupo: 'Profetas' },
  { id: 'ez', bookNumber: 26, nome: 'Ezequiel', abreviacao: 'Ez', testamento: 'Antigo', capitulosCount: 48, grupo: 'Profetas' },
  { id: 'dn', bookNumber: 27, nome: 'Daniel', abreviacao: 'Dn', testamento: 'Antigo', capitulosCount: 12, grupo: 'Profetas' },
  { id: 'os', bookNumber: 28, nome: 'Oséias', abreviacao: 'Os', testamento: 'Antigo', capitulosCount: 14, grupo: 'Profetas' },
  { id: 'jl', bookNumber: 29, nome: 'Joel', abreviacao: 'Jl', testamento: 'Antigo', capitulosCount: 3, grupo: 'Profetas' },
  { id: 'am', bookNumber: 30, nome: 'Amós', abreviacao: 'Am', testamento: 'Antigo', capitulosCount: 9, grupo: 'Profetas' },
  { id: 'ob', bookNumber: 31, nome: 'Obadias', abreviacao: 'Ob', testamento: 'Antigo', capitulosCount: 1, grupo: 'Profetas' },
  { id: 'jn', bookNumber: 32, nome: 'Jonas', abreviacao: 'Jn', testamento: 'Antigo', capitulosCount: 4, grupo: 'Profetas' },
  { id: 'mq', bookNumber: 33, nome: 'Miquéias', abreviacao: 'Mq', testamento: 'Antigo', capitulosCount: 7, grupo: 'Profetas' },
  { id: 'na', bookNumber: 34, nome: 'Naum', abreviacao: 'Na', testamento: 'Antigo', capitulosCount: 3, grupo: 'Profetas' },
  { id: 'hab', bookNumber: 35, nome: 'Habacuque', abreviacao: 'Hab', testamento: 'Antigo', capitulosCount: 3, grupo: 'Profetas' },
  { id: 'sf', bookNumber: 36, nome: 'Sofonias', abreviacao: 'Sf', testamento: 'Antigo', capitulosCount: 3, grupo: 'Profetas' },
  { id: 'ag', bookNumber: 37, nome: 'Ageu', abreviacao: 'Ag', testamento: 'Antigo', capitulosCount: 2, grupo: 'Profetas' },
  { id: 'zc', bookNumber: 38, nome: 'Zacarias', abreviacao: 'Zc', testamento: 'Antigo', capitulosCount: 14, grupo: 'Profetas' },
  { id: 'ml', bookNumber: 39, nome: 'Malaquias', abreviacao: 'Ml', testamento: 'Antigo', capitulosCount: 4, grupo: 'Profetas' },

  // Novo Testamento (27)
  { id: 'mt', bookNumber: 40, nome: 'Mateus', abreviacao: 'Mt', testamento: 'Novo', capitulosCount: 28, grupo: 'Evangelhos' },
  { id: 'mc', bookNumber: 41, nome: 'Marcos', abreviacao: 'Mc', testamento: 'Novo', capitulosCount: 16, grupo: 'Evangelhos' },
  { id: 'lc', bookNumber: 42, nome: 'Lucas', abreviacao: 'Lc', testamento: 'Novo', capitulosCount: 24, grupo: 'Evangelhos' },
  { id: 'joao', bookNumber: 43, nome: 'João', abreviacao: 'Jo', testamento: 'Novo', capitulosCount: 21, grupo: 'Evangelhos' },
  { id: 'at', bookNumber: 44, nome: 'Atos', abreviacao: 'At', testamento: 'Novo', capitulosCount: 28, grupo: 'Históricos' },
  { id: 'rm', bookNumber: 45, nome: 'Romanos', abreviacao: 'Rm', testamento: 'Novo', capitulosCount: 16, grupo: 'Epístolas' },
  { id: '1co', bookNumber: 46, nome: '1 Coríntios', abreviacao: '1Co', testamento: 'Novo', capitulosCount: 16, grupo: 'Epístolas' },
  { id: '2co', bookNumber: 47, nome: '2 Coríntios', abreviacao: '2Co', testamento: 'Novo', capitulosCount: 13, grupo: 'Epístolas' },
  { id: 'gl', bookNumber: 48, nome: 'Gálatas', abreviacao: 'Gl', testamento: 'Novo', capitulosCount: 6, grupo: 'Epístolas' },
  { id: 'ef', bookNumber: 49, nome: 'Efésios', abreviacao: 'Ef', testamento: 'Novo', capitulosCount: 6, grupo: 'Epístolas' },
  { id: 'fp', bookNumber: 50, nome: 'Filipenses', abreviacao: 'Fp', testamento: 'Novo', capitulosCount: 4, grupo: 'Epístolas' },
  { id: 'cl', bookNumber: 51, nome: 'Colossenses', abreviacao: 'Cl', testamento: 'Novo', capitulosCount: 4, grupo: 'Epístolas' },
  { id: '1ts', bookNumber: 52, nome: '1 Tessalonicenses', abreviacao: '1Ts', testamento: 'Novo', capitulosCount: 5, grupo: 'Epístolas' },
  { id: '2ts', bookNumber: 53, nome: '2 Tessalonicenses', abreviacao: '2Ts', testamento: 'Novo', capitulosCount: 3, grupo: 'Epístolas' },
  { id: '1tm', bookNumber: 54, nome: '1 Timóteo', abreviacao: '1Tm', testamento: 'Novo', capitulosCount: 6, grupo: 'Epístolas' },
  { id: '2tm', bookNumber: 55, nome: '2 Timóteo', abreviacao: '2Tm', testamento: 'Novo', capitulosCount: 4, grupo: 'Epístolas' },
  { id: 'tt', bookNumber: 56, nome: 'Tito', abreviacao: 'Tt', testamento: 'Novo', capitulosCount: 3, grupo: 'Epístolas' },
  { id: 'fm', bookNumber: 57, nome: 'Filemon', abreviacao: 'Fm', testamento: 'Novo', capitulosCount: 1, grupo: 'Epístolas' },
  { id: 'hb', bookNumber: 58, nome: 'Hebreus', abreviacao: 'Hb', testamento: 'Novo', capitulosCount: 13, grupo: 'Epístolas' },
  { id: 'tg', bookNumber: 59, nome: 'Tiago', abreviacao: 'Tg', testamento: 'Novo', capitulosCount: 5, grupo: 'Epístolas' },
  { id: '1pe', bookNumber: 60, nome: '1 Pedro', abreviacao: '1Pe', testamento: 'Novo', capitulosCount: 5, grupo: 'Epístolas' },
  { id: '2pe', bookNumber: 61, nome: '2 Pedro', abreviacao: '2Pe', testamento: 'Novo', capitulosCount: 3, grupo: 'Epístolas' },
  { id: '1jo', bookNumber: 62, nome: '1 João', abreviacao: '1Jo', testamento: 'Novo', capitulosCount: 5, grupo: 'Epístolas' },
  { id: '2jo', bookNumber: 63, nome: '2 João', abreviacao: '2Jo', testamento: 'Novo', capitulosCount: 1, grupo: 'Epístolas' },
  { id: '3jo', bookNumber: 64, nome: '3 João', abreviacao: '3Jo', testamento: 'Novo', capitulosCount: 1, grupo: 'Epístolas' },
  { id: 'jd', bookNumber: 65, nome: 'Judas', abreviacao: 'Jd', testamento: 'Novo', capitulosCount: 1, grupo: 'Epístolas' },
  { id: 'ap', bookNumber: 66, nome: 'Apocalipse', abreviacao: 'Ap', testamento: 'Novo', capitulosCount: 22, grupo: 'Revelação' },
];

export const VERSICULOS_DEMO_EXEMPLOS: Record<string, { tituloCapitulo: string; versiculos: { numero: number; texto: string }[] }> = {
  'gn-1': {
    tituloCapitulo: 'Gênesis 1 — A Criação dos Céus e da Terra',
    versiculos: [
      { numero: 1, texto: 'No princípio, criou Deus os céus e a terra.' },
      { numero: 2, texto: 'A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.' },
      { numero: 3, texto: 'Disse Deus: Haja luz; e houve luz.' },
      { numero: 4, texto: 'E viu Deus que a luz era boa; e fez separação entre a luz e as trevas.' },
      { numero: 5, texto: 'Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.' }
    ]
  },
  'sl-23': {
    tituloCapitulo: 'Salmos 23 — O Senhor é o Meu Pastor',
    versiculos: [
      { numero: 1, texto: 'O Senhor é o meu pastor; nada me faltará.' },
      { numero: 2, texto: 'Ele me faz repousar em pastos verdejantes; leva-me mansamente a águas mansas.' },
      { numero: 3, texto: 'Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.' },
      { numero: 4, texto: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
      { numero: 5, texto: 'Preparas uma mesa perante mim na presença dos meus inimigos; unges a minha cabeça com óleo, o meu cálice transborda.' },
      { numero: 6, texto: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do Senhor por longos dias.' }
    ]
  },
  'jo-1': {
    tituloCapitulo: 'João 1 — O Verbo que se Fez Carne',
    versiculos: [
      { numero: 1, texto: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
      { numero: 2, texto: 'Ele estava no princípio com Deus.' },
      { numero: 3, texto: 'Todas as coisas foram feitas por intermédio dele, e, sem ele, nada do que foi feito se fez.' },
      { numero: 4, texto: 'Nele estava a vida, e a vida era a luz dos homens.' },
      { numero: 5, texto: 'A luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' }
    ]
  }
};

export const SERIE_LICOES = {
  titulo: 'O Deus da Aliança',
  subtitulo: 'Advertências, promessas e bênçãos no livro de Deuteronômio',
  livro: 'Deuteronômio',
  totalLicoes: 13,
  descricao: 'Uma jornada sistemática pelas exortações de Moisés às portas da Terra Prometida, revelando a fidelidade incondicional de Deus e a relevância ética e espiritual da Aliança para o discípulo de Cristo hoje.'
};
