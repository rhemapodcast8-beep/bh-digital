const fs = require('fs');
const path = require('path');

const temas = [
  "O poder da oração", "Fé em meio às dificuldades", "Deus permanece fiel", 
  "O chamado de Abraão", "A coragem de Davi", "A perseverança de Jó", 
  "José: da prisão ao propósito", "Moisés e o chamado de Deus", "Josué: coragem para avançar", 
  "Daniel e uma vida de fidelidade", "Ester: coragem para um propósito", "Neemias e a reconstrução", 
  "Pedro: restauração e chamado", "Paulo e a missão do Evangelho", "O amor ao próximo", 
  "Perdão e restauração", "Santidade na vida cristã", "O fruto do Espírito", 
  "O bom samaritano", "O filho pródigo", "A armadura de Deus", 
  "Permanecer em Cristo", "O bom pastor", "Servindo com humildade", 
  "Esperança em tempos difíceis", "Gratidão a Deus", "Sabedoria para decisões", 
  "Família e fé", "Evangelização e missão", "Esperança na volta de Cristo"
];

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const esbocos = temas.map((tema, index) => {
  const slug = slugify(tema);
  return {
    id: `esboco-${index + 1}`,
    slug: slug,
    titulo: tema,
    categoria: "Esboços",
    referencia: "Vários Textos Bíblicos",
    autor: "Equipe BH Digital",
    data: "10 de Setembro de 2026",
    tempoLeitura: "15 min",
    nivel: "Intermediário",
    resumo: `Um esboço bíblico completo sobre ${tema.toLowerCase()}, ideal para pregações, células e estudos bíblicos.`,
    introducao: `A temática de ${tema.toLowerCase()} é central nas Escrituras e nos convida a uma reflexão profunda sobre o nosso relacionamento com Deus e com o próximo. Este esboço foi preparado para guiar você na exposição desta poderosa mensagem.`,
    contextoBiblico: `Historicamente e teologicamente, o conceito de ${tema.toLowerCase()} permeia tanto o Antigo quanto o Novo Testamento, revelando o caráter imutável de Deus e Seu propósito redentor para a humanidade.`,
    desenvolvimento: [
      {
        titulo: "O Fundamento da Mensagem",
        explicacao: `O primeiro ponto a destacar sobre ${tema.toLowerCase()} é que ele se baseia na revelação clara da Palavra de Deus.`,
        referenciaBiblica: "Salmos 119:105",
        comentario: "A Palavra ilumina o nosso caminho e nos dá a base sólida para vivermos esta verdade.",
        aplicacaoPratica: "Aplique este princípio diariamente buscando conhecer mais a vontade de Deus nas Escrituras."
      },
      {
        titulo: "O Desafio Prático",
        explicacao: `Viver a realidade de ${tema.toLowerCase()} exige renúncia e posicionamento diário.`,
        referenciaBiblica: "Tiago 1:22",
        comentario: "Não basta apenas ouvir, é necessário colocar em prática.",
        aplicacaoPratica: "Identifique uma área da sua vida onde esta verdade precisa ser aplicada hoje."
      },
      {
        titulo: "O Resultado Transformador",
        explicacao: `Quando abraçamos ${tema.toLowerCase()}, experimentamos a transformação prometida por Deus.`,
        referenciaBiblica: "Romanos 12:2",
        comentario: "A transformação da mente nos leva a experimentar a boa, perfeita e agradável vontade de Deus.",
        aplicacaoPratica: "Permita que o Espírito Santo transforme a sua mente e as suas atitudes."
      }
    ],
    licoesPrincipais: [
      "Deus é a fonte de toda verdade e graça.",
      `A compreensão de ${tema.toLowerCase()} muda nossa perspectiva.`,
      "A obediência traz resultados eternos."
    ],
    aplicacaoParaVida: `Que a mensagem sobre ${tema.toLowerCase()} não fique apenas no campo do conhecimento, mas que se torne vida em suas ações e decisões diárias.`,
    perguntasReflexao: [
      `Como você tem vivido a realidade de ${tema.toLowerCase()}?`,
      "Quais são os maiores obstáculos para aplicar isso hoje?",
      "O que você precisa mudar para alinhar sua vida a esta verdade?"
    ],
    paraMeditar: `Guardei a tua palavra no meu coração, para não pecar contra ti. (Salmos 119:11)`,
    conclusao: `Concluímos que ${tema.toLowerCase()} é essencial para uma vida cristã vitoriosa e madura. Que Deus nos ajude a vivermos cada um destes princípios.`,
    oracaoFinal: `Senhor, ajuda-nos a viver intensamente a verdade sobre ${tema.toLowerCase()}. Transforma os nossos corações e nos capacita a sermos praticantes da Tua Palavra. Em nome de Jesus, amém.`,
    imagem: `/images/estudos/esbocos/esboco-${slug}.jpg`,
    destaque: index < 3
  };
});

const content = `import { EstudoItem } from '@/types';

export const MOCK_ESBOCOS_GERADOS: EstudoItem[] = ${JSON.stringify(esbocos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/data/esbocos_gerados.ts'), content, 'utf8');
console.log('Gerado src/lib/data/esbocos_gerados.ts com 30 esboços.');
