// VERSÃO 2 · Tela Colunas (referência: página de colunistas do site): coluna do dia com 4 sugestões no mesmo box,
// navegue por autor, todos os colunistas (filtro por categoria) e colunas em destaque (filtradas ao escolher um autor).
// Usa CONTEUDOS, COLUNISTAS/COLUNAS_EXTRAS/COLUNA_DO_DIA/SUGESTOES_DO_DIA/TODAS_COLUNAS/colunasDe e layout.js.

// "SoftLiving" nos textos vira o logo em texto; sobre foto escura, na versão branca
const comLogo = (texto, claro) => texto.replace('SoftLiving', claro ? '<span class="sig sig-fixo sig-light"><span class="soft">Soft</span><span class="living">Living</span></span>' : LOGO);
const avatarDe = col => `<span class="av-col" style="background:${col.cor}">${col.sigla}</span>`;
const colunistaDe = c => COLUNISTAS.find(col => c.a.startsWith(col.nome));
const colunaPorTitulo = t => TODAS_COLUNAS().find(c => c.t === t);
const colEstado = { autor:null, categoria:'Todos' };
const totalPublicadas = COLUNISTAS.reduce((s, col) => s + col.publicadas, 0);

// Coluna do dia (topo) e, no mesmo box, sugestões num carrossel horizontal (4 por vez)
const autorDia = COLUNISTAS.find(col => col.nome === COLUNA_DO_DIA.colunista);
const ultimaDia = colunaPorTitulo(COLUNA_DO_DIA.ultima);
document.getElementById('colDia').innerHTML = `
  <a href="#" class="cd-topo">
    <div class="dl-foto foto"><img src="${fotoUrl(ultimaDia.foto, 1000)}" alt=""></div>
    <div class="dl-texto">
      <span class="cd-selos"><span class="kicker">Coluna do dia</span></span>
      <h2>${autorDia.coluna}</h2>
      <span class="autor-col">${avatarDe(autorDia)}<span><b>${autorDia.nome}</b><small>${autorDia.categoria}</small></span></span>
      <p class="cd-bio">${autorDia.bio}</p>
      <span class="cd-ultima"><small>Última coluna · grátis</small><b>${ultimaDia.t}</b></span>
      <span class="btn">Ler a coluna grátis ${icone('seta')}</span>
    </div>
  </a>
  <div class="cd-sugestoes">
    <span class="cd-sug-titulo">Mais colunas para você</span>
    <div class="cd-sug-lista">
      ${[...SUGESTOES_DO_DIA.map(colunaPorTitulo), ...TODAS_COLUNAS().filter(c => c.t !== COLUNA_DO_DIA.ultima && !SUGESTOES_DO_DIA.includes(c.t))].map(c => `
      <a href="#" class="cd-sug"><img class="foto" src="${fotoUrl(c.foto, 400)}" alt="" loading="lazy">
        <b>${comLogo(c.t)}</b><small>${colunistaDe(c).nome}</small></a>`).join('')}
    </div>
  </div>`;

ativarCarrossel(document.querySelector('#colDia .cd-sug-lista'), 'h');   // 4 por vez, com setas

document.getElementById('colConta').textContent = `${COLUNISTAS.length} colunistas · ${totalPublicadas} colunas publicadas`;

