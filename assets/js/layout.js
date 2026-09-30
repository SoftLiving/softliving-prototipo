// VERSÃO 2 · Monta a moldura comum de todas as páginas: faixa de protótipo, aviso, menu lateral flutuante
// (recolhível), topo, rodapé e barra inferior do celular. Cada página só tem o próprio conteúdo; este script
// o coloca dentro do <main>.
// Na <body> de cada página:  data-page="inicio|conteudos|grupos|notificacoes|perfil"  ou  data-site="conhecer|..."
//                            data-root="" (páginas na raiz da v2) ou "../" (páginas em subpastas da v2)
const LAYOUT_ROOT = document.body.dataset.root || '';
const LAYOUT_PAGE = document.body.dataset.page || '';
const LAYOUT_SITE = document.body.dataset.site || '';
// Página interna de um grupo: ainda em construção. Por enquanto abre Grupos com o grupo destacado (grupos.js).
const urlGrupo = i => `${LAYOUT_ROOT}grupos.html?g=${i}`;

// Endereço de cada destino (páginas do menu).
const PAGINAS = {
  inicio:       { url:'index.html' },
  conteudos:    { url:'conteudos.html' },
  grupos:       { url:'grupos.html' },
  colunas:      { url:'colunas.html' },
  busca:        { url:'busca.html' },
  notificacoes: { url:'notificacoes.html' },
  vitrine:      { url:'vitrine.html' },
  carteira:     { url:'carteira.html' },
  indicacoes:   { url:'indicacoes.html' },
  perfil:       { url:'perfil.html' },
  ajuda:        { url:'ajuda.html' },
  curtidas:     { url:'curtidas.html' },
  comentarios:  { url:'comentarios.html' },
  acompanhar:   { url:'acompanhar.html' },
  salvos:       { url:'salvos.html' },
  comunidades:  { url:'comunidades/inicio.html' },
  amigos:       { url:'amigos.html' },               // antiga Conexões
  simples:      { url:'simples.html' },
};
function urlPagina(nome){
  const p = PAGINAS[nome];
  return p ? LAYOUT_ROOT + p.url : '#';
}
// Páginas institucionais (institucional/). Segurança ainda não foi feita: por enquanto abre o Suporte (Conta e privacidade).
const SITES = ['conhecer', 'quem-somos', 'como-funciona', 'beneficios', 'patrocinadores'];
const urlSite = site => SITES.includes(site) ? `${LAYOUT_ROOT}institucional/${site}.html` : urlPagina('ajuda');

// Fotos de exemplo (Unsplash) usadas nos dados: foto:"<id>"
const fotoUrl = (id, largura) => `https://images.unsplash.com/photo-${id}?w=${largura || 800}&q=70`;

const ICONES = {
  inicio:'<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  conteudos:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M4 5.5v16"/>',
  grupos:'<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M23 20c0-2.8-2-5-5-5.5"/>',
  sino:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  perfil:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
  carteira:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  presente:'<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3"/><path d="M12 5v16"/>',
  loja:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M10 20v-6h4v6"/>',
  simples:'<path d="M4 7h16M4 12h10M4 17h6"/>',
  modo:'<path d="M3 19 8.5 5 14 19M5.3 14h6.4"/><circle cx="18" cy="16.2" r="2.8"/><path d="M20.8 13v6"/>',   // "Aa": letra maior, leitura mais fácil
  ajuda:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2"/><path d="M12 17h.01"/>',
  busca:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  voltar:'<path d="M15 18l-6-6 6-6"/>',
  mais:'<path d="M12 5v14M5 12h14"/>',
  seta:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  salvar:'<path d="M6 3h12v18l-6-4-6 4V3z"/>',
  colunas:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  curtidas:'<path d="M12 21c-4.5-2.6-8-6-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 4-3.5 7.4-8 10z"/>',
  comentarios:'<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.2A8 8 0 1 1 21 12z"/>',
  acompanhar:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/><path d="M3 5l2 1.5M21 5l-2 1.5"/>',
  comunidades:'<rect x="4" y="3" width="16" height="18"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01"/>',
  amigos:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.4 2.7-6 6-6s6 2.6 6 6"/><path d="M15.5 10.5l1.8 1.8 3.7-3.8"/>',
  membros:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>',
  parceiros:'<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/>',
  abrir:'<path d="M6 9l6 6 6-6"/>',
};
const icone = (nome, extra) => `<svg class="ic${extra ? ' ' + extra : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome]}</svg>`;
const LOGO = '<span class="sig"><span class="soft">Soft</span><span class="living">Living</span></span>';

// Menu lateral: os mesmos itens da versão 1, em quatro seções. Atividades abre um submenu.
const MENU_SECOES = [
  { titulo:'Principal', itens:[
    { nome:'inicio', rotulo:'Início', icone:'inicio' },
    { nome:'busca', rotulo:'Busca', icone:'busca' },
    { nome:'notificacoes', rotulo:'Notificações', icone:'sino', aviso:3 },
  ]},
  { titulo:'Conteúdo', itens:[
    { nome:'conteudos', rotulo:'Conteúdos', icone:'conteudos' },
    { nome:'colunas', rotulo:'Colunas', icone:'colunas' },
    { nome:'atividades', rotulo:'Atividades', icone:'salvar', sub:[
      { nome:'curtidas', rotulo:'Curtidas', icone:'curtidas' },
      { nome:'comentarios', rotulo:'Comentários', icone:'comentarios' },
      { nome:'acompanhar', rotulo:'Acompanhar', icone:'acompanhar' },
      { nome:'salvos', rotulo:'Salvos', icone:'salvar' },
    ]},
  ]},
  { titulo:'Comunidade e benefícios', itens:[
    { nome:'vitrine', rotulo:'Vitrines', icone:'loja' },
    { nome:'comunidades', rotulo:'Minhas Comunidades', icone:'comunidades' },
    { nome:'grupos', rotulo:'Grupos', icone:'grupos', aviso:9 },
    { nome:'amigos', rotulo:'Amigos', icone:'amigos', aviso:2 },
  ]},
  { titulo:'Minha conta', itens:[
    { nome:'carteira', rotulo:'Carteira', icone:'carteira' },
    { nome:'indicacoes', rotulo:'Indicações', icone:'presente' },
    { nome:'perfil', rotulo:'Meu perfil', icone:'perfil' },
    { nome:'ajuda', rotulo:'Suporte', icone:'ajuda' },
  ]},
];
const itemMenu = m => `<a href="${urlPagina(m.nome)}" data-page="${m.nome}" title="${m.rotulo}">${icone(m.icone)}<span class="lbl">${m.rotulo}</span>${m.aviso ? `<span class="tag">${m.aviso}</span>` : ''}</a>`;
const itemComSub = m => `
  <div class="nav-grupo" data-grupo="${m.nome}">
    <button type="button" class="nav-abre" aria-expanded="false" title="${m.rotulo}">${icone(m.icone)}<span class="lbl">${m.rotulo}</span>${icone('abrir', 'chev')}</button>
    <div class="nav-sub">${m.sub.map(itemMenu).join('')}</div>
  </div>`;

