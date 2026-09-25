// ===== Tela Grupos =====
// premium: grupo pago com créditos. novos: mensagens novas desde a última visita. participando: se o usuário já está no grupo.
// Capa: degradê colorido sorteado a cada carregamento, com o ícone do tema.
const GRUPOS = [
  {cat:"Gastronomia", icon:"pin", t:"Clube do Vinho", d:"Clube gratuito a partir da coluna de vinhos. Cada rodada reúne onde comprar no Rio, o que harmonizar e um encontro para provar juntos.", membros:1, participando:false},
  {cat:"Social", icon:"users", t:"Amigos", d:"Grupo de amigos, gratuito. O Alexandre conduz. O aviso do encontro fica no mural.", membros:3, participando:true, novos:2},
  {cat:"Cinema", icon:"film", t:"Clube do Filme", d:"Curadoria mensal de filmes para debate em grupo. Cada rodada traz um filme para assistir e uma conversa marcada.", membros:2, participando:true, premium:true},
  {cat:"Cinema", icon:"film", t:"Cinema em Conversa", d:"Espaço gratuito para trocar indicações de filmes e séries. Porta de entrada para o Clube do Filme.", membros:5, participando:true},
  {cat:"Saúde", icon:"wind", t:"Yoga & Meditação", d:"Práticas guiadas para todos os níveis, com foco em respiração, alongamento e calma no dia a dia.", membros:18, participando:true},
  {cat:"Cultura", icon:"book", t:"Clube do Livro", d:"Um livro por mês, escolhido pelo grupo, e um encontro para conversar sobre ele.", membros:24, participando:true},
  {cat:"Tecnologia", icon:"phone", t:"Tecnologia Sem Medo", d:"Tire dúvidas sobre celular, aplicativos e golpes digitais, sem pressa e sem vergonha de perguntar.", membros:31, participando:true, novos:4},
  {cat:"Gastronomia", icon:"restaurant", t:"Culinária Saudável", d:"Receitas simples e nutritivas, trocas de dicas e desafios semanais na cozinha.", membros:15, participando:true},
  {cat:"Social", icon:"trophy", t:"Copa do Mundo", d:"Para assistir aos jogos juntos, comentar as partidas e fazer o bolão da comunidade.", membros:42, participando:true},
  {cat:"Finanças", icon:"money", t:"Investimentos para 50+", d:"Conversas guiadas sobre como equilibrar segurança e rentabilidade nesta fase da vida.", membros:12, participando:false, premium:true},
  {cat:"Saúde", icon:"heart", t:"Caminhadas no Parque", d:"Encontros semanais para caminhar em grupo, no ritmo de cada um, sempre com uma boa conversa.", membros:9, participando:false},
  {cat:"Viagens", icon:"map", t:"Viagens em Grupo", d:"Roteiros planejados em conjunto, dicas de destinos e companhia para a próxima viagem.", membros:7, participando:false},
];
GRUPOS.forEach(g => g.capa = sorteiaDegrade());
const grState = { tab:'todos' };

function renderGrupos(){
  const nPart = GRUPOS.filter(g => g.participando).length;
  document.getElementById('grCount').textContent = `${GRUPOS.length} grupos`;
  document.getElementById('grTabs').innerHTML = [['todos','Todos',GRUPOS.length],['participando','Participando',nPart],['disponiveis','Disponíveis',GRUPOS.length - nPart]]
    .map(([k,l,n]) => `<button type="button" class="ct-tab ${k===grState.tab?'active':''}" data-tab="${k}">${l} (${n})</button>`).join('');

  const list = GRUPOS.map((g, i) => ({...g, i})).filter(g => grState.tab === 'todos' || (grState.tab === 'participando') === g.participando);
  document.getElementById('grGrid').innerHTML = list.map(g => `
    <article class="ct-card gr-card">
      <div class="ct-cover">
        <div class="ct-ph" style="background:${g.capa};">${ICON[g.icon] || ICON.users}</div>
        ${g.premium ? `<span class="ct-badge premium">${ICON.star} Premium</span>` : `<span class="ct-badge gratis">Grátis</span>`}
      </div>
      <div class="ct-body">
        <span class="ct-cat">${ICON[g.icon] || ICON.users} ${g.cat}</span>
        <div class="gr-title-row"><h3 class="ct-title">${g.t}</h3>${g.novos ? `<span class="gr-new">${g.novos} novos</span>` : ''}</div>
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

// Participar / Sair: só em memória (recarregar a página volta ao estado inicial)
document.getElementById('grGrid').addEventListener('click', e => {
  const entrar = e.target.closest('[data-participar]'), sair = e.target.closest('[data-sair]');
  if(!entrar && !sair) return;
  const g = GRUPOS[+(entrar || sair).dataset[entrar ? 'participar' : 'sair']];
  g.participando = !!entrar;
  g.membros += entrar ? 1 : -1;
  if(sair) g.novos = 0;
  renderGrupos();
});
document.getElementById('grTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b){ grState.tab = b.dataset.tab; renderGrupos(); } });
renderGrupos();
