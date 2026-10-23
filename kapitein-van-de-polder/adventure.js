/* =========================================================
   Leer-avontuur – speels leren vóór de oefentoets
   Gebruikt TOPO, MAPS, renderMap, data, save, geluid enz. uit script.js
   ========================================================= */

const STATIONS = [
  {
    id: 'zee', emoji: '🌊', title: 'Pas op voor de zee', sub: 'Les 1',
    steps: [
      { type: 'story', emoji: '🏠⛰️', title: 'Vroeger: terpen',
        text: 'Lang geleden waren er nog <b>geen dijken</b>. Mensen maakten daarom zelf heuvels: <b>terpen</b>. Daarop bouwden ze hun boerderij of zelfs een heel dorp. Bij <b>hoogwater</b> vluchtten mensen en dieren naar de terp.' },
      { type: 'story', emoji: '🏖️🧱', title: 'Nu: duinen en dijken',
        text: 'Nu ligt er langs de <b>kust</b> een lang lint van <b>duinen</b> en <b>dijken</b>. Een duin is door de <b>natuur</b> gemaakt (een heuvel van zand). Een dijk is door <b>mensen</b> gemaakt. Daardoor kunnen we zelfs wonen in delen die <b>onder de zeespiegel</b> liggen!' },
      { type: 'story', emoji: '🚢🚧', title: 'De stormvloedkering',
        text: 'In sommige <b>zeearmen</b> ligt een <b>stormvloedkering</b>: een speciale dam die <b>open en dicht</b> kan. Meestal staat hij <b>open</b>, zodat rivierwater en schepen erdoor kunnen. Bij <b>hoogwater of harde wind</b> gaat hij <b>dicht</b>.' },
      { type: 'sort', title: 'Wie heeft het gemaakt?', bins: ['👷 Door mensen', '🌿 Door de natuur'],
        items: [['een terp', 0], ['een dijk', 0], ['een dam', 0], ['een stormvloedkering', 0], ['de Afsluitdijk', 0], ['een duin', 1], ['een heuvel van zand langs het strand', 1]] },
      { type: 'sort', title: 'Stormvloedkering: open of dicht?', bins: ['🟢 Open', '🔴 Dicht'],
        items: [['Er wil een schip door', 0], ['Het is rustig weer', 0], ['Rivierwater moet naar de zee', 0], ['Er is hoogwater', 1], ['Er staat een harde storm', 1], ['Het zeewater komt heel hoog', 1]] },
      { type: 'memory', title: 'Memory: zoek de paren',
        pairs: [['terp', 'woonheuvel, door mensen gemaakt'], ['duin', 'zandheuvel, door de natuur gemaakt'], ['kust', 'strook land langs de zee'],
                ['zeearm', 'zee die als brede rivier het land in stroomt'], ['stormvloedkering', 'dam die open en dicht kan'], ['dam', 'verhoging dwars in een zeearm, rivier of meer']] }
    ]
  },
  {
    id: 'land', emoji: '🚜', title: 'Nieuw land', sub: 'Les 2',
    steps: [
      { type: 'story', emoji: '🌊➡️🏞️', title: 'De Afsluitdijk',
        text: 'De <b>Zuiderzee</b> was een wilde zee in het noorden van Nederland. Toen de <b>Afsluitdijk</b> klaar was, werd de Zuiderzee het <b>IJsselmeer</b>. Een meer is veel <b>kalmer</b> dan de zee, dus er zijn bijna geen overstromingen meer.' },
      { type: 'story', emoji: '💧➡️🌾', title: 'Inpolderen',
        text: 'Van water land maken heet <b>inpolderen</b>. Eerst bouw je een <b>dijk</b> rond een stuk meer. Dan <b>pomp</b> je het water eruit. Zo ontstonden de <b>Noordoostpolder</b> en de <b>Flevopolders</b>.' },
      { type: 'order', title: 'Bouw een polder! Tik de stappen in de goede volgorde.',
        items: ['🧱 Een dijk bouwen rond een stuk meer', '💦 Het water eruit pompen', '🌱 Het land wordt droog', '🏘️ Het land inrichten met een stad, dorpen en boerderijen'] },
      { type: 'story', emoji: '🏙️🚜', title: 'De inrichting',
        text: 'Bij de <b>inrichting</b> van de polder kwam de <b>stad in het midden</b> en de dorpen eromheen. De <b>kavels</b> (stukken grond) zijn <b>groot en rechthoekig</b>. Op elke kavel staat een <b>boerderij</b>, en <b>lange, rechte wegen</b> lopen naar de dorpen.' },
      { type: 'sort', title: 'Klopt dit voor de nieuwe polders?', bins: ['✅ Klopt', '❌ Klopt niet'],
        items: [['De stad ligt in het midden', 0], ['De kavels zijn groot en rechthoekig', 0], ['Op elke kavel staat een boerderij', 0], ['De wegen zijn lang en recht', 0],
                ['De wegen kronkelen alle kanten op', 1], ['De kavels zijn klein en rond', 1], ['De stad ligt helemaal aan de rand', 1]] },
      { type: 'memory', title: 'Memory: zoek de paren',
        pairs: [['Zuiderzee', 'werd het IJsselmeer'], ['Afsluitdijk', 'sloot de Zuiderzee af'], ['inpoldering', 'van water land maken'],
                ['inrichting', 'hoe iets is ingedeeld'], ['kavel', 'een stuk grond']] }
    ]
  },
  {
    id: 'flevo', emoji: '🌷', title: 'Topo Flevoland', sub: 'Les 3',
    steps: [
      { type: 'story', emoji: '🗺️🌷', title: 'Flevoland',
        text: 'Flevoland is de <b>nieuwste provincie</b> van Nederland: het is helemaal <b>ingepolderd</b>! De hoofdstad is <b>Lelystad</b>, de grootste stad is <b>Almere</b>. In de Noordoostpolder ligt <b>Emmeloord</b>. Boven Flevoland ligt het <b>IJsselmeer</b>, ernaast het <b>Markermeer</b>.' },
      { type: 'explore', map: 'flevo' },
      { type: 'flags', map: 'flevo' },
      { type: 'flags', map: 'flevo', hard: true }
    ]
  },
  {
    id: 'zeeland', emoji: '🦪', title: 'Topo Zeeland', sub: 'Les 3',
    steps: [
      { type: 'story', emoji: '🗺️🦪', title: 'Zeeland',
        text: 'Zeeland bestaat uit <b>eilanden</b> met <b>zeearmen</b> ertussen. De hoofdstad is <b>Middelburg</b>. Aan de westkant ligt de <b>Noordzee</b>. In de <b>Oosterschelde</b> ligt een grote stormvloedkering. Het stuk dat tegen België ligt heet <b>Zeeuws-Vlaanderen</b>, daar ligt <b>Terneuzen</b>.' },
      { type: 'explore', map: 'zeeland' },
      { type: 'flags', map: 'zeeland' },
      { type: 'flags', map: 'zeeland', hard: true }
    ]
  },
  {
    id: 'spelling', emoji: '💎', title: 'Spelling-schatkist', sub: 'Topo schrijven',
    steps: [
      { type: 'story', emoji: '✍️💎', title: 'Schrijf het foutloos!',
        text: 'Op de toets moet je de topo <b>zonder fouten</b> schrijven. Let op:<br>• Namen beginnen altijd met een <b>hoofdletter</b>.<br>• <b>IJ</b>sselmeer: de I én de J zijn hoofdletters.<br>• <b>Zeeuws-Vlaanderen</b>: met streepje en twee hoofdletters.<br>• <b>Neeltje Jans</b>: twee woorden, allebei met hoofdletter.' },
      { type: 'puzzle', count: 7 }
    ]
  },
  {
    id: 'denk', emoji: '💡', title: 'Denk het uit', sub: 'Les 1-3',
    steps: [
      { type: 'story', emoji: '💡🧠', title: 'Iets nieuws bedenken',
        text: 'Soms zie je iets wat je wilt veranderen. Zo kom je op ideeën:<br>• <b>Les 1:</b> kijk naar de <b>oplossingen van anderen</b>.<br>• <b>Les 2:</b> leef je in de <b>wensen van anderen</b>. Dat helpt bij je plan.<br>• <b>Les 3:</b> laat je <b>inspireren door plaatjes</b> en beschrijf wat je ziet.' },
      { type: 'memory', title: 'Memory: welke les hoort waarbij?',
        pairs: [['Les 1', 'kijk naar de oplossingen van anderen'], ['Les 2', 'leef je in de wensen van anderen'], ['Les 3', 'laat je inspireren door plaatjes']] }
    ]
  }
];

