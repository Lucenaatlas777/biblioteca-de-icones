const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');
const OUTPUT_FILE = path.join(__dirname, 'icons.json');

function listarSubpastasComSVGs(diretorioPai) {
  const resultado = [];

  const subpastas = fs.readdirSync(diretorioPai);

  subpastas.forEach(subpasta => {
    const caminhoSubpasta = path.join(diretorioPai, subpasta);
    const stat = fs.statSync(caminhoSubpasta);

    if (stat.isDirectory()) {
      const arquivos = fs.readdirSync(caminhoSubpasta);
      arquivos.forEach(arquivo => {
        if (arquivo.endsWith('.svg')) {
          resultado.push({
            nome: arquivo.replace('.svg', '').replace(/[-_]/g, ' '),
            caminho: `icons/${subpasta}/${arquivo}`,
            categoria: subpasta.toLowerCase()
          });
        }
      });
    }
  });

  return resultado;
}

const icones = listarSubpastasComSVGs(ICONS_DIR);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(icones, null, 2), 'utf8');
console.log('✅ icons.json atualizado com categorias baseado nas subpastas!');
