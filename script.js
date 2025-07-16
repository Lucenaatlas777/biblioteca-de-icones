let iconsData = [];

fetch('icons.json')
  .then(res => res.json())
  .then(data => {
    iconsData = data;
    renderIcons(data);
  });

const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');

searchInput.addEventListener('input', filterIcons);
filterSelect.addEventListener('change', filterIcons);

function filterIcons() {
  const termo = searchInput.value.toLowerCase();
  const categoriaSelecionada = filterSelect.value;

  const filtrados = iconsData.filter(icon => {
    const nomeMatch = icon.nome.toLowerCase().includes(termo);
    const categoriaMatch = categoriaSelecionada === 'todos' || icon.categoria === categoriaSelecionada;
    return nomeMatch && categoriaMatch;
  });

  renderIcons(filtrados);
}

function renderIcons(icons) {
  const container = document.getElementById('icon-container');
  container.innerHTML = '';

  icons.forEach(icon => {
    const div = document.createElement('div');
    div.className = 'icon-item';

    const img = document.createElement('img');
    img.src = icon.caminho;
    img.alt = icon.nome;

    const downloadBtn = document.createElement('a');
    downloadBtn.href = icon.caminho;
    downloadBtn.download = icon.nome + '.svg';
    downloadBtn.className = 'btn-download';
    downloadBtn.textContent = 'Baixar';

    div.appendChild(img);
    div.appendChild(downloadBtn);
    container.appendChild(div);
  });
}