/* ---------------- ROUTEKAART ---------------- */
function advData() { data.adventure = data.adventure || {}; return data.adventure; }

function openAdventure() {
  show('adventure');
  const done = advData();
  const box = $('#islands');
  let html = '';
  STATIONS.forEach((s, i) => {
    const unlocked = i === 0 || done[STATIONS[i - 1].id];
    const stars = done[s.id] || 0;
    const isNext = unlocked && !stars;
    html += `<button class="island ${i % 2 ? 'right' : 'left'} ${unlocked ? '' : 'locked'} ${isNext ? 'next' : ''} ${stars ? 'done' : ''}" data-i="${i}" ${unlocked ? '' : 'disabled'}>
      <span class="island-emoji">${unlocked ? s.emoji : '🔒'}</span>
      <span class="island-text"><small>Eiland ${i + 1} · ${s.sub}</small><b>${s.title}</b>
      <span class="island-stars">${stars ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : isNext ? '⛵ Hier ben je!' : ''}</span></span>
    </button>`;
  });
  const allDone = STATIONS.every(s => done[s.id]);
  html += `<button class="island finish ${allDone ? 'next' : 'locked'}" id="finishIsland" ${allDone ? '' : 'disabled'}>
    <span class="island-emoji">${allDone ? '🏆' : '🔒'}</span>
    <span class="island-text"><small>Eindbestemming</small><b>De oefentoets!</b>
    <span class="island-stars">${allDone ? 'Je bent er klaar voor!' : 'Speel eerst alle eilanden'}</span></span></button>`;
  box.innerHTML = html;
  box.querySelectorAll('.island[data-i]').forEach(b => b.onclick = () => startStation(Number(b.dataset.i)));
  const fin = $('#finishIsland');
  if (fin) fin.onclick = () => startGame('test');
}

