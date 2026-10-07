// VERSÃO 2 · Tela Conteúdos: visual de revista, na mesma estrutura da Vitrine. Assuntos em círculos, carrossel em
// destaque, coleções (foto grande e três conteúdos ao lado), um bloco por assunto com um layout diferente para cada
// (boxes BDDLE, BDVC, BSD e BDS; o formato de mosaico foi retirado em 2026-10-07) e, no fim, a lista completa com o fichário de
// assuntos e Todos/Grátis/Premium. Usa CONTEUDOS (conteudos-dados.js) e fotoUrl/icone/mostrarAviso (layout.js).

const ctEstado = { assunto:0, tipo:'todos', busca:'' };

// 1) Assuntos em círculos, com a foto de um conteúdo de cada assunto: cada um leva à página própria do assunto
// ("Todos" leva à lista completa, no fim desta página)
document.getElementById('ctCirculos').innerHTML = CT_ASSUNTOS.map(([r, cat, id, slug]) => {
  const c = cat ? ctDoAssunto(cat)[0] : CT_SORTEIO[0];
  return `<a href="${slug ? urlAssunto(slug) : '#' + id}" class="vt-cat"><img src="${fotoUrl(c.foto, 200)}" alt=""><span>${r}</span></a>`;
}).join('');

// 2) Em destaque: 8 sorteados a cada visita, em carrossel
document.getElementById('ctDestaques').innerHTML = embaralhar(CONTEUDOS).slice(0, 8).map(ctVertical).join('');
ativarCarrossel(document.getElementById('ctDestaques'), 'h');

