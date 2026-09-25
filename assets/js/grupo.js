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

function renderTudo(){ renderHero(); renderMembros(); renderRodadas(); renderMural(); renderModeracao(); if(ehDesapego) renderAnuncios(); }

// ---------- interações ----------
document.getElementById('gdHero').addEventListener('click', e => {
  if(e.target.closest('#gdSair')) alternarParticipacao(grupo, false);
  else if(e.target.closest('#gdEntrar')) alternarParticipacao(grupo, true);
  else return;
  renderTudo();
});
const GD_PAINEIS = { anuncios:'gdAnuncios', topicos:'gdTopicos', mural:'gdMural' };
document.getElementById('gdTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-tab]'); if(!b) return;
  document.querySelectorAll('#gdTabs .ct-tab').forEach(x => x.classList.toggle('active', x === b));
  Object.entries(GD_PAINEIS).forEach(([aba, id]) => document.getElementById(id).hidden = aba !== b.dataset.tab);
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

// ===== Grupos de desapego (grupo.tipo === 'desapego') =====
// Em vez de Tópicos, a aba Anúncios: filtros (venda, doação, troca), "Tenho interesse", "Anunciar um item"
// e dicas de segurança. Anúncios de exemplo em desapego-dados.js; os novos ficam só em memória.
const ehDesapego = grupo && grupo.tipo === 'desapego';
const anuncios = ehDesapego ? (DESAPEGO[grupo.t] || []).map(a => ({ ...a, capa: sorteiaDegrade() })) : [];
let filtroAnuncio = 'todos';
const TIPO_ANUNCIO = { venda:'Venda', doacao:'Doação', troca:'Troca' };
const precoAnuncio = a => a.tipo === 'venda' ? a.preco : TIPO_ANUNCIO[a.tipo];

function renderAnuncios(){
  const lista = anuncios.map((a, i) => ({ ...a, i })).filter(a => filtroAnuncio === 'todos' || a.tipo === filtroAnuncio);
  const cont = t => anuncios.filter(a => t === 'todos' || a.tipo === t).length;
  const pode = grupo.participando;
  document.getElementById('gdAnuncios').innerHTML = `
    <div class="in-card-head"><h2>${ICON.store} Anúncios do grupo</h2>${pode ? `<button type="button" class="gr-join" data-anunciar>${ICON.plus} Anunciar um item</button>` : ''}</div>
    <div class="dz-body">
      <div class="dz-safety">${ICON.shield}<div><b>Negocie com segurança</b><span>Combine a entrega em local público e movimentado, veja o item antes de pagar e nunca pague adiantado para quem você não conhece.</span></div></div>
      <form class="dz-form" id="dzForm" hidden>
        <div class="dz-form-grid">
          <label>O que você quer anunciar?<input type="text" name="t" placeholder="Ex.: Mesa de centro" required></label>
          <label>Tipo<select name="tipo"><option value="venda">Venda</option><option value="doacao">Doação</option><option value="troca">Troca</option></select></label>
          <label class="dz-preco">Preço<input type="text" name="preco" placeholder="Ex.: R$150"></label>
          <label>Categoria<select name="cat">${DESAPEGO_CATEGORIAS.map(c => `<option>${c}</option>`).join('')}</select></label>
          <label>Estado<select name="estado">${DESAPEGO_ESTADOS.map(c => `<option>${c}</option>`).join('')}</select></label>
          <label>Bairro<input type="text" name="bairro" placeholder="Ex.: Tijuca" required></label>
        </div>
        <label>Descrição<textarea name="d" rows="2" placeholder="Conte o estado do item e como combinar a entrega"></textarea></label>
        <div class="dz-form-actions"><button type="submit" class="gr-join">Publicar anúncio</button><button type="button" class="gr-leave" data-cancelar>Cancelar</button></div>
      </form>
      <div class="ct-tabs dz-filtros">${['todos','venda','doacao','troca'].map(t => `<button type="button" class="ct-tab ${t === filtroAnuncio ? 'active' : ''}" data-filtro="${t}">${t === 'todos' ? 'Tudo' : TIPO_ANUNCIO[t]} (${cont(t)})</button>`).join('')}</div>
      ${pode ? '' : '<p class="gd-locked">Participe do grupo para anunciar e falar com quem anunciou.</p>'}
      <div class="dz-grid">${lista.map(a => `
        <article class="ct-card dz-card ${a.meu ? 'dz-meu' : ''} ${a.concluido ? 'dz-concluido' : ''}">
          <div class="ct-cover"><div class="ct-ph" style="background:${a.capa};">${ICON[DESAPEGO_ICONES[a.cat]] || ICON.store}</div>
            <span class="dz-tag dz-${a.tipo}">${a.concluido ? (a.tipo === 'venda' ? 'Vendido' : a.tipo === 'doacao' ? 'Doado' : 'Trocado') : precoAnuncio(a)}</span></div>
          <div class="ct-body">
            <span class="ct-cat">${a.cat}</span>
            <h3 class="ct-title">${a.t}</h3>
            <p class="ct-excerpt">${a.d}</p>
            <p class="dz-info">${a.estado} · ${ICON.pin} ${a.bairro}</p>
            <p class="ct-author">${ICON.user} ${a.meu ? 'Seu anúncio' : a.quem}</p>
            ${a.meu ? `<div class="gr-foot">${a.concluido ? '' : `<button type="button" class="gr-join" data-concluir="${a.i}">Marcar como ${a.tipo === 'venda' ? 'vendido' : a.tipo === 'doacao' ? 'doado' : 'trocado'}</button>`}<button type="button" class="gr-leave" data-remover="${a.i}">Remover</button></div>`
              : a.interesse ? `<p class="dz-enviado">${ICON.chat} Mensagem enviada. ${a.quem.split(' ')[0]} vai responder em Conversas.</p>`
              : a.escrevendo ? `<div class="dz-msg"><textarea rows="2" data-texto="${a.i}">Olá! Tenho interesse em "${a.t}". Ainda está disponível?</textarea><button type="button" class="gr-join" data-enviar="${a.i}">Enviar</button></div>`
              : pode && !a.concluido ? `<button type="button" class="ct-cta gratis" data-interesse="${a.i}">${ICON.chat} Tenho interesse</button>` : ''}
          </div>
        </article>`).join('') || '<p class="ct-empty">Nenhum anúncio neste filtro.</p>'}
      </div>
    </div>`;
}

