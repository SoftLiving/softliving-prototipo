// VERSÃO 2 · Tela Ajuda: perguntas frequentes por tema, busca sem acento e contato (nenhuma mensagem é enviada).
// As respostas seguem as regras do portal: sem anúncios, conteúdo de cliente sempre grátis, R$1 = 1 crédito,
// cadastro = 20 de bônus, 1ª recarga de R$50 = 50 + 50 de bônus, depois R$50 +5, R$100 +15, R$200 +40, indicação = 5 de bônus, créditos não sacáveis.
const AJ_TEMAS = [
  ['comecar', 'Primeiros passos', 'inicio'],
  ['creditos', 'Créditos e carteira', 'carteira'],
  ['grupos', 'Grupos e amigos', 'grupos'],
  ['conteudos', 'Conteúdos e colunas', 'conteudos'],
  ['comunidades', 'Minhas Comunidades', 'comunidades'],
  ['conta', 'Conta e privacidade', 'perfil'],
];
const AJ_PERGUNTAS = [
  ['comecar', 'O que é a SoftLiving?', 'Um portal de conteúdo e comunidades, sem anúncios, feito para uma vida melhor. Aqui você lê conteúdos de especialistas, participa de grupos e encontra pessoas com os mesmos interesses.'],
  ['comecar', 'Preciso pagar para usar?', 'Não. Cadastro, grupos gratuitos, amigos e muitos conteúdos são grátis. Alguns conteúdos do acervo e clubes de assinatura usam créditos.'],
  ['comecar', 'O que é o Modo simples?', 'Uma forma de ver o portal com menos opções na tela e letra maior. Você liga pelo botão Modo simples, no topo, e volta quando quiser.'],
  ['creditos', 'Como funcionam os créditos?', 'R$1 vale 1 crédito. Você recarrega por Pix ou cartão e usa os créditos para destravar conteúdos completos e participar de clubes de assinatura.'],
  ['creditos', 'Como ganho créditos de bônus?', 'Você ganha 20 de bônus no cadastro, 50 de bônus na primeira recarga de R$50, de 10% a 20% de bônus nas recargas seguintes (R$50 +5, R$100 +15, R$200 +40), 5 de bônus por indicação aprovada e 1 por pergunta respondida nas pesquisas de opinião.'],
  ['creditos', 'Posso sacar meus créditos?', 'Não. Créditos e bônus são de uso interno da SoftLiving e não podem ser sacados. O bônus fica numa carteira separada.'],
  ['grupos', 'Como entro em um grupo?', 'Na página Grupos, escolha um grupo e toque em Participar. Grupos premium usam créditos; os gratuitos são abertos a todos os membros.'],
  ['grupos', 'Como adiciono amigos?', 'Na página Amigos, veja as sugestões de pessoas dos seus grupos e toque em Adicionar. Quando a pessoa aceitar, vocês passam a ser amigos.'],
  ['conteudos', 'Por que alguns conteúdos usam créditos?', 'Para valorizar os especialistas escolhidos pela nossa curadoria, sem publicidade interrompendo a leitura. Você sempre sabe antes o que é grátis e o que usa créditos.'],
  ['conteudos', 'Como salvo um conteúdo para ler depois?', 'Toque no marcador que aparece no canto do conteúdo. Os salvos ficam em Atividades, no menu.'],
  ['comunidades', 'O que é Minhas Comunidades?', 'O espaço das comunidades de que você faz parte, como sua empresa, seu condomínio ou seu clube, com conteúdos, serviços e grupos só para os membros de cada uma.'],
  ['comunidades', 'Os conteúdos da minha comunidade são pagos?', 'Não. Conteúdo publicado pela sua comunidade é sempre grátis para os membros.'],
  ['conta', 'Como altero meus dados?', 'Em Meu perfil você edita o Sobre mim, seus interesses e quem pode ver seu perfil.'],
  ['conta', 'Esqueci minha senha. E agora?', 'Na tela de entrada, toque em Esqueci minha senha. Enviamos um link para o seu e-mail para você criar uma nova.'],
];
let ajTema = null;
const semAcentoAj = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function renderAjuda(){
  document.getElementById('ajTemas').innerHTML = AJ_TEMAS.map(([k, t, ic]) =>
    `<button type="button" class="aj-tema${k === ajTema ? ' on' : ''}" aria-pressed="${k === ajTema}" data-tema="${k}">${icone(ic)}<span>${t}</span></button>`).join('');
  const termo = '';                                       // a busca fica só na página Busca (e no chat do assistente)
  const lista = AJ_PERGUNTAS.filter(([k, p, r]) => (!ajTema || k === ajTema) && (!termo || semAcentoAj(p + ' ' + r).includes(termo)));
  document.getElementById('ajTitulo').textContent = ajTema ? AJ_TEMAS.find(t => t[0] === ajTema)[1] : termo ? 'Resultados' : 'Perguntas frequentes';
  document.getElementById('ajPerguntas').innerHTML = lista.map(([, p, r]) => `
    <details class="aj-pergunta"><summary><span>${p.replace(/SoftLiving/g, LOGO)}</span></summary><p>${r.replace(/SoftLiving/g, LOGO)}</p></details>`).join('');
  document.getElementById('ajVazio').hidden = !!lista.length;
}

