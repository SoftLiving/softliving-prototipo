// Monta as partes comuns de todas as páginas: faixa de protótipo, aviso, topo com menu institucional,
// menu lateral e rodapé. Cada página só tem o próprio conteúdo; este script o coloca dentro do <main>.
// Na <body> de cada página:  data-page="inicio|conteudos|grupos|conexoes|comunidades"  ou  data-site="conhecer|..."
//                            data-root="" (páginas na raiz) ou "../" (páginas em subpastas)
const LAYOUT_ROOT = document.body.dataset.root || '';
const LAYOUT_PAGE = document.body.dataset.page || '';
const LAYOUT_SITE = document.body.dataset.site || '';

// Endereço de cada item do menu lateral e dos atalhos data-goto
const PAGE_URLS = {
  inicio: 'inicio.html',
  conteudos: 'conteudos.html',
  grupos: 'grupos.html',
  conexoes: 'conexoes.html',
  comunidades: 'comunidades/inicio.html',
};

const LAYOUT_TOPO = `
<div class="proto-strip" role="note">
  <strong>PROTÓTIPO · EM APROVAÇÃO</strong>
  <span class="proto-long">Demonstração conceitual: conteúdos, números e pessoas são fictícios. Marcas exibidas apenas para ilustrar a proposta, sem vínculo ou endosso.</span>
  <span class="proto-short">Dados fictícios · sem vínculo com as marcas</span>
  <button type="button" onclick="openProtoModal()">Saiba mais</button>
</div>

<div class="proto-modal-bg" id="protoModal" onclick="if(event.target===this)closeProtoModal()">
  <div class="proto-modal" role="dialog" aria-modal="true" aria-labelledby="protoModalTitle">
    <span class="proto-seal" style="margin-left:0;">PROPOSTA · EM APROVAÇÃO</span>
    <h2 class="serif" id="protoModalTitle">Bem-vindo à demonstração <span class="sig"><span class="soft">Soft</span><span class="living">Living</span></span></h2>
    <p>Esta é uma <b>simulação</b> de como a sua comunidade poderia funcionar dentro da plataforma SoftLiving.</p>
    <ul>
      <li>Todos os conteúdos, números, agendas e perfis são <b>fictícios</b>, criados só para esta apresentação.</li>
      <li>As marcas aparecem apenas para ilustrar a proposta. Não há parceria, vínculo ou endosso até aprovação formal.</li>
      <li>Nada do que você fizer aqui é salvo. Recarregar a página reinicia a demonstração.</li>
    </ul>
    <button type="button" onclick="closeProtoModal()">Entendi, ver a demonstração</button>
  </div>
</div>

<div class="top-banner">
  <span><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg> Você tem créditos. Para assinar clubes premium, ative com Pix de R$50.</span>
  <a href="#">Ativar agora</a>
  <button class="close" onclick="this.parentElement.style.display='none'"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</div>

<header>
  <div class="header-left">
    <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu">
      <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
    <a class="brand" href="index.html" aria-label="SoftLiving, voltar ao início"><span class="soft">Soft</span><span class="living">Living</span></a>
  </div>
  <nav class="top-nav" id="topNav" aria-label="Menu institucional">
    <button type="button" data-site="conhecer">Conhecer</button>
    <button type="button" data-site="como-funciona">Como Funciona</button>
    <button type="button" data-site="beneficios">Benefícios</button>
    <button type="button" data-site="seguranca">Segurança</button>
    <button type="button" data-site="patrocinadores">Patrocinadores</button>
  </nav>
  <div class="header-right">
    <div class="credits-pill"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg> <span class="credits-label saldo-creditos">41 créditos</span></div>
    <button class="icon-btn"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg></button>
    <div class="avatar">RB</div>
  </div>
</header>

<div class="sidebar-overlay" id="sidebarOverlay"></div>`;