/* ---------------- STATION SPELEN ---------------- */
let st = null;

function startStation(i) {
  st = { i, step: 0, mistakes: 0, station: STATIONS[i] };
  show('station');
  $('#stationTitle').textContent = `${st.station.emoji} ${st.station.title}`;
  renderStep();
}

function renderStep() {
  const s = st.station.steps[st.step];
  $('#stationDots').innerHTML = st.station.steps.map((_, k) =>
    `<span class="sdot ${k < st.step ? 'done' : k === st.step ? 'now' : ''}"></span>`).join('');
  $('#stationNext').classList.add('hidden');
  const body = $('#stationBody');
  body.innerHTML = '';
  body.className = 'station-body';
  void body.offsetWidth;
  body.classList.add('slide-in');
  ({ story: stepStory, sort: stepSort, order: stepOrder, memory: stepMemory, explore: stepExplore, flags: stepFlags, puzzle: stepPuzzle })[s.type](s, body);
}

function stepDone(msg) {
  const next = $('#stationNext');
  next.textContent = st.step + 1 < st.station.steps.length ? 'Verder ▶' : 'Eiland klaar! 🏝️';
  next.classList.remove('hidden');
  if (msg) {
    const d = document.createElement('div');
    d.className = 'feedback good';
    d.innerHTML = `<span class="big">${msg}</span>`;
    $('#stationBody').appendChild(d);
  }
  next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

$('#stationNext').onclick = () => {
  st.step++;
  if (st.step < st.station.steps.length) renderStep();
  else finishStation();
};
$('#stationBack').onclick = openAdventure;

function oops() { st.mistakes++; sndBad(); }

function finishStation() {
  st.mistakes = Math.round(st.mistakes);
  const stars = st.mistakes <= 1 ? 3 : st.mistakes <= 5 ? 2 : 1;
  const done = advData();
  done[st.station.id] = Math.max(done[st.station.id] || 0, stars);
  save();
  sndWin(); confetti();
  const body = $('#stationBody');
  $('#stationDots').innerHTML = '';
  const last = st.i === STATIONS.length - 1;
  body.innerHTML = `<div class="station-win">
    <div class="win-emoji">${st.station.emoji}</div>
    <h2>Eiland veroverd!</h2>
    <div class="stars" style="color:#f5b301">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <p>${st.mistakes === 0 ? 'Geen enkele fout. Wauw!' : `${st.mistakes} foutje${st.mistakes === 1 ? '' : 's'}. ${stars < 3 ? 'Speel het eiland nog eens voor 3 sterren!' : 'Super gedaan!'}`}</p>
    <div class="actions left">
      <button class="btn" id="toMap">${last ? 'Naar de eindbestemming 🏆' : 'Volgend eiland ⛵'}</button>
      <button class="btn ghost" id="replay">Nog een keer</button>
    </div></div>`;
  $('#stationNext').classList.add('hidden');
  $('#toMap').onclick = openAdventure;
  $('#replay').onclick = () => startStation(st.i);
}

/* ---------------- STAP: VERHAAL ---------------- */
function stepStory(s, body) {
  body.innerHTML = `<div class="story">
    <div class="story-emoji">${s.emoji}</div>
    <h2>${s.title}</h2>
    <p>${s.text}</p></div>`;
  stepDone();
  $('#stationNext').textContent = 'Begrepen! ▶';
}

/* ---------------- STAP: SORTEREN ---------------- */
function stepSort(s, body) {
  const queue = shuffle(s.items);
  let placed = [[], []];
  body.innerHTML = `<h2 class="step-title">${s.title}</h2>
    <p class="muted small">Tik op het goede vak.</p>
    <div class="sort-card" id="sortCard"></div>
    <div class="sort-bins">
      <button class="sort-bin" data-b="0"><b>${s.bins[0]}</b><div class="bin-items"></div></button>
      <button class="sort-bin" data-b="1"><b>${s.bins[1]}</b><div class="bin-items"></div></button>
    </div>`;
  const card = $('#sortCard');
  const bins = body.querySelectorAll('.sort-bin');
  const showCard = () => {
    if (!queue.length) { bins.forEach(b => b.disabled = true); card.classList.add('hidden'); stepDone('Alles goed gesorteerd! 🎉'); return; }
    card.textContent = queue[0][0];
    card.classList.remove('pop-card'); void card.offsetWidth; card.classList.add('pop-card');
  };
  bins.forEach(b => b.onclick = () => {
    if (!queue.length) return;
    const [text, right] = queue[0];
    const chosen = Number(b.dataset.b);
    if (chosen === right) {
      sndGood();
      queue.shift();
      placed[right].push(text);
      bins[right].querySelector('.bin-items').innerHTML = placed[right].map(t => `<span>${esc(t)}</span>`).join('');
      b.classList.add('flash-good'); setTimeout(() => b.classList.remove('flash-good'), 400);
      showCard();
    } else {
      oops();
      b.classList.add('shake-bad'); setTimeout(() => b.classList.remove('shake-bad'), 400);
      card.innerHTML = `${esc(text)}<small>Nee, dat hoort bij <b>${s.bins[right]}</b>. Hij komt straks nog een keer!</small>`;
      queue.push(queue.shift());
      setTimeout(showCard, 1700);
    }
  });
  showCard();
}

/* ---------------- STAP: VOLGORDE ---------------- */
function stepOrder(s, body) {
  let next = 0;
  body.innerHTML = `<h2 class="step-title">${s.title}</h2>
    <ol class="order-done" id="orderDone"></ol>
    <div class="options" id="orderOpts"></div>`;
  const opts = $('#orderOpts');
  shuffle(s.items.map((t, k) => [t, k])).forEach(([t, k]) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = `<span class="letter">?</span><span>${esc(t)}</span>`;
    b.onclick = () => {
      if (k === next) {
        sndGood();
        b.remove();
        $('#orderDone').insertAdjacentHTML('beforeend', `<li class="pop-card">${esc(t)}</li>`);
        next++;
        if (next === s.items.length) stepDone('De polder is klaar! 🌾🏘️');
      } else {
        oops();
        b.classList.add('wrong');
        setTimeout(() => b.classList.remove('wrong'), 450);
      }
    };
    opts.appendChild(b);
  });
}

