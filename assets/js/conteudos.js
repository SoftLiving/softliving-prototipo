// ===== Tela Conteúdos =====
// badge: 'gratis' | 'premium' (com credits) | 'destravado'. Capa: degradê colorido com o ícone do tema.
const CONTEUDOS = [
  {cat:"Saúde mental e qualidade de vida", t:"A Revolução da Longevidade: Estamos Preparados para Viver Tanto?", e:"Vivemos mais do que qualquer geração. O que isso muda na forma de planejar a vida?", a:"Ângela Senna", icon:"brain", badge:"gratis", destaque:true},
  {cat:"Turismo e viagem", t:"Na Suíça, um vinho para chamar de seu", e:"Entre o lago Léman e as encostas do Valais, três endereços suíços mostram que o silêncio das vinhas também é luxo.", a:"Lucia Paes de Barros", icon:"map", badge:"gratis"},
  {cat:"Saúde mental e qualidade de vida", t:"O bem-estar do encontro presencial", e:"Por que sair da tela e encontrar pessoas faz tão bem, em qualquer idade.", a:"Zé Roberto", icon:"users", badge:"gratis"},
  {cat:"Saúde e bem-estar físico", t:"Longevidade", e:"O segredo dos centenários.", a:"Redação SoftLiving", icon:"activity", badge:"premium", credits:1},
  {cat:"Saúde e bem-estar físico", t:"Você faz isso pela manhã?", e:"Pequenos hábitos ao acordar que mudam o resto do dia.", a:"Redação SoftLiving", icon:"activity", badge:"gratis"},
  {cat:"Saúde mental e qualidade de vida", t:"Descubra novos pequenos prazeres da vida!", e:"O que realmente vale o nosso tempo? Um convite para desacelerar.", a:"Redação SoftLiving", icon:"star", badge:"gratis"},
  {cat:"Saúde mental e qualidade de vida", t:"A Coragem de Mudar de Direção", e:"Recomeçar não tem idade. Histórias de quem mudou o rumo depois dos 50.", a:"Sandra Rosenfeld", icon:"map", badge:"gratis"},
  {cat:"Estilo de vida e consumo", t:"A casa não precisa parecer decorada", e:"Por que os melhores interiores parecem ter acontecido, e não ter sido montados de uma vez.", a:"Erick Figueira de Mello", icon:"building", badge:"gratis"},
  {cat:"Estilo de vida e consumo", t:"A Moda Finalmente Descobriu que Você Existe", e:"O público 50+ virou protagonista nas passarelas. E já era hora.", a:"Sofia Martellini", icon:"star", badge:"gratis"},
  {cat:"Estilo de vida e consumo", t:"O luxo de hoje é outra coisa", e:"Menos ostentação, mais espaço, tempo, matéria, silêncio e liberdade.", a:"Erick Figueira de Mello", icon:"gift", badge:"gratis"},
  {cat:"Estilo de vida e consumo", t:"Uma casa precisa de coisas velhas", e:"Sobre pátina, memória e a importância de não começar todos os interiores do zero.", a:"Erick Figueira de Mello", icon:"building", badge:"gratis"},
  {cat:"SoftLiving", t:"Aos patrocinadores do SoftLiving", e:"Quem assina o começo?", a:"Rafael Barros · CEO SoftLiving", icon:"handshake", badge:"gratis"},
  {cat:"Tecnologia e serviços digitais", t:"Agente de IA anti-golpe", e:"Como se proteger melhor no WhatsApp, Pix e links suspeitos.", a:"Bernardo Leitão", icon:"shield", badge:"gratis"},
  {cat:"Tecnologia e serviços digitais", t:"Meu primeiro agente de IA", e:"Como começar a usar inteligência artificial sem medo.", a:"Bernardo Leitão", icon:"robot", badge:"gratis"},
  {cat:"Saúde mental e qualidade de vida", t:"Mais conexão, menos solidão", e:"O papel da tecnologia na vida madura: usada com propósito, ela aproxima pessoas.", a:"Redação SoftLiving", icon:"chat", badge:"destravado"},
];
const conteudosPage = document.getElementById('conteudosPage');
const ctState = { cat:'Todas as categorias', tab:'todos', q:'' };


