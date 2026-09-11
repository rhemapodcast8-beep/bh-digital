const fs = require('fs');
const path = require('path');

const categoriasConfig = [
  {
    nome: 'Parábolas',
    slug: 'parabolas',
    estudos: [
      'Parábola do Semeador', 'Bom Samaritano', 'Filho Pródigo', 'Talentos',
      'Dez Virgens', 'Dracma Perdida', 'O Joio e o Trigo', 'O Grão de Mostarda',
      'O Fermento', 'O Tesouro Escondido', 'A Pérola de Grande Valor',
      'O Rico Insensato', 'A Ovelha Perdida', 'Trabalhadores da Vinha', 'Os Dois Filhos'
    ]
  },
  {
    nome: 'Fé',
    slug: 'fe',
    estudos: [
      'O que é fé?', 'Fé e obediência', 'Fé em tempos difíceis', 'Fé de Abraão',
      'Fé de Moisés', 'Fé de Davi', 'Fé e confiança em Deus', 'Fé que persevera',
      'Fé e oração', 'Fé diante do medo', 'Fé e esperança', 'Fé e decisões',
      'Fé e provações', 'Fé que produz frutos', 'Como fortalecer a fé'
    ]
  },
  {
    nome: 'Oração',
    slug: 'oracao',
    estudos: [
      'O poder da oração', 'Oração no lugar secreto', 'Como desenvolver uma vida de oração',
      'Oração e intimidade com Deus', 'Oração de Jesus', 'Oração de Ana',
      'Oração de Daniel', 'Oração e perseverança', 'Oração e jejum',
      'Oração pela família', 'Oração em tempos difíceis', 'Oração de intercessão',
      'Oração e vontade de Deus', 'Oração e gratidão', 'Como estudar a Bíblia e orar'
    ]
  },
  {
    nome: 'Família',
    slug: 'familia',
    estudos: [
      'Família segundo a Bíblia', 'O propósito da família', 'Pais e filhos',
      'Educação dos filhos', 'Casamento cristão', 'Comunicação no lar',
      'Perdão dentro da família', 'Oração em família', 'Família e fé',
      'Família e discipulado', 'Respeito no lar', 'Criação dos filhos',
      'Família em tempos difíceis', 'Construindo um lar saudável',
      'O papel da família na vida cristã'
    ]
  },
  {
    nome: 'Vida Cristã',
    slug: 'vida-crista',
    estudos: [
      'O que significa seguir a Cristo', 'Santificação', 'Discipulado',
      'Fruto do Espírito', 'Vida devocional', 'Leitura da Bíblia',
      'Obediência', 'Serviço cristão', 'Amor ao próximo', 'Perdão',
      'Humildade', 'Integridade cristã', 'Testemunho', 'Perseverança',
      'Crescimento espiritual'
    ]
  },
  {
    nome: 'Evangelismo',
    slug: 'evangelismo',
    estudos: [
      'O que é evangelismo', 'A Grande Comissão', 'Evangelismo pessoal',
      'Como compartilhar o Evangelho', 'Evangelismo e amor', 'Evangelismo no trabalho',
      'Evangelismo na família', 'Evangelismo entre jovens', 'Evangelismo nas redes sociais',
      'Discipulado e evangelismo', 'A igreja e a missão', 'O exemplo de Jesus',
      'Paulo e a missão', 'Evangelismo e serviço', 'Como desenvolver uma vida missionária'
    ]
  }
];

