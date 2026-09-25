// Minhas Comunidades: troca de comunidade, público (ex.: Paciente/Colaborador) e conteúdo de cada aba.
// Cada aba é uma página própria (comunidades/<arquivo>.html); a aba atual vem de <body data-tab="...">.
let currentOrg = 'empresa';
let currentTab = 'inicio';
let pinnedSlots = ['empresa', 'condominio', 'clube'];
let openDropdownSlot = null;
// Comunidades que aparecem no topo da lista "Trocar por"
const DROPDOWN_FIRST = ['redador'];
// Comunidades com mais de um público (ex.: Paciente/Colaborador) abrem no primeiro da lista
function defaultAudience(orgKey){
  const a = DATA[orgKey].audiences;
  return a ? Object.keys(a)[0] : null;
}
let currentAudience = defaultAudience(currentOrg);

function renderOrgSwitcher(){
  const el = document.getElementById('orgSwitcher');
  el.innerHTML = pinnedSlots.map((key, i) => {
    const org = DATA[key];
    const active = key === currentOrg ? 'active-navy' : '';
    const otherOrgs = Object.keys(DATA).filter(k => !pinnedSlots.includes(k))
      .sort((a, b) => (DROPDOWN_FIRST.includes(b) ? 1 : 0) - (DROPDOWN_FIRST.includes(a) ? 1 : 0));
    return `
      <div class="org-card-wrap ${active}">
        <button class="org-card" data-org="${key}">
          <span class="icon-wrap">${ICON[org.orgIcon]}</span>
          <span class="org-card-text">
            <span class="name">${org.name}</span>
            <span class="type">${org.orgType}</span>
          </span>
        </button>
        <button class="org-card-chevron" data-slot="${i}" title="Trocar comunidade deste box">${ICON.chevron}</button>
        ${openDropdownSlot === i ? `
          <div class="org-dropdown">
            <p class="org-dropdown-label">Trocar por</p>
            ${otherOrgs.map(k => `<button class="org-dropdown-item" data-slot="${i}" data-neworg="${k}">${ICON[DATA[k].orgIcon]}<span>${DATA[k].name}<small>${DATA[k].orgType}</small></span></button>`).join('')}
          </div>` : ''}
      </div>`;
  }).join('');

  el.querySelectorAll('.org-card').forEach(btn => btn.addEventListener('click', () => { currentOrg = btn.dataset.org; openDropdownSlot = null; servicosView = { mode:'root', amenityKey:null }; currentAudience = defaultAudience(currentOrg); renderAll(); }));
  el.querySelectorAll('.org-card-chevron').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const i = +btn.dataset.slot;
    openDropdownSlot = (openDropdownSlot === i) ? null : i;
    renderOrgSwitcher();
  }));
  el.querySelectorAll('.org-dropdown-item').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const i = +btn.dataset.slot;
    const newOrg = btn.dataset.neworg;
    pinnedSlots[i] = newOrg;
    currentOrg = newOrg;
    openDropdownSlot = null;
    servicosView = { mode:'root', amenityKey:null };
    currentAudience = defaultAudience(currentOrg);
    renderAll();
  }));
}

function renderHeaderInfo(){
  const org = DATA[currentOrg];
  document.getElementById('orgTitle').textContent = org.name;
  const active = org.audiences ? org.audiences[currentAudience] : org;
  document.getElementById('orgSubtitle').textContent = active.subtitle || org.subtitle;

  const wrap = document.getElementById('audienceToggleWrap');
  if(org.audiences){
    wrap.innerHTML = `
      <div class="audience-toggle">
        <span class="audience-toggle-label">Visualizando como</span>
        <div class="audience-toggle-pills">
          ${Object.keys(org.audiences).map(key => `
            <button class="audience-pill ${key===currentAudience?'active-navy':''}" data-audience="${key}">${org.audiences[key].audienceLabel}</button>`).join('')}
        </div>
      </div>`;
    wrap.querySelectorAll('.audience-pill').forEach(btn => btn.addEventListener('click', () => {
      currentAudience = btn.dataset.audience;
      servicosView = { mode:'root', amenityKey:null };
      renderAll();
    }));
  } else {
    wrap.innerHTML = '';
  }
}

// Arquivo de cada aba (a chave é o nome usado em RENDERERS)
const TAB_FILES = {"inicio":"inicio","conteudos":"conteudos","servicos":"servicos","celulas":"grupos-internos","usuarios":"membros","publicar":"publicar","dashboard":"dashboard","escuta":"escuta"};
function renderTabBar(){
  const q = '?org=' + currentOrg + (currentAudience ? '&publico=' + currentAudience : '');
  document.querySelectorAll('#tabBar .tab-item').forEach(a => {
    a.classList.toggle('active-navy', a.dataset.tab === currentTab);
    a.href = TAB_FILES[a.dataset.tab] + '.html' + q;
  });
  salvarEstadoComunidades();
}

function getDateTimeLabel(){
  const d = new Date();
  let datePart = d.toLocaleDateString('pt-BR', { weekday:'long', day:'2-digit', month:'long' });
  datePart = datePart.charAt(0).toUpperCase() + datePart.slice(1);
  const timePart = d.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });
  return `${datePart} · ${timePart}`;
}