document.getElementById('ajTemas').addEventListener('click', ev => {
  const b = ev.target.closest('[data-tema]'); if(!b) return;
  ajTema = ajTema === b.dataset.tema ? null : b.dataset.tema;
  renderAjuda();
  // celular e tablet: o chat fica entre os temas e as perguntas, então a página desce até as perguntas do tema escolhido
  if(ajTema && document.querySelector('.aj-no-topo')) document.getElementById('ajTitulo').scrollIntoView({ behavior:'smooth', block:'start' });
});
document.getElementById('ajForm').addEventListener('submit', ev => {
  ev.preventDefault();
  document.getElementById('ajMsg').value = '';
  mostrarAviso('Mensagem registrada. No protótipo, nada é enviado');
});
renderAjuda();

// ===== Chat do assistente de IA (coluna da direita) =====
// Protótipo: não há IA de verdade. O "assistente" procura o trecho mais parecido com o que a pessoa escreveu (palavras em
// comum, sem acento) e responde com ele; sem nada parecido, sugere o contato por e-mail.
// Fonte das respostas: a base de conhecimento em conhecimento/*.md (a lista de arquivos fica em conhecimento/arquivos.txt;
// cada "## Assunto" de um arquivo vira uma resposta, com a linha opcional "Palavras: ..." para sinônimos). Se os arquivos
// não carregarem (por exemplo, abrindo o HTML direto do disco, sem o servidor), o chat usa as perguntas frequentes acima.
let AJ_BASE = AJ_PERGUNTAS.map(([, p, r]) => ({ titulo:p, palavras:'', texto:r, html:r, fonte:'Perguntas frequentes' }));

