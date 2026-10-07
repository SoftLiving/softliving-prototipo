// Pesquisa de escuta interna: perguntas sorteadas aos poucos (3 a 5 por rodada) no box "Sua opinião vale créditos".
// As perguntas que aparecem em cada página estão no fim deste arquivo (ESCUTA_POR_PAGINA). A lista abaixo é o banco
// original de perguntas (43), guardado para consulta: não é mais mostrado no box.
// Cada pergunta respondida vale 1 crédito de bônus.
// tipo: 'texto' (resposta aberta) | 'escolha' (uma opção) |
//       'varias' (uma ou mais opções) | 'nota' (escala de 0 a 10). Mínimo de caracteres do texto: ESCUTA_MIN_TEXTO, em escuta.js
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

// PESQUISA CONTEXTUAL (decisão de 2026-10-07): as perguntas do box "Sua opinião vale créditos" acompanham a página em
// que a pessoa está. Dez perguntas por contexto, cada uma com as suas respostas. Minhas Comunidades tem pesquisa própria,
// por comunidade (comunidades-escuta.js). As demais páginas usam o contexto "geral": o portal e o propósito da SoftLiving.
// Os números (id) não se repetem entre os contextos; cada contexto guarda o seu andamento em separado.
const ESCUTA_POR_PAGINA = {
  // Conteúdos e a página de cada assunto
  conteudos: [
    { id:101, tipo:'escolha', t:'Que assunto você mais gosta de ler aqui?', op:['Bem-estar','Saúde','Estilo e casa','Viagem','Tecnologia'] },
    { id:102, tipo:'varias',  t:'Você prefere ler, ouvir ou assistir?', op:['Ler','Ouvir','Assistir'] },
    { id:103, tipo:'escolha', t:'Que tamanho de texto você prefere?', op:['Curto, direto ao ponto','Médio','Longo, com profundidade'] },
    { id:104, tipo:'escolha', t:'Os textos parecem feitos para você?', op:['Feitos para mim','Um pouco dos dois','Genéricos'] },
    { id:105, tipo:'escolha', t:'Com que frequência você gostaria de ver conteúdos novos?', op:['Todo dia','Algumas vezes por semana','Uma vez por semana'] },
    { id:106, tipo:'escolha', t:'O preço em créditos dos conteúdos parece justo?', op:['Sim','Depende do conteúdo','Não'] },
    { id:107, tipo:'varias',  t:'O que faz você destravar um conteúdo pago?', op:['O assunto','Quem escreveu','A indicação de um amigo','O resumo'] },
    { id:108, tipo:'escolha', t:'Você costuma salvar conteúdos para ler depois?', op:['Sempre','Às vezes','Nunca'] },
    { id:109, tipo:'varias',  t:'O que você faz depois de ler algo de que gostou?', op:['Curto','Comento','Encaminho a um amigo','Salvo','Só leio'] },
    { id:110, tipo:'texto',   t:'Que assunto está faltando por aqui?' },
  ],
  // Colunas
  colunas: [
    { id:201, tipo:'escolha', t:'Você acompanha algum colunista?', op:['Sim, mais de um','Sim, um','Ainda não'] },
    { id:202, tipo:'varias',  t:'Que tipo de coluna você mais gosta?', op:['Opinião','Dicas práticas','Histórias e crônicas','Análises'] },
    { id:203, tipo:'escolha', t:'O que mais pesa na hora de ler uma coluna?', op:['O tema','Quem escreve','O título'] },
    { id:204, tipo:'escolha', t:'Com que frequência um colunista deveria publicar?', op:['Toda semana','A cada 15 dias','Uma vez por mês'] },
    { id:205, tipo:'escolha', t:'Você lê a coluna do dia?', op:['Sempre','Às vezes','Nunca'] },
    { id:206, tipo:'escolha', t:'Você gostaria de conversar com os colunistas?', op:['Sim, nos comentários','Sim, em encontros ao vivo','Não faço questão'] },
    { id:207, tipo:'varias',  t:'Sobre quais temas você quer mais colunistas?', op:['Saúde','Finanças','Cultura','Tecnologia','Viagens','Gastronomia'] },
    { id:208, tipo:'escolha', t:'A última coluna de cada autor ser gratuita ajuda você a conhecer colunistas novos?', op:['Sim','Um pouco','Não'] },
    { id:209, tipo:'escolha', t:'Você indicaria uma coluna daqui a um amigo?', op:['Sim','Talvez','Não'] },
    { id:210, tipo:'texto',   t:'Que colunista ou especialista você gostaria de ler aqui?' },
  ],
  // Grupos
  grupos: [
    { id:301, tipo:'escolha', t:'De quantos grupos você participa?', op:['Nenhum ainda','Um ou dois','Três ou mais'] },
    { id:302, tipo:'varias',  t:'O que faz você entrar em um grupo?', op:['O tema','Os encontros','Conhecer pessoas','A indicação de um amigo'] },
    { id:303, tipo:'escolha', t:'Você prefere grupos pequenos ou grandes?', op:['Pequenos','Grandes','Tanto faz'] },
    { id:304, tipo:'escolha', t:'Para você, um encontro presencial ainda faz diferença?', op:['Faz diferença','Depende do tema','O digital já basta'] },
    { id:305, tipo:'escolha', t:'Com que frequência você gostaria de encontros?', op:['Toda semana','A cada 15 dias','Uma vez por mês'] },
    { id:306, tipo:'escolha', t:'Você se sente à vontade para escrever nos grupos?', op:['Sim','Mais ou menos','Prefiro só ler'] },
    { id:307, tipo:'varias',  t:'Que tipo de grupo você gostaria de ver mais?', op:['Leitura','Atividade física','Gastronomia','Viagens','Tecnologia','Desapego'] },
    { id:308, tipo:'escolha', t:'Você pagaria créditos por um grupo com curadoria e encontros guiados?', op:['Sim','Depende do tema','Não'] },
    { id:309, tipo:'escolha', t:'Você já fez algum amigo em um grupo daqui?', op:['Sim','Ainda não','Não procuro isso'] },
    { id:310, tipo:'texto',   t:'Que grupo ainda não existe e você gostaria de criar?' },
  ],
  // Vitrines e a página de cada segmento
  vitrine: [
    { id:401, tipo:'varias',  t:'Que tipo de lugar você mais procura?', op:['Gastronomia','Saúde','Bem-estar','Casa','Beleza','Viagem','Pets','Presentes'] },
    { id:402, tipo:'escolha', t:'Você usaria os benefícios para membros nos estabelecimentos?', op:['Sim','Talvez','Não'] },
    { id:403, tipo:'escolha', t:'O que mais pesa na hora de escolher um lugar?', op:['A recomendação de um membro','Ficar perto de casa','O benefício','O preço'] },
    { id:404, tipo:'escolha', t:'Em quem você confia mais para recomendar um lugar?', op:['Meus amigos','Membros dos meus grupos','Qualquer membro','A curadoria'] },
    { id:405, tipo:'escolha', t:'Você prefere lugares perto de casa?', op:['Sim, perto de casa','Tanto faz','Vou longe se valer a pena'] },
    { id:406, tipo:'escolha', t:'Você já visitou algum lugar que conheceu aqui?', op:['Sim','Ainda não, mas pretendo','Não'] },
    { id:407, tipo:'varias',  t:'Que benefício mais te interessa?', op:['Desconto','Cortesia','Hora marcada','Experiência exclusiva'] },
    { id:408, tipo:'escolha', t:'Você escreveria uma recomendação depois de uma boa visita?', op:['Sim','Talvez','Não'] },
    { id:409, tipo:'escolha', t:'Você gostaria de reservar ou agendar direto pela vitrine?', op:['Sim','Tanto faz','Prefiro ligar'] },
    { id:410, tipo:'texto',   t:'Que lugar do seu bairro deveria estar aqui?' },
  ],
  // Geral: o portal e o propósito da SoftLiving (Início, Amigos, Atividades e as demais páginas)
  geral: [
    { id:501, tipo:'escolha', t:'O que mais traz você ao SoftLiving?', op:['Os conteúdos','Os grupos','As pessoas','As vitrines e benefícios'] },
    { id:502, tipo:'escolha', t:'Com que frequência você gostaria de vir aqui?', op:['Todo dia','Algumas vezes por semana','Uma vez por semana'] },
    { id:503, tipo:'varias',  t:'O que mais pesa hoje na sua vida digital?', op:['Excesso de notificações','Falta de conteúdo relevante','Falta de gente de verdade para conversar'] },
    { id:504, tipo:'escolha', t:'Você se sente seguro para informar seus dados aqui?', op:['Sim','Mais ou menos','Não'] },
    { id:505, tipo:'escolha', t:'As letras, os botões e os menus são confortáveis de usar?', op:['Sim, confortáveis','Poderiam ser maiores','Difíceis de usar'] },
    { id:506, tipo:'escolha', t:'Ficou claro o que é pago e o que é grátis?', op:['Sim','Mais ou menos','Não'] },
    { id:507, tipo:'escolha', t:'Um portal sem anúncios faz diferença para você?', op:['Faz muita diferença','Um pouco','Tanto faz'] },
    { id:508, tipo:'varias',  t:'Que tipo de apoio faria diferença na sua rotina?', op:['Curadoria de conteúdo','Comunidade','Encontros','Experiências','Aprendizado'] },
    { id:509, tipo:'escolha', t:'Você mostraria o SoftLiving para seus pais ou amigos?', op:['Sim','Talvez','Não'] },
    { id:510, tipo:'nota',    t:'De 0 a 10, quanto você recomendaria o SoftLiving a um amigo ou familiar?', porque:'Por que sim ou por que não? (opcional)' },
  ],
};
// Qual contexto vale em cada página (data-page do <body>); o que não estiver aqui usa "geral"
const ESCUTA_CONTEXTO = { conteudos:'conteudos', colunas:'colunas', grupos:'grupos', vitrine:'vitrine' };
