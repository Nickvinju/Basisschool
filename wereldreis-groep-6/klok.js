/* =========================================================
   Wereldreis groep 6 – KLOKKIJKEN (analoog)
   t:'tijd' = digitale tijd intypen (14:40)
   t:'zet'  = zelf de wijzers goed zetten (sleep de grote wijzer)
   ========================================================= */

const KLOK = (() => {
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const h12 = h => ((h % 12) + 12) % 12 || 12;
  const pad = n => String(n).padStart(2, '0');
  const dig = (h, m) => `${h}:${pad(m)}`;

  // "10 voor half 3"
  function woorden(h, m) {
    const nu = h12(h), straks = h12(h + 1);
    if (m === 0) return `${nu} uur`;
    if (m === 15) return `kwart over ${nu}`;
    if (m === 30) return `half ${straks}`;
    if (m === 45) return `kwart voor ${straks}`;
    if (m < 15) return `${m} over ${nu}`;
    if (m < 30) return `${30 - m} voor half ${straks}`;
    if (m < 45) return `${m - 30} over half ${straks}`;
    return `${60 - m} voor ${straks}`;
  }

  function foutjes(h, m) {
    const goed = woorden(h, m);
    const kand = [
      woorden(h, (60 - m) % 60), woorden(h - 1, m), woorden(h + 1, m),
      woorden(h, (m + 30) % 60), woorden(h - 1, (60 - m) % 60), woorden(h + 1, (60 - m) % 60),
      woorden(Math.round(m / 5) % 12, (h12(h) * 5) % 60) // wijzers verwisseld
    ];
    // voor ↔ over omdraaien (klassieke fout)
    if (/voor|over/.test(goed)) kand.unshift(goed.includes('voor') ? goed.replace('voor', 'over') : goed.replace('over', 'voor'));
    const s = [...new Set(kand)].filter(x => x !== goed);
    return shuffle(s).slice(0, 3);
  }

  function svg(h, m, id) {
    const c = 110, r = 100;
    let s = `<svg class="klok" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" ${id ? `id="${id}"` : ''} role="img" aria-label="klok">`;
    s += `<circle cx="${c}" cy="${c}" r="${r}" fill="#fffdf6" stroke="#17324d" stroke-width="6"/>`;
    for (let i = 0; i < 60; i++) {
      const a = i * 6 * Math.PI / 180, big = i % 5 === 0;
      const r1 = big ? r - 14 : r - 8, r2 = r - 3;
      s += `<line x1="${c + r1 * Math.sin(a)}" y1="${c - r1 * Math.cos(a)}" x2="${c + r2 * Math.sin(a)}" y2="${c - r2 * Math.cos(a)}" stroke="#17324d" stroke-width="${big ? 3 : 1.2}"/>`;
    }
    for (let i = 1; i <= 12; i++) {
      const a = i * 30 * Math.PI / 180;
      s += `<text x="${c + (r - 30) * Math.sin(a)}" y="${c - (r - 30) * Math.cos(a) + 7}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="20" fill="#17324d">${i}</text>`;
    }
    const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
    s += `<line class="hw" x1="${c}" y1="${c}" x2="${c}" y2="${c - 52}" stroke="#17324d" stroke-width="9" stroke-linecap="round" transform="rotate(${ha} ${c} ${c})"/>`;
    s += `<line class="mw" x1="${c}" y1="${c}" x2="${c}" y2="${c - 82}" stroke="#d94a5a" stroke-width="5" stroke-linecap="round" transform="rotate(${ma} ${c} ${c})"/>`;
    s += `<circle cx="${c}" cy="${c}" r="7" fill="#17324d"/>`;
    return s + '</svg>';
  }

  const dagdeel = h => h < 6 ? "'s nachts" : h < 12 ? "'s ochtends" : h < 18 ? "'s middags" : "'s avonds";
  const DAGEN = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

  function leesVraag(h, m) {
    return { q: 'Welke tijd geeft de klok aan?', t: 'mc', a: woorden(h, m), opts: shuffle([woorden(h, m), ...foutjes(h, m)]), visual: svg(h, m), u: uitlegKlok(h, m) };
  }
  function uitlegKlok(h, m) {
    const kort = h12(h), wijst = m === 0 ? 'precies op de 12' : `op ${m} minuten`;
    let u = `De grote (rode) wijzer staat ${wijst}. `;
    if (m >= 30) u += `De kleine wijzer is al voorbij de ${kort}, op weg naar de ${h12(h + 1)}. `;
    else if (m > 0) u += `De kleine wijzer is net voorbij de ${kort}. `;
    if (m > 15 && m < 45) u += 'Rond de halve: denk aan "voor half" en "over half". ';
    return u + `Het is <b>${woorden(h, m)}</b>.`;
  }

  return {
    woorden, svg, dig, h12,
    onderdelen: [
      {
        id: 'heelhalf', naam: 'Hele en halve uren', emoji: '🕐',
        uitleg: `<p>De <b>kleine wijzer</b> wijst het uur aan. De <b>grote wijzer</b> (rood) de minuten.</p>
          <ul><li>Grote wijzer op de 12 → <b>hele uur</b>: "3 uur".</li><li>Grote wijzer op de 6 → <b>half</b>. Let op: half 4 = 3:30! Je zegt het uur dat <b>komt</b>.</li></ul>`,
        gen() { return leesVraag(ri(1, 12), pick([0, 30])); }
      },
      {
        id: 'kwart', naam: 'Kwart over en kwart voor', emoji: '🕒',
        uitleg: `<p>Een uur heeft 4 kwartieren van 15 minuten.</p>
          <ul><li>Grote wijzer op de 3 → <b>kwart over</b> het uur.</li><li>Grote wijzer op de 9 → <b>kwart voor</b> het volgende uur.</li></ul>
          <div class="voorbeeld">8:45 = kwart voor 9 · 8:15 = kwart over 8</div>`,
        gen() { return leesVraag(ri(1, 12), pick([0, 15, 30, 45, 15, 45])); }
      },
      {
        id: 'vijf', naam: 'Per 5 minuten (voor/over half)', emoji: '🕔',
        uitleg: `<p>Dit komt vaak voor in de toets! Verdeel de klok in 4 stukken:</p>
          <ul><li>Grote wijzer tussen <b>12 en 3</b>: … over [uur] (10 over 2)</li><li>Tussen <b>3 en 6</b>: … voor half [volgend uur] (10 voor half 3 = 2:20)</li><li>Tussen <b>6 en 9</b>: … over half [volgend uur] (10 over half 3 = 2:40)</li><li>Tussen <b>9 en 12</b>: … voor [volgend uur] (10 voor 3 = 2:50)</li></ul>
          <p>Tel bij de grote wijzer in stapjes van 5: 1 = 5 min, 2 = 10 min, 4 = 20 min…</p>`,
        gen() { return leesVraag(ri(1, 12), ri(1, 11) * 5); }
      },
      {
        id: 'minuut', naam: 'Op de minuut', emoji: '⏱️',
        uitleg: `<p>Tel eerst in stapjes van 5 naar het dichtstbijzijnde getal, en tel dan de kleine streepjes erbij of eraf.</p>
          <div class="voorbeeld">Grote wijzer 2 streepjes na de 4: 20 + 2 = 22 minuten → 8 voor half (30 − 22 = 8).<br>4:22 = <b>8 voor half 5</b></div>`,
        gen() { let m; do { m = ri(1, 59); } while (m % 5 === 0 && Math.random() < .7); return leesVraag(ri(1, 12), m); }
      },
      {
        id: 'digitaal', naam: 'Klok → digitale tijd (24 uur)', emoji: '📟',
        uitleg: `<p>Een digitale klok telt tot 24 uur. Na 12 uur 's middags tel je door: 1 uur 's middags = <b>13:00</b>.</p>
          <div class="voorbeeld">Tip: is het middag of avond? Tel 12 bij het uur op.<br>10 over half 3 's middags → 2:40 + 12 uur = <b>14:40</b></div>
          <p>Typ de tijd zo: <b>14:40</b> of <b>8:05</b>.</p>`,
        gen() {
          const h = ri(0, 23), m = ri(0, 11) * 5;
          return { q: `Het is ${dagdeel(h)}. Hoe laat is het op een digitale klok?`, t: 'tijd', a: dig(h, m), visual: svg(h, m), u: `De klok zegt ${woorden(h, m)}. ${h >= 12 ? `Het is ${dagdeel(h)}, dus tel 12 uur op: ` : ''}<b>${dig(h, m)}</b>.` };
        }
      },
      {
        id: 'woorden', naam: 'Digitale tijd → in woorden', emoji: '🔤',
        uitleg: `<p>Zet de digitale tijd om naar hoe je het zegt.</p><ol><li>Boven de 12? Haal er 12 af (15:20 → 3:20).</li><li>Kijk naar de minuten: zijn het er meer dan 15 en minder dan 45? Dan gebruik je "half".</li></ol>
          <div class="voorbeeld">15:20 → 3:20 → <b>10 voor half 4</b><br>19:50 → 7:50 → <b>10 voor 8</b></div>`,
        gen() {
          const h = ri(0, 23), m = ri(0, 11) * 5;
          return { q: `<span class="digital">${dig(h, m)}</span><br>Hoe zeg je deze tijd?`, t: 'mc', a: woorden(h, m), opts: shuffle([woorden(h, m), ...foutjes(h, m)]), u: `${h > 12 ? `${dig(h, m)} → ${dig(h - 12, m)}. ` : ''}Dat is <b>${woorden(h, m)}</b>.` };
        }
      },
      {
        id: 'zetten', naam: 'Zet de klok goed', emoji: '👆',
        uitleg: `<p>Sleep de <b>rode grote wijzer</b> rond. De kleine wijzer draait vanzelf mee, net als bij een echte klok. Je kunt ook de knoppen gebruiken.</p><p>Let op waar de kleine wijzer staat: bij "half 4" staat hij <b>tussen de 3 en de 4</b>.</p>`,
        gen() {
          const h = ri(1, 12), m = Math.random() < .7 ? ri(0, 11) * 5 : ri(0, 59);
          return { q: `Zet de klok op: <b>${woorden(h, m)}</b>`, t: 'zet', a: woorden(h, m), doel: ((h % 12) * 60 + m), u: `${woorden(h, m)} = ${dig(h12(h), m)}. De grote wijzer staat op ${m} minuten.`, svgDoel: svg(h, m) };
        }
      },
      {
        id: 'duur', naam: 'Tijdsduur en kalender', emoji: '📅',
        uitleg: `<p>Reken met tijd in stapjes: eerst naar een heel uur, dan verder.</p>
          <div class="voorbeeld">Van 9:45 tot 11:20: 9:45 → 10:00 (15 min) → 11:00 (60 min) → 11:20 (20 min). Samen <b>95 minuten</b> = 1 uur en 35 minuten.</div>
          <p>Onthoud: 1 uur = 60 minuten · 1 dag = 24 uur · 1 week = 7 dagen · 1 jaar = 12 maanden = 52 weken.</p>`,
        gen() {
          const t = ri(0, 5);
          if (t === 0) { const h = ri(9, 19), m = ri(0, 11) * 5, dh = ri(0, 2), dm = ri(1, 11) * 5, tot = h * 60 + m + dh * 60 + dm; const wat = pick(['De film over Mars', 'De voetbalwedstrijd', 'De sterrenshow', 'De treinreis naar Parijs']); return { q: `${wat} begint om ${dig(h, m)} en duurt ${dh ? dh + ' uur en ' : ''}${dm} minuten. Hoe laat is het afgelopen?`, t: 'tijd', a: dig(Math.floor(tot / 60) % 24, tot % 60), u: `${dig(h, m)} + ${dh ? dh + ' uur' : ''}${dh ? ' + ' : ''}${dm} min = <b>${dig(Math.floor(tot / 60) % 24, tot % 60)}</b>.` }; }
          if (t === 1) { const h = ri(8, 16), m = ri(0, 11) * 5, d = ri(4, 30) * 5, e = h * 60 + m + d; return { q: `De les begint om ${dig(h, m)} en eindigt om ${dig(Math.floor(e / 60), e % 60)}. Hoeveel minuten duurt de les?`, t: 'num', a: d, unit: 'minuten', u: `Tel van ${dig(h, m)} naar ${dig(Math.floor(e / 60), e % 60)}: ${d} minuten.` }; }
          if (t === 2) { const [q, a, u] = pick([['Hoeveel minuten is anderhalf uur?', 90, '1 uur = 60 min, een half uur = 30 min. Samen 90.'], ['Hoeveel minuten is een kwartier?', 15, 'Een uur in 4 stukken: 60 : 4 = 15.'], ['Hoeveel minuten is 2 uur en een kwartier?', 135, '2 × 60 = 120 + 15 = 135.'], ['Hoeveel dagen zijn 3 weken?', 21, '3 × 7 = 21.'], ['Hoeveel uur zijn 2 dagen?', 48, '2 × 24 = 48.'], ['Hoeveel seconden is 2 minuten?', 120, '1 minuut = 60 seconden. 2 × 60 = 120.'], ['Hoeveel maanden zijn 2 jaar?', 24, '2 × 12 = 24.'], ['Hoeveel minuten is drie kwartier?', 45, '3 × 15 = 45.']]); return { q, t: 'num', a, u }; }
          if (t === 3) { const dag = ri(0, 6), plus = ri(3, 20), uit = (dag + plus) % 7; return { q: `Vandaag is het ${DAGEN[dag]}. Welke dag is het over ${plus} dagen?`, t: 'mc', a: DAGEN[uit], opts: shuffle([DAGEN[uit], DAGEN[(uit + 1) % 7], DAGEN[(uit + 6) % 7], DAGEN[(uit + 2) % 7]]), u: `Elke 7 dagen is het weer ${DAGEN[dag]}. ${plus} = ${Math.floor(plus / 7) * 7} + ${plus % 7}. Dus ${plus % 7} dag${plus % 7 === 1 ? '' : 'en'} verder: ${DAGEN[uit]}.` }; }
          if (t === 4) { const vertrek = ri(7, 10) * 60 + ri(0, 11) * 5, d = ri(13, 40) * 5, aankomst = vertrek + d; return { q: `Het vliegtuig naar Noorwegen vertrekt om ${dig(Math.floor(vertrek / 60), vertrek % 60)} en landt om ${dig(Math.floor(aankomst / 60), aankomst % 60)}. Hoe lang duurt de vlucht?`, t: 'mc', a: `${Math.floor(d / 60)} uur en ${d % 60} minuten`, opts: shuffle([`${Math.floor(d / 60)} uur en ${d % 60} minuten`, `${Math.floor(d / 60) + 1} uur en ${d % 60} minuten`, `${Math.floor(d / 60)} uur en ${(d % 60 + 20) % 60} minuten`, `${Math.max(0, Math.floor(d / 60) - 1)} uur en ${d % 60} minuten`].filter((v, i, a) => a.indexOf(v) === i)), u: `Van ${dig(Math.floor(vertrek / 60), vertrek % 60)} tot ${dig(Math.floor(aankomst / 60), aankomst % 60)} = ${d} minuten = ${Math.floor(d / 60)} uur en ${d % 60} minuten.` }; }
          const h = ri(1, 11), m = ri(1, 11) * 5, later = ri(2, 9) * 5;
          const tot = (h * 60 + m + later) % 720, nh = Math.floor(tot / 60) || 12, nm = tot % 60;
          return { q: `Hoe laat is het ${later} minuten later?`, t: 'mc', a: woorden(nh, nm), opts: shuffle([woorden(nh, nm), ...foutjes(nh, nm)]), visual: svg(h, m), u: `De klok zegt ${woorden(h, m)}. ${later} minuten later is het <b>${woorden(nh, nm)}</b>.` };
        }
      }
    ]
  };
})();
