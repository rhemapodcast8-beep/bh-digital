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
} from '../types';

export const CATEGORIAS_ESTUDOS: { id: EstudoCategoria; slug: string; desc: string }[] = [
  { id: 'Esboços', slug: 'esbocos', desc: 'Estruturas e tópicos preparados para pregações e aulas' },
  { id: 'Estudos Bíblicos', slug: 'estudos-biblicos', desc: 'Aprofundamento versículo a versículo nas Escrituras' },
  { id: 'Personagens Bíblicos', slug: 'personagens', desc: 'Biografias e lições práticas da vida dos servos de Deus' },
  { id: 'Parábolas', slug: 'parabolas', desc: 'Os ensinamentos profundos de Jesus em linguagem simples' },
  { id: 'Fé', slug: 'fe', desc: 'Edificação e firmeza espiritual nos momentos de provação' },
  { id: 'Oração', slug: 'oracao', desc: 'Intimidade, intercessão e comunhão diária com o Pai' },
  { id: 'Família', slug: 'familia', desc: 'Princípios bíblicos para casamento, filhos e lar cristão' },
  { id: 'Vida Cristã', slug: 'vida-crista', desc: 'Caminhada prática, testemunho e integridade diária' },
  { id: 'Evangelismo', slug: 'evangelismo', desc: 'Estratégias e paixão para cumprir a Grande Comissão' },
];

