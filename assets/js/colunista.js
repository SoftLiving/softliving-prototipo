// VERSÃO 2 · Apresentação individual de um colunista (colunista.html?c=<nome-do-colunista>).
// Segue a estrutura da página do site (softliving.com.br/app/colunistas/<nome>): apresentação com a bio, número de
// colunas, compartilhar e acompanhar; a última coluna (sempre grátis) em destaque; o arquivo com as colunas anteriores
// e o valor para desbloquear (1ª coluna 8 créditos, demais 2 créditos cada, como no site); colunista anterior e próximo.
// Sem data de publicação (regra da v2). "Acompanhar" usa a mesma lista de Atividades › Acompanhar (v2Acompanhando).
const clLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const clGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const comLogoCl = t => String(t || '').replace(/SoftLiving/g, LOGO);
const CL_ICONES = {
  compartilhar:'<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.5M8.2 13.2l7.6 4.5"/>',
  seguir:'<path d="M12 5v14M5 12h14"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cadeado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};
const clIcone = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${CL_ICONES[n]}</svg>`;
const ASSUNTO_CL = { 'Saúde mental e qualidade de vida':'Bem-estar', 'Saúde e bem-estar físico':'Saúde', 'Estilo de vida e consumo':'Estilo e casa', 'Turismo e viagem':'Viagem', 'Tecnologia e serviços digitais':'Tecnologia' };

const pedido = new URLSearchParams(location.search).get('c') || '';
const ci = Math.max(0, COLUNISTAS.findIndex(k => slugNome(k.nome) === pedido));
const col = COLUNISTAS[ci];
document.title = `${col.nome} · Colunas · SoftLiving (Protótipo · versão 2)`;

// Colunas: a última (grátis) em destaque e as anteriores no arquivo
const colunas = colunasDe(col.nome);
const ultimaTitulo = col.nome === COLUNA_DO_DIA.colunista ? COLUNA_DO_DIA.ultima : colunas[0] && colunas[0].t;
const ultima = colunas.find(x => x.t === ultimaTitulo) || colunas[0];
const anteriores = colunas.filter(x => x !== ultima);
const anterior = COLUNISTAS[(ci - 1 + COLUNISTAS.length) % COLUNISTAS.length], proximo = COLUNISTAS[(ci + 1) % COLUNISTAS.length];
const ehEu = col.nome === 'Rafael Barros';
const rotuloColuna = x => x.cat ? (ASSUNTO_CL[x.cat] || x.cat) : col.aba;

function render(){
  const seguindo = clLer('v2Acompanhando', ['Sofia Martellini', 'Zé Roberto', 'Lucia Paes de Barros', 'Bernardo Leitão']).includes(col.nome);
  document.getElementById('clPagina').innerHTML = `
    <a href="${urlPagina('colunas')}" class="cl-voltar">${icone('voltar')}Colunas</a>
    <header class="cl-topo">
      <span class="av-col cl-av" style="background:${col.cor}" aria-hidden="true">${col.sigla}</span>
      <div class="cl-id">
        <span class="cl-rotulo">${col.coluna ? `Coluna ${comLogoCl(col.coluna)}` : 'Colunista'}</span>
        <h1>${col.nome}</h1>
        <p class="cl-tema">${col.categoria === 'SoftLiving' ? LOGO : col.categoria}</p>
        <p class="cl-bio">${comLogoCl(col.bio)}</p>
        <div class="cl-numeros"><b>${col.publicadas}</b> ${col.publicadas === 1 ? 'coluna publicada' : 'colunas publicadas'}</div>
        <div class="cl-acoes">
          ${ehEu ? '' : `<button type="button" class="btn ${seguindo ? 'ghost cl-seguindo' : ''}" data-seguir>${seguindo ? `${clIcone('check')}Acompanhando` : `${clIcone('seguir')}Acompanhar`}</button>`}
          <button type="button" class="btn ghost" data-compartilhar>${clIcone('compartilhar')}Compartilhar</button>
        </div>
      </div>
    </header>

    ${ultima ? `
    <section class="cl-sec">
      <h2 class="cl-titulo">Última coluna</h2>
      <a href="${urlConteudo(ultima.t)}" class="destaque-largo cl-ultima">
        <div class="dl-foto foto"><img src="${fotoUrl(ultima.foto, 1000)}" alt=""></div>
        <div class="dl-texto">
          <span class="kicker">Grátis</span>
          <span class="cat">${rotuloColuna(ultima)}</span>
          <h2>${comLogoCl(ultima.t)}</h2>
          ${ultima.e ? `<p>${comLogoCl(ultima.e)}</p>` : ''}
          <span class="btn">Ler agora ${icone('seta')}</span>
        </div>
      </a>
    </section>` : ''}

    ${anteriores.length ? `
    <section class="cl-sec">
      <div class="cl-arquivo-topo">
        <div><h2 class="cl-titulo">Outras colunas</h2><p class="cl-sub">${anteriores.length} ${anteriores.length === 1 ? 'coluna anterior' : 'colunas anteriores'} de ${col.publicadas} ${col.publicadas === 1 ? 'publicada' : 'publicadas'}</p></div>
        <div class="cl-desbloqueie">${clIcone('cadeado')}<div><b>Desbloqueie as outras colunas</b><span>1ª coluna: 8 créditos · demais: 2 créditos cada</span></div></div>
      </div>
      <div class="cl-grade">${anteriores.map(x => `
        <a href="${urlConteudo(x.t)}" class="vcard">
          <img src="${fotoUrl(x.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
          <div class="vc-info">
            <span class="vc-cat">${rotuloColuna(x)}</span>
            <h3>${comLogoCl(x.t)}</h3>
            <div class="vc-row">${x.badge === 'premium' ? `<span class="vc-chip premium">${x.credits} ${x.credits === 1 ? 'crédito' : 'créditos'}</span>` : '<span class="vc-chip">Grátis</span>'}</div>
          </div>
        </a>`).join('')}
      </div>
    </section>` : ''}

    <nav class="cl-navega" aria-label="Outros colunistas">
      <a href="${urlColunista(anterior.nome)}" class="cl-nav ant"><small>${icone('voltar')}Anterior</small><span class="av-col cl-av-mini" style="background:${anterior.cor}" aria-hidden="true">${anterior.sigla}</span><b>${anterior.nome}</b></a>
      <a href="${urlColunista(proximo.nome)}" class="cl-nav prox"><small>Próximo${icone('seta')}</small><span class="av-col cl-av-mini" style="background:${proximo.cor}" aria-hidden="true">${proximo.sigla}</span><b>${proximo.nome}</b></a>
    </nav>`;
}
render();

document.getElementById('clPagina').addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  if(b.dataset.seguir !== undefined){
    const l = clLer('v2Acompanhando', ['Sofia Martellini', 'Zé Roberto', 'Lucia Paes de Barros', 'Bernardo Leitão']), on = !l.includes(col.nome);
    clGravar('v2Acompanhando', on ? [...l, col.nome] : l.filter(n => n !== col.nome));
    mostrarAviso(on ? `Você agora acompanha ${col.nome}. Avisamos quando sair coluna nova` : `Você deixou de acompanhar ${col.nome}`);
    render();
  } else if(b.dataset.compartilhar !== undefined){
    abrirCompartilhar({ titulo:`${col.nome}${col.coluna ? ' · ' + col.coluna : ''}`, texto:'Conheça as colunas de', url:location.href });
  }
});
