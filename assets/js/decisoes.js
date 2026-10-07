// VERSÃO 2 · Página Decisões em aberto: uma pergunta por cartão, com o que a V1 faz hoje, o que o protótipo mostra,
// as opções e um campo de observações. As respostas ficam guardadas no navegador (v2Decisoes) e podem ser copiadas
// em texto, para enviar ao desenvolvimento. Perguntas em decisoes-dados.js.
let dcRespostas = lerDecisoes();
let dcFiltro = 'todas';
const dcFeita = d => dcRespostas[d.id] && dcRespostas[d.id].o !== undefined && dcRespostas[d.id].o !== null;
const dcEsc = t => t.replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const dcLogo = t => t.replace(/SoftLiving/g, LOGO);
const OUTRA = -1;                                           // "Outra resposta": vale o que estiver nas observações

function dcCartao(d){
  const r = dcRespostas[d.id] || {};
  const opcao = (rotulo, i) => `
    <label class="dc-opcao${r.o === i ? ' on' : ''}">
      <input type="radio" name="dc-${d.id}" value="${i}" ${r.o === i ? 'checked' : ''}>
      <span>${dcLogo(dcEsc(rotulo))}${d.sugestao === i ? ' <em>sugestão</em>' : ''}</span>
    </label>`;
  return `
    <article class="dc-card${dcFeita(d) ? ' feita' : ''}" id="${d.id}">
      <div class="dc-card-topo"><span class="cat">${d.tema}</span><span class="dc-estado">${dcFeita(d) ? 'Respondida' : 'Em aberto'}</span></div>
      <h3>${dcLogo(dcEsc(d.p))}</h3>
      <dl class="dc-como">
        <div><dt>V1 (hoje)</dt><dd>${dcLogo(dcEsc(d.v1))}</dd></div>
        <div><dt>V2 (protótipo)</dt><dd>${dcLogo(dcEsc(d.v2))}</dd></div>
      </dl>
      <div class="dc-opcoes" role="radiogroup" aria-label="Opções">
        ${d.opcoes.map(opcao).join('')}
        ${opcao('Outra resposta (escreva nas observações)', OUTRA)}
      </div>
      <textarea class="dc-obs" data-obs="${d.id}" rows="2" placeholder="Observações para o desenvolvedor (opcional)" aria-label="Observações">${dcEsc(r.obs || '')}</textarea>
      <div class="dc-card-fim">
        <a href="${urlPagina(d.ver)}" class="bs-link">Ver a tela no protótipo</a>
        ${dcFeita(d) ? `<button type="button" class="bs-link" data-limpar="${d.id}">Limpar resposta</button>` : ''}
      </div>
    </article>`;
}

function renderDecisoes(){
  // Sem perguntas pendentes: só o aviso e a lista do que já foi decidido
  if(!DECISOES.length){
    document.getElementById('dcResumo').innerHTML = `<div class="dc-conta"><b>0</b><span>decisões em aberto. Está tudo decidido: veja a lista abaixo.</span></div>
      <div class="dc-acoes"><button type="button" class="btn ghost" id="dcCopiar">Copiar a lista</button></div>`;
    document.getElementById('dcFiltro').hidden = true;
    document.getElementById('dcLista').innerHTML = '';
    return;
  }
  const feitas = DECISOES.filter(dcFeita).length;
  document.getElementById('dcResumo').innerHTML = `
    <div class="dc-conta"><b>${feitas}</b><span>de ${DECISOES.length} respondidas</span></div>
    <div class="dc-barra" role="progressbar" aria-valuemin="0" aria-valuemax="${DECISOES.length}" aria-valuenow="${feitas}"><i style="width:${Math.round(feitas / DECISOES.length * 100)}%"></i></div>
    <div class="dc-acoes">
      <button type="button" class="btn" id="dcCopiar">Copiar respostas</button>
      <button type="button" class="btn ghost" id="dcBaixar">Baixar em texto</button>
    </div>`;
  document.getElementById('dcFiltro').innerHTML = [['todas', 'Todas', DECISOES.length], ['abertas', 'Em aberto', DECISOES.length - feitas], ['feitas', 'Respondidas', feitas]].map(([k, l, n]) =>
    `<button type="button" role="tab" class="${k === dcFiltro ? 'on' : ''}" aria-selected="${k === dcFiltro}" data-filtro="${k}">${l} <small>${n}</small></button>`).join('');
  const lista = DECISOES.filter(d => dcFiltro === 'todas' || (dcFiltro === 'feitas') === !!dcFeita(d));
  const temas = [...new Set(lista.map(d => d.tema))];
  document.getElementById('dcLista').innerHTML = temas.map(t => `
    <section class="dc-tema"><h2>${t}</h2>${lista.filter(d => d.tema === t).map(dcCartao).join('')}</section>`).join('')
    || '<p class="vazio">Nada por aqui.</p>';
}