/* ---------------- STAP: MEMORY ---------------- */
function stepMemory(s, body) {
  const cards = shuffle(s.pairs.flatMap((p, k) => [{ k, text: p[0], word: true }, { k, text: p[1] }]));
  body.innerHTML = `<h2 class="step-title">${s.title}</h2>
    <p class="muted small">Draai steeds twee kaartjes om. Zoek het woord en de uitleg die bij elkaar horen.</p>
    <div class="memory" id="memory"></div>`;
  const grid = $('#memory');
  let open = [], found = 0, busy = false;
  cards.forEach(c => {
    const b = document.createElement('button');
    b.className = 'mem';
    b.innerHTML = `<span class="mem-back">❓</span><span class="mem-front ${c.word ? 'word' : ''}">${esc(c.text)}</span>`;
    b.onclick = () => {
      if (busy || b.classList.contains('open') || b.classList.contains('found')) return;
      b.classList.add('open');
      beep([[600, .05]]);
      open.push([b, c]);
      if (open.length === 2) {
        const [[b1, c1], [b2, c2]] = open;
        open = [];
        if (c1.k === c2.k) {
          setTimeout(() => { b1.classList.add('found'); b2.classList.add('found'); sndGood(); }, 250);
          found++;
          if (found === s.pairs.length) setTimeout(() => stepDone('Alle paren gevonden! 🧠'), 500);
        } else {
          busy = true;
          setTimeout(() => { b1.classList.remove('open'); b2.classList.remove('open'); busy = false; }, 1300);
        }
      }
    };
    grid.appendChild(b);
  });
}

