// VERSÃO 2 · Coluna lateral da direita. A página só precisa de <aside class="lateral"></aside>; este script preenche os
// blocos. Usa GRUPOS (grupos-dados.js) e fotoUrl/icone (layout.js).
// A coluna será sempre contextual: os blocos vão mudar conforme a página. As opções de cada página ainda serão
// definidas; por enquanto (decisão de 2026-10-06) todas as páginas mostram os mesmos quatro blocos, nesta ordem:
//   1. Sua opinião vale créditos (pesquisa de escuta; entra no topo depois, pelo escuta.js, carregado depois deste arquivo)
//   2. Meus grupos (pessoal: só aparece com login)
//   3. Hoje na SoftLiving
//   4. Meus amigos, com quem está online e quem está offline (no lugar de "Conheça a comunidade"; pessoal: só aparece com login)

const LAT_ICONE_PESSOAS = '<svg class="ic" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M21 20c0-2.6-1.6-4.6-4-5.3"/></svg>';
// Meus amigos (os mesmos seis da tela Amigos, com os mesmos ids das Conversas). on: está online agora.
const LAT_AMIGOS = [
  { id:1, sigla:'AD', nome:'Alexandre Duarte', cor:'#013565', on:true },
  { id:2, sigla:'HM', nome:'Helena Martins', cor:'#7a3b52', on:true },
  { id:4, sigla:'CR', nome:'Célia Ribeiro', cor:'#b0513a', on:true },
  { id:3, sigla:'MT', nome:'Marcos Teixeira', cor:'#2f8578', on:false },
  { id:5, sigla:'BN', nome:'Beatriz Nogueira', cor:'#5b4b8a', on:false },
  { id:6, sigla:'JA', nome:'Jorge Albuquerque', cor:'#8a6414', on:false },
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
    <a href="${urlGrupo(GRUPOS.indexOf(g))}" class="lat-grupo">
      <img src="${fotoUrl(g.foto, 120)}" alt="" loading="lazy"><span><b>${g.t}</b><small>${g.cat}</small></span>
      ${g.novos ? `<span class="novas" title="${g.novos} mensagens novas">${g.novos}</span>` : ''}${icone('seta')}</a>`).join('')
    : '<p class="lat-vazio">Você ainda não participa de nenhum grupo.</p>';
}

(function montarLateral(){
  const lateral = document.querySelector('.lateral');
  if(!lateral) return;
  lateral.innerHTML = `
  <section class="lat-card lat-meus-grupos">
    <div class="lat-head"><h2>${LAT_ICONE_PESSOAS}Meus grupos</h2><a href="${urlPagina('grupos')}" class="lat-mais">Ver todos ›</a></div>
    <div id="meusGrupos"></div>
    <a href="${urlPagina('grupos')}" class="lat-centro">Explorar mais grupos →</a>
  </section>

  <section class="lat-card">
    <div class="lat-head"><h2><svg class="ic" viewBox="0 0 24 24"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>Hoje na ${LOGO}</h2></div>
    <div class="lat-stat"><span>${LAT_ICONE_PESSOAS}</span><p><b>50 membros</b><small>na comunidade</small></p></div>
    <div class="lat-stat"><span class="azul"><svg class="ic" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg></span><p><b>13 colunistas</b><small>publicando novas colunas</small></p></div>
    <div class="lat-stat"><span class="ouro"><svg class="ic" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg></span><p><b>58+ conteúdos</b><small>disponíveis para você</small></p></div>
    <a href="${urlPagina('conteudos')}" class="btn"><svg class="ic" viewBox="0 0 24 24"><path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/></svg>Explorar conteúdos</a>
  </section>

  <section class="lat-card lat-amigos">
    <div class="lat-head"><h2>${LAT_ICONE_PESSOAS}Meus amigos</h2><a href="${urlPagina('amigos')}" class="lat-mais">Ver todos ›</a></div>
    <p class="lat-online-conta"><i class="lat-ponto on"></i>${LAT_AMIGOS.filter(a => a.on).length} online agora</p>
    ${[...LAT_AMIGOS].sort((a, b) => b.on - a.on).map(a => `
    <a href="${LAYOUT_ROOT}conversas.html?c=${a.id}" class="lat-membro lat-amigo${a.on ? '' : ' off'}" title="Conversar com ${a.nome.split(' ')[0]}">
      <span class="av" style="background:${a.cor}">${a.sigla}<i class="lat-ponto${a.on ? ' on' : ''}"></i></span>
      <span class="lat-amigo-txt">${a.nome}<small>${a.on ? 'Online' : 'Offline'}</small></span></a>`).join('')}
  </section>`;
  lateral.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));
  renderMeusGrupos();
  if(typeof agendarAjusteLogos === 'function') agendarAjusteLogos();
})();
