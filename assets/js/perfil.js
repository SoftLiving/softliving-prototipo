// VERSÃO 2 · Tela Meu perfil. Dados fictícios do usuário do protótipo (Rafael). Sobre mim e interesses podem ser
// editados e ficam guardados no navegador. Grupos vêm de GRUPOS (os que ele participa); amigos, da página Amigos.
const PF_INTERESSES = ['Saúde e bem-estar', 'Vinhos', 'Viagem', 'Tecnologia', 'Cinema', 'Casa e decoração', 'Gastronomia', 'Leitura', 'Música', 'Moda', 'Longevidade', 'Esportes'];
const PF_AMIGOS = [['AD', '#013565', 'Alexandre'], ['HM', '#7a3b52', 'Helena'], ['MT', '#2f8578', 'Marcos'], ['CR', '#b0513a', 'Célia'], ['BN', '#5b4b8a', 'Beatriz'], ['JA', '#8a6414', 'Jorge']];
const pfLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const pfGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
let sobre = pfLer('v2PerfilSobre', 'Carioca, apaixonado por boas conversas, vinhos brasileiros e viagens sem pressa. Estou na SoftLiving para aprender coisas novas e reencontrar gente com os mesmos interesses.');
let interesses = pfLer('v2PerfilInteresses', ['Vinhos', 'Viagem', 'Tecnologia', 'Longevidade']);
let privacidade = pfLer('v2PerfilPrivacidade', 'Membros');
const grupos = GRUPOS.filter(g => g.participando);
const saldo = SALDO_BASE + lerBonusCreditos();

document.getElementById('pfTopo').innerHTML = `
  <div class="pf-capa"></div>
  <div class="pf-id">
    <span class="pf-avatar">RB</span>
    <div class="pf-nome"><h1>Rafael Barros</h1><p>Rio de Janeiro · Membro da ${LOGO}</p></div>
    <button type="button" class="btn ghost" id="pfFoto">${icone('perfil')}Trocar foto</button>
  </div>
  <div class="pf-numeros">
    <a href="${urlPagina('amigos')}"><b>${PF_AMIGOS.length}</b><span>amigos</span></a>
    <a href="${urlPagina('grupos')}"><b>${grupos.length}</b><span>grupos</span></a>
    <a href="${urlPagina('comunidades')}"><b>3</b><span>comunidades</span></a>
    <a href="${urlPagina('carteira')}"><b>${saldo}</b><span>créditos</span></a>
  </div>`;

function renderSobre(editando){
  document.getElementById('pfSobre').innerHTML = editando
    ? `<textarea id="pfSobreCampo" rows="4" maxlength="400">${sobre}</textarea><div class="pf-editar-acoes"><button type="button" class="btn" id="pfSalvarSobre">Salvar</button><button type="button" class="btn ghost" id="pfCancelarSobre">Cancelar</button></div>`
    : `<p class="pf-sobre">${sobre.replace(/</g, '&lt;').replace(/SoftLiving/g, LOGO)}</p>`;
  document.getElementById('pfEditarSobre').hidden = editando;
}
function renderInteresses(){
  document.getElementById('pfInteresses').innerHTML = PF_INTERESSES.map(i =>
    `<button type="button" class="pf-chip${interesses.includes(i) ? ' on' : ''}" aria-pressed="${interesses.includes(i)}" data-interesse="${i}">${interesses.includes(i) ? '✓ ' : ''}${i}</button>`).join('');
}
document.getElementById('pfGrupos').innerHTML = grupos.map(g => `
  <a href="${urlGrupo(GRUPOS.indexOf(g))}" class="pf-grupo"><img src="${fotoUrl(g.foto, 160)}" alt="" loading="lazy"><span><b>${g.t}</b><small>${g.cat}</small></span></a>`).join('');
document.getElementById('pfAmigos').innerHTML = PF_AMIGOS.map(([s, c, n]) => `
  <a href="${urlPagina('amigos')}" class="pf-amigo"><span class="av-col" style="background:${c}">${s}</span>${n}</a>`).join('');
function renderConta(){
  document.getElementById('pfConta').innerHTML = `
    <div class="pf-linha"><span><b>E-mail</b><small>ra•••••@exemplo.com</small></span><button type="button" class="btn ghost" data-aviso="Troca de e-mail: fora deste protótipo">Alterar</button></div>
    <div class="pf-linha"><span><b>Senha</b><small>••••••••</small></span><button type="button" class="btn ghost" data-aviso="Troca de senha: fora deste protótipo">Alterar</button></div>
    <div class="pf-linha"><span><b>Quem pode ver meu perfil</b><small>Seus grupos e interesses aparecem só para quem você escolher</small></span>
      <div class="seg" id="pfPrivacidade">${['Amigos', 'Membros'].map(o => `<button type="button" class="${o === privacidade ? 'on' : ''}" data-privacidade="${o}">${o === 'Amigos' ? 'Só amigos' : 'Todos os membros'}</button>`).join('')}</div></div>
    <div class="pf-linha"><span><b>Modo simples</b><small>Menos opções na tela e letra maior</small></span><a href="${urlPagina('simples')}" class="btn ghost">Abrir</a></div>
    <div class="pf-linha"><span><b>Sair da conta</b><small>Você pode entrar de novo quando quiser</small></span><button type="button" class="btn ghost pf-sair" data-aviso="Sair: fora deste protótipo">Sair</button></div>`;
}

document.querySelector('main').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.id === 'pfEditarSobre') renderSobre(true);
  else if(b.id === 'pfCancelarSobre') renderSobre(false);
  else if(b.id === 'pfSalvarSobre'){ sobre = document.getElementById('pfSobreCampo').value.trim() || sobre; pfGravar('v2PerfilSobre', sobre); renderSobre(false); mostrarAviso('Sobre mim atualizado'); }
  else if(b.dataset.interesse){
    const i = b.dataset.interesse;
    interesses = interesses.includes(i) ? interesses.filter(x => x !== i) : [...interesses, i];
    pfGravar('v2PerfilInteresses', interesses); renderInteresses();
  }
  else if(b.dataset.privacidade){ privacidade = b.dataset.privacidade; pfGravar('v2PerfilPrivacidade', privacidade); renderConta(); mostrarAviso('Privacidade atualizada'); }
  else if(b.id === 'pfFoto') mostrarAviso('Trocar foto: fora deste protótipo');
  else if(b.dataset.aviso) mostrarAviso(b.dataset.aviso);
});
renderSobre(false);
renderInteresses();
renderConta();
