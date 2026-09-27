// VERSÃO 2 · Produtos e serviços de cada estabelecimento (fictícios), usados na página do estabelecimento e no painel
// Minhas Comunidades. Carregar depois de estabelecimentos-dados.js.
// Por estabelecimento (todos os campos opcionais; o que faltar não aparece):
//   secao: título da seção (Cardápio, Tratamentos, Quartos e pacotes...)
//   grupos: [[nome do grupo, [[produto ou serviço, descrição, preço, selo opcional], ...]], ...]
//   extras: comodidades e formas de pagamento (aparecem como etiquetas)
//   avaliacoes: [[quem, de onde, texto]] (o que a comunidade diz)
//   sobre, endereco, horario, telefone, site: completam quem ainda não tinha (não sobrescrevem)
const CATALOGO = {
  'Bistrô Alecrim': { secao:'Cardápio',
    grupos:[
      ['Entradas', [['Burrata com tomates da horta', 'Tomates assados, pesto de manjericão e pão de fermentação natural.', 'R$58', 'Mais pedido'], ['Bolinhos de bacalhau', 'Seis unidades, com maionese de limão-siciliano.', 'R$46']]],
      ['Pratos principais', [['Peixe do dia na manteiga de ervas', 'Com purê de mandioquinha e legumes da estação.', 'R$96'], ['Risoto de cogumelos', 'Arbóreo, cogumelos frescos e parmesão.', 'R$84', 'Vegetariano'], ['Costela de 12 horas', 'Com farofa de banana e couve crocante.', 'R$98']]],
      ['Sobremesas', [['Pudim de tapioca', 'Com calda de coco queimado.', 'R$32'], ['Torta de limão', 'Merengue tostado na hora.', 'R$34']]],
    ],
    extras:['Reserva pelo telefone', 'Acessível para cadeira de rodas', 'Opções vegetarianas', 'Pix e cartão'],
    avaliacoes:[['Helena M.', 'Clube do Vinho', 'A costela é inesquecível e a equipe explica cada vinho com calma.'], ['Célia R.', 'grupo Amigos', 'Salão tranquilo, dá para conversar sem gritar. Voltamos sempre.']] },

  'Estúdio Respira': { secao:'Aulas e planos',
    sobre:'Estúdio pequeno na Gávea, com turmas de no máximo seis alunos. As aulas de pilates e yoga são adaptadas para cada corpo, com atenção especial a quem está voltando a se exercitar.',
    endereco:'Rua Marquês de São Vicente, 000 · Gávea, Rio de Janeiro', horario:'Segunda a sábado, 7h às 20h', telefone:'(21) 0000-0000',
    grupos:[
      ['Aulas', [['Pilates em aparelhos', 'Turma de até 6 alunos, 50 minutos.', 'R$95 a aula'], ['Yoga suave', 'Respiração, alongamento e equilíbrio.', 'R$70 a aula', 'Para iniciantes'], ['Aula experimental', 'Conheça o estúdio sem compromisso.', 'Grátis']]],
      ['Planos mensais', [['2 vezes por semana', 'Pilates ou yoga, horário fixo.', 'R$520 por mês', 'Mais escolhido'], ['3 vezes por semana', 'Pode alternar entre pilates e yoga.', 'R$690 por mês']]],
    ],
    extras:['Turmas pequenas', 'Estacionamento conveniado', 'Pix e cartão'],
    avaliacoes:[['Marcos T.', 'Yoga & Meditação', 'Minhas costas agradecem toda semana. Professora muito atenta.']] },

  'Ateliê Linho & Barro': { secao:'Peças e oficinas',
    sobre:'Ateliê de cerâmica feita à mão, com peças de uso diário e oficinas aos sábados. Cada peça é única, queimada no forno do próprio ateliê.',
    endereco:'Rua Pacheco Leão, 000 · Jardim Botânico, Rio de Janeiro', horario:'Terça a sábado, 10h às 18h', telefone:'(21) 0000-0000',
    grupos:[
      ['Peças', [['Jogo de 4 pratos rasos', 'Esmalte areia, feitos à mão.', 'R$320'], ['Caneca de 300 ml', 'Várias cores, vai ao micro-ondas.', 'R$78', 'Mais vendida'], ['Vaso médio', 'Acabamento rústico, 25 cm.', 'R$190']]],
      ['Oficinas', [['Oficina de modelagem', 'Sábado de manhã, 3 horas, material incluso.', 'R$260', 'Vagas limitadas'], ['Curso de torno', '4 encontros, turma de 5 pessoas.', 'R$880']]],
    ],
    extras:['Embalagem para presente', 'Entrega no Rio', 'Pix e cartão'] },

  'Clínica Vitalis': { secao:'Check-ups e consultas',
    sobre:'Clínica de medicina preventiva com foco em quem tem mais de 50 anos. O check-up é feito numa só manhã, com resultados explicados em uma consulta de retorno.',
    endereco:'Rua Voluntários da Pátria, 000 · Botafogo, Rio de Janeiro', horario:'Segunda a sexta, 7h às 19h', telefone:'(21) 0000-0000',
    grupos:[
      ['Check-ups', [['Check-up 50+', 'Exames de sangue, cardiológicos e consulta com geriatra, numa manhã.', 'R$1.450', 'Mais procurado'], ['Check-up cardiológico', 'Eletrocardiograma, ecocardiograma e teste de esforço.', 'R$980']]],
      ['Consultas', [['Geriatria', 'Consulta de 60 minutos.', 'R$420'], ['Nutrição', 'Plano alimentar personalizado.', 'R$280'], ['Retorno com resultados', 'Explicação dos exames, sem pressa.', 'Incluso no check-up']]],
    ],
    extras:['Aceita convênios', 'Estacionamento', 'Acessível para cadeira de rodas'] },

  'Pousada Mar de Dentro': { secao:'Suítes e pacotes',
    sobre:'Seis suítes de frente para o mar, em Paraty, com café da manhã caseiro servido na varanda. Um lugar para descansar, caminhar pelo centro histórico e passear de barco.',
    endereco:'Praia do Jabaquara, 000 · Paraty, RJ', horario:'Check-in às 14h · check-out às 12h', telefone:'(24) 0000-0000',
    grupos:[
      ['Suítes', [['Suíte jardim', 'Cama queen, varanda para o jardim.', 'R$520 a diária'], ['Suíte vista mar', 'Varanda de frente para o mar, banheira.', 'R$690 a diária', 'Mais reservada']]],
      ['Pacotes', [['Fim de semana em Paraty', '2 noites, café da manhã e passeio de barco.', 'R$1.690 para dois'], ['Semana tranquila', '5 noites com um jantar incluso.', 'R$3.300 para dois']]],
    ],
    extras:['Café da manhã incluso', 'Wi-Fi', 'Aceita pets pequenos', 'Pix e cartão'] },

  'Vinhos da Serra': { secao:'Vinhos e degustações',
    sobre:'Importadora pequena de vinhos do Brasil, de Portugal e da Suíça, com degustações às quintas-feiras e atendimento que ajuda a escolher sem complicação.',
    endereco:'Rua Dias Ferreira, 000 · Leblon, Rio de Janeiro', horario:'Segunda a sábado, 11h às 20h', telefone:'(21) 0000-0000',
    grupos:[
      ['Vinhos', [['Tinto da Serra Gaúcha', 'Merlot, fácil de harmonizar.', 'R$89'], ['Branco suíço do Valais', 'Chasselas, leve e mineral.', 'R$210', 'Novidade'], ['Espumante nature', 'Método tradicional, Pinto Bandeira.', 'R$128']]],
      ['Degustações', [['Degustação de quinta', '5 vinhos com petiscos, às 19h.', 'R$120 por pessoa', 'Mais procurada'], ['Degustação particular', 'Para até 8 pessoas, com sommelier.', 'R$1.200']]],
    ],
    extras:['Entrega no Rio', 'Kits para presente', 'Pix e cartão'],
    avaliacoes:[['Helena M.', 'Clube do Vinho', 'A degustação de quinta virou nosso programa fixo.']] },

  'Padaria Fermento Lento': { secao:'Pães e cafés',
    sobre:'Padaria de fermentação natural no Humaitá. Os pães descansam por até 48 horas e saem do forno às 7h, junto com o café coado na hora.',
    endereco:'Rua Humaitá, 000 · Humaitá, Rio de Janeiro', horario:'Todos os dias, 7h às 19h', telefone:'(21) 0000-0000',
    grupos:[
      ['Pães', [['Pão de campanha', 'Fermentação natural, 800 g.', 'R$32', 'Mais vendido'], ['Pão de centeio', 'Com sementes, 600 g.', 'R$28'], ['Croissant de manteiga', 'Folhado, feito todas as manhãs.', 'R$14']]],
      ['Café da manhã', [['Café coado e pão na chapa', 'Com manteiga e geleia da casa.', 'R$24'], ['Tostada de ovos mexidos', 'No pão de campanha, com salada.', 'R$36']]],
    ],
    extras:['Encomendas', 'Opções sem lactose', 'Pix e cartão'],
    avaliacoes:[['Célia R.', 'grupo Amigos', 'O pão mais honesto do bairro. Chego cedo para pegar quentinho.']] },

  'Pet Jardim': { secao:'Serviços e produtos',
    sobre:'Clínica veterinária e pet shop na Barra, com banho e tosa com hora marcada e veterinário todos os dias.',
    endereco:'Av. das Américas, 000 · Barra da Tijuca, Rio de Janeiro', horario:'Segunda a sábado, 8h às 20h', telefone:'(21) 0000-0000',
    grupos:[
      ['Serviços', [['Banho', 'Porte pequeno, com secagem e perfume.', 'R$65'], ['Banho e tosa', 'Porte pequeno ou médio.', 'R$110', 'Mais pedido'], ['Consulta veterinária', 'Com carteira de vacinação atualizada.', 'R$180']]],
      ['Produtos', [['Ração premium 10 kg', 'Para cães adultos.', 'R$289'], ['Cama ortopédica', 'Para cães idosos, tamanho M.', 'R$240']]],
    ],
    extras:['Leva e traz', 'Veterinário todos os dias', 'Pix e cartão'] },

  'Salão Corte Fino': { secao:'Serviços',
    sobre:'Salão de bairro em Copacabana, com hora marcada, atendimento sem pressa e profissionais especializados em cabelos grisalhos.',
    endereco:'Rua Barata Ribeiro, 000 · Copacabana, Rio de Janeiro', horario:'Terça a sábado, 9h às 19h', telefone:'(21) 0000-0000',
    grupos:[
      ['Cabelo', [['Corte feminino', 'Com lavagem e escova.', 'R$140'], ['Corte masculino', 'Tesoura ou máquina.', 'R$70'], ['Tonalização para grisalhos', 'Realça os fios brancos, sem cobrir.', 'R$180', 'Especialidade']]],
      ['Mãos e pés', [['Manicure', 'Esmaltação tradicional.', 'R$45'], ['Pé e mão', 'Com hidratação.', 'R$85']]],
    ],
    extras:['Hora marcada', 'Acessível para cadeira de rodas', 'Pix e cartão'] },

  'Floricultura Ramo': { secao:'Arranjos e assinaturas',
    sobre:'Floricultura em Laranjeiras com flores da estação e assinaturas semanais, entregues em casa com um cartão escrito à mão.',
    endereco:'Rua das Laranjeiras, 000 · Rio de Janeiro', horario:'Segunda a sábado, 8h às 18h', telefone:'(21) 0000-0000',
    grupos:[
      ['Arranjos', [['Buquê da estação', 'Flores escolhidas no dia.', 'R$120', 'Mais pedido'], ['Arranjo em vaso de cerâmica', 'Para mesa de jantar.', 'R$190'], ['Orquídea branca', 'Em vaso, com cuidados explicados.', 'R$150']]],
      ['Assinaturas', [['Flores toda semana', 'Um buquê por semana, entregue às sextas.', 'R$360 por mês'], ['Flores a cada 15 dias', 'Dois buquês por mês.', 'R$200 por mês']]],
    ],
    extras:['Entrega no mesmo dia', 'Cartão escrito à mão', 'Pix e cartão'] },

  'Casa Tereza Empório': { secao:'Produtos',
    sobre:'Empório em Ipanema com queijos brasileiros, azeites, pães e tudo para montar a mesa do fim de semana.',
    endereco:'Rua Visconde de Pirajá, 000 · Ipanema, Rio de Janeiro', horario:'Segunda a sábado, 9h às 20h · domingo, 9h às 14h', telefone:'(21) 0000-0000',
    grupos:[
      ['Queijos e frios', [['Queijo canastra meia-cura', 'Serra da Canastra, 500 g.', 'R$89', 'Mais vendido'], ['Presunto cru nacional', 'Fatiado na hora, 100 g.', 'R$32']]],
      ['Mercearia', [['Azeite extravirgem', 'Produzido na Serra da Mantiqueira, 500 ml.', 'R$98'], ['Cesta de café da manhã', 'Pães, geleias, queijos e frutas.', 'R$260', 'Para presente']]],
    ],
    extras:['Entrega no bairro', 'Cestas para presente', 'Pix e cartão'] },

  'Ótica Nitidez': { secao:'Exames e produtos',
    sobre:'Ótica na Tijuca com exame de vista no local e armações leves e resistentes para o dia a dia, com ajuste feito na hora.',
    endereco:'Rua Conde de Bonfim, 000 · Tijuca, Rio de Janeiro', horario:'Segunda a sábado, 9h às 19h', telefone:'(21) 0000-0000',
    grupos:[
      ['Exames', [['Exame de vista', 'Com optometrista, 30 minutos.', 'R$90']]],
      ['Óculos e lentes', [['Armação leve de titânio', 'Várias cores, com ajuste na hora.', 'R$480'], ['Lentes multifocais', 'Para longe e perto nos mesmos óculos.', 'R$1.200', 'Mais procuradas'], ['Óculos de leitura', 'Prontos para levar.', 'R$120']]],
    ],
    extras:['Ajuste gratuito', 'Parcelamento', 'Pix e cartão'] },

  'Hotel Vista Mar': { secao:'Quartos e pacotes',
    grupos:[
      ['Quartos', [['Quarto standard', 'Cama queen, vista para o jardim.', 'R$620 a diária'], ['Quarto vista mar', 'Varanda de frente para a praia.', 'R$820 a diária', 'Mais reservado'], ['Suíte família', 'Dois ambientes, até 4 pessoas.', 'R$1.150 a diária']]],
      ['Pacotes', [['Pacote de primavera', '3 noites com jantar na segunda noite.', 'R$2.290 para dois', 'Novidade'], ['Dia de spa', 'Massagem, sauna e almoço leve.', 'R$390 por pessoa']]],
    ],
    extras:['Café da manhã incluso', 'Piscina aquecida', 'Estacionamento', 'Wi-Fi'],
    avaliacoes:[['Beatriz N.', 'Clube do Filme', 'Fomos no aniversário de casamento e fomos tratados como em casa.']] },

  'Restaurante Sabor & Arte': { secao:'Cardápio',
    grupos:[
      ['Almoço executivo', [['Executivo do dia', 'Entrada, prato principal e sobremesa.', 'R$68', 'Segunda a sexta'], ['Executivo vegetariano', 'Entrada, prato principal e sobremesa.', 'R$62']]],
      ['Para dividir', [['Moqueca de peixe', 'Com arroz, pirão e farofa, serve dois.', 'R$168'], ['Picanha na brasa', 'Com mandioca e vinagrete, serve dois.', 'R$189', 'Mais pedido']]],
      ['Sobremesas', [['Cartola', 'Banana, queijo coalho e canela.', 'R$32']]],
    ],
    extras:['Música ao vivo às sextas', 'Reserva pelo telefone', 'Pix e cartão'],
    avaliacoes:[['Alexandre D.', 'grupo Amigos', 'Fizemos o encontro do grupo lá. Mesa grande e comida farta.']] },

  'Bella Viagens': { secao:'Roteiros',
    grupos:[
      ['No Brasil', [['Serra Gaúcha em grupo', '5 dias entre Gramado e o Vale dos Vinhedos, com guia.', 'A partir de R$4.890', 'Saídas mensais'], ['Nordeste com calma', 'Salvador e Praia do Forte, 7 dias.', 'A partir de R$5.200']]],
      ['No exterior', [['Portugal: Lisboa e Porto', '10 dias com guia acompanhando o grupo.', 'A partir de R$14.900', 'Vagas limitadas'], ['Suíça e seus vinhedos', '9 dias entre Genebra e o Valais.', 'A partir de R$19.800']]],
    ],
    extras:['Viagens em grupo com guia', 'Seguro viagem incluso', 'Parcelamento'] },

  'Clínica SorrisoTotal': { secao:'Tratamentos',
    grupos:[
      ['Prevenção', [['Avaliação completa', 'Exame clínico e plano de tratamento.', 'Sem custo para membros', 'Benefício'], ['Limpeza', 'Com orientação de escovação.', 'R$220']]],
      ['Reabilitação', [['Prótese sobre implante', 'Com planejamento digital.', 'Sob avaliação'], ['Clareamento', 'Em consultório, 2 sessões.', 'R$1.200']]],
    ],
    extras:['Aceita convênios', 'Atendimento aos sábados', 'Parcelamento'] },

  'Zen Wellness Spa': { secao:'Massagens e tratamentos',
    grupos:[
      ['Massagens', [['Massagem relaxante', '60 minutos, com óleos aromáticos.', 'R$260', 'Mais procurada'], ['Pedras quentes', '75 minutos.', 'R$320']]],
      ['Dias de spa', [['Dia de spa', 'Massagem, sauna, almoço leve e chá da tarde.', 'R$590'], ['Dia de spa a dois', 'Para duas pessoas, com massagem simultânea.', 'R$1.090', 'Novidade']]],
    ],
    extras:['Sauna e área de descanso', 'Estacionamento', 'Pix e cartão'] },

  'Pet Shop Amigo Fiel': { secao:'Serviços e produtos',
    grupos:[
      ['Serviços', [['Banho', 'Porte pequeno.', 'R$60'], ['Banho e tosa higiênica', 'Porte pequeno ou médio.', 'R$95', 'Mais pedido'], ['Vacina V10', 'Com veterinário.', 'R$120']]],
      ['Produtos', [['Ração para gatos castrados', '3 kg.', 'R$119'], ['Petiscos naturais', 'Sem conservantes, 200 g.', 'R$29']]],
    ],
    extras:['Entrega no bairro', 'Veterinário todos os dias', 'Pix e cartão'] },
};
ESTABELECIMENTOS.forEach(e => {
  const c = CATALOGO[e.n]; if(!c) return;
  Object.keys(c).forEach(k => { if(e[k] == null) e[k] = c[k]; });
});

