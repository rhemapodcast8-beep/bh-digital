const fs = require('fs');
const path = require('path');

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const year = 2026;
const devocionaisAnuais = [];

const baseData = [
  { categoria: "Ansiedade e Preocupações", versiculoPrincipal: "E a paz de Deus, que excede todo o entendimento, guardará o vosso coração...", titulo: "A Paz que Excede Todo Entendimento", ref: "Filipenses 4:7" },
  { categoria: "Esperança", versiculoPrincipal: "Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.", titulo: "O Tempo de Deus é Perfeito", ref: "Eclesiastes 3:1" },
  { categoria: "Coragem", versiculoPrincipal: "Davi, porém, disse ao filisteu: Tu vens a mim com espada, com lança... eu, porém, vou a ti em nome do SENHOR...", titulo: "Coragem para Enfrentar o Gigante", ref: "1 Samuel 17:45" },
  { categoria: "Relacionamentos", versiculoPrincipal: "Suportai-vos uns aos outros, perdoai-vos mutuamente...", titulo: "A Força do Perdão", ref: "Colossenses 3:13" },
  { categoria: "Chamado", versiculoPrincipal: "Antes que eu te formasse no ventre materno, eu te conheci...", titulo: "Descobrindo Seu Chamado", ref: "Jeremias 1:5" },
  { categoria: "Perseverança", versiculoPrincipal: "Portanto, eis que eu a atrairei, e a levarei para o deserto, e lhe falarei ao coração.", titulo: "O Deserto Não é o Fim", ref: "Oséias 2:14" },
  { categoria: "Fé", versiculoPrincipal: "E chamou Abraão o nome daquele lugar: O Senhor proverá...", titulo: "Deus Proverá", ref: "Gênesis 22:14" },
  { categoria: "Gratidão", versiculoPrincipal: "Em tudo, dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", titulo: "Gratidão em Meio às Lágrimas", ref: "1 Tessalonicenses 5:18" },
  { categoria: "Santidade", versiculoPrincipal: "Rogo-vos, pois, irmãos... que apresenteis o vosso corpo por sacrifício vivo, santo e agradável a Deus...", titulo: "O Altar do Coração", ref: "Romanos 12:1" },
  { categoria: "Oração", versiculoPrincipal: "Muito pode, por sua eficácia, a súplica do justo.", titulo: "A Oração que Move os Céus", ref: "Tiago 5:16" },
  { categoria: "Família", versiculoPrincipal: "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor.", titulo: "Amor no Lar", ref: "Efésios 4:2" },
  { categoria: "Propósito", versiculoPrincipal: "Pois somos feitura dele, criados em Cristo Jesus para boas obras...", titulo: "Criados para um Propósito", ref: "Efésios 2:10" },
  { categoria: "Vida com Deus", versiculoPrincipal: "Ao meu coração me ocorre: Buscai a minha presença; buscarei, pois, SENHOR, a tua presença.", titulo: "Buscando o Rosto de Deus", ref: "Salmos 27:8" },
  { categoria: "Fé", versiculoPrincipal: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus...", titulo: "A Fé que Vence o Medo", ref: "Isaías 41:10" },
  { categoria: "Esperança", versiculoPrincipal: "Bendito seja... o Deus de toda a consolação, que nos consola em todas as nossas tribulações.", titulo: "Consolo nas Aflições", ref: "2 Coríntios 1:3-4" },
  { categoria: "Perseverança", versiculoPrincipal: "Sê fiel até à morte, e dar-te-ei a coroa da vida.", titulo: "Permanecendo Fiel", ref: "Apocalipse 2:10" },
  { categoria: "Ansiedade e Preocupações", versiculoPrincipal: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", titulo: "Lidando com as Preocupações", ref: "1 Pedro 5:7" },
  { categoria: "Relacionamentos", versiculoPrincipal: "Em todo o tempo ama o amigo, e na angústia se faz o irmão.", titulo: "Amizades Verdadeiras", ref: "Provérbios 17:17" },
  { categoria: "Santidade", versiculoPrincipal: "Sede santos, porque eu sou santo.", titulo: "Separados para Deus", ref: "1 Pedro 1:16" },
  { categoria: "Esperança", versiculoPrincipal: "Os que com lágrimas semeiam com júbilo ceifarão.", titulo: "Semeando com Lágrimas", ref: "Salmos 126:5" },
  { categoria: "Chamado", versiculoPrincipal: "Depois, disto, ouvi a voz do Senhor, que dizia: A quem enviarei, e quem há de ir por nós?...", titulo: "Ouçam o Chamado", ref: "Isaías 6:8" },
  { categoria: "Família", versiculoPrincipal: "Eu e a minha casa serviremos ao SENHOR.", titulo: "Protegendo a Família", ref: "Josué 24:15" },
  { categoria: "Gratidão", versiculoPrincipal: "Regozijai-vos sempre no Senhor; outra vez digo: regozijai-vos.", titulo: "Alegria Constante", ref: "Filipenses 4:4" },
  { categoria: "Vida com Deus", versiculoPrincipal: "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.", titulo: "Dependência de Deus", ref: "Provérbios 3:5-6" },
  { categoria: "Fé", versiculoPrincipal: "Assim, também a fé, se não tiver obras, por si só está morta.", titulo: "Uma Fé Ativa", ref: "Tiago 2:17" },
  { categoria: "Oração", versiculoPrincipal: "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.", titulo: "O Poder da Súplica", ref: "Mateus 7:7" },
  { categoria: "Propósito", versiculoPrincipal: "Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.", titulo: "O Valor do Tempo", ref: "Salmos 90:12" },
  { categoria: "Coragem", versiculoPrincipal: "Sê forte e corajoso; não temas, nem te espantes, porque o SENHOR, teu Deus, é contigo por onde quer que andares.", titulo: "Avançando sem Medo", ref: "Josué 1:9" },
  { categoria: "Santidade", versiculoPrincipal: "Não vos conformeis com este século, mas transformai-vos pela renovação da vossa mente...", titulo: "Renovação Diária", ref: "Romanos 12:2" },
  { categoria: "Amor", versiculoPrincipal: "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece...", titulo: "A Essência do Amor", ref: "1 Coríntios 13:4" },
  { categoria: "Esperança", versiculoPrincipal: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor...", titulo: "Futuro e Esperança", ref: "Jeremias 29:11" }
];

const imagens = [
  "/images/devocionais/coragem.jpg",
  "/images/devocionais/esperanca.jpg",
  "/images/devocionais/familia.jpg",
  "/images/devocionais/fe.jpg",
  "/images/devocionais/gratidao.jpg",
  "/images/devocionais/jovens.jpg",
  "/images/devocionais/oracao.jpg",
  "/images/devocionais/palavra.jpg",
  "/images/devocionais/proposito.jpg",
  "/images/devocionais/teologia.jpg",
  "/images/devocionais/amanhecer.jpg",
  "/images/devocionais/por_do_sol.jpg",
  "/images/devocionais/caminhada.jpg",
  "/images/devocionais/cruz.jpg",
  "/images/devocionais/montanhas.jpg",
  "/images/devocionais/ceu.jpg",
  "/images/devocionais/maos_oracao.jpg",
  "/images/devocionais/igreja.jpg",
  "/images/devocionais/luz.jpg",
  "/images/devocionais/paz.jpg",
  "/images/devocionais/leitura.jpg",
  "/images/devocionais/reflexao.jpg",
  "/images/devocionais/natureza_1.jpg",
  "/images/devocionais/natureza_2.jpg",
  "/images/devocionais/esperanca_2.jpg",
  "/images/devocionais/familia_2.jpg",
  "/images/devocionais/biblia_aberta.jpg",
  "/images/devocionais/oracao_matinal.jpg",
  "/images/devocionais/caminho_luz.jpg",
  "/images/devocionais/cruz_vazia.jpg",
  "/images/devocionais/silencio.jpg"
];

let globalIndex = 0;

for (let month = 1; month <= 12; month++) {
  const days = getDaysInMonth(year, month);
  for (let day = 1; day <= days; day++) {
    const dataObj = baseData[globalIndex % baseData.length];
    
    let imagemIndex = globalIndex % imagens.length;
    
    let imagemFinal = imagens[imagemIndex];
    if (month === 12 && day === 25) imagemFinal = "/images/devocionais/natal.jpg";
    if (month === 4 && day === 5) imagemFinal = "/images/devocionais/pascoa.jpg"; 

    const mesStr = month.toString().padStart(2, '0');
    const diaStr = day.toString().padStart(2, '0');
    const dataCompleta = "2026-" + mesStr + "-" + diaStr;

    devocionaisAnuais.push({
      id: "devocional-2026-" + mesStr + "-" + diaStr,
      slug: dataCompleta,
      data: dataCompleta,
      titulo: dataObj.titulo,
      categoria: dataObj.categoria,
      referenciaBiblica: dataObj.ref,
      versiculoPrincipal: dataObj.versiculoPrincipal,
      resumo: "Uma reflexão encorajadora sobre " + dataObj.titulo.toLowerCase() + " para fortalecer sua caminhada diária com Deus.",
      reflexao: "Na agitação da vida moderna, é fácil perder o foco e se deixar levar pelos problemas. No entanto, o texto bíblico nos lembra que não estamos sozinhos. Deus se importa com os detalhes da nossa vida e tem um plano maravilhoso desenhado para nós. A verdadeira transformação ocorre quando decidimos alinhar nosso coração ao dEle, independentemente das circunstâncias externas. Muitas vezes, o que parece ser um obstáculo intransponível é, na verdade, o cenário que Deus escolheu para manifestar a Sua glória.",
      aplicacao: "Não permita que as dificuldades ditem a sua fé. Hoje, escolha confiar na Palavra de Deus. Se a ansiedade bater, lembre-se de entregar tudo em oração. Se o medo tentar paralisar você, declare em voz alta a verdade de hoje. A Palavra de Deus é viva e eficaz.",
      perguntaReflexao: "Como você pode aplicar o ensinamento de " + dataObj.ref + " na situação que você está enfrentando hoje?",
      oracao: "Senhor Deus, ajuda-me a compreender profundamente a verdade da Tua Palavra. Que o Teu Espírito Santo guie os meus passos e acalme o meu coração, dando-me a certeza de que Tu estás no controle. Em nome de Jesus, amém.",
      desafioDoDia: "Separe 5 minutos do seu dia hoje, vá para um lugar silencioso e apenas agradeça a Deus pelas bênçãos que Ele já te deu.",
      tempoLeitura: (3 + (globalIndex % 4)) + " min",
      imagem: imagemFinal
    });
    globalIndex++;
  }
}

const fileContent = "import { DevocionalItem } from '@/types';\n\nexport const MOCK_DEVOCIONAIS: DevocionalItem[] = " + JSON.stringify(devocionaisAnuais, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, '../src/lib/data/devocionais.ts'), fileContent, 'utf8');
console.log('Devocionais gerados com sucesso!');
