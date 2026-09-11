const fs = require('fs');

// Fix materiais images - replace paths that don't exist with valid ones
const matPath = 'src/lib/data/materiais.ts';
let mat = fs.readFileSync(matPath, 'utf8');

const validImages = [
  '/images/materiais/estudos-biblicos.jpg',
  '/images/materiais/esbocos.jpg',
  '/images/materiais/evangelismo.jpg',
  '/images/materiais/lideranca.jpg',
  '/images/materiais/apostilas.jpg',
  '/images/materiais/jovens.jpg',
  '/images/materiais/devocionais.jpg',
  '/images/materiais/generica.jpg',
];

mat = mat.replace(/"\/images\/materiais\/([^"]+\.jpg)"/g, function(match, filename) {
  const fullPath = '/images/materiais/' + filename;
  if (validImages.includes(fullPath)) return match;
  // Map to closest valid image based on filename keywords
  if (filename.includes('ebd') || filename.includes('professor') || filename.includes('apostila') || filename.includes('licao') || filename.includes('adulto')) return '"/images/materiais/apostilas.jpg"';
  if (filename.includes('esboco') || filename.includes('pregac')) return '"/images/materiais/esbocos.jpg"';
  if (filename.includes('devocional') || filename.includes('oracao')) return '"/images/materiais/devocionais.jpg"';
  if (filename.includes('evangelismo') || filename.includes('mission')) return '"/images/materiais/evangelismo.jpg"';
  if (filename.includes('lideranca') || filename.includes('pastor')) return '"/images/materiais/lideranca.jpg"';
  if (filename.includes('jovens') || filename.includes('joven')) return '"/images/materiais/jovens.jpg"';
  if (filename.includes('estudo') || filename.includes('biblia') || filename.includes('biblico')) return '"/images/materiais/estudos-biblicos.jpg"';
  return '"/images/materiais/generica.jpg"';
});

fs.writeFileSync(matPath, mat, 'utf8');
console.log('Materiais images fixed!');
