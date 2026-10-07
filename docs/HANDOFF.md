# SoftLiving · Handoff técnico da V1 para a V2

Documento para o desenvolvimento: o que muda do site em produção (V1, `softliving.com.br`) para o novo layout (V2,
este protótipo), tela por tela, com as regras de negócio e os dados que o backend precisa fornecer.

- **Protótipo (código):** https://github.com/SoftLiving/softliving-prototipo, branch `main`
- **Histórico das mudanças:** [COMMITS.md](../COMMITS.md)
- **Regras de visual detalhadas:** [README.md](../README.md)

> **Sobre os nomes.** Neste documento, **V1 = o site em produção** e **V2 = este protótipo**. No README, no COMMITS e
> nos comentários do código, "versão 1" quer dizer outra coisa: o *protótipo antigo*, apagado em 28/09/2026. Não confundir.

> **Como a V1 foi levantada.** Pela navegação no site em 06/10/2026, com uma conta de administrador, só lendo as
> telas. Não houve acesso ao código da V1: o que este documento diz sobre ela é o que aparece na interface.

> **Fora da V2 (decisão de 06/10/2026).** A V2 **não tem** as telas **Membros** (diretório e perfil público),
> **Oportunidades** e **Marketplace**. Elas existem na V1 e podem voltar em uma V3. Das pessoas, a V2 tem só a tela
> **Amigos**. Não implementar essas três telas nem os blocos e links que levam a elas (seção 3.2).

## 1. Como usar o protótipo

O protótipo é HTML, CSS e JavaScript puros, sem framework e sem backend. Serve como **referência de visual,
comportamento e regra**, não como código a copiar: a V1 é React (Next.js) e os componentes devem ser reescritos nela.

| O que aproveitar | Onde está |
|---|---|
| Visual final (cores, espaçamentos, tipografia, estados) | `assets/css/estilos.css` e os CSS por tela |
| Estrutura de cada tela e textos de interface | os `.html` e o JS da tela |
| Regras de negócio | seção 5 deste documento |
| Formato dos dados | `assets/js/*-dados.js` e seção 6 |

O que **não** aproveitar: tudo o que a seção 7 lista como simulação.

**Decisões:** as dúvidas levantadas na comparação com a V1 foram respondidas em 06/10/2026 e estão registradas
neste documento (resumo na seção 8) e na página `decisoes.html` do protótipo, em "Já decidido". Se surgir uma dúvida
nova, ela entra nessa página e a tela ganha um aviso tracejado no topo: **não implementar esse ponto antes da resposta.**

## 2. Resumo das mudanças

1. **Novo visual de portal de notícias:** fotos grandes, seções variadas, efeito vidro em botões e boxes.
2. **Nova moldura:** menu lateral flutuante que recolhe para só ícones; no celular vira gaveta, com barra inferior.
3. **Conteúdos reorganizado** como revista, com uma página própria para cada categoria (as mesmas sete da V1).
4. **Telas novas ou refeitas:** Busca, Notificações, Amigos, Carteira, Indicações, Meu perfil, Suporte com assistente,
   Atividades (Curtidas, Comentários, Acompanhar, Salvos), Vitrines, Estabelecimento, Minhas Comunidades, Conversas,
   Acessibilidade, Modo simples.
5. **Créditos visíveis em todo o site:** selo de acesso em todo cartão de conteúdo e destravar na tela de leitura.
6. **Login:** páginas pessoais mostram só o box de entrada para quem não entrou.
7. **Saem na V2:** Membros, Oportunidades e Marketplace (seção 3.2).
8. **Boxes e menus com nome e código** (seção 4.9): as páginas são montadas só com os boxes do catálogo.
9. **Pesquisa de escuta por página**, com banco de perguntas ilimitado (seção 5.7).

## 3. Mapa de telas

O protótipo usa `?t=<título>`, `?c=<slug>` e `?g=<número>` só por ser estático. **Manter as rotas e os identificadores
(UUID e slug) da V1**, salvo onde a tabela indica tela nova.

### 3.1 Telas da V2 e a equivalente na V1

| Tela | Arquivo na V2 | Rota na V1 | Situação |
|---|---|---|---|
| Início | `index.html` | `/` (pública) e `/app/home` | Alterada |
| Conteúdos | `conteudos.html` | `/app/conteudos` | Alterada (estrutura de revista) |
| Assunto | `assunto.html?a=<assunto>` | `/app/conteudos?category=<slug>` (só um filtro) | Nova como página: uma por categoria da V1, com o slug da V1 |
| Leitura | `conteudo.html?t=<título>` | `/app/conteudos/<uuid>` e `/conteudos/<uuid>` (pública) | Alterada |
| Colunas | `colunas.html` | `/app/colunistas` | Alterada |
| Colunista | `colunista.html?c=<slug>` | `/app/colunistas/<slug>` | Alterada |
| Busca | `busca.html?q=<termo>` | `/app/busca` | Alterada |
| Notificações | `notificacoes.html` + janela do sino | `/app/notificacoes` | Alterada |
| Grupos | `grupos.html` | `/app/nao-estou-sozinho` | Alterada |
| Grupo | `grupo.html?g=<id>#<aba>` | `/app/nao-estou-sozinho/<uuid>` | Alterada; grupos de desapego são novos |
| Vitrines | `vitrine.html` | `/app/parceiros` (no menu já aparece como "Vitrines") | Alterada. **Implementar como está no protótipo** (decisão de 06/10/2026) |
| Segmento de vitrine | `vitrine-segmento.html?s=<segmento>` (ou `?b=<bairro>`) | não existe | Nova: uma página por segmento e uma por bairro, com a estrutura padrão de boxes (4.9) |
| Estabelecimento | `estabelecimento.html?e=<id>` | não existe | Nova. Aprovada |
| Minhas Comunidades | `comunidades/*.html` (8 abas) | `/app/minha-empresa` e subrotas (7 abas) | **Substitui a `/app/minha-empresa`.** Na V2 a rota é `/app/minhascomunidades`; a rota antiga é desligada |
| Amigos | `amigos.html` | `/app/conexoes` ("Conexões") | Renomeada e alterada |
| Carteira | `carteira.html` | `/app/carteira` | Alterada |
| Indicações | `indicacoes.html` | `/app/indicacoes` | Alterada |
| Meu perfil | `perfil.html` | `/app/perfil` | Alterada |
| Perfil público | `perfil.html?publico=1` | `/app/comunidade/<id ou @nome>` | Alterada. **Na V2 a rota é `/app/@nome`**; usa o visual do Meu perfil e tem botões para quem visita |
| Suporte | `ajuda.html` | `/app/ajuda` ("Central de Ajuda") | Renomeada e alterada; ganha assistente |
| Curtidas | `curtidas.html` | `/app/curtidos` | Alterada |
| Comentários | `comentarios.html` | `/app/comentarios` | Alterada |
| Acompanhar | `acompanhar.html` | `/app/acompanhar` | Alterada |
| Salvos | `salvos.html` | `/app/salvos` | Alterada |
| Modo simples | `simples.html` | botão "Simples / Completo" | Alterada |
| Entrar | `entrar.html` + janela do topo | `/entrar?next=<rota>` | Alterada: redes sociais, e-mail e senha e link de acesso por e-mail |
| Conhecer | `institucional/conhecer.html` | `/conhecer` | Alterada |
| Como funciona | `institucional/como-funciona.html` | `/como-funciona` | Alterada |
| Benefícios | `institucional/beneficios.html` | `/beneficios` | Alterada |
| Patrocinadores | `institucional/patrocinadores.html` | `/patrocinadores` | Alterada |
| Conversas | `conversas.html?c=<id>` | `/app/conversas` e `/app/conversas/<uuid>` | Mantida, com o novo visual |
| Acessibilidade | `acessibilidade.html` | `/app/acessibilidade` | Mantida, com o novo visual |
| Quem somos | `institucional/quem-somos.html` | não existe | Nova |
| Empresas e grupos | `institucional/empresas-e-grupos.html` | não existe | Nova |

As quatro telas de Atividades não foram abertas uma a uma na V1: as rotas respondem, mas o conteúdo delas não foi comparado.

### 3.2 Telas da V1 que ficam fora da V2

**Decisão (06/10/2026): estas telas não fazem parte da V2.** Podem voltar em uma V3. Não têm desenho no protótipo.

