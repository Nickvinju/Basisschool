/* =========================================================
   Wereldreis groep 6 – app
   ========================================================= */

const $ = s => document.querySelector(s);
const app = $('#app');
const shuffle = R.shuffle, pick = R.pick;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = s => String(s).replace(/<[^>]+>/g, '');
const RONDE = 10;

/* ---------------- LANDEN (stempels in het paspoort) ---------------- */
const LANDEN = `
🇳🇱|Nederland|Amsterdam|De vlag was vroeger oranje-wit-blauw.
🇧🇪|België|Brussel|België heeft drie officiële talen: Nederlands, Frans en Duits.
🇩🇪|Duitsland|Berlijn|Duitsland heeft meer dan 20.000 kastelen.
🇫🇷|Frankrijk|Parijs|De Eiffeltoren groeit in de zomer een paar centimeter door de warmte.
🇬🇧|Verenigd Koninkrijk|Londen|De klok Big Ben is eigenlijk de naam van de grote bel.
🇮🇹|Italië|Rome|In Rome staat het Colosseum, bijna 2000 jaar oud.
🇪🇸|Spanje|Madrid|In Spanje eet je pas laat: avondeten om 21.00 uur is normaal.
🇵🇹|Portugal|Lissabon|Portugese zeevaarders voeren als eersten rond de zuidpunt van Afrika.
🇬🇷|Griekenland|Athene|De eerste Olympische Spelen waren in Griekenland.
🇳🇴|Noorwegen|Oslo|In het noorden gaat de zon in de zomer niet onder.
🇸🇪|Zweden|Stockholm|Zweden heeft een hotel dat elk jaar opnieuw van ijs wordt gebouwd.
🇩🇰|Denemarken|Kopenhagen|De Deense vlag is een van de oudste vlaggen ter wereld.
🇫🇮|Finland|Helsinki|Finland heeft meer dan 180.000 meren.
🇮🇸|IJsland|Reykjavik|IJsland heeft meer dan 100 vulkanen.
🇨🇭|Zwitserland|Bern|De Zwitserse vlag is vierkant.
🇦🇹|Oostenrijk|Wenen|Mozart werd geboren in Oostenrijk.
🇵🇱|Polen|Warschau|De vlag van Polen is wit boven en rood onder.
🇮🇪|Ierland|Dublin|Op de munten van Ierland staat een harp.
🇹🇷|Turkije|Ankara|Istanbul ligt in twee werelddelen: Europa en Azië.
🇪🇬|Egypte|Caïro|De piramide van Cheops is ongeveer 4500 jaar oud.
🇲🇦|Marokko|Rabat|In Marokko ligt een deel van de Saharawoestijn.
🇰🇪|Kenia|Nairobi|De snelste marathonlopers ter wereld komen vaak uit Kenia.
🇿🇦|Zuid-Afrika|Pretoria|Zuid-Afrika heeft drie hoofdsteden.
🇳🇬|Nigeria|Abuja|Nigeria heeft de meeste inwoners van Afrika.
🇺🇸|Verenigde Staten|Washington|De Apollo-astronauten vertrokken vanuit Florida naar de maan.
🇨🇦|Canada|Ottawa|Op de vlag van Canada staat een esdoornblad.
🇲🇽|Mexico|Mexico-Stad|In Mexico staan piramides van de Azteken en Maya's.
🇧🇷|Brazilië|Brasília|Het Amazoneregenwoud ligt grotendeels in Brazilië.
🇦🇷|Argentinië|Buenos Aires|Argentinië is het land van de tango.
🇨🇱|Chili|Santiago|Chili is meer dan 4000 kilometer lang maar heel smal.
🇵🇪|Peru|Lima|In Peru ligt de oude Incastad Machu Picchu.
🇯🇵|Japan|Tokio|De Japanse sneltrein rijdt meer dan 300 km per uur.
🇨🇳|China|Peking|De Chinese Muur is duizenden kilometers lang.
🇮🇳|India|New Delhi|In India werd het schaakspel bedacht.
🇮🇩|Indonesië|Jakarta|Indonesië bestaat uit meer dan 17.000 eilanden.
🇰🇷|Zuid-Korea|Seoul|Zuid-Korea heeft een van de snelste internetverbindingen ter wereld.
🇹🇭|Thailand|Bangkok|De volledige naam van Bangkok is een van de langste plaatsnamen ter wereld.
🇳🇵|Nepal|Kathmandu|De vlag van Nepal bestaat uit twee driehoeken.
🇻🇳|Vietnam|Hanoi|Vietnam is een van de grootste koffielanden ter wereld.
🇸🇦|Saoedi-Arabië|Riyad|Saoedi-Arabië heeft geen enkele rivier die het hele jaar stroomt.
🇦🇺|Australië|Canberra|Australië is een land én een werelddeel.
🇳🇿|Nieuw-Zeeland|Wellington|In Nieuw-Zeeland wonen meer schapen dan mensen.
🇯🇲|Jamaica|Kingston|De snelste sprinter ooit, Usain Bolt, komt uit Jamaica.
🇸🇷|Suriname|Paramaribo|In Suriname spreken veel mensen Nederlands.
🇺🇦|Oekraïne|Kyiv|Het grootste vrachtvliegtuig ooit werd in Oekraïne gebouwd.
🇭🇺|Hongarije|Boedapest|De Rubiks kubus werd in Hongarije uitgevonden.
🇨🇿|Tsjechië|Praag|In Praag hangt een astronomische klok van meer dan 600 jaar oud.
🇰🇿|Kazachstan|Astana|De eerste mens in de ruimte vertrok vanuit Kazachstan.
`.trim().split('\n').map(r => { const [vlag, naam, stad, feit] = r.split('|'); return { vlag, naam, stad, feit }; });

/* ---------------- OPSLAG ---------------- */
const STORE = 'wereldreis6_v1';
function load() {
  const leeg = { stats: {}, stempels: [], historie: [], geluid: true };
  try { return Object.assign(leeg, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch { return leeg; }
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* geen opslag */ } }
let data = load();
function telStat(key, goed) {
  const s = data.stats[key] || (data.stats[key] = { g: 0, t: 0 });
  s.t++; if (goed) s.g++;
}
const pct = key => { const s = data.stats[key]; return s && s.t ? Math.round(s.g / s.t * 100) : null; };

/* ---------------- GELUID & EFFECTEN ---------------- */
let actx;
function beep(notes) {
  if (!data.geluid) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    let t = actx.currentTime;
    notes.forEach(([f, d, type]) => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type || 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(.15, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); t += d * .8;
    });
  } catch { /* geen geluid */ }
}
const sndGood = () => beep([[660, .1], [990, .18]]);
const sndBad = () => beep([[260, .2, 'triangle'], [200, .25, 'triangle']]);
const sndWin = () => beep([[523, .12], [659, .12], [784, .12], [1046, .3]]);
function confetti(items) {
  const box = $('#confetti');
  for (let i = 0; i < 26; i++) {
    const e = document.createElement('i');
    e.textContent = pick(items);
    e.style.left = Math.random() * 100 + 'vw';
    e.style.animationDelay = Math.random() * .6 + 's';
    box.appendChild(e);
    setTimeout(() => e.remove(), 2600);
  }
}
$('#soundBtn').textContent = data.geluid ? '🔊' : '🔇';
$('#soundBtn').onclick = () => { data.geluid = !data.geluid; save(); $('#soundBtn').textContent = data.geluid ? '🔊' : '🔇'; };

