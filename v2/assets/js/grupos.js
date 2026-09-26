// VERSÃO 2 · Tela Grupos (referência: grupos.js da versão 1): Todos/Participando/Disponíveis e grade de cartões verticais.
// Participar/Sair ficam no cartão (valem para a sessão, como na versão 1); clicar no resto do cartão abre a página do grupo
// (ainda a da versão 1). Usa GRUPOS e alternarParticipacao (grupos-dados.js), renderMeusGrupos (lateral.js) e layout.js.

const grEstado = { tipo:'todos' };

function renderGrupos(){
  const nPart = GRUPOS.filter(g => g.participando).length;
  document.getElementById('grConta').textContent = `${GRUPOS.length} grupos`;
  const tipos = [['todos', 'Todos', GRUPOS.length], ['participando', 'Participando', nPart], ['disponiveis', 'Disponíveis', GRUPOS.length - nPart]];
  document.getElementById('grTipos').innerHTML = tipos.map(([k, l, n]) => `<button type="button" role="tab" class="${k === grEstado.tipo ? 'on' : ''}" aria-selected="${k === grEstado.tipo}" data-tipo="${k}">${l} <small>${n}</small></button>`).join('');

  const lista = GRUPOS.map((g, i) => ({ ...g, i })).filter(g => grEstado.tipo === 'todos' || (grEstado.tipo === 'participando') === g.participando);
  document.getElementById('grGrade').innerHTML = lista.map(g => `
    <a href="${V1_ROOT}grupo.html?g=${g.i}" class="vcard vcard-grupo">
      <img src="${fotoUrl(g.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
      <span class="vc-topo">
        ${g.premium ? '<span class="selo-vc premium">Premium</span>' : '<span class="selo-vc">Grátis</span>'}
        ${g.novos ? `<span class="selo-vc novas">${g.novos} novas</span>` : ''}
      </span>
      <div class="vc-info">
        <span class="vc-cat">${g.cat}</span>
        <h3>${g.t}</h3>
        <p class="vc-desc">${g.d}</p>
        <div class="vc-row">
          <span class="vc-chip" title="${g.membros} ${g.membros === 1 ? 'membro' : 'membros'}">${icone('grupos')}${g.membros}</span>
          ${g.participando
            ? `<span class="vc-sair" data-sair="${g.i}">Participando · Sair</span>`
            : `<span class="vc-btn" data-participar="${g.i}">Participar ${icone('mais')}</span>`}
        </div>
      </div>
    </a>`).join('');
  const vazio = document.getElementById('grVazio');
  vazio.hidden = lista.length > 0;
  vazio.textContent = grEstado.tipo === 'participando' ? 'Você ainda não participa de nenhum grupo.' : 'Você já participa de todos os grupos.';
}

document.getElementById('grTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ grEstado.tipo = b.dataset.tipo; renderGrupos(); } });
document.getElementById('grGrade').addEventListener('click', e => {
  const entrar = e.target.closest('[data-participar]'), sair = e.target.closest('[data-sair]');
  if(!entrar && !sair) return;          // resto do cartão: abre a página do grupo
  e.preventDefault();
  const g = GRUPOS[+(entrar ? entrar.dataset.participar : sair.dataset.sair)];
  alternarParticipacao(g, !!entrar);
  mostrarAviso(entrar ? `Você entrou no grupo ${g.t}` : `Você saiu do grupo ${g.t}`);
  renderGrupos();
  renderMeusGrupos();
});
renderGrupos();
