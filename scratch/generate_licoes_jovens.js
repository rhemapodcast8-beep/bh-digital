const fs = require('fs');

const titulos = [
  "Carta aos Filipenses: um chamado à alegria",
  "Uma vida digna do Evangelho",
  "A humildade de Cristo: o exemplo supremo",
  "Brilhe a luz de Cristo em meio à geração corrompida",
  "Exemplo de servos fiéis: Timóteo e Epafrodito",
  "Guardando-se dos falsos mestres",
  "O alvo supremo: conhecer a Cristo",
  "Unidade e alegria no Senhor",
  "A paz de Deus guarda o coração",
  "O pensar cristão: o que ocupa a sua mente?",
  "Contentamento em toda e qualquer situação",
  "Generosidade e cuidado com a obra de Deus",
  "Saudações finais, comunhão e bênçãos"
];

const slugs = [
  "1-carta-aos-filipenses-um-chamado-a-alegria",
  "2-uma-vida-digna-do-evangelho",
  "3-a-humildade-de-cristo-o-exemplo-supremo",
  "4-brilhe-a-luz-de-cristo-em-meio-a-geracao-corrompida",
  "5-exemplo-de-servos-fieis-timoteo-e-epafrodito",
  "6-guardando-se-dos-falsos-mestres",
  "7-o-alvo-supremo-conhecer-a-cristo",
  "8-unidade-e-alegria-no-senhor",
  "9-a-paz-de-deus-guarda-o-coracao",
  "10-o-pensar-cristao-o-que-ocupa-a-sua-mente",
  "11-contentamento-em-toda-e-qualquer-situacao",
  "12-generosidade-e-cuidado-com-a-obra-de-deus",
  "13-saudacoes-finais-comunhao-e-bencaos"
];

let fileContent = "import { LicaoBiblicaJovens } from '@/types';\n\nexport const MOCK_LICOES_JOVENS: LicaoBiblicaJovens[] = [\n";

