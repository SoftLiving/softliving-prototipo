// ===== Página interna de um grupo (grupo.html?g=<número do grupo em GRUPOS>) =====
// Todos os grupos usam a mesma estrutura: cabeçalho, Quem participa, Tópicos (rodadas + comentários), Mural
// e Painel da moderação. Rodadas, comentários e avisos são exemplos gerados a partir do grupo e ficam só em memória.
const gdIndex = parseInt(new URLSearchParams(location.search).get('g'), 10);
const grupo = GRUPOS[gdIndex];
if(!grupo) location.replace('grupos.html');

const EU = 'Rafael Barros';
const HOJE = new Date().toLocaleDateString('pt-BR');
const PESSOAS = ['Bernardo Leitão','Alexandre Collart','Ângela Senna','Lucia Paes de Barros','Erick Figueira de Mello','Sofia Martellini',
  'Sandra Rosenfeld','Zé Roberto','Maria Helena Sobral','Luciana Russi','Claudio Brito','Marta Siqueira','Paulo Regis','Ivone Castro'];
const iniciais = nome => { const p = nome.split(' ').filter(w => /^[A-ZÀ-Ú]/.test(w)); return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase(); };
const corPessoa = nome => CT_PALETA[[...nome].reduce((s, c) => s + c.charCodeAt(0), 0) % CT_PALETA.length];
const avatar = (nome, cls = '') => `<span class="gd-av ${cls}" style="background:${corPessoa(nome)}">${iniciais(nome)}</span>`;

// Membros: você (se participa) + pessoas do grupo, sempre as mesmas para o mesmo grupo
function membrosDoGrupo(){
  const outros = PESSOAS.slice(gdIndex % PESSOAS.length).concat(PESSOAS.slice(0, gdIndex % PESSOAS.length));
  const lista = grupo.participando ? [EU, ...outros] : outros;
  return lista.slice(0, grupo.membros);
}
const [anfitriao, participante2] = PESSOAS.slice(gdIndex % PESSOAS.length);

// Rodadas (tópicos) e avisos de exemplo
const rodadas = gdIndex === 1 ? [
  { t:'Piloto com amigos', aberto:true, desc:'Espaço para testar tópico e mural com o grupo de amigos. Encontro em vídeo, quando houver, fica como data e link neste mural.',
    comentarios:[{ a:EU, mod:true, data:'24/09/2026', txt:'Esta é a rodada aberta. Quando marcarmos o primeiro encontro, a data e o link entram no mural. Sem videochamada embutida.' }] },
  { t:'Combinado do piloto', aberto:false, desc:'Como o grupo vai funcionar: um tópico aberto por vez, avisos no mural e respeito sempre.',
    comentarios:[{ a:'Alexandre Collart', data:'20/09/2026', txt:'Combinado! Eu conduzo as primeiras rodadas.' }, { a:'Bernardo Leitão', data:'21/09/2026', txt:'Perfeito, contem comigo.' }] },
] : [
  { t:`Boas-vindas ao ${grupo.t}`, aberto:true, desc:`Apresente-se: conte de onde você é e o que espera do ${grupo.t}.`,
    comentarios:[{ a:EU, mod:true, data:'24/09/2026', txt:'Sejam bem-vindos! Usem este tópico para se apresentar ao grupo.' }, { a:anfitriao, data:'24/09/2026', txt:'Oi, pessoal! Muito feliz de fazer parte.' }] },
  { t:'Encontro do mês', aberto:true, desc:'Vamos combinar data e lugar do próximo encontro. Sugira um dia da semana e um horário.',
    comentarios:[{ a:participante2, data:'23/09/2026', txt:'Sugiro quinta-feira à noite, depois das 19h.' }] },
  { t:'Combinado do grupo', aberto:false, desc:'Regras de convivência: respeito, nada de propaganda e foco no tema do grupo.',
    comentarios:[{ a:EU, mod:true, data:'15/09/2026', txt:'Rodada arquivada: o combinado está valendo.' }] },
];
const avisos = [
  { a:EU, data:'23/09/2026', txt:grupo.d },
  { a:EU, data:'18/09/2026', txt:`Novo por aqui? Comece pelo tópico “${rodadas[0].t}”.` },
];
let rodadaAtual = 0;

