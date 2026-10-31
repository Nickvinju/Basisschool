/* =========================================================
   Woord-invaders en Meteorietenregen (Naut thema 6)
   Schiet op het begrip dat bij de beschrijving hoort.
   Beide spellen gebruiken dezelfde code, alleen het thema verschilt.
   (gebruikt de hulpjes uit spel.js)
   ========================================================= */

const SPELLEN = {
  invaders: {
    titel: '👾 Woord-invaders', opslag: 'inv', schip: 'schip', valler: 'alien', maat: 40, grond: 'maan',
    kleur: ['#6c4bd8', '#b9a6ff'], confetti: ['👾', '⭐', '🚀', '✨'], alleenBetekenis: false,
    uitleg: `<p>Bovenaan staat een betekenis of een zin met een gat. De begrippen vallen naar beneden.
      Schiet op het <b>goede begrip</b> voordat het de grond raakt!</p>
      <p>✅ Goed begrip = punten · ❌ Fout begrip of goed begrip op de grond = een leven kwijt</p>`,
    inslag: w => `Het goede begrip was: ${w}`
  },
  meteoor: {
    titel: '☄️ Meteorietenregen', opslag: 'met', schip: 'kanon', valler: 'meteoor', maat: 56, grond: 'aarde',
    kleur: ['#9c3a12', '#ffb36b'], confetti: ['☄️', '🌍', '⭐', '✨'], alleenBetekenis: true,
    uitleg: `<p>Meteorieten vliegen op de aarde af! Op elke meteoriet staat een begrip.
      Bovenaan zie je een betekenis. Schiet de meteoriet met het <b>goede begrip</b> kapot voordat hij inslaat!</p>
      <p>✅ Goed begrip = punten · ❌ Fout begrip of inslag op aarde = een leven kwijt</p>`,
    inslag: w => `💥 Inslag! Het was: ${w}`
  }
};
let spel = SPELLEN.invaders;

const LEVELS = [
  { woorden: 3, snelheid: 30, nodig: 6 },
  { woorden: 4, snelheid: 42, nodig: 8 },
  { woorden: 5, snelheid: 55, nodig: 10 }
];
const LEVENS = 3;
const BREED = 600; // logische breedte van het speelveld; de hoogte past zich aan het scherm aan
const GROND = 44;  // hoogte van de maangrond onderin
const ALIEN = 40;  // de alien die boven elk woord hangt

// Pixel art gemaakt met PixelLab; zolang een plaatje nog laadt, tekent het spel simpele vormen
const SPRITES = Object.fromEntries(['schip', 'alien', 'ruimte', 'maan', 'kanon', 'meteoor', 'aarde'].map(n => {
  const img = new Image(); img.src = `img/${n}.png`; return [n, img];
}));
const klaar = img => img.complete && img.naturalWidth > 0;

const inv = {
  canvas: $('#invCanvas'), ctx: $('#invCanvas').getContext('2d'),
  H: 700, schaal: 1, loopt: false, raf: 0, laatst: 0,
  level: 0, score: 0, hits: 0, levens: LEVENS,
  schip: { x: BREED / 2, doelX: null }, kogels: [], vallers: [], deeltjes: [], sterren: [],
  doel: null, zak: [], pauze: 0, melding: null, toetsen: {}, schietKlaar: 0
};

/* ---------------- maat van het speelveld ---------------- */
function invMaat() {
  const breedte = inv.canvas.parentElement.clientWidth || BREED;
  const hoogte = Math.max(340, Math.min(breedte * 1.05, innerHeight - 300));
  inv.H = Math.round(BREED * hoogte / breedte);
  const dpr = devicePixelRatio || 1;
  inv.canvas.style.height = hoogte + 'px';
  inv.canvas.width = Math.round(breedte * dpr);
  inv.canvas.height = Math.round(hoogte * dpr);
  inv.schaal = breedte * dpr / BREED;
  inv.sterren = Array.from({ length: 60 }, () => ({ x: Math.random() * BREED, y: Math.random() * inv.H, r: Math.random() * 1.5 + .4, v: Math.random() * 12 + 4 }));
}
addEventListener('resize', () => { if (!$('#invaders').classList.contains('hidden')) invMaat(); });

/* ---------------- spelverloop ---------------- */
function startInvaders(soort = 'invaders') {
  spel = SPELLEN[soort];
  inv.soort = soort;
  show('invaders');
  $('#invTitel').textContent = spel.titel;
  invMaat();
  inv.level = 0; inv.score = 0;
  inv.zak = [];
  invHud();
  $('#invClue').innerHTML = 'Schiet op het begrip dat bij de beschrijving hoort!';
  overlay(`<h2>${spel.titel}</h2>${spel.uitleg}
    <button class="btn" id="invGo">Start level 1 ▶</button>`);
  $('#invGo').onclick = () => startLevel(0);
}