/* ---------------- TEKSTEN: regels met nummers ---------------- */
const BREED = 54;
function maakRegels(tekst) {
  if (tekst._regels) return tekst._regels;
  const regels = []; // {nr, s} of {gap:true}
  tekst.alineas.forEach((al, ai) => {
    if (ai) regels.push({ gap: true });
    let r = '';
    al.split(' ').forEach(w => {
      if (r && (r + ' ' + w).length > BREED) { regels.push({ s: r }); r = w; } else r = r ? r + ' ' + w : w;
    });
    if (r) regels.push({ s: r });
  });
  let nr = 0; regels.forEach(x => { if (!x.gap) x.nr = ++nr; });
  return (tekst._regels = regels);
}
function zoekRegels(tekst, stukje) {
  const regels = maakRegels(tekst).filter(x => !x.gap);
  let plat = '', pos = [];
  regels.forEach(x => { pos.push(plat.length); plat += x.s + ' '; });
  const i = plat.indexOf(stukje);
  if (i < 0) { console.warn('Niet gevonden:', stukje); return null; }
  const lijn = idx => { let k = 0; while (k + 1 < pos.length && pos[k + 1] <= idx) k++; return regels[k].nr; };
  return [lijn(i), lijn(i + stukje.length - 1)];
}
function vulRegels(tekst, s, hl) {
  return String(s).replace(/\{regel:([^}]+)\}/g, (_, stukje) => {
    const r = zoekRegels(tekst, stukje);
    if (!r) return 'de tekst';
    if (hl) for (let n = r[0]; n <= r[1]; n++) hl.add(n);
    return r[0] === r[1] ? `regel ${r[0]}` : `regel ${r[0]} - ${r[1]}`;
  });
}
function tekstHTML(tekst, hl = new Set()) {
  return `<span class="soort">${esc(tekst.thema)}</span><h3>${tekst.emoji} ${esc(tekst.titel)}</h3>` +
    maakRegels(tekst).map(x => x.gap ? '<div class="ln gap"></div>' : `<div class="ln${hl.has(x.nr) ? ' hl' : ''}"><span>${x.nr}</span><span>${esc(x.s)}</span></div>`).join('');
}

/* ---------------- VRAGEN MAKEN ---------------- */
function lezenVraag(tekst, v) {
  const hl = new Set();
  const q = vulRegels(tekst, v.q, hl), u = vulRegels(tekst, v.u || '');
  const vt = VRAAGTYPES[v.vt];
  const basis = { q, u, tekst, hl, vt: v.vt, tag: `${vt.emoji} ${vt.naam}`, tip: vt.aanpak, key: 'lezen:' + v.vt };
  if (v.t === 'open') return { ...basis, t: 'open', model: vulRegels(tekst, v.model) };
  return { ...basis, t: 'mc', a: v.a, opts: shuffle([v.a, ...v.w]) };
}
function opzoekVraag(o) {
  return { q: o.q, visual: o.html, t: 'mc', a: o.a, opts: shuffle([o.a, ...o.w]), u: o.u, tag: '🗂️ Informatie opzoeken', tip: VRAAGTYPES.opzoeken.aanpak, key: 'lezen:opzoeken' };
}
const TEKENS = { '.': 'een punt (.)', '?': 'een vraagteken (?)', '!': 'een uitroepteken (!)', ',': 'een komma (,)' };

