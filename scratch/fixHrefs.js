const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'app', 'estudos');
const categorias = ['esbocos', 'estudos-biblicos', 'personagens', 'parabolas', 'fe'];

categorias.forEach(cat => {
  const filePath = path.join(dir, cat, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/href=\{\`\/estudos\/conteudo\/\$\{estudo\.slug\}\`\}/g, 'href={`/estudos/${estudo.slug}`}');
    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed');
