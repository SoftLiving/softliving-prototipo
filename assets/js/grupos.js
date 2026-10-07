// VERSÃO 2 · Tela Grupos, na mesma estrutura de revista das páginas Conteúdos e Vitrines, com cartões de grupo.
// Todo cartão de grupo mostra o segmento, o título, a quantidade de participantes, o botão de entrar e o botão salvar.
// Boxes da página (versões de grupo, terminadas em G): MSG (menu segmentos grupos), BEDHG (em destaque horizontal),
// BDELDG e BDDLEG (destaque e lista), BDVG (dois verticais), BANGH (acontece nos grupos) e, no fim, a lista de todos os
// grupos com os filtros Todos/Participando/Disponíveis. Participar/Sair valem para a sessão; clicar no resto do cartão
// abre a página do grupo (grupo.html?g=n). Usa GRUPOS, alternarParticipacao e htmlDepoimentoGrupo (grupos-dados.js),
// renderMeusGrupos (lateral.js) e o layout.js.

const GR_PASSO = 8;   // "Todos os grupos" mostra uma prévia de 8 e abre mais 8 a cada "Ver mais"
const grEstado = { tipo:'todos', cat:'', mostrar:GR_PASSO };
const GR_ORDEM = embaralhar(GRUPOS.map((g, i) => i));   // ordem sorteada a cada carregamento
const grN = g => GRUPOS.indexOf(g);
const grDe = nome => GRUPOS.find(g => g.t === nome);
// Coleções (boxes BDELDG e BDDLEG): cada uma tem mais grupos do que cabem na lista, para o carrossel mostrar as setas
const GR_COLECOES = [
  { t:'Para sair de casa', d:'Encontros, caminhadas e programas para fazer em boa companhia.', itens:['Caminhadas no Parque', 'Clube do Vinho', 'Viagens em Grupo', 'Copa do Mundo', 'Yoga & Meditação', 'Amigos', 'Pilates e Postura'] },
  { t:'Para aprender e conversar', d:'Leitura, cinema, tecnologia e dinheiro, no ritmo de cada um.', itens:['Clube do Livro', 'Tecnologia Sem Medo', 'Investimentos para 50+', 'Cinema em Conversa', 'Clube do Filme', 'Empreendedorismo Maduro', 'Culinária Saudável'] },
];

// ---------- Partes do cartão de grupo ----------
const grSalvar = g => `<button type="button" class="fav" data-grupo="${g.t}" title="Salvar o grupo" aria-label="Salvar o grupo">${icone('salvar')}</button>`;
const grPessoas = g => `${g.membros} ${g.membros === 1 ? 'participante' : 'participantes'}`;
const grSegmento = g => g.cat + (g.premium ? ' · Premium' : '');
// Botão de entrar dos cartões verticais (entra ou sai sem abrir o grupo) e rótulo dos outros formatos (o cartão abre o grupo)
const grAcao = g => g.participando
  ? `<span class="vc-sair" data-sair="${grN(g)}">Participando · Sair</span>`
  : `<span class="vc-btn" data-participar="${grN(g)}">Participar ${icone('mais')}</span>`;
