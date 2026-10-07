// VERSÃO 2 · Tela Carteira. Saldo fictício: ainda sem recarga, 41 de bônus (o mesmo total do topo, SALDO_BASE no
// layout.js), mais o bônus ganho respondendo pesquisas no protótipo. Nenhum pagamento acontece.
// Extrato com data e hora (decisão de 2026-10-06), do mais recente para o mais antigo. q: quando; v: valor; b: é bônus?
// O bônus é usado primeiro e vale por 12 meses; os créditos comprados não têm prazo.
const EXTRATO = [
  { q:'04/10/2026 às 20:15', t:'Conteúdo destravado: Celular para os pais', d:'Acervo SoftLiving', v:-2, b:true },
  { q:'04/10/2026 às 19:48', t:'Conteúdo destravado: Casa conectada, primeiros passos', d:'Acervo SoftLiving', v:-2, b:true },
  { q:'02/10/2026 às 10:30', t:'Respostas às pesquisas de opinião', d:'1 crédito de bônus por pergunta', v:10, b:true },
  { q:'29/09/2026 às 09:05', t:'Pesquisa da semana', d:'Bônus por participar', v:5, b:true },
  { q:'27/09/2026 às 17:22', t:'Indicação aprovada: Marcos Teixeira', d:'Bônus de indicação', v:5, b:true },
  { q:'25/09/2026 às 11:40', t:'Indicação aprovada: Helena Martins', d:'Bônus de indicação', v:5, b:true },
  { q:'23/09/2026 às 14:45', t:'Boas-vindas à SoftLiving', d:'Bônus de cadastro', v:20, b:true },
];
const VALORES = [20, 50, 100, 200];
// Bônus das recargas: na primeira, R$50 ganha +50 (100%); nas demais (e nos outros valores), a tabela progressiva abaixo
const BONUS_RECARGA = { 20:0, 50:5, 100:15, 200:40 };
const BONUS_PRIMEIRA = { 50:50 };
const PRIMEIRA_RECARGA = true;                 // ainda não houve recarga
// Os cartões de valor mostram sempre a tabela das recargas; a oferta da primeira recarga fica só no box dourado do saldo
const bonusDe = v => BONUS_RECARGA[v];
let valor = 50, forma = 'Pix', filtro = 'tudo';

// Conteúdos destravados nesta conta (comprarConteudo, no layout.js): entram no extrato como saídas, do mais recente
const comprasNoExtrato = () => lerCompras().map(x => ({ q:x.q || agoraTexto(), t:`Conteúdo destravado: ${x.t}`, d:'Destravado na leitura', v:-x.v, b:true }));
function renderSaldo(){
  const extra = lerBonusCreditos();            // bônus das pesquisas respondidas nesta sessão
  const comprados = EXTRATO.filter(x => !x.b).reduce((s, x) => s + x.v, 0);
  const bonus = EXTRATO.filter(x => x.b).reduce((s, x) => s + x.v, 0) + extra - creditosGastos();   // no protótipo, os gastos saem do bônus
  document.getElementById('ctSaldo').innerHTML = `
    <div class="ct-total">
      <small>Saldo disponível</small>
      <b>${comprados + bonus}</b><span>créditos</span>
      <div class="ct-partes">
        <span><i class="ct-ponto comprados"></i>${comprados} comprados</span>
        <span><i class="ct-ponto bonus"></i>${bonus} de bônus</span>
      </div>
      <p class="ct-validade">O bônus é usado primeiro e vale por 12 meses. Os créditos comprados não têm prazo.</p>
    </div>
    ${PRIMEIRA_RECARGA ? `
    <div class="ct-oferta">
      <span class="ct-oferta-rotulo">${icone('presente')}Primeira recarga</span>
      <p><b>R$50</b> viram <b>50 créditos + 50 de bônus</b></p>
      <p class="ct-oferta-depois">Nas próximas recargas, bônus de 10% a 20%</p>
      <a href="#recarga" class="btn">${icone('mais')}Recarregar</a>
    </div>` : ''}`;
}

