// VERSÃO 2 · Tela Início: "Explore por assunto", "Últimas matérias" e "Acontece nos grupos".
// Usa CONTEUDOS (conteudos-dados.js), GRUPOS (grupos-dados.js) e fotoUrl/urlPagina/mostrarAviso (layout.js).

// Sem tempo de leitura e sem data de publicação em nenhum lugar (pedido do usuário)
const ITENS = embaralhar(CONTEUDOS);   // Explore por assunto: ordem sorteada a cada carregamento

// Assuntos: rótulo curto do filtro → categoria dos dados
const ASSUNTOS = [
  ['Todos', null],
  ['Bem-estar', 'Saúde mental e qualidade de vida'],
  ['Saúde', 'Saúde e bem-estar físico'],
  ['Estilo e casa', 'Estilo de vida e consumo'],
  ['Viagem', 'Turismo e viagem'],
  ['Tecnologia', 'Tecnologia e serviços digitais'],
];
const assuntoCurto = cat => (ASSUNTOS.find(a => a[1] === cat) || [cat])[0];
const seloPreco = c => c.badge === 'premium'
  ? `<span class="vc-chip premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>`
  : `<span class="vc-chip">Grátis</span>`;

const botaoSalvar = `<button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button>`;

// Explore por assunto
const tabs = document.getElementById('tabs');
tabs.innerHTML = ASSUNTOS.map((a, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-i="${i}">${a[0]}</button>`).join('')
  + `<a href="${urlPagina('conteudos')}" class="btn ghost">Todos os assuntos</a>`;
function mostrarAssunto(i){
  const cat = ASSUNTOS[i][1];
  const lista = ITENS.filter(c => !cat || c.cat === cat);   // todos do assunto: o carrossel mostra 4 por vez
  document.getElementById('cards').innerHTML = lista.map(c => `
    <a href="#" class="vcard">
      <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      ${botaoSalvar}
      <div class="vc-info">
        <span class="vc-cat">${assuntoCurto(c.cat)}</span>
        <h3>${c.t}</h3>
        <div class="vc-row">${seloPreco(c)}<span class="vc-btn">Ler ${icone('seta')}</span></div>
      </div>
    </a>`).join('');
  tabs.querySelectorAll('button').forEach(b => {
    const on = +b.dataset.i === i;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on);
  });
  ativarCarrossel(document.getElementById('cards'), 'h');
}
tabs.addEventListener('click', e => { const b = e.target.closest('button'); if(b) mostrarAssunto(+b.dataset.i); });
// Botão salvar (cartões, destaque e lista): marca e desmarca, sem abrir o conteúdo
document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  const salvo = alternarSalvo(fav);
  mostrarAviso(salvo ? 'Salvo para ler depois' : 'Removido dos salvos');
});
mostrarAssunto(0);

// Últimas matérias: a matéria em destaque e, ao lado, as outras num carrossel vertical (4 por vez).
// Sorteio próprio (diferente do Explore por assunto), a cada carregamento: o primeiro sorteado vira o destaque
const ULTIMAS = embaralhar(CONTEUDOS);
const destaque = ULTIMAS[0];
document.getElementById('lead').innerHTML = `
  <div class="imgw foto"><img src="${fotoUrl(destaque.foto, 1100)}" alt=""></div>${botaoSalvar}
  <span class="cat">${assuntoCurto(destaque.cat)}</span>
  <h3>${destaque.t}</h3><p>${destaque.e}</p>
  <div class="meta"><span>${destaque.a}</span></div>`;
document.getElementById('list').innerHTML = ULTIMAS.slice(1).map(c => `
  <a href="#" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">${botaoSalvar}
    <div><span class="cat">${assuntoCurto(c.cat)}</span><h3>${c.t}</h3>
    <div class="meta"><span>${c.a}</span></div></div></a>`).join('');
ativarCarrossel(document.getElementById('list'), 'v');
document.getElementById('verTodas').href = urlPagina('conteudos');

// Acontece nos grupos: carrossel com todos os grupos (3 por vez), em ordem sorteada a cada carregamento
// (cada cartão abre a página do grupo, grupo.html?g=n)
document.getElementById('groupList').innerHTML = embaralhar(GRUPOS).map(g => {
  const n = GRUPOS.indexOf(g);
  return `
  <a href="${urlGrupo(n)}" class="vcard">
    <img src="${fotoUrl(g.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    ${g.novos ? `<span class="new">${g.novos} novas</span>` : ''}
    <div class="vc-info">
      <span class="vc-cat">${g.cat}</span>
      <h3>${g.t}</h3>
      <div class="vc-row"><span class="vc-chip" title="${g.membros} ${g.membros === 1 ? 'membro' : 'membros'}">${icone('grupos')}${g.membros}</span><span class="vc-btn">${g.participando ? 'Ver grupo' : 'Participar ' + icone('mais')}</span></div>
    </div></a>`;
}).join('');
ativarCarrossel(document.getElementById('groupList'), 'h');
document.querySelectorAll('#grupos a[href="../grupos.html"]').forEach(a => a.href = urlPagina('grupos'));

// Colunas: a coluna do dia como principal (à direita) e, à esquerda, as outras colunas num carrossel vertical (4 por vez).
// Usa COLUNISTAS/COLUNA_DO_DIA/TODAS_COLUNAS (colunas-dados.js).
const comLogo = texto => texto.replace('SoftLiving', LOGO);
const colunistaDe = c => COLUNISTAS.find(col => c.a.startsWith(col.nome));
const rotuloColuna = col => col.coluna ? comLogo(col.coluna) : col.categoria;
const colDoDia = COLUNISTAS.find(col => col.nome === COLUNA_DO_DIA.colunista);
const ultimaDoDia = TODAS_COLUNAS().find(c => c.t === COLUNA_DO_DIA.ultima);
document.getElementById('colPrincipal').innerHTML = `
  <div class="imgw foto"><img src="${fotoUrl(ultimaDoDia.foto, 1100)}" alt=""></div>${botaoSalvar}
  <span class="cat">Coluna do dia · ${rotuloColuna(colDoDia)}</span>
  <h3>${ultimaDoDia.t}</h3><p>${colDoDia.bio.split('. ')[0]}.</p>
  <div class="meta"><span>${colDoDia.nome}</span><i></i><span>${colDoDia.categoria}</span></div>`;
// as outras colunas em ordem sorteada a cada carregamento (a coluna do dia continua fixa)
document.getElementById('colLista').innerHTML = embaralhar(TODAS_COLUNAS().filter(c => c !== ultimaDoDia))
  .map(c => {
    const col = colunistaDe(c);
    return `
  <a href="colunas.html" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">${botaoSalvar}
    <div><span class="cat">${rotuloColuna(col)}</span><h3>${comLogo(c.t)}</h3>
    <div class="meta"><span>${col.nome}</span></div></div></a>`;
  }).join('');
ativarCarrossel(document.getElementById('colLista'), 'v');

// Newsletter (demonstração)
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<span class="ok">Pronto! Esta é só uma demonstração.</span>';
});
