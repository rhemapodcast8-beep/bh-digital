const https = require('https');
const fs = require('fs');
const path = require('path');

const ITEMS = [
  // 1. Curiosidades Bíblicas
  { title: "Por que a Bíblia foi organizada em diferentes livros?", cat: "Curiosidades Bíblicas", img: "library,old" },
  { title: "Por que os Salmos são divididos em cinco livros?", cat: "Curiosidades Bíblicas", img: "scroll,psalms" },
  { title: "Qual foi a importância da aliança na Bíblia?", cat: "Curiosidades Bíblicas", img: "covenant,hands" },
  { title: "Por que o deserto aparece tantas vezes na narrativa bíblica?", cat: "Curiosidades Bíblicas", img: "desert,sand" },
  { title: "Qual era a importância da oliveira no mundo bíblico?", cat: "Curiosidades Bíblicas", img: "olive,tree" },
  { title: "Por que os números aparecem com frequência nas Escrituras?", cat: "Curiosidades Bíblicas", img: "scroll,numbers" },

  // 2. Você Sabia?
  { title: "Você sabia que a Bíblia possui diferentes gêneros literários?", cat: "Você Sabia?", img: "books,literature" },
  { title: "Você sabia que os Evangelhos apresentam perspectivas complementares?", cat: "Você Sabia?", img: "four,books" },
  { title: "Você sabia que os Salmos possuem diferentes tipos de composição?", cat: "Você Sabia?", img: "music,harp" },
  { title: "Você sabia que as alianças estruturam grandes partes da narrativa bíblica?", cat: "Você Sabia?", img: "architecture,ancient" },
  { title: "Você sabia que a literatura sapiencial possui características próprias?", cat: "Você Sabia?", img: "wisdom,old" },
  { title: "Você sabia que o contexto histórico pode mudar a compreensão de uma passagem?", cat: "Você Sabia?", img: "history,ruins" },

  // 3. Personagens Bíblicos
  { title: "Abraão: fé, promessa e aliança", cat: "Personagens Bíblicos", img: "abraham,desert" },
  { title: "Moisés: chamado, liderança e intercessão", cat: "Personagens Bíblicos", img: "mountain,sinai" },
  { title: "Josué: coragem e sucessão", cat: "Personagens Bíblicos", img: "joshua,conquest" },
  { title: "Rute: fidelidade e redenção", cat: "Personagens Bíblicos", img: "wheat,field" },
  { title: "Davi: fé, liderança e arrependimento", cat: "Personagens Bíblicos", img: "shepherd,sheep" },
  { title: "Ester: providência, coragem e responsabilidade", cat: "Personagens Bíblicos", img: "palace,queen" },

  // 4. Lugares da Bíblia
  { title: "Jerusalém: A Cidade do Grande Rei", cat: "Lugares da Bíblia", img: "jerusalem,city" },
  { title: "Belém: A Casa do Pão", cat: "Lugares da Bíblia", img: "bethlehem,night" },
  { title: "Nazaré: Onde Jesus Cresceu", cat: "Lugares da Bíblia", img: "nazareth,village" },
  { title: "Cafarnaum: A Base do Ministério na Galileia", cat: "Lugares da Bíblia", img: "capernaum,ruins" },
  { title: "Monte Sinai: O Local da Lei", cat: "Lugares da Bíblia", img: "sinai,mountain" },
  { title: "Monte das Oliveiras: Oração e Profecia", cat: "Lugares da Bíblia", img: "olives,mount" },

  // 5. Palavras da Bíblia
  { title: "Graça: O Favor Imerecido", cat: "Palavras da Bíblia", img: "grace,light" },
  { title: "Evangelho: As Boas Novas", cat: "Palavras da Bíblia", img: "good,news" },
  { title: "Messias: O Ungido", cat: "Palavras da Bíblia", img: "anointed,oil" },
  { title: "Shalom: Paz Completa", cat: "Palavras da Bíblia", img: "peace,dove" },
  { title: "Aleluia: Louvai ao Senhor", cat: "Palavras da Bíblia", img: "praise,hands" },
  { title: "Discípulo: Aquele que Aprende", cat: "Palavras da Bíblia", img: "disciple,following" },

  // 6. Perguntas Bíblicas
  { title: "Por que Jesus ensinava por parábolas?", cat: "Perguntas Bíblicas", img: "teaching,crowd" },
  { title: "O que significa nascer de novo?", cat: "Perguntas Bíblicas", img: "birth,water" },
  { title: "O que significa amar o próximo?", cat: "Perguntas Bíblicas", img: "love,neighbor" },
  { title: "Por que Jesus lavou os pés dos discípulos?", cat: "Perguntas Bíblicas", img: "washing,feet" },
  { title: "O que significa viver pela fé?", cat: "Perguntas Bíblicas", img: "walking,faith" },
  { title: "Por que o arrependimento é tão importante na Bíblia?", cat: "Perguntas Bíblicas", img: "repentance,kneeling" },

  // 7. Contexto Bíblico
  { title: "Como funcionava uma sinagoga?", cat: "Contexto Bíblico", img: "synagogue,scroll" },
  { title: "Como era a vida de um pastor de ovelhas?", cat: "Contexto Bíblico", img: "shepherd,flock" },
  { title: "Como eram as viagens no mundo bíblico?", cat: "Contexto Bíblico", img: "camel,desert" },
  { title: "Como funcionavam os casamentos nos tempos bíblicos?", cat: "Contexto Bíblico", img: "wedding,ancient" },
  { title: "Como era a agricultura na época bíblica?", cat: "Contexto Bíblico", img: "agriculture,ancient" },
  { title: "Como funcionava uma cidade no mundo antigo?", cat: "Contexto Bíblico", img: "ancient,city" },

  // 8. História Bíblica
  { title: "O período dos patriarcas", cat: "História Bíblica", img: "patriarchs,tent" },
  { title: "O Êxodo: A Saída do Egito", cat: "História Bíblica", img: "exodus,redsea" },
  { title: "A conquista de Canaã", cat: "História Bíblica", img: "canaan,conquest" },
  { title: "A monarquia de Israel", cat: "História Bíblica", img: "crown,israel" },
  { title: "O exílio babilônico", cat: "História Bíblica", img: "babylon,exile" },
  { title: "O período do Segundo Templo", cat: "História Bíblica", img: "temple,second" },

  // 9. Geografia Bíblica
  { title: "Canaã: A Terra Prometida", cat: "Geografia Bíblica", img: "canaan,land" },
  { title: "Galileia: A Região do Ministério de Jesus", cat: "Geografia Bíblica", img: "galilee,lake" },
  { title: "Judeia: O Centro Religioso", cat: "Geografia Bíblica", img: "judea,desert" },
  { title: "Samaria: A Região Intermediária", cat: "Geografia Bíblica", img: "samaria,hills" },
  { title: "Rio Jordão: Águas de Transformação", cat: "Geografia Bíblica", img: "jordan,river" },
  { title: "Mar da Galileia: Onde Jesus Caminhou", cat: "Geografia Bíblica", img: "sea,galilee" },

  // 10. Profecias
  { title: "A natureza da profecia bíblica", cat: "Profecias", img: "prophet,scroll" },
  { title: "Profetas maiores e menores", cat: "Profecias", img: "prophets,ancient" },
  { title: "O contexto histórico das profecias", cat: "Profecias", img: "history,prophecy" },
  { title: "A esperança messiânica", cat: "Profecias", img: "hope,messiah" },
  { title: "Cumprimento e expectativa profética", cat: "Profecias", img: "fulfillment,time" },
  { title: "A leitura cristã das profecias", cat: "Profecias", img: "christian,reading" },

  // 11. Parábolas
  { title: "Bom Samaritano: O Verdadeiro Próximo", cat: "Parábolas", img: "samaritan,helping" },
  { title: "Filho Pródigo: O Perdão do Pai", cat: "Parábolas", img: "prodigal,father" },
  { title: "O Semeador: O Coração e a Palavra", cat: "Parábolas", img: "sower,seeds" },
  { title: "Dez Virgens: A Preparação", cat: "Parábolas", img: "lamps,oil" },
  { title: "Talentos: A Mordomia", cat: "Parábolas", img: "coins,talents" },
  { title: "A Grande Ceia: O Convite de Deus", cat: "Parábolas", img: "banquet,table" },

  // 12. Bíblia e Vida Prática
  { title: "Como estudar um capítulo da Bíblia", cat: "Bíblia e Vida Prática", img: "study,bible" },
  { title: "Como meditar nas Escrituras", cat: "Bíblia e Vida Prática", img: "meditation,word" },
  { title: "Como criar uma rotina de leitura bíblica", cat: "Bíblia e Vida Prática", img: "routine,reading" },
  { title: "Como interpretar uma passagem dentro do contexto", cat: "Bíblia e Vida Prática", img: "context,study" },
  { title: "Como aplicar princípios bíblicos no cotidiano", cat: "Bíblia e Vida Prática", img: "daily,life" },
  { title: "Como fazer anotações durante o estudo bíblico", cat: "Bíblia e Vida Prática", img: "notes,pen" },

  // 13. Fé
  { title: "O que é fé segundo a Bíblia?", cat: "Fé", img: "faith,mountain" },
  { title: "Fé e obediência", cat: "Fé", img: "obedience,path" },
  { title: "Fé em tempos difíceis", cat: "Fé", img: "storm,faith" },
  { title: "Fé e perseverança", cat: "Fé", img: "running,race" },
  { title: "Fé e esperança", cat: "Fé", img: "anchor,hope" },
  { title: "Como desenvolver uma vida de confiança em Deus", cat: "Fé", img: "trust,hands" },

  // 14. Oração
  { title: "O que a Bíblia ensina sobre oração?", cat: "Oração", img: "prayer,hands" },
  { title: "Oração e intimidade com Deus", cat: "Oração", img: "intimacy,prayer" },
  { title: "A Oração de Jesus", cat: "Oração", img: "jesus,praying" },
  { title: "Oração e perseverança", cat: "Oração", img: "perseverance,prayer" },
  { title: "Oração e a vontade de Deus", cat: "Oração", img: "will,god" },
  { title: "Como desenvolver uma rotina de oração", cat: "Oração", img: "routine,prayer" },

  // 15. Família
  { title: "A Família no propósito bíblico", cat: "Família", img: "family,bible" },
  { title: "Comunicação dentro da família", cat: "Família", img: "communication,family" },
  { title: "O Perdão na Família", cat: "Família", img: "forgiveness,family" },
  { title: "O Serviço no Lar", cat: "Família", img: "service,home" },
  { title: "A Educação dos filhos", cat: "Família", img: "education,children" },
  { title: "Família e vida espiritual", cat: "Família", img: "spiritual,family" },

  // 16. Jovens
  { title: "Identidade e fé na juventude", cat: "Jovens", img: "youth,identity" },
  { title: "Vencendo a pressão dos colegas", cat: "Jovens", img: "pressure,youth" },
  { title: "Descobrindo o seu Propósito", cat: "Jovens", img: "purpose,path" },
  { title: "Como fazer escolhas sábias", cat: "Jovens", img: "choices,crossroads" },
  { title: "Vida digital e princípios cristãos", cat: "Jovens", img: "digital,christian" },
  { title: "Como permanecer firme na fé", cat: "Jovens", img: "firm,faith" },

  // 17. Evangelismo
  { title: "O que é evangelismo?", cat: "Evangelismo", img: "evangelism,world" },
  { title: "A Grande Comissão", cat: "Evangelismo", img: "great,commission" },
  { title: "Como compartilhar a fé com respeito", cat: "Evangelismo", img: "sharing,faith" },
  { title: "Evangelismo e testemunho de vida", cat: "Evangelismo", img: "testimony,life" },
  { title: "Evangelismo no cotidiano", cat: "Evangelismo", img: "daily,evangelism" },
  { title: "O papel do amor no evangelismo", cat: "Evangelismo", img: "love,evangelism" },

  // 18. Devocional Curto
  { title: "A Paz em Meio à Tempestade", cat: "Devocional Curto", img: "peace,storm" },
  { title: "Renovando as Forças", cat: "Devocional Curto", img: "eagle,strength" },
  { title: "Alegria no Senhor", cat: "Devocional Curto", img: "joy,lord" },
  { title: "Confiando na Providência", cat: "Devocional Curto", img: "providence,trust" },
  { title: "A Luz do Mundo", cat: "Devocional Curto", img: "light,world" },
  { title: "Amor que Transforma", cat: "Devocional Curto", img: "love,transformation" }
];

const generateSlug = (text) => {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const items = ITEMS.map(i => ({ slug: generateSlug(i.title) }));

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error("Failed to get URL: " + res.statusCode));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const run = async () => {
  const dir = path.join(__dirname, '../public/images/conteudos');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  // Fast download with chunks of 15
  const chunkArray = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  };

  const chunks = chunkArray(items, 15);
  let done = 0;

  for (const chunk of chunks) {
    await Promise.all(chunk.map(async (item) => {
      const filepath = path.join(dir, item.slug + '.webp');
      if (fs.existsSync(filepath)) {
          done++;
          return;
      }
      try {
        const url = "https://picsum.photos/seed/" + item.slug + "/640/360";
        await downloadImage(url, filepath);
        done++;
        console.log("Baixado: " + done + "/" + items.length);
      } catch (err) {
        console.error('Erro baixando ' + item.slug, err.message);
      }
    }));
  }

  console.log("Download rápido completo!");
};

run();
