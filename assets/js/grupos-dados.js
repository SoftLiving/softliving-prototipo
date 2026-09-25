// Dados fictícios dos grupos, usados pela lista (grupos.html) e pela página interna (grupo.html?g=<número>).
// tipo:'desapego': grupo de venda, doação e troca (aba Anúncios). premium: grupo pago com créditos. novos: mensagens novas desde a última visita. participando: se o usuário já está no grupo.
const GRUPOS = [
  {cat:"Gastronomia", icon:"pin", t:"Clube do Vinho", d:"Clube gratuito a partir da coluna de vinhos. Cada rodada reúne onde comprar no Rio, o que harmonizar e um encontro para provar juntos.", membros:1, participando:false},
  {cat:"Social", icon:"users", t:"Amigos", d:"Grupo de amigos, gratuito. O Alexandre conduz. O aviso do encontro fica no mural.", membros:3, participando:true, novos:2},
  {cat:"Cinema", icon:"film", t:"Clube do Filme", d:"Curadoria mensal de filmes para debate em grupo. Cada rodada traz um filme para assistir e uma conversa marcada.", membros:2, participando:true, premium:true},
  {cat:"Cinema", icon:"film", t:"Cinema em Conversa", d:"Espaço gratuito para trocar indicações de filmes e séries. Porta de entrada para o Clube do Filme.", membros:5, participando:true},
  {cat:"Saúde", icon:"wind", t:"Yoga & Meditação", d:"Práticas guiadas para todos os níveis, com foco em respiração, alongamento e calma no dia a dia.", membros:18, participando:true},
  {cat:"Cultura", icon:"book", t:"Clube do Livro", d:"Um livro por mês, escolhido pelo grupo, e um encontro para conversar sobre ele.", membros:24, participando:true},
  {cat:"Tecnologia", icon:"phone", t:"Tecnologia Sem Medo", d:"Tire dúvidas sobre celular, aplicativos e golpes digitais, sem pressa e sem vergonha de perguntar.", membros:31, participando:true, novos:4},
  {cat:"Gastronomia", icon:"restaurant", t:"Culinária Saudável", d:"Receitas simples e nutritivas, trocas de dicas e desafios semanais na cozinha.", membros:15, participando:true},
  {cat:"Social", icon:"trophy", t:"Copa do Mundo", d:"Para assistir aos jogos juntos, comentar as partidas e fazer o bolão da comunidade.", membros:42, participando:true},
  {cat:"Finanças", icon:"money", t:"Investimentos para 50+", d:"Conversas guiadas sobre como equilibrar segurança e rentabilidade nesta fase da vida.", membros:12, participando:false, premium:true},
  {cat:"Saúde", icon:"heart", t:"Caminhadas no Parque", d:"Encontros semanais para caminhar em grupo, no ritmo de cada um, sempre com uma boa conversa.", membros:9, participando:false},
  {cat:"Viagens", icon:"map", t:"Viagens em Grupo", d:"Roteiros planejados em conjunto, dicas de destinos e companhia para a próxima viagem.", membros:7, participando:false},
  // Grupos de desapego (tipo:'desapego'): no lugar de Tópicos têm a aba Anúncios (venda, doação e troca), ver desapego-dados.js
  {cat:"Desapego", icon:"store", t:"Desapego da Comunidade", d:"Venda, doação e troca entre membros: móveis, roupas, eletrônicos, livros e tudo o que merece um novo lar.", membros:86, participando:true, novos:3, tipo:"desapego"},
  {cat:"Desapego", icon:"pin", t:"Desapego Rio · Zona Sul", d:"Desapego entre vizinhos de Copacabana, Ipanema, Leblon, Botafogo e Flamengo, com retirada combinada perto de casa.", membros:41, participando:false, tipo:"desapego"},
  {cat:"Desapego", icon:"book", t:"Troca de Livros", d:"Leu e quer passar adiante? Troque ou doe livros com outros leitores da comunidade.", membros:33, participando:false, tipo:"desapego"},
];

// Participar/Sair vale entre as páginas enquanto a aba do navegador estiver aberta (sessão); recarregar mantém.
(function restaurarParticipacao(){
  let salvo = null;
  try { salvo = JSON.parse(sessionStorage.getItem('gruposParticipacao') || 'null'); } catch(e){}
  if(Array.isArray(salvo)) salvo.forEach((s, i) => { if(GRUPOS[i] && s){ GRUPOS[i].participando = s.p; GRUPOS[i].membros = s.m; } });
})();
function salvarParticipacao(){
  try { sessionStorage.setItem('gruposParticipacao', JSON.stringify(GRUPOS.map(g => ({ p:g.participando, m:g.membros })))); } catch(e){}
}
function alternarParticipacao(g, entrar){
  if(g.participando === entrar) return;
  g.participando = entrar;
  g.membros += entrar ? 1 : -1;
  if(!entrar) g.novos = 0;
  salvarParticipacao();
}