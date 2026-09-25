// Pesquisa de escuta interna: perguntas sorteadas aos poucos (3 a 5 por rodada) no box "Sua opinião vale créditos".
// Cada pergunta respondida vale 1 crédito de bônus.
// tipo: 'texto' (resposta aberta, mínimo de ESCUTA_MIN_TEXTO caracteres) | 'escolha' (uma opção) |
//       'varias' (uma ou mais opções) | 'nota' (escala de 0 a 10)
const ESCUTA_MIN_TEXTO = 10;
const ESCUTA_PERGUNTAS = [
  // Sua vida digital
  { id:2,  tema:'Sua vida digital', tipo:'varias', t:'Você acessou pelo celular, tablet ou computador?', op:['Celular','Tablet','Computador'] },
  { id:3,  tema:'Sua vida digital', tipo:'escolha', t:'Com que frequência você usa redes sociais e apps de conteúdo?', op:['Várias vezes ao dia','Uma vez por dia','Algumas vezes por semana','Raramente'] },
  { id:4,  tema:'Sua vida digital', tipo:'texto',   t:'Você já participa de alguma comunidade online? Qual?' },
  { id:5,  tema:'Sua vida digital', tipo:'varias', t:'O que mais pesa hoje na sua vida digital?', op:['Excesso de notificações','Falta de conteúdo relevante','Falta de gente de verdade para conversar'] },
  // Primeira impressão e confiança
  { id:6,  tema:'Primeira impressão e confiança', tipo:'texto',   t:'Em 10 segundos na página inicial, o que você acha que o SoftLiving é?' },
  { id:7,  tema:'Primeira impressão e confiança', tipo:'texto',   t:'O que você procura no SoftLiving? E o que encontrou aqui?' },
  { id:8,  tema:'Primeira impressão e confiança', tipo:'texto',   t:'Por que você usa ou usaria o SoftLiving? E por que não usaria?' },
  { id:9,  tema:'Primeira impressão e confiança', tipo:'escolha', t:'Algo pareceu golpe, propaganda ou pouco confiável?', op:['Não','Sim, um pouco','Sim, bastante'] },
  { id:10, tema:'Primeira impressão e confiança', tipo:'escolha', t:'Você se sentiu seguro para informar seus dados?', op:['Sim','Mais ou menos','Não'] },
  { id:11, tema:'Primeira impressão e confiança', tipo:'escolha', t:'Você mostraria o SoftLiving para seus pais ou amigos mais velhos?', op:['Sim','Talvez','Não'] },
  // Cadastro e navegação
  { id:12, tema:'Cadastro e navegação', tipo:'texto',   t:'Quanto tempo levou o cadastro? Você travou em alguma etapa?' },
  { id:13, tema:'Cadastro e navegação', tipo:'escolha', t:'Depois de entrar, você soube qual era o próximo passo?', op:['Sim','Mais ou menos','Não'] },
  { id:14, tema:'Cadastro e navegação', tipo:'texto',   t:'Em que momento você se sentiu perdido?' },
  { id:15, tema:'Cadastro e navegação', tipo:'escolha', t:'As letras, os botões e os menus são confortáveis de usar?', op:['Sim, confortáveis','Poderiam ser maiores','Difíceis de usar'] },
  // Conteúdo
  { id:16, tema:'Conteúdo', tipo:'varias',  t:'Se pudesse reunir tudo em um só lugar, que conteúdos gostaria de encontrar?', op:['Cultura','Saúde','Finanças','Viagens','Tecnologia','Gastronomia','Outro tema'] },
  { id:17, tema:'Conteúdo', tipo:'texto',   t:'Qual conteúdo te chamou mais atenção? E qual não faz sentido estar aqui?' },
  { id:18, tema:'Conteúdo', tipo:'escolha', t:'Os textos parecem feitos para você ou são genéricos?', op:['Feitos para mim','Um pouco dos dois','Genéricos'] },
  { id:19, tema:'Conteúdo', tipo:'varias', t:'Você prefere ler, ouvir ou assistir?', op:['Ler','Ouvir','Assistir'] },
  { id:20, tema:'Conteúdo', tipo:'escolha', t:'Você prefere consumir conteúdo sozinho ou em grupos, com conversa, debate e troca de experiências?', op:['Sozinho','Em grupo','Os dois'] },
  // Comunidade
  { id:21, tema:'Comunidade', tipo:'texto',   t:'Que assunto faria você entrar em um grupo e participar ativamente? Pode ser um tema que ainda não existe no SoftLiving.' },
  { id:22, tema:'Comunidade', tipo:'texto',   t:'O que te deixaria à vontade para puxar conversa com alguém que você não conhece?' },
  { id:23, tema:'Comunidade', tipo:'escolha', t:'Para você, um encontro presencial ainda faz diferença? Ou a experiência digital já basta?', op:['Faz diferença','Depende do tema','O digital já basta'] },
  { id:24, tema:'Comunidade', tipo:'texto',   t:'O que faria você voltar amanhã?' },
  // Valor e dinheiro
  { id:25, tema:'Valor e dinheiro', tipo:'texto',   t:'O que é Crédito no SoftLiving? Explique com suas palavras.' },
  { id:26, tema:'Valor e dinheiro', tipo:'texto',   t:'Como você acha que se conquista Crédito no SoftLiving?' },
  { id:27, tema:'Valor e dinheiro', tipo:'texto',   t:'Como você usaria seus Créditos no SoftLiving?' },
  { id:28, tema:'Valor e dinheiro', tipo:'texto',   t:'O que é pago e o que é grátis?' },
  { id:29, tema:'Valor e dinheiro', tipo:'texto',   t:'Você pagaria por algum conteúdo daqui em vez de um gratuito da web? Por quê?' },
  { id:30, tema:'Valor e dinheiro', tipo:'varias',  t:'Por qual destas coisas você pagaria?', op:['Evento','Curso','Consultoria','Experiência','Desconto em parceiro'] },
  { id:31, tema:'Valor e dinheiro', tipo:'escolha', t:'Qual valor mensal você acharia justo?', op:['Até R$20','De R$20 a R$50','De R$50 a R$100','Mais de R$100'] },
  { id:32, tema:'Valor e dinheiro', tipo:'escolha', t:'Você prefere pagar por uso (créditos) ou uma mensalidade fixa?', op:['Por uso (créditos)','Mensalidade fixa','Tanto faz'] },
  // Oportunidades e parceiros
  { id:33, tema:'Oportunidades e parceiros', tipo:'texto',   t:'Você teria algo para ensinar ou oferecer à comunidade?' },
  { id:34, tema:'Oportunidades e parceiros', tipo:'escolha', t:'Anúncios e patrocinadores te incomodam aqui?', op:['Não incomodam','Um pouco','Incomodam bastante'] },
  { id:35, tema:'Oportunidades e parceiros', tipo:'escolha', t:'Você usaria descontos de lojas, restaurantes e serviços do seu bairro?', op:['Sim','Talvez','Não'] },
  // Apoio e futuro
  { id:36, tema:'Apoio e futuro', tipo:'texto',  t:'O que você espera ganhar usando o SoftLiving?' },
  { id:37, tema:'Apoio e futuro', tipo:'varias', t:'Que tipo de apoio faria diferença na sua rotina?', op:['Curadoria de conteúdo','Comunidade','Encontros','Experiências','Aprendizado','Outro'] },
  { id:38, tema:'Apoio e futuro', tipo:'texto',  t:'O que tornaria sua experiência digital mais simples, prazerosa e útil?' },
  { id:39, tema:'Apoio e futuro', tipo:'texto',  t:'Se pudesse pedir uma nova funcionalidade para o SoftLiving, qual seria?' },
  { id:40, tema:'Apoio e futuro', tipo:'texto',  t:'Se pudesse mudar uma coisa só, o que seria?' },
  // Fechamento
  { id:41, tema:'Fechamento', tipo:'texto', t:'Em uma frase, como você explicaria o SoftLiving para um amigo?' },
  { id:42, tema:'Fechamento', tipo:'nota',  t:'De 0 a 10, quanto você recomendaria o SoftLiving a um amigo ou familiar?', porque:'Por que sim ou por que não? (opcional)' },
  { id:43, tema:'Fechamento', tipo:'texto', t:'E uma última pergunta, talvez a mais importante: o que é um "bom momento" para você?' },
];