function renderColunas(){
  // Navegue por autor
  document.getElementById('colAutores').innerHTML = COLUNISTAS.map((col, i) => `
    <button type="button" class="autor ${colEstado.autor === i ? 'on' : ''}" data-autor="${i}" aria-pressed="${colEstado.autor === i}" title="${col.nome}">${avatarDe(col)}<span>${col.curto}</span></button>`).join('');

  // Todos os colunistas, com filtro por categoria
  // Abas com o nome curto da categoria (col.aba); o filtro usa a categoria completa
  // SoftLiving é a primeira aba depois de Todos
  const unicas = COLUNISTAS.map(col => [col.categoria, col.aba]).filter((c, i, lista) => lista.findIndex(x => x[0] === c[0]) === i);
  const categorias = [['Todos', 'Todos'], ...unicas.filter(c => c[0] === 'SoftLiving'), ...unicas.filter(c => c[0] !== 'SoftLiving')];
  document.getElementById('colCategorias').innerHTML = categorias.map(([cat, aba]) => `<button type="button" role="tab" class="${cat === colEstado.categoria ? 'on' : ''}" aria-selected="${cat === colEstado.categoria}" data-cat="${cat}" title="${cat}">${aba === 'SoftLiving' ? LOGO : aba}</button>`).join('');
  document.getElementById('colunistas').innerHTML = COLUNISTAS.map((col, i) => ({ col, i }))
    .filter(({ col }) => colEstado.categoria === 'Todos' || col.categoria === colEstado.categoria)
    .map(({ col, i }) => `
    <button type="button" class="colunista ${colEstado.autor === i ? 'on' : ''}" data-autor="${i}" aria-pressed="${colEstado.autor === i}">
      <span class="col-topo">${avatarDe(col)}</span>
      ${col.coluna ? `<span class="col-nome">${comLogo(col.coluna)}</span>` : ''}
      <b>${col.nome}</b>
      <span class="col-tema">${col.categoria === 'SoftLiving' ? LOGO : col.categoria}</span>
      <span class="col-bio">${comLogo(col.bio)}</span>
      <span class="col-rodape"><small>${col.publicadas} ${col.publicadas === 1 ? 'coluna' : 'colunas'}</small><span class="col-ler">Ler agora →</span></span>
    </button>`).join('');

  // Colunas em destaque (ou as do autor escolhido)
  const autor = colEstado.autor === null ? null : COLUNISTAS[colEstado.autor];
  const lista = autor ? colunasDe(autor.nome) : TODAS_COLUNAS();
  document.getElementById('colTitulo').textContent = autor ? `Colunas de ${autor.nome}` : 'Colunas em destaque';
  document.getElementById('colSub').textContent = autor ? (autor.coluna || autor.categoria) : 'A última coluna de cada autor é gratuita.';
  document.getElementById('colTodas').hidden = !autor;
  document.getElementById('colGrade').innerHTML = lista.map(c => {
    const col = colunistaDe(c);
    return `
    <a href="#" class="vcard">
      <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      <button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button>
      <div class="vc-info">
        <span class="vc-cat">${col.coluna ? comLogo(col.coluna, true) : col.categoria}</span>
        <h3>${comLogo(c.t, true)}</h3>
        <span class="vc-autor">${col.nome}</span>
        <div class="vc-row">${c.badge === 'premium' ? `<span class="vc-chip premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>` : '<span class="vc-chip">Grátis</span>'}<span class="vc-btn">Ler ${icone('seta')}</span></div>
      </div>
    </a>`;
  }).join('');
}

// Escolher um autor (pelas fotos ou pelos cartões) mostra as colunas dele; clicar de novo volta a todas
function escolherAutor(i){
  colEstado.autor = colEstado.autor === i ? null : i;
  renderColunas();
  document.getElementById('colLista').scrollIntoView({ behavior:'smooth', block:'start' });
}
['colAutores', 'colunistas'].forEach(id => document.getElementById(id).addEventListener('click', e => {
  const b = e.target.closest('[data-autor]');
  if(b) escolherAutor(+b.dataset.autor);
}));
document.getElementById('colCategorias').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ colEstado.categoria = b.dataset.cat; renderColunas(); } });
document.getElementById('colTodas').addEventListener('click', () => { colEstado.autor = null; renderColunas(); });
document.getElementById('colArquivo').addEventListener('click', () => mostrarAviso('O arquivo completo de colunas fica disponível com saldo na carteira (demonstração)'));
document.getElementById('colGrade').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  fav.classList.toggle('on');
  mostrarAviso(fav.classList.contains('on') ? 'Salvo para ler depois' : 'Removido dos salvos');
});
renderColunas();
