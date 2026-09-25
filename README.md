# SoftLiving — Protótipo "Minhas Comunidades"

Protótipo de front-end em HTML/CSS/JS puro (sem build, sem dependências além de fontes do Google Fonts) para a página de comunidades licenciadas do SoftLiving. Feito para validar layout, navegação e conteúdo antes da implementação real em Next.js + Tailwind v4.

Abra `index.html` (ou qualquer página) direto no navegador. Não precisa de servidor nem instalação.

## O que tem aqui

- **Switcher de 3 comunidades fixas**, cada uma com um dropdown para trocar por qualquer uma das 12 comunidades fictícias cadastradas (favoritagem por troca)
- **12 comunidades fictícias**: Claro (empresa), American Flat (condomínio), Clube Caiçaras (clube), Hotel Vista Mar, Restaurante Sabor & Arte, Faculdade Horizonte, Academia PowerFit, Escola de Música Allegro, Bella Viagens, Clínica SorrisoTotal, Zen Wellness Spa, Pet Shop Amigo Fiel, e Rede Dor (com toggle Paciente/Colaborador — dois públicos diferentes dentro do mesmo cliente)
- **Abas**: Início, Conteúdos (curadoria em mosaico com destaques, listas e cards), Serviços (só no American Flat — agendamentos, classificados, cardápios, indicação de profissionais), Grupos internos, Membros (diretório de perfis), Publicar, Dashboard, Escuta
- **Regra de gratuidade dos conteúdos**: conteúdo publicado pelo cliente (ex.: "RH Claro", "Síndica") é sempre gratuito para os usuários; só o acervo SoftLiving pode ser premium (destravado com créditos). Card sem autor cadastrado conta como conteúdo do cliente — ver `normalizeCard()`
- Todo o conteúdo é fictício e o estado das interações (agendamentos, classificados) vive em memória — trocar de página ou recarregar reseta. A comunidade escolhida, o público e os 3 cards fixados passam de uma aba para outra (pelo endereço `?org=...&publico=...` e pela sessão do navegador)

## Estrutura de arquivos

Cada tela é um `.html` próprio. `index.html` só abre a `inicio.html`.

```
index.html                  → redireciona para inicio.html
inicio.html                 Tela Início (menu lateral)
conteudos.html              Conteúdos e Curadoria: 3 colunas de cards + boxes à direita
grupos.html                 Grupos: 3 colunas de grupos (Participar/Sair) + boxes à direita
conexoes.html               Em branco por enquanto
institucional/              Menu do topo: conhecer, como-funciona, beneficios, seguranca, patrocinadores
comunidades/                Minhas Comunidades, um arquivo por aba:
                            inicio, conteudos, servicos, grupos-internos, membros, publicar, dashboard, escuta
assets/css/estilos.css      Todos os estilos (seções comentadas por tela)
assets/js/comum.js          Ícones (ICON) e degradês de capa (sorteiaDegrade)
assets/js/layout.js         Faixa de protótipo, aviso, topo, menu lateral e rodapé — montados em todas as páginas
assets/js/comunidades-dados.js  Objeto DATA com as 12 comunidades
assets/js/comunidades.js    Troca de comunidade/público e conteúdo de cada aba (funções render*)
assets/js/inicio.js, conteudos.js, grupos.js  Scripts de cada tela
```

- **Mudar o topo ou o menu lateral**: edite só `assets/js/layout.js` — vale para todas as páginas.
- **Nova página**: copie `conexoes.html`, troque o conteúdo e o `data-page` do `<body>`, e registre o endereço em `PAGE_URLS` (`layout.js`) se ela entrar no menu lateral. Páginas em subpastas usam `data-root="../"`.
- Funciona abrindo os arquivos direto no navegador (dois cliques), sem servidor.

## Levando para o produto real (Claude Code / Next.js)

Este protótipo é referência visual e de dados, não código para copiar direto — o produto real usa Next.js + Tailwind v4 + tokens do shadcn. Ao portar:
- Extraia o objeto `DATA` como ponto de partida para types/mocks (é a parte mais reaproveitável)
- Refaça o CSS mapeando para os tokens Tailwind/shadcn do projeto real, em vez de importar as variáveis CSS daqui
- Porte por partes (casca → navegação → cada aba) em vez de pedir a conversão inteira de uma vez
