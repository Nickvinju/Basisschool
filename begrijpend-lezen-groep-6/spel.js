/* =========================================================
   Leesraket – spellogica
   ========================================================= */

const $ = s => document.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = s => String(s).replace(/<[^>]+>/g, '');

/* ---------------- OPSLAG ---------------- */
const STORE = 'leesraket_v1';
function load() {
  const leeg = { teksten: {}, spellen: {}, vaardig: {}, historie: [], geluid: true };
  try { return Object.assign(leeg, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch { return leeg; }
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* geen opslag */ } }
let data = load();

const MAX_STERREN = TEKSTEN.length * 3 + SPELLEN.length * 3;
const totaalSterren = () =>
  Object.values(data.teksten).reduce((a, b) => a + b, 0) + Object.values(data.spellen).reduce((a, b) => a + b, 0);

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
const sndLaunch = () => beep([[200, .15, 'sawtooth'], [400, .15, 'sawtooth'], [800, .3, 'sawtooth']]);

function confetti(set = ['⭐', '🚀', '🪐', '✨', '🌟']) {
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

/* twinkelende sterren op de achtergrond */
(function stars() {
  const c = $('#stars'), ctx = c.getContext('2d');
  let pts = [];
  const resize = () => {
    c.width = innerWidth * devicePixelRatio; c.height = innerHeight * devicePixelRatio;
    pts = Array.from({ length: 120 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.6 + .3, p: Math.random() * 6 }));
  };
  resize(); addEventListener('resize', resize);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = t => {
    ctx.clearRect(0, 0, c.width, c.height);
    pts.forEach(s => {
      ctx.globalAlpha = still ? .7 : .4 + .6 * Math.abs(Math.sin(t / 1400 + s.p));
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r * devicePixelRatio, 0, 7); ctx.fill();
    });
    if (!still) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
})();

/* ---------------- SCHERMEN ---------------- */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  $('#' + id).classList.remove('hidden');
  scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-home]').forEach(b => b.onclick = goHome);

function goHome() { show('home'); renderHome(); }

function sterrenTekst(n, max = 3) { return '★'.repeat(n) + '☆'.repeat(max - n); }

function renderHome() {
  const tot = totaalSterren();
  $('#fuelNum').textContent = tot;
  $('#fuelMax').textContent = MAX_STERREN;
  $('#fuelBar').style.width = Math.round(tot / MAX_STERREN * 100) + '%';
  const doel = tot >= MAX_STERREN ? 'Je hebt de rand van het heelal bereikt! 🌌'
    : tot >= 36 ? 'Bijna bij Neptunus! Nog een paar sterren…'
    : tot >= 24 ? 'Je vliegt langs Saturnus 🪐 Ga zo door!'
    : tot >= 12 ? 'Je bent voorbij de maan 🌕 Op naar Mars!'
    : 'Verdien sterren met lezen en vlieg naar de verste planeet!';
  $('#fuelText').textContent = doel;

  $('#planets').innerHTML = ONDERWERPEN_LEZEN.map(o => {
    const tx = TEKSTEN.filter(t => t.onderwerp === o.id);
    const st = tx.reduce((a, t) => a + (data.teksten[t.id] || 0), 0);
    return `<button class="planet" data-o="${o.id}" style="--pc:${o.kleur}">
      <span class="planet-ball">${o.emoji}</span><b>${esc(o.naam)}</b>
      <small>⭐ ${st} / ${tx.length * 3}</small></button>`;
  }).join('');
  document.querySelectorAll('.planet').forEach(p => p.onclick = () => openTopic(p.dataset.o));

  $('#games').innerHTML = SPELLEN.map(g => `
    <button class="game-tile" data-g="${g.id}">
      <span class="ge">${g.emoji}</span>
      <span><b>${esc(g.naam)}</b><small>${esc(g.uitleg)}</small><br><span class="gs">${sterrenTekst(data.spellen[g.id] || 0)}</span></span>
    </button>`).join('');
  document.querySelectorAll('.game-tile').forEach(g => g.onclick = () => startMini(g.dataset.g));

  $('#skills').innerHTML = Object.entries(VAARDIGHEDEN).map(([k, v]) => {
    const [goed, tot] = data.vaardig[k] || [0, 0];
    const pct = tot ? Math.round(goed / tot * 100) : 0;
    return `<div class="skill-row"><span>${v.emoji}</span><span>${esc(v.naam)}</span>
      <span class="bar"><span style="width:${pct}%"></span></span><span class="pct">${tot ? pct + '%' : '–'}</span></div>`;
  }).join('');
}

