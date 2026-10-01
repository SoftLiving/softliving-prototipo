// VERSÃO 2 · Tela Conteúdos: visual de revista, na mesma estrutura da Vitrine. Assuntos em círculos, carrossel em
// destaque, coleções (foto grande e três conteúdos ao lado), um bloco por assunto com um layout diferente para cada
// (mosaico, lista em duas colunas, dupla lado a lado, faixa larga, carta) e, no fim, a lista completa com o fichário de
// assuntos e Todos/Grátis/Premium. Usa CONTEUDOS (conteudos-dados.js) e fotoUrl/icone/mostrarAviso (layout.js).

// Assuntos: rótulo curto → categoria dos dados (mesma ordem de assuntos da Início, mais SoftLiving); id do bloco na página
const CT_ASSUNTOS = [
  ['Todos', null, 'ctLista'],
  ['Bem-estar', 'Saúde mental e qualidade de vida', 'ct-bem-estar'],
  ['Saúde', 'Saúde e bem-estar físico', 'ct-saude'],
  ['Estilo e casa', 'Estilo de vida e consumo', 'ct-estilo-e-casa'],
  ['Viagem', 'Turismo e viagem', 'ct-viagem'],
  ['Tecnologia', 'Tecnologia e serviços digitais', 'ct-tecnologia'],
  [LOGO, 'SoftLiving', 'ct-softliving'],
];
const ctRotulo = cat => { const a = CT_ASSUNTOS.find(x => x[1] === cat); return a ? a[0] : cat; };
// Sorteio a cada visita (como na Início): a ordem dentro de cada bloco, quem vai no cartão grande, a coleção e a
// posição dos blocos de assunto mudam sempre que a página abre
const CT_SORTEIO = embaralhar(CONTEUDOS);
const ctDoAssunto = cat => CT_SORTEIO.filter(c => c.cat === cat);
const ctPorTitulo = t => CONTEUDOS.find(c => c.t === t);
const ctEstado = { assunto:0, tipo:'todos', busca:'' };

const ctPreco = c => c.badge === 'premium'
  ? `<span class="vc-chip premium">${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>`
  : c.badge === 'destravado' ? '<span class="vc-chip">Destravado</span>' : '<span class="vc-chip">Grátis</span>';
const ctPrecoTexto = c => c.badge === 'premium' ? `${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}` : c.badge === 'destravado' ? 'Destravado' : 'Grátis';
const ctBotao = c => c.badge === 'premium'
  ? `<span class="vc-btn" data-destravar="${c.credits}">Destravar ${icone('seta')}</span>`
  : `<span class="vc-btn">Ler ${icone('seta')}</span>`;
