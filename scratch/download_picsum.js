const fs = require('fs');
const path = require('path');
const https = require('https');

const content = fs.readFileSync('src/lib/data/conteudos.ts', 'utf8');
const slugs = [...content.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);

const targetDir = path.join(process.cwd(), 'public', 'images', 'conteudos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  console.log(`Downloading images for ${slugs.length} items...`);
  const batchSize = 10;
  for (let i = 0; i < slugs.length; i += batchSize) {
    const batch = slugs.slice(i, i + batchSize);
    await Promise.all(batch.map(async (slug) => {
      const dest = path.join(targetDir, `${slug}.jpg`);
      if (fs.existsSync(dest)) {
        const stats = fs.statSync(dest);
        if (stats.size > 0) return;
      }
      
      const url = `https://picsum.photos/seed/${slug}/800/600`;
      console.log(`Downloading ${slug}.jpg...`);
      try {
        await downloadImage(url, dest);
      } catch (err) {
        console.error(`Failed to download ${slug}: ${err.message}`);
      }
    }));
    console.log(`Finished batch ${Math.floor(i / batchSize) + 1}`);
    // delay to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('Done downloading images!');
}

run();
