const fs = require('fs');
const path = require('path');

// Ler o arquivo gerado para pegar os paths das imagens
const estudosContent = fs.readFileSync(path.join(__dirname, '../src/lib/data/estudos_gerados.ts'), 'utf-8');
// É um pouco hacky, mas funciona rápido com regex para pegar apenas os campos "imagem"
const imageMatches = estudosContent.match(/"imagem": "(.*)"/g);

if (!imageMatches) {
  console.log('Nenhuma imagem encontrada.');
  process.exit(1);
}

const publicImagesDir = path.join(__dirname, '../public/images');
const sourceImagesDir = path.join(__dirname, '../public/images/devocionais/2026/01');

// Se devocionais não tiver, pego alguns de fallback
let fallbackImages = [];
if (fs.existsSync(sourceImagesDir)) {
    const files = fs.readdirSync(sourceImagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
    fallbackImages = files.map(f => path.join(sourceImagesDir, f));
}

// Se ainda não tiver imagens, procuro na raiz de images
if (fallbackImages.length === 0) {
    const findAllImages = (dir, list) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                findAllImages(fullPath, list);
            } else if (fullPath.endsWith('.jpg') || fullPath.endsWith('.png') || fullPath.endsWith('.webp')) {
                list.push(fullPath);
            }
        }
    };
    findAllImages(publicImagesDir, fallbackImages);
}

if (fallbackImages.length === 0) {
    console.log('Erro: Nenhuma imagem encontrada no projeto para usar de fallback.');
    process.exit(1);
}

// Para cada imagem do json, criar as pastas se não existirem e copiar
imageMatches.forEach(match => {
    const imgPath = match.match(/"imagem": "(.*)"/)[1]; // ex: /images/estudos/parabolas/parabola-do-semeador.jpg
    const fullDestPath = path.join(__dirname, '..', 'public', imgPath);
    const destDir = path.dirname(fullDestPath);
    
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Escolhe uma imagem aleatória
    const randomImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    
    fs.copyFileSync(randomImage, fullDestPath);
});

console.log('Imagens copiadas com sucesso!');