function saudacao(){
  const h = new Date().getHours();
  return h < 12 ? 'Bom dia,' : h < 18 ? 'Boa tarde,' : 'Boa noite,';
}

const LAYOUT_TOPO = `
<div class="proto" role="note">
  <b>PROTÓTIPO · VERSÃO 2</b>
  <span class="proto-long">Em construção · conteúdos, números, pessoas e fotos são fictícios. Marcas apenas ilustram a proposta, sem vínculo ou endosso.</span>
  <span class="proto-short">Em construção · dados fictícios</span>
  <button type="button" onclick="openProtoModal()">Saiba mais</button>
</div>

<div class="modal-bg" id="protoModal" onclick="if(event.target===this)closeProtoModal()">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="protoModalTitle">
    <span class="selo">PROPOSTA · EM APROVAÇÃO</span>
    <h2 id="protoModalTitle">Bem-vindo à demonstração ${LOGO}</h2>
    <p>Esta é uma <b>simulação</b> de como a sua comunidade poderia funcionar dentro da plataforma SoftLiving.</p>
    <ul>
      <li>Todos os conteúdos, números, agendas, perfis e fotos são <b>fictícios</b>, criados só para esta apresentação.</li>
      <li>As marcas aparecem apenas para ilustrar a proposta. Não há parceria, vínculo ou endosso até aprovação formal.</li>
      <li>Nada do que você fizer aqui é salvo. Recarregar a página reinicia a demonstração.</li>
    </ul>
    <button type="button" class="btn" onclick="closeProtoModal()">Entendi, ver a demonstração</button>
  </div>
</div>`;

const LAYOUT_MENU = `
<div class="scrim" id="scrim"></div>
<div class="side-wrap">
<button class="collapse" id="collapseBtn" aria-label="Recolher menu">${icone('voltar')}</button>
<aside class="side" id="side" aria-label="Menu">
  <a href="${urlPagina('perfil')}" class="me" title="Meu perfil">
    <span class="avatar">RB</span>
    <div><small>${saudacao()}</small><strong>Rafael</strong></div>
  </a>

  ${MENU_SECOES.map(sec => `
  <div>
    <div class="sec-t"><span class="lbl">${sec.titulo}</span></div>
    <nav class="nav">${sec.itens.map(m => m.sub ? itemComSub(m) : itemMenu(m)).join('')}</nav>
  </div>`).join('')}

  <div class="wallet">
    <small>Sua carteira</small>
    <strong class="saldo-creditos">41 créditos</strong>
    <a href="${urlPagina('carteira')}#recarga" class="btn" title="Recarregar créditos">${icone('mais')}<span>Recarregar</span></a>
    <p>Primeira recarga de R$50 vale 50 créditos + 50 de bônus</p>
  </div>
</aside>
</div>`;

const LAYOUT_CABECALHO = `
<div class="top">
  <button class="round menu-btn" id="menuBtn" aria-label="Abrir menu">${icone('menu')}</button>
  <a href="${urlPagina('inicio')}" class="sig brand" aria-label="SoftLiving, voltar ao início"><span class="soft">Soft</span><span class="living">Living</span></a>
  <nav class="site-nav" aria-label="Sobre a SoftLiving">
    <a href="${urlSite('conhecer')}" data-site="conhecer">Conhecer</a>
    <a href="${urlSite('quem-somos')}" data-site="quem-somos">Quem somos</a>
    <a href="${urlSite('como-funciona')}" data-site="como-funciona">Como funciona</a>
    <a href="${urlSite('beneficios')}" data-site="beneficios">Benefícios</a>
    <a href="${urlSite('patrocinadores')}" data-site="patrocinadores">Patrocinadores</a>
  </nav>
  <div class="tools">
    <button type="button" class="saiba-mais" aria-label="Saiba mais sobre a SoftLiving">Saiba mais${icone('abrir', 'chev')}</button>
    <a href="${urlPagina('simples')}" class="btn simples modo-simples" title="Ver o portal com menos opções e letra maior">${icone('modo')}Modo simples</a>
    <a href="${urlPagina('carteira')}" class="btn creditos" title="Sua carteira de créditos">${icone('carteira')}<span class="saldo-creditos">41 créditos</span></a>
    <a href="${urlPagina('notificacoes')}" class="round sino" aria-label="Notificações" title="Notificações">${icone('sino')}<i></i></a>
    <a href="https://softliving.com.br/entrar" class="btn entrar">Entrar</a>
    <a href="${urlPagina('perfil')}" class="round avatar-topo" aria-label="Sua conta" title="Sua conta" hidden>RB</a>
  </div>
</div>`;

const LAYOUT_RODAPE = `
<footer class="rodape">
  <div class="wrap">
    <div class="fgrid">
      <div>
        <a href="${urlPagina('inicio')}" class="sig" style="font-size:24px"><span class="soft">Soft</span><span class="living">Living</span></a>
        <p>Portal de conteúdo e comunidades, sem anúncios, com patrocinadores apoiadores.</p>
      </div>
      <div><h4>A ${LOGO}</h4>
        <a href="${urlSite('conhecer')}">Conhecer</a><a href="${urlSite('quem-somos')}">Quem somos</a><a href="${urlSite('como-funciona')}">Como funciona</a><a href="${urlSite('beneficios')}">Benefícios</a><a href="${urlSite('seguranca')}">Segurança</a><a href="${urlSite('patrocinadores')}">Patrocinadores</a></div>
      <div><h4>Conteúdos</h4>
        <a href="${urlPagina('conteudos')}">Saúde e bem-estar</a><a href="${urlPagina('conteudos')}">Estilo e casa</a><a href="${urlPagina('conteudos')}">Turismo e viagem</a><a href="${urlPagina('conteudos')}">Tecnologia</a><a href="${urlPagina('colunas')}">Colunistas</a></div>
      <div><h4>Comunidade</h4>
        <a href="${urlPagina('grupos')}">Grupos</a><a href="${urlPagina('comunidades')}">Minhas comunidades</a><a href="${urlGrupo(12)}">Desapego</a><a href="${urlPagina('amigos')}">Amigos</a><a href="${urlPagina('vitrine')}">Vitrines</a></div>
      <div><h4>Sua conta</h4>
        <a href="${urlPagina('carteira')}">Carteira</a><a href="${urlPagina('indicacoes')}">Indicações</a><a href="${urlPagina('perfil')}">Meu perfil</a><a href="${urlPagina('simples')}">Modo simples</a><a href="${urlPagina('ajuda')}">Suporte</a></div>
    </div>
    <!-- Linha própria para os logos dos parceiros, cada um com um título pequeno em cima -->
    <div class="flogos">
      <div class="flogo"><span>Assessoria de imprensa</span><img class="logo-fsb" src="${LAYOUT_ROOT}assets/img/logo-fsb.png" alt="FSB"></div>
      <div class="flogo"><span>Consultoria estratégica</span><img class="logo-rb2" src="${LAYOUT_ROOT}assets/img/logo-rb2-digital.png" alt="RB2 Consultoria Estratégica"></div>
    </div>
    <p class="fnote">Protótipo conceitual SoftLiving, para apresentação e aprovação. Conteúdos, dados, números, pessoas e fotos são fictícios. Nomes e marcas de terceiros são usados apenas para ilustrar a proposta e não indicam parceria, vínculo ou endosso.</p>
    <div class="fbottom"><span>© 2026 ${LOGO} · Protótipo versão 2</span><span>Privacidade · Termos de uso</span></div>
  </div>
</footer>`;

