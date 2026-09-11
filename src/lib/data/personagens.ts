export interface PersonagemBiblico {
  id: string;
  nome: string;
  slug: string;
  categoria: string;
  imagem: string;
  resumo: string;
  referenciasBiblicas: string;
  quemFoi: string;
  contextoHistorico: string;
  contextoBiblico: string;
  principaisAcontecimentos: string[];
  caracteristicasDaFe: string;
  acertosEDesafios: string;
  licoes: string[];
  aplicacaoPratica: string;
}

export const PERSONAGENS_BIBLICOS: PersonagemBiblico[] = [
  {
    id: "p1",
    nome: "Abraão",
    slug: "abraao",
    categoria: "Patriarcas",
    imagem: "/images/personagens/abraao.svg",
    resumo: "O pai da fé, chamado por Deus para deixar sua terra e fundar a nação de Israel.",
    referenciasBiblicas: "Gênesis 11:27 - 25:11; Romanos 4; Hebreus 11:8-19",
    quemFoi: "Originalmente chamado Abrão, Abraão foi um homem rico de Ur dos Caldeus que recebeu um chamado de Deus para deixar tudo e ir para uma terra desconhecida, sob a promessa de se tornar o pai de uma grande nação.",
    contextoHistorico: "Viveu por volta de 2000 a.C. no antigo Oriente Médio. Uma época de politeísmo extremo, onde sua decisão de seguir um único Deus invisível era revolucionária.",
    contextoBiblico: "Abraão é a figura central das promessas aliancistas de Deus. Nele, Deus prometeu que todas as famílias da terra seriam abençoadas (Gn 12:3), apontando diretamente para Jesus Cristo.",
    principaisAcontecimentos: [
      "O chamado para deixar Ur e Harã (Gn 12).",
      "O nascimento de Ismael através de Agar (Gn 16).",
      "A aliança da circuncisão e mudança de nome (Gn 17).",
      "O nascimento milagroso de Isaque, o filho da promessa (Gn 21).",
      "A prova suprema: o pedido para sacrificar Isaque no Monte Moriá (Gn 22)."
    ],
    caracteristicasDaFe: "Uma fé obediente e inabalável. Ele creu em Deus 'contra a esperança', confiando no poder de Deus para ressuscitar os mortos.",
    acertosEDesafios: "Seu maior acerto foi a prontidão em obedecer (como na oferta de Isaque). Sua maior falha foi mentir sobre sua esposa Sara por medo no Egito e em Gerar, além de tentar 'ajudar' Deus gerando Ismael.",
    licoes: [
      "A fé exige obediência radical e disposição para abandonar zonas de conforto.",
      "Deus é fiel às Suas promessas, mesmo quando parecem impossíveis.",
      "Nossas falhas não anulam a aliança de Deus quando há arrependimento e fé verdadeira."
    ],
    aplicacaoPratica: "Assim como Abraão, somos chamados a viver como peregrinos neste mundo, confiando nas promessas futuras de Deus mais do que nas seguranças presentes."
  },
  {
    id: "p2",
    nome: "Sara",
    slug: "sara",
    categoria: "Matriarcas",
    imagem: "/images/personagens/sara.svg",
    resumo: "Esposa de Abraão e mãe de Isaque, cujo ventre estéril foi palco do milagre da promessa.",
    referenciasBiblicas: "Gênesis 11:29 - 23:20; Hebreus 11:11; 1 Pedro 3:6",
    quemFoi: "Meia-irmã e esposa de Abraão. Originalmente chamada Sarai. Uma mulher descrita como extremamente formosa, mas que carregava o profundo estigma da esterilidade em uma cultura que valorizava a maternidade acima de tudo.",
    contextoHistorico: "Na cultura do antigo Oriente Próximo, a esterilidade era vista muitas vezes como maldição. A atitude de dar a serva (Agar) para gerar filhos era uma prática legal e comum da época.",
    contextoBiblico: "Sara é a mãe da nação de Israel. Através de seu milagre de concepção na velhice (aos 90 anos), Deus demonstrou que a linhagem da promessa dependia exclusivamente da intervenção divina, não do poder humano.",
    principaisAcontecimentos: [
      "Acompanhou Abraão em sua peregrinação e obedeceu ao plano arriscado de se passar por irmã dele.",
      "Entregou Agar a Abraão, o que gerou profundo conflito familiar.",
      "Riu ao ouvir o Senhor dizer que teria um filho.",
      "Deu à luz Isaque, o filho do riso e da promessa."
    ],
    caracteristicasDaFe: "Embora tenha tido momentos de dúvida e impaciência, Hebreus 11 a elogia porque 'julgou fiel aquele que o prometera', mostrando que sua fé amadureceu com o tempo.",
    acertosEDesafios: "Demonstrou incrível lealdade ao esposo. No entanto, sua impaciência com o plano de Deus resultou no nascimento de Ismael e conflitos que perduram milênios. Mais tarde, teve inveja e maltratou Agar.",
    licoes: [
      "A impaciência com o tempo de Deus sempre traz consequências dolorosas.",
      "Deus tem poder para reverter qualquer situação de 'esterilidade' espiritual ou física.",
      "O Senhor é misericordioso com nossas fraquezas e risos de incredulidade."
    ],
    aplicacaoPratica: "A história de Sara nos ensina a esperar ativamente no Senhor, sabendo que os atrasos de Deus não são Suas negações."
  },
  {
    id: "p3",
    nome: "Moisés",
    slug: "moises",
    categoria: "Profetas e Líderes",
    imagem: "/images/personagens/moises.svg",
    resumo: "O libertador do povo de Israel e o mediador da antiga aliança no Sinai.",
    referenciasBiblicas: "Êxodo a Deuteronômio; Hebreus 11:23-29",
    quemFoi: "Um israelita salvo das águas, criado como príncipe do Egito, que após 40 anos como pastor no deserto, foi comissionado por Deus para libertar Seu povo.",
    contextoHistorico: "Nasceu durante uma severa opressão aos hebreus sob os faraós do Novo Império Egípcio. Cresceu recebendo a mais alta educação egípcia.",
    contextoBiblico: "Moisés é a figura humana mais proeminente do Antigo Testamento. É o legislador através de quem Deus deu a Torá. Jesus é o cumprimento do 'Profeta semelhante a Moisés'.",
    principaisAcontecimentos: [
      "Salvo do rio Nilo e criado pela filha de Faraó.",
      "Fuga para Midiã após assassinar um egípcio.",
      "Encontro com Deus na sarça ardente.",
      "Liderança durante as Dez Pragas e travessia do Mar Vermelho.",
      "Recepção das Tábuas da Lei no Monte Sinai e 40 anos de peregrinação."
    ],
    caracteristicasDaFe: "Conhecia a Deus face a face. Foi considerado o homem mais manso da terra. Sua fé o fez recusar as riquezas do Egito, escolhendo ser maltratado com o povo de Deus.",
    acertosEDesafios: "Intercessor incomparável pelo povo. Mas lutou com problemas de raiva e impaciência. Ferir a rocha em vez de falar a ela lhe custou a entrada na Terra Prometida.",
    licoes: [
      "A verdadeira liderança nasce no deserto (humildade e dependência).",
      "Deus usa pessoas com um passado quebrado e sentimentos de inadequação.",
      "Intimidade com Deus requer santidade e obediência estrita."
    ],
    aplicacaoPratica: "Somos desafiados a interceder pelo nosso povo e a priorizar a comunhão com Deus acima de todos os tesouros e status que o 'Egito' (o mundo) pode oferecer."
  },
  {
    id: "p4",
    nome: "Josué",
    slug: "josue",
    categoria: "Líderes Militares",
    imagem: "/images/personagens/josue.svg",
    resumo: "O sucessor de Moisés, um comandante corajoso que liderou a conquista da Terra Prometida.",
    referenciasBiblicas: "Êxodo 17, 24, 32; Números 13-14; Livro de Josué",
    quemFoi: "Originalmente Oseias (Salvação), teve o nome mudado para Josué (Yahweh é Salvação). Foi escravo no Egito, assistente de Moisés e finalmente o comandante de Israel.",
    contextoHistorico: "A transição de uma vida nômade no deserto para a conquista militar e o assentamento em Canaã, uma terra repleta de cidades fortificadas e povos guerreiros.",
    contextoBiblico: "Representa a vitória e a posse das promessas. Assim como Moisés representa a Lei (que não pode nos levar à promessa), Josué (cujo nome em grego é Jesus) representa a graça que nos introduz no descanso de Deus.",
    principaisAcontecimentos: [
      "Líder na batalha contra os amalequitas (Ex 17).",
      "Um dos 12 espias, junto com Calebe, que acreditou que poderiam conquistar a terra.",
      "Assumiu a liderança após a morte de Moisés.",
      "A travessia miraculosa do rio Jordão.",
      "A queda das muralhas de Jericó."
    ],
    caracteristicasDaFe: "Fé caracterizada pela coragem, obediência irrestrita às estratégias divinas (mesmo as que pareciam ilógicas) e zelo pela santidade de Deus no acampamento.",
    acertosEDesafios: "Liderou com integridade até a morte. Seu grande deslize foi não consultar ao Senhor antes de fazer aliança com os gibeonitas, sendo enganado por eles.",
    licoes: [
      "A verdadeira coragem baseia-se na promessa da presença de Deus ('Não te deixarei, nem te desampararei').",
      "Devemos consultar a Deus em todas as decisões, não confiando na própria sabedoria.",
      "Liderança pelo exemplo ('Eu e minha casa serviremos ao Senhor')."
    ],
    aplicacaoPratica: "Não basta ser liberto do Egito (pecado), é preciso lutar com coragem para tomar posse de tudo o que Deus preparou para nós na vida cristã abundante."
  },
  {
    id: "p5",
    nome: "Rute",
    slug: "rute",
    categoria: "Figuras Históricas",
    imagem: "/images/personagens/rute.svg",
    resumo: "Uma moabita leal cuja fé e caráter a incluíram na genealogia do Rei Davi e de Jesus.",
    referenciasBiblicas: "Livro de Rute; Mateus 1:5",
    quemFoi: "Uma mulher moabita, viúva de um israelita. Ela escolheu abandonar seus deuses e sua terra natal para cuidar de sua sogra Noemi, que também estava viúva e desamparada.",
    contextoHistorico: "Os eventos ocorrem durante a sombria época dos Juízes, quando 'cada um fazia o que achava reto aos seus olhos'. Um tempo marcado por fome, opressão e falência moral em Israel.",
    contextoBiblico: "O livro de Rute é um raio de luz na escuridão dos Juízes. Mostra o princípio do 'Parente-Resgatador' (Goel), uma tipologia claríssima do sacrifício redentor de Cristo pela Sua Noiva gentílica.",
    principaisAcontecimentos: [
      "A declaração de lealdade a Noemi: 'O teu povo é o meu povo, o teu Deus é o meu Deus'.",
      "O trabalho duro e humilde respigando campos em Belém.",
      "O encontro providencial com Boaz, o parente-resgatador.",
      "O casamento com Boaz e o nascimento de Obede, avô de Davi."
    ],
    caracteristicasDaFe: "Uma fé humilde, altruísta e proativa. Rute demonstrou o amor leal (Hesed) que normalmente é atribuído a Deus, operando através de uma estrangeira.",
    acertosEDesafios: "Superou o luto, a extrema pobreza e o estigma de ser moabita em Israel, mantendo a integridade moral impecável, sendo reconhecida como uma 'mulher virtuosa'.",
    licoes: [
      "Nossas origens ou passados sombrios não determinam nosso futuro em Deus.",
      "A fidelidade nas coisas pequenas e no trabalho duro atrai a providência divina.",
      "A bondade (graça) divina frequentemente nos alcança através da bondade humana."
    ],
    aplicacaoPratica: "Rute nos inspira a amar o próximo de forma sacrificial e a confiar que, debaixo das asas do Senhor, encontraremos refúgio e redenção."
  },
  {
    id: "p6",
    nome: "Davi",
    slug: "davi",
    categoria: "Reis",
    imagem: "/images/personagens/davi.svg",
    resumo: "O pastor de ovelhas que se tornou o maior rei de Israel e um 'homem segundo o coração de Deus'.",
    referenciasBiblicas: "1 Samuel 16 - 1 Reis 2; 1 Crônicas 11-29; Livro dos Salmos",
    quemFoi: "O caçula de Jessé de Belém, músico, pastor, guerreiro valente, poeta prolífico e o rei que consolidou o reino de Israel e estabeleceu Jerusalém como capital.",
    contextoHistorico: "Davi liderou a transição de Israel de uma confederação tribal frouxa e ameaçada para um império monárquico unido e temido em todo o Oriente Médio.",
    contextoBiblico: "Davi é o padrão para todos os reis subsequentes. Com ele, Deus estabeleceu a 'Aliança Davídica', prometendo que o Messias descenderia dele e Seu trono duraria para sempre.",
    principaisAcontecimentos: [
      "Ungido secretamente por Samuel.",
      "A derrota épica do gigante filisteu Golias.",
      "A perseguição sofrida por inveja do rei Saul.",
      "O estabelecimento de Jerusalém e o projeto do Templo.",
      "O pecado do adultério com Bate-Seba e o assassinato de Urias.",
      "A rebelião trágica de seu filho Absalão."
    ],
    caracteristicasDaFe: "Davi tinha um coração profundamente apaixonado e submisso a Deus. Sua marca era a total dependência, evidenciada por sua rica vida de adoração, louvor e arrependimento honesto.",
    acertosEDesafios: "Um adorador e estrategista incrível. Contudo, seu profundo declínio moral no caso com Bate-Seba quase destruiu seu reino, mas sua postura de arrependimento (Salmo 51) restaurou sua comunhão com Deus.",
    licoes: [
      "O arrependimento sincero é o caminho para o perdão (embora as consequências do pecado permaneçam).",
      "O coração do adorador atrai a presença manifesta de Deus.",
      "Deus olha para o coração, não para a aparência exterior."
    ],
    aplicacaoPratica: "Aprendemos a ser íntimos de Deus nas vitórias e derrotas, derramando nossas emoções honestamente diante dEle como nos Salmos, e mantendo um coração sensível ao Seu Espírito."
  },
  {
    id: "p7",
    nome: "Salomão",
    slug: "salomao",
    categoria: "Reis",
    imagem: "/images/personagens/salomao.svg",
    resumo: "O filho de Davi, conhecido como o homem mais sábio da terra e construtor do glorioso Templo de Jerusalém.",
    referenciasBiblicas: "1 Reis 1-11; 2 Crônicas 1-9; Provérbios; Eclesiastes; Cânticos",
    quemFoi: "Terceiro rei de Israel Unido, filho de Davi com Bate-Seba. Ele elevou o império de Israel ao seu auge econômico, cultural e de poderio político durante um reinado de 40 anos de paz.",
    contextoHistorico: "A era de ouro de Israel. Com as rotas comerciais controladas, a nação experimentou riqueza sem precedentes. Reis de todo o mundo viajavam para ouvir a sabedoria do monarca.",
    contextoBiblico: "Salomão representa o ápice da glória terrestre do reino. Contudo, ele também encarna o aviso de Deuteronômio sobre os perigos da multiplicação de riquezas, esposas e cavalos.",
    principaisAcontecimentos: [
      "O pedido de sabedoria a Deus em Gibeão.",
      "O famoso julgamento das duas mulheres e o bebê.",
      "A construção e dedicação majestosa do Templo do Senhor.",
      "A visita da Rainha de Sabá.",
      "A queda para a idolatria influenciado por suas inúmeras esposas estrangeiras."
    ],
    caracteristicasDaFe: "Uma fé que buscou discernimento acima de riqueza e honra em sua juventude, mas que não se sustentou inabalável na velhice devido a alianças políticas comprometedoras.",
    acertosEDesafios: "Construiu a casa de Deus e compôs provérbios eternos. No entanto, sua tolerância religiosa para com suas 700 esposas o levou a edificar altares a deuses pagãos em Jerusalém.",
    licoes: [
      "Sabedoria intelectual sem obediência moral leva ao fracasso.",
      "Começar bem não garante terminar bem; a perseverança na fé é crucial.",
      "O fascínio pelo sucesso material, fama e alianças humanas pode endurecer o coração para Deus (Eclesiastes)."
    ],
    aplicacaoPratica: "A vida de Salomão é um alerta: de nada adianta compreender todos os mistérios da natureza e da sabedoria humana se não guardarmos o coração das influências sutis do mundo e da idolatria moderna."
  },
  {
    id: "p8",
    nome: "Elias",
    slug: "elias",
    categoria: "Profetas",
    imagem: "/images/personagens/elias.svg",
    resumo: "O profeta do fogo, que confrontou a idolatria no Reino do Norte com poder e zelo pelo Senhor.",
    referenciasBiblicas: "1 Reis 17 - 2 Reis 2",
    quemFoi: "O profeta tisbita, vestido rústico, que se levantou como uma força da natureza contra o corrupto rei Acabe e a rainha Jezabel, para chamar Israel ao arrependimento.",
    contextoHistorico: "O Reino do Norte (Israel) estava em profunda apostasia. Sob a influência de Jezabel, a adoração a Baal (deus da chuva e fertilidade) tornou-se a religião estatal.",
    contextoBiblico: "Elias é o maior profeta do Antigo Testamento (não literário). Representa todo o ministério profético (visto no Monte da Transfiguração ao lado de Moisés).",
    principaisAcontecimentos: [
      "Declarou a seca de três anos e meio sobre a terra.",
      "Foi sustentado por corvos e multiplicou o azeite da viúva de Sarepta.",
      "Ressuscitou o filho da viúva.",
      "O épico confronto no Monte Carmelo contra os 450 profetas de Baal.",
      "Sua arrebatamento em um redemoinho com carruagens de fogo."
    ],
    caracteristicasDaFe: "Uma fé ousada, apaixonada e militante. Orava com poder sobrenatural (Tiago 5).",
    acertosEDesafios: "Seu confronto no Carmelo é inesquecível. Contudo, após uma grande vitória, cedeu ao medo extremo de Jezabel e a uma severa depressão na caverna, desejando a morte.",
    licoes: [
      "Deus pode usar vozes solitárias para abalar nações corruptas.",
      "A fadiga física e emocional nos torna vulneráveis ao medo e à falta de perspectiva.",
      "O Senhor fala não apenas no fogo e no terremoto, mas na 'brisa suave' do cuidado pessoal."
    ],
    aplicacaoPratica: "A história de Elias nos ensina a permanecer firmes em uma cultura pagã, orar com intrepidez e também a reconhecer nossos limites físicos e emocionais, buscando o descanso e a voz restauradora de Deus."
  },
  {
    id: "p9",
    nome: "Ester",
    slug: "ester",
    categoria: "Figuras Históricas",
    imagem: "/images/personagens/ester.svg",
    resumo: "A jovem órfã judia que se tornou rainha da Pérsia e arriscou a vida para salvar seu povo do genocídio.",
    referenciasBiblicas: "Livro de Ester",
    quemFoi: "Hassada (seu nome hebraico), prima e filha adotiva de Mardoqueu. Foi escolhida entre muitas donzelas para ser a rainha do rei Assuero (Xerxes I), no Império Persa.",
    contextoHistorico: "Ocorre durante o exílio, após a primeira leva de judeus ter retornado a Jerusalém. Uma vasta comunidade judaica permanecia no gigantesco império Medo-Persa.",
    contextoBiblico: "O Livro de Ester não menciona o nome de Deus nenhuma vez, ilustrando brilhantemente a Providência Divina agindo nos bastidores e coincidências humanas para proteger Seu povo.",
    principaisAcontecimentos: [
      "Foi coroada rainha no lugar de Vasti, ocultando sua origem judaica.",
      "O decreto de Hamã para aniquilar todos os judeus do império.",
      "O jejum de três dias de todos os judeus de Susã.",
      "Sua entrada corajosa na câmara do rei ('Se perecer, pereci').",
      "O desmascaramento de Hamã e o decreto de livramento (instituindo a festa de Purim)."
    ],
    caracteristicasDaFe: "Uma fé estratégica e sacrificial. Ester soube aliar oração profunda (jejum) com ação corajosa, discernimento e diplomacia inteligente.",
    acertosEDesafios: "Cresceu de uma garota submissa e amedrontada para uma estadista corajosa. Enfrentou o risco real de morte pela lei persa em favor do seu povo.",
    licoes: [
      "Deus trabalha providencialmente através das circunstâncias ordinárias da vida.",
      "Muitas vezes, fomos colocados onde estamos 'para tal tempo como este'.",
      "Jejum e oração devem preceder passos perigosos e importantes."
    ],
    aplicacaoPratica: "Somos desafiados a usar a influência e posições que Deus nos deu (no trabalho, política, etc) não para conforto pessoal, mas para interceder e agir em favor da justiça e dos vulneráveis."
  },
  {
    id: "p10",
    nome: "Daniel",
    slug: "daniel",
    categoria: "Profetas",
    imagem: "/images/personagens/daniel.svg",
    resumo: "Um estadista e profeta exilado, de caráter inabalável, que serviu a impérios pagãos sem se contaminar.",
    referenciasBiblicas: "Livro de Daniel; Mateus 24:15",
    quemFoi: "Jovem nobre de Judá levado cativo para Babilônia por Nabucodonosor. Serviu em altos cargos governamentais durante os impérios Babilônico e Medo-Persa por mais de 70 anos.",
    contextoHistorico: "O exílio babilônico. O mundo estava no ápice da glória da Babilônia. Judeus enfrentavam o enorme choque cultural de viver em um epicentro acadêmico e religioso pagão.",
    contextoBiblico: "Daniel é o exemplo do crente vivendo no exílio. Suas visões proféticas e escatológicas são a espinha dorsal para a compreensão do livro de Apocalipse e dos tempos do fim.",
    principaisAcontecimentos: [
      "A recusa em se contaminar com a comida do rei.",
      "A revelação e interpretação do sonho da estátua (os impérios mundiais).",
      "A cova dos leões, onde foi lançado por não cessar suas orações.",
      "A visão das setenta semanas e do tempo do fim."
    ],
    caracteristicasDaFe: "Fé inabalável pautada em hábitos rigorosos de devoção e pureza pessoal. Uma fé que não fazia concessões morais, nem negociava com a cultura, mas se envolvia nela para o bem comum.",
    acertosEDesafios: "Manteve um testemunho perfeito. Estudiosos bíblicos lutam para encontrar qualquer pecado registrado de Daniel. Ele sobreviveu a intrigas palacianas confiando na soberania de Deus.",
    licoes: [
      "É possível viver no ápice das estruturas de poder do mundo sem perder a santidade.",
      "Deus tem o domínio soberano sobre os reinos humanos e levanta quem Ele quer.",
      "As disciplinas espirituais diárias nos preparam para enfrentar os leões."
    ],
    aplicacaoPratica: "Como 'exilados' neste mundo, somos chamados a ser os melhores profissionais e cidadãos (como Daniel na Babilônia), influenciando a cultura, mas sem nos curvar aos seus 'ídolos'."
  },
  {
    id: "p11",
    nome: "Jonas",
    slug: "jonas",
    categoria: "Profetas",
    imagem: "/images/personagens/jonas.svg",
    resumo: "O profeta relutante que fugiu de seu chamado e vivenciou a misericórdia implacável de Deus.",
    referenciasBiblicas: "Livro de Jonas; 2 Reis 14:25; Mateus 12:39-41",
    quemFoi: "Profeta do Reino do Norte no tempo do rei Jeroboão II, a quem Deus ordenou ir pregar arrependimento em Nínive, a violenta capital do império Assírio, inimigo de Israel.",
    contextoHistorico: "A Assíria era conhecida por sua crueldade terrível. Para um judeu nacionalista como Jonas, desejar a destruição deles era perfeitamente lógico e compreensível.",
    contextoBiblico: "Jonas é uma crítica profunda ao etnocentrismo espiritual. Ele mostra o coração missionário de Deus, que se importa até com as nações inimigas, e prefigura a ressurreição de Cristo (3 dias no ventre).",
    principaisAcontecimentos: [
      "A fuga em um navio para Társis (direção oposta a Nínive).",
      "A forte tempestade, e sendo lançado ao mar para acalmar a ira de Deus.",
      "Engolido pelo grande peixe e sua oração de arrependimento.",
      "A pregação em Nínive e o incrível arrependimento da cidade.",
      "Sua revolta profunda contra a compaixão de Deus, e a lição da planta (aboboreira)."
    ],
    caracteristicasDaFe: "Jonas conhecia perfeitamente a teologia ('Sei que és Deus misericordioso e compassivo'), mas seu coração resistia à graça divina sendo aplicada a seus inimigos.",
    acertosEDesafios: "Pregou o sermão mais curto e obteve o maior avivamento da história. No entanto, é o único profeta que terminou seu livro brigando com Deus por causa de Sua bondade.",
    licoes: [
      "Não podemos fugir da presença do Senhor ou do Seu chamado.",
      "A graça de Deus é escandalosamente ampla e alcança nossos piores inimigos.",
      "Muitas vezes amamos mais as coisas que nos dão conforto (a planta) do que as almas que perecem."
    ],
    aplicacaoPratica: "Um alerta contundente para não nos tornarmos confortáveis e preconceituosos em nossa religiosidade, rejeitando aqueles que o mundo condena, mas a quem Deus quer salvar."
  },
  {
    id: "p12",
    nome: "João Batista",
    slug: "joao-batista",
    categoria: "Profetas e Evangelistas",
    imagem: "/images/personagens/joao-batista.svg",
    resumo: "O precursor, a 'Voz que clama no deserto', que preparou o caminho para a vinda do Messias Jesus.",
    referenciasBiblicas: "Os Evangelhos (Mateus, Marcos, Lucas e João)",
    quemFoi: "Filho do sacerdote Zacarias e de Isabel, parente de Jesus. Viveu como nazireu no deserto, vestindo pelos de camelo, tornando-se o profeta mais proeminente desde Elias.",
    contextoHistorico: "O período do primeiro século na Judeia, sob ocupação romana. Havia uma expectativa messiânica fervorosa. Havia mais de 400 anos que um profeta não falava em Israel (período interbíblico).",
    contextoBiblico: "O elo entre o Antigo e o Novo Testamento. Ele é o cumprimento da profecia de Malaquias sobre o envio de 'Elias' antes do Dia do Senhor, a fim de preparar um povo disposto.",
    principaisAcontecimentos: [
      "Batizava no Rio Jordão para arrependimento e remissão de pecados.",
      "Confrontou abertamente a hipocrisia dos fariseus e saduceus ('raça de víboras').",
      "Batizou o próprio Jesus Cristo no rio Jordão.",
      "O testemunho da pomba e da voz do Pai.",
      "Preso e decapitado pelo rei Herodes Antipas devido à sua denúncia do pecado real."
    ],
    caracteristicasDaFe: "Uma fé radical, humilde e corajosa. Jesus disse que entre os nascidos de mulher não surgiu ninguém maior do que ele.",
    acertosEDesafios: "Seu maior acerto foi sua filosofia ministerial: 'É necessário que Ele cresça e que eu diminua'. Na prisão, experimentou momentos de dúvida, mandando perguntar a Jesus se Ele era mesmo o Messias.",
    licoes: [
      "A coragem para denunciar o pecado é evidência do amor verdadeiro.",
      "Até os maiores homens de fé enfrentam dúvidas nos momentos de profunda angústia.",
      "A humildade suprema é redirecionar toda a honra e atenção para Jesus."
    ],
    aplicacaoPratica: "Somos chamados a ser os 'João Batistas' do nosso tempo: preparar o caminho, confrontar com amor e apontar as pessoas invariavelmente para o Cordeiro de Deus."
  },
  {
    id: "p13",
    nome: "Jesus",
    slug: "jesus",
    categoria: "Jesus Cristo",
    imagem: "/images/personagens/jesus.svg",
    resumo: "O Filho de Deus encarnado, o Messias prometido, Salvador do mundo e centro da História.",
    referenciasBiblicas: "Os 4 Evangelhos; Apocalipse; Todo o Novo Testamento",
    quemFoi: "O Verbo que se fez carne. Deus encarnado que viveu uma vida sem pecado, realizou milagres, ensinou sobre o Reino de Deus, foi crucificado e ressuscitou ao terceiro dia.",
    contextoHistorico: "Nasceu em Belém, cresceu em Nazaré da Galileia, carpinteiro, atuou na região da Palestina no século I sob o domínio do Império Romano.",
    contextoBiblico: "Ele é a figura central de toda a Escritura (o Antigo Testamento aponta para Ele, o Novo revela Sua pessoa e obra). Ele é o Cordeiro de Deus que tira o pecado do mundo.",
    principaisAcontecimentos: [
      "Seu nascimento virginal e ministério poderoso de curas e ensinamentos.",
      "A Última Ceia e a oração angustiante no Getsêmani.",
      "O sacrifício na cruz do Calvário suportando a ira de Deus e assumindo os pecados.",
      "Sua ressurreição gloriosa ao terceiro dia.",
      "A Ascensão e o derramar do Espírito Santo."
    ],
    caracteristicasDaFe: "A perfeita obediência e confiança no Pai. 'Não se faça a minha vontade, mas a tua.' Ele é o próprio Autor e Consumador da nossa fé.",
    acertosEDesafios: "Enfrentou toda oposição demoníaca, traição de amigos próximos e um sofrimento físico e espiritual excruciante sem jamais pecar.",
    licoes: [
      "O amor ágape envolve total sacrifício pessoal em favor do indigno.",
      "Jesus não é apenas um mestre moral, Ele é Deus e a única ponte entre o homem e a salvação.",
      "O poder do mal e a morte foram definitivamente derrotados em Sua ressurreição."
    ],
    aplicacaoPratica: "Nossa resposta a Jesus determina nosso destino eterno. A vida cristã consiste em imitá-Lo, segui-Lo de perto, amá-Lo sobre todas as coisas e anunciar as Suas boas novas ao mundo."
  },
  {
    id: "p14",
    nome: "Paulo",
    slug: "paulo",
    categoria: "Apóstolos e Evangelistas",
    imagem: "/images/personagens/paulo.svg",
    resumo: "De perseguidor obstinado a o maior plantador de igrejas e teólogo do Novo Testamento.",
    referenciasBiblicas: "Atos dos Apóstolos 7-28; Cartas Paulinas (Romanos a Filemom)",
    quemFoi: "Saulo de Tarso, judeu fariseu da tribo de Benjamim, educado aos pés de Gamaliel, que se converteu drasticamente a Cristo e se tornou o 'Apóstolo dos Gentios'.",
    contextoHistorico: "Cidadão romano poliglota e culto. Utilizou as redes de estradas romanas e a paz imperial (Pax Romana) para difundir o cristianismo com velocidade alarmante pelo império.",
    contextoBiblico: "Escreveu 13 (possivelmente 14 com Hebreus) cartas que estabeleceram os fundamentos sistemáticos da teologia cristã: justificação pela fé, a graça e a doutrina da Igreja.",
    principaisAcontecimentos: [
      "Aprovação e guarda das vestes no apedrejamento de Estêvão.",
      "O encontro ofuscante com Cristo ressurreto na estrada para Damasco.",
      "Três grandes viagens missionárias no mundo greco-romano.",
      "Sofrimentos, naufrágios, prisões e espancamentos pelo Evangelho.",
      "O envio de suas magistrais epístolas e o provável martírio em Roma sob Nero."
    ],
    caracteristicasDaFe: "Fé teologicamente robusta, resiliente e incansável. Aprendeu o segredo de estar contente em toda e qualquer situação, pois 'todas as coisas cooperam para o bem'.",
    acertosEDesafios: "Maior expansionista da Igreja Primitiva. Lutou contra conflitos internos nas igrejas, falsos mestres, e contra o seu 'espinho na carne', onde aprendeu que a Graça de Deus lhe bastava.",
    licoes: [
      "Ninguém está longe demais para ser alcançado e transformado pela graça radical de Cristo.",
      "A vida cristã autêntica inevitavelmente envolverá perseguição e sofrimento.",
      "A clareza doutrinária (teologia) e a paixão evangelística devem caminhar absolutamente juntas."
    ],
    aplicacaoPratica: "Sermos inabaláveis, sempre abundantes na obra do Senhor. 'Já não sou eu quem vive, mas Cristo vive em mim'."
  },
  {
    id: "p15",
    nome: "João",
    slug: "joao",
    categoria: "Apóstolos e Evangelistas",
    imagem: "/images/personagens/joao.svg",
    resumo: "O 'discípulo amado', de temperamento explosivo na juventude, transformado no apóstolo do amor.",
    referenciasBiblicas: "Os Evangelhos; Livro de Atos; 1, 2, 3 João; Apocalipse",
    quemFoi: "Filho de Zebedeu, irmão de Tiago e parceiro de pesca de Pedro. Membro do círculo íntimo de Jesus, escreveu o quarto Evangelho, três epístolas e a Revelação.",
    contextoHistorico: "Sobreviveu a todos os outros apóstolos, liderando a igreja de Éfeso no fim do primeiro século, numa época de crescente gnosticismo e adoração ao imperador romano Domiciano.",
    contextoBiblico: "Seu evangelho enfatiza de forma sublime a Divindade de Cristo ('No princípio era o Verbo'). Suas cartas combatem a heresia, enfatizando a obediência, a verdade e o amor profundo.",
    principaisAcontecimentos: [
      "Deixou as redes no mar da Galileia para seguir o Mestre.",
      "Presenciou a Transfiguração e a oração no Getsêmani.",
      "O único discípulo aos pés da cruz, a quem Jesus confiou os cuidados de Sua mãe Maria.",
      "Correu até o túmulo vazio na manhã de domingo.",
      "Exilado na ilha de Patmos por causa da palavra de Deus, onde recebeu as visões do Apocalipse."
    ],
    caracteristicasDaFe: "Fé enraizada no amor experimental, na intimidade e na verdade (encostou a cabeça no peito de Jesus). Transformado pelo convívio constante com o Mestre.",
    acertosEDesafios: "Conhecido como 'Filhos do Trovão' (Boanerges) junto com seu irmão, João tinha uma natureza explosiva e sectária (queria mandar fogo do céu em samaritanos). A graça o lapidou perfeitamente.",
    licoes: [
      "A intimidade com Cristo transforma o pior dos temperamentos em amor puro.",
      "A sã doutrina (a verdade de quem Cristo é) é inegociável.",
      "Não há contradição entre pregar a verdade com firmeza e amar profundamente."
    ],
    aplicacaoPratica: "João nos convida a cultivar o relacionamento diário com Jesus ao ponto de sermos conhecidos simplesmente pelo título que nos liberta: sermos 'amados' por Ele."
  }
];
