const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');
const OUTPUT_FILE = path.join(__dirname, 'icons.json');

function getAllSvgFiles(dir, baseDir = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let svgFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      svgFiles = svgFiles.concat(getAllSvgFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      const nome = entry.name.replace('.svg', '').replace(/[-_]/g, ' ');
      const categoria = baseDir.split(path.sep)[0] || 'outros';
      svgFiles.push({
        nome,
        caminho: 'icons/' + relativePath.replace(/\\\\/g, '/'),
        categoria
      });
    }
  }

  return svgFiles;
}

const icons = getAllSvgFiles(ICONS_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(icons, null, 2), 'utf8');
console.log('✅ icons.json gerado com categorias!');
