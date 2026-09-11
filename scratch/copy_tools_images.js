const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '../public/images/ferramentas');
fs.mkdirSync(destDir, { recursive: true });

const src1 = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\55dde924-2ebd-45dd-9b6c-9a072b40d1fe\\.user_uploaded\\media_1789162166617.jpg';
const dest1 = path.join(destDir, 'wipe-crm.png'); // Saving as png as requested
const dest2 = path.join(destDir, 'wipe-crm.jpg'); // Saving as jpg just in case

const src3 = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\55dde924-2ebd-45dd-9b6c-9a072b40d1fe\\.user_uploaded\\media_1789163461872.jpg';
const dest3 = path.join(destDir, 'estuda-facil.jpg');
const dest4 = path.join(destDir, 'estuda-facil.png');


fs.copyFileSync(src1, dest1);
fs.copyFileSync(src1, dest2);
fs.copyFileSync(src3, dest3);
fs.copyFileSync(src3, dest4);

console.log('Images copied successfully.');