// Markup da seção de produtos e serviços (página do estabelecimento e painel Minhas Comunidades).
// limite: mostra só os primeiros N itens (com o link "Ver todos" para a página completa).
function htmlCatalogo(e, limite){
  if(!e.grupos) return '';
  let resto = limite || Infinity, cortado = false;
  const grupos = e.grupos.map(([g, itens]) => {
    const visiveis = itens.slice(0, Math.max(0, resto));
    resto -= visiveis.length;
    if(visiveis.length < itens.length) cortado = true;
    return visiveis.length ? `
      <div class="pc-grupo"><h3>${g}</h3><div class="pc-itens">${visiveis.map(([n, d, p, selo]) => `
        <div class="pc-item">
          <div><b>${n}</b>${selo ? `<span class="pc-selo">${selo}</span>` : ''}<p>${d}</p></div>
          <span class="pc-preco">${p}</span>
        </div>`).join('')}</div></div>` : '';
  }).join('');
  return `<section class="es-catalogo"><h2>${e.secao || 'Produtos e serviços'}</h2>${grupos}
    ${cortado ? `<a href="${urlEstabelecimento(e)}" class="es-ver-todos">Ver ${e.secao ? e.secao.toLowerCase() : 'tudo'} completo</a>` : ''}</section>`;
}
function htmlExtras(e){
  return e.extras ? `<div class="es-extras">${e.extras.map(x => `<span>${x}</span>`).join('')}</div>` : '';
}
function htmlAvaliacoes(e){
  return e.avaliacoes ? `<section class="es-avaliacoes"><h2>O que a comunidade diz</h2>${e.avaliacoes.map(([q, g, t]) => `
    <blockquote><p>“${t}”</p><footer><b>${q}</b> · do ${g}</footer></blockquote>`).join('')}</section>` : '';
}
