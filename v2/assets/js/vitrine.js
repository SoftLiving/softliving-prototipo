// VERSÃO 2 · ESBOÇO da Vitrine de estabelecimentos. Dados fictícios (nomes, bairros, benefícios, depoimentos).
// cor: cor do "logo" (monograma com as iniciais) de cada estabelecimento.
const ESTABELECIMENTOS = [
  { n:'Bistrô Alecrim', cat:'Gastronomia', bairro:'Leblon', foto:'1517248135467-4c7edcad34c4', cor:'#7a3b52', d:'Cozinha de estação, com horta própria e carta de vinhos brasileiros.', b:'Sobremesa cortesia' },
  { n:'Estúdio Respira', cat:'Bem-estar', bairro:'Gávea', foto:'1544367567-0f2fcb009e0b', cor:'#2f8578', d:'Pilates e yoga em turmas pequenas, com atenção a cada aluno.', b:'Primeira aula grátis' },
  { n:'Ateliê Linho & Barro', cat:'Casa', bairro:'Jardim Botânico', foto:'1565193566173-7a0ee3dbe261', cor:'#8a6414', d:'Cerâmica feita à mão e oficinas aos sábados.', b:'15% nas peças' },
  { n:'Clínica Vitalis', cat:'Saúde', bairro:'Botafogo', foto:'1519494026892-80bbd2d6fd0d', cor:'#013565', d:'Check-up completo em uma manhã, com geriatra e nutricionista.', b:'Avaliação inicial sem custo' },
  { n:'Pousada Mar de Dentro', cat:'Viagem', bairro:'Paraty', foto:'1566073771259-6a8506099945', cor:'#3f6b8f', d:'Seis suítes de frente para o mar e café da manhã caseiro.', b:'1 noite extra a cada 3' },
  { n:'Vinhos da Serra', cat:'Gastronomia', bairro:'Leblon', foto:'1510812431401-41d2bd2722f3', cor:'#5b2a3a', d:'Importadora pequena com degustações às quintas.', b:'Degustação para dois' },
  { n:'Padaria Fermento Lento', cat:'Gastronomia', bairro:'Humaitá', foto:'1509440159596-0249088772ff', cor:'#b0513a', d:'Pães de longa fermentação, saindo do forno às 7h.', b:'Café cortesia' },
  { n:'Pet Jardim', cat:'Pets', bairro:'Barra', foto:'1543466835-00a7907e9de1', cor:'#1F5519', d:'Banho, tosa e veterinário no mesmo lugar.', b:'Primeiro banho cortesia' },
  { n:'Salão Corte Fino', cat:'Beleza', bairro:'Copacabana', foto:'1560066984-138dadb4c035', cor:'#5b4b8a', d:'Corte, coloração e manicure com hora marcada.', b:'10% nos serviços' },
  { n:'Floricultura Ramo', cat:'Presentes', bairro:'Laranjeiras', foto:'1487070183336-b863922373d4', cor:'#2f5d3a', d:'Arranjos da estação e assinatura de flores.', b:'Entrega grátis' },
  { n:'Casa Tereza Empório', cat:'Gastronomia', bairro:'Ipanema', foto:'1542838132-92c53300491e', cor:'#8a5a0e', d:'Queijos, azeites e pães para montar a mesa do fim de semana.', b:'10% nas compras' },
  { n:'Ótica Nitidez', cat:'Saúde', bairro:'Tijuca', foto:'1574258495973-f010dfbb5371', cor:'#2c4a7c', d:'Exame de vista e armações leves para o dia a dia.', b:'20% nas lentes' },
];
const est = n => ESTABELECIMENTOS.find(e => e.n === n);
const CATEGORIAS = [
  ['Gastronomia', '1414235077428-338989a2e8c0'], ['Saúde', '1519494026892-80bbd2d6fd0d'], ['Bem-estar', '1544367567-0f2fcb009e0b'],
  ['Casa', '1586023492125-27b2c045efd7'], ['Beleza', '1560066984-138dadb4c035'], ['Viagem', '1566073771259-6a8506099945'],
  ['Pets', '1543466835-00a7907e9de1'], ['Presentes', '1487070183336-b863922373d4'],
];
const COLECOES = [
  { t:'Para um jantar a dois', d:'Mesas tranquilas, boa comida e uma carta de vinhos para conversar sem pressa.', foto:'1414235077428-338989a2e8c0', itens:['Bistrô Alecrim', 'Vinhos da Serra', 'Casa Tereza Empório'] },
  { t:'Cuidar da saúde perto de casa', d:'Clínicas, estúdios e profissionais recomendados por quem já foi.', foto:'1571902943202-507ec2618e8f', itens:['Clínica Vitalis', 'Estúdio Respira', 'Ótica Nitidez'] },
];
const RECOMENDAS = [
  { e:'Vinhos da Serra', q:'A degustação de quinta virou nosso programa fixo. Explicam tudo sem pose nenhuma.', quem:'Helena M.', grupo:'Clube do Vinho', cor:'#7a3b52' },
  { e:'Estúdio Respira', q:'Turma pequena, professora atenta. Minhas costas agradecem toda semana.', quem:'Marcos T.', grupo:'Yoga & Meditação', cor:'#2f8578' },
  { e:'Padaria Fermento Lento', q:'O pão de fermentação natural mais honesto do bairro. Chego cedo para pegar quentinho.', quem:'Célia R.', grupo:'Amigos', cor:'#b0513a' },
];
const BAIRROS = [
  ['Leblon', '1483729558449-99ef09a8c325'], ['Botafogo', '1516306580123-e6e52b1b7b5f'],
  ['Barra', '1507525428034-b723cf961d3e'], ['Jardim Botânico', '1470058869958-2a77ade41c02'],
];

