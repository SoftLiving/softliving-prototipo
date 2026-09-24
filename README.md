# SoftLiving — Protótipo "Minhas Comunidades"

Protótipo de front-end em HTML/CSS/JS puro (sem build, sem dependências além de fontes do Google Fonts) para a página de comunidades licenciadas do SoftLiving. Feito para validar layout, navegação e conteúdo antes da implementação real em Next.js + Tailwind v4.

Abra `index.html` direto no navegador. Não precisa de servidor nem instalação.

## O que tem aqui

- **Switcher de 3 comunidades fixas**, cada uma com um dropdown para trocar por qualquer uma das 12 comunidades fictícias cadastradas (favoritagem por troca)
- **12 comunidades fictícias**: Claro (empresa), American Flat (condomínio), Clube Caiçaras (clube), Hotel Vista Mar, Restaurante Sabor & Arte, Faculdade Horizonte, Academia PowerFit, Escola de Música Allegro, Bella Viagens, Clínica SorrisoTotal, Zen Wellness Spa, Pet Shop Amigo Fiel, e Rede Dor (com toggle Paciente/Colaborador — dois públicos diferentes dentro do mesmo cliente)
- **Abas**: Início, Conteúdos (curadoria em mosaico com destaques, listas e cards), Serviços (só no American Flat — agendamentos, classificados, cardápios, indicação de profissionais), Grupos internos, Membros (diretório de perfis), Publicar, Dashboard, Escuta
- Todo o conteúdo é fictício e todo o estado (agendamentos, classificados, favoritos) vive em memória — recarregar a página reseta tudo

## Estrutura do arquivo

Tudo está em `index.html`:
- `<style>` — variáveis de cor/espaçamento próprias (não usa Tailwind)
- Um objeto `DATA` em JavaScript com todos os dados fictícios de cada comunidade
- Funções `render*()` que geram o HTML de cada aba a partir de `DATA`

## Levando para o produto real (Claude Code / Next.js)

Este arquivo é referência visual e de dados, não código para copiar direto — o produto real usa Next.js + Tailwind v4 + tokens do shadcn. Ao portar:
- Extraia o objeto `DATA` como ponto de partida para types/mocks (é a parte mais reaproveitável)
- Refaça o CSS mapeando para os tokens Tailwind/shadcn do projeto real, em vez de importar as variáveis CSS daqui
- Porte por partes (casca → navegação → cada aba) em vez de pedir a conversão inteira de uma vez