function renderInicio(org){
  const heroBlock = org.personalized ? `
    <div class="hero-win span2">
      <p class="lead" style="margin-bottom:18px;">Bem-vindo, ${org.greetingName}</p>
      <div class="mini-stats" style="grid-template-columns:repeat(3,1fr);">
        ${org.summary.map(s => `<div class="box"><p class="lbl">${s.lbl}</p><p class="num" style="font-size:17px;">${s.num}</p></div>`).join('')}
      </div>
    </div>` : `
    <div class="hero-win span2">
      <p class="lead">Bem-vindo, aqui está o resumo de ${org.name}</p>
      <p class="headline">${org.tagline}</p>
      <div class="mini-stats">
        ${org.heroStats.map(s => `<div class="box"><p class="lbl">${s.lbl}</p><p class="num">${s.num}</p></div>`).join('')}
      </div>
    </div>`;

  return `
  <div class="grid">
    ${heroBlock}

    <div class="win notice-win span2">
      <p class="win-title"><span class="title-icon ti-terracotta">${ICON.warning}</span> ${org.notice.title}</p>
      <p class="body">${org.notice.body}</p>
    </div>

    ${org.roadmap ? `
    <div class="win roadmap-win span4">
      <p class="roadmap-eyebrow">ROADMAP ANUAL — ${org.name.toUpperCase()}</p>
      <div class="roadmap-strip">
        ${org.roadmap.map((s, i) => `
          <div class="roadmap-item">
            <p class="rm-month">${s.month}</p>
            <p class="rm-title">${s.title}</p>
            <div class="circle-line-wrap">
              ${i > 0 ? '<div class="rm-line"></div>' : ''}
              <div class="roadmap-circle">${s.icon}</div>
            </div>
          </div>`).join('')}
        <div class="roadmap-arrow">${ICON.chevron}</div>
      </div>
    </div>` : ''}
  </div>

  <div class="grid6">
    <div class="win accent-navy c2">
      <p class="win-title"><span class="title-icon ti-navy">${ICON.calendar}</span> Seus próximos eventos <span class="tag">${org.events.length}</span></p>
      <div class="events-scroll">
        ${org.events.map(e => `
          <div class="event-row">
            <div class="event-date"><p class="day">${e.day}</p><p class="month">${e.month}</p></div>
            <div class="event-info">
              <p class="t">${e.t}</p>
              <p class="time">${e.time} · ${e.place}</p>
              <p class="rsvp">+ Confirmar presença</p>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="win accent-green c2">
      <p class="win-title"><span class="title-icon ti-green">${ICON.book}</span> Recomendado para você</p>
      ${org.recommended.map(r => `<div class="list-item"><p class="t">${r.t}</p><p class="m">${r.m}</p><p class="r">${r.r}</p></div>`).join('')}
    </div>

    <div class="win accent-terracotta c2 row-span2">
      <p class="win-title"><span class="title-icon ti-terracotta">${ICON.users}</span> Suas conexões</p>
      <div class="events-scroll" style="max-height:none;">
        ${org.connections.map(p => `
          <div class="conn-item">
            <div class="conn-avatar ca-${p.c}">${p.n.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
            <div class="conn-info"><p class="n">${p.n}</p><p class="r">${p.r}</p></div>
            <div class="conn-msg">${ICON.chat}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="win accent-amber c2">
      <p class="win-title"><span class="title-icon ti-amber">${ICON.gift}</span> ${org.extra.title} <span class="tag">${org.extra.tag}</span></p>
      <div class="events-scroll">
        ${org.extra.items.map(i => `<div class="list-item"><p class="t">${i.t}</p><p class="m">${i.m}</p></div>`).join('')}
      </div>
    </div>

    <div class="win accent-teal c2">
      <p class="win-title"><span class="title-icon ti-teal">${ICON.headphones}</span> Sua escuta ativa</p>
      <p class="list-item t" style="border:none;padding:0;margin:0 0 10px;font-weight:600;">${org.poll.title}</p>
      <div class="poll-grid">
        <div><p class="lbl">Elegíveis</p><p class="num">${org.poll.elegiveis}</p></div>
        <div><p class="lbl">Respostas</p><p class="num">${org.poll.respostas}</p></div>
        <div><p class="lbl">Participação</p><p class="num">${org.poll.participacao}</p></div>
        <div><p class="lbl">Status</p><p class="num">${org.poll.status}</p></div>
      </div>
    </div>
  </div>

  <div class="grid" style="margin-top:16px;">
    <div class="win span4">
      <p class="win-title"><span class="title-icon ti-terracotta">${ICON.bolt}</span> Seu acesso rápido</p>
      <div class="quicklinks">
        ${org.quicklinks.map(q => `<div class="qlink">${ICON[q.icon]}<span>${q.label}</span></div>`).join('')}
      </div>
    </div>
  </div>`;
}


// Regra de negócio: conteúdo publicado pelo cliente é sempre gratuito.
// Só o acervo SoftLiving pode ser premium (destravado com créditos).
// Card sem autor cadastrado = conteúdo do próprio cliente.
function normalizeCard(c, org){
  const author = c.a || org.name;
  if(author === 'SoftLiving') return {...c, a:author};
  return {...c, a:author, badge:'gratis', credits:undefined, cta:'Ler agora'};
}

function authorHTML(c){
  return `<p class="cc-author">${c.a === 'SoftLiving' ? 'Acervo SoftLiving' : 'Por ' + c.a}</p>`;
}

function badgeHTML(c){
  return `<span class="cc-badge ${c.badge}">${c.badge==='gratis'?ICON.unlock+' Grátis':c.badge==='destravado'?ICON.unlock+' Destravado':ICON.lock+' '+c.credits+' créditos'}</span>`;
}

function renderMosaic(cards){
  const feature = cards[0];
  const listItems = [cards[1], cards[2], cards[3], cards[11]];
  const rowA = cards.slice(4,7);
  const wide = cards[7];
  const rowB = cards.slice(8,11);

  const regularCard = c => `
    <div class="cc-card c2">
      <div class="cc-body">
        <div class="cc-cat-row"><p class="cc-cat-label">${c.cat}</p>${badgeHTML(c)}</div>
        <p class="cc-card-title">${c.t}</p>
        <p class="cc-excerpt">${c.e}</p>
        ${authorHTML(c)}
        <button class="cc-cta ${c.badge}">${c.cta}</button>
      </div>
    </div>`;

  return `
  <div class="cc-mosaic">
    <div class="cc-card cc-feature-lg c4">
      <div class="cc-body">
        <div class="cc-cat-row"><p class="cc-cat-label">${feature.cat}</p>${badgeHTML(feature)}</div>
        <p class="cc-card-title cc-feature-title">${feature.t}</p>
        <p class="cc-excerpt">${feature.e}</p>
        ${authorHTML(feature)}
        <button class="cc-cta ${feature.badge}">${feature.cta}</button>
      </div>
    </div>

    <div class="cc-list-card c2">
      <p class="cc-list-card-label">Também vale a pena</p>
      ${listItems.map(c => `
        <div class="cc-list-row">
          <div>
            <p class="cc-cat-label">${c.cat}</p>
            <p class="cc-list-title">${c.t}</p>
          </div>
          ${badgeHTML(c)}
        </div>`).join('')}
    </div>

    ${rowA.map(regularCard).join('')}

    <div class="cc-card cc-wide c6">
      <div class="cc-wide-icon">${ICON[wide.icon]}</div>
      <div class="cc-wide-body">
        <div class="cc-cat-row"><p class="cc-cat-label">${wide.cat}</p>${badgeHTML(wide)}</div>
        <p class="cc-card-title">${wide.t}</p>
        <p class="cc-excerpt">${wide.e}</p>
        ${authorHTML(wide)}
      </div>
      <button class="cc-cta ${wide.badge} cc-wide-cta">${wide.cta}</button>
    </div>

    ${rowB.map(regularCard).join('')}
  </div>`;
}

let servicosView = { mode: 'root', amenityKey: null };
let bookingsStore = {
  beleza: [
    {day:"Hoje", time:"09:00", service:"Corte", bookedBy:"Renata Ferraz · Bloco A", mine:false},
    {day:"Hoje", time:"11:00", service:"Manicure", bookedBy:"Sônia Ramos · Bloco B", mine:false},
    {day:"Hoje", time:"14:00", service:"Escova", bookedBy:"Juliana Prado · Bloco A", mine:false},
    {day:"Sexta", time:"10:00", service:"Manicure", bookedBy:"Você · Bloco A · apto 402", mine:true},
  ],
};

/* ===== Cowork — módulo de agendamento dedicado ===== */
const COWORK_RESIDENTS = ["Marcos Vieira · Bloco A","Sônia Ramos · Bloco B","Felipe Tavares · Bloco C","Juliana Prado · Bloco A","Ricardo Nunes · Bloco B","Cecília Duarte · Bloco C","Fábio Nogueira · Bloco A","Vera Lins · Bloco B","André Marques · Bloco C","Otávio Prado · Bloco B"];
const COWORK_HOURS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];
const COWORK_ROOMS = ["Sala de Reunião 1","Sala de Reunião 2"];

function buildCoworkCalendar(){
  const cal = [];
  const base = new Date(2026, 8, 1); // 1º de setembro de 2026 (âncora fictícia)
  for(let d = 1; d <= 30; d++){
    const dt = new Date(base); dt.setDate(d);
    const date = dt.toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'});
    const weekday = dt.toLocaleDateString('pt-BR', {weekday:'short'}).replace('.','');
    const bookings = [];
    const n1 = (d * 7) % COWORK_RESIDENTS.length;
    const n2 = (d * 3) % COWORK_RESIDENTS.length;
    const hi1 = d % (COWORK_HOURS.length - 2);
    const hi2 = (d + 4) % (COWORK_HOURS.length - 2);
    if(d <= 20){
      bookings.push({ start:COWORK_HOURS[hi1], end:COWORK_HOURS[hi1+1], room:COWORK_ROOMS[0], bookedBy: d % 5 === 0 ? "Você · Bloco A · apto 402" : COWORK_RESIDENTS[n1], mine: d % 5 === 0 });
      bookings.push({ start:COWORK_HOURS[hi2], end:COWORK_HOURS[hi2+1], room:COWORK_ROOMS[1], bookedBy: COWORK_RESIDENTS[n2], mine:false });
      if(d % 7 === 0){
        bookings.push({ start:COWORK_HOURS[(hi1+3)%COWORK_HOURS.length], end:COWORK_HOURS[(hi1+4)%COWORK_HOURS.length], room:COWORK_ROOMS[0], bookedBy:"Você · Bloco A · apto 402", mine:true });
      }
    } else {
      bookings.push({ start:COWORK_HOURS[hi1], end:COWORK_HOURS[hi1+1], room:COWORK_ROOMS[0], bookedBy:COWORK_RESIDENTS[n1], mine:false });
      if(d % 3 === 0){
        bookings.push({ start:COWORK_HOURS[hi2], end:COWORK_HOURS[hi2+1], room:COWORK_ROOMS[1], bookedBy:COWORK_RESIDENTS[n2], mine:false });
      }
    }
    cal.push({ dayNum:d, date, weekday, bookings });
  }
  return cal;
}

let coworkCalendar = buildCoworkCalendar();
let selectedCoworkDay = 21;

function changeCoworkDay(val){ selectedCoworkDay = parseInt(val, 10); renderContent(); }

function bookCowork(e){
  e.preventDefault();
  const f = e.target;
  const dayNum = parseInt(f.day.value, 10);
  const day = coworkCalendar.find(d => d.dayNum === dayNum);
  if(!day) return;
  day.bookings.push({ start:f.start.value, end:f.end.value, room:f.room.value, bookedBy:"Você · " + DATA.condominio.servicosData.meuApto, mine:true });
  selectedCoworkDay = dayNum;
  renderContent();
}

function cancelCoworkBooking(dayNum, idx){
  const day = coworkCalendar.find(d => d.dayNum === dayNum);
  if(!day) return;
  day.bookings.splice(idx, 1);
  renderContent();
}

function renderCoworkModule(){
  const day = coworkCalendar.find(d => d.dayNum === selectedCoworkDay);
  const myPast = [], myUpcoming = [];
  coworkCalendar.forEach(d => {
    d.bookings.forEach((b, idx) => {
      if(!b.mine) return;
      (d.dayNum <= 20 ? myPast : myUpcoming).push({...b, dayNum:d.dayNum, date:d.date, weekday:d.weekday, idx});
    });
  });
  const sortedDayBookings = day.bookings.slice().sort((a,b) => a.start.localeCompare(b.start));

  return `
    <div class="booking-block">
      <p class="win-title" style="margin-bottom:10px;">${ICON.calendar} Fazer uma reserva</p>
      <form class="booking-form-cw" onsubmit="bookCowork(event)">
        <div class="field"><label>Sala</label><select name="room">${COWORK_ROOMS.map(r=>`<option>${r}</option>`).join('')}</select></div>
        <div class="field"><label>Dia (próximos 30 dias)</label>
          <select name="day" onchange="changeCoworkDay(this.value)">
            ${coworkCalendar.map(d => `<option value="${d.dayNum}" ${d.dayNum===selectedCoworkDay?'selected':''}>${d.date} (${d.weekday})${d.dayNum<=20?' · passado':''}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>Horário inicial</label><select name="start">${COWORK_HOURS.map(h=>`<option>${h}</option>`).join('')}</select></div>
        <div class="field"><label>Horário final</label><select name="end">${COWORK_HOURS.map(h=>`<option>${h}</option>`).join('')}</select></div>
        <button type="submit" class="btn-primary">Reservar</button>
      </form>

      <p class="booked-label" style="margin-top:22px;">Ocupação do dia ${day.date} (${day.weekday}) — consulta prévia antes de agendar</p>
      ${sortedDayBookings.length ? sortedDayBookings.map(b => `
        <div class="booked-row"><span>${b.start}–${b.end} · ${b.room}</span><span>${b.mine ? 'Você · ' + DATA.condominio.servicosData.meuApto : b.bookedBy}</span></div>`).join('') : '<p class="svc-note">Nenhum horário reservado neste dia ainda — todas as vagas livres.</p>'}

      <p class="booked-label" style="margin-top:22px;">Extrato dos meus agendamentos — histórico do mês (até o dia 20)</p>
      ${myPast.length ? myPast.map(b => `<div class="booked-row"><span>${b.date} (${b.weekday}) · ${b.start}–${b.end} — ${b.room}</span><span style="color:var(--muted);">Concluído</span></div>`).join('') : '<p class="svc-note">Nenhum agendamento neste período.</p>'}
      <p class="svc-note" style="margin-top:8px;">Total no período: ${myPast.length} reserva${myPast.length===1?'':'s'}.</p>

      <p class="booked-label" style="margin-top:22px;">Meus próximos agendamentos (a partir do dia 20)</p>
      ${myUpcoming.length ? myUpcoming.map(b => `
        <div class="booked-row"><span>${b.date} (${b.weekday}) · ${b.start}–${b.end} — ${b.room}</span><button class="cancel-btn" onclick="cancelCoworkBooking(${b.dayNum}, ${b.idx})">Cancelar</button></div>`).join('') : '<p class="svc-note">Nenhum agendamento futuro ainda.</p>'}
    </div>`;
}

function openAmenity(key){ servicosView = { mode:'detail', amenityKey:key }; renderContent(); }
function closeAmenity(){ servicosView = { mode:'root', amenityKey:null }; renderContent(); }

function genericBook(key, e){
  e.preventDefault();
  const f = e.target;
  const day = f.day.value, time = f.time.value, service = f.service.value;
  bookingsStore[key] = bookingsStore[key] || [];
  bookingsStore[key].push({ day, time, service, bookedBy:"Você · " + DATA.condominio.servicosData.meuApto, mine:true });
  renderContent();
}

function cancelBooking(key, idx){
  bookingsStore[key].splice(idx, 1);
  renderContent();
}

function addMarketItem(e){
  e.preventDefault();
  const org = DATA[currentOrg];
  const f = e.target;
  const id = Date.now();
  org.servicosData.classificados.unshift({ id, title: f.title.value, price: f.price.value, desc: f.desc.value || 'Sem descrição.', owner: 'Você', mine: true });
  renderContent();
}

function removeMarketItem(id){
  const org = DATA[currentOrg];
  org.servicosData.classificados = org.servicosData.classificados.filter(m => m.id !== id);
  renderContent();
}

function catIcon(cat){
  const map = {
    "Venda de imóveis":"building",
    "Aluguel de vaga de garagem":"car",
    "Itens de casa":"store",
    "Bazar de roupas":"gift",
    "Eletrônicos":"robot",
    "Serviços profissionais":"briefcase",
  };
  return map[cat] || "store";
}

function marketItemCard(m, idx){
  const photoHTML = m.photo
    ? `<img src="${m.photo}" class="market-photo" alt="${m.title}">`
    : `<div class="market-photo market-photo-placeholder" style="background:${COVER_GRADIENTS[idx % COVER_GRADIENTS.length]};">${ICON[catIcon(m.cat)] || ICON.store}</div>`;
  return `
    <div class="market-item ${m.mine ? 'mine' : ''}">
      ${photoHTML}
      <div class="market-item-body">
        ${m.mine ? '<span class="market-mine-badge">Seu anúncio</span>' : ''}
        <p class="market-title">${m.title}</p>
        <p class="market-price">${m.price}</p>
        <p class="svc-note">${m.desc}</p>
        <p class="market-owner">${m.owner}</p>
        <p class="svc-note">${ICON.phone} ${m.phone}</p>
        <p class="svc-note">${m.unidade}</p>
        ${m.mine ? `<button class="btn-secondary" style="margin-top:10px; width:100%;" onclick="removeClassificadoFull(${m.id})">Remover anúncio</button>` : ''}
      </div>
    </div>`;
}

function addClassificadoFull(e){
  e.preventDefault();
  const org = DATA[currentOrg];
  const f = e.target;
  const maxId = Math.max(0, ...org.servicosData.classificadosFull.map(x => x.id || 0));
  const file = f.photo && f.photo.files && f.photo.files[0];
  const photo = file ? URL.createObjectURL(file) : null;
  org.servicosData.classificadosFull.unshift({
    id: maxId + 1, cat: f.cat.value, title: f.title.value, price: f.price.value,
    desc: f.desc.value || 'Sem descrição.', owner: 'Você', unidade: org.servicosData.meuApto, phone: f.phone.value, photo, mine: true
  });
  renderContent();
}

function removeClassificadoFull(id){
  const org = DATA[currentOrg];
  org.servicosData.classificadosFull = org.servicosData.classificadosFull.filter(x => x.id !== id);
  renderContent();
}

function myBookingsList(key){
  return (bookingsStore[key] || []).map((b, i) => ({...b, idx:i})).filter(b => b.mine);
}

function renderBookingWidget(a){
  const key = a.key;
  const mine = myBookingsList(key);
  return `
    <div class="booking-block">
      <p class="win-title" style="margin-bottom:10px;">${ICON.calendar} Fazer uma reserva</p>
      <form class="booking-form" onsubmit="genericBook('${key}', event)">
        <div class="field"><label>Serviço</label><select name="service">${a.booking.services.map(s=>`<option>${s}</option>`).join('')}</select></div>
        <div class="field"><label>Dia</label><select name="day">${a.booking.days.map(d=>`<option>${d}</option>`).join('')}</select></div>
        <div class="field"><label>Horário</label><select name="time">${a.booking.hours.map(h=>`<option>${h}</option>`).join('')}</select></div>
        <button type="submit" class="btn-primary">Reservar</button>
      </form>

      <p class="booked-label" style="margin-top:20px;">Seus agendamentos aqui</p>
      ${mine.length ? mine.map(b => `
        <div class="booked-row">
          <span>${b.day} · ${b.time} — ${b.service}</span>
          <button class="cancel-btn" onclick="cancelBooking('${key}', ${b.idx})">Cancelar</button>
        </div>`).join('') : '<p class="svc-note">Você ainda não tem reservas aqui.</p>'}

      <p class="booked-label" style="margin-top:20px;">Horários já agendados por outros moradores</p>
      ${(bookingsStore[key]||[]).filter(b=>!b.mine).length ? (bookingsStore[key]||[]).filter(b=>!b.mine).map(b => `
        <div class="booked-row"><span>${b.day} · ${b.time} — ${b.service}</span><span>${b.bookedBy}</span></div>`).join('') : '<p class="svc-note">Nenhum horário reservado ainda.</p>'}
    </div>`;
}

function detailHeader(a){
  return `
  <button class="detail-back" onclick="closeAmenity()">${ICON.chevron} Voltar para Serviços</button>
  <div class="detail-header">
    <span class="title-icon ti-navy" style="width:52px;height:52px;">${ICON[a.icon]}</span>
    <div>
      <h2 class="cc-title serif" style="margin-bottom:2px;">${a.name}</h2>
      <p class="svc-note" style="font-size:12px;">${a.note}</p>
    </div>
  </div>`;
}

function renderServicoDetail(org, s, key){
  const a = s.amenities.find(x => x.key === key);
  if(!a) return '';

  if(a.special === 'classificados'){
    const catOrder = ["Venda de imóveis","Aluguel de vaga de garagem","Itens de casa","Bazar de roupas","Eletrônicos","Serviços profissionais"];
    const cats = catOrder.filter(c => s.classificadosFull.some(x => x.cat === c));
    let photoIdx = 0;
    return `
    ${detailHeader(a)}
    <p class="cc-subtitle">Todos os ${s.classificadosFull.length} anúncios publicados por moradores do ${org.name}, por categoria.</p>

    <div class="classif-layout">
      <div class="classif-listing">
        ${cats.map(cat => `
          <h3 class="svc-section-title">${cat}</h3>
          <div class="market-grid">
            ${s.classificadosFull.filter(x => x.cat === cat).map(m => marketItemCard(m, photoIdx++)).join('')}
          </div>`).join('')}
      </div>

      <div class="classif-form-col">
        <div class="win market-form-card">
          <p class="win-title" style="margin-bottom:14px;">${ICON.plus} Anunciar um item</p>
          <form onsubmit="addClassificadoFull(event)">
            <div class="field"><label>Categoria</label>
              <select name="cat">${catOrder.map(c=>`<option>${c}</option>`).join('')}</select>
            </div>
            <div class="field"><label>Título</label><input type="text" name="title" placeholder="Ex.: Bicicleta infantil" required></div>
            <div class="field"><label>Preço</label><input type="text" name="price" placeholder="Ex.: R$150" required></div>
            <div class="field"><label>Telefone</label><input type="text" name="phone" placeholder="Ex.: (21) 99999-0000" required></div>
            <div class="field"><label>Foto</label><input type="file" name="photo" accept="image/*"></div>
            <div class="field"><label>Descrição</label><textarea name="desc" rows="2" placeholder="Conte um pouco sobre o item"></textarea></div>
            <button type="submit" class="btn-primary">Publicar anúncio</button>
          </form>
        </div>
      </div>
    </div>
    `;
  }

  if(a.special === 'entregas'){
    return `
    ${detailHeader(a)}
    <div class="win">
      <p class="win-title">${ICON.gift} Encomendas — ${s.meuApto}</p>
      ${s.entregas.map(e => `
        <div class="booked-row">
          <span>${e.date} · ${e.remetente} — ${e.desc}</span>
          <span style="font-weight:700;color:${e.status==='Retirado'?'#1f5c3d':'#8a5a12'};">${e.status}</span>
        </div>`).join('')}
    </div>
    `;
  }

  if(a.special === 'profissionais'){
    return `
    ${detailHeader(a)}
    <p class="cc-subtitle">Prestadores de serviço recomendados por moradores do ${org.name}.</p>
    <div class="grid">
      ${s.profissionais.map(p => `
        <div class="win span2 cell-card">
          <p class="cc-cat-label" style="margin-bottom:4px;">${p.category}</p>
          <p class="svc-name" style="font-size:14px;">${p.name}</p>
          <p class="svc-note">${p.phone}</p>
          <p class="desc" style="margin:8px 0;">${p.note}</p>
          <p class="svc-note">Indicado por ${p.recommendedBy}</p>
        </div>`).join('')}
    </div>
    `;
  }

  return `
  ${detailHeader(a)}

  <div class="grid">
    <div class="win span2">
      <p class="win-title">${ICON.document} Sobre este espaço</p>
      <p style="font-size:13px;color:#555f6b;line-height:1.6;margin:0;">${a.fullDesc}</p>
    </div>
    <div class="win span2">
      <p class="win-title">${ICON.phone} Contato</p>
      <p class="svc-name" style="font-size:14px;">${a.contactName}</p>
      <p class="svc-note">Ramal ${a.ramal}</p>
    </div>
  </div>

  ${a.key === 'cowork' ? `<div class="win" style="margin-top:16px;">${renderCoworkModule()}</div>` : a.bookable ? `<div class="win" style="margin-top:16px;">${renderBookingWidget(a)}</div>` : `
    <div class="win" style="margin-top:16px;">
      <p class="win-title">${ICON.question} Este espaço não exige reserva</p>
      <p class="svc-note">Basta comparecer dentro do horário de funcionamento informado acima.</p>
    </div>`}
  `;
}

function renderServicosRoot(org, s){
  let coworkPast = [], coworkUpcoming = [];
  coworkCalendar.forEach(d => {
    d.bookings.forEach(b => {
      if(!b.mine) return;
      (d.dayNum <= 20 ? coworkPast : coworkUpcoming).push({...b, date:d.date, weekday:d.weekday});
    });
  });
  const coworkHoras = coworkPast.reduce((sum,b) => sum + (parseInt(b.end,10) - parseInt(b.start,10)), 0);
  const belezaMine = myBookingsList('beleza');
  const classificadosPreview = s.classificadosFull.slice(0, 15);
  return `
  <h2 class="cc-title serif">Serviços do condomínio</h2>
  <p class="cc-subtitle">Sua unidade, seus agendamentos e o que acontece no ${org.name}.</p>

  <h3 class="svc-section-title">Amenidades — clique para ver detalhes e agendar</h3>
  <div class="svc-grid">
    ${[...s.amenities].sort((x,y) => x.name.localeCompare(y.name, 'pt')).map(a => `
      <button class="svc-card svc-card-btn" onclick="openAmenity('${a.key}')">
        <span class="title-icon ti-navy">${ICON[a.icon]}</span>
        <div><p class="svc-name">${a.name}</p><p class="svc-note">${a.note}</p></div>
      </button>`).join('')}
  </div>

  <h3 class="svc-section-title">Meus agendamentos</h3>
  <div class="grid">
    <div class="win accent-navy span2">
      <p class="win-title">${ICON.briefcase} Cowork</p>
      ${coworkUpcoming.length ? coworkUpcoming.map(b => `<div class="booked-row"><span>${b.date} (${b.weekday}) · ${b.start}–${b.end} — ${b.room}</span></div>`).join('') : '<p class="svc-note">Nenhuma reserva futura ativa.</p>'}
      <p class="svc-note" style="margin-top:10px;">Uso até o dia 20: ${coworkPast.length} reservas · ${coworkHoras}h de sala</p>
    </div>
    <div class="win accent-teal span2">
      <p class="win-title">${ICON.star} Salão de beleza</p>
      ${belezaMine.length ? belezaMine.map(b => `<div class="booked-row"><span>${b.day} · ${b.time} — ${b.service}</span></div>`).join('') : '<p class="svc-note">Nenhuma reserva ativa.</p>'}
    </div>
  </div>

  <div class="win accent-amber" style="margin-top:16px;">
    <p class="win-title">${ICON.clipboard} Sua arrumadeira</p>
    <p class="svc-name" style="font-size:14px;">${s.arrumadeiraMinha.nome}</p>
    <p class="svc-note">${s.arrumadeiraMinha.dia} · ${s.arrumadeiraMinha.horario}</p>
    <p class="svc-note" style="margin-top:8px;">${s.arrumadeiraMinha.obs}</p>
  </div>

  <div class="grid" style="margin-top:16px;">
    <div class="win accent-amber span2">
      <p class="win-title">${ICON.restaurant} Cardápio do bar</p>
      ${s.cardapioBar.map(c => `<p class="menu-cat">${c.cat}</p>${c.items.map(i => `<div class="menu-item"><span>${i.name}</span><span>${i.price}</span></div>`).join('')}`).join('')}
    </div>
    <div class="win accent-green span2">
      <p class="win-title">${ICON.restaurant} Cardápio do restaurante</p>
      ${s.cardapioRestaurante.map(c => `<p class="menu-cat">${c.cat}</p>${c.items.map(i => `<div class="menu-item"><span>${i.name}</span><span>${i.price}</span></div>`).join('')}`).join('')}
    </div>
  </div>

  <div class="win accent-terracotta" style="margin-top:16px;">
    <p class="win-title">${ICON.calendar} Eventos do restaurante</p>
    ${s.eventosRestaurante.map(e => `
      <div class="event-row">
        <div class="event-date"><p class="day">${e.day}</p><p class="month">${e.month}</p></div>
        <div class="event-info"><p class="t">${e.t}</p><p class="time">${e.time} · ${e.place}</p></div>
      </div>`).join('')}
  </div>

  <h3 class="svc-section-title">Grupos de comunidade</h3>
  <div class="grid">
    ${s.gruposComunidade.map(g => `
      <div class="win span2 cell-card">
        <p class="name"><span class="cell-name-row"><span class="title-icon ti-navy">${ICON[g.icon]}</span>${g.name}</span></p>
        <p class="desc" style="margin-bottom:8px;">${g.desc}</p>
        <p class="svc-note">Liderado por ${g.leader} · ${g.schedule}</p>
      </div>`).join('')}
  </div>

  <h3 class="svc-section-title">Classificados <span class="tag" style="margin-left:6px;">${s.classificadosFull.length}</span></h3>
  <p class="svc-note" style="margin-bottom:10px;">Mostrando os 15 anúncios mais recentes. Veja todos e anuncie um item em "Classificados", na grade de amenidades acima.</p>
  <div class="market-grid">
    ${classificadosPreview.map((m,i) => marketItemCard(m, i)).join('')}
  </div>`;
}

function renderServicos(org){
  const s = org.servicosData;
  if(!s){
    return `<div class="win" style="text-align:center;padding:48px 24px;">
      <p style="font-size:15px;font-weight:600;margin:0 0 6px;">Serviços ainda não configurados para ${org.name}</p>
      <p style="font-size:13px;color:var(--muted);margin:0;">Este módulo já está pronto e pode ser ativado para esta comunidade quando quisermos.</p>
    </div>`;
  }
  if(servicosView.mode === 'detail' && servicosView.amenityKey){
    return renderServicoDetail(org, s, servicosView.amenityKey);
  }
  return renderServicosRoot(org, s);
}

function renderConteudos(org){
  if(org.conteudosCuradoria){
    const cc = {...org.conteudosCuradoria, cards: org.conteudosCuradoria.cards.map(c => normalizeCard(c, org))};
    const gratisCount = cc.cards.filter(c => c.badge === 'gratis').length;
    const premiumCount = cc.cards.filter(c => c.badge !== 'gratis').length;
    return `
    <h2 class="cc-title serif">Conteúdos e Curadoria</h2>
    <p class="cc-subtitle">${cc.subtitle}</p>

    <div class="cc-search">
      ${ICON.search}
      <input type="text" placeholder="Buscar por título, autor ou tema...">
    </div>

    <div class="cc-categories">
      ${cc.categories.map((c,i) => `<button class="cc-cat ${i===0?'active':''}">${c}</button>`).join('')}
    </div>

    <div class="cc-featured-grid">
      ${cc.featured.map(f => `
        <div class="cc-featured">
          <div class="cover">${ICON[f.icon]}</div>
          <div>
            <p class="tag">${f.tag}</p>
            <p class="t">${f.t}</p>
          </div>
        </div>`).join('')}
    </div>

    <div class="cc-tabs">
      <button class="cc-tab active">Todos (${cc.cards.length})</button>
      <button class="cc-tab">Grátis (${gratisCount})</button>
      <button class="cc-tab">Premium (${premiumCount})</button>
    </div>

    ${renderMosaic(cc.cards)}

    <div class="cc-loadmore"><button>⌄ Carregar todos os conteúdos</button></div>`;
  }
  return `
  <div class="win" style="margin-bottom:16px;">
    <p style="margin:0;font-size:13px;color:var(--muted);">Três origens, sem misturar com o feed público: interno da comunidade, acervo SoftLiving e conteúdo sob demanda.</p>
  </div>
  <div class="grid">
    ${org.conteudos.map(c => `
      <div class="content-item span2">
        <div>
          <p class="name">${c.t}</p>
          <p class="meta">${c.m}</p>
          <p class="rate">${c.r}</p>
        </div>
        <span class="badge">${c.badge}</span>
      </div>`).join('')}
  </div>`;
}

function renderCelulas(org){
  const chip = ['ti-navy','ti-green','ti-terracotta','ti-teal'];
  return `
  <div class="win" style="margin-bottom:16px;">
    <p style="margin:0;font-size:13px;color:var(--muted);">${org.celulasIntro}</p>
  </div>
  <div class="grid">
    ${org.celulas.map((c,i) => `
      <div class="win span2 cell-card">
        <p class="name"><span class="cell-name-row"><span class="title-icon ${chip[i % chip.length]}">${ICON[c.icon]}</span>${c.t}</span> <span style="color:var(--muted);">›</span></p>
        <p class="desc">${c.d}</p>
      </div>`).join('')}
  </div>`;
}

function renderUsuarios(org){
  const d = org.membrosDirectory;
  return `
  <h2 class="cc-title serif">Membros</h2>
  <p class="cc-subtitle">${d.subtitle}</p>

  <div class="mem-filterbar">
    ${d.filters.map(f => `
      <div class="mem-filter">
        <label>${f.label}</label>
        <div class="mem-select">${f.value} ${ICON.chevron}</div>
      </div>`).join('')}
    <button class="mem-search-btn">${ICON.search}</button>
  </div>

  <div class="mem-section-head">
    <h3>Sugeridos para você <span class="tag">${d.count}</span></h3>
    <a class="mem-seeall">Ver todos ${ICON.chevron}</a>
  </div>

  <div class="mem-grid">
    ${d.members.map(m => `
      <div class="mem-card">
        <div class="mem-card-top">
          <div class="conn-avatar ca-${m.c}">${m.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
          <div>
            <p class="mem-name">${m.name}</p>
            <p class="mem-role">${m.role}</p>
          </div>
        </div>
        <div class="mem-meta-row">
          <span class="mem-status">${m.status}</span>
          <span class="mem-loc">${m.loc}</span>
        </div>
        <p class="mem-stat">${m.stat1}</p>
        <p class="mem-stat muted">${m.stat2}</p>
        <div class="mem-tags">
          ${m.tags.map(t => `<span class="mem-tag">${t}</span>`).join('')}
          ${m.more ? `<span class="mem-tag more">+${m.more}</span>` : ''}
        </div>
        <button class="mem-cta">${m.cta}</button>
      </div>`).join('')}
  </div>
  <p style="font-size:12px;color:var(--muted);margin-top:16px;">Adicionar / desativar / importar CSV: fora deste protótipo. Histórico de vínculo não se apaga ao sair.</p>`;
}

function renderPublicar(org){
  return `
  <div class="win" style="max-width:640px;">
    <p style="margin:0 0 18px;font-size:13px;color:var(--muted);">Publicação real reaproveita o fluxo de artigos já existente, com permissão por comunidade.</p>
    <div class="field"><label>Título</label><input type="text" placeholder="Ex.: Comunicado de agosto"></div>
    <div class="field"><label>Público</label><select><option>${org.publicarPublico}</option></select></div>
    <div class="field"><label>Corpo</label><textarea rows="5" placeholder="Texto visível só para esta comunidade."></textarea></div>
    <div class="btn-row">
      <button class="btn-primary">Publicar (demo)</button>
      <button class="btn-secondary">Salvar rascunho</button>
    </div>
  </div>`;
}

function renderDashboard(org){
  return `
  <div class="grid" style="margin-bottom:16px;">
    ${org.dashStats.map(s => `<div class="win span1" style="grid-column:span 1;"><p class="num" style="font-size:22px;font-weight:700;margin:0;">${s.n}</p><p class="lbl" style="font-size:12px;color:var(--muted);margin:0;">${s.l}</p></div>`).join('')}
  </div>
  <div class="grid">
    ${org.dashCards.map(c => `
      <div class="win span2">
        <p class="serif" style="font-size:16px;margin:0 0 4px;">${c.t}</p>
        <p style="font-size:13px;color:var(--muted);margin:0;">${c.m}</p>
      </div>`).join('')}
  </div>`;
}

function renderEscuta(org){
  const p = org.poll;
  return `
  <div class="win" style="max-width:640px;">
    <p class="serif" style="font-size:18px;margin:0 0 4px;">${p.title}</p>
    <p style="font-size:13px;color:var(--muted);margin:0 0 16px;">Público: ${p.publico}</p>
    <div class="poll-grid">
      <div><p class="lbl">Elegíveis</p><p class="num" style="font-size:20px;">${p.elegiveis}</p></div>
      <div><p class="lbl">Respostas</p><p class="num" style="font-size:20px;">${p.respostas}</p></div>
      <div><p class="lbl">Participação</p><p class="num" style="font-size:20px;">${p.participacao}</p></div>
      <div><p class="lbl">Status</p><p class="num" style="font-size:20px;">${p.status}</p></div>
    </div>
  </div>`;
}

const RENDERERS = { inicio:renderInicio, conteudos:renderConteudos, servicos:renderServicos, celulas:renderCelulas, usuarios:renderUsuarios, publicar:renderPublicar, dashboard:renderDashboard, escuta:renderEscuta };

function renderContent(){
  const org = DATA[currentOrg];
  const active = org.audiences ? {...org, ...org.audiences[currentAudience]} : org;
  document.getElementById('content').innerHTML = RENDERERS[currentTab](active);
}

function renderAll(){
  renderOrgSwitcher();
  renderHeaderInfo();
  renderTabBar();
  renderContent();
  renderEscutaComunidade();
}

// Pesquisa de escuta da comunidade (comunidades-escuta.js), na coluna da direita.
// Só é remontada quando muda a comunidade ou o público, para não perder a resposta em edição.
let escutaAtual = null;
function renderEscutaComunidade(){
  if(typeof ESCUTA_COMUNIDADES === 'undefined' || typeof montarEscuta === 'undefined') return;
  const chave = `escuta:${currentOrg}:${currentAudience || ''}`;
  if(chave === escutaAtual) return;
  escutaAtual = chave;
  const org = DATA[currentOrg], conjunto = ESCUTA_COMUNIDADES[currentOrg];
  const perguntas = Array.isArray(conjunto) ? conjunto : conjunto && conjunto[currentAudience];
  const lado = document.getElementById('cmSide');
  if(!perguntas){ lado.innerHTML = ''; return; }
  // Pesquisas de comunidades são só pesquisa, sem créditos (inclusive as de colaboradores, por enquanto).
  const publico = org.audiences ? ` · ${org.audiences[currentAudience].audienceLabel}` : '';
  montarEscuta({ lado, perguntas, chave, recompensa: { tipo:'nenhuma' },
    descricao: `Pesquisa ${org.name}${publico}. Sua opinião ajuda a melhorar esta comunidade.` });
}

// Fecha o dropdown "Trocar por" ao clicar fora dele ou apertar Esc
function closeOrgDropdown(){
  if(openDropdownSlot === null) return;
  openDropdownSlot = null;
  renderOrgSwitcher();
}
document.addEventListener('click', e => {
  if(!e.target.closest('.org-dropdown')) closeOrgDropdown();
});
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeOrgDropdown(); });

// Estado que atravessa as abas: vem do endereço (?org=...&publico=...) e, na falta dele, da sessão do navegador
function salvarEstadoComunidades(){
  try { sessionStorage.setItem('comunidadesEstado', JSON.stringify({ org:currentOrg, publico:currentAudience, pinned:pinnedSlots })); } catch(e){}
}
(function restaurarEstadoComunidades(){
  let salvo = null;
  try { salvo = JSON.parse(sessionStorage.getItem('comunidadesEstado') || 'null'); } catch(e){}
  if(salvo && Array.isArray(salvo.pinned) && salvo.pinned.length === 3 && salvo.pinned.every(k => DATA[k])) pinnedSlots = salvo.pinned;
  const params = new URLSearchParams(location.search);
  const org = params.get('org') || (salvo && salvo.org);
  if(org && DATA[org]){
    currentOrg = org;
    if(!pinnedSlots.includes(org)) pinnedSlots[pinnedSlots.length - 1] = org;
  }
  const publico = params.get('publico') || (salvo && salvo.org === currentOrg ? salvo.publico : null);
  const aud = DATA[currentOrg].audiences;
  currentAudience = aud && aud[publico] ? publico : defaultAudience(currentOrg);
})();
currentTab = document.body.dataset.tab || 'inicio';
renderAll();