/* twee keer tikken om te bevestigen (pop-ups werken niet overal) */
function confirmTap(btn, vraag, actie) {
  if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = btn.dataset.orig; actie(); return; }
  btn.dataset.orig = btn.textContent; btn.dataset.armed = '1'; btn.textContent = vraag;
  setTimeout(() => { if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = btn.dataset.orig; } }, 3000);
}
$('#resetBtn').onclick = e => confirmTap(e.currentTarget, 'Echt alles wissen? Tik nog een keer', () => {
  data = Object.assign(load(), { teksten: {}, spellen: {}, vaardig: {}, historie: [] }); save(); renderHome();
});

$('#randomBtn').onclick = () => {
  // kies een tekst met de minste sterren
  const min = Math.min(...TEKSTEN.map(t => data.teksten[t.id] || 0));
  openText(pick(TEKSTEN.filter(t => (data.teksten[t.id] || 0) === min)).id);
};

/* ---------------- ONDERWERP ---------------- */
let huidigOnderwerp = null;
function openTopic(id) {
  huidigOnderwerp = id;
  const o = ONDERWERPEN_LEZEN.find(x => x.id === id);
  show('topic');
  $('#topicTitle').textContent = `${o.emoji} ${o.naam}`;
  $('#textCards').innerHTML = TEKSTEN.filter(t => t.onderwerp === id).map(t => `
    <button class="text-card" data-t="${t.id}">
      <span class="te">${t.emoji}</span>
      <span><b>${esc(t.titel)}</b><small>${sterrenTekst(data.teksten[t.id] || 0)}</small></span>
      <span class="go">Lezen ▶</span>
    </button>`).join('');
  document.querySelectorAll('.text-card').forEach(c => c.onclick = () => openText(c.dataset.t));
}

/* ---------------- LEZEN ---------------- */
const LEESTIPS = [
  'Lees eerst de titel. Waar denk je dat de tekst over gaat?',
  'Vraag jezelf na elke alinea af: waar ging dit stukje over?',
  'Kom je een moeilijk woord tegen? Lees verder, misschien wordt het uitgelegd.',
  'Let op signaalwoorden zoals maar, daarom, toch en daarna.',
  'Lees rustig. Je mag de tekst straks bij de vragen nog terugkijken!'
];
let tekst = null;

function renderText(el, t) {
  let n = 0;
  el.innerHTML = `<h2><span>${t.emoji}</span>${esc(t.titel)}</h2>` + t.alineas.map((al, ai) =>
    `<p data-n="${ai + 1}">${al.map(z => `<span class="zin" data-i="${n++}">${esc(z)}</span>`).join(' ')}</p>`).join('');
}

function openText(id) {
  tekst = TEKSTEN.find(t => t.id === id);
  const o = ONDERWERPEN_LEZEN.find(x => x.id === tekst.onderwerp);
  show('read');
  $('#readTopic').textContent = `${o.emoji} ${o.naam}`;
  $('#readTip').textContent = pick(LEESTIPS);
  renderText($('#readText'), tekst);
}
$('#readBack').onclick = () => huidigOnderwerp ? openTopic(huidigOnderwerp) : goHome();
$('#startQuizBtn').onclick = () => { sndLaunch(); startQuiz(); };

/* ---------------- VRAGEN ---------------- */
let quiz = null;

