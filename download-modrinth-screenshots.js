const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://api.modrinth.com/v2';

const mods = [
  { slug: 'alexs-mobs', name: "Alex's Mobs" },
  { slug: 'doggy-talents-next', name: 'Doggy Talents Next' },
  { slug: 'domestication-innovation', name: 'Domestication Innovation' },
  { slug: 'better-dogs', name: 'Better Dogs' },
  { slug: 'better-cats', name: 'Better Cats' },
  { slug: 'aquaculture-2', name: 'Aquaculture 2' },
  { slug: 'farmers-delight', name: "Farmer's Delight" },
  { slug: 'sophisticated-backpacks', name: 'Sophisticated Backpacks' },
  { slug: 'waystones', name: 'Waystones' },
  { slug: 'artifacts', name: 'Artifacts' },
  { slug: 'iron-chests', name: 'Iron Chests' },
  { slug: 'storage-drawers', name: 'Storage Drawers' },
  { slug: 'biomes-o-plenty', name: "Biomes O' Plenty" },
  { slug: 'terralith', name: 'Terralith' },
  { slug: 'yungs-better-dungeons', name: "YUNG's Better Dungeons" },
  { slug: 'yungs-better-mineshafts', name: "YUNG's Better Mineshafts" },
  { slug: 'mutant-more', name: 'Mutant Monsters' },
  { slug: 'ice-and-fire', name: 'Ice and Fire' },
  { slug: 'mowzies-mobs', name: "Mowzie's Mobs" },
  { slug: 'twilight-forest', name: 'The Twilight Forest' },
  { slug: 'create', name: 'Create' },
  { slug: 'supplementaries', name: 'Supplementaries' },
  { slug: 'chipped', name: 'Chipped' },
  { slug: 'macaws-fences-and-walls', name: "Macaw's Fences" },
  { slug: 'macaws-doors', name: "Macaw's Doors" },
  { slug: 'macaws-bridges', name: "Macaw's Bridges" }
];

const saveDir = path.join(__dirname, 'public', 'assets', 'mods');
if (!fs.existsSync(saveDir)) {
  fs.mkdirSync(saveDir, { recursive: true });
}

function fetchAPI(endpoint) {
  return new Promise((resolve, reject) => {
    https.get(`${BASE_URL}${endpoint}`, {
      headers: { 'User-Agent': 'ModLume/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(filepath);
          if (stats.size > 1000) {
            console.log(`✓ Downloaded: ${filepath} (${(stats.size / 1024).toFixed(1)}KB)`);
            resolve();
          } else {
            file.close();
            fs.unlink(filepath, () => {});
            reject(new Error('File too small'));
          }
        });
      });
    }).on('error', (err) => {
      file.close(() => fs.unlink(filepath, () => {}));
      reject(err);
    });
  });
}

async function getModGallery(slug) {
  try {
    const project = await fetchAPI(`/project/${slug}`);
    
    // Try featured gallery first
    if (project.gallery && project.gallery.length > 0) {
      const featured = project.gallery.find(img => img.featured) || project.gallery[0];
      if (featured && featured.url) {
        return featured.url;
      }
    }
    
    // Try icon_url
    if (project.icon_url) {
      return project.icon_url;
    }
    
    return null;
  } catch (e) {
    console.log(`✗ API error for ${slug}: ${e.message}`);
    return null;
  }
}

async function processMod(mod) {
  console.log(`\nProcessing: ${mod.name} (${mod.slug})`);
  
  const filepath = path.join(saveDir, `${mod.slug}.webp`);
  
  // Check if already exists and valid
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    if (stats.size > 10000) {
      console.log(`  Already exists, skipping...`);
      return;
    }
  }
  
  const imageUrl = await getModGallery(mod.slug);
  
  if (!imageUrl) {
    console.log(`  ✗ No image found`);
    return;
  }
  
  // Convert CDN URL to direct image URL
  let directUrl = imageUrl;
  if (imageUrl.includes('cdn.modrinth.com')) {
    // Use the direct CDN URL
    directUrl = imageUrl;
  }
  
  console.log(`  Image URL: ${directUrl.substring(0, 80)}...`);
  
  try {
    await downloadImage(directUrl, filepath);
  } catch (e) {
    console.log(`  ✗ Download failed: ${e.message}`);
  }
  
  // Delay to be nice to the API
  await new Promise(r => setTimeout(r, 500));
}

async function main() {
  console.log('Starting Modrinth screenshot download...\n');
  
  for (const mod of mods) {
    await processMod(mod);
  }
  
  console.log('\n✓ All done!');
}

main().catch(console.error);
