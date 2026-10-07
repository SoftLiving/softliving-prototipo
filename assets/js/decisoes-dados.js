// VERSÃO 2 · Decisões em aberto: dúvidas que apareceram ao comparar o protótipo (V2) com o site em produção (V1).
// Usadas pela página Decisões (decisoes.html) e pelo aviso "Decisões em aberto nesta tela", que o layout.js põe no
// topo das telas citadas em `telas`. A resposta de cada uma fica guardada no navegador (v2Decisoes).
// Campos: id · tema · p (pergunta) · v1 (como é hoje) · v2 (como está no protótipo) · opcoes · sugestao (número da
// opção sugerida, começando em 0, ou null) · telas (arquivo, sem .html, das telas onde o aviso aparece; 'comunidades'
// vale para a pasta toda) · ver (página do menu para abrir, nome em PAGINAS).
const DECISOES = [
];

// Decisões já tomadas (registro para o desenvolvedor). As do questionário foram respondidas em 2026-10-06.
const DECISOES_TOMADAS = [
  'Da V1 continuam na V2: Conversas, Acessibilidade, Encaminhar conteúdo e "Seguindo" (aba da tela Amigos).',
  'Ficam FORA da V2 (talvez em uma V3): Membros (diretório), Oportunidades e Marketplace. Das pessoas, a V2 tem só a tela Amigos.',
  'Minhas Comunidades fica em /app/minhascomunidades e substitui a Minha Empresa da V1.',
  'São desligados os endereços /app/oportunidades, /app/marketplace, /app/comunidade e /app/minha-empresa (não levam para outra página).',
  'O endereço público de cada pessoa passa de /app/comunidade/@nome para /app/@nome.',
  'O perfil público mostra o que a V1 mostra (nome, endereço, cidade, ocupação, habilidades e ofertas, interesses e grupos), mais o "Sobre mim", no visual do Meu perfil. Tem os botões Adicionar aos amigos, Seguir e Mensagem.',
  'O Meu perfil mantém "Aparecer na comunidade" e o "Endereço público" (opcional).',
  'A pessoa pode trocar o seu endereço público (@nome). Depois de cada troca, espera 14 dias para trocar de novo.',
  'Mensagens: amigos podem escrever. No Meu perfil, a pessoa escolhe se também recebe mensagens de quem não é amigo. No perfil público, o botão Mensagem aparece só para amigos, ou para todos quando essa opção está ligada.',
  'Encaminhar conteúdo: sempre e só para amigos. A janela mostra primeiro os 7 amigos com quem a pessoa mais interage e tem busca pelo nome.',
  'Conversas ficam no menu, em "Comunidade e benefícios", depois de Amigos. As mensagens não mostram dia nem hora.',
  'Notificações e extrato da Carteira mostram data e hora.',
  'Valem as sete categorias de conteúdo da V1. A ordem dos conteúdos é sorteada a cada visita.',
  'Fotos: banco de imagens escolhido pela curadoria.',
  'Carteira: recarga de R$20, R$50, R$100 ou R$200, por Pix ou cartão, com bônus progressivo; primeira recarga de R$50 vale 50 créditos + 50 de bônus.',
  'O bônus é usado antes dos créditos comprados e vale por 12 meses, contados do dia em que cada bônus foi recebido.',
  'Grupo premium: cada grupo tem o seu preço, escolhido entre 5, 10, 15 ou 20 créditos por mês (R$5, R$10, R$15 ou R$20), com débito automático todo mês. Quando o saldo não cobre a mensalidade, a pessoa sai do grupo premium e é avisada.',
  'Indicação aprovada: 5 créditos de bônus, só para quem indicou. Cadastro: 20 créditos de bônus para quem se cadastra.',
  'Texto do convite: "Cadastre-se pelo meu convite. Todo novo membro ganha 20 créditos de bônus."',
  'Tamanho da letra: um ajuste só, em 3 níveis, que vale para o site todo. Fica na tela Acessibilidade e no A− / A+ da leitura.',
  '"Navegação simplificada" e "Modo simples" são a mesma coisa: a opção abre o Modo simples.',
  'Assistente do Suporte: inteligência artificial respondendo só com o que está na base de conhecimento.',
  'Minhas Comunidades: a aba Módulos da V1 vira Serviços. Os Grupos internos funcionam como os Grupos do portal (Conversas, Mural, Encontros, Membros), só para quem é da comunidade.',
  'Entrada: redes sociais, e-mail e senha e também o link de acesso por e-mail.',
  'Cadastro, Esqueci a senha e Segurança: mantêm os passos e o texto da V1, com o novo visual.',
  'Vitrines: implementar como está no protótipo.',
  'Vitrines: todos os conteúdos e cartões das vitrines são gratuitos; nada ali custa créditos.',
  'Coluna da direita: será sempre contextual à página, mas as opções de cada página ficam para uma próxima atualização. Por enquanto, todas mostram: Sua opinião vale créditos (pesquisa), Meus grupos, Hoje na SoftLiving e Meus amigos, com quem está online e offline.',
  'Amigos online: está online quem usou o portal nos últimos 5 minutos. A pessoa pode desligar, no Meu perfil, "Mostrar quando estou online".',
  'Encaminhar: os 7 amigos com quem a pessoa mais interage são os de mais mensagens trocadas e conteúdos encaminhados nos últimos 90 dias.',
  'Endereço público: depois da troca, o endereço antigo fica reservado por 90 dias e leva ao novo; depois fica livre.',
  'Salvos › Minhas Comunidades: entram os conteúdos e os serviços salvos dentro das comunidades fechadas.',
  'Box BTOC: quando houver mais de 8 colunistas, os 8 da aba "Todos" são sorteados a cada visita.',
  'Box BDRC: as sugestões ficam em carrossel, 4 por vez.',
  'Box BPDVV: mostra sempre 4 bairros, sorteados a cada visita; não é carrossel.',
  'BSD e BDS mantêm o mesmo código nas páginas de vitrine; só muda o cartão.',
  'Pesquisa: as perguntas são contextuais à página e cada página tem um banco de perguntas ilimitado, atualizado sempre.',
];

