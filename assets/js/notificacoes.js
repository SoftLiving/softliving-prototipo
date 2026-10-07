// VERSÃO 2 · Tela Notificações. Os avisos (NOTIFICACOES) e o controle de lidas ficam no layout.js, porque a janela
// do sino no topo usa os mesmos dados em todas as páginas. Aqui: filtros, lista completa e preferências.
const NT_TIPOS = [['todas','Todas'],['naolidas','Não lidas'],['grupos','Grupos'],['colunas','Colunas'],['conteudos','Conteúdos'],['creditos','Créditos']];
const NT_PREFS = [
  ['colunas', 'Novas colunas de quem eu acompanho', true],
  ['grupos', 'Mensagens e encontros dos meus grupos', true],
  ['respostas', 'Respostas aos meus comentários', true],
  ['conteudos', 'Novos conteúdos dos assuntos que sigo', true],
  ['creditos', 'Créditos, bônus e carteira', true],
  ['email', 'Resumo semanal por e-mail', false],
];
let ntFiltro = 'todas';

function ntItem(n){
  const nova = ehNova(n);
  return `<div class="nt-item${nova ? ' nova' : ''}" data-id="${n.id}">
    ${ntAvatar(n)}
    <div class="nt-txt"><p>${n.txt.replace('SoftLiving', LOGO)}</p><small class="nt-quando">${n.q}</small>
      <a href="${n.acao[1]}" class="btn ghost nt-acao">${n.acao[0]}</a></div>
    ${nova ? '<button type="button" class="nt-marcar" title="Marcar como lida" aria-label="Marcar como lida"><i></i></button>' : ''}
  </div>`;
}
// Chamada também pelo layout.js sempre que algo é marcado como lido (inclusive pela janela do sino)
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
}

document.getElementById('ntTipos').addEventListener('click', e => { const b = e.target.closest('button'); if(b){ ntFiltro = b.dataset.tipo; renderNotificacoes(); } });
document.getElementById('ntLerTodas').addEventListener('click', () => { marcarTodasLidas(); mostrarAviso('Todas as notificações foram marcadas como lidas'); });
document.getElementById('ntLista').addEventListener('click', e => {
  const item = e.target.closest('.nt-item'); if(!item) return;
  if(e.target.closest('.nt-marcar')) marcarLida(+item.dataset.id);
  else if(e.target.closest('.nt-acao')){                     // abrir a ação também marca como lida (sem redesenhar a lista antes de sair)
    ntLidas.add(+item.dataset.id);
    try { localStorage.setItem('v2NotifLidas', JSON.stringify([...ntLidas])); } catch(err){}
  }
});

// Preferências (interruptores), guardadas no navegador
let ntPrefs = {};
try { ntPrefs = JSON.parse(localStorage.getItem('v2NotifPrefs')) || {}; } catch(e){}
document.getElementById('ntPrefs').innerHTML = NT_PREFS.map(([k, t, p]) => `
  <label class="nt-pref-item"><span>${t}</span><input type="checkbox" class="nt-chave" data-pref="${k}" ${(k in ntPrefs ? ntPrefs[k] : p) ? 'checked' : ''}><i aria-hidden="true"></i></label>`).join('');
document.getElementById('ntPrefs').addEventListener('change', e => {
  const c = e.target.closest('.nt-chave'); if(!c) return;
  ntPrefs[c.dataset.pref] = c.checked;
  try { localStorage.setItem('v2NotifPrefs', JSON.stringify(ntPrefs)); } catch(e){}
  mostrarAviso(c.checked ? 'Notificação ativada' : 'Notificação desativada');
});
renderNotificacoes();