function kiesVragen(t) {
  // één vraag per vaardigheid, in willekeurige volgorde – zo is elke ronde anders
  const perSkill = {};
  t.vragen.forEach(v => (perSkill[v.s] = perSkill[v.s] || []).push(v));
  return shuffle(Object.values(perSkill).map(pick)).slice(0, 7).map(v => {
    const q = { ...v };
    if (v.t === 'mc') q.opties = shuffle([v.a, ...v.w]);
    return q;
  });
}

function startQuiz() {
  quiz = { tekst, vragen: kiesVragen(tekst), i: 0, goed: 0, streak: 0, log: [] };
  show('quiz');
  renderText($('#quizText'), tekst);
  $('#qGoal').textContent = ONDERWERPEN_LEZEN.find(o => o.id === tekst.onderwerp).emoji;
  renderVraag();
}

function setTextOpen(open) { $('.text-side').classList.toggle('closed', !open); $('#textToggle').textContent = open ? '📖 Tekst verbergen' : '📖 Tekst tonen'; }
$('#textToggle').onclick = () => setTextOpen($('.text-side').classList.contains('closed'));

function renderVraag() {
  const q = quiz.vragen[quiz.i];
  quiz.klaar = false; quiz.fouten = 0; quiz.volgNext = 0;
  const sk = VAARDIGHEDEN[q.s];
  $('#qCounter').textContent = `Vraag ${quiz.i + 1} van ${quiz.vragen.length}`;
  $('#qRocket').style.left = `calc(${quiz.i / quiz.vragen.length * 86}%)`;
  $('#qStreak').textContent = quiz.streak >= 2 ? `🔥 ${quiz.streak}` : '';
  $('#qSkill').textContent = `${sk.emoji} ${sk.naam}`;
  $('#feedback').className = 'feedback hidden';
  $('#nextBtn').classList.add('hidden');
  const tablet = $('#quizText');
  tablet.classList.remove('pick');
  tablet.querySelectorAll('.zin').forEach(z => { z.className = 'zin'; z.onclick = null; });
  const body = $('#qBody');
  body.innerHTML = '';

  if (q.t === 'mc') {
    $('#qText').innerHTML = q.q;
    body.innerHTML = '<div class="options"></div>';
    q.opties.forEach((o, k) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="letter">${'ABCD'[k]}</span><span>${esc(o)}</span>`;
      b.onclick = () => {
        if (quiz.klaar) return;
        const ok = o === q.a;
        body.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.textContent.slice(1) === q.a) x.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        antwoord(ok, o, q.a);
      };
      body.firstChild.appendChild(b);
    });
    setTextOpen(false);
  } else if (q.t === 'tf') {
    $('#qText').innerHTML = 'Wat klopt volgens de tekst?';
    body.innerHTML = `<div class="statement">"${esc(q.q)}"</div><div class="tf-row"></div>`;
    ['Waar', 'Niet waar', 'Staat er niet'].forEach(o => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.textContent = o;
      b.onclick = () => {
        if (quiz.klaar) return;
        const ok = o === q.a;
        body.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.textContent === q.a) x.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        antwoord(ok, o, q.a);
      };
      body.querySelector('.tf-row').appendChild(b);
    });
    setTextOpen(false);
  } else if (q.t === 'zin') {
    $('#qText').innerHTML = q.q;
    body.innerHTML = `<p class="pick-hint">${matchMedia('(max-width: 820px)').matches ? '👆' : '👈'} Tik op een zin in de tekst.</p>`;
    setTextOpen(true);
    tablet.classList.add('pick');
    tablet.querySelectorAll('.zin').forEach(z => z.onclick = () => {
      if (quiz.klaar) return;
      const i = Number(z.dataset.i);
      const ok = q.a.includes(i);
      tablet.classList.remove('pick');
      z.classList.add(ok ? 'good' : 'bad');
      if (!ok) tablet.querySelector(`.zin[data-i="${q.a[0]}"]`).classList.add('good');
      antwoord(ok, z.textContent, tablet.querySelector(`.zin[data-i="${q.a[0]}"]`).textContent);
    });
  } else if (q.t === 'volg') {
    $('#qText').innerHTML = q.q + ' <span class="muted">(tik in de goede volgorde)</span>';
    body.innerHTML = '<ol class="order-done"></ol><div class="options"></div>';
    shuffle(q.items.map((t, k) => [t, k])).forEach(([t, k]) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="letter">?</span><span>${esc(t)}</span>`;
      b.onclick = () => {
        if (quiz.klaar) return;
        if (k === quiz.volgNext) {
          beep([[600 + k * 120, .08]]);
          b.remove();
          body.querySelector('.order-done').insertAdjacentHTML('beforeend', `<li>${esc(t)}</li>`);
          quiz.volgNext++;
          if (quiz.volgNext === q.items.length) antwoord(quiz.fouten === 0, quiz.fouten ? `${quiz.fouten}× mis` : 'goede volgorde', q.items.join(' → '));
        } else {
          quiz.fouten++; sndBad();
          b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 400);
        }
      };
      body.querySelector('.options').appendChild(b);
    });
    setTextOpen(false);
  }
}