| Tela na V1 | Rota na V1 | O que sai junto na V2 |
|---|---|---|
| Membros (diretório) | `/app/comunidade` | **Endereço desligado.** Saem o item "Membros" do menu e os links "Ver membros" |
| Perfil público de membro | `/app/comunidade/<id ou @nome>` | **Continua, em novo endereço: `/app/@nome`** (tabela 3.1). É o que o "Endereço público" do Meu Perfil abre. Saem só os links para ele a partir do diretório |
| Oportunidades | `/app/oportunidades` | **Endereço desligado.** Saem o item do menu, o bloco "Oportunidades para você" da Início, as oportunidades nos resultados da Busca e o item no Painel Admin |
| Marketplace | `/app/marketplace` | **Endereço desligado.** Saem o item do menu, o atalho "Use créditos e bônus nos parceiros" da Carteira e o item no Painel Admin |

**Endereços (decisão de 06/10/2026).** São desligados, sem levar para outra página:

| Endereço da V1 | O que era |
|---|---|
| `/app/oportunidades` | Oportunidades |
| `/app/marketplace` | Marketplace |
| `/app/comunidade` | Diretório de Membros |
| `/app/minha-empresa` e subrotas | Minha Empresa, substituída por Minhas Comunidades em `/app/minhascomunidades` |

**Muda de endereço:** o perfil público de cada pessoa passa de `/app/comunidade/@nome` para **`/app/@nome`**. O
endereço antigo é desligado junto com o diretório. Cuidado na implementação: `@nome` não pode coincidir com o nome
de outra rota de `/app/` (por isso o `@` faz parte do endereço).

**Das pessoas, a V2 tem só a tela Amigos:** pedidos de amizade, seus amigos, sugestões e Seguindo. Quem aparece nas
sugestões são pessoas dos mesmos grupos, não um diretório aberto.

### 3.2.1 Telas da V1 que continuam e não têm desenho no protótipo

Mantêm a rota, as funções e o conteúdo de hoje, e recebem só os padrões globais (seção 4).

| Tela na V1 | Rota | Observação |
|---|---|---|
| Painel Admin | `/app/admin` e subrotas | Fora do escopo: fica como está, sem os itens das telas retiradas |
| Cadastro | `/cadastro/boas-vindas` | Mantém os passos da V1, só com o novo visual |
| Esqueci a senha | `/esqueci-senha` | Mantém os passos da V1, só com o novo visual |
| Segurança | `/seguranca` | Mantém o texto da V1, com o novo visual |
| Termos, Privacidade | `/termos`, `/privacidade` | Manter |

### 3.3 Diferenças por tela

| Tela | V1 hoje | V2 |
|---|---|---|
| Menu | Início, Busca, Notificações, Conteúdos, Colunas, Atividades, Grupos, Conexões, Conversas, Membros, Parceiros, Oportunidades, Marketplace, Carteira, Indicações, Meu Perfil, Ajuda, Minha Empresa, Painel Admin | Quatro seções (4.5). **Saem: Membros, Oportunidades e Marketplace.** Conversas continua |
| Início | Aviso de ativação da conta, "Oportunidades para você", filtros de categoria, Coluna do dia, Meus grupos, Hoje na SoftLiving, Conheça a comunidade | Abertura com colagem, Explore por assunto, Últimas matérias, Acontece nos grupos, Colunas, newsletter. **Sem o bloco de Oportunidades** |
| Conteúdos | Lista única, com categorias, filtro Todos/Grátis/Premium e busca própria | Revista: assuntos em círculos, destaque, coleções, um bloco por assunto, lista completa |
| Assuntos | Categorias: Entretenimento e cultura, Estilo de vida e consumo, Financeiro, Saúde mental e qualidade de vida, SoftLiving, Tecnologia e serviços digitais, Turismo e viagem | **Mantêm-se as sete categorias da V1** (decisão de 06/10/2026). O protótipo mostra seis assuntos só como exemplo |
| Leitura | Curtir, Acompanhar, Salvar, Compartilhar, Ouvir, Encaminhar; Comentários; Continue lendo | As mesmas ações. Encaminhar abre uma janela com os 7 amigos com quem a pessoa mais interage, busca pelo nome e um recado; é só para amigos. Ganha A− / A+ (o mesmo ajuste de letra da Acessibilidade), "Quem escreveu", responder comentários e o novo box de compra |
| Busca | Conteúdos, grupos e oportunidades | Conteúdos, colunas, colunistas e grupos; sugestões e buscas recentes. **Sem oportunidades** |
| Notificações | Filtros Todas e Não lidas; com data | Mais filtros por tipo, preferências, janela do sino; **com data e hora** |
| Grupos | Filtro por categoria e busca; premium com preço por grupo (ex.: "50 créditos/mês") | Estrutura de revista, como Conteúdos e Vitrines: capa, segmentos em círculos (MSG), destaques (BEDHG), coleções (BDELDG e BDDLEG), premium e gratuitos lado a lado (BDVG), Acontece nos grupos (BANGH) e, no fim, todos os grupos com os filtros Todos, Participando e Disponíveis |
| Grupo | "Quem participa" (Conectar, Conversar), abas Tópicos e Mural, "Rodadas" | Abas Conversas, Mural, Encontros e Membros; grupos de desapego com Anúncios |
| Amigos | "Conexões": Recebidos, Enviados, Conectados e Seguindo | Pedidos de amizade e três abas: Seus amigos, Sugestões e Seguindo. "Mensagem" abre a Conversa; nas sugestões dá para Adicionar ou Seguir. É a única tela de pessoas da V2 |
| Carteira | Saldo em Créditos e Bônus; "Ativação da conta" só por Pix (R$ 50,00 → 50 + 50); histórico com data e saldo após | Recarga de R$20 a R$200 por Pix ou cartão, com bônus progressivo; aviso de que o bônus vale 12 meses; extrato **com data e hora**, com filtros |
| Indicações | Código, link, compartilhar (inclui WhatsApp); benefício descrito como "regras da campanha", sem valor fixo | Mostra o valor fixo (5 créditos para quem indicou) e convite por e-mail |
| Meu perfil | Visibilidade do perfil, e-mail de nova mensagem, endereço público, foto, interesses, meus grupos, alterar senha, acessibilidade | Números, sobre mim, habilidades e ofertas, interesses, comunidades, vitrines favoritas, amigos e conta. Em "Conta e privacidade": "Aparecer na comunidade", **"Receber mensagens de quem não é amigo"** (nova), **"Mostrar quando estou online"** (nova), "Endereço público" (opcional), além das outras configurações da V1 |
| Suporte | "Central de Ajuda": WhatsApp "em breve", tutoriais com tempo de leitura, perguntas frequentes | Sem WhatsApp e sem tempo de leitura; busca, temas, perguntas, e-mail e assistente com inteligência artificial, que responde só com o que está na base de conhecimento |
| Minhas Comunidades | "Minha Empresa": troca entre 3 organizações; abas Início, Módulos, Conteúdos, Usuários, Publicar, Dashboard, Escuta | Abas Início, Conteúdos, Serviços (no lugar de Módulos), Grupos internos, Membros, Publicar, Dashboard, Escuta; públicos; estabelecimentos incluídos |
| Vitrines | "Parceiros": lista com busca por nome e cidade (hoje vazia) | Vitrine com categorias, coleções e bairros, e página por estabelecimento |
| Perfil público | Nome, "Morador", @nome, cidade, ocupação, "Habilidades e ofertas", interesses e grupos | Mesma estrutura do Meu perfil: capa, foto, nome, @nome, cidade e ocupação; **botões Adicionar aos amigos, Seguir e Mensagem**; amigos e grupos em números; Sobre mim; Habilidades e ofertas; interesses marcados; grupos. **Não mostra** créditos, comunidades, vitrines favoritas, lista de amigos nem conta |
| Conversas | Lista de conversas e a conversa, com data | Lista à esquerda e conversa à direita; no celular, uma de cada vez. **Mensagens sem dia nem hora** |
| Acessibilidade | Tamanho da fonte (3), alto contraste, navegação simplificada, restaurar | O mesmo. A navegação simplificada abre o Modo simples. O tamanho da letra vale para o site todo e também muda pelo A− / A+ da leitura |

## 4. Padrões globais

### 4.1 Cores, fontes e medidas

As fontes e o fundo são os mesmos da V1 (Inter, Fraunces, fundo `#faf8f4`). Os tokens ficam no `:root` do `estilos.css`.

| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#013565` | Azul da marca: títulos, links, "Soft" do logo |
| `--green` | `#1F5519` | Verde da marca: botões, "Living" do logo |
| `--green-2`, `--green-dark` | `#2e7a4f`, `#174313` | Variações do verde |
| `--mint`, `--mint-2`, `--mint-line` | `#e6f2ea`, `#f1f8f3`, `#9fd0b0` | Fundos e linhas verdes claros |
| `--paper`, `--paper-light`, `--paper-dark` | `#faf8f4`, `#fffefb`, `#f1ede5` | Fundo creme |
| `--card`, `--line`, `--line-2` | `#fff`, `#ece8e1`, `#d9d4cb` | Cartões e bordas |
| `--text`, `--text-2`, `--muted` | `#1d2430`, `#56606c`, `#7c8591` | Texto |
| `--gold-bg`, `--gold` | `#fff4dc`, `#8a5a0e` | Selo pago, ofertas |
| `--red` | `#e5484d` | Erros, avisos |

