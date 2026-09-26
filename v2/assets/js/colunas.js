// VERSÃO 2 · Tela Colunas: coluna do dia, os 8 colunistas e a grade de colunas (filtrada ao escolher um colunista).
// Usa CONTEUDOS (conteudos-dados.js), COLUNISTAS/COLUNA_DO_DIA/colunasDe (colunas-dados.js) e fotoUrl/icone/mostrarAviso (layout.js).

// "SoftLiving" nos títulos e autores vira o logo em texto; sobre foto escura, na versão branca
const comLogo = (texto, claro) => texto.replace('SoftLiving', claro ? '<span class="sig sig-fixo sig-light"><span class="soft">Soft</span><span class="living">Living</span></span>' : LOGO);
const avatarDe = col => `<span class="av-col" style="background:${col.cor}">${col.sigla}</span>`;
const colunistaDoConteudo = c => COLUNISTAS.find(col => c.a.startsWith(col.nome));
const colEstado = { colunista:null };

// Coluna do dia
const dia = CONTEUDOS.find(c => c.t === COLUNA_DO_DIA);
const autorDia = colunistaDoConteudo(dia);
document.getElementById('colDia').innerHTML = `
  <div class="dl-foto foto"><img src="${fotoUrl(dia.foto, 1000)}" alt=""></div>
  <div class="dl-texto">
    <span class="kicker">Coluna do dia</span>
    <h2>${comLogo(dia.t)}</h2>
    <p>${comLogo(dia.e)}</p>
    <span class="autor-col">${avatarDe(autorDia)}<span><b>${autorDia.nome}</b><small>${autorDia.tema}</small></span></span>
    <span class="btn">Ler a coluna ${icone('seta')}</span>
  </div>`;

function renderColunas(){
  // Colunistas
  document.getElementById('colunistas').innerHTML = COLUNISTAS.map((col, i) => {
    const ultimas = colunasDe(col.nome);
    return `
    <button type="button" class="colunista ${colEstado.colunista === i ? 'on' : ''}" data-i="${i}" aria-pressed="${colEstado.colunista === i}">
      ${avatarDe(col)}
      <b>${col.nome}</b>
      <span class="col-tema">${col.tema}</span>
      <span class="col-ultima">${comLogo(ultimas[0].t)}</span>
      <small>${ultimas.length} ${ultimas.length === 1 ? 'coluna' : 'colunas'}</small>
    </button>`;
  }).join('');

  // Colunas (todas ou só as do colunista escolhido)
  const escolhido = colEstado.colunista === null ? null : COLUNISTAS[colEstado.colunista];
  const lista = escolhido ? colunasDe(escolhido.nome) : COLUNISTAS.flatMap(col => colunasDe(col.nome));
  document.getElementById('colTitulo').textContent = escolhido ? `Colunas de ${escolhido.nome}` : 'Todas as colunas';
  document.getElementById('colSub').textContent = escolhido ? escolhido.tema : `${lista.length} colunas de ${COLUNISTAS.length} colunistas`;
  document.getElementById('colTodas').hidden = !escolhido;
  document.getElementById('colGrade').innerHTML = lista.map(c => {
    const col = colunistaDoConteudo(c);
    return `
    <a href="#" class="vcard">
      <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      <button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button>
      <div class="vc-info">
        <span class="vc-cat">${col.tema}</span>
        <h3>${comLogo(c.t, true)}</h3>
        <span class="vc-autor">${col.nome}</span>
        <div class="vc-row">${c.badge === 'premium' ? `<span class="vc-chip premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>` : '<span class="vc-chip">Grátis</span>'}<span class="vc-btn">Ler ${icone('seta')}</span></div>
      </div>
    </a>`;
  }).join('');
}

document.getElementById('colunistas').addEventListener('click', e => {
  const b = e.target.closest('.colunista');
  if(!b) return;
  const i = +b.dataset.i;
  colEstado.colunista = colEstado.colunista === i ? null : i;     // clicar de novo no mesmo colunista volta a mostrar todas
  renderColunas();
  document.getElementById('colLista').scrollIntoView({ behavior:'smooth', block:'start' });
});
document.getElementById('colTodas').addEventListener('click', () => { colEstado.colunista = null; renderColunas(); });
document.getElementById('colGrade').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  fav.classList.toggle('on');
  mostrarAviso(fav.classList.contains('on') ? 'Salvo para ler depois' : 'Removido dos salvos');
});
renderColunas();
