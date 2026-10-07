// VERSÃO 2 · Atividades: Curtidas, Comentários, Acompanhar e Salvos (curtidas.html, comentarios.html, acompanhar.html,
// salvos.html). Uma página por item do submenu Atividades do menu lateral (sem abas entre elas no topo da página). Sem datas (regra da v2).
// Dados fictícios a partir de CONTEUDOS e COLUNISTAS; o que a pessoa desfaz fica guardado no navegador.
const AT_ABAS = [
  ['curtidas', 'Curtidas', 'Conteúdos e colunas de que você gostou.'],
  ['comentarios', 'Comentários', 'O que você comentou e as respostas que recebeu.'],
  ['acompanhar', 'Acompanhar', 'Colunistas e conversas que você acompanha, para não perder nada novo.'],
  ['salvos', 'Salvos', 'O que você guardou: conteúdos, colunas, grupos, vitrines e o que salvou em Minhas Comunidades.'],
];
const atLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const atGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const ctd = t => CONTEUDOS.find(c => c.t === t) || (typeof COLUNAS_EXTRAS !== 'undefined' ? COLUNAS_EXTRAS.find(c => c.t === t) : undefined);
const AT_ASSUNTO = { 'Saúde mental e qualidade de vida':'Bem-estar', 'Saúde e bem-estar físico':'Saúde', 'Estilo de vida e consumo':'Estilo e casa', 'Turismo e viagem':'Viagem', 'Tecnologia e serviços digitais':'Tecnologia' };
let curtidas = atLer('v2Curtidas', ['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'O bem-estar do encontro presencial', 'A Moda Finalmente Descobriu que Você Existe', 'Uma casa precisa de coisas velhas', 'Meu primeiro agente de IA', 'Descubra novos pequenos prazeres da vida!']);
const COMENTARIOS = [
  { c:'Na Suíça, um vinho para chamar de seu', txt:'Estive no Valais há alguns anos e confirmo: o silêncio das vinhas é inesquecível. Anotei os três endereços!', resp:[['Lucia Paes de Barros', 'Que bom saber, Rafael! O segundo endereço tem uma degustação linda no fim da tarde.']], curt:8 },
  { c:'Agente de IA anti-golpe', txt:'Mostrei para minha mãe e ela já configurou no celular. Muito útil.', resp:[['Bernardo Leitão', 'Excelente! Esse é o melhor uso possível.'], ['Célia Ribeiro', 'Vou fazer o mesmo com meu pai.']], curt:14 },
  { c:'A casa não precisa parecer decorada', txt:'Adorei a ideia de deixar a casa contar a nossa história em vez de seguir tendência.', resp:[], curt:5 },
  { c:'O bem-estar do encontro presencial', txt:'Depois que comecei a ir aos encontros do grupo Amigos, minha semana mudou.', resp:[['Alexandre Duarte', 'E a gente adora ter você por lá!']], curt:11 },
];
let colunistasSeguidos = atLer('v2Acompanhando', ['Sofia Martellini', 'Zé Roberto', 'Lucia Paes de Barros', 'Bernardo Leitão']);
// Conversas acompanhadas: lista guardada no navegador (v2Conversas), a mesma do botão Acompanhar da leitura
const CONVERSAS_DADOS = {
  'Agente de IA anti-golpe':{ novas:3, pessoas:12 },
  'A Revolução da Longevidade: Estamos Preparados para Viver Tanto?':{ novas:0, pessoas:28 },
  'Na Suíça, um vinho para chamar de seu':{ novas:1, pessoas:7 },
};
const CONVERSAS_FN = () => atLer('v2Conversas', Object.keys(CONVERSAS_DADOS)).filter(ctd).map(t => ({ c:t, ...(CONVERSAS_DADOS[t] || { novas:0, pessoas:4 }) }));

const atAba = AT_ABAS.find(a => a[0] === LAYOUT_PAGE) || AT_ABAS[0];
document.getElementById('atTitulo').innerHTML = `<span class="hl">${atAba[1]}</span>`;
document.getElementById('atSub').textContent = atAba[2];

// Coluna = conteúdo escrito por um colunista (COLUNISTAS); o resto é conteúdo da redação
const colunistaDoSalvo = c => COLUNISTAS.find(col => c.a.startsWith(col.nome));
const ehColuna = c => !!colunistaDoSalvo(c);
// Curtidas e Salvos em modo lista (decisão de 2026-10-06): uma linha por item, com foto pequena, segmento, título,
// autor e selo; o botão da direita desfaz (descurtir ou tirar dos salvos). O resto da linha abre o item.
const itemLista = ({ url, foto, seg, titulo, extra, acao }) => `
  <article class="at-item">
    <a href="${url}" class="at-item-link">
      <img class="foto" src="${fotoUrl(foto, 300)}" alt="" loading="lazy">
      <span class="at-item-txt"><span class="cat">${seg}</span><h3>${titulo}</h3><span class="meta">${extra}</span></span>
    </a>
    ${acao}
  </article>`;
const cartao = (c, acao) => itemLista({ url:urlConteudo(c.t), foto:c.foto, titulo:c.t.replace('SoftLiving', LOGO),
  seg:ehColuna(c) ? (colunistaDoSalvo(c).coluna || colunistaDoSalvo(c).aba).replace('SoftLiving', LOGO) : (AT_ASSUNTO[c.cat] || c.cat),
  extra:`<span>${c.a.replace('SoftLiving', LOGO)}</span>${seloAcesso(c)}`, acao });
const botaoTirar = (dado, valor) => `<button type="button" class="at-item-bt" ${dado}="${valor}" title="Remover dos salvos" aria-label="Remover dos salvos">${icone('salvar')}</button>`;
const avatar = (nome, cor) => `<span class="av-col at-av" style="background:${cor || '#013565'}">${nome.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('')}</span>`;
const corDe = nome => (COLUNISTAS.find(c => c.nome === nome) || {}).cor || ['#2f8578', '#7a3b52', '#b0513a', '#5b4b8a'][nome.length % 4];

// Grupos salvos pela bandeirinha dos cartões de grupo (lerGruposSalvos, no layout.js)
const gruposSalvos = () => typeof GRUPOS === 'undefined' ? [] : lerGruposSalvos().map(t => GRUPOS.find(g => g.t === t)).filter(Boolean);
const cartaoGrupo = g => itemLista({ url:urlGrupo(GRUPOS.indexOf(g)), foto:g.foto, seg:g.cat, titulo:g.t,
  extra:`<span>${g.membros} ${g.membros === 1 ? 'participante' : 'participantes'}</span><i></i><span>${g.participando ? 'Você participa' : g.premium ? `Premium · ${g.preco} créditos/mês` : 'Grátis'}</span>`,
  acao:botaoTirar('data-remover-grupo', g.t) });
// Vitrines salvas: os estabelecimentos favoritos (botão Salvar da página de cada um; estFavoritos, em estabelecimentos-dados.js)
const vitrinesSalvas = () => typeof ESTABELECIMENTOS === 'undefined' ? [] : estFavoritos().map(id => ESTABELECIMENTOS.find(x => x.id === id)).filter(Boolean);
const cartaoVitrine = e => itemLista({ url:urlEstabelecimento(e), foto:e.foto, seg:`${e.cat} · ${e.bairro}`, titulo:e.n,
  extra:e.b ? `<span>${e.b}</span>` : '', acao:botaoTirar('data-remover-vitrine', e.id) });
// Salvos: separados em cinco tipos, com um filtro no topo. Minhas Comunidades ainda não tem o que salvar no protótipo.
const SV_TIPOS = [['todos', 'Todos'], ['conteudos', 'Conteúdos'], ['colunas', 'Colunas'], ['grupos', 'Grupos'], ['vitrines', 'Vitrines'], ['comunidades', 'Minhas Comunidades']];
let svTipo = 'todos';
function contas(){
  return { curtidas:curtidas.filter(ctd).length, comentarios:COMENTARIOS.length, acompanhar:colunistasSeguidos.length + CONVERSAS_FN().length, salvos:lerSalvos().filter(ctd).length + gruposSalvos().length + vitrinesSalvas().length };
}
const RENDER = {
  curtidas(){
    const lista = curtidas.map(ctd).filter(Boolean);
    return lista.length ? `<div class="at-lista">${lista.map(c => cartao(c, `<button type="button" class="at-item-bt curtida" data-descurtir="${c.t}" title="Descurtir" aria-label="Descurtir">${icone('curtidas')}</button>`)).join('')}</div>`
      : '<p class="vazio">Você ainda não curtiu nenhum conteúdo.</p>';
  },
  comentarios(){
    return `<div class="at-comentarios">${COMENTARIOS.map((m, i) => { const c = ctd(m.c); return `
      <article class="at-coment">
        <a href="${urlConteudo(c.t)}#ldComentarios" class="at-coment-alvo"><img src="${fotoUrl(c.foto, 200)}" alt="" loading="lazy"><span><small>Você comentou em</small><b>${c.t}</b></span></a>
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
      <div class="at-conversas">${CONVERSAS_FN().map(v => { const c = ctd(v.c); return `
        <a href="${urlConteudo(c.t)}#ldComentarios" class="at-conversa">
          <img src="${fotoUrl(c.foto, 200)}" alt="" loading="lazy">
          <span><b>${c.t}</b><small>${v.pessoas} pessoas na conversa</small></span>
          ${v.novas ? `<span class="at-novas">${v.novas} ${v.novas === 1 ? 'nova' : 'novas'}</span>` : '<span class="at-emdia">Em dia</span>'}
        </a>`; }).join('')}</div>`;
  },
  salvos(){
    const salvos = lerSalvos().map(ctd).filter(Boolean);
    const remover = c => botaoTirar('data-remover', c.t);
    const partes = {
      conteudos:{ n:salvos.filter(c => !ehColuna(c)).length, html:() => salvos.filter(c => !ehColuna(c)).map(c => cartao(c, remover(c))).join(''), vazio:'Nenhum conteúdo salvo. Toque na bandeirinha de um conteúdo para guardar e ler depois.' },
      colunas:{ n:salvos.filter(ehColuna).length, html:() => salvos.filter(ehColuna).map(c => cartao(c, remover(c))).join(''), vazio:'Nenhuma coluna salva.' },
      grupos:{ n:gruposSalvos().length, html:() => gruposSalvos().map(cartaoGrupo).join(''), vazio:'Nenhum grupo salvo. Toque na bandeirinha de um grupo para guardar.' },
      vitrines:{ n:vitrinesSalvas().length, html:() => vitrinesSalvas().map(cartaoVitrine).join(''), vazio:'Nenhuma vitrine salva. Na página de um estabelecimento, toque em Salvar.' },
      comunidades:{ n:0, html:() => '', vazio:'Nada salvo em Minhas Comunidades.' },
    };
    const total = Object.values(partes).reduce((t, p) => t + p.n, 0);
    const filtro = `<div class="seg sv-filtro" role="tablist" aria-label="Tipo de item salvo">${SV_TIPOS.map(([k, l]) =>
      `<button type="button" role="tab" class="${k === svTipo ? 'on' : ''}" aria-selected="${k === svTipo}" data-sv="${k}">${l} <small>${k === 'todos' ? total : partes[k].n}</small></button>`).join('')}</div>`;
    // cada tipo num box de fundo claro, com o título e a quantidade, para as seções não se misturarem
    const secao = k => `<section class="sv-bloco"><h2 class="at-sec">${SV_TIPOS.find(t => t[0] === k)[1]} <small>${partes[k].n}</small></h2>${partes[k].n ? `<div class="at-lista">${partes[k].html()}</div>` : `<p class="vazio sv-vazio">${partes[k].vazio}</p>`}</section>`;
    if(svTipo !== 'todos') return filtro + secao(svTipo);
    // Todos: só as seções que têm alguma coisa
    const cheias = Object.keys(partes).filter(k => partes[k].n);
    return filtro + (cheias.length ? cheias.map(secao).join('') : '<p class="vazio">Nada salvo ainda. Toque na bandeirinha de um conteúdo ou de um grupo para guardar.</p>');
  },
};
function renderAtividades(){
  document.getElementById('atConteudo').innerHTML = RENDER[atAba[0]]();
}

document.getElementById('atConteudo').addEventListener('click', e => {
  const b = e.target.closest('button'); if(!b) return;
  e.preventDefault();
  const d = b.dataset;
  if(d.descurtir){ curtidas = curtidas.filter(t => t !== d.descurtir); atGravar('v2Curtidas', curtidas); mostrarAviso('Curtida removida'); }
  else if(d.sv){ svTipo = d.sv; }
  else if(d.removerVitrine){ definirEstFavorito(+d.removerVitrine, false); mostrarAviso('Vitrine removida dos salvos'); }
  else if(d.removerGrupo){ gravarGruposSalvos(lerGruposSalvos().filter(t => t !== d.removerGrupo)); mostrarAviso('Grupo removido dos salvos'); }
  else if(d.remover){ gravarSalvos(lerSalvos().filter(t => t !== d.remover)); mostrarAviso('Removido dos salvos'); }
  else if(d.deixar){ colunistasSeguidos = colunistasSeguidos.filter(n => n !== d.deixar); atGravar('v2Acompanhando', colunistasSeguidos); mostrarAviso(`Você deixou de acompanhar ${d.deixar}`); }
  else return;
  renderAtividades();
});
renderAtividades();
