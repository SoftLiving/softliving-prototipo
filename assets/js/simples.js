// ===== VERSÃO 2 · Modo simples (simples.html), a partir do simples.js da versão 1 =====
// Mudanças da v2: fotos nos conteúdos, sem tempo de leitura (regra da v2), bônus de recarga atual, pessoas da página Amigos
// e "Modo completo" levando para a Início da v2.
// Ampliação (aprovada em 2026-09-27), sem perder a simplicidade: Novidades na tela inicial, guardar para ler depois,
// ouvir o texto, pedidos de amizade, indicar um amigo, Minhas comunidades, Benefícios e recarga em 3 passos.
// Para quem tem pouca familiaridade com tecnologia: uma pergunta por tela, 8 opções grandes na tela inicial,
// um conteúdo por vez, letra maior (ajustável) e sempre o mesmo botão de voltar.
// Cada tela tem um endereço (#conteudos, #grupo/3...), então o botão "voltar" do navegador também funciona.
// Usa os mesmos dados do modo completo: CONTEUDOS (conteudos-dados.js) e GRUPOS (grupos-dados.js).
(function(){
  const sm = document.getElementById('sm');
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch(e){} };
  const ler = k => { try { return localStorage.getItem(k); } catch(e){ return null; } };

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

  // Entrar e sair (login simulado, o mesmo do modo completo: login 123 e senha 123, guardado em v2Logado).
  // O botão do topo mostra "Entrar" ou "Sair"; sair pede confirmação, para ninguém sair sem querer.
  const logado = () => ler('v2Logado') === '1';
  const definirLogado = sim => { try { if(sim) localStorage.setItem('v2Logado', '1'); else localStorage.removeItem('v2Logado'); } catch(e){} };
  const atualizarConta = () => {
    const b = document.getElementById('smConta');
    b.textContent = logado() ? 'Sair' : 'Entrar';
    b.href = logado() ? '#sair' : '#entrar';
    b.classList.toggle('sm-top-entrar', !logado());
  };
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  // Assuntos (sub-segmentos) de Ler conteúdos: "Todos" + as categorias dos conteúdos, cada uma com um ícone
  const ICONE_TEMA = { 'Saúde mental e qualidade de vida':'brain', 'Saúde e bem-estar físico':'activity', 'Turismo e viagem':'map',
    'Estilo de vida e consumo':'building', 'Tecnologia e serviços digitais':'robot', 'SoftLiving':'star' };
  const TEMAS = [{ nome:'Todos os assuntos', icon:'book' }, ...[...new Set(CONTEUDOS.map(x => x.cat))].map(nome => ({ nome, icon: ICONE_TEMA[nome] || 'book' }))];
  const conteudosDoTema = c => CONTEUDOS.map((item, i) => ({ item, i })).filter(({ item }) => c === 0 || item.cat === (TEMAS[c] || {}).nome);
  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;

  // ---------- dados de exemplo das telas que ainda não existem no modo completo ----------
  const PESSOAS = [
    { n:'Alexandre Duarte', sobre:'Do grupo Amigos · gosta de caminhadas' },
    { n:'Helena Martins', sobre:'Do Clube do Vinho · adora viajar' },
    { n:'Marcos Teixeira', sobre:'Do Yoga & Meditação · gosta de ler' },
    { n:'Célia Ribeiro', sobre:'Do grupo Amigos · culinária e música' },
    { n:'Beatriz Nogueira', sobre:'Do Clube do Filme · cinema e teatro' },
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
  const PALETA = ['#013565', '#1F5519', '#2f8578', '#8a6414', '#b0513a', '#5b4b8a', '#7a3b52', '#3f6b8f'];
  const avatar = nome => { const p = nome.split(' '); return `<span class="sm-av" style="background:${PALETA[[...nome].reduce((s, c) => s + c.charCodeAt(0), 0) % PALETA.length]}">${(p[0][0] + p[p.length - 1][0]).toUpperCase()}</span>`; };
  const foto = (id, w) => id ? `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70` : '';
  const LOGO = '<span class="sig"><span class="soft">Soft</span><span class="living">Living</span></span>';
  const lerJSON = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
  const gravarJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

  // Guardar para ler depois: os mesmos salvos do modo completo (v2Salvos, pelo título do conteúdo)
  const SALVOS_INICIAIS = ['Na Suíça, um vinho para chamar de seu', 'A casa não precisa parecer decorada', 'Agente de IA anti-golpe'];
  const salvos = () => { const v = lerJSON('v2Salvos', null); return Array.isArray(v) ? v : [...SALVOS_INICIAIS]; };
  const alternarSalvo = titulo => { const l = salvos(); gravarJSON('v2Salvos', l.includes(titulo) ? l.filter(x => x !== titulo) : [...l, titulo]); };

  // Pedidos de amizade: os mesmos da página Amigos (v2Amigos guarda a situação de cada pessoa)
  const PEDIDOS = [
    { id:7, n:'Lúcia Campos', sobre:'Do Yoga & Meditação · 3 amigos em comum' },
    { id:8, n:'Roberto Freitas', sobre:'Do Clube do Vinho · 2 amigos em comum' },
  ];
  const situacao = id => (lerJSON('v2Amigos', {})[id]) || 'pedido';
  const pedidosPendentes = () => PEDIDOS.filter(p => situacao(p.id) === 'pedido');
  const responderPedido = (id, aceitar) => {
    const todos = lerJSON('v2Amigos', {}); todos[id] = aceitar ? 'amigo' : 'sugestao'; gravarJSON('v2Amigos', todos);
    const p = PEDIDOS.find(x => x.id === id);
    if(aceitar && !PESSOAS.some(x => x.n === p.n)){ PESSOAS.push({ n:p.n, sobre:p.sobre.split(' · ')[0] }); conversas.push([{ eu:false, t:'Oi, Rafael! Obrigada por aceitar.' }]); }
  };

  // Minhas comunidades: comunidades fechadas (DATA) e estabelecimentos incluídos (ESTABELECIMENTOS)
  const ORGS_ESTABELECIMENTO = ['hotel', 'restaurante', 'turismo', 'clinica', 'spa', 'petshop'];
  const COMUNIDADES_SM = Object.keys(DATA).filter(k => !ORGS_ESTABELECIMENTO.includes(k));
  const orgCompleta = k => { const o = DATA[k]; return o.audiences ? { ...o, ...Object.values(o.audiences)[0] } : o; };
  const estIncluidos = () => estNasComunidades().map(id => ESTABELECIMENTOS.find(x => x.id === id)).filter(Boolean);

  // Recarga: primeira recarga de R$50 ganha 50 de bônus; nas outras, a tabela progressiva
  const BONUS = { 20:0, 50:5, 100:15, 200:40 };
  const bonusDe = v => v === 50 ? 50 : BONUS[v];                         // no protótipo ainda não houve recarga

  // Ouvir o texto (voz do próprio navegador)
  const podeOuvir = 'speechSynthesis' in window;
  const pararLeitura = () => { if(podeOuvir) speechSynthesis.cancel(); };

  // ---------- telas ----------
  const TELAS = {
    entrar(){
      if(logado()) return `${voltar('inicio', 'Voltar ao início')}${titulo('Você já entrou')}
        <p class="sm-lead">Você já está na sua conta.</p><div class="sm-actions"><a class="sm-btn sm-primary" href="#inicio">Ir para o início ${ic('chevron')}</a></div>`;
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Entrar na sua conta')}
        <form class="sm-card sm-entrar" id="smEntrar" novalidate>
          <label class="sm-label" for="smLogin">Seu e-mail ou login</label>
          <input id="smLogin" name="login" type="text" autocomplete="username" placeholder="Digite aqui">
          <label class="sm-label" for="smSenha">Sua senha</label>
          <input id="smSenha" name="senha" type="password" autocomplete="current-password" placeholder="Digite aqui">
          <p class="sm-erro" id="smErro" role="alert" hidden>Login ou senha incorretos. Confira e tente de novo.</p>
          <div class="sm-actions"><button type="submit" class="sm-btn sm-primary">Entrar</button></div>
        </form>`;
    },
    sair(){
      if(!logado()) return `${voltar('inicio', 'Voltar ao início')}${titulo('Você saiu da conta')}
        <p class="sm-lead">Para voltar, é só tocar em Entrar.</p><div class="sm-actions"><a class="sm-btn sm-primary" href="#entrar">Entrar</a></div>`;
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Sair da conta?')}
        <p class="sm-lead">Você pode entrar de novo quando quiser.</p>
        <div class="sm-actions"><button type="button" class="sm-btn sm-primary" data-sair>Sim, sair</button><a class="sm-btn" href="#inicio">Continuar na conta</a></div>`;
    },
    inicio(){
      const opcoes = [['conteudos','book','Ler conteúdos'], ['grupos','users','Meus grupos'], ['conversar','chat','Conversar'],
                      ['encontros','calendar','Encontros'], ['comunidades','building','Minhas comunidades'], ['beneficios','gift','Benefícios'],
                      ['carteira','card','Minha carteira'], ['ajuda','question','Pedir ajuda']];
      // Novidades: até 3 avisos grandes, cada um levando direto ao assunto
      const sofia = CONTEUDOS.findIndex(c => c.a === 'Sofia Martellini');
      const novidades = [
        ...pedidosPendentes().slice(0, 1).map(p => ['conversar', 'users', `<b>${p.n}</b> quer ser sua amiga`]),
        ['grupo/1', 'chat', '<b>2 mensagens novas</b> no grupo Amigos'],
        ...(sofia >= 0 ? [[`ler/${sofia}-0-${sofia}`, 'book', '<b>Sofia Martellini</b> publicou uma coluna nova']] : []),
        ['carteira', 'gift', 'Você ganhou <b>5 créditos de bônus</b>'],
      ].slice(0, 3);
      return `
        <p class="sm-hello">${logado() ? `${saudacao}, Rafael` : `${saudacao}!`}</p>
        ${logado() ? '' : `<a class="sm-novidade sm-convite-entrar" href="#entrar">${ic('users')}<span><b>Entre na sua conta</b> para ver seus grupos, conversas e créditos</span>${ic('chevron')}</a>`}
        ${logado() ? `<section class="sm-novidades" aria-label="Novidades para você">
          <h2 class="sm-card-title">Novidades para você</h2>
          ${novidades.map(([h, i, t]) => `<a class="sm-novidade" href="#${h}">${ic(i)}<span>${t}</span>${ic('chevron')}</a>`).join('')}
        </section>` : ''}
        <p class="sm-lead">O que você quer fazer hoje?</p>
        <div class="sm-grid">${opcoes.map(([h, i, t]) => `<a class="sm-big" href="#${h}">${ic(i)}<span>${t}</span></a>`).join('')}</div>`;
    },

    // Ler conteúdos: primeiro a pessoa escolhe o assunto; depois vê os conteúdos dele, um por vez
    conteudos(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Ler conteúdos')}
        <p class="sm-lead">Sobre qual assunto você quer ler?</p>
        <a class="sm-row sm-row-destaque" href="#salvos">${ic('bookmark')}<span><b>Meus salvos</b><small>${plural(salvos().filter(t => CONTEUDOS.some(c => c.t === t)).length, 'conteúdo guardado', 'conteúdos guardados')} para ler depois</small></span>${ic('chevron')}</a>
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
          ${x.foto ? `<img class="sm-foto" src="${foto(x.foto, 900)}" alt="">` : ''}
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
      // Texto completo (conteudos-textos.js): parágrafos, e "## " vira intertítulo
      const texto = (typeof TEXTOS_COMPLETOS !== 'undefined' && TEXTOS_COMPLETOS[x.t]) || [x.e];
      return `${voltar(`tema/${c}-${k}`, `Voltar para ${TEMAS[c].nome}`)}
        <article class="sm-card sm-reading">
          ${x.foto ? `<img class="sm-foto" src="${foto(x.foto, 1200)}" alt="">` : ''}
          <p class="sm-meta">${x.cat} · Por ${x.a}</p>
          <h1 class="sm-title">${x.t}</h1>
          <p class="sm-lead">${x.e}</p>
          <div class="sm-actions sm-ler-acoes">
            <button type="button" class="sm-btn${salvos().includes(x.t) ? ' sm-marcado' : ''}" data-salvar="${i}">${ic('bookmark')} ${salvos().includes(x.t) ? 'Guardado para depois' : 'Guardar para ler depois'}</button>
            ${podeOuvir ? `<button type="button" class="sm-btn" data-ouvir="${i}">${ic('headphones')} Ouvir o texto</button>` : ''}
          </div>
          <p class="sm-demo">Texto de demonstração, criado para o protótipo.</p>
          ${texto.map(p => p.startsWith('## ') ? `<h2 class="sm-subtitle">${p.slice(3)}</h2>` : `<p class="sm-text">${p}</p>`).join('')}
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
      const pedidos = pedidosPendentes();
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Conversar')}
        ${pedidos.length ? `<div class="sm-card sm-pedidos"><h2 class="sm-card-title">Pedidos de amizade</h2>${pedidos.map(p => `
          <div class="sm-pedido">${avatar(p.n)}<span><b>${p.n} quer ser sua amiga</b><small>${p.sobre}</small></span>
            <div class="sm-actions"><button type="button" class="sm-btn sm-primary sm-small" data-aceitar="${p.id}">Aceitar</button><button type="button" class="sm-btn sm-small" data-recusar="${p.id}">Agora não</button></div></div>`).join('')}</div>` : ''}
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
            <li><b>Nas outras recargas:</b> de 10% a 20% de bônus (R$50 ganha 5, R$100 ganha 15, R$200 ganha 40)</li>
            <li><b>Ao indicar um amigo:</b> 5 créditos de bônus</li>
          </ul>
        </div>
        <a class="sm-btn sm-primary sm-wide" href="#recarga">Colocar créditos</a>
        <div class="sm-card sm-indicar">
          <h2 class="sm-card-title">Indique um amigo</h2>
          <p class="sm-text">Quando a pessoa entrar com o seu convite, você ganha <b>5 créditos de bônus</b> e ela ganha 20.</p>
          <p class="sm-meta">Seu código de convite</p>
          <p class="sm-codigo">74194EB9</p>
          <div class="sm-actions">
            <a class="sm-btn sm-primary sm-whats" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('Estou na SoftLiving, um portal sem anúncios para uma vida melhor. Entre com meu convite e ganhe 20 créditos de bônus: https://softliving.com.br/cadastro/boas-vindas?ref=74194EB9')}">Enviar pelo WhatsApp</a>
            <button type="button" class="sm-btn" data-copiar-convite>Copiar o convite</button>
          </div>
        </div>`;
    },

    // Recarga em 3 passos: 1) valor  2) pagar com Pix  3) pronto
    recarga(){
      return `${voltar('carteira', 'Voltar para a carteira')}${titulo('Colocar créditos')}
        <p class="sm-passo">Passo 1 de 3</p>
        <p class="sm-lead">Quanto você quer colocar?</p>
        <div class="sm-grid">${[20, 50, 100, 200].map(v => `
          <a class="sm-big sm-valor" href="#pagar/${v}"><span><b>R$${v}</b><small>${v} créditos${bonusDe(v) ? ` + ${bonusDe(v)} de bônus` : ''}</small></span></a>`).join('')}
        </div>
        <p class="sm-meta sm-center">Na primeira recarga, R$50 viram 50 créditos + 50 de bônus.</p>`;
    },
    pagar(v){
      v = +v; if(!BONUS.hasOwnProperty(v)) return TELAS.recarga();
      return `${voltar('recarga', 'Voltar e escolher outro valor')}${titulo('Pagar com Pix')}
        <p class="sm-passo">Passo 2 de 3</p>
        <div class="sm-card sm-center">
          <p class="sm-meta">Você vai pagar</p>
          <p class="sm-balance">R$${v}</p>
          <p class="sm-text">e receber <b>${v + bonusDe(v)} créditos</b>${bonusDe(v) ? ` (${v} + ${bonusDe(v)} de bônus)` : ''}.</p>
          <p class="sm-text">Copie o código abaixo e cole no aplicativo do seu banco, na opção <b>Pix Copia e Cola</b>.</p>
          <p class="sm-pix">00020126PIX.SOFTLIVING.DEMO${v}</p>
          <div class="sm-actions sm-actions-center">
            <button type="button" class="sm-btn" data-copiar-pix>Copiar o código Pix</button>
            <a class="sm-btn sm-primary" href="#pago/${v}">Já paguei</a>
          </div>
        </div>
        <p class="sm-demo">Demonstração: nenhum pagamento acontece no protótipo.</p>`;
    },
    pago(v){
      v = +v; if(!BONUS.hasOwnProperty(v)) return TELAS.recarga();
      return `${titulo('Pronto!')}
        <p class="sm-passo">Passo 3 de 3</p>
        <div class="sm-card sm-center">
          <p class="sm-balance">${ic('shield')}</p>
          <p class="sm-text"><b>Recebemos o seu pedido de R$${v}.</b> Os ${v + bonusDe(v)} créditos entram na sua carteira em alguns minutos.</p>
        </div>
        <a class="sm-btn sm-primary sm-wide" href="#inicio">Voltar ao início</a>`;
    },

    // Minhas comunidades: comunidades de que a pessoa faz parte e estabelecimentos que ela incluiu
    comunidades(){
      const est = estIncluidos();
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Minhas comunidades')}
        <p class="sm-lead">Avisos e encontros de cada uma</p>
        <div class="sm-list">${COMUNIDADES_SM.map(k => `
          <a class="sm-row" href="#comunidade/${k}">${ic(DATA[k].orgIcon)}<span><b>${DATA[k].name}</b><small>${DATA[k].orgType}</small></span>${ic('chevron')}</a>`).join('')}
        </div>
        ${est.length ? `<h2 class="sm-subtitle">Estabelecimentos que você incluiu</h2>
        <div class="sm-list">${est.map(e => `
          <a class="sm-row" href="#beneficio/${e.id}">${ic('store')}<span><b>${e.n}</b><small>${e.b}</small></span>${ic('chevron')}</a>`).join('')}</div>` : ''}`;
    },
    comunidade(k){
      if(!DATA[k] || ORGS_ESTABELECIMENTO.includes(k)) return TELAS.comunidades();
      const o = orgCompleta(k);
      return `${voltar('comunidades', 'Voltar para minhas comunidades')}${titulo(o.name)}
        ${o.notice ? `<div class="sm-card sm-aviso"><p class="sm-meta">${ic('warning')} Aviso</p><h2 class="sm-card-title">${o.notice.title}</h2><p class="sm-text">${o.notice.body}</p></div>` : ''}
        ${o.events && o.events.length ? `<h2 class="sm-subtitle">Próximos encontros</h2><div class="sm-list">${o.events.slice(0, 4).map(e => `
          <div class="sm-row sm-row-static"><span class="sm-date"><b>${e.day}</b><small>${e.month}</small></span><span><b>${e.t}</b><small>${e.time} · ${e.place}</small></span></div>`).join('')}</div>` : ''}
        <a class="sm-link" href="comunidades/inicio.html?org=${k}">Ver tudo no modo completo</a>`;
    },

    // Benefícios: uma vitrine enxuta, com o benefício para membros em destaque
    beneficios(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Benefícios')}
        <p class="sm-lead">Lugares com vantagens para quem é membro</p>
        <div class="sm-list">${ESTABELECIMENTOS.map(e => `
          <a class="sm-row sm-row-foto" href="#beneficio/${e.id}"><img src="${foto(e.foto, 200)}" alt=""><span><b>${e.b}</b><small>${e.n} · ${e.bairro}</small></span>${ic('chevron')}</a>`).join('')}
        </div>`;
    },
    beneficio(id){
      const e = ESTABELECIMENTOS.find(x => x.id === +id); if(!e) return TELAS.beneficios();
      const dentro = estNasComunidades().includes(e.id);
      const infos = [['pin', e.endereco], ['calendar', e.horario], ['phone', e.telefone]].filter(x => x[1]);
      return `${voltar('beneficios', 'Voltar para os benefícios')}${titulo(e.n)}
        <article class="sm-card">
          <img class="sm-foto" src="${foto(e.foto, 1000)}" alt="">
          <p class="sm-meta">${e.cat} · ${e.bairro}</p>
          <div class="sm-beneficio"><p class="sm-meta">${ic('gift')} Benefício para membros</p><p class="sm-card-title">${e.b}</p>${e.beneficioDet ? `<p class="sm-text">${e.beneficioDet}</p>` : ''}</div>
          <p class="sm-text">${e.sobre || e.d}</p>
          ${infos.length ? `<div class="sm-infos">${infos.map(([i, v]) => `<p>${ic(i)} ${v}</p>`).join('')}</div>` : ''}
          <button type="button" class="sm-btn ${dentro ? '' : 'sm-primary'} sm-wide" data-incluir-est="${e.id}">${dentro ? 'Tirar das minhas comunidades' : 'Incluir nas minhas comunidades'}</button>
        </article>`;
    },

    salvos(){
      const lista = salvos().map(t => CONTEUDOS.findIndex(c => c.t === t)).filter(i => i >= 0);
      return `${voltar('conteudos', 'Voltar para Ler conteúdos')}${titulo('Meus salvos')}
        ${lista.length ? `<div class="sm-list">${lista.map(i => `
          <a class="sm-row sm-row-foto" href="#ler/${i}-0-${i}"><img src="${foto(CONTEUDOS[i].foto, 200)}" alt=""><span><b>${CONTEUDOS[i].t}</b><small>Por ${CONTEUDOS[i].a}</small></span>${ic('chevron')}</a>`).join('')}</div>`
        : '<div class="sm-card"><p class="sm-text">Você ainda não guardou nenhum conteúdo. Na leitura, toque em <b>Guardar para ler depois</b>.</p></div>'}`;
    },

    ajuda(){
      return `${voltar('inicio', 'Voltar ao início')}${titulo('Pedir ajuda')}
        <div class="sm-grid sm-grid-1">
          <a class="sm-big" href="#ajuda-usar">${ic('book')}<span>Como usar a ${LOGO}</span></a>
          <a class="sm-big" href="#ajuda-letra">${ic('search')}<span>Aumentar a letra</span></a>
          <a class="sm-big" href="#ajuda-mensagem">${ic('chat')}<span>Mandar uma mensagem para a equipe</span></a>
        </div>`;
    },

    'ajuda-usar'(){
      return `${voltar('ajuda', 'Voltar para a ajuda')}${titulo(`Como usar a ${LOGO}`)}
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
    pararLeitura();
    const [rota, arg] = (location.hash.slice(1) || 'inicio').split('/');
    // "SoftLiving" escrito nos textos vira o logo em texto (fora de atributos)
    sm.innerHTML = (TELAS[rota] || TELAS.inicio)(arg).replace(/SoftLiving(?![^<>]*>)/g, LOGO);
    sm.querySelectorAll('[data-escala]').forEach(b => b.addEventListener('click', () => {
      nivel = Math.min(ESCALAS.length - 1, Math.max(0, nivel + +b.dataset.escala)); aplicarEscala();
    }));
    atualizarConta();
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
    else if(t.dataset.salvar !== undefined){ alternarSalvo(CONTEUDOS[+t.dataset.salvar].t); const y = scrollY; mostrar(); scrollTo(0, y); }
    else if(t.dataset.ouvir !== undefined){
      if(speechSynthesis.speaking){ pararLeitura(); t.innerHTML = `${ic('headphones')} Ouvir o texto`; return; }
      const x = CONTEUDOS[+t.dataset.ouvir];
      const texto = [x.t, x.e, ...((typeof TEXTOS_COMPLETOS !== 'undefined' && TEXTOS_COMPLETOS[x.t]) || [])].map(p => p.replace(/^## /, '')).join('. ');
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'pt-BR'; fala.rate = .95;
      fala.onend = () => { t.innerHTML = `${ic('headphones')} Ouvir o texto`; };
      speechSynthesis.speak(fala);
      t.innerHTML = `${ic('headphones')} Parar de ouvir`;
    }
    else if(t.dataset.aceitar !== undefined){ responderPedido(+t.dataset.aceitar, true); mostrar(); }
    else if(t.dataset.recusar !== undefined){ responderPedido(+t.dataset.recusar, false); mostrar(); }
    else if(t.dataset.incluirEst !== undefined){ const id = +t.dataset.incluirEst; definirEstNasComunidades(id, !estNasComunidades().includes(id)); mostrar(); }
    else if(t.dataset.copiarConvite !== undefined){
      if(navigator.clipboard) navigator.clipboard.writeText('Entre na SoftLiving com meu convite e ganhe 20 créditos de bônus: https://softliving.com.br/cadastro/boas-vindas?ref=74194EB9').catch(() => {});
      t.textContent = 'Convite copiado';
    }
    else if(t.dataset.sair !== undefined){ definirLogado(false); location.hash = 'sair'; mostrar(); }
    else if(t.dataset.copiarPix !== undefined){ t.textContent = 'Código copiado'; }
    else if(t.dataset.enviarEquipe !== undefined){
      if(!texto()) return;
      document.getElementById('smForm').innerHTML = '<p class="sm-text"><b>Mensagem enviada.</b> Nossa equipe vai responder por e-mail.</p>';
    }
  });

  sm.addEventListener('submit', e => {
    if(e.target.id !== 'smEntrar') return;
    e.preventDefault();
    const f = e.target, ok = f.login.value.trim() === '123' && f.senha.value === '123';
    document.getElementById('smErro').hidden = ok;
    if(!ok){ f.senha.value = ''; f.login.focus(); return; }
    definirLogado(true);
    location.hash = 'inicio';
    mostrar();
  });

  mostrar();
})();