function lerDecisoes(){ try { return JSON.parse(localStorage.getItem('v2Decisoes')) || {}; } catch(e){ return {}; } }
function gravarDecisoes(d){ try { localStorage.setItem('v2Decisoes', JSON.stringify(d)); } catch(e){} }

// Aviso no topo das telas com decisão em aberto (o layout.js carrega este arquivo em todas as páginas)
(function avisoDeDecisoes(){
  if(typeof LAYOUT_PAGE === 'undefined' || LAYOUT_PAGE === 'decisoes') return;
  const arquivo = /\/comunidades\//.test(location.pathname) ? 'comunidades' : (location.pathname.split('/').pop().replace(/\.html$/, '') || 'index');
  const daTela = DECISOES.filter(d => d.telas.includes(arquivo));
  const main = document.querySelector('main');
  if(!daTela.length || !main) return;
  const respostas = lerDecisoes();
  const abertas = daTela.filter(d => !respostas[d.id] || respostas[d.id].o === undefined || respostas[d.id].o === null).length;
  const url = id => `${LAYOUT_ROOT}decisoes.html#${id}`;
  const box = document.createElement('details');
  box.className = 'dc-aviso';
  box.innerHTML = `
    <summary><b>${abertas ? `${abertas} ${abertas === 1 ? 'decisão em aberto' : 'decisões em aberto'} nesta tela` : 'Decisões desta tela: todas respondidas'}</b><span>ver</span></summary>
    <ul>${daTela.map(d => {
      const r = respostas[d.id];
      const feita = r && r.o !== undefined && r.o !== null;
      return `<li class="${feita ? 'feita' : ''}"><a href="${url(d.id)}">${d.p}</a>${feita ? `<small>Resposta: ${d.opcoes[r.o] || 'outra (ver observações)'}</small>` : ''}</li>`;
    }).join('')}</ul>
    <a href="${LAYOUT_ROOT}decisoes.html" class="dc-aviso-todas">Ver todas as decisões</a>`;
  const depois = main.querySelector(':scope > .page-head');
  if(depois) depois.after(box); else main.prepend(box);
})();
