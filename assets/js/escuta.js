// Box "Sua opinião vale créditos": pesquisa de escuta em rodadas de 3 a 5 perguntas sorteadas, uma por vez.
// Cada resposta vale +1 crédito de bônus (somado ao saldo do topo). Pergunta respondida não volta;
// pergunta pulada pode aparecer em outra rodada. O estado fica na sessão do navegador e vale nas páginas
// Início, Conteúdos e Grupos (quem começa numa continua na outra).
// Perguntas em escuta-dados.js.
(function(){
  const lado = document.querySelector('.in-side');
  if(!lado) return;
  const box = document.createElement('section');
  box.className = 'in-card es-box';
  lado.prepend(box);

  let estado = { respondidas:{}, bonus:0, rodada:[], pos:0, ganhosRodada:0 };
  try { estado = Object.assign(estado, JSON.parse(sessionStorage.getItem('escutaEstado') || 'null') || {}); } catch(e){}
  const salvar = () => { try { sessionStorage.setItem('escutaEstado', JSON.stringify(estado)); } catch(e){} };
  const pendentes = () => ESCUTA_PERGUNTAS.filter(p => !(p.id in estado.respondidas));
  const pergunta = id => ESCUTA_PERGUNTAS.find(p => p.id === id);

  function novaRodada(){
    const pool = pendentes().sort(() => Math.random() - .5);
    const qtd = Math.min(pool.length, 3 + Math.floor(Math.random() * 3));   // 3, 4 ou 5
    estado.rodada = pool.slice(0, qtd).map(p => p.id);
    estado.pos = 0; estado.ganhosRodada = 0;
    salvar();
  }
  // Nada pendente e nenhuma rodada em andamento: a pesquisa acabou, o box não aparece
  if(!estado.rodada.length && !pendentes().length){ box.remove(); return; }
  if(!estado.rodada.length) novaRodada();

  let valor = null;   // resposta em edição
  const cabecalho = `
    <div class="in-card-head"><h2>${ICON.headphones} Sua opinião vale créditos</h2></div>
    <p class="es-sub">Responda e ganhe <b>+1 crédito de bônus</b> por pergunta.</p>`;

  function render(){
    if(estado.pos >= estado.rodada.length) return renderFim();
    const p = pergunta(estado.rodada[estado.pos]);
    if(!p || p.id in estado.respondidas){ estado.pos++; salvar(); return render(); }
    valor = p.tipo === 'varias' ? [] : null;
    const total = estado.rodada.length, n = estado.pos + 1;
    let campo = '';
    if(p.tipo === 'escolha' || p.tipo === 'varias') campo = `<div class="es-ops">${p.op.map(o => `<button type="button" class="es-op" data-op="${o}">${o}</button>`).join('')}</div>${p.tipo === 'varias' ? '<small class="es-hint">Pode marcar mais de uma.</small>' : ''}`;
    if(p.tipo === 'nota') campo = `<div class="es-nota">${[...Array(11).keys()].map(i => `<button type="button" class="es-op" data-op="${i}">${i}</button>`).join('')}</div><div class="es-nota-legenda"><span>Nada provável</span><span>Muito provável</span></div>`;
    if(p.tipo === 'texto') campo = `<textarea class="es-texto" rows="3" placeholder="Escreva com suas palavras..."></textarea><small class="es-hint">Mínimo de ${ESCUTA_MIN_TEXTO} caracteres.</small>`;
    if(p.porque) campo += `<textarea class="es-porque" rows="2" placeholder="${p.porque}"></textarea>`;
    box.innerHTML = `${cabecalho}
      <div class="es-progress"><span>Pergunta ${n} de ${total}</span><span class="es-bar"><i style="width:${(n - 1) / total * 100}%"></i></span></div>
      <p class="es-tema">${p.tema}</p>
      <p class="es-q">${p.t}</p>
      ${campo}
      <div class="es-actions">
        <button type="button" class="es-send" disabled>Responder · +1 crédito</button>
        <button type="button" class="es-skip">Pular</button>
      </div>`;

    const enviar = box.querySelector('.es-send');
    const validar = () => { enviar.disabled = p.tipo === 'varias' ? !valor.length : (p.tipo === 'texto' ? (valor || '').trim().length < ESCUTA_MIN_TEXTO : valor === null); };
    box.querySelectorAll('.es-op').forEach(b => b.addEventListener('click', () => {
      if(p.tipo === 'varias'){ b.classList.toggle('on'); valor = [...box.querySelectorAll('.es-op.on')].map(x => x.dataset.op); }
      else { box.querySelectorAll('.es-op').forEach(x => x.classList.toggle('on', x === b)); valor = b.dataset.op; }
      validar();
    }));
    const texto = box.querySelector('.es-texto');
    if(texto) texto.addEventListener('input', () => { valor = texto.value; validar(); });
    enviar.addEventListener('click', () => {
      const porque = box.querySelector('.es-porque');
      estado.respondidas[p.id] = porque && porque.value.trim() ? { resposta:valor, porque:porque.value.trim() } : valor;
      estado.bonus++; estado.ganhosRodada++; estado.pos++;
      salvar(); atualizarSaldo(); render(); avisoCredito();
    });
    box.querySelector('.es-skip').addEventListener('click', () => { estado.pos++; salvar(); render(); });
  }

  function renderFim(){
    const restam = pendentes().length;
    box.innerHTML = `${cabecalho}
      <div class="es-fim">
        <p class="es-fim-t">${estado.ganhosRodada ? `Obrigado! Você ganhou <b>${estado.ganhosRodada} crédito${estado.ganhosRodada > 1 ? 's' : ''} de bônus</b> nesta rodada.` : 'Tudo bem! Quando quiser, responda outras perguntas.'}</p>
        <p class="es-fim-s">Total ganho com a pesquisa: ${estado.bonus} crédito${estado.bonus === 1 ? '' : 's'}.</p>
        ${restam ? `<button type="button" class="es-send es-mais">Responder mais perguntas</button><small class="es-hint">Ainda há ${restam} pergunta${restam > 1 ? 's' : ''} para responder.</small>`
                 : '<p class="es-fim-s"><b>Você respondeu todas as perguntas. Muito obrigado!</b></p>'}
      </div>`;
    const mais = box.querySelector('.es-mais');
    if(mais) mais.addEventListener('click', () => { novaRodada(); render(); });
    if(!restam){ estado.rodada = []; salvar(); }
  }

  function avisoCredito(){
    const a = document.createElement('span');
    a.className = 'es-toast';
    a.textContent = '+1 crédito de bônus';
    box.appendChild(a);
    setTimeout(() => a.remove(), 1800);
  }

  render();
})();
