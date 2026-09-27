// VERSÃO 2 · Coluna lateral da direita, comum à Início, Conteúdos e Grupos (os mesmos blocos da coluna da direita da versão 1).
// A página só precisa de <aside class="lateral"></aside>; este script preenche os blocos. A pesquisa de escuta entra no topo
// depois (escuta.js, que deve ser carregado depois deste arquivo). Usa GRUPOS (grupos-dados.js) e fotoUrl/icone (layout.js).

const LAT_ICONE_PESSOAS = '<svg class="ic" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M21 20c0-2.6-1.6-4.6-4-5.3"/></svg>';
const LAT_MEMBROS = [
  { sigla:'LR', nome:'Luciana Russi', cor:'#2f5d3a' },
  { sigla:'MH', nome:'Maria Helena Sobral', cor:'#d4a24c' },
  { sigla:'CB', nome:'Claudio Brito', cor:'#d4a24c' },
];
// Meus grupos: os cinco grupos da versão 1 primeiro; depois os outros de que a pessoa participa (até 5 no total)
const LAT_GRUPOS_V1 = ['Yoga & Meditação', 'Clube do Livro', 'Tecnologia Sem Medo', 'Culinária Saudável', 'Copa do Mundo'];

function renderMeusGrupos(){
  const alvo = document.getElementById('meusGrupos');
  if(!alvo) return;
  const participando = GRUPOS.filter(g => g.participando);
  const lista = [...participando].sort((a, b) => {
    const ia = LAT_GRUPOS_V1.indexOf(a.t), ib = LAT_GRUPOS_V1.indexOf(b.t);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  }).slice(0, 5);
  alvo.innerHTML = lista.length ? lista.map(g => `
    <a href="${V1_ROOT}grupo.html?g=${GRUPOS.indexOf(g)}" class="lat-grupo">
      <img src="${fotoUrl(g.foto, 120)}" alt="" loading="lazy"><span><b>${g.t}</b><small>${g.cat}</small></span>
      ${g.novos ? `<span class="novas" title="${g.novos} mensagens novas">${g.novos}</span>` : ''}${icone('seta')}</a>`).join('')
    : '<p class="lat-vazio">Você ainda não participa de nenhum grupo.</p>';
}

(function montarLateral(){
  const lateral = document.querySelector('.lateral');
  if(!lateral) return;
  lateral.innerHTML = `
  <section class="lat-card">
    <div class="lat-head"><h2>${LAT_ICONE_PESSOAS}Meus grupos</h2><a href="${urlPagina('grupos')}" class="lat-mais">Ver todos ›</a></div>
    <div id="meusGrupos"></div>
    <a href="${urlPagina('grupos')}" class="lat-centro">Explorar mais grupos →</a>
  </section>

  <section class="lat-card">
    <div class="lat-head"><h2><svg class="ic" viewBox="0 0 24 24"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>Hoje na ${LOGO}</h2></div>
    <div class="lat-stat"><span>${LAT_ICONE_PESSOAS}</span><p><b>50 membros</b><small>no diretório da comunidade</small></p></div>
    <div class="lat-stat"><span class="azul"><svg class="ic" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg></span><p><b>8 colunistas</b><small>publicando novas colunas</small></p></div>
    <div class="lat-stat"><span class="ouro"><svg class="ic" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg></span><p><b>58+ conteúdos</b><small>disponíveis para você</small></p></div>
    <a href="${urlPagina('conteudos')}" class="btn"><svg class="ic" viewBox="0 0 24 24"><path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/></svg>Explorar conteúdos</a>
  </section>

  <section class="lat-card">
    <div class="lat-head"><h2>${LAT_ICONE_PESSOAS}Conheça a comunidade</h2><a href="${urlPagina('amigos')}" class="lat-mais">Ver todos ›</a></div>
    ${LAT_MEMBROS.map(m => `<a href="#" class="lat-membro"><span class="av" style="background:${m.cor}">${m.sigla}</span>${m.nome}</a>`).join('')}
    <a href="${urlPagina('amigos')}" class="btn ghost">${LAT_ICONE_PESSOAS}Explorar comunidade</a>
  </section>

  <div class="lat-clube">
    <em>Clube de Saúde ${LOGO}</em>
    <strong>Parceria em aberto</strong>
    <a href="${urlSite('patrocinadores')}">Conheça as cotas de patrocínio</a>
  </div>`;
  lateral.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  renderMeusGrupos();
  if(typeof agendarAjusteLogos === 'function') agendarAjusteLogos();
})();