const grRotulo = g => g.participando ? 'Ver grupo' : 'Participar';
const grTitulo = (t, sub) => `<div class="vt-titulo"><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;

// Cartão vertical com foto (box BEDHG, carrossel do BANGH e lista de todos os grupos)
const grCartao = g => `
    <a href="${urlGrupo(grN(g))}" class="vcard vcard-grupo">
      <img src="${fotoUrl(g.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      ${grSalvar(g)}
      <span class="vc-topo">
        ${g.premium ? `<span class="selo-vc premium">Premium · ${g.preco} créditos/mês</span>` : '<span class="selo-vc">Grátis</span>'}
        ${g.novos ? `<span class="selo-vc novas">${g.novos} novas</span>` : ''}
      </span>
      <div class="vc-info">
        <span class="vc-cat">${g.cat}</span>
        <h3>${g.t}</h3>
        <p class="vc-desc">${g.d}</p>
        <div class="vc-row">
          <span class="vc-chip" title="${grPessoas(g)}" data-gchip="${grN(g)}">${icone('grupos')}${g.membros}</span>
          <span class="gr-acao" data-gacao="${grN(g)}">${grAcao(g)}</span>
        </div>
      </div>
    </a>`;
// Destaque grande e item de lista (boxes BDELDG e BDDLEG)
const grDestaque = g => `
    <a href="${urlGrupo(grN(g))}" class="destaque vt-destaque">
      <div class="imgw foto"><img src="${fotoUrl(g.foto, 1100)}" alt=""></div>${grSalvar(g)}
      <span class="cat">${grSegmento(g)}</span>
      <h3>${g.t}</h3><p data-gm="${grN(g)}">${grPessoas(g)}</p>
      <span class="btn ghost vt-ver"><span data-grotulo="${grN(g)}">${grRotulo(g)}</span> ${icone('seta')}</span>
    </a>`;
const grItem = g => `
  <a href="${urlGrupo(grN(g))}" class="item vt-item"><img class="foto" src="${fotoUrl(g.foto, 300)}" alt="" loading="lazy">${grSalvar(g)}
    <div><span class="cat">${grSegmento(g)}</span><h3>${g.t}</h3><p data-gm="${grN(g)}">${grPessoas(g)}</p>
    <span class="vt-ver-link"><span data-grotulo="${grN(g)}">${grRotulo(g)}</span> ${icone('seta')}</span></div></a>`;
// Capa e item compacto (box BDVG)
const grCapa = g => `
  <a href="${urlGrupo(grN(g))}" class="ct-tile grande vt-capa-card" style="background-image:url('${fotoUrl(g.foto, 1000)}')">
    ${grSalvar(g)}
    <div class="ct-tile-txt">
      <span class="vc-cat">${grSegmento(g)}</span>
      <h3>${g.t}</h3>
      <p data-gm="${grN(g)}">${grPessoas(g)}</p>
      <span class="vc-btn"><span data-grotulo="${grN(g)}">${grRotulo(g)}</span> ${icone('seta')}</span>
    </div>
  </a>`;
const grItemCompacto = g => `
  <a href="${urlGrupo(grN(g))}" class="item vt-item-compacto"><img class="foto" src="${fotoUrl(g.foto, 300)}" alt="" loading="lazy">${grSalvar(g)}
    <div><span class="cat">${grSegmento(g)}</span><h3>${g.t}</h3>
    <div class="meta"><span data-gm="${grN(g)}">${grPessoas(g)}</span><span class="vt-ver-link"><span data-grotulo="${grN(g)}">${grRotulo(g)}</span> ${icone('seta')}</span></div></div></a>`;

// ---------- MSG · Menu segmentos grupos: círculos com foto; cada um filtra a lista de todos os grupos, no fim da página ----------
const GR_SEGMENTOS = embaralhar([...new Set(GRUPOS.map(g => g.cat))]).map(cat => [cat, GRUPOS.find(g => g.cat === cat).foto]);
function renderSegmentos(){
  document.getElementById('grSegmentos').innerHTML = GR_SEGMENTOS.map(([cat, foto]) =>
    `<a href="#grLista" class="vt-cat${cat === grEstado.cat ? ' on' : ''}" data-cat="${cat}"${cat === grEstado.cat ? ' aria-current="true"' : ''}><img src="${fotoUrl(foto, 200)}" alt=""><span>${cat}</span></a>`).join('');
}
renderSegmentos();

// ---------- BEDHG · Em destaque: carrossel horizontal com 8 grupos sorteados ----------
document.getElementById('grDestaques').innerHTML = embaralhar(GRUPOS).slice(0, 8).map(grCartao).join('');
ativarCarrossel(document.getElementById('grDestaques'), 'h');

// ---------- BDELDG e BDDLEG · Coleções: um grupo em destaque e os outros em lista, em carrossel vertical de 4 ----------
document.getElementById('grColecoes').innerHTML = embaralhar(GR_COLECOES).map((c, i) => {
  const [primeiro, ...resto] = embaralhar(c.itens).map(grDe).filter(Boolean);
  const lista = `<div class="list" id="grColLista${i}">${resto.map(grItem).join('')}</div>`;
  return `
  <div class="vt-colecao-box" data-box="${i % 2 ? 'BDDLEG' : 'BDELDG'}">
    ${grTitulo(c.t, c.d)}
    <div class="stories${i % 2 ? ' invertida' : ''}">${i % 2 ? lista + grDestaque(primeiro) : grDestaque(primeiro) + lista}</div>
  </div>`;
}).join('');
GR_COLECOES.forEach((_, i) => ativarCarrossel(document.getElementById('grColLista' + i), 'v'));

// ---------- BDVG · Dois verticais: premium de um lado e gratuitos do outro, cada um com capa e lista em carrossel de 3 ----------
const grComuns = GRUPOS.filter(g => g.tipo !== 'desapego');
document.getElementById('grDoisVerticais').innerHTML = `<div class="ct-dupla">${[
  ['Grupos premium', 'Curadoria e encontros guiados, com mensalidade em créditos.', embaralhar(grComuns.filter(g => g.premium)), 'grDuplaLista0'],
  ['Grupos gratuitos', 'Para entrar agora, sem custo.', embaralhar(grComuns.filter(g => !g.premium)).slice(0, 6), 'grDuplaLista1'],
].map(([t, sub, lista, id]) => `
  <section class="vt-bloco">
    ${grTitulo(t, sub)}
    <div class="ct-coluna">${grCapa(lista[0])}<div class="ct-coluna-lista" id="${id}">${lista.slice(1).map(grItemCompacto).join('')}</div></div>
  </section>`).join('')}</div>`;
[0, 1].forEach(i => ativarCarrossel(document.getElementById('grDuplaLista' + i), 'v', 3));

// ---------- BANGH · Acontece nos grupos: comentário sorteado e os grupos com mais participantes, 3 por vez ----------
document.getElementById('grDepoimento').innerHTML = htmlDepoimentoGrupo();
document.getElementById('grMovimento').innerHTML = [...GRUPOS].sort((a, b) => b.membros - a.membros).slice(0, 6).map(grCartao).join('');
ativarCarrossel(document.getElementById('grMovimento'), 'h', 3);

// ---------- Todos os grupos: prévia de 8 e "Ver mais" de 8 em 8; filtros Todos/Participando/Disponíveis e o segmento do menu ----------
function renderGrupos(){
  const doSegmento = GRUPOS.filter(g => !grEstado.cat || g.cat === grEstado.cat);
  const nPart = doSegmento.filter(g => g.participando).length;
  document.getElementById('grConta').innerHTML = grEstado.cat
    ? `${doSegmento.length} ${doSegmento.length === 1 ? 'grupo' : 'grupos'} em ${grEstado.cat} · <button type="button" class="link" data-limpar>ver todos</button>`
    : `${GRUPOS.length} grupos`;
  const tipos = [['todos', 'Todos', doSegmento.length], ['participando', 'Participando', nPart], ['disponiveis', 'Disponíveis', doSegmento.length - nPart]];
  document.getElementById('grTipos').innerHTML = tipos.map(([k, l, n]) => `<button type="button" role="tab" class="${k === grEstado.tipo ? 'on' : ''}" aria-selected="${k === grEstado.tipo}" data-tipo="${k}">${l} <small>${n}</small></button>`).join('');

  const lista = GR_ORDEM.map(i => GRUPOS[i]).filter(g => doSegmento.includes(g) && (grEstado.tipo === 'todos' || (grEstado.tipo === 'participando') === g.participando));
  document.getElementById('grGrade').innerHTML = lista.slice(0, grEstado.mostrar).map(grCartao).join('');
  const faltam = lista.length - grEstado.mostrar;
  document.getElementById('grMaisBox').hidden = faltam <= 0;
  document.getElementById('grMais').innerHTML = `Ver mais ${Math.min(GR_PASSO, Math.max(faltam, 0))} ${faltam === 1 ? 'grupo' : 'grupos'} ${icone('mais')}`;
  marcarSalvos();
  const vazio = document.getElementById('grVazio');
  vazio.hidden = lista.length > 0;
  vazio.textContent = grEstado.tipo === 'participando' ? 'Você ainda não participa de nenhum grupo aqui.' : 'Você já participa de todos os grupos daqui.';
}
// Depois de entrar ou sair: acerta o botão, o rótulo e a contagem daquele grupo em todos os boxes, sem remontar os carrosséis
function grAtualizar(g){
  const n = grN(g);
  document.querySelectorAll(`[data-gacao="${n}"]`).forEach(e => e.innerHTML = grAcao(g));
  document.querySelectorAll(`[data-grotulo="${n}"]`).forEach(e => e.textContent = grRotulo(g));
  document.querySelectorAll(`[data-gm="${n}"]`).forEach(e => e.textContent = grPessoas(g));
  document.querySelectorAll(`[data-gchip="${n}"]`).forEach(e => { e.innerHTML = icone('grupos') + g.membros; e.title = grPessoas(g); });
}

document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(fav){ e.preventDefault(); avisoSalvo(fav, alternarSalvo(fav)); return; }
  const seg = e.target.closest('#grSegmentos [data-cat]'), limpar = e.target.closest('[data-limpar]'), tipo = e.target.closest('#grTipos button');
  if(seg || limpar){
    e.preventDefault();
    grEstado.cat = seg && seg.dataset.cat !== grEstado.cat ? seg.dataset.cat : '';   // clicar de novo no segmento desfaz o filtro
    grEstado.tipo = 'todos'; grEstado.mostrar = GR_PASSO;
    renderSegmentos(); renderGrupos();
    if(seg) document.getElementById('grLista').scrollIntoView({ behavior:'smooth', block:'start' });
    return;
  }
  if(tipo){ grEstado.tipo = tipo.dataset.tipo; grEstado.mostrar = GR_PASSO; renderGrupos(); return; }
  if(e.target.closest('#grMais')){ grEstado.mostrar += GR_PASSO; renderGrupos(); return; }
  const entrar = e.target.closest('[data-participar]'), sair = e.target.closest('[data-sair]');
  if(!entrar && !sair) return;          // resto do cartão: abre a página do grupo
  e.preventDefault();
  const g = GRUPOS[+(entrar ? entrar.dataset.participar : sair.dataset.sair)];
  alternarParticipacao(g, !!entrar);
  mostrarAviso(entrar ? `Você entrou no grupo ${g.t}` : `Você saiu do grupo ${g.t}`);
  grAtualizar(g);
  renderGrupos();
  renderMeusGrupos();
});
renderGrupos();
marcarSalvos();
// Endereço antigo (grupos.html?g=n, de quando a página do grupo estava em construção): leva para a página do grupo
(function enderecoAntigo(){
  const q = new URLSearchParams(location.search);
  if(q.has('g') && GRUPOS[+q.get('g')]) location.replace(urlGrupo(+q.get('g')));
})();