export const MOCK_ESTUDOS: EstudoItem[] = [
  {
    id: 'estudo-1',
    slug: 'o-poder-da-oracao-no-lugar-secreto',
    titulo: 'O Poder da Oração no Lugar Secreto',
    categoria: 'Oração',
    referencia: 'Mateus 6:6',
    autor: 'Equipe Editorial BH Digital',
    data: '02 Mar 2026',
    tempoLeitura: '7 min',
    destaque: true,
    resumo: 'Descubra como a disciplina da oração silenciosa e sincera transforma o coração e gera frutos públicos duradouros.',
    imagem: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'A prática do lugar secreto não é apenas um isolamento físico, mas uma postura interior de dependência exclusiva do Criador.',
      'Jesus advertiu Seus discípulos quanto aos perigos da oração performática feita para impressionar os homens. Quando entramos em nosso quarto e fechamos a porta, despojamo-nos de qualquer máscara.',
      'No secreto, encontramos a paz que excede o entendimento e alinhamos nossos anseios com a soberana vontade divina.',
      'A recompensa divina mencionada em Mateus 6 não é um troféu mundano, mas a própria presença reconfortante do Pai que vê no secreto e nos sustenta na jornada.'
    ]
  },
  {
    id: 'estudo-2',
    slug: 'fe-inabalavel-em-tempos-de-crise',
    titulo: 'Fé Inabalável em Tempos de Crise: A Trajetória de Abraão',
    categoria: 'Fé',
    referencia: 'Hebreus 11:8-10',
    autor: 'Equipe Editorial BH Digital',
    data: '24 Fev 2026',
    tempoLeitura: '9 min',
    destaque: true,
    resumo: 'Uma análise exegética sobre como crer contra a esperança quando as circunstâncias naturais parecem contrárias.',
    imagem: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'A obediência de Abraão iniciou-se com um chamado radical para deixar sua parentela sem saber exatamente para onde ia.',
      'A verdadeira fé bíblica não é uma convicção cega, mas a firme confiança no caráter Daquele que fez a promessa.',
      'Mesmo habitando na terra prometida como forasteiro em tendas, Abraão manteve o olhar na cidade celestial cujo artífice e construtor é Deus.',
      'Aplicação prática: o que significa para nós hoje vivermos com a perspectiva da eternidade enquanto caminhamos no presente?'
    ]
  },
  {
    id: 'estudo-3',
    slug: 'esboco-homiletico-o-bom-pastor',
    titulo: 'Esboço Homilético: O Cuidado do Bom Pastor',
    categoria: 'Esboços',
    referencia: 'Salmo 23:1-6',
    autor: 'Equipe Editorial BH Digital',
    data: '18 Fev 2026',
    tempoLeitura: '5 min',
    destaque: false,
    resumo: 'Esboço estruturado em três pontos para pregação e ensino em pequenos grupos sobre a provisão de Deus.',
    imagem: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'I. Provisão Perfeita: "O Senhor é o meu pastor; nada me faltará". Descanso junto às águas tranquilas.',
      'II. Condução Segura: "Guia-me pelas veredas da justiça". Proteção no vale da sombra da morte.',
      'III. Destino Triunfante: "Preparas-me uma mesa... Unges minha cabeça com óleo". Habitarei na casa do Senhor para sempre.',
      'Sugestão de introdução, apelo e perguntas reflexivas para aplicação no ministério.'
    ]
  },
  {
    id: 'estudo-4',
    slug: 'a-parabola-do-filho-prodigo-e-a-graca',
    titulo: 'A Parábola do Filho Pródigo e o Abraço da Graça',
    categoria: 'Parábolas',
    referencia: 'Lucas 15:11-32',
    autor: 'Equipe Editorial BH Digital',
    data: '12 Fev 2026',
    tempoLeitura: '8 min',
    destaque: true,
    resumo: 'Compreendendo o amor incondicional do Pai através dos dois irmãos: o que partiu e o que permaneceu sem entender a graça.',
    imagem: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'Mais do que a história de um jovem rebelde, esta parábola revela a prodigalidade do coração amoroso do Pai.',
      'Ao avistar o filho ainda longe, o pai corre ao seu encontro, quebrando qualquer protocolo social da época.',
      'O irmão mais velho revela a tragédia do coração farisaico: estar na casa do Pai, mas viver como empregado sem desfrutar da herança de filho.',
      'Deus convida ambos os corações para a festa do arrependimento e da comunhão.'
    ]
  },
  {
    id: 'estudo-5',
    slug: 'a-vida-de-jose-do-poco-ao-palacio',
    titulo: 'A Vida de José do Egito: Da Dor ao Propósito Soberano',
    categoria: 'Personagens Bíblicos',
    referencia: 'Gênesis 50:20',
    autor: 'Equipe Editorial BH Digital',
    data: '05 Fev 2026',
    tempoLeitura: '10 min',
    destaque: false,
    resumo: 'Como Deus transforma traições, injustiças e esperas em instrumentos de preservação e salvação de muitas vidas.',
    imagem: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'José experimentou a inveja dos irmãos, o cárcere injusto e o esquecimento humano, sem jamais abandonar o temor a Deus.',
      'Em cada estação de aparente derrota, a Bíblia destaca uma frase reconfortante: "O Senhor, porém, estava com José".',
      'Ao reencontrar seus irmãos, ele não buscou vingança, mas reconheceu: "Vós bem intentastes mal contra mim; porém Deus o intentou para bem".',
      'Lição para os nossos dias: confiar na soberania divina quando os sonhos parecem distantes.'
    ]
  },
  {
    id: 'estudo-6',
    slug: 'edificando-um-lar-em-rocha-firme',
    titulo: 'Edificando o Lar em Rocha Firme: Família com Propósito',
    categoria: 'Família',
    referencia: 'Salmo 127:1',
    autor: 'Equipe Editorial BH Digital',
    data: '28 Jan 2026',
    tempoLeitura: '6 min',
    destaque: false,
    resumo: 'Princípios atemporais para proteger o casamento e orientar a criação dos filhos em uma cultura desafiadora.',
    imagem: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'Se o Senhor não edificar a casa, em vão trabalham os que a constroem.',
      'O lar cristão deve ser um refúgio de graça, perdão contínuo e celebração diária da Palavra de Deus.',
      'Priorizar o diálogo, o culto doméstico e a integridade de caráter é a maior herança que os pais podem legar às próximas gerações.'
    ]
  },
  {
    id: 'estudo-7',
    slug: 'evangelismo-relacional-na-era-digital',
    titulo: 'Evangelismo Relacional: Compartilhando a Fé no Dia a Dia',
    categoria: 'Evangelismo',
    referencia: '1 Pedro 3:15',
    autor: 'Equipe Editorial BH Digital',
    data: '20 Jan 2026',
    tempoLeitura: '7 min',
    destaque: false,
    resumo: 'Como estar preparado para responder com mansidão e respeito a qualquer pessoa que pedir a razão da nossa esperança.',
    imagem: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'O evangelismo não se restringe a púlpitos; ele acontece nos cafés, no ambiente de trabalho e nas redes sociais.',
      'A autenticidade de vida precede o discurso: o amor genuíno e o serviço abnegado abrem portas que a argumentação isolada não alcança.',
      'Dicas práticas para iniciar conversas de fé com sabedoria, empatia e sem julgamentos precipitados.'
    ]
  },
  {
    id: 'estudo-8',
    slug: 'santidade-pratica-na-vida-crista',
    titulo: 'Santidade Prática: O Andar Cristão na Sociedade Moderna',
    categoria: 'Vida Cristã',
    referencia: 'Romanos 12:1-2',
    autor: 'Equipe Editorial BH Digital',
    data: '15 Jan 2026',
    tempoLeitura: '8 min',
    destaque: false,
    resumo: 'Não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente para experimentar a boa vontade de Deus.',
    imagem: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'Apresentar o corpo em sacrifício vivo é um ato de adoração que envolve decisões morais e espirituais conscientes.',
      'Santidade bíblica não é isolamento monástico, mas preservação da pureza em meio às pressões e apelos cotidianos.',
      'O discernimento do que é bom, agradável e perfeito é fruto direto da intimidade com o Espírito Santo.'
    ]
  },
  {
    id: 'estudo-9',
    slug: 'exegese-cristologica-de-isaias-53',
    titulo: 'Estudo Teológico: A Glória de Cristo em Isaías 53',
    categoria: 'Estudos Bíblicos',
    referencia: 'Isaías 53:4-6',
    autor: 'Equipe Editorial BH Digital',
    data: '10 Jan 2026',
    tempoLeitura: '11 min',
    destaque: false,
    resumo: 'Um mergulho profético na figura do Servo Sofredor que levou sobre Si as nossas dores e enfermidades.',
    imagem: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80',
    conteudo: [
      'Escrito séculos antes do nascimento de Jesus, o capítulo 53 de Isaías é um dos cumes teológicos de toda a Revelação.',
      'A doutrina da expiação substitutiva: o castigo que nos traz a paz estava sobre Ele, e pelas Suas pisaduras fomos sarados.',
      'A ressurreição e a vitória final prometidas ao Servo que verá a sua posteridade e prolongará os seus dias.'
    ]
  }
];

