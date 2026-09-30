// VERSÃO 2 · Tela Busca: conteúdos e colunas (CONTEUDOS + COLUNAS_EXTRAS), colunistas (COLUNISTAS) e grupos (GRUPOS).
// Busca sem diferenciar acentos nem maiúsculas; cada palavra digitada precisa aparecer no item. Os termos aparecem destacados.
// O termo fica no endereço (busca.html?q=...) e as últimas buscas ficam na sessão do navegador.

const semAcento = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const escapar = t => t.replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const bsEstado = { termo:'', tipo:'tudo' };
const BS_POPULARES = ['Longevidade', 'Vinho', 'Inteligência artificial', 'Casa', 'Meditação', 'Golpes', 'Moda', 'Viagem'];
const BS_ASSUNTOS = [
  ['Bem-estar', 'Saúde mental e qualidade de vida'],
  ['Saúde', 'Saúde e bem-estar físico'],
  ['Estilo e casa', 'Estilo de vida e consumo'],
  ['Viagem', 'Turismo e viagem'],
  ['Tecnologia', 'Tecnologia e serviços digitais'],
];

// Destaca os termos no texto (sem acento para comparar, mas mantendo o texto original)
function destacar(texto, palavras){
  let html = escapar(texto);
  if(!palavras.length) return html;
  const base = semAcento(html);
  const marcas = [];
  palavras.forEach(p => { let i = base.indexOf(p); while(i >= 0){ marcas.push([i, i + p.length]); i = base.indexOf(p, i + p.length); } });
  marcas.sort((a, b) => a[0] - b[0]);
  let saida = '', fim = 0;
  marcas.forEach(([a, b]) => { if(a < fim) return; saida += html.slice(fim, a) + '<mark>' + html.slice(a, b) + '</mark>'; fim = b; });
  return (saida + html.slice(fim)).replace('SoftLiving', LOGO);
}
const temTodas = (texto, palavras) => { const t = semAcento(texto); return palavras.every(p => t.includes(p)); };
const colunistaDe = c => COLUNISTAS.find(col => c.a.startsWith(col.nome));

function buscar(termo){
  const palavras = semAcento(termo).split(/\s+/).filter(p => p.length > 1);
  if(!palavras.length) return { palavras, conteudos:[], colunistas:[], grupos:[] };
  const artigos = [...CONTEUDOS, ...COLUNAS_EXTRAS];
  return {
    palavras,
    // inclui o nome curto do assunto (ex.: "Estilo e casa") para os atalhos de assunto acharem todos os conteúdos dele
    conteudos: artigos.filter(c => temTodas(`${c.t} ${c.e || ''} ${c.a} ${c.cat || ''} ${(BS_ASSUNTOS.find(x => x[1] === c.cat) || [''])[0]} ${(colunistaDe(c) || {}).coluna || ''}`, palavras)),
    colunistas: COLUNISTAS.filter(col => temTodas(`${col.nome} ${col.coluna || ''} ${col.categoria} ${col.bio}`, palavras)),
    grupos: GRUPOS.filter(g => temTodas(`${g.t} ${g.d} ${g.cat}`, palavras)),
  };
}

// Cada tipo de resultado
const resConteudo = (c, p) => {
  const col = colunistaDe(c);
  const rotulo = col ? (col.coluna || col.aba) : (BS_ASSUNTOS.find(a => a[1] === c.cat) || [c.cat])[0];
  return `
  <a href="${urlConteudo(c.t)}" class="item res-item">
    <img class="foto" src="${fotoUrl(c.foto, 300)}" alt="" loading="lazy">
    <div><span class="cat">${col ? 'Coluna · ' : ''}${destacar(rotulo, p)}</span><h3>${destacar(c.t, p)}</h3>
    ${c.e ? `<p>${destacar(c.e, p)}</p>` : ''}<div class="meta"><span>${destacar(c.a, p)}</span><i></i><span>${c.badge === 'premium' ? `${c.credits} crédito` : 'Grátis'}</span></div></div></a>`;
};
const resColunista = (col, p) => `
  <a href="${urlPagina('colunas')}" class="autor">
    <span class="av-col" style="background:${col.cor}">${col.sigla}</span>
    <span class="autor-txt"><b>${destacar(col.nome, p)}</b><span class="autor-nicho">${col.aba === 'SoftLiving' ? LOGO : destacar(col.aba, p)}</span><small>${col.coluna ? destacar(col.coluna, p) + ' · ' : ''}${col.publicadas} colunas</small></span>
  </a>`;
const resGrupo = (g, p) => `
  <a href="${urlGrupo(GRUPOS.indexOf(g))}" class="item res-item">
    <img class="foto" src="${fotoUrl(g.foto, 300)}" alt="" loading="lazy">
    <div><span class="cat">Grupo · ${destacar(g.cat, p)}</span><h3>${destacar(g.t, p)}</h3><p>${destacar(g.d, p)}</p>
    <div class="meta"><span>${g.membros} ${g.membros === 1 ? 'membro' : 'membros'}</span><i></i><span>${g.participando ? 'Você participa' : g.premium ? 'Premium' : 'Grátis'}</span></div></div></a>`;

