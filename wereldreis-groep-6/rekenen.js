/* =========================================================
   Wereldreis groep 6 – REKENEN
   Elk onderdeel heeft een generator die steeds nieuwe sommen maakt.

   Een som:  { q, t:'num'|'mc'|'breuk'|'text', a, opts?, unit?, visual?, u }
     num   – getal intypen (komma of punt mag)
     breuk – breuk intypen als 3/5 (gelijkwaardige breuken worden ook goed gerekend)
     mc    – kies uit opts
   ========================================================= */

const R = {
  ri: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  pick: a => a[Math.floor(Math.random() * a.length)],
  shuffle: a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  // getallen zoals op school: 4740, 12.500
  n: x => { const s = String(Math.abs(x)); const r = Math.abs(x) >= 10000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : s; return (x < 0 ? '−' : '') + r; },
  // kommagetal: 2,5
  k: x => String(Math.round(x * 1000) / 1000).replace('.', ','),
  eur: x => '€ ' + (Math.round(x * 100) / 100).toFixed(2).replace('.', ','),
  ggd: (a, b) => b ? R.ggd(b, a % b) : a,
  // maak 3 foute antwoorden in de buurt van het goede
  buren(a, stappen) {
    const s = new Set();
    let guard = 0;
    while (s.size < 3 && guard++ < 50) {
      const d = R.pick(stappen) * R.pick([-1, 1]);
      const v = a + d;
      if (v > 0 && v !== a) s.add(v);
    }
    return [...s];
  }
};

