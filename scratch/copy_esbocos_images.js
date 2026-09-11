const fs = require('fs');
const path = require('path');

const srcImages = [
  'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\55dde924-2ebd-45dd-9b6c-9a072b40d1fe\\amanhecer_1789152291538.jpg',
  'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\55dde924-2ebd-45dd-9b6c-9a072b40d1fe\\por_do_sol_1789152317889.jpg'
];

const destDir = path.join(__dirname, '../public/images/estudos/esbocos');
fs.mkdirSync(destDir, { recursive: true });

const temas = [
  "O poder da oração", "Fé em meio às dificuldades", "Deus permanece fiel", 
  "O chamado de Abraão", "A coragem de Davi", "A perseverança de Jó", 
  "José: da prisão ao propósito", "Moisés e o chamado de Deus", "Josué: coragem para avançar", 
  "Daniel e uma vida de fidelidade", "Ester: coragem para um propósito", "Neemias e a reconstrução", 
  "Pedro: restauração e chamado", "Paulo e a missão do Evangelho", "O amor ao próximo", 
  "Perdão e restauração", "Santidade na vida cristã", "O fruto do Espírito", 
  "O bom samaritano", "O filho pródigo", "A armadura de Deus", 
  "Permanecer em Cristo", "O bom pastor", "Servindo com humildade", 
  "Esperança em tempos difíceis", "Gratidão a Deus", "Sabedoria para decisões", 
  "Família e fé", "Evangelização e missão", "Esperança na volta de Cristo"
];

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

temas.forEach((tema, idx) => {
  const slug = slugify(tema);
  const srcImage = srcImages[idx % 2];
  const destPath = path.join(destDir, `esboco-${slug}.jpg`);
  
  fs.copyFileSync(srcImage, destPath);
  console.log(`Copied ${destPath}`);
});
