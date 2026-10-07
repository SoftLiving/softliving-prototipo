// VERSÃO 2 · Monta a moldura comum de todas as páginas: faixa de protótipo, aviso, menu lateral flutuante
// (recolhível), topo, rodapé e barra inferior do celular. Cada página só tem o próprio conteúdo; este script
// o coloca dentro do <main>.
// Na <body> de cada página:  data-page="inicio|conteudos|grupos|notificacoes|perfil"  ou  data-site="conhecer|..."
//                            data-root="" (páginas na raiz da v2) ou "../" (páginas em subpastas da v2)
const LAYOUT_ROOT = document.body.dataset.root || '';
const LAYOUT_PAGE = document.body.dataset.page || '';
const LAYOUT_SITE = document.body.dataset.site || '';
// Página de leitura de um conteúdo ou coluna (conteudo.html?t=<título>)
const urlConteudo = t => `${LAYOUT_ROOT}conteudo.html?t=${encodeURIComponent(t)}`;
// Apresentação de um colunista (colunista.html?c=bernardo-leitao, o mesmo formato do site)
const slugNome = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const urlColunista = nome => `${LAYOUT_ROOT}colunista.html?c=${slugNome(nome)}`;
// Página interna de um grupo (grupo.html?g=<número em GRUPOS>)
const urlGrupo = i => `${LAYOUT_ROOT}grupo.html?g=${i}`;

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
  entrar:       { url:'entrar.html' },              // tela de login (Entrar do menu lateral)
  // Telas trazidas da V1 (2026-10-06). Membros, Oportunidades e Marketplace ficaram fora da V2 (possível V3).
  conversas:    { url:'conversas.html' },           // mensagens diretas com os amigos
  acessibilidade:{ url:'acessibilidade.html' },     // aberta pelo Meu perfil e pela janela da conta
  decisoes:     { url:'decisoes.html' },            // página de trabalho do protótipo: decisões em aberto
};
function urlPagina(nome){
  const p = PAGINAS[nome];
  return p ? LAYOUT_ROOT + p.url : '#';
}
// Páginas institucionais (institucional/). Segurança ainda não foi feita: por enquanto abre o Suporte (Conta e privacidade).
const SITES = ['conhecer', 'quem-somos', 'como-funciona', 'beneficios', 'empresas-e-grupos', 'patrocinadores'];
// Lista única das páginas institucionais: monta o menu do topo (computador), o rodapé e a janela "Saiba mais" (tablet e
// celular), para os três terem sempre os mesmos itens, na mesma ordem. [página, nome, nome curto no menu do topo, descrição]
const INSTITUCIONAL = [
  ['conhecer', 'Conhecer', 'Conhecer', 'O que é a SoftLiving e por que existe'],
  ['quem-somos', 'Quem somos', 'Quem somos', 'Propósito, missão, visão e valores'],
  ['como-funciona', 'Como funciona', 'Como funciona', 'Cadastro, conteúdos, grupos e créditos'],
  ['beneficios', 'Benefícios', 'Benefícios', 'O que você ganha como membro'],
  ['empresas-e-grupos', 'Empresas e grupos', 'Empresas', 'Para empresas e todo tipo de grupo, e a NR-1'],
  ['patrocinadores', 'Patrocinadores', 'Patrocinadores', 'Marcas que apoiam, sem anúncios'],
];
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
  cadeado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  cadeadoAberto:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
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
  encaminhar:'<path d="M14 5l6 6-6 6"/><path d="M20 11H9a5 5 0 0 0-5 5v3"/>',
  acessibilidade:'<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5h14M12 8.5V14M12 14l-3.5 6M12 14l3.5 6"/>',
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
    { nome:'conversas', rotulo:'Conversas', icone:'comentarios', aviso:1 },
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
  <a href="${urlPagina('decisoes')}" class="proto-decisoes">Decisões em aberto</a>
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
  <a href="${urlPagina('entrar')}?volta=${encodeURIComponent(location.href)}" class="me me-visitante" title="Entrar na sua conta">
    <span class="avatar">${icone('perfil')}</span>
    <div><small>${saudacao().replace(',', '!')}</small><strong>Entrar</strong></div>
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
    ${INSTITUCIONAL.map(([k, n, curto]) => `<a href="${urlSite(k)}" data-site="${k}"${curto !== n ? ` title="${n}"` : ''}>${curto}</a>`).join('')}
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
        ${INSTITUCIONAL.map(([k, n]) => `<a href="${urlSite(k)}">${n}</a>`).join('')}</div>
      <div><h4>Conteúdos</h4>
        <a href="${urlPagina('conteudos')}">Saúde e bem-estar</a><a href="${urlPagina('conteudos')}">Estilo e casa</a><a href="${urlPagina('conteudos')}">Turismo e viagem</a><a href="${urlPagina('conteudos')}">Tecnologia</a><a href="${urlPagina('colunas')}">Colunistas</a></div>
      <div><h4>Comunidade</h4>
        <a href="${urlPagina('grupos')}">Grupos</a><a href="${urlPagina('comunidades')}">Minhas comunidades</a><a href="${urlGrupo(12)}">Desapego</a><a href="${urlPagina('amigos')}">Amigos</a><a href="${urlPagina('conversas')}">Conversas</a><a href="${urlPagina('vitrine')}">Vitrines</a></div>
      <div><h4>Sua conta</h4>
        <a href="${urlPagina('carteira')}">Carteira</a><a href="${urlPagina('indicacoes')}">Indicações</a><a href="${urlPagina('perfil')}">Meu perfil</a><a href="${urlPagina('simples')}">Modo simples</a><a href="${urlPagina('acessibilidade')}">Acessibilidade</a><a href="${urlPagina('ajuda')}">Suporte</a></div>
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
// Topo do menu sem login: "Entrar" no lugar do nome leva à tela de login (entrar.html); nas páginas que já mostram o
// box de entrada, só leva ao campo de e-mail
document.querySelector('.me-visitante').addEventListener('click', e => {
  const box = document.querySelector('.pla-box');
  if(!box) return;
  e.preventDefault(); fecharMenu(); scrollTo(0, 0);
  box.querySelector('input[name="email"]').focus();
});

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
// art: artigo da marca ("a Claro", "o Bradesco Saúde"), usado nas frases de apoio.
const PATROCINADORES = [
  { nome:"Rede D'Or", art:'a', logo:'assets/img/logo-rede-dor.png', altura:56 },
  { nome:'Claro', art:'a', logo:'assets/img/logo-claro.png', altura:40 },
  { nome:'Bradesco Saúde', art:'o', logo:'assets/img/logo-bradesco-saude.png', altura:48 },
];
// No lugar de "Com o apoio de": uma frase sorteada a cada visita, sobre por que a marca apoia o projeto.
// M = "A Claro" (começo da frase), m = "a Claro", de = "da Claro", S = logo SoftLiving em texto.
const FRASES_APOIO = [
  ({ M, S }) => `${M} apoia o bem-estar de quem faz parte da ${S}`,
  ({ M }) => `${M} apoia um projeto que conecta pessoas para viver melhor`,
  ({ M, S }) => `${M} acredita em um digital mais humano e apoia a ${S}`,
  ({ m }) => `Com ${m}, mais tempo de qualidade para você`,
  ({ M }) => `${M} apoia conteúdo de qualidade, sem anúncios`,
  ({ M }) => `${M} apoia encontros de verdade, dentro e fora da tela`,
  ({ M }) => `${M} incentiva uma vida mais ativa, saudável e conectada`,
  ({ M }) => `${M} apoia uma navegação sem pressa e sem ruído`,
  ({ M }) => `${M} apoia quem escolhe o que realmente importa`,
  ({ M }) => `${M} apoia comunidades que cuidam umas das outras`,
  ({ M }) => `${M} apoia uma longevidade mais plena`,
  ({ de }) => `Este espaço sem anúncios tem o apoio ${de}`,
  ({ M }) => `${M} apoia o bem-estar digital de toda a família`,
  ({ M }) => `${M} apoia a troca de conhecimento entre gerações`,
  ({ M }) => `${M} apoia a curadoria que valoriza o seu tempo`,
  ({ M }) => `${M} apoia a alegria de ficar de fora do que não importa`,
  ({ M }) => `${M} apoia quem se conecta por interesses em comum`,
  ({ m }) => `Viver melhor é um projeto coletivo, e ${m} faz parte dele`,
  ({ M }) => `${M} apoia um ambiente digital seguro e acolhedor`,
  ({ M }) => `${M} apoia quem cria conteúdo com cuidado e respeito`,
];
const fraseApoio = p => {
  const m = `${p.art} ${p.nome}`, M = m.charAt(0).toUpperCase() + m.slice(1), de = `${p.art === 'a' ? 'da' : 'do'} ${p.nome}`;
  return FRASES_APOIO[Math.floor(Math.random() * FRASES_APOIO.length)]({ M, m, de, S:LOGO });
};
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
    vaga.innerHTML = `<span class="apoio-rotulo">${fraseApoio(p)}</span><img src="${LAYOUT_ROOT}${p.logo}?v=${LOGOS_VERSAO}" alt="${p.nome}" style="height:${p.altura}px">`;
  });
  // A frase sempre em 2 linhas de tamanho parecido: começa com a metade da frase inteira como largura e vai abrindo
  // até caber em 2 linhas; o text-wrap:balance do CSS equilibra as duas. Refaz quando as fontes carregam e ao mudar a janela.
  const duasLinhas = () => document.querySelectorAll('main .apoio-rotulo').forEach(r => {
    r.style.maxWidth = 'none'; r.style.whiteSpace = 'nowrap';
    const faixa = r.parentElement, logo = faixa.querySelector('img'), gap = parseFloat(getComputedStyle(faixa).columnGap) || 0;
    const coluna = getComputedStyle(faixa).gridTemplateColumns.split(' ').length > 1 ? (faixa.clientWidth - logo.offsetWidth) / 2 - gap : faixa.clientWidth;
    const inteira = r.scrollWidth, limite = Math.max(120, coluna), linha = parseFloat(getComputedStyle(r).lineHeight);
    r.style.whiteSpace = '';
    // Regra: sempre exatamente 2 linhas, em qualquer resolução (nunca 1, nunca 3 ou mais).
    // Começa na metade da frase (garante pelo menos 2 linhas) e vai abrindo até caber em 2.
    r.style.fontSize = '';
    let largura = Math.ceil(inteira / 2);
    do { r.style.maxWidth = Math.min(largura, limite) + 'px'; largura += 6; }
    while(r.offsetHeight > linha * 2.5 && largura < limite);
    // Se nem na largura toda coube em 2 linhas, a letra diminui aos poucos até caber (e a largura volta a ser a metade
    // da frase no novo tamanho, para continuar em 2 linhas e não virar 1)
    let tamanho = parseFloat(getComputedStyle(r).fontSize);
    const linhas = () => Math.round(r.offsetHeight / parseFloat(getComputedStyle(r).lineHeight));
    while(linhas() > 2 && tamanho > 9){
      tamanho -= .5; r.style.fontSize = tamanho + 'px';
      r.style.maxWidth = 'none'; r.style.whiteSpace = 'nowrap';
      const nova = r.scrollWidth; r.style.whiteSpace = '';
      let l = Math.ceil(nova / 2);
      do { r.style.maxWidth = Math.min(l, limite) + 'px'; l += 6; } while(linhas() > 2 && l < limite);
    }
  });
  duasLinhas();
  if(document.fonts) document.fonts.ready.then(duasLinhas);
  addEventListener('resize', duasLinhas);
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
    // Com mouse: só a seta do lado de onde o mouse está acende, e acende aos poucos conforme ele se aproxima dela
    // (--perto vai de 0 a 1; o CSS usa como opacidade). A outra fica apagada. Ao sair do carrossel, apaga devagar.
    if(matchMedia('(hover:hover)').matches){
      car.addEventListener('mousemove', e => {
        const r = car.getBoundingClientRect();
        const alcance = (dir === 'h' ? r.width : r.height) * .6;   // a partir de 60% do carrossel de distância, apagada
        const dist = b => { const c = b.getBoundingClientRect(); return Math.hypot(e.clientX - (c.left + c.width / 2), e.clientY - (c.top + c.height / 2)); };
        const da = dist(car.ant), dp = dist(car.prox), perto = Math.min(da, dp);
        const nivel = Math.max(0, Math.min(1, 1.15 - perto / alcance));   // 1 já um pouco antes de chegar na seta
        [[car.ant, da <= dp], [car.prox, dp < da]].forEach(([b, estePerto]) => {
          const v = estePerto ? nivel : 0;
          b.style.setProperty('--perto', v.toFixed(3));
          b.style.pointerEvents = v > .15 ? '' : 'none';             // apagada não recebe clique por engano
        });
      });
      car.addEventListener('mouseleave', () => [car.ant, car.prox].forEach(b => { b.style.setProperty('--perto', 0); b.style.pointerEvents = ''; }));
    }
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
// q: data e hora do aviso (decisão de 2026-10-06: notificações e extrato mostram data e hora). curto: texto resumido da janela do sino. av: sigla e cor do colunista, ou foto.
// O que foi lido fica guardado no navegador (v2NotifLidas); o número do menu e a bolinha do sino acompanham.
const NOTIFICACOES = [
  { id:1, q:'06/10/2026 às 09:12', tipo:'colunas', av:{ sigla:'SM', cor:'#b0513a' }, curto:'<b>Sofia Martellini</b> publicou uma nova coluna',
    txt:'<b>Sofia Martellini</b> publicou uma nova coluna: “Como o boom das canetas emagrecedoras está impactando a moda?”', acao:['Ler coluna', urlConteudo('Como o boom das canetas emagrecedoras está impactando a moda?')] },
  { id:2, q:'05/10/2026 às 18:40', tipo:'grupos', foto:'1511632765486-a01980e01a18', curto:'<b>2 mensagens novas</b> no grupo Amigos',
    txt:'<b>2 mensagens novas</b> no grupo <b>Amigos</b>. O Alexandre deixou o aviso do encontro no mural.', acao:['Ver grupo', urlGrupo(1)] },
  { id:3, q:'05/10/2026 às 11:05', tipo:'creditos', curto:'Você ganhou <b>5 créditos de bônus</b>',
    txt:'Você ganhou <b>5 créditos de bônus</b> por responder à pesquisa da semana.', acao:['Ver carteira', urlPagina('carteira')] },
  { id:4, q:'03/10/2026 às 16:20', tipo:'grupos', foto:'1544367567-0f2fcb009e0b', curto:'Nova prática guiada no <b>Yoga & Meditação</b>',
    txt:'Nova prática guiada marcada no grupo <b>Yoga & Meditação</b>. Confirme sua presença.', acao:['Ver grupo', urlGrupo(4)], lida:true },
  { id:5, q:'02/10/2026 às 08:30', tipo:'conteudos', foto:'1506377247377-2a5b3b417ebb', curto:'Novo conteúdo: <b>Na Suíça, um vinho para chamar de seu</b>',
    txt:'Novo conteúdo sobre um assunto que você segue: <b>“Na Suíça, um vinho para chamar de seu”</b>.', acao:['Ler', urlConteudo('Na Suíça, um vinho para chamar de seu')], lida:true },
  { id:6, q:'30/09/2026 às 21:14', tipo:'colunas', av:{ sigla:'ZR', cor:'#2f8578' }, curto:'<b>Zé Roberto</b> respondeu ao seu comentário',
    txt:'<b>Zé Roberto</b> respondeu ao seu comentário na coluna <b>Toque do Barão</b>.', acao:['Ver resposta', urlPagina('colunas')], lida:true },
  { id:7, q:'28/09/2026 às 10:02', tipo:'grupos', foto:'1510812431401-41d2bd2722f3', curto:'Convite para o <b>Clube do Vinho</b>',
    txt:'Você foi convidado para o <b>Clube do Vinho</b>, grupo gratuito da coluna de vinhos.', acao:['Participar', urlPagina('grupos')], lida:true },
  { id:8, q:'23/09/2026 às 14:45', tipo:'softliving', curto:'Boas-vindas! Complete seu perfil',
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
    // alinhada à direita do botão; no celular ocupa a largura da tela (16px de cada lado), logo abaixo do topo. Fica presa
    // ao topo (não à tela): ao rolar a página, sobe e some junto com ele.
    const celular = matchMedia('(max-width:640px)').matches;
    j.style.top = j.style.left = j.style.right = '';
    j.hidden = !abrir;
    if(abrir && celular){
      const ref = j.offsetParent.getBoundingClientRect();
      j.style.top = (botao.getBoundingClientRect().bottom - ref.top + 10) + 'px';
      j.style.left = (16 - ref.left) + 'px';
      j.style.right = (ref.right - (document.documentElement.clientWidth - 16)) + 'px';
    } else if(abrir) j.style.right = (botao.parentElement.getBoundingClientRect().right - botao.getBoundingClientRect().right) + 'px';
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
      <a href="${n.acao[1]}" class="ntj-item${ehNova(n) ? ' nova' : ''}" data-id="${n.id}">${ntAvatar(n)}<span>${n.curto.replace('SoftLiving', LOGO)}<small class="ntj-quando">${n.q}</small></span>${ehNova(n) ? '<i aria-label="Não lida"></i>' : ''}</a>`).join('')}
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
  const bonus = saldoCreditos();                           // no protótipo, todo o saldo é bônus (ainda sem recarga)
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

// Janela de entrada (botão Entrar): Google, Apple ou Facebook, e-mail e senha, ou um link de acesso enviado por e-mail. Protótipo: nada é enviado nem guardado.
const ENTRAR_SOCIAL = [
  ['Google', '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.2a11 11 0 0 0 0 9.9l3.6-2.8z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/></svg>'],
  ['Apple', '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#111" d="M16.4 12.6c0-2.4 2-3.5 2-3.6a4.4 4.4 0 0 0-3.4-1.9c-1.5-.1-2.8.9-3.5.9s-1.8-.8-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3a10 10 0 0 0 1.3-2.6 3.9 3.9 0 0 1-2.5-3.6zM14.1 5.5A4 4 0 0 0 15 2.6a4.1 4.1 0 0 0-2.7 1.4 3.8 3.8 0 0 0-1 2.8 3.4 3.4 0 0 0 2.8-1.3z"/></svg>'],
  ['Facebook', '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#1877F2"/><path fill="#fff" d="M13.4 19v-6h2l.3-2.4h-2.3V9.1c0-.7.2-1.2 1.2-1.2h1.2V5.8a16 16 0 0 0-1.8-.1c-1.8 0-3 1.1-3 3.1v1.8H9v2.4h2v6h2.4z"/></svg>'],
];
// O conteúdo (htmlEntrar) e os cliques (cliqueEntrar) são os mesmos na janela do topo e no box das páginas que pedem login.
const htmlEntrar = (titulo, texto) => `
    <div class="enj-topo"><b>${titulo}</b><p>${texto}</p></div>
    <div class="enj-social">${ENTRAR_SOCIAL.map(([n, svg]) => `<button type="button" class="enj-social-bt" data-social="${n}">${svg}Continuar com ${n}</button>`).join('')}</div>
    <p class="enj-ou"><span>ou com seu e-mail</span></p>
    <form class="enj-form" novalidate>
      <label>E-mail ou login<input type="text" name="email" autocomplete="username" placeholder="nome@exemplo.com"></label>
      <label>Senha<span class="enj-senha"><input type="password" name="senha" autocomplete="current-password" placeholder="Sua senha"><button type="button" class="enj-ver" aria-label="Mostrar senha">Mostrar</button></span></label>
      <div class="enj-linha"><label class="enj-lembrar"><input type="checkbox" checked> Manter conectado</label><a href="#" class="enj-esqueci">Esqueci minha senha</a></div>
      <p class="enj-erro" role="alert" hidden>Login ou senha incorretos. No protótipo, deixe os campos vazios ou use 123 e 123.</p>
      <button type="submit" class="btn enj-entrar">Entrar</button>
      <button type="button" class="enj-link-email">Receber um link de acesso por e-mail</button>
    </form>
    <p class="enj-cadastro">Ainda não tem conta? <a href="#" class="enj-criar">Cadastre-se</a> e ganhe 20 créditos de bônus.</p>`;
function cliqueEntrar(e, j){
  const ver = e.target.closest('.enj-ver');
  if(ver){ const c = j.querySelector('input[name="senha"]'); const mostrar = c.type === 'password'; c.type = mostrar ? 'text' : 'password'; ver.textContent = mostrar ? 'Ocultar' : 'Mostrar'; ver.setAttribute('aria-label', mostrar ? 'Ocultar senha' : 'Mostrar senha'); return; }
  const social = e.target.closest('[data-social]');
  if(social){ mostrarAviso(`Entrar com ${social.dataset.social}: fora deste protótipo`); return; }
  if(e.target.closest('.enj-link-email')){ mostrarAviso('Link de acesso por e-mail: fora deste protótipo'); return; }
  if(e.target.closest('.enj-esqueci')){ e.preventDefault(); mostrarAviso('Recuperar senha: fora deste protótipo'); return; }
  if(e.target.closest('.enj-criar')){ e.preventDefault(); mostrarAviso('Cadastro: fora deste protótipo'); }
}
const botaoEntrar = document.querySelector('.top .entrar');
const janelaEntrar = criarJanelaTopo(botaoEntrar, 'en-janela', 'enJanela', 'Entrar na SoftLiving',
  j => { j.innerHTML = htmlEntrar(`Entrar na ${LOGO}`, 'Bem-vindo de volta. Escolha como quer entrar.'); }, cliqueEntrar);
// Simulação de entrada (protótipo): Entrar com os campos vazios, ou login 123 e senha 123. Fica guardado no navegador (v2Logado); nada é enviado.
// Com a pessoa logada, o botão Entrar dá lugar ao avatar, que abre a janela da conta com a opção Sair.
const lerLogado = () => { try { return localStorage.getItem('v2Logado') === '1'; } catch(e){ return false; } };
function marcarLogado(logado){
  try { if(logado) localStorage.setItem('v2Logado', '1'); else localStorage.removeItem('v2Logado'); } catch(e){}
  botaoEntrar.hidden = logado;
  botaoAvatar.hidden = !logado;
  document.body.classList.toggle('logado', logado);          // o CSS usa para decidir o que cabe no topo do celular
  // Na tela de login o menu lateral fica sempre recolhido; depois de entrar, volta como a pessoa deixou
  if(document.body.classList.contains('pede-login')) marcarRecolhido(!logado || lerPreferencia('v2MenuRecolhido') === '1');
  // Na página Entrar, depois de entrar (ou se já estava logado), volta para a página de onde veio (?volta=), ou a Início
  if(logado && LAYOUT_PAGE === 'entrar') location.replace(paginaDeVolta());
}
function paginaDeVolta(){
  try {
    const u = new URL(new URLSearchParams(location.search).get('volta') || '', location.href);
    if(u.protocol === location.protocol && u.host === location.host && !/\/entrar\.html$/.test(u.pathname)) return u.href;
  } catch(e){}
  return urlPagina('inicio');
}
document.addEventListener('submit', e => {
  if(!e.target.classList.contains('enj-form')) return;
  e.preventDefault();
  // Entra com os dois campos vazios (atalho do protótipo) ou com login 123 e senha 123
  const f = e.target, email = f.email.value.trim(), senha = f.senha.value;
  const ok = (!email && !senha) || (email === '123' && senha === '123');
  f.querySelector('.enj-erro').hidden = ok;
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
      <a href="${urlPagina('carteira')}">${icone('carteira')}Carteira · <span class="saldo-creditos">${saldoCreditos()} créditos</span></a>
      <a href="${urlPagina('acessibilidade')}">${icone('acessibilidade')}Acessibilidade</a>
      <a href="${urlPagina('ajuda')}">${icone('ajuda')}Suporte</a>
    </nav>
    <button type="button" class="cnj-sair">Sair da conta</button>`;
}, e => {
  if(!e.target.closest('.cnj-sair')) return;
  JANELAS_TOPO.forEach(o => !o.j.hidden && o.abrir(false));
  marcarLogado(false);
  mostrarAviso('Você saiu da conta');
});
// Páginas com informações pessoais (perfil, carteira, Atividades, notificações, indicações, amigos e Minhas Comunidades): sem login, o conteúdo fica escondido pelo CSS e
// aparece o aviso para entrar; ao entrar, o conteúdo aparece na hora. Os créditos (topo e menu) também só aparecem logado.
const PAGINAS_COM_LOGIN = ['entrar', 'perfil', 'carteira', 'curtidas', 'comentarios', 'acompanhar', 'salvos', 'notificacoes', 'indicacoes', 'amigos', 'comunidades', 'conversas'];
if(PAGINAS_COM_LOGIN.includes(LAYOUT_PAGE)){
  document.body.classList.add('pede-login');
  // Box de entrada no centro, com o mesmo conteúdo da janela Entrar
  document.querySelector('main').insertAdjacentHTML('afterbegin', `
    <section class="pede-login-aviso">
      <div class="pla-box" role="region" aria-label="Entrar na SoftLiving">${htmlEntrar(`Entrar na ${LOGO}`, 'Bem-vindo de volta. Entre para ver seu perfil, seus créditos, suas atividades e suas comunidades.')}</div>
    </section>`);
  const boxEntrar = document.querySelector('.pla-box');
  boxEntrar.addEventListener('click', e => cliqueEntrar(e, boxEntrar));
  // Box centralizado na tela inteira, não só na área do conteúdo (que começa depois do espaço do menu lateral);
  // se a tela for estreita, para logo ao lado do menu, sem passar por cima dele.
  function centralizarBox(){
    boxEntrar.style.translate = '';
    if(document.body.classList.contains('logado')) return;
    const r = boxEntrar.getBoundingClientRect(), menu = document.querySelector('.side').getBoundingClientRect();
    const minimo = menu.right > 0 ? menu.right + 16 : 0;              // no celular o menu é a gaveta escondida
    const dx = Math.max(innerWidth / 2 - (r.left + r.width / 2), minimo - r.left);
    boxEntrar.style.translate = `${Math.round(dx)}px 0`;
  }
  centralizarBox();
  addEventListener('resize', centralizarBox);
  addEventListener('load', centralizarBox);
  document.getElementById('collapseBtn').addEventListener('click', () => requestAnimationFrame(centralizarBox));
}
marcarLogado(lerLogado());

