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
];

// Títulos de colunas do site que não estão em conteudos-dados.js
const COLUNAS_EXTRAS = [
  { t:'Como o boom das canetas emagrecedoras está impactando a moda?', a:'Sofia Martellini', foto:'1483985988355-763728e1935b', badge:'gratis' },
  { t:'Quando morar virou performance?', a:'Erick Figueira de Mello', foto:'1505691938895-1758d7feb511', badge:'gratis' },
  { t:'O problema do “bom gosto”', a:'Erick Figueira de Mello', foto:'1513694203232-719a280e022f', badge:'gratis' },
];

// Coluna do dia (como no site): Sofia Martellini, com a última coluna dela grátis
const COLUNA_DO_DIA = { colunista:'Sofia Martellini', ultima:'Como o boom das canetas emagrecedoras está impactando a moda?' };
// Sugestões no mesmo box da coluna do dia (as primeiras "Colunas em destaque" do site)
const SUGESTOES_DO_DIA = ['A Revolução da Longevidade: Estamos Preparados para Viver Tanto?', 'Na Suíça, um vinho para chamar de seu', 'O bem-estar do encontro presencial', 'Aos patrocinadores do SoftLiving'];

// Todas as colunas (conteúdos dos colunistas + extras) e as de um colunista
const TODAS_COLUNAS = () => [...CONTEUDOS.filter(c => COLUNISTAS.some(col => c.a.startsWith(col.nome))), ...COLUNAS_EXTRAS];
const colunasDe = nome => TODAS_COLUNAS().filter(c => c.a.startsWith(nome));
