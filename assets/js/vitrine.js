// VERSÃO 2 · Vitrine de estabelecimentos. Dados fictícios (nomes, bairros, benefícios, depoimentos).
// Os estabelecimentos ficam em estabelecimentos-dados.js (usados também pela página de cada um); os cartões e os
// depoimentos, em vitrine-cartoes.js (usados também pela página de cada segmento).
const COLECOES = [
  { t:'Para um jantar a dois', d:'Mesas tranquilas, boa comida e uma carta de vinhos para conversar sem pressa.', foto:'1414235077428-338989a2e8c0', itens:['Bistrô Alecrim', 'Vinhos da Serra', 'Casa Tereza Empório', 'Restaurante Sabor & Arte', 'Floricultura Ramo', 'Padaria Fermento Lento', 'Pousada Mar de Dentro'] },
  { t:'Cuidar da saúde perto de casa', d:'Clínicas, estúdios e profissionais recomendados por quem já foi.', foto:'1571902943202-507ec2618e8f', itens:['Clínica Vitalis', 'Estúdio Respira', 'Ótica Nitidez', 'Clínica SorrisoTotal', 'Zen Wellness Spa', 'Salão Corte Fino', 'Pet Jardim'] },
];

// MSV · Menu segmento vitrine: cada círculo abre a página do segmento (vitrine-segmento.html?s=...).
// Segmentos e bairros em ordem sorteada a cada carregamento.
document.getElementById('vtCategorias').innerHTML = htmlMenuSegmentosVitrine(embaralhar(VT_SEGMENTOS));

// Em destaque, no box BEDHV (Box em destaque horizontal vitrine): carrossel horizontal de cartões de vitrine, sem abas.
// 8 estabelecimentos sorteados a cada carregamento.
document.getElementById('vtDestaques').innerHTML = embaralhar(ESTABELECIMENTOS).slice(0, 8).map(vtCartao).join('');
ativarCarrossel(document.getElementById('vtDestaques'), 'h');

// Coleções, nos boxes de destaque com lista na versão vitrine: a primeira no BDELDV (destaque à esquerda e lista à
// direita) e a segunda no BDDLEV (o espelho). O título e o subtítulo são os da coleção; uma vitrine dela vai no destaque
// e as outras na lista, em carrossel vertical de 4 por vez. Cada coleção tem mais vitrines do que cabem na lista, para o
// carrossel mostrar os botões de rolagem.
document.getElementById('vtColecoes').innerHTML = embaralhar(COLECOES).map((c, i) => `
  <div class="vt-colecao-box" data-box="${i % 2 ? 'BDDLEV' : 'BDELDV'}">
    ${vtTitulo(c.t, c.d)}
    ${vtBoxDestaqueLista(embaralhar(c.itens).map(est).filter(Boolean), 'vtColLista' + i, i % 2 === 1)}
  </div>`).join('');
COLECOES.forEach((_, i) => ativarCarrossel(document.getElementById('vtColLista' + i), 'v'));

// Dois segmentos lado a lado, no box BDVV (Box dois verticais vitrine): Gastronomia e Saúde, cada um com uma capa e a
// lista das outras vitrines do segmento em carrossel vertical, 3 por vez. A ordem dentro de cada um é sorteada.
document.getElementById('vtDoisVerticais').innerHTML = vtBoxDoisVerticais([
  ['Gastronomia', 'Mesas, empórios e padarias para ir sem pressa.', embaralhar(estDoSegmento('Gastronomia')), 'vtDuplaLista0'],
  ['Saúde', 'Clínicas, exames e cuidado perto de casa.', embaralhar(estDoSegmento('Saúde')), 'vtDuplaLista1'],
]);
[0, 1].forEach(i => ativarCarrossel(document.getElementById('vtDuplaLista' + i), 'v', 3));

// Recomendado pela comunidade, no box BRPCV (Box recomendado pela comunidade vitrine): carrossel horizontal de depoimentos,
// 3 por vez, com os botões de rolagem. A ordem é sorteada a cada carregamento.
document.getElementById('vtRecomendas').innerHTML = embaralhar(VT_RECOMENDAS).map(vtReco).join('');
ativarCarrossel(document.getElementById('vtRecomendas'), 'h', 3);

// Perto de você, no box BPDVV (Box perto de você vitrine): cartões de bairro com foto, nome e quantidade de lugares
document.getElementById('vtBairros').innerHTML = embaralhar(VT_BAIRROS).slice(0, 4).map(vtBairro).join('');

// Chamada para as marcas: fora do protótipo
document.querySelector('main').addEventListener('click', e => {
  const a = e.target.closest('a[href="#"]');
  if(!a) return;
  e.preventDefault();
  mostrarAviso('Cadastro de marcas: fora deste protótipo');
});
