// VERSÃO 2 · Tela Amigos (antiga Conexões). Pessoas fictícias. Situação de cada pessoa:
// 'amigo' (já é amigo), 'pedido' (pediu amizade a você), 'sugestao' (dos mesmos grupos) ou 'enviado' (você pediu).
// As mudanças (aceitar, recusar, adicionar) ficam guardadas no navegador.
const PESSOAS = [
  { id:1,  nome:'Alexandre Duarte', cor:'#013565', grupo:'Amigos', gostos:['Encontros', 'Caminhada'], s:'amigo' },
  { id:2,  nome:'Helena Martins', cor:'#7a3b52', grupo:'Clube do Vinho', gostos:['Vinhos', 'Viagens'], s:'amigo' },
  { id:3,  nome:'Marcos Teixeira', cor:'#2f8578', grupo:'Yoga & Meditação', gostos:['Yoga', 'Leitura'], s:'amigo' },
  { id:4,  nome:'Célia Ribeiro', cor:'#b0513a', grupo:'Amigos', gostos:['Culinária', 'Música'], s:'amigo' },
  { id:5,  nome:'Beatriz Nogueira', cor:'#5b4b8a', grupo:'Clube do Filme', gostos:['Cinema', 'Teatro'], s:'amigo' },
  { id:6,  nome:'Jorge Albuquerque', cor:'#8a6414', grupo:'Cinema em Conversa', gostos:['Séries', 'Futebol'], s:'amigo' },
  { id:7,  nome:'Lúcia Campos', cor:'#2f5d3a', grupo:'Yoga & Meditação', gostos:['Meditação', 'Jardinagem'], s:'pedido', comum:3 },
  { id:8,  nome:'Roberto Freitas', cor:'#3f6b8f', grupo:'Clube do Vinho', gostos:['Vinhos', 'Gastronomia'], s:'pedido', comum:2 },
  { id:9,  nome:'Luciana Russi', cor:'#2f5d3a', grupo:'Clube do Filme', gostos:['Cinema', 'Livros'], s:'sugestao', comum:4 },
  { id:10, nome:'Maria Helena Sobral', cor:'#d4a24c', grupo:'Amigos', gostos:['Artesanato', 'Viagens'], s:'sugestao', comum:2 },
  { id:11, nome:'Claudio Brito', cor:'#c1633f', grupo:'Cinema em Conversa', gostos:['Fotografia', 'Cinema'], s:'sugestao', comum:1 },
  { id:12, nome:'Sônia Prado', cor:'#7a3b52', grupo:'Yoga & Meditação', gostos:['Pilates', 'Leitura'], s:'sugestao', comum:3 },
];
const AM_TIPOS = [['amigo', 'Seus amigos'], ['sugestao', 'Sugestões'], ['seguindo', 'Seguindo']];   // Seguindo: função da V1 (pessoas-dados.js)
let amTipo = 'amigo';
const siglaPessoa = n => n.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('');
const semAcentoAm = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Situação guardada no navegador por cima da inicial
try { Object.entries(JSON.parse(localStorage.getItem('v2Amigos')) || {}).forEach(([id, s]) => { const p = PESSOAS.find(x => x.id === +id); if(p) p.s = s; }); } catch(e){}
function mudar(id, s){
  PESSOAS.find(x => x.id === id).s = s;
  const salvo = {}; PESSOAS.forEach(p => salvo[p.id] = p.s);
  try { localStorage.setItem('v2Amigos', JSON.stringify(salvo)); } catch(e){}
  renderAmigos();
}

const avatar = (p, cls = '') => `<span class="av-col am-av ${cls}" style="background:${p.cor}">${siglaPessoa(p.nome)}</span>`;
const contexto = p => `do grupo <b>${p.grupo}</b>${p.comum ? ` · ${p.comum} ${p.comum === 1 ? 'amigo' : 'amigos'} em comum` : ''}`;

function cartao(p){
  const acao = amTipo === 'seguindo'
    ? `<button type="button" class="btn ghost" data-deixar="${p.id}">Deixar de seguir</button>`
    : p.s === 'amigo'
    ? `<a href="${urlConversa(p.id)}" class="btn ghost">${icone('comentarios')}Mensagem</a>`
    : p.s === 'enviado'
      ? `<button type="button" class="btn ghost am-enviado" data-cancelar="${p.id}">Pedido enviado</button>`
      : `<button type="button" class="btn" data-adicionar="${p.id}">${icone('mais')}Adicionar</button>`;
  return `
    <article class="am-card">
      ${avatar(p)}
      <h3>${p.nome}</h3>
      <p class="am-ctx">${contexto(p)}</p>
      <div class="am-gostos">${p.gostos.map(g => `<span>${g}</span>`).join('')}</div>
      ${acao}
      ${amTipo === 'sugestao' ? `<button type="button" class="bs-link am-seguir" data-seguir="${p.id}">${lerSeguindo().includes(p.id) ? 'Seguindo' : 'Seguir'}</button>` : ''}
    </article>`;
}

