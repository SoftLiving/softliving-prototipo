// VERSÃO 2 · Tela Acessibilidade: tamanho da letra (3 níveis), alto contraste e navegação simplificada.
// As escolhas ficam guardadas no navegador (v2Acessibilidade) e valem para o site todo: quem aplica é
// aplicarAcessibilidade(), no layout.js.
const AC_LETRAS = ['Padrão', 'Grande', 'Extra grande'];
function renderAcessibilidade(){
  const a = lerAcessibilidade();
  document.getElementById('ac').innerHTML = `
    <div class="ac-bloco">
      <h2>Tamanho da letra</h2>
      <p>Escolha o tamanho que facilita a sua leitura.</p>
      <div class="ac-letras" role="radiogroup" aria-label="Tamanho da letra">${AC_LETRAS.map((l, i) => `
        <button type="button" role="radio" aria-checked="${a.letra === i}" class="ac-letra${a.letra === i ? ' on' : ''}" data-letra="${i}"><b style="font-size:${[20, 25, 31][i]}px">Aa</b><span>${l}</span></button>`).join('')}</div>
    </div>
    <div class="pf-conta ac-opcoes">
      <div class="pf-linha"><span><b>Alto contraste</b><small>Textos e linhas mais escuros, para enxergar melhor</small></span>
        <button type="button" role="switch" aria-checked="${a.contraste}" class="ac-chave${a.contraste ? ' on' : ''}" data-chave="contraste" aria-label="Alto contraste"><i></i></button></div>
      <div class="pf-linha"><span><b>Navegação simplificada</b><small>Menos opções na tela: abre o Modo simples</small></span>
        <button type="button" role="switch" aria-checked="${a.simples}" class="ac-chave${a.simples ? ' on' : ''}" data-chave="simples" aria-label="Navegação simplificada"><i></i></button></div>
    </div>
    <button type="button" class="btn ghost" id="acRestaurar">Restaurar o padrão</button>`;
}
document.getElementById('ac').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  const a = lerAcessibilidade();
  if(b.dataset.letra){ a.letra = +b.dataset.letra; mostrarAviso(`Letra: ${AC_LETRAS[a.letra].toLowerCase()}`); }
  else if(b.dataset.chave){ a[b.dataset.chave] = !a[b.dataset.chave]; }
  else if(b.id === 'acRestaurar'){ a.letra = 0; a.contraste = false; a.simples = false; mostrarAviso('Acessibilidade de volta ao padrão'); }
  gravarAcessibilidade(a);
  renderAcessibilidade();
  // Navegação simplificada: no protótipo, ligar leva ao Modo simples (ver a decisão em aberto sobre isso)
  if(b.dataset.chave === 'simples' && a.simples) setTimeout(() => { location.href = urlPagina('simples'); }, 500);
});
renderAcessibilidade();
