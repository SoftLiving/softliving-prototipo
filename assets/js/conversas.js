// VERSÃO 2 · Tela Conversas: mensagens diretas com os amigos (MEMBROS com s:'amigo', em pessoas-dados.js).
// Lista de conversas e a conversa aberta (conversas.html?c=<id do membro>); no celular aparece uma de cada vez.
// Mensagens fictícias, sem dia nem hora (regra da v2); o que a pessoa escreve fica guardado no navegador (v2Mensagens).
// eu:true = mensagem sua. novas: quantas mensagens ainda não lidas.
const CV_INICIAIS = {
  1: { novas:1, msgs:[{ t:'Rafael, o encontro de sábado está de pé?' }, { t:'Está, sim. Às 10h, na entrada do parque.', eu:true }, { t:'Ótimo. Levo a garrafa de café.' }] },
  2: { novas:0, msgs:[{ t:'Você viu a coluna nova sobre os vinhos da Suíça?' }, { t:'Vi! Fiquei com vontade de provar o branco do Valais.', eu:true }, { t:'Vou levar uma garrafa no próximo encontro do clube.' }, { t:'Combinado.', eu:true }] },
  3: { novas:0, msgs:[{ t:'A prática de quinta mudou de horário, viu o aviso no mural?' }, { t:'Vi, obrigado por avisar.', eu:true }] },
  5: { novas:0, msgs:[{ t:'Gostei muito do filme que você indicou.', eu:true }, { t:'Que bom! No clube deste mês tem outro do mesmo diretor.' }] },
};
let cvGuardado = {};
try { cvGuardado = JSON.parse(localStorage.getItem('v2Mensagens')) || {}; } catch(e){}
const cvMsgs = id => [...((CV_INICIAIS[id] || {}).msgs || []), ...(cvGuardado[id] || []).map(t => ({ t, eu:true }))];
const cvEsc = t => t.replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const cvAmigos = () => MEMBROS.filter(m => m.s === 'amigo');
const cvAvatar = (m, cls = '') => `<span class="av-col ${cls}" style="background:${m.cor}">${siglaMembro(m.nome)}</span>`;
let cvLidas = new Set();
let cvAberta = +new URLSearchParams(location.search).get('c') || null;
if(cvAberta && !cvAmigos().some(m => m.id === cvAberta)) cvAberta = null;

function renderLista(){
  // quem já tem conversa primeiro; depois os amigos com quem ainda não conversou
  const amigos = cvAmigos().sort((a, b) => (cvMsgs(b.id).length ? 1 : 0) - (cvMsgs(a.id).length ? 1 : 0));
  document.getElementById('cvLista').innerHTML = amigos.length ? amigos.map(m => {
    const msgs = cvMsgs(m.id), ultima = msgs[msgs.length - 1];
    const novas = cvLidas.has(m.id) ? 0 : (CV_INICIAIS[m.id] || {}).novas || 0;
    return `
      <button type="button" class="cv-item${m.id === cvAberta ? ' on' : ''}" data-conversa="${m.id}">
        ${cvAvatar(m)}
        <span class="cv-item-txt"><b>${m.nome}</b><small>${ultima ? (ultima.eu ? 'Você: ' : '') + cvEsc(ultima.t) : 'Comece a conversa'}</small></span>
        ${novas ? `<i class="cv-novas" aria-label="${novas} mensagem nova">${novas}</i>` : ''}
      </button>`;
  }).join('') : `<p class="vazio">Você ainda não tem amigos para conversar.<br><a href="${urlPagina('amigos')}" class="bs-link">Ver sugestões de amigos</a></p>`;
}

function renderConversa(){
  const el = document.getElementById('cvConversa');
  document.getElementById('cv').classList.toggle('aberta', !!cvAberta);
  const m = MEMBROS.find(x => x.id === cvAberta);
  if(!m){ el.innerHTML = `<p class="vazio cv-escolha">Escolha uma conversa ao lado.</p>`; return; }
  const msgs = cvMsgs(m.id);
  el.innerHTML = `
    <header class="cv-topo">
      <button type="button" class="round cv-voltar" data-fechar aria-label="Voltar para a lista de conversas">${icone('voltar')}</button>
      ${cvAvatar(m)}
      <span class="cv-item-txt"><b>${m.nome}</b><small>${m.cidade}</small></span>
    </header>
    <div class="cv-msgs" id="cvMsgs">${msgs.length ? msgs.map(x => `<p class="cv-msg${x.eu ? ' eu' : ''}">${cvEsc(x.t)}</p>`).join('') : `<p class="vazio">Diga olá para ${m.nome.split(' ')[0]}.</p>`}</div>
    <form class="cv-escrever" id="cvEscrever">
      <textarea name="txt" rows="1" placeholder="Escreva uma mensagem" aria-label="Sua mensagem" required></textarea>
      <button type="submit" class="btn">Enviar</button>
    </form>`;
  const caixa = document.getElementById('cvMsgs');
  caixa.scrollTop = caixa.scrollHeight;
}

function abrirConversa(id){
  cvAberta = id;
  if(id) cvLidas.add(id);
  const url = new URL(location.href);
  if(id) url.searchParams.set('c', id); else url.searchParams.delete('c');
  history.replaceState(null, '', url);
  renderLista(); renderConversa();
}

document.getElementById('cv').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.dataset.conversa) abrirConversa(+b.dataset.conversa);
  else if(b.dataset.fechar !== undefined) abrirConversa(null);
});
document.getElementById('cv').addEventListener('submit', ev => {
  ev.preventDefault();
  const campo = ev.target.txt, t = campo.value.trim(); if(!t) return;
  cvGuardado[cvAberta] = [...(cvGuardado[cvAberta] || []), t];
  try { localStorage.setItem('v2Mensagens', JSON.stringify(cvGuardado)); } catch(e){}
  renderLista(); renderConversa();
  document.querySelector('#cvEscrever textarea').focus();
});
// Enter envia; Shift + Enter quebra a linha
document.getElementById('cv').addEventListener('keydown', ev => {
  if(ev.key === 'Enter' && !ev.shiftKey && ev.target.matches('#cvEscrever textarea')){ ev.preventDefault(); ev.target.form.requestSubmit(); }
});
if(cvAberta) cvLidas.add(cvAberta);
renderLista(); renderConversa();
