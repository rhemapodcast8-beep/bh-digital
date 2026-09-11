const https = require('https');
const fs = require('fs');
const path = require('path');

const ITEMS = [
  { slug: "a-cruz-e-o-canivete", img: "city,street" },
  { slug: "herois-da-fe", img: "library,books" },
  { slug: "o-peregrino", img: "path,mountain" },
  { slug: "o-conhecimento-do-santo", img: "light,cathedral" },
  { slug: "graca-maravilhosa", img: "sunrise,peace" }
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error("Failed to get URL: " + res.statusCode));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const run = async () => {
  const dir = path.join(__dirname, '../public/images/livros');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  let done = 0;

  for (const item of ITEMS) {
    const filepath = path.join(dir, item.slug + '.webp');
    try {
      const url = "https://picsum.photos/seed/" + item.slug + "_livros/640/900"; // Usando proporção de livro (vertical)
      await downloadImage(url, filepath);
      done++;
      console.log("Baixado: " + item.slug);
    } catch (err) {
      console.error('Erro baixando ' + item.slug, err.message);
    }
  }

  console.log("Download de livros completo!");
};

run();
