// VERSÃO 2 · Leitura de um conteúdo ou coluna na íntegra (conteudo.html?t=<título>).
// Cabeçalho (assunto, título, resumo, autor e ações), foto de capa, texto completo (TEXTOS_COMPLETOS, de demonstração),
// convite para destravar nos conteúdos premium, quem escreveu, comentários e "Continue lendo".
// Regras da v2: sem tempo de leitura e sem data de publicação. Curtir e salvar ficam guardados no navegador
// (v2Curtidas e v2Salvos, os mesmos das Atividades). Destravar é só demonstração (nenhum crédito é descontado).
const LD_ICONES = {
  curtir:'<path d="M12 21c-4.5-2.6-8-6-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 11c0 4-3.5 7.4-8 10z"/>',
  compartilhar:'<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.5M8.2 13.2l7.6 4.5"/>',
  ouvir:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  cadeado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  enviar:'<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
};
const ldIcone = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${LD_ICONES[n]}</svg>`;
const ldLer = (k, p) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? p : v; } catch(e){ return p; } };
const ldGravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const escLd = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const comLogoLd = t => t.replace(/SoftLiving/g, LOGO);

// ===== Qual conteúdo =====
const LD_TODOS = [...CONTEUDOS, ...COLUNAS_EXTRAS.filter(x => !CONTEUDOS.some(c => c.t === x.t))];
const tituloPedido = new URLSearchParams(location.search).get('t');
const c = LD_TODOS.find(x => x.t === tituloPedido) || CONTEUDOS.find(x => x.destaque) || CONTEUDOS[0];
const col = COLUNISTAS.find(k => c.a.startsWith(k.nome));
document.title = `${c.t} · SoftLiving (Protótipo · versão 2)`;

const ASSUNTO_CURTO = { 'Saúde mental e qualidade de vida':'Bem-estar', 'Saúde e bem-estar físico':'Saúde', 'Estilo de vida e consumo':'Estilo e casa', 'Turismo e viagem':'Viagem', 'Tecnologia e serviços digitais':'Tecnologia' };
const assunto = c.cat ? (ASSUNTO_CURTO[c.cat] || c.cat) : (col ? col.aba : 'Conteúdo');
const resumo = c.e || (col ? `${col.coluna ? `Da coluna ${col.coluna}.` : ''} Uma leitura de ${col.nome} para a comunidade.` : '');
const premium = c.badge === 'premium';
let destravados = ldLer('v2Destravados', []);
const liberado = () => !premium || destravados.includes(c.t);

// Texto completo (demonstração); as colunas que não têm texto ganham um texto curto de exemplo
const paragrafos = TEXTOS_COMPLETOS[c.t] || [
  resumo,
  '## Uma conversa sem pressa',
  `Este é um texto de exemplo para mostrar como ${col ? `as colunas de ${col.nome}` : 'os conteúdos'} aparecem na leitura. O texto real entra aqui assim que for publicado.`,
  'A leitura foi pensada para ser confortável: letra grande, linhas curtas e nada disputando a sua atenção. Você pode aumentar a letra, ouvir o texto e guardar para ler depois.',
];

// Autor: colunista (cor e sigla) ou a redação
const autor = col
  ? { nome:col.nome, sigla:col.sigla, cor:col.cor, sub:col.coluna ? `Coluna ${comLogoLd(col.coluna)}` : col.categoria, bio:col.bio }
  : { nome:comLogoLd(c.a), sigla:'SL', cor:'#1F5519', sub:'Curadoria da redação', bio:`A redação da ${LOGO} seleciona e escreve conteúdos sobre saúde, casa, viagens, tecnologia e bem-estar, sempre com curadoria e sem anúncios.` };

// ===== Comentários (fictícios; os novos ficam só nesta página) =====
const COMENTADORES = [['Maria Helena Sobral', '#7a3b52'], ['Claudio Brito', '#3d6b8c'], ['Luciana Russi', '#2f8578'], ['Paulo Regis', '#8a5a0e']];
const FALAS = ['Que texto bonito. Li duas vezes e mandei para minha irmã.', 'Gostei muito da forma simples de explicar. Quero mais conteúdos assim.', 'Me identifiquei demais. Obrigada por escrever sobre isso com tanto cuidado.', 'Ótima leitura para começar o dia. Anotei as dicas.'];
const semente = [...c.t].reduce((s, ch) => s + ch.charCodeAt(0), 0);
const comentarios = [0, 1, 2].map(k => { const [n, cor] = COMENTADORES[(semente + k) % 4]; return { n, cor, txt:FALAS[(semente + k * 3) % 4], curt:(semente + k * 7) % 12 }; });

// Voltar: para a página de onde a pessoa veio (Início, Conteúdos, Colunas, Busca...); sem origem, Conteúdos ou Colunas
const voltarPara = (() => {
  const ROTULOS = { 'index.html':'Início', '':'Início', 'conteudos.html':'Conteúdos', 'colunas.html':'Colunas', 'busca.html':'Busca', 'curtidas.html':'Curtidas',
    'salvos.html':'Salvos', 'comentarios.html':'Comentários', 'acompanhar.html':'Acompanhar', 'notificacoes.html':'Notificações', 'conteudo.html':'Voltar' };
  try {
    const r = new URL(document.referrer);
    const arq = r.pathname.split('/').pop();
    if(r.origin === location.origin && arq in ROTULOS) return { href:r.href, rotulo:ROTULOS[arq] };
  } catch(e){}
  return col ? { href:urlPagina('colunas'), rotulo:'Colunas' } : { href:urlPagina('conteudos'), rotulo:'Conteúdos' };
})();

// ===== Montagem =====
const siglaDe = n => n.split(' ').filter(p => /^[A-ZÀ-Ú]/.test(p)).slice(0, 2).map(p => p[0]).join('');
const nivelLetra = () => +(ldLer('v2LeituraLetra', 0));
function corpoTexto(){
  const lista = liberado() ? paragrafos : paragrafos.slice(0, 3);
  return lista.map(p => p.startsWith('## ') ? `<h2>${comLogoLd(escLd(p.slice(3)))}</h2>` : `<p>${comLogoLd(escLd(p))}</p>`).join('');
}
function render(){
  const curtido = ldLer('v2Curtidas', []).includes(c.t), salvo = lerSalvos().includes(c.t);
  const relacionados = embaralhar(LD_TODOS.filter(x => x !== c && (c.cat ? x.cat === c.cat : x.a === c.a))).concat(embaralhar(LD_TODOS.filter(x => x !== c))).filter((x, i, a) => a.indexOf(x) === i).slice(0, 3);
  document.getElementById('ldPagina').innerHTML = `
    <a href="${voltarPara.href}" class="es-voltar ld-voltar">${icone('voltar')}${voltarPara.rotulo}</a>
    <header class="ld-topo">
      <div class="ld-selos"><span class="ld-assunto">${escLd(assunto)}</span>${premium ? `<span class="ld-premium">${ldIcone('cadeado')}${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</span>` : '<span class="ld-gratis">Grátis</span>'}</div>
      <h1>${comLogoLd(escLd(c.t))}</h1>
      ${resumo ? `<p class="ld-resumo">${comLogoLd(escLd(resumo))}</p>` : ''}
      <div class="ld-autor-linha">
        <span class="av-col ld-av" style="background:${autor.cor}" aria-hidden="true">${autor.sigla}</span>
        <span class="ld-autor-txt">${col ? `<a href="${urlColunista(col.nome)}"><b>${autor.nome}</b></a>` : `<b>${autor.nome}</b>`}<small>${autor.sub}</small></span>
      </div>
    </header>
    <div class="ld-capa" style="background-image:url('${fotoUrl(c.foto, 1600)}')" role="img" aria-label="Foto do conteúdo"></div>
    <div class="ld-corpo">
      <aside class="ld-acoes" aria-label="Ações do conteúdo">
        <button type="button" class="ld-acao ${curtido ? 'on' : ''}" data-curtir title="Curtir">${ldIcone('curtir')}<span>Curtir</span></button>
        <button type="button" class="ld-acao ${salvo ? 'on' : ''}" data-salvar title="Salvar para ler depois">${icone('salvar')}<span>Salvar</span></button>
        <button type="button" class="ld-acao" data-compartilhar title="Compartilhar">${ldIcone('compartilhar')}<span>Compartilhar</span></button>
        <button type="button" class="ld-acao" data-ouvir title="Ouvir o texto">${ldIcone('ouvir')}<span>Ouvir</span></button>
        <span class="ld-letra" role="group" aria-label="Tamanho da letra"><button type="button" data-letra="-1" aria-label="Diminuir a letra">A−</button><button type="button" data-letra="1" aria-label="Aumentar a letra">A+</button></span>
      </aside>
      <div class="ld-texto" style="--ld-escala:${[1, 1.1, 1.22][nivelLetra()]}">
        <p class="ld-demo">Texto de demonstração do protótipo.</p>
        ${corpoTexto()}
        ${liberado() ? '' : `
          <div class="ld-trava">
            <span class="ld-trava-ic">${ldIcone('cadeado')}</span>
            <h2>Continue lendo com ${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</h2>
            <p>Este conteúdo é de um especialista escolhido pela nossa curadoria. Seus créditos valorizam quem escreve, sem anúncios interrompendo a leitura.</p>
            <button type="button" class="btn lg" data-destravar>Destravar por ${c.credits} ${c.credits === 1 ? 'crédito' : 'créditos'}</button>
            <a href="${urlPagina('carteira')}" class="ld-trava-link">Ver minha carteira</a>
          </div>`}
      </div>
    </div>
    ${liberado() ? `
    <section class="ld-quem">
      <span class="av-col ld-av grande" style="background:${autor.cor}" aria-hidden="true">${autor.sigla}</span>
      <div>
        <span class="ld-rotulo">Quem escreveu</span>
        <h2>${autor.nome}</h2>
        <p class="ld-quem-sub">${autor.sub}</p>
        <p>${comLogoLd(autor.bio)}</p>
        ${col ? `<a href="${urlColunista(col.nome)}" class="btn ghost">Conhecer ${col.nome.split(' ')[0]} e as colunas</a>` : ''}
      </div>
    </section>
    <section class="ld-comentarios" id="ldComentarios">
      <h2>Comentários <small>${comentarios.length}</small></h2>
      <form class="ld-comentar" id="ldComentar">
        <span class="av-col ld-av" style="background:#013565" aria-hidden="true">RB</span>
        <textarea name="txt" rows="2" placeholder="O que você achou deste conteúdo?" aria-label="Seu comentário" required></textarea>
        <button type="submit" class="ld-enviar" aria-label="Publicar comentário">${ldIcone('enviar')}</button>
      </form>
      ${comentarios.map((m, i) => `
        <div class="ld-comentario">
          <span class="av-col ld-av" style="background:${m.cor}" aria-hidden="true">${siglaDe(m.n)}</span>
          <div><b>${m.n}${m.eu ? ' <small>(você)</small>' : ''}</b><p>${m.txt}</p>
            <button type="button" class="ld-curtir-com ${m.curti ? 'on' : ''}" data-curtir-com="${i}">${ldIcone('curtir')}${m.curt + (m.curti ? 1 : 0) || ''}</button></div>
        </div>`).join('')}
    </section>` : ''}
    <section class="ld-mais">
      <h2>Continue lendo</h2>
      <div class="ld-mais-grade">${relacionados.map(r => `
        <a href="${urlConteudo(r.t)}" class="vcard">
          <img src="${fotoUrl(r.foto, 600)}" alt="" loading="lazy"><span class="vc-blur"></span>
          <div class="vc-info">
            <span class="vc-cat">${r.cat ? (ASSUNTO_CURTO[r.cat] || r.cat) : (COLUNISTAS.find(k => r.a.startsWith(k.nome)) || {}).aba || ''}</span>
            <h3>${comLogoLd(r.t)}</h3>
            <div class="vc-row">${r.badge === 'premium' ? `<span class="vc-chip premium">${r.credits} ${r.credits === 1 ? 'crédito' : 'créditos'}</span>` : '<span class="vc-chip">Grátis</span>'}<span class="vc-btn">Ler ${icone('seta')}</span></div>
          </div>
        </a>`).join('')}
      </div>
    </section>`;
}
render();
// Links que apontam para uma parte da página (ex.: #ldComentarios, vindo de Atividades): a página é montada depois
// de carregar, então rola até lá quando fica pronta
if(location.hash) addEventListener('load', () => { const alvo = document.querySelector(location.hash); if(alvo) alvo.scrollIntoView({ block:'start' }); });

// ===== Interações =====
const pagina = document.getElementById('ldPagina');
function pararLeitura(){ if('speechSynthesis' in window) speechSynthesis.cancel(); }
pagina.addEventListener('click', ev => {
  const b = ev.target.closest('button'); if(!b) return;
  const d = b.dataset;
  if(d.curtir !== undefined){
    const l = ldLer('v2Curtidas', []), on = !l.includes(c.t);
    ldGravar('v2Curtidas', on ? [...l, c.t] : l.filter(x => x !== c.t));
    mostrarAviso(on ? 'Você curtiu este conteúdo' : 'Curtida removida');
  } else if(d.salvar !== undefined){
    const l = lerSalvos(), on = !l.includes(c.t);
    gravarSalvos(on ? [...l, c.t] : l.filter(x => x !== c.t));
    mostrarAviso(on ? 'Salvo para ler depois' : 'Removido dos salvos');
  } else if(d.compartilhar !== undefined){
    if(navigator.clipboard) navigator.clipboard.writeText(location.href).catch(() => {});
    mostrarAviso('Link copiado. É só colar na conversa');
    return;
  } else if(d.ouvir !== undefined){
    if(!('speechSynthesis' in window)){ mostrarAviso('Seu navegador não consegue ler o texto em voz alta'); return; }
    if(speechSynthesis.speaking){ pararLeitura(); b.querySelector('span').textContent = 'Ouvir'; b.classList.remove('ouvindo'); return; }
    const fala = new SpeechSynthesisUtterance([c.t, resumo, ...(liberado() ? paragrafos : paragrafos.slice(0, 3))].map(p => p.replace(/^## /, '')).join('. '));
    fala.lang = 'pt-BR'; fala.rate = .95;
    fala.onend = () => { const o = pagina.querySelector('[data-ouvir]'); if(o){ o.querySelector('span').textContent = 'Ouvir'; o.classList.remove('ouvindo'); } };
    speechSynthesis.speak(fala); b.querySelector('span').textContent = 'Parar'; b.classList.add('ouvindo');
    return;
  } else if(d.letra){
    ldGravar('v2LeituraLetra', Math.min(2, Math.max(0, nivelLetra() + +d.letra)));
    pagina.querySelector('.ld-texto').style.setProperty('--ld-escala', [1, 1.1, 1.22][nivelLetra()]);
    return;
  } else if(d.destravar !== undefined){
    destravados = [...destravados, c.t]; ldGravar('v2Destravados', destravados);
    mostrarAviso('Conteúdo destravado. No protótipo, nenhum crédito é descontado');
  } else if(d.curtirCom){
    const m = comentarios[+d.curtirCom]; m.curti = !m.curti;
  } else return;
  const y = scrollY; render(); scrollTo(0, y);
});
pagina.addEventListener('submit', ev => {
  ev.preventDefault();
  const t = ev.target.txt.value.trim(); if(!t) return;
  comentarios.unshift({ n:'Rafael Barros', cor:'#013565', txt:escLd(t), curt:0, eu:true });
  mostrarAviso('Comentário publicado');
  const y = scrollY; render(); scrollTo(0, y);
});
addEventListener('pagehide', pararLeitura);
