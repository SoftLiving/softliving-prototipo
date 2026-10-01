# SoftLiving — Protótipo versão 2 (portal de notícias)

Novo layout do protótipo, com cara de portal de notícias: fundo creme, títulos em Fraunces, fotos grandes, seções
variadas e um menu lateral flutuante que recolhe para só ícones (no celular vira gaveta + barra inferior).

Esta é a versão atual do protótipo. A **versão 1** foi retirada do repositório em 2026-09-28 (continua no histórico
do git); a v2, que antes ficava na pasta `v2/`, passou para a raiz.

Abra `index.html` com dois cliques, ou pelo servidor de testes (`http://localhost:8765/index.html`).

## Estrutura

```
index.html                  Tela Início (abertura com colagem, Explore por assunto, Últimas matérias,
                            Acontece nos grupos, patrocinadores apoiadores, newsletter)
conhecimento/               base de conhecimento do assistente do Suporte: arquivos .md (um por tema, cada "## Assunto"
                            vira uma resposta) listados em arquivos.txt. Ver conhecimento/LEIA-ME.md.
institucional/              conhecer, quem-somos, como-funciona, beneficios, empresas-e-grupos (B2B2C, licenças e NR-1),
                            patrocinadores (novo visual).
                            Links para páginas institucionais usam data-site-link="<nome>" e urlSite() no layout.js
                            (SITES lista as que existem; Segurança ainda abre o Suporte)
assets/css/estilos.css      Todos os estilos: Base · Moldura · Componentes · uma seção por tela
assets/js/layout.js         Moldura comum: faixa de protótipo, aviso, menu lateral,
                            topo, rodapé, barra do celular; saldo de créditos, logo em texto, fotoUrl(), mostrarAviso()
conteudos.html              Tela Conteúdos: busca, destaque, assuntos (fichário), Todos/Grátis/Premium, grade
busca.html                  Tela Busca: conteúdos e colunas, colunistas e grupos (?q=termo); sugestões com o campo vazio
notificacoes.html           Tela Notificações: filtros, não lidas/anteriores, preferências (a janela do sino fica no layout.js)
amigos.html                 Tela Amigos (antiga Conexões): pedidos de amizade, seus amigos e sugestões
carteira.html               Tela Carteira: saldo (comprados + bônus), recarga (Pix/cartão), bônus e extrato
indicacoes.html             Tela Indicações: link de convite, convite por e-mail, como funciona e lista
perfil.html                 Tela Meu perfil: números, sobre mim e interesses editáveis, grupos, amigos, conta
ajuda.html                  Tela Ajuda: busca, temas, perguntas frequentes e contato por e-mail
simples.html                Modo simples (sem layout.js): Novidades + 8 opções grandes, uma tarefa por tela, letra ajustável
entrar.html                 Tela de login (box de entrada no centro); depois de entrar, volta para a página de origem (?volta=)
curtidas/comentarios/acompanhar/salvos.html  Atividades (atividades.js); Salvos lê a bandeirinha dos cartões (lerSalvos no layout.js)
vitrine.html                Vitrines (menu, acima de Minhas Comunidades): esboço com os estabelecimentos
estabelecimento.html        Página de um estabelecimento (?e=<id>): capa, sobre, benefício, informações, produtos e serviços
                            (estabelecimentos-catalogo.js), comodidades, o que a comunidade diz, galeria.
                            Em abas (estabelecimentos-extras.js): visão geral (quem atende, clube, horário, acessibilidade),
                            agenda, avaliações Recomendo, fotos com tela cheia, perguntas; reservar/agendar; amigos que frequentam
comunidades/*.html          Minhas Comunidades: os boxes (lista Trocar por) mostram comunidades fechadas, com as 8 abas (?org=...&publico=...),
                            e estabelecimentos incluídos pelo usuário, em layout de vitrine (?org=est:<id> ou ?est=<id>)
colunas.html                Tela Colunas (referência: softliving.com.br/app/colunistas): coluna do dia com 4 sugestões,
                            navegue por autor, colunistas por categoria e colunas em destaque
grupos.html                 Tela Grupos: Todos/Participando/Disponíveis, grade com Participar/Sair
colunista.html              Apresentação de um colunista (?c=bernardo-leitao, como no site): bio, colunas publicadas,
                            acompanhar, última coluna, arquivo, anterior e próximo (colunista.js, colunista.css)
conteudo.html               Leitura de um conteúdo ou coluna (?t=título): cabeçalho, capa, texto completo (demonstração),
                            ações (curtir, salvar, compartilhar, ouvir, letra), destravar premium, autor, comentários
                            e Continue lendo (conteudo.js, conteudo.css)
grupo.html                  Página interna do grupo (?g=n#aba): capa, selos e ações; abas Conversas, Mural, Encontros e
                            Membros; grupos de desapego com a aba Anúncios (grupo.js, grupo.css, desapego-dados.js)
assets/js/lateral.js        Coluna lateral da direita, comum à Início, Conteúdos e Grupos
assets/js/escuta.js         Pesquisa de escuta (cópia da v1), entra no topo da coluna lateral
assets/js/conteudos.js      Tela Conteúdos
assets/js/grupos.js         Tela Grupos
assets/js/busca.js          Tela Busca (sem diferenciar acentos; termos destacados; buscas recentes na sessão)
assets/js/notificacoes.js   Tela Notificações (os avisos NOTIFICACOES e o controle de lidas ficam no layout.js)
assets/js/comunidades.js    Minhas Comunidades (cópia da v1 com abas em fichário; usa comunidades-icones.js e comunidades-dados.js)
assets/css/comunidades.css  Estilos de Minhas Comunidades: base da v1 presa a .cm + camada da v2 no fim
assets/js/colunas.js        Tela Colunas
assets/js/colunas-dados.js  Colunistas (nomes das colunas, categorias e biografias do site); colunas de conteudos-dados.js + extras
assets/js/inicio.js         Tela Início
assets/js/*-dados.js        Cópia dos dados da versão 1. conteudos-dados.js e grupos-dados.js ganharam o campo foto
assets/img/                 Logos da FSB e da RB2
```

