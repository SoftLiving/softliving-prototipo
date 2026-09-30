// VERSÃO 2 · Estabelecimentos (fictícios) da Vitrine: marcas, produtos e serviços.
// Usados pela Vitrine (vitrine.html) e pela página de cada um (estabelecimento.html?e=<id>).
// cor: cor do "logo" (monograma com as iniciais). b: benefício para membros. Os campos da página (sobre, galeria,
// endereco, horario, telefone, site) são opcionais: o que faltar não aparece.
const ESTABELECIMENTOS = [
  { n:'Bistrô Alecrim', cat:'Gastronomia', bairro:'Leblon', foto:'1517248135467-4c7edcad34c4', cor:'#7a3b52', d:'Cozinha de estação, com horta própria e carta de vinhos brasileiros.', b:'Sobremesa cortesia' },
  { n:'Estúdio Respira', cat:'Bem-estar', bairro:'Gávea', foto:'1544367567-0f2fcb009e0b', cor:'#2f8578', d:'Pilates e yoga em turmas pequenas, com atenção a cada aluno.', b:'Primeira aula grátis' },
  { n:'Ateliê Linho & Barro', cat:'Casa', bairro:'Jardim Botânico', foto:'1565193566173-7a0ee3dbe261', cor:'#8a6414', d:'Cerâmica feita à mão e oficinas aos sábados.', b:'15% nas peças' },
  { n:'Clínica Vitalis', cat:'Saúde', bairro:'Botafogo', foto:'1519494026892-80bbd2d6fd0d', cor:'#013565', d:'Check-up completo em uma manhã, com geriatra e nutricionista.', b:'Avaliação inicial sem custo' },
  { n:'Pousada Mar de Dentro', cat:'Viagem', bairro:'Paraty', foto:'1566073771259-6a8506099945', cor:'#3f6b8f', d:'Seis suítes de frente para o mar e café da manhã caseiro.', b:'1 noite extra a cada 3' },
  { n:'Vinhos da Serra', cat:'Gastronomia', bairro:'Leblon', foto:'1510812431401-41d2bd2722f3', cor:'#5b2a3a', d:'Importadora pequena com degustações às quintas.', b:'Degustação para dois' },
  { n:'Padaria Fermento Lento', cat:'Gastronomia', bairro:'Humaitá', foto:'1509440159596-0249088772ff', cor:'#b0513a', d:'Pães de longa fermentação, saindo do forno às 7h.', b:'Café cortesia' },
  { n:'Pet Jardim', cat:'Pets', bairro:'Barra', foto:'1543466835-00a7907e9de1', cor:'#1F5519', d:'Banho, tosa e veterinário no mesmo lugar.', b:'Primeiro banho cortesia' },
  { n:'Salão Corte Fino', cat:'Beleza', bairro:'Copacabana', foto:'1560066984-138dadb4c035', cor:'#5b4b8a', d:'Corte, coloração e manicure com hora marcada.', b:'10% nos serviços' },
  { n:'Floricultura Ramo', cat:'Presentes', bairro:'Laranjeiras', foto:'1487070183336-b863922373d4', cor:'#2f5d3a', d:'Arranjos da estação e assinatura de flores.', b:'Entrega grátis' },
  { n:'Casa Tereza Empório', cat:'Gastronomia', bairro:'Ipanema', foto:'1542838132-92c53300491e', cor:'#8a5a0e', d:'Queijos, azeites e pães para montar a mesa do fim de semana.', b:'10% nas compras' },
  { n:'Ótica Nitidez', cat:'Saúde', bairro:'Tijuca', foto:'1574258495973-f010dfbb5371', cor:'#2c4a7c', d:'Exame de vista e armações leves para o dia a dia.', b:'20% nas lentes' },
];