// Markdown simples para HTML: parágrafos, listas com "- " (também dentro de listas) e **negrito**
function ajMd(md){
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '$1');
  const blocos = md.trim().split(/\n\s*\n/);
  return blocos.map(b => {
    const linhas = b.split('\n');
    if(linhas.every(l => /^\s*- /.test(l))) return `<ul>${linhas.map(l => `<li${/^\s{2,}-/.test(l) ? ' class="sub"' : ''}>${esc(l.replace(/^\s*- /, ''))}</li>`).join('')}</ul>`;
    return `<p>${linhas.map(esc).join(' ')}</p>`;
  }).join('');
}
function ajLerMd(nome, md){
  md = md.replace(/\r/g, '');
  const tema = (md.match(/^# (.+)$/m) || [, nome])[1].trim();
  return md.split(/^## /m).slice(1).map(sec => {
    const linhas = sec.split('\n');
    const titulo = linhas.shift().trim();
    let palavras = '';
    if(/^Palavras:/i.test((linhas[0] || '').trim())) palavras = linhas.shift().replace(/^\s*Palavras:\s*/i, '');
    const texto = linhas.join('\n').trim();
    return { titulo, palavras, texto, html:ajMd(texto), fonte:`${tema} (${nome})` };
  }).filter(x => x.texto);
}
const ajBaseCarregada = fetch('conhecimento/arquivos.txt', { cache:'no-store' })
  .then(r => r.ok ? r.text() : Promise.reject())
  .then(t => Promise.all(t.split(/\r?\n/).map(n => n.trim()).filter(n => n && !n.startsWith('#'))
    .map(n => fetch('conhecimento/' + n, { cache:'no-store' }).then(r => r.ok ? r.text() : '').then(md => ajLerMd(n, md)).catch(() => []))))
  .then(listas => { const base = listas.flat(); if(base.length){ AJ_BASE = base; document.querySelector('.ajc-nota').textContent = 'Assistente de demonstração: as respostas vêm da base de conhecimento do Suporte.'; } })
  .catch(() => {});

// Perguntas prontas: sempre 3, sorteadas entre os assuntos da base; trocam a cada resposta (sem repetir a última feita)
function ajSortear(evitar){
  const lista = AJ_BASE.map(q => q.titulo).filter(q => q.endsWith('?') && q !== evitar);
  for(let i = lista.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [lista[i], lista[j]] = [lista[j], lista[i]]; }
  return lista.slice(0, 3);
}
function ajRenderSugestoes(evitar){
  document.getElementById('ajcSugestoes').innerHTML = ajSortear(evitar).map(q => `<button type="button" data-pergunta="${q.replace(/"/g, '&quot;')}">${q.replace(/SoftLiving/g, LOGO)}</button>`).join('');
}
const AJ_IGNORAR = new Set(['como', 'para', 'que', 'uma', 'meu', 'minha', 'meus', 'minhas', 'posso', 'qual', 'quais', 'onde', 'com', 'por', 'dos', 'das', 'nos', 'nas', 'sao', 'esta', 'isso', 'voce', 'tem', 'ter', 'sobre', 'quero', 'saber', 'fazer', 'faco', 'ser', 'the', 'mais', 'muito', 'pelo', 'pela']);
const ajPalavras = t => semAcentoAj(t).replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(p => p.length > 2 && !AJ_IGNORAR.has(p))
  .map(p => p.replace(/(oes|aes|s)$/, ''));                          // plural simples: créditos = crédito, grupos = grupo
// Nota: palavra no título do assunto ou em "Palavras" vale 2; no texto da resposta vale 1
function ajResponder(texto){
  const busca = [...new Set(ajPalavras(texto))];
  let melhor = null, nota = 0;
  AJ_BASE.forEach(item => {
    const fortes = new Set(ajPalavras(item.titulo + ' ' + item.palavras)), fracas = new Set(ajPalavras(item.texto));
    const n = busca.reduce((s, w) => s + (fortes.has(w) ? 2 : fracas.has(w) ? 1 : 0), 0);
    if(n > nota){ nota = n; melhor = item; }
  });
  if(melhor && nota >= 2) return `${melhor.html}<span class="ajc-fonte">Fonte: ${melhor.fonte} › “${melhor.titulo}”</span>`;
  return 'Não encontrei essa resposta por aqui. Você pode escrever para <b>suporte@softliving.com.br</b> ou usar o formulário “Fale com a gente”, que respondemos em até um dia útil.';
}

const ajChat = document.querySelector('.aj-lateral');
ajChat.innerHTML = `
  <section class="ajc">
    <header class="ajc-topo">
      <span class="ajc-av" aria-hidden="true">IA</span>
      <div><b>Assistente <span class="sig"><span class="soft">Soft</span><span class="living">Living</span></span></b><small><i></i>Responde na hora sobre créditos, grupos e sua conta</small></div>
    </header>
    <div class="ajc-msgs" id="ajcMsgs" aria-live="polite"></div>
    <div class="ajc-sugestoes" id="ajcSugestoes" aria-label="Perguntas prontas"></div>
    <form class="ajc-form" id="ajcForm">
      <input type="text" id="ajcCampo" placeholder="Escreva sua pergunta" aria-label="Pergunta para o assistente" autocomplete="off">
      <button type="submit" class="ajc-enviar" aria-label="Enviar pergunta"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg></button>
    </form>
    <p class="ajc-nota">Assistente de demonstração: as respostas vêm das perguntas frequentes.</p>
  </section>`;
const ajcMsgs = document.getElementById('ajcMsgs');
function ajcMensagem(html, quem){
  const m = document.createElement('div');
  m.className = 'ajc-msg ' + quem;
  m.innerHTML = html.replace(/SoftLiving(?![^<]*<\/span>)/g, LOGO);
  ajcMsgs.appendChild(m);
  ajcMsgs.scrollTop = ajcMsgs.scrollHeight;
  return m;
}
function ajcPerguntar(texto){
  texto = texto.trim();
  if(!texto) return;
  ajcMensagem(texto.replace(/</g, '&lt;'), 'eu');
  const digitando = ajcMensagem('<span class="ajc-digitando"><i></i><i></i><i></i></span>', 'ia');
  setTimeout(() => { digitando.remove(); ajcMensagem(ajResponder(texto), 'ia'); ajRenderSugestoes(texto); }, 700);
}
ajRenderSugestoes();
ajBaseCarregada.then(() => ajRenderSugestoes());
ajcMensagem('Olá, Rafael! Sou o assistente da SoftLiving. Pergunte o que quiser sobre créditos, grupos, conteúdos ou sua conta.', 'ia');
document.getElementById('ajcForm').addEventListener('submit', ev => {
  ev.preventDefault();
  const campo = document.getElementById('ajcCampo');
  ajcPerguntar(campo.value);
  campo.value = '';
});
document.getElementById('ajcSugestoes').addEventListener('click', ev => {
  const b = ev.target.closest('[data-pergunta]');
  if(b) ajcPerguntar(b.dataset.pergunta);
});

// Celular e tablet (a coluna não cabe ao lado, abaixo de 1200px): o chat sobe para logo depois dos temas, antes das
// perguntas frequentes, em vez de ficar no fim da página. No computador volta para a coluna da direita.
const ajLado = matchMedia('(min-width:1200px)');
function posicionarChat(){
  if(ajLado.matches){ if(ajChat.parentElement !== document.querySelector('.corpo')) document.querySelector('.corpo').appendChild(ajChat); }
  else if(ajChat.previousElementSibling !== document.getElementById('ajTemas')) document.getElementById('ajTemas').after(ajChat);
  ajChat.classList.toggle('aj-no-topo', !ajLado.matches);
}
ajLado.addEventListener('change', () => { posicionarChat(); ajustarChat(); });
posicionarChat();

// Altura do chat: sempre cabe inteiro na tela (do cabeçalho do assistente até o campo e o botão de enviar), em qualquer
// resolução. Com o chat ao lado do conteúdo, vai do topo dele até 24px acima do fim da janela; ao rolar a página ele
// gruda a 24px do topo e cresce até ocupar a altura da janela. Com o chat embaixo do conteúdo, a altura vem do CSS.
const ajcCaixa = document.querySelector('.ajc');
function ajustarChat(){
  if(getComputedStyle(ajcCaixa).position !== 'sticky'){ ajcCaixa.style.height = ''; return; }
  const topo = Math.max(24, ajcCaixa.getBoundingClientRect().top);
  ajcCaixa.style.height = Math.max(360, innerHeight - topo - 24) + 'px';
}
addEventListener('resize', ajustarChat);
addEventListener('scroll', ajustarChat, { passive:true });
addEventListener('load', ajustarChat);
if(document.fonts) document.fonts.ready.then(ajustarChat);
ajustarChat();
