const fs = require('fs');
const path = require('path');

const pasta = './icons';
const arquivos = [];

// Mapeamento dos nomes das subpastas para nomes bonitos no site
const nomesBonitos = {
  figurinhas: 'Figurinhas',
  coloridos: 'Ícones coloridos',
  linhas: 'Ícones em linhas',
  solidos: 'Ícones sólidos'
};

function lerDiretorio(diretorio, subpasta = '') {
  const itens = fs.readdirSync(diretorio);
  itens.forEach(item => {
    const caminhoCompleto = path.join(diretorio, item);
    const stat = fs.statSync(caminhoCompleto);

    if (stat.isDirectory()) {
      lerDiretorio(caminhoCompleto, path.basename(caminhoCompleto));
    } else if (path.extname(item) === '.svg') {
      const nome = path.basename(item, '.svg');
      const caminho = caminhoCompleto.replace(/\\/g, '/');
      const categoria = nomesBonitos[subpasta] || 'Sem categoria';

      arquivos.push({ nome, caminho, categoria });
    }
  });
}

lerDiretorio(pasta);
fs.writeFileSync('icons.json', JSON.stringify(arquivos, null, 2));
console.log('✅ icons.json gerado com nomes de categorias bonitos!');
