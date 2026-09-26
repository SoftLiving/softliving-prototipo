// VERSÃO 2 · Tela Notificações. Lista fictícia de avisos (grupos, colunas, conteúdos, créditos, SoftLiving).
// Sem datas nem horários (regra da v2). Lidas e preferências ficam no navegador; o número do sino no menu acompanha.
const NT_ICONES = { grupos:'grupos', colunas:'colunas', conteudos:'conteudos', creditos:'carteira', softliving:'sino' };
const NOTIFICACOES = [
  { id:1, tipo:'colunas', quem:'Sofia Martellini', txt:'<b>Sofia Martellini</b> publicou uma nova coluna: “Como o boom das canetas emagrecedoras está impactando a moda?”', acao:['Ler coluna', urlPagina('colunas')] },
  { id:2, tipo:'grupos', grupo:'Amigos', txt:'<b>2 mensagens novas</b> no grupo <b>Amigos</b>. O Alexandre deixou o aviso do encontro no mural.', acao:['Ver grupo', `${V1_ROOT}grupo.html?g=1`] },
  { id:3, tipo:'creditos', txt:'Você ganhou <b>5 créditos de bônus</b> por responder à pesquisa da semana.', acao:['Ver carteira', '#'] },
  { id:4, tipo:'grupos', grupo:'Yoga & Meditação', txt:'Nova prática guiada marcada no grupo <b>Yoga & Meditação</b>. Confirme sua presença.', acao:['Ver grupo', `${V1_ROOT}grupo.html?g=4`], lida:true },
  { id:5, tipo:'conteudos', conteudo:1, txt:'Novo conteúdo sobre um assunto que você segue: <b>“Na Suíça, um vinho para chamar de seu”</b>.', acao:['Ler', urlPagina('conteudos')], lida:true },
  { id:6, tipo:'colunas', quem:'Zé Roberto', txt:'<b>Zé Roberto</b> respondeu ao seu comentário na coluna <b>Toque do Barão</b>.', acao:['Ver resposta', urlPagina('colunas')], lida:true },
  { id:7, tipo:'grupos', grupo:'Clube do Vinho', txt:'Você foi convidado para o <b>Clube do Vinho</b>, grupo gratuito da coluna de vinhos.', acao:['Participar', urlPagina('grupos')], lida:true },
  { id:8, tipo:'softliving', txt:'Boas-vindas à SoftLiving! Complete seu perfil para receber conteúdos do seu jeito.', acao:['Completar perfil', '#'], lida:true },
];
const NT_TIPOS = [['todas','Todas'],['naolidas','Não lidas'],['grupos','Grupos'],['colunas','Colunas'],['conteudos','Conteúdos'],['creditos','Créditos']];
const NT_PREFS = [
  ['colunas', 'Novas colunas de quem eu acompanho', true],
  ['grupos', 'Mensagens e encontros dos meus grupos', true],
  ['respostas', 'Respostas aos meus comentários', true],
  ['conteudos', 'Novos conteúdos dos assuntos que sigo', true],
  ['creditos', 'Créditos, bônus e carteira', true],
  ['email', 'Resumo semanal por e-mail', false],
];
const ntLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const ntGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
let ntFiltro = 'todas';
const ntLidas = new Set(ntLer('v2NotifLidas', []));
const ehNova = n => !n.lida && !ntLidas.has(n.id);
const naoLidas = () => NOTIFICACOES.filter(ehNova);

