// VERSÃO 2 · Tela Indicações. Indicações fictícias (as duas aprovadas batem com o extrato da Carteira).
// s: 'aprovada' (+5 de bônus), 'cadastro' (a pessoa ainda não terminou o cadastro) ou 'enviado' (convite enviado).
// Convites novos (por e-mail) ficam guardados no navegador; nenhum e-mail é enviado de verdade.
const INDICACOES = [
  { nome:'Helena Martins', cor:'#7a3b52', s:'aprovada' },
  { nome:'Marcos Teixeira', cor:'#2f8578', s:'aprovada' },
  { nome:'Beatriz Nogueira', cor:'#5b4b8a', s:'cadastro' },
  { nome:'paulo.menezes@exemplo.com', s:'enviado' },
];
const IN_STATUS = { aprovada:['Aprovada', '+5 de bônus'], cadastro:['Terminando o cadastro', 'Aguardando'], enviado:['Convite enviado', 'Aguardando'] };
let novos = [];
try { novos = JSON.parse(localStorage.getItem('v2Convites')) || []; } catch(e){}

const inSigla = n => n.includes('@') ? '@' : n.split(' ').slice(0, 2).map(p => p[0]).join('');
function renderIndicacoes(){
  const todas = [...novos.map(email => ({ nome:email, s:'enviado' })), ...INDICACOES];
  const aprovadas = todas.filter(x => x.s === 'aprovada').length;
  document.getElementById('inResumo').innerHTML = `
    <div><b>${aprovadas * 5}</b><span>créditos de bônus ganhos</span></div>
    <div><b>${aprovadas}</b><span>${aprovadas === 1 ? 'indicação aprovada' : 'indicações aprovadas'}</span></div>
    <div><b>${todas.length - aprovadas}</b><span>aguardando</span></div>`;
  document.getElementById('inLista').innerHTML = todas.map(x => `
    <div class="in-item">
      <span class="av-col in-av" style="background:${x.cor || '#9aa3ad'}">${inSigla(x.nome)}</span>
      <div><b>${x.nome}</b><small>${IN_STATUS[x.s][0]}</small></div>
      <span class="in-status ${x.s}">${IN_STATUS[x.s][1]}</span>
    </div>`).join('');
}

document.getElementById('inCopiar').addEventListener('click', () => {
  const link = 'https://' + document.getElementById('inLink').textContent;
  if(navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
  mostrarAviso('Link copiado. É só colar na mensagem para quem você quer convidar');
});
document.getElementById('inEmail').addEventListener('submit', ev => {
  ev.preventDefault();
  const campo = document.getElementById('inEmailCampo');
  const email = campo.value.trim().toLowerCase();
  if(!email) return;
  if(!novos.includes(email)) novos.unshift(email);
  try { localStorage.setItem('v2Convites', JSON.stringify(novos)); } catch(e){}
  campo.value = '';
  renderIndicacoes();
  mostrarAviso(`Convite registrado para ${email} (no protótipo, nenhum e-mail é enviado)`);
});
renderIndicacoes();
