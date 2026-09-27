// VERSÃO 2 · Atividades: Curtidas, Comentários, Acompanhar e Salvos (curtidas.html, comentarios.html, acompanhar.html,
// salvos.html). Uma página por item do submenu; as abas no topo levam de uma para outra. Sem datas (regra da v2).
// Dados fictícios a partir de CONTEUDOS e COLUNISTAS; o que a pessoa desfaz fica guardado no navegador.
const AT_ABAS = [
  ['curtidas', 'Curtidas', 'Conteúdos e colunas de que você gostou.'],
  ['comentarios', 'Comentários', 'O que você comentou e as respostas que recebeu.'],
  ['acompanhar', 'Acompanhar', 'Colunistas e conversas que você acompanha, para não perder nada novo.'],
  ['salvos', 'Salvos', 'Conteúdos que você guardou para ler depois.'],
];
const atLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const atGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const ctd = t => CONTEUDOS.find(c => c.t === t);
const AT_ASSUNTO = { 'Saúde mental e qualidade de vida':'Bem-estar', 'Saúde e bem-estar físico':'Saúde', 'Estilo de vida e consumo':'Estilo e casa', 'Turismo e viagem':'Viagem', 'Tecnologia e serviços digitais':'Tecnologia' };
let curtidas = atLer('v2Curtidas', ['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'O bem-estar do encontro presencial', 'A Moda Finalmente Descobriu que Você Existe', 'Uma casa precisa de coisas velhas', 'Meu primeiro agente de IA', 'Descubra novos pequenos prazeres da vida!']);
const COMENTARIOS = [
  { c:'Na Suíça, um vinho para chamar de seu', txt:'Estive no Valais há alguns anos e confirmo: o silêncio das vinhas é inesquecível. Anotei os três endereços!', resp:[['Lucia Paes de Barros', 'Que bom saber, Rafael! O segundo endereço tem uma degustação linda no fim da tarde.']], curt:8 },
  { c:'Agente de IA anti-golpe', txt:'Mostrei para minha mãe e ela já configurou no celular. Muito útil.', resp:[['Bernardo Leitão', 'Excelente! Esse é o melhor uso possível.'], ['Célia Ribeiro', 'Vou fazer o mesmo com meu pai.']], curt:14 },
  { c:'A casa não precisa parecer decorada', txt:'Adorei a ideia de deixar a casa contar a nossa história em vez de seguir tendência.', resp:[], curt:5 },
  { c:'O bem-estar do encontro presencial', txt:'Depois que comecei a ir aos encontros do grupo Amigos, minha semana mudou.', resp:[['Alexandre Duarte', 'E a gente adora ter você por lá!']], curt:11 },
];
let colunistasSeguidos = atLer('v2Acompanhando', ['Sofia Martellini', 'Zé Roberto', 'Lucia Paes de Barros', 'Bernardo Leitão']);
const CONVERSAS = [
  { c:'Agente de IA anti-golpe', novas:3, pessoas:12 },
  { c:'A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', novas:0, pessoas:28 },
  { c:'Na Suíça, um vinho para chamar de seu', novas:1, pessoas:7 },
];

const atAba = AT_ABAS.find(a => a[0] === LAYOUT_PAGE) || AT_ABAS[0];
document.getElementById('atTitulo').innerHTML = `<span class="hl">${atAba[1]}</span>`;
document.getElementById('atSub').textContent = atAba[2];

const selo = c => c.badge === 'premium' ? `<span class="vc-chip premium">${icone('carteira')}${c.credits} crédito${c.credits > 1 ? 's' : ''}</span>` : '<span class="vc-chip">Grátis</span>';
const cartao = (c, acao) => `
  <article class="vcard at-card">
    <img src="${fotoUrl(c.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
    ${acao}
    <div class="vc-info">
      <span class="vc-cat">${AT_ASSUNTO[c.cat] || c.cat}</span>
      <h3>${c.t.replace('SoftLiving', LOGO)}</h3>
      <span class="vc-autor">${c.a.replace('SoftLiving', LOGO)}</span>
      <div class="vc-row">${selo(c)}<a href="${urlPagina('conteudos')}" class="vc-btn">Ler ${icone('seta')}</a></div>
    </div>
  </article>`;
const avatar = (nome, cor) => `<span class="av-col at-av" style="background:${cor || '#013565'}">${nome.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('')}</span>`;
const corDe = nome => (COLUNISTAS.find(c => c.nome === nome) || {}).cor || ['#2f8578', '#7a3b52', '#b0513a', '#5b4b8a'][nome.length % 4];

function contas(){
  return { curtidas:curtidas.filter(ctd).length, comentarios:COMENTARIOS.length, acompanhar:colunistasSeguidos.length + CONVERSAS.length, salvos:lerSalvos().filter(ctd).length };
}
function renderAbas(){
  const n = contas();
  document.getElementById('atAbas').innerHTML = AT_ABAS.map(([k, l]) =>
    `<a href="${urlPagina(k)}" role="tab" class="${k === atAba[0] ? 'on' : ''}" aria-selected="${k === atAba[0]}">${l} <small>${n[k]}</small></a>`).join('');
}

const RENDER = {
  curtidas(){
    const lista = curtidas.map(ctd).filter(Boolean);
    return lista.length ? `<div class="grade">${lista.map(c => cartao(c, `<button type="button" class="at-acao on" data-descurtir="${c.t}" title="Descurtir" aria-label="Descurtir">${icone('curtidas')}</button>`)).join('')}</div>`
      : '<p class="vazio">Você ainda não curtiu nenhum conteúdo.</p>';
  },
  comentarios(){
    return `<div class="at-comentarios">${COMENTARIOS.map((m, i) => { const c = ctd(m.c); return `
      <article class="at-coment">
        <a href="${urlPagina('conteudos')}" class="at-coment-alvo"><img src="${fotoUrl(c.foto, 200)}" alt="" loading="lazy"><span><small>Você comentou em</small><b>${c.t}</b></span></a>
        <blockquote>${m.txt}</blockquote>
        <div class="at-coment-meta"><span>${icone('curtidas')}${m.curt} curtidas</span><span>${icone('comentarios')}${m.resp.length ? `${m.resp.length} ${m.resp.length === 1 ? 'resposta' : 'respostas'}` : 'Nenhuma resposta ainda'}</span></div>
        ${m.resp.length ? `<div class="at-respostas">${m.resp.map(([quem, t]) => `<div class="at-resp">${avatar(quem, corDe(quem))}<p><b>${quem}</b>${t}</p></div>`).join('')}</div>` : ''}
      </article>`; }).join('')}</div>`;
  },
  acompanhar(){
    return `
      <h2 class="at-sec">Colunistas</h2>
      ${colunistasSeguidos.length ? `<div class="autores">${colunistasSeguidos.map(n => COLUNISTAS.find(c => c.nome === n)).filter(Boolean).map(col => `
        <div class="autor at-autor">
          <span class="av-col" style="background:${col.cor}">${col.sigla}</span>
          <span class="autor-txt"><b>${col.nome}</b><span class="autor-nicho">${col.aba === 'SoftLiving' ? LOGO : col.aba}</span><small>${col.coluna ? col.coluna + ' · ' : ''}${col.publicadas} colunas</small></span>
          <button type="button" class="btn ghost at-deixar" data-deixar="${col.nome}">Acompanhando</button>
        </div>`).join('')}</div>` : '<p class="vazio">Você não acompanha nenhum colunista.</p>'}
      <h2 class="at-sec">Conversas</h2>
      <div class="at-conversas">${CONVERSAS.map(v => { const c = ctd(v.c); return `
        <a href="${urlPagina('conteudos')}" class="at-conversa">
          <img src="${fotoUrl(c.foto, 200)}" alt="" loading="lazy">
          <span><b>${c.t}</b><small>${v.pessoas} pessoas na conversa</small></span>
          ${v.novas ? `<span class="at-novas">${v.novas} ${v.novas === 1 ? 'nova' : 'novas'}</span>` : '<span class="at-emdia">Em dia</span>'}
        </a>`; }).join('')}</div>`;
  },
  salvos(){
    const lista = lerSalvos().map(ctd).filter(Boolean);
    return lista.length ? `<div class="grade">${lista.map(c => cartao(c, `<button type="button" class="fav on" data-remover="${c.t}" title="Remover dos salvos" aria-label="Remover dos salvos">${icone('salvar')}</button>`)).join('')}</div>`
      : '<p class="vazio">Nada salvo ainda. Toque na bandeirinha de um conteúdo para guardar e ler depois.</p>';
  },
};
function renderAtividades(){
  renderAbas();
  document.getElementById('atConteudo').innerHTML = RENDER[atAba[0]]();
}

document.getElementById('atConteudo').addEventListener('click', e => {
  const b = e.target.closest('button'); if(!b) return;
  e.preventDefault();
  const d = b.dataset;
  if(d.descurtir){ curtidas = curtidas.filter(t => t !== d.descurtir); atGravar('v2Curtidas', curtidas); mostrarAviso('Curtida removida'); }
  else if(d.remover){ gravarSalvos(lerSalvos().filter(t => t !== d.remover)); mostrarAviso('Removido dos salvos'); }
  else if(d.deixar){ colunistasSeguidos = colunistasSeguidos.filter(n => n !== d.deixar); atGravar('v2Acompanhando', colunistasSeguidos); mostrarAviso(`Você deixou de acompanhar ${d.deixar}`); }
  else return;
  renderAtividades();
});
renderAtividades();
