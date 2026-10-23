/* =========================================================
   Woorden blok 2 – leeroefeningen en oefentoets
   ========================================================= */

const $ = s => document.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- OPSLAG ---------------- */
const STORE = 'woordenBlok2_v1';
function load() {
  const leeg = { week: 0, bekend: {}, spellen: {}, toetsen: [], inv: { best: 0, level: 0 }, geluid: true };
  try { return Object.assign(leeg, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch { return leeg; }
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* geen opslag */ } }
let data = load();

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
      g.gain.setValueAtTime(.16, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); t += d * .8;
    });
  } catch { /* geen geluid */ }
}
const sndGood = () => beep([[700, .1], [1050, .18]]);
const sndBad = () => beep([[260, .2, 'triangle'], [200, .25, 'triangle']]);
const sndWin = () => beep([[523, .12], [659, .12], [784, .12], [1047, .3]]);
const sndFlip = () => beep([[500, .06]]);

function confetti(set = ['⭐', '🔤', '✨', '🌟', '📚']) {
  const box = $('#confetti');
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    s.textContent = pick(set);
    s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDelay = Math.random() * .5 + 's';
    box.appendChild(s);
    setTimeout(() => s.remove(), 2600);
  }
}

$('#soundBtn').onclick = () => { data.geluid = !data.geluid; save(); $('#soundBtn').textContent = data.geluid ? '🔊' : '🔇'; };
$('#soundBtn').textContent = data.geluid ? '🔊' : '🔇';

/* ---------------- WOORD-HULPJES ---------------- */
const selectie = () => WOORDEN.filter(w => !data.week || w.week === data.week);
// In les 7-9 worden de clusters van week 1 en 2 herhaald, dus dan doen ze allemaal mee
const clusterSel = () => CLUSTERS.filter(c => !data.week || data.week === 3 || c.week === data.week);

// Zin met het woord vet ('vet') of met een gat ('gat')
function zinHTML(w, vorm) {
  return esc(w.zin).replace(/\[([^\]]+)\]/g, (_, x) => vorm === 'gat' ? '<span class="gap">&nbsp;</span>' : `<b>${x}</b>`);
}

// Eén van de twee beschrijvingen: de betekenis of de voorbeeldzin met een gat
function beschrijving(w, soort = pick(['betekenis', 'zin'])) {
  return soort === 'betekenis'
    ? { soort, html: esc(w.betekenis), label: 'Betekenis' }
    : { soort, html: zinHTML(w, 'gat'), label: 'Zin' };
}

const lijktOp = (a, b) => LIJKEN_OP.some(p => p.includes(a.woord) && p.includes(b.woord));

// Het goede woord plus (n-1) foute keuzes, liefst van dezelfde soort
function keuzesVoor(w, n = 4, pool = selectie()) {
  const mag = x => x !== w && !lijktOp(x, w);
  const zelfde = shuffle(pool.filter(x => mag(x) && x.soort === w.soort));
  const rest = shuffle(WOORDEN.filter(x => mag(x) && !zelfde.includes(x)));
  return shuffle([w, ...[...zelfde, ...rest].slice(0, n - 1)]);
}

const normaal = s => s.toLowerCase().replace(/[.!?,-]/g, '').replace(/\s+/g, ' ').trim();
const zonderLidwoord = s => s.replace(/^(de|het|een) /, '');

const sterren = (n, max = 3) => '★'.repeat(n) + '☆'.repeat(max - n);
const sterrenVoorFouten = (fouten, grens) => fouten <= grens[0] ? 3 : fouten <= grens[1] ? 2 : 1;

/* ---------------- SCHERMEN ---------------- */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  $('#' + id).classList.remove('hidden');
  scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-home]').forEach(b => b.onclick = goHome);
function goHome() { stopToetsen(); show('home'); renderHome(); }

let toetsKeys = null;
function stopToetsen() { if (toetsKeys) { removeEventListener('keydown', toetsKeys); toetsKeys = null; } }

function oefening(titel, teller = '', procent = 0) {
  $('#oefTitel').textContent = titel;
  $('#oefTeller').textContent = teller;
  $('#oefTeller').classList.toggle('hidden', !teller);
  $('#oefBalk').style.width = procent + '%';
  show('oefening');
}

