// VERSÃO 2 · Cartões e dados comuns da Conteúdos (conteudos.js) e das páginas de cada assunto (assunto.js): lista de
// assuntos, sorteio da visita e os cartões em vários tamanhos. Usa CONTEUDOS (conteudos-dados.js) e o layout.js.

// Assuntos: [rótulo curto, categoria dos dados, id do bloco na Conteúdos, endereço da página do assunto, frase do assunto]
// (mesma ordem de assuntos da Início, mais SoftLiving). Cada assunto tem página própria: assunto.html?a=<endereço>.
const CT_ASSUNTOS = [
  ['Todos', null, 'ctLista', null, ''],
  ['Bem-estar', 'Saúde mental e qualidade de vida', null, 'bem-estar', 'Saúde mental, conexões e qualidade de vida.'],
  ['Saúde', 'Saúde e bem-estar físico', 'ct-saude', 'saude', 'Corpo em movimento, prevenção e bons hábitos.'],
  ['Estilo e casa', 'Estilo de vida e consumo', 'ct-estilo-e-casa', 'estilo-e-casa', 'Moda, casa e consumo com mais sentido.'],
  ['Viagem', 'Turismo e viagem', 'ct-viagem', 'viagem', 'Destinos para ir com calma, roteiros e boas mesas pelo caminho.'],
  ['Tecnologia', 'Tecnologia e serviços digitais', 'ct-tecnologia', 'tecnologia', 'Tecnologia a seu favor, sem medo: celular, segurança e inteligência artificial.'],
  [LOGO, 'SoftLiving', 'ct-softliving', 'softliving', 'Cartas, novidades e bastidores de quem faz a SoftLiving.'],
];
const urlAssunto = slug => `${LAYOUT_ROOT}assunto.html?a=${slug}`;
const ctRotulo = cat => { const a = CT_ASSUNTOS.find(x => x[1] === cat); return a ? a[0] : cat; };
// Sorteio a cada visita (como na Início): a ordem dentro de cada bloco, quem vai no cartão grande, a coleção e a
// posição dos blocos de assunto mudam sempre que a página abre
const CT_SORTEIO = embaralhar(CONTEUDOS);
const ctDoAssunto = cat => CT_SORTEIO.filter(c => c.cat === cat);
const ctPorTitulo = t => CONTEUDOS.find(c => c.t === t);

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
      <div class="vc-row">${seloAcesso(c)}</div>
    </div>
  </a>`;
// Foto com o texto por cima; a versão grande mostra também o resumo
const ctTile = (c, grande) => `
  <a href="${urlConteudo(c.t)}" class="ct-tile${grande ? ' grande' : ''}" style="background-image:url('${fotoUrl(c.foto, grande ? 1000 : 600)}')">
    ${ctSalvar}
    <div class="ct-tile-txt">
      ${seloAcesso(c)}
      <span class="vc-cat">${ctRotulo(c.cat)}</span>
      <h3>${c.t}</h3>
      ${grande ? `<p>${c.e}</p>` : ''}
      <span class="vc-autor">${c.a}</span>
    </div>
  </a>`;
// Linha com miniatura (coleções e listas)
const ctMini = c => `
  <a href="${urlConteudo(c.t)}" class="vt-mini">
    <img src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">
    <div><span class="vt-mini-cat">${ctRotulo(c.cat)}</span><h3>${c.t}</h3><p>${c.e}</p><span class="ct-mini-autor">${c.a}${seloAcesso(c)}</span></div>
  </a>`;
// Item de lista (o mesmo da Início e da Busca): miniatura, assunto, título, autor e preço
const ctItem = c => `
  <a href="${urlConteudo(c.t)}" class="item"><img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">${ctSalvar}
    <div><span class="cat">${ctRotulo(c.cat)}</span><h3>${c.t}</h3>
    <div class="meta"><span>${c.a}</span>${seloAcesso(c)}</div></div></a>`;
