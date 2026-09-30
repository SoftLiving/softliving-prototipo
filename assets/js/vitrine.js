// VERSÃO 2 · ESBOÇO da Vitrine de estabelecimentos. Dados fictícios (nomes, bairros, benefícios, depoimentos).
// Os estabelecimentos ficam em estabelecimentos-dados.js (usados também pela página de cada um).
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

document.getElementById('vtCategorias').innerHTML = CATEGORIAS.map(([c, f]) => `
  <a href="#" class="vt-cat"><img src="${fotoUrl(f, 200)}" alt=""><span>${c}</span></a>`).join('');

// Em destaque: cartão vertical com foto, logo, bairro e benefício
document.getElementById('vtDestaques').innerHTML = embaralhar(ESTABELECIMENTOS).slice(0, 8).map(e => `   // 8 sorteados a cada carregamento
  <a href="${urlEstabelecimento(e)}" class="vcard vt-card">
    <img src="${fotoUrl(e.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
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
document.getElementById('vtColecoes').innerHTML = embaralhar(COLECOES).map((c, i) => `
  <article class="vt-colecao${i % 2 ? ' invertida' : ''}">
    <div class="vt-col-capa" style="background-image:url('${fotoUrl(c.foto, 900)}')">
      <div><p class="kicker">Coleção</p><h2>${c.t}</h2><p>${c.d}</p></div>
    </div>
    <div class="vt-col-lista">
      ${embaralhar(c.itens).map(est).map(e => `
        <a href="${urlEstabelecimento(e)}" class="vt-mini">
          <img src="${fotoUrl(e.foto, 300)}" alt="" loading="lazy">
          <div><span class="vt-mini-cat">${e.cat} · ${e.bairro}</span><h3>${e.n}</h3><p>${e.d}</p></div>
        </a>`).join('')}
    </div>
  </article>`).join('');

document.getElementById('vtRecomendas').innerHTML = embaralhar(RECOMENDAS).map(r => { const e = est(r.e); return `
  <a href="${urlEstabelecimento(e)}" class="vt-reco">
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
  mostrarAviso(a.classList.contains('vt-quero') ? 'Cadastro de marcas: fora deste esboço' : 'Filtro por categoria e bairro: fora deste esboço');
});
