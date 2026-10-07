// VERSÃO 2 · Colunistas, usados pela tela Colunas (colunas.html). Nomes das colunas, categorias, biografias e quantidade
// de colunas seguem a página de colunistas do site (softliving.com.br/app/colunistas).
// aba: nome curto da categoria, usado nas abas do fichário (a categoria completa aparece no cartão).
// As colunas de cada um vêm de conteudos-dados.js (pelo nome do autor) mais COLUNAS_EXTRAS (títulos do site que não estão lá).
const COLUNISTAS = [
  { nome:'Ângela Senna', curto:'Ângela S.', sigla:'ÂS', cor:'#2f5d3a', coluna:'Ponto de Equilíbrio', categoria:'Jurídico', aba:'Jurídico', publicadas:2,
    bio:'Angela Senna é advogada, administradora de empresas e executiva com experiência em gestão, governança e relações institucionais. Nesta coluna, compartilha análises e reflexões sobre Direito, administração, políticas públicas e os desafios da sociedade contemporânea.' },
  { nome:'Bernardo Leitão', curto:'Bernardo L.', sigla:'BL', cor:'#3f6b8f', coluna:null, categoria:'Tecnologia, segurança digital e inteligência artificial', aba:'Tecnologia', publicadas:2,
    bio:'Bernardo Leitão é especialista em comunicação digital, tecnologia aplicada a negócios e transformação digital. Sua proposta como colunista da SoftLiving é traduzir a inteligência artificial para a vida real: como ela pode ajudar pessoas maduras a viverem com mais autonomia, segurança, saúde, organização, conexão e liberdade.' },
  { nome:'Erick Figueira de Mello', curto:'Erick F.', sigla:'EM', cor:'#8a6414', coluna:'A casa como ela é', categoria:'Estilo, Casa, Designer de Interiores', aba:'Casa e interiores', publicadas:5,
    bio:'Desde 1997, o designer de interiores carioca Erick Figueira de Mello dirige o Estúdio Figueira, no Rio de Janeiro. Esta coluna parte dos interiores para falar de algo maior: de gosto e memória, de arte e artesanato, de cor e humor, de luxo e imperfeição. Acima de tudo, da casa como lugar vivo.' },
  { nome:'Lucia Paes de Barros', curto:'Lucia P.', sigla:'LB', cor:'#7a3b52', coluna:'Soft News', categoria:'Lifestyle, Vinhos, Gastronomia e Viagens', aba:'Vinhos e viagens', publicadas:2,
    bio:'Lucia Paes de Barros ama contar histórias de vinhos, viagens e gastronomia, de forma sedutora e persistente. Do Rio de Janeiro direto para São Paulo há mais de 30 anos, mistura a bossa carioca com a eficiência paulistana.' },
  { nome:'Rafael Barros', curto:'Rafael B.', sigla:'RB', cor:'#013565', coluna:'CEO SoftLiving', categoria:'SoftLiving', aba:'SoftLiving', publicadas:3,
    bio:'Rafael Barros transita com fluidez entre o universo da comunicação e as demandas do ambiente corporativo. CEO e colunista do SoftLiving, dedica a coluna a profissionais e líderes que buscam máxima eficiência, sem abrir mão da saúde mental e do equilíbrio.' },
  { nome:'Sandra Rosenfeld', curto:'Sandra R.', sigla:'SR', cor:'#5b4b8a', coluna:'Vida com Equilíbrio', categoria:'Qualidade de Vida', aba:'Qualidade de vida', publicadas:3,
    bio:'Sandra Rosenfeld é autora, palestrante, instrutora de meditação e coach pessoal e executiva no Rio de Janeiro, com mais de 20 anos de experiência em qualidade de vida, redução do estresse e mindfulness.' },
  { nome:'Sofia Martellini', curto:'Sofia M.', sigla:'SM', cor:'#b0513a', coluna:'A moda finalmente descobriu que você existe', categoria:'Moda', aba:'Moda', publicadas:3,
    bio:'Com 13 anos de experiência na WGSN, Sofia Martellini é líder de conteúdo de passarelas na plataforma de tendências. Formada em Negócios da Moda e pós-graduada em Foresight Estratégico, combina análise de tendências em tempo real com conhecimento regional.' },
  { nome:'Zé Roberto', curto:'Zé R.', sigla:'ZR', cor:'#2f8578', coluna:'Toque do Barão', categoria:'Lugares & Pessoas', aba:'Lugares e pessoas', publicadas:5,
    bio:'Jornalista, escritor e cronista de experiências. Entre viagens, restaurantes, espetáculos, exposições e encontros marcantes, constrói narrativas que unem informação, sensibilidade e olhar humano, com o Rio de Janeiro como principal fonte de inspiração.' },
  // Colunistas fictícios, só para a simulação do protótipo: com eles o box "Todos os colunistas" (BTOC) tem mais
  // segmentos do que cabem numa linha (aparece o botão de rolagem das abas) e mais de 8 colunistas (limite da aba Todos).
  // Cada um tem uma coluna de exemplo em COLUNAS_EXTRAS.
  { nome:'Dra. Marina Lobo', curto:'Marina L.', sigla:'ML', cor:'#2f8578', coluna:'Corpo em dia', categoria:'Saúde e Longevidade', aba:'Saúde', publicadas:1,
    bio:'Marina Lobo é geriatra e escreve sobre envelhecer com saúde, sem promessas milagrosas: sono, movimento, exames na hora certa e bons hábitos.' },
  { nome:'Otávio Ramalho', curto:'Otávio R.', sigla:'OR', cor:'#8a6414', coluna:'Dinheiro sem susto', categoria:'Finanças Pessoais', aba:'Finanças', publicadas:1,
    bio:'Otávio Ramalho é planejador financeiro e explica investimentos, aposentadoria e orçamento em linguagem simples, para quem quer tranquilidade.' },
  { nome:'Clara Viana', curto:'Clara V.', sigla:'CV', cor:'#5b4b8a', coluna:'Sessão das oito', categoria:'Cinema e Séries', aba:'Cinema', publicadas:1,
    bio:'Clara Viana é crítica de cinema e indica filmes e séries para ver sem pressa, com contexto e boas histórias de bastidores.' },
  { nome:'Heitor Paranhos', curto:'Heitor P.', sigla:'HP', cor:'#b0513a', coluna:'Mesa posta', categoria:'Gastronomia', aba:'Gastronomia', publicadas:1,
    bio:'Heitor Paranhos é cozinheiro e escreve sobre comida de verdade: feiras, receitas de família e os lugares onde vale sentar e demorar.' },
  { nome:'Inês Carvalho', curto:'Inês C.', sigla:'IC', cor:'#2f5d3a', coluna:'Mãos na terra', categoria:'Jardim e Natureza', aba:'Jardim', publicadas:1,
    bio:'Inês Carvalho é paisagista e ensina a cuidar de plantas em casa, da varanda ao quintal, respeitando o tempo de cada estação.' },
];

