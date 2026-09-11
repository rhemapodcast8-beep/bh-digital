const fs = require('fs');
const path = require('path');

function generateSlug(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// -------------------------------------------------------------
// MATERIAIS
// Categorias: ESBOÇOS, ESTUDOS, DEVOCIONAIS, AULAS, GUIAS, MATERIAIS PREMIUM
const matCategorias = ['Esboços', 'Estudos Bíblicos', 'Lições', 'Devocionais', 'Apostilas', 'Professores', 'Liderança', 'Evangelismo'];
const niveis = ['Iniciante', 'Intermediário', 'Avançado', 'Todos'];

const materiaisTemas = [
  "Guia Definitivo para Professores de EBD", "Esboço: A Armadura de Deus", "Devocional de 30 Dias: Esperança",
  "Apostila de Doutrinas Básicas", "Plano de Aula: As Parábolas de Jesus", "Dinâmicas para Jovens",
  "Esboço: A Oração de Jabez", "Estudo Panorâmico de Gênesis", "Liderança de Pequenos Grupos",
  "Como Preparar uma Pregação", "Guia de Evangelismo Pessoal", "Discipulado Um a Um",
  "Esboço: As Bem-Aventuranças", "Manual do Diácono", "Ministério Infantil na Prática",
  "Esboço: O Salmo 23", "Estudo sobre o Espírito Santo", "Guia de Jejum e Oração",
  "Aconselhamento Bíblico Básico", "Esboço: O Fruto do Espírito", "Apologética para Jovens",
  "Aulas Prontas: Reis de Israel", "Manual de Integração de Novos Membros", "Esboço: O Sermão do Monte",
  "Administração Eclesiástica"
];

const materiais = materiaisTemas.map((t, i) => {
  return {
    id: `mat-${i + 1}`,
    titulo: t,
    slug: generateSlug(t),
    descricao: `Um material completo e aprofundado sobre ${t.toLowerCase()}, desenvolvido para equipar a igreja.`,
    categoria: matCategorias[i % matCategorias.length],
    tipo: i % 3 === 0 ? 'PDF' : i % 3 === 1 ? 'Apresentação' : 'Documento',
    nivel: niveis[i % niveis.length],
    publicoAlvo: i % 2 === 0 ? 'Líderes e Professores' : 'Congregação em Geral',
    tamanho: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
    downloads: Math.floor(Math.random() * 500) + 50,
    dataUpload: new Date(2026, 3, i + 1).toLocaleDateString('pt-BR'),
    icone: 'FileText',
    premium: i % 4 === 0
  };
});

// -------------------------------------------------------------
// LIVROS
const livrosTemas = [
  { t: "A Cruz e o Canivete", a: "David Wilkerson", c: "Testemunho" },
  { t: "Heróis da Fé", a: "Orlando Boyer", c: "Biografia" },
  { t: "O Peregrino", a: "John Bunyan", c: "Ficção Cristã" },
  { t: "Cristianismo Puro e Simples", a: "C.S. Lewis", c: "Apologética" },
  { t: "O Deus que Destrói Sonhos", a: "Rodrigo Bibo", c: "Vida Cristã" },
  { t: "Ortodoxia", a: "G.K. Chesterton", c: "Apologética" },
  { t: "A Instituição da Religião Cristã", a: "João Calvino", c: "Teologia" },
  { t: "O Conhecimento do Santo", a: "A.W. Tozer", c: "Espiritualidade" },
  { t: "Decepcionado com Deus", a: "Philip Yancey", c: "Vida Cristã" },
  { t: "Graça Maravilhosa", a: "Philip Yancey", c: "Teologia" }
];

const livros = livrosTemas.map((l, i) => {
  return {
    id: `livro-${i + 1}`,
    titulo: l.t,
    slug: generateSlug(l.t),
    autor: l.a,
    descricao: `Uma obra clássica da literatura cristã que tem edificado gerações. Escrito por ${l.a}, este livro aborda as verdades eternas de forma profunda.`,
    categoria: l.c,
    formato: i % 2 === 0 ? 'Físico' : 'E-book',
    paginas: Math.floor(Math.random() * 300) + 100,
    imagemCapa: `https://source.unsplash.com/random/400x600/?book,${i}`,
    preco: (Math.random() * 40 + 20).toFixed(2),
    linkCompra: 'https://exemplo.com/comprar',
    destaque: i < 2
  };
});

// -------------------------------------------------------------
// CONTEÚDOS (YouTube, TikTok, Kwai, Estudos, Pregações, Devocionais)
const contCategorias = ['YouTube', 'TikTok', 'Kwai', 'Estudos', 'Pregações', 'Devocionais'];
const conteudosTemas = [
  "Série: Apocalipse Explicado", "Pregação: Não Desista", "Devocional de 1 Minuto",
  "O que significa Graça?", "Estudo: As Bodas do Cordeiro", "Short: Você tem medo de quê?",
  "Live: Perguntas e Respostas", "Série: Casamento Blindado", "Mensagem: Voltando ao Primeiro Amor",
  "Estudo: O Tabernáculo", "Devocional: Bom dia com Jesus", "Pregação: O Vaso de Barro",
  "Short: Como ler a Bíblia", "Mesa Redonda Teológica", "Louvor Acústico"
];

const conteudos = conteudosTemas.map((t, i) => {
  return {
    id: `cont-${i + 1}`,
    titulo: t,
    slug: generateSlug(t),
    descricao: `Assista a este conteúdo incrível sobre ${t.toLowerCase()} e seja edificado.`,
    categoria: contCategorias[i % contCategorias.length],
    plataforma: i % 3 === 0 ? 'YouTube' : i % 3 === 1 ? 'TikTok' : 'Instagram',
    duracao: i % 2 === 0 ? '45:00' : '01:00',
    thumbnail: `https://source.unsplash.com/random/640x360/?church,worship,${i}`,
    url: 'https://youtube.com', // Placeholder
    data: new Date(2026, 4, i + 1).toLocaleDateString('pt-BR')
  };
});

// Salvar tudo em src/lib/data/
const dir = path.join(__dirname, '../src/lib/data');

const matContent = `import { MaterialItem } from '@/types';\n\nexport const MOCK_MATERIAIS_COMPLETOS: MaterialItem[] = ${JSON.stringify(materiais, null, 2)};\n`;
fs.writeFileSync(path.join(dir, 'materiais.ts'), matContent);

const livContent = `export const MOCK_LIVROS_COMPLETOS = ${JSON.stringify(livros, null, 2)};\n`;
fs.writeFileSync(path.join(dir, 'livros.ts'), livContent);

const contContent = `export const MOCK_CONTEUDOS_COMPLETOS = ${JSON.stringify(conteudos, null, 2)};\n`;
fs.writeFileSync(path.join(dir, 'conteudos.ts'), contContent);

console.log('Arquivos materiais.ts, livros.ts e conteudos.ts gerados com sucesso!');
