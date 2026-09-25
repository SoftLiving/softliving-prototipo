// Anúncios fictícios dos grupos de desapego, por nome do grupo (ver tipo:'desapego' em grupos-dados.js).
// tipo: 'venda' (com preço) | 'doacao' | 'troca'. Valores em reais sem espaço (R$120).
const DESAPEGO_CATEGORIAS = ['Casa e móveis', 'Roupas e acessórios', 'Eletrônicos', 'Livros', 'Esporte e lazer', 'Outros'];
const DESAPEGO_ESTADOS = ['Novo', 'Seminovo', 'Usado, em bom estado', 'Precisa de reparo'];
const DESAPEGO_ICONES = { 'Casa e móveis':'chair', 'Roupas e acessórios':'gift', 'Eletrônicos':'robot', 'Livros':'book', 'Esporte e lazer':'activity', 'Outros':'store' };

const DESAPEGO = {
  'Desapego da Comunidade': [
    { t:'Poltrona de leitura', tipo:'venda', preco:'R$350', cat:'Casa e móveis', estado:'Usado, em bom estado', bairro:'Tijuca', quem:'Maria Helena Sobral', d:'Poltrona confortável, tecido bege, ótima para ler.' },
    { t:'Máquina de costura', tipo:'venda', preco:'R$280', cat:'Casa e móveis', estado:'Seminovo', bairro:'Botafogo', quem:'Luciana Russi', d:'Funcionando perfeitamente, acompanha manual e acessórios.' },
    { t:'Casaco de lã', tipo:'doacao', cat:'Roupas e acessórios', estado:'Usado, em bom estado', bairro:'Flamengo', quem:'Claudio Brito', d:'Tamanho G, cor cinza. Para quem sente frio no inverno.' },
    { t:'Tablet 10 polegadas', tipo:'venda', preco:'R$450', cat:'Eletrônicos', estado:'Seminovo', bairro:'Copacabana', quem:'Bernardo Leitão', d:'Ótimo para leitura e chamadas de vídeo. Com capa.' },
    { t:'Coleção de romances clássicos', tipo:'troca', cat:'Livros', estado:'Usado, em bom estado', bairro:'Laranjeiras', quem:'Ângela Senna', d:'12 livros. Troco por livros de viagem ou biografias.' },
    { t:'Bicicleta ergométrica', tipo:'venda', preco:'R$400', cat:'Esporte e lazer', estado:'Usado, em bom estado', bairro:'Barra da Tijuca', quem:'Marta Siqueira', d:'Pouco uso, painel digital funcionando.' },
    { t:'Jogo de jantar 20 peças', tipo:'venda', preco:'R$120', cat:'Casa e móveis', estado:'Seminovo', bairro:'Grajaú', quem:'Ivone Castro', d:'Porcelana branca, sem lascados.' },
    { t:'Andador dobrável', tipo:'doacao', cat:'Outros', estado:'Usado, em bom estado', bairro:'Méier', quem:'Paulo Regis', d:'Leve e dobrável. Doo para quem precisar.' },
    { t:'Rádio antigo', tipo:'troca', cat:'Eletrônicos', estado:'Precisa de reparo', bairro:'Santa Teresa', quem:'Zé Roberto', d:'Rádio dos anos 70, liga mas chia. Troco por discos de vinil.' },
  ],
  'Desapego Rio · Zona Sul': [
    { t:'Cadeira de praia com guarda-sol', tipo:'venda', preco:'R$90', cat:'Esporte e lazer', estado:'Usado, em bom estado', bairro:'Copacabana', quem:'Sofia Martellini', d:'Kit completo, perfeito para a praia de manhã cedo.' },
    { t:'Estante de livros', tipo:'venda', preco:'R$200', cat:'Casa e móveis', estado:'Usado, em bom estado', bairro:'Ipanema', quem:'Erick Figueira de Mello', d:'Madeira maciça, 5 prateleiras. Retirar no local.' },
    { t:'Vasos de plantas', tipo:'doacao', cat:'Casa e móveis', estado:'Usado, em bom estado', bairro:'Leblon', quem:'Lucia Paes de Barros', d:'Três vasos de cerâmica, com terra. Ótimos para temperos.' },
    { t:'Vestidos de festa', tipo:'venda', preco:'R$60', cat:'Roupas e acessórios', estado:'Seminovo', bairro:'Botafogo', quem:'Sandra Rosenfeld', d:'Tamanho M, usados uma vez. Valor por peça.' },
    { t:'Cafeteira italiana', tipo:'troca', cat:'Casa e móveis', estado:'Seminovo', bairro:'Flamengo', quem:'Luciana Russi', d:'Troco por uma chaleira elétrica.' },
    { t:'Bengala regulável', tipo:'doacao', cat:'Outros', estado:'Seminovo', bairro:'Copacabana', quem:'Claudio Brito', d:'Alumínio, altura regulável. Doo para quem precisar.' },
  ],
  'Troca de Livros': [
    { t:'Cem Anos de Solidão', tipo:'troca', cat:'Livros', estado:'Usado, em bom estado', bairro:'Tijuca', quem:'Maria Helena Sobral', d:'Edição de bolso. Troco por qualquer romance latino-americano.' },
    { t:'Guia de viagem: Portugal', tipo:'doacao', cat:'Livros', estado:'Usado, em bom estado', bairro:'Botafogo', quem:'Lucia Paes de Barros', d:'Com mapas e dicas de restaurantes.' },
    { t:'Box de poesia brasileira', tipo:'troca', cat:'Livros', estado:'Seminovo', bairro:'Laranjeiras', quem:'Ângela Senna', d:'Três volumes. Troco por biografias.' },
    { t:'Livro de receitas da vovó', tipo:'doacao', cat:'Livros', estado:'Usado, em bom estado', bairro:'Méier', quem:'Ivone Castro', d:'Receitas tradicionais, com algumas anotações à mão.' },
    { t:'Romance policial em inglês', tipo:'troca', cat:'Livros', estado:'Seminovo', bairro:'Leblon', quem:'Paulo Regis', d:'Para quem quer praticar o idioma.' },
    { t:'Enciclopédia de jardinagem', tipo:'venda', preco:'R$40', cat:'Livros', estado:'Usado, em bom estado', bairro:'Grajaú', quem:'Marta Siqueira', d:'Capa dura, muito bem conservada.' },
  ],
};
