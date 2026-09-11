const fs = require('fs');

const esbocosTemas = [
  "Fé em tempos difíceis", "O chamado de Deus", "A graça que transforma", 
  "Perseverança na caminhada", "O poder da oração", "Quando Deus parece em silêncio", 
  "O filho pródigo e a graça", "Jesus, o bom pastor", "Permanecendo na Palavra", 
  "Santidade e vida cristã", "Esperança em Cristo", "Servindo com propósito"
];

const personagensTemas = [
  "Abraão", "Moisés", "Josué", "Rute", "Ester", "Davi", 
  "Samuel", "Elias", "Daniel", "Pedro", "Paulo", "Barnabé"
];

const parabolasTemas = [
  "Semeador", "Bom Samaritano", "Filho Pródigo", "Dez Virgens", "Talentos", 
  "Grande Ceia", "Ovelha Perdida", "Moeda Perdida", "Fariseu e Publicano", "Trabalhadores da Vinha"
];

const feTemas = [
  "O que é fé?", "Fé e obediência", "Fé em tempos difíceis", "Perseverança", 
  "Oração e intimidade com Deus", "Oração perseverante", "Oração segundo a vontade de Deus", 
  "Jesus e a oração", "Intercessão", "Gratidão", "Esperança", "Confiança em Deus"
];

const estudosBiblicosTemas = [
  "O Sermão do Monte", "A Armadura de Deus", "O Fruto do Espírito", "Os Dez Mandamentos",
  "A Criação", "A Queda", "A Redenção", "A Igreja Primitiva", "O Retorno de Cristo",
  "A Nova Jerusalém", "Os Dons Espirituais", "O Jejum Bíblico"
];

const gerarItem = (titulo, idPrefix, categoria) => {
  const slug = titulo.toLowerCase().replace(/ /g, '-').replace(/[?,!]/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return {
    id: `${idPrefix}-${slug}`,
    slug: slug,
    titulo: titulo,
    categoria: categoria,
    referencia: "Bíblia Sagrada",
    autor: "Equipe Editorial BH Digital",
    data: "01 Abr 2026",
    tempoLeitura: "10 min",
    nivel: "Básico",
    resumo: `Um estudo focado em ${titulo}, trazendo ensino prático e base bíblica sólida para sua vida.`,
    introducao: `Este conteúdo aborda o tema "${titulo}". O objetivo é edificar e ensinar através da Palavra.`,
    contextoBiblico: `Contextualizando a passagem principal para compreender as verdades sobre ${titulo}.`,
    desenvolvimento: [
      {
        titulo: "Ponto 1",
        explicacao: "Primeira lição do estudo.",
        referenciaBiblica: "Referência",
        comentario: "Comentário sobre o ponto.",
        aplicacaoPratica: "Como aplicar na vida diária."
      }
    ],
    licoesPrincipais: ["Deus é fiel", "A graça é suficiente"],
    aplicacaoParaVida: `Como viver ${titulo} no dia a dia cristão.`,
    perguntasReflexao: ["Como melhorar nesta área?", "O que precisa mudar hoje?"],
    paraMeditar: `Versículo para meditar sobre ${titulo}.`,
    conclusao: `Resumo do aprendizado sobre ${titulo}.`,
    oracaoFinal: "Senhor, nos ajude a viver esta verdade. Amém.",
    imagem: `/images/estudos/generica.jpg`, // Placeholder
    destaque: false
  };
};

const conteudoFinal = `import { EstudoItem } from '@/types';

export const MOCK_ESBOCOS: EstudoItem[] = ${JSON.stringify(esbocosTemas.map(t => gerarItem(t, 'esboco', 'Esboço')), null, 2)};

export const MOCK_PERSONAGENS: EstudoItem[] = ${JSON.stringify(personagensTemas.map(t => gerarItem(t, 'personagem', 'Personagem')), null, 2)};

export const MOCK_PARABOLAS: EstudoItem[] = ${JSON.stringify(parabolasTemas.map(t => gerarItem(t, 'parabola', 'Parábola')), null, 2)};

export const MOCK_FE: EstudoItem[] = ${JSON.stringify(feTemas.map(t => gerarItem(t, 'fe', 'Fé')), null, 2)};

export const MOCK_ESTUDOS_BIBLICOS: EstudoItem[] = ${JSON.stringify(estudosBiblicosTemas.map(t => gerarItem(t, 'estudob', 'Estudo Bíblico')), null, 2)};
`;

fs.writeFileSync('src/lib/data/mockCategorias.ts', conteudoFinal);
console.log('Mocks criados com sucesso!');
