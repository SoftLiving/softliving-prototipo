// Dados fictícios dos grupos, usados pela lista (grupos.html) e pela página interna (grupo.html?g=<número>).
// tipo:'desapego': grupo de venda, doação e troca (aba Anúncios). premium: grupo pago com créditos, com débito automático todo mês
// enquanto houver saldo. O preço é definido grupo a grupo, entre as opções de PRECOS_PREMIUM (decisão de 2026-10-06);
// nos exemplos ele é sorteado (ver o fim do arquivo). novos: mensagens novas desde a última visita. participando: se o usuário já está no grupo.
const GRUPOS = [
  {cat:"Gastronomia", icon:"pin", t:"Clube do Vinho", foto:"1510812431401-41d2bd2722f3", d:"Clube gratuito a partir da coluna de vinhos. Cada rodada reúne onde comprar no Rio, o que harmonizar e um encontro para provar juntos.", membros:1, participando:false},
  {cat:"Social", icon:"users", t:"Amigos", foto:"1511632765486-a01980e01a18", d:"Grupo de amigos, gratuito. O Alexandre conduz. O aviso do encontro fica no mural.", membros:3, participando:true, novos:2},
  {cat:"Cinema", icon:"film", t:"Clube do Filme", foto:"1489599849927-2ee91cede3ba", d:"Curadoria mensal de filmes para debate em grupo. Cada rodada traz um filme para assistir e uma conversa marcada.", membros:2, participando:true, premium:true},
  {cat:"Cinema", icon:"film", t:"Cinema em Conversa", foto:"1489599849927-2ee91cede3ba", d:"Espaço gratuito para trocar indicações de filmes e séries. Porta de entrada para o Clube do Filme.", membros:5, participando:true},
  {cat:"Saúde", icon:"wind", t:"Yoga & Meditação", foto:"1544367567-0f2fcb009e0b", d:"Práticas guiadas para todos os níveis, com foco em respiração, alongamento e calma no dia a dia.", membros:18, participando:true},
  {cat:"Cultura", icon:"book", t:"Clube do Livro", foto:"1481627834876-b7833e8f5570", d:"Um livro por mês, escolhido pelo grupo, e um encontro para conversar sobre ele.", membros:24, participando:true},
  {cat:"Tecnologia", icon:"phone", t:"Tecnologia Sem Medo", foto:"1512941937669-90a1b58e7e9c", d:"Tire dúvidas sobre celular, aplicativos e golpes digitais, sem pressa e sem vergonha de perguntar.", membros:31, participando:true, novos:4},
  {cat:"Gastronomia", icon:"restaurant", t:"Culinária Saudável", foto:"1512621776951-a57141f2eefd", d:"Receitas simples e nutritivas, trocas de dicas e desafios semanais na cozinha.", membros:15, participando:true},
  {cat:"Social", icon:"trophy", t:"Copa do Mundo", foto:"1528605248644-14dd04022da1", d:"Para assistir aos jogos juntos, comentar as partidas e fazer o bolão da comunidade.", membros:42, participando:true},
  {cat:"Finanças", icon:"money", t:"Investimentos para 50+", foto:"1551836022-d5d88e9218df", d:"Conversas guiadas sobre como equilibrar segurança e rentabilidade nesta fase da vida.", membros:12, participando:false, premium:true},
  {cat:"Saúde", icon:"heart", t:"Caminhadas no Parque", foto:"1447752875215-b2761acb3c5d", d:"Encontros semanais para caminhar em grupo, no ritmo de cada um, sempre com uma boa conversa.", membros:9, participando:false},
  {cat:"Viagens", icon:"map", t:"Viagens em Grupo", foto:"1502602898657-3e91760cbb34", d:"Roteiros planejados em conjunto, dicas de destinos e companhia para a próxima viagem.", membros:7, participando:false},
  // Grupos de desapego (tipo:'desapego'): no lugar de Tópicos têm a aba Anúncios (venda, doação e troca), ver desapego-dados.js
  {cat:"Desapego", icon:"store", t:"Desapego da Comunidade", foto:"1505691938895-1758d7feb511", d:"Venda, doação e troca entre membros: móveis, roupas, eletrônicos, livros e tudo o que merece um novo lar.", membros:86, participando:true, novos:3, tipo:"desapego"},
  {cat:"Desapego", icon:"pin", t:"Desapego Rio · Zona Sul", foto:"1483985988355-763728e1935b", d:"Desapego entre vizinhos de Copacabana, Ipanema, Leblon, Botafogo e Flamengo, com retirada combinada perto de casa.", membros:41, participando:false, tipo:"desapego"},
  {cat:"Desapego", icon:"book", t:"Troca de Livros", foto:"1481627834876-b7833e8f5570", d:"Leu e quer passar adiante? Troque ou doe livros com outros leitores da comunidade.", membros:33, participando:false, tipo:"desapego"},
  // Mais dois grupos premium de exemplo (no fim da lista, para não mudar o número dos outros grupos)
  {cat:"Saúde", icon:"activity", t:"Pilates e Postura", foto:"1506126613408-eca07ce68773", d:"Aulas guiadas de pilates, com atenção à postura e ao ritmo de cada pessoa.", membros:14, participando:false, premium:true},
  {cat:"Carreira", icon:"briefcase", t:"Empreendedorismo Maduro", foto:"1460925895917-afdab827c52f", d:"Para quem quer abrir ou tocar um negócio depois dos 50, com troca de experiências e mentores convidados.", membros:11, participando:false, premium:true},
];

// Preço dos grupos premium: opções de mensalidade, em créditos por mês (R$1 = 1 crédito). Nos exemplos, cada grupo
// premium recebe uma das opções por sorteio, sem repetir enquanto houver opções; o sorteio vale enquanto a aba do
// navegador estiver aberta, para o preço ser o mesmo na lista e na página do grupo.
const PRECOS_PREMIUM = [5, 10, 15, 20];
(function sortearPrecos(){
  const premium = GRUPOS.filter(g => g.premium);
  let precos = null;
  try { precos = JSON.parse(sessionStorage.getItem('gruposPrecos') || 'null'); } catch(e){}
  if(!Array.isArray(precos) || precos.length !== premium.length || precos.some(p => !PRECOS_PREMIUM.includes(p))){
    precos = [];
    while(precos.length < premium.length){
      const rodada = [...PRECOS_PREMIUM];
      for(let i = rodada.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [rodada[i], rodada[j]] = [rodada[j], rodada[i]]; }
      precos.push(...rodada);
    }
    precos = precos.slice(0, premium.length);
    try { sessionStorage.setItem('gruposPrecos', JSON.stringify(precos)); } catch(e){}
  }
  premium.forEach((g, i) => g.preco = precos[i]);
})();

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