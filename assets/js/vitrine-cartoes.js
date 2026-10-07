// VERSÃO 2 · Cartões e dados comuns da Vitrine (vitrine.js) e da página de cada segmento (vitrine-segmento.js):
// depoimentos, bairros e os cartões de vitrine em vários formatos. Usa ESTABELECIMENTOS (estabelecimentos-dados.js) e o
// layout.js. Todo cartão de vitrine mostra o logo (iniciais), o segmento (categoria e bairro), o nome, o resumo, "Ver
// vitrine" e o botão salvar; não tem selo, porque tudo nas Vitrines é grátis.
const est = n => ESTABELECIMENTOS.find(e => e.n === n);
// Depoimentos de membros (box BRPCV). e: nome do estabelecimento; quem e grupo: quem escreveu
const VT_RECOMENDAS = [
  { e:'Vinhos da Serra', q:'A degustação de quinta virou nosso programa fixo. Explicam tudo sem pose nenhuma.', quem:'Helena M.', grupo:'Clube do Vinho', cor:'#7a3b52' },
  { e:'Estúdio Respira', q:'Turma pequena, professora atenta. Minhas costas agradecem toda semana.', quem:'Marcos T.', grupo:'Yoga & Meditação', cor:'#2f8578' },
  { e:'Padaria Fermento Lento', q:'O pão de fermentação natural mais honesto do bairro. Chego cedo para pegar quentinho.', quem:'Célia R.', grupo:'Amigos', cor:'#b0513a' },
  { e:'Bistrô Alecrim', q:'Mesa tranquila, comida de estação e ninguém apressa a conversa. Virou o lugar dos nossos aniversários.', quem:'Beatriz N.', grupo:'Clube do Filme', cor:'#5b4b8a' },
  { e:'Clínica Vitalis', q:'Fiz o check-up inteiro numa manhã e saí com tudo explicado, sem correria e sem termos difíceis.', quem:'Jorge A.', grupo:'Tecnologia Sem Medo', cor:'#8a6414' },
  { e:'Floricultura Ramo', q:'A assinatura de flores chega toda sexta. A casa fica outra, e eu não preciso lembrar de nada.', quem:'Lúcia C.', grupo:'Clube do Livro', cor:'#2f5d3a' },
];
// Bairros do box BPDVV: [bairro, foto]
const VT_BAIRROS = [
  ['Leblon', '1483729558449-99ef09a8c325'], ['Botafogo', '1516306580123-e6e52b1b7b5f'],
  ['Barra', '1507525428034-b723cf961d3e'], ['Jardim Botânico', '1470058869958-2a77ade41c02'],
];

