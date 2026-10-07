// VERSÃO 2 · Tela Meu perfil. Dados fictícios do usuário do protótipo (Rafael). Sobre mim, habilidades e ofertas e
// interesses podem ser editados e ficam guardados no navegador. Grupos vêm de GRUPOS (os que ele participa); amigos, da
// página Amigos.
// Perfil público (perfil.html?publico=1): a mesma página, como os outros a veem no endereço público /app/@nome. Mostra o
// que o perfil de membro da V1 mostrava (nome, endereço, cidade, ocupação, habilidades e ofertas, interesses e grupos),
// mais o "Sobre mim" da V2 e os botões para quem visita: Adicionar aos amigos, Seguir e Mensagem (esta só para amigos,
// ou para todos se a pessoa aceitar mensagens de quem não é amigo). Sem botões de editar, créditos, comunidades,
// vitrines, amigos nem conta.
const PF_PUBLICO = new URLSearchParams(location.search).has('publico');
const PF_OCUPACAO = 'Empresário';
// Endereço público (@nome): a pessoa pode trocar, mas depois de cada troca espera 14 dias para trocar de novo
// (decisão de 2026-10-06). Guardados no navegador: o endereço e o dia da última troca.
const PF_ESPERA_DIAS = 14;
let PF_ARROBA = '@rafaelbarros', pfArrobaEm = 0, pfEditandoArroba = false;
try { PF_ARROBA = JSON.parse(localStorage.getItem('v2PerfilArroba')) || PF_ARROBA; pfArrobaEm = +JSON.parse(localStorage.getItem('v2PerfilArrobaEm')) || 0; } catch(e){}
const pfLiberaEm = () => pfArrobaEm ? pfArrobaEm + PF_ESPERA_DIAS * 864e5 : 0;
const pfPodeTrocar = () => Date.now() >= pfLiberaEm();
const pfDia = t => { const d = new Date(t), p = n => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`; };
document.body.classList.toggle('pf-publico', PF_PUBLICO);
const PF_INTERESSES = ['Saúde e bem-estar', 'Vinhos', 'Viagem', 'Tecnologia', 'Cinema', 'Casa e decoração', 'Gastronomia', 'Leitura', 'Música', 'Moda', 'Longevidade', 'Esportes'];
const PF_AMIGOS = [['AD', '#013565', 'Alexandre'], ['HM', '#7a3b52', 'Helena'], ['MT', '#2f8578', 'Marcos'], ['CR', '#b0513a', 'Célia'], ['BN', '#5b4b8a', 'Beatriz'], ['JA', '#8a6414', 'Jorge']];
const pfLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const pfGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
let sobre = pfLer('v2PerfilSobre', 'Carioca, apaixonado por boas conversas, vinhos brasileiros e viagens sem pressa. Estou na SoftLiving para aprender coisas novas e reencontrar gente com os mesmos interesses.');
let oferta = pfLer('v2PerfilOferta', 'CEO da SoftLiving. Gosto de conversar sobre comunidades, longevidade e novos negócios.');
let interesses = pfLer('v2PerfilInteresses', ['Vinhos', 'Viagem', 'Tecnologia', 'Longevidade']);
let privacidade = pfLer('v2PerfilPrivacidade', 'Membros');
// Mensagens de quem não é amigo: desligado, só amigos escrevem para você (encaminhar conteúdo é sempre só entre amigos)
let msgTodos = pfLer('v2PerfilMsgTodos', false);
// Mostrar aos amigos quando estou online (ligado por padrão; online = usou o portal nos últimos 5 minutos)
let mostrarOnline = pfLer('v2PerfilOnline', true);
const grupos = GRUPOS.filter(g => g.participando);
// Minhas comunidades (as comunidades fechadas de DATA, as mesmas de Minhas Comunidades) e vitrines favoritas
// (estabelecimentos salvos na página de cada um: estFavoritos(), em estabelecimentos-dados.js)
const PF_FORA = ['hotel', 'restaurante', 'turismo', 'clinica', 'spa', 'petshop'];   // estes são estabelecimentos, não comunidades
const PF_COMUNIDADES = typeof DATA === 'undefined' ? [] : Object.keys(DATA).filter(k => !PF_FORA.includes(k));
const saldo = saldoCreditos();

document.getElementById('pfTopo').innerHTML = `
  <div class="pf-capa"></div>
  <div class="pf-id">
    <span class="pf-avatar">RB</span>
    <div class="pf-nome"><h1>Rafael Barros</h1><p><span id="pfArroba">${PF_ARROBA}</span> · Rio de Janeiro · ${PF_OCUPACAO}</p></div>
    ${PF_PUBLICO ? `<div class="pf-visitante">
      <button type="button" class="btn" data-visitante>${icone('mais')}Adicionar aos amigos</button>
      <button type="button" class="btn ghost" data-visitante>Seguir</button>
      <button type="button" class="btn ghost" data-visitante>${icone('comentarios')}Mensagem</button>
      <small>${msgTodos ? 'Mensagem aparece para todos os membros' : 'Mensagem aparece só para os seus amigos'}</small>
    </div>` : `<a href="${urlPagina('perfil')}?publico=1" class="btn ghost">Ver perfil público</a>
    <button type="button" class="btn ghost" id="pfFoto">${icone('perfil')}Trocar foto</button>`}
  </div>
  <div class="pf-numeros${PF_PUBLICO ? ' pf-numeros-2' : ''}">
    ${PF_PUBLICO ? `<span><b>${PF_AMIGOS.length}</b><span>amigos</span></span><span><b>${grupos.length}</b><span>grupos</span></span>` : `
    <a href="${urlPagina('amigos')}"><b>${PF_AMIGOS.length}</b><span>amigos</span></a>
    <a href="${urlPagina('grupos')}"><b>${grupos.length}</b><span>grupos</span></a>
    <a href="${urlPagina('comunidades')}"><b>${PF_COMUNIDADES.length}</b><span>comunidades</span></a>
    <a href="${urlPagina('carteira')}"><b>${saldo}</b><span>créditos</span></a>`}
  </div>`;
if(PF_PUBLICO){
  document.title = 'Rafael Barros · SoftLiving (Protótipo · versão 2)';
  const aviso = document.getElementById('pfPublicoAviso');
  aviso.hidden = false;
  aviso.innerHTML = `<span><b>Perfil público.</b> É assim que os outros membros veem você em <b>softliving.com.br/app/${PF_ARROBA}</b></span><a href="${urlPagina('perfil')}" class="btn ghost">Voltar ao meu perfil</a>`;
  document.getElementById('pfGruposTitulo').textContent = 'Grupos';
  document.querySelectorAll('.pf-bloco-topo .bs-link, .pf-dica').forEach(el => el.hidden = true);
}

function renderSobre(editando){
  document.getElementById('pfSobre').innerHTML = editando
    ? `<textarea id="pfSobreCampo" rows="4" maxlength="400">${sobre}</textarea><div class="pf-editar-acoes"><button type="button" class="btn" id="pfSalvarSobre">Salvar</button><button type="button" class="btn ghost" id="pfCancelarSobre">Cancelar</button></div>`
    : `<p class="pf-sobre">${sobre.replace(/</g, '&lt;').replace(/SoftLiving/g, LOGO)}</p>`;
  document.getElementById('pfEditarSobre').hidden = editando || PF_PUBLICO;
}
function renderOferta(editando){
  document.getElementById('pfOferta').innerHTML = editando
    ? `<textarea id="pfOfertaCampo" class="pf-campo" rows="3" maxlength="300">${oferta}</textarea><div class="pf-editar-acoes"><button type="button" class="btn" id="pfSalvarOferta">Salvar</button><button type="button" class="btn ghost" id="pfCancelarOferta">Cancelar</button></div>`
    : `<p class="pf-sobre">${oferta.replace(/</g, '&lt;').replace(/SoftLiving/g, LOGO)}</p>`;
  document.getElementById('pfEditarOferta').hidden = editando || PF_PUBLICO;
}
function renderInteresses(){
  // no perfil público aparecem só os interesses marcados, sem poder mexer
  if(PF_PUBLICO){ document.getElementById('pfInteresses').outerHTML = `<div class="am-gostos pf-interesses-publico" id="pfInteresses">${interesses.map(i => `<span>${i}</span>`).join('')}</div>`; return; }
  document.getElementById('pfInteresses').innerHTML = PF_INTERESSES.map(i =>
    `<button type="button" class="pf-chip${interesses.includes(i) ? ' on' : ''}" aria-pressed="${interesses.includes(i)}" data-interesse="${i}">${interesses.includes(i) ? '✓ ' : ''}${i}</button>`).join('');
}
document.getElementById('pfGrupos').innerHTML = grupos.map(g => `
  <a href="${urlGrupo(GRUPOS.indexOf(g))}" class="pf-grupo"><img src="${fotoUrl(g.foto, 160)}" alt="" loading="lazy"><span><b>${g.t}</b><small>${g.cat}</small></span></a>`).join('');
document.getElementById('pfAmigos').innerHTML = PF_AMIGOS.map(([s, c, n]) => `
  <a href="${urlPagina('amigos')}" class="pf-amigo"><span class="av-col" style="background:${c}">${s}</span>${n}</a>`).join('');
// Aparecer na comunidade e endereço público: opções da V1 que continuam (decisão de 2026-10-06)
let aparecer = true;
try { aparecer = localStorage.getItem('v2PerfilAparecer') !== '0'; } catch(e){}
function renderConta(){
  document.getElementById('pfConta').innerHTML = `
    <div class="pf-linha"><span><b>E-mail</b><small>ra•••••@exemplo.com</small></span><button type="button" class="btn ghost" data-aviso="Troca de e-mail: fora deste protótipo">Alterar</button></div>
    <div class="pf-linha"><span><b>Senha</b><small>••••••••</small></span><button type="button" class="btn ghost" data-aviso="Troca de senha: fora deste protótipo">Alterar</button></div>
    <div class="pf-linha"><span><b>Quem pode ver meu perfil</b><small>Seus grupos e interesses aparecem só para quem você escolher</small></span>
      <div class="seg" id="pfPrivacidade">${['Amigos', 'Membros'].map(o => `<button type="button" class="${o === privacidade ? 'on' : ''}" data-privacidade="${o}">${o === 'Amigos' ? 'Só amigos' : 'Todos os membros'}</button>`).join('')}</div></div>
    <div class="pf-linha"><span><b>Aparecer na comunidade</b><small>Seu nome e sua foto aparecem para os outros membros das suas comunidades e grupos</small></span>
      <button type="button" role="switch" aria-checked="${aparecer}" class="ac-chave${aparecer ? ' on' : ''}" data-aparecer aria-label="Aparecer na comunidade"><i></i></button></div>
    <div class="pf-linha"><span><b>Receber mensagens de quem não é amigo</b><small>Desligado, só os seus amigos podem escrever para você</small></span>
      <button type="button" role="switch" aria-checked="${msgTodos}" class="ac-chave${msgTodos ? ' on' : ''}" data-msg-todos aria-label="Receber mensagens de quem não é amigo"><i></i></button></div>
    <div class="pf-linha"><span><b>Mostrar quando estou online</b><small>Seus amigos veem um ponto verde ao lado do seu nome enquanto você usa o portal</small></span>
      <button type="button" role="switch" aria-checked="${mostrarOnline}" class="ac-chave${mostrarOnline ? ' on' : ''}" data-mostrar-online aria-label="Mostrar quando estou online"><i></i></button></div>
    ${pfEditandoArroba ? `
    <form class="pf-linha pf-endereco-form" id="pfEnderecoForm" novalidate>
      <span><b>Endereço público</b> <em class="pf-opcional">opcional</em>
        <label class="pf-endereco-campo">softliving.com.br/app/@<input type="text" name="arroba" value="${PF_ARROBA.slice(1)}" maxlength="30" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Seu endereço público"></label>
        <small>De 3 a 30 letras minúsculas, números, ponto ou sublinhado. Depois de trocar, você espera ${PF_ESPERA_DIAS} dias para trocar de novo.</small>
        <small class="pf-endereco-erro" role="alert" hidden></small></span>
      <span class="pf-linha-acoes"><button type="submit" class="btn">Salvar</button><button type="button" class="btn ghost" data-cancelar-endereco>Cancelar</button></span>
    </form>` : `
    <div class="pf-linha"><span><b>Endereço público</b> <em class="pf-opcional">opcional</em><small>softliving.com.br/app/${PF_ARROBA}</small>
        ${pfPodeTrocar() ? '' : `<small class="pf-endereco-espera">Você poderá trocar de novo a partir de ${pfDia(pfLiberaEm())}. <button type="button" class="bs-link" data-liberar-endereco>No protótipo: liberar agora</button></small>`}</span>
      <span class="pf-linha-acoes"><a href="${urlPagina('perfil')}?publico=1" class="btn ghost">Ver</a><button type="button" class="btn ghost" data-editar-endereco ${pfPodeTrocar() ? '' : 'disabled'}>Editar</button></span></div>`}
    <div class="pf-linha"><span><b>Acessibilidade</b><small>Tamanho da letra, alto contraste e navegação simplificada</small></span><a href="${urlPagina('acessibilidade')}" class="btn ghost">Abrir</a></div>
    <div class="pf-linha"><span><b>Modo simples</b><small>Menos opções na tela e letra maior</small></span><a href="${urlPagina('simples')}" class="btn ghost">Abrir</a></div>
    <div class="pf-linha"><span><b>Sair da conta</b><small>Você pode entrar de novo quando quiser</small></span><button type="button" class="btn ghost pf-sair" data-aviso="Sair: fora deste protótipo">Sair</button></div>`;
}

document.querySelector('main').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.id === 'pfEditarSobre') renderSobre(true);
  else if(b.id === 'pfCancelarSobre') renderSobre(false);
  else if(b.id === 'pfSalvarSobre'){ sobre = document.getElementById('pfSobreCampo').value.trim() || sobre; pfGravar('v2PerfilSobre', sobre); renderSobre(false); mostrarAviso('Sobre mim atualizado'); }
  else if(b.id === 'pfEditarOferta') renderOferta(true);
  else if(b.id === 'pfCancelarOferta') renderOferta(false);
  else if(b.id === 'pfSalvarOferta'){ oferta = document.getElementById('pfOfertaCampo').value.trim() || oferta; pfGravar('v2PerfilOferta', oferta); renderOferta(false); mostrarAviso('Habilidades e ofertas atualizadas'); }
  else if(b.dataset.interesse){
    const i = b.dataset.interesse;
    interesses = interesses.includes(i) ? interesses.filter(x => x !== i) : [...interesses, i];
    pfGravar('v2PerfilInteresses', interesses); renderInteresses();
  }
  else if(b.dataset.privacidade){ privacidade = b.dataset.privacidade; pfGravar('v2PerfilPrivacidade', privacidade); renderConta(); mostrarAviso('Privacidade atualizada'); }
  else if(b.dataset.msgTodos !== undefined){ msgTodos = !msgTodos; pfGravar('v2PerfilMsgTodos', msgTodos); renderConta(); mostrarAviso(msgTodos ? 'Qualquer membro pode escrever para você' : 'Só os seus amigos podem escrever para você'); }
  else if(b.dataset.mostrarOnline !== undefined){ mostrarOnline = !mostrarOnline; pfGravar('v2PerfilOnline', mostrarOnline); renderConta(); mostrarAviso(mostrarOnline ? 'Seus amigos veem quando você está online' : 'Você aparece como offline para os amigos'); }
  else if(b.dataset.visitante !== undefined) mostrarAviso('Botão que os visitantes veem no seu perfil');
  else if(b.dataset.editarEndereco !== undefined){ pfEditandoArroba = true; renderConta(); document.querySelector('#pfEnderecoForm input').select(); }
  else if(b.dataset.cancelarEndereco !== undefined){ pfEditandoArroba = false; renderConta(); }
  else if(b.dataset.liberarEndereco !== undefined){ pfArrobaEm = 0; pfGravar('v2PerfilArrobaEm', 0); renderConta(); mostrarAviso('Troca liberada (só no protótipo)'); }
  else if(b.dataset.aparecer !== undefined){ aparecer = !aparecer; try { localStorage.setItem('v2PerfilAparecer', aparecer ? '1' : '0'); } catch(e){} renderConta(); mostrarAviso(aparecer ? 'Você aparece na comunidade' : 'Você não aparece mais na comunidade'); }
  else if(b.id === 'pfFoto') mostrarAviso('Trocar foto: fora deste protótipo');
  else if(b.dataset.aviso) mostrarAviso(b.dataset.aviso);
});
renderSobre(false);
renderOferta(false);
renderInteresses();
renderConta();

document.getElementById('pfComunidades').innerHTML = PF_COMUNIDADES.map(k => `
  <a href="${LAYOUT_ROOT}comunidades/inicio.html?org=${k}" class="pf-grupo pf-comunidade"><span class="pf-com-ic">${(typeof ICON !== 'undefined' && ICON[DATA[k].orgIcon]) || icone('comunidades')}</span><span><b>${DATA[k].name.replace('SoftLiving', LOGO)}</b><small>${DATA[k].orgType}</small></span></a>`).join('');
function renderVitrines(){
  const favs = estFavoritos().map(id => ESTABELECIMENTOS.find(x => x.id === id)).filter(Boolean);
  document.getElementById('pfVitrines').innerHTML = favs.length ? favs.map(e => `
    <a href="${urlEstabelecimento(e)}" class="pf-grupo"><img src="${fotoUrl(e.foto, 160)}" alt="" loading="lazy"><span><b>${e.n}</b><small>${e.cat} · ${e.bairro}</small>${e.b ? `<em class="pf-beneficio">${e.b}</em>` : ''}</span></a>`).join('')
    : `<p class="pf-vazio">Nenhuma vitrine favorita ainda. Na página de um estabelecimento, toque em <b>Salvar</b>.</p>`;
}
renderVitrines();

// Salvar o endereço público: confere o formato e se já existe (no protótipo, alguns nomes de exemplo já estão em uso)
const PF_ENDERECOS_EM_USO = ['helenamartins', 'alexandreduarte', 'softliving', 'carteira', 'perfil'];
document.querySelector('main').addEventListener('submit', ev => {
  if(ev.target.id !== 'pfEnderecoForm') return;
  ev.preventDefault();
  const campo = ev.target.arroba, novo = campo.value.trim().toLowerCase().replace(/^@/, ''), erro = ev.target.querySelector('.pf-endereco-erro');
  const problema = !/^[a-z0-9._]{3,30}$/.test(novo) ? 'Use de 3 a 30 letras minúsculas, números, ponto ou sublinhado, sem espaços nem acentos.'
    : PF_ENDERECOS_EM_USO.includes(novo) ? 'Este endereço já está em uso. Escolha outro.' : '';
  if(problema){ erro.textContent = problema; erro.hidden = false; campo.focus(); return; }
  pfEditandoArroba = false;
  if('@' + novo !== PF_ARROBA){
    PF_ARROBA = '@' + novo; pfArrobaEm = Date.now();
    pfGravar('v2PerfilArroba', PF_ARROBA); pfGravar('v2PerfilArrobaEm', pfArrobaEm);
    document.getElementById('pfArroba').textContent = PF_ARROBA;
    mostrarAviso(`Endereço público atualizado. Nova troca a partir de ${pfDia(pfLiberaEm())}`);
  }
  renderConta();
});