- **Texto:** Inter. **Títulos (`h1` a `h4`):** Fraunces, em `--navy`.
- **Logo:** sempre em texto, nunca imagem: "Soft" em itálico e "Living", Times New Roman negrito, nas cores da marca.
  Sobre fundo escuro passa a `#d6e6f5` e `#cfe9c4`. O logo nunca fica em maiúsculas.
- **Dinheiro:** sem espaço depois do símbolo (`R$50`).

### 4.2 Efeito vidro

Botões e boxes são translúcidos: fundo `rgba(255,255,255,.42)`, `backdrop-filter: blur(16px) saturate(1.6)`, borda
clara e sombra suave. O fundo da página tem manchas suaves de cor para o desfoque aparecer. Seção "EFEITO VIDRO" do
`estilos.css`, com três variantes: claro, verde e colorido.

### 4.3 Hover

- Todo botão e toda caixa clicável sobe 2px e ganha a sombra `--sombra-hover`.
- Entrada rápida (0,15s), saída lenta (0,6s, desacelerando).
- Conteúdos com foto ganham também uma caixa branca em volta.
- Exceções: abas do fichário, itens do menu lateral e da barra do celular.
- Respeitar `prefers-reduced-motion`.

### 4.4 Responsivo

Testar de 320px a 1920px, incluindo 1366px (notebook).

| Largura | Comportamento |
|---|---|
| até 640px | Celular: barra inferior, janelas do topo ocupam a largura da tela, grades em uma coluna |
| até 980px | Menu lateral vira gaveta (280px, abre por cima do conteúdo) |
| a partir de 981px | Menu lateral flutuante (264px), recolhível para só ícones (84px) |
| abaixo de 1200px | A coluna da direita desce para depois do conteúdo, em grade |
| 1200 a 1439px | Coluna da direita ao lado do conteúdo, com 300px |
| a partir de 1440px | Coluna da direita com 340px |
| a partir de 1360px | Menu institucional inteiro no topo; abaixo disso, botão "Saiba mais" |

**Largura única do conteúdo:** todas as páginas têm a mesma largura de conteúdo, com ou sem a coluna da direita. Nas
páginas sem a coluna, o espaço dela fica vazio. Exceções: Suporte e Modo simples.

### 4.5 Moldura (todas as páginas)

Fonte: `assets/js/layout.js`.

- **Menu lateral**, em quatro seções:
  - Principal: Início, Busca, Notificações.
  - Conteúdo: Conteúdos, Colunas, Atividades (submenu: Curtidas, Comentários, Acompanhar, Salvos).
  - Comunidade e benefícios: Vitrines, Minhas Comunidades, Grupos, Amigos, Conversas.
    Membros, Oportunidades e Marketplace não entram no menu da V2.
  - Painel Admin continua visível só para administradores.
  - Minha conta: Carteira, Indicações, Meu perfil, Suporte.
- O menu recolhe para só ícones; a escolha é guardada por usuário.
- Notificações, Grupos e Amigos mostram um número de novidades no menu.
- **Topo:** saldo de créditos, sino, avatar (ou botão Entrar) e menu institucional. Sino, créditos, conta e Entrar
  abrem janelas embaixo do botão; só uma aberta por vez; fecham com clique fora ou Esc.
- **Coluna da direita** (nas páginas que a têm): a regra é ser **contextual ao conteúdo da página**. As opções de
  cada página ainda serão definidas; **por enquanto, todas as páginas mostram os mesmos quatro blocos**, nesta ordem:
  1. Sua opinião vale créditos (pesquisa de escuta, 5.7);
  2. Meus grupos (até 5, com o número de mensagens novas). Só aparece para quem está logado;
  3. Hoje na SoftLiving (números da comunidade);
  4. **Meus amigos**, no lugar do "Conheça a comunidade" da V1: os amigos, com um ponto verde para quem está
     **online** e cinza para quem está **offline**, os online primeiro e o total "N online agora". Cada nome abre a
     Conversa com a pessoa. Só aparece para quem está logado.
  Exceção: em Minhas Comunidades a coluna mostra só a pesquisa da própria comunidade, como já era.
  O backend precisa informar quem está online (presença). **Está online quem usou o portal nos últimos 5 minutos.**
  **A pessoa pode esconder o próprio estado**: no Meu perfil, em "Conta e privacidade", a chave "Mostrar quando estou
  online" vem ligada; desligada, ela aparece como offline para os amigos (decisão de 07/10/2026).
- **Rodapé e janela "Saiba mais":** mesmos itens do menu institucional, na mesma ordem (uma lista única).
- **Patrocinador apoiador:** uma faixa por página, com uma marca sorteada a cada visita, em tom sobre tom.

### 4.6 Carrosséis

- **Todo box com carrossel tem os botões de rolagem** (setas): um de cada lado no carrossel horizontal; um em cima e
  um embaixo no vertical. Vale para todos os boxes com carrossel (BEAH, BEDH, BANGH, BDELD e os demais).
- Só se movem pelas setas: cada clique desliza um item, em loop. Sem rolagem automática e sem roda do mouse.
- **Um box com carrossel deve sempre receber mais itens do que cabem na tela**, para as setas aparecerem. Só quando
  não houver itens suficientes as setas somem (não há para onde rolar).
- Com mouse, acende só a seta do lado onde o cursor está, aos poucos, conforme ele se aproxima; ao sair, apaga
  devagar. Pelo teclado, as duas aparecem. No celular e no tablet ficam sempre à vista.
- Quantos itens por vez: horizontais, 4 (cartões de assunto e sugestões da Coluna do dia) ou 3 (grupos da Início);
  verticais, 4 (listas de matérias e colunas) ou 3 (listas dos blocos de assunto).

### 4.7 Regras de conteúdo

- **Nunca** mostrar tempo de leitura nem data de publicação de conteúdos.
- **Notificações e extrato da Carteira mostram data e hora** (`06/10/2026 às 14:32`), do mais recente para o mais antigo.
- As mensagens das Conversas não mostram dia nem hora.
- **A ordem dos conteúdos é sorteada a cada visita**, em Conteúdos, Colunas, Vitrines e Grupos.
- Fotos: banco de imagens escolhido pela curadoria.
- **Todo cartão de conteúdo mostra, sempre: segmento (assunto ou coluna), título, autor e selo de acesso**, mais o
  **botão salvar** (bandeirinha). Vale para todos os formatos de cartão. O selo só some quando a pessoa já destravou
  o conteúdo (5.3).
- **O selo (créditos ou "Grátis") existe só nos cartões de conteúdo**, isto é, nos artigos de conteúdo e nos artigos de
  colunistas. São os únicos que têm preço e podem ser destravados.
- **Os cartões de vitrine são diferentes: não têm preço nem desbloqueio, porque tudo ali é de graça.** Por isso os boxes
  de vitrine são boxes próprios (BEDHV, BDELDV, BDDLEV), e não os de conteúdo com outro recheio.
- **Cartão de vitrine** (estabelecimento): logo com as iniciais, segmento (categoria e bairro), nome da vitrine, resumo
  e o botão "Ver vitrine", mais o botão salvar. Não tem autor nem selo de créditos: **tudo o que está nas Vitrines é de graça**.
- **Cartão de grupo** é a outra exceção: mostra segmento, título, quantidade de participantes e o botão de entrar no
  grupo ("Participar", ou "Ver grupo" para quem já participa). **Também tem o botão salvar.**
- **Curtidas e Salvos são em modo lista**: uma linha por item, com foto pequena, segmento, título, autor e selo, e à direita o botão que desfaz (descurtir ou tirar dos salvos). Duas colunas quando cabe, uma no celular. As páginas de Atividades não têm menu entre elas no topo: a troca é pelo submenu Atividades do menu lateral.
- **Atividades › Salvos** separa o que foi salvo em cinco tipos, com um filtro no topo e uma seção para cada um:
  **Conteúdos, Colunas, Grupos, Vitrines e Minhas Comunidades**. Cada seção fica dentro de um box de fundo claro,
  com o título e a quantidade. Coluna é o conteúdo escrito por um colunista;
  vitrine salva é o estabelecimento favoritado. **Em Minhas Comunidades entram os conteúdos e os serviços salvos
  dentro das comunidades fechadas** (decisão de 07/10/2026).