const ctSalvar = `<button type="button" class="fav" title="Salvar para ler depois" aria-label="Salvar para ler depois">${icone('salvar')}</button>`;
const ctTitulo = (t, sub) => `<div class="vt-titulo"><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;

// Cartões (cada bloco usa um ou mais destes, em tamanhos diferentes)
const ctVertical = c => `
  <a href="${urlConteudo(c.t)}" class="vcard">
    <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    ${ctSalvar}
    <div class="vc-info">
      <span class="vc-cat">${ctRotulo(c.cat)}</span>
      <h3>${c.t}</h3>
      <span class="vc-autor">${c.a}</span>
      <div class="vc-row">${ctPreco(c)}${ctBotao(c)}</div>
    </div>
  </a>`;
// Foto com o texto por cima; a versão grande mostra também o resumo
const ctTile = (c, grande) => `
  <a href="${urlConteudo(c.t)}" class="ct-tile${grande ? ' grande' : ''}" style="background-image:url('${fotoUrl(c.foto, grande ? 1000 : 600)}')">
    ${ctSalvar}
    <div class="ct-tile-txt">
      <span class="vc-cat">${ctRotulo(c.cat)} · ${ctPrecoTexto(c)}</span>
      <h3>${c.t}</h3>
      ${grande ? `<p>${c.e}</p>` : ''}
      <span class="vc-autor">${c.a}</span>
    </div>
  </a>`;
// Linha com miniatura (coleções e listas)
const ctMini = c => `
  <a href="${urlConteudo(c.t)}" class="vt-mini">
    <img src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">
    <div><span class="vt-mini-cat">${ctRotulo(c.cat)} · ${ctPrecoTexto(c)}</span><h3>${c.t}</h3><p>${c.e}</p><span class="ct-mini-autor">${c.a}</span></div>
  </a>`;
// Item de lista (o mesmo da Início e da Busca): miniatura, assunto, título, autor e preço
const ctItem = c => `
  <a href="${urlConteudo(c.t)}" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">${ctSalvar}
    <div><span class="cat">${ctRotulo(c.cat)}</span><h3>${c.t}</h3>
    <div class="meta"><span>${c.a}</span><span class="ct-item-preco${c.badge === 'premium' ? ' premium' : ''}">${ctPrecoTexto(c)}</span></div></div></a>`;
// "Ver todos" de um assunto: leva à lista completa já filtrada
const ctVerTodos = i => `<button type="button" class="ct-ver-todos" data-ver="${i}"><b>Ver todos de ${CT_ASSUNTOS[i][0]}</b><span>${ctDoAssunto(CT_ASSUNTOS[i][1]).length} conteúdos ${icone('seta')}</span></button>`;

// 1) Assuntos em círculos, com a foto de um conteúdo de cada assunto
document.getElementById('ctCirculos').innerHTML = CT_ASSUNTOS.map(([r, cat, id]) => {
  const c = cat ? ctDoAssunto(cat)[0] : CT_SORTEIO[0];
  return `<a href="#${id}" class="vt-cat"><img src="${fotoUrl(c.foto, 200)}" alt=""><span>${r}</span></a>`;
}).join('');

// 2) Em destaque: 8 sorteados a cada visita, em carrossel
document.getElementById('ctDestaques').innerHTML = embaralhar(CONTEUDOS).slice(0, 8).map(ctVertical).join('');
ativarCarrossel(document.getElementById('ctDestaques'), 'h');

// 3) Coleção com curadoria: foto grande e três conteúdos ao lado; a coleção e a ordem dos itens são sorteadas
const CT_COLECOES = [
  { t:'Viver mais e melhor', d:'Longevidade, hábitos e pequenas escolhas que fazem diferença em qualquer idade.', foto:'1529156069898-49953e39b3ac',
    itens:['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'Longevidade', 'Você faz isso pela manhã?', 'Caminhar: o exercício mais subestimado', 'Check-up sem medo'] },
  { t:'Pequenos prazeres', d:'Encontros, viagens sem pressa e o que realmente vale o nosso tempo.', foto:'1470252649378-9c29740c9fa8',
    itens:['Descubra novos pequenos prazeres da vida!', 'O bem-estar do encontro presencial', 'Na Suíça, um vinho para chamar de seu', 'A Coragem de Mudar de Direção', 'O luxo de hoje é outra coisa'] },
  { t:'Tecnologia sem medo', d:'Inteligência artificial, segurança e conexão: a tecnologia a favor da vida madura.', foto:'1677442136019-21780ecad995',
    itens:['Meu primeiro agente de IA', 'Agente de IA anti-golpe', 'Mais conexão, menos solidão', 'WhatsApp sem segredos', 'Senhas fortes sem dor de cabeça'] },
];
const col = embaralhar(CT_COLECOES)[0];
document.getElementById('ctColecao1').innerHTML = `
  <article class="vt-colecao">
    <div class="vt-col-capa" style="background-image:url('${fotoUrl(col.foto, 900)}')">
      <div><p class="kicker">Coleção</p><h2>${col.t}</h2><p>${col.d}</p></div>
    </div>
    <div class="vt-col-lista" id="ctColLista">${embaralhar(col.itens).map(ctPorTitulo).filter(Boolean).map(ctMini).join('')}</div>
  </article>`;
ativarCarrossel(document.getElementById('ctColLista'), 'v', 3);   // 3 por vez, com setas (como as listas da Início)

// 4) Um bloco por assunto, cada um com um layout
const ctBloco = (i, sub, corpo) => { document.getElementById(CT_ASSUNTOS[i][2]).innerHTML = ctTitulo(CT_ASSUNTOS[i][0], sub) + corpo; };
// Bem-estar: mosaico (um grande e os outros menores) e o "ver todos" fechando a grade
const bemEstar = ctDoAssunto(CT_ASSUNTOS[1][1]);
ctBloco(1, 'Saúde mental, conexões e qualidade de vida.', `
  <div class="ct-mosaico">${bemEstar.map((c, i) => ctTile(c, i === 0)).join('')}${ctVerTodos(1)}</div>`);
// Estilo e casa: formato de coleção invertida, um conteúdo na foto grande e os outros ao lado
const estilo = ctDoAssunto(CT_ASSUNTOS[3][1]), moda = estilo[0];   // o primeiro sorteado vai na foto grande
ctBloco(3, 'Moda, casa e consumo com mais sentido.', `
  <article class="vt-colecao invertida">
    <a href="${urlConteudo(moda.t)}" class="vt-col-capa" style="background-image:url('${fotoUrl(moda.foto, 900)}')">
      <div><p class="kicker">Estilo e casa · ${ctPrecoTexto(moda)}</p><h2>${moda.t}</h2><p>${moda.e}</p></div>
    </a>
    <div class="vt-col-lista" id="ctEstiloLista">${estilo.filter(c => c !== moda).map(ctMini).join('')}</div>
  </article>`);
ativarCarrossel(document.getElementById('ctEstiloLista'), 'v', 3);
// Saúde e Tecnologia: lado a lado, um cartão de foto e a lista dos outros (3 por vez, em carrossel) em cada
[[2, 'Corpo em movimento e bons hábitos.'], [5, 'Tecnologia a seu favor, sem medo.']].forEach(([i, sub]) => {
  const [a, ...resto] = ctDoAssunto(CT_ASSUNTOS[i][1]);
  ctBloco(i, sub, `<div class="ct-coluna">${ctTile(a, true)}<div class="ct-coluna-lista" id="ctLista${i}">${resto.map(ctItem).join('')}</div></div>`);
  ativarCarrossel(document.getElementById('ctLista' + i), 'v', 3);
});
// Viagem: faixa larga com o conteúdo do assunto
const viagem = ctDoAssunto(CT_ASSUNTOS[4][1])[0];
ctBloco(4, 'Destinos para ir com calma.', `
  <a href="${urlConteudo(viagem.t)}" class="ct-faixa" style="background-image:url('${fotoUrl(viagem.foto, 1400)}')">
    ${ctSalvar}
    <div class="ct-faixa-txt">
      <span class="vc-cat">Viagem · ${ctPrecoTexto(viagem)}</span>
      <h3>${viagem.t}</h3>
      <p>${viagem.e}</p>
      <span class="vc-btn">Ler ${icone('seta')}</span>
    </div>
  </a>`);
// SoftLiving: carta em destaque
const carta = ctDoAssunto('SoftLiving')[0];
document.getElementById('ct-softliving').innerHTML = `
  <a href="${urlConteudo(carta.t)}" class="ct-carta">
    <img src="${fotoUrl(carta.foto, 600)}" alt="" loading="lazy">
    <div>
      <p class="kicker">Palavra da ${LOGO}</p>
      <h3>${carta.t}</h3>
      <p>${carta.e}</p>
      <span class="ct-carta-autor">${carta.a}</span>
    </div>
  </a>`;

// Posição dos blocos de assunto sorteada a cada visita (o patrocinador continua entre a coleção e eles); Saúde e
// Tecnologia também trocam de lado
const ctAncora = document.querySelector('main .apoio');
embaralhar(['ct-bem-estar', 'ct-estilo-e-casa', 'ct-dupla', 'ct-viagem']).forEach((id, i) => {
  const el = id === 'ct-dupla' ? document.querySelector('.ct-dupla') : document.getElementById(id);
  if(i === 0) ctAncora.before(el); else document.getElementById('ct-softliving').before(el);
});
if(Math.random() < .5) document.querySelector('.ct-dupla').append(document.getElementById('ct-saude'));

// 5) Todos os conteúdos: fichário de assuntos, Todos/Grátis/Premium e lista em 3 colunas (ordem sorteada a cada visita)
const CT_ORDEM = embaralhar(CONTEUDOS);
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
  document.getElementById('ctGrade').innerHTML = lista.map(ctItem).join('');
  document.getElementById('ctVazio').hidden = lista.length > 0;
  marcarSalvos();
}

document.getElementById('ctAssuntos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ctEstado.assunto = +b.dataset.i; renderConteudos(); } });
document.getElementById('ctTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ctEstado.tipo = b.dataset.tipo; renderConteudos(); } });
document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(fav){
    e.preventDefault();
    const salvo = alternarSalvo(fav);
    mostrarAviso(salvo ? 'Salvo para ler depois' : 'Removido dos salvos');
    return;
  }
  const ver = e.target.closest('[data-ver]');
  if(ver){                                                         // "Ver todos de X": lista completa já filtrada
    ctEstado.assunto = +ver.dataset.ver; ctEstado.tipo = 'todos'; renderConteudos();
    document.getElementById('ctLista').scrollIntoView({ behavior:'smooth', block:'start' });
    return;
  }
  if(e.target.closest('.ct-quero')){ e.preventDefault(); mostrarAviso('Cadastro de especialistas: fora deste protótipo'); }
  // "Destravar" abre a leitura, onde fica o convite para destravar com créditos
});
renderConteudos();