const TAAL = [
  {
    id: 'gespeld', naam: 'Welk woord is goed gespeld?', emoji: '🔍',
    uitleg: `<p>Je ziet vier keer dezelfde zin. Alleen het <b>dikgedrukte woord</b> is steeds anders geschreven.</p>
      <ol><li>Zeg het woord zachtjes in jezelf, in klankgroepen (ri-ool, vrucht-baar).</li><li>Denk aan de regels: <b>ei/ij</b>, <b>au/ou</b>, <b>g/ch</b>, <b>-cht</b>, <b>-ig/-lijk</b>, open/gesloten klankgroep (bo-ren → boor-de).</li><li>Welk woord ziet er "goed" uit? Heb je het weleens zo gelezen?</li></ol>`,
    maak() {
      const it = pick(GOED_GESPELD);
      const opts = shuffle([it.a, ...it.w.slice(0, 3)]).map(w => it.zin.replace('*', `<b>${w}</b>`));
      return { q: 'In welke zin is het dikgedrukte woord goed gespeld?', t: 'mc', a: it.zin.replace('*', `<b>${it.a}</b>`), opts, u: `Goed is: <b>${it.a}</b>.` };
    }
  },
  {
    id: 'letters', naam: 'Vul de juiste letter(s) in', emoji: '🔡',
    uitleg: `<p>Er ontbreken een of meer letters. Zeg het woord hardop en luister goed.</p>
      <ul><li>Klinkt het als <b>s</b> of <b>k</b> maar is het een leenwoord? Dan is het vaak een <b>c</b> (oceaan, centrum, circus).</li><li><b>ei</b> of <b>ij</b>, <b>au</b> of <b>ou</b>: die moet je onthouden. Denk aan een woord dat erop lijkt (trein, treinen).</li><li>Achteraan <b>-ig</b> klinkt als "ug" (nieuwsgierig).</li></ul>`,
    maak() {
      const it = pick(LETTERS);
      return { q: 'Vul de juiste letter(s) in.', zin: it.woord.replace('_', '<b>…</b>'), t: 'text', a: it.a, u: `Het woord is: <b>${it.woord.replace('_', it.a)}</b>.` };
    }
  },
  {
    id: 'verklein', naam: 'Verkleinwoorden', emoji: '🐭',
    uitleg: `<p>Een verkleinwoord maak je met <b>-je, -tje, -pje, -etje</b> of <b>-kje</b>.</p>
      <ul><li>Meestal <b>-je</b>: boek → boekje.</li><li>Na een lange klank of l, n, r, w: <b>-tje</b>: stoel → stoeltje, auto → autootje.</li><li>Na m: <b>-pje</b>: boom → boompje, rijm → rijmpje.</li><li>Korte klank + l, m, n, r, ng: <b>-etje</b>: bal → balletje, ring → ringetje.</li><li>Woord op -ing: <b>-kje</b>: koning → koninkje.</li></ul>`,
    maak() {
      const it = pick(VERKLEIN);
      return { q: 'Vul het verkleinwoord in van het woord dat tussen haakjes staat.', zin: it.zin.replace('*', '<b>…………</b>') + ` (${it.grond})`, t: 'text', a: it.a, u: `${it.grond} → <b>${it.a}</b>.` };
    }
  },
  {
    id: 'werkwoord', naam: 'Werkwoorden', emoji: '🏃',
    uitleg: `<p><b>Voltooid deelwoord</b> (heeft gebouwd / is gegroeid): <b>ge + stam + d of t</b>.</p>
      <ul><li>Eindigt de stam op een letter uit <b>'t kofschip</b> (t, k, f, s, ch, p)? → <b>t</b> (gefietst, gemaakt).</li><li>Anders → <b>d</b> (gebouwd, gegroeid).</li><li>Let op: bij verhuizen/beloven kijk je naar de z/v: verhui<b>z</b>en → verhuisd.</li></ul>
      <p><b>Tegenwoordige tijd</b>: ik → stam (ik fiets) · hij/zij/het → stam + t (hij fietst) · jij → stam + t, maar <b>geen t</b> als jij achter het werkwoord staat (fiets jij?).</p>`,
    maak() {
      if (Math.random() < .55) { const it = pick(VD); return { q: 'Vul de goede vorm in van het werkwoord tussen haakjes. Gebruik het voltooid deelwoord.', zin: it.zin.replace('*', '<b>…………</b>') + ` (${it.ww})`, t: 'text', a: it.a, u: `<b>${it.a}</b> – ${it.u}.` }; }
      const it = pick(TT);
      return { q: 'Vul de goede vorm in van het werkwoord tussen haakjes (tegenwoordige tijd).', zin: it.zin.replace('*', '<b>…………</b>') + ` (${it.ww})`, t: 'text', a: it.a, u: `<b>${it.a}</b> – ${it.u}.` };
    }
  },
  {
    id: 'leestekens', naam: 'Leestekens en hoofdletters', emoji: '❗',
    uitleg: `<ul><li><b>Vraagteken</b>: alleen bij een echte vraag. "Ik vraag me af wanneer de trein komt" is géén vraag → punt!</li><li><b>Uitroepteken</b>: bij een uitroep, schrik of bevel: "Pas op!"</li><li><b>Punt</b>: aan het eind van een gewone zin. Zoek waar de ene zin stopt en de nieuwe begint (vaak bij hij, zij, daar, ze…).</li><li><b>Hoofdletter</b>: aan het begin van een zin en bij namen van personen, dieren, landen, steden, zeeën, werelddelen en talen. <u>Niet</u> bij dagen en maanden!</li></ul>`,
    maak() {
      const type = R.ri(0, 2);
      if (type === 0) { const it = pick(LEESTEKEN); return { q: 'Welk leesteken moet achter de zin staan?', zin: it.zin + ' …', t: 'mc', a: TEKENS[it.a], opts: Object.values(TEKENS), u: `${it.zin}<b>${it.a}</b>` }; }
      if (type === 1) {
        const it = pick(PUNT), woorden = it.tekst.replace('.', '').split(' ');
        const andere = shuffle(woorden.filter((w, i) => w !== it.a && i < woorden.length - 1 && w.length > 2)).slice(0, 3);
        return { q: 'Er mist een punt in deze tekst. Achter welk woord moet de punt?', zin: it.tekst, t: 'mc', a: it.a, opts: shuffle([it.a, ...andere]), u: `Na "<b>${it.a}</b>" begint een nieuwe zin.` };
      }
      const it = pick(HOOFD), woorden = it.zin.replace('.', '').split(' ').slice(1);
      const lastig = woorden.filter(w => /^(dinsdag|maart|zomer|vakantie|museum|maan|rivier|gym|juf|meester|vriend|hond|schip)$/.test(w));
      const andere = shuffle([...new Set([...lastig, ...shuffle(woorden.filter(w => w !== it.a && w === w.toLowerCase() && w.length > 3))])]).slice(0, 3);
      return { q: 'Welk woord moet (naast het eerste woord) óók met een hoofdletter?', zin: it.zin, t: 'mc', a: it.a, opts: shuffle([it.a, ...andere]), u: `<b>${it.a[0].toUpperCase() + it.a.slice(1)}</b>: ${it.u}.` };
    }
  },
  {
    id: 'ontleden', naam: 'Persoonsvorm en onderwerp', emoji: '🧱',
    uitleg: `<p><b>Persoonsvorm (pv)</b> = het werkwoord dat verandert als je de zin in een andere tijd zet.</p>
      <ul><li>Truc 1: maak er een vraag van. Het woord dat vooraan komt is de pv. (Liam <b>moet</b>… → <b>Moet</b> Liam…?)</li><li>Truc 2: zet de zin in de verleden tijd: moet → moest.</li></ul>
      <p><b>Onderwerp</b> = wie of wat doet het? Vraag: <b>Wie/wat + pv?</b> (Wie zweeft? → de astronaut)</p>`,
    maak() {
      const pv = Math.random() < .6, it = pick(pv ? PV : OW);
      const zin = it.delen.map((d, i) => `<span style="background:${i % 2 ? '#e6f0fb' : '#fdf0dc'};border-radius:6px;padding:1px 4px">${d}</span>`).join(' ');
      return { q: `Welk deel is ${pv ? 'de persoonsvorm' : 'het onderwerp'} van de zin?`, zin, t: 'mc', a: it.a, opts: it.delen.slice(), u: pv ? `<b>${it.a}</b> is de persoonsvorm. Maak er een vraag van of zet de zin in een andere tijd: dit woord verandert.` : `Vraag: wie of wat + pv? Het antwoord is <b>${it.a}</b>.` };
    }
  }
];

