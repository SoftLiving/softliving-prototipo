// VERSÃO 2 · Pessoas (fictícias) usadas por Conversas (conversas.html) e pela aba Seguindo da tela Amigos.
// Os doze primeiros são as pessoas da tela Amigos (mesmos ids). A V2 não tem diretório de membros nem perfil público
// (ficaram para uma possível V3): das pessoas, só existe a tela Amigos.
// s: 'amigo' | 'pedido' | 'sugestao' | 'enviado'.
const MEMBROS = [
  { id:1,  nome:'Alexandre Duarte', cor:'#013565', cidade:'Rio de Janeiro', ocupacao:'Engenheiro aposentado', oferta:'Organiza caminhadas e encontros', interesses:['Amizades', 'Esportes e Exercícios', 'Viagens'], grupos:['Amigos', 'Caminhadas no Parque'], s:'amigo' },
  { id:2,  nome:'Helena Martins', cor:'#7a3b52', cidade:'Rio de Janeiro', ocupacao:'Sommelière', oferta:'Aulas de degustação de vinhos', interesses:['Culinária', 'Viagens', 'Livros'], grupos:['Clube do Vinho', 'Clube do Livro'], s:'amigo' },
  { id:3,  nome:'Marcos Teixeira', cor:'#2f8578', cidade:'Niterói', ocupacao:'Professor de yoga', oferta:'Práticas guiadas para iniciantes', interesses:['Saúde e Bem-Estar', 'Espiritualidade', 'Livros'], grupos:['Yoga & Meditação'], s:'amigo' },
  { id:4,  nome:'Célia Ribeiro', cor:'#b0513a', cidade:'Rio de Janeiro', ocupacao:'Cozinheira', oferta:'Receitas e oficinas de culinária', interesses:['Culinária', 'Música', 'Amizades'], grupos:['Amigos', 'Culinária Saudável'], s:'amigo' },
  { id:5,  nome:'Beatriz Nogueira', cor:'#5b4b8a', cidade:'São Paulo', ocupacao:'Jornalista', oferta:'', interesses:['Cinema e Séries', 'Livros', 'Viagens'], grupos:['Clube do Filme', 'Cinema em Conversa'], s:'amigo' },
  { id:6,  nome:'Jorge Albuquerque', cor:'#8a6414', cidade:'Petrópolis', ocupacao:'Contador', oferta:'Orientação sobre imposto de renda', interesses:['Finanças Pessoais', 'Cinema e Séries', 'Esportes e Exercícios'], grupos:['Cinema em Conversa', 'Copa do Mundo'], s:'amigo' },
  { id:7,  nome:'Lúcia Campos', cor:'#2f5d3a', cidade:'Rio de Janeiro', ocupacao:'Paisagista', oferta:'Projetos de jardim para varandas', interesses:['Jardim e Natureza', 'Espiritualidade', 'Decoração'], grupos:['Yoga & Meditação'], s:'pedido' },
  { id:8,  nome:'Roberto Freitas', cor:'#3f6b8f', cidade:'Belo Horizonte', ocupacao:'Chef de cozinha', oferta:'', interesses:['Culinária', 'Viagens', 'Música'], grupos:['Clube do Vinho'], s:'pedido' },
  { id:9,  nome:'Luciana Russi', cor:'#2f5d3a', cidade:'Rio de Janeiro', ocupacao:'Fisioterapeuta', oferta:'Avaliação postural', interesses:['Esportes e Exercícios', 'Cursos e Aprendizado', 'Saúde e Bem-Estar'], grupos:['Clube do Filme', 'Yoga & Meditação'], s:'sugestao' },
  { id:10, nome:'Maria Helena Sobral', cor:'#d4a24c', cidade:'Curitiba', ocupacao:'Artesã', oferta:'Peças de cerâmica sob encomenda', interesses:['Cinema e Séries', 'Viagens', 'Culinária', 'Artesanato e Criatividade'], grupos:['Amigos'], s:'sugestao' },
  { id:11, nome:'Claudio Brito', cor:'#c1633f', cidade:'Porto Alegre', ocupacao:'Fotógrafo', oferta:'Ensaios e aulas de fotografia com o celular', interesses:['Cinema e Séries', 'Tecnologia', 'Viagens'], grupos:['Cinema em Conversa'], s:'sugestao' },
  { id:12, nome:'Sônia Prado', cor:'#7a3b52', cidade:'Rio de Janeiro', ocupacao:'Professora de pilates', oferta:'Aulas em turmas pequenas', interesses:['Saúde e Bem-Estar', 'Livros', 'Esportes e Exercícios'], grupos:['Yoga & Meditação'], s:'sugestao' },
  { id:13, nome:'Paulo Regis', cor:'#3d6b8c', cidade:'Salvador', ocupacao:'Músico', oferta:'Aulas de violão para iniciantes', interesses:['Música', 'Amizades', 'Cursos e Aprendizado'], grupos:['Clube do Livro'], s:'sugestao' },
  { id:14, nome:'Tereza Lins', cor:'#5b4b8a', cidade:'Recife', ocupacao:'Consultora financeira', oferta:'Planejamento financeiro para quem tem 50 anos ou mais', interesses:['Finanças Pessoais', 'Trabalho e Renda Extra', 'Viagens'], grupos:['Investimentos para 50+'], s:'sugestao' },
  { id:15, nome:'Otávio Prado', cor:'#1F5519', cidade:'Rio de Janeiro', ocupacao:'Síndico', oferta:'', interesses:['Grupos do Bairro', 'Jardim e Natureza', 'Tecnologia'], grupos:['Tecnologia Sem Medo'], s:'sugestao' },
  { id:16, nome:'Vera Monteiro', cor:'#b0513a', cidade:'Florianópolis', ocupacao:'Designer de interiores', oferta:'Consultoria de decoração por vídeo', interesses:['Decoração', 'Artesanato e Criatividade', 'Livros'], grupos:['Desapego da Comunidade'], s:'sugestao' },
];
const siglaMembro = n => n.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('');
const urlConversa = id => `${LAYOUT_ROOT}conversas.html?c=${id}`;

// Amizade: a mesma situação guardada pela tela Amigos (v2Amigos), por cima da inicial
try { Object.entries(JSON.parse(localStorage.getItem('v2Amigos')) || {}).forEach(([id, s]) => { const m = MEMBROS.find(x => x.id === +id); if(m) m.s = s; }); } catch(e){}
function mudarAmizade(id, s){
  const m = MEMBROS.find(x => x.id === id); if(!m) return;
  m.s = s;
  let salvo = {};
  try { salvo = JSON.parse(localStorage.getItem('v2Amigos')) || {}; } catch(e){}
  salvo[id] = s;
  try { localStorage.setItem('v2Amigos', JSON.stringify(salvo)); } catch(e){}
}
// Seguindo: pessoas que você segue sem precisar ser amigo (aba Seguindo da tela Amigos)
const SEGUINDO_INICIAIS = [9, 11, 14];
function lerSeguindo(){ try { const v = JSON.parse(localStorage.getItem('v2Seguindo')); return Array.isArray(v) ? v : [...SEGUINDO_INICIAIS]; } catch(e){ return [...SEGUINDO_INICIAIS]; } }
function alternarSeguir(id){
  const l = lerSeguindo(), segue = !l.includes(id);
  try { localStorage.setItem('v2Seguindo', JSON.stringify(segue ? [...l, id] : l.filter(x => x !== id))); } catch(e){}
  return segue;
}
