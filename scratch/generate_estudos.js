const fs = require('fs');
const path = require('path');

const categorias = [
  'Bíblia', 'Teologia', 'Vida Cristã', 'Família', 'Oração', 'Fé', 
  'Evangelização', 'Liderança', 'Jovens', 'Doutrina', 'Personagens Bíblicos', 
  'Antigo Testamento', 'Novo Testamento', 'Escatologia', 'Espiritualidade'
];

const niveis = ['Básico', 'Intermediário', 'Avançado'];

const temas = [
  { t: "O Poder da Oração no Lugar Secreto", c: "Oração", r: "Mateus 6:6" },
  { t: "A Fé que Remove Montanhas", c: "Fé", r: "Marcos 11:23" },
  { t: "Princípios para uma Família Forte", c: "Família", r: "Efésios 5:22-33" },
  { t: "Liderança Servidora Segundo Jesus", c: "Liderança", r: "João 13:1-17" },
  { t: "A Graça que Transforma", c: "Doutrina", r: "Efésios 2:8-9" },
  { t: "Davi: O Homem Segundo o Coração de Deus", c: "Personagens Bíblicos", r: "1 Samuel 13:14" },
  { t: "Os Sinais da Volta de Cristo", c: "Escatologia", r: "Mateus 24" },
  { t: "O Papel do Jovem na Igreja Atual", c: "Jovens", r: "1 Timóteo 4:12" },
  { t: "Panorama de Gênesis", c: "Antigo Testamento", r: "Gênesis 1" },
  { t: "A Importância do Evangelismo Pessoal", c: "Evangelização", r: "Atos 8:26-40" },
  { t: "Fruto do Espírito vs Obras da Carne", c: "Vida Cristã", r: "Gálatas 5:19-23" },
  { t: "Entendendo a Trindade", c: "Teologia", r: "Mateus 28:19" },
  { t: "A Formação do Cânon Bíblico", c: "Bíblia", r: "2 Timóteo 3:16" },
  { t: "O Ministério de Paulo em Éfeso", c: "Novo Testamento", r: "Atos 19" },
  { t: "Jejum e Espiritualidade", c: "Espiritualidade", r: "Isaías 58" },
  { t: "Superando a Ansiedade pela Fé", c: "Vida Cristã", r: "Filipenses 4:6-7" },
  { t: "Moisés e a Libertação do Egito", c: "Personagens Bíblicos", r: "Êxodo 3" },
  { t: "A Doutrina da Justificação", c: "Doutrina", r: "Romanos 5:1" },
  { t: "Casamento: Aliança Inquebrável", c: "Família", r: "Mateus 19:6" },
  { t: "Como Estudar a Bíblia Sozinho", c: "Bíblia", r: "Salmos 119:105" },
  { t: "Estratégias de Jesus para Fazer Discípulos", c: "Evangelização", r: "Mateus 4:19" },
  { t: "A Esperança da Ressurreição", c: "Escatologia", r: "1 Coríntios 15" },
  { t: "Neemias: Planejamento e Liderança", c: "Liderança", r: "Neemias 2" },
  { t: "Identidade em Cristo", c: "Jovens", r: "1 Pedro 2:9" },
  { t: "Oração de Intercessão", c: "Oração", r: "Tiago 5:16" },
  { t: "A Glória da Nova Aliança", c: "Teologia", r: "Hebreus 8" },
  { t: "O Tabernáculo e o Seu Significado", c: "Antigo Testamento", r: "Êxodo 25" },
  { t: "As Sete Cartas do Apocalipse", c: "Novo Testamento", r: "Apocalipse 2-3" },
  { t: "Adoração em Espírito e em Verdade", c: "Espiritualidade", r: "João 4:24" },
  { t: "O Desafio de Perdoar", c: "Fé", r: "Mateus 18:21-22" },
];

