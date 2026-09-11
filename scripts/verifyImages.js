const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const dataDirs = [
  path.join(projectRoot, 'src/lib/data'),
  path.join(projectRoot, 'src/lib')
];

// Matches "imagem": "...", "imagemCapa": "...", "image": "...", etc.
const imageRegex = /"(?:imagem|imagemCapa|image|imageUrl|coverImage|thumbnail|cover)"\s*:\s*"([^"]+)"/g;

let missingCount = 0;
let totalCount = 0;
const missingImages = new Set();
const presentImages = new Set();

const scanFile = (filePath) => {
  if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imagePathStr = match[1];
    
    if (!imagePathStr) continue;
    
    if (imagePathStr.startsWith('http') || imagePathStr.startsWith('data:')) {
      missingCount++;
      missingImages.add(`EXTERNAL/BASE64: ${imagePathStr}`);
      continue;
    }
  
    const relativePath = imagePathStr.startsWith('/') ? imagePathStr.slice(1) : imagePathStr;
    const fullPath = path.join(projectRoot, 'public', relativePath);
    
    totalCount++;
    if (!fs.existsSync(fullPath)) {
      missingImages.add(imagePathStr);
      missingCount++;
    } else {
      presentImages.add(imagePathStr);
    }
  }
};

const scanDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // ignore nested dirs for now, all our files are shallow in these two paths
    } else {
      scanFile(fullPath);
    }
  }
};

dataDirs.forEach(scanDir);

console.log('--- IMAGE AUDIT ---');
console.log('Total images referenced:', totalCount);
console.log('Missing images:', missingCount);
if (missingCount > 0) {
  console.log('Missing list:', Array.from(missingImages));
} else {
  console.log('ALL IMAGES OK! ✅');
}

if (missingCount > 0) {
  process.exit(1);
}
