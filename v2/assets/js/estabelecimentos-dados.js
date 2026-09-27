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
ESTABELECIMENTOS.forEach((e, i) => e.id = e.id || i);
const urlEstabelecimento = e => `${LAYOUT_ROOT}estabelecimento.html?e=${e.id}`;
