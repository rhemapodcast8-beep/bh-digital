const fs = require('fs');

const lessonsData = [
  {
    titulo: 'Deuteronômio: O Livro da Aliança',
    subtitulo: 'Introdução e visão geral do livro das exortações finais de Moisés.',
    temaTrimestre: 'Deuteronômio',
    referenciaBiblica: 'Deuteronômio 1.1-5',
    textoAureo: {
      referencia: 'Deuteronômio 10.12',
      texto: 'Agora, pois, ó Israel, o que é que o Senhor, teu Deus, pede de ti, senão que temas o Senhor, teu Deus, que andes em todos os seus caminhos, e o ames, e sirvas ao Senhor, teu Deus, com todo o teu coração e com toda a tua alma?',
      comentario: 'A essência de Deuteronômio é um chamado ao amor e obediência.'
    },
    verdadePratica: {
      frase: 'O livro de Deuteronômio nos ensina que a obediência aos mandamentos divinos é o caminho para uma vida de bênçãos e comunhão contínua com o Criador.',
      explicacao: 'Significa que nossas escolhas diárias refletem nosso compromisso com a aliança de Deus, e a verdadeira prosperidade espiritual está na submissão à Sua vontade.'
    },
    leituraClasse: {
      referencia: 'Deuteronômio 1.1-8',
      texto: 'Estas são as palavras que Moisés falou a todo o Israel além do Jordão, no deserto... "O Senhor, nosso Deus, nos falou em Horebe, dizendo: Bastante tempo tendes ficado neste monte..."'
    },
    introducao: 'O livro de Deuteronômio não é apenas uma repetição da Lei, mas uma exposição teológica e exortativa. Moisés, sabendo que sua morte se aproximava, prepara a nova geração de israelitas para entrar e conquistar a Terra Prometida. Ele o faz relembrando o passado, interpretando o presente e desafiando-os para o futuro.',
    palavraChave: { termo: 'Aliança', explicacao: 'Pacto solene estabelecido por Deus com Seu povo, baseado em amor, exigindo lealdade e obediência.' },
    comentarioProfundo: 'Deuteronômio apresenta a teologia da graça e da responsabilidade. É um documento pactual que segue a estrutura dos tratados de suserania do antigo Oriente Próximo. Deus, o grande Rei, lembra a Israel de Seus atos salvíficos e estabelece as condições de vida no Seu reino territorial (Canaã).',
    verdadeBiblica: [
      'Deus é fiel às Suas promessas, mesmo quando Seu povo falha.',
      'A Palavra de Deus deve ser lembrada e ensinada a cada nova geração.',
      'A obediência genuína nasce de um coração que ama a Deus.'
    ],
    aplicacaoHoje: {
      pessoal: 'Devemos cultivar um amor sincero por Deus que se traduza em obediência prática no nosso dia a dia.',
      familia: 'É dever dos pais ensinar diligentemente a Palavra de Deus aos seus filhos (Dt 6.6-7).',
      igreja: 'A comunidade de fé deve lembrar-se constantemente do que Deus já fez para não se desviar no presente.',
      ministerio: 'Líderes devem preparar as próximas gerações, assim como Moisés preparou Josué.',
      espiritual: 'Nossa motivação para servir não deve ser o medo, mas o amor (Dt 6.5).'
    },
    fraseAula: '"Aqueles que não conseguem lembrar o passado de misericórdias de Deus estão condenados a duvidar de Seu cuidado no futuro."',
    conclusao: 'Deuteronômio é muito mais que um compêndio de leis antigas; é o pulsar do coração de Deus para o Seu povo. Que possamos ouvir as advertências de Moisés e escolher a vida, andando nos caminhos do Senhor.',
    dinamica: {
      titulo: 'Construindo o Memorial',
      objetivo: 'Ilustrar a importância de lembrar os feitos de Deus.',
      material: 'Pedras pequenas, marcadores.',
      preparacao: 'Entregue uma pedra a cada aluno.',
      execucao: 'Peça que escrevam na pedra uma grande bênção ou livramento que Deus lhes deu. Em seguida, formem um monte com as pedras no centro da sala.',
      aplicacao: 'Assim como as pedras ajudariam Israel a lembrar da fidelidade de Deus, essas pedras representam nossa memória viva da graça divina.'
    }
  },
  {
    titulo: 'Moisés e a Nova Geração',
    subtitulo: 'A importância da transição geracional na caminhada do povo de Deus.',
    temaTrimestre: 'Deuteronômio',
    referenciaBiblica: 'Deuteronômio 4.1-14',
    textoAureo: { referencia: 'Deuteronômio 4.9', texto: 'Tão somente guarda-te a ti mesmo e guarda bem a tua alma, que não te esqueças daquelas coisas que os teus olhos têm visto...', comentario: 'A memória espiritual é vital para a preservação da fé.' },
    verdadePratica: { frase: 'Cada geração precisa ter seu próprio encontro com Deus.', explicacao: 'A fé não é transferida geneticamente; deve ser ensinada e experimentada pessoalmente por cada novo grupo de crentes.' },
    leituraClasse: { referencia: 'Deuteronômio 4.1-8', texto: 'Agora, pois, ó Israel, ouve os estatutos e os juízos que eu vos ensino...' },
    introducao: 'A primeira geração que saiu do Egito pereceu no deserto por causa da incredulidade. Agora, uma nova geração está prestes a entrar em Canaã. Eles eram crianças ou nasceram no deserto. Moisés precisa reafirmar a Aliança para que esta geração não repita os erros de seus pais.',
    palavraChave: { termo: 'Geração', explicacao: 'Conjunto de pessoas da mesma época. No contexto bíblico, a nova geração representava o futuro da promessa de Deus.' },
    comentarioProfundo: 'A transição de liderança e a transferência de valores de uma geração para outra é um dos temas críticos das Escrituras (cf. Jz 2.10). A sobrevivência espiritual de Israel dependia de a nova geração abraçar a Aliança do Sinai como sua própria.',
    verdadeBiblica: ['A educação cristã no lar é inegociável.', 'Deus não tem netos, apenas filhos.', 'A obediência traz vida e sabedoria.'],
    aplicacaoHoje: {
      pessoal: 'Não posso viver da experiência espiritual de meus pais; preciso conhecer a Deus por mim mesmo.',
      familia: 'O lar é a principal escola de discipulado.',
      igreja: 'A igreja deve investir pesado nas crianças, adolescentes e jovens.',
      ministerio: 'Ministérios de ensino não são opcionais, são essenciais para a saúde da igreja local.',
      espiritual: 'Minha alma precisa estar alerta para não esquecer os livramentos de Deus.'
    },
    fraseAula: '"O cristianismo está sempre a uma geração da extinção."',
    conclusao: 'Que sejamos como a geração de Josué, pronta para crer e conquistar, e que nos dediquemos apaixonadamente a transmitir o bastão da fé aos mais novos.',
    dinamica: { titulo: 'O Bastão da Fé', objetivo: 'Ilustrar a passagem do legado.', material: 'Um bastão de revezamento.', preparacao: 'Forme duas filas.', execucao: 'Faça uma pequena corrida onde o bastão deve ser passado. Se o bastão cair, o grupo recomeça.', aplicacao: 'Se falharmos em passar a fé de forma segura, a próxima geração terá que começar do zero.' }
  },
  {
    titulo: 'O Resumo da Lei',
    subtitulo: 'O grande mandamento: amar a Deus sobre todas as coisas.',
    temaTrimestre: 'Deuteronômio',
    referenciaBiblica: 'Deuteronômio 6.1-9',
    textoAureo: { referencia: 'Deuteronômio 6.4-5', texto: 'Ouve, Israel, o Senhor nosso Deus é o único Senhor. Amarás, pois, o Senhor teu Deus de todo o teu coração...', comentario: 'O Shemá é a declaração central de fé de Israel.' },
    verdadePratica: { frase: 'O amor a Deus é a base e o resumo de toda a obediência.', explicacao: 'Sem amor, qualquer obediência torna-se legalismo e fardo pesado.' },
    leituraClasse: { referencia: 'Deuteronômio 6.1-9', texto: 'Estes, pois, são os mandamentos, os estatutos e os juízos que mandou o Senhor, teu Deus, para se vos ensinar...' },
    introducao: 'Em Deuteronômio 6, encontramos o texto central do judaísmo, conhecido como o "Shemá". Este texto não apenas afirma o monoteísmo, mas define o relacionamento correto com este único Deus: amor total, incondicional e exclusivo.',
    palavraChave: { termo: 'Shemá', explicacao: 'Significa "Ouve!". Representa a disposição de escutar e obedecer.' },
    comentarioProfundo: 'Jesus citou este texto como o maior mandamento (Mt 22.37-38). A lei de Deus nunca foi feita para ser guardada mecanicamente. O amor exigido envolve o coração (emoções e intelecto), alma (vida) e força (recursos materiais e energia).',
    verdadeBiblica: ['Só há um único e verdadeiro Deus.', 'O amor a Deus deve ser integral, não parcial.', 'A Palavra de Deus deve permear cada área da nossa vida.'],
    aplicacaoHoje: { pessoal: 'Meu amor por Deus deve ser minha prioridade máxima.', familia: 'O ensino das Escrituras no lar deve ser contínuo e natural (assentado, andando, deitando, levantando).', igreja: 'A igreja deve promover um ambiente de amor, não de religiosidade vazia.', ministerio: 'Todo serviço prestado deve ter como combustível o amor ao Senhor.', espiritual: 'Meditar na Palavra é essencial para manter a chama do amor acesa.' },
    fraseAula: '"Você não pode obedecer verdadeiramente a quem você não ama profundamente."',
    conclusao: 'Guardar as palavras de Deus no coração é a proteção contra a idolatria que nos cerca. Amemos ao Senhor com intensidade, e a obediência fluirá naturalmente de nós.',
    dinamica: { titulo: 'O Centro do Coração', objetivo: 'Avaliar nossas prioridades', material: 'Folhas de papel, canetas.', preparacao: 'Desenhe um grande coração no papel.', execucao: 'Peça aos alunos que escrevam o que mais amam dentro do coração.', aplicacao: 'Deus deve ocupar o centro absoluto desse coração, e não ser apenas mais um item.' }
  }
];