// Títulos de colunas do site que não estão em conteudos-dados.js
const COLUNAS_EXTRAS = [
  // colunas de exemplo dos colunistas fictícios
  { t:'O sono muda com a idade, e tudo bem', a:'Dra. Marina Lobo', foto:'1506126613408-eca07ce68773', badge:'gratis', e:'O que é normal, o que pede atenção e pequenos ajustes que melhoram a noite.' },
  { t:'Reserva de emergência: por onde começar', a:'Otávio Ramalho', foto:'1460925895917-afdab827c52f', badge:'gratis', e:'Quanto guardar, onde deixar e como não mexer nela à toa.' },
  { t:'Cinco filmes para ver numa tarde de chuva', a:'Clara Viana', foto:'1489599849927-2ee91cede3ba', badge:'gratis', e:'Histórias que acolhem, para assistir sem olhar o relógio.' },
  { t:'A feira ensina mais do que a receita', a:'Heitor Paranhos', foto:'1512621776951-a57141f2eefd', badge:'gratis', e:'Como escolher o que está na época e cozinhar a partir do que há de melhor.' },
  { t:'Uma horta que cabe na janela', a:'Inês Carvalho', foto:'1447752875215-b2761acb3c5d', badge:'gratis', e:'Temperos, luz e rega: o básico para começar sem medo de errar.' },
  { t:'Como o boom das canetas emagrecedoras está impactando a moda?', a:'Sofia Martellini', foto:'1483985988355-763728e1935b', badge:'gratis' },
  { t:'Quando morar virou performance?', a:'Erick Figueira de Mello', foto:'1505691938895-1758d7feb511', badge:'gratis' },
  { t:'O problema do “bom gosto”', a:'Erick Figueira de Mello', foto:'1513694203232-719a280e022f', badge:'gratis' },
];

// Coluna do dia (como no site): Sofia Martellini, com a última coluna dela grátis
const COLUNA_DO_DIA = { colunista:'Sofia Martellini', ultima:'Como o boom das canetas emagrecedoras está impactando a moda?' };
// Teste de pagamentos (conteudos-dados.js): as colunas extras também ficam pagas, menos a última da coluna do dia
if(typeof bloquearParaTeste === 'function') bloquearParaTeste(COLUNAS_EXTRAS, [COLUNA_DO_DIA.ultima]);
// Sugestões no mesmo box da coluna do dia (as primeiras "Colunas em destaque" do site)
const SUGESTOES_DO_DIA = ['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'Na Suíça, um vinho para chamar de seu', 'O bem-estar do encontro presencial', 'Aos patrocinadores do SoftLiving'];

// Todas as colunas (conteúdos dos colunistas + extras) e as de um colunista
const TODAS_COLUNAS = () => [...CONTEUDOS.filter(c => COLUNISTAS.some(col => c.a.startsWith(col.nome))), ...COLUNAS_EXTRAS];
const colunasDe = nome => TODAS_COLUNAS().filter(c => c.a.startsWith(nome));