- Cartões de conteúdo não têm botão "Ler": o cartão inteiro é o link.
- O botão salvar do cartão só aparece no hover (ou se já foi salvo); no celular, sempre à vista.

### 4.8 Medidas, alinhamento e movimento

Os valores abaixo saíram do `estilos.css` e devem ser reproduzidos como estão. Onde este resumo e o protótipo
divergirem, **vale o protótipo**: abrir a tela em `localhost` e conferir com o inspetor do navegador.

**Larguras e alinhamento**

| Elemento | Medida |
|---|---|
| Topo | Ocupa a largura toda da janela, acima do menu e do conteúdo; padding de 16px 32px; a partir de 981px o conteúdo do topo começa a 304px da esquerda, alinhado com o conteúdo da página |
| Espaço do menu lateral (moldura) | 264px de largura, fixo, a 16px da borda esquerda e 8px do topo |
| Menu aberto / recolhido | 264px / 84px |
| Coluna do conteúdo | Largura máxima de 1180px, com 24px de respiro de cada lado (16px no celular); **alinhada à esquerda, logo depois do menu**, não centralizada |
| Coluna da direita | 340px a partir de 1440px; 300px entre 1200 e 1439px; abaixo de 1200px desce para depois do conteúdo, em grade de blocos de no mínimo 280px |
| Blocos dentro da coluna da direita | Largura máxima de 440px, 18px entre eles |
| Coluna da direita, aparência | Faixa clara que vai até a borda direita da janela, cantos de 26px só do lado esquerdo, 36px abaixo do topo do conteúdo |
| Páginas sem coluna da direita | Um espaço vazio da mesma largura (340px ou 300px) ocupa o lugar dela, para o conteúdo ter a mesma largura em todas as páginas |
| Rodapé | Largura toda da janela; o conteúdo dele começa a 280px da esquerda (0 até 980px) |
| Cantos | 26px nos boxes grandes, 22 a 24px nos cartões, 14 a 18px nos itens de lista, 999px nos botões |

**Recolher o menu lateral (computador, a partir de 981px)**

- Só a barra encolhe, de 264px para 84px. **A moldura continua reservando os 264px**, então o conteúdo, a coluna da
  direita e o topo **não se movem nem mudam de largura**. É isso que mantém o alinhamento da página.
- A largura e o padding da barra mudam em 0,25s. Somem os nomes dos itens, os números de novidades, o submenu, o
  nome da pessoa e o texto da carteira; ficam só os ícones, centralizados.
- O botão de recolher fica na moldura, no alto à direita da barra. Recolhido, vira uma etiqueta de 28 × 44px presa do
  lado de fora da barra, com a seta invertida; a mudança também leva 0,25s.
- Recolhido, passar o mouse num ícone mostra o nome do item numa caixa de vidro ao lado.
- A escolha fica guardada. **Ao trocar de página com o menu recolhido, ele já nasce recolhido, sem animar**: as
  transições ficam desligadas enquanto a página carrega (classe `carregando`, retirada depois de dois quadros).
- A barra acompanha a rolagem da página (não tem rolagem própria).

**Menu no celular e no tablet (até 980px)**

- Vira gaveta de 280px, fixa na esquerda, com a altura da tela e rolagem própria.
- Entra deslizando da esquerda em 0,25s; um véu cobre a página e fecha a gaveta ao toque. Esc também fecha.
- A barra inferior (Início, Conteúdos, Grupos, Carteira, Você) aparece até 640px, fixa a 12px das bordas.

**Hover**

- Botões e caixas clicáveis sobem 2px e ganham sombra. Entrada em 0,15s; saída em 0,6s com a curva
  `cubic-bezier(.22, .61, .36, 1)`.
- Fotos de cartões ampliam 3 a 4% em 0,5s.

**Carrosséis**

- Cada clique na seta desliza um item em 450ms, desacelerando no fim, em loop. Clicar de novo durante o
  deslize soma mais um item.
- Com mouse, a seta do lado do cursor acende aos poucos conforme ele se aproxima e apaga em 0,6s ao sair.

**Janelas e avisos**

- Janelas do topo (sino, créditos, conta, entrar, saiba mais): abrem embaixo do botão, alinhadas à direita dele,
  subindo 6px com aparecimento suave. No celular ocupam a largura da tela, a 16px das bordas.
- Janelas de Compartilhar e Encaminhar: fundo escurecido e desfocado; a caixa aparece em 0,18s. No celular sobem de baixo.
- Aviso rápido (toast): aparece embaixo, no centro, e some depois de 2,6s.
- Abas que não cabem na tela rolam para o lado, com setas que seguem a regra das setas dos carrosséis.

**Acessibilidade do movimento**

- Com "reduzir animações" ligado no aparelho, as animações contínuas param.

### 4.9 Boxes e menus (catálogo)

Cada tipo de box e de menu tem **nome e código**. O código é a sigla do nome (a inicial de cada palavra); os de
vitrine terminam em V e os de grupo, em G. **As páginas são montadas só com os boxes deste catálogo**: formato fora da lista não deve ser
implementado. O box não tem título fixo: **título, subtítulo e botão são definidos na montagem de cada página.**

A mesma lista, mantida em dia pelo produto, está na planilha "SoftLiving · Boxes e menus (nomenclatura)":
https://docs.google.com/spreadsheets/d/1vpDjomFU69DGPmPpsfr3F7XgS1y56lzklzs9_TLqjSs/edit

Os três cartões usados nos boxes (conteúdo, vitrine e grupo) estão descritos em 4.7; as regras de carrossel, em 4.6.

| Código | Nome | Formato | Cartão | Carrossel (itens por vez) | Onde está no protótipo |
|---|---|---|---|---|---|
| BEAH | Box explore por assunto horizontal | Carrossel de cartões com abas de fichário para trocar de assunto | Conteúdo | Horizontal (4) | Início |
| BEDH | Box em destaque horizontal | Carrossel de cartões, sem abas | Conteúdo | Horizontal (4) | Colunas ("Colunas em destaque"); segmento de conteúdo |
| BANGH | Box acontece nos grupos horizontal | Comentário de participante em destaque à esquerda e grupos em carrossel ao lado | Grupo | Horizontal (3) | Início; Grupos |
| BDELD | Box destaque esquerda lista direita | Destaque grande à esquerda e lista à direita | Conteúdo | Vertical (4) | Conteúdos (coleção); segmento de conteúdo |
| BDDLE | Box destaque direita lista esquerda | Espelho do BDELD | Conteúdo | Vertical (4) | Conteúdos ("Estilo e casa"); segmento de conteúdo |
| BSD | Box super destaque | Faixa larga com a foto de fundo e o texto por cima; um item | Conteúdo (ou vitrine, nas páginas de vitrine) | Não | Conteúdos ("Viagem"); segmentos de conteúdo e de vitrine |
| BDS | Box destaque simples | Box claro, foto quadrada à esquerda e texto à direita; um item | Conteúdo (ou vitrine, nas páginas de vitrine) | Não | Conteúdos (carta da SoftLiving); segmentos de conteúdo e de vitrine |
| BDVC | Box dois verticais conteúdos | Duas colunas, cada uma com capa e lista | Conteúdo | Vertical (3) | Conteúdos ("Tecnologia" e "Saúde") |
| BDRC | Box destaque resumo colunas | Coluna do dia em cima e sugestões embaixo | Conteúdo | Horizontal (4) | Colunas |
| BNPA | Box navegue pelo autor | Grade de colunistas em cartões compactos, 4 por linha | Colunista | Não | Colunas |
| BTOC | Box todos os colunistas | Abas de fichário por segmento e cartões de colunista, 4 por linha | Colunista | Não (as abas rolam) | Colunas |
| BEDHV | Box em destaque horizontal vitrine | Carrossel de cartões de vitrine, sem abas | Vitrine | Horizontal (4) | Vitrines; segmento de vitrine |
| BDELDV | Box destaque esquerda lista direita vitrine | Versão de vitrine do BDELD | Vitrine | Vertical (4) | Vitrines (coleções); segmento de vitrine |
| BDDLEV | Box destaque direita lista esquerda vitrine | Versão de vitrine do BDDLE | Vitrine | Vertical (4) | Vitrines (coleções); segmento de vitrine |
| BDVV | Box dois verticais vitrine | Versão de vitrine do BDVC | Vitrine | Vertical (3) | Vitrines ("Gastronomia" e "Saúde") |
| BRPCV | Box recomendado pela comunidade vitrine | Carrossel de depoimentos de membros, 3 colunas | Depoimento | Horizontal (3) | Vitrines; segmento de vitrine |
| BPDVV | Box perto de você vitrine | Linha de 4 cartões de bairro, sorteados | Bairro | Não | Vitrines; segmento de vitrine |
| BEDHG | Box em destaque horizontal grupos | Carrossel de cartões de grupo, sem abas | Grupo | Horizontal (4) | Grupos |
| BDELDG | Box destaque esquerda lista direita grupos | Versão de grupo do BDELD | Grupo | Vertical (4) | Grupos (coleção) |
| BDDLEG | Box destaque direita lista esquerda grupos | Versão de grupo do BDDLE | Grupo | Vertical (4) | Grupos (coleção) |
| BDVG | Box dois verticais grupos | Versão de grupo do BDVC | Grupo | Vertical (3) | Grupos ("Grupos premium" e "Grupos gratuitos") |
| MSC | Menu segmentos conteúdo | Linha de círculos com foto e nome do segmento | Não usa | Não | Conteúdos; segmento de conteúdo |
| MSV | Menu segmento vitrine | Linha de círculos com foto e nome do segmento | Não usa | Não | Vitrines; segmento de vitrine |
| MSG | Menu segmentos grupos | Linha de círculos com foto e nome do segmento | Não usa | Não | Grupos |

