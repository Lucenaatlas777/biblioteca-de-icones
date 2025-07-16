const fs = require('fs');
const path = require('path');

const baseDir = './icons';

function gerarListaDeIcones(dir) {
  const lista = [];

  const categorias = fs.readdirSync(dir);
  categorias.forEach((categoria) => {
    const categoriaPath = path.join(dir, categoria);
    if (fs.lstatSync(categoriaPath).isDirectory()) {
      const arquivos = fs.readdirSync(categoriaPath);
      arquivos.forEach((arquivo) => {
        if (arquivo.endsWith('.svg')) {
          lista.push({
            nome: path.parse(arquivo).name,
            caminho: path.join('icons', categoria, arquivo).replace(/\\/g, '/'),
            categoria: categoria.toLowerCase().replace(/ /g, '_')
          });
        }
      });
    }
  });

  return lista;
}

const icones = gerarListaDeIcones(baseDir);

fs.writeFileSync('icons.json', JSON.stringify(icones, null, 2), 'utf8');
console.log('✅ icons.json atualizado com sucesso!');