/* ---------------- VAKKEN ---------------- */
const VAKKEN = {
  lezen: { naam: 'Begrijpend lezen', emoji: '📖', kleur: 'var(--lezen)' },
  taal: { naam: 'Spelling & taalverzorging', emoji: '✏️', kleur: 'var(--taal)' },
  reken: { naam: 'Rekenen', emoji: '🔢', kleur: 'var(--reken)' },
  klok: { naam: 'Klokkijken', emoji: '🕰️', kleur: 'var(--klok)' }
};
// generator-onderdelen → vragen (genormaliseerd)
function genVraag(vak, o) {
  const v = o.gen ? o.gen() : o.maak();
  return { ...v, tag: `${o.emoji} ${o.naam}`, tip: o.uitleg, key: `${vak}:${o.id}` };
}
function lijst(vak) { return vak === 'taal' ? TAAL : vak === 'reken' ? REKENEN : vak === 'klok' ? KLOK.onderdelen : []; }
function maakSet(vak, o, n = RONDE) {
  const out = [], gezien = new Set();
  let guard = 0;
  while (out.length < n && guard++ < n * 20) {
    const v = genVraag(vak, o), sleutel = strip(v.q) + strip(v.zin || '') + (v.visual || '').length + v.a;
    if (gezien.has(sleutel)) continue;
    gezien.add(sleutel); out.push(v);
  }
  return out;
}
function mixSet(vak, n = RONDE) {
  const ond = lijst(vak);
  return Array.from({ length: n }, (_, i) => genVraag(vak, ond[i % ond.length])).sort(() => Math.random() - .5);
}

/* =========================================================
   SCHERMEN
   ========================================================= */
let ronde = null;
function go(html, kleur) {
  app.innerHTML = html;
  app.style.setProperty('--c', kleur || 'var(--blue)');
  window.scrollTo(0, 0);
}

/* ---------------- HOME ---------------- */
function home() {
  const vlaggen = data.stempels.map(i => LANDEN[i].vlag).join('');
  const kaart = (vak, id, emoji, naam, uitleg) => {
    const p = pct(`${vak}:${id}`), s = data.stats[`${vak}:${id}`];
    return `<button class="card" style="--c:${VAKKEN[vak].kleur}" data-go="${vak}|${id}">
      <span class="c-emoji">${emoji}</span><b>${esc(naam)}</b>${uitleg ? `<small>${esc(uitleg)}</small>` : ''}
      <span class="score">${s ? `${p}% goed · ${s.t} vragen` : 'Nog niet geoefend'}</span>
      <span class="meter"><span style="width:${p || 0}%"></span></span></button>`;
  };
  const lezenPct = (() => { let g = 0, t = 0; Object.keys(VRAAGTYPES).forEach(k => { const s = data.stats['lezen:' + k]; if (s) { g += s.g; t += s.t; } }); return t ? Math.round(g / t * 100) : null; })();

  // advies: zwakste onderdelen
  const alle = [];
  ['taal', 'reken', 'klok'].forEach(v => lijst(v).forEach(o => alle.push({ vak: v, id: o.id, naam: o.naam, key: `${v}:${o.id}` })));
  Object.entries(VRAAGTYPES).forEach(([k, vt]) => alle.push({ vak: 'lezen', id: 'vt-' + k, naam: 'Lezen: ' + vt.naam, key: 'lezen:' + k }));
  const zwak = alle.filter(x => data.stats[x.key] && data.stats[x.key].t >= 4 && pct(x.key) < 70).sort((a, b) => pct(a.key) - pct(b.key)).slice(0, 4);

  go(`
    <div class="panel passport">
      <div class="pp-icon">🛂</div>
      <div style="min-width:0">
        <b>Mijn paspoort: ${data.stempels.length} / ${LANDEN.length} stempels</b>
        <small>Haal 7 of meer goed in een ronde en verdien een vlag-stempel van een nieuw land!</small>
        <div class="flags">${vlaggen || '🏳️ nog leeg'}</div>
      </div>
      <button class="btn small" data-act="paspoort">Open paspoort</button>
    </div>

    <div class="panel toets-banner">
      <div class="big">📝</div>
      <div><h3>Oefentoets</h3><p>Een mix van lezen, spelling, rekenen en klokkijken, net als bij Leerling in beeld. Pas aan het eind zie je wat goed was.</p></div>
      <button class="btn" style="--c:var(--toets)" data-act="toets">Start toets</button>
    </div>

    ${zwak.length ? `<div class="panel advies"><b>💪 Oefen dit nog eens</b><ul>${zwak.map(x => `<li><a data-go="${x.vak}|${x.id}">${esc(x.naam)}</a> – ${pct(x.key)}% goed</li>`).join('')}</ul></div>` : ''}

    <div class="vak-head" style="--c:var(--lezen)"><span class="vak-emoji">📖</span><h2>Begrijpend lezen</h2>${lezenPct !== null ? `<span class="tag">${lezenPct}% goed</span>` : ''}</div>
    <div class="cards">
      ${kaart('lezen', 'teksten', '📚', 'Teksten lezen', '12 teksten over geschiedenis, ruimte, technologie en landen')}
      ${kaart('lezen', 'opzoeken', '🗂️', 'Informatie opzoeken', 'Website, woordenboek, inhoudsopgave, tabel')}
      ${kaart('lezen', 'trainer', '🎯', 'Vraagtype-trainer', 'Oefen één soort vraag tegelijk')}
      ${kaart('lezen', 'gids', '🧭', 'Uitleg soorten vragen', 'Hoe pak je elke vraag aan?')}
    </div>

    ${['taal', 'reken', 'klok'].map(vak => `
      <div class="vak-head" style="--c:${VAKKEN[vak].kleur}"><span class="vak-emoji">${VAKKEN[vak].emoji}</span><h2>${VAKKEN[vak].naam}</h2></div>
      <div class="cards">
        ${lijst(vak).map(o => kaart(vak, o.id, o.emoji, o.naam)).join('')}
        <button class="card" style="--c:${VAKKEN[vak].kleur}" data-mix="${vak}"><span class="c-emoji">🎲</span><b>Alles door elkaar</b><small>Van elk onderdeel een paar vragen</small></button>
      </div>`).join('')}

    <p class="reset-row"><button class="link-btn" data-act="reset">Alle voortgang wissen</button></p>
  `);
}

/* ---------------- ONDERDEEL-INTRO ---------------- */
function intro(vak, id) {
  if (vak === 'lezen') {
    if (id === 'teksten') return tekstKeuze();
    if (id === 'opzoeken') return startRonde({ titel: 'Informatie opzoeken', kleur: VAKKEN.lezen.kleur, key: 'lezen:opzoeken-ronde', vragen: shuffle(OPZOEK).slice(0, RONDE).map(opzoekVraag), uitleg: VRAAGTYPES.opzoeken.aanpak });
    if (id === 'trainer') return trainerKeuze();
    if (id === 'gids') return gids();
    if (id.startsWith('vt-')) return trainer(id.slice(3));
  }
  const o = lijst(vak).find(x => x.id === id);
  go(`
    <button class="link-btn" data-act="home">← terug</button>
    <div class="panel intro">
      <span class="tag">${VAKKEN[vak].emoji} ${VAKKEN[vak].naam}</span>
      <h2>${o.emoji} ${esc(o.naam)}</h2>
      <div class="uitleg-box"><b>🧠 Zo pak je het aan</b>${o.uitleg}</div>
      <div class="actions"><button class="btn" data-start="${vak}|${id}">Start: ${RONDE} vragen ▶</button></div>
    </div>`, VAKKEN[vak].kleur);
}

