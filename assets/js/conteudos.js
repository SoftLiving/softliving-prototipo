// ===== Tela Conteúdos =====
const conteudosPage = document.getElementById('conteudosPage');
const ctState = { cat:'Todas as categorias', tab:'todos', q:'' };


CONTEUDOS.forEach(c => c.capa = sorteiaDegrade());
function ctCover(c){
  return `<div class="ct-ph" style="background:${c.capa};">${ICON[c.icon] || ICON.book}</div>`;
}
function ctBadge(c){
  if(c.badge === 'premium') return `<span class="ct-badge premium">${ICON.lock} ${c.credits} crédito${c.credits>1?'s':''}</span>`;
  if(c.badge === 'destravado') return `<span class="ct-badge destravado">${ICON.unlock} Destravado</span>`;
  return `<span class="ct-badge gratis">${ICON.unlock} Grátis</span>`;
}
function ctCta(c){
  if(c.badge === 'premium') return `<button type="button" class="ct-cta premium">${ICON.lock} Destravar · ${c.credits} crédito${c.credits>1?'s':''}</button>`;
  if(c.badge === 'destravado') return `<button type="button" class="ct-cta destravado">${ICON.unlock} Destravado · Ler agora</button>`;
  return `<button type="button" class="ct-cta gratis">${ICON.book} Ler agora</button>`;
}
function renderConteudosPage(){
  const cats = ['Todas as categorias', ...new Set(CONTEUDOS.map(c => c.cat))];
  document.getElementById('ctCats').innerHTML = cats.map(c => `<button type="button" class="in-pill ${c===ctState.cat?'active':''}" data-cat="${c}">${c}</button>`).join('');

  const q = ctState.q.toLowerCase();
  const byCatAndSearch = CONTEUDOS.filter(c =>
    (ctState.cat === 'Todas as categorias' || c.cat === ctState.cat) &&
    (!q || (c.t + ' ' + c.a + ' ' + c.cat + ' ' + c.e).toLowerCase().includes(q)));
  const nGratis = byCatAndSearch.filter(c => c.badge === 'gratis').length;
  const tabs = [['todos','Todos',byCatAndSearch.length],['gratis','Grátis',nGratis],['premium','Premium',byCatAndSearch.length - nGratis]];
  document.getElementById('ctTabs').innerHTML = tabs.map(([k,l,n]) => `<button type="button" class="ct-tab ${k===ctState.tab?'active':''}" data-tab="${k}">${l} (${n})</button>`).join('');

  const list = byCatAndSearch.filter(c => ctState.tab === 'todos' || (ctState.tab === 'gratis' ? c.badge === 'gratis' : c.badge !== 'gratis'));
  document.getElementById('ctGrid').innerHTML = list.map((c, i) => `
    <article class="ct-card">
      <div class="ct-cover">${ctCover(c, i)}${ctBadge(c)}</div>
      <div class="ct-body">
        <span class="ct-cat">${c.cat}</span>
        <h3 class="ct-title">${c.t}</h3>
        <p class="ct-excerpt">${c.e}</p>
        <p class="ct-author">${ICON.user} ${c.a}</p>
        ${ctCta(c)}
      </div>
    </article>`).join('');
  document.getElementById('ctEmpty').hidden = list.length > 0;

  const d = CONTEUDOS.find(c => c.destaque);
  document.getElementById('ctHighlight').innerHTML = `
    <span class="ct-hl-ph ct-cover"><span class="ct-ph" style="background:${d.capa};">${ICON[d.icon]}</span></span>
    <span><small>EM DESTAQUE</small><strong>${d.t}</strong><span class="ct-hl-a">${d.a}</span></span>`;
}
document.getElementById('ctCats').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if(b){ ctState.cat = b.dataset.cat; renderConteudosPage(); } });
document.getElementById('ctTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b){ ctState.tab = b.dataset.tab; renderConteudosPage(); } });
document.getElementById('ctSearch').addEventListener('input', e => { ctState.q = e.target.value.trim(); renderConteudosPage(); });
renderConteudosPage();