function startLevel(n) {
  inv.level = n; inv.hits = 0; inv.levens = LEVENS;
  inv.kogels = []; inv.vallers = []; inv.deeltjes = [];
  inv.schip.x = BREED / 2; inv.schip.doelX = null;
  overlay('');
  invHud();
  nieuweRonde();
  if (!inv.loopt) { inv.loopt = true; inv.laatst = performance.now(); inv.raf = requestAnimationFrame(invLoop); }
}

function volgendDoel() {
  if (!inv.zak.length) inv.zak = shuffle(selectie());
  return inv.zak.pop();
}

function nieuweRonde() {
  const L = LEVELS[inv.level];
  const w = volgendDoel();
  inv.doel = w;
  const b = beschrijving(w, spel.alleenBetekenis ? 'betekenis' : undefined);
  $('#invClue').innerHTML = b.soort === 'betekenis' ? `Betekenis:&nbsp;<b>${b.html}</b>` : b.html;
  const ctx = inv.ctx;
  const geplaatst = [];
  // Overlap tussen twee woorden van links naar rechts (dan blokkeert het onderste woord je kogel)
  const overlap = (x, b) => geplaatst.reduce((s, p) => s + Math.max(0, Math.min(x + b, p.x + p.breed) - Math.max(x, p.x)), 0);
  inv.vallers = shuffle(keuzesVoor(w, L.woorden)).map((x, k) => {
    const tekst = woordVorm(x, b);
    let grootte = 24;
    ctx.font = `800 ${grootte}px Nunito, sans-serif`;
    while (ctx.measureText(tekst).width + 28 > BREED - 20 && grootte > 14) {
      grootte--; ctx.font = `800 ${grootte}px Nunito, sans-serif`;
    }
    const breed = Math.min(BREED - 20, ctx.measureText(tekst).width + 28);
    // Probeer een aantal plekken en kies de plek die het minst overlapt met de andere woorden
    let bestX = 10, bestO = Infinity;
    for (let p = 0; p < 30; p++) {
      const px = 10 + Math.random() * (BREED - 20 - breed), o = overlap(px, breed);
      if (o < bestO) { bestO = o; bestX = px; }
    }
    const v = { w: x, tekst, goed: x === w, grootte, breed, hoog: grootte + 20, x: bestX, y: -60 - k * 95 };
    geplaatst.push(v);
    return v;
  });
  inv.pauze = 0;
}

function invHud() {
  const L = LEVELS[inv.level];
  $('#invLevel').textContent = `Level ${inv.level + 1} van ${LEVELS.length}`;
  $('#invScore').textContent = `⭐ ${inv.score}`;
  $('#invHits').textContent = `🎯 ${inv.hits} / ${L.nodig}`;
  $('#invLevens').textContent = '❤️'.repeat(inv.levens) + '🖤'.repeat(LEVENS - inv.levens);
}

function overlay(html) { $('#invOverlay').innerHTML = html; }

function stopInvaders() {
  inv.loopt = false;
  cancelAnimationFrame(inv.raf);
  overlay('');
}

function bewaarInvaders(levelGehaald) {
  const d = data[spel.opslag] = data[spel.opslag] || { best: 0, level: 0 };
  d.best = Math.max(d.best || 0, inv.score);
  d.level = Math.max(d.level || 0, levelGehaald);
  save();
}

function levelKlaar() {
  stopInvaders();
  sndWin(); confetti(spel.confetti);
  if (inv.level === LEVELS.length - 1) {
    bewaarInvaders(LEVELS.length);
    overlay(`<h2>🏆 Gewonnen!</h2>
      <p>Je hebt alle ${LEVELS.length} levels gehaald met <b>${inv.score}</b> punten.</p>
      <p>Highscore: ${data[spel.opslag].best}</p>
      <button class="btn" id="invOpnieuw">Nog een keer</button>`);
    $('#invOpnieuw').onclick = () => startInvaders(inv.soort);
  } else {
    bewaarInvaders(inv.level + 1);
    overlay(`<h2>Level ${inv.level + 1} gehaald! 🎉</h2>
      <p>Score: <b>${inv.score}</b>. In level ${inv.level + 2} vallen er ${LEVELS[inv.level + 1].woorden} begrippen en gaan ze sneller!</p>
      <button class="btn" id="invVerder">Start level ${inv.level + 2} ▶</button>`);
    $('#invVerder').onclick = () => startLevel(inv.level + 1);
  }
}