CONTEUDOS.forEach(c => c.capa = sorteiaDegrade());
function ctCover(c){
  return `<div class="ct-ph" style="background:${c.capa};">${ICON[c.icon] || ICON.book}</div>`;
}
function ctBadge(c){
  if(c.badge === 'premium') return `<span class="ct-badge premium">${ICON.lock} ${c.credits} crédito${c.credits>1?'s':''}</span>`;
  if(c.badge === 'destravado') return `<span class="ct-badge destravado">${ICON.unlock} Destravado</span>`;
  return `<span class="ct-badge gratis">${ICON.unlock} Grátis</span>`;
}
function ctCta(c){
  if(c.badge === 'premium') return `<button type="button" class="ct-cta premium">${ICON.lock} Destravar · ${c.credits} crédito${c.credits>1?'s':''}</button>`;
  if(c.badge === 'destravado') return `<button type="button" class="ct-cta destravado">${ICON.unlock} Destravado · Ler agora</button>`;
  return `<button type="button" class="ct-cta gratis">${ICON.book} Ler agora</button>`;
}
function renderConteudosPage(){
  const cats = ['Todas as categorias', ...new Set(CONTEUDOS.map(c => c.cat))];
  document.getElementById('ctCats').innerHTML = cats.map(c => `<button type="button" class="in-pill ${c===ctState.cat?'active':''}" data-cat="${c}">${c}</button>`).join('');

  const q = ctState.q.toLowerCase();
  const byCatAndSearch = CONTEUDOS.filter(c =>
    (ctState.cat === 'Todas as categorias' || c.cat === ctState.cat) &&
    (!q || (c.t + ' ' + c.a + ' ' + c.cat + ' ' + c.e).toLowerCase().includes(q)));
  const nGratis = byCatAndSearch.filter(c => c.badge === 'gratis').length;
  const tabs = [['todos','Todos',byCatAndSearch.length],['gratis','Grátis',nGratis],['premium','Premium',byCatAndSearch.length - nGratis]];
  document.getElementById('ctTabs').innerHTML = tabs.map(([k,l,n]) => `<button type="button" class="ct-tab ${k===ctState.tab?'active':''}" data-tab="${k}">${l} (${n})</button>`).join('');

  const list = byCatAndSearch.filter(c => ctState.tab === 'todos' || (ctState.tab === 'gratis' ? c.badge === 'gratis' : c.badge !== 'gratis'));
  document.getElementById('ctGrid').innerHTML = list.map((c, i) => `
    <article class="ct-card">
      <div class="ct-cover">${ctCover(c, i)}${ctBadge(c)}</div>
      <div class="ct-body">
        <span class="ct-cat">${c.cat}</span>
        <h3 class="ct-title">${c.t}</h3>
        <p class="ct-excerpt">${c.e}</p>
        <p class="ct-author">${ICON.user} ${c.a}</p>
        ${ctCta(c)}
      </div>
    </article>`).join('');
  document.getElementById('ctEmpty').hidden = list.length > 0;

  const d = CONTEUDOS.find(c => c.destaque);
  document.getElementById('ctHighlight').innerHTML = `
    <span class="ct-hl-ph ct-cover"><span class="ct-ph" style="background:${d.capa};">${ICON[d.icon]}</span></span>
    <span><small>EM DESTAQUE</small><strong>${d.t}</strong><span class="ct-hl-a">${d.a}</span></span>`;
}
document.getElementById('ctCats').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if(b){ ctState.cat = b.dataset.cat; renderConteudosPage(); } });
document.getElementById('ctTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b){ ctState.tab = b.dataset.tab; renderConteudosPage(); } });
document.getElementById('ctSearch').addEventListener('input', e => { ctState.q = e.target.value.trim(); renderConteudosPage(); });
renderConteudosPage();