function renderHero(){
  document.title = `${grupo.t} · Grupos · SoftLiving (Protótipo · em aprovação)`;
  document.getElementById('gdHero').innerHTML = `
    <div class="gd-cover" style="background:${grupo.capa};">${ICON[grupo.icon] || ICON.users}</div>
    <div class="gd-hero-body">
      <div class="gd-chips">
        <span class="ct-cat">${ICON[grupo.icon] || ICON.users} ${grupo.cat}</span>
        ${grupo.premium ? `<span class="gd-chip premium">${ICON.star} Premium</span>` : `<span class="gd-chip gratis">Grátis</span>`}
      </div>
      <h1 class="gd-title">${grupo.t}</h1>
      <p class="gd-desc">${grupo.d}</p>
      <div class="gd-hero-foot">
        <span class="gr-members">${ICON.users} <b>${grupo.membros}</b> membro${grupo.membros === 1 ? '' : 's'}</span>
        ${grupo.participando
          ? `<span class="gr-in">✓ Você já é membro deste grupo</span><button type="button" class="gr-leave" id="gdSair">${ICON.logout} Sair</button>`
          : `<span class="gd-out">Participe para comentar e ver os avisos do grupo</span><button type="button" class="gr-join" id="gdEntrar">Participar</button>`}
      </div>
    </div>`;
}

function renderMembros(){
  const lista = membrosDoGrupo();
  const mostrar = lista.slice(0, 6);
  document.getElementById('gdMembers').innerHTML = `
    <div class="in-card-head"><h2>${ICON.users} Quem participa <small class="gd-count">(${grupo.membros})</small></h2></div>
    ${mostrar.map(n => `
      <div class="gd-member">
        ${avatar(n)}
        <span class="gd-member-name">${n}${n === EU ? ' <small>(você)</small>' : ''}</span>
        ${n === EU ? '' : `<button type="button" class="gd-talk">${ICON.chat} Conversar</button>`}
      </div>`).join('')}
    ${lista.length > mostrar.length ? `<a href="#" class="in-link-center">Ver todos os ${grupo.membros} membros →</a>` : ''}`;
}

function renderRodadas(){
  document.getElementById('gdRoundList').innerHTML = rodadas.map((r, i) => `
    <button type="button" class="gd-round ${i === rodadaAtual ? 'active' : ''}" data-rodada="${i}">
      <strong>${r.t}</strong>
      <small>${r.aberto ? 'Aberto' : 'Arquivado'} · ${r.comentarios.length} comentário${r.comentarios.length === 1 ? '' : 's'}</small>
    </button>`).join('');

  const r = rodadas[rodadaAtual];
  const podeComentar = grupo.participando && r.aberto;
  document.getElementById('gdRoundDetail').innerHTML = `
    <h3 class="gd-round-title">${r.t} ${r.aberto ? '' : '<span class="gd-archived">Arquivado</span>'}</h3>
    <p class="gd-round-desc">${r.desc}</p>
    ${podeComentar ? `
      <form class="gd-comment-form" id="gdComment">
        <textarea name="txt" rows="2" placeholder="Seu comentário sobre este tópico..." required></textarea>
        <button type="submit" class="gd-send" aria-label="Enviar comentário"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></button>
      </form>` : `<p class="gd-locked">${r.aberto ? 'Participe do grupo para comentar.' : 'Rodada arquivada: não recebe novos comentários.'}</p>`}
    <div class="gd-comments">
      ${r.comentarios.slice().reverse().map(c => `
        <div class="gd-comment">
          ${avatar(c.a)}
          <div>
            <p class="gd-comment-meta"><b>${c.a}</b>${c.mod ? '<span class="gd-mod-tag">Moderação</span>' : ''}<span>${c.data}</span></p>
            <p class="gd-comment-txt">${c.txt}</p>
          </div>
        </div>`).join('')}
    </div>`;
  document.getElementById('gdModNote').innerHTML = grupo.participando
    ? `${ICON.shield} Você modera este grupo — use o painel abaixo para gerenciar rodadas.` : '';
  document.getElementById('gdModNote').hidden = !grupo.participando;
}