const siglaDe = n => n.replace(/&/g, '').split(/\s+/).filter(p => p.length > 2 || /^[A-ZÀ-Ú]/.test(p)).slice(0, 2).map(p => p[0]).join('');
const monograma = e => `<span class="vt-logo" style="color:${e.cor}">${siglaDe(e.n)}</span>`;
const vtSalvar = e => `<button type="button" class="fav" data-vitrine="${e.id}" title="Salvar a vitrine" aria-label="Salvar a vitrine">${icone('salvar')}</button>`;
const vtTitulo = (t, sub) => `<div class="vt-titulo"><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;

// Cartão vertical com foto (box BEDHV)
const vtCartao = e => `
  <a href="${urlEstabelecimento(e)}" class="vcard vt-card">
    <img src="${fotoUrl(e.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    ${vtSalvar(e)}
    <div class="vc-info">
      ${monograma(e)}
      <span class="vc-cat">${e.cat} · ${e.bairro}</span>
      <h3>${e.n}</h3>
      <p class="vc-desc">${e.d}</p>
      <span class="vc-btn">Ver vitrine ${icone('seta')}</span>
    </div>
  </a>`;
// Destaque grande e item de lista (boxes BDELDV e BDDLEV)
const vtDestaque = e => `
    <a href="${urlEstabelecimento(e)}" class="destaque vt-destaque">
      <div class="imgw foto"><img src="${fotoUrl(e.foto, 1100)}" alt="">${monograma(e)}</div>${vtSalvar(e)}
      <span class="cat">${e.cat} · ${e.bairro}</span>
      <h3>${e.n}</h3><p>${e.d}</p>
      <span class="btn ghost vt-ver">Ver vitrine ${icone('seta')}</span>
    </a>`;
const vtItem = e => `
  <a href="${urlEstabelecimento(e)}" class="item vt-item"><img class="foto" src="${fotoUrl(e.foto, 300)}" alt="" loading="lazy">${vtSalvar(e)}
    <div><span class="cat">${e.cat} · ${e.bairro}</span><h3>${e.n}</h3><p>${e.d}</p>
    <span class="vt-ver-link">Ver vitrine ${icone('seta')}</span></div></a>`;
// Box BDELDV (destaque à esquerda, lista à direita) ou BDDLEV (o espelho, com espelhado = true). idLista: id da lista,
// para ligar o carrossel vertical depois (ativarCarrossel(el, 'v')).
const vtBoxDestaqueLista = (lista, idLista, espelhado) => {
  const [primeiro, ...resto] = lista;
  const itens = `<div class="list" id="${idLista}">${resto.map(vtItem).join('')}</div>`;
  return `<div class="stories${espelhado ? ' invertida' : ''}">${espelhado ? itens + vtDestaque(primeiro) : vtDestaque(primeiro) + itens}</div>`;
};
// Box BSD com uma vitrine: faixa larga com a foto de fundo
const vtSuperDestaque = e => `
  <a href="${urlEstabelecimento(e)}" class="ct-faixa vt-faixa" style="background-image:url('${fotoUrl(e.foto, 1400)}')">
    ${vtSalvar(e)}
    <div class="ct-faixa-txt">
      ${monograma(e)}
      <span class="vc-cat">${e.cat} · ${e.bairro}</span>
      <h3>${e.n}</h3>
      <p>${e.d}</p>
      <span class="vc-btn">Ver vitrine ${icone('seta')}</span>
    </div>
  </a>`;
// Box BDS com uma vitrine: box claro, foto quadrada à esquerda e texto à direita
const vtDestaqueSimples = (e, etiqueta) => `
  <a href="${urlEstabelecimento(e)}" class="ct-carta vt-carta">
    <img src="${fotoUrl(e.foto, 600)}" alt="" loading="lazy">
    ${vtSalvar(e)}
    <div>
      <p class="kicker">${etiqueta}</p>
      <h3>${e.n}</h3>
      <p>${e.d}</p>
      <span class="ct-carta-autor">${e.cat} · ${e.bairro}</span>
      <span class="btn ghost vt-ver">Ver vitrine ${icone('seta')}</span>
    </div>
  </a>`;
// Box BDVV (Box dois verticais vitrine): duas colunas lado a lado, uma para cada segmento. Em cada coluna, o título e o
// subtítulo do segmento, uma capa (foto com o texto por cima) e, embaixo, a lista das outras vitrines em carrossel
// vertical, 3 por vez. É a versão de vitrine do BDVC (Box dois verticais conteúdos), da página Conteúdos.
const vtCapa = e => `
  <a href="${urlEstabelecimento(e)}" class="ct-tile grande vt-capa-card" style="background-image:url('${fotoUrl(e.foto, 1000)}')">
    ${vtSalvar(e)}
    <div class="ct-tile-txt">
      ${monograma(e)}
      <span class="vc-cat">${e.cat} · ${e.bairro}</span>
      <h3>${e.n}</h3>
      <p>${e.d}</p>
      <span class="vc-btn">Ver vitrine ${icone('seta')}</span>
    </div>
  </a>`;
const vtItemCompacto = e => `
  <a href="${urlEstabelecimento(e)}" class="item vt-item-compacto"><img class="foto" src="${fotoUrl(e.foto, 300)}" alt="" loading="lazy">${vtSalvar(e)}
    <div><span class="cat">${e.cat} · ${e.bairro}</span><h3>${e.n}</h3>
    <div class="meta"><span class="vt-ver-link">Ver vitrine ${icone('seta')}</span></div></div></a>`;
// colunas: [[título, subtítulo, lista de estabelecimentos, id da lista], ...] (duas)
const vtBoxDoisVerticais = colunas => `<div class="ct-dupla">${colunas.map(([t, sub, lista, id]) => `
  <section class="vt-bloco">
    ${vtTitulo(t, sub)}
    <div class="ct-coluna">${vtCapa(lista[0])}<div class="ct-coluna-lista" id="${id}">${lista.slice(1).map(vtItemCompacto).join('')}</div></div>
  </section>`).join('')}</div>`;
// Depoimento (box BRPCV)
const vtReco = r => { const e = est(r.e); return `
  <a href="${urlEstabelecimento(e)}" class="vt-reco">
    <div class="vt-reco-foto" style="background-image:url('${fotoUrl(e.foto, 600)}')">${monograma(e)}</div>
    ${vtSalvar(e)}
    <div class="vt-reco-txt">
      <span class="vt-mini-cat">${e.n} · ${e.bairro}</span>
      <blockquote>“${r.q}”</blockquote>
      <p class="vt-quem"><span class="av-col" style="background:${r.cor}">${siglaDe(r.quem)}</span><span><b>${r.quem}</b>do grupo ${r.grupo}</span></p>
    </div>
  </a>`; };
// Cartão de bairro (box BPDVV)
const vtBairro = ([b, f]) => {
  const n = ESTABELECIMENTOS.filter(e => e.bairro === b).length || 3;
  return `<a href="${urlBairroVitrine(b)}" class="vt-bairro" style="background-image:url('${fotoUrl(f, 600)}')"><span><b>${b}</b>${n} ${n === 1 ? 'lugar' : 'lugares'}</span></a>`;
};
// Bandeirinha dos cartões de vitrine: salva a vitrine sem abrir a página dela
document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(fav){ e.preventDefault(); avisoSalvo(fav, alternarSalvo(fav)); }
});