function renderRecarga(){
  document.getElementById('ctValores').innerHTML = VALORES.map(v => {
    const bonus = bonusDe(v);
    return `<button type="button" role="radio" aria-checked="${v === valor}" class="ct-valor${v === valor ? ' on' : ''}" data-valor="${v}">
      ${bonus ? `<span class="ct-selo">+${Math.round(bonus / v * 100)}% de bônus</span>` : ''}
      <b>R$${v}</b><span>${v} créditos${bonus ? ` + ${bonus} de bônus` : ''}</span>${bonus ? `<em>${v + bonus} créditos no total</em>` : ''}</button>`;
  }).join('');
  document.getElementById('ctForma').innerHTML = ['Pix', 'Cartão'].map(f =>
    `<button type="button" role="radio" aria-checked="${f === forma}" class="${f === forma ? 'on' : ''}" data-forma="${f}">${f}</button>`).join('');
  const bonus = bonusDe(valor);
  document.getElementById('ctResumo').innerHTML = `Você recebe <b>${valor} créditos</b>${bonus ? ` + <b>${bonus} de bônus</b>` : ''}`;
  document.getElementById('ctPagar').textContent = `Pagar R$${valor} com ${forma}`;
}

document.getElementById('ctGanhe').innerHTML = [
  ['presente', 'Indique um amigo', '5 créditos de bônus por indicação aprovada.', 'Indicar', urlPagina('indicacoes')],
  ['comentarios', 'Responda às pesquisas', '1 crédito de bônus por pergunta respondida.', 'Responder', urlPagina('inicio')],
  ['perfil', 'Cadastro', '20 créditos de bônus ao criar a conta.', null, null],
].map(([ic, t, d, acao, url]) => `
  <div class="ct-ganhe-item">
    <span class="ct-ganhe-ic">${icone(ic)}</span>
    <div><b>${t}</b><p>${d}</p></div>
    ${acao ? `<a href="${url}" class="btn ghost"${url === '#' ? ' data-indicar' : ''}>${acao}</a>` : '<span class="ct-feito">✓ Recebido</span>'}
  </div>`).join('');

function renderExtrato(){
  const extra = lerBonusCreditos();
  const linhas = [...comprasNoExtrato(), ...(extra ? [{ q:agoraTexto(), t:'Respostas às pesquisas nesta visita', d:'1 crédito de bônus por pergunta', v:extra, b:true }] : []), ...EXTRATO];
  document.getElementById('ctFiltro').innerHTML = [['tudo', 'Tudo'], ['entradas', 'Entradas'], ['saidas', 'Saídas']].map(([k, l]) =>
    `<button type="button" role="tab" class="${k === filtro ? 'on' : ''}" aria-selected="${k === filtro}" data-filtro="${k}">${l}</button>`).join('');
  document.getElementById('ctExtrato').innerHTML = linhas
    .filter(x => filtro === 'tudo' || (filtro === 'entradas' ? x.v > 0 : x.v < 0))
    .map(x => `
      <div class="ct-linha">
        <span class="ct-linha-ic ${x.v > 0 ? 'entra' : 'sai'}">${icone(x.v > 0 ? 'mais' : 'conteudos')}</span>
        <div><b>${x.t.replace('SoftLiving', LOGO)}</b><small>${x.q} · ${x.d.replace('SoftLiving', LOGO)}</small></div>
        <span class="ct-valor-linha ${x.v > 0 ? 'entra' : 'sai'}">${x.v > 0 ? '+' : '−'}${Math.abs(x.v)}${x.b ? ' <small>bônus</small>' : ''}</span>
      </div>`).join('');
}

document.querySelector('main').addEventListener('click', ev => {
  const b = ev.target.closest('[data-valor], [data-forma], [data-filtro], #ctPagar, [data-indicar]');
  if(!b) return;
  if(b.dataset.valor){ valor = +b.dataset.valor; renderRecarga(); }
  else if(b.dataset.forma){ forma = b.dataset.forma; renderRecarga(); }
  else if(b.dataset.filtro){ filtro = b.dataset.filtro; renderExtrato(); }
  else if(b.id === 'ctPagar') mostrarAviso(`Pagamento de R$${valor} com ${forma}: fora deste protótipo`);
  else if('indicar' in b.dataset){ ev.preventDefault(); mostrarAviso('Indicações: próxima página a criar'); }
});
renderSaldo();
renderRecarga();
renderExtrato();