/* ---------- SVG-plaatjes ---------- */
const SVG = {
  staaf(titel, labels, waarden, as = 'aantal') {
    const max = Math.ceil(Math.max(...waarden) / 4) * 4 + 4;
    const W = 420, L = 118, top = 30, rowH = 34, H = top + labels.length * rowH + 40, bw = W - L - 20;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="Nunito, sans-serif" role="img" aria-label="${titel}">`;
    s += `<text x="${W / 2}" y="18" text-anchor="middle" font-weight="800" font-size="15" fill="#17324d">${titel}</text>`;
    for (let v = 0; v <= max; v += 2) {
      const x = L + (v / max) * bw;
      s += `<line x1="${x}" y1="${top - 4}" x2="${x}" y2="${top + labels.length * rowH}" stroke="${v % 4 ? '#eef3f8' : '#d8e4ee'}"/>`;
      if (v % 4 === 0) s += `<text x="${x}" y="${top + labels.length * rowH + 16}" text-anchor="middle" font-size="12" fill="#5d7186">${v}</text>`;
    }
    labels.forEach((lab, i) => {
      const y = top + i * rowH;
      s += `<text x="${L - 8}" y="${y + 21}" text-anchor="end" font-size="13" fill="#17324d">${lab}</text>`;
      s += `<rect x="${L}" y="${y + 6}" width="${(waarden[i] / max) * bw}" height="${rowH - 12}" rx="4" fill="#1f86c9"/>`;
    });
    s += `<text x="${L + bw / 2}" y="${H - 4}" text-anchor="middle" font-size="12" fill="#5d7186">${as}</text></svg>`;
    return s;
  },
  taart(n, k) {
    const r = 80, c = 90;
    let s = `<svg viewBox="0 0 180 180" width="180" xmlns="http://www.w3.org/2000/svg">`;
    for (let i = 0; i < n; i++) {
      const a1 = (i / n) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
      const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1), x2 = c + r * Math.cos(a2), y2 = c + r * Math.sin(a2);
      const big = 1 / n > .5 ? 1 : 0;
      s += `<path d="M${c},${c} L${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2} Z" fill="${i < k ? '#9aa7b4' : '#fff'}" stroke="#17324d" stroke-width="2"/>`;
    }
    return s + '</svg>';
  },
  strook(n, k) {
    const w = 300, h = 60, cw = w / n;
    let s = `<svg viewBox="0 0 ${w + 4} ${h + 4}" width="${w}" xmlns="http://www.w3.org/2000/svg">`;
    const vol = R.shuffle([...Array(n).keys()]).slice(0, k);
    for (let i = 0; i < n; i++) s += `<rect x="${2 + i * cw}" y="2" width="${cw}" height="${h}" fill="${vol.includes(i) ? '#9aa7b4' : '#fff'}" stroke="#17324d" stroke-width="2"/>`;
    return s + '</svg>';
  },
  rooster(b, h, metOmtrek) {
    const cs = 26, W = 12 * cs, H = 8 * cs, x0 = cs * Math.floor((12 - b) / 2), y0 = cs * Math.floor((8 - h) / 2);
    let s = `<svg viewBox="0 0 ${W + 2} ${H + 2}" width="${W}" xmlns="http://www.w3.org/2000/svg">`;
    for (let i = 0; i <= 12; i++) s += `<line x1="${1 + i * cs}" y1="1" x2="${1 + i * cs}" y2="${H + 1}" stroke="#d8e4ee"/>`;
    for (let j = 0; j <= 8; j++) s += `<line x1="1" y1="${1 + j * cs}" x2="${W + 1}" y2="${1 + j * cs}" stroke="#d8e4ee"/>`;
    s += `<rect x="${1 + x0}" y="${1 + y0}" width="${b * cs}" height="${h * cs}" fill="rgba(31,134,201,.25)" stroke="#1f86c9" stroke-width="3"/>`;
    return s + '</svg><div class="klok-hint">1 hokje = 1 cm bij 1 cm</div>';
  },
  lijn(van, tot, stap, pijl) {
    const W = 400, L = 20, bw = W - 2 * L, n = (tot - van) / stap;
    let s = `<svg viewBox="0 0 ${W} 80" xmlns="http://www.w3.org/2000/svg" font-family="Nunito, sans-serif">`;
    s += `<line x1="${L}" y1="40" x2="${W - L}" y2="40" stroke="#17324d" stroke-width="2"/>`;
    for (let i = 0; i <= n; i++) {
      const x = L + (i / n) * bw, groot = i === 0 || i === n;
      s += `<line x1="${x}" y1="${groot ? 30 : 34}" x2="${x}" y2="${groot ? 50 : 46}" stroke="#17324d" stroke-width="2"/>`;
      if (groot) s += `<text x="${x}" y="68" text-anchor="middle" font-size="14" font-weight="800" fill="#17324d">${R.n(van + i * stap)}</text>`;
    }
    const px = L + ((pijl - van) / (tot - van)) * bw;
    s += `<path d="M${px},28 l-7,-14 h14 z" fill="#d94a5a"/>`;
    return s + '</svg>';
  }
};

/* ---------- onderdelen ---------- */
const REKENEN = [
  {
    id: 'plusmin', naam: 'Plus en min tot 10.000', emoji: '➕',
    uitleg: `<p>Reken handig in stappen. Splits het kleinste getal.</p>
      <div class="voorbeeld">4740 − 570 = ?<br>4740 − 500 = 4240<br>4240 − 70 = <b>4170</b></div>
      <p>Bij een gat in de som (3200 + … = 5000): reken terug met min, of tel aan.</p>`,
    gen() {
      const type = R.ri(0, 4);
      if (type === 0) { const a = R.ri(20, 95) * 10 + R.pick([0, 0, 5]), b = R.ri(12, 89) * 10; return { q: `${R.n(a + b)} − ${R.n(b)} = …`, t: 'num', a: a, u: `Splits ${b}: eerst ${Math.floor(b / 100) * 100} eraf, dan ${b % 100}. Antwoord: ${R.n(a)}.` }; }
      if (type === 1) { const a = R.ri(100, 900) * 5, b = R.ri(15, 95) * 10; return { q: `${R.n(a)} + ${R.n(b)} = …`, t: 'num', a: a + b, u: `${R.n(a)} + ${Math.floor(b / 100) * 100} + ${b % 100} = ${R.n(a + b)}.` }; }
      if (type === 2) { const t = R.pick([1000, 2000, 5000, 10000]), a = R.ri(11, t / 10 - 1) * 5 + R.pick([0, 0, 3]); return { q: `${R.n(t)} − ${R.n(a)} = …`, t: 'num', a: t - a, u: `Tel aan van ${R.n(a)} tot ${R.n(t)}. Dat is ${R.n(t - a)}.` }; }
      if (type === 3) { const doel = R.pick([1000, 2500, 5000, 6000, 10000]), a = R.ri(2, doel / 100 - 2) * 100 + R.pick([0, 50]); return { q: `${R.n(a)} + … = ${R.n(doel)}`, t: 'num', a: doel - a, u: `${R.n(doel)} − ${R.n(a)} = ${R.n(doel - a)}.` }; }
      const a = R.ri(25, 98) * 100, b = R.ri(3, 25) * 100, c = R.ri(1, 9) * 10;
      return { q: `${R.n(a)} − ${R.n(b)} + ${c} = …`, t: 'num', a: a - b + c, u: `Werk van links naar rechts: ${R.n(a)} − ${R.n(b)} = ${R.n(a - b)}, + ${c} = ${R.n(a - b + c)}.` };
    }
  },
  {
    id: 'cijferen', naam: 'Cijferend optellen en aftrekken', emoji: '🧮',
    uitleg: `<p>Bij grote getallen zet je de getallen <b>onder elkaar</b>: eenheden onder eenheden, tientallen onder tientallen.</p>
      <ol><li>Begin rechts (bij de eenheden).</li><li>Meer dan 9? Schrijf de eenheid op en <b>onthoud 1</b> bij de volgende kolom.</li><li>Bij aftrekken: kun je het niet? <b>Leen</b> 1 van de kolom links ernaast.</li></ol>
      <div class="voorbeeld"><pre style="margin:0;font-size:1.05rem">  ¹ ¹
  4867
+ 2756
------
  7623</pre></div>`,
    gen() {
      if (Math.random() < .5) { const a = R.ri(1200, 6999), b = R.ri(1100, 9999 - a); return { q: `Reken uit: ${a} + ${b} = …`, t: 'num', a: a + b, u: `Zet ze onder elkaar en begin rechts. ${a} + ${b} = ${a + b}.` }; }
      const a = R.pick([R.ri(3000, 9999), R.pick([3000, 4002, 5003, 6000, 7004, 8001])]), b = R.ri(1111, a - 500);
      return { q: `Reken uit: ${a} − ${b} = …`, t: 'num', a: a - b, u: `Onder elkaar, rechts beginnen, lenen waar nodig. ${a} − ${b} = ${a - b}.` };
    }
  },
  {
    id: 'keer', naam: 'Keersommen', emoji: '✖️',
    uitleg: `<p>Ken je tafels tot en met 10 uit je hoofd. Grotere keersommen splits je:</p>
      <div class="voorbeeld">24 × 6 = 20 × 6 + 4 × 6 = 120 + 24 = <b>144</b><br>30 × 40 = 3 × 4 = 12, en dan twee nullen erachter = <b>1200</b><br>36 × 100 = <b>3600</b> (twee nullen erachter)</div>`,
    gen() {
      const type = R.ri(0, 5);
      if (type === 0) { const a = R.ri(6, 9), b = R.ri(6, 9); return { q: `${a} × ${b} = …`, t: 'num', a: a * b, u: `Tafel van ${a}: ${a} × ${b} = ${a * b}.` }; }
      if (type === 1) { const a = R.ri(12, 99), m = R.pick([10, 100]); return { q: `${a} × ${m} = …`, t: 'num', a: a * m, u: `Keer ${m}: zet er ${m === 10 ? 'één nul' : 'twee nullen'} achter → ${R.n(a * m)}.` }; }
      if (type === 2) { const a = R.ri(13, 49), b = R.ri(3, 9); return { q: `${a} × ${b} = …`, t: 'num', a: a * b, u: `${Math.floor(a / 10) * 10} × ${b} = ${Math.floor(a / 10) * 10 * b} en ${a % 10} × ${b} = ${(a % 10) * b}. Samen ${a * b}.` }; }
      if (type === 3) { const a = R.ri(2, 9) * 10, b = R.ri(2, 9) * 10; return { q: `${a} × ${b} = …`, t: 'num', a: a * b, u: `${a / 10} × ${b / 10} = ${a * b / 100}, met twee nullen erachter: ${R.n(a * b)}.` }; }
      if (type === 4) { const a = R.pick([11, 12, 15, 25]), b = R.ri(3, 12); return { q: `${a} × ${b} = …`, t: 'num', a: a * b, u: `Splits: ${a} × ${b} = 10 × ${b} + ${a - 10} × ${b} = ${10 * b} + ${(a - 10) * b} = ${a * b}.` }; }
      const ding = R.pick([['raketten', 'motoren', 4], ['ridders', 'pijlen', 12], ['landen', 'vlaggen', 3], ['robots', 'wieltjes', 6]]), n = R.ri(7, 25);
      return { q: `Er staan ${n} ${ding[0]}. Elk heeft ${ding[2]} ${ding[1]}. Hoeveel ${ding[1]} zijn dat samen?`, t: 'num', a: n * ding[2], unit: ding[1], u: `${n} × ${ding[2]} = ${n * ding[2]}.` };
    }
  },
  {
    id: 'delen', naam: 'Deelsommen (ook met rest)', emoji: '➗',
    uitleg: `<p>Delen is eerlijk verdelen. Gebruik je tafels: 56 : 8 = 7, want 7 × 8 = 56.</p>
      <p><b>Let op bij verhaaltjessommen met een rest!</b></p>
      <ul><li>"Hoeveel zakjes kun je <b>helemaal vullen</b>?" → de rest telt niet mee (afronden naar beneden).</li>
      <li>"Hoeveel bussen zijn er <b>nodig</b>?" → voor de rest heb je nog een bus nodig (afronden naar boven).</li></ul>
      <div class="voorbeeld">130 kinderen, in een bus passen 50. 130 : 50 = 2 rest 30 → je hebt <b>3 bussen</b> nodig.</div>`,
    gen() {
      const type = R.ri(0, 4);
      if (type === 0) { const b = R.ri(3, 9), a = R.ri(3, 10); return { q: `${a * b} : ${b} = …`, t: 'num', a: a, u: `${a} × ${b} = ${a * b}, dus ${a * b} : ${b} = ${a}.` }; }
      if (type === 1) { const b = R.ri(2, 9), a = R.ri(2, 9) * 10; return { q: `${a * b} : ${b} = …`, t: 'num', a: a, u: `${a * b / 10} : ${b} = ${a / 10}, met een nul erachter: ${a}.` }; }
      if (type === 2) { const per = R.pick([6, 8, 12, 15]), zak = R.ri(4, 9), rest = R.ri(1, per - 1), tot = per * zak + rest; return { q: `Ryan heeft ${tot} snoepjes. In elk zakje gaan er ${per}. Hoeveel zakjes kan hij helemaal vullen?`, t: 'num', a: zak, unit: 'zakjes', u: `${tot} : ${per} = ${zak} rest ${rest}. Met de rest kun je geen vol zakje maken: ${zak} zakjes.` }; }
      if (type === 3) { const per = R.pick([30, 40, 50, 60]), n = R.ri(2, 5), rest = R.ri(5, per - 5), tot = per * n + rest; return { q: `${tot} kinderen gaan met de bus naar het Ruimtemuseum. In één bus passen ${per} kinderen. Hoeveel bussen zijn er nodig?`, t: 'num', a: n + 1, unit: 'bussen', u: `${tot} : ${per} = ${n} rest ${rest}. Die ${rest} kinderen moeten ook mee: ${n + 1} bussen.` }; }
      const b = R.ri(3, 9), a = R.ri(4, 12), r = R.ri(1, b - 1);
      return { q: `${a * b + r} : ${b} = … rest …<br><small class="muted">Typ alleen hoeveel keer ${b} erin past.</small>`, t: 'num', a: a, u: `${a} × ${b} = ${a * b}. ${a * b + r} − ${a * b} = ${r} rest. Dus ${a} rest ${r}.` };
    }
  },
  {
    id: 'breuken', naam: 'Breuken', emoji: '🍕',
    uitleg: `<p>Een breuk is een deel van een geheel. <b>Onder</b> de streep: in hoeveel gelijke stukken is het verdeeld. <b>Boven</b> de streep: hoeveel stukken je neemt.</p>
      <div class="voorbeeld">Cirkel in 5 stukken, 3 grijs → <b>3/5</b> deel is grijs.<br>¾ van 20: eerst 20 : 4 = 5 (één kwart), dan 3 × 5 = <b>15</b>.</div>
      <p>Typ een breuk zo: <b>3/5</b>. Gelijkwaardige breuken (zoals 6/10) zijn ook goed.</p>`,
    gen() {
      const type = R.ri(0, 4);
      if (type === 0) { const n = R.pick([3, 4, 5, 6, 8, 10]), k = R.ri(1, n - 1); return { q: 'Welk deel van de cirkel is grijs?', t: 'breuk', a: `${k}/${n}`, visual: SVG.taart(n, k), u: `Er zijn ${n} gelijke stukken en ${k} zijn grijs: ${k}/${n}.` }; }
      if (type === 1) { const n = R.pick([4, 5, 6, 8, 10]), k = R.ri(1, n - 1); return { q: 'Welk deel van de strook is grijs?', t: 'breuk', a: `${k}/${n}`, visual: SVG.strook(n, k), u: `${k} van de ${n} vakjes zijn grijs: ${k}/${n}.` }; }
      if (type === 2) { const n = R.pick([2, 3, 4, 5, 10]), k = R.ri(1, n - 1), m = R.ri(2, 8) * n; const ding = R.pick(['knikkers', 'stickers', 'kaartjes', 'snoepjes']); return { q: `Hoeveel is ${k}/${n} deel van ${m} ${ding}?`, t: 'num', a: m / n * k, unit: ding, u: `${m} : ${n} = ${m / n} (één ${n === 2 ? 'helft' : n + 'e deel'}). ${k} × ${m / n} = ${m / n * k}.` }; }
      if (type === 3) { const [a, b, c] = R.pick([[1, 2, 4], [1, 2, 8], [1, 3, 6], [1, 4, 8], [3, 4, 8], [2, 5, 10], [1, 5, 10], [2, 3, 6]]); const f = c / b; return { q: `${a}/${b} = …/${c}<br><small class="muted">Typ het getal boven de streep.</small>`, t: 'num', a: a * f, u: `${b} × ${f} = ${c}, dus boven ook × ${f}: ${a} × ${f} = ${a * f}.` }; }
      const paren = [['3/4', '2/3', '3/4 is groter: ¾ = 9/12 en ⅔ = 8/12.'], ['1/2', '2/5', '1/2 is groter: 2/5 is minder dan de helft.'], ['5/8', '1/2', '5/8 is groter: 1/2 = 4/8.'], ['2/3', '3/5', '2/3 is groter: 2/3 = 10/15 en 3/5 = 9/15.'], ['1/3', '1/4', '1/3 is groter: hoe minder stukken, hoe groter elk stuk.'], ['7/10', '1/2', '7/10 is groter: 1/2 = 5/10.']];
      const [g, k, u] = R.pick(paren);
      return { q: 'Welke breuk is het grootst?', t: 'mc', a: g, opts: R.shuffle([g, k, 'Ze zijn even groot']), u };
    }
  },
  {
    id: 'geld', naam: 'Geld en kommagetallen', emoji: '💶',
    uitleg: `<p>Bij geld staan de <b>centen achter de komma</b>. € 4,75 = 4 euro en 75 cent.</p>
      <div class="voorbeeld">Wisselgeld: je betaalt € 20 voor iets van € 13,65.<br>Tel aan: 13,65 → 14,00 (35 cent) → 20,00 (6 euro). Terug: <b>€ 6,35</b>.</div>
      <p>Zo min mogelijk briefjes en munten? Begin steeds met het grootste briefje of de grootste munt die past.</p>`,
    gen() {
      const type = R.ri(0, 4);
      if (type === 0) { const a = R.ri(105, 990) * 5 / 100, b = R.ri(55, 690) * 5 / 100; const ding = R.pick([['een ruimteposter', 'een sleutelhanger'], ['een boek over ridders', 'een stift'], ['een vlaggenpuzzel', 'een ijsje']]); return { q: `Oliver koopt ${ding[0]} van ${R.eur(a)} en ${ding[1]} van ${R.eur(b)}. Hoeveel moet hij betalen?`, t: 'num', a: Math.round((a + b) * 100) / 100, unit: 'euro', u: `${R.eur(a)} + ${R.eur(b)} = ${R.eur(a + b)}.` }; }
      if (type === 1) { const betaal = R.pick([10, 20, 50]), prijs = R.ri(Math.round(betaal * 8), betaal * 19) * 5 / 100; return { q: `Een kaartje voor het Ruimtepark kost ${R.eur(prijs)}. Je betaalt met een briefje van € ${betaal}. Hoeveel krijg je terug?`, t: 'num', a: Math.round((betaal - prijs) * 100) / 100, unit: 'euro', u: `${betaal} − ${R.k(prijs)} = ${R.eur(betaal - prijs)}. Tel aan vanaf ${R.eur(prijs)}.` }; }
      if (type === 2) {
        const bedrag = R.ri(11, 99) + R.pick([0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 0.9, 0.3, 0.6]);
        const stukken = [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1]; let rest = Math.round(bedrag * 100), n = 0; const lijst = [];
        stukken.forEach(s => { const c = Math.floor(rest / Math.round(s * 100)); if (c) { lijst.push(`${c} × ${R.eur(s)}`); n += c; rest -= c * Math.round(s * 100); } });
        return { q: `Je wilt ${R.eur(bedrag)} betalen met zo weinig mogelijk briefjes en munten. Hoeveel briefjes en munten heb je in totaal nodig?<br><small class="muted">Er zijn briefjes van € 50, € 20, € 10, € 5 en munten van € 2, € 1, 50, 20 en 10 cent.</small>`, t: 'num', a: n, unit: 'stuks', u: `${lijst.join(' + ')} = ${n} stuks.` };
      }
      if (type === 3) { const a = R.ri(11, 89) / 10, b = R.ri(11, 59) / 10; return { q: `${R.k(a)} + ${R.k(b)} = …`, t: 'num', a: Math.round((a + b) * 10) / 10, u: `Eerst de hele getallen, dan de tienden: ${R.k(a)} + ${R.k(b)} = ${R.k(a + b)}.` }; }
      const basis = R.ri(1, 9), opts = R.shuffle([basis + 0.5, basis + 0.45, basis + 0.405, basis + 0.09]);
      return { q: 'Welk getal is het grootst?', t: 'mc', a: R.k(basis + 0.5), opts: opts.map(R.k), u: `Vergelijk na de komma cijfer voor cijfer: ${R.k(basis + 0.5)} = ${R.k(basis)},50 is het grootst.` };
    }
  },
  {
    id: 'meten', naam: 'Meten en omrekenen', emoji: '📏',
    uitleg: `<p>Lengte: <b>km – hm – dam – m – dm – cm – mm</b>. Elke stap naar rechts is × 10.</p>
      <div class="voorbeeld">1 m = 10 dm = 100 cm = 1000 mm<br>1 km = 1000 m<br>1 kg = 1000 g<br>1 liter = 10 dl = 100 cl = 1000 ml</div>
      <p>380 dm = ? cm: van dm naar cm is één stap → × 10 → <b>3800 cm</b>.</p>`,
    gen() {
      const type = R.ri(0, 3);
      const om = [['m', 'cm', 100], ['dm', 'cm', 10], ['m', 'dm', 10], ['km', 'm', 1000], ['cm', 'mm', 10], ['m', 'mm', 1000], ['kg', 'g', 1000], ['l', 'dl', 10], ['l', 'ml', 1000], ['dl', 'ml', 100], ['l', 'cl', 100]];
      if (type === 0) { const [v, n, f] = R.pick(om), x = R.ri(2, 95) * R.pick([1, 1, 10]); return { q: `${R.n(x)} ${v} = … ${n}`, t: 'num', a: x * f, unit: n, u: `Van ${v} naar ${n} is × ${f}: ${R.n(x)} × ${f} = ${R.n(x * f)} ${n}.` }; }
      if (type === 1) { const [v, n, f] = R.pick(om), x = R.ri(2, 40) * f; return { q: `${R.n(x)} ${n} = … ${v}`, t: 'num', a: x / f, unit: v, u: `Van ${n} naar ${v} is : ${f}: ${R.n(x)} : ${f} = ${R.n(x / f)} ${v}.` }; }
      if (type === 2) { const [v, n, f, h] = R.pick([['km', 'm', 1000, 0.5], ['km', 'm', 1000, 2.5], ['kg', 'g', 1000, 1.5], ['l', 'ml', 1000, 0.25], ['m', 'cm', 100, 1.5], ['kg', 'g', 1000, 0.5], ['l', 'ml', 1000, 1.5]]); return { q: `${R.k(h)} ${v} = … ${n}`, t: 'num', a: h * f, unit: n, u: `1 ${v} = ${f} ${n}. Dus ${R.k(h)} ${v} = ${R.n(h * f)} ${n}.` }; }
      const s = R.pick([['een koffer', 'kilogram', [1.4, 14, 140, 1400], 14], ['een volwassen man', 'centimeter lang', [18, 180, 1800, 18000], 180], ['een pak melk', 'liter', [0.1, 1, 10, 100], 1], ['een appel', 'gram', [2, 20, 200, 2000], 200], ['een fiets', 'kilogram', [1.5, 15, 150, 1500], 15], ['een voetbalveld', 'meter lang', [10, 100, 1000, 10000], 100], ['een potlood', 'centimeter lang', [1.7, 17, 170, 1700], 17], ['een emmer water', 'liter', [1, 10, 100, 1000], 10], ['een olifant', 'kilogram', [50, 500, 5000, 50000], 5000]]);
      return { q: `Hoeveel weegt of meet ${s[0]} ongeveer?`, t: 'mc', a: `${R.k(s[3])} ${s[1]}`, opts: s[2].map(x => `${R.k(x)} ${s[1]}`), u: `${s[0][0].toUpperCase() + s[0].slice(1)}: ongeveer ${R.k(s[3])} ${s[1]}. Bedenk iets wat je kent om mee te vergelijken.` };
    }
  },
  {
    id: 'grafiek', naam: 'Grafieken en tabellen', emoji: '📊',
    uitleg: `<p>Kijk eerst naar de <b>titel</b> en wat er op de <b>as</b> staat (bijvoorbeeld "aantal stemmen").</p>
      <ol><li>Zoek de staaf die in de vraag genoemd wordt.</li><li>Volg het einde van de staaf recht naar beneden naar de getallen.</li><li>Ligt het tussen twee getallen? Dan zit het er precies tussenin.</li></ol>`,
    gen() {
      const sets = [
        ['Favoriete planeet in groep 6', ['Mars', 'Jupiter', 'Saturnus', 'Aarde', 'Neptunus'], 'aantal stemmen'],
        ['Activiteiten tijdens kamp', ['Spookbos', 'Waterbaan', 'Creamiddag', 'Sportmiddag', 'Dansshow'], 'aantal stemmen'],
        ['Vakantieland van de klas', ['Frankrijk', 'Spanje', 'Duitsland', 'Italië', 'Turkije'], 'aantal kinderen'],
        ['Bezoekers Ruimtemuseum', ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'], 'aantal bezoekers'],
        ['Mooiste vlag (stemmen)', ['Japan', 'Canada', 'Brazilië', 'Nepal', 'Zweden'], 'aantal stemmen']
      ];
      const [titel, labels, as] = R.pick(sets);
      const vals = labels.map(() => R.ri(1, 12) * 2);
      const i = R.ri(0, 4); let j; do { j = R.ri(0, 4); } while (j === i);
      vals[j] = vals[i]; // er is altijd een gelijke
      let k; do { k = R.ri(0, 4); } while (vals[k] === vals[i]);
      const visual = SVG.staaf(titel, labels, vals, as);
      const type = R.ri(0, 3);
      if (type === 0) return { q: `Welke krijgt evenveel als ${labels[i]}?`, t: 'mc', a: labels[j], opts: R.shuffle(labels.filter((_, x) => x !== i)), visual, u: `${labels[i]} en ${labels[j]} komen allebei tot ${vals[i]}.` };
      if (type === 1) { const a = Math.max(vals[i], vals[k]) - Math.min(vals[i], vals[k]), hoog = vals[i] > vals[k] ? i : k, laag = hoog === i ? k : i; return { q: `Hoeveel meer heeft ${labels[hoog]} dan ${labels[laag]}?`, t: 'num', a, visual, u: `${labels[hoog]}: ${vals[hoog]}, ${labels[laag]}: ${vals[laag]}. ${vals[hoog]} − ${vals[laag]} = ${a}.` }; }
      if (type === 2) { const m = Math.max(...vals), w = labels.filter((_, x) => vals[x] === m); if (w.length === 1) return { q: 'Welke heeft de meeste?', t: 'mc', a: w[0], opts: labels, visual, u: `De langste staaf is ${w[0]} (${m}).` }; }
      return { q: `Hoeveel is ${labels[i]} en ${labels[k]} samen?`, t: 'num', a: vals[i] + vals[k], visual, u: `${vals[i]} + ${vals[k]} = ${vals[i] + vals[k]}.` };
    }
  },
  {
    id: 'getallen', naam: 'Getallen en getallenlijn', emoji: '🔢',
    uitleg: `<p><b>Getallenlijn:</b> kijk naar het begin en het eind. Hoeveel streepjes zitten ertussen? Bereken hoeveel één stapje waard is.</p>
      <p><b>Afronden op honderdtallen:</b> kijk naar het tiental. 0 t/m 4 → naar beneden, 5 t/m 9 → naar boven. 4750 → 4800.</p>
      <p><b>Waarde van een cijfer:</b> in 4735 is de 7 zeven honderdtallen = 700.</p>`,
    gen() {
      const type = R.ri(0, 4);
      if (type === 0) { const [van, tot, n] = R.pick([[0, 1000, 10], [0, 100, 10], [2000, 3000, 10], [0, 500, 5], [0, 10000, 10], [400, 600, 10]]); const stap = (tot - van) / n, i = R.ri(1, n - 1); return { q: 'Welk getal hoort bij de pijl?', t: 'num', a: van + i * stap, visual: SVG.lijn(van, tot, stap, van + i * stap), u: `Van ${R.n(van)} tot ${R.n(tot)} zijn ${n} stapjes. Eén stapje = ${R.n(stap)}. De pijl staat bij stapje ${i}: ${R.n(van + i * stap)}.` }; }
      if (type === 1) { const x = R.ri(1010, 9890); const op = R.pick([10, 100, 1000]); const a = Math.round(x / op) * op; return { q: `Rond ${x} af op ${op === 10 ? 'tientallen' : op === 100 ? 'honderdtallen' : 'duizendtallen'}.`, t: 'num', a, u: `Kijk naar het cijfer rechts van de ${op === 10 ? 'tientallen' : op === 100 ? 'honderdtallen' : 'duizendtallen'}. ${x} → ${R.n(a)}.` }; }
      if (type === 2) { const x = R.ri(1000, 9999), s = String(x), pos = R.ri(0, 3), c = s[pos]; if (c === '0') return this.gen(); const w = Number(c) * 10 ** (3 - pos); return { q: `Wat is de waarde van de ${c} in het getal ${x}?${s.split(c).length > 2 ? ' (de ' + ['eerste', 'tweede', 'derde', 'vierde'][pos] + ' cijfer)' : ''}`, t: 'num', a: w, u: `De ${c} staat op de plek van de ${['duizendtallen', 'honderdtallen', 'tientallen', 'eenheden'][pos]}: ${R.n(w)}.` }; }
      if (type === 3) { const a = R.ri(10, 90) * 100, d = R.pick([200, 400, 1000, 600]); return { q: `Welk getal ligt precies in het midden van ${R.n(a)} en ${R.n(a + d)}?`, t: 'num', a: a + d / 2, u: `Het verschil is ${d}. De helft is ${d / 2}. ${R.n(a)} + ${d / 2} = ${R.n(a + d / 2)}.` }; }
      const basis = R.ri(1, 9) * 1000 + R.ri(1, 9) * 100, opts = R.shuffle([basis + 99, basis + 909, basis + 990, basis + 90]);
      return { q: 'Welk getal is het grootst?', t: 'mc', a: String(basis + 990), opts: opts.map(String), u: `Vergelijk van links naar rechts. ${basis + 990} heeft de meeste honderdtallen.` };
    }
  },
  {
    id: 'omtrek', naam: 'Omtrek en oppervlakte', emoji: '🟦',
    uitleg: `<p><b>Omtrek</b> = de lengte van de rand helemaal rondom. Tel alle zijden op.</p>
      <p><b>Oppervlakte</b> = hoeveel hokjes erin passen. Bij een rechthoek: lengte × breedte.</p>
      <div class="voorbeeld">Rechthoek van 5 bij 3 cm:<br>omtrek = 5 + 3 + 5 + 3 = <b>16 cm</b><br>oppervlakte = 5 × 3 = <b>15 cm²</b> (vierkante centimeter)</div>`,
    gen() {
      const b = R.ri(2, 9), h = R.ri(2, 6);
      if (Math.random() < .5) return { q: 'Wat is de oppervlakte van de rechthoek?', t: 'num', a: b * h, unit: 'cm²', visual: SVG.rooster(b, h), u: `${b} × ${h} = ${b * h} hokjes = ${b * h} cm².` };
      if (Math.random() < .6) return { q: 'Wat is de omtrek van de rechthoek?', t: 'num', a: 2 * (b + h), unit: 'cm', visual: SVG.rooster(b, h), u: `${b} + ${h} + ${b} + ${h} = ${2 * (b + h)} cm.` };
      const L = R.ri(4, 20), B = R.ri(3, 12);
      return { q: `Een moestuin is ${L} meter lang en ${B} meter breed. Er moet een hek omheen. Hoeveel meter hek is er nodig?`, t: 'num', a: 2 * (L + B), unit: 'meter', u: `Omtrek: ${L} + ${B} + ${L} + ${B} = ${2 * (L + B)} meter.` };
    }
  },
  {
    id: 'verhaal', naam: 'Verhaaltjessommen', emoji: '📝',
    uitleg: `<p>Een verhaaltjessom los je op met een plan:</p>
      <ol><li><b>Lees</b> de som rustig, twee keer.</li><li>Wat wordt er <b>gevraagd</b>? Onderstreep de vraag.</li><li>Welke <b>getallen</b> heb je nodig? (Niet alle getallen zijn nodig!)</li><li>Welke <b>som</b> moet je maken: +, −, ×, :?</li><li><b>Controleer</b>: kan het antwoord kloppen?</li></ol>`,
    gen() {
      const t = R.ri(0, 7);
      if (t === 0) { const a = R.ri(18, 32), b = R.ri(3, 6); return { q: `Een raket heeft ${a} liter brandstof per minuut nodig. De motor brandt ${b} minuten. Hoeveel liter brandstof is er nodig?`, t: 'num', a: a * b, unit: 'liter', u: `${a} × ${b} = ${a * b} liter.` }; }
      if (t === 1) { const jaar = R.ri(1300, 1700), nu = 2026; return { q: `Een kasteel is gebouwd in het jaar ${jaar}. Hoeveel jaar oud is het kasteel in ${nu}?`, t: 'num', a: nu - jaar, unit: 'jaar', u: `${nu} − ${jaar} = ${nu - jaar} jaar.` }; }
      if (t === 2) { const p = R.ri(3, 8), k = R.ri(12, 25) * 10; return { q: `In het museum hangen ${p * k} vlaggen, verdeeld over ${p} zalen. In elke zaal hangen evenveel vlaggen. Hoeveel vlaggen hangen er in één zaal?`, t: 'num', a: k, unit: 'vlaggen', u: `${p * k} : ${p} = ${k}.` }; }
      if (t === 3) { const prijs = R.pick([3.5, 4.5, 2.25, 6.75, 12.5]), n = R.ri(2, 4); return { q: `Een ansichtkaart uit Egypte kost ${R.eur(prijs)}. Jesse koopt er ${n}. Hoeveel betaalt hij?`, t: 'num', a: prijs * n, unit: 'euro', u: `${n} × ${R.eur(prijs)} = ${R.eur(prijs * n)}.` }; }
      if (t === 4) { const tot = R.ri(45, 52) * 10, a = R.ri(12, 20) * 10 + R.ri(1, 9), b = R.ri(6, 14) * 10 + R.ri(1, 9); return { q: `De treinreis van Amsterdam naar Parijs is ${tot} km. Tot Brussel rijdt de trein ${a} km. Daarna rijdt hij nog ${b} km. Hoeveel km moet hij dan nog tot Parijs?`, t: 'num', a: tot - a - b, unit: 'km', u: `${a} + ${b} = ${a + b} km gereden. ${tot} − ${a + b} = ${tot - a - b} km.` }; }
      if (t === 5) { const kids = R.ri(24, 32), boeken = R.ri(2, 4), voorraad = kids * boeken + R.ri(5, 40); return { q: `In de klas zitten ${kids} kinderen. Ieder kind leent ${boeken} boeken over de ruimte. In de bibliotheek stonden ${voorraad} ruimteboeken. Hoeveel boeken staan er nog?`, t: 'num', a: voorraad - kids * boeken, unit: 'boeken', u: `${kids} × ${boeken} = ${kids * boeken} geleend. ${voorraad} − ${kids * boeken} = ${voorraad - kids * boeken}.` }; }
      if (t === 6) { const robot = R.ri(35, 85), spaar = R.ri(3, 6) * 2, heeft = R.ri(5, robot - 10); const weken = Math.ceil((robot - heeft) / spaar); return { q: `Oliver wil een robotset van € ${robot}. Hij heeft al € ${heeft}. Elke week spaart hij € ${spaar}. Na hoeveel weken heeft hij genoeg geld?`, t: 'num', a: weken, unit: 'weken', u: `Hij heeft nog € ${robot - heeft} nodig. ${robot - heeft} : ${spaar} = ${((robot - heeft) / spaar).toString().replace('.', ',')}, dus na ${weken} weken heeft hij genoeg.` }; }
      const astronauten = R.ri(3, 7), dagen = R.ri(4, 12), maaltijd = 3;
      return { q: `In het ruimtestation wonen ${astronauten} astronauten. Iedere astronaut eet ${maaltijd} maaltijden per dag. Hoeveel maaltijden zijn er nodig voor ${dagen} dagen?`, t: 'num', a: astronauten * maaltijd * dagen, unit: 'maaltijden', u: `${astronauten} × ${maaltijd} = ${astronauten * maaltijd} per dag. × ${dagen} = ${astronauten * maaltijd * dagen}.` };
    }
  }
];