**Detalhes de cada box**

- **Boxes BEAH e BEDH:** carrossel horizontal de cartões de conteúdo, 4 por vez. O BEAH tem abas de fichário em cima, uma por assunto, e cada aba troca os cartões do carrossel; o BEDH não tem abas. Os cartões mostram sempre o nome do autor.
- **Boxes BDELD e BDDLE:** um conteúdo em destaque (foto grande, segmento, título, resumo, autor e selo) ao lado de uma lista de conteúdos sugeridos em carrossel vertical, 4 por vez. No BDELD o destaque fica à esquerda; no BDDLE, à direita. No celular, o destaque vem em cima e a lista embaixo.
- **Boxes BSD e BDS:** mostram um item só, sem carrossel. O BSD é uma faixa larga com a foto de fundo e o texto por cima; o BDS é um box claro com foto quadrada à esquerda e, à direita, uma etiqueta, o título, o resumo e o autor.
- **Boxes BEDHV, BDELDV e BDDLEV:** os mesmos formatos do BEDH, do BDELD e do BDDLE, com cartões de vitrine (iniciais, segmento e bairro, nome, resumo e "Ver vitrine", sem selo).
- **Boxes BEDHG, BDELDG, BDDLEG e BDVG (página Grupos, 07/10/2026):** os mesmos formatos do BEDH, do BDELD, do BDDLE e do BDVC, com **cartões de grupo** (segmento, título, quantidade de participantes, botão de entrar e botão salvar). Nos cartões verticais o botão é "Participar" ou "Participando · Sair" e age ali mesmo, sem abrir o grupo; nos outros formatos o rótulo é "Participar" ou "Ver grupo" e o cartão inteiro abre o grupo. Grupo premium leva "Premium" junto do segmento (e o preço por mês no selo do cartão vertical). Ao entrar ou sair, o botão e a contagem daquele grupo mudam em todos os boxes da página.
- **MSG (Menu segmentos grupos):** igual ao MSC e ao MSV na aparência, mas **não abre outra página**: escolher um segmento filtra a lista "Todos os grupos", no fim da página, e leva a tela até ela; clicar de novo no mesmo segmento desfaz o filtro.
- **Box BANGH ("Acontece nos grupos"):** o comentário de participante à esquerda muda a cada carregamento da página, sorteado entre os comentários disponíveis (5 de exemplo no protótipo). Mostra as iniciais, o nome abreviado, o grupo, uma frase de destaque, o comentário e um botão que leva ao grupo citado. Quem escolhe os comentários que entram no sorteio é a curadoria.
- **Box BDRC (Box destaque resumo colunas), na página Colunas:** a parte de cima mostra sempre a **coluna do dia** (foto, nome da coluna, colunista, resumo e a última coluna publicada), e **a coluna do dia é sempre gratuita**. A parte de baixo, "Mais colunas para você", mostra as sugestões **em carrossel horizontal, 4 por vez**, **sorteadas a cada carregamento**, em cartões com as mesmas informações dos artigos (segmento, título, autor, selo e salvar).
- **Box BNPA (Box navegue pelo autor), na página Colunas:** grade com todos os colunistas em cartões compactos (iniciais, nome, segmento e quantidade de colunas), 4 por linha no computador, com a contagem de colunistas e de colunas publicadas abaixo do título. Sem carrossel e sem abas. Clicar num colunista filtra as colunas da página por ele; clicar de novo desfaz.
- **Box BRPCV (Box recomendado pela comunidade vitrine), na página Vitrines:** carrossel horizontal de depoimentos de membros sobre estabelecimentos, **3 por vez, com os botões de rolagem**. Cada cartão mostra a foto e o logo do estabelecimento, **o nome do estabelecimento, o bairro, o depoimento, o nome de quem escreveu e o grupo dessa pessoa**, mais o botão salvar (que salva a vitrine). O cartão abre a vitrine do estabelecimento.
- **Box BPDVV (Box perto de você vitrine), na página Vitrines:** uma linha de cartões de bairro, 4 no computador. Cada cartão é a foto do bairro com o nome e a quantidade de lugares por cima ("2 lugares", "1 lugar"). Clicar num bairro abre a página com os estabelecimentos dele (`vitrine-segmento.html?b=<bairro>`). **Não é carrossel: mostra sempre 4 bairros. Quando houver mais de 4, os 4 são sorteados a cada visita** (decisão de 07/10/2026).
- **MSC (Menu segmentos conteúdo)** e **MSV (Menu segmento vitrine):** o submenu interno das páginas Conteúdos e Vitrines, uma linha de círculos com foto e o nome do segmento embaixo. Cada círculo abre a página daquele segmento: `assunto.html?a=<assunto>` nos conteúdos e `vitrine-segmento.html?s=<segmento>` nas vitrines. Na página do segmento o menu se repete, com o segmento aberto marcado em verde. Quando os círculos não cabem na linha, ela rola para o lado.
- **Estrutura padrão das páginas de segmento** (decisão de 06/10/2026). Toda página de segmento começa com o título do segmento e o menu de segmentos, e depois traz sempre os mesmos boxes, nesta ordem:

  | Página | Arquivo | Boxes, na ordem |
  |---|---|---|
  | Segmento de conteúdo | `assunto.html?a=<assunto>` | BEDH, BDELD, BSD, BDDLE, BDS |
  | Segmento de vitrine | `vitrine-segmento.html?s=<segmento>` | BEDHV, BDELDV, BSD, BDDLEV, BDS, BRPCV, BPDVV |

  Cada box recebe só itens daquele segmento. Na página de vitrine, o BSD e o BDS mostram uma vitrine (cartão de vitrine, sem selo) e **mantêm o mesmo código** (decisão de 07/10/2026). Os títulos de cada box nessas páginas ainda são provisórios. A página de vitrine com `?b=<bairro>` usa a mesma estrutura para um bairro e é o destino do box BPDVV. No protótipo, quando o segmento tem poucos itens de exemplo, os boxes são completados com itens de outros segmentos, só para a estrutura aparecer cheia.
- **Boxes BDVC (Box dois verticais conteúdos) e BDVV (Box dois verticais vitrine):** duas colunas lado a lado, cada uma com o seu título e subtítulo. Em cada coluna, uma **capa** (foto com o texto por cima) e, embaixo, uma **lista de itens compactos em carrossel vertical, 3 por vez**. No celular, as duas colunas ficam uma embaixo da outra. O BDVC usa cartões de conteúdo (selo, segmento, título, resumo e autor na capa; segmento, título, autor e selo nos itens); o BDVV usa cartões de vitrine (iniciais, segmento e bairro, nome, resumo e "Ver vitrine" na capa; segmento e bairro, nome e "Ver vitrine" nos itens). Todos com o botão salvar. O BDVC está em "Tecnologia" e "Saúde", na página Conteúdos; o BDVV, em "Gastronomia" e "Saúde", na página Vitrines.
- **Formatos retirados (07/10/2026):** o **mosaico** (um cartão grande, vários menores e o cartão "Ver todos") não existe mais. Só se usam os boxes com nome e código; qualquer formato fora da lista não deve ser implementado.
- **Box BTOC (Box todos os colunistas), na página Colunas:** abas de fichário, uma por segmento, mais a aba "Todos". Cartões de colunista em 4 colunas no computador. **Na aba "Todos" aparecem 2 linhas (8 colunistas)**; **nas abas de segmento não há limite de linhas**: aparecem todos os colunistas daquele segmento. **As abas ficam sempre em uma linha só**: quando não cabem, não quebram para uma segunda linha; aparecem os botões de rolagem das abas, um de cada lado, e **a rolagem é contínua (360 graus), como nos carrosséis**: depois da última aba vem de novo a primeira, e antes da primeira vem a última, sem voltar para trás. O movimento é o mesmo dos carrosséis de cartões: cada clique desliza uma aba, em 450ms, desacelerando no fim, e clicar de novo durante o deslize soma mais uma aba. A mesma regra vale para todo fichário do site. **As setas do fichário aparecem e somem como as dos carrosséis** (4.6): com mouse, acende só a do lado do cursor, aos poucos, e apaga devagar ao sair; pelo teclado, as duas; no celular e no tablet, sempre à vista. **Quando houver mais de 8 colunistas, os 8 da aba "Todos" são sorteados a cada visita** e não mudam ao trocar de aba (decisão de 07/10/2026).