const LEREN = [
  { id: 'lijst', emoji: '📋', naam: 'Woordenlijst', uitleg: 'Bekijk alle woorden, betekenissen, zinnen en clusters.', start: startLijst },
  { id: 'flits', emoji: '🃏', naam: 'Flitskaarten', uitleg: 'Weet jij wat het woord betekent? Draai de kaart om.', start: startFlits },
  { id: 'koppel', emoji: '🔗', naam: 'Koppelen', uitleg: 'Zoek bij elk woord de goede betekenis.', start: startKoppel },
  { id: 'typen', emoji: '✏️', naam: 'Woord typen', uitleg: 'Lees de betekenis en typ het woord goed.', start: startTypen },
  { id: 'clusters', emoji: '🧺', naam: 'Woordclusters', uitleg: 'Sorteer de woorden bij het goede cluster.', start: startClusters }
];

function renderHome() {
  const chips = [{ id: 0, naam: 'Alles' }, ...WEKEN];
  $('#weekChips').innerHTML = chips.map(c =>
    `<button class="chip" data-w="${c.id}" aria-pressed="${data.week === c.id}">${esc(c.naam)}</button>`).join('');
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => { data.week = +c.dataset.w; save(); renderHome(); });
  const sel = selectie();
  const bekend = sel.filter(w => data.bekend[w.id]).length;
  $('#weekInfo').textContent = `${sel.length} woorden · ${bekend} daarvan ken je al (flitskaarten) · ${clusterSel().length} woordclusters`;

  $('#leerTiles').innerHTML = LEREN.map(g => {
    const st = data.spellen[g.id];
    return `<button class="tile" data-l="${g.id}" style="--tc:var(--teal)">
      <span class="te">${g.emoji}</span>
      <span><b>${esc(g.naam)}</b><small>${esc(g.uitleg)}</small>${st ? `<span class="ts">${sterren(st)}</span>` : ''}</span>
    </button>`;
  }).join('');
  document.querySelectorAll('[data-l]').forEach(t => t.onclick = () => LEREN.find(g => g.id === t.dataset.l).start());

  const beste = data.toetsen.reduce((m, t) => Math.max(m, t.cijfer), 0);
  $('#speelTiles').innerHTML = `
    <button class="tile big" id="toetsTile">
      <span class="te">📝</span>
      <span><b>Oefentoets</b><small>15 meerkeuzevragen: kies het woord bij de betekenis of de zin, plus vragen over de woordclusters.</small>
      <small>${beste ? `🏆 Beste cijfer: ${beste.toFixed(1).replace('.', ',')} · ${data.toetsen.length}× gemaakt` : 'Nog niet gemaakt'}</small></span>
    </button>
    <button class="tile big" id="invTile" style="--tc:#6c4bd8">
      <span class="te">👾</span>
      <span><b>Woord-invaders</b><small>De woorden vallen naar beneden. Schiet op het woord dat bij de beschrijving hoort! 3 levels.</small>
      <small>${data.inv.best ? `🏆 Highscore: ${data.inv.best} · hoogste level: ${data.inv.level}` : 'Nog niet gespeeld'}</small></span>
    </button>`;
  $('#toetsTile').onclick = startToets;
  $('#invTile').onclick = () => startInvaders();
}

$('#resetBtn').onclick = () => {
  if (!confirm('Weet je zeker dat je alle voortgang van Woorden blok 2 wilt wissen?')) return;
  const geluid = data.geluid;
  try { localStorage.removeItem(STORE); } catch { /* geen opslag */ }
  data = load(); data.geluid = geluid; save(); renderHome();
};

/* ---------------- UITSLAG ---------------- */
function toonUitslag({ emoji, titel, ster, cijfer, tekst, nakijken = '', opnieuw }) {
  $('#resEmoji').textContent = emoji;
  $('#resTitel').textContent = titel;
  $('#resSterren').innerHTML = cijfer != null
    ? `<div class="cijfer">${cijfer.toFixed(1).replace('.', ',')}</div>`
    : ster ? sterren(ster) : '';
  $('#resTekst').innerHTML = tekst;
  $('#resNakijken').innerHTML = nakijken;
  $('#resOpnieuw').onclick = opnieuw;
  show('uitslag');
  if ((ster || 0) >= 3 || (cijfer || 0) >= 8) { sndWin(); confetti(); }
}