function renderAmigos(){
  // Pedidos de amizade
  const pedidos = PESSOAS.filter(p => p.s === 'pedido');
  const blocoPed = document.getElementById('amPedidos');
  blocoPed.hidden = !pedidos.length;
  blocoPed.innerHTML = `<h2>Pedidos de amizade <small>${pedidos.length}</small></h2>
    <div class="am-ped-lista">${pedidos.map(p => `
      <div class="am-pedido">
        ${avatar(p)}
        <div class="am-ped-txt"><b>${p.nome}</b><span>${contexto(p)}</span></div>
        <div class="am-ped-acoes">
          <button type="button" class="btn" data-aceitar="${p.id}">Aceitar</button>
          <button type="button" class="btn ghost" data-recusar="${p.id}">Recusar</button>
        </div>
      </div>`).join('')}</div>`;
  // Menu: número de pedidos
  document.querySelectorAll('.nav a[data-page="amigos"] .tag').forEach(t => { t.textContent = pedidos.length; t.hidden = !pedidos.length; });

  // Abas e grade
  const seguindo = lerSeguindo();
  // quem você segue pode não estar entre amigos e sugestões: vem de pessoas-dados.js
  const seguidos = () => seguindo.map(id => PESSOAS.find(p => p.id === id) || (m => m && { ...m, grupo:m.grupos[0], gostos:m.interesses.slice(0, 2) })(MEMBROS.find(x => x.id === id))).filter(Boolean);
  const conta = k => k === 'seguindo' ? seguidos().length : PESSOAS.filter(p => k === 'amigo' ? p.s === 'amigo' : p.s === 'sugestao' || p.s === 'enviado').length;
  document.getElementById('amTipos').innerHTML = AM_TIPOS.map(([k, l]) =>
    `<button type="button" role="tab" class="${k === amTipo ? 'on' : ''}" aria-selected="${k === amTipo}" data-tipo="${k}">${l} <small>${conta(k)}</small></button>`).join('');
  const termo = '';                                       // a busca fica só na página Busca
  const lista = amTipo === 'seguindo' ? seguidos() : PESSOAS.filter(p => (amTipo === 'amigo' ? p.s === 'amigo' : p.s === 'sugestao' || p.s === 'enviado')
    && (!termo || semAcentoAm(`${p.nome} ${p.grupo} ${p.gostos.join(' ')}`).includes(termo)));
  document.getElementById('amGrade').innerHTML = lista.map(cartao).join('');
  const vazio = document.getElementById('amVazio');
  vazio.hidden = !!lista.length;
  vazio.textContent = termo ? 'Ninguém encontrado com esse nome ou grupo.' : amTipo === 'amigo' ? 'Você ainda não tem amigos por aqui. Veja as sugestões.'
    : amTipo === 'seguindo' ? 'Você ainda não segue ninguém. Nas sugestões, toque em Seguir.' : 'Sem sugestões no momento.';
}

document.getElementById('amTipos').addEventListener('click', ev => { const b = ev.target.closest('button'); if(b){ amTipo = b.dataset.tipo; renderAmigos(); } });
document.querySelector('main').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  const d = b.dataset, nome = id => PESSOAS.find(x => x.id === +id).nome;
  if(!Object.keys(d).length) return;
  if(d.aceitar){ mudar(+d.aceitar, 'amigo'); mostrarAviso(`Você e ${nome(d.aceitar)} agora são amigos`); }
  else if(d.recusar){ mudar(+d.recusar, 'sugestao'); mostrarAviso('Pedido recusado'); }
  else if(d.adicionar){ mudar(+d.adicionar, 'enviado'); mostrarAviso(`Pedido de amizade enviado para ${nome(d.adicionar)}`); }
  else if(d.cancelar){ mudar(+d.cancelar, 'sugestao'); mostrarAviso('Pedido cancelado'); }
  else if(d.seguir){ const segue = alternarSeguir(+d.seguir); renderAmigos(); mostrarAviso(segue ? `Você está seguindo ${nome(d.seguir)}` : `Você deixou de seguir ${nome(d.seguir)}`); }
  else if(d.deixar){ alternarSeguir(+d.deixar); renderAmigos(); mostrarAviso('Você deixou de seguir esta pessoa'); }
});
renderAmigos();
