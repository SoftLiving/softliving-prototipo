// VERSÃO 2 · Conteúdo extra das vitrines (fictício), montado por tipo de negócio: galeria (do estabelecimento e dos
// membros), avaliações "Recomendo", clube do estabelecimento, agenda, reservas, amigos que frequentam, acessibilidade,
// horário por dia, quem atende, perguntas e respostas, selos e conteúdos relacionados. Carregar depois de
// estabelecimentos-dados.js e estabelecimentos-catalogo.js.
// Regra: créditos SoftLiving NÃO valem nos estabelecimentos; lá valem só os benefícios para membros.

// Tipo de negócio a partir da categoria
function tipoEst(e){
  const c = e.cat;
  if(/Gastronomia|Restaurante/.test(c)) return 'comida';
  if(/Saúde|Clínica/.test(c)) return 'saude';
  if(/Bem-estar|Spa/.test(c)) return 'bemestar';
  if(/Viagem|Hotel|turismo/.test(c)) return 'viagem';
  if(/Pet/.test(c)) return 'pet';
  if(/Beleza/.test(c)) return 'beleza';
  return 'loja';
}
// Número "aleatório" fixo por estabelecimento (sempre o mesmo resultado para o mesmo id)
const sorteioEst = (e, n) => (((e.id + 3) * 9301 + n * 49297) % 233280) / 233280;