function bewaarSterren(id, st) { data.spellen[id] = Math.max(data.spellen[id] || 0, st); save(); }

/* ================= 1. WOORDENLIJST ================= */
function clusterHTML(cs) {
  return `<div class="clusters">${cs.map(c => `
    <div class="cluster"><span class="kop">${esc(c.kop)}</span>
      <ul>${c.leden.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}

function startLijst() {
  oefening('📋 Woordenlijst');
  const weken = WEKEN.filter(wk => !data.week || wk.id === data.week);
  $('#oefBody').innerHTML = weken.map(wk => `
    <h3 class="lijst-week">${esc(wk.naam)}</h3>
    <div class="lijst">${WOORDEN.filter(w => w.week === wk.id).map(w => `
      <div class="lijst-item">
        <span class="soort">${esc(w.soort)}</span>
        <h3>${esc(w.woord)}</h3>
        <p>${esc(w.betekenis)}</p>
        <p class="zin">${zinHTML(w, 'vet')}</p>
      </div>`).join('')}</div>`).join('') + `
    <h3 class="lijst-week">🧺 Woordclusters</h3>
    <p class="muted">Woorden in hetzelfde cluster betekenen bijna hetzelfde of horen bij elkaar.</p>
    ${clusterHTML(clusterSel())}`;
  $('#oefBalk').style.width = '100%';
}

/* ================= 2. FLITSKAARTEN ================= */
function startFlits() {
  const rij = shuffle(selectie());
  const totaal = rij.length;
  let meteen = 0, gehad = new Set();

  function kaart() {
    if (!rij.length) {
      bewaarSterren('flits', meteen === totaal ? 3 : meteen >= totaal * .7 ? 2 : 1);
      return toonUitslag({
        emoji: '🃏', titel: 'Alle kaarten gehad!', ster: data.spellen.flits,
        tekst: `Je wist <b>${meteen}</b> van de ${totaal} woorden meteen.`, opnieuw: startFlits
      });
    }
    const w = rij[0];
    oefening('🃏 Flitskaarten', `nog ${rij.length}`, Math.round((totaal - rij.length) / totaal * 100));
    $('#oefBody').innerHTML = `
      <div class="flip" id="flip" role="button" tabindex="0" aria-label="Draai de kaart om">
        <div class="flip-inner">
          <div class="flip-face"><span class="tag">${esc(w.soort)}</span><div class="flip-word">${esc(w.woord)}</div>
            <div class="flip-hint">Weet je wat het betekent? Tik om de kaart om te draaien.</div></div>
          <div class="flip-face back"><div class="flip-word">${esc(w.woord)}</div><div class="flip-mean">${esc(w.betekenis)}</div>
            <div class="zin">${zinHTML(w, 'vet')}</div></div>
        </div>
      </div>
      <div class="actions center hidden" id="flitsKnoppen">
        <button class="btn ghost" id="nogNiet">🔁 Nog niet</button>
        <button class="btn teal" id="wistHet">✅ Ik wist het</button>
      </div>`;
    const draai = () => { $('#flip').classList.toggle('open'); $('#flitsKnoppen').classList.remove('hidden'); sndFlip(); };
    $('#flip').onclick = draai;
    $('#flip').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); draai(); } };
    $('#wistHet').onclick = () => {
      if (!gehad.has(w.id)) meteen++;
      data.bekend[w.id] = true; save(); sndGood(); rij.shift(); kaart();
    };
    $('#nogNiet').onclick = () => {
      gehad.add(w.id); data.bekend[w.id] = false; save();
      rij.shift(); rij.splice(Math.min(3, rij.length), 0, w); kaart(); // komt over een paar kaarten terug
    };
  }
  kaart();
}