const GOED = ['Top! 🚀', 'Raak! 🎯', 'Super gelezen! 🌟', 'Yes! ✨', 'Knap! 💪'];
const FOUT = ['Net mis… 🛰️', 'Oeps! 🌑', 'Bijna! ☄️'];

function antwoord(ok, gegeven, juist) {
  const q = quiz.vragen[quiz.i];
  quiz.klaar = true;
  const [g, t] = data.vaardig[q.s] || [0, 0];
  data.vaardig[q.s] = [g + (ok ? 1 : 0), t + 1];
  save();
  if (ok) { quiz.goed++; quiz.streak++; sndGood(); } else { quiz.streak = 0; sndBad(); }
  quiz.log.push({ q, ok, gegeven, juist });
  $('#qStreak').textContent = quiz.streak >= 2 ? `🔥 ${quiz.streak}` : '';
  const fb = $('#feedback');
  fb.className = 'feedback ' + (ok ? 'good' : 'bad');
  fb.innerHTML = `<span class="big">${pick(ok ? GOED : FOUT)}</span>` +
    (ok ? '' : `Goed is: <b>${esc(juist)}</b><span class="tip">💡 ${esc(VAARDIGHEDEN[q.s].tip)}</span>`);
  const nb = $('#nextBtn');
  nb.textContent = quiz.i + 1 < quiz.vragen.length ? 'Volgende ▶' : 'Landen! 🪐';
  nb.classList.remove('hidden');
  $('#qRocket').style.left = `calc(${(quiz.i + 1) / quiz.vragen.length * 86}%)`;
  quiz.klaarOp = Date.now();
  nb.focus({ preventScroll: true });
  if (matchMedia('(max-width: 820px)').matches) fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

$('#nextBtn').onclick = () => {
  quiz.i++;
  if (quiz.i < quiz.vragen.length) { renderVraag(); if (matchMedia('(max-width: 820px)').matches) $('#qCounter').scrollIntoView({ behavior: 'smooth' }); }
  else eindeQuiz();
};
document.addEventListener('keydown', e => {
  if ($('#quiz').classList.contains('hidden') || !quiz) return;
  if (e.key === 'Enter' && quiz.klaar && Date.now() - quiz.klaarOp > 500) { e.preventDefault(); $('#nextBtn').click(); }
});
$('#quitBtn').onclick = e => confirmTap(e.currentTarget, 'Zeker? Tik nog een keer', () => openTopic(tekst.onderwerp));

function eindeQuiz() {
  const n = quiz.vragen.length, fout = n - quiz.goed;
  const sterren = fout === 0 ? 3 : fout === 1 ? 2 : fout <= 3 ? 1 : 0;
  const t = quiz.tekst;
  data.teksten[t.id] = Math.max(data.teksten[t.id] || 0, sterren);
  data.historie.unshift({ datum: new Date().toISOString(), tekst: t.id, goed: quiz.goed, totaal: n, sterren });
  data.historie = data.historie.slice(0, 50);
  save();
  show('result');
  $('#resEmoji').textContent = sterren === 3 ? '🏆' : sterren >= 1 ? ONDERWERPEN_LEZEN.find(o => o.id === t.onderwerp).emoji : '🛸';
  $('#resTitle').textContent = sterren === 3 ? 'Perfecte landing!' : sterren >= 1 ? 'Missie geslaagd!' : 'Noodlanding… probeer het nog eens!';
  $('#resStars').textContent = sterrenTekst(sterren);
  $('#resText').textContent = `${quiz.goed} van de ${n} vragen goed. ${sterren < 3 ? 'Speel nog een keer voor meer sterren: je krijgt dan andere vragen!' : 'Alle vragen goed, wauw!'}`;
  $('#resSkills').innerHTML = quiz.log.map(l => `<span class="${l.ok ? 'ok' : 'no'}">${VAARDIGHEDEN[l.q.s].emoji} ${VAARDIGHEDEN[l.q.s].naam}</span>`).join('');
  $('#resReview').innerHTML = quiz.log.map(l => `<li>${l.ok ? '✅' : '❌'} ${l.q.t === 'tf' ? `"${esc(l.q.q)}"` : strip(l.q.q)}
    <div class="ans">Jouw antwoord: ${esc(l.gegeven)}${l.ok ? '' : ` · Goed: <b>${esc(l.juist)}</b>`}</div></li>`).join('');
  if (sterren >= 1) { sndWin(); confetti(); }

  const idx = TEKSTEN.indexOf(t);
  const volgende = TEKSTEN.slice(idx + 1).concat(TEKSTEN.slice(0, idx)).find(x => (data.teksten[x.id] || 0) < 3);
  $('#resNext').classList.toggle('hidden', !volgende);
  $('#resNext').onclick = () => volgende && openText(volgende.id);
  $('#resAgain').onclick = () => openText(t.id);
}

/* ---------------- TRAININGSKAMP ---------------- */
let mini = null;

function startMini(id) {
  const spel = SPELLEN.find(s => s.id === id);
  show('game');
  $('#gameTitle').textContent = `${spel.emoji} ${spel.naam}`;
  mini = { id, fouten: 0 };
  if (id === 'signaal') sorteerSpel(SIGNAALWOORDEN.bakken, shuffle(SIGNAALWOORDEN.woorden).slice(0, 8), VAARDIGHEDEN.signaal.tip, 'signaal');
  else if (id === 'mening') sorteerSpel(['✅ Feit', '💬 Mening'], shuffle(FEIT_MENING).slice(0, 8), VAARDIGHEDEN.mening.tip, 'mening');
  else if (id === 'woord') keuzeSpel(shuffle(WOORD_DETECTIVE).slice(0, 6), 'Wat betekent het vetgedrukte woord?', VAARDIGHEDEN.woord.tip, 'woord');
  else if (id === 'verwijs') keuzeSpel(shuffle(VERWIJS_JACHT).slice(0, 6), 'Waar verwijst het vetgedrukte woord naar?', VAARDIGHEDEN.verwijs.tip, 'verwijs');
}

function telVaardigheid(s, ok) { const [g, t] = data.vaardig[s] || [0, 0]; data.vaardig[s] = [g + (ok ? 1 : 0), t + 1]; }

function sorteerSpel(bakken, items, tip, skill) {
  const rij = items.slice();
  const totaal = rij.length;
  const geplaatst = bakken.map(() => []);
  const body = $('#gameBody');
  body.innerHTML = `<p class="muted">${esc(tip)}</p><div class="sort-card" id="sortCard"></div>
    <div class="bins">${bakken.map((b, i) => `<button class="bin" data-b="${i}"><b>${b}</b><span class="bin-items"></span></button>`).join('')}</div>`;
  const kaart = $('#sortCard');
  const bins = body.querySelectorAll('.bin');
  let wacht = false;
  const toon = () => {
    $('#gameCount').textContent = `${totaal - rij.length} / ${totaal}`;
    if (!rij.length) { eindeMini(); return; }
    kaart.textContent = rij[0][0];
    kaart.style.animation = 'none'; void kaart.offsetWidth; kaart.style.animation = '';
  };
  bins.forEach(b => b.onclick = () => {
    if (!rij.length || wacht) return;
    const [tekst, goed] = rij[0];
    const ok = Number(b.dataset.b) === goed;
    if (!rij[0].geteld) telVaardigheid(skill, ok);
    if (ok) {
      sndGood(); rij.shift();
      geplaatst[goed].push(tekst);
      bins[goed].querySelector('.bin-items').innerHTML = geplaatst[goed].map(t => `<span>${esc(t.length > 22 ? t.slice(0, 20) + '…' : t)}</span>`).join('');
      b.classList.add('flash'); setTimeout(() => b.classList.remove('flash'), 400);
      toon();
    } else {
      mini.fouten++; sndBad(); wacht = true;
      b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400);
      kaart.innerHTML = `${esc(tekst)}<small>Hoort bij ${bakken[goed]}. Hij komt straks terug!</small>`;
      const item = rij.shift(); item.geteld = true; rij.push(item);
      setTimeout(() => { wacht = false; toon(); }, 1600);
    }
    save();
  });
  toon();
}

