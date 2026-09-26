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
| Conteúdos e leitura do artigo | a fazer (abre a v1) |
| Grupos e página interna de grupo (inclui Desapego) | a fazer (abre a v1) |
| Minhas Comunidades (8 abas) | a fazer (abre a v1) |
| Institucionais: Conhecer, Como funciona, Benefícios, Patrocinadores (`institucional/`) | prontas para revisão |
| Institucional: Segurança | a fazer (abre a v1) |
| Modo simples | a fazer (abre a v1) |

## Regras de visual

- **Hover (igual à versão 1):** todo botão e toda caixa clicável sobe 2px e ganha sombra (`--sombra-hover`) ao passar
  o mouse. A regra fica no fim do `estilos.css` ("REGRA DE HOVER"): ao criar um botão ou caixa clicável novo,
  acrescentar o seletor nas listas de lá. Exceções: abas do fichário e itens do menu lateral e da barra do celular.
  Conteúdos com foto (cartões, matéria em destaque, itens de lista) ganham também uma caixa branca em volta no hover.

- **Patrocinadores entre os conteúdos:** um `<div class="apoio"></div>` entre as seções recebe uma marca sorteada a cada
  visita (sem repetir na página), com logo em tom sobre tom. Lista em `PATROCINADORES` no layout.js; para usar o logo de
  verdade, acrescentar `logo:'assets/img/<arquivo>'` à marca.

## Observações

- Fotos de exemplo do Unsplash, carregadas pela internet (sem internet aparece um fundo verde claro no lugar).
  Decidir se serão baixadas para `assets/img` e se trocamos por fotos com pessoas 50+.
- Números da abertura ("1.240 membros conversando hoje") e o depoimento de "Marta T." são fictícios.
- O menu recolhido fica guardado no navegador (`v2MenuRecolhido`).
