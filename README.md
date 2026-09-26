# SoftLiving — Protótipo "Minhas Comunidades"

Protótipo de front-end em HTML/CSS/JS puro (sem build, sem dependências além de fontes do Google Fonts) para a página de comunidades licenciadas do SoftLiving. Feito para validar layout, navegação e conteúdo antes da implementação real em Next.js + Tailwind v4.

Abra `index.html` (ou qualquer página) direto no navegador. Não precisa de servidor nem instalação.

> **Versão 2 em construção:** a pasta `v2/` tem o novo layout com cara de portal de notícias, refeito página por página
> (ver `v2/README.md`). Esta pasta raiz é a **versão 1** e fica intacta até a v2 ser aprovada.

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
grupo.html?g=<n>            Página interna de um grupo (mesma estrutura para todos): cabeçalho, Tópicos/rodadas, Mural,
                            Painel da moderação e Quem participa
conexoes.html               Em branco por enquanto
simples.html                Modo simples (para quem tem pouca familiaridade com tecnologia): 6 opções grandes, uma tarefa por tela,
                            letra ajustável (A−/A+). Botão "Modo simples" no topo do modo completo; index.html lembra o modo escolhido
institucional/              Menu do topo: conhecer, como-funciona, beneficios, seguranca, patrocinadores
comunidades/                Minhas Comunidades, um arquivo por aba:
                            inicio, conteudos, servicos, grupos-internos, membros, publicar, dashboard, escuta
assets/css/estilos.css      Todos os estilos (seções comentadas por tela)
assets/js/comum.js          Ícones (ICON) e degradês de capa (sorteiaDegrade)
assets/js/layout.js         Faixa de protótipo, aviso, topo, menu lateral e rodapé — montados em todas as páginas
assets/js/comunidades-dados.js  Objeto DATA com as 12 comunidades
assets/js/comunidades.js    Troca de comunidade/público e conteúdo de cada aba (funções render*)
assets/js/escuta-dados.js   Perguntas da pesquisa de escuta (tipo: texto, escolha, varias, nota)
assets/js/escuta.js         Box "Sua opinião vale créditos" (montarEscuta): rodadas de 3 a 5 perguntas, +1 crédito cada; bônus somado em sessionStorage "bonusCreditos"
assets/js/comunidades-escuta.js  Pesquisas de cada comunidade (20 perguntas por cliente; Claro e Rede Dor por público), no box da coluna direita das abas. Sem créditos (inclusive colaboradores, por enquanto)
assets/js/conteudos-dados.js  Lista CONTEUDOS (usada por conteudos.html e simples.html)
assets/js/conteudos-textos.js  Textos completos (fictícios) dos conteúdos, para a leitura no Modo simples
assets/js/simples.js        Telas do Modo simples (endereços #conteudos, #grupo/1, #conversa/0...)
assets/js/desapego-dados.js  Anúncios dos grupos de desapego (venda, doação, troca), por nome do grupo
assets/js/grupos-dados.js   Lista GRUPOS (usada por grupos.html e grupo.html) e Participar/Sair da sessão
assets/js/inicio.js, conteudos.js, grupos.js, grupo.js  Scripts de cada tela
```

- **Logo em texto**: a palavra SoftLiving no conteúdo usa `<span class="sig"><span class="soft">Soft</span><span class="living">Living</span></span>` (Times New Roman negrito; Soft itálico azul #013565, Living verde #1F5519). Sobre fundos que confundem essas cores o logo fica branco automaticamente (`ajustarLogosEmTexto()` em `layout.js`).
- **Valores em reais**: sempre sem espaço entre o símbolo e o número: `R$50`, `R$189,90` (nunca `R$ 50`).
- **Mudar o topo ou o menu lateral**: edite só `assets/js/layout.js` — vale para todas as páginas.
- **Nova página**: copie `conexoes.html`, troque o conteúdo e o `data-page` do `<body>`, e registre o endereço em `PAGE_URLS` (`layout.js`) se ela entrar no menu lateral. Páginas em subpastas usam `data-root="../"`.
- Funciona abrindo os arquivos direto no navegador (dois cliques), sem servidor.

## Levando para o produto real (Claude Code / Next.js)

Este protótipo é referência visual e de dados, não código para copiar direto — o produto real usa Next.js + Tailwind v4 + tokens do shadcn. Ao portar:
- Extraia o objeto `DATA` como ponto de partida para types/mocks (é a parte mais reaproveitável)
- Refaça o CSS mapeando para os tokens Tailwind/shadcn do projeto real, em vez de importar as variáveis CSS daqui
- Porte por partes (casca → navegação → cada aba) em vez de pedir a conversão inteira de uma vez