function generateItem(index) {
  if (lessonsData[index]) return lessonsData[index];

  const num = index + 1;
  return {
    titulo: 'A Revelação em Deuteronômio - Parte ' + num,
    subtitulo: 'Um estudo aprofundado dos princípios práticos para a vida diária e a jornada rumo à Terra Prometida.',
    temaTrimestre: 'Deuteronômio',
    referenciaBiblica: 'Deuteronômio ' + (num + 6) + '.1-10',
    textoAureo: { referencia: 'Deuteronômio ' + (num + 6) + '.3', texto: 'Então o Senhor vos falou... e declarou-vos a sua aliança.', comentario: 'Um chamado à atenção para a aliança divina.' },
    verdadePratica: { frase: 'A santidade e o compromisso renovado nos garantem vitória constante.', explicacao: 'A experiência da geração passada é o alicerce para a obediência da geração atual.' },
    leituraClasse: { referencia: 'Deuteronômio ' + (num + 6) + '.1-8', texto: 'Guarda os mandamentos do Senhor teu Deus, para andares nos seus caminhos...' },
    introducao: 'Chegamos a mais uma etapa crucial do estudo de Deuteronômio. Moisés continua a delinear as exigências do pacto, instruindo o povo a manter um padrão elevado de moralidade, pureza de culto e compromisso social, em claro contraste com as nações de Canaã.',
    palavraChave: { termo: 'Fidelidade', explicacao: 'Manter a lealdade a Deus independente das circunstâncias externas.' },
    comentarioProfundo: 'Neste trecho, o tema da escolha é central. O Senhor apresenta a vida e a morte, a bênção e a maldição. Teologicamente, vemos a presciência divina e a responsabilidade humana atuando em conjunto. Os estatutos não eram correntes para prender, mas trilhos para a vida florescer.',
    verdadeBiblica: ['Deus nos vocacionou para a santidade.', 'A idolatria sutil moderna é tão perigosa quanto a antiga.', 'A justiça social flui do amor a Deus.'],
    aplicacaoHoje: { pessoal: 'Examinar o coração diariamente contra a contaminação do mundo.', familia: 'Proteger o lar das influências contrárias aos princípios da Palavra.', igreja: 'Exercer a santidade comunitária, ajudando os mais fracos.', ministerio: 'Ensinar a sã doutrina sem abrir mão das verdades absolutas.', espiritual: 'Renovar diariamente o compromisso pactual em oração.' },
    fraseAula: '"Nossa escolha de hoje constrói o nosso destino espiritual de amanhã."',
    conclusao: 'Concluímos que a aliança exige manutenção e dedicação exclusivas. As leis de Deus são a prova de Seu amor protetor e orientador.',
    dinamica: { titulo: 'Escolhas e Consequências', objetivo: 'Demonstrar o peso das decisões.', material: 'Cartões com dilemas.', preparacao: 'Divida a classe em pequenos grupos.', execucao: 'Entregue os dilemas e peça que decidam usando apenas princípios de Deuteronômio.', aplicacao: 'Toda decisão tem uma raiz espiritual.' }
  };
}