const LAYOUT_SIDEBAR = `
  <aside id="sidebar">
    <div class="side-group">
      <p class="side-label">PRINCIPAL</p>
      <nav class="side-nav">
        <a href="#" data-page="inicio"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg> Início</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg> Busca</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/></svg> Notificações</a>
      </nav>
    </div>
    <div class="side-group">
      <p class="side-label">CONTEÚDO</p>
      <nav class="side-nav">
        <a href="#" data-page="conteudos"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M4 5.5v16"/></svg> Conteúdos</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg> Colunas</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg> Atividades <span class="chev">⌄</span></a>
      </nav>
    </div>
    <div class="side-group">
      <p class="side-label">COMUNIDADE &amp; BENEFÍCIOS</p>
      <nav class="side-nav">
        <a href="#" data-page="comunidades"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01"/></svg> Minhas Comunidades</a>
        <a href="#" data-page="grupos"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M23 20c0-2.8-2-5-5-5.5"/></svg> Grupos</a>
        <a href="#" data-page="conexoes"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg> Conexões</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/></svg> Membros</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg> Parceiros</a>
      </nav>
    </div>
    <div class="side-group">
      <p class="side-label">MINHA CONTA</p>
      <nav class="side-nav">
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg> Carteira</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3"/><path d="M12 5v16"/><path d="M12 5C11 2 7 2 7 5s5 3 5 0zM12 5c1-3 5-3 5 0s-5 3-5 0z"/></svg> Indicações</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg> Meu Perfil</a>
        <a href="#"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2"/><path d="M12 17h.01"/></svg> Ajuda</a>
      </nav>
    </div>

    <div class="activate-card">
      <p class="title">Ative sua conta</p>
      <p class="desc">Pix de R$50 → 50 créditos + 50 bônus.</p>
      <button>Ir para carteira</button>
    </div>
  </aside>`;

const LAYOUT_RODAPE = `
<div class="sp-toast" id="spToast" role="status" aria-live="polite"></div>

<footer class="proto-footer">
  <div class="footer-partners">
    <div class="footer-partner">
      <span>Assessoria de imprensa</span>
      <img src="${LAYOUT_ROOT}assets/img/logo-fsb.png" alt="FSB" class="logo-fsb">
    </div>
    <div class="footer-partner">
      <span>Consultoria estratégica</span>
      <img src="${LAYOUT_ROOT}assets/img/logo-rb2-digital.png" alt="RB2 Consultoria Estratégica" class="logo-rb2">
    </div>
  </div>
  <p class="footer-note">
    Protótipo conceitual SoftLiving, para apresentação e aprovação. Conteúdos, dados, números e pessoas são fictícios.
    Nomes e marcas de terceiros são usados apenas para ilustrar a proposta e não indicam parceria, vínculo ou endosso.
  </p>
</footer>`;

(function montarLayout(){
  const conteudo = [...document.body.childNodes].filter(n => !(n.nodeType === 1 && n.tagName === 'SCRIPT'));
  conteudo.forEach(n => n.remove());

  const layout = document.createElement('div');
  layout.className = 'layout';
  layout.innerHTML = LAYOUT_SIDEBAR + '<main></main>';
  layout.querySelector('main').append(...conteudo);

  document.body.insertAdjacentHTML('afterbegin', LAYOUT_TOPO);
  document.getElementById('sidebarOverlay').after(layout);
  layout.insertAdjacentHTML('afterend', LAYOUT_RODAPE);

  document.querySelector('header a.brand').href = LAYOUT_ROOT + 'index.html';
  layout.querySelectorAll('#sidebar a[data-page]').forEach(a => {
    a.href = LAYOUT_ROOT + PAGE_URLS[a.dataset.page];
    a.classList.toggle('active', a.dataset.page === LAYOUT_PAGE);
  });
  document.querySelectorAll('#topNav button[data-site]').forEach(b => {
    const on = b.dataset.site === LAYOUT_SITE;
    b.classList.toggle('active', on);
    if(on) b.setAttribute('aria-current', 'page');
    b.addEventListener('click', () => { location.href = LAYOUT_ROOT + 'institucional/' + b.dataset.site + '.html'; });
  });
})();

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function closeSidebar(){ sidebar.classList.remove('open'); sidebarOverlay.classList.remove('show'); }
function openSidebar(){ sidebar.classList.add('open'); sidebarOverlay.classList.add('show'); }
menuToggle.addEventListener('click', () => { sidebar.classList.contains('open') ? closeSidebar() : openSidebar(); });
sidebarOverlay.addEventListener('click', closeSidebar);
sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeSidebar));

