/* =========================================================
   Naut thema 6 – begrippenlijst (Natuur & techniek, groep 5-6)

   Elk begrip: les, soort, woord, betekenis, voorbeeldzin.
   In de zin staat het woord tussen [haken]. Zo kan het spel
   het woord in de zin vet maken of er een gat van maken.
   ========================================================= */

const WEKEN = [
  { id: 1, naam: 'Les 1 Sterke materialen' },
  { id: 2, naam: 'Les 2 Steviger maken' },
  { id: 3, naam: 'Les 3 Niet kapot te krijgen' }
];

const W = (week, soort, woord, betekenis, zin) => ({ week, soort, woord, betekenis, zin });

const WOORDEN = [
  // ---------- Les 1 Sterke materialen ----------
  W(1, 'bouwen', 'de constructie', 'de manier waarop iets is gebouwd; verschillende delen die samen één geheel vormen', 'Een brug is een [constructie] die uit veel onderdelen bestaat.'),
  W(1, 'materiaal', 'de materiaaleigenschappen', 'hoe een materiaal is, bijvoorbeeld sterk, hard of buigzaam', 'Sterk en hard zijn [materiaaleigenschappen] van staal.'),
  W(1, 'materiaal', 'de duwsterkte', 'de sterkte van een materiaal als er gewicht op duwt', 'De [duwsterkte] van steen is groot.'),
  W(1, 'materiaal', 'de treksterkte', 'de sterkte van een materiaal als je eraan trekt', 'Touw heeft een hoge [treksterkte].'),

  // ---------- Les 2 Steviger maken ----------
  W(2, 'vorm', 'het profiel', 'de vorm die je aan materiaal geeft, waardoor de eigenschap van het materiaal verandert', 'Een buis heeft een rond [profiel].'),
  W(2, 'vorm', 'de vormstijfheid', 'stevigheid die ontstaat door de vorm', 'Als je een krant oprolt, wordt de [vormstijfheid] groter.'),
  W(2, 'verbinding', 'de vaste verbinding', 'een sterke verbinding tussen twee of meer delen die niet meer uit elkaar kan', 'Een lasnaad is een [vaste verbinding].'),
  W(2, 'verbinding', 'de beweegbare verbinding', 'een verbinding tussen twee of meer delen die beweging mogelijk maakt', 'Een paperclip is een [beweegbare verbinding].'),

  // ---------- Les 3 Niet kapot te krijgen ----------
  W(3, 'constructie', 'de vierkantconstructie', 'een beweegbare constructie die uit vierkanten bestaat', 'Een ophaalbrug is een [vierkantconstructie], want hij moet kunnen bewegen.'),
  W(3, 'constructie', 'de driehoeksconstructie', 'een vormvaste constructie die uit driehoeken bestaat', 'Een hijskraan is een [driehoeksconstructie], daardoor is hij heel stevig.'),
  W(3, 'constructie', 'de boogconstructie', 'een sterke en vormvaste constructie die uit een boog bestaat', 'Een koepeltent is een [boogconstructie].'),
  W(3, 'constructie', 'de piramide', 'een constructie met een smalle bovenkant en een brede basis', 'Een [piramide] kan veel gewicht dragen, omdat de onderkant zo breed is.'),
  W(3, 'bouwen', 'de basis', 'de onderkant van een gebouw; hoe groter die is, hoe steviger het gebouw staat', 'Hoe breder de [basis], hoe steviger het gebouw staat.')
];
WOORDEN.forEach((w, i) => { w.id = i; });

/* Woorden die zo op elkaar lijken dat ze nooit samen als keuze verschijnen */
const LIJKEN_OP = [];

/* Sorteergroepen: een begrip met de dingen die erbij horen.
   Groepen met hetzelfde 'paar' staan tegenover elkaar. */
const CLUSTERS = [
  { week: 1, paar: 'kracht', kop: 'de duwsterkte', leden: ['er duwt gewicht op', 'steen', 'de pilaar onder een brug'] },
  { week: 1, paar: 'kracht', kop: 'de treksterkte', leden: ['je trekt eraan', 'touw', 'de kabel van een kraan'] },
  { week: 2, paar: 'verbinding', kop: 'de vaste verbinding', leden: ['kan niet meer uit elkaar', 'een lasnaad', 'metselen'] },
  { week: 2, paar: 'verbinding', kop: 'de beweegbare verbinding', leden: ['de delen kunnen nog bewegen', 'een paperclip', 'een scharnier'] },
  { week: 3, paar: 'vorm', kop: 'de vierkantconstructie', leden: ['kan bewegen', 'een ophaalbrug'] },
  { week: 3, paar: 'vorm', kop: 'de driehoeksconstructie', leden: ['vormvast en heel stevig', 'een hijskraan', 'het frame van een herenfiets'] },
  { week: 3, paar: 'vorm', kop: 'de boogconstructie', leden: ['een koepeltent', 'bruggen en tunnels'] }
];

/* Samenvatting uit 'Leren voor de toets' (staat onder de begrippenlijst) */
const SAMENVATTING = [
  { week: 1, tekst: 'De manier waarop iets is gebouwd, heet een <b>constructie</b>. De stevigheid hangt af van de materialen die je kiest. Elk materiaal heeft zijn eigen <b>materiaaleigenschappen</b>. Materialen die sterk zijn als er gewicht op duwt, hebben een hoge <b>duwsterkte</b>. Materialen die sterk zijn als je eraan trekt, hebben een hoge <b>treksterkte</b>.' },
  { week: 2, tekst: 'Door de vorm, het <b>profiel</b>, van een materiaal te veranderen, maak je het sterker: de <b>vormstijfheid</b> wordt groter. Mogen onderdelen niet meer uit elkaar? Dan kies je een <b>vaste verbinding</b>, zoals metselen. Mogen ze nog bewegen? Dan kies je een <b>beweegbare verbinding</b>.' },
  { week: 3, tekst: 'Een <b>vierkantconstructie</b> is handig als iets moet bewegen, zoals een ophaalbrug. Een <b>driehoeksconstructie</b> is vormvast en veel steviger. Daarom is het frame van een herenfiets sterker dan dat van een damesfiets. Een <b>boogconstructie</b> is sterk en vormvast; je ziet hem in bruggen en tunnels. Een <b>piramide</b> heeft een smalle bovenkant en een brede <b>basis</b>. Hoe breder de basis, hoe meer gewicht hij kan dragen.' }
];