function renderMural(){
  document.getElementById('gdMuralList').innerHTML = grupo.participando
    ? avisos.map(v => `
      <div class="gd-comment gd-notice">
        ${avatar(v.a)}
        <div>
          <p class="gd-comment-meta"><b>${v.a}</b><span class="gd-mod-tag">Aviso</span><span>${v.data}</span></p>
          <p class="gd-comment-txt">${v.txt}</p>
        </div>
      </div>`).join('')
    : '<p class="gd-locked">Participe do grupo para ver os avisos do mural.</p>';
}

function renderModeracao(){
  // No protótipo, quem participa do grupo também o modera, para mostrar o painel
  document.getElementById('gdMod').hidden = !grupo.participando;
  const abertas = rodadas.map((r, i) => ({ ...r, i })).filter(r => r.aberto);
  document.getElementById('gdArchiveList').innerHTML = abertas.length
    ? abertas.map(r => `<button type="button" class="gd-archive" data-arquivar="${r.i}">${ICON.document} Arquivar “${r.t}”</button>`).join('')
    : '<p class="gd-locked">Nenhuma rodada aberta.</p>';
}

function renderTudo(){ renderHero(); renderMembros(); renderRodadas(); renderMural(); renderModeracao(); }

// ---------- interações ----------
document.getElementById('gdHero').addEventListener('click', e => {
  if(e.target.closest('#gdSair')) alternarParticipacao(grupo, false);
  else if(e.target.closest('#gdEntrar')) alternarParticipacao(grupo, true);
  else return;
  renderTudo();
});
document.getElementById('gdTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-tab]'); if(!b) return;
  document.querySelectorAll('#gdTabs .ct-tab').forEach(x => x.classList.toggle('active', x === b));
  document.getElementById('gdTopicos').hidden = b.dataset.tab !== 'topicos';
  document.getElementById('gdMural').hidden = b.dataset.tab !== 'mural';
});
document.getElementById('gdRoundList').addEventListener('click', e => {
  const b = e.target.closest('[data-rodada]'); if(b){ rodadaAtual = +b.dataset.rodada; renderRodadas(); }
});
document.getElementById('gdRoundDetail').addEventListener('submit', e => {
  e.preventDefault();
  const txt = e.target.txt.value.trim(); if(!txt) return;
  rodadas[rodadaAtual].comentarios.push({ a:EU, mod:true, data:HOJE, txt });
  renderRodadas();
});
document.getElementById('gdNewTopic').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  rodadas.unshift({ t:f.titulo.value.trim(), aberto:true, desc:f.guia.value.trim() || 'Nova rodada aberta pela moderação.', comentarios:[] });
  rodadaAtual = 0; f.reset();
  document.querySelector('#gdTabs [data-tab="topicos"]').click();
  renderRodadas(); renderModeracao();
});
document.getElementById('gdNewNotice').addEventListener('submit', e => {
  e.preventDefault();
  avisos.unshift({ a:EU, data:HOJE, txt:e.target.aviso.value.trim() });
  e.target.reset();
  renderMural();
  document.querySelector('#gdTabs [data-tab="mural"]').click();
});
document.getElementById('gdArchiveList').addEventListener('click', e => {
  const b = e.target.closest('[data-arquivar]'); if(!b) return;
  rodadas[+b.dataset.arquivar].aberto = false;
  renderRodadas(); renderModeracao();
});
document.getElementById('gdMembers').addEventListener('click', e => { if(e.target.closest('a[href="#"]')) e.preventDefault(); });

if(grupo){
  grupo.capa = sorteiaDegrade();
  renderTudo();
}