if(ehDesapego){
  const abaAnuncios = document.querySelector('#gdTabs [data-tab="anuncios"]'), abaTopicos = document.querySelector('#gdTabs [data-tab="topicos"]');
  abaAnuncios.hidden = false; abaTopicos.hidden = true;
  abaAnuncios.classList.add('active'); abaTopicos.classList.remove('active');
  document.getElementById('gdTopicos').hidden = true;
  document.getElementById('gdAnuncios').hidden = false;
  // na moderação de desapego não há rodadas: fica só o aviso no mural
  document.getElementById('gdNewTopic').hidden = true;
  document.getElementById('gdArchiveBlock').hidden = true;
  avisos.splice(0, avisos.length,
    { a:EU, data:'23/09/2026', txt:'Regras do grupo: um anúncio por item, sempre com preço ou a indicação de doação ou troca. Nada de revenda comercial.' },
    { a:EU, data:'20/09/2026', txt:'Depois de vender, doar ou trocar, marque o anúncio como concluído para ninguém perder tempo.' });

  document.getElementById('gdAnuncios').addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b) return;
    const d = b.dataset, form = document.getElementById('dzForm');
    if(d.filtro){ filtroAnuncio = d.filtro; }
    else if(d.anunciar !== undefined){ form.hidden = false; form.t.focus(); return; }
    else if(d.cancelar !== undefined){ form.hidden = true; form.reset(); return; }
    else if(d.interesse){ anuncios[+d.interesse].escrevendo = true; }
    else if(d.enviar){ const t = document.querySelector(`[data-texto="${d.enviar}"]`); if(!t.value.trim()) return; anuncios[+d.enviar].interesse = true; }
    else if(d.concluir){ anuncios[+d.concluir].concluido = true; }
    else if(d.remover){ anuncios.splice(+d.remover, 1); }
    else return;
    renderAnuncios();
  });
  document.getElementById('gdAnuncios').addEventListener('change', e => {
    if(e.target.name === 'tipo') e.target.form.querySelector('.dz-preco').hidden = e.target.value !== 'venda';
  });
  document.getElementById('gdAnuncios').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if(f.tipo.value === 'venda' && !f.preco.value.trim()){ f.preco.focus(); return; }
    anuncios.unshift({ t:f.t.value.trim(), tipo:f.tipo.value, preco:'R$' + f.preco.value.trim().replace(/^R\$\s*/, ''), cat:f.cat.value, estado:f.estado.value,
      bairro:f.bairro.value.trim(), quem:EU, d:f.d.value.trim() || 'Sem descrição.', meu:true, capa:sorteiaDegrade() });
    filtroAnuncio = 'todos';
    renderAnuncios();
  });
}

if(grupo){
  grupo.capa = sorteiaDegrade();
  renderTudo();
}
