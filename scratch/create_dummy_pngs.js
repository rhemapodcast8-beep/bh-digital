const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Desktop/bh-digital/public/images/licoes';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1x1 transparent PNG base64
const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const pngBuffer = Buffer.from(pngBase64, 'base64');

fs.writeFileSync(path.join(dir, 'capa-adultos-4-trimestre-2026.png'), pngBuffer);
fs.writeFileSync(path.join(dir, 'capa-jovens-4-trimestre-2026.png'), pngBuffer);

console.log("Empty transparent PNGs created for build to succeed without 404.");
