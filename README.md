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
conteudos.html              Tela Conteúdos (estrutura da Vitrine): assuntos em círculos, destaque, coleções, um bloco por assunto, lista completa
assunto.html                Página de cada assunto (?a=bem-estar|saude|estilo-e-casa|viagem|tecnologia|softliving), na estrutura padrão
                            das páginas de segmento de conteúdo: boxes BEDH, BDELD, BSD, BDDLE e BDS
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
conversas.html              Conversas (da V1): mensagens diretas com os amigos; lista e conversa (?c=<id>); conversas.js.
                            Pessoas em pessoas-dados.js (também usadas pela aba Seguindo da tela Amigos)
acessibilidade.html         Acessibilidade (da V1): letra em 3 tamanhos, alto contraste e navegação simplificada; vale para o site
                            todo (lerAcessibilidade / aplicarAcessibilidade no layout.js, classes ac-* no <html>)
decisoes.html               Decisões em aberto (página de trabalho, fora do produto): perguntas em decisoes-dados.js; o layout.js
                            carrega esse arquivo em todas as páginas e mostra o aviso tracejado nas telas citadas em `telas`
docs/HANDOFF.md             Documento técnico para o desenvolvimento: o que muda do site em produção para este protótipo
vitrine.html                Vitrines (menu, acima de Minhas Comunidades): os estabelecimentos
vitrine-segmento.html       Página de um segmento das Vitrines (?s=gastronomia) ou de um bairro (?b=Leblon): aberta pelo menu de
                            segmentos (MSV) e pelo box Perto de você. Estrutura padrão: BEDHV, BDELDV, BSD, BDDLEV, BDS, BRPCV e BPDVV.
                            Cartões e depoimentos em vitrine-cartoes.js (usados também pela Vitrine)
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
| Conteúdos (`conteudos.html`) | pronta para revisão (estrutura de revista, como a Vitrine) |
| Assuntos (`assunto.html?a=...`) | pronta para revisão (uma página por assunto, aberta pelos círculos da Conteúdos) |
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
| Vitrines (`vitrine.html`) | aprovada para implementação como está (decisão de 2026-10-06) |
| Estabelecimento (`estabelecimento.html`) | aprovada |
| Institucionais: Conhecer, Quem somos, Como funciona, Benefícios, Empresas e grupos, Patrocinadores (`institucional/`) | prontas para revisão |
| Institucional: Segurança | a fazer (por enquanto o link abre o Suporte) |
| Conversas e Acessibilidade (trazidas do site em produção em 2026-10-06) | prontas para revisão |
| Membros (diretório e perfil público), Oportunidades e Marketplace | **fora da versão 2** (decisão de 2026-10-06; talvez numa versão 3). Não criar no protótipo |
| Decisões em aberto (`decisoes.html`) | página de trabalho: responder e enviar ao desenvolvimento |

## Coluna lateral da direita

Páginas com `<aside class="lateral">` no HTML ganham uma coluna à direita, numa faixa clara que vai até a borda da
janela, a 24px do conteúdo. O `layout.js` a coloca ao lado do conteúdo (`.corpo`); abaixo de 1200px ela desce para
depois do conteúdo, em grade (entre 1200 e 1439px, notebooks, ela fica mais estreita: 300px).

A coluna será **sempre contextual ao conteúdo da página**, mas as opções de cada página ainda não foram definidas
(próxima atualização). Por enquanto (decisão de 2026-10-06) todas as páginas mostram os mesmos quatro blocos, montados
por `lateral.js`: pesquisa de escuta "Sua opinião vale créditos" (`escuta.js`, +1 crédito por resposta; as perguntas
acompanham a página, dez por contexto, em `ESCUTA_POR_PAGINA` no `escuta-dados.js`), Meus grupos,
Hoje na SoftLiving e **Meus amigos**, com quem está online e offline (entrou no lugar de "Conheça a comunidade"). Meus grupos
e Meus amigos são pessoais e só aparecem com login. Exceção: as páginas de Minhas Comunidades têm coluna própria, só com a pesquisa da comunidade. Os cartões de assunto passam a 2 colunas quando a coluna do conteúdo fica com menos de 1000px
(container query).

## Fora da versão 2

As telas **Membros** (diretório e perfil público de cada membro), **Oportunidades** e **Marketplace** existem no site
em produção, mas **não fazem parte da versão 2** (decisão de 2026-10-06). Podem voltar numa versão 3. Chegaram a ser
desenhadas aqui e foram retiradas: não há página, item de menu, bloco na Início nem resultado na Busca para elas.
Das pessoas, a versão 2 tem só a tela **Amigos** (com a aba Seguindo) e as **Conversas**.

## Decisões em aberto

As dúvidas que dependem de decisão ficam em `assets/js/decisoes-dados.js` (pergunta, como é no site em produção, como
está no protótipo, opções e as telas onde o aviso aparece). Para acrescentar uma, basta um item novo na lista
`DECISOES`; decisão tomada sai dessa lista e entra em `DECISOES_TOMADAS`. As respostas ficam no navegador de quem
responde (`v2Decisoes`); "Copiar respostas" gera o texto para enviar.

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

- **Datas (decisão de 2026-10-06):** notificações (página e janela do sino) e extrato da Carteira mostram data e hora
  (`06/10/2026 às 14:32`; `agoraTexto()` no `layout.js`). Conteúdos continuam sem data de publicação e sem tempo de
  leitura, e as mensagens das Conversas não mostram dia nem hora.