## 5. Regras de negócio

### 5.1 Login

- **Páginas que pedem login:** Meu perfil, Carteira, Curtidas, Comentários, Acompanhar, Salvos, Notificações,
  Indicações, Amigos e Minhas Comunidades.
- Sem login, essas páginas mostram só o box de entrada no centro da tela, sobre o fundo normal do site.
- Depois de entrar, a pessoa volta para a página de onde veio (a V1 já faz isso com `?next=`).
- Sem login somem: saldo de créditos, carteira do menu, sino, números de novidades e, na coluna da direita, os blocos Meus grupos e Meus amigos. O topo do menu mostra "Entrar".
- O box de entrada e a janela Entrar do topo têm o mesmo conteúdo: Google, Apple, Facebook, ou e-mail e senha,
  "Manter conectado", "Esqueci minha senha", **"Receber um link de acesso por e-mail"** (que a V1 já tem) e o convite ao cadastro.
- Box horizontal (duas colunas) com a tela deitada e pelo menos 660px; vertical nos outros casos.

### 5.2 Créditos e carteira

- O saldo tem duas partes, mostradas separadas: **comprados** e **bônus**.
- **Recarga:** R$20, R$50, R$100 ou R$200, por Pix ou cartão. 1 real = 1 crédito.

| Recarga | Bônus | Total |
|---|---|---|
| R$20 | 0 | 20 |
| R$50 | 5 (10%) | 55 |
| R$100 | 15 (15%) | 115 |
| R$200 | 40 (20%) | 240 |

- **Primeira recarga:** R$50 viram 50 créditos + 50 de bônus.
- **Bônus sem recarga:**
  - cadastro: 20 créditos para quem se cadastra, com ou sem convite;
  - indicação aprovada: 5 créditos, só para quem indicou;
  - pesquisa de escuta: 1 crédito por pergunta respondida.
- **Extrato:** filtros Tudo, Entradas e Saídas; cada linha mostra data e hora e diz se é bônus.
- **O bônus é usado primeiro** (regra que a V1 já aplica e mostra na Carteira) e não é sacável.
- A V1 hoje só tem a "Ativação da conta" por Pix (R$ 50,00 → 50 créditos + 50 de bônus). A tabela acima, o cartão e os
  outros valores são novidade da V2, **confirmada em 06/10/2026**.
- **O bônus vale por 12 meses, contados do dia em que cada bônus foi recebido.** Os créditos comprados não têm prazo.

### 5.3 Acesso aos conteúdos

- Todo cartão de conteúdo mostra um selo:
  - **Grátis** (verde);
  - **preço com cadeado**, por exemplo "2 créditos" (dourado);
  - **sem selo** quando a pessoa já destravou.
- O destravar acontece **na tela de leitura**, nunca no cartão.
- Conteúdo pago mostra os primeiros parágrafos, uma prévia borrada e o box de compra. O botão muda conforme o caso:

| Situação | Botão |
|---|---|
| Sem login | Entrar para destravar |
| Saldo insuficiente | Recarregar créditos (mostra quanto falta) |
| Saldo suficiente | Destravar agora |

- Destravar debita os créditos, registra a compra no extrato e libera o conteúdo para sempre naquela conta.
- O título, a mensagem e os três motivos do box de compra são sorteados de listas fixas (`conteudo.js`).
- Conteúdo travado **não** mostra "Quem escreveu" nem comentários; mostra o "Continue lendo".
- **Continue lendo:** todo artigo termina com 3 conteúdos relacionados (mesmo assunto ou mesmo colunista primeiro).
- **Minhas Comunidades:** tudo é gratuito, sem selo e sem filtro Grátis/Premium.
- **Vitrines:** todos os conteúdos e cartões das vitrines são gratuitos. Nada nas Vitrines custa créditos, e os créditos
  não são aceitos nos estabelecimentos (lá valem só os benefícios para membros). Por isso o cartão de vitrine não tem selo.

### 5.4 Leitura

Ações: Curtir, Salvar, Acompanhar a conversa, Compartilhar, Encaminhar, Ouvir o texto e tamanho da letra (3 níveis).

- **Acompanhar** avisa sobre comentários novos e lista o conteúdo em Atividades › Acompanhar.
- **Compartilhar** abre uma janela com as opções; no celular ela sobe de baixo.
- **Encaminhar** manda o conteúdo, com um recado opcional, **sempre e só para amigos**. A janela abre com os **7 amigos com quem a pessoa mais interage** e tem uma **busca pelo nome** entre todos os amigos; dá para escolher mais de um. Quem recebe ganha uma notificação. Só para quem está logado. **"Mais interage"** é a soma das mensagens trocadas e dos conteúdos encaminhados entre os dois nos últimos 90 dias (decisão de 07/10/2026).
- **Tamanho da letra:** o A− / A+ muda o mesmo ajuste da tela Acessibilidade (3 níveis), que vale para o site todo.
- **Comentários:** publicar, curtir e responder; a resposta do autor leva um selo.

### 5.5 Grupos

- **Página Grupos na estrutura de revista** (07/10/2026), nesta ordem: capa; MSG; BEDHG ("Em destaque nos grupos", 8 grupos sorteados); duas coleções, em BDELDG e BDDLEG; faixa do apoiador; BDVG ("Grupos premium" e "Grupos gratuitos"); BANGH (comentário sorteado e os 6 grupos com mais participantes); e "Todos os grupos".
- "Todos os grupos": lista com filtros Todos, Participando e Disponíveis, mais o segmento escolhido no MSG; botão Participar ou Sair. **Mostra uma prévia de 8 grupos e, embaixo, o botão "Ver mais", que abre mais 8 a cada clique**, até acabar a lista (o botão some). Trocar de filtro ou de segmento volta à prévia de 8.
- **Grupo comum:** abas Conversas, Mural, Encontros e Membros.
- **Grupo de desapego:** abas Anúncios, Mural e Membros. Anúncio é de Venda, Doação ou Troca, com categoria e estado
  de conservação; concluído vira Vendido, Doado ou Trocado.
- Os boxes que mostram grupos (BANGH) e todos os outros estão no catálogo da seção 4.9.
- **Grupo premium:** cada grupo tem o seu preço por mês, escolhido entre **quatro opções: R$5, R$10, R$15 ou R$20** (5, 10, 15 ou 20 créditos, já que R$1 vale 1 crédito). A cobrança é por **débito automático todo mês, enquanto houver saldo**. No protótipo os preços dos grupos de exemplo são sorteados entre as quatro opções. **Quando o saldo não cobre a mensalidade, a pessoa sai do grupo premium e é avisada.**
- Quem não participa vê o grupo, mas não escreve.
- O topo do grupo mostra os amigos da pessoa que participam.

### 5.6 Comunidades e estabelecimentos

- **Comunidade:** grupo fechado (empresa, condomínio, clube, faculdade, academia...). Tem 8 abas: Início, Conteúdos,
  Serviços, Grupos internos, Membros, Publicar, Dashboard e Escuta.
- **Estabelecimento:** negócio aberto ao público (loja, restaurante, hotel, clínica...). Aparece nas Vitrines e tem
  página própria, em abas: Visão geral, Produtos e serviços, Agenda, Avaliações, Fotos e Perguntas.
- A pessoa pode **incluir** um estabelecimento em Minhas Comunidades; ele aparece lá em layout de vitrine.
- **Salvar** um estabelecimento o coloca em "Minhas vitrines favoritas", no perfil.
- Minhas Comunidades mostra três boxes fixados; cada box tem uma lista "Trocar por".
- Uma comunidade pode ter mais de um **público** (por exemplo Cliente e Colaborador), cada um com seu painel.
- **Aba Grupos internos:** funcionam como os Grupos do portal (Conversas, Mural, Encontros e Membros), só para quem é da comunidade.
- **Aba Serviços:** fica no lugar da aba Módulos da V1.

### 5.7 Pesquisa de escuta

O box "Sua opinião vale créditos" fica no topo da coluna da direita.

