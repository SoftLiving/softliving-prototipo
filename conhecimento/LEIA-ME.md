# Base de conhecimento do assistente do Suporte

Esta pasta alimenta o chat "Assistente SoftLiving" da página Suporte (ajuda.html).
O assistente não é uma IA de verdade: ele procura o trecho destes arquivos mais parecido
com a pergunta da pessoa e responde com ele, mostrando de qual arquivo veio.

## Como escrever

- Cada arquivo é um tema. A primeira linha é o título do tema: `# Título`.
- Cada assunto começa com `## ` e vira uma resposta separada. Escreva o título do assunto
  como a pessoa perguntaria (ex.: `## Posso sacar meus créditos?`).
- Logo abaixo do título, a linha opcional `Palavras: ...` ajuda o assistente a achar o assunto
  quando a pessoa usa outras palavras (ex.: `Palavras: resgatar, dinheiro de volta, transferir`).
- O texto da resposta vem depois, em parágrafos curtos. Pode usar **negrito** e listas com `- `.
- Escreva para o público: frases simples, sem termos técnicos.

## Regras de texto da SoftLiving

- Valores sem espaço: R$50.
- Nunca informar tempo de leitura nem data de publicação de conteúdos.
- Não citar atendimento por WhatsApp. O contato é suporte@softliving.com.br.

## Arquivos que o assistente lê

A lista fica em `arquivos.txt`, um nome por linha. Arquivo novo só entra no assistente
depois de ser colocado nessa lista. Este LEIA-ME não entra.
