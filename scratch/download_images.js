const fs = require('fs');
const path = require('path');
const https = require('https');

const slugs = fs.readFileSync('scratch/titles.txt', 'utf8').split('\n').filter(Boolean);

const targetDir = path.join(process.cwd(), 'public', 'images', 'conteudos');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Node.js/Wikimedia-Downloader' } }, (res) => {
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

async function searchWikimedia(query) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url`;
  
  return new Promise((resolve, reject) => {
    https.get(apiUrl, { headers: { 'User-Agent': 'Node.js/Wikimedia-Downloader' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            if (pages.length > 0 && pages[0].imageinfo && pages[0].imageinfo.length > 0) {
              resolve(pages[0].imageinfo[0].url);
              return;
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

// Fallback search terms
const fallbacks = ['Jerusalem ancient', 'Bible manuscript', 'Israel landscape', 'Qumran scrolls', 'Olive tree Israel', 'Sea of Galilee', 'Jordan River'];
let fallbackIndex = 0;

async function run() {
  console.log(`Downloading images for ${slugs.length} items...`);
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const dest = path.join(targetDir, `${slug}.jpg`);
    if (fs.existsSync(dest)) continue; // skip if already exists
    
    // Create a search query from slug
    let query = slug.replace(/-/g, ' ');
    if (query.includes('parte')) {
       query = query.split('parte')[0].trim();
    }
    
    let url = await searchWikimedia(query);
    if (!url) {
      // Try fallback
      const fallbackQuery = fallbacks[fallbackIndex % fallbacks.length];
      fallbackIndex++;
      url = await searchWikimedia(fallbackQuery);
    }
    
    if (url) {
      console.log(`[${i+1}/${slugs.length}] Downloading ${slug}.jpg from ${url}`);
      try {
        await downloadImage(url, dest);
      } catch (err) {
        console.error(`Failed to download ${url}: ${err.message}`);
      }
    } else {
      console.log(`[${i+1}/${slugs.length}] No image found for ${slug}`);
    }
  }
  console.log('Done!');
}

run();
