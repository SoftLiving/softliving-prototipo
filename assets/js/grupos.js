// ===== Tela Grupos =====
// Capa: degradê colorido sorteado a cada carregamento, com o ícone do tema.
GRUPOS.forEach(g => g.capa = sorteiaDegrade());
const grState = { tab:'todos' };

function renderGrupos(){
  const nPart = GRUPOS.filter(g => g.participando).length;
  document.getElementById('grCount').textContent = `${GRUPOS.length} grupos`;
  document.getElementById('grTabs').innerHTML = [['todos','Todos',GRUPOS.length],['participando','Participando',nPart],['disponiveis','Disponíveis',GRUPOS.length - nPart]]
    .map(([k,l,n]) => `<button type="button" class="ct-tab ${k===grState.tab?'active':''}" data-tab="${k}">${l} (${n})</button>`).join('');

  const list = GRUPOS.map((g, i) => ({...g, i})).filter(g => grState.tab === 'todos' || (grState.tab === 'participando') === g.participando);
  document.getElementById('grGrid').innerHTML = list.map(g => `
    <article class="ct-card gr-card" data-abrir="${g.i}">
      <div class="ct-cover">
        <div class="ct-ph" style="background:${g.capa};">${ICON[g.icon] || ICON.users}</div>
        ${g.premium ? `<span class="ct-badge premium">${ICON.star} Premium</span>` : `<span class="ct-badge gratis">Grátis</span>`}
      </div>
      <div class="ct-body">
        <span class="ct-cat">${ICON[g.icon] || ICON.users} ${g.cat}</span>
        <div class="gr-title-row"><h3 class="ct-title"><a href="grupo.html?g=${g.i}">${g.t}</a></h3>${g.novos ? `<span class="gr-new">${g.novos} novos</span>` : ''}</div>
        <p class="ct-excerpt">${g.d}</p>
        <div class="gr-foot">
          <span class="gr-members">${ICON.users} ${g.membros} membro${g.membros === 1 ? '' : 's'}</span>
          ${g.participando
            ? `<span class="gr-in">✓ Participando</span><button type="button" class="gr-leave" data-sair="${g.i}">${ICON.logout} Sair</button>`
            : `<button type="button" class="gr-join" data-participar="${g.i}">Participar</button>`}
        </div>
      </div>
    </article>`).join('');
  document.getElementById('grEmpty').hidden = list.length > 0;
  document.getElementById('grEmpty').textContent = grState.tab === 'participando'
    ? 'Você ainda não participa de nenhum grupo.' : 'Você já participa de todos os grupos.';
}

// Participar / Sair ficam no próprio card; clicar em qualquer outro ponto do card abre a página do grupo
document.getElementById('grGrid').addEventListener('click', e => {
  const entrar = e.target.closest('[data-participar]'), sair = e.target.closest('[data-sair]');
  if(entrar || sair){
    alternarParticipacao(GRUPOS[+(entrar || sair).dataset[entrar ? 'participar' : 'sair']], !!entrar);
    renderGrupos();
    return;
  }
  const card = e.target.closest('[data-abrir]');
  if(card && !e.target.closest('a')) location.href = 'grupo.html?g=' + card.dataset.abrir;
});
document.getElementById('grTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b){ grState.tab = b.dataset.tab; renderGrupos(); } });
renderGrupos();
