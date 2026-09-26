// VERSÃO 2 · Tela Início: "Explore por assunto", "Últimas matérias" e "Acontece nos grupos".
// Usa CONTEUDOS (conteudos-dados.js), GRUPOS (grupos-dados.js) e fotoUrl/urlPagina/mostrarAviso (layout.js).

// Sem tempo de leitura e sem data de publicação em nenhum lugar (pedido do usuário)
const ITENS = CONTEUDOS;

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
  const lista = ITENS.filter(c => !cat || c.cat === cat).slice(0, 4);
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
}
tabs.addEventListener('click', e => { const b = e.target.closest('button'); if(b) mostrarAssunto(+b.dataset.i); });
// Botão salvar (cartões, destaque e lista): marca e desmarca, sem abrir o conteúdo
document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  fav.classList.toggle('on');
  mostrarAviso(fav.classList.contains('on') ? 'Salvo para ler depois' : 'Removido dos salvos');
});
mostrarAssunto(0);

// Últimas matérias: a matéria em destaque e mais quatro
const destaque = ITENS.find(c => c.destaque);
document.getElementById('lead').innerHTML = `
  <div class="imgw foto"><img src="${fotoUrl(destaque.foto, 1100)}" alt=""></div>${botaoSalvar}
  <span class="cat">${assuntoCurto(destaque.cat)}</span>
  <h3>${destaque.t}</h3><p>${destaque.e}</p>
  <div class="meta"><span>${destaque.a}</span></div>`;
document.getElementById('list').innerHTML = [1, 12, 7, 2].map(i => ITENS[i]).map(c => `
  <a href="#" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">${botaoSalvar}
    <div><span class="cat">${assuntoCurto(c.cat)}</span><h3>${c.t}</h3>
    <div class="meta"><span>${c.a}</span></div></div></a>`).join('');
document.getElementById('verTodas').href = urlPagina('conteudos');

// Acontece nos grupos: três grupos em destaque (abrem a página interna da versão 1 por enquanto)
document.getElementById('groupList').innerHTML = ['Clube do Vinho', 'Yoga & Meditação', 'Clube do Livro'].map(nome => {
  const g = GRUPOS.find(x => x.t === nome);
  const n = GRUPOS.indexOf(g);
  return `
  <a href="${V1_ROOT}grupo.html?g=${n}" class="vcard">
    <img src="${fotoUrl(g.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    ${g.novos ? `<span class="new">${g.novos} novas</span>` : ''}
    <div class="vc-info">
      <span class="vc-cat">${g.cat}</span>
      <h3>${g.t}</h3>
      <div class="vc-row"><span class="vc-chip" title="${g.membros} ${g.membros === 1 ? 'membro' : 'membros'}">${icone('grupos')}${g.membros}</span><span class="vc-btn">${g.participando ? 'Ver grupo' : 'Participar ' + icone('mais')}</span></div>
    </div></a>`;
}).join('');
document.querySelectorAll('#grupos a[href="../grupos.html"]').forEach(a => a.href = urlPagina('grupos'));

// Newsletter (demonstração)
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<span class="ok">Pronto! Esta é só uma demonstração.</span>';
});