/* ---------------- LEZEN: tekstkeuze, gids, trainer ---------------- */
function tekstKeuze() {
  const themas = [...new Set(TEKSTEN.map(t => t.thema))];
  go(`
    <button class="link-btn" data-act="home">← terug</button>
    <h2>📚 Kies een tekst</h2>
    <p class="muted">Lees de tekst goed. Bij de vragen zie je de tekst ernaast, met regelnummers, net als in de toets.</p>
    ${themas.map(th => `<h3 style="margin:18px 0 8px">${th}</h3><div class="cards">${TEKSTEN.filter(t => t.thema === th).map(t => {
      const s = data.stats['tekst:' + t.id];
      return `<button class="card" style="--c:var(--lezen)" data-tekst="${t.id}"><span class="c-emoji">${t.emoji}</span><b>${esc(t.titel)}</b><small>${t.soort} · ${t.vragen.length} vragen</small><span class="score">${s ? `beste: ${s.best}/${s.max}` : 'Nog niet gelezen'}</span></button>`;
    }).join('')}</div>`).join('')}`, VAKKEN.lezen.kleur);
}
function leesTekst(id) {
  const t = TEKSTEN.find(x => x.id === id);
  go(`
    <button class="link-btn" data-go="lezen|teksten">← andere tekst</button>
    <div class="uitleg-box" style="--c:var(--lezen)"><b>🧠 Leestip:</b> lees eerst de titel en kijk wat voor soort tekst het is. Lees daarna de hele tekst rustig door. Bij de vragen mag je altijd terugkijken!</div>
    <div class="tekst">${tekstHTML(t)}</div>
    <div class="actions"><button class="btn" data-lees="${id}">Ik heb de tekst gelezen · naar de vragen ▶</button></div>`, VAKKEN.lezen.kleur);
}
function gids() {
  go(`
    <button class="link-btn" data-act="home">← terug</button>
    <h2>🧭 Soorten vragen bij begrijpend lezen</h2>
    <p class="muted">In de toets komen steeds dezelfde soorten vragen terug. Als je de soort herkent, weet je ook hoe je hem aanpakt.</p>
    ${Object.entries(VRAAGTYPES).map(([k, vt]) => `
      <details class="panel vt">
        <summary><span>${vt.emoji}</span> ${vt.naam}</summary>
        <p class="herken">Je herkent hem aan: ${esc(vt.herken)}</p>
        <div class="uitleg-box" style="--c:var(--lezen)"><ul>${vt.aanpak.map(a => `<li>${a}</li>`).join('')}</ul></div>
        <button class="btn small" style="--c:var(--lezen)" data-go="lezen|vt-${k}">Oefen deze vraag ▶</button>
      </details>`).join('')}`, VAKKEN.lezen.kleur);
}
function trainerKeuze() {
  go(`
    <button class="link-btn" data-act="home">← terug</button>
    <h2>🎯 Vraagtype-trainer</h2>
    <p class="muted">Kies één soort vraag. Je krijgt vragen van dat type uit verschillende teksten.</p>
    <div class="cards">${Object.entries(VRAAGTYPES).map(([k, vt]) => {
      const p = pct('lezen:' + k), s = data.stats['lezen:' + k];
      return `<button class="card" style="--c:var(--lezen)" data-go="lezen|vt-${k}"><span class="c-emoji">${vt.emoji}</span><b>${vt.naam}</b><span class="score">${s ? `${p}% goed · ${s.t} vragen` : 'Nog niet geoefend'}</span><span class="meter"><span style="width:${p || 0}%"></span></span></button>`;
    }).join('')}</div>`, VAKKEN.lezen.kleur);
}
function trainer(vt) {
  let vragen;
  if (vt === 'opzoeken') vragen = shuffle(OPZOEK).slice(0, 8).map(opzoekVraag);
  else {
    const pool = []; TEKSTEN.forEach(t => t.vragen.forEach(v => { if (v.vt === vt) pool.push(lezenVraag(t, v)); }));
    vragen = shuffle(pool).slice(0, 8);
  }
  const info = VRAAGTYPES[vt];
  go(`
    <button class="link-btn" data-go="lezen|trainer">← terug</button>
    <div class="panel intro" style="--c:var(--lezen)">
      <span class="tag">${info.emoji} Vraagtype-trainer</span>
      <h2>${info.naam}</h2>
      <p class="muted">Je herkent hem aan: ${esc(info.herken)}</p>
      <div class="uitleg-box"><b>🧠 Zo pak je het aan</b><ul>${info.aanpak.map(a => `<li>${a}</li>`).join('')}</ul></div>
      <div class="actions"><button class="btn" id="goTrainer">Start: ${vragen.length} vragen ▶</button></div>
    </div>`, VAKKEN.lezen.kleur);
  $('#goTrainer').onclick = () => startRonde({ titel: info.naam, kleur: VAKKEN.lezen.kleur, key: 'lezen:trainer-' + vt, vragen });
}

/* ---------------- OEFENTOETS ---------------- */
function maakToets() {
  const v = [];
  const taalTypes = shuffle(TAAL); for (let i = 0; i < 6; i++) v.push({ ...genVraag('taal', taalTypes[i % taalTypes.length]), vak: 'taal' });
  const rek = shuffle(REKENEN); for (let i = 0; i < 7; i++) v.push({ ...genVraag('reken', rek[i]), vak: 'reken' });
  const ko = KLOK.onderdelen.filter(o => ['vijf', 'digitaal', 'duur', 'minuut'].includes(o.id)); shuffle(ko).slice(0, 3).forEach(o => v.push({ ...genVraag('klok', o), vak: 'klok' }));
  const t = pick(TEKSTEN); shuffle(t.vragen.filter(q => q.t === 'mc')).slice(0, 5).forEach(q => v.push({ ...lezenVraag(t, q), vak: 'lezen' }));
  shuffle(OPZOEK).slice(0, 2).forEach(o => v.push({ ...opzoekVraag(o), vak: 'lezen' }));
  return v; // volgorde: taal, rekenen, klok, lezen – zoals de toets in blokken
}

