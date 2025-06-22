const fs = require('fs');
const path = require('path');

const pastaIcones = path.join(__dirname, 'icons');
const arquivoSaida = path.join(__dirname, 'icons.json');

fs.readdir(pastaIcones, (err, arquivos) => {
  if (err) {
    return console.error('❌ Erro ao ler a pasta de ícones:', err);
  }

  const svgs = arquivos.filter(nome => nome.endsWith('.svg'));

  const listaDeIcones = svgs.map(nome => ({
    nome: nome.replace('.svg', ''),
    caminho: `icons/${nome}`
  }));

  fs.writeFile(arquivoSaida, JSON.stringify(listaDeIcones, null, 2), (err) => {
    if (err) {
      return console.error('❌ Erro ao salvar icons.json:', err);
    }
    console.log('✅ icons.json criado/atualizado com sucesso!');
  });
});