// Janela "Saiba mais" (celular e telas menores): as páginas de INSTITUCIONAL, as mesmas do menu do topo do computador
// (a partir de 1360px). No computador largo o botão fica escondido e o menu aparece inteiro.
criarJanelaTopo(document.querySelector('.top .saiba-mais'), 'sm-janela', 'smJanela', 'Saiba mais sobre a SoftLiving', j => {
  j.innerHTML = `<div class="smj-topo"><b>Conheça a ${LOGO}</b></div>
    <nav class="smj-links">${INSTITUCIONAL.map(([k, n, , d]) => `<a href="${urlSite(k)}"${k === LAYOUT_SITE ? ' aria-current="page" class="on"' : ''}><b>${n}</b><small>${d.replace('SoftLiving', LOGO)}</small></a>`).join('')}</nav>`;
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
// Aviso depois de salvar ou tirar dos salvos (conteúdo ou grupo)
const avisoSalvo = (fav, salvo) => mostrarAviso(fav.dataset.vitrine !== undefined ? (salvo ? 'Vitrine salva' : 'Vitrine removida dos salvos') : fav.dataset.grupo !== undefined ? (salvo ? 'Grupo salvo' : 'Grupo removido dos salvos') : (salvo ? 'Salvo para ler depois' : 'Removido dos salvos'));
// marcarSalvos() acende a bandeirinha dos já salvos em qualquer lista (roda sempre que o conteúdo da página muda).
const SALVOS_INICIAIS = ['Na Suíça, um vinho para chamar de seu', 'A casa não precisa parecer decorada', 'Agente de IA anti-golpe'];
function lerSalvos(){ try { const v = JSON.parse(localStorage.getItem('v2Salvos')); return Array.isArray(v) ? v : [...SALVOS_INICIAIS]; } catch(e){ return [...SALVOS_INICIAIS]; } }
function gravarSalvos(lista){ try { localStorage.setItem('v2Salvos', JSON.stringify(lista)); } catch(e){} }
function tituloDoFav(fav){
  if(fav.dataset.titulo) return fav.dataset.titulo;            // cartões em que o título não é o h1/h2/h3 (ex.: Coluna do dia)
  const cartao = fav.closest('.vcard, .item, .destaque, .cd-sug, .dl-texto, .ct-tile, .ct-faixa, article') || fav.parentElement;
  const h = cartao && cartao.querySelector('h1, h2, h3');
  return h ? h.textContent.replace(/‑/g, '-').trim() : '';   // o texto.js troca o hífen por um que não quebra; aqui volta ao normal
}
// Grupos também podem ser salvos (bandeirinha dos cartões de grupo): guardados pelo nome do grupo, numa lista própria
function lerGruposSalvos(){ try { const v = JSON.parse(localStorage.getItem('v2GruposSalvos')); return Array.isArray(v) ? v : []; } catch(e){ return []; } }
function gravarGruposSalvos(lista){ try { localStorage.setItem('v2GruposSalvos', JSON.stringify(lista)); } catch(e){} }
function marcarSalvos(){
  const l = lerSalvos(), g = lerGruposSalvos();
  const v = typeof estFavoritos === 'function' ? estFavoritos() : [];   // vitrines salvas (estabelecimentos-dados.js)
  document.querySelectorAll('main .fav').forEach(f => f.classList.toggle('on', f.dataset.vitrine !== undefined ? v.includes(+f.dataset.vitrine)
    : f.dataset.grupo !== undefined ? g.includes(f.dataset.grupo) : l.includes(tituloDoFav(f))));
}
// Ordem aleatória (Fisher-Yates) numa cópia da lista: Conteúdos, Colunas, Vitrines e Grupos sorteiam a ordem a cada
// carregamento da página (a ordem se mantém enquanto a pessoa troca abas e filtros)
// Selo de acesso dos conteúdos (todos os cartões do site): Grátis ou o preço em créditos com cadeado (pago, ainda
// fechado). Conteúdo pago já destravado pela pessoa fica sem selo. O destravar acontece na tela do conteúdo
// (conteudo.js), que guarda o título em v2Destravados; conteúdos com badge 'destravado' nos dados já vêm destravados.
function lerDestravados(){ try { const v = JSON.parse(localStorage.getItem('v2Destravados')); return Array.isArray(v) ? v : []; } catch(e){ return []; } }
function seloAcesso(c){
  if(c.badge === 'destravado' || (c.badge === 'premium' && lerDestravados().includes(c.t))) return '';
  if(c.badge === 'premium') return `<span class="selo-acesso pago">${icone('cadeado')}${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>`;
  return '<span class="selo-acesso gratis">Grátis</span>';
}
function embaralhar(lista){
  const a = [...lista];
  for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function alternarSalvo(fav){
  if(fav.dataset.vitrine !== undefined){                        // cartão de vitrine (estabelecimento)
    const id = +fav.dataset.vitrine, salvar = !estFavoritos().includes(id);
    definirEstFavorito(id, salvar);
    marcarSalvos();
    return salvar;
  }
  if(fav.dataset.grupo !== undefined){                          // cartão de grupo
    const g = lerGruposSalvos(), salvar = !g.includes(fav.dataset.grupo);
    gravarGruposSalvos(salvar ? [...g, fav.dataset.grupo] : g.filter(x => x !== fav.dataset.grupo));
    marcarSalvos();
    return salvar;
  }
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
// Janela de compartilhar (leitura, colunista, grupo): WhatsApp, E-mail, Facebook, copiar o link e, no celular, o
// compartilhar do próprio aparelho. abrirCompartilhar({ titulo, texto, url }); fecha no X, no fundo ou com Esc.
const COMP_ICONES = {
  whatsapp:'<path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z"/>',
  email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  facebook:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  mais:'<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>',
};
function abrirCompartilhar({ titulo = document.title, texto = '', url = location.href } = {}){
  let j = document.getElementById('compJanela');
  if(!j){
    j = document.createElement('div');
    j.id = 'compJanela'; j.className = 'comp-fundo'; j.hidden = true;
    document.body.appendChild(j);
    j.addEventListener('click', ev => { if(ev.target === j || ev.target.closest('[data-comp-fechar]')) fecharCompartilhar(); });
    document.addEventListener('keydown', ev => { if(ev.key === 'Escape' && !j.hidden) fecharCompartilhar(); });
  }
  const msg = `${texto ? texto + ' ' : ''}${titulo}`.trim();
  const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${COMP_ICONES[n]}</svg>`;
  const opcoes = [
    ['whatsapp', 'WhatsApp', `https://wa.me/?text=${encodeURIComponent(msg + '\n' + url)}`],
    ['email', 'E-mail', `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(msg + '\n\n' + url)}`],
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
  ];
  j.innerHTML = `
    <div class="comp-caixa" role="dialog" aria-modal="true" aria-labelledby="compTitulo" tabindex="-1">
      <button type="button" class="comp-fechar" data-comp-fechar aria-label="Fechar">✕</button>
      <h2 id="compTitulo">Compartilhar</h2>
      <p class="comp-o-que">${titulo.replace(/SoftLiving/g, LOGO)}</p>
      <div class="comp-opcoes">
        ${opcoes.map(([k, n, href]) => `<a class="comp-op comp-${k}" href="${href}" target="_blank" rel="noopener" data-comp-fechar>${ic(k)}<span>${n}</span></a>`).join('')}
        <button type="button" class="comp-op comp-link" data-comp-copiar>${ic('link')}<span>Copiar link</span></button>
        ${navigator.share ? `<button type="button" class="comp-op comp-mais" data-comp-nativo>${ic('mais')}<span>Mais opções</span></button>` : ''}
      </div>
      <div class="comp-campo"><input type="text" readonly value="${url}" aria-label="Link"><button type="button" class="btn" data-comp-copiar>Copiar</button></div>
    </div>`;
  j.querySelectorAll('[data-comp-copiar]').forEach(b => b.addEventListener('click', () => {
    if(navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    j.querySelector('.comp-campo input').select();
    mostrarAviso('Link copiado. É só colar na conversa');
  }));
  const nativo = j.querySelector('[data-comp-nativo]');
  if(nativo) nativo.addEventListener('click', () => { navigator.share({ title:titulo, text:msg, url }).catch(() => {}); fecharCompartilhar(); });
  j.hidden = false;
  document.body.classList.add('comp-aberta');
  j.querySelector(".comp-caixa").focus();   // foco na janela (teclado: Tab passa pelas opções), sem destacar uma opção
}
function fecharCompartilhar(){
  const j = document.getElementById('compJanela'); if(!j) return;
  j.hidden = true; document.body.classList.remove('comp-aberta');
}

// Janela de encaminhar um conteúdo (função da V1): escolher um ou mais amigos e, se quiser, escrever um recado.
// Encaminhar é sempre para amigos (decisão de 2026-10-06). A janela abre com os 7 amigos com quem a pessoa mais
// interage (ENC_AMIGOS já vem nessa ordem) e tem uma busca pelo nome entre todos os amigos. Usa a mesma janela do
// Compartilhar. Quem recebe é avisado por notificação. Amigos fictícios.
const ENC_AMIGOS = [['Alexandre Duarte', '#013565'], ['Helena Martins', '#7a3b52'], ['Marcos Teixeira', '#2f8578'], ['Célia Ribeiro', '#b0513a'], ['Beatriz Nogueira', '#5b4b8a'],
  ['Jorge Albuquerque', '#8a6414'], ['Lúcia Campos', '#2f5d3a'], ['Roberto Freitas', '#3f6b8f'], ['Luciana Russi', '#2f8578'], ['Maria Helena Sobral', '#d4a24c'], ['Claudio Brito', '#c1633f'],
  ['Sônia Prado', '#7a3b52'], ['Paulo Regis', '#3d6b8c'], ['Tereza Lins', '#5b4b8a']];
const ENC_PRIMEIROS = 7;
function abrirEncaminhar({ titulo = document.title } = {}){
  abrirCompartilhar({ titulo });
  const caixa = document.querySelector('#compJanela .comp-caixa');
  const sigla = n => n.split(' ').slice(0, 2).map(p => p[0]).join('');
  const semAcento = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const escolhidos = new Set();
  caixa.querySelector('h2').textContent = 'Encaminhar para amigos';
  caixa.querySelector('.comp-opcoes').remove();
  caixa.querySelector('.comp-campo').outerHTML = `
    <label class="busca enc-busca">${icone('busca')}<input type="search" placeholder="Buscar amigo pelo nome" aria-label="Buscar amigo pelo nome"></label>
    <small class="enc-rotulo"></small>
    <div class="enc-lista"></div>
    <textarea class="enc-msg" placeholder="Escreva um recado (opcional)" aria-label="Recado"></textarea>
    <div class="enc-fim"><span class="enc-conta"></span><button type="button" class="btn ghost" data-comp-fechar>Cancelar</button><button type="button" class="btn" data-enc-enviar>Encaminhar</button></div>`;
  const campo = caixa.querySelector('.enc-busca input'), lista = caixa.querySelector('.enc-lista');
  function mostrar(){
    const termo = semAcento(campo.value.trim());
    // sem busca: os 7 com quem mais interage (e os já escolhidos); com busca: todos os amigos com esse nome
    const quem = ENC_AMIGOS.map((a, i) => i).filter(i => termo ? semAcento(ENC_AMIGOS[i][0]).includes(termo) : i < ENC_PRIMEIROS || escolhidos.has(i));
    caixa.querySelector('.enc-rotulo').textContent = termo ? `${quem.length} ${quem.length === 1 ? 'amigo encontrado' : 'amigos encontrados'}` : 'Com quem você mais conversa';
    lista.innerHTML = quem.map(i => `<label class="enc-amigo"><input type="checkbox" value="${i}" ${escolhidos.has(i) ? 'checked' : ''}><span class="av-col" style="background:${ENC_AMIGOS[i][1]}">${sigla(ENC_AMIGOS[i][0])}</span>${ENC_AMIGOS[i][0]}</label>`).join('')
      || '<p class="enc-vazio">Nenhum amigo com esse nome.</p>';
    caixa.querySelector('.enc-conta').textContent = escolhidos.size ? `${escolhidos.size} ${escolhidos.size === 1 ? 'escolhido' : 'escolhidos'}` : '';
  }
  campo.addEventListener('input', mostrar);
  lista.addEventListener('change', ev => { const c = ev.target; if(c.checked) escolhidos.add(+c.value); else escolhidos.delete(+c.value); caixa.querySelector('.enc-conta').textContent = escolhidos.size ? `${escolhidos.size} ${escolhidos.size === 1 ? 'escolhido' : 'escolhidos'}` : ''; });
  caixa.querySelector('[data-enc-enviar]').addEventListener('click', () => {
    const n = escolhidos.size;
    if(!n){ mostrarAviso('Escolha pelo menos um amigo'); return; }
    fecharCompartilhar();
    mostrarAviso(`Conteúdo encaminhado para ${n} ${n === 1 ? 'amigo' : 'amigos'}`);
  });
  mostrar();
}

function mostrarAviso(texto){
  const t = document.getElementById('toast');
  t.textContent = texto;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

// Regra do logo em texto (.sig): se o fundo atrás dele é escuro e confunde as cores da marca (azul #013565 e verde
// #1F5519), o logo passa para as versões claras das mesmas cores (classe .sig-light), com a mesma fonte. Vale para a
// página inteira (conteúdo, coluna da direita, janelas do topo, chat), inclusive o que aparece depois.
// O fundo considerado é a primeira cor sólida atrás do logo; um degradê conta pela média das cores dele, e uma foto de
// fundo conta como escura (no site, texto sobre foto fica sempre sobre uma camada escura).
function corDeFundo(el){
  for(; el; el = el.parentElement){
    const cs = getComputedStyle(el);
    const m = cs.backgroundColor.match(/[\d.]+/g);
    if(m && (m[3] === undefined || +m[3] > 0.5)) return m.slice(0, 3).map(Number);
    const img = cs.backgroundImage;
    if(img && img !== 'none'){
      if(/url\(/.test(img)) return [30, 40, 50];
      const cores = [...img.matchAll(/rgba?\(([^)]+)\)/g)].map(x => x[1].split(',').map(Number)).filter(c => c[3] === undefined || c[3] > 0.5);
      if(cores.length) return [0, 1, 2].map(i => Math.round(cores.reduce((t, c) => t + c[i], 0) / cores.length));
    }
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
    b.className = `abas-seta abas-${lado}`;
    b.setAttribute('aria-label', lado === 'prox' ? 'Próximas abas' : 'Abas anteriores');
    b.tabIndex = -1;
    b.innerHTML = icone('seta');
    // Mesmo movimento dos carrosséis de cartões: cada clique desliza uma aba, em 450ms, desacelerando no fim; clicar de
    // novo durante o deslize soma mais uma aba. A rolagem é contínua (360 graus): depois da última aba vem de novo a
    // primeira, sem voltar para trás (as abas têm uma cópia em seguida; ver prepararVoltaAbas).
    b.addEventListener('click', () => {
      const ciclo = t.abasCiclo;
      if(!ciclo) return;
      const d = t.abasDeslize;
      const mover = dx => { t.scrollLeft += dx; if(d){ d.de += dx; d.para += dx; } };
      let base = d ? d.para : t.scrollLeft;
      if(lado === 'prox' && base >= ciclo - 1){ mover(-ciclo); base -= ciclo; }      // já na cópia: volta ao trecho original (mesma imagem)
      if(lado === 'ant' && base <= 2){ mover(ciclo); base += ciclo; }                // no começo: passa para a cópia, para ter abas antes
      const tl = t.getBoundingClientRect().left;
      const pontos = [...t.children].map(x => Math.round(x.getBoundingClientRect().left - tl + t.scrollLeft));
      const para = lado === 'prox' ? (pontos.find(p => p > base + 2) ?? base) : ([...pontos].reverse().find(p => p < base - 2) ?? base);
      t.abasDeslize = { de:t.scrollLeft, para, inicio:performance.now() };
      if(!t.abasAnimando){ t.abasAnimando = true; requestAnimationFrame(agora => animarAbas(t, agora)); }
    });
    caixa.append(b);
  });
  // Mesma regra das setas dos carrosséis: com mouse, só a seta do lado de onde o mouse está acende, aos poucos, conforme
  // ele se aproxima dela (--perto, de 0 a 1); ao sair, apaga devagar. Só entram na conta as setas que existem no momento.
  if(matchMedia('(hover:hover)').matches){
    caixa.addEventListener('mousemove', e => {
      const setas = [...caixa.querySelectorAll('.abas-seta')].filter(b => b.offsetWidth);
      if(!setas.length) return;
      const alcance = caixa.getBoundingClientRect().width * .6;
      const dist = b => { const c = b.getBoundingClientRect(); return Math.hypot(e.clientX - (c.left + c.width / 2), e.clientY - (c.top + c.height / 2)); };
      const dists = setas.map(dist), menor = Math.min(...dists);
      const nivel = Math.max(0, Math.min(1, 1.15 - menor / alcance));
      setas.forEach((b, i) => {
        const v = dists[i] === menor ? nivel : 0;
        b.style.setProperty('--perto', v.toFixed(3));
        b.style.pointerEvents = v > .15 ? '' : 'none';
      });
    });
    caixa.addEventListener('mouseleave', () => caixa.querySelectorAll('.abas-seta').forEach(b => { b.style.setProperty('--perto', 0); b.style.pointerEvents = ''; }));
  }
}
// Animação do deslize das abas: a mesma dos carrosséis (450ms, desacelerando no fim)
function animarAbas(t, agora){
  const d = t.abasDeslize;
  if(!d){ t.abasAnimando = false; return; }
  const k = Math.min(1, Math.max(0, (agora - d.inicio) / 450));
  t.style.scrollBehavior = 'auto';                                  // o navegador não anima por cima
  t.scrollLeft = d.de + (d.para - d.de) * (1 - Math.pow(1 - k, 3));
  if(k < 1) requestAnimationFrame(tt => animarAbas(t, tt));
  else {
    t.abasDeslize = null; t.abasAnimando = false;
    if(t.abasCiclo && t.scrollLeft >= t.abasCiclo - 1) t.scrollLeft -= t.abasCiclo;   // deu a volta: continua do trecho original
    t.style.scrollBehavior = ''; marcarRolagemAbas();
  }
}
// Rolagem contínua das abas (360 graus): quando as abas não cabem na linha, elas ganham uma cópia em seguida (botões
// com a classe aba-copia, fora da leitura de tela e do teclado). Assim, depois da última aba aparece de novo a primeira.
// t.abasCiclo guarda a largura de uma volta; ao passar dela, a rolagem volta esse tanto, sem que se perceba.
// As cópias funcionam como as abas (os cliques são tratados pelo container, pelos mesmos data-*). Quando a página refaz
// as abas, as cópias são refeitas aqui. Devolve true se as abas rolam.
function prepararVoltaAbas(t){
  const copias = () => [...t.children].filter(x => x.classList.contains('aba-copia'));
  const orig = [...t.children].filter(x => !x.classList.contains('aba-copia'));
  const visivel = !t.hidden && t.clientWidth > 0;
  const vistos = orig.filter(x => x.offsetWidth > 0);                // um botão escondido pelo CSS não entra na medida
  if(!vistos.length || !visivel){ return false; }
  const largura = vistos[vistos.length - 1].getBoundingClientRect().right - vistos[0].getBoundingClientRect().left;
  if(largura <= t.clientWidth + 2){ copias().forEach(c => c.remove()); t.abasCiclo = 0; return false; }
  let cs = copias();
  if(cs.length !== orig.length || cs.some((c, i) => c.textContent !== orig[i].textContent)){
    cs.forEach(c => c.remove());
    orig.forEach(o => { const c = o.cloneNode(true); c.classList.add('aba-copia'); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; c.removeAttribute('id'); t.append(c); });
    cs = copias();
    // a página refez as abas (ao escolher uma) e a rolagem encolheu: volta para onde estava
    if(t.abasPos != null) t.scrollLeft = t.abasPos;
  }
  cs.forEach((c, i) => { const classe = orig[i].className + ' aba-copia'; if(c.className !== classe) c.className = classe; });   // acompanha a aba escolhida
  t.abasCiclo = Math.round(cs[0].getBoundingClientRect().left - orig[0].getBoundingClientRect().left);
  if(!t.abasAnimando) t.abasPos = t.scrollLeft;
  return true;
}
function marcarRolagemAbas(){
  document.querySelectorAll('.tabs.folder').forEach(t => {
    prepararSetasAbas(t);
    const caixa = t.parentElement;
    const rola = prepararVoltaAbas(t);
    // rolando com o dedo ou com a roda: ao passar de uma volta, continua do trecho original
    if(rola && !t.abasAnimando && t.scrollLeft >= t.abasCiclo) t.scrollLeft -= t.abasCiclo;
    // as abas não cabem: há abas dos dois lados (a rolagem é contínua), então as duas pontas ficam esfumaçadas e as
    // duas setas existem
    t.classList.toggle('mais-abas', rola);
    t.classList.toggle('abas-antes', rola && t.scrollLeft > 2);
    caixa.classList.toggle('tem-mais', rola);
    caixa.classList.toggle('tem-antes', rola);
  });
}
document.addEventListener('scroll', e => { if(e.target.classList && e.target.classList.contains('folder')) marcarRolagemAbas(); }, true);
addEventListener('resize', marcarRolagemAbas);
addEventListener('load', marcarRolagemAbas);
addEventListener('load', marcarSalvos);

let ajusteLogosPendente = false;
function agendarAjusteLogos(){
  if(ajusteLogosPendente) return;
  ajusteLogosPendente = true;
  requestAnimationFrame(() => { ajusteLogosPendente = false; ajustarLogosEmTexto(); marcarRolagemAbas(); marcarSalvos(); });
}
agendarAjusteLogos();
new MutationObserver(agendarAjusteLogos).observe(document.body, { childList:true, subtree:true });   // a página inteira (o chat da Ajuda fica fora do main)

// Saldo de créditos: saldo fictício + bônus ganhos no protótipo (pesquisas de escuta, guardados na sessão) − créditos
// gastos destravando conteúdos (compras guardadas no navegador em v2Compras, o mesmo lugar para todas as páginas).
const SALDO_BASE = 41;
function lerBonusCreditos(){
  try { return +sessionStorage.getItem('bonusCreditos') || 0; } catch(e){ return 0; }
}
// Data e hora no formato do extrato e das notificações: 06/10/2026 às 14:32
function agoraTexto(){ const d = new Date(), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} às ${p(d.getHours())}:${p(d.getMinutes())}`; }
function lerCompras(){ try { const v = JSON.parse(localStorage.getItem('v2Compras')); return Array.isArray(v) ? v : []; } catch(e){ return []; } }
const creditosGastos = () => lerCompras().reduce((s, x) => s + x.v, 0);
const saldoCreditos = () => SALDO_BASE + lerBonusCreditos() - creditosGastos();
// Destravar um conteúdo pago: debita os créditos da carteira, registra a compra (aparece no extrato da Carteira) e
// marca o conteúdo como destravado (v2Destravados). Sem saldo suficiente, não destrava e devolve false.
function comprarConteudo(c){
  if(lerDestravados().includes(c.t)) return true;
  if(saldoCreditos() < c.credits) return false;
  try {
    localStorage.setItem('v2Compras', JSON.stringify([{ t:c.t, v:c.credits, q:agoraTexto() }, ...lerCompras()]));
    localStorage.setItem('v2Destravados', JSON.stringify([...lerDestravados(), c.t]));
  } catch(e){ return false; }
  atualizarSaldo();
  return true;
}
function atualizarSaldo(){
  const saldo = saldoCreditos();
  document.querySelectorAll('.saldo-creditos').forEach(el => { el.textContent = `${saldo} créditos`; el.dataset.n = saldo; });
}
atualizarSaldo();

// Acessibilidade (acessibilidade.html): tamanho da letra, alto contraste e navegação simplificada. As escolhas ficam
// guardadas no navegador (v2Acessibilidade) e viram classes no <html>, que o estilos.css usa em todas as páginas.
function lerAcessibilidade(){
  let a = {};
  try { a = JSON.parse(localStorage.getItem('v2Acessibilidade')) || {}; } catch(e){}
  return { letra:[0, 1, 2].includes(a.letra) ? a.letra : 0, contraste:!!a.contraste, simples:!!a.simples };
}
function aplicarAcessibilidade(){
  const a = lerAcessibilidade(), h = document.documentElement.classList;
  h.toggle('ac-letra-1', a.letra === 1); h.toggle('ac-letra-2', a.letra === 2); h.toggle('ac-contraste', a.contraste);
}
function gravarAcessibilidade(a){ try { localStorage.setItem('v2Acessibilidade', JSON.stringify(a)); } catch(e){} aplicarAcessibilidade(); }
aplicarAcessibilidade();

// Decisões em aberto (decisoes-dados.js): carregado em todas as páginas, para mostrar o aviso no topo das telas que têm
// alguma decisão pendente. A página Decisões já carrega o arquivo por conta própria.
if(LAYOUT_PAGE !== 'decisoes'){
  const dados = document.createElement('script');
  dados.src = `${LAYOUT_ROOT}assets/js/decisoes-dados.js`;
  document.body.appendChild(dados);
}

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