const toetsRonde = () => startRonde({ titel: 'Oefentoets', kleur: 'var(--toets)', vragen: maakToets(), toets: true, opnieuw: toetsRonde });

/* ---------------- RONDE ---------------- */
function startRonde(cfg) {
  ronde = { ...cfg, i: 0, antwoorden: [], vragen: cfg.vragen };
  vraag();
}
function vraag() {
  const r = ronde, v = r.vragen[r.i];
  const dots = r.vragen.map((_, k) => `<i class="${k < r.i ? (r.toets ? 'now' : r.antwoorden[k].goed ? 'ok' : 'ko') : k === r.i ? 'now' : ''}"></i>`).join('');
  const tipHTML = Array.isArray(v.tip) ? `<ul style="margin:4px 0;padding-left:20px">${v.tip.map(t => `<li>${t}</li>`).join('')}</ul>` : (v.tip || '');
  const body = `
    <div class="row"><span class="tag">${v.tag || ''}</span>${!r.toets ? `<button class="link-btn tip-btn" id="tipBtn">💡 Hoe pak ik dit aan?</button>` : ''}</div>
    <div id="tipBox" class="tipline hidden">${tipHTML}</div>
    <h3 class="question">${v.q}</h3>
    ${v.zin ? `<div class="zinbox">${v.zin}</div>` : ''}
    ${v.visual ? `<div class="visual">${v.visual}</div>` : ''}
    <div id="answer">${antwoordVeld(v)}</div>
    <div id="feedback"></div>
    <div class="actions"><button class="btn hidden" id="nextBtn">${r.i + 1 < r.vragen.length ? 'Volgende ▶' : 'Bekijk je score ▶'}</button></div>`;

  go(`
    <div class="q-head">
      <button class="link-btn" data-act="stop">✕ stoppen</button>
      <span class="count">${r.titel} · vraag ${r.i + 1} van ${r.vragen.length}</span>
      <div class="dots">${dots}</div>
    </div>
    ${v.tekst ? `<div class="split">
        <div><button class="btn ghost small text-toggle" id="textToggle">📖 Tekst tonen</button><div class="tekst sticky collapsed" id="tekstBox">${tekstHTML(v.tekst, v.hl)}</div></div>
        <div class="panel">${body}</div></div>`
      : `<div class="panel">${body}</div>`}`, r.kleur);

  if (v.tekst) {
    const box = $('#tekstBox');
    if (window.matchMedia('(min-width: 761px)').matches) box.classList.remove('collapsed');
    $('#textToggle').onclick = () => { box.classList.toggle('collapsed'); $('#textToggle').textContent = box.classList.contains('collapsed') ? '📖 Tekst tonen' : '📖 Tekst verbergen'; };
    // op telefoon: vraag eerst, tekst eronder
    if (!window.matchMedia('(min-width: 761px)').matches) $('.split').prepend($('.split > .panel'));
    const eerste = box.querySelector('.hl'); if (eerste && !box.classList.contains('collapsed')) eerste.scrollIntoView({ block: 'center' });
  }
  const tb = $('#tipBtn'); if (tb) tb.onclick = () => $('#tipBox').classList.toggle('hidden');
  koppelAntwoord(v);
}

