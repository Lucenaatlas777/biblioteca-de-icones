fetch('icons.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('icon-container');
    const searchInput = document.getElementById('search-input');

    function renderIcons(icons) {
      container.innerHTML = '';
      icons.forEach(icon => {
        const item = document.createElement('div');
        item.className = 'icon-item';
        item.innerHTML = `
          <img src="${icon.caminho}" alt="${icon.nome}">
          <div class="botoes">
            <button onclick="copiar('${icon.caminho}')">Copiar</button>
            <a href="${icon.caminho}" download>
              <button>Baixar</button>
            </a>
          </div>
        `;
        container.appendChild(item);
      });
    }

    function copiar(url) {
      fetch(url)
        .then(res => res.text())
        .then(text => {
          navigator.clipboard.writeText(text);
          alert("Ícone copiado como SVG!");
        });
    }

    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      const filtrados = data.filter(icon => icon.nome.toLowerCase().includes(termo));
      renderIcons(filtrados);
    });

    renderIcons(data);
  });
