// VERSÃO 2 · Página de um segmento das Vitrines (vitrine-segmento.html?s=<segmento>) ou de um bairro (?b=<bairro>).
// Aberta pelo MSV (Menu segmento vitrine) e pelo box "Perto de você" (BPDVV).
// Estrutura padrão das páginas de segmento de vitrine (decisão de 2026-10-06), nesta ordem:
//   BEDHV · BDELDV · BSD · BDDLEV · BDS · BRPCV · BPDVV
// Os títulos de cada box são provisórios (a definir). Cartões e depoimentos em vitrine-cartoes.js.
const vsParams = new URLSearchParams(location.search);
const vsSeg = VT_SEGMENTOS.find(x => vtSlug(x[0]) === vsParams.get('s'));
const vsBairro = vsParams.get('b');
const vsDaqui = vsSeg ? estDoSegmento(vsSeg[0]) : vsBairro ? ESTABELECIMENTOS.filter(e => e.bairro === vsBairro) : ESTABELECIMENTOS;
const vsNome = vsSeg ? vsSeg[0] : vsBairro || 'Todas as vitrines';

// Protótipo: os segmentos têm poucos estabelecimentos de exemplo. Para os sete boxes ficarem cheios (e os carrosséis
// com botões de rolagem), a fila começa pelos estabelecimentos do segmento e é completada com os outros; quando acaba,
// recomeça. No produto, cada box recebe só estabelecimentos do segmento.
const vsFila = [...embaralhar(vsDaqui), ...embaralhar(ESTABELECIMENTOS.filter(e => !vsDaqui.includes(e)))];
let vsPonto = 0;
const vsPega = n => Array.from({ length:n }, () => vsFila[vsPonto++ % vsFila.length]);

document.title = `${vsNome} · Vitrines · SoftLiving (Protótipo · versão 2)`;
document.getElementById('vsKicker').textContent = `${vsBairro && !vsSeg ? 'Vitrines · Perto de você' : 'Vitrines'} · ${vsDaqui.length} ${vsDaqui.length === 1 ? 'lugar' : 'lugares'}`;
document.getElementById('vsTitulo').innerHTML = `<span class="hl">${vsNome}</span>`;
document.getElementById('vsFrase').textContent = vsSeg ? `Lugares, marcas e serviços de ${vsNome.toLowerCase()} que a comunidade recomenda.`
  : vsBairro ? `O que a comunidade recomenda em ${vsBairro}.` : 'Tudo o que a comunidade recomenda.';
document.getElementById('vsSegmentos').innerHTML = htmlMenuSegmentosVitrine(VT_SEGMENTOS, vsSeg ? vsSeg[0] : '');

// 1) BEDHV
document.getElementById('vsBEDHV').innerHTML = vtTitulo(`Em destaque em ${vsNome}`, 'Escolhidos a dedo este mês.') + `<div class="vt-destaques" id="vsDestaques">${vsPega(8).map(vtCartao).join('')}</div>`;
ativarCarrossel(document.getElementById('vsDestaques'), 'h');
// 2) BDELDV
document.getElementById('vsBDELDV').innerHTML = vtTitulo('Novidades', 'Vitrines que acabaram de chegar.') + vtBoxDestaqueLista(vsPega(7), 'vsLista1', false);
ativarCarrossel(document.getElementById('vsLista1'), 'v');
// 3) BSD
document.getElementById('vsBSD').innerHTML = vtTitulo('Vitrine da semana') + vtSuperDestaque(vsPega(1)[0]);
// 4) BDDLEV
document.getElementById('vsBDDLEV').innerHTML = vtTitulo('As mais visitadas', 'Onde a comunidade mais tem ido.') + vtBoxDestaqueLista(vsPega(7), 'vsLista2', true);
ativarCarrossel(document.getElementById('vsLista2'), 'v');
// 5) BDS
document.getElementById('vsBDS').innerHTML = vtDestaqueSimples(vsPega(1)[0], 'Escolha da curadoria');
// 6) BRPCV: primeiro os depoimentos de estabelecimentos do segmento
const vsRecos = [...VT_RECOMENDAS.filter(r => vsDaqui.includes(est(r.e))), ...embaralhar(VT_RECOMENDAS.filter(r => !vsDaqui.includes(est(r.e))))];
document.getElementById('vsBRPCV').innerHTML = vtTitulo('Recomendado pela comunidade', 'O que os membros contam dos lugares que frequentam.') + `<div class="vt-recomendas" id="vsRecomendas">${vsRecos.map(vtReco).join('')}</div>`;
ativarCarrossel(document.getElementById('vsRecomendas'), 'h', 3);
// 7) BPDVV
document.getElementById('vsBPDVV').innerHTML = vtTitulo('Perto de você', 'Escolha um bairro e veja o que tem por lá.') + `<div class="vt-bairros">${embaralhar(VT_BAIRROS).slice(0, 4).map(vtBairro).join('')}</div>`;

// o segmento aberto fica à vista no menu de círculos
const vsAtual = document.querySelector('#vsSegmentos .on');
if(vsAtual) vsAtual.parentElement.scrollLeft = Math.max(0, vsAtual.offsetLeft - 40);
