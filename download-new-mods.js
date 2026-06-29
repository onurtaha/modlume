const fs = require('fs');
const path = require('path');
const https = require('https');

const newMods = [
  'sodium',
  'lithium',
  'fabric-api',
  'wthit',
  'indium'
];

const saveDir = path.join(__dirname, 'public', 'assets', 'mods');

function fetchAPI(slug) {
  return new Promise((resolve, reject) => {
    https.get('https://api.modrinth.com/v2/project/' + slug, { headers: { 'User-Agent': 'ModLume/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (e) => { file.close(); reject(e); });
  });
}

async function main() {
  for (const slug of newMods) {
    try {
      const data = await fetchAPI(slug);
      let imgUrl = null;
      
      if (data.gallery && data.gallery.length > 0) {
        imgUrl = data.gallery[0].url;
      } else if (data.icon_url) {
        imgUrl = data.icon_url;
      }
      
      if (imgUrl) {
        const filepath = path.join(saveDir, slug + '.webp');
        await download(imgUrl, filepath);
        console.log('Downloaded: ' + slug);
      }
    } catch(e) {
      console.log('Failed: ' + slug);
    }
    await new Promise(r => setTimeout(r, 500));
  }
}
main();