export const MOCK_DEVOCIONAIS: DevocionalItem[] = [
  {
    id: 'dev-1',
    slug: 'paz-em-meio-a-tempestade',
    titulo: 'Paz em Meio à Tempestade',
    referenciaBiblica: 'Filipenses 4:6-7',
    versiculoChave: '"E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus."',
    data: 'Hoje • 07 Mar 2026',
    tempoLeitura: '3 min',
    imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    resumo: 'Quando a ansiedade bater à porta, apresente suas súplicas com ações de graças ao Senhor que tudo governa.',
    conteudo: [
      'A ansiedade é uma tentativa involuntária do coração humano de assumir o controle do futuro.',
      'O apóstolo Paulo, escrevendo de uma prisão, não nos convida a ignorar as dificuldades, mas a transferir o fardo para Aquele cujos ombros suportam o universo.',
      'A paz de Deus não depende da ausência de conflitos externos; ela é uma sentinela divina que guarda nossos sentimentos e pensamentos.',
      'Oração do dia: Senhor, entrego em Tuas mãos os pensamentos que tentam me inquietar. Que a Tua paz prevaleça em meu coração hoje.'
    ]
  },
  {
    id: 'dev-2',
    slug: 'misericordias-que-se-renovam',
    titulo: 'Misericórdias que se Renovam a Cada Manhã',
    referenciaBiblica: 'Lamentações 3:22-23',
    versiculoChave: '"As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; novas são cada manhã; grande é a tua fidelidade."',
    data: 'Ontem • 06 Mar 2026',
    tempoLeitura: '4 min',
    imagem: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=900&q=80',
    resumo: 'Cada novo amanhecer é um testemunho silencioso de que a fidelidade divina supera todas as nossas falhas.',
    conteudo: [
      'O profeta Jeremias contemplava ruínas, mas escolheu trazer à memória aquilo que lhe dava esperança.',
      'A graça de ontem serviu para o dia de ontem; para os desafios de hoje, Deus já providenciou um suprimento fresco e abundante de amor.',
      'Não carregue a culpa do passado nem antecipe o desespero do amanhã. Respire a fidelidade do Senhor neste instante.'
    ]
  },
  {
    id: 'dev-3',
    slug: 'a-lampada-para-os-meus-pes',
    titulo: 'Lâmpada Para os Meus Pés',
    referenciaBiblica: 'Salmo 119:105',
    versiculoChave: '"Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."',
    data: '05 Mar 2026',
    tempoLeitura: '3 min',
    imagem: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80',
    resumo: 'A Bíblia não é apenas um livro de sabedoria secular, mas o mapa seguro para as decisões da sua jornada.',
    conteudo: [
      'Uma lâmpada antiga não iluminava quilômetros à frente, apenas o próximo passo no chão de terra batida.',
      'Deus nos ensina a caminhar na dependência diária da Sua Palavra, passo a passo, confiando na Sua direção soberana.',
      'Dedique tempo hoje para meditar nas Escrituras e permita que Seus mandamentos clareiem suas escolhas.'
    ]
  },
  {
    id: 'dev-4',
    slug: 'forcas-renovadas-na-espera',
    titulo: 'Forças Renovadas na Espera do Senhor',
    referenciaBiblica: 'Isaías 40:31',
    versiculoChave: '"Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão."',
    data: '04 Mar 2026',
    tempoLeitura: '4 min',
    imagem: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80',
    resumo: 'A espera em Deus não é tempo perdido, mas o período onde raízes profundas são criadas para voos mais altos.',
    conteudo: [
      'O cansaço físico e a exaustão emocional são limites naturais da condição humana.',
      'Esperar no Senhor não significa passividade, mas uma confiança ativa de que Ele age em favor daqueles que Nele confiam.',
      'Como a águia que aproveita as correntes de ar para planar acima das tormentas, você encontrará vigor sobrenatural.'
    ]
  }
];