for (let i = 0; i < 13; i++) {
  const num = i + 1;
  const titulo = titulos[i];
  const slug = slugs[i];
  
  const obj = {
    numero: num,
    slug: slug,
    titulo: titulo,
    subtitulo: "Um estudo sobre a alegria cristã e a vida autêntica em Jesus.",
    trimestre: "4º Trimestre de 2026",
    temaTrimestre: "Regozijai-vos no Senhor — Vivendo com propósito à luz da Carta aos Filipenses",
    referenciaBiblica: "Filipenses " + (num < 4 ? num : 4) + ":" + num + "-" + (num+5),
    comentarista: "Reynaldo Odilo",
    textoAureo: { 
      referencia: "Filipenses 4:4", 
      texto: "Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos.", 
      comentario: "A alegria em Cristo não depende das circunstâncias, mas da presença de Deus." 
    },
    verdadePratica: { 
      frase: "A verdadeira alegria de um jovem cristão é inabalável, pois está fundamentada na sua identidade em Cristo Jesus.", 
      explicacao: "Isso significa que, mesmo diante dos desafios da escola, faculdade ou trabalho, podemos viver com um propósito alegre e contagiante." 
    },
    leituraDiaria: [
      { dia: 'Segunda', referencia: 'Ne 8:10', tema: 'A alegria do Senhor é a nossa força' },
      { dia: 'Terça', referencia: 'Sl 16:11', tema: 'Na presença de Deus há plenitude de alegria' },
      { dia: 'Quarta', referencia: 'Jo 15:11', tema: 'A alegria completa em Cristo' },
      { dia: 'Quinta', referencia: 'Gl 5:22', tema: 'Alegria como fruto do Espírito' },
      { dia: 'Sexta', referencia: '1 Ts 5:16', tema: 'Regozijai-vos sempre' },
      { dia: 'Sábado', referencia: 'Tg 1:2', tema: 'Alegria em meio às provações' }
    ],
    leituraClasse: { 
      referencia: "Filipenses 1:1-11", 
      texto: "Paulo e Timóteo, servos de Jesus Cristo, a todos os santos em Cristo Jesus que estão em Filipos, com os bispos e diáconos..." 
    },
    introducao: "Nesta lição, mergulharemos nos princípios da Carta aos Filipenses. Ao contrário das cartas de repreensão, esta é uma carta de gratidão e afeto. Paulo, mesmo preso, encoraja os crentes a viverem uma fé vibrante. Para nós, jovens, o exemplo de Paulo mostra que a prisão física ou as limitações sociais não podem prender a mente e o espírito de quem está em Cristo.",
    palavraChave: { 
      termo: "Alegria", 
      explicacao: "Um estado de satisfação profunda e duradoura, originada no Espírito Santo, independente de circunstâncias externas." 
    },
    desenvolvimento: [
      {
        titulo: "I - O Contexto da Carta",
        pontos: [
          { titulo: "1. A cidade de Filipos", conteudo: "Era uma colônia romana importante, com muito patriotismo e paganismo." },
          { titulo: "2. A Igreja que nasceu ali", conteudo: "Iniciou-se com a conversão de Lídia, o carcereiro e a libertação de uma jovem." },
          { titulo: "3. A prisão de Paulo", conteudo: "Mesmo em correntes, a carta exala gratidão e alegria." }
        ],
        sinopse: "Entender o pano de fundo de Filipenses nos ajuda a dimensionar o valor da mensagem.",
        aplicacaoJovem: "Quantas vezes deixamos de ser gratos por muito menos que uma prisão? Onde você está buscando a sua alegria?"
      },
      {
        titulo: "II - O Propósito do Jovem Cristão",
        pontos: [
          { titulo: "1. Brilhar no mundo", conteudo: "Como astros num mundo tenebroso, o jovem deve ter atitudes que glorificam a Deus." },
          { titulo: "2. Foco no Evangelho", conteudo: "Nossas amizades, redes sociais e escolhas devem estar submissas ao Evangelho." }
        ],
        sinopse: "O apóstolo mostra qual é o verdadeiro alvo do crente maduro.",
        aplicacaoJovem: "Verifique seu feed, suas companhias e suas rotinas: eles refletem a alegria de alguém que foi salvo?"
      }
    ],
    comentarioBiblico: "O uso da palavra 'regozijai-vos' (do grego chairo) permeia toda a epístola. Não é um otimismo ingênuo, mas uma postura escatológica, sabendo que Deus está no controle absoluto da história. Paulo escreve esta carta sob prisão domiciliar em Roma, provavelmente entre os anos 60 e 62 d.C., demonstrando que o Evangelho avança até mesmo em condições adversas.",
    oQueABibliaEnsina: [
      "A nossa verdadeira cidadania está nos céus.",
      "As provações podem resultar em progresso do Evangelho.",
      "A mente focada em Cristo encontra a verdadeira paz."
    ],
    aplicacaoJovem: [
      "Em momentos de pressão na escola, busque paz na promessa de que Deus cuida de tudo.",
      "Não baseie sua identidade em curtidas de redes sociais, mas no que Cristo diz que você é."
    ],
    paraPensar: "\"Alegria não é ausência de problemas, é a presença de Deus no meio dos problemas.\"",
    perguntasReflexao: [
      "O que tira a sua alegria no dia a dia?",
      "Como você pode manter a paz diante das incertezas do futuro e da faculdade?",
      "Você se identifica com o compromisso que Paulo tinha pelo Evangelho?"
    ],
    desafioSemana: [
      "Leia 1 capítulo de Filipenses por dia.",
      "Ore pela sua ansiedade entregando-a a Deus.",
      "Pratique o encorajamento enviando uma mensagem alegre a 3 amigos.",
      "Compartilhe seu aprendizado nos stories ou grupo de jovens."
    ],
    revisandoConteudo: [
      { pergunta: "Onde Paulo estava quando escreveu a carta?", resposta: "Preso em Roma." },
      { pergunta: "Qual a palavra-chave de Filipenses?", resposta: "Alegria (Regozijai-vos)." },
      { pergunta: "Quem era o alvo principal da carta?", resposta: "Os crentes em Filipos." },
      { pergunta: "O que significa 'cidadania nos céus'?", resposta: "Nossa pátria final não é terrena." },
      { pergunta: "Qual o exemplo supremo de humildade?", resposta: "Jesus Cristo." }
    ],
    conclusao: "A jornada de um jovem cristão não é isenta de dores, mas é repleta da doce consolação do Espírito Santo. O chamado à alegria é um convite para olhar menos para as tempestades e mais para o Salvador. Aceite o desafio de brilhar a luz de Cristo!",
    dinamica: {
      titulo: "O Copo da Gratidão",
      objetivo: "Demonstrar que o foco nas bênçãos supera as dificuldades.",
      material: "Um copo com água pela metade.",
      preparacao: "Coloque o copo no centro.",
      execucao: "Pergunte aos jovens se o copo está meio cheio ou meio vazio e relacione as respostas com a visão otimista de Paulo na prisão.",
      aplicacao: "Em Cristo, vemos as oportunidades do Evangelho, não apenas as limitações."
    },
    vocabulario: [
      { termo: "Regozijar", definicao: "Sentir grande alegria e contentamento." },
      { termo: "Epístola", definicao: "Carta enviada a um destinatário, frequentemente com propósito de instrução." }
    ],
    status: "Disponível para Estudo"
  };

  fileContent += JSON.stringify(obj, null, 2) + ",\n";
}

fileContent += "];\n";

fs.writeFileSync('src/lib/mockLicoesJovens.ts', fileContent);
console.log('src/lib/mockLicoesJovens.ts generated successfully.');
