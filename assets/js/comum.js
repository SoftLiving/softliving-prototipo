// Utilitários compartilhados: ícones, degradês de capa.
function ic(path){ return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`; }

const ICON = {
  home: ic('<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>'),
  search: ic('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
  bell: ic('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  book: ic('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M4 5.5v16"/>'),
  edit: ic('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
  bookmark: ic('<path d="M6 3h12v18l-6-4-6 4V3z"/>'),
  users: ic('<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M23 20c0-2.8-2-5-5-5.5"/>'),
  plus: ic('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'),
  globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>'),
  handshake: ic('<circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/>'),
  briefcase: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>'),
  store: ic('<path d="M3 9l1-5h16l1 5"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/>'),
  card: ic('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
  gift: ic('<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3"/><path d="M12 5v16"/><path d="M12 5C11 2 7 2 7 5s5 3 5 0zM12 5c1-3 5-3 5 0s-5 3-5 0z"/>'),
  user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>'),
  question: ic('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2"/><path d="M12 17h.01"/>'),
  building: ic('<rect x="4" y="3" width="16" height="18"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01"/>'),
  shield: ic('<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/>'),
  warning: ic('<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17h.01"/>'),
  calendar: ic('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>'),
  headphones: ic('<path d="M3 13a9 9 0 0 1 18 0"/><rect x="3" y="13" width="4" height="7" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/>'),
  bolt: ic('<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>'),
  stethoscope: ic('<path d="M5 3v6a4 4 0 0 0 8 0V3"/><path d="M9 13v2a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10" r="1.5"/>'),
  brain: ic('<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5h1a3 3 0 0 0 3-3V6a3 3 0 0 0-1-3z"/><path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 1-3z"/>'),
  clipboard: ic('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2h6v3H9z"/><path d="M8 11h8M8 15h5"/>'),
  document: ic('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h6"/>'),
  door: ic('<rect x="5" y="2" width="14" height="20"/><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/>'),
  car: ic('<path d="M3 13l2-6h14l2 6"/><rect x="2" y="13" width="20" height="6" rx="2"/><circle cx="7" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>'),
  tennis: ic('<circle cx="12" cy="12" r="9"/><path d="M4 7c3 2 3 8 0 10M20 7c-3 2-3 8 0 10"/>'),
  restaurant: ic('<path d="M6 2v8M4 2v5a2 2 0 0 0 4 0V2M6 10v12"/><path d="M18 2c-2 0-3 2-3 5s1 4 3 4 3-1 3-4-1-5-3-5zM18 11v11"/>'),
  phone: ic('<path d="M6 3h4l1 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 1v4a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2z"/>'),
  chart: ic('<path d="M4 20V12M11 20V6M18 20v-8"/>'),
  music: ic('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  trophy: ic('<path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 4H4v2a4 4 0 0 0 4 4M16 4h4v2a4 4 0 0 1-4 4"/><path d="M12 12v4M9 20h6M10 16h4v4h-4z"/>'),
  flame: ic('<path d="M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-1-1-2-1-2 1 3-1 4-2 4-2 0-3-1.5-3-3 0-3 3-4 2-8z"/>'),
  chat: ic('<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/>'),
  map: ic('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
  activity: ic('<path d="M3 12h4l2 8 4-16 2 8h6"/>'),
  robot: ic('<rect x="5" y="8" width="14" height="11" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/><path d="M9 17h6"/>'),
  money: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.5 2.5 0 0 1 5 0c0 3-5 2-5 5a2.5 2.5 0 0 0 5 0"/>'),
  chair: ic('<path d="M6 3v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 21v-5M18 21v-5M6 14H4l1 7M18 14h2l-1 7"/>'),
  wind: ic('<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 14h14a3 3 0 1 1-3 3"/><path d="M3 20h9a3 3 0 1 0-3-3"/>'),
  pen: ic('<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
  lock: ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  unlock: ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>'),
  link: ic('<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>'),
  wheelchair: ic('<circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none"/><path d="M12 7v5l5 3"/><path d="M9 12H6a2 2 0 0 0 0 4h3l3 5"/><circle cx="10" cy="18" r="4"/>'),
  chevron: ic('<path d="M6 9l6 6 6-6"/>'),
  star: ic('<path d="M12 3l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.8 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6L12 3z"/>'),
  paw: ic('<circle cx="7" cy="7" r="1.8"/><circle cx="12" cy="5" r="1.8"/><circle cx="17" cy="7" r="1.8"/><path d="M8 14c0-2.5 1.8-4 4-4s4 1.5 4 4-2 4.5-4 4.5-4-2-4-4.5z"/>'),
};

const COVER_GRADIENTS = [
  "linear-gradient(135deg,#12294d,#1f7a5c)",
  "linear-gradient(135deg,#1f7a5c,#5aa88f)",
  "linear-gradient(135deg,#2c4a7c,#12294d)",
  "linear-gradient(135deg,#3d6b8a,#1f7a5c)",
  "linear-gradient(135deg,#4a5a7c,#2c4a7c)",
  "linear-gradient(135deg,#1f7a5c,#12294d)",
];

// Capa padrão: degradê sorteado a partir da paleta do layout, uma vez por carregamento
const CT_PALETA = ['#12294d','#1f7a5c','#2f8578','#c98a2e','#c1633f','#2c4a7c','#5aa88f','#8a5a9e','#3d6b8a'];
function sorteiaDegrade(){
  const a = CT_PALETA[Math.floor(Math.random() * CT_PALETA.length)];
  let b; do { b = CT_PALETA[Math.floor(Math.random() * CT_PALETA.length)]; } while(b === a);
  const angulo = 100 + Math.floor(Math.random() * 80);
  return `linear-gradient(${angulo}deg, ${a}, ${b})`;
}