export const MOCK_LIVROS: LivroItem[] = [
  {
    id: 'livro-quando-deus-soprar',
    slug: 'quando-deus-soprar',
    titulo: 'Quando Deus Soprar',
    autor: 'Paulo Henrique',
    descricaoCurta: 'Uma obra reflexiva sobre o mover soberano do Espírito, restauração espiritual e o sopro divino que transforma desertos em mananciais.',
    descricaoCompleta: [
      'Quando Deus Soprar é uma obra profunda e inspiradora destinada a todos que buscam entender os momentos de transição, silêncio e avivamento pessoal em sua caminhada com o Senhor.',
      'Disponível nos formatos físico e digital para acompanhar sua leitura e edificação pessoal, ministério ou pequenos grupos de estudo bíblico.',
      'Adquira através das plataformas parceiras na Amazon ou na UICLAP com frete e entrega para todo o Brasil.'
    ],
    capa: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tipo: 'Ambos',
    linkAmazon: 'https://www.amazon.com.br',
    linkUiclap: 'https://loja.uiclap.com',
    paginas: 224,
    ano: '2025/2026',
    formato: 'Brochura e E-book'
  },
  {
    id: 'livro-jesus-parabolas-mateus',
    slug: 'jesus-em-parabolas-de-mateus',
    titulo: 'Jesus em Parábolas de Mateus',
    autor: 'Paulo Henrique',
    descricaoCurta: 'Um mergulho teológico e devocional nas verdades eternas do Reino dos Céus através das parábolas de Jesus no primeiro Evangelho.',
    descricaoCompleta: [
      'Jesus em Parábolas de Mateus conduz o leitor pelas fascinantes narrativas com que o Mestre revelou os mistérios do Reino aos corações dispostos a ouvir.',
      'Uma análise cuidadosa do contexto histórico e judaico do Evangelho de Mateus, conectando cada ensinamento de Cristo aos desafios da fé na sociedade contemporânea.',
      'Indicado para pregadores, professores de escola dominical, líderes de pequenos grupos e todos que amam meditar nos ensinamentos do Mestre.'
    ],
    capa: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    tipo: 'Ambos',
    linkAmazon: 'https://www.amazon.com.br',
    linkUiclap: 'https://loja.uiclap.com',
    paginas: 256,
    ano: '2025/2026',
    formato: 'Brochura e E-book'
  }
];

