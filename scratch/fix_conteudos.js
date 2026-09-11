const fs = require('fs');
let data = fs.readFileSync('src/lib/data/conteudos.ts', 'utf8');

data = data.replace(/https:\/\/source\.unsplash\.com\/random\/640x360\/\?church,worship,\d+/g, (match) => {
  const images = [
    '/images/estudos/devocional.jpg',
    '/images/estudos/estudo-biblico.jpg',
    '/images/estudos/pregacao.jpg',
    '/images/estudos/generica.jpg'
  ];
  return images[Math.floor(Math.random() * images.length)];
});

data = data.replace(/"url":\s*"https:\/\/youtube\.com"/g, (match, offset, string) => {
  const substring = string.substring(Math.max(0, offset - 150), offset);
  if (substring.includes('"plataforma": "TikTok"')) {
    return '"url": "https://www.tiktok.com/@noite.comdeus"';
  } else if (substring.includes('"plataforma": "Kwai"')) {
    return '"url": "https://www.youtube.com/@Noite.comDeus"';
  } else {
    return '"url": "https://www.youtube.com/channel/UC0iUfFE9lOdzj_ycZGzkIdg"';
  }
});

data = data.replace(/"plataforma":\s*"Instagram"/g, '"plataforma": "TikTok"');

fs.writeFileSync('src/lib/data/conteudos.ts', data);
console.log('Fixed conteudos.ts');
