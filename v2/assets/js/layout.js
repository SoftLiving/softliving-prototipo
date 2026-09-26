// VERSÃO 2 · Monta a moldura comum de todas as páginas: faixa de protótipo, aviso, menu lateral flutuante
// (recolhível), topo, rodapé e barra inferior do celular. Cada página só tem o próprio conteúdo; este script
// o coloca dentro do <main>.
// Na <body> de cada página:  data-page="inicio|conteudos|grupos|notificacoes|perfil"  ou  data-site="conhecer|..."
//                            data-root="" (páginas na raiz da v2) ou "../" (páginas em subpastas da v2)
const LAYOUT_ROOT = document.body.dataset.root || '';
const LAYOUT_PAGE = document.body.dataset.page || '';
const LAYOUT_SITE = document.body.dataset.site || '';
// Raiz da versão 1 (pasta acima de v2/): páginas ainda não refeitas na v2 abrem a versão 1
const V1_ROOT = LAYOUT_ROOT + '../';

// Endereço de cada destino. Enquanto a página não existe na v2, aponta para a versão 1 (v1:true).
const PAGINAS = {
  inicio:       { url:'index.html' },
  conteudos:    { url:'conteudos.html', v1:true },
  grupos:       { url:'grupos.html', v1:true },
  comunidades:  { url:'comunidades/inicio.html', v1:true },
  conexoes:     { url:'conexoes.html', v1:true },
  simples:      { url:'simples.html', v1:true },
};
function urlPagina(nome){
  const p = PAGINAS[nome];
  return p ? (p.v1 ? V1_ROOT : LAYOUT_ROOT) + p.url : '#';
}
// Páginas institucionais: as que já existem na v2 (v2/institucional/); as demais abrem a versão 1
const SITES_V2 = ['conhecer', 'como-funciona', 'beneficios', 'patrocinadores'];
const urlSite = site => (SITES_V2.includes(site) ? LAYOUT_ROOT : V1_ROOT) + 'institucional/' + site + '.html';

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
  modo:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>',
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
  conexoes:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
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
    { nome:'comunidades', rotulo:'Minhas Comunidades', icone:'comunidades' },
    { nome:'grupos', rotulo:'Grupos', icone:'grupos', aviso:9 },
    { nome:'conexoes', rotulo:'Conexões', icone:'conexoes' },
    { nome:'membros', rotulo:'Membros', icone:'membros' },
    { nome:'parceiros', rotulo:'Parceiros', icone:'parceiros' },
  ]},
  { titulo:'Minha conta', itens:[
    { nome:'carteira', rotulo:'Carteira', icone:'carteira' },
    { nome:'indicacoes', rotulo:'Indicações', icone:'presente' },
    { nome:'perfil', rotulo:'Meu perfil', icone:'perfil' },
    { nome:'ajuda', rotulo:'Ajuda', icone:'ajuda' },
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
  <a href="${V1_ROOT}inicio.html">Ver versão 1</a>
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
  <div class="me">
    <span class="avatar">RB</span>
    <div><small>${saudacao()}</small><strong>Rafael</strong></div>
  </div>

  ${MENU_SECOES.map(sec => `
  <div>
    <div class="sec-t"><span class="lbl">${sec.titulo}</span></div>
    <nav class="nav">${sec.itens.map(m => m.sub ? itemComSub(m) : itemMenu(m)).join('')}</nav>
  </div>`).join('')}

  <div class="wallet">
    <small>Sua carteira</small>
    <strong class="saldo-creditos">41 créditos</strong>
    <a href="#" class="btn" title="Recarregar créditos">${icone('mais')}<span>Recarregar</span></a>
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
    <a href="${urlSite('como-funciona')}" data-site="como-funciona">Como funciona</a>
    <a href="${urlSite('beneficios')}" data-site="beneficios">Benefícios</a>
    <a href="${urlSite('patrocinadores')}" data-site="patrocinadores">Patrocinadores</a>
  </nav>
  <div class="tools">
    <a href="#" class="round" aria-label="Buscar no portal" title="Buscar no portal">${icone('busca')}</a>
    <a href="${urlPagina('simples')}" class="btn simples modo-simples" title="Ver o portal com menos opções e letra maior">${icone('modo')}Modo simples</a>
    <a href="#" class="btn creditos" title="Sua carteira de créditos">${icone('carteira')}<span class="saldo-creditos">41 créditos</span></a>
    <a href="#" class="round" aria-label="Notificações">${icone('sino')}<i></i></a>
    <a href="https://softliving.com.br/entrar" class="btn">Entrar</a>
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
        <a href="${urlSite('conhecer')}">Conhecer</a><a href="${urlSite('como-funciona')}">Como funciona</a><a href="${urlSite('beneficios')}">Benefícios</a><a href="${urlSite('seguranca')}">Segurança</a><a href="${urlSite('patrocinadores')}">Patrocinadores</a></div>
      <div><h4>Conteúdos</h4>
        <a href="${urlPagina('conteudos')}">Saúde e bem-estar</a><a href="${urlPagina('conteudos')}">Estilo e casa</a><a href="${urlPagina('conteudos')}">Turismo e viagem</a><a href="${urlPagina('conteudos')}">Tecnologia</a><a href="#">Colunistas</a></div>
      <div><h4>Comunidade</h4>
        <a href="${urlPagina('grupos')}">Grupos</a><a href="${urlPagina('comunidades')}">Minhas comunidades</a><a href="${V1_ROOT}grupo.html?g=12">Desapego</a><a href="${V1_ROOT}conexoes.html">Conexões</a><a href="#">Parceiros</a></div>
      <div><h4>Sua conta</h4>
        <a href="#">Carteira</a><a href="#">Indicações</a><a href="#">Meu perfil</a><a href="${urlPagina('simples')}">Modo simples</a><a href="#">Ajuda</a></div>
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
  <a href="#" data-page="carteira">${icone('carteira')}Carteira</a>
  <a href="#" id="tabVoce">${icone('perfil')}Você</a>
</nav>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

(function montarLayout(){
  const conteudo = [...document.body.childNodes].filter(n => !(n.nodeType === 1 && n.tagName === 'SCRIPT'));
  conteudo.forEach(n => n.remove());

  const app = document.createElement('div');
  app.className = 'app';
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

// Barra lateral fixa na tela (computador): começa logo abaixo da barra de cima e, ao rolar, sobe até 46px do topo
// (abaixo da faixa de protótipo). Fica sempre com a mesma altura e passa por cima do rodapé.
const sideWrap = document.querySelector('.side-wrap');
let posicaoPendente = false;
function posicionarMenu(){
  posicaoPendente = false;
  document.documentElement.style.setProperty('--side-top', Math.max(46, sideWrap.getBoundingClientRect().top) + 'px');
}
const agendarPosicao = () => { if(!posicaoPendente){ posicaoPendente = true; requestAnimationFrame(posicionarMenu); } };
posicionarMenu();
addEventListener('scroll', agendarPosicao, { passive:true });
addEventListener('resize', agendarPosicao);

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

// Modo simples: a escolha fica guardada para o index.html da versão 1
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
let ajusteLogosPendente = false;
function agendarAjusteLogos(){
  if(ajusteLogosPendente) return;
  ajusteLogosPendente = true;
  requestAnimationFrame(() => { ajusteLogosPendente = false; ajustarLogosEmTexto(); });
}
agendarAjusteLogos();
new MutationObserver(agendarAjusteLogos).observe(document.querySelector('main'), { childList:true, subtree:true });

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