function generateSlug(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const todosEstudos = [];

categoriasConfig.forEach(cat => {
  cat.estudos.forEach((titulo, index) => {
    const slug = generateSlug(titulo);
    const imagemPath = `/images/estudos/${cat.slug}/${slug}.jpg`;
    
    todosEstudos.push({
      id: `estudo-${cat.slug}-${index}`,
      slug: slug,
      titulo: titulo,
      categoria: cat.nome,
      referencia: "Bíblia Sagrada",
      autor: "Equipe Editorial BH Digital",
      data: "11 Set 2026",
      tempoLeitura: `${Math.floor(Math.random() * 5) + 5} min`,
      nivel: "Básico",
      resumo: `Um estudo prático e bíblico sobre ${titulo}. Aprenda princípios poderosos para sua vida e ministério através da Palavra de Deus.`,
      introducao: `O tema "${titulo}" é de extrema importância para a nossa jornada. Nas Escrituras, encontramos respostas e princípios que transformam nosso entendimento e renovam nossa esperança. Neste estudo, vamos mergulhar profundamente para descobrir o que Deus tem a nos ensinar hoje.`,
      contextoBiblico: `Para compreendermos melhor a aplicação de ${titulo}, precisamos olhar para o contexto em que essas verdades foram reveladas. A Bíblia não é um livro de histórias isoladas, mas uma revelação contínua do caráter de Deus.`,
      desenvolvimento: [
        {
          titulo: "Compreendendo o Princípio",
          explicacao: `O primeiro passo para vivermos ${titulo} é entender a sua essência. Não podemos praticar aquilo que não conhecemos verdadeiramente.`,
          referenciaBiblica: "Salmos 119:105",
          comentario: "A Palavra de Deus ilumina nosso caminho e nos dá clareza sobre o assunto.",
          aplicacaoPratica: "Reserve um tempo do seu dia para refletir sobre este princípio antes de tomar decisões."
        },
        {
          titulo: "Enfrentando as Dificuldades",
          explicacao: "Na prática, muitas vezes falhamos. A cultura ao nosso redor nos pressiona a seguir a direção contrária.",
          referenciaBiblica: "Romanos 12:2",
          comentario: "A transformação vem pela renovação da mente. Mudar a forma de pensar é o que nos liberta.",
          aplicacaoPratica: "Identifique pensamentos que vão contra a Palavra e os rejeite ativamente."
        },
        {
          titulo: "Vivendo na Prática",
          explicacao: `A verdadeira sabedoria não é apenas saber, mas viver. ${titulo} deve ser encarnado nas nossas atitudes diárias.`,
          referenciaBiblica: "Tiago 1:22",
          comentario: "Ser ouvinte não basta, o verdadeiro discípulo pratica.",
          aplicacaoPratica: "Escolha uma ação simples e específica para executar hoje em obediência."
        }
      ],
      licoesPrincipais: [
        "A base da nossa caminhada deve ser a Palavra de Deus.",
        "A transformação genuína começa de dentro para fora.",
        "Nossa obediência afeta aqueles que estão ao nosso redor."
      ],
      aplicacaoParaVida: `Quando absorvemos os princípios sobre ${titulo}, nossa vida ganha novo sentido. Nossa fé amadurece e começamos a ver as circunstâncias com os olhos do Espírito.`,
      perguntasReflexao: [
        "Qual área da sua vida mais precisa de ajuste em relação a este tema?",
        "O que te impede de viver isso plenamente?",
        "Como você pode influenciar outros com essa verdade?"
      ],
      paraMeditar: "\"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.\" Que esta promessa guie seus passos.",
      conclusao: `Concluímos que ${titulo} é essencial para um cristianismo autêntico. Que você possa guardar estas palavras no coração e produzir bons frutos.`,
      oracaoFinal: "Senhor, pedimos graça e sabedoria para aplicar estas verdades no nosso dia a dia. Ajuda-nos a não sermos apenas ouvintes, mas praticantes da Tua Palavra. Em nome de Jesus, amém.",
      imagem: imagemPath,
      destaque: index === 0
    });
  });
});

const tsContent = `// Arquivo gerado automaticamente
import { EstudoItem } from '@/types';

export const MOCK_ESTUDOS_GERADOS: EstudoItem[] = ${JSON.stringify(todosEstudos, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/data/estudos_gerados.ts'), tsContent);
console.log('90 Estudos gerados com sucesso!');