function keuzeSpel(items, vraag, tip, skill) {
  let i = 0;
  const body = $('#gameBody');
  const volgende = () => {
    if (i >= items.length) { eindeMini(); return; }
    $('#gameCount').textContent = `${i + 1} / ${items.length}`;
    const it = items[i];
    body.innerHTML = `<p class="muted">${vraag}</p><div class="statement">${it.zin}</div><div class="options"></div>
      <div class="feedback hidden" id="mFb"></div><div class="actions"><button class="btn hidden" id="mNext">Volgende ▶</button></div>`;
    shuffle([it.a, ...it.w]).forEach((o, k) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="letter">${'ABCD'[k]}</span><span>${esc(o)}</span>`;
      b.onclick = () => {
        const ok = o === it.a;
        telVaardigheid(skill, ok); save();
        body.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x.textContent.slice(1) === it.a) x.classList.add('correct'); });
        if (ok) sndGood(); else { b.classList.add('wrong'); mini.fouten++; sndBad(); }
        const fb = $('#mFb');
        fb.className = 'feedback ' + (ok ? 'good' : 'bad');
        fb.innerHTML = `<span class="big">${pick(ok ? GOED : FOUT)}</span>${ok ? '' : `<span class="tip">💡 ${esc(tip)}</span>`}`;
        const nb = $('#mNext');
        nb.textContent = i + 1 < items.length ? 'Volgende ▶' : 'Klaar! 🏁';
        nb.classList.remove('hidden');
        nb.onclick = () => { i++; volgende(); };
        nb.focus({ preventScroll: true });
      };
      body.querySelector('.options').appendChild(b);
    });
  };
  volgende();
}

function eindeMini() {
  const s = mini.fouten === 0 ? 3 : mini.fouten === 1 ? 2 : mini.fouten <= 3 ? 1 : 0;
  data.spellen[mini.id] = Math.max(data.spellen[mini.id] || 0, s);
  save();
  $('#gameCount').textContent = '';
  $('#gameBody').innerHTML = `<div class="game-intro">
    <div class="ge">${s === 3 ? '🏆' : s ? '🌟' : '🛸'}</div>
    <h2>${s === 3 ? 'Foutloos!' : s ? 'Goed gedaan!' : 'Nog even oefenen!'}</h2>
    <div class="big-stars">${sterrenTekst(s)}</div>
    <p>${mini.fouten === 0 ? 'Geen enkele fout!' : `${mini.fouten} foutje${mini.fouten === 1 ? '' : 's'}. Speel nog eens: je krijgt andere vragen.`}</p>
    <div class="actions center"><button class="btn" id="miniAgain">Nog een keer</button><button class="btn ghost" id="miniHome">Naar de missies</button></div></div>`;
  $('#miniAgain').onclick = () => startMini(mini.id);
  $('#miniHome').onclick = goHome;
  if (s) { sndWin(); confetti(); }
}

renderHome();