/* ================= 3. KOPPELEN ================= */
function startKoppel() {
  const RONDES = 3, PER = 5;
  const woorden = shuffle(selectie()).slice(0, RONDES * PER);
  let ronde = 0, fouten = 0;

  function speelRonde() {
    const set = woorden.slice(ronde * PER, ronde * PER + PER);
    if (!set.length) {
      const st = sterrenVoorFouten(fouten, [1, 4]);
      bewaarSterren('koppel', st);
      return toonUitslag({ emoji: '🔗', titel: 'Alles gekoppeld!', ster: st, tekst: `Je maakte ${fouten} ${fouten === 1 ? 'fout' : 'fouten'}.`, opnieuw: startKoppel });
    }
    oefening('🔗 Koppelen', `ronde ${ronde + 1} van ${Math.ceil(woorden.length / PER)}`, Math.round(ronde / Math.ceil(woorden.length / PER) * 100));
    $('#oefBody').innerHTML = `
      <p class="muted">Tik op een woord en daarna op de betekenis die erbij hoort.</p>
      <div class="match">
        <div class="match-col">${shuffle(set).map(w => `<button class="opt" data-k="w" data-id="${w.id}">${esc(w.woord)}</button>`).join('')}</div>
        <div class="match-col">${shuffle(set).map(w => `<button class="opt" data-k="b" data-id="${w.id}">${esc(w.betekenis)}</button>`).join('')}</div>
      </div>`;
    let gekozen = null, klaar = 0;
    document.querySelectorAll('.match .opt').forEach(b => b.onclick = () => {
      if (!gekozen || gekozen.dataset.k === b.dataset.k) {
        if (gekozen) gekozen.classList.remove('sel');
        gekozen = b; b.classList.add('sel'); return;
      }
      if (gekozen.dataset.id === b.dataset.id) {
        sndGood(); gekozen.classList.add('done'); b.classList.add('done'); klaar++;
        if (klaar === set.length) { ronde++; setTimeout(speelRonde, 500); }
      } else {
        sndBad(); fouten++;
        [gekozen, b].forEach(x => { x.classList.add('shake'); setTimeout(() => x.classList.remove('shake'), 400); });
      }
      gekozen.classList.remove('sel'); gekozen = null;
    });
  }
  speelRonde();
}

/* ================= 4. WOORD TYPEN ================= */
function startTypen() {
  const rij = shuffle(selectie()).slice(0, 8);
  let i = 0, punten = 0;
  const lijst = [];

  function vraag() {
    if (i >= rij.length) {
      const st = punten >= rij.length - .5 ? 3 : punten >= rij.length * .6 ? 2 : 1;
      bewaarSterren('typen', st);
      return toonUitslag({
        emoji: '✏️', titel: 'Klaar met typen!', ster: st,
        tekst: `Je had er <b>${String(punten).replace('.', ',')}</b> van de ${rij.length} punten.`,
        nakijken: `<ol class="review">${lijst.join('')}</ol>`, opnieuw: startTypen
      });
    }
    const w = rij[i];
    let pogingen = 0, hints = 0;
    oefening('✏️ Woord typen', `${i + 1} van ${rij.length}`, Math.round(i / rij.length * 100));
    $('#oefBody').innerHTML = `
      <div class="panel">
        <div class="clue"><span class="soort">${esc(w.soort)}</span>${esc(w.betekenis)}</div>
        <p class="zin">${zinHTML(w, 'gat')}</p>
        <form class="type-row" id="typForm" autocomplete="off">
          <input id="typIn" placeholder="Typ hier het woord…" autocapitalize="off" spellcheck="false" aria-label="Typ het woord">
          <button class="btn" type="submit">Check ✔</button>
        </form>
        <div class="hint-letters" id="hintRegel"></div>
        <div id="typFb" class="feedback hidden"></div>
        <div class="actions">
          <button class="btn ghost small" id="hintBtn" type="button">💡 Hint</button>
          <button class="btn hidden" id="typVolgende" type="button">Volgende ▶</button>
        </div>
      </div>`;
    const inp = $('#typIn'); inp.focus();
    const doel = zonderLidwoord(w.woord).replace(/-$/, '');
    $('#hintBtn').onclick = () => {
      hints = Math.min(hints + 1, doel.length - 1);
      $('#hintRegel').textContent = [...doel].map((c, k) => c === ' ' ? ' ' : k < hints ? c : '_').join('');
      inp.focus();
    };
    const klaar = (goed) => {
      const p = goed ? (pogingen === 1 && !hints ? 1 : .5) : 0;
      punten += p;
      lijst.push(`<li><span class="${goed ? 'ok' : 'nok'}">${goed ? '✔' : '✘'}</span> <b>${esc(w.woord)}</b>: ${esc(w.betekenis)}</li>`);
      $('#typFb').className = 'feedback ' + (goed ? 'good' : 'bad');
      $('#typFb').innerHTML = goed ? `✅ Goed zo! <b>${esc(w.woord)}</b>` : `Het goede woord is: <b>${esc(w.woord)}</b>`;
      inp.disabled = true; $('#hintBtn').classList.add('hidden');
      $('#typVolgende').classList.remove('hidden'); $('#typVolgende').focus();
      goed ? sndGood() : sndBad();
    };
    $('#typForm').onsubmit = e => {
      e.preventDefault();
      if (inp.disabled || !inp.value.trim()) return;
      pogingen++;
      const in_ = normaal(inp.value);
      if (in_ === normaal(w.woord) || in_ === normaal(doel)) return klaar(true);
      if (pogingen >= 2) return klaar(false);
      sndBad();
      $('#typFb').className = 'feedback bad';
      $('#typFb').textContent = 'Nog niet goed. Kijk goed naar de spelling en probeer het nog een keer!';
      inp.select();
    };
    $('#typVolgende').onclick = () => { i++; vraag(); };
  }
  vraag();
}

