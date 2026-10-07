// VERSÃO 2 · Página de um assunto (assunto.html?a=<endereço>): Bem-estar, Saúde, Estilo e casa, Viagem, Tecnologia ou
// SoftLiving. Aberta pelo MSC (Menu segmentos conteúdo). Endereço desconhecido volta para a Conteúdos.
// Estrutura padrão das páginas de segmento de conteúdo (decisão de 2026-10-06), nesta ordem:
//   BEDH · BDELD · BSD · BDDLE · BDS
// Os títulos de cada box são provisórios (a definir). Usa os cartões de conteudos-cartoes.js.
const AS_I = CT_ASSUNTOS.findIndex(a => a[3] && a[3] === new URLSearchParams(location.search).get('a'));
if(AS_I < 0) location.replace(urlPagina('conteudos'));
const [asRotulo, asCat, , asSlug, asFrase] = CT_ASSUNTOS[Math.max(AS_I, 1)];
const asItens = ctDoAssunto(asCat);
const asNomeTexto = asCat === 'SoftLiving' ? 'SoftLiving' : asRotulo;
const asNome = asCat === 'SoftLiving' ? LOGO : asRotulo;

// Protótipo: alguns assuntos têm poucos conteúdos de exemplo. Para os cinco boxes ficarem cheios (e os carrosséis com
// botões de rolagem), a fila começa pelos conteúdos do assunto e é completada com os outros; quando acaba, recomeça.
// No produto, cada box recebe só conteúdos do assunto.
const asFila = [...asItens, ...CT_SORTEIO.filter(c => c.cat !== asCat)];
let asPonto = 0;
const asPega = n => Array.from({ length:n }, () => asFila[asPonto++ % asFila.length]);

// Topo: assunto em destaque e quantos conteúdos tem
document.title = `${asNomeTexto} · Conteúdos · SoftLiving (Protótipo · versão 2)`;
document.getElementById('asKicker').innerHTML = `<a href="${urlPagina('conteudos')}">Conteúdos</a> · ${asItens.length} ${asItens.length === 1 ? 'conteúdo' : 'conteúdos'}`;
document.getElementById('asTitulo').innerHTML = asCat === 'SoftLiving' ? `Palavra da ${LOGO}` : `<span class="hl">${asRotulo}</span>`;
document.getElementById('asFrase').textContent = asFrase;

// MSC: todos os assuntos, o atual marcado; "Todos" volta para a lista completa da Conteúdos
document.getElementById('asCirculos').innerHTML = CT_ASSUNTOS.map(([r, cat, , slug], i) => {
  const c = cat ? ctDoAssunto(cat)[0] : CT_SORTEIO[0];
  const href = slug ? urlAssunto(slug) : `${urlPagina('conteudos')}#ctLista`;
  return `<a href="${href}" class="vt-cat${i === AS_I ? ' on' : ''}"${i === AS_I ? ' aria-current="page"' : ''}><img src="${fotoUrl(c.foto, 200)}" alt=""><span>${r}</span></a>`;
}).join('');

// Destaque grande dos boxes BDELD e BDDLE (o mesmo de "Últimas matérias", da Início)
const asDestaque = c => `
    <a href="${urlConteudo(c.t)}" class="destaque">
      <div class="imgw foto"><img src="${fotoUrl(c.foto, 1100)}" alt=""></div>${ctSalvar}
      <span class="cat">${ctRotulo(c.cat)}</span>
      <h3>${c.t.replace('SoftLiving', LOGO)}</h3><p>${c.e}</p>
      <div class="meta"><span>${c.a.replace('SoftLiving', LOGO)}</span>${seloAcesso(c)}</div>
    </a>`;
const asBoxDestaqueLista = (lista, idLista, espelhado) => {
  const [primeiro, ...resto] = lista;
  const itens = `<div class="list" id="${idLista}">${resto.map(ctItem).join('')}</div>`;
  return `<div class="stories${espelhado ? ' invertida' : ''}">${espelhado ? itens + asDestaque(primeiro) : asDestaque(primeiro) + itens}</div>`;
};

// 1) BEDH
document.getElementById('asBEDH').innerHTML = ctTitulo(`Em destaque em ${asNome}`, 'Escolhidos pela curadoria esta semana.') + `<div class="bedh" id="asDestaques">${asPega(8).map(ctVertical).join('')}</div>`;
ativarCarrossel(document.getElementById('asDestaques'), 'h');
// 2) BDELD
document.getElementById('asBDELD').innerHTML = ctTitulo('Últimas publicações', 'O que acabou de chegar.') + asBoxDestaqueLista(asPega(7), 'asLista1', false);
ativarCarrossel(document.getElementById('asLista1'), 'v');
// 3) BSD
const asSuper = asPega(1)[0];
document.getElementById('asBSD').innerHTML = ctTitulo('Leitura da semana') + `
  <a href="${urlConteudo(asSuper.t)}" class="ct-faixa" style="background-image:url('${fotoUrl(asSuper.foto, 1400)}')">
    ${ctSalvar}
    <div class="ct-faixa-txt">
      ${seloAcesso(asSuper)}
      <span class="vc-cat">${ctRotulo(asSuper.cat)}</span>
      <h3>${asSuper.t.replace('SoftLiving', LOGO)}</h3>
      <p>${asSuper.e}</p>
      <span class="vc-autor">${asSuper.a.replace('SoftLiving', LOGO)}</span>
    </div>
  </a>`;
// 4) BDDLE
document.getElementById('asBDDLE').innerHTML = ctTitulo('Os mais lidos', 'O que a comunidade mais leu.') + asBoxDestaqueLista(asPega(7), 'asLista2', true);
ativarCarrossel(document.getElementById('asLista2'), 'v');
// 5) BDS
const asSimples = asPega(1)[0];
document.getElementById('asBDS').innerHTML = `
  <a href="${urlConteudo(asSimples.t)}" class="ct-carta">
    <img src="${fotoUrl(asSimples.foto, 600)}" alt="" loading="lazy">
    ${ctSalvar}
    <div>
      <p class="kicker">Escolha da curadoria</p>
      <h3>${asSimples.t.replace('SoftLiving', LOGO)}</h3>
      <p>${asSimples.e}</p>
      <span class="ct-carta-autor">${asSimples.a.replace('SoftLiving', LOGO)}</span> ${seloAcesso(asSimples)}
    </div>
  </a>`;

document.querySelector('main').addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if(!fav) return;
  e.preventDefault();
  avisoSalvo(fav, alternarSalvo(fav));
});
marcarSalvos();