const siglaDe = n => n.replace(/&/g, '').split(/\s+/).filter(p => p.length > 2 || /^[A-ZÀ-Ú]/.test(p)).slice(0, 2).map(p => p[0]).join('');
const monograma = e => `<span class="vt-logo" style="color:${e.cor}">${siglaDe(e.n)}</span>`;
const seloBeneficio = e => `<span class="vt-beneficio">${icone('presente')}${e.b}</span>`;

// Capa: mosaico com quatro fotos e um cartão de vidro por cima
document.getElementById('vtMosaico').innerHTML = ['Bistrô Alecrim', 'Ateliê Linho & Barro', 'Estúdio Respira', 'Floricultura Ramo'].map((n, i) =>
  `<img class="vt-m${i + 1}" src="${fotoUrl(est(n).foto, i ? 500 : 800)}" alt="">`).join('') +
  `<div class="vt-flutua"><b>${ESTABELECIMENTOS.length * 4}</b><span>estabelecimentos com benefício para membros</span></div>`;

document.getElementById('vtCategorias').innerHTML = CATEGORIAS.map(([c, f]) => `
  <a href="#" class="vt-cat"><img src="${fotoUrl(f, 200)}" alt=""><span>${c}</span></a>`).join('');

// Em destaque: cartão vertical com foto, logo, bairro e benefício
document.getElementById('vtDestaques').innerHTML = ESTABELECIMENTOS.slice(0, 8).map(e => `
  <a href="#" class="vcard vt-card">
    <img src="${fotoUrl(e.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    <span class="vc-topo">${seloBeneficio(e)}</span>
    <div class="vc-info">
      ${monograma(e)}
      <span class="vc-cat">${e.cat} · ${e.bairro}</span>
      <h3>${e.n}</h3>
      <p class="vc-desc">${e.d}</p>
      <span class="vc-btn">Ver vitrine ${icone('seta')}</span>
    </div>
  </a>`).join('');
ativarCarrossel(document.getElementById('vtDestaques'), 'h');

// Coleções: alternam o lado da foto
document.getElementById('vtColecoes').innerHTML = COLECOES.map((c, i) => `
  <article class="vt-colecao${i % 2 ? ' invertida' : ''}">
    <div class="vt-col-capa" style="background-image:url('${fotoUrl(c.foto, 900)}')">
      <div><p class="kicker">Coleção</p><h2>${c.t}</h2><p>${c.d}</p></div>
    </div>
    <div class="vt-col-lista">
      ${c.itens.map(est).map(e => `
        <a href="#" class="vt-mini">
          <img src="${fotoUrl(e.foto, 300)}" alt="" loading="lazy">
          <div><span class="vt-mini-cat">${e.cat} · ${e.bairro}</span><h3>${e.n}</h3><p>${e.d}</p>${seloBeneficio(e)}</div>
        </a>`).join('')}
    </div>
  </article>`).join('');

document.getElementById('vtRecomendas').innerHTML = RECOMENDAS.map(r => { const e = est(r.e); return `
  <a href="#" class="vt-reco">
    <div class="vt-reco-foto" style="background-image:url('${fotoUrl(e.foto, 600)}')">${monograma(e)}</div>
    <div class="vt-reco-txt">
      <span class="vt-mini-cat">${e.n} · ${e.bairro}</span>
      <blockquote>“${r.q}”</blockquote>
      <p class="vt-quem"><span class="av-col" style="background:${r.cor}">${siglaDe(r.quem)}</span><span><b>${r.quem}</b>do grupo ${r.grupo}</span></p>
    </div>
  </a>`; }).join('');

document.getElementById('vtBairros').innerHTML = BAIRROS.map(([b, f]) => {
  const n = ESTABELECIMENTOS.filter(e => e.bairro === b).length || 3;
  return `<a href="#" class="vt-bairro" style="background-image:url('${fotoUrl(f, 600)}')"><span><b>${b}</b>${n} ${n === 1 ? 'lugar' : 'lugares'}</span></a>`;
}).join('');

// Esboço: a página de cada estabelecimento é o próximo passo
document.querySelector('main').addEventListener('click', e => {
  const a = e.target.closest('a[href="#"]');
  if(!a) return;
  e.preventDefault();
  mostrarAviso(a.classList.contains('vt-quero') ? 'Cadastro de marcas: fora deste esboço' : 'Página do estabelecimento: próximo passo do esboço');
});