- **As perguntas são contextuais à página em que a pessoa está** (decisão de 07/10/2026):

  | Página | Perguntas sobre |
  |---|---|
  | Conteúdos e página de assunto | Conteúdos: assuntos, formato, preço, o que a pessoa faz depois de ler |
  | Colunas | Colunas e colunistas |
  | Grupos | Grupos, encontros e convivência |
  | Vitrines e página de segmento | Estabelecimentos, benefícios e recomendações |
  | Minhas Comunidades | A comunidade aberta (uma pesquisa por comunidade e por público) |
  | Demais páginas | O portal em geral e o propósito da SoftLiving |

- **Banco de perguntas ilimitado por contexto** (decisão de 07/10/2026): cada página tem o seu banco de dados de
  perguntas, cada uma com as suas respostas, sem limite de quantidade, atualizado e aprofundado sempre. O sistema
  não pode fixar a quantidade por contexto, e as rodadas são sorteadas desse banco.
- O protótipo traz um exemplo inicial de cada contexto em `assets/js/escuta-dados.js` (`ESCUTA_POR_PAGINA`); as de
  Minhas Comunidades ficam em `comunidades-escuta.js`.
- **Pesquisa externa em camadas:** além da pesquisa dentro do portal, há uma pesquisa enviada por fora (por e-mail, por
  exemplo). Como não tem página de contexto, é organizada em **10 camadas** aplicadas em ordem, da mais rasa (sistema,
  facilidade de uso e entendimento do propósito) às mais detalhadas, também sem limite de perguntas.
  O protótipo não tem tela para ela; as perguntas estão na planilha "SoftLiving · Perguntas da pesquisa por página"
  (aba "Pesquisa externa"), que traz também as perguntas por página e um sumário explicativo:
  https://docs.google.com/spreadsheets/d/1GUiAEka8yMUDmvhlp1q-FDrQxOpkzk8FyM9_MLvx9ds/edit
- Tipos de resposta: uma opção, várias opções, nota de 0 a 10 ou texto livre.
- Rodadas de 3 a 5 perguntas sorteadas, uma por vez.
- Pergunta respondida não volta; pergunta pulada pode voltar em outra rodada.
- Cada contexto tem o seu andamento: responder as de Conteúdos não consome as de Grupos.
- Resposta de texto precisa de pelo menos 10 caracteres.
- Três tipos de recompensa:
  - **portal:** +1 crédito de bônus no saldo;
  - **interna:** +1 crédito interno da empresa, com contador próprio, fora do saldo do portal;
  - **nenhuma.**
- As perguntas e respostas devem ser cadastráveis pelo painel administrativo (a V1 já tem "Pesquisas" no admin), com
  o contexto de página em que cada uma aparece.

### 5.8 Indicações

- Link e código de convite, convite por e-mail e lista dos convidados.
- Situações do convite: Convite enviado, Terminando o cadastro, Aprovada.
- **Quem indica ganha 5 créditos de bônus** quando a indicação é aprovada. Só quem indicou recebe.
- **Quem se cadastra ganha 20 créditos de bônus.** É o bônus de cadastro, igual para todos: o convite não dá nada a
  mais ao convidado.
- **Texto do convite:** "Cadastre-se pelo meu convite. Todo novo membro ganha 20 créditos de bônus."

### 5.9 Outras telas

- **Busca:** procura em conteúdos, colunas, colunistas e grupos; ignora acentos; destaca o termo; com o campo vazio,
  mostra sugestões e buscas recentes.
- **Notificações:** filtros Todas, Não lidas, Grupos, Colunas, Conteúdos e Créditos; marcar como lidas; preferências
  por tipo. Cada aviso mostra data e hora. A janela do sino mostra a mesma lista resumida.
- **Amigos:** pedidos de amizade, seus amigos, sugestões (Adicionar ou Seguir) e Seguindo.
- **Conversas:** mensagens diretas. Amigos podem escrever um para o outro. Quem liga, no Meu perfil, "Receber mensagens de quem não é amigo" também recebe mensagens de qualquer membro (conteúdo encaminhado é sempre só entre amigos). O padrão é desligado.
- **Meu perfil:** números, sobre mim, habilidades e ofertas, interesses editáveis, comunidades, vitrines favoritas, amigos e conta. O botão "Ver perfil público" mostra a página como os outros a veem.
- **Perfil público (`/app/@nome`):** respeita "Quem pode ver meu perfil" (só amigos ou todos os membros) e "Aparecer na comunidade". Só para quem está logado. Para quem visita tem Adicionar aos amigos, Seguir e Mensagem; **Mensagem aparece só para amigos**, ou para todos se a pessoa aceita mensagens de quem não é amigo.
- **Endereço público (`@nome`):** opcional. A pessoa pode trocar no Meu perfil, em "Conta e privacidade". Regras: de 3 a 30 caracteres, só letras minúsculas, números, ponto e sublinhado; não pode repetir o de outra pessoa nem coincidir com uma rota de `/app/`. **Depois de cada troca, a pessoa espera 14 dias para trocar de novo**; nesse período o botão Editar fica desligado e a tela mostra a data em que a troca volta a ser possível. **Depois da troca, o endereço antigo fica reservado por 90 dias**: ninguém pode usá-lo e ele leva ao endereço novo; passados os 90 dias, fica livre (decisão de 07/10/2026).
- **Suporte:** busca, temas, perguntas frequentes, contato por e-mail e assistente com inteligência artificial, que responde só com o que está na base de conhecimento (`conhecimento/*.md`). Sem WhatsApp.
- **Modo simples:** 8 opções grandes, uma tarefa por tela, letra ajustável em 4 tamanhos. Não usa a moldura comum.

## 6. Dados que o backend precisa fornecer

Campos que o protótipo usa. Os nomes curtos (`t`, `e`, `a`) são do protótipo; usar os nomes da API da V1.

| Entidade | Campos | Arquivo de referência |
|---|---|---|
| Conteúdo | assunto, título, resumo, autor, foto de capa, acesso (grátis ou pago), preço em créditos, destaque, texto | `conteudos-dados.js`, `conteudos-textos.js` |
| Assunto | nome, nome curto, slug | `conteudos-cartoes.js` |
| Colunista | nome, slug, sigla, cor, nome da coluna, categoria, bio, colunas publicadas | `colunas-dados.js` |
| Grupo | categoria, nome, foto, descrição, membros, tipo (comum ou desapego), premium, preço mensal (5, 10, 15 ou 20) | `grupos-dados.js` |
| Anúncio de desapego | tipo, categoria, estado, situação | `desapego-dados.js` |
| Estabelecimento | nome, categoria, bairro, foto, cor, descrição, benefício, sobre, galeria, endereço, horário, telefone, site | `estabelecimentos-dados.js` |
| Catálogo e extras | produtos e serviços, equipe, agenda, avaliações, perguntas | `estabelecimentos-catalogo.js`, `estabelecimentos-extras.js` |
| Comunidade | nome, tipo, públicos, resumo, aviso, eventos, recomendados, atalhos, serviços | `comunidades-dados.js` |
| Notificação | tipo, texto curto, texto completo, ação (rótulo e destino), lida | `layout.js` (`NOTIFICACOES`) |
| Movimento da carteira | descrição, detalhe, valor, se é bônus | `carteira.js` |
| Indicação | pessoa, situação | `indicacoes.js` |
| Conversa | participantes, mensagens (autor, texto), não lidas | `conversas.js`, `pessoas-dados.js` |
| Pergunta de escuta | texto, tipo de resposta, opções | `escuta-dados.js`, `comunidades-escuta.js` |

**Estado por usuário** que o protótipo guarda no navegador e que na V2 real vai para o backend:

| Chave no protótipo | O que é |
|---|---|
| `v2Logado` | Sessão |
| `v2Salvos`, `v2Curtidas`, `v2Conversas` | Conteúdos salvos, curtidos e conversas acompanhadas |
| `v2GruposSalvos` | Grupos salvos |
| `v2Destravados`, `v2Compras` | Conteúdos comprados e os débitos |
| `bonusCreditos` | Bônus ganho em pesquisas |
| `v2NotifLidas`, `v2NotifPrefs` | Notificações lidas e preferências |
| `v2Amigos`, `v2Seguindo`, `v2Convites` | Amizades, pessoas seguidas e convites enviados |
| `v2Mensagens` | Mensagens das Conversas |
| `v2Acessibilidade` | Tamanho da letra, alto contraste e navegação simplificada |
| `v2PerfilOferta`, `v2PerfilAparecer`, `v2PerfilMsgTodos`, `v2PerfilOnline` | Habilidades e ofertas, aparecer na comunidade, receber mensagens de quem não é amigo e mostrar quando está online |
| `v2PerfilArroba`, `v2PerfilArrobaEm` | Endereço público e o dia da última troca |
| `gruposParticipacao` | Grupos de que participa |
| `v2EstComunidades`, `v2EstFavoritos` | Estabelecimentos incluídos e favoritos |
| `comunidadesEstado` | Boxes fixados e comunidade aberta |
| `v2MenuRecolhido` | Menu recolhido (pode continuar no navegador) |

