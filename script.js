let todosOsIcones = [];

function criarIcone(item) {
  const div = document.createElement('div');
  div.className = 'icon-item';

  const img = document.createElement('img');
  img.src = item.caminho;
  img.alt = item.nome;

  const button = document.createElement('button');
  button.className = 'download-btn';
  button.textContent = 'Baixar';
  button.setAttribute('data-icon', item.caminho);

  button.addEventListener('click', () => {
    fetch(item.caminho)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = item.caminho.split('/').pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert('Erro ao baixar o ícone.'));
  });

  div.appendChild(img);
  div.appendChild(button);

  return div;
}

function mostrarIcones(filtro = '') {
  const container = document.getElementById('icon-container');
  container.innerHTML = '';

  const filtrados = todosOsIcones.filter(item =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach(item => {
    const icone = criarIcone(item);
    container.appendChild(icone);
  });
}

fetch('icons.json')
  .then(response => response.json())
  .then(data => {
    todosOsIcones = data;
    mostrarIcones();
  })
  .catch(() => alert('Erro ao carregar ícones.'));

document.getElementById('search-input').addEventListener('input', (e) => {
  const valorBusca = e.target.value;
  mostrarIcones(valorBusca);
});

