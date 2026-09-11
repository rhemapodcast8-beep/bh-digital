const fs = require('fs');

// Add imagemCapa to each licao adultos
const adultosPath = 'src/lib/mockLicoes.ts';
let adultos = fs.readFileSync(adultosPath, 'utf8');

// Add imagemCapa after each "slug" entry for adultos
// Licoes 1-13 of Deuteronomy
const adultosImages = [
  '/images/licoes/adultos/licao-01.jpg',
  '/images/licoes/adultos/licao-02.jpg',
  '/images/licoes/adultos/licao-03.jpg',
  '/images/licoes/adultos/licao-04.jpg',
  '/images/licoes/adultos/licao-05.jpg',
  '/images/licoes/adultos/licao-06.jpg',
  '/images/licoes/adultos/licao-07.jpg',
  '/images/licoes/adultos/licao-08.jpg',
  '/images/licoes/adultos/licao-09.jpg',
  '/images/licoes/adultos/licao-10.jpg',
  '/images/licoes/adultos/licao-11.jpg',
  '/images/licoes/adultos/licao-12.jpg',
  '/images/licoes/adultos/licao-13.jpg',
];

// For each licao numbered 1-13, add imagemCapa after the "numero" field
for (let i = 1; i <= 13; i++) {
  const img = adultosImages[i - 1];
  const numStr = `"numero": ${i},`;
  const replacement = `"numero": ${i},\n  "imagemCapa": "${img}",`;
  adultos = adultos.replace(numStr, replacement);
}

fs.writeFileSync(adultosPath, adultos, 'utf8');
console.log('Adultos images added!');

// Add imagemCapa to each licao jovens
const jovensPath = 'src/lib/mockLicoesJovens.ts';
let jovens = fs.readFileSync(jovensPath, 'utf8');

const jovensImages = [
  '/images/licoes/jovens/jovens-01.jpg',
  '/images/licoes/jovens/jovens-02.jpg',
  '/images/licoes/jovens/jovens-03.jpg',
  '/images/licoes/jovens/jovens-04.jpg',
  '/images/licoes/jovens/jovens-05.jpg',
  '/images/licoes/jovens/jovens-06.jpg',
  '/images/licoes/jovens/jovens-07.jpg',
  '/images/licoes/jovens/jovens-08.jpg',
  '/images/licoes/jovens/jovens-09.jpg',
  '/images/licoes/jovens/jovens-10.jpg',
  '/images/licoes/jovens/jovens-11.jpg',
  '/images/licoes/jovens/jovens-12.jpg',
  '/images/licoes/jovens/jovens-13.jpg',
];

for (let i = 1; i <= 13; i++) {
  const img = jovensImages[i - 1];
  const numStr = `"numero": ${i},`;
  const replacement = `"numero": ${i},\n  "imagemCapa": "${img}",`;
  jovens = jovens.replace(numStr, replacement);
}

fs.writeFileSync(jovensPath, jovens, 'utf8');
console.log('Jovens images added!');