/* ---------------- STAP: KAART ONTDEKKEN ---------------- */
function stepExplore(s, body) {
  const plus = $('#plusTopo').checked;
  const places = TOPO.filter(t => t.map === s.map && !t.province && (plus || !t.plus));
  const seen = new Set();
  body.innerHTML = `<h2 class="step-title">🔎 Ontdek de kaart van ${MAPS[s.map].title}</h2>
    <p class="muted small">Tik op <b>alle stippen</b> om te ontdekken wat er ligt. <span id="exploreCount" class="tag">0 / ${places.length}</span></p>
    <div class="map-box" id="exploreMap"></div>
    <div class="learn-info" id="exploreInfo">Tik op een stip!</div>`;
  let selected = null;
  const draw = () => {
    $('#exploreMap').innerHTML = renderMap(s.map, { labels: [...seen], clickable: true, highlight: selected, plus });
    $('#exploreMap').querySelectorAll('.marker').forEach(m => {
      if (seen.has(m.dataset.id)) m.classList.add('good');
      m.addEventListener('click', () => {
        const t = TOPO.find(x => x.id === m.dataset.id);
        selected = t.id;
        const isNew = !seen.has(t.id);
        seen.add(t.id);
        beep([[isNew ? 880 : 600, .08]]);
        $('#exploreInfo').innerHTML = `<b>${esc(t.name)}</b>${t.plus ? ' <span class="tag">+ topo</span>' : ''} – ${esc(t.what)}.<br><span class="muted">${esc(t.q.replace(/\?$/, ''))}? → <b>${esc(t.name)}</b></span>`;
        $('#exploreCount').textContent = `${seen.size} / ${places.length}`;
        draw();
        if (isNew && seen.size === places.length) stepDone('Je hebt alles ontdekt! 🔭');
      });
    });
  };
  draw();
}

/* ---------------- STAP: VLAGGETJES PLAKKEN ---------------- */
function stepFlags(s, body) {
  const plus = $('#plusTopo').checked;
  const queue = shuffle(TOPO.filter(t => t.map === s.map && !t.province && (plus || !t.plus)));
  const placed = [];
  let tries = 0, temp = null;
  body.innerHTML = `<h2 class="step-title">🚩 ${s.hard ? 'Nog een keer, nu sneller!' : 'Plak de vlaggetjes!'}</h2>
    <div class="flag-prompt" id="flagPrompt"></div>
    <div class="map-box" id="flagMap"></div>
    <p class="muted small" id="flagLeft"></p>`;
  const draw = () => {
    const target = queue[0];
    const labels = [...placed, ...(temp ? [temp] : [])];
    const hl = target && tries >= 2 ? target.id : null;
    $('#flagMap').innerHTML = renderMap(s.map, { labels, clickable: true, highlight: hl, plus });
    $('#flagMap').querySelectorAll('.marker').forEach(m => {
      if (placed.includes(m.dataset.id)) m.classList.add('good');
      if (m.dataset.id === temp) m.classList.add('bad');
      m.addEventListener('click', () => tap(m.dataset.id));
    });
    $('#flagPrompt').innerHTML = target
      ? `Waar ligt <b>${esc(target.name)}</b>? <span class="muted small">(${esc(target.what)})</span>${tries >= 2 ? '<br><small>Kijk naar de gele cirkel 😉</small>' : ''}`
      : 'Alle vlaggetjes staan! 🎉';
    $('#flagLeft').textContent = target ? `Nog ${queue.length} te gaan` : '';
  };
  const tap = id => {
    const target = queue[0];
    if (!target || placed.includes(id)) return;
    if (id === target.id) {
      sndGood();
      placed.push(id); queue.shift(); tries = 0; temp = null;
      draw();
      if (!queue.length) stepDone(s.hard ? 'Topo-kampioen! 🏆' : 'Alle vlaggetjes geplakt! 🚩');
    } else {
      oops();
      tries++; temp = id;
      draw();
      setTimeout(() => { if (temp === id) { temp = null; draw(); } }, 1400);
    }
  };
  draw();
}

