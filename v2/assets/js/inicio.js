// VERSÃO 2 · Tela Início: colagem de abertura, "Explore por assunto", "Últimas matérias" e "Acontece nos grupos".
// Usa CONTEUDOS (conteudos-dados.js), GRUPOS (grupos-dados.js) e fotoUrl/urlPagina/mostrarAviso (layout.js).

// Tempo de leitura e data fictícios, estáveis por conteúdo
const ITENS = CONTEUDOS.map((c, i) => ({ ...c, min: 3 + (i * 7) % 6, dia: 25 - i }));

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
  ? `<span class="badge premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>`
  : `<span class="badge">Grátis</span>`;
const dataCurta = c => `${c.dia} set`;
const leitura = c => `${c.min} min de leitura`;

// Colagem de abertura: uma foto de cada assunto
const COLAGEM = [
  { cls:'a', foto:'1506377247377-2a5b3b417ebb', rotulo:'Turismo e viagem', w:700 },
  { foto:'1544367567-0f2fcb009e0b', rotulo:'Bem-estar', w:500 },
  { foto:'1586023492125-27b2c045efd7', rotulo:'Casa', w:500 },
  { cls:'d', foto:'1543269865-cbf427effbad', rotulo:'Encontros', w:900 },
];
document.getElementById('collage').insertAdjacentHTML('afterbegin', COLAGEM.map(f =>
  `<figure class="foto ${f.cls || ''}"><img src="${fotoUrl(f.foto, f.w)}" alt=""><figcaption>${f.rotulo}</figcaption></figure>`).join(''));

// Explore por assunto
const tabs = document.getElementById('tabs');
tabs.innerHTML = ASSUNTOS.map((a, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-i="${i}">${a[0]}</button>`).join('')
  + `<a href="${urlPagina('conteudos')}" class="btn ghost">Todos os assuntos</a>`;
function mostrarAssunto(i){
  const cat = ASSUNTOS[i][1];
  const lista = ITENS.filter(c => !cat || c.cat === cat).slice(0, 4);
  document.getElementById('cards').innerHTML = lista.map(c => `
    <a href="#" class="card">
      <div class="imgw foto"><img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy">${seloPreco(c)}
        <button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button></div>
      <h3>${c.t}</h3><small>${assuntoCurto(c.cat)} · ${leitura(c)}</small>
    </a>`).join('');
  tabs.querySelectorAll('button').forEach(b => {
    const on = +b.dataset.i === i;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on);
  });
}
tabs.addEventListener('click', e => { const b = e.target.closest('button'); if(b) mostrarAssunto(+b.dataset.i); });
document.getElementById('cards').addEventListener('click', e => {
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
  <div class="imgw foto"><img src="${fotoUrl(destaque.foto, 1100)}" alt=""></div>
  <span class="cat">${assuntoCurto(destaque.cat)}</span>
  <h3>${destaque.t}</h3><p>${destaque.e}</p>
  <div class="meta"><span>${destaque.a}</span><i></i><span>${dataCurta(destaque)}</span><i></i><span>${leitura(destaque)}</span></div>`;
document.getElementById('list').innerHTML = [1, 12, 7, 2].map(i => ITENS[i]).map(c => `
  <a href="#" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">
    <div><span class="cat">${assuntoCurto(c.cat)}</span><h3>${c.t}</h3>
    <div class="meta"><span>${dataCurta(c)}</span><i></i><span>${leitura(c)}</span></div></div></a>`).join('');
document.getElementById('verTodas').href = urlPagina('conteudos');

// Acontece nos grupos: três grupos em destaque (abrem a página interna da versão 1 por enquanto)
document.getElementById('groupList').innerHTML = ['Clube do Vinho', 'Yoga & Meditação', 'Clube do Livro'].map(nome => {
  const g = GRUPOS.find(x => x.t === nome);
  const n = GRUPOS.indexOf(g);
  return `
  <a href="${V1_ROOT}grupo.html?g=${n}" class="group foto"><img src="${fotoUrl(g.foto, 600)}" alt="" loading="lazy">
    ${g.novos ? `<span class="new">${g.novos} novas</span>` : ''}
    <div class="info"><div><b>${g.t}</b><small>${g.cat} · ${g.membros} ${g.membros === 1 ? 'membro' : 'membros'}</small></div></div></a>`;
}).join('');
document.querySelectorAll('#grupos a[href="../grupos.html"]').forEach(a => a.href = urlPagina('grupos'));

// Newsletter (demonstração)
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<span class="ok">Pronto! Esta é só uma demonstração.</span>';
});
