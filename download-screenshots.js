const { chromium } = require('playwright');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mods = [
  'alexs-mobs',
  'doggy-talents-next',
  'domestication-innovation',
  'better-dogs',
  'better-cats',
  'aquaculture-2',
  'farmers-delight',
  'sophisticated-backpacks',
  'waystones',
  'artifacts',
  'iron-chests',
  'storage-drawers',
  'biomes-o-plenty',
  'terralith',
  'yungs-better-dungeons',
  'yungs-better-mineshafts',
  'mutant-monsters',
  'ice-and-fire',
  'mowzies-mobs',
  'twilight-forest',
  'create',
  'supplementaries',
  'chipped',
  'macaws-furniture',
  'macaws-doors',
  'macaws-bridges'
];

const saveDir = path.join(__dirname, 'public', 'assets', 'mods');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      file.close(() => fs.unlink(filepath, () => {}));
      reject(err);
    });
  });
}

async function searchAndDownload(modName) {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ['--disable-web-security'] });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Try Bing Images
    const searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(modName + ' Minecraft gameplay screenshot')}&first=1&count=10`;
    console.log(`Searching: ${modName}`);
    
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    // Get image URLs from thumbnails
    const imageUrls = await page.evaluate(() => {
      const results = [];
      const thumbs = document.querySelectorAll('.iusc');
      thumbs.forEach(thumb => {
        const m = JSON.parse(thumb.getAttribute('m') || '{}');
        if (m.turl && m.turl.includes('http')) {
          results.push(m.turl);
        }
      });
      return results.slice(0, 5);
    });
    
    console.log(`Found ${imageUrls.length} images for ${modName}`);
    
    if (imageUrls.length > 0) {
      const filepath = path.join(saveDir, `${modName}.jpg`);
      try {
        await downloadFile(imageUrls[0], filepath);
        console.log(`Saved: ${modName}`);
      } catch (e) {
        console.log(`Failed ${modName}: ${e.message}`);
      }
    }
    
    await context.close();
  } catch (e) {
    console.log(`Error ${modName}: ${e.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

async function main() {
  for (const mod of mods) {
    await searchAndDownload(mod);
    await new Promise(r => setTimeout(r, 1000)); // delay between requests
  }
  console.log('All done!');
}

main();
