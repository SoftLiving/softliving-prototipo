# SoftLiving — Protótipo versão 2 (portal de notícias)

Novo layout do protótipo, com cara de portal de notícias: fundo creme, títulos em Fraunces, fotos grandes, seções
variadas e um menu lateral flutuante que recolhe para só ícones (no celular vira gaveta + barra inferior).

A **versão 1** (pasta acima, `../`) continua intacta. A v2 é refeita **página por página**; enquanto uma página não
existe aqui, os links da v2 abrem a página equivalente da versão 1. Quando tudo estiver aprovado, a v2 passa a ser o
projeto original.

Abra `v2/index.html` com dois cliques, ou pelo servidor de testes (`http://localhost:8765/v2/index.html`).

## Estrutura

```
index.html                  Tela Início (abertura com colagem, Explore por assunto, Últimas matérias,
                            Acontece nos grupos, patrocinadores apoiadores, newsletter)
institucional/              conhecer, como-funciona, beneficios, patrocinadores (textos iguais aos da v1, novo visual).
                            Links para páginas institucionais usam data-site-link="<nome>" e urlSite() no layout.js
                            (SITES_V2 lista as que já existem na v2)
assets/css/estilos.css      Todos os estilos: Base · Moldura · Componentes · uma seção por tela
assets/js/layout.js         Moldura comum: faixa de protótipo (com link "Ver versão 1"), aviso, menu lateral,
                            topo, rodapé, barra do celular; saldo de créditos, logo em texto, fotoUrl(), mostrarAviso()
conteudos.html              Tela Conteúdos: busca, destaque, assuntos (fichário), Todos/Grátis/Premium, grade
busca.html                  Tela Busca: conteúdos e colunas, colunistas e grupos (?q=termo); sugestões com o campo vazio
colunas.html                Tela Colunas (referência: softliving.com.br/app/colunistas): coluna do dia com 4 sugestões,
                            navegue por autor, colunistas por categoria e colunas em destaque
grupos.html                 Tela Grupos: Todos/Participando/Disponíveis, grade com Participar/Sair
assets/js/lateral.js        Coluna lateral da direita, comum à Início, Conteúdos e Grupos
assets/js/escuta.js         Pesquisa de escuta (cópia da v1), entra no topo da coluna lateral
assets/js/conteudos.js      Tela Conteúdos
assets/js/grupos.js         Tela Grupos
assets/js/busca.js          Tela Busca (sem diferenciar acentos; termos destacados; buscas recentes na sessão)
assets/js/colunas.js        Tela Colunas
assets/js/colunas-dados.js  Colunistas (nomes das colunas, categorias e biografias do site); colunas de conteudos-dados.js + extras
assets/js/inicio.js         Tela Início
assets/js/*-dados.js        Cópia dos dados da versão 1. conteudos-dados.js e grupos-dados.js ganharam o campo foto
assets/img/                 Logos da FSB e da RB2
```

## Como acrescentar uma página

1. Criar o `.html` com `<body data-page="<nome>" data-root="">` (ou `data-root="../"` em subpasta), só com o conteúdo
   da página, e carregar `assets/js/layout.js` antes dos scripts da página.
2. Em `PAGINAS` (layout.js), tirar o `v1:true` da página: o menu, a barra do celular e o rodapé passam a apontar para a v2.
3. Estilos da tela numa seção própria do `estilos.css`.

## Situação das páginas

| Página | Versão 2 |
|---|---|
| Início | pronta para revisão |
| Conteúdos (`conteudos.html`) | pronta para revisão |
| Colunas (`colunas.html`) | pronta para revisão (a versão 1 não tinha esta página) |
| Busca (`busca.html`) | pronta para revisão (a versão 1 não tinha esta página) |
| Leitura do artigo | a fazer |
| Grupos (`grupos.html`) | pronta para revisão |
| Página interna de grupo (inclui Desapego) | a fazer (abre a v1) |
| Minhas Comunidades (8 abas) | a fazer (abre a v1) |
| Institucionais: Conhecer, Como funciona, Benefícios, Patrocinadores (`institucional/`) | prontas para revisão |
| Institucional: Segurança | a fazer (abre a v1) |
| Modo simples | a fazer (abre a v1) |

## Coluna lateral da direita

Páginas com `<aside class="lateral">` no HTML (por enquanto só a Início) ganham uma coluna à direita, numa faixa clara
que vai até a borda da janela, a 24px do conteúdo. O `layout.js` a coloca ao lado do conteúdo (`.corpo`); abaixo de
1360px ela desce para depois do conteúdo, em grade. Na Início ela tem os mesmos blocos da coluna da direita da versão 1:
pesquisa de escuta (`escuta.js`, +1 crédito por resposta), Meus grupos, Hoje na SoftLiving, Conheça a comunidade e o
box Clube de Saúde (parceria em aberto). Os cartões de assunto passam a 2 colunas quando a coluna do conteúdo fica com
menos de 1000px (container query).

## Regras de visual

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