## Como acrescentar uma página

1. Criar o `.html` com `<body data-page="<nome>" data-root="">` (ou `data-root="../"` em subpasta), só com o conteúdo
   da página, e carregar `assets/js/layout.js` antes dos scripts da página.
2. Acrescentar a página em `PAGINAS` (layout.js): o menu, a barra do celular e o rodapé passam a apontar para ela.
3. Estilos da tela numa seção própria do `estilos.css`.

## Situação das páginas

| Página | Versão 2 |
|---|---|
| Início | pronta para revisão |
| Conteúdos (`conteudos.html`) | pronta para revisão |
| Colunas (`colunas.html`) | pronta para revisão (a versão 1 não tinha esta página) |
| Busca (`busca.html`) | pronta para revisão (a versão 1 não tinha esta página) |
| Leitura do artigo (`conteudo.html`) | pronta para revisão |
| Grupos (`grupos.html`) | pronta para revisão |
| Página interna de grupo (`grupo.html`, inclui Desapego) | pronta para revisão |
| Notificações (`notificacoes.html` + janela do sino) | pronta para revisão |
| Minhas Comunidades (8 abas, `comunidades/`) | pronta para revisão |
| Amigos (`amigos.html`, antiga Conexões) | pronta para revisão |
| Carteira (`carteira.html`) | pronta para revisão |
| Indicações, Meu perfil, Suporte (ajuda.html) | prontas para revisão |
| Modo simples (`simples.html`) | pronto para revisão |
| Atividades (Curtidas, Comentários, Acompanhar, Salvos) | prontas para revisão |
| Vitrines (`vitrine.html`) | esboço (achado poluído; a revisar) |
| Estabelecimento (`estabelecimento.html`) | aprovada |
| Institucionais: Conhecer, Quem somos, Como funciona, Benefícios, Empresas e grupos, Patrocinadores (`institucional/`) | prontas para revisão |
| Institucional: Segurança | a fazer (por enquanto o link abre o Suporte) |

## Coluna lateral da direita

Páginas com `<aside class="lateral">` no HTML (por enquanto só a Início) ganham uma coluna à direita, numa faixa clara
que vai até a borda da janela, a 24px do conteúdo. O `layout.js` a coloca ao lado do conteúdo (`.corpo`); abaixo de
1200px ela desce para depois do conteúdo, em grade (entre 1200 e 1439px, notebooks, ela fica mais estreita: 300px). Na Início ela tem os mesmos blocos da coluna da direita da versão 1:
pesquisa de escuta (`escuta.js`, +1 crédito por resposta), Meus grupos, Hoje na SoftLiving, Conheça a comunidade e o
box Clube de Saúde (parceria em aberto). Os cartões de assunto passam a 2 colunas quando a coluna do conteúdo fica com
menos de 1000px (container query).

## Regras de visual