// Bistrô Alecrim: exemplo completo da página do estabelecimento
Object.assign(ESTABELECIMENTOS[0], {
  sobre:'Uma casa pequena no Leblon, com doze mesas e cozinha aberta. O cardápio muda com a estação e boa parte das ervas vem da horta no quintal. A carta de vinhos é só de produtores brasileiros, escolhidos pela própria dona, a chef Marina Alencar.',
  galeria:['1504674900247-0877df9cc836', '1498837167922-ddd27525d352', '1414235077428-338989a2e8c0', '1510812431401-41d2bd2722f3'],
  beneficioDet:'Mostre sua carteira SoftLiving ao fazer o pedido e ganhe a sobremesa do dia.',
  endereco:'Rua Dias Ferreira, 000 · Leblon, Rio de Janeiro',
  horario:'Terça a sábado, 12h às 23h · Domingo, 12h às 17h',
  telefone:'(21) 0000-0000',
  site:'bistroalecrim.com.br',
});
// Estabelecimentos que antes apareciam como "comunidades" em Minhas Comunidades (hotel, restaurante, turismo, clínica,
// spa e pet shop): são negócios abertos ao público, então usam o layout de vitrine. novidades: avisos e ofertas da marca.
ESTABELECIMENTOS.push(
  { n:'Hotel Vista Mar', cat:'Hotel', bairro:'Búzios', foto:'1542314831-068cd1dbfeeb', cor:'#3f6b8f', d:'Hotel à beira-mar com piscina, spa e café da manhã regional.', b:'Late checkout grátis',
    sobre:'Quarenta quartos de frente para o mar, piscina aquecida e um café da manhã com frutas e pães da região. Ideal para descansar sem pressa, a duas horas e meia do Rio.',
    beneficioDet:'Informe que é membro SoftLiving na reserva e fique no quarto até as 16h no dia da saída.',
    endereco:'Orla Bardot, 000 · Búzios, RJ', horario:'Recepção 24 horas', telefone:'(22) 0000-0000', site:'hotelvistamar.com.br',
    novidades:[['Pacote de primavera', 'Três noites com jantar incluso na segunda noite.'], ['Piscina reaberta', 'A piscina aquecida voltou a funcionar todos os dias, das 8h às 20h.']] },
  { n:'Restaurante Sabor & Arte', cat:'Restaurante', bairro:'Botafogo', foto:'1555396273-367ea4eb4db5', cor:'#b0513a', d:'Cozinha brasileira contemporânea, com almoço executivo e música ao vivo às sextas.', b:'Sobremesa cortesia',
    sobre:'Um salão amplo e iluminado, com cozinha brasileira feita com produtores locais. No almoço, menu executivo; à noite, pratos para dividir e música ao vivo às sextas.',
    beneficioDet:'Mostre sua carteira SoftLiving e ganhe a sobremesa do dia no jantar.',
    endereco:'Rua Voluntários da Pátria, 000 · Botafogo, Rio de Janeiro', horario:'Terça a domingo, 12h às 23h', telefone:'(21) 0000-0000', site:'saborearte.com.br',
    galeria:['1414235077428-338989a2e8c0', '1504674900247-0877df9cc836', '1498837167922-ddd27525d352', '1510812431401-41d2bd2722f3'],
    novidades:[['Noite de vinhos', 'Harmonização com vinhos brasileiros na última sexta do mês.'], ['Novo menu de primavera', 'Pratos mais leves com ingredientes da estação.']] },
  { n:'Bella Viagens', cat:'Agência de turismo', bairro:'Copacabana', foto:'1488646953014-85cb44e25828', cor:'#2f8578', d:'Roteiros no Brasil e no exterior, com viagens em grupo pensadas para quem quer conforto.', b:'5% nos roteiros em grupo',
    sobre:'Agência com mais de vinte anos organizando viagens tranquilas, com guia acompanhando o grupo do embarque à volta. Roteiros culturais, gastronômicos e de natureza.',
    endereco:'Av. Nossa Senhora de Copacabana, 000 · Rio de Janeiro', horario:'Segunda a sexta, 9h às 18h', telefone:'(21) 0000-0000', site:'bellaviagens.com.br',
    novidades:[['Grupo para Portugal', 'Saída em grupo com guia para Lisboa e Porto. Vagas limitadas.']] },
  { n:'Clínica SorrisoTotal', cat:'Clínica odontológica', bairro:'Tijuca', foto:'1606811971618-4486d14f3f99', cor:'#013565', d:'Odontologia para todas as idades, com atendimento sem pressa e horário estendido.', b:'Avaliação sem custo',
    sobre:'Equipe de dentistas especializada em prótese, implantes e cuidado preventivo, com consultas longas e explicação de cada etapa do tratamento.',
    endereco:'Rua Conde de Bonfim, 000 · Tijuca, Rio de Janeiro', horario:'Segunda a sábado, 8h às 20h', telefone:'(21) 0000-0000',
    novidades:[['Mês da prevenção', 'Limpeza e avaliação com condições especiais para membros.']] },
  { n:'Zen Wellness Spa', cat:'Spa e bem-estar', bairro:'Barra', foto:'1544161515-4ab6ce6db874', cor:'#5b4b8a', d:'Massagens, tratamentos e dias de spa para relaxar de verdade.', b:'15% no dia de spa',
    sobre:'Um espaço silencioso com salas de massagem, sauna e área de descanso. Os pacotes de dia de spa incluem almoço leve e chá da tarde.',
    endereco:'Av. das Américas, 000 · Barra da Tijuca, Rio de Janeiro', horario:'Todos os dias, 9h às 21h', telefone:'(21) 0000-0000', site:'zenwellness.com.br',
    novidades:[['Dia de spa a dois', 'Pacote com massagem para duas pessoas e almoço incluso.']] },
  { n:'Pet Shop Amigo Fiel', cat:'Pet shop', bairro:'Laranjeiras', foto:'1548199973-03cce0bbc87b', cor:'#1F5519', d:'Banho, tosa, veterinário e ração com entrega no bairro.', b:'Primeiro banho cortesia',
    sobre:'Pet shop de bairro com veterinário todos os dias, banho e tosa com hora marcada e entrega de ração e remédios na porta de casa.',
    beneficioDet:'No primeiro banho, mostre sua carteira SoftLiving e não pague nada.',
    endereco:'Rua das Laranjeiras, 000 · Rio de Janeiro', horario:'Segunda a sábado, 8h às 19h', telefone:'(21) 0000-0000',
    novidades:[['Campanha de vacinação', 'Vacinas com desconto para cães e gatos neste mês.'], ['Entrega grátis', 'Pedidos acima de R$100 no bairro não pagam entrega.']] },
);
ESTABELECIMENTOS.forEach((e, i) => e.id = e.id || i);
const urlEstabelecimento = e => `${LAYOUT_ROOT}estabelecimento.html?e=${e.id}`;