const EXTRAS_TIPO = {
  comida: {
    fotos:['1414235077428-338989a2e8c0', '1504674900247-0877df9cc836', '1498837167922-ddd27525d352', '1517248135467-4c7edcad34c4', '1555396273-367ea4eb4db5', '1510812431401-41d2bd2722f3', '1509440159596-0249088772ff', '1542838132-92c53300491e'],
    reserva:{ rotulo:'Reservar mesa', pergunta:'Quantas pessoas?', opcoes:['1 pessoa', '2 pessoas', '3 pessoas', '4 pessoas', '5 pessoas', '6 ou mais'] },
    dias:[1, 0, 1, 1, 1, 1, 1], abre:12, fecha:23,                       // domingo a sábado (0 = fechado)
    equipe:[['Marina Alencar', 'Chef e dona', 'Cozinha de estação, com ingredientes de pequenos produtores.'], ['Paulo Ribeiro', 'Sommelier', 'Ajuda a escolher o vinho sem complicação.'], ['Rodrigo Tavares', 'Chef de cozinha', 'Receitas de família com um toque contemporâneo.'], ['Luíza Campos', 'Gerente', 'Cuida para que cada mesa seja bem atendida.']],
    acess:['Entrada sem degraus', 'Banheiro adaptado', 'Cardápio com letra grande'], chegar:'Metrô a 5 minutos · estacionamento conveniado na rua de trás',
    eventos:[['Noite de vinhos brasileiros', 'Harmonização com 4 vinhos e pratos do chef.', 'Sexta, 20h'], ['Almoço de domingo em família', 'Menu especial para mesas grandes.', 'Domingo, 12h']],
    ofertas:['Pré-reserva nas noites especiais', 'Prato novo para provar antes do lançamento', 'Convite para o jantar de aniversário da casa'],
    perguntas:[['Tem opções sem glúten?', 'Sim. Avise na reserva e a cozinha adapta os pratos marcados no cardápio.'], ['Aceita grupos grandes?', 'Sim, até 20 pessoas com reserva antecipada.']],
    avaliacoes:[['Jorge A.', 'Cinema em Conversa', 'Atendimento atencioso e comida caprichada. Ótimo para um almoço sem pressa.'], ['Beatriz N.', 'Clube do Filme', 'Fui com minhas irmãs e fomos muito bem recebidas.']],
    relacionados:[['Na Suíça, um vinho para chamar de seu', 'conteudos'], ['Clube do Vinho', 'grupos']],
  },
  saude: {
    fotos:['1519494026892-80bbd2d6fd0d', '1606811971618-4486d14f3f99', '1574258495973-f010dfbb5371', '1571902943202-507ec2618e8f'],
    reserva:{ rotulo:'Agendar consulta', pergunta:'Qual atendimento?', opcoes:null },
    dias:[0, 1, 1, 1, 1, 1, 1], abre:8, fecha:19,
    equipe:[['Dra. Renata Lopes', 'Direção clínica', 'Mais de 20 anos cuidando de pacientes com mais de 50.'], ['Carlos Mendes', 'Recepção', 'Ajuda com agendamentos, convênios e dúvidas.'], ['Dr. Eduardo Farias', 'Especialista', 'Atendimento sem pressa, explicando cada etapa.'], ['Mônica Rezende', 'Coordenação', 'Organiza exames, retornos e lembretes.']],
    acess:['Elevador', 'Banheiro adaptado', 'Cadeira de rodas disponível', 'Atendimento prioritário'], chegar:'Ponto de ônibus em frente · estacionamento próprio',
    eventos:[['Palestra: exames depois dos 50', 'Conversa aberta com a equipe, com perguntas no final.', 'Quinta, 18h']],
    ofertas:['Horários reservados para membros do clube', 'Lembrete de retorno e de exames', 'Palestras exclusivas com a equipe'],
    perguntas:[['Aceita convênio?', 'Sim, os principais. Confirme o seu pelo telefone antes de agendar.'], ['Os resultados são explicados?', 'Sim, em uma consulta de retorno, sem pressa.']],
    avaliacoes:[['Marcos T.', 'Yoga & Meditação', 'Me senti ouvido. Explicaram cada exame com calma.'], ['Jorge A.', 'Cinema em Conversa', 'Pontual e organizado. Saí com tudo resolvido na mesma manhã.']],
    relacionados:[['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'conteudos'], ['Yoga & Meditação', 'grupos']],
  },
  bemestar: {
    fotos:['1544367567-0f2fcb009e0b', '1544161515-4ab6ce6db874', '1506126613408-eca07ce68773', '1529156069898-49953e39b3ac'],
    reserva:{ rotulo:'Agendar horário', pergunta:'Qual atividade?', opcoes:null },
    dias:[1, 1, 1, 1, 1, 1, 1], abre:8, fecha:21,
    equipe:[['Juliana Castro', 'Aulas e turmas', 'Aulas adaptadas para cada corpo, sem pressa.'], ['Ana Paula Reis', 'Terapeuta', 'Massagens e técnicas de relaxamento.'], ['Bruno Salles', 'Fisioterapeuta', 'Acompanha quem está voltando a se exercitar.'], ['Clara Menezes', 'Recepção', 'Ajuda a escolher o melhor horário e atividade.']],
    acess:['Entrada sem degraus', 'Vestiário adaptado', 'Aulas para iniciantes'], chegar:'Ciclovia na porta · estacionamento conveniado',
    eventos:[['Aula aberta de respiração', 'Para quem nunca praticou, com duração de 45 minutos.', 'Sábado, 9h'], ['Tarde de autocuidado', 'Chá, alongamento e conversa.', 'Domingo, 16h']],
    ofertas:['Aula especial só para o clube', 'Prioridade nos horários mais procurados', 'Convite para os eventos de fim de semana'],
    perguntas:[['Preciso ter experiência?', 'Não. As turmas têm atenção individual e há aulas para iniciantes.'], ['O que devo levar?', 'Roupa confortável e uma garrafa de água. O resto a gente tem.']],
    avaliacoes:[['Célia R.', 'grupo Amigos', 'Saio de lá leve. As professoras são muito atenciosas.'], ['Helena M.', 'Clube do Vinho', 'Ambiente silencioso e acolhedor.']],
    relacionados:[['A Coragem de Mudar de Direção', 'conteudos'], ['Yoga & Meditação', 'grupos']],
  },
  viagem: {
    fotos:['1566073771259-6a8506099945', '1542314831-068cd1dbfeeb', '1507525428034-b723cf961d3e', '1488646953014-85cb44e25828', '1483729558449-99ef09a8c325'],
    reserva:{ rotulo:'Pedir reserva', pergunta:'Para quantas pessoas?', opcoes:['1 pessoa', '2 pessoas', '3 pessoas', '4 pessoas', '5 ou mais'] },
    dias:[1, 1, 1, 1, 1, 1, 1], abre:0, fecha:24,
    equipe:[['Fernanda Lima', 'Recepção dos hóspedes', 'Cuida para que cada hóspede se sinta em casa.'], ['Roberto Nunes', 'Roteiros e passeios', 'Monta passeios no ritmo de cada grupo.'], ['Silvia Andrade', 'Consultoria de viagens', 'Planeja cada detalhe antes da saída.'], ['Marcelo Dias', 'Guia', 'Acompanha o grupo do embarque à volta.']],
    acess:['Quarto adaptado', 'Rampa de acesso', 'Transfer com carro acessível'], chegar:'Transfer a partir do Rio mediante reserva',
    eventos:[['Saída em grupo com guia', 'Passeio de dia inteiro com almoço incluso.', 'Sábado, 8h'], ['Noite de música ao vivo', 'Na área comum, aberta aos hóspedes.', 'Sexta, 21h']],
    ofertas:['Pré-venda dos pacotes de feriado', 'Upgrade quando houver disponibilidade', 'Roteiros exclusivos em grupo'],
    perguntas:[['Aceita animais?', 'Pets pequenos, com aviso na reserva.'], ['O café da manhã está incluso?', 'Sim, em todas as diárias.']],
    avaliacoes:[['Beatriz N.', 'Clube do Filme', 'Tudo organizado do começo ao fim. Voltaria amanhã.'], ['Marcos T.', 'Yoga & Meditação', 'Lugar tranquilo, perfeito para descansar.']],
    relacionados:[['Na Suíça, um vinho para chamar de seu', 'conteudos'], ['Amigos', 'grupos']],
  },
  loja: {
    fotos:['1565193566173-7a0ee3dbe261', '1487070183336-b863922373d4', '1586023492125-27b2c045efd7', '1555041469-a586c61ea9bc', '1441986300917-64674bd600d8'],
    reserva:{ rotulo:'Agendar visita', pergunta:'O que você procura?', opcoes:null },
    dias:[0, 1, 1, 1, 1, 1, 1], abre:10, fecha:18,
    equipe:[['Tereza Moura', 'Direção da loja', 'Escolhe pessoalmente cada peça e produto da loja.'], ['Lucas Prado', 'Atendimento', 'Ajuda a montar presentes e encomendas.'], ['Isabel Rocha', 'Peças feitas à mão', 'Cria as peças à mão, uma a uma.'], ['Gustavo Pires', 'Entregas', 'Leva as encomendas com cuidado até a sua porta.']],
    acess:['Entrada sem degraus', 'Atendimento sentado', 'Entrega em casa'], chegar:'Rua de comércio, com vagas para carga e descarga',
    eventos:[['Oficina aberta', 'Aprenda com a equipe da loja, com material incluso.', 'Sábado, 10h']],
    ofertas:['Pré-venda das coleções novas', 'Embalagem de presente especial', 'Convite para as oficinas'],
    perguntas:[['Faz entrega?', 'Sim, no Rio, com agendamento.'], ['Faz embalagem para presente?', 'Sim, sem custo.']],
    avaliacoes:[['Helena M.', 'Clube do Vinho', 'Peças lindas e atendimento sem pressa.'], ['Jorge A.', 'Cinema em Conversa', 'Comprei um presente e acertei em cheio.']],
    relacionados:[['A casa não precisa parecer decorada', 'conteudos'], ['Amigos', 'grupos']],
  },
  pet: {
    fotos:['1543466835-00a7907e9de1', '1548199973-03cce0bbc87b'],
    reserva:{ rotulo:'Agendar serviço', pergunta:'Qual serviço?', opcoes:null },
    dias:[0, 1, 1, 1, 1, 1, 1], abre:8, fecha:19,
    equipe:[['Dr. André Souza', 'Clínica veterinária', 'Atende cães e gatos de todas as idades.'], ['Rita Gomes', 'Banho e tosa', 'Cuida de cada pet com paciência.']],
    acess:['Entrada sem degraus', 'Leva e traz', 'Estacionamento em frente'], chegar:'Rua residencial, com vagas em frente',
    eventos:[['Dia da vacinação', 'Vacinas com preço especial e orientação do veterinário.', 'Sábado, 9h']],
    ofertas:['Lembrete de vacinas e vermífugo', 'Horários reservados no banho e tosa', 'Convite para os dias de adoção'],
    perguntas:[['Atende gatos?', 'Sim, com horários separados para eles ficarem mais tranquilos.'], ['Tem leva e traz?', 'Sim, no bairro, com agendamento.']],
    avaliacoes:[['Célia R.', 'grupo Amigos', 'Meu cachorro volta feliz e cheiroso.'], ['Alexandre D.', 'grupo Amigos', 'Veterinário muito cuidadoso.']],
    relacionados:[['Mais conexão, menos solidão', 'conteudos'], ['Amigos', 'grupos']],
  },
  beleza: {
    fotos:['1560066984-138dadb4c035', '1515886657613-9f3515b0c78f'],
    reserva:{ rotulo:'Agendar horário', pergunta:'Qual serviço?', opcoes:null },
    dias:[0, 0, 1, 1, 1, 1, 1], abre:9, fecha:19,
    equipe:[['Sandra Costa', 'Cortes e coloração', 'Especialista em cortes e cabelos grisalhos.'], ['Vera Lima', 'Mãos e pés', 'Atendimento cuidadoso, com hora marcada.']],
    acess:['Entrada sem degraus', 'Lavatório adaptado', 'Atendimento prioritário'], chegar:'A duas quadras do metrô',
    eventos:[['Tarde de cuidados', 'Dicas de cuidados com os cabelos grisalhos.', 'Sábado, 15h']],
    ofertas:['Horários reservados para o clube', 'Lançamentos antes de todo mundo', 'Convite para as tardes de cuidados'],
    perguntas:[['Precisa marcar horário?', 'Sim, para não ter espera.'], ['Trabalham com cabelos grisalhos?', 'Sim, é uma das especialidades da casa.']],
    avaliacoes:[['Beatriz N.', 'Clube do Filme', 'Finalmente um salão que entende cabelo grisalho!'], ['Helena M.', 'Clube do Vinho', 'Pontuais e atenciosas.']],
    relacionados:[['A Moda Finalmente Descobriu que Você Existe', 'conteudos'], ['Amigos', 'grupos']],
  },
};
const AMIGOS_EST = [['Alexandre', '#013565'], ['Helena', '#7a3b52'], ['Marcos', '#2f8578'], ['Célia', '#b0513a'], ['Beatriz', '#5b4b8a'], ['Jorge', '#8a6414']];
const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

// Quem atende: as funções vêm do tipo de negócio; os nomes mudam por estabelecimento (o Bistrô Alecrim mantém a
// chef Marina Alencar, citada no texto dele)
const NOMES_EQ = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Elisa', 'Fábio', 'Gabriela', 'Henrique', 'Irene', 'João', 'Laura', 'Mário', 'Natália', 'Otávio', 'Patrícia', 'Ricardo', 'Sílvia', 'Tiago', 'Vânia', 'Wagner'];
const NOMES_FEM = ['Ana', 'Carla', 'Elisa', 'Gabriela', 'Irene', 'Laura', 'Natália', 'Patrícia', 'Sílvia', 'Vânia'];
const SOBRENOMES_EQ = ['Almeida', 'Barbosa', 'Cardoso', 'Duarte', 'Esteves', 'Figueiredo', 'Gouveia', 'Honorato', 'Ibrahim', 'Jardim', 'Leal', 'Moreira', 'Nogueira', 'Oliveira', 'Pacheco', 'Queiroz', 'Rezende', 'Sampaio', 'Teles', 'Vasconcelos'];
function equipeDe(e, x){
  return [0, 1].map(i => {
    const [n, funcao, texto] = x.equipe[(e.id + i) % x.equipe.length];
    if(e.id === 0) return x.equipe[i];
    const nome = NOMES_EQ[(e.id * 3 + i * 7) % NOMES_EQ.length];
    const titulo = /^Dra?\. /.test(n) ? (NOMES_FEM.includes(nome) ? 'Dra. ' : 'Dr. ') : '';
    return [titulo + nome + ' ' + SOBRENOMES_EQ[(e.id * 7 + i * 3) % SOBRENOMES_EQ.length], funcao, texto];
  });
}

// Monta os extras de um estabelecimento (sem sobrescrever o que ele já tiver)
function extrasDe(e){
  const x = EXTRAS_TIPO[tipoEst(e)];
  const fotos = [...new Set([e.foto, ...(e.galeria || []), ...x.fotos])];
  const recomendam = 12 + Math.round(sorteioEst(e, 1) * 40);
  const amigos = AMIGOS_EST.filter((_, i) => sorteioEst(e, i + 2) > .55).slice(0, 4);
  // agenda: próximos dias a partir de hoje (datas de evento, não de publicação)
  const hoje = new Date();
  const eventos = x.eventos.map(([t, d, quando], i) => {
    const dt = new Date(hoje); dt.setDate(hoje.getDate() + 3 + i * 6);
    return { t, d, quando, dia:String(dt.getDate()).padStart(2, '0'), mes:MESES[dt.getMonth()] };
  });
  return {
    tipo:tipoEst(e), fotos:fotos.slice(0, 6), fotosMembros:[...fotos].reverse().slice(0, 4),
    recomendam, naoRecomendam:1 + Math.round(sorteioEst(e, 9) * 2),
    avaliacoes:[...(e.avaliacoes || []), ...x.avaliacoes].slice(0, 4),
    amigos, eventos, equipe:equipeDe(e, x), acess:x.acess, chegar:x.chegar, dias:x.dias, abre:x.abre, fecha:x.fecha,
    reserva:x.reserva, ofertas:x.ofertas, perguntas:x.perguntas, relacionados:x.relacionados,
    clube:`Clube ${e.n}`, clubeMembros:20 + Math.round(sorteioEst(e, 7) * 120),
  };
}
function abertoAgora(x){
  const d = new Date(), h = d.getHours() + d.getMinutes() / 60;
  return !!x.dias[d.getDay()] && h >= x.abre && h < x.fecha;
}
const horaTxt = h => h === 24 ? '24h' : `${h}h`;
