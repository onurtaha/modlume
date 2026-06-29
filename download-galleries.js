const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://api.modrinth.com/v2';

const mods = [
  'alexs-mobs',
  'doggy-talents-next',
  'domestication-innovation',
  'better-dogs',
  'better-cats',
  'aquaculture',
  'farmers-delight',
  'sophisticated-backpacks',
  'waystones',
  'artifacts',
  'iron-chests',
  'storagedrawers',
  'biomes-o-plenty',
  'terralith',
  'yungs-better-dungeons',
  'yungs-better-mineshafts',
  'mutant-more',
  'ice-and-fire-dragons',
  'mowzies-mobs',
  'twilightforest',
  'create',
  'supplementaries',
  'chipped',
  'macaws-fences-and-walls',
  'macaws-doors',
  'macaws-bridges'
];

const saveDir = path.join(__dirname, 'public', 'assets', 'mods');
const galleryDir = path.join(saveDir, 'gallery');
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

function fetchAPI(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${endpoint}`;
    https.get(url, { headers: { 'User-Agent': 'ModLume/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('Parse error: ' + data.substring(0, 100))); }
      });
    }).on('error', reject);
  });
}

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('No URL'));
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(filepath, () => {});
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(filepath);
          if (stats.size > 5000) resolve();
          else { fs.unlink(filepath, () => {}); reject(new Error('File too small')); }
        });
      });
    }).on('error', (e) => { file.close(() => fs.unlink(filepath, () => {})); reject(e); });
  });
}

async function processMod(slug) {
  console.log(`\nProcessing: ${slug}`);
  const modGalleryDir = path.join(galleryDir, slug);
  if (!fs.existsSync(modGalleryDir)) {
    fs.mkdirSync(modGalleryDir, { recursive: true });
  }

  try {
    const project = await fetchAPI(`/project/${slug}`);
    const images = [];

    // Get gallery images
    if (project.gallery && project.gallery.length > 0) {
      const gallery = project.gallery.slice(0, 6); // Max 6 images
      for (let i = 0; i < gallery.length; i++) {
        const img = gallery[i];
        const filepath = path.join(modGalleryDir, `${i + 1}.webp`);
        try {
          await download(img.url, filepath);
          console.log(`  ✓ Image ${i + 1} downloaded`);
          images.push(`/assets/mods/gallery/${slug}/${i + 1}.webp`);
        } catch (e) {
          console.log(`  ✗ Image ${i + 1} failed: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // If no gallery, use icon
    if (images.length === 0 && project.icon_url) {
      const filepath = path.join(modGalleryDir, '1.webp');
      try {
        await download(project.icon_url, filepath);
        console.log(`  ✓ Icon downloaded as main image`);
        images.push(`/assets/mods/gallery/${slug}/1.webp`);
      } catch (e) {
        console.log(`  ✗ Icon failed: ${e.message}`);
      }
    }

    console.log(`  Total images: ${images.length}`);
    return images;

  } catch (e) {
    console.log(`  ✗ Error: ${e.message}`);
    return [];
  }
}

async function main() {
  console.log('Downloading gallery images for all mods...\n');

  const allImages = {};
  for (const mod of mods) {
    allImages[mod] = await processMod(mod);
    await new Promise(r => setTimeout(r, 500));
  }

  // Save mapping to JSON
  fs.writeFileSync(
    path.join(__dirname, 'public', 'assets', 'mods', 'gallery.json'),
    JSON.stringify(allImages, null, 2)
  );

  console.log('\n✓ All done! Gallery data saved to gallery.json');
}

main().catch(console.error);