// 3) Coleção com curadoria, no box BDELD (destaque à esquerda e lista à direita, o mesmo de "Últimas matérias" da
// Início): o título e o subtítulo são os da coleção; um conteúdo dela vai no destaque e os outros na lista, em carrossel
// vertical. A coleção e a ordem dos itens são sorteadas. Cada coleção tem mais conteúdos do que cabem na lista (4),
// para o carrossel ter os botões de rolagem.
const CT_COLECOES = [
  { t:'Viver mais e melhor', d:'Longevidade, hábitos e pequenas escolhas que fazem diferença em qualquer idade.', foto:'1529156069898-49953e39b3ac',
    itens:['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'Longevidade', 'Você faz isso pela manhã?', 'Caminhar: o exercício mais subestimado', 'Check-up sem medo', 'Respirar melhor muda o dia', 'Mais conexão, menos solidão'] },
  { t:'Pequenos prazeres', d:'Encontros, viagens sem pressa e o que realmente vale o nosso tempo.', foto:'1470252649378-9c29740c9fa8',
    itens:['Descubra novos pequenos prazeres da vida!', 'O bem-estar do encontro presencial', 'Na Suíça, um vinho para chamar de seu', 'A Coragem de Mudar de Direção', 'O luxo de hoje é outra coisa', 'A casa não precisa parecer decorada', 'Menos coisas, mais espaço'] },
  { t:'Tecnologia sem medo', d:'Inteligência artificial, segurança e conexão: a tecnologia a favor da vida madura.', foto:'1677442136019-21780ecad995',
    itens:['Meu primeiro agente de IA', 'Agente de IA anti-golpe', 'Mais conexão, menos solidão', 'WhatsApp sem segredos', 'Senhas fortes sem dor de cabeça', 'Banco pelo celular, com segurança'] },
];
const col = embaralhar(CT_COLECOES)[0];
const [colDestaque, ...colResto] = embaralhar(col.itens).map(ctPorTitulo).filter(Boolean);
document.getElementById('ctColecao1').innerHTML = ctTitulo(col.t, col.d) + `
  <div class="stories">
    <a href="${urlConteudo(colDestaque.t)}" class="destaque">
      <div class="imgw foto"><img src="${fotoUrl(colDestaque.foto, 1100)}" alt=""></div>${ctSalvar}
      <span class="cat">${ctRotulo(colDestaque.cat)}</span>
      <h3>${colDestaque.t}</h3><p>${colDestaque.e}</p>
      <div class="meta"><span>${colDestaque.a}</span>${seloAcesso(colDestaque)}</div>
    </a>
    <div class="list" id="ctColLista">${colResto.map(ctItem).join('')}</div>
  </div>`;
ativarCarrossel(document.getElementById('ctColLista'), 'v');   // 4 por vez, com setas (como as listas da Início)

// 4) Um bloco por assunto, cada um com um layout
const ctBloco = (i, sub, corpo) => { document.getElementById(CT_ASSUNTOS[i][2]).innerHTML = ctTitulo(CT_ASSUNTOS[i][0], sub) + corpo; };
// Estilo e casa, no box BDDLE (o espelho do BDELD): lista em carrossel vertical à esquerda e destaque à direita.
// O primeiro sorteado vai no destaque. A lista leva também as colunas de casa e interiores que não estão em CONTEUDOS
// (COLUNAS_EXTRAS), para ter mais itens do que cabem (4) e o carrossel mostrar os botões de rolagem.
const estilo = ctDoAssunto(CT_ASSUNTOS[3][1]), moda = estilo[0];
const estiloExtras = (typeof COLUNAS_EXTRAS === 'undefined' ? [] : COLUNAS_EXTRAS).filter(c => c.a.startsWith('Erick Figueira de Mello')).map(c => ({ ...c, cat:CT_ASSUNTOS[3][1] }));
ctBloco(3, 'Moda, casa e consumo com mais sentido.', `
  <div class="stories invertida">
    <div class="list" id="ctEstiloLista">${[...estilo.filter(c => c !== moda), ...estiloExtras].map(ctItem).join('')}</div>
    <a href="${urlConteudo(moda.t)}" class="destaque">
      <div class="imgw foto"><img src="${fotoUrl(moda.foto, 1100)}" alt=""></div>${ctSalvar}
      <span class="cat">${ctRotulo(moda.cat)}</span>
      <h3>${moda.t}</h3><p>${moda.e}</p>
      <div class="meta"><span>${moda.a}</span>${seloAcesso(moda)}</div>
    </a>
  </div>`);
ativarCarrossel(document.getElementById('ctEstiloLista'), 'v');   // 4 por vez
// Saúde e Tecnologia, no box BDVC (Box dois verticais conteúdos): lado a lado, uma capa e a lista dos outros (3 por
// vez, em carrossel vertical) em cada
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
      ${seloAcesso(viagem)}
      <span class="vc-cat">Viagem</span>
      <h3>${viagem.t}</h3>
      <p>${viagem.e}</p>
      <span class="vc-autor">${viagem.a}</span>
    </div>
  </a>`);
// SoftLiving: carta em destaque (box BDS, destaque simples)
const carta = ctDoAssunto('SoftLiving')[0];
document.getElementById('ct-softliving').innerHTML = `
  <a href="${urlConteudo(carta.t)}" class="ct-carta">
    <img src="${fotoUrl(carta.foto, 600)}" alt="" loading="lazy">
    ${ctSalvar}
    <div>
      <p class="kicker">Palavra da ${LOGO}</p>
      <h3>${carta.t.replace('SoftLiving', LOGO)}</h3>
      <p>${carta.e}</p>
      <span class="ct-carta-autor">${carta.a.replace('SoftLiving', LOGO)}</span> ${seloAcesso(carta)}
    </div>
  </a>`;

// Posição dos blocos de assunto sorteada a cada visita (o patrocinador continua entre a coleção e eles); Saúde e
// Tecnologia também trocam de lado
const ctAncora = document.querySelector('main .apoio');
embaralhar(['ct-estilo-e-casa', 'ct-dupla', 'ct-viagem']).forEach((id, i) => {
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
  if(e.target.closest('.ct-quero')){ e.preventDefault(); mostrarAviso('Cadastro de especialistas: fora deste protótipo'); }
  // "Destravar" abre a leitura, onde fica o convite para destravar com créditos
});
renderConteudos();
