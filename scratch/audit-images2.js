const fs = require('fs');

const content = fs.readFileSync('src/lib/data/conteudos.ts', 'utf8');

const getMatches = (regex) => [...content.matchAll(regex)];

const slugs = getMatches(/"slug":\s*"([^"]+)"/g).map(m => m[1]);
const titles = getMatches(/"titulo":\s*"([^"]+)"/g).map(m => m[1]);
const categories = getMatches(/"categoria":\s*"([^"]+)"/g).map(m => m[1]);
const images = getMatches(/"imagem":\s*"([^"]+)"/g).map(m => m[1]);

const total = Math.min(slugs.length, titles.length, categories.length, images.length);

const items = [];
const imageCount = {};

for (let i = 0; i < total; i++) {
  items.push({
    slug: slugs[i],
    titulo: titles[i],
    categoria: categories[i],
    imagem: images[i],
  });
  imageCount[images[i]] = (imageCount[images[i]] || 0) + 1;
}

let table = 'CONTEÚDO | IMAGEM | DUPLICADA? | PARECIDA? | CATEGORIA\n';
table += '---|---|---|---|---\n';

let duplicadas = 0;
let placeholder = 0;
for (const item of items) {
  const isDupe = imageCount[item.imagem] > 1;
  const isPlaceholder = item.imagem.includes('placeholder') || item.imagem.includes('dummy');
  if (isDupe) duplicadas++;
  if (isPlaceholder) placeholder++;
  table += `${item.titulo} | ${item.imagem} | ${isDupe ? 'SIM' : 'NÃO'} | ${isPlaceholder ? 'SIM' : 'NÃO'} | ${item.categoria}\n`;
}

console.log('Total de Conteúdos:', total);
console.log('Total de Imagens Distintas:', Object.keys(imageCount).length);
console.log('Imagens Duplicadas:', duplicadas);
console.log('Imagens Placeholder:', placeholder);
fs.writeFileSync('scratch/audit-images.js', table);
