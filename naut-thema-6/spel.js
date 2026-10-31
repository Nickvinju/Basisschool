/* =========================================================
   Naut thema 6 – leeroefeningen en oefentoets
   ========================================================= */

const $ = s => document.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- OPSLAG ---------------- */
const STORE = 'nautThema6_v1';
function load() {
  const leeg = { week: 0, bekend: {}, spellen: {}, toetsen: [], inv: { best: 0, level: 0 }, met: { best: 0, level: 0 }, geluid: true };
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

function confetti(set = ['⭐', '🏗️', '✨', '🔩', '🌉']) {
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

// Zin met het woord vet ('vet') of met een gat ('gat')
function zinHTML(w, vorm) {
  return esc(w.zin).replace(/\[([^\]]+)\]/g, (_, x) => vorm === 'gat' ? '<span class="gap">&nbsp;</span>' : `<b>${x}</b>`);
}

const kaal = s => s.replace(/^(de|het|een) /, '');

// Alleen een gatenzin als het woord er letterlijk in past (dus niet bij 'voertuigen' of 'schiet … wakker')
const zinPast = w => {
  const stukken = w.zin.match(/\[[^\]]+\]/g);
  return stukken.length === 1 && stukken[0] === `[${kaal(w.woord)}]`;
};

// Eén van de twee beschrijvingen: de betekenis of de voorbeeldzin met een gat
function beschrijving(w, soort = zinPast(w) ? pick(['betekenis', 'zin']) : 'betekenis') {
  return soort === 'betekenis'
    ? { soort, html: esc(w.betekenis), label: 'Betekenis' }
    : { soort, html: zinHTML(w, 'gat'), label: 'Zin' };
}

// Bij een gatenzin staat het lidwoord al in de zin, dus dan tonen we het woord zonder lidwoord
const woordVorm = (x, b) => b.soort === 'zin' ? kaal(x.woord) : x.woord;

const lijktOp = (a, b) => LIJKEN_OP.some(p => p.includes(a.woord) && p.includes(b.woord));

// Het goede woord plus (n-1) foute keuzes, liefst van dezelfde soort
function keuzesVoor(w, n = 4, pool = selectie()) {
  const mag = x => x !== w && !lijktOp(x, w);
  const zelfde = shuffle(pool.filter(x => mag(x) && x.soort === w.soort));
  const rest = shuffle(WOORDEN.filter(x => mag(x) && !zelfde.includes(x)));
  return shuffle([w, ...[...zelfde, ...rest].slice(0, n - 1)]);
}

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
  { id: 'lijst', emoji: '📋', naam: 'Begrippenlijst', uitleg: 'Bekijk alle begrippen met betekenis en zin, plus de samenvatting.', start: startLijst },
  { id: 'flits', emoji: '🃏', naam: 'Flitskaarten', uitleg: 'Weet jij wat het begrip betekent? Draai de kaart om.', start: startFlits },
  { id: 'koppel', emoji: '🔗', naam: 'Koppelen', uitleg: 'Zoek bij elk begrip de goede betekenis.', start: startKoppel }
];

function renderHome() {
  const chips = [{ id: 0, naam: 'Alles' }, ...WEKEN];
  $('#weekChips').innerHTML = chips.map(c =>
    `<button class="chip" data-w="${c.id}" aria-pressed="${data.week === c.id}">${esc(c.naam)}</button>`).join('');
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => { data.week = +c.dataset.w; save(); renderHome(); });
  const sel = selectie();
  const bekend = sel.filter(w => data.bekend[w.id]).length;
  $('#weekInfo').textContent = `${sel.length} begrippen · ${bekend} daarvan ken je al (flitskaarten)`;

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
      <span><b>Oefentoets</b><small>Meerkeuzevragen: kies het begrip bij de betekenis of de zin.</small>
      <small>${beste ? `🏆 Beste cijfer: ${beste.toFixed(1).replace('.', ',')} · ${data.toetsen.length}× gemaakt` : 'Nog niet gemaakt'}</small></span>
    </button>
    <button class="tile big" id="invTile" style="--tc:#6c4bd8">
      <span class="te">👾</span>
      <span><b>Woord-invaders</b><small>De begrippen vallen naar beneden. Schiet op het begrip dat bij de beschrijving hoort! 3 levels.</small>
      <small>${data.inv.best ? `🏆 Highscore: ${data.inv.best} · hoogste level: ${data.inv.level}` : 'Nog niet gespeeld'}</small></span>
    </button>
    <button class="tile big" id="metTile" style="--tc:#c2410c">
      <span class="te">☄️</span>
      <span><b>Meteorietenregen</b><small>Bescherm de aarde! Lees de betekenis en schiet de meteoriet met het goede begrip kapot. 3 levels.</small>
      <small>${data.met.best ? `🏆 Highscore: ${data.met.best} · hoogste level: ${data.met.level}` : 'Nog niet gespeeld'}</small></span>
    </button>`;
  $('#toetsTile').onclick = startToets;
  $('#invTile').onclick = () => startInvaders('invaders');
  $('#metTile').onclick = () => startInvaders('meteoor');
}

$('#resetBtn').onclick = () => {
  if (!confirm('Weet je zeker dat je alle voortgang van Naut thema 6 wilt wissen?')) return;
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
function startLijst() {
  oefening('📋 Begrippenlijst');
  const weken = WEKEN.filter(wk => !data.week || wk.id === data.week);
  $('#oefBody').innerHTML = weken.map(wk => `
    <h3 class="lijst-week">${esc(wk.naam)}</h3>
    <div class="lijst">${WOORDEN.filter(w => w.week === wk.id).map(w => `
      <div class="lijst-item">
        <span class="soort">${esc(w.soort)}</span>
        <h3>${esc(w.woord)}</h3>
        <p>${esc(w.betekenis)}</p>
        <p class="zin">${zinHTML(w, 'vet')}</p>
      </div>`).join('')}</div>
    <div class="samenvatting"><b>Samenvatting</b><p>${SAMENVATTING.find(s => s.week === wk.id).tekst}</p></div>`).join('');
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
        tekst: `Je wist <b>${meteen}</b> van de ${totaal} begrippen meteen.`, opnieuw: startFlits
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
      <p class="muted">Tik op een begrip en daarna op de betekenis die erbij hoort.</p>
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

/* ================= OEFENTOETS ================= */
function woordVraag(w, soort) {
  const b = beschrijving(w, soort);
  return {
    soort: b.soort,
    vraag: b.soort === 'betekenis' ? 'Welk begrip hoort bij deze betekenis?' : 'Welk begrip past in de zin?',
    clue: b.html, label: b.label,
    opties: keuzesVoor(w).map(x => woordVorm(x, b)),
    goed: woordVorm(w, b),
    uitleg: `${w.woord}: ${w.betekenis}`
  };
}

function startToets() {
  const sel = shuffle(selectie());
  const wv = sel.slice(0, 15).map(w => woordVraag(w));
  // Eén les heeft maar 4 of 5 begrippen: dan komt elk begrip ook met de andere beschrijving terug
  const extra = sel.filter(zinPast).slice(0, 15 - wv.length)
    .map(w => woordVraag(w, wv[sel.indexOf(w)].soort === 'zin' ? 'betekenis' : 'zin'));
  const vragen = shuffle([...wv, ...extra]);
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
      }).join('')}</ol>${fout.length ? '<p class="muted">Tip: oefen de foute begrippen nog eens met de flitskaarten.</p>' : ''}`,
      opnieuw: startToets
    });
  }
  vraag();
}

renderHome();
