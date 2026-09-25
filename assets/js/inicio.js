// Tela Início: filtros de categoria e atalhos para outras telas
const inicioPage = document.getElementById('inicioPage');
inicioPage.querySelectorAll('.in-pill').forEach(p => p.addEventListener('click', () => {
  inicioPage.querySelectorAll('.in-pill').forEach(x => x.classList.toggle('active', x === p));
}));

// Capas dos artigos e fotos dos colunistas: degradê sorteado a cada carregamento
inicioPage.querySelectorAll('.in-ph').forEach(el => {
  el.style.background = sorteiaDegrade();
  if(el.dataset.icon) el.innerHTML = ICON[el.dataset.icon] || ICON.book;
});
