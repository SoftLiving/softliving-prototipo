// VERSÃO 2 · Tela Conteúdos (referência: conteudos.js da versão 1): busca, destaque, assuntos (fichário),
// Todos/Grátis/Premium e grade de cartões verticais. Usa CONTEUDOS (conteudos-dados.js) e fotoUrl/icone/mostrarAviso (layout.js).

// Assuntos: rótulo curto da aba → categoria dos dados (mesma ordem de assuntos da Início, mais SoftLiving)
const CT_ASSUNTOS = [
  ['Todos', null],
  ['Bem-estar', 'Saúde mental e qualidade de vida'],
  ['Saúde', 'Saúde e bem-estar físico'],
  ['Estilo e casa', 'Estilo de vida e consumo'],
  ['Viagem', 'Turismo e viagem'],
  ['Tecnologia', 'Tecnologia e serviços digitais'],
  [LOGO, 'SoftLiving'],
];
const ctRotulo = cat => { const a = CT_ASSUNTOS.find(x => x[1] === cat); return a ? a[0] : cat; };
const ctEstado = { assunto:0, tipo:'todos', busca:'' };

const ctPreco = c => c.badge === 'premium'
  ? `<span class="vc-chip premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>`
  : c.badge === 'destravado' ? '<span class="vc-chip">Destravado</span>' : '<span class="vc-chip">Grátis</span>';
const ctBotao = c => c.badge === 'premium'
  ? `<span class="vc-btn" data-destravar="${c.credits}">Destravar ${icone('seta')}</span>`
  : `<span class="vc-btn">Ler ${icone('seta')}</span>`;
const ctSalvar = `<button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button>`;

// Ordem aleatória a cada carregamento; o destaque é o primeiro da ordem sorteada
const CT_ORDEM = embaralhar(CONTEUDOS);
const ctD = CT_ORDEM[0];
document.getElementById('ctDestaque').href = urlConteudo(ctD.t);
document.getElementById('ctDestaque').innerHTML = `
  <div class="dl-foto foto"><img src="${fotoUrl(ctD.foto, 1000)}" alt=""></div>
  <div class="dl-texto">
    <span class="kicker">Em destaque</span>
    <span class="cat">${ctRotulo(ctD.cat)}</span>
    <h2>${ctD.t}</h2>
    <p>${ctD.e}</p>
    <div class="meta"><span>${ctD.a}</span></div>
    <span class="btn">Ler agora ${icone('seta')}</span>
  </div>`;

function renderConteudos(){
  const abas = document.getElementById('ctAssuntos');
  abas.innerHTML = CT_ASSUNTOS.map((a, i) => `<button type="button" role="tab" class="${i === ctEstado.assunto ? 'on' : ''}" aria-selected="${i === ctEstado.assunto}" data-i="${i}">${a[0]}</button>`).join('');

  const cat = CT_ASSUNTOS[ctEstado.assunto][1];
  const q = ctEstado.busca.toLowerCase();
  const porAssuntoEBusca = CT_ORDEM.filter(c => (!cat || c.cat === cat) && (!q || `${c.t} ${c.a} ${c.cat} ${c.e}`.toLowerCase().includes(q)));
  const nGratis = porAssuntoEBusca.filter(c => c.badge === 'gratis').length;
  const tipos = [['todos', 'Todos', porAssuntoEBusca.length], ['gratis', 'Grátis', nGratis], ['premium', 'Premium', porAssuntoEBusca.length - nGratis]];
  document.getElementById('ctTipos').innerHTML = tipos.map(([k, l, n]) => `<button type="button" role="tab" class="${k === ctEstado.tipo ? 'on' : ''}" aria-selected="${k === ctEstado.tipo}" data-tipo="${k}">${l} <small>${n}</small></button>`).join('');

  const lista = porAssuntoEBusca.filter(c => ctEstado.tipo === 'todos' || (ctEstado.tipo === 'gratis' ? c.badge === 'gratis' : c.badge !== 'gratis'));
  document.getElementById('ctGrade').innerHTML = lista.map(c => `
    <a href="${urlConteudo(c.t)}" class="vcard">
      <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      ${ctSalvar}
      <div class="vc-info">
        <span class="vc-cat">${ctRotulo(c.cat)}</span>
        <h3>${c.t}</h3>
        <span class="vc-autor">${c.a}</span>
        <div class="vc-row">${ctPreco(c)}${ctBotao(c)}</div>
      </div>
    </a>`).join('');
  document.getElementById('ctVazio').hidden = lista.length > 0;
}

document.getElementById('ctAssuntos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ctEstado.assunto = +b.dataset.i; renderConteudos(); } });
document.getElementById('ctTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ctEstado.tipo = b.dataset.tipo; renderConteudos(); } });
document.getElementById('ctGrade').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(fav){
    e.preventDefault();
    const salvo = alternarSalvo(fav);
    mostrarAviso(salvo ? 'Salvo para ler depois' : 'Removido dos salvos');
    return;
  }
  // "Destravar" abre a leitura, onde fica o convite para destravar com créditos
});
renderConteudos();
