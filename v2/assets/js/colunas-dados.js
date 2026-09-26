// VERSÃO 2 · Colunistas (fictícios), usados pela tela Colunas (colunas.html).
// São os autores dos conteúdos de conteudos-dados.js (menos a Redação): as colunas de cada um vêm de lá, pelo nome do autor.
// tema: assunto da coluna (texto novo, a revisar).
const COLUNISTAS = [
  { nome:'Rafael Barros', sigla:'RB', cor:'#013565', tema:'Palavra do CEO' },
  { nome:'Ângela Senna', sigla:'ÂS', cor:'#2f5d3a', tema:'Longevidade' },
  { nome:'Bernardo Leitão', sigla:'BL', cor:'#3f6b8f', tema:'Tecnologia' },
  { nome:'Erick Figueira de Mello', sigla:'EM', cor:'#8a6414', tema:'Casa e estilo' },
  { nome:'Lucia Paes de Barros', sigla:'LB', cor:'#7a3b52', tema:'Vinhos e viagens' },
  { nome:'Sandra Rosenfeld', sigla:'SR', cor:'#5b4b8a', tema:'Recomeços' },
  { nome:'Sofia Martellini', sigla:'SM', cor:'#b0513a', tema:'Moda' },
  { nome:'Zé Roberto', sigla:'ZR', cor:'#2f8578', tema:'Encontros e bem-estar' },
];
// Coluna do dia (a mesma da Início da versão 1)
const COLUNA_DO_DIA = 'Aos patrocinadores do SoftLiving';
// Colunas de um colunista: conteúdos cujo autor começa com o nome dele (ex.: "Rafael Barros · CEO SoftLiving")
const colunasDe = nome => CONTEUDOS.filter(c => c.a.startsWith(nome));
