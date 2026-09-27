// VERSÃO 2 · Página de um estabelecimento (estabelecimento.html?e=<id>#aba). O topo fica fixo (capa, nome, selos, amigos
// que frequentam e ações); o resto fica em abas para não poluir: Visão geral, Produtos e serviços, Agenda, Avaliações,
// Fotos e Perguntas. Dados: estabelecimentos-dados.js, estabelecimentos-catalogo.js e estabelecimentos-extras.js.
// Regra: créditos SoftLiving não valem nos estabelecimentos (só os benefícios para membros). Nada é enviado no protótipo.
const ES_ICONES = {
  local:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  hora:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fone:'<path d="M6 3h4l1 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 1v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  site:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>',
  acess:'<circle cx="12" cy="4.5" r="1.8"/><path d="M12 7v7h5l2 5M12 10h5"/><path d="M9 11.5a5 5 0 1 0 6.5 6.8"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  gosto:'<path d="M7 11v9H4v-9zM7 11l4-7c1.6 0 2.5 1.2 2 3l-1 3h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 16.8 20H7"/>',
  camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
};
const esIcone = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ES_ICONES[n]}</svg>`;
const siglaEst = n => n.replace(/&/g, '').split(/\s+/).filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('');
const esLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const esGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

const idEst = +new URLSearchParams(location.search).get('e') || 0;
const e = ESTABELECIMENTOS.find(x => x.id === idEst) || ESTABELECIMENTOS[0];
const x = extrasDe(e);
document.title = `${e.n} · SoftLiving (Protótipo · versão 2)`;

// O que a pessoa faz na página fica guardado por estabelecimento
const chave = k => `v2Est${k}:${e.id}`;
let noClube = esLer(chave('Clube'), false);
let vou = esLer(chave('Vou'), []);
let minhas = esLer(chave('Avaliacoes'), []);
let minhasPerguntas = esLer(chave('Perguntas'), []);

const ABAS = [['geral', 'Visão geral'], ['produtos', e.secao || 'Produtos e serviços'], ['agenda', 'Agenda'], ['avaliacoes', 'Avaliações'], ['fotos', 'Fotos'], ['perguntas', 'Perguntas']]
  .filter(([k]) => k !== 'produtos' || e.grupos);
let aba = ABAS.some(a => a[0] === location.hash.slice(1)) ? location.hash.slice(1) : 'geral';
let fotosDe = 'estabelecimento';

const pct = () => { const s = x.recomendam + minhas.filter(m => m.r).length, n = x.naoRecomendam + minhas.filter(m => !m.r).length; return Math.round(s / (s + n) * 100); };
const totalAval = () => x.recomendam + x.naoRecomendam + minhas.length;

document.getElementById('esPagina').innerHTML = `
  <a href="${LAYOUT_ROOT}vitrine.html" class="es-voltar">${icone('voltar')}Vitrine</a>
  <div class="es-capa" style="background-image:url('${fotoUrl(e.foto, 1400)}')"></div>
  <header class="es-topo">
    <span class="es-logo" style="color:${e.cor}">${siglaEst(e.n)}</span>
    <div class="es-nome">
      <h1>${e.n}</h1>
      <p>${e.cat} · ${e.bairro} · <span class="es-aberto ${abertoAgora(x) ? 'sim' : 'nao'}">${abertoAgora(x) ? 'Aberto agora' : 'Fechado agora'}</span></p>
      <div class="es-selos">
        <span>${esIcone('gosto')}Recomendado por ${x.recomendam} membros</span>
        <span>${esIcone('check')}Benefício verificado</span>
        ${x.acess.length >= 3 ? `<span>${esIcone('acess')}Acessível</span>` : ''}
      </div>
      ${x.amigos.length ? `<p class="es-amigos"><span class="es-amigos-av">${x.amigos.map(([n, c]) => `<i style="background:${c}">${n[0]}</i>`).join('')}</span>
        <b>${x.amigos[0][0]}</b>${x.amigos.length > 1 ? ` e mais ${x.amigos.length - 1} ${x.amigos.length === 2 ? 'amigo' : 'amigos'}` : ''} já ${x.amigos.length > 1 ? 'foram' : 'foi'} aqui</p>` : ''}
      <div class="es-acoes">
        <button type="button" class="btn" id="esReservar">${esIcone('hora')}${x.reserva.rotulo}</button>
        <span class="es-comunidade" id="esComunidade"></span>
        <button type="button" class="btn ghost" id="esSalvar">${icone('salvar')}Salvar</button>
        ${e.endereco ? `<a href="#" class="btn ghost" id="esChegar">${esIcone('local')}Como chegar</a>` : ''}
      </div>
    </div>
  </header>
  <nav class="seg es-abas" id="esAbas" role="tablist" aria-label="Seções do estabelecimento"></nav>
  <div id="esAba"></div>`;

// ===== Abas =====
const infosLista = [['local', e.endereco], ['fone', e.telefone], ['site', e.site]].filter(([, v]) => v);
const RENDER = {
  geral(){
    const hoje = new Date().getDay();
    return `
    <div class="es-corpo">
      <div>
        <section class="es-sobre"><h2>Sobre</h2><p>${e.sobre || e.d}</p></section>
        <section class="es-equipe"><h2>Quem atende</h2>${x.equipe.map(([n, f, d]) => `
          <div class="es-pessoa"><span class="av-col" style="background:${e.cor}">${n.replace(/^(Dra?\.) /, '').split(' ').slice(0, 2).map(p => p[0]).join('')}</span><div><b>${n}</b><small>${f}</small><p>${d}</p></div></div>`).join('')}</section>
        <section class="es-clube ${noClube ? 'dentro' : ''}">
          <div><span class="es-clube-rotulo">Clube de frequentadores</span><h2>${x.clube}</h2>
            <p>${x.clubeMembros + (noClube ? 1 : 0)} membros. Um grupo fechado para quem frequenta, com vantagens só para o clube:</p>
            <ul>${x.ofertas.map(o => `<li>${esIcone('check')}${o}</li>`).join('')}</ul></div>
          <button type="button" class="btn ${noClube ? 'ghost' : ''}" id="esClube">${noClube ? 'Você está no clube · Sair' : 'Entrar no clube'}</button>
        </section>
        <section class="es-relacionados"><h2>Na SoftLiving</h2>${x.relacionados.map(([t, onde]) => `
          <a href="${urlPagina(onde)}" class="es-rel">${onde === 'grupos' ? icone('grupos') : icone('conteudos')}<span><small>${onde === 'grupos' ? 'Grupo' : 'Conteúdo'}</small><b>${t}</b></span></a>`).join('')}</section>
      </div>
      <aside class="es-lado">
        <div class="es-beneficio"><span class="es-ben-rotulo">${icone('presente')}Benefício para membros</span><b>${e.b}</b>${e.beneficioDet ? `<p>${e.beneficioDet.replace('SoftLiving', LOGO)}</p>` : ''}</div>
        <div class="es-horario"><h3>${esIcone('hora')}Horário</h3>${DIAS_SEMANA.map((d, i) => `
          <p class="${i === hoje ? 'hoje' : ''}"><span>${d}</span><span>${x.dias[i] ? (x.abre === 0 && x.fecha === 24 ? '24 horas' : `${horaTxt(x.abre)} às ${horaTxt(x.fecha)}`) : 'Fechado'}</span></p>`).join('')}</div>
        ${infosLista.length ? `<ul class="es-infos">${infosLista.map(([ic, v]) => `<li>${esIcone(ic)}<span>${v}</span></li>`).join('')}</ul>` : ''}
        <div class="es-acess"><h3>${esIcone('acess')}Acessibilidade e como chegar</h3><ul>${x.acess.map(a => `<li>${esIcone('check')}${a}</li>`).join('')}</ul><p>${x.chegar}</p></div>
        ${htmlExtras(e)}
      </aside>
    </div>`;
  },
  produtos(){ return htmlCatalogo(e); },
  agenda(){
    return `<section class="es-agenda"><h2>Agenda</h2><p class="es-sub">Encontros e eventos abertos aos membros.</p>${x.eventos.map((ev, i) => `
      <div class="es-evento"><span class="es-data"><b>${ev.dia}</b><small>${ev.mes}</small></span>
        <div><b>${ev.t}</b><p>${ev.d}</p><small>${ev.quando}</small></div>
        <button type="button" class="btn ${vou.includes(i) ? 'ghost' : ''}" data-vou="${i}">${vou.includes(i) ? `${esIcone('check')}Confirmado` : 'Quero ir'}</button></div>`).join('')}
      ${e.novidades ? `<h3 class="es-sec3">Novidades</h3>${e.novidades.map(([t, d]) => `<div class="cm-novidade"><b>${t}</b><p>${d}</p></div>`).join('')}` : ''}
    </section>`;
  },
  avaliacoes(){
    const lista = [...minhas.map(m => ['Você', 'sua avaliação', m.t, m.r, null]), ...x.avaliacoes.map(([q, g, t], i) => [q, g, t, true, i === 0 ? `Obrigado pelo carinho, ${q.split(' ')[0]}! Esperamos você de volta.` : null])];
    return `<section class="es-aval">
      <div class="es-aval-resumo"><b>${pct()}%</b><span>recomendam<br><small>${totalAval()} avaliações de membros</small></span></div>
      <div class="es-aval-lista">${lista.map(([q, g, t, r, resp]) => `
        <article class="es-aval-item"><p class="es-aval-quem"><b>${q}</b> · ${g.startsWith('sua') ? g : 'do ' + g}<span class="${r ? 'sim' : 'nao'}">${r ? `${esIcone('gosto')}Recomenda` : 'Não recomenda'}</span></p>
          <p>“${t.replace(/</g, '&lt;')}”</p>${resp ? `<div class="es-resposta"><b>Resposta de ${e.n}</b><p>${resp}</p></div>` : ''}</article>`).join('')}</div>
      <form class="es-form" id="esAvaliar">
        <h3>Deixe sua avaliação</h3>
        <div class="seg" role="radiogroup"><button type="button" class="on" data-rec="1">Recomendo</button><button type="button" data-rec="0">Não recomendo</button></div>
        <textarea name="texto" rows="3" placeholder="Conte como foi, com suas palavras" required></textarea>
        <button type="submit" class="btn">Publicar avaliação</button>
        <small>Só membros que foram ao estabelecimento ou usaram o benefício podem avaliar.</small>
      </form>
    </section>`;
  },
  fotos(){
    const lista = fotosDe === 'membros' ? x.fotosMembros : x.fotos;
    return `<section class="es-fotos"><div class="es-fotos-topo"><h2>Fotos</h2>
      <div class="seg">${[['estabelecimento', 'Do estabelecimento'], ['membros', 'Dos membros']].map(([k, l]) => `<button type="button" class="${k === fotosDe ? 'on' : ''}" data-fotos="${k}">${l}</button>`).join('')}</div></div>
      <div class="es-galeria">${lista.map((f, i) => `<button type="button" class="es-foto" data-foto="${i}" aria-label="Ampliar foto ${i + 1}"><img src="${fotoUrl(f, 700)}" alt="" loading="lazy"></button>`).join('')}</div>
      ${fotosDe === 'membros' ? `<button type="button" class="btn ghost" id="esEnviarFoto">${esIcone('camera')}Enviar uma foto</button>` : ''}
    </section>`;
  },
  perguntas(){
    const lista = [...minhasPerguntas.map(p => [p.replace(/</g, '&lt;'), null]), ...x.perguntas];
    return `<section class="es-perg"><h2>Perguntas e respostas</h2>${lista.map(([p, r]) => `
      <div class="es-perg-item"><p class="es-p"><b>P:</b> ${p}</p>${r ? `<p class="es-r"><b>${e.n}:</b> ${r}</p>` : '<p class="es-r es-aguardando">Aguardando resposta do estabelecimento</p>'}</div>`).join('')}
      <form class="es-form" id="esPerguntar"><h3>Faça uma pergunta</h3><textarea name="texto" rows="2" placeholder="Ex.: Tem estacionamento?" required></textarea><button type="submit" class="btn">Enviar pergunta</button><small>A resposta fica visível para todos os membros.</small></form>
    </section>`;
  },
};
function renderAba(){
  document.getElementById('esAbas').innerHTML = ABAS.map(([k, l]) => `<button type="button" role="tab" class="${k === aba ? 'on' : ''}" aria-selected="${k === aba}" data-aba="${k}">${l}</button>`).join('');
  document.getElementById('esAba').innerHTML = RENDER[aba]();
}

// ===== Ações =====
document.getElementById('esAbas').addEventListener('click', ev => {
  const b = ev.target.closest('[data-aba]'); if(!b) return;
  aba = b.dataset.aba; history.replaceState(null, '', '#' + aba); renderAba();
});
document.getElementById('esAba').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.id === 'esClube'){ noClube = !noClube; esGravar(chave('Clube'), noClube); mostrarAviso(noClube ? `Você entrou no ${x.clube}` : `Você saiu do ${x.clube}`); renderAba(); }
  else if(b.dataset.vou){ const i = +b.dataset.vou; vou = vou.includes(i) ? vou.filter(v => v !== i) : [...vou, i]; esGravar(chave('Vou'), vou); mostrarAviso(vou.includes(i) ? 'Presença confirmada' : 'Presença cancelada'); renderAba(); }
  else if(b.dataset.fotos){ fotosDe = b.dataset.fotos; renderAba(); }
  else if(b.dataset.foto){ abrirFoto(+b.dataset.foto); }
  else if(b.id === 'esEnviarFoto'){ mostrarAviso('Enviar foto: fora deste protótipo'); }
  else if(b.dataset.rec){ b.parentElement.querySelectorAll('button').forEach(o => o.classList.toggle('on', o === b)); }
});
document.getElementById('esAba').addEventListener('submit', ev => {
  ev.preventDefault();
  const f = ev.target, t = f.texto.value.trim(); if(!t) return;
  if(f.id === 'esAvaliar'){ minhas.unshift({ t, r:f.querySelector('[data-rec].on').dataset.rec === '1' }); esGravar(chave('Avaliacoes'), minhas); mostrarAviso('Avaliação publicada'); }
  else { minhasPerguntas.unshift(t); esGravar(chave('Perguntas'), minhasPerguntas); mostrarAviso('Pergunta enviada ao estabelecimento'); }
  renderAba();
});

// Galeria em tela cheia, com setas
const lightbox = document.createElement('div');
lightbox.className = 'es-lightbox'; lightbox.hidden = true;
lightbox.innerHTML = `<button type="button" class="es-lb-fechar" aria-label="Fechar">✕</button><button type="button" class="es-lb-seta ant" aria-label="Foto anterior">${icone('voltar')}</button><img alt=""><button type="button" class="es-lb-seta prox" aria-label="Próxima foto">${icone('voltar')}</button><p></p>`;
document.body.appendChild(lightbox);
let fotoAtual = 0;
function abrirFoto(i){
  const lista = fotosDe === 'membros' ? x.fotosMembros : x.fotos;
  fotoAtual = (i + lista.length) % lista.length;
  lightbox.querySelector('img').src = fotoUrl(lista[fotoAtual], 1600);
  lightbox.querySelector('p').textContent = `${fotoAtual + 1} de ${lista.length} · ${fotosDe === 'membros' ? 'foto de membro' : e.n}`;
  lightbox.hidden = false;
}
lightbox.addEventListener('click', ev => {
  if(ev.target.closest('.ant')) abrirFoto(fotoAtual - 1);
  else if(ev.target.closest('.prox')) abrirFoto(fotoAtual + 1);
  else if(ev.target.closest('.es-lb-fechar') || ev.target === lightbox) lightbox.hidden = true;
});
document.addEventListener('keydown', ev => {
  if(lightbox.hidden) return;
  if(ev.key === 'Escape') lightbox.hidden = true;
  if(ev.key === 'ArrowLeft') abrirFoto(fotoAtual - 1);
  if(ev.key === 'ArrowRight') abrirFoto(fotoAtual + 1);
});

// Reservar ou agendar: janela com dia, horário e pessoas (ou serviço) e confirmação
const reserva = document.createElement('div');
reserva.className = 'es-modal'; reserva.hidden = true;
document.body.appendChild(reserva);
function abrirReserva(){
  const hoje = new Date();
  const dias = [...Array(7)].map((_, i) => { const d = new Date(hoje); d.setDate(hoje.getDate() + i + 1); return d; }).filter(d => x.dias[d.getDay()]).slice(0, 5);
  const horas = x.abre === 0 ? ['10h', '12h', '14h', '16h'] : [x.abre + 1, x.abre + 3, Math.min(x.fecha - 2, x.abre + 6), x.fecha - 1].map(h => `${h}h`);
  const opcoes = x.reserva.opcoes || (e.grupos ? e.grupos.flatMap(([, itens]) => itens.map(i => i[0])).slice(0, 6) : ['Atendimento']);
  const chips = (nome, lista) => `<div class="es-chips" data-grupo="${nome}">${lista.map((v, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-valor="${v}">${v}</button>`).join('')}</div>`;
  reserva.innerHTML = `<div class="es-modal-caixa" role="dialog" aria-modal="true" aria-label="${x.reserva.rotulo}">
    <button type="button" class="es-lb-fechar" data-fechar aria-label="Fechar">✕</button>
    <h2>${x.reserva.rotulo}</h2><p class="es-sub">${e.n}</p>
    <h3>${x.reserva.pergunta}</h3>${chips('opcao', opcoes)}
    <h3>Qual dia?</h3>${chips('dia', dias.map(d => `${DIAS_SEMANA[d.getDay()].slice(0, 3)} ${d.getDate()}/${d.getMonth() + 1}`))}
    <h3>Qual horário?</h3>${chips('hora', horas)}
    <p class="es-lembrete">${icone('presente')}<span>Mostre sua carteira de membro no dia para ganhar: <b>${e.b}</b></span></p>
    <button type="button" class="btn es-confirmar" data-confirmar>Confirmar pedido</button>
  </div>`;
  reserva.hidden = false;
}
reserva.addEventListener('click', ev => {
  const b = ev.target.closest('button');
  if(ev.target === reserva || (b && 'fechar' in b.dataset)){ reserva.hidden = true; return; }
  if(!b) return;
  if(b.dataset.valor){ b.parentElement.querySelectorAll('button').forEach(o => o.classList.toggle('on', o === b)); return; }
  if('confirmar' in b.dataset){
    const v = g => reserva.querySelector(`[data-grupo="${g}"] .on`).dataset.valor;
    reserva.querySelector('.es-modal-caixa').innerHTML = `<button type="button" class="es-lb-fechar" data-fechar aria-label="Fechar">✕</button>
      <div class="es-ok">${esIcone('check')}</div><h2>Pedido enviado</h2>
      <p class="es-sub"><b>${v('opcao')}</b> · ${v('dia')} às ${v('hora')}</p>
      <p>${e.n} vai confirmar pelo telefone ou e-mail. No protótipo, nada é enviado de verdade.</p>
      <button type="button" class="btn" data-fechar>Fechar</button>`;
  }
});
document.addEventListener('keydown', ev => { if(ev.key === 'Escape' && !reserva.hidden) reserva.hidden = true; });
document.getElementById('esReservar').addEventListener('click', abrirReserva);

// Salvar, como chegar e Minhas Comunidades (incluir / excluir)
const salvar = document.getElementById('esSalvar');
salvar.addEventListener('click', () => {
  const on = salvar.classList.toggle('on');
  salvar.lastChild.textContent = on ? 'Salvo' : 'Salvar';
  mostrarAviso(on ? `${e.n} salvo nos seus favoritos` : 'Removido dos favoritos');
});
const ES_CHECK = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function renderBotaoComunidade(){
  const dentro = estNasComunidades().includes(e.id);
  document.getElementById('esComunidade').innerHTML = dentro
    ? `<a href="${urlPagina('comunidades')}?est=${e.id}" class="btn es-dentro" title="Ver em Minhas Comunidades">${ES_CHECK}Em Minhas Comunidades</a><button type="button" class="round es-excluir" data-acao="excluir" aria-label="Excluir de Minhas Comunidades" title="Excluir de Minhas Comunidades">✕</button>`
    : `<button type="button" class="btn ghost" data-acao="incluir">${icone('comunidades')}Incluir em Minhas Comunidades</button>`;
}
document.getElementById('esComunidade').addEventListener('click', ev => {
  const b = ev.target.closest('[data-acao]'); if(!b) return;
  const incluir = b.dataset.acao === 'incluir';
  definirEstNasComunidades(e.id, incluir);
  renderBotaoComunidade();
  mostrarAviso(incluir ? `${e.n} incluído em Minhas Comunidades` : `${e.n} excluído de Minhas Comunidades`);
});
const chegar = document.getElementById('esChegar');
if(chegar) chegar.addEventListener('click', ev => { ev.preventDefault(); aba = 'geral'; renderAba(); document.querySelector('.es-acess').scrollIntoView({ behavior:'smooth', block:'center' }); });
renderBotaoComunidade();
renderAba();
