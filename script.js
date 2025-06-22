document.querySelectorAll('.download-btn').forEach(button => {
  button.addEventListener('click', () => {
    const iconPath = button.getAttribute('data-icon');
    fetch(iconPath)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = iconPath.split('/').pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert('Erro ao baixar o ícone.'));
  });
});