// Atalhos dentro das páginas: data-goto="grupos" leva a uma página do menu lateral,
// data-site-link="patrocinadores" a uma página institucional
document.querySelectorAll('main [data-goto]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault(); location.href = LAYOUT_ROOT + PAGE_URLS[el.dataset.goto];
}));
document.querySelectorAll('main [data-site-link]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault(); location.href = LAYOUT_ROOT + 'institucional/' + el.dataset.siteLink + '.html';
}));
// Links ainda sem destino não fazem a página pular para o topo
document.querySelectorAll('main a[href="#"]:not([data-goto]):not([data-site-link]), #sidebar a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

// Regra do logo em texto (.sig): se o fundo atrás dele confunde as cores da marca (azul #013565 e verde #1F5519),
// o logo passa a ser branco (classe .sig-light). Vale para todas as páginas, inclusive conteúdo gerado depois.
function corDeFundo(el){
  for(; el; el = el.parentElement){
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if(m && (m[3] === undefined || +m[3] > 0.5)) return m.slice(0, 3).map(Number);
  }
  return [255, 255, 255];
}
function luminancia(rgb){
  const [r, g, b] = rgb.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
  return .2126 * r + .7152 * g + .0722 * b;
}
const LOGO_CORES = [[1, 53, 101], [31, 85, 25]];
function ajustarLogosEmTexto(){
  document.querySelectorAll('.sig').forEach(sig => {
    const lf = luminancia(corDeFundo(sig.parentElement));
    const contraste = Math.min(...LOGO_CORES.map(c => { const lc = luminancia(c); return (Math.max(lf, lc) + .05) / (Math.min(lf, lc) + .05); }));
    sig.classList.toggle('sig-light', contraste < 3);
  });
}
ajustarLogosEmTexto();
let ajusteLogosPendente = false;
new MutationObserver(() => {
  if(ajusteLogosPendente) return;
  ajusteLogosPendente = true;
  requestAnimationFrame(() => { ajusteLogosPendente = false; ajustarLogosEmTexto(); });
}).observe(document.querySelector('main'), { childList:true, subtree:true });

// Saldo de créditos mostrado no topo (e na carteira da Início): saldo fictício + bônus ganhos no protótipo
// (respostas das pesquisas de escuta, somadas em 'bonusCreditos'). O bônus fica na sessão do navegador.
const SALDO_BASE = 41;
function lerBonusCreditos(){
  try { return +sessionStorage.getItem('bonusCreditos') || 0; } catch(e){ return 0; }
}
function atualizarSaldo(){
  const saldo = SALDO_BASE + lerBonusCreditos();
  document.querySelectorAll('.saldo-creditos').forEach(el => el.textContent = `${saldo} créditos`);
}
atualizarSaldo();

// Aviso de protótipo: abre na primeira visita da sessão
const protoModal = document.getElementById('protoModal');
function openProtoModal(){ protoModal.classList.add('show'); }
function closeProtoModal(){
  protoModal.classList.remove('show');
  try { sessionStorage.setItem('protoAviso', '1'); } catch(e){}
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProtoModal(); });
let protoVisto = false;
try { protoVisto = sessionStorage.getItem('protoAviso') === '1'; } catch(e){}
if (!protoVisto) openProtoModal();
