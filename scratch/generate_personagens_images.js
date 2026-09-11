const fs = require('fs');
const path = require('path');

const personagens = [
  { slug: 'abraao', name: 'Abraão', color: '#8B5A2B', symbol: '🏕️' },
  { slug: 'sara', name: 'Sara', color: '#D4AF37', symbol: '✨' },
  { slug: 'moises', name: 'Moisés', color: '#4682B4', symbol: '🌊' },
  { slug: 'josue', name: 'Josué', color: '#A0522D', symbol: '⚔️' },
  { slug: 'rute', name: 'Rute', color: '#DAA520', symbol: '🌾' },
  { slug: 'davi', name: 'Davi', color: '#2E8B57', symbol: '👑' },
  { slug: 'salomao', name: 'Salomão', color: '#B8860B', symbol: '🏛️' },
  { slug: 'elias', name: 'Elias', color: '#CD5C5C', symbol: '🔥' },
  { slug: 'ester', name: 'Ester', color: '#C71585', symbol: '👑' },
  { slug: 'daniel', name: 'Daniel', color: '#483D8B', symbol: '🦁' },
  { slug: 'jonas', name: 'Jonas', color: '#5F9EA0', symbol: '🐋' },
  { slug: 'joao-batista', name: 'João Batista', color: '#8FBC8F', symbol: '💧' },
  { slug: 'jesus', name: 'Jesus', color: '#D4AF37', symbol: '✝️' },
  { slug: 'paulo', name: 'Paulo', color: '#4B0082', symbol: '📜' },
  { slug: 'joao', name: 'João', color: '#1E90FF', symbol: '🦅' }
];

const outDir = path.join(__dirname, '../public/images/personagens');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

personagens.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <defs>
      <radialGradient id="grad-${p.slug}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="${p.color}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#0a1326" stop-opacity="1" />
      </radialGradient>
      <pattern id="pattern-${p.slug}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1" fill="#ffffff" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="800" height="800" fill="url(#grad-${p.slug})" />
    <rect width="800" height="800" fill="url(#pattern-${p.slug})" />
    <circle cx="400" cy="350" r="180" fill="#000000" opacity="0.3" />
    <text x="400" y="380" font-family="Arial, sans-serif" font-size="160" text-anchor="middle" dominant-baseline="middle">${p.symbol}</text>
    <text x="400" y="600" font-family="Georgia, serif" font-size="70" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="4">${p.name.toUpperCase()}</text>
    <text x="400" y="660" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#D4AF37" text-anchor="middle" letter-spacing="8">PERSONAGENS BÍBLICOS</text>
  </svg>`;

  fs.writeFileSync(path.join(outDir, `${p.slug}.svg`), svg);
  console.log(`Generated ${p.slug}.svg`);
});

console.log('All character images generated successfully!');