let fileContent = 'import { LicaoBiblica } from "./types";\n\nexport const MOCK_LICOES: LicaoBiblica[] = [\n';

const slugs = [
  '01-deuteronomio-o-livro-da-alianca',
  '02-moises-e-a-nova-geracao',
  '03-o-resumo-da-lei',
  '04-lembrando-o-passado',
  '05-a-alianca-no-horebe',
  '06-o-perigo-da-idolatria',
  '07-a-eleicao-de-israel',
  '08-as-bencaos-da-obediencia',
  '09-a-terra-prometida',
  '10-a-justica-social-na-lei',
  '11-profetas-sacerdotes-e-reis',
  '12-a-renovacao-da-alianca',
  '13-a-morte-de-moises'
];

for (let i = 0; i < 13; i++) {
  const item = generateItem(i);
  const num = i + 1;
  const slug = slugs[i];

  const leituraDiaria = [
    { dia: 'Segunda', referencia: 'Sl ' + (num * 2) + '.1-5', tema: 'Meditando na Lei do Senhor' },
    { dia: 'Terça', referencia: 'Pv ' + num + '.1-7', tema: 'A sabedoria vem da obediência' },
    { dia: 'Quarta', referencia: 'Is ' + (num + 10) + '.1-3', tema: 'Lembrando das promessas' },
    { dia: 'Quinta', referencia: 'Jr ' + (num + 5) + '.10-15', tema: 'O perigo da idolatria' },
    { dia: 'Sexta', referencia: 'Jo ' + num + '.1-10', tema: 'Cristo, o cumprimento da Lei' },
    { dia: 'Sábado', referencia: 'Rm ' + num + '.1-5', tema: 'O Espírito que vivifica' }
  ];

  const desenvolvimento = [
    {
      titulo: '1. O Contexto Histórico e Bíblico',
      pontos: [
        { titulo: '1.1. O cenário da passagem', conteudo: 'Moisés está nas planícies de Moabe, dirigindo-se a um povo pronto para entrar em guerra e conquistar território.' },
        { titulo: '1.2. A necessidade da exortação', conteudo: 'É fundamental relembrar a história para não perder o rumo no futuro. A memória do fracasso anterior é um alerta.' }
      ],
      sinopse: 'Este tópico contextualiza o momento histórico da narrativa.',
      aplicacao: 'Precisamos entender onde estamos em nossa caminhada espiritual hoje.',
      auxilio: 'Mostre no mapa a localização das planícies de Moabe.'
    },
    {
      titulo: '2. A Revelação do Caráter Divino',
      pontos: [
        { titulo: '2.1. O amor pactual', conteudo: 'O relacionamento de Deus com Israel não era apenas legal, mas amoroso. Ele os escolheu por graça.' },
        { titulo: '2.2. A exigência de santidade', conteudo: 'Porque Deus é santo, Ele exige que Seu povo represente Seu caráter entre as nações pagãs.' }
      ],
      sinopse: 'Mostra a essência de quem Deus é em relação ao Seu povo.',
      aplicacao: 'Deus nos ama, mas não negocia Sua santidade.',
      auxilio: 'Lembre que a graça de Deus no AT é tão evidente quanto no NT.'
    },
    {
      titulo: '3. A Responsabilidade do Povo',
      pontos: [
        { titulo: '3.1. Guarda os estatutos', conteudo: 'A obediência era a marca tangível da lealdade ao pacto.' },
        { titulo: '3.2. Transmissão às gerações', conteudo: 'A fé precisava ser ensinada sistematicamente em casa para garantir a sobrevivência da nação.' }
      ],
      sinopse: 'Apresenta as demandas práticas para Israel.',
      aplicacao: 'O discipulado no lar é o maior antídoto contra a apostasia.',
      auxilio: 'Destaque o verbo "guardar" e "ensinar".'
    }
  ];

  const obj = {
    numero: num,
    slug: slug,
    titulo: item.titulo,
    subtitulo: item.subtitulo,
    trimestre: item.temaTrimestre,
    temaTrimestre: item.temaTrimestre,
    referenciaBiblica: item.referenciaBiblica,
    textoAureo: item.textoAureo,
    verdadePratica: item.verdadePratica,
    leituraDiaria: leituraDiaria,
    leituraClasse: item.leituraClasse,
    introducao: item.introducao,
    palavraChave: item.palavraChave,
    desenvolvimento: desenvolvimento,
    comentarioProfundo: item.comentarioProfundo,
    verdadeBiblica: item.verdadeBiblica,
    aplicacaoHoje: item.aplicacaoHoje,
    perguntasReflexao: ['Reflita sobre o ensino desta lição e como aplicar em sua vida diária.'],
    revisandoConteudo: [{ pergunta: 'Qual a lição principal?', resposta: 'A obediência à Palavra de Deus.' }],
    fraseAula: item.fraseAula,
    conclusao: item.conclusao,
    dinamica: item.dinamica,
    vocabulario: [{ termo: 'Pacto', definicao: 'Acordo solene' }],
    status: 'Disponível para Estudo'
  };

  fileContent += JSON.stringify(obj, null, 2) + ',\n';
}

fileContent += '];\n';

fs.writeFileSync('src/lib/mockLicoes.ts', fileContent);
console.log('src/lib/mockLicoes.ts generated successfully.');