## 7. O que é simulação (não implementar assim)

| No protótipo | Na V2 real |
|---|---|
| Login com campos vazios ou `123` / `123` | Autenticação da V1 |
| Usuário fixo "Rafael Barros" | Usuário logado |
| Saldo fixo de 41 créditos (`SALDO_BASE`) | Saldo do backend |
| `TESTE_PAGAMENTOS = true`: cerca de 90% dos conteúdos ficam pagos | Preço real de cada conteúdo |
| Pagamento, entrada com rede social, cadastro e recuperar senha só mostram um aviso | Fluxos reais |
| Conteúdo identificado pelo título na URL | UUID ou slug da V1 |
| Assistente do Suporte casa palavras da pergunta com os arquivos `conhecimento/*.md` | Inteligência artificial respondendo só com o que está nessa base |
| Fotos de exemplo carregadas pela internet | Banco de imagens escolhido pela curadoria, com as imagens hospedadas |
| Textos dos artigos de demonstração | Textos reais |
| Números da abertura e depoimento de "Marta T." fictícios | Dados reais ou retirar |
| Comunidades e estabelecimentos fictícios (Claro e demais) | Cadastro real |
| Faixa "Protótipo", aviso de entrada e aviso da coluna da direita | Retirar |
| Página `decisoes.html` e os avisos tracejados "decisões em aberto" no topo das telas | Retirar: são material de trabalho |
| `?v=AAAAMMDDHHMM` nos arquivos e `ferramentas/versao.py` | O build do Next.js já resolve o cache |

## 8. Decisões e pendências

### 8.1 Decisões de 06/10/2026

Respondidas pelo produto no questionário do protótipo. Já estão aplicadas nas seções acima e no protótipo.

| Tema | Decisão |
|---|---|
| Telas fora da V2 | Membros (diretório), Oportunidades e Marketplace não entram; endereços desligados (3.2) |
| Minhas Comunidades | Fica em `/app/minhascomunidades` e substitui a Minha Empresa. Módulos vira Serviços. Grupos internos funcionam como os Grupos do portal |
| Endereço público | A pessoa pode trocar o `@nome`; depois de cada troca, espera 14 dias para trocar de novo |
| Perfil público | Passa para `/app/@nome`; conteúdo da V1 mais o Sobre mim; botões Adicionar aos amigos, Seguir e Mensagem |
| Mensagens | Amigos podem escrever; a pessoa escolhe no perfil se recebe mensagens de quem não é amigo |
| Encaminhar | Sempre e só para amigos; primeiro os 7 com quem mais interage, depois busca pelo nome |
| Menu | Conversas fica em "Comunidade e benefícios", depois de Amigos |
| Datas | Notificações e extrato com data e hora; mensagens das Conversas sem dia nem hora; conteúdos sem data e sem tempo de leitura |
| Conteúdos | Sete categorias da V1; ordem sorteada a cada visita; fotos de banco de imagens escolhido pela curadoria |
| Carteira | Recarga de R$20 a R$200, Pix ou cartão, com bônus progressivo; bônus usado primeiro e válido por 12 meses, contados do dia em que foi recebido |
| Grupo premium | Preço definido grupo a grupo, entre R$5, R$10, R$15 ou R$20 por mês; débito automático todo mês; sem saldo, a pessoa sai do grupo e é avisada |
| Indicações | 5 créditos só para quem indicou; 20 créditos de cadastro; texto do convite em 5.8 |
| Acessibilidade | Navegação simplificada abre o Modo simples; um ajuste de letra só, em 3 níveis, acessível pela Acessibilidade e pela leitura |
| Suporte | Assistente com inteligência artificial, respondendo só com a base de conhecimento |
| Entrada | Redes sociais, e-mail e senha e link de acesso por e-mail |
| Cadastro, Esqueci a senha, Segurança | Mantêm os passos e o texto da V1, com o novo visual |
| Vitrines | Implementar como está no protótipo |
| Coluna da direita | Contextual à página (opções por página numa próxima atualização); por enquanto, pesquisa, Meus grupos, Hoje na SoftLiving e Meus amigos com online e offline |

### 8.1.1 Decisões de 06 e 07/10/2026 sobre boxes, cartões e pesquisa

Tomadas na montagem das páginas. Já estão aplicadas nas seções acima e no protótipo.

| Tema | Decisão |
|---|---|
| Boxes e menus | Cada tipo tem nome e código (sigla do nome; os de vitrine terminam em V). Só se usam os do catálogo (4.9). Título, subtítulo e botão são definidos por página |
| Cartões | Conteúdo: segmento, título, autor e selo. Vitrine: iniciais, segmento e bairro, nome, resumo e "Ver vitrine", sem selo. Grupo: segmento, título, participantes e botão. Todos com o botão salvar |
| Vitrines | Tudo é gratuito; por isso os boxes de vitrine são próprios |
| Páginas de segmento | Estrutura padrão de boxes, uma para conteúdo e outra para vitrine (4.9) |
| Mosaico | Formato retirado |
| Carrosséis e fichários | Todo carrossel tem setas e recebe mais itens do que cabem; as abas de fichário ficam em uma linha e rolam em volta contínua, com a mesma animação |
| Atividades | Sem menu entre as páginas; Curtidas e Salvos em lista; Salvos separado em Conteúdos, Colunas, Grupos, Vitrines e Minhas Comunidades |
| Coluna da direita | Meus grupos e Meus amigos só aparecem para quem está logado |
| Pesquisa de escuta | Perguntas contextuais à página; banco de perguntas ilimitado por página; pesquisa externa em camadas (5.7) |
| Amigos online | Online = usou o portal nos últimos 5 minutos; a pessoa pode esconder o próprio estado no Meu perfil |
| Encaminhar | "Mais interage" = mensagens trocadas e conteúdos encaminhados nos últimos 90 dias |
| Endereço público antigo | Reservado por 90 dias, levando ao novo; depois fica livre |
| Salvos › Minhas Comunidades | Conteúdos e serviços salvos dentro das comunidades fechadas |
| BTOC | Os 8 colunistas da aba "Todos" são sorteados a cada visita |
| BDRC | Sugestões em carrossel, 4 por vez |
| BPDVV | Sempre 4 bairros, sorteados a cada visita; sem carrossel |
| BSD e BDS | Mesmo código nas páginas de conteúdo e de vitrine |

### 8.2 Em aberto

Pontos que ainda dependem de resposta do produto. **Não implementar antes da resposta**; onde há sugestão, ela vale
só como ponto de partida.

- **Códigos dos boxes de grupo:** BEDHG, BDELDG, BDDLEG, BDVG e MSG seguem a regra dos de vitrine (final G); falta a confirmação dos nomes pelo produto. Os títulos e as coleções da página Grupos são provisórios.
- **Títulos dos boxes nas páginas de segmento:** os do protótipo são provisórios (4.9).
- **Blocos ainda sem nome:** a lista "Todos os conteúdos" (fichário, filtro e lista em 3 colunas), a lista "Todos os grupos" da página Grupos, o topo de página, a faixa de apoio, a newsletter e as faixas de chamada. Implementar como estão no protótipo; o nome vem depois.
- **Coluna da direita por página:** a coluna será contextual, mas as opções de cada página ainda não foram definidas (4.5). Até lá, vale o conjunto único de quatro blocos.
- **Pesquisa externa:** se dá créditos e para quem é enviada (5.7).
- **Atividades (Curtidas, Comentários, Acompanhar, Salvos):** as rotas da V1 existem, mas o conteúdo delas não foi comparado com o protótipo.

## 9. Ordem de entrega sugerida

1. **Padrões globais e moldura** (seção 4): tokens, efeito vidro, hover, menu lateral, topo, rodapé, barra do celular.
2. **Leitura e créditos:** selo de acesso, tela de leitura, destravar, Carteira.
3. **Portal:** Início, Conteúdos, Assunto, Colunas, Colunista, Busca.
4. **Conta:** Entrar, Meu perfil, Notificações, Atividades, Indicações, Amigos.
5. **Comunidade:** Grupos, Grupo, Minhas Comunidades, Estabelecimento, Conversas.
6. **Institucionais, Suporte, Acessibilidade e Modo simples.**
7. **Vitrines e páginas de segmento de vitrine.**
