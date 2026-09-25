// Box "Sua opinião vale créditos": pesquisa de escuta em rodadas de 3 a 5 perguntas sorteadas, uma por vez.
// Cada resposta vale +1 crédito de bônus, somado ao saldo do topo (bônus de todas as pesquisas juntas).
// Pergunta respondida não volta; pergunta pulada pode aparecer em outra rodada.
// O estado de cada pesquisa fica na sessão do navegador, com uma chave própria.
//
// montarEscuta({ lado, perguntas, chave, descricao })
//   lado: coluna da direita (.in-side) onde o box entra, no topo
//   perguntas: lista no formato de escuta-dados.js
//   chave: nome do estado na sessão (uma pesquisa = uma chave)
//   descricao: texto opcional abaixo do título
//
// Início, Conteúdos e Grupos usam a pesquisa geral (escuta-dados.js), montada automaticamente no fim deste arquivo.
// Minhas Comunidades usa uma pesquisa por comunidade (comunidades-escuta.js), montada por comunidades.js.

const ESCUTA_MIN_TEXTO = 10;   // mínimo de caracteres para a resposta de texto valer o crédito

function lerBonusTotal(){ try { return +sessionStorage.getItem('bonusCreditos') || 0; } catch(e){ return 0; } }
function somarBonus(n){ try { sessionStorage.setItem('bonusCreditos', lerBonusTotal() + n); } catch(e){} }

function montarEscuta({ lado, perguntas, chave, descricao = 'Responda e ganhe <b>+1 crédito de bônus</b> por pergunta.' }){
  if(!lado || !perguntas || !perguntas.length) return;
  lado.querySelectorAll('.es-box').forEach(b => b.remove());
  const box = document.createElement('section');
  box.className = 'in-card es-box';
  lado.prepend(box);

  let estado = { respondidas:{}, bonus:0, rodada:[], pos:0, ganhosRodada:0 };
  try { estado = Object.assign(estado, JSON.parse(sessionStorage.getItem(chave) || 'null') || {}); } catch(e){}
  const salvar = () => { try { sessionStorage.setItem(chave, JSON.stringify(estado)); } catch(e){} };
  const pendentes = () => perguntas.filter(p => !(p.id in estado.respondidas));
  const pergunta = id => perguntas.find(p => p.id === id);

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
    <div class="in-card-head"><h2>Sua opinião vale créditos</h2></div>
    <p class="es-sub">${descricao}</p>`;

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
      salvar(); somarBonus(1); atualizarSaldo(); render(); avisoCredito();
    });
    box.querySelector('.es-skip').addEventListener('click', () => { estado.pos++; salvar(); render(); });
  }

  function renderFim(){
    const restam = pendentes().length;
    box.innerHTML = `${cabecalho}
      <div class="es-fim">
        <p class="es-fim-t">${estado.ganhosRodada ? `Obrigado! Você ganhou <b>${estado.ganhosRodada} crédito${estado.ganhosRodada > 1 ? 's' : ''} de bônus</b> nesta rodada.` : 'Tudo bem! Quando quiser, responda outras perguntas.'}</p>
        <p class="es-fim-s">Total ganho com esta pesquisa: ${estado.bonus} crédito${estado.bonus === 1 ? '' : 's'}.</p>
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
}

// Pesquisa geral: Início, Conteúdos e Grupos (quem começa numa continua na outra)
if(typeof ESCUTA_PERGUNTAS !== 'undefined'){
  montarEscuta({ lado: document.querySelector('.in-side'), perguntas: ESCUTA_PERGUNTAS, chave: 'escutaEstado' });
}
