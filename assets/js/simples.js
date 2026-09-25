// ===== Modo simples (simples.html) =====
// Para quem tem pouca familiaridade com tecnologia: uma pergunta por tela, 6 opções grandes na tela inicial,
// um conteúdo por vez, letra maior (ajustável) e sempre o mesmo botão de voltar.
// Cada tela tem um endereço (#conteudos, #grupo/3...), então o botão "voltar" do navegador também funciona.
// Usa os mesmos dados do modo completo: CONTEUDOS (conteudos-dados.js) e GRUPOS (grupos-dados.js).
(function(){
  const sm = document.getElementById('sm');
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch(e){} };
  const ler = k => { try { return localStorage.getItem(k); } catch(e){ return null; } };

  // Preferência de modo: quem abre o modo simples passa a entrar nele pelo index.html
  guardar('modoPreferido', 'simples');
  document.getElementById('smModoCompleto').addEventListener('click', () => guardar('modoPreferido', 'completo'));

  // Tamanho da letra: 4 níveis, guardado no navegador
  const ESCALAS = [1, 1.12, 1.25, 1.4];
  let nivel = Math.min(ESCALAS.length - 1, Math.max(0, +ler('smEscala') || 0));
  const aplicarEscala = () => { document.body.style.setProperty('--sm-escala', ESCALAS[nivel]); guardar('smEscala', nivel); };
  document.querySelectorAll('[data-escala]').forEach(b => b.addEventListener('click', () => {
    nivel = Math.min(ESCALAS.length - 1, Math.max(0, nivel + +b.dataset.escala)); aplicarEscala();
  }));
  aplicarEscala();

  // Saldo: mesmo cálculo do modo completo (saldo fictício + bônus ganhos nas pesquisas)
  const saldo = () => { let b = 0; try { b = +sessionStorage.getItem('bonusCreditos') || 0; } catch(e){} return 41 + b; };

  const ic = nome => ICON[nome] || ICON.book;
  const voltar = (destino, rotulo) => `<a class="sm-back" href="#${destino}">${ic('chevron')} ${rotulo}</a>`;
  const titulo = t => `<h1 class="sm-title">${t}</h1>`;
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  // Assuntos (sub-segmentos) de Ler conteúdos: "Todos" + as categorias dos conteúdos, cada uma com um ícone
  const ICONE_TEMA = { 'Saúde mental e qualidade de vida':'brain', 'Saúde e bem-estar físico':'activity', 'Turismo e viagem':'map',
    'Estilo de vida e consumo':'building', 'Tecnologia e serviços digitais':'robot', 'SoftLiving':'star' };
  const TEMAS = [{ nome:'Todos os assuntos', icon:'book' }, ...[...new Set(CONTEUDOS.map(x => x.cat))].map(nome => ({ nome, icon: ICONE_TEMA[nome] || 'book' }))];
  const conteudosDoTema = c => CONTEUDOS.map((item, i) => ({ item, i })).filter(({ item }) => c === 0 || item.cat === (TEMAS[c] || {}).nome);
  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;

  // ---------- dados de exemplo das telas que ainda não existem no modo completo ----------
  const PESSOAS = [
    { n:'Luciana Russi', sobre:'Gosta de leitura e caminhadas' },
    { n:'Maria Helena Sobral', sobre:'Participa do Clube do Livro' },
    { n:'Claudio Brito', sobre:'Adora cinema e música' },
    { n:'Bernardo Leitão', sobre:'Colunista de tecnologia' },
    { n:'Ângela Senna', sobre:'Colunista de longevidade' },
  ];
  const conversas = PESSOAS.map(p => [{ eu:false, t:`Olá, Rafael! Que bom te encontrar por aqui.` }]);
  const ENCONTROS = [
    { dia:'04', mes:'OUT', t:'Caminhada no Aterro do Flamengo', quando:'Sábado, 8h', onde:'Rio de Janeiro · Posto 2', ir:false },
    { dia:'11', mes:'OUT', t:'Café do Clube do Livro', quando:'Sábado, 15h', onde:'Livraria parceira · Botafogo', ir:false },
    { dia:'18', mes:'OUT', t:'Oficina: celular sem golpes', quando:'Sábado, 10h', onde:'Online, pelo computador ou celular', ir:false },
    { dia:'25', mes:'OUT', t:'Sessão de cinema e conversa', quando:'Sábado, 16h', onde:'Cinema parceiro · Centro', ir:false },
  ];
  const mensagensGrupo = GRUPOS.map(g => [
    { a:'Moderação', t:`Bem-vindos ao ${g.t}! Contem um pouco sobre vocês.` },
    { a:'Maria Helena Sobral', t:'Oi, pessoal! Feliz de estar aqui.' },
  ]);
  const avatar = nome => { const p = nome.split(' '); return `<span class="sm-av" style="background:${CT_PALETA[[...nome].reduce((s, c) => s + c.charCodeAt(0), 0) % CT_PALETA.length]}">${(p[0][0] + p[p.length - 1][0]).toUpperCase()}</span>`; };

  // ---------- telas ----------
  const TELAS = {
    inicio(){
      const opcoes = [['conteudos','book','Ler conteúdos'], ['grupos','users','Meus grupos'], ['conversar','chat','Conversar'],
                      ['encontros','calendar','Encontros'], ['carteira','card','Minha carteira'], ['ajuda','question','Pedir ajuda']];
      return `
        <p class="sm-hello">${saudacao}, Rafael</p>
        <p class="sm-lead">O que você quer fazer hoje?</p>
        <div class="sm-grid">${opcoes.map(([h, i, t]) => `<a class="sm-big" href="#${h}">${ic(i)}<span>${t}</span></a>`).join('')}</div>`;
    },

    // Ler conteúdos: primeiro a pessoa escolhe o assunto; depois vê os conteúdos dele, um por vez
    conteudos(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Ler conteúdos')}
        <p class="sm-lead">Sobre qual assunto você quer ler?</p>
        <div class="sm-list">${TEMAS.map((t, c) => `
          <a class="sm-row" href="#tema/${c}-0">${ic(t.icon)}<span><b>${t.nome}</b><small>${plural(conteudosDoTema(c).length, 'conteúdo', 'conteúdos')}</small></span>${ic('chevron')}</a>`).join('')}
        </div>`;
    },

    // tema/<assunto>-<posição>
    tema(arg = '0-0'){
      const [c, pos] = arg.split('-').map(Number), lista = conteudosDoTema(c);
      if(!lista.length) return TELAS.conteudos();
      const k = ((pos % lista.length) + lista.length) % lista.length, { item:x, i } = lista[k];
      const pago = x.badge === 'premium';
      return `${voltar('conteudos', 'Voltar para os assuntos')}${titulo(TEMAS[c].nome)}
        <article class="sm-card">
          <p class="sm-meta">Conteúdo ${k + 1} de ${lista.length} · ${pago ? `usa ${plural(x.credits, 'crédito', 'créditos')}` : 'grátis'}</p>
          <h2 class="sm-card-title">${x.t}</h2>
          <p class="sm-text">${x.e}</p>
          <p class="sm-meta">Por ${x.a}</p>
          <div class="sm-actions">
            <a class="sm-btn sm-primary" href="#ler/${i}-${c}-${k}">${pago ? `Ler com ${plural(x.credits, 'crédito', 'créditos')}` : 'Ler agora'}</a>
            ${lista.length > 1 ? `<a class="sm-btn" href="#tema/${c}-${k + 1}">Próximo ${ic('chevron')}</a>` : ''}
          </div>
        </article>
        ${k > 0 ? `<a class="sm-link" href="#tema/${c}-${k - 1}">Ver o conteúdo anterior</a>` : ''}`;
    },

    // ler/<conteúdo>-<assunto>-<posição no assunto>
    ler(arg = ''){
      const [i, c = 0, k = 0] = arg.split('-').map(Number), x = CONTEUDOS[i];
      if(!x) return TELAS.conteudos();
      const total = conteudosDoTema(c).length;
      return `${voltar(`tema/${c}-${k}`, `Voltar para ${TEMAS[c].nome}`)}
        <article class="sm-card sm-reading">
          <p class="sm-meta">${x.cat} · Por ${x.a}</p>
          <h1 class="sm-title">${x.t}</h1>
          <p class="sm-text">${x.e}</p>
          <p class="sm-text">Este é um protótipo: aqui entra o texto completo do artigo, em letra grande e com espaço entre os parágrafos, para ler com calma.</p>
          ${total > 1 ? `<div class="sm-actions"><a class="sm-btn sm-primary" href="#tema/${c}-${k + 1}">Ler o próximo ${ic('chevron')}</a></div>` : ''}
        </article>`;
    },

    grupos(){
      const meus = GRUPOS.map((g, i) => ({ ...g, i })).filter(g => g.participando);
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Meus grupos')}
        <div class="sm-list">${meus.map(g => `
          <a class="sm-row" href="#grupo/${g.i}">${ic(g.icon)}<span><b>${g.t}</b><small>${g.membros} membros${g.novos ? ` · ${g.novos} mensagens novas` : ''}</small></span>${ic('chevron')}</a>`).join('')
          || '<p class="sm-text">Você ainda não participa de nenhum grupo.</p>'}
        </div>
        <a class="sm-btn sm-wide" href="#outros-grupos">${ic('plus')} Conhecer outros grupos</a>`;
    },

    'outros-grupos'(){
      const outros = GRUPOS.map((g, i) => ({ ...g, i })).filter(g => !g.participando);
      return `${voltar('grupos', 'Voltar para meus grupos')}${titulo('Conhecer outros grupos')}
        <div class="sm-list">${outros.map(g => `
          <div class="sm-row sm-row-static">${ic(g.icon)}<span><b>${g.t}</b><small>${g.d}</small></span>
            <button type="button" class="sm-btn sm-primary sm-small" data-participar="${g.i}">Participar</button></div>`).join('')
          || '<p class="sm-text">Você já participa de todos os grupos.</p>'}
        </div>`;
    },

    grupo(i){
      const g = GRUPOS[+i]; if(!g) return TELAS.grupos();
      return `${voltar('grupos', 'Voltar para meus grupos')}${titulo(g.t)}
        <p class="sm-text">${g.d}</p>
        <div class="sm-card">
          <h2 class="sm-card-title">Mensagens do grupo</h2>
          ${mensagensGrupo[+i].map(m => `<div class="sm-msg">${avatar(m.a)}<div><b>${m.a}</b><p>${m.t}</p></div></div>`).join('')}
          ${g.participando ? `
            <label class="sm-label" for="smEscrever">Escreva para o grupo</label>
            <textarea id="smEscrever" rows="3" placeholder="Escreva aqui a sua mensagem"></textarea>
            <button type="button" class="sm-btn sm-primary sm-wide" data-enviar-grupo="${i}">Enviar mensagem</button>`
          : `<button type="button" class="sm-btn sm-primary sm-wide" data-participar="${i}">Participar deste grupo</button>`}
        </div>`;
    },

    conversar(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Conversar')}
        <p class="sm-lead">Com quem você quer conversar?</p>
        <div class="sm-list">${PESSOAS.map((p, i) => `
          <a class="sm-row" href="#conversa/${i}">${avatar(p.n)}<span><b>${p.n}</b><small>${p.sobre}</small></span>${ic('chevron')}</a>`).join('')}
        </div>`;
    },

    conversa(i){
      const p = PESSOAS[+i]; if(!p) return TELAS.conversar();
      return `${voltar('conversar', 'Voltar para as conversas')}${titulo(p.n)}
        <div class="sm-card">
          <div class="sm-chat">${conversas[+i].map(m => `<p class="sm-bubble ${m.eu ? 'eu' : ''}">${m.t}</p>`).join('')}</div>
          <label class="sm-label" for="smEscrever">Sua mensagem</label>
          <textarea id="smEscrever" rows="3" placeholder="Escreva aqui"></textarea>
          <button type="button" class="sm-btn sm-primary sm-wide" data-enviar-conversa="${i}">Enviar mensagem</button>
        </div>`;
    },

    encontros(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Encontros')}
        <p class="sm-lead">Próximos encontros da comunidade</p>
        <div class="sm-list">${ENCONTROS.map((e, i) => `
          <div class="sm-row sm-row-static sm-event">
            <span class="sm-date"><b>${e.dia}</b><small>${e.mes}</small></span>
            <span><b>${e.t}</b><small>${e.quando} · ${e.onde}</small></span>
            ${e.ir ? `<span class="sm-ok">${ic('shield')} Confirmado</span>` : `<button type="button" class="sm-btn sm-primary sm-small" data-ir="${i}">Quero ir</button>`}
          </div>`).join('')}
        </div>`;
    },

    carteira(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Minha carteira')}
        <div class="sm-card sm-center">
          <p class="sm-meta">Você tem</p>
          <p class="sm-balance">${saldo()} créditos</p>
          <p class="sm-text">Os créditos servem para ler conteúdos especiais e participar de clubes.</p>
        </div>
        <div class="sm-card">
          <h2 class="sm-card-title">Como ganhar créditos</h2>
          <ul class="sm-steps">
            <li><b>Ao se cadastrar:</b> 20 créditos de bônus</li>
            <li><b>Na primeira recarga:</b> R$50 viram 50 créditos, mais 50 de bônus</li>
            <li><b>Ao indicar um amigo:</b> 5 créditos de bônus</li>
          </ul>
        </div>
        <a class="sm-btn sm-primary sm-wide" href="#recarga">Colocar créditos</a>`;
    },

    recarga(){
      return `${voltar('carteira', 'Voltar para a carteira')}${titulo('Colocar créditos')}
        <div class="sm-card"><p class="sm-text">Neste protótipo a recarga ainda não funciona. No portal, aqui você escolhe o valor e paga com Pix, em poucos passos.</p></div>`;
    },

    ajuda(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Pedir ajuda')}
        <div class="sm-grid sm-grid-1">
          <a class="sm-big" href="#ajuda-usar">${ic('book')}<span>Como usar o SoftLiving</span></a>
          <a class="sm-big" href="#ajuda-letra">${ic('search')}<span>Aumentar a letra</span></a>
          <a class="sm-big" href="#ajuda-mensagem">${ic('chat')}<span>Mandar uma mensagem para a equipe</span></a>
        </div>`;
    },

    'ajuda-usar'(){
      return `${voltar('ajuda', 'Voltar para a ajuda')}${titulo('Como usar o SoftLiving')}
        <div class="sm-card"><ol class="sm-steps">
          <li>Na tela inicial, toque no que você quer fazer.</li>
          <li>Cada tela mostra uma coisa de cada vez.</li>
          <li>Para voltar, use sempre o botão <b>Voltar</b>, no alto da tela.</li>
          <li>Se a letra estiver pequena, toque em <b>A+</b>, no topo.</li>
          <li>Se quiser ver o portal completo, toque em <b>Modo completo</b>.</li>
        </ol></div>`;
    },

    'ajuda-letra'(){
      return `${voltar('ajuda', 'Voltar para a ajuda')}${titulo('Aumentar a letra')}
        <div class="sm-card sm-center">
          <p class="sm-text">Toque nos botões abaixo até a letra ficar confortável para você.</p>
          <div class="sm-actions sm-actions-center">
            <button type="button" class="sm-btn" data-escala="-1">Diminuir (A−)</button>
            <button type="button" class="sm-btn sm-primary" data-escala="1">Aumentar (A+)</button>
          </div>
        </div>`;
    },

    'ajuda-mensagem'(){
      return `${voltar('ajuda', 'Voltar para a ajuda')}${titulo('Mandar uma mensagem para a equipe')}
        <div class="sm-card" id="smForm">
          <label class="sm-label" for="smEscrever">Conte para nós o que aconteceu</label>
          <textarea id="smEscrever" rows="4" placeholder="Escreva aqui a sua dúvida"></textarea>
          <button type="button" class="sm-btn sm-primary sm-wide" data-enviar-equipe>Enviar mensagem</button>
        </div>`;
    },
  };

  // ---------- navegação ----------
  function mostrar(){
    const [rota, arg] = (location.hash.slice(1) || 'inicio').split('/');
    sm.innerHTML = (TELAS[rota] || TELAS.inicio)(arg);
    sm.querySelectorAll('[data-escala]').forEach(b => b.addEventListener('click', () => {
      nivel = Math.min(ESCALAS.length - 1, Math.max(0, nivel + +b.dataset.escala)); aplicarEscala();
    }));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', mostrar);

  // ---------- ações ----------
  sm.addEventListener('click', e => {
    const t = e.target.closest('button'); if(!t) return;
    const texto = () => (document.getElementById('smEscrever') || {}).value?.trim();
    if(t.dataset.participar !== undefined){ alternarParticipacao(GRUPOS[+t.dataset.participar], true); mostrar(); }
    else if(t.dataset.ir !== undefined){ ENCONTROS[+t.dataset.ir].ir = true; mostrar(); }
    else if(t.dataset.enviarGrupo !== undefined){ const m = texto(); if(!m) return; mensagensGrupo[+t.dataset.enviarGrupo].push({ a:'Rafael Barros', t:m }); mostrar(); }
    else if(t.dataset.enviarConversa !== undefined){
      const m = texto(); if(!m) return; const i = +t.dataset.enviarConversa;
      conversas[i].push({ eu:true, t:m }); mostrar();
      setTimeout(() => { conversas[i].push({ eu:false, t:'Que bom falar com você! Vamos combinar de nos ver num encontro?' }); if(location.hash === '#conversa/' + i) mostrar(); }, 1200);
    }
    else if(t.dataset.enviarEquipe !== undefined){
      if(!texto()) return;
      document.getElementById('smForm').innerHTML = '<p class="sm-text"><b>Mensagem enviada.</b> Nossa equipe vai responder por e-mail.</p>';
    }
  });

  CONTEUDOS.forEach(c => c.capa = c.capa || sorteiaDegrade());
  mostrar();
})();
