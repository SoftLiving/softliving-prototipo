// Regras de texto do portal, em todas as páginas (inclusive o Modo simples). Valem para tudo o que aparece na tela,
// também o que as páginas montam depois (um observador refaz o ajuste quando a página muda).
// 1) Nunca quebrar palavra no fim da linha: palavras com hífen (bem-estar, tornando-se) usam o hífen que não quebra
//    (U+2011), para não ficar "bem-" numa linha e "estar" na outra. (Sem hífen automático: ver hyphens no estilos.css.)
// 2) Em parágrafo (<p>) com pausa de dois-pontos seguida de texto, a continuação vai para a linha de baixo.
//    Só em parágrafos de verdade (a partir de 80 caracteres): títulos curtos e rótulos como "Público: ..." ficam como estão.
// Campos de texto e códigos ficam de fora.
(() => {
  const HIFEN_PALAVRA = /([A-Za-zÀ-ÿ0-9])-(?=[A-Za-zÀ-ÿ0-9])/g;
  const PAUSA = /:[ \u00a0]+(?=\S)/;
  const PARAGRAFO_MIN = 80;
  function ajustarTextos(raiz = document.body){
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, { acceptNode: n =>
      /[-:]/.test(n.nodeValue) && !n.parentElement.closest('script, style, textarea, input, select, code, pre, [contenteditable]') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    const nos = [];
    for(let n; (n = w.nextNode());) nos.push(n);
    nos.forEach(n => {
      const v = n.nodeValue.replace(HIFEN_PALAVRA, '$1\u2011');
      if(v !== n.nodeValue) n.nodeValue = v;
      const p = n.parentElement.closest('p');
      if(!p || p.textContent.trim().length < PARAGRAFO_MIN) return;
      let atual = n, m;
      while((m = PAUSA.exec(atual.nodeValue))){
        const resto = atual.splitText(m.index + 1);      // atual termina no ":"; resto começa nos espaços
        resto.nodeValue = resto.nodeValue.replace(/^[ \u00a0]+/, '');
        resto.before(document.createElement('br'));
        atual = resto;
      }
    });
  }
  let pendente = false;
  const agendar = () => { if(pendente) return; pendente = true; requestAnimationFrame(() => { pendente = false; ajustarTextos(); }); };
  window.ajustarTextos = ajustarTextos;
  const iniciar = () => { ajustarTextos(); new MutationObserver(agendar).observe(document.body, { childList:true, subtree:true }); };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
