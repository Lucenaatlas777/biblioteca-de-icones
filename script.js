const container = document.getElementById('icon-container');

fetch('icons.json')
  .then(res => res.json())
  .then(icons => {
    icons.forEach(icon => {
      const box = document.createElement('div');
      box.className = 'icon-box';

      // Criar o botão de download
      const downloadLink = document.createElement('a');
      downloadLink.href = `icons/${icon}`;
      downloadLink.download = icon;
      downloadLink.innerText = 'Baixar';
      downloadLink.className = 'download-btn';

      fetch(`icons/${icon}`)
        .then(res => res.text())
        .then(svg => {
          const svgContainer = document.createElement('div');
          svgContainer.innerHTML = svg;
          svgContainer.className = 'icon-svg';

          box.appendChild(svgContainer);
          box.appendChild(downloadLink);
          container.appendChild(box);
        });
    });
  });
