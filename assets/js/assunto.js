// VERSÃO 2 · Página de um assunto (assunto.html?a=<endereço>): os conteúdos de Bem-estar, Saúde, Estilo e casa, Viagem,
// Tecnologia ou SoftLiving, no visual de revista da Conteúdos. Usa os cartões de conteudos-cartoes.js; a ordem é sorteada
// a cada visita (CT_SORTEIO). Endereço desconhecido volta para a Conteúdos.
const AS_I = CT_ASSUNTOS.findIndex(a => a[3] && a[3] === new URLSearchParams(location.search).get('a'));
if(AS_I < 0) location.replace(urlPagina('conteudos'));
const [asRotulo, asCat, , asSlug, asFrase] = CT_ASSUNTOS[Math.max(AS_I, 1)];
const asItens = ctDoAssunto(asCat);
const asEstado = { tipo:'todos' };
const asNomeTexto = asCat === 'SoftLiving' ? 'SoftLiving' : asRotulo;

// Topo: assunto em destaque e quantos conteúdos tem
document.title = `${asNomeTexto} · Conteúdos · SoftLiving (Protótipo · versão 2)`;
document.getElementById('asKicker').innerHTML = `<a href="${urlPagina('conteudos')}">Conteúdos</a> · ${asItens.length} ${asItens.length === 1 ? 'conteúdo' : 'conteúdos'}`;
document.getElementById('asTitulo').innerHTML = asCat === 'SoftLiving' ? `Palavra da ${LOGO}` : `<span class="hl">${asRotulo}</span>`;
document.getElementById('asFrase').textContent = asFrase;

// Círculos: todos os assuntos, o atual marcado; "Todos" volta para a lista completa da Conteúdos
document.getElementById('asCirculos').innerHTML = CT_ASSUNTOS.map(([r, cat, , slug], i) => {
  const c = cat ? ctDoAssunto(cat)[0] : CT_SORTEIO[0];
  const href = slug ? urlAssunto(slug) : `${urlPagina('conteudos')}#ctLista`;
  return `<a href="${href}" class="vt-cat${i === AS_I ? ' on' : ''}"${i === AS_I ? ' aria-current="page"' : ''}><img src="${fotoUrl(c.foto, 200)}" alt=""><span>${r}</span></a>`;
}).join('');

// Destaque: o primeiro sorteado, em faixa larga
const [asPrimeiro, ...asResto] = asItens;
document.getElementById('asDestaque').innerHTML = `
  <a href="${urlConteudo(asPrimeiro.t)}" class="ct-faixa" style="background-image:url('${fotoUrl(asPrimeiro.foto, 1400)}')">
    ${ctSalvar}
    <div class="ct-faixa-txt">
      <span class="vc-cat">Em destaque · ${ctPrecoTexto(asPrimeiro)}</span>
      <h3>${asPrimeiro.t}</h3>
      <p>${asPrimeiro.e}</p>
    </div>
  </a>`;

// Mais do assunto: mosaico (com um cartão grande quando há conteúdos suficientes); some se não houver mais nenhum
const asMosaico = document.getElementById('asMosaico');
if(asResto.length){
  asMosaico.innerHTML = ctTitulo(`Mais de ${asNomeTexto}`, 'Para ler agora ou guardar para depois.') +
    `<div class="ct-mosaico">${asResto.map((c, i) => ctTile(c, i === 0 && asResto.length >= 3)).join('')}` +
    // fecha a grade: leva à lista completa do assunto, logo abaixo
    `<a href="#asLista" class="ct-ver-todos" style="${ctVerSpan(asResto.length, asResto.length >= 3)}"><b>Todos de ${asNomeTexto}</b><span>${asItens.length} conteúdos ${icone('seta')}</span></a></div>`;
} else asMosaico.remove();

// Todos do assunto: Todos/Grátis/Premium e lista em 3 colunas (só com mais de um conteúdo)
const asLista = document.getElementById('asLista');
function renderLista(){
  const nGratis = asItens.filter(c => c.badge === 'gratis').length;
  const tipos = [['todos', 'Todos', asItens.length], ['gratis', 'Grátis', nGratis], ['premium', 'Premium', asItens.length - nGratis]];
  document.getElementById('asTipos').innerHTML = tipos.map(([k, l, n]) => `<button type="button" role="tab" class="${k === asEstado.tipo ? 'on' : ''}" aria-selected="${k === asEstado.tipo}" data-tipo="${k}">${l} <small>${n}</small></button>`).join('');
  const lista = asItens.filter(c => asEstado.tipo === 'todos' || (asEstado.tipo === 'gratis' ? c.badge === 'gratis' : c.badge !== 'gratis'));
  document.getElementById('asItens').innerHTML = lista.map(ctItem).join('');
  document.getElementById('asVazio').hidden = lista.length > 0;
  marcarSalvos();
}
if(asItens.length > 1){
  document.getElementById('asListaTitulo').textContent = `Todos de ${asNomeTexto}`;
  document.getElementById('asTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ asEstado.tipo = b.dataset.tipo; renderLista(); } });
  renderLista();
} else asLista.remove();

// Leia também: 8 conteúdos sorteados de outros assuntos, em carrossel
document.getElementById('asTambem').innerHTML = CT_SORTEIO.filter(c => c.cat !== asCat).slice(0, 8).map(ctVertical).join('');
ativarCarrossel(document.getElementById('asTambem'), 'h');

document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  const salvo = alternarSalvo(fav);
  mostrarAviso(salvo ? 'Salvo para ler depois' : 'Removido dos salvos');
});
marcarSalvos();