function generateSlug(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const estudos = temas.map((tema, idx) => {
  return {
    id: `estudo-${idx + 1}`,
    slug: generateSlug(tema.t),
    titulo: tema.t,
    categoria: tema.c,
    referencia: tema.r,
    autor: "Equipe Editorial BH Digital",
    data: "01 Abr 2026",
    tempoLeitura: `${Math.floor(Math.random() * 10) + 5} min`,
    nivel: niveis[idx % 3],
    resumo: `Um estudo aprofundado sobre ${tema.t.toLowerCase()}, explorando a base bíblica em ${tema.r} e trazendo aplicações reais.`,
    
    introducao: `Este estudo aborda o tema "${tema.t}". Ao longo da história bíblica, vemos a importância de compreender este assunto para amadurecermos na fé. O objetivo aqui não é apenas transmitir informação teológica, mas levar à transformação de vida.`,
    
    contextoBiblico: `O texto de ${tema.r} foi escrito em um momento crucial. O autor sagrado procurava instruir seus leitores sobre os princípios imutáveis de Deus. Entender a cultura da época e o desafio que os primeiros ouvintes enfrentavam é essencial para aplicar a verdade hoje.`,
    
    desenvolvimento: [
      {
        titulo: "Fundamento Bíblico",
        explicacao: "A base de nossa crença deve estar firmada exclusivamente na revelação das Escrituras.",
        referenciaBiblica: tema.r,
        comentario: "Nesta passagem, vemos claramente a intenção de Deus em revelar Sua vontade.",
        aplicacaoPratica: "Avalie se suas atitudes diárias refletem o que está escrito ou apenas a cultura ao seu redor."
      },
      {
        titulo: "Desafios Contemporâneos",
        explicacao: "Vivemos em uma época onde verdades absolutas são questionadas.",
        referenciaBiblica: "Romanos 12:2",
        comentario: "A renovação da mente é o antídoto contra a conformidade com o mundo.",
        aplicacaoPratica: "Identifique um pensamento limitante e substitua-o pela promessa de Deus."
      },
      {
        titulo: "O Chamado à Ação",
        explicacao: "Ouvir a Palavra sem praticá-la gera engano.",
        referenciaBiblica: "Tiago 1:22",
        comentario: "A fé bíblica é uma fé em movimento, que obedece.",
        aplicacaoPratica: "Coloque em prática hoje mesmo aquilo que o Espírito Santo ministrou ao seu coração neste estudo."
      }
    ],
    
    licoesPrincipais: [
      "Deus permanece fiel, independentemente das nossas falhas.",
      "A obediência é a maior expressão de adoração.",
      "O crescimento espiritual exige intencionalidade."
    ],
    
    aplicacaoParaVida: `Quando aplicamos o princípio de ${tema.t} em nossas vidas, os resultados vão além do nosso crescimento pessoal; eles afetam nossa família, igreja e sociedade. Devemos adotar uma postura de dependência de Deus.`,
    
    perguntasReflexao: [
      "Como esta verdade pode mudar a sua rotina amanhã?",
      "Qual foi a área da sua vida que o Espírito Santo mais confrontou neste estudo?",
      "Com quem você pode compartilhar o que aprendeu hoje?"
    ],
    
    paraMeditar: `"Toda a Escritura é inspirada por Deus e útil..." Lembre-se que cada versículo tem o poder de ajustar nossa rota.`,
    conclusao: `Concluímos, portanto, que o tema ${tema.t} é vital para uma caminhada cristã saudável. Que possamos ser achados fiéis na aplicação dessa palavra.`,
    oracaoFinal: `Senhor, obrigado pela revelação da Tua Palavra em ${tema.r}. Ajuda-nos a viver de forma digna do Evangelho, encarnando esses princípios dia após dia. Em nome de Jesus, amém.`,
    
    imagem: `https://source.unsplash.com/random/800x600/?bible,${encodeURIComponent(tema.c.toLowerCase())}`,
    destaque: idx < 3
  };
});

const content = `import { EstudoItem } from '@/types';\n\nexport const MOCK_ESTUDOS_COMPLETOS: EstudoItem[] = ${JSON.stringify(estudos, null, 2)};\n`;

const dir = path.join(__dirname, '../src/lib/data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'estudos.ts'), content);
console.log('src/lib/data/estudos.ts gerado com 30 estudos.');
