const fs = require('fs');

const b1 = JSON.parse(fs.readFileSync('scratch/batch1.json', 'utf8'));
const b2 = JSON.parse(fs.readFileSync('scratch/batch2.json', 'utf8'));
const b3 = JSON.parse(fs.readFileSync('scratch/batch3.json', 'utf8'));

const allData = [...b1, ...b2, ...b3];

const items = [];
let idCounter = 1;

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

allData.forEach((categoryData) => {
  categoryData.titles.forEach((title, index) => {
    const slug = toSlug(title);
    
    // Rich text logic
    const resumo = `Um estudo aprofundado sobre ${title}, analisando seu contexto bíblico, princípios teológicos e aplicação prática para a vida cristã de hoje.`;
    const introducao = `O tema "${title}" é de suma importância para compreendermos as Escrituras e a nossa jornada de fé. Muitas vezes lemos passagens relacionadas a este assunto sem nos aprofundarmos no que de fato estava acontecendo no texto original. Neste estudo, vamos mergulhar nos detalhes históricos, geográficos e espirituais, extraindo lições ricas e atemporais para a Igreja contemporânea. Ao final desta leitura, esperamos que seu entendimento bíblico seja expandido e sua fé, fortalecida.`;
    
    items.push({
      id: `cont_${slug.replace(/-/g, '_').substring(0, 15)}_${idCounter++}`,
      categoria: categoryData.cat,
      titulo: title,
      slug: slug,
      imagem: `/images/conteudos/${slug}.jpg`,
      resumo: resumo,
      data: "10 de Setembro, 2026",
      tempoLeitura: `${Math.floor(Math.random() * 8) + 4} min de leitura`,
      autor: "Equipe BH Digital",
      destaque: index === 0 && (idCounter % 3 === 0), // some highlights
      referencia: "Múltiplas Referências",
      introducao: introducao,
      desenvolvimento: [
        {
          titulo: "1. Contexto Histórico e Cultural",
          conteudo: `Para entender "${title}", precisamos nos transportar para o mundo antigo. O contexto em que as narrativas bíblicas se desenvolvem não é o nosso contexto moderno ocidental. Práticas comuns, valores sociais, e até a geografia da região moldavam a maneira como a mensagem era transmitida e recebida. Entender a fundo os costumes da época revela as entrelinhas e a profundidade do texto, evitando que apliquemos significados anacrônicos. A cultura judaica e o pano de fundo do antigo Oriente Próximo são a base sobre a qual essa verdade foi construída.`
        },
        {
          titulo: "2. Explicação e Análise Bíblica",
          conteudo: `Ao analisarmos os textos que tratam desse assunto, vemos uma riqueza de detalhes. A revelação bíblica é progressiva, e o tema "${title}" ganha contornos definitivos à luz de toda a Escritura, desde os primeiros livros até o Novo Testamento. O vocabulário utilizado no original (hebraico, aramaico ou grego) carrega nuances que as traduções às vezes não conseguem captar integralmente. Esta exegese nos mostra que Deus tem um propósito deliberado na forma como registra Suas palavras e atos na história humana.`
        },
        {
          titulo: "3. Principais Ensinamentos",
          conteudo: `Quais as verdades teológicas centrais aqui? Primeiramente, observamos a fidelidade e a soberania de Deus em meio às circunstâncias humanas. Em segundo lugar, o texto aponta para a necessidade de arrependimento, alinhamento e obediência. Em última análise, todo tema bíblico verdadeiro reverbera o plano da redenção cósmica que culmina em Cristo. A beleza deste ensinamento é que ele não é apenas uma informação acadêmica, mas uma verdade espiritual viva e ativa.`
        }
      ],
      aplicacaoPratica: `A maior prova de que absorvemos este estudo sobre "${title}" é a mudança de atitude. Precisamos aplicar esses princípios em nossos lares, em nossas igrejas e no nosso local de trabalho. Seja na paciência diante das tribulações, na dedicação ao ensino ou na firmeza moral, o texto nos chama à ação. Você está disposto a viver essa realidade na sua rotina diária?`,
      conclusao: `Concluímos, portanto, que a mensagem central por trás deste tema continua transformando vidas ainda hoje. Que o Espírito Santo ilumine seu entendimento e fixe essa Palavra em seu coração para sempre.`,
      relacionados: [] // to be populated
    });
  });
});

// Update relacionados
items.forEach(item => {
  // Find related items by same category (excluding self)
  const rels = items.filter(x => x.categoria === item.categoria && x.id !== item.id).slice(0, 3);
  item.relacionados = rels.map(r => r.id);
});

const fileContent = `import { ConteudoItem } from '@/types';\n\nexport const MOCK_CONTEUDOS: ConteudoItem[] = ${JSON.stringify(items, null, 2)};\n`;
fs.writeFileSync('src/lib/data/conteudos.ts', fileContent);
console.log('Gerados', items.length, 'conteúdos detalhados e salvos em src/lib/data/conteudos.ts');

const titlesFile = items.map(i => i.slug).join('\\n');
fs.writeFileSync('scratch/titles.txt', titlesFile);
