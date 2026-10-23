/* =========================================================
   Oliver Oefeneiland – lijst met onderwerpen (tegels)

   Nieuw onderwerp toevoegen?
   1. Zet het oefenspel in een eigen map naast deze, bv. "breuken/index.html".
   2. Voeg hieronder een nieuw blok { ... } toe aan ONDERWERPEN.
   Klaar! De tegel verschijnt vanzelf op de startpagina.
   ========================================================= */

const ONDERWERPEN = [
  {
    titel: 'Kapitein van de Polder',
    vak: 'Aardrijkskunde',
    uitleg: 'Meander thema 6: Pas op voor de zee, Nieuw land en de topo van Flevoland en Zeeland.',
    emoji: '⚓',
    kleur: '#0e7cc2',
    link: 'kapitein-van-de-polder/index.html',
    // Leest de opgeslagen scores van dit spel en laat ze op de tegel zien
    voortgang() {
      const d = leesOpslag('kapiteinPolder_v1');
      if (!d) return null;
      const toetsen = (d.history || []).filter(h => h.mode === 'test');
      const beste = toetsen.reduce((m, h) => Math.max(m, h.grade), 0);
      const sterren = Object.values(d.adventure || {}).reduce((a, b) => a + b, 0);
      return {
        regels: [
          `⭐ ${sterren} / 18 sterren in het Leer-avontuur`,
          beste ? `🏆 Beste cijfer: ${beste.toFixed(1).replace('.', ',')}` : '🏆 Nog geen oefentoets gemaakt',
          `🔁 ${(d.history || []).length}× geoefend`
        ],
        procent: Math.round((sterren / 18) * 100)
      };
    }
  },
  {
    titel: 'Begrijpend lezen groep 6',
    vak: 'Taal',
    uitleg: 'Leesraket: lees teksten over computers, geschiedenis, ruimte, technologie, landen en feitjes, en train je leesvaardigheden.',
    emoji: '🚀',
    kleur: '#6c4bd8',
    link: 'begrijpend-lezen-groep-6/index.html',
    voortgang() {
      const d = leesOpslag('leesraket_v1');
      if (!d) return null;
      const max = 12 * 3 + 4 * 3; // 12 teksten + 4 trainingsspelletjes, elk 3 sterren
      const sterren = [...Object.values(d.teksten || {}), ...Object.values(d.spellen || {})].reduce((a, b) => a + b, 0);
      const gelezen = Object.keys(d.teksten || {}).length;
      return {
        regels: [
          `⭐ ${sterren} / ${max} sterren brandstof`,
          `📖 ${gelezen} van de 12 teksten gelezen`,
          `🔁 ${(d.historie || []).length}× een missie gespeeld`
        ],
        procent: Math.round((sterren / max) * 100)
      };
    }
  },
  {
    titel: 'Woorden blok 2',
    vak: 'Taal',
    uitleg: 'Woordenschat les 1 t/m 9: flitskaarten, koppelen, typen, woordclusters, een oefentoets en Woord-invaders.',
    emoji: '🔤',
    kleur: '#e8590c',
    link: 'woorden-blok-2/index.html',
    voortgang() {
      const d = leesOpslag('woordenBlok2_v1');
      if (!d) return null;
      const totaal = 55; // aantal woorden in woorden-blok-2/woorden.js
      const bekend = Object.values(d.bekend || {}).filter(Boolean).length;
      const beste = (d.toetsen || []).reduce((m, t) => Math.max(m, t.cijfer), 0);
      return {
        regels: [
          `🃏 ${bekend} / ${totaal} woorden gekend`,
          beste ? `🏆 Beste cijfer: ${beste.toFixed(1).replace('.', ',')}` : '🏆 Nog geen oefentoets gemaakt',
          `👾 Highscore Woord-invaders: ${(d.inv && d.inv.best) || 0}`
        ],
        procent: Math.round((bekend / totaal) * 100)
      };
    }
  }

  // Voorbeeld voor later (haal de // weg en vul in):
  // ,{
  //   titel: 'Tafelkampioen',
  //   vak: 'Rekenen',
  //   uitleg: 'Oefen de tafels van 1 t/m 10.',
  //   emoji: '✖️',
  //   kleur: '#e5484d',
  //   link: 'tafels/index.html'
  // }
];

function leesOpslag(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