function gameOver() {
  stopInvaders();
  bewaarInvaders(inv.level);
  overlay(`<h2>Game over 💥</h2>
    <p>Je kwam tot level ${inv.level + 1} met <b>${inv.score}</b> punten.</p>
    <p>Het laatste begrip was: <b>${esc(inv.doel.woord)}</b> – ${esc(inv.doel.betekenis)}</p>
    <p>Highscore: ${data[spel.opslag].best}</p>
    <button class="btn" id="invOpnieuw">Opnieuw proberen</button>`);
  $('#invOpnieuw').onclick = () => startInvaders(inv.soort);
}

function levenKwijt(tekst) {
  inv.levens--;
  sndBad();
  inv.melding = { tekst, t: 1.6 };
  invHud();
  if (inv.levens <= 0) gameOver();
}

function knal(x, y, kleur) {
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2, v = 60 + Math.random() * 160;
    inv.deeltjes.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: .7, kleur });
  }
}

/* ---------------- besturing ---------------- */
function schiet() {
  if (!inv.loopt || inv.pauze > 0) return;
  const nu = performance.now();
  if (nu < inv.schietKlaar) return;
  inv.schietKlaar = nu + 260;
  inv.kogels.push({ x: inv.schip.x, y: inv.H - GROND - 56 });
  beep([[900, .04, 'square']]);
}

addEventListener('keydown', e => {
  if ($('#invaders').classList.contains('hidden')) return;
  if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(e.key)) { inv.toetsen[e.key] = true; inv.schip.doelX = null; e.preventDefault(); }
  if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); schiet(); }
});
addEventListener('keyup', e => { inv.toetsen[e.key] = false; });

function canvasX(e) {
  const r = inv.canvas.getBoundingClientRect();
  return (e.clientX - r.left) / r.width * BREED;
}
let invVinger = false;
inv.canvas.addEventListener('pointerdown', e => {
  invVinger = true;
  inv.schip.x = Math.max(20, Math.min(BREED - 20, canvasX(e)));
  schiet();
});
inv.canvas.addEventListener('pointermove', e => { if (invVinger) inv.schip.doelX = canvasX(e); });
addEventListener('pointerup', () => { invVinger = false; });

function houdVast(knop, toets) {
  const aan = e => { e.preventDefault(); inv.toetsen[toets] = true; inv.schip.doelX = null; };
  const uit = () => { inv.toetsen[toets] = false; };
  knop.addEventListener('pointerdown', aan);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(t => knop.addEventListener(t, uit));
}
houdVast($('#padLeft'), 'ArrowLeft');
houdVast($('#padRight'), 'ArrowRight');
$('#padFire').addEventListener('pointerdown', e => { e.preventDefault(); schiet(); });

$('#invStop').onclick = () => { stopInvaders(); goHome(); };

/* ---------------- spel-lus ---------------- */
function invLoop(nu) {
  if (!inv.loopt) return;
  const dt = Math.min(.05, (nu - inv.laatst) / 1000);
  inv.laatst = nu;
  invUpdate(dt);
  invTeken();
  if (inv.loopt) inv.raf = requestAnimationFrame(invLoop);
}

function invUpdate(dt) {
  const L = LEVELS[inv.level];
  const grond = inv.H - GROND;
  const s = inv.schip;

  // schip bewegen
  const links = inv.toetsen.ArrowLeft || inv.toetsen.a, rechts = inv.toetsen.ArrowRight || inv.toetsen.d;
  if (links) s.x -= 440 * dt;
  if (rechts) s.x += 440 * dt;
  if (s.doelX != null) s.x += (s.doelX - s.x) * Math.min(1, dt * 14);
  s.x = Math.max(20, Math.min(BREED - 20, s.x));

  inv.sterren.forEach(st => { st.y += st.v * dt; if (st.y > inv.H) { st.y = 0; st.x = Math.random() * BREED; } });
  inv.deeltjes.forEach(d => { d.x += d.vx * dt; d.y += d.vy * dt; d.t -= dt; });
  inv.deeltjes = inv.deeltjes.filter(d => d.t > 0);
  if (inv.melding && (inv.melding.t -= dt) <= 0) inv.melding = null;

  // korte pauze na een goed antwoord
  if (inv.pauze > 0) {
    if ((inv.pauze -= dt) <= 0) {
      if (inv.hits >= L.nodig) return levelKlaar();
      nieuweRonde();
    }
    return;
  }

  inv.kogels.forEach(k => { k.y -= 720 * dt; });
  inv.vallers.forEach(v => { v.y += L.snelheid * dt; });

  // raak?
  for (const k of inv.kogels) {
    const v = inv.vallers.find(v => !v.weg && k.x >= v.x && k.x <= v.x + v.breed && k.y <= v.y + v.hoog && k.y >= v.y - ALIEN + 6);
    if (!v) continue;
    k.weg = true;
    if (v.goed) {
      inv.hits++;
      inv.score += 100 * (inv.level + 1);
      sndGood();
      knal(v.x + v.breed / 2, v.y + v.hoog / 2, '#4ee69a');
      inv.melding = { tekst: `✅ ${v.tekst}`, t: 1.1, goed: true };
      inv.vallers = [];
      inv.kogels = [];
      inv.pauze = .9;
      invHud();
      return;
    }
    v.weg = true;
    knal(v.x + v.breed / 2, v.y + v.hoog / 2, '#ff6b7a');
    levenKwijt(`❌ ${v.tekst} is niet goed`);
    if (!inv.loopt) return;
  }
  inv.kogels = inv.kogels.filter(k => !k.weg && k.y > -20);

  // grond geraakt?
  for (const v of inv.vallers) {
    if (v.y + v.hoog < grond) continue;
    v.weg = true;
    if (v.goed) {
      levenKwijt(spel.inslag(v.w.woord));
      if (!inv.loopt) return;
      inv.vallers = [];
      inv.pauze = 1.2;
      return;
    }
  }
  inv.vallers = inv.vallers.filter(v => !v.weg);
}

function rondRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function invTeken() {
  const ctx = inv.ctx, H = inv.H;
  ctx.setTransform(inv.schaal, 0, 0, inv.schaal, 0, 0);
  ctx.imageSmoothingEnabled = false; // pixel art scherp houden
  ctx.fillStyle = '#10142e';
  ctx.fillRect(0, 0, BREED, H);
  if (klaar(SPRITES.ruimte)) {
    // achtergrond vult het hele veld, midden uitgesneden
    const img = SPRITES.ruimte, s = Math.max(BREED / img.width, H / img.height);
    ctx.drawImage(img, (BREED - img.width * s) / 2, (H - img.height * s) / 2, img.width * s, img.height * s);
  }

  ctx.fillStyle = '#fff';
  inv.sterren.forEach(st => { ctx.globalAlpha = .35; ctx.fillRect(st.x, st.y, st.r * 1.5, st.r * 1.5); });
  ctx.globalAlpha = 1;

  // grond
  const grondImg = SPRITES[spel.grond];
  if (spel.grond === 'aarde' && klaar(grondImg)) {
    // de aarde is één brede strook met een ronde horizon
    const h = GROND + 26;
    ctx.drawImage(grondImg, 0, H - h, BREED, h);
  } else if (klaar(grondImg)) {
    const img = grondImg, h = GROND + 6, w = img.width * h / img.height;
    for (let x = 0; x < BREED; x += w) ctx.drawImage(img, x, H - h, w, h);
  } else {
    ctx.fillStyle = '#2a3270';
    ctx.fillRect(0, H - GROND, BREED, GROND);
  }

  // vallende woorden, elk gedragen door een alien
  inv.vallers.forEach(v => {
    const drager = SPRITES[spel.valler];
    if (klaar(drager)) ctx.drawImage(drager, v.x + v.breed / 2 - spel.maat / 2, v.y - spel.maat + 8, spel.maat, spel.maat);
    ctx.fillStyle = spel.kleur[0];
    rondRect(ctx, v.x, v.y, v.breed, v.hoog, 12); ctx.fill();
    ctx.strokeStyle = spel.kleur[1]; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = `800 ${v.grootte}px Nunito, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(v.tekst, v.x + v.breed / 2, v.y + v.hoog / 2 + 1);
  });

  // kogels
  ctx.fillStyle = '#ffd23f';
  inv.kogels.forEach(k => { rondRect(ctx, k.x - 3, k.y - 14, 6, 16, 3); ctx.fill(); });

  // schip
  const s = inv.schip, y = H - GROND;
  if (klaar(SPRITES[spel.schip])) {
    ctx.drawImage(SPRITES[spel.schip], s.x - 32, y - 60, 64, 64);
  } else {
    ctx.fillStyle = '#3ddcff';
    ctx.beginPath(); ctx.moveTo(s.x, y - 40); ctx.lineTo(s.x + 22, y - 6); ctx.lineTo(s.x - 22, y - 6); ctx.closePath(); ctx.fill();
  }

  // knallen
  inv.deeltjes.forEach(d => { ctx.globalAlpha = Math.max(0, d.t / .7); ctx.fillStyle = d.kleur; ctx.fillRect(d.x - 3, d.y - 3, 6, 6); });
  ctx.globalAlpha = 1;

  // melding
  if (inv.melding) {
    ctx.font = '800 26px Nunito, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = inv.melding.goed ? '#4ee69a' : '#ff6b7a';
    ctx.fillText(inv.melding.tekst, BREED / 2, H / 2, BREED - 30);
  }
}
