function criarIcone(item) {
  const div = document.createElement('div');
  div.className = 'icon-item';

  const img = document.createElement('img');
  img.src = item.caminho;
  img.alt = item.nome;

  // Criar container para alinhar img e botão lado a lado
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.gap = '10px';

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

  container.appendChild(img);
  container.appendChild(button);

  div.appendChild(container);

  return div;
}
