const fs = require('fs');
const path = require('path');

const devCategorias = [
  'Fé', 'Esperança', 'Oração', 'Família', 'Propósito', 'Perseverança', 
  'Ansiedade e Preocupações', 'Relacionamentos', 'Vida com Deus', 
  'Santidade', 'Gratidão', 'Chamado', 'Coragem'
];

const temas = [
  { t: "A Paz que Excede Todo Entendimento", c: "Ansiedade e Preocupações", r: "Filipenses 4:7", v: "E a paz de Deus, que excede todo o entendimento, guardará o vosso coração..." },
  { t: "O Tempo de Deus é Perfeito", c: "Esperança", r: "Eclesiastes 3:1", v: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu." },
  { t: "Coragem para Enfrentar o Gigante", c: "Coragem", r: "1 Samuel 17:45", v: "Davi, porém, disse ao filisteu: Tu vens a mim com espada, com lança... eu, porém, vou a ti em nome do SENHOR..." },
  { t: "A Força do Perdão", c: "Relacionamentos", r: "Colossenses 3:13", v: "Suportai-vos uns aos outros, perdoai-vos mutuamente..." },
  { t: "Descobrindo Seu Chamado", c: "Chamado", r: "Jeremias 1:5", v: "Antes que eu te formasse no ventre materno, eu te conheci..." },
  { t: "O Deserto Não é o Fim", c: "Perseverança", r: "Oséias 2:14", v: "Portanto, eis que eu a atrairei, e a levarei para o deserto, e lhe falarei ao coração." },
  { t: "Deus Proverá", c: "Fé", r: "Gênesis 22:14", v: "E chamou Abraão o nome daquele lugar: O Senhor proverá..." },
  { t: "Gratidão em Meio às Lágrimas", c: "Gratidão", r: "1 Tessalonicenses 5:18", v: "Em tudo, dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco." },
  { t: "O Altar do Coração", c: "Santidade", r: "Romanos 12:1", v: "Rogo-vos, pois, irmãos... que apresenteis o vosso corpo por sacrifício vivo, santo e agradável a Deus..." },
  { t: "A Oração que Move os Céus", c: "Oração", r: "Tiago 5:16", v: "Muito pode, por sua eficácia, a súplica do justo." },
  { t: "Amor no Lar", c: "Família", r: "Efésios 4:2", v: "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor." },
  { t: "Criados para um Propósito", c: "Propósito", r: "Efésios 2:10", v: "Pois somos feitura dele, criados em Cristo Jesus para boas obras..." },
  { t: "Buscando o Rosto de Deus", c: "Vida com Deus", r: "Salmos 27:8", v: "Ao meu coração me ocorre: Buscai a minha presença; buscarei, pois, SENHOR, a tua presença." },
  { t: "A Fé que Vence o Medo", c: "Fé", r: "Isaías 41:10", v: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus..." },
  { t: "Consolo nas Aflições", c: "Esperança", r: "2 Coríntios 1:3-4", v: "Bendito seja... o Deus de toda a consolação, que nos consola em todas as nossas tribulações." },
  { t: "Permanecendo Fiel", c: "Perseverança", r: "Apocalipse 2:10", v: "Sê fiel até à morte, e dar-te-ei a coroa da vida." },
  { t: "Lidando com as Preocupações", c: "Ansiedade e Preocupações", r: "1 Pedro 5:7", v: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós." },
  { t: "Amizades Verdadeiras", c: "Relacionamentos", r: "Provérbios 17:17", v: "Em todo o tempo ama o amigo, e na angústia se faz o irmão." },
  { t: "Separados para Deus", c: "Santidade", r: "1 Pedro 1:16", v: "Sede santos, porque eu sou santo." },
  { t: "Semeando com Lágrimas", c: "Esperança", r: "Salmos 126:5", v: "Os que com lágrimas semeiam com júbilo ceifarão." },
  { t: "Ouçam o Chamado", c: "Chamado", r: "Isaías 6:8", v: "Depois, disto, ouvi a voz do Senhor, que dizia: A quem enviarei, e quem há de ir por nós?..." },
  { t: "Protegendo a Família", c: "Família", r: "Josué 24:15", v: "Eu e a minha casa serviremos ao SENHOR." },
  { t: "Alegria Constante", c: "Gratidão", r: "Filipenses 4:4", v: "Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos." },
  { t: "Dependência de Deus", c: "Vida com Deus", r: "Provérbios 3:5-6", v: "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento." },
  { t: "Uma Fé Ativa", c: "Fé", r: "Tiago 2:17", v: "Assim, também a fé, se não tiver obras, por si só está morta." },
  { t: "Coragem na Adversidade", c: "Coragem", r: "Josué 1:9", v: "Não to mandei eu? Sê forte e corajoso..." },
  { t: "Propósito no Sofrimento", c: "Propósito", r: "Romanos 8:28", v: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus..." },
  { t: "Orando sem Cessar", c: "Oração", r: "1 Tessalonicenses 5:17", v: "Orai sem cessar." },
  { t: "A Força da União", c: "Relacionamentos", r: "Eclesiastes 4:12", v: "O cordão de três dobras não se rebenta com facilidade." },
  { t: "A Cura da Alma", c: "Ansiedade e Preocupações", r: "Salmos 147:3", v: "Sara os quebrantados de coração e lhes pensa as feridas." }
];

function generateSlug(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const devocionais = temas.map((tema, idx) => {
  return {
    id: `devocional-${idx + 1}`,
    slug: generateSlug(tema.t),
    titulo: tema.t,
    categoria: tema.c,
    referenciaBiblica: tema.r,
    versiculoPrincipal: tema.v,
    resumo: `Uma reflexão encorajadora sobre ${tema.t.toLowerCase()} para fortalecer sua caminhada diária com Deus.`,
    
    reflexao: `Na agitação da vida moderna, é fácil perder o foco e se deixar levar pelos problemas. No entanto, o texto de ${tema.r} nos lembra que não estamos sozinhos. Deus se importa com os detalhes da nossa vida e tem um plano maravilhoso desenhado para nós. A verdadeira transformação ocorre quando decidimos alinhar nosso coração ao dEle, independentemente das circunstâncias externas. Muitas vezes, o que parece ser um obstáculo intransponível é, na verdade, o cenário que Deus escolheu para manifestar a Sua glória.`,
    
    aplicacao: `Não permita que as dificuldades ditem a sua fé. Hoje, escolha confiar na Palavra de Deus. Se a ansiedade bater, lembre-se de entregar tudo em oração. Se o medo tentar paralisar você, declare em voz alta o versículo de hoje. A Palavra de Deus é viva e eficaz.`,
    
    perguntaReflexao: `Como você pode aplicar o ensinamento de ${tema.r} na situação difícil que você está enfrentando agora?`,
    
    oracao: `Senhor Deus, ajuda-me a compreender profundamente a verdade da Tua Palavra. Que o Teu Espírito Santo guie os meus passos e acalme o meu coração, dando-me a certeza de que Tu estás no controle. Em nome de Jesus, amém.`,
    
    desafioDoDia: `Separe 5 minutos do seu dia hoje, vá para um lugar silencioso e apenas agradeça a Deus pelas bênçãos que Ele já te deu.`,
    
    data: new Date(2026, 2, idx + 1).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    tempoLeitura: `${Math.floor(Math.random() * 4) + 3} min`,
    imagem: `https://source.unsplash.com/random/800x600/?nature,hope,${idx}`
  };
});

const content = `import { DevocionalItem } from '@/types';\n\nexport const MOCK_DEVOCIONAIS_COMPLETOS: DevocionalItem[] = ${JSON.stringify(devocionais, null, 2)};\n`;

const dir = path.join(__dirname, '../src/lib/data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'devocionais.ts'), content);
console.log('src/lib/data/devocionais.ts gerado com 30 devocionais.');
