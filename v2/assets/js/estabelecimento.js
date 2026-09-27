// VERSÃO 2 · Página de um estabelecimento (estabelecimento.html?e=<id>). Poucas informações, bem apresentadas:
// capa, nome, sobre, benefício para membros, informações práticas e galeria. O que o estabelecimento não tiver não aparece.
const ES_ICONES = {
  local:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  hora:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fone:'<path d="M6 3h4l1 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  site:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>',
};
const esIcone = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ES_ICONES[n]}</svg>`;
const siglaEst = n => n.replace(/&/g, '').split(/\s+/).filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('');

const idEst = +new URLSearchParams(location.search).get('e') || 0;
const e = ESTABELECIMENTOS.find(x => x.id === idEst) || ESTABELECIMENTOS[0];
document.title = `${e.n} · SoftLiving (Protótipo · versão 2)`;

const infos = [['local', e.endereco], ['hora', e.horario], ['fone', e.telefone], ['site', e.site]].filter(([, v]) => v);
document.getElementById('esPagina').innerHTML = `
  <a href="${LAYOUT_ROOT}vitrine.html" class="es-voltar">${icone('voltar')}Vitrine</a>

  <div class="es-capa" style="background-image:url('${fotoUrl(e.foto, 1400)}')"></div>

  <header class="es-topo">
    <span class="es-logo" style="color:${e.cor}">${siglaEst(e.n)}</span>
    <div class="es-nome">
      <h1>${e.n}</h1>
      <p>${e.cat} · ${e.bairro}</p>
    </div>
    <div class="es-acoes">
      <button type="button" class="btn ghost" id="esSalvar">${icone('salvar')}Salvar</button>
      ${e.endereco ? `<a href="#" class="btn" id="esChegar">${esIcone('local')}Como chegar</a>` : ''}
    </div>
  </header>

  <div class="es-corpo">
    <section class="es-sobre">
      <h2>Sobre</h2>
      <p>${e.sobre || e.d}</p>
    </section>
    <aside class="es-lado">
      <div class="es-beneficio">
        <span class="es-ben-rotulo">${icone('presente')}Benefício para membros</span>
        <b>${e.b}</b>
        ${e.beneficioDet ? `<p>${e.beneficioDet}</p>` : ''}
      </div>
      ${infos.length ? `<ul class="es-infos">${infos.map(([ic, v]) => `<li>${esIcone(ic)}<span>${v}</span></li>`).join('')}</ul>` : ''}
    </aside>
  </div>

  ${e.galeria ? `<section class="es-galeria" aria-label="Fotos">${e.galeria.map(f => `<img src="${fotoUrl(f, 700)}" alt="" loading="lazy">`).join('')}</section>` : ''}`;

// Protótipo: salvar alterna o botão; como chegar só avisa
const salvar = document.getElementById('esSalvar');
salvar.addEventListener('click', () => {
  const on = salvar.classList.toggle('on');
  salvar.lastChild.textContent = on ? 'Salvo' : 'Salvar';
  mostrarAviso(on ? `${e.n} salvo nos seus favoritos` : 'Removido dos favoritos');
});
const chegar = document.getElementById('esChegar');
if(chegar) chegar.addEventListener('click', ev => { ev.preventDefault(); mostrarAviso('Mapa: fora deste protótipo'); });