function renderBusca(){
  const termo = bsEstado.termo.trim();
  document.getElementById('bsLimpar').hidden = !termo;
  document.getElementById('bsSugestoes').hidden = !!termo;
  document.getElementById('bsResultados').hidden = !termo;
  if(!termo){ renderSugestoes(); return; }

  const r = buscar(termo);
  const total = r.conteudos.length + r.colunistas.length + r.grupos.length;
  document.getElementById('bsResumo').innerHTML = total
    ? `${total} ${total === 1 ? 'resultado' : 'resultados'} para <b>“${escapar(termo)}”</b>`
    : `Nenhum resultado para <b>“${escapar(termo)}”</b>. Tente outra palavra ou uma das buscas populares.`;
  const tipos = [['tudo', 'Tudo', total], ['conteudos', 'Conteúdos', r.conteudos.length], ['colunistas', 'Colunistas', r.colunistas.length], ['grupos', 'Grupos', r.grupos.length]];
  const tiposEl = document.getElementById('bsTipos');
  tiposEl.hidden = !total;
  tiposEl.innerHTML = tipos.map(([k, l, n]) => `<button type="button" role="tab" class="${k === bsEstado.tipo ? 'on' : ''}" aria-selected="${k === bsEstado.tipo}" data-tipo="${k}" ${n ? '' : 'disabled'}>${l} <small>${n}</small></button>`).join('');

  const blocos = [];
  const mostrar = k => bsEstado.tipo === 'tudo' || bsEstado.tipo === k;
  if(mostrar('conteudos') && r.conteudos.length) blocos.push(`<div class="bs-grupo"><h2>Conteúdos e colunas <small>${r.conteudos.length}</small></h2><div class="list bs-lista">${r.conteudos.map(c => resConteudo(c, r.palavras)).join('')}</div></div>`);
  if(mostrar('colunistas') && r.colunistas.length) blocos.push(`<div class="bs-grupo"><h2>Colunistas <small>${r.colunistas.length}</small></h2><div class="autores">${r.colunistas.map(c => resColunista(c, r.palavras)).join('')}</div></div>`);
  if(mostrar('grupos') && r.grupos.length) blocos.push(`<div class="bs-grupo"><h2>Grupos <small>${r.grupos.length}</small></h2><div class="list bs-lista">${r.grupos.map(g => resGrupo(g, r.palavras)).join('')}</div></div>`);
  document.getElementById('bsLista').innerHTML = total ? blocos.join('') : `<div class="bs-chips bs-vazio">${BS_POPULARES.map(t => `<button type="button" class="bs-chip" data-termo="${t}">${t}</button>`).join('')}</div>`;
}

// Sugestões (campo vazio)
function lerRecentes(){ try { return JSON.parse(sessionStorage.getItem('v2BuscasRecentes') || '[]'); } catch(e){ return []; } }
function guardarRecente(termo){
  const t = termo.trim();
  if(t.length < 2) return;
  const lista = [t, ...lerRecentes().filter(x => semAcento(x) !== semAcento(t))].slice(0, 6);
  try { sessionStorage.setItem('v2BuscasRecentes', JSON.stringify(lista)); } catch(e){}
}
function renderSugestoes(){
  const recentes = lerRecentes();
  document.getElementById('bsRecentesBloco').hidden = !recentes.length;
  document.getElementById('bsRecentes').innerHTML = recentes.map(t => `<button type="button" class="bs-chip" data-termo="${escapar(t)}">${escapar(t)}</button>`).join('');
  document.getElementById('bsPopulares').innerHTML = BS_POPULARES.map(t => `<button type="button" class="bs-chip" data-termo="${t}">${t}</button>`).join('');
  document.getElementById('bsAssuntos').innerHTML = BS_ASSUNTOS.map(([rotulo, cat]) => {
    const n = CONTEUDOS.filter(c => c.cat === cat).length;
    const foto = (CONTEUDOS.find(c => c.cat === cat) || {}).foto;
    return `<button type="button" class="bs-assunto" data-termo="${rotulo}"><img class="foto" src="${fotoUrl(foto, 300)}" alt="" loading="lazy"><span><b>${rotulo}</b><small>${n} ${n === 1 ? 'conteúdo' : 'conteúdos'}</small></span></button>`;
  }).join('');
}

// Digitar, escolher uma sugestão, limpar
const campo = document.getElementById('bsCampo');
let atrasoRecente;
function definirTermo(t, guardar){
  bsEstado.termo = t;
  bsEstado.tipo = 'tudo';
  campo.value = t;
  const url = new URL(location.href);
  if(t.trim()) url.searchParams.set('q', t.trim()); else url.searchParams.delete('q');
  history.replaceState(null, '', url);
  clearTimeout(atrasoRecente);
  if(guardar) guardarRecente(t); else atrasoRecente = setTimeout(() => guardarRecente(t), 1200);
  renderBusca();
}
campo.addEventListener('input', () => definirTermo(campo.value, false));
document.getElementById('bsForm').addEventListener('submit', e => { e.preventDefault(); definirTermo(campo.value, true); campo.blur(); });
document.getElementById('bsLimpar').addEventListener('click', () => { definirTermo('', false); campo.focus(); });
document.getElementById('bsApagar').addEventListener('click', () => { try { sessionStorage.removeItem('v2BuscasRecentes'); } catch(e){} renderSugestoes(); });
document.querySelector('main').addEventListener('click', e => {
  const chip = e.target.closest('[data-termo]');
  if(chip){ definirTermo(chip.dataset.termo, true); window.scrollTo({ top:0, behavior:'smooth' }); }
});
document.getElementById('bsTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b && !b.disabled){ bsEstado.tipo = b.dataset.tipo; renderBusca(); } });

// Começa com o termo do endereço (vindo da lupa do topo ou de um link)
const termoInicial = new URLSearchParams(location.search).get('q') || '';
definirTermo(termoInicial, !!termoInicial);
if(!termoInicial) campo.focus();