- **Tamanho da letra:** um ajuste só, em 3 níveis, para o site todo (`lerAcessibilidade` / `gravarAcessibilidade` no
  `layout.js`). Muda pela tela Acessibilidade e pelo A− / A+ da tela de leitura.

- **Perfil público:** `perfil.html?publico=1` mostra o Meu perfil como os outros o veem no endereço `/app/@nome`
  (some tudo o que tem a classe `pf-privado`; entram os botões Adicionar aos amigos, Seguir e Mensagem).

- **Selo de acesso nos cartões de conteúdo:** todo cartão de conteúdo mostra um selo (`seloAcesso(c)` no `layout.js`):
  "Grátis" (verde) ou o preço com cadeado, ex. "2 créditos" (dourado); conteúdo pago que a pessoa já destravou fica
  sem selo. O destravar é feito na tela do conteúdo, depois de clicar no cartão: debita os
  créditos da carteira (`comprarConteudo` no `layout.js`, compras em `v2Compras`, que entram no extrato da Carteira) e
  fica guardado em `v2Destravados`. O saldo de todo o site vem de `saldoCreditos()`. Cartões não têm botão Ler: o cartão inteiro abre o conteúdo.

- **Continue lendo no fim de todo artigo:** a tela de leitura (`conteudo.html`) sempre termina com 3 cartões de
  conteúdos relacionados (mesmo assunto ou colunista primeiro), com o selo de acesso; aparecem também nos conteúdos
  bloqueados e ficam fixos durante a visita.

- **Teste de pagamentos (ligado):** `TESTE_PAGAMENTOS = true` no `conteudos-dados.js` deixa cerca de 90% dos conteúdos
  pagos (1, 2 ou 3 créditos); ficam grátis só a carta "Aos patrocinadores do SoftLiving" e a última coluna da coluna do
  dia. Para voltar ao normal, mudar para `false`.

- **Minhas Comunidades sem conteúdo pago:** tudo é gratuito (inclusive o acervo SoftLiving), então os cartões não
  mostram etiqueta de Grátis nem de créditos e não há filtro Grátis/Premium (`normalizeCard` no `comunidades.js`).

- **Logo em fundo escuro:** o logo em texto (`.sig`, "Soft" em itálico e "Living", na fonte original) usa as cores da
  marca (azul `#013565` e verde `#1F5519`); sobre fundo escuro passa para as versões claras delas (azul-claro `#d6e6f5`
  e verde-claro `#cfe9c4`). É automático em todo o site (`ajustarLogosEmTexto` no `layout.js` põe a classe `.sig-light`
  quando o fundo atrás do logo é escuro, inclusive degradês e fotos, e em conteúdo que aparece depois, como o chat da
  Ajuda). Para um logo que nunca deve mudar, usar a classe `.sig-fixo`.

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
  Entrar no hover é rápido (0,15s) e sair é lento (0,6s, desacelerando): as transições de hover usam `var(--hover-t)`
  e `var(--hover-curva)` (seção "SAÍDA LENTA DO HOVER" do `estilos.css`); transição nova de hover deve usar as duas.
  O botão salvar dos cartões só aparece ao passar o mouse no cartão (ou se já foi salvo); no celular, sempre à vista.

- **Patrocinador apoiador:** uma faixa `<div class="apoio"></div>` por página recebe uma marca sorteada a cada visita
  (Rede D'Or, Claro, Bradesco Saúde), com logo em tom sobre tom. Lista em `PATROCINADORES` no layout.js; os logos ficam em
  `assets/img/logo-*.png` com fundo transparente. `?apoio=1|2|3` no endereço mostra uma marca específica.

- **Carrosséis em Conteúdos e Vitrine:** as listas dentro dos blocos (coleções, Estilo e casa, Saúde, Tecnologia)
  usam o carrossel vertical, 3 por vez; as setas só aparecem quando há mais itens do que cabem.
- **Setas dos carrosséis:** em aparelhos com mouse, sobre o carrossel só acende a seta do lado de onde o mouse está, aos
  poucos, conforme ele se aproxima dela (a outra fica apagada); ao sair, apaga devagar. Pelo teclado, as duas aparecem.
  No celular e no tablet ficam sempre à vista. Vale para todos os carrosséis do site (`ativarCarrossel` no `layout.js`).

- **Carrosséis:** blocos de conteúdos menores relacionados só se movem pelas setas: cada clique desliza um item, suave,
  em loop (`ativarCarrossel(elemento, 'h' | 'v')` no layout.js). Sem rolagem automática, sem efeito ao passar o mouse e sem
  rolagem pela roda do mouse. Horizontais: cartões de assunto, grupos da Início e sugestões da Coluna do dia (quantos por
  vez: `--vis` no CSS). Verticais: listas de Últimas matérias e de Colunas (4 por vez).

## Publicação e cache

O GitHub Pages deixa o navegador guardar os arquivos por até 10 minutos. Para a versão nova aparecer logo, os arquivos
de estilo e script das páginas levam a versão no endereço (`?v=AAAAMMDDHHMM`). Antes de cada publicação, rodar
`python3 ferramentas/versao.py`, que atualiza a versão em todas as páginas.

## Observações

- Fotos de exemplo do Unsplash, carregadas pela internet (sem internet aparece um fundo verde claro no lugar).
  Decidir se serão baixadas para `assets/img` e se trocamos por fotos com pessoas 50+.
- Números da abertura ("1.240 membros conversando hoje") e o depoimento de "Marta T." são fictícios.
- O menu recolhido fica guardado no navegador (`v2MenuRecolhido`).