function antwoordVeld(v) {
  if (v.t === 'mc') return `<div class="opts${v.opts.every(o => strip(o).length < 22) ? ' two' : ''}">${v.opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="letter">${'ABCDEF'[k]}</span><span>${o}</span></button>`).join('')}</div>`;
  if (v.t === 'open') return `<textarea id="inp" placeholder="Schrijf hier je antwoord…"></textarea><div class="actions"><button class="btn" id="okBtn">Bekijk het goede antwoord</button></div>`;
  if (v.t === 'zet') return `<div class="klok-wrap"><div id="zetKlok"></div>
      <div class="row" style="justify-content:center">
        <button class="btn ghost small" data-z="-60">− 1 uur</button><button class="btn ghost small" data-z="-5">− 5 min</button><button class="btn ghost small" data-z="-1">− 1</button>
        <button class="btn ghost small" data-z="1">+ 1</button><button class="btn ghost small" data-z="5">+ 5 min</button><button class="btn ghost small" data-z="60">+ 1 uur</button>
      </div><p class="klok-hint">Sleep de rode wijzer rond of gebruik de knoppen.</p>
      <button class="btn" id="okBtn">Klaar ✓</button></div>`;
  const ph = v.t === 'tijd' ? 'bv. 14:40' : v.t === 'breuk' ? 'bv. 3/5' : v.t === 'num' ? 'antwoord' : 'typ hier';
  return `<form class="answer-row" id="frm" autocomplete="off"><input id="inp" ${v.t === 'num' ? 'inputmode="decimal"' : ''} placeholder="${ph}" autocapitalize="off" spellcheck="false">${v.unit ? `<span class="unit">${esc(v.unit)}</span>` : ''}<button class="btn" type="submit">Klaar ✓</button></form>`;
}

/* --- nakijken --- */
const getal = s => {
  s = String(s).replace(/€|euro|\s/gi, '').replace(/[a-z²]+$/i, '');
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return parseFloat(s.replace(',', '.'));
};
function check(v, inv) {
  if (v.t === 'num') return Math.abs(getal(inv) - Number(v.a)) < 0.001;
  if (v.t === 'breuk') {
    const m = String(inv).replace(/\s/g, '').match(/^(\d+)[/:](\d+)$/), [a, b] = v.a.split('/').map(Number);
    return !!m && Number(m[2]) > 0 && Math.abs(m[1] / m[2] - a / b) < 1e-9;
  }
  if (v.t === 'tijd') {
    const m = String(inv).trim().match(/^(\d{1,2})\D?(\d{2})$/); if (!m) return false;
    const [h, mm] = v.a.split(':').map(Number);
    return Number(m[1]) === h && Number(m[2]) === mm;
  }
  if (v.t === 'text') return String(inv).trim().toLowerCase().replace(/[.!?]+$/, '').replace(/\s+/g, ' ') === String(v.a).toLowerCase();
  return inv === v.a;
}
function toonAntwoord(v) {
  if (v.t === 'num') return `${R.k(Number(v.a))}${v.unit ? ' ' + v.unit : ''}`;
  return v.a;
}

function koppelAntwoord(v) {
  const klaar = (goed, gegeven) => afronden(v, goed, gegeven);
  if (v.t === 'mc') {
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const keuze = v.opts[b.dataset.k], goed = keuze === v.a;
      app.querySelectorAll('.opt').forEach(x => {
        x.disabled = true;
        if (ronde.toets) { if (x === b) x.classList.add('chosen'); return; }
        if (v.opts[x.dataset.k] === v.a) x.classList.add('good'); else if (x === b) x.classList.add('bad');
      });
      klaar(goed, keuze);
    });
  } else if (v.t === 'open') {
    $('#okBtn').onclick = () => {
      const tekst = $('#inp').value.trim();
      $('#inp').disabled = true; $('#okBtn').remove();
      $('#feedback').innerHTML = `<div class="model"><b>Voorbeeldantwoord:</b><br>${v.model}</div>
        <p><b>Vergelijk met jouw antwoord. Had je het goed?</b></p>
        <div class="row"><button class="btn" style="--c:var(--good)" id="zelfGoed">Ja, goed ✓</button><button class="btn ghost" style="--c:var(--bad)" id="zelfFout">Nog niet goed ✗</button></div>`;
      $('#zelfGoed').onclick = () => { $('#feedback').querySelector('.row').remove(); klaar(true, tekst || '(leeg)'); };
      $('#zelfFout').onclick = () => { $('#feedback').querySelector('.row').remove(); klaar(false, tekst || '(leeg)'); };
    };
  } else if (v.t === 'zet') {
    zetKlok(v, klaar);
  } else {
    const inp = $('#inp'); setTimeout(() => inp.focus({ preventScroll: true }), 50);
    $('#frm').onsubmit = e => {
      e.preventDefault();
      if (!inp.value.trim()) { inp.focus(); return; }
      inp.disabled = true; $('#frm button').disabled = true;
      const goed = check(v, inp.value);
      if (!ronde.toets) inp.style.borderColor = goed ? 'var(--good)' : 'var(--bad)';
      klaar(goed, inp.value.trim());
    };
  }
}

function zetKlok(v, klaar) {
  let T; do { T = R.ri(0, 143) * 5; } while (T === v.doel);
  const box = $('#zetKlok');
  const teken = () => {
    const h = Math.floor(T / 60), m = T % 60;
    box.innerHTML = KLOK.svg(h, m, 'zk');
    const svg = $('#zk');
    let vorig = null;
    const hoek = e => { const r = svg.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; return (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360; };
    svg.onpointerdown = e => { svg.setPointerCapture(e.pointerId); vorig = hoek(e); };
    svg.onpointermove = e => {
      if (vorig === null) return;
      const nu = hoek(e); let d = nu - vorig; if (d > 180) d -= 360; if (d < -180) d += 360;
      const dm = Math.round(d / 6); if (!dm) return;
      vorig += dm * 6; T = ((T + dm) % 720 + 720) % 720; update();
    };
    svg.onpointerup = svg.onpointercancel = () => { vorig = null; };
  };
  const update = () => {
    const h = Math.floor(T / 60), m = T % 60;
    $('#zk .hw').setAttribute('transform', `rotate(${(h + m / 60) * 30} 110 110)`);
    $('#zk .mw').setAttribute('transform', `rotate(${m * 6} 110 110)`);
  };
  teken();
  app.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { T = ((T + Number(b.dataset.z)) % 720 + 720) % 720; update(); });
  $('#okBtn').onclick = () => {
    $('#okBtn').disabled = true; app.querySelectorAll('[data-z]').forEach(b => b.disabled = true); $('#zk').onpointerdown = null;
    const h = Math.floor(T / 60), m = T % 60;
    klaar(T === v.doel % 720, `${KLOK.woorden(h || 12, m)}`);
  };
}

function afronden(v, goed, gegeven) {
  const r = ronde;
  r.antwoorden[r.i] = { goed, gegeven };
  telStat(v.key, goed);
  if (!r.toets) {
    goed ? sndGood() : sndBad();
    const extra = v.t === 'zet' && !goed ? `<div class="visual" style="margin-top:8px">${v.svgDoel}</div>` : '';
    if (v.t !== 'open') $('#feedback').innerHTML = `<div class="feedback ${goed ? 'good' : 'bad'}"><span class="fb-title">${goed ? pick(['Goed zo! 🎉', 'Top! ⭐', 'Helemaal goed! 🚀', 'Knap gedaan! 💪']) : `Helaas. Het goede antwoord is: ${toonAntwoord(v)}`}</span>${v.u || ''}${extra}</div>`;
    else $('#feedback').insertAdjacentHTML('beforeend', `<div class="feedback ${goed ? 'good' : 'bad'}"><span class="fb-title">${goed ? 'Goed zo! 🎉' : 'Kijk nog eens goed naar het voorbeeldantwoord.'}</span>Let op: antwoord in een hele zin en noem alles wat gevraagd wordt.</div>`);
  }
  save();
  const nb = $('#nextBtn'); nb.classList.remove('hidden');
  nb.onclick = () => { r.i++; r.i < r.vragen.length ? vraag() : resultaat(); };
  if (r.toets) nb.click(); else nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* ---------------- RESULTAAT ---------------- */
function resultaat() {
  const r = ronde, n = r.vragen.length, g = r.antwoorden.filter(a => a.goed).length, score = g / n;
  let stempel = null;
  if (score >= .7 && !r.geenStempel) {
    const vrij = LANDEN.map((_, i) => i).filter(i => !data.stempels.includes(i));
    if (vrij.length) { stempel = pick(vrij); data.stempels.push(stempel); }
  }
  if (r.tekstId) {
    const s = data.stats['tekst:' + r.tekstId] || { best: 0, max: n };
    s.best = Math.max(s.best, g); s.max = n; data.stats['tekst:' + r.tekstId] = s;
  }
  data.historie.push({ d: Date.now(), titel: r.titel, g, n });
  data.historie = data.historie.slice(-200);
  save();
  if (score >= .7) { sndWin(); confetti(stempel !== null ? [LANDEN[stempel].vlag, '⭐', '🎉'] : ['⭐', '🎉', '🚀']); }

  const emoji = score === 1 ? '🏆' : score >= .7 ? '🌟' : score >= .5 ? '👍' : '💪';
  const titel = score === 1 ? 'Alles goed!' : score >= .7 ? 'Goed gedaan!' : score >= .5 ? 'Bijna! Nog even oefenen.' : 'Blijf oefenen, je wordt steeds beter!';
  let perVak = '';
  if (r.toets) {
    perVak = `<div class="score-grid">${Object.entries(VAKKEN).map(([k, vk]) => {
      const idx = r.vragen.map((v, i) => v.vak === k ? i : -1).filter(i => i >= 0); if (!idx.length) return '';
      const gg = idx.filter(i => r.antwoorden[i].goed).length;
      return `<div style="--c:${vk.kleur}"><b>${gg} / ${idx.length}</b>${vk.emoji} ${vk.naam}</div>`;
    }).join('')}</div>`;
  }
  go(`
    <div class="panel result">
      <div class="r-emoji">${emoji}</div>
      <h2>${titel}</h2>
      <p style="font-size:1.3rem"><b>${g} van de ${n}</b> goed</p>
      ${perVak}
      ${stempel !== null ? `<div class="stamp"><span class="f">${LANDEN[stempel].vlag}</span><b>Nieuwe stempel: ${LANDEN[stempel].naam}!</b><small>Hoofdstad: ${LANDEN[stempel].stad}. ${LANDEN[stempel].feit}</small></div>`
        : r.geenStempel ? '' : score >= .7 ? '<p>Je paspoort is al helemaal vol! 🌍</p>' : `<p class="muted">Haal 7 of meer goed (70%) voor een nieuwe vlag-stempel.</p>`}
      <div class="actions center">
        ${r.opnieuw ? '<button class="btn" data-act="opnieuw">Nieuwe ronde ▶</button>' : ''}
        <button class="btn ghost" data-act="home">Naar het overzicht</button>
      </div>
    </div>
    <div class="panel" style="margin-top:16px">
      <h3>Nakijken</h3>
      <ol class="review">${r.vragen.map((v, i) => {
        const a = r.antwoorden[i];
        return `<li><span class="${a.goed ? 'ok' : 'ko'}">${a.goed ? '✓' : '✗'}</span> ${strip(v.q)}${v.zin ? ' <i>' + strip(v.zin) + '</i>' : ''}
          <small>Jouw antwoord: ${strip(a.gegeven)}${!a.goed && v.t !== 'open' ? ` · Goed: <b>${strip(toonAntwoord(v))}</b>` : ''}</small>
          ${!a.goed && v.u ? `<small>💡 ${strip(v.u)}</small>` : ''}${v.t === 'open' ? `<small>Voorbeeld: ${strip(v.model)}</small>` : ''}</li>`;
      }).join('')}</ol>
    </div>`, r.kleur);
}

/* ---------------- PASPOORT + VLAGGENQUIZ ---------------- */
function paspoort() {
  go(`
    <button class="link-btn" data-act="home">← terug</button>
    <h2>🛂 Mijn paspoort</h2>
    <p class="muted">${data.stempels.length} van de ${LANDEN.length} landen verzameld. Tik op een stempel voor een weetje.</p>
    <div class="actions" style="justify-content:flex-start"><button class="btn" style="--c:var(--toets)" data-act="vlagquiz">🚩 Bonus: raad de vlag</button></div>
    <div class="pp-grid" style="margin-top:14px">${LANDEN.map((l, i) => data.stempels.includes(i)
      ? `<div class="pp-cell" title="${esc(l.feit)}" data-feit="${i}"><span class="f">${l.vlag}</span><b>${l.naam}</b><span>${l.stad}</span></div>`
      : `<div class="pp-cell locked"><span class="f">${l.vlag}</span><b>?</b></div>`).join('')}</div>
    <div id="feitBox"></div>`);
  app.querySelectorAll('[data-feit]').forEach(c => c.onclick = () => {
    const l = LANDEN[c.dataset.feit];
    $('#feitBox').innerHTML = `<div class="panel" style="margin-top:14px;text-align:center"><div class="flagbig">${l.vlag}</div><h3>${l.naam}</h3><p>Hoofdstad: <b>${l.stad}</b></p><p>💡 ${l.feit}</p></div>`;
    $('#feitBox').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
function vlagQuiz() {
  const vragen = shuffle(LANDEN).slice(0, RONDE).map(l => {
    const soort = Math.random() < .7;
    const andere = shuffle(LANDEN.filter(x => x !== l)).slice(0, 3);
    return soort
      ? { q: 'Van welk land is deze vlag?', visual: `<span class="flagbig">${l.vlag}</span>`, t: 'mc', a: l.naam, opts: shuffle([l, ...andere].map(x => x.naam)), u: `Dit is de vlag van ${l.naam}. ${l.feit}`, tag: '🚩 Vlaggenquiz', key: 'bonus:vlag' }
      : { q: `Wat is de hoofdstad van ${l.naam}? ${l.vlag}`, t: 'mc', a: l.stad, opts: shuffle([l, ...andere].map(x => x.stad)), u: `De hoofdstad van ${l.naam} is ${l.stad}.`, tag: '🏙️ Hoofdsteden', key: 'bonus:stad' };
  });
  startRonde({ titel: 'Raad de vlag', kleur: 'var(--toets)', vragen, opnieuw: vlagQuiz, geenStempel: true });
}

/* ---------------- KLIKKEN ---------------- */
let resetKlik = 0;
app.addEventListener('click', e => {
  const el = e.target.closest('[data-act],[data-go],[data-start],[data-mix],[data-tekst],[data-lees]');
  if (!el) return;
  const d = el.dataset;
  if (d.go) { const [vak, id] = d.go.split('|'); return intro(vak, id); }
  if (d.start) {
    const [vak, id] = d.start.split('|'), o = lijst(vak).find(x => x.id === id);
    const nieuw = () => startRonde({ titel: o.naam, kleur: VAKKEN[vak].kleur, vragen: maakSet(vak, o), opnieuw: nieuw });
    return nieuw();
  }
  if (d.mix) { const vak = d.mix; const nieuw = () => startRonde({ titel: VAKKEN[vak].naam + ' mix', kleur: VAKKEN[vak].kleur, vragen: mixSet(vak), opnieuw: nieuw }); return nieuw(); }
  if (d.tekst) return leesTekst(d.tekst);
  if (d.lees) {
    const t = TEKSTEN.find(x => x.id === d.lees);
    return startRonde({ titel: t.titel, kleur: VAKKEN.lezen.kleur, tekstId: t.id, vragen: t.vragen.map(v => lezenVraag(t, v)), opnieuw: () => leesTekst(t.id) });
  }
  switch (d.act) {
    case 'home': return home();
    case 'paspoort': return paspoort();
    case 'vlagquiz': return vlagQuiz();
    case 'toets': return toetsRonde();
    case 'stop': return home();
    case 'opnieuw': return ronde.opnieuw();
    case 'reset':
      if (++resetKlik < 2) { el.textContent = 'Zeker weten? Tik nog een keer om alles te wissen'; setTimeout(() => { resetKlik = 0; if (el.isConnected) el.textContent = 'Alle voortgang wissen'; }, 4000); return; }
      resetKlik = 0; data = { stats: {}, stempels: [], historie: [], geluid: data.geluid }; save(); return home();
  }
});

home();