function ntAvatar(n){
  if(n.quem){ const c = COLUNISTAS.find(x => x.nome === n.quem) || {}; return `<span class="av-col nt-av" style="background:${c.cor}">${c.sigla}</span>`; }
  const foto = n.grupo ? (GRUPOS.find(g => g.t === n.grupo) || {}).foto : n.conteudo != null ? CONTEUDOS[n.conteudo].foto : null;
  if(foto) return `<img class="nt-av" src="${fotoUrl(foto, 120)}" alt="">`;
  return `<span class="nt-av nt-av-ic">${icone(NT_ICONES[n.tipo])}</span>`;
}
function ntItem(n){
  const nova = ehNova(n);
  return `<div class="nt-item${nova ? ' nova' : ''}" data-id="${n.id}">
    ${ntAvatar(n)}
    <div class="nt-txt"><p>${n.txt.replace('SoftLiving', LOGO)}</p>
      <a href="${n.acao[1]}" class="btn ghost nt-acao">${n.acao[0]}</a></div>
    ${nova ? '<button type="button" class="nt-marcar" title="Marcar como lida" aria-label="Marcar como lida"><i></i></button>' : ''}
  </div>`;
}
function atualizarContador(){
  const n = naoLidas().length;
  ntGravar('v2NotifNaoLidas', n);
  document.querySelectorAll('.nav a[data-page="notificacoes"] .tag').forEach(t => { t.textContent = n; t.hidden = !n; });
  document.querySelectorAll('.top a[aria-label="Notificações"] i').forEach(i => i.hidden = !n);
}
function renderNotificacoes(){
  const conta = { todas:NOTIFICACOES.length, naolidas:naoLidas().length };
  NT_TIPOS.slice(2).forEach(([k]) => conta[k] = NOTIFICACOES.filter(n => n.tipo === k).length);
  document.getElementById('ntTipos').innerHTML = NT_TIPOS.map(([k, l]) => `<button type="button" role="tab" class="${k === ntFiltro ? 'on' : ''}" aria-selected="${k === ntFiltro}" data-tipo="${k}">${l} <small>${conta[k]}</small></button>`).join('');
  const lista = NOTIFICACOES.filter(n => ntFiltro === 'todas' || (ntFiltro === 'naolidas' ? ehNova(n) : n.tipo === ntFiltro));
  const novas = lista.filter(ehNova), antigas = lista.filter(n => !ehNova(n));
  const bloco = (t, l) => l.length ? `<div class="nt-grupo"><h2>${t} <small>${l.length}</small></h2><div class="nt-lista">${l.map(ntItem).join('')}</div></div>` : '';
  document.getElementById('ntLista').innerHTML = lista.length ? bloco('Não lidas', novas) + bloco('Anteriores', antigas)
    : `<div class="nt-vazio caixa-branca">${icone('sino')}<p>Tudo em dia. Nenhuma notificação por aqui.</p></div>`;
  document.getElementById('ntLerTodas').disabled = !naoLidas().length;
  atualizarContador();
}
function marcarLida(id){ ntLidas.add(id); ntGravar('v2NotifLidas', [...ntLidas]); }

document.getElementById('ntTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ntFiltro = b.dataset.tipo; renderNotificacoes(); } });
document.getElementById('ntLerTodas').addEventListener('click', () => { naoLidas().forEach(n => marcarLida(n.id)); renderNotificacoes(); mostrarAviso('Todas as notificações foram marcadas como lidas'); });
document.getElementById('ntLista').addEventListener('click', e => {
  const item = e.target.closest('.nt-item'); if(!item) return;
  marcarLida(+item.dataset.id);                    // abrir a ação também marca como lida
  if(e.target.closest('.nt-marcar')) renderNotificacoes();
});

// Preferências (interruptores)
const ntPrefs = ntLer('v2NotifPrefs', {});
document.getElementById('ntPrefs').innerHTML = NT_PREFS.map(([k, t, p]) => `
  <label class="nt-pref-item"><span>${t}</span><input type="checkbox" class="nt-chave" data-pref="${k}" ${(k in ntPrefs ? ntPrefs[k] : p) ? 'checked' : ''}><i aria-hidden="true"></i></label>`).join('');
document.getElementById('ntPrefs').addEventListener('change', e => {
  const c = e.target.closest('.nt-chave'); if(!c) return;
  ntPrefs[c.dataset.pref] = c.checked; ntGravar('v2NotifPrefs', ntPrefs);
  mostrarAviso(c.checked ? 'Notificação ativada' : 'Notificação desativada');
});
renderNotificacoes();
