// VERSÃO 2 · Página interna de um grupo (grupo.html?g=<número em GRUPOS>#aba). Mesmo desenho da página de estabelecimento
// (vitrine.css): capa, nome, selos, amigos que participam e ações no topo; o resto em abas.
// Abas: Conversas (tópicos com comentários), Mural (avisos da moderação), Encontros (próximos encontros, com "Vou") e
// Membros. Grupos de desapego (tipo:'desapego') trocam Conversas e Encontros pela aba Anúncios (desapego-dados.js).
// Tudo é fictício e gerado a partir do grupo; o que a pessoa faz fica só nesta página (menos Participar/Sair, que vale
// entre as páginas pela sessão, e o "Vou" dos encontros, guardado no navegador). Sem datas de publicação (regra da v2);
// datas de encontro podem aparecer.
const GD_ICONES = {
  conversa:'<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/>',
  mural:'<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a3 3 0 0 1 0 6"/>',
  agenda:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  local:'<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  escudo:'<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/>',
  enviar:'<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
  convidar:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5M19 8v6M16 11h6"/>',
  sair:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
  loja:'<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM9 20v-6h6v6"/>',
  fixo:'<path d="M9 4h6l-1 6 3 3H7l3-3zM12 13v8"/>',
  arquivo:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
};
const gdIcone = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${GD_ICONES[n]}</svg>`;
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const gdLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const gdGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

const gi = Math.max(0, GRUPOS.findIndex((g, i) => i === parseInt(new URLSearchParams(location.search).get('g'), 10)));
const grupo = GRUPOS[gi];
const ehDesapego = grupo.tipo === 'desapego';
document.title = `${grupo.t} · Grupos · SoftLiving (Protótipo · versão 2)`;

// ===== Pessoas (fictícias) =====
const EU = 'Rafael Barros';
const PESSOAS = ['Alexandre Collart', 'Bernardo Leitão', 'Ângela Senna', 'Lucia Paes de Barros', 'Erick Figueira de Mello', 'Sofia Martellini',
  'Sandra Rosenfeld', 'Zé Roberto', 'Maria Helena Sobral', 'Luciana Russi', 'Claudio Brito', 'Marta Siqueira', 'Paulo Regis', 'Ivone Castro',
  'Helena Duarte', 'Roberto Alencar', 'Célia Ribeiro', 'Jorge Amaral', 'Teresa Gomes', 'Antônio Pires', 'Vera Moraes', 'Nelson Tavares'];
const AMIGOS_DO_RAFAEL = ['Alexandre Collart', 'Bernardo Leitão', 'Lucia Paes de Barros', 'Zé Roberto', 'Célia Ribeiro'];
const CORES = ['#2f8578', '#7a3b52', '#b0513a', '#5b4b8a', '#013565', '#1F5519', '#8a5a0e', '#3d6b8c'];
const corDe = nome => CORES[[...nome].reduce((s, c) => s + c.charCodeAt(0), 0) % CORES.length];
const sigla = nome => nome.split(' ').filter(p => p.length > 2 || /^[A-ZÀ-Ú]/.test(p)).filter(p => /^[A-ZÀ-Ú]/.test(p)).slice(0, 2).map(p => p[0]).join('');
const avatar = (nome, cls = '') => `<span class="av-col gd-av ${cls}" style="background:${corDe(nome)}" aria-hidden="true">${sigla(nome)}</span>`;

// Sempre as mesmas pessoas para o mesmo grupo (rodízio pela posição do grupo)
const rodizio = PESSOAS.slice(gi % PESSOAS.length).concat(PESSOAS.slice(0, gi % PESSOAS.length));
const moderador = grupo.t === 'Amigos' ? 'Alexandre Collart' : grupo.t === 'Clube do Vinho' ? 'Lucia Paes de Barros' : rodizio[0];
const outros = [moderador, ...rodizio.filter(p => p !== moderador)];
const membros = () => (grupo.participando ? [EU, ...outros] : outros).slice(0, Math.max(1, grupo.membros));
const amigosNoGrupo = () => membros().filter(p => AMIGOS_DO_RAFAEL.includes(p));
const pessoa = n => outros[n % outros.length];

// ===== Conversas (tópicos) por assunto do grupo =====
const TOPICOS = {
  Gastronomia:[
    ['Receita da semana', 'Compartilhe uma receita simples que você fez nos últimos dias.', ['Fiz um risoto de abóbora com sálvia. Leve e muito saboroso.', 'Vou testar! Aqui em casa a quarta é dia de sopa de legumes.']],
    ['Onde comprar bons ingredientes no Rio', 'Feiras, empórios e mercados que valem a visita.', ['A feira orgânica do Jardim Botânico, aos sábados, é ótima.', 'O empório da Rua Dias Ferreira tem azeites excelentes.']]],
  Cinema:[
    ['Filme do mês', 'Qual filme vamos assistir para a conversa de outubro? Deixe sua sugestão.', ['Sugiro um clássico: Cinema Paradiso.', 'Apoio! Faz tempo que quero rever.']],
    ['Indicações para o fim de semana', 'Viu algo bom no cinema ou em casa? Conte aqui, sem estragar o final.', ['Assisti a um documentário sobre o Rio antigo, lindo demais.']]],
  Saúde:[
    ['Prática da semana', 'Como foi a prática desta semana? Conte o que funcionou para você.', ['A respiração guiada antes de dormir mudou meu sono.', 'Consegui alongar todos os dias. Pequena vitória!']],
    ['Como está a sua rotina?', 'Um espaço para trocar dicas de hábitos simples no dia a dia.', ['Troquei o elevador pela escada. Aos poucos, sem pressa.']]],
  Cultura:[
    ['Livro de outubro', 'O grupo escolheu o livro do mês. Comente as primeiras impressões, sem revelar o final.', ['Comecei ontem e já estou encantada com a narradora.', 'Estou no capítulo 5. Que escrita bonita.']],
    ['O que vocês estão lendo?', 'Fora o livro do mês, o que está na sua cabeceira?', ['Uma biografia de Machado de Assis, recomendo.']]],
  Tecnologia:[
    ['Dúvida da semana', 'Pergunte sem vergonha: celular, aplicativos, contas, senhas.', ['Como faço para aumentar a letra do WhatsApp?', 'Em Configurações, Tela, Tamanho da fonte. Qualquer dúvida, eu ajudo no encontro.']],
    ['Golpes que chegaram por mensagem', 'Recebeu algo suspeito? Mostre aqui (sem dados pessoais) para todos aprenderem.', ['Chegou um falso aviso do banco pedindo para clicar num link. Apaguei.']]],
  Social:[
    ['Próximo encontro', 'Vamos combinar o dia e o lugar. Sugira uma data e um horário.', ['Sugiro sábado à tarde, num café perto da praia.', 'Por mim, ótimo!']],
    ['Fotos e lembranças', 'Deixe aqui uma lembrança boa do último encontro.', ['Que tarde agradável foi aquela. Obrigada a todos!']]],
  Finanças:[
    ['Renda fixa nesta fase da vida', 'Como vocês equilibram segurança e rendimento? Troca de experiências, sem recomendação de investimento.', ['Prefiro deixar uma reserva que eu consiga usar a qualquer momento.']],
    ['Planejar os próximos anos', 'Viagens, casa, família: como vocês organizam os planos?', ['Faço uma planilha simples por ano. Ajuda muito.']]],
  Viagens:[
    ['Próximo destino do grupo', 'Vote no destino da próxima viagem: serra, praia ou cidade histórica?', ['Voto na serra: Petrópolis ou Itaipava.', 'Cidade histórica! Paraty ou Ouro Preto.']],
    ['Dicas para viajar em grupo', 'O que não pode faltar na mala e na organização?', ['Remédios de uso contínuo sempre na bagagem de mão.']]],
};
const ESPECIFICOS = {
  'Clube do Vinho':[['Rodada de outubro: tintos do sul', 'Qual rótulo vocês querem provar no encontro? A coluna de vinhos sugeriu três.', ['Voto no Pinot Noir da Serra Gaúcha.', 'Eu levo queijos para harmonizar.']]],
  'Copa do Mundo':[['Bolão da comunidade', 'Deixe seu palpite para o próximo jogo. Vale só a diversão.', ['Brasil 2 a 1!', 'Vou de 3 a 0, otimista.']]],
  'Amigos':[['Piloto com amigos', 'Espaço para testar os tópicos e o mural com o grupo de amigos.', ['Quando marcarmos o primeiro encontro, o aviso entra no mural.', 'Combinado, contem comigo.']]],
};
const conversas = [
  ...(ESPECIFICOS[grupo.t] || []),
  ...(TOPICOS[grupo.cat] || TOPICOS.Social),
  [`Apresente-se ao grupo`, `Conte de onde você é e o que espera do ${grupo.t}.`, ['Oi, pessoal! Muito feliz de fazer parte.', 'Seja bem-vinda! Aqui a conversa é sempre boa.']],
].slice(0, 3).map(([t, guia, falas], k) => ({ t, guia, aberto:true, comentarios:falas.map((txt, j) => ({ a:pessoa(k + j + 1), txt, curt:(k * 3 + j * 5 + gi) % 9 })) }));
conversas.push({ t:'Combinado do grupo', guia:'Respeito sempre, nada de propaganda e foco no tema do grupo.', aberto:false,
  comentarios:[{ a:moderador, mod:true, txt:'Tópico arquivado: o combinado está valendo para todos.', curt:6 }] });
let conversaAtual = 0;

// ===== Mural (avisos da moderação) =====
const avisos = ehDesapego ? [
  { txt:'Regras do grupo: um anúncio por item, sempre com preço ou a indicação de doação ou troca. Nada de revenda comercial.', fixo:true },
  { txt:'Depois de vender, doar ou trocar, marque o anúncio como concluído para ninguém perder tempo.' },
  { txt:'Negocie com segurança: combine a entrega em local público e veja o item antes de pagar.' },
] : [
  { txt:grupo.d, fixo:true },
  { txt:`Novo por aqui? Comece pelo tópico “${conversas[conversas.length - 2].t}” e conte um pouco sobre você.` },
  { txt:'Combinado do grupo: respeito sempre, nada de propaganda e foco no tema. A moderação está aqui para ajudar.' },
];

// ===== Encontros (datas de evento podem aparecer) =====
const ENCONTROS = {
  Gastronomia:[['Oficina de pães de fermentação natural', 'Sábado, 10 de outubro · 10h', 'Cozinha do Empório Oliva, Botafogo'], ['Almoço do grupo', 'Sábado, 24 de outubro · 12h30', 'Restaurante a confirmar, Zona Sul']],
  Cinema:[['Sessão e conversa do filme do mês', 'Quinta, 15 de outubro · 19h', 'Online · o link fica no mural'], ['Cinema juntos', 'Sábado, 31 de outubro · 16h', 'Estação Botafogo']],
  Saúde:[['Prática guiada ao ar livre', 'Sábado, 3 de outubro · 8h', 'Parque Lage, Jardim Botânico'], ['Encontro de respiração', 'Quinta, 22 de outubro · 18h30', 'Online · o link fica no mural']],
  Cultura:[['Conversa sobre o livro de outubro', 'Quinta, 29 de outubro · 19h', 'Livraria Travessa, Leblon'], ['Visita guiada ao Real Gabinete Português de Leitura', 'Sábado, 17 de outubro · 10h', 'Centro do Rio']],
  Tecnologia:[['Tira-dúvidas do celular', 'Quinta, 8 de outubro · 15h', 'Online · o link fica no mural'], ['Oficina presencial: golpes digitais', 'Sábado, 24 de outubro · 10h', 'Centro comunitário, Tijuca']],
  Social:[['Café da tarde do grupo', 'Sábado, 10 de outubro · 16h', 'Confeitaria a confirmar, Copacabana'], ['Caminhada e conversa na orla', 'Domingo, 25 de outubro · 8h', 'Posto 6, Copacabana']],
  Finanças:[['Roda de conversa: organizar o ano', 'Quinta, 15 de outubro · 18h', 'Online · o link fica no mural'], ['Palestra com especialista convidado', 'Quinta, 29 de outubro · 18h', 'Online · o link fica no mural']],
  Viagens:[['Planejamento da viagem de novembro', 'Quinta, 8 de outubro · 19h', 'Online · o link fica no mural'], ['Passeio de um dia em Petrópolis', 'Sábado, 31 de outubro · 7h', 'Saída da Praça XV']],
};
const encontros = (ENCONTROS[grupo.cat] || ENCONTROS.Social).map(([t, quando, onde], k) => ({ t, quando, onde, vao:Math.min(grupo.membros, 3 + (gi * 2 + k * 5) % 11) }));
const chaveVou = `v2GrupoVou:${grupo.t}`;
let vou = gdLer(chaveVou, []);

// ===== Anúncios (só desapego) =====
const TIPO_ANUNCIO = { venda:'Venda', doacao:'Doação', troca:'Troca' };
const CONCLUIDO = { venda:'Vendido', doacao:'Doado', troca:'Trocado' };
const anuncios = ehDesapego ? (DESAPEGO[grupo.t] || []).map(a => ({ ...a })) : [];
let filtroAnuncio = 'todos';
let pedidosAmizade = [];

// ===== Abas =====
const ABAS = ehDesapego
  ? [['anuncios', 'Anúncios', 'loja'], ['mural', 'Mural', 'mural'], ['membros', 'Membros', 'membros']]
  : [['conversas', 'Conversas', 'conversa'], ['mural', 'Mural', 'mural'], ['encontros', 'Encontros', 'agenda'], ['membros', 'Membros', 'membros']];
let aba = ABAS.some(a => a[0] === location.hash.slice(1)) ? location.hash.slice(1) : ABAS[0][0];
const iconeAba = n => GD_ICONES[n] ? gdIcone(n) : icone(n);

function renderTopo(){
  const amigos = amigosNoGrupo();
  const nMembros = `${grupo.membros} ${grupo.membros === 1 ? 'membro' : 'membros'}`;
  document.getElementById('gdTopo').innerHTML = `
    <span class="es-logo gd-logo">${sigla(grupo.t)}</span>
    <div class="es-nome">
      <h1>${grupo.t}</h1>
      <p>${grupo.cat} · ${nMembros}${ehDesapego ? ' · venda, doação e troca' : ''}</p>
      <div class="es-selos">
        ${grupo.premium ? '<span class="gd-selo-premium">Premium · usa créditos</span>' : '<span>Grátis</span>'}
        <span>${gdIcone('escudo')}Moderado por ${moderador}</span>
        ${ehDesapego ? '' : `<span>${gdIcone('agenda')}${encontros.length} encontros marcados</span>`}
      </div>
      ${amigos.length ? `<p class="es-amigos"><span class="es-amigos-av">${amigos.slice(0, 4).map(n => `<i style="background:${corDe(n)}">${n[0]}</i>`).join('')}</span>
        <b>${amigos[0]}</b>${amigos.length > 1 ? ` e mais ${amigos.length - 1} ${amigos.length === 2 ? 'amigo' : 'amigos'}` : ''} ${amigos.length > 1 ? 'participam' : 'participa'} deste grupo</p>` : ''}
      <div class="es-acoes">
        ${grupo.participando
          ? `<span class="btn gd-membro">${gdIcone('check')}Você participa</span>`
          : `<button type="button" class="btn" id="gdEntrar">${icone('mais')}Participar${grupo.premium ? ' · 10 créditos por mês' : ''}</button>`}
        <button type="button" class="btn ghost" id="gdConvidar">${gdIcone('convidar')}Convidar amigos</button>
        ${grupo.participando ? `<button type="button" class="btn ghost" id="gdSair">${gdIcone('sair')}Sair do grupo</button>` : ''}
      </div>
    </div>`;
}

function renderAbas(){
  document.getElementById('gdAbas').innerHTML = ABAS.map(([k, l, ic]) =>
    `<button type="button" role="tab" class="${k === aba ? 'on' : ''}" aria-selected="${k === aba}" data-aba="${k}">${iconeAba(ic)}${l}</button>`).join('');
}

const participeAviso = acao => `<p class="gd-trava">${gdIcone('escudo')}Participe do grupo para ${acao}.</p>`;

const RENDER = {
  conversas(){
    const c = conversas[conversaAtual];
    const pode = grupo.participando && c.aberto;
    return `
    <div class="gd-conversas">
      <div class="gd-topicos" role="list">
        ${conversas.map((t, k) => `
          <button type="button" class="gd-topico ${k === conversaAtual ? 'on' : ''} ${t.aberto ? '' : 'arquivado'}" data-conversa="${k}" role="listitem">
            <b>${t.t}</b>
            <small>${t.aberto ? '' : `${gdIcone('arquivo')}Arquivado · `}${t.comentarios.length} ${t.comentarios.length === 1 ? 'comentário' : 'comentários'}</small>
          </button>`).join('')}
      </div>
      <div class="gd-detalhe">
        <h2>${c.t}</h2>
        <p class="gd-guia">${c.guia}</p>
        ${pode ? `
          <form class="gd-comentar" id="gdComentar">
            ${avatar(EU)}
            <textarea name="txt" rows="2" placeholder="Escreva seu comentário…" aria-label="Seu comentário" required></textarea>
            <button type="submit" class="gd-enviar" aria-label="Enviar comentário">${gdIcone('enviar')}</button>
          </form>` : c.aberto ? participeAviso('comentar') : '<p class="gd-trava">Tópico arquivado: não recebe novos comentários.</p>'}
        <div class="gd-comentarios">
          ${c.comentarios.slice().reverse().map((m, j) => `
            <div class="gd-comentario">
              ${avatar(m.a)}
              <div>
                <p class="gd-quem"><b>${m.a}</b>${m.a === EU ? ' <small>(você)</small>' : ''}${m.a === moderador || m.mod ? '<span class="gd-tag">Moderação</span>' : ''}</p>
                <p class="gd-txt">${m.txt}</p>
                <button type="button" class="gd-curtir ${m.curti ? 'on' : ''}" data-curtir="${c.comentarios.length - 1 - j}">${icone('curtidas')}${m.curt + (m.curti ? 1 : 0) || ''}</button>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  },
  mural(){
    return `
    <div class="gd-mural">
      ${avisos.map(v => `
        <article class="gd-aviso ${v.fixo ? 'fixo' : ''}">
          ${avatar(moderador)}
          <div>
            <p class="gd-quem"><b>${moderador}</b><span class="gd-tag">${v.fixo ? `${gdIcone('fixo')}Fixado` : 'Aviso'}</span></p>
            <p class="gd-txt">${v.txt}</p>
          </div>
        </article>`).join('')}
      <p class="gd-nota">Só a moderação publica no mural. Para conversar, use ${ehDesapego ? 'os anúncios' : 'a aba Conversas'}.</p>
    </div>`;
  },
  encontros(){
    return `
    <div class="gd-encontros">
      ${encontros.map((ev, k) => { const eu = vou.includes(ev.t); return `
        <article class="es-evento gd-evento">
          <span class="gd-data">${gdIcone('agenda')}</span>
          <div>
            <b>${ev.t}</b>
            <p>${ev.quando}</p>
            <p class="gd-onde">${gdIcone('local')}${ev.onde}</p>
            <small>${ev.vao + (eu ? 1 : 0)} ${ev.vao + (eu ? 1 : 0) === 1 ? 'pessoa vai' : 'pessoas vão'}</small>
          </div>
          <button type="button" class="btn ${eu ? '' : 'ghost'} gd-vou" data-vou="${k}">${eu ? `${gdIcone('check')}Vou` : 'Vou'}</button>
        </article>`; }).join('')}
      ${grupo.participando ? '' : participeAviso('confirmar presença nos encontros')}
    </div>`;
  },
  membros(){
    const lista = membros();
    return `
    <p class="es-sub">${grupo.membros} ${grupo.membros === 1 ? 'pessoa participa' : 'pessoas participam'} deste grupo.</p>
    <div class="gd-membros">
      ${lista.map(n => {
        const ehAmigo = AMIGOS_DO_RAFAEL.includes(n), pedido = pedidosAmizade.includes(n);
        return `
        <div class="gd-pessoa">
          ${avatar(n)}
          <div><b>${n}${n === EU ? ' <small>(você)</small>' : ''}</b><small>${n === moderador ? 'Moderação' : ehAmigo ? 'Seu amigo' : 'Membro'}</small></div>
          ${n === EU || ehAmigo ? '' : `<button type="button" class="btn ghost gd-add ${pedido ? 'on' : ''}" data-amizade="${n}">${pedido ? 'Pedido enviado' : `${icone('mais')}Adicionar`}</button>`}
        </div>`; }).join('')}
    </div>
    ${grupo.membros > lista.length ? `<p class="gd-nota gd-mais">E mais ${grupo.membros - lista.length} ${grupo.membros - lista.length === 1 ? 'membro' : 'membros'}.</p>` : ''}`;
  },
  anuncios(){
    const lista = anuncios.map((a, i) => ({ ...a, i })).filter(a => filtroAnuncio === 'todos' || a.tipo === filtroAnuncio);
    const conta = t => anuncios.filter(a => t === 'todos' || a.tipo === t).length;
    const pode = grupo.participando;
    return `
    <div class="gd-anuncios">
      <div class="gd-seguranca">${gdIcone('escudo')}<div><b>Negocie com segurança</b><span>Combine a entrega em local público e movimentado, veja o item antes de pagar e nunca pague adiantado para quem você não conhece.</span></div></div>
      <div class="gd-anuncios-topo">
        <div class="seg" role="tablist">${['todos', 'venda', 'doacao', 'troca'].map(t => `<button type="button" role="tab" class="${t === filtroAnuncio ? 'on' : ''}" aria-selected="${t === filtroAnuncio}" data-filtro="${t}">${t === 'todos' ? 'Tudo' : TIPO_ANUNCIO[t]} <small>${conta(t)}</small></button>`).join('')}</div>
        ${pode ? `<button type="button" class="btn" data-anunciar>${icone('mais')}Anunciar um item</button>` : ''}
      </div>
      <form class="gd-form" id="gdForm" hidden>
        <div class="gd-form-grade">
          <label>O que você quer anunciar?<input type="text" name="t" placeholder="Ex.: Mesa de centro" required></label>
          <label>Tipo<select name="tipo"><option value="venda">Venda</option><option value="doacao">Doação</option><option value="troca">Troca</option></select></label>
          <label class="gd-preco">Preço<input type="text" name="preco" inputmode="numeric" placeholder="Ex.: R$150"></label>
          <label>Categoria<select name="cat">${DESAPEGO_CATEGORIAS.map(c => `<option>${c}</option>`).join('')}</select></label>
          <label>Estado<select name="estado">${DESAPEGO_ESTADOS.map(c => `<option>${c}</option>`).join('')}</select></label>
          <label>Bairro<input type="text" name="bairro" placeholder="Ex.: Tijuca" required></label>
        </div>
        <label>Descrição<textarea name="d" rows="2" placeholder="Conte o estado do item e como combinar a entrega"></textarea></label>
        <div class="gd-form-acoes"><button type="submit" class="btn">Publicar anúncio</button><button type="button" class="btn ghost" data-cancelar>Cancelar</button></div>
      </form>
      ${pode ? '' : participeAviso('anunciar e falar com quem anunciou')}
      <div class="gd-grade-anuncios">${lista.map(a => `
        <article class="gd-anuncio ${a.concluido ? 'concluido' : ''}">
          <div class="gd-anuncio-capa"><span class="gd-anuncio-tipo ${a.tipo}">${a.concluido ? CONCLUIDO[a.tipo] : a.tipo === 'venda' ? a.preco : TIPO_ANUNCIO[a.tipo]}</span><span class="gd-anuncio-cat">${a.cat}</span></div>
          <div class="gd-anuncio-corpo">
            <h3>${esc(a.t)}</h3>
            <p>${esc(a.d)}</p>
            <p class="gd-anuncio-info">${a.estado} · ${gdIcone('local')}${esc(a.bairro)}</p>
            <p class="gd-anuncio-quem">${avatar(a.meu ? EU : a.quem, 'mini')}${a.meu ? 'Seu anúncio' : a.quem}</p>
            ${a.meu ? `<div class="gd-anuncio-acoes">${a.concluido ? '' : `<button type="button" class="btn" data-concluir="${a.i}">Marcar como ${CONCLUIDO[a.tipo].toLowerCase()}</button>`}<button type="button" class="btn ghost" data-remover="${a.i}">Remover</button></div>`
              : a.enviado ? `<p class="gd-enviado">${gdIcone('check')}Mensagem enviada. ${a.quem.split(' ')[0]} vai responder por aqui.</p>`
              : a.escrevendo ? `<div class="gd-msg"><textarea rows="2" data-texto="${a.i}" aria-label="Mensagem para ${a.quem}">Olá! Tenho interesse em “${esc(a.t)}”. Ainda está disponível?</textarea><button type="button" class="btn" data-enviar="${a.i}">Enviar</button></div>`
              : pode && !a.concluido ? `<button type="button" class="btn ghost" data-interesse="${a.i}">${gdIcone('conversa')}Tenho interesse</button>` : ''}
          </div>
        </article>`).join('') || '<p class="vazio">Nenhum anúncio neste filtro.</p>'}
      </div>
    </div>`;
  },
};

function renderAba(){ document.getElementById('gdAba').innerHTML = RENDER[aba](); }
function renderTudo(){ renderTopo(); renderAbas(); renderAba(); }

document.getElementById('gdPagina').innerHTML = `
  <a href="${urlPagina('grupos')}" class="es-voltar">${icone('voltar')}Grupos</a>
  <div class="es-capa" style="background-image:url('${fotoUrl(grupo.foto, 1400)}')"></div>
  <header class="es-topo" id="gdTopo"></header>
  <nav class="seg es-abas gd-abas" id="gdAbas" role="tablist" aria-label="Seções do grupo"></nav>
  <div id="gdAba"></div>`;
renderTudo();

// ===== Interações =====
document.getElementById('gdTopo').addEventListener('click', ev => {
  if(ev.target.closest('#gdEntrar')){
    alternarParticipacao(grupo, true);
    mostrarAviso(grupo.premium ? `Você agora participa do ${grupo.t}. No protótipo, nenhum crédito é descontado` : `Você agora participa do ${grupo.t}`);
  } else if(ev.target.closest('#gdSair')){
    alternarParticipacao(grupo, false);
    mostrarAviso(`Você saiu do ${grupo.t}`);
  } else if(ev.target.closest('#gdConvidar')){
    const link = location.href.split('#')[0];
    if(navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
    mostrarAviso('Link do grupo copiado. É só colar na conversa com seus amigos');
    return;
  } else return;
  renderTudo();
});
document.getElementById('gdAbas').addEventListener('click', ev => {
  const b = ev.target.closest('[data-aba]'); if(!b) return;
  aba = b.dataset.aba;
  history.replaceState(null, '', '#' + aba);
  renderAbas(); renderAba();
});
const gdAba = document.getElementById('gdAba');
gdAba.addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  const d = b.dataset;
  if(d.conversa){ conversaAtual = +d.conversa; }
  else if(d.curtir){
    if(!grupo.participando){ mostrarAviso('Participe do grupo para curtir'); return; }
    const m = conversas[conversaAtual].comentarios[+d.curtir]; m.curti = !m.curti;
  }
  else if(d.vou){
    if(!grupo.participando){ mostrarAviso('Participe do grupo para confirmar presença'); return; }
    const t = encontros[+d.vou].t;
    vou = vou.includes(t) ? vou.filter(x => x !== t) : [...vou, t];
    gdGravar(chaveVou, vou);
    mostrarAviso(vou.includes(t) ? 'Presença confirmada. Até lá!' : 'Presença cancelada');
  }
  else if(d.amizade){
    const n = d.amizade;
    pedidosAmizade = pedidosAmizade.includes(n) ? pedidosAmizade.filter(x => x !== n) : [...pedidosAmizade, n];
    mostrarAviso(pedidosAmizade.includes(n) ? `Pedido de amizade enviado para ${n}` : 'Pedido de amizade cancelado');
  }
  else if(d.filtro){ filtroAnuncio = d.filtro; }
  else if(d.anunciar !== undefined){ const f = document.getElementById('gdForm'); f.hidden = false; f.t.focus(); return; }
  else if(d.cancelar !== undefined){ const f = document.getElementById('gdForm'); f.hidden = true; f.reset(); return; }
  else if(d.interesse){ anuncios[+d.interesse].escrevendo = true; }
  else if(d.enviar){
    const t = gdAba.querySelector(`[data-texto="${d.enviar}"]`); if(!t.value.trim()) return;
    anuncios[+d.enviar].enviado = true; mostrarAviso('Mensagem enviada. No protótipo, nada sai daqui');
  }
  else if(d.concluir){ anuncios[+d.concluir].concluido = true; }
  else if(d.remover){ anuncios.splice(+d.remover, 1); mostrarAviso('Anúncio removido'); }
  else return;
  renderTopo(); renderAba();
});
gdAba.addEventListener('change', ev => {
  if(ev.target.name === 'tipo') ev.target.form.querySelector('.gd-preco').hidden = ev.target.value !== 'venda';
});
gdAba.addEventListener('submit', ev => {
  ev.preventDefault();
  const f = ev.target;
  if(f.id === 'gdComentar'){
    const txt = f.txt.value.trim(); if(!txt) return;
    conversas[conversaAtual].comentarios.push({ a:EU, txt:esc(txt), curt:0 });
  } else if(f.id === 'gdForm'){
    const preco = f.preco.value.trim().replace(/^R\$\s*/, '');
    if(f.tipo.value === 'venda' && !preco){ f.preco.focus(); return; }
    anuncios.unshift({ t:f.t.value.trim(), tipo:f.tipo.value, preco:'R$' + preco, cat:f.cat.value, estado:f.estado.value,
      bairro:f.bairro.value.trim(), quem:EU, d:f.d.value.trim() || 'Sem descrição.', meu:true });
    filtroAnuncio = 'todos';
    mostrarAviso('Anúncio publicado no grupo');
  } else return;
  renderAba();
});
