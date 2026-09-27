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
  const termo = semAcentoAj(document.getElementById('ajBusca').value.trim());
  const lista = AJ_PERGUNTAS.filter(([k, p, r]) => (!ajTema || k === ajTema) && (!termo || semAcentoAj(p + ' ' + r).includes(termo)));
  document.getElementById('ajTitulo').textContent = ajTema ? AJ_TEMAS.find(t => t[0] === ajTema)[1] : termo ? 'Resultados' : 'Perguntas frequentes';
  document.getElementById('ajPerguntas').innerHTML = lista.map(([, p, r]) => `
    <details class="aj-pergunta"><summary>${p.replace(/SoftLiving/g, LOGO)}</summary><p>${r.replace(/SoftLiving/g, LOGO)}</p></details>`).join('');
  document.getElementById('ajVazio').hidden = !!lista.length;
}

document.getElementById('ajTemas').addEventListener('click', ev => {
  const b = ev.target.closest('[data-tema]'); if(!b) return;
  ajTema = ajTema === b.dataset.tema ? null : b.dataset.tema;
  renderAjuda();
});
document.getElementById('ajBusca').addEventListener('input', renderAjuda);
document.getElementById('ajForm').addEventListener('submit', ev => {
  ev.preventDefault();
  document.getElementById('ajMsg').value = '';
  mostrarAviso('Mensagem registrada. No protótipo, nada é enviado');
});
renderAjuda();
