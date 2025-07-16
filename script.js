fetch('icons.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('icon-container');
    container.innerHTML = '';

    const categorias = {};

    // Agrupar ícones por categoria
    data.forEach(icon => {
      if (!categorias[icon.categoria]) {
        categorias[icon.categoria] = [];
      }
      categorias[icon.categoria].push(icon);
    });

    // Criar seção para cada categoria
    for (const categoria in categorias) {
      const secao = document.createElement('section');
      const titulo = document.createElement('h2');
      titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      secao.appendChild(titulo);

      const grid = document.createElement('div');
      grid.className = 'icon-grid';

      categorias[categoria].forEach(icon => {
        const item = document.createElement('div');
        item.className = 'icon-item';

        const img = document.createElement('img');
        img.src = icon.caminho;
        img.alt = icon.nome;

        const btnDownload = document.createElement('a');
        btnDownload.href = icon.caminho;
        btnDownload.download = icon.nome + '.svg';
        btnDownload.textContent = '⬇';
        btnDownload.className = 'btn-download';

        item.appendChild(img);
        item.appendChild(btnDownload);
        grid.appendChild(item);
      });

      secao.appendChild(grid);
      container.appendChild(secao);
    }
  })
  .catch(error => console.error('Erro ao carregar ícones:', error));