/* ---------------- STAP: LETTERPUZZEL ---------------- */
function stepPuzzle(s, body) {
  const plus = $('#plusTopo').checked;
  // Lastige namen komen altijd langs, de rest willekeurig
  const must = ['ijsselmeer', 'zeeuwsvlaanderen', 'middelburg', 'lelystad'];
  const pool = TOPO.filter(t => !t.province && (plus || !t.plus));
  const chosen = [...pool.filter(t => must.includes(t.id)), ...shuffle(pool.filter(t => !must.includes(t.id)))].slice(0, s.count);
  const words = shuffle(chosen);
  let w = 0;
  body.innerHTML = `<h2 class="step-title">💎 Letterpuzzel</h2>
    <p class="muted small">Tik de letters in de goede volgorde. Let op de hoofdletters!</p>
    <div class="puzzle-clue" id="pzClue"></div>
    <div class="puzzle-slots" id="pzSlots"></div>
    <div class="puzzle-tiles" id="pzTiles"></div>
    <div class="actions left">
      <button class="btn ghost" id="pzUndo">⌫ terug</button>
      <button class="btn ghost" id="pzHint">💡 hint</button>
    </div>
    <p class="muted small" id="pzLeft"></p>`;

  let answer, tiles, typed;
  const load = () => {
    const t = words[w];
    answer = [...t.name];
    // IJ als één letter-tegel, zodat de hoofdletters opvallen
    const tokens = [];
    for (let k = 0; k < answer.length; k++) {
      if (answer[k] === 'I' && answer[k + 1] === 'J') { tokens.push('IJ'); k++; } else tokens.push(answer[k]);
    }
    answer = tokens;
    // extra afleid-tegels: dezelfde letter met andere hoofdletter
    const decoys = [];
    const first = tokens[0];
    decoys.push(first === 'IJ' ? 'Ij' : first.toLowerCase());
    tiles = shuffle([...tokens, ...decoys].map((ch, id) => ({ ch, id, used: false })));
    typed = [];
    $('#pzClue').innerHTML = `${esc(t.q)}`;
    $('#pzLeft').textContent = `Woord ${w + 1} van ${words.length}`;
    draw();
  };
  const show = ch => ch === ' ' ? '␣' : ch;
  const draw = () => {
    $('#pzSlots').innerHTML = answer.map((_, k) => `<span class="slot ${typed[k] ? 'filled' : ''}">${typed[k] ? esc(show(typed[k].ch)) : ''}</span>`).join('');
    $('#pzTiles').innerHTML = '';
    tiles.forEach(tl => {
      const b = document.createElement('button');
      b.className = 'tile';
      b.textContent = show(tl.ch);
      b.disabled = tl.used;
      b.onclick = () => pickTile(tl);
      $('#pzTiles').appendChild(b);
    });
  };
  const pickTile = tl => {
    if (typed.length >= answer.length) return;
    tl.used = true; typed.push(tl);
    beep([[500 + typed.length * 30, .05]]);
    draw();
    if (typed.length === answer.length) check();
  };
  const check = () => {
    const ok = typed.every((tl, k) => tl.ch === answer[k]);
    const slots = $('#pzSlots');
    if (ok) {
      sndGood();
      slots.classList.add('solved');
      setTimeout(() => {
        slots.classList.remove('solved');
        w++;
        if (w < words.length) load();
        else { $('#pzTiles').innerHTML = ''; $('#pzUndo').disabled = $('#pzHint').disabled = true; stepDone('Schatkist open! 💎💎💎'); }
      }, 900);
    } else {
      oops();
      slots.classList.add('shake-bad');
      setTimeout(() => { slots.classList.remove('shake-bad'); typed.forEach(tl => tl.used = false); typed = []; draw(); }, 700);
    }
  };
  $('#pzUndo').onclick = () => { const tl = typed.pop(); if (tl) { tl.used = false; draw(); } };
  $('#pzHint').onclick = () => {
    // haal foute letters weg en zet de volgende goede letter neer
    while (typed.length && typed.some((tl, k) => tl.ch !== answer[k])) { typed.pop().used = false; }
    const need = answer[typed.length];
    const tl = tiles.find(x => !x.used && x.ch === need);
    if (tl) { st.mistakes += 0.5; pickTile(tl); }
  };
  load();
}