- **Só com login:** perfil, carteira, Atividades (Curtidas, Comentários, Acompanhar, Salvos), Notificações, Indicações,
  Amigos e Minhas Comunidades mostram, para quem não entrou, só o box de entrada no centro, sobre o fundo de sempre do
  site (a coluna da direita dessas páginas também some). O box tem o mesmo conteúdo e visual da janela Entrar do topo:
  os dois saem de `htmlEntrar()` e `cliqueEntrar()` no `layout.js`, então mudar ali muda os dois. O box acompanha a
  orientação da tela: deitada (computador, tablet ou celular deitado) = horizontal, em duas colunas (título, redes
  sociais e cadastro à esquerda; e-mail e senha à direita); em pé = vertical. Sem largura para as duas colunas
  (menos de 660px), fica vertical. O box fica centralizado na tela inteira (não só na área do conteúdo), sem passar
  por cima do menu lateral. Na tela de login o
  menu lateral fica recolhido e, no computador, 30% visível (100% ao passar o mouse). O "Entrar" do topo do menu lateral
  leva à página `entrar.html` (mesma tela), que depois de entrar volta para a página de onde a pessoa veio. Sem login
  também somem o saldo de créditos do topo, a carteira do menu lateral, o sino e os números de não lidas do menu, e o
  topo do menu mostra "Entrar" no lugar do nome. Lista em `PAGINAS_COM_LOGIN` no `layout.js`. Para entrar: clicar em
  Entrar com os campos vazios, ou e-mail `123` e senha `123`.

- **Menu institucional igual em todas as telas:** o menu do topo (computador), o rodapé e a janela "Saiba mais"
  (celular) saem da mesma lista, `INSTITUCIONAL` no `layout.js`. Para pôr, tirar ou reordenar uma página, mudar só ali.

- **Largura única do conteúdo:** todas as páginas têm a mesma largura de conteúdo, com ou sem a coluna lateral da direita.
  Nas páginas sem a coluna, o espaço dela fica vazio (`.app:not(.com-lateral) .corpo::after` no `estilos.css`), com as
  mesmas medidas: 340px, ou 300px entre 1200 e 1439px; abaixo de 1200px o espaço some, como a coluna. Página nova não
  precisa fazer nada para seguir a regra; não usar `max-width` próprio para alargar ou estreitar o conteúdo da página.
  Exceções: Ajuda (conteúdo e chat do assistente com o mesmo tamanho) e Simples (versão simplificada, coluna própria).

- **Efeito vidro (padrão):** botões e boxes translúcidos, com desfoque, brilho na borda e sombra suave; o fundo da página
  tem manchas suaves de cor para o vidro ter o que desfocar. Seção "EFEITO VIDRO" no fim do `estilos.css`: todo botão ou
  box novo entra numa das listas de lá (vidro claro, verde ou colorido).
- **Servidor de testes sem cache:** `.claude/servidor.py` (porta 8765) avisa o navegador para não guardar os arquivos;
  depois de mudar CSS, JS ou imagens, basta recarregar a página.

- **Hover (igual à versão 1):** todo botão e toda caixa clicável sobe 2px e ganha sombra (`--sombra-hover`) ao passar
  o mouse. A regra fica no fim do `estilos.css` ("REGRA DE HOVER"): ao criar um botão ou caixa clicável novo,
  acrescentar o seletor nas listas de lá. Exceções: abas do fichário e itens do menu lateral e da barra do celular.
  Conteúdos com foto (cartões, matéria em destaque, itens de lista) ganham também uma caixa branca em volta no hover.

- **Patrocinador apoiador:** uma faixa `<div class="apoio"></div>` por página recebe uma marca sorteada a cada visita
  (Rede D'Or, Claro, Bradesco Saúde), com logo em tom sobre tom. Lista em `PATROCINADORES` no layout.js; os logos ficam em
  `assets/img/logo-*.png` com fundo transparente. `?apoio=1|2|3` no endereço mostra uma marca específica.

- **Carrosséis:** blocos de conteúdos menores relacionados só se movem pelas setas: cada clique desliza um item, suave,
  em loop (`ativarCarrossel(elemento, 'h' | 'v')` no layout.js). Sem rolagem automática, sem efeito ao passar o mouse e sem
  rolagem pela roda do mouse. Horizontais: cartões de assunto, grupos da Início e sugestões da Coluna do dia (quantos por
  vez: `--vis` no CSS). Verticais: listas de Últimas matérias e de Colunas (4 por vez).

## Observações

- Fotos de exemplo do Unsplash, carregadas pela internet (sem internet aparece um fundo verde claro no lugar).
  Decidir se serão baixadas para `assets/img` e se trocamos por fotos com pessoas 50+.
- Números da abertura ("1.240 membros conversando hoje") e o depoimento de "Marta T." são fictícios.
- O menu recolhido fica guardado no navegador (`v2MenuRecolhido`).