export const MOCK_CONTEUDOS: ConteudoItem[] = [
  {
    id: 'cnt-1',
    titulo: 'Como Estudar a Bíblia com Profundidade sem se Perder',
    plataforma: 'YouTube',
    descricao: 'Passo a passo prático para estruturar leituras diárias, contexto histórico e aplicação pessoal.',
    duracao: '18:42 min',
    data: 'Demonstração',
    url: 'https://youtube.com',
    visualizacoes: 'Exemplo de Conteúdo',
    thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    categoria: 'Estudo Bíblico'
  },
  {
    id: 'cnt-2',
    titulo: '3 Versículos para Acalmar sua Mente Imediatamente',
    plataforma: 'TikTok',
    descricao: 'Pílulas diárias de reflexão e fé para o seu dia a dia em formato dinâmico.',
    duracao: '01:15 min',
    data: 'Demonstração',
    url: 'https://tiktok.com',
    visualizacoes: 'Exemplo de Conteúdo',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    categoria: 'Devocional Rápido'
  },
  {
    id: 'cnt-3',
    titulo: 'A Promessa que Renova as Forças no Meio do Cansaço',
    plataforma: 'Kwai',
    descricao: 'Mensagem inspiradora sobre a soberania e a provisão divina para quem está cansado.',
    duracao: '02:30 min',
    data: 'Demonstração',
    url: 'https://kwai.com',
    visualizacoes: 'Exemplo de Conteúdo',
    thumbnail: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80',
    categoria: 'Mensagem de Fé'
  },
  {
    id: 'cnt-4',
    titulo: 'Entendendo as Parábolas de Jesus no Contexto Real',
    plataforma: 'YouTube',
    descricao: 'Série especial abordando as narrativas mais marcantes dos quatro Evangelhos.',
    duracao: '22:15 min',
    data: 'Demonstração',
    url: 'https://youtube.com',
    visualizacoes: 'Exemplo de Conteúdo',
    thumbnail: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    categoria: 'Teologia & História'
  }
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
  // Antigo Testamento
  { id: 'gn', nome: 'Gênesis', abreviacao: 'Gn', testamento: 'Antigo', capitulosCount: 50, grupo: 'Pentateuco' },
  { id: 'ex', nome: 'Êxodo', abreviacao: 'Êx', testamento: 'Antigo', capitulosCount: 40, grupo: 'Pentateuco' },
  { id: 'lv', nome: 'Levítico', abreviacao: 'Lv', testamento: 'Antigo', capitulosCount: 27, grupo: 'Pentateuco' },
  { id: 'nm', nome: 'Números', abreviacao: 'Nm', testamento: 'Antigo', capitulosCount: 36, grupo: 'Pentateuco' },
  { id: 'dt', nome: 'Deuteronômio', abreviacao: 'Dt', testamento: 'Antigo', capitulosCount: 34, grupo: 'Pentateuco' },
  { id: 'js', nome: 'Josué', abreviacao: 'Js', testamento: 'Antigo', capitulosCount: 24, grupo: 'Históricos' },
  { id: 'sl', nome: 'Salmos', abreviacao: 'Sl', testamento: 'Antigo', capitulosCount: 150, grupo: 'Poéticos' },
  { id: 'pv', nome: 'Provérbios', abreviacao: 'Pv', testamento: 'Antigo', capitulosCount: 31, grupo: 'Poéticos' },
  { id: 'is', nome: 'Isaías', abreviacao: 'Is', testamento: 'Antigo', capitulosCount: 66, grupo: 'Profetas' },
  
  // Novo Testamento
  { id: 'mt', nome: 'Mateus', abreviacao: 'Mt', testamento: 'Novo', capitulosCount: 28, grupo: 'Evangelhos' },
  { id: 'mc', nome: 'Marcos', abreviacao: 'Mc', testamento: 'Novo', capitulosCount: 16, grupo: 'Evangelhos' },
  { id: 'lc', nome: 'Lucas', abreviacao: 'Lc', testamento: 'Novo', capitulosCount: 24, grupo: 'Evangelhos' },
  { id: 'jo', nome: 'João', abreviacao: 'Jo', testamento: 'Novo', capitulosCount: 21, grupo: 'Evangelhos' },
  { id: 'at', nome: 'Atos', abreviacao: 'At', testamento: 'Novo', capitulosCount: 28, grupo: 'Históricos' },
  { id: 'rm', nome: 'Romanos', abreviacao: 'Rm', testamento: 'Novo', capitulosCount: 16, grupo: 'Epístolas' },
  { id: '1co', nome: '1 Coríntios', abreviacao: '1Co', testamento: 'Novo', capitulosCount: 16, grupo: 'Epístolas' },
  { id: 'fp', nome: 'Filipenses', abreviacao: 'Fp', testamento: 'Novo', capitulosCount: 4, grupo: 'Epístolas' },
  { id: 'ap', nome: 'Apocalipse', abreviacao: 'Ap', testamento: 'Novo', capitulosCount: 22, grupo: 'Revelação' },
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

export const MOCK_LICOES: LicaoBiblica[] = [
  {
    numero: 1,
    titulo: 'Deuteronômio: o livro da Aliança',
    subtitulo: 'A renovação solene do pacto com a nova geração nas planícies de Moabe',
    referenciaBiblica: 'Deuteronômio 1:1-5; 4:1-8',
    temaCentral: 'A natureza da Aliança divina e a necessidade da memória histórica da fé.',
    resumo: 'Introdução histórica e teológica ao livro de Deuteronômio, o segundo discurso da Lei proferido por Moisés para preparar o povo antes da travessia do Jordão.',
    objetivos: [
      'Compreender o contexto geográfico e espiritual da nova geração de Israel',
      'Identificar Deuteronômio como o tratado teológico da aliança de amor de Deus',
      'Reconhecer a atualidade dos mandamentos para a vida diária da igreja'
    ],
    estudoComplementar: 'Estrutura dos pactos no Antigo Oriente Próximo e como Deuteronômio consagra o modelo de soberania divina e fidelidade relacional.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-1',
    status: 'Disponível para Estudo'
  },
  {
    numero: 2,
    titulo: 'Recapitulando a jornada no deserto',
    subtitulo: 'O aprendizado das provas e o cuidado constante de Deus no caminho',
    referenciaBiblica: 'Deuteronômio 1:19-46; 2:1-7',
    temaCentral: 'Como Deus transforma períodos de deserto em escolas de maturidade e dependência.',
    resumo: 'Moisés rememora a recusa inicial em Cades-Barnéia e como a fidelidade providente do Senhor sustentou os filhos de Israel durante quatro décadas.',
    objetivos: [
      'Analisar as consequências da incredulidade diante dos desafios visíveis',
      'Observar os 40 anos de provisão sobrenatural onde nem o calçado envelheceu',
      'Aplicar a lição da confiança nas promessas divinas durante os desertos da vida'
    ],
    estudoComplementar: 'A geografia do deserto de Sinai e as rotas contornando Edom e Moabe sob a proteção divina.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-2',
    status: 'Disponível para Estudo'
  },
  {
    numero: 3,
    titulo: 'A fidelidade de Deus diante da infidelidade de Israel',
    subtitulo: 'A soberania da graça que não desiste do Seu povo escolhido',
    referenciaBiblica: 'Deuteronômio 3:21-29; 4:25-31',
    temaCentral: 'A persistência da misericórdia divina que transcende a fraqueza humana.',
    resumo: 'Uma reflexão honesta sobre os erros do passado e a garantia de que, mesmo quando Israel falhou, o Senhor permaneceu guardião de Suas juras.',
    objetivos: [
      'Diferenciar castigo pedagógico da rejeição definitiva',
      'Reconhecer a promessa de restauração mediante o arrependimento sincero',
      'Enxergar a graça redentora que aponta para a Nova Aliança'
    ],
    estudoComplementar: 'Paralelos entre as exortações de Deuteronômio 4 e o ensino do apóstolo Paulo em 2 Timóteo 2:13.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-3',
    status: 'Disponível para Estudo'
  },
  {
    numero: 4,
    titulo: 'O chamado à obediência',
    subtitulo: 'Guardar os estatutos como expressão de amor e sabedoria perante as nações',
    referenciaBiblica: 'Deuteronômio 4:1-14; 5:1-5',
    temaCentral: 'A obediência bíblica não é legalismo estéril, mas resposta viva à libertação concedida por Deus.',
    resumo: 'Moisés convoca o povo a ouvir diligentemente e não acrescentar nem diminuir da Palavra que lhes fora confiada.',
    objetivos: [
      'Entender o propósito pedagógico dos mandamentos de Deus',
      'Constatar que a justiça da Lei tornaria Israel admirado perante as nações',
      'Praticar o discipulado de obediência amorosa no testemunho contemporâneo'
    ],
    estudoComplementar: 'O conceito hebraico de "Shemá" (ouvir e praticar) na tradição veterotestamentária.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-4',
    status: 'Disponível para Estudo'
  },
  {
    numero: 5,
    titulo: 'O grande mandamento',
    subtitulo: 'Amar ao Senhor com todo o coração, alma e forças no lar e na sociedade',
    referenciaBiblica: 'Deuteronômio 6:1-9; 6:20-25',
    temaCentral: 'O Shemá Israel como a confissão basilar do monoteísmo e da devoção integral.',
    resumo: 'O coração da revelação deuteronomista: o amor a Deus colocado como centro do coração e ensinado com diligência aos filhos em todo o tempo.',
    objetivos: [
      'Aprofundar no significado de amar a Deus de todo o coração, alma e força',
      'Restabelecer o sacerdócio familiar e a transmissão geracional da fé',
      'Identificar por que Jesus apontou este como o primeiro e maior mandamento'
    ],
    estudoComplementar: 'Análise léxica dos termos hebraicos Levav (coração), Nefesh (alma) e Meod (força/intensidade).',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-5',
    status: 'Disponível para Estudo'
  },
  {
    numero: 6,
    titulo: 'A Aliança e as bênçãos da obediência',
    subtitulo: 'A generosidade de um Deus que se alegra em abençoar o caminho do justo',
    referenciaBiblica: 'Deuteronômio 7:12-26; 8:1-10',
    temaCentral: 'A bênção divina como fruto da comunhão íntima e lealdade pactual.',
    resumo: 'Deus promete suprir a terra, o rebanho e a família daqueles que guardam os Seus termos, lembrando-os de nunca esquecer o Doador ao desfrutar das dádivas.',
    objetivos: [
      'Perceber a relação entre comunhão espiritual e discernimento material',
      'Evitar a armadilha do orgulho na prosperidade descrita em Deuteronômio 8',
      'Desenvolver a prática diária de gratidão e reconhecimento'
    ],
    estudoComplementar: 'O perigo da autossuficiência: "O meu poder e a força do meu braço me adquiriram estes bens".',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-6',
    status: 'Disponível para Estudo'
  },
  {
    numero: 7,
    titulo: 'Maldições e bênçãos da Aliança',
    subtitulo: 'A seriedade das escolhas espirituais e os montes Gerizim e Ebal',
    referenciaBiblica: 'Deuteronômio 11:26-32; 27:1-26; 28:1-14',
    temaCentral: 'A responsabilidade moral do homem diante do padrão santo de Deus.',
    resumo: 'A proclamação solene no vale de Siquém: a bênção para quem ouve e a perda e juízo para a apostasia persistente.',
    objetivos: [
      'Compreender o simbolismo solene dos montes Gerizim e Ebal',
      'Refletir sobre a integridade ética requerida pela Lei mosaica',
      'Examinar como Cristo nos resgatou da maldição da Lei fazendo-se maldição por nós'
    ],
    estudoComplementar: 'Gálatas 3:13 à luz de Deuteronômio 21:23 e o anúncio profético do Calvário.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-7',
    status: 'Disponível para Estudo'
  },
  {
    numero: 8,
    titulo: 'Escolhendo a vida ou a morte',
    subtitulo: 'O chamado incontornável ao arrependimento, fé e decisão resoluta',
    referenciaBiblica: 'Deuteronômio 30:11-20',
    temaCentral: 'A acessibilidade da Palavra de Deus e a urgência de escolher a Vida.',
    resumo: '"A palavra está muito perto de ti, na tua boca e no teu coração". Moisés põe diante dos ouvintes os dois caminhos definitivos da existência.',
    objetivos: [
      'Desmistificar que a vontade de Deus está inacessível ou oculta nos céus',
      'Assumir a responsabilidade pessoal de escolher a vida e apegar-se ao Senhor',
      'Correlacionar com a proclamação da fé no evangelho em Romanos 10'
    ],
    estudoComplementar: 'Romanos 10:6-8 comentando diretamente a acessibilidade da justiça que vem pela fé em Deuteronômio 30.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-8',
    status: 'Disponível para Estudo'
  },
  {
    numero: 9,
    titulo: 'A sucessão de Moisés',
    subtitulo: 'A transição de liderança sob a unção divina e a exortação a Josué',
    referenciaBiblica: 'Deuteronômio 31:1-8; 31:23',
    temaCentral: 'Líderes passam, mas o Deus soberano que conduz a obra permanece para sempre.',
    resumo: 'A comovente despedida de Moisés após 120 anos de vida e a investidura de Josué com a promessa: "O Senhor é quem vai adiante de ti; ele será contigo".',
    objetivos: [
      'Identificar princípios saudáveis de mentoria e continuidade ministerial',
      'Encontrar coragem nas transições ministeriais e vocacionais',
      'Descansar na presença permanente de Deus além das figuras humanas'
    ],
    estudoComplementar: 'O modelo de discipulado de Moisés com Josué desde o monte Sinai até as tendas do tabernáculo.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-9',
    status: 'Disponível para Estudo'
  },
  {
    numero: 10,
    titulo: 'O cântico de Moisés: advertência e esperança',
    subtitulo: 'A poesia profética como testemunho perene para as gerações futuras',
    referenciaBiblica: 'Deuteronômio 31:19-22; 32:1-43',
    temaCentral: 'A Rocha perfeita cujas obras são impecáveis e a esperança que sobrevive ao desvio humano.',
    resumo: 'Por ordem divina, Moisés ensina uma canção a todo o povo, servindo como lembrete pedagógico dos feitos de Deus e dos riscos da ingratidão.',
    objetivos: [
      'Reconhecer o papel da música e da poesia sacra na fixação das verdades eternas',
      'Glorificar a Deus como a Rocha imutável ("Tsur") e Justa',
      'Aprender a antecipar perigos espirituais em momentos de bonança'
    ],
    estudoComplementar: 'O "Cântico de Moisés e do Cordeiro" entoado pelos vencedores no livro de Apocalipse 15:3.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-10',
    status: 'Disponível para Estudo'
  },
  {
    numero: 11,
    titulo: 'A bênção final de Moisés',
    subtitulo: 'Palavras proféticas de graça derramadas sobre cada uma das tribos de Israel',
    referenciaBiblica: 'Deuteronômio 33:1-29',
    temaCentral: 'O carinho pastoral e a bênção soberana sobre a herança do povo santo.',
    resumo: 'Antes de subir ao monte Nebo, o homem de Deus profere bênçãos personalizadas para as tribos, culminando na celebração da salvação sem igual em Deus.',
    objetivos: [
      'Comparar a bênção de Moisés com as bênçãos proféticas de Jacó em Gênesis 49',
      'Celebrar a habitação do Altíssimo como refúgio eterno ("Debaixo de ti estão os braços eternos")',
      'Entender a dignidade do ministério pastoral de abençoar o rebanho'
    ],
    estudoComplementar: 'A tribo de Levi em Deuteronômio 33 e a consagração sacerdotal da família ministerial.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-11',
    status: 'Disponível para Estudo'
  },
  {
    numero: 12,
    titulo: 'A morte de Moisés e a continuidade da promessa',
    subtitulo: 'A despedida do maior dos profetas do Antigo Testamento e o sepulcro velado por Deus',
    referenciaBiblica: 'Deuteronômio 34:1-12',
    temaCentral: 'A fidelidade de Deus na conclusão de uma carreira ministerial e o legado imorredouro.',
    resumo: 'Do topo do Pisga, Moisés contempla a terra que não pisaria. Sepultado pelo próprio Deus em segredo, seu ministério permanece como marco sem paralelo no Antigo Testamento.',
    objetivos: [
      'Refletir sobre a soberania divina que determina os limites de cada ministério terreno',
      'Examinar o testemunho de Moisés: "Nunca mais se levantou em Israel profeta semelhante a Moisés, com quem o Senhor tratasse face a face"',
      'Descobrir a consolação da eternidade onde Moisés conversa com Cristo no Monte da Transfiguração'
    ],
    estudoComplementar: 'A presença de Moisés e Elias com Jesus em Mateus 17: a Lei e os Profetas testemunhando do Filho.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-12',
    status: 'Disponível para Estudo'
  },
  {
    numero: 13,
    titulo: 'O cumprimento de Deuteronômio em Cristo',
    subtitulo: 'Jesus como o Profeta maior que Moisés e o Mediador da Nova e Eterna Aliança',
    referenciaBiblica: 'Deuteronômio 18:15-19; Hebreus 3:1-6; 8:6-13',
    temaCentral: 'Como toda a mensagem e tipologia de Deuteronômio alcançam sua plenitude em Jesus Cristo.',
    resumo: 'A síntese teológica da série: Cristo responde às tentações no deserto citando unicamente Deuteronômio, inaugura a Aliança gravada nos corações e nos introduz no descanso definitivo.',
    objetivos: [
      'Constatar como Jesus utilizou Deuteronômio para derrotar Satanás no deserto (Mateus 4)',
      'Identificar o cumprimento da profecia do Profeta prometido em Deuteronômio 18',
      'Celebrar a superioridade da graça em Cristo que nos capacita a obedecer com alegria'
    ],
    estudoComplementar: 'Hebreus 3 e 4: a entrada no verdadeiro descanso prometido que a liderança de Josué antecipava em sombra.',
    videoDemoUrl: 'https://youtube.com',
    linkFonteExterna: 'https://exemplo.com/fonte-licao-13',
    status: 'Disponível para Estudo'
  }
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

export const MOCK_MATERIAIS: MaterialItem[] = [
  {
    id: 'mat-1',
    titulo: 'Guia Homilético: Estruturando Mensagens Bíblicas Eficazes',
    categoria: 'Esboços',
    descricao: 'Apostila metodológica com passo a passo para extrair a ideia central do texto, elaborar proposições claras e construir apelos memoráveis.',
    imagem: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Gratuito',
    formato: 'PDF',
    paginas: 28,
    data: '01 Mar 2026',
    autor: 'Equipe Editorial BH Digital'
  },
  {
    id: 'mat-2',
    titulo: 'Caderno de Esboços Temáticos sobre as Parábolas de Jesus',
    categoria: 'Esboços',
    descricao: 'Coletânea exclusiva de 12 esboços estruturados em três pontos, com ilustrações históricas e aplicações contemporâneas para o púlpito.',
    imagem: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Premium',
    formato: 'Esboço',
    paginas: 44,
    data: '25 Fev 2026',
    autor: 'Biblioteca Premium BH'
  },
  {
    id: 'mat-3',
    titulo: 'Panorama Exegético do Livro de Deuteronômio',
    categoria: 'Estudos Bíblicos',
    descricao: 'Estudo temático introdutório detalhando a autoria, contexto histórico, tratados no antigo oriente e teologia da aliança.',
    imagem: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Gratuito',
    formato: 'Apostila',
    paginas: 36,
    data: '20 Fev 2026',
    autor: 'Equipe Editorial BH Digital'
  },
  {
    id: 'mat-4',
    titulo: 'Comentário Teológico Completo: O Deus da Aliança',
    categoria: 'Lições',
    descricao: 'Manual de apoio para professores e facilitadores contendo o aprofundamento das 13 lições da série de Deuteronômio.',
    imagem: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Premium',
    formato: 'Apostila',
    paginas: 88,
    data: '15 Fev 2026',
    autor: 'Biblioteca Premium BH'
  },
  {
    id: 'mat-5',
    titulo: 'Guia do Professor: Metodologia e Perguntas para Escola Dominical',
    categoria: 'Professores',
    descricao: 'Dicas de engajamento, perguntas indutivas e dinâmicas de fixação para aulas com jovens e adultos.',
    imagem: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Gratuito',
    formato: 'PDF',
    paginas: 22,
    data: '10 Fev 2026',
    autor: 'Equipe Editorial BH Digital'
  },
  {
    id: 'mat-6',
    titulo: 'Manual de Liderança Cristã: Conduzindo com Integridade',
    categoria: 'Liderança',
    descricao: 'Princípios neotestamentários de pastoreio, mentoria de novas equipes e saúde emocional para o obreiro cristão.',
    imagem: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Premium',
    formato: 'Apostila',
    paginas: 52,
    data: '05 Fev 2026',
    autor: 'Biblioteca Premium BH'
  },
  {
    id: 'mat-7',
    titulo: 'Diário Devocional de 30 Dias no Lugar Secreto',
    categoria: 'Devocionais',
    descricao: 'Roteiro prático para guiar suas manhãs de oração e leitura com espaço para anotações e reflexões diárias.',
    imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Gratuito',
    formato: 'Roteiro',
    paginas: 34,
    data: '01 Fev 2026',
    autor: 'Equipe Editorial BH Digital'
  },
  {
    id: 'mat-8',
    titulo: 'Kit de Evangelismo Urbano e Discipulado Pessoal',
    categoria: 'Evangelismo',
    descricao: 'Estratégias contemporâneas para testemunho em ambientes de trabalho e faculdade, respondendo a objeções comuns da cultura.',
    imagem: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    tipoAcesso: 'Premium',
    formato: 'PDF',
    paginas: 40,
    data: '28 Jan 2026',
    autor: 'Biblioteca Premium BH'
  }
];
