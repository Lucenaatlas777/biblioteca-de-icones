function copiarSVG(caminho) {
  fetch(caminho)
    .then(res => res.text())
    .then(svg => {
      navigator.clipboard.writeText(svg)
        .then(() => alert("SVG copiado para a área de transferência!"))
        .catch(err => alert("Erro ao copiar: " + err));
    });
}

fetch('icons.json')
  .then(response => response.json())
  .then(icons => {
    const container = document.getElementById('icon-container');
    container.innerHTML = '';

    icons.forEach(icon => {
      const wrapper = document.createElement('div');
      wrapper.className = 'icon-wrapper';

      const img = document.createElement('img');
      img.src = icon.caminho;
      img.alt = icon.nome;
      img.className = 'icon-image';

      const actions = document.createElement('div');
      actions.className = 'icon-actions';

      const copiarBtn = document.createElement('button');
      copiarBtn.className = 'btn';
      copiarBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="#12355B" width="14" height="14" viewBox="0 0 16 16">
          <path d="M10 1.5A1.5 1.5 0 0 1 11.5 3v8A1.5 1.5 0 0 1 10 12.5H6A1.5 1.5 0 0 1 4.5 11V3A1.5 1.5 0 0 1 6 1.5h4zm0 1H6A.5.5 0 0 0 5.5 3v8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5z"/>
          <path d="M4 4a.5.5 0 0 1 .5.5v7A1.5 1.5 0 0 0 6 13h4a.5.5 0 0 1 0 1H6a2.5 2.5 0 0 1-2.5-2.5v-7A.5.5 0 0 1 4 4z"/>
        </svg>`;
      copiarBtn.onclick = () => copiarSVG(icon.caminho);

      const baixarLink = document.createElement('a');
      baixarLink.className = 'btn';
      baixarLink.href = icon.caminho;
      baixarLink.download = '';
      baixarLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="#12355B" width="14" height="14" viewBox="0 0 16 16">
          <path d="M.5 13.5v2a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v1.5H1V13.5a.5.5 0 0 0-1 0zm7-13a.5.5 0 0 1 .5.5v9.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.498.498 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7 10.793V1a.5.5 0 0 1 .5-.5z"/>
        </svg>`;

      actions.appendChild(copiarBtn);
      actions.appendChild(baixarLink);
      wrapper.appendChild(img);
      wrapper.appendChild(actions);
      container.appendChild(wrapper);
    });
  });

document.getElementById('search-input').addEventListener('input', function () {
  const termo = this.value.toLowerCase();
  const icones = document.querySelectorAll('.icon-wrapper');

  icones.forEach(wrapper => {
    const nome = wrapper.querySelector('img').alt.toLowerCase();
    wrapper.style.display = nome.includes(termo) ? 'inline-block' : 'none';
  });
});