// Texto para enviar ao desenvolvimento
function dcTexto(){
  const linhas = ['SOFTLIVING · DECISÕES DA V2', ''];
  [...new Set(DECISOES.map(d => d.tema))].forEach(t => {
    linhas.push(t.toUpperCase());
    DECISOES.filter(d => d.tema === t).forEach(d => {
      const r = dcRespostas[d.id] || {};
      const resposta = !dcFeita(d) ? 'EM ABERTO' : r.o === OUTRA ? 'Outra resposta (ver observações)' : d.opcoes[r.o];
      linhas.push(`- ${d.p}`, `  Resposta: ${resposta}`);
      if(r.obs) linhas.push(`  Observações: ${r.obs}`);
    });
    linhas.push('');
  });
  linhas.push('JÁ DECIDIDO', ...DECISOES_TOMADAS.map(x => `- ${x}`));
  return linhas.join('\n');
}

const dcPagina = document.querySelector('main');
dcPagina.addEventListener('change', ev => {
  const radio = ev.target.closest('input[type="radio"]'); if(!radio) return;
  const id = radio.name.slice(3);
  dcRespostas[id] = { ...(dcRespostas[id] || {}), o:+radio.value };
  gravarDecisoes(dcRespostas);
  const y = scrollY; renderDecisoes(); scrollTo(0, y);
});
dcPagina.addEventListener('input', ev => {
  const obs = ev.target.closest('[data-obs]'); if(!obs) return;
  dcRespostas[obs.dataset.obs] = { ...(dcRespostas[obs.dataset.obs] || {}), obs:obs.value };
  gravarDecisoes(dcRespostas);                              // sem refazer a página, para não perder o cursor
});
dcPagina.addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.dataset.filtro){ dcFiltro = b.dataset.filtro; renderDecisoes(); }
  else if(b.dataset.limpar){ const r = dcRespostas[b.dataset.limpar]; if(r){ delete r.o; gravarDecisoes(dcRespostas); } const y = scrollY; renderDecisoes(); scrollTo(0, y); }
  else if(b.id === 'dcCopiar'){
    const texto = dcTexto();
    if(navigator.clipboard) navigator.clipboard.writeText(texto).then(() => mostrarAviso('Respostas copiadas. É só colar na conversa ou no e-mail'), () => mostrarAviso('Não deu para copiar. Use Baixar em texto'));
    else mostrarAviso('Não deu para copiar. Use Baixar em texto');
  }
  else if(b.id === 'dcBaixar'){
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([dcTexto()], { type:'text/plain;charset=utf-8' }));
    a.download = 'softliving-decisoes-v2.txt';
    a.click(); URL.revokeObjectURL(a.href);
  }
});

document.getElementById('dcTomadas').innerHTML = DECISOES_TOMADAS.map(x => `<li>${dcLogo(x)}</li>`).join('');
renderDecisoes();
// Vindo do aviso de uma tela (decisoes.html#id): rola até a pergunta
if(location.hash){ const alvo = document.getElementById(location.hash.slice(1)); if(alvo){ alvo.classList.add('alvo'); alvo.scrollIntoView({ block:'center' }); } }