// Estabelecimentos incluídos em Minhas Comunidades (botão na página de cada um); ficam guardados no navegador
// Sem nada guardado, começa com três estabelecimentos já incluídos (para o painel ter exemplos)
const EST_INICIAIS = ['Hotel Vista Mar', 'Restaurante Sabor & Arte', 'Pet Shop Amigo Fiel'];
function estNasComunidades(){
  try { const v = JSON.parse(localStorage.getItem('v2EstComunidades')); if(Array.isArray(v)) return v; } catch(e){}
  return EST_INICIAIS.map(n => (ESTABELECIMENTOS.find(x => x.n === n) || {}).id).filter(x => x != null);
}
function definirEstNasComunidades(id, incluir){
  const lista = estNasComunidades().filter(x => x !== id);
  if(incluir) lista.push(id);
  try { localStorage.setItem('v2EstComunidades', JSON.stringify(lista)); } catch(e){}
}
// Vitrines favoritas (botão Salvar da página de cada estabelecimento); aparecem no Meu perfil.
// Sem nada guardado, começa com três favoritas de exemplo.
const EST_FAVORITOS_INICIAIS = ['Bistrô Alecrim', 'Estúdio Respira', 'Vinhos da Serra'];
function estFavoritos(){
  try { const v = JSON.parse(localStorage.getItem('v2EstFavoritos')); if(Array.isArray(v)) return v; } catch(e){}
  return EST_FAVORITOS_INICIAIS.map(n => (ESTABELECIMENTOS.find(x => x.n === n) || {}).id).filter(x => x != null);
}
function definirEstFavorito(id, favorito){
  const lista = estFavoritos().filter(x => x !== id);
  if(favorito) lista.push(id);
  try { localStorage.setItem('v2EstFavoritos', JSON.stringify(lista)); } catch(e){}
}
const siglaEstab = n => n.replace(/&/g, '').split(/\s+/).filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('');