const LAYOUT_BARRA = `
<nav class="tabbar" aria-label="Menu principal">
  <a href="${urlPagina('inicio')}" data-page="inicio">${icone('inicio')}Início</a>
  <a href="${urlPagina('conteudos')}" data-page="conteudos">${icone('conteudos')}Conteúdos</a>
  <a href="${urlPagina('grupos')}" data-page="grupos">${icone('grupos')}Grupos</a>
  <a href="${urlPagina('carteira')}" data-page="carteira">${icone('carteira')}Carteira</a>
  <a href="#" id="tabVoce">${icone('perfil')}Você</a>
</nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

(function montarLayout(){
  const conteudo = [...document.body.childNodes].filter(n => !(n.nodeType === 1 && n.tagName === 'SCRIPT'));
  conteudo.forEach(n => n.remove());

  const app = document.createElement('div');
  // Já nasce com o menu recolhido (se for a preferência) e sem animações enquanto carrega: ao trocar de página com o
  // menu fechado, ele não abre e fecha
  app.className = 'app carregando' + (lerPreferencia('v2MenuRecolhido') === '1' ? ' mini' : '');
  const fimCarregando = () => app.classList.remove('carregando');
  requestAnimationFrame(() => requestAnimationFrame(fimCarregando));
  setTimeout(fimCarregando, 300);            // reserva, caso a aba esteja em segundo plano
  app.id = 'app';
  // .corpo: coluna do conteúdo (.wrap) e, nas páginas que têm, a coluna lateral da direita (<aside class="lateral">)
  app.innerHTML = LAYOUT_MENU + `<div class="main"><div class="corpo"><div class="wrap"><main></main></div></div></div>`;
  app.querySelector('main').append(...conteudo);
  const lateral = app.querySelector('main > aside.lateral');
  if(lateral){ app.querySelector('.corpo').appendChild(lateral); app.classList.add('com-lateral'); }

  // O topo ocupa a largura toda da janela (acima do menu lateral e do conteúdo)
  document.body.insertAdjacentHTML('afterbegin', LAYOUT_TOPO + LAYOUT_CABECALHO);
  document.querySelector('.top').after(app);
  // Rodapé fora da área com a barra lateral: ocupa a largura toda da página, de ponta a ponta
  app.insertAdjacentHTML('afterend', LAYOUT_RODAPE + LAYOUT_BARRA);

  document.querySelectorAll('.nav a[data-page], .tabbar a[data-page]').forEach(a => {
    const on = a.dataset.page === LAYOUT_PAGE;
    a.classList.toggle('on', on);
    if(on) a.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('.site-nav a[data-site]').forEach(a => a.classList.toggle('on', a.dataset.site === LAYOUT_SITE));
})();

// Coluna lateral da direita: quando fica ao lado do conteúdo, começa na altura do elemento marcado com
// data-lateral-topo (na Início, "Explore por assunto"); sem marcação, começa no topo do conteúdo. O fim fica
// alinhado ao fim do último box pelo CSS.
function alinharLateral(){
  const lat = document.querySelector('.corpo > .lateral');
  if(!lat) return;
  const alvo = document.querySelector('main [data-lateral-topo]');
  const aoLado = getComputedStyle(document.querySelector('.corpo')).flexDirection === 'row';
  lat.style.marginTop = aoLado && alvo ? Math.round(alvo.getBoundingClientRect().top - document.querySelector('.corpo').getBoundingClientRect().top) + 'px' : '';
}
alinharLateral();
addEventListener('resize', alinharLateral);
addEventListener('load', alinharLateral);                        // depois de carregar fontes e imagens
if(document.fonts) document.fonts.ready.then(alinharLateral);

// Menu lateral: recolher (só ícones) no computador, gaveta no celular. A escolha de recolher fica guardada.
const app = document.getElementById('app');
function lerPreferencia(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function guardarPreferencia(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
const collapseBtn = document.getElementById('collapseBtn');
function marcarRecolhido(mini){
  app.classList.toggle('mini', mini);
  const rotulo = mini ? 'Abrir menu' : 'Recolher menu';
  collapseBtn.setAttribute('aria-label', rotulo);
  collapseBtn.dataset.dica = rotulo;
}
marcarRecolhido(lerPreferencia('v2MenuRecolhido') === '1');
collapseBtn.addEventListener('click', () => {
  marcarRecolhido(!app.classList.contains('mini'));
  guardarPreferencia('v2MenuRecolhido', app.classList.contains('mini') ? '1' : '0');
  esconderDica();
});

// Dica do menu recolhido: ao passar o mouse num ícone, o nome do item aparece ao lado, numa caixa de vidro.
// Usa o title de cada item (guardado em data-dica, para o navegador não mostrar a dica preta dele por cima).
const dica = document.createElement('div');
dica.className = 'dica';
dica.setAttribute('role', 'tooltip');
document.body.appendChild(dica);
document.querySelectorAll('.side [title]').forEach(el => { el.dataset.dica = el.title; el.removeAttribute('title'); });
function esconderDica(){ dica.classList.remove('show'); }
document.querySelector('.side-wrap').addEventListener('mouseover', e => {
  const alvo = e.target.closest('[data-dica]');
  if(!alvo || !app.classList.contains('mini') || innerWidth <= 980) return esconderDica();
  mostrarDica(alvo, 'direita');
});
function mostrarDica(alvo, lado){
  const r = alvo.getBoundingClientRect();
  dica.textContent = alvo.dataset.dica;
  dica.classList.toggle('a-esquerda', lado === 'esquerda');
  dica.style.left = (lado === 'esquerda' ? r.left - 12 : r.right + 12) + 'px';
  dica.style.top = (r.top + r.height / 2) + 'px';
  dica.classList.add('show');
}
document.querySelector('.side-wrap').addEventListener('mouseleave', esconderDica);
document.querySelector('.side').addEventListener('scroll', esconderDica);
const abrirMenu = () => app.classList.add('open');
const fecharMenu = () => app.classList.remove('open');
document.getElementById('menuBtn').addEventListener('click', abrirMenu);
document.getElementById('tabVoce').addEventListener('click', e => { e.preventDefault(); abrirMenu(); });
document.getElementById('scrim').addEventListener('click', fecharMenu);

// Submenu (Atividades): abre e fecha pelo botão; já vem aberto se a página atual for um dos itens dele.
// Com o menu recolhido (só ícones), clicar em Atividades abre o menu para mostrar o submenu.
document.querySelectorAll('.nav-grupo').forEach(grupo => {
  const botao = grupo.querySelector('.nav-abre');
  const abrir = aberto => { grupo.classList.toggle('open', aberto); botao.setAttribute('aria-expanded', aberto); };
  abrir(!!grupo.querySelector('a.on'));
  botao.addEventListener('click', () => {
    if(app.classList.contains('mini')){ app.classList.remove('mini'); guardarPreferencia('v2MenuRecolhido', '0'); abrir(true); return; }
    abrir(!grupo.classList.contains('open'));
  });
});
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ fecharMenu(); closeProtoModal(); } });

// Modo simples (simples.html): a escolha fica guardada no navegador
document.querySelectorAll('.modo-simples').forEach(a => a.addEventListener('click', () => guardarPreferencia('modoPreferido', 'simples')));

// Atalhos dentro das páginas: data-goto="grupos" leva a uma página do menu, data-site-link="seguranca" a uma
// página institucional (v2 ou v1, conforme o que já foi refeito)
document.querySelectorAll('.corpo [data-goto]').forEach(a => a.href = urlPagina(a.dataset.goto));
document.querySelectorAll('.corpo [data-site-link]').forEach(a => a.href = urlSite(a.dataset.siteLink));

// Palavra em destaque nos títulos (.hl): recebe o risco verde desenhado à mão por baixo
document.querySelectorAll('.hl').forEach(hl => hl.insertAdjacentHTML('beforeend',
  '<svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10 C 30 2, 80 2, 118 8" fill="none" stroke="#9fd0b0" stroke-width="5" stroke-linecap="round"/></svg>'));

// Patrocinadores apoiadores: a faixa <div class="apoio"> da página (uma só por página) recebe uma marca sorteada
// a cada visita. O logo aparece em tom sobre tom (discreto, na cor do fundo) pelo CSS.
// altura: ajuste fino para os três logos parecerem do mesmo tamanho.
const LOGOS_VERSAO = 2; // logos com fundo transparente
const PATROCINADORES = [
  { nome:"Rede D'Or", logo:'assets/img/logo-rede-dor.png', altura:56 },
  { nome:'Claro', logo:'assets/img/logo-claro.png', altura:40 },
  { nome:'Bradesco Saúde', logo:'assets/img/logo-bradesco-saude.png', altura:48 },
];
(function montarApoios(){
  const vagas = document.querySelectorAll('main .apoio');
  if(!vagas.length) return;
  const sorteio = PATROCINADORES.map(p => [Math.random(), p]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  // ?apoio=1, 2 ou 3 mostra um patrocinador específico (para apresentações e capturas de tela)
  const escolhido = PATROCINADORES[+new URLSearchParams(location.search).get('apoio') - 1];
  if(escolhido) sorteio.unshift(escolhido);
  vagas.forEach((vaga, i) => {
    const p = sorteio[i % sorteio.length];
    // ?v=: muda quando o arquivo do logo muda, para o navegador não usar a imagem antiga guardada
    vaga.innerHTML = `<span class="apoio-rotulo">Com o apoio de</span><img src="${LAYOUT_ROOT}${p.logo}?v=${LOGOS_VERSAO}" alt="${p.nome}" style="height:${p.altura}px">`;
  });
})();

// Links ainda sem destino não fazem a página pular para o topo
document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

// Carrossel: um bloco de conteúdos menores (trilho) só se move pelas setas: cada clique desliza um item, suave, e
// cliques seguidos se somam. Em loop (os itens são repetidos no fim para a volta não ter salto). Sem rolagem automática,
// sem efeito ao passar o mouse e sem rolagem pela roda do mouse (o CSS esconde a rolagem do trilho).
// dir 'h': horizontal (setas nas laterais); dir 'v': vertical (setas em cima e embaixo), com altura de "visiveis" itens.
// A página chama ativarCarrossel(elemento, dir) depois de preencher o elemento (e de novo sempre que trocar o conteúdo).
// Quantos itens aparecem por vez na horizontal fica no CSS (--vis).
const CARROSSEIS = [];

function ativarCarrossel(trilho, dir, visiveis = 4){
  let car = trilho.closest('.carrossel');
  if(!car){
    car = document.createElement('div');
    car.className = `carrossel carrossel-${dir}`;
    trilho.before(car);
    car.append(trilho);
    trilho.classList.add(`trilho-${dir}`);
    const seta = (lado, rotulo) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `car-btn car-${lado}`;
      b.setAttribute('aria-label', rotulo);
      b.innerHTML = icone('voltar');
      return b;
    };
    car.ant = seta('ant', dir === 'h' ? 'Voltar' : 'Subir');
    car.prox = seta('prox', dir === 'h' ? 'Avançar' : 'Descer');
    car.append(car.ant, car.prox);
    Object.assign(car, { trilho, sentido:dir, visiveis, pos:0, deslize:null, ciclo:0 });
    // Setas: deslizam um item (animação suave); clicar de novo durante o deslize soma mais um item
    const passoItem = () => { const a = trilho.children[0], b = trilho.children[1]; if(!a || !b) return 0; return dir === 'h' ? b.offsetLeft - a.offsetLeft : b.offsetTop - a.offsetTop; };
    // Destino: o começo do item seguinte (ou anterior). Os itens podem ter alturas diferentes (no celular, títulos de
    // uma ou duas linhas), então o passo vem da posição de cada item e não de um tamanho fixo
    const inicios = () => { const itens = [...trilho.children], o = dir === 'h' ? 'offsetLeft' : 'offsetTop'; return itens.map(e => e[o] - itens[0][o]); };
    const deslizar = s => {
      let base = car.deslize ? car.deslize.para : car.pos;
      if(s < 0 && base < 1 && car.ciclo){                  // no começo: pula para a mesma posição nas cópias, sem salto visível
        base += car.ciclo; car.pos += car.ciclo;
        if(car.deslize){ car.deslize.de += car.ciclo; car.deslize.para += car.ciclo; }
      }
      const pos = inicios();
      const destino = s > 0 ? (pos.find(p => p > base + 1) ?? base + passoItem()) : ([...pos].reverse().find(p => p < base - 1) ?? base - passoItem());
      car.deslize = { de:car.pos, para:destino, inicio:performance.now() };
      if(!car.animando){ car.animando = true; requestAnimationFrame(t => animarCarrossel(car, t)); }
    };
    car.ant.addEventListener('click', () => deslizar(-1));
    car.prox.addEventListener('click', () => deslizar(1));
    car.ajustarAltura = () => {
      if(dir !== 'v') return;
      trilho.style.maxHeight = '';
      const itens = trilho.children, alvo = itens[visiveis];
      const cs = getComputedStyle(trilho);
      if(alvo) trilho.style.maxHeight = (alvo.offsetTop - itens[0].offsetTop + parseFloat(cs.paddingTop) * 2 - parseFloat(cs.rowGap || 0)) + 'px';
    };
    addEventListener('resize', () => car.preparar());
    addEventListener('load', () => car.preparar());
    CARROSSEIS.push(car);
  }
  // Loop sem salto: repete os itens originais no fim (as cópias ficam escondidas para leitores de tela)
  car.preparar = () => {
    trilho.querySelectorAll(':scope > .copia').forEach(c => c.remove());
    car.ajustarAltura();
    const cabe = dir === 'h' ? trilho.scrollWidth <= trilho.clientWidth + 2 : trilho.scrollHeight <= trilho.clientHeight + 2;
    car.classList.toggle('sem-rolagem', cabe);
    car.ciclo = 0;
    if(cabe) return;
    const originais = [...trilho.children];
    originais.forEach(el => {
      const c = el.cloneNode(true);
      c.classList.add('copia');
      c.setAttribute('aria-hidden', 'true');
      c.querySelectorAll('a, button').forEach(x => x.tabIndex = -1);
      trilho.appendChild(c);
    });
    const copia = trilho.querySelector(':scope > .copia');
    car.ciclo = dir === 'h' ? copia.offsetLeft - originais[0].offsetLeft : copia.offsetTop - originais[0].offsetTop;
  };
  car.pos = 0;
  car.deslize = null;
  if(dir === 'h') trilho.scrollLeft = 0; else trilho.scrollTop = 0;
  car.preparar();
}

// Animação do deslize de um carrossel (450ms, desacelerando no fim); só roda enquanto há deslize
function animarCarrossel(car, agora){
  const d = car.deslize;
  if(!d || !car.ciclo){ car.animando = false; return; }
  const t = Math.min(1, (agora - d.inicio) / 450);
  car.pos = d.de + (d.para - d.de) * (1 - Math.pow(1 - t, 3));
  const volta = ((car.pos % car.ciclo) + car.ciclo) % car.ciclo;   // volta ao começo sem salto (as cópias estão lá)
  if(volta !== car.pos){ d.de += volta - car.pos; d.para += volta - car.pos; car.pos = volta; }
  if(car.sentido === 'h') car.trilho.scrollLeft = car.pos; else car.trilho.scrollTop = car.pos;
  if(t < 1) requestAnimationFrame(tt => animarCarrossel(car, tt));
  else { car.deslize = null; car.animando = false; }
}

// Notificações (fictícias): usadas pela janela do sino no topo (todas as páginas) e pela página Notificações.
// Sem datas nem horários (regra da v2). curto: texto resumido da janela do sino. av: sigla e cor do colunista, ou foto.
// O que foi lido fica guardado no navegador (v2NotifLidas); o número do menu e a bolinha do sino acompanham.
const NOTIFICACOES = [
  { id:1, tipo:'colunas', av:{ sigla:'SM', cor:'#b0513a' }, curto:'<b>Sofia Martellini</b> publicou uma nova coluna',
    txt:'<b>Sofia Martellini</b> publicou uma nova coluna: “Como o boom das canetas emagrecedoras está impactando a moda?”', acao:['Ler coluna', urlPagina('colunas')] },
  { id:2, tipo:'grupos', foto:'1511632765486-a01980e01a18', curto:'<b>2 mensagens novas</b> no grupo Amigos',
    txt:'<b>2 mensagens novas</b> no grupo <b>Amigos</b>. O Alexandre deixou o aviso do encontro no mural.', acao:['Ver grupo', urlGrupo(1)] },
  { id:3, tipo:'creditos', curto:'Você ganhou <b>5 créditos de bônus</b>',
    txt:'Você ganhou <b>5 créditos de bônus</b> por responder à pesquisa da semana.', acao:['Ver carteira', urlPagina('carteira')] },
  { id:4, tipo:'grupos', foto:'1544367567-0f2fcb009e0b', curto:'Nova prática guiada no <b>Yoga & Meditação</b>',
    txt:'Nova prática guiada marcada no grupo <b>Yoga & Meditação</b>. Confirme sua presença.', acao:['Ver grupo', urlGrupo(4)], lida:true },
  { id:5, tipo:'conteudos', foto:'1506377247377-2a5b3b417ebb', curto:'Novo conteúdo: <b>Na Suíça, um vinho para chamar de seu</b>',
    txt:'Novo conteúdo sobre um assunto que você segue: <b>“Na Suíça, um vinho para chamar de seu”</b>.', acao:['Ler', urlPagina('conteudos')], lida:true },
  { id:6, tipo:'colunas', av:{ sigla:'ZR', cor:'#2f8578' }, curto:'<b>Zé Roberto</b> respondeu ao seu comentário',
    txt:'<b>Zé Roberto</b> respondeu ao seu comentário na coluna <b>Toque do Barão</b>.', acao:['Ver resposta', urlPagina('colunas')], lida:true },
  { id:7, tipo:'grupos', foto:'1510812431401-41d2bd2722f3', curto:'Convite para o <b>Clube do Vinho</b>',
    txt:'Você foi convidado para o <b>Clube do Vinho</b>, grupo gratuito da coluna de vinhos.', acao:['Participar', urlPagina('grupos')], lida:true },
  { id:8, tipo:'softliving', curto:'Boas-vindas! Complete seu perfil',
    txt:'Boas-vindas à SoftLiving! Complete seu perfil para receber conteúdos do seu jeito.', acao:['Completar perfil', '#'], lida:true },
];
const NT_ICONES = { grupos:'grupos', colunas:'colunas', conteudos:'conteudos', creditos:'carteira', softliving:'sino' };
const ntLidas = new Set((() => { try { return JSON.parse(localStorage.getItem('v2NotifLidas')) || []; } catch(e){ return []; } })());
const ehNova = n => !n.lida && !ntLidas.has(n.id);
const naoLidas = () => NOTIFICACOES.filter(ehNova);
function gravarLidas(){
  try { localStorage.setItem('v2NotifLidas', JSON.stringify([...ntLidas])); } catch(e){}
  atualizarNotificacoes();
}
function marcarLida(id){ ntLidas.add(id); gravarLidas(); }
function marcarTodasLidas(){ naoLidas().forEach(n => ntLidas.add(n.id)); gravarLidas(); }
function ntAvatar(n){
  if(n.av) return `<span class="av-col nt-av" style="background:${n.av.cor}">${n.av.sigla}</span>`;
  if(n.foto) return `<img class="nt-av" src="${fotoUrl(n.foto, 120)}" alt="">`;
  return `<span class="nt-av nt-av-ic">${icone(NT_ICONES[n.tipo])}</span>`;
}

// Janelas do topo (sino e créditos): abrem embaixo do botão; fecham ao clicar fora, no botão de novo ou com Esc.
// Só uma fica aberta por vez. render() monta o conteúdo toda vez que a janela abre.
const JANELAS_TOPO = [];
function criarJanelaTopo(botao, classe, id, rotulo, render, aoClicar){
  const j = document.createElement('div');
  j.className = 'janela-topo ' + classe;
  j.id = id;
  j.setAttribute('role', 'dialog');
  j.setAttribute('aria-label', rotulo);
  j.hidden = true;
  botao.after(j);
  botao.setAttribute('aria-haspopup', 'dialog');
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', id);
  const janela = { j, botao, render };
  janela.abrir = abrir => {
    if(abrir){ JANELAS_TOPO.forEach(o => o !== janela && !o.j.hidden && o.abrir(false)); render(j); }
    // alinhada à direita do botão; no celular ocupa a largura da tela, logo abaixo do topo
    const celular = matchMedia('(max-width:640px)').matches;
    j.style.top = abrir && celular ? (botao.getBoundingClientRect().bottom + 10) + 'px' : '';
    j.style.right = abrir && !celular ? (botao.parentElement.getBoundingClientRect().right - botao.getBoundingClientRect().right) + 'px' : '';
    j.hidden = !abrir;
    botao.setAttribute('aria-expanded', abrir);
  };
  botao.addEventListener('click', e => { e.preventDefault(); janela.abrir(j.hidden); });
  j.addEventListener('click', e => { e.stopPropagation(); if(aoClicar) aoClicar(e, j); });  // clique dentro não conta como "fora"
  JANELAS_TOPO.push(janela);
  return janela;
}
document.addEventListener('click', e => JANELAS_TOPO.forEach(o => { if(!o.j.hidden && !o.botao.contains(e.target)) o.abrir(false); }));
document.addEventListener('keydown', e => { if(e.key !== 'Escape') return; JANELAS_TOPO.forEach(o => { if(!o.j.hidden){ o.abrir(false); o.botao.focus(); } }); });

// Janela do sino: todas as notificações resumidas, numa lista com rolagem
const sino = document.querySelector('.top .sino');
function renderJanelaNotif(j){
  const novas = naoLidas().length;
  j.innerHTML = `
    <div class="ntj-topo"><b>Notificações</b>${novas ? `<span class="ntj-conta">${novas} ${novas === 1 ? 'nova' : 'novas'}</span>` : ''}
      <button type="button" class="ntj-ler" ${novas ? '' : 'disabled'}>Marcar como lidas</button></div>
    <div class="ntj-lista">${NOTIFICACOES.map(n => `
      <a href="${n.acao[1]}" class="ntj-item${ehNova(n) ? ' nova' : ''}" data-id="${n.id}">${ntAvatar(n)}<span>${n.curto.replace('SoftLiving', LOGO)}</span>${ehNova(n) ? '<i aria-label="Não lida"></i>' : ''}</a>`).join('')}
    </div>
    <a href="${urlPagina('notificacoes')}" class="ntj-todas">Ver todas as notificações</a>`;
}
const janelaNotif = criarJanelaTopo(sino, 'nt-janela', 'ntJanela', 'Notificações', renderJanelaNotif, (e, j) => {
  if(e.target.closest('.ntj-ler')){ const rolagem = j.querySelector('.ntj-lista').scrollTop; marcarTodasLidas(); renderJanelaNotif(j); j.querySelector('.ntj-lista').scrollTop = rolagem; return; }
  const item = e.target.closest('.ntj-item');
  if(item) marcarLida(+item.dataset.id);
});

// Janela dos créditos: saldo (comprados e bônus), oferta da primeira recarga e atalhos da carteira
const botaoCreditos = document.querySelector('.top .creditos');
criarJanelaTopo(botaoCreditos, 'cr-janela', 'crJanela', 'Seus créditos', j => {
  const bonus = SALDO_BASE + lerBonusCreditos();           // no protótipo, todo o saldo é bônus (ainda sem recarga)
  j.innerHTML = `
    <div class="crj-saldo">
      <small>Saldo disponível</small>
      <p><b>${bonus}</b> créditos</p>
      <div class="crj-partes"><span><i class="ct-ponto comprados"></i>0 comprados</span><span><i class="ct-ponto bonus"></i>${bonus} de bônus</span></div>
    </div>
    <div class="crj-oferta">
      <span>${icone('presente')}Primeira recarga</span>
      <p><b>R$50</b> viram <b>50 créditos + 50 de bônus</b></p>
      <small class="crj-depois">Nas próximas recargas, bônus de 10% a 20%</small>
      <a href="${urlPagina('carteira')}#recarga" class="btn">${icone('mais')}Recarregar</a>
    </div>
    <nav class="crj-links">
      <a href="${urlPagina('carteira')}">${icone('carteira')}Ver extrato e carteira</a>
      <a href="${urlPagina('indicacoes')}">${icone('presente')}Indique e ganhe 5 de bônus</a>
    </nav>`;
});

// Janela de entrada (botão Entrar): Google, Apple ou Facebook, ou e-mail e senha. Protótipo: nada é enviado nem guardado.
const ENTRAR_SOCIAL = [
  ['Google', '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.2a11 11 0 0 0 0 9.9l3.6-2.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/></svg>'],
  ['Apple', '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M16.4 12.6c0-2.4 2-3.5 2-3.6a4.4 4.4 0 0 0-3.4-1.9c-1.5-.1-2.8.9-3.5.9s-1.8-.8-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3a10 10 0 0 0 1.3-2.6 3.9 3.9 0 0 1-2.5-3.6zM14.1 5.5A4 4 0 0 0 15 2.6a4.1 4.1 0 0 0-2.7 1.4 3.8 3.8 0 0 0-1 2.8 3.4 3.4 0 0 0 2.8-1.3z"/></svg>'],
  ['Facebook', '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1877F2"/><path fill="#fff" d="M13.4 19v-6h2l.3-2.4h-2.3V9.1c0-.7.2-1.2 1.2-1.2h1.2V5.8a16 16 0 0 0-1.8-.1c-1.8 0-3 1.1-3 3.1v1.8H9v2.4h2v6h2.4z"/></svg>'],
];
const botaoEntrar = document.querySelector('.top .entrar');
const janelaEntrar = criarJanelaTopo(botaoEntrar, 'en-janela', 'enJanela', 'Entrar na SoftLiving', j => {
  j.innerHTML = `
    <div class="enj-topo"><b>Entrar na ${LOGO}</b><p>Bem-vindo de volta. Escolha como quer entrar.</p></div>
    <div class="enj-social">${ENTRAR_SOCIAL.map(([n, svg]) => `<button type="button" class="enj-social-bt" data-social="${n}">${svg}Continuar com ${n}</button>`).join('')}</div>
    <p class="enj-ou"><span>ou com seu e-mail</span></p>
    <form class="enj-form" id="enForm" novalidate>
      <p class="enj-dica">Protótipo: entre com login <b>123</b> e senha <b>123</b>.</p>
      <label>E-mail ou login<input type="text" name="email" autocomplete="username" placeholder="nome@exemplo.com"></label>
      <label>Senha<span class="enj-senha"><input type="password" name="senha" autocomplete="current-password" placeholder="Sua senha"><button type="button" class="enj-ver" aria-label="Mostrar senha">Mostrar</button></span></label>
      <div class="enj-linha"><label class="enj-lembrar"><input type="checkbox" checked> Manter conectado</label><a href="#" class="enj-esqueci">Esqueci minha senha</a></div>
      <p class="enj-erro" id="enErro" role="alert" hidden>Login ou senha incorretos. No protótipo, use 123 e 123.</p>
      <button type="submit" class="btn enj-entrar">Entrar</button>
    </form>
    <p class="enj-cadastro">Ainda não tem conta? <a href="#" class="enj-criar">Cadastre-se</a> e ganhe 20 créditos de bônus.</p>`;
}, (e, j) => {
  const ver = e.target.closest('.enj-ver');
  if(ver){ const c = j.querySelector('input[name="senha"]'); const mostrar = c.type === 'password'; c.type = mostrar ? 'text' : 'password'; ver.textContent = mostrar ? 'Ocultar' : 'Mostrar'; ver.setAttribute('aria-label', mostrar ? 'Ocultar senha' : 'Mostrar senha'); return; }
  const social = e.target.closest('[data-social]');
  if(social){ mostrarAviso(`Entrar com ${social.dataset.social}: fora deste protótipo`); return; }
  if(e.target.closest('.enj-esqueci')){ e.preventDefault(); mostrarAviso('Recuperar senha: fora deste protótipo'); return; }
  if(e.target.closest('.enj-criar')){ e.preventDefault(); mostrarAviso('Cadastro: fora deste protótipo'); }
});
// Simulação de entrada (protótipo): login 123 e senha 123. Fica guardado no navegador (v2Logado); nada é enviado.
// Com a pessoa logada, o botão Entrar dá lugar ao avatar, que abre a janela da conta com a opção Sair.
const lerLogado = () => { try { return localStorage.getItem('v2Logado') === '1'; } catch(e){ return false; } };
function marcarLogado(logado){
  try { if(logado) localStorage.setItem('v2Logado', '1'); else localStorage.removeItem('v2Logado'); } catch(e){}
  botaoEntrar.hidden = logado;
  botaoAvatar.hidden = !logado;
  document.body.classList.toggle('logado', logado);          // o CSS usa para decidir o que cabe no topo do celular
}
document.addEventListener('submit', e => {
  if(e.target.id !== 'enForm') return;
  e.preventDefault();
  const f = e.target, ok = f.email.value.trim() === '123' && f.senha.value === '123';
  document.getElementById('enErro').hidden = ok;
  if(!ok){ f.senha.value = ''; f.senha.focus(); return; }
  janelaEntrar.abrir(false);
  marcarLogado(true);
  mostrarAviso('Você entrou. Bem-vindo de volta, Rafael!');
});

// Janela da conta (avatar): nome, atalhos e Sair
const botaoAvatar = document.querySelector('.top .avatar-topo');
criarJanelaTopo(botaoAvatar, 'cn-janela', 'cnJanela', 'Sua conta', j => {
  j.innerHTML = `
    <div class="cnj-topo"><span class="cnj-av">RB</span><div><b>Rafael Barros</b><small>ra•••••@exemplo.com</small></div></div>
    <nav class="crj-links">
      <a href="${urlPagina('perfil')}">${icone('perfil')}Meu perfil</a>
      <a href="${urlPagina('carteira')}">${icone('carteira')}Carteira · <span class="saldo-creditos">${SALDO_BASE + lerBonusCreditos()} créditos</span></a>
      <a href="${urlPagina('ajuda')}">${icone('ajuda')}Suporte</a>
    </nav>
    <button type="button" class="cnj-sair">Sair da conta</button>`;
}, e => {
  if(!e.target.closest('.cnj-sair')) return;
  JANELAS_TOPO.forEach(o => !o.j.hidden && o.abrir(false));
  marcarLogado(false);
  mostrarAviso('Você saiu da conta');
});
marcarLogado(lerLogado());

// Janela "Saiba mais" (só no celular): as páginas institucionais, que no computador ficam no menu do topo (a partir de 1360px) e no rodapé
// (celular e telas menores). No computador largo o botão fica escondido e o menu aparece inteiro.
const SAIBA_MAIS = [
  ['conhecer', 'Conhecer', 'O que é a SoftLiving e por que existe'],
  ['quem-somos', 'Quem somos', 'Propósito, missão, visão e valores'],
  ['como-funciona', 'Como funciona', 'Cadastro, conteúdos, grupos e créditos'],
  ['beneficios', 'Benefícios', 'O que você ganha como membro'],
  ['seguranca', 'Segurança', 'Privacidade e cuidado com seus dados'],
  ['patrocinadores', 'Patrocinadores', 'Marcas que apoiam, sem anúncios'],
];
criarJanelaTopo(document.querySelector('.top .saiba-mais'), 'sm-janela', 'smJanela', 'Saiba mais sobre a SoftLiving', j => {
  j.innerHTML = `<div class="smj-topo"><b>Conheça a ${LOGO}</b></div>
    <nav class="smj-links">${SAIBA_MAIS.map(([k, n, d]) => `<a href="${urlSite(k)}"${k === LAYOUT_SITE ? ' aria-current="page" class="on"' : ''}><b>${n}</b><small>${d.replace('SoftLiving', LOGO)}</small></a>`).join('')}</nav>`;
});

// Número de não lidas no menu, bolinha do sino e (na página Notificações) a lista
function atualizarNotificacoes(){
  const n = naoLidas().length;
  document.querySelectorAll('.nav a[data-page="notificacoes"] .tag').forEach(t => { t.textContent = n; t.hidden = !n; });
  sino.querySelector('i').hidden = !n;
  if(typeof renderNotificacoes === 'function') renderNotificacoes();
}
atualizarNotificacoes();

// Salvos (botão da bandeirinha nos cartões): guardados no navegador pelo título do conteúdo; a página Salvos lista.
// marcarSalvos() acende a bandeirinha dos já salvos em qualquer lista (roda sempre que o conteúdo da página muda).
const SALVOS_INICIAIS = ['Na Suíça, um vinho para chamar de seu', 'A casa não precisa parecer decorada', 'Agente de IA anti-golpe'];
function lerSalvos(){ try { const v = JSON.parse(localStorage.getItem('v2Salvos')); return Array.isArray(v) ? v : [...SALVOS_INICIAIS]; } catch(e){ return [...SALVOS_INICIAIS]; } }
function gravarSalvos(lista){ try { localStorage.setItem('v2Salvos', JSON.stringify(lista)); } catch(e){} }
function tituloDoFav(fav){
  const cartao = fav.closest('.vcard, .item, .destaque, .cd-sug, .dl-texto, article') || fav.parentElement;
  const h = cartao && cartao.querySelector('h1, h2, h3');
  return h ? h.textContent.trim() : '';
}
function marcarSalvos(){ const l = lerSalvos(); document.querySelectorAll('main .fav').forEach(f => f.classList.toggle('on', l.includes(tituloDoFav(f)))); }
// Ordem aleatória (Fisher-Yates) numa cópia da lista: Conteúdos, Colunas, Vitrines e Grupos sorteiam a ordem a cada
// carregamento da página (a ordem se mantém enquanto a pessoa troca abas e filtros)
function embaralhar(lista){
  const a = [...lista];
  for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function alternarSalvo(fav){
  const t = tituloDoFav(fav), l = lerSalvos(), salvo = !l.includes(t);
  gravarSalvos(salvo ? [...l, t] : l.filter(x => x !== t));
  marcarSalvos();
  return salvo;
}

// Aviso de protótipo no topo da coluna da direita: os conteúdos dela vão acompanhar a página atual.
// Entra depois que as páginas montam a coluna (DOMContentLoaded); chamar de novo só move o aviso para o topo.
function avisoLateral(){
  const lat = document.querySelector('.lateral');
  if(!lat) return;
  const aviso = lat.querySelector('.lat-aviso');
  if(aviso){ lat.prepend(aviso); return; }
  lat.insertAdjacentHTML('afterbegin', `<div class="lat-aviso" role="note"><b>Protótipo</b><p>Os conteúdos desta coluna vão ter relação com a página em que você está navegando, e nem todas as páginas terão essa coluna de contexto.</p></div>`);
}
document.addEventListener('DOMContentLoaded', avisoLateral);

// Aviso rápido no canto da tela
let toastTimer;
function mostrarAviso(texto){
  const t = document.getElementById('toast');
  t.textContent = texto;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

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
  document.querySelectorAll('.sig:not(.sig-fixo)').forEach(sig => {
    const lf = luminancia(corDeFundo(sig.parentElement));
    const contraste = Math.min(...LOGO_CORES.map(c => { const lc = luminancia(c); return (Math.max(lf, lc) + .05) / (Math.min(lf, lc) + .05); }));
    sig.classList.toggle('sig-light', contraste < 3);
  });
}
// Fichário que não cabe na largura: as abas rolam para o lado, a ponta direita esmaece enquanto houver mais abas e
// aparecem setas (a da direita pisca até a pessoa rolar as abas pela primeira vez, para mostrar que há mais abas)
function prepararSetasAbas(t){
  if(t.parentElement.classList.contains('abas-rolar')) return;
  const caixa = document.createElement('div');
  caixa.className = 'abas-rolar';
  t.before(caixa);
  caixa.append(t);
  ['ant', 'prox'].forEach(lado => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `abas-seta abas-${lado}` + (lado === 'prox' ? ' piscando' : '');
    b.setAttribute('aria-label', lado === 'prox' ? 'Ver mais abas' : 'Voltar às primeiras abas');
    b.tabIndex = -1;
    b.innerHTML = icone('seta');
    b.addEventListener('click', () => { t.scrollBy({ left:(lado === 'prox' ? 1 : -1) * t.clientWidth * .7, behavior:'smooth' }); setTimeout(marcarRolagemAbas, 450); });
    caixa.append(b);
  });
}
function marcarRolagemAbas(){
  document.querySelectorAll('.tabs.folder').forEach(t => {
    prepararSetasAbas(t);
    const caixa = t.parentElement, visivel = !t.hidden && t.clientWidth > 0;
    const mais = visivel && t.scrollLeft + t.clientWidth < t.scrollWidth - 2, antes = visivel && t.scrollLeft > 2;
    t.classList.toggle('mais-abas', mais);
    t.classList.toggle('abas-antes', antes);
    caixa.classList.toggle('tem-mais', mais);
    caixa.classList.toggle('tem-antes', antes);
    if(antes) caixa.querySelector('.abas-prox').classList.remove('piscando'); // já entendeu que rola: para de piscar
  });
}
document.addEventListener('scroll', e => { if(e.target.classList && e.target.classList.contains('folder')) marcarRolagemAbas(); }, true);
addEventListener('resize', marcarRolagemAbas);
addEventListener('load', marcarRolagemAbas);
addEventListener('load', marcarSalvos);

let ajusteLogosPendente = false;
// Regra do portal: nunca quebrar palavra no fim da linha. Palavras com hífen (bem-estar, tornando-se) usam o hífen
// que não quebra (U+2011), para não ficar "bem-" numa linha e "estar" na outra. Campos de texto ficam de fora.
const HIFEN_PALAVRA = /([A-Za-zÀ-ÿ0-9])-(?=[A-Za-zÀ-ÿ0-9])/g;
function hifensInquebraveis(raiz = document.body){
  const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, { acceptNode: n =>
    n.nodeValue.includes('-') && !n.parentElement.closest('script, style, textarea, input, code, pre, [contenteditable]') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
  for(let n; (n = w.nextNode());){ const v = n.nodeValue.replace(HIFEN_PALAVRA, '$1‑'); if(v !== n.nodeValue) n.nodeValue = v; }
}
function agendarAjusteLogos(){
  if(ajusteLogosPendente) return;
  ajusteLogosPendente = true;
  requestAnimationFrame(() => { ajusteLogosPendente = false; ajustarLogosEmTexto(); marcarRolagemAbas(); marcarSalvos(); hifensInquebraveis(); });
}
agendarAjusteLogos();
new MutationObserver(agendarAjusteLogos).observe(document.body, { childList:true, subtree:true });

// Saldo de créditos: saldo fictício + bônus ganhos no protótipo (pesquisas de escuta), guardados na sessão
const SALDO_BASE = 41;
function lerBonusCreditos(){
  try { return +sessionStorage.getItem('bonusCreditos') || 0; } catch(e){ return 0; }
}
function atualizarSaldo(){
  const saldo = SALDO_BASE + lerBonusCreditos();
  document.querySelectorAll('.saldo-creditos').forEach(el => el.textContent = `${saldo} créditos`);
}
atualizarSaldo();

// Aviso de protótipo: abre na primeira visita da sessão (o mesmo aviso da versão 1)
const protoModal = document.getElementById('protoModal');
function openProtoModal(){ protoModal.classList.add('show'); }
function closeProtoModal(){
  protoModal.classList.remove('show');
  try { sessionStorage.setItem('protoAviso', '1'); } catch(e){}
}
let protoVisto = false;
try { protoVisto = sessionStorage.getItem('protoAviso') === '1'; } catch(e){}
if(new URLSearchParams(location.search).get('aviso') === '0') protoVisto = true; // ?aviso=0: sem o aviso (capturas de tela)
if(!protoVisto) openProtoModal();