/* ================= 5. WOORDCLUSTERS SORTEREN ================= */
function startClusters() {
  const weken = [...new Set(clusterSel().map(c => c.week))];
  let r = 0, fouten = 0;

  function ronde() {
    if (r >= weken.length) {
      const st = sterrenVoorFouten(fouten, [0, 2]);
      bewaarSterren('clusters', st);
      return toonUitslag({
        emoji: '🧺', titel: 'Alle clusters gesorteerd!', ster: st,
        tekst: `Je maakte ${fouten} ${fouten === 1 ? 'fout' : 'fouten'}. Zo horen ze bij elkaar:`,
        nakijken: clusterHTML(clusterSel()), opnieuw: startClusters
      });
    }
    const cs = CLUSTERS.filter(c => c.week === weken[r]);
    const kaarten = shuffle(cs.flatMap((c, ci) => c.leden.map(l => ({ l, ci }))));
    oefening('🧺 Woordclusters', `week ${weken[r]}`, Math.round(r / weken.length * 100));
    $('#oefBody').innerHTML = `
      <p class="muted">Tik op een woord en daarna op het cluster waar het bij hoort.</p>
      <div class="sort-cards" id="kaarten">${kaarten.map((k, i) => `<button class="sort-card" data-i="${i}">${esc(k.l)}</button>`).join('')}</div>
      <div class="bins">${cs.map((c, ci) => `<button class="bin" data-ci="${ci}"><span class="kop">${esc(c.kop)}</span><ul></ul></button>`).join('')}</div>
      <div class="actions"><button class="btn hidden" id="clVolgende">Volgende ▶</button></div>`;
    let gekozen = null, over = kaarten.length;
    document.querySelectorAll('.sort-card').forEach(b => b.onclick = () => {
      if (gekozen) gekozen.classList.remove('sel');
      gekozen = b; b.classList.add('sel');
    });
    document.querySelectorAll('.bin').forEach(bin => bin.onclick = () => {
      if (!gekozen) return;
      const k = kaarten[+gekozen.dataset.i];
      if (k.ci === +bin.dataset.ci) {
        sndGood();
        bin.querySelector('ul').insertAdjacentHTML('beforeend', `<li>${esc(k.l)}</li>`);
        gekozen.remove(); gekozen = null;
        if (--over === 0) { $('#clVolgende').classList.remove('hidden'); $('#clVolgende').focus(); }
      } else {
        sndBad(); fouten++;
        const g = gekozen; g.classList.remove('sel'); g.classList.add('shake');
        setTimeout(() => g.classList.remove('shake'), 400); gekozen = null;
      }
    });
    $('#clVolgende').onclick = () => { r++; ronde(); };
  }
  ronde();
}

/* ================= OEFENTOETS ================= */
function clusterVraag(c) {
  const rij = [c.kop, ...c.leden];
  const goed = pick(rij);
  const anderen = CLUSTERS.filter(x => x !== c);
  const tegenover = shuffle(anderen.filter(x => x.paar === c.paar).flatMap(x => [x.kop, ...x.leden]));
  const rest = shuffle(anderen.filter(x => x.paar !== c.paar).flatMap(x => [x.kop, ...x.leden]));
  const fout = [...new Set([...tegenover.slice(0, 2), ...rest])].filter(x => !rij.includes(x)).slice(0, 3);
  return {
    soort: 'cluster',
    vraag: 'Welk woord hoort in dit woordcluster?',
    clue: rij.map(x => x === goed ? '<span class="gap">&nbsp;</span>' : `<b>${esc(x)}</b>`).join(' · '),
    label: 'Woordcluster',
    opties: shuffle([goed, ...fout]),
    goed,
    uitleg: `${rij.join(' · ')}`
  };
}

function woordVraag(w) {
  const b = beschrijving(w);
  return {
    soort: b.soort,
    vraag: b.soort === 'betekenis' ? 'Welk woord hoort bij deze betekenis?' : 'Welk woord past in de zin?',
    clue: b.html, label: b.label,
    opties: keuzesVoor(w).map(x => x.woord),
    goed: w.woord,
    uitleg: `${w.woord}: ${w.betekenis}`
  };
}

function startToets() {
  const cs = clusterSel();
  const aantalCl = cs.length ? 3 : 0;
  const vragen = shuffle([
    ...shuffle(selectie()).slice(0, 15 - aantalCl).map(woordVraag),
    ...shuffle(cs).slice(0, aantalCl).map(clusterVraag)
  ]);
  let i = 0;
  const antwoorden = [];

  function vraag() {
    if (i >= vragen.length) return uitslag();
    const v = vragen[i];
    oefening('📝 Oefentoets', `vraag ${i + 1} van ${vragen.length}`, Math.round(i / vragen.length * 100));
    $('#oefBody').innerHTML = `
      <div class="panel">
        <h3 class="question">${esc(v.vraag)}</h3>
        <div class="clue"><span class="soort">${esc(v.label)}</span>${v.clue}</div>
        <div class="opts">${v.opties.map((o, k) => `<button class="opt" data-o="${k}"><span class="key">${k + 1}</span>${esc(o)}</button>`).join('')}</div>
      </div>`;
    const knoppen = [...document.querySelectorAll('.opt')];
    const kies = k => {
      if (knoppen[0].disabled) return;
      knoppen.forEach(b => b.disabled = true);
      knoppen[k].classList.add('sel');
      knoppen[k].style.borderColor = 'var(--teal)';
      antwoorden.push({ v, gekozen: v.opties[k] });
      sndFlip();
      setTimeout(() => { i++; vraag(); }, 450);
    };
    knoppen.forEach((b, k) => b.onclick = () => kies(k));
    stopToetsen();
    toetsKeys = e => { const n = +e.key; if (n >= 1 && n <= knoppen.length) kies(n - 1); };
    addEventListener('keydown', toetsKeys);
  }

  function uitslag() {
    stopToetsen();
    const goed = antwoorden.filter(a => a.gekozen === a.v.goed).length;
    const cijfer = Math.round((1 + 9 * goed / vragen.length) * 10) / 10;
    data.toetsen.push({ cijfer, week: data.week, goed, totaal: vragen.length, datum: Date.now() });
    save();
    const fout = antwoorden.filter(a => a.gekozen !== a.v.goed);
    toonUitslag({
      emoji: cijfer >= 8 ? '🏆' : cijfer >= 5.5 ? '👍' : '💪',
      titel: cijfer >= 8 ? 'Super gedaan!' : cijfer >= 5.5 ? 'Voldoende!' : 'Blijf oefenen!',
      cijfer,
      tekst: `Je had <b>${goed}</b> van de ${vragen.length} vragen goed.`,
      nakijken: `<h3>Nakijken</h3><ol class="review">${antwoorden.map(a => {
        const ok = a.gekozen === a.v.goed;
        return `<li><span class="${ok ? 'ok' : 'nok'}">${ok ? '✔' : '✘'}</span> ${a.v.clue}<br>
          ${ok ? '' : `Jij koos: <s>${esc(a.gekozen)}</s> · `}Goed: <b>${esc(a.v.goed)}</b></li>`;
      }).join('')}</ol>${fout.length ? '<p class="muted">Tip: oefen de foute woorden nog eens met de flitskaarten.</p>' : ''}`,
      opnieuw: startToets
    });
  }
  vraag();
}

renderHome();
