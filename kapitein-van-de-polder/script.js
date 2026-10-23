/* =========================================================
   Kapitein van de Polder – oefentoets Meander thema 6
   ========================================================= */

/* ---------------- KAARTEN ---------------- */
// Vereenvoudigde kaarten, ongeveer op schaal getekend.
const MAPS = {
  flevo: {
    title: 'Flevoland',
    viewBox: '0 0 480 560',
    others: [
      { name: 'Noord-Holland', label: [20, 300], pts: '0,93 68,130 76,186 103,248 167,279 133,322 87,391 76,465 95,508 95,560 0,560' },
      { name: 'Friesland', label: [330, 80], pts: '247,0 220,50 209,105 201,155 266,186 323,192 480,190 480,0' },
      { name: 'Overijssel / Gelderland', label: [395, 500], pts: '440,228 480,200 480,560 185,560 280,505 375,438 405,372 382,338 428,310' }
    ],
    land: [
      '95,490 114,515 171,527 266,484 361,422 391,372 361,341 285,341 228,384 171,422 114,453', // Flevopolder
      '285,316 277,279 323,198 391,186 437,229 418,304 372,329' // Noordoostpolder
    ],
    dikes: [
      { from: [68, 130], to: [220, 50] },              // Afsluitdijk
      { from: [167, 279], to: [232, 386], thin: true } // Houtribdijk
    ],
    extraLabels: [{ text: 'Waddenzee', at: [70, 40] }]
  },
  zeeland: {
    title: 'Zeeland',
    viewBox: '0 0 600 560',
    others: [
      { name: 'België', label: [150, 540], pts: '0,455 40,450 143,495 342,531 542,477 600,470 600,560 0,560' },
      { name: 'Noord-Brabant', label: [520, 110], pts: '562,120 600,120 600,468 552,470 560,420 566,300' },
      { name: 'Zuid-Holland', label: [440, 30], pts: '300,0 600,0 600,95 480,62 420,28 330,22' }
    ],
    land: [
      '86,243 114,189 182,180 228,216 228,297 182,324 131,324 80,270', // Walcheren
      '217,180 314,162 353,198 296,216 228,207',                       // Noord-Beveland
      '239,234 342,225 456,252 542,315 502,360 399,342 314,324 245,297', // Zuid-Beveland
      '228,117 256,54 370,45 456,90 427,135 314,144 256,144',          // Schouwen-Duiveland
      '427,162 542,162 542,252 467,234',                               // Tholen
      '40,387 114,351 171,360 256,405 302,414 370,405 427,387 513,387 542,423 542,477 342,531 143,495 40,450', // Zeeuws-Vlaanderen
      '211,144 227,144 227,160 211,160' // Neeltje Jans
    ],
    dikes: [
      { from: [228, 122], to: [216, 182] } // Oosterscheldekering
    ],
    extraLabels: []
  }
};

/* ---------------- TOPOGRAFIE ---------------- */
// kind: plaats | water | gebied | dijk
const TOPO = [
  { id: 'flevoland', name: 'Flevoland', map: 'flevo', province: true },
  { id: 'afsluitdijk', name: 'Afsluitdijk', map: 'flevo', kind: 'dijk', what: 'een dijk', x: 144, y: 90,
    q: 'Hoe heet de lange dijk die de Zuiderzee afsloot van de Waddenzee?', spell: ['Afsluitdeik', 'Afsluidijk', 'Afsluitdyk'] },
  { id: 'almere', name: 'Almere', map: 'flevo', kind: 'plaats', what: 'een stad', x: 141, y: 484,
    q: 'Wat is de grootste stad van Flevoland?', spell: ['Almeere', 'Almeer', 'Allmere'] },
  { id: 'dronten', name: 'Dronten', map: 'flevo', kind: 'plaats', what: 'een plaats', x: 331, y: 384, plus: true,
    q: 'Welke plaats ligt midden in het oosten van de Flevopolder, tussen Lelystad en de Noordoostpolder in?', spell: ['Drondten', 'Drontem', 'Drontten'] },
  { id: 'emmeloord', name: 'Emmeloord', map: 'flevo', kind: 'plaats', what: 'een plaats', x: 342, y: 273,
    q: 'Wat is de grootste plaats in de Noordoostpolder?', spell: ['Emmelord', 'Emeloord', 'Emmeloort'] },
  { id: 'flevopolder', name: 'Flevopolder', map: 'flevo', kind: 'gebied', what: 'een polder', x: 285, y: 440, plus: true,
    q: 'Hoe heet de grote polder waar Lelystad en Almere in liggen?', spell: ['Flevo polder', 'Flevopolter', 'Flefopolder'] },
  { id: 'ijsselmeer', name: 'IJsselmeer', map: 'flevo', kind: 'water', what: 'een meer', x: 190, y: 225,
    q: 'Hoe heet het meer dat vroeger de Zuiderzee was?', spell: ['Ijsselmeer', 'IJselmeer', 'Ijselmeer'] },
  { id: 'lelystad', name: 'Lelystad', map: 'flevo', kind: 'plaats', what: 'een stad', x: 240, y: 393,
    q: 'Wat is de hoofdstad van Flevoland?', spell: ['Lelijstad', 'Lelystadt', 'Lellystad'] },
  { id: 'markermeer', name: 'Markermeer', map: 'flevo', kind: 'water', what: 'een meer', x: 148, y: 360,
    q: 'Hoe heet het meer tussen Flevoland en Noord-Holland, ten zuiden van het IJsselmeer?', spell: ['Markemeer', 'Markermeir', 'Marker meer'] },
  { id: 'noordoostpolder', name: 'Noordoostpolder', map: 'flevo', kind: 'gebied', what: 'een polder', x: 380, y: 240, plus: true,
    q: 'In welke polder liggen Emmeloord en Urk?', spell: ['Noord-Oostpolder', 'Noordoost polder', 'Noordoostpolter'] },
  { id: 'urk', name: 'Urk', map: 'flevo', kind: 'plaats', what: 'een plaats', x: 290, y: 302, plus: true,
    q: 'Welk oud vissersdorp was vroeger een eiland in de Zuiderzee?', spell: ['Urck', 'Uurk', 'Urkk'] },

  { id: 'zeeland', name: 'Zeeland', map: 'zeeland', province: true },
  { id: 'breskens', name: 'Breskens', map: 'zeeland', kind: 'plaats', what: 'een plaats', x: 143, y: 362, plus: true,
    q: 'Welke plaats in Zeeuws-Vlaanderen ligt aan de overkant van de Westerschelde, tegenover Vlissingen?', spell: ['Breskes', 'Bresskens', 'Breskins'] },
  { id: 'middelburg', name: 'Middelburg', map: 'zeeland', kind: 'plaats', what: 'een stad', x: 177, y: 268,
    q: 'Wat is de hoofdstad van Zeeland?', spell: ['Midelburg', 'Middelburgh', 'Middelburch'] },
  { id: 'neeltjejans', name: 'Neeltje Jans', map: 'zeeland', kind: 'gebied', what: 'een (werk)eiland', x: 219, y: 152, plus: true,
    q: 'Hoe heet het eiland midden in de stormvloedkering van de Oosterschelde?', spell: ['Neeltje jans', 'Neeltje-Jans', 'Neeltjes Jans'] },
  { id: 'noordzee', name: 'Noordzee', map: 'zeeland', kind: 'water', what: 'een zee', x: 50, y: 200,
    q: 'Welke zee ligt aan de westkant van Zeeland?', spell: ['Noortzee', 'Noord Zee', 'Noordzeë'] },
  { id: 'oosterschelde', name: 'Oosterschelde', map: 'zeeland', kind: 'water', what: 'een zeearm', x: 395, y: 195,
    q: 'Welke zeearm in Zeeland heeft een grote stormvloedkering?', spell: ['Oosterscheldt', 'Ooster Schelde', 'Oosterschelde.'] },
  { id: 'terneuzen', name: 'Terneuzen', map: 'zeeland', kind: 'plaats', what: 'een stad', x: 302, y: 425,
    q: 'Welke havenstad ligt in Zeeuws-Vlaanderen aan de Westerschelde (ten oosten van Breskens)?', spell: ['Terneusen', 'Ternuezen', 'Terneuze'] },
  { id: 'vlissingen', name: 'Vlissingen', map: 'zeeland', kind: 'plaats', what: 'een stad', x: 154, y: 316,
    q: 'Welke havenstad ligt aan de Westerschelde, vlak onder Middelburg?', spell: ['Vlisingen', 'Flissingen', 'Vlissinge'] },
  { id: 'westerschelde', name: 'Westerschelde', map: 'zeeland', kind: 'water', what: 'een zeearm', x: 340, y: 372,
    q: 'Welke zeearm ligt tussen Zeeuws-Vlaanderen en de rest van Zeeland?', spell: ['Westerscheldt', 'Wester-schelde', 'Westerschelde.'] },
  { id: 'zeeuwsvlaanderen', name: 'Zeeuws-Vlaanderen', map: 'zeeland', kind: 'gebied', what: 'een deel van een provincie', x: 250, y: 462,
    q: 'Hoe heet het deel van Zeeland dat tegen België aan ligt?', spell: ['Zeeuws Vlaanderen', 'Zeeuws-vlaanderen', 'Zeeuwsvlaanderen'] }
];
// misspellings die op het verkeerde ding eindigen met een punt even weghalen
TOPO.forEach(t => { if (t.spell) t.spell = t.spell.filter(s => s !== t.name + '.'); });

const WHAT_OPTIONS = ['een stad', 'een plaats', 'een meer', 'een zeearm', 'een zee', 'een dijk', 'een polder', 'een (werk)eiland', 'een deel van een provincie'];

/* ---------------- BEGRIPPEN ---------------- */
const WORDS = [
  { term: 'terp', def: 'Een woonheuvel die door mensen is gemaakt in de tijd dat er nog geen dijken waren, om veilig te zijn voor overstromingen.' },
  { term: 'duin', def: 'Een door de natuur gevormde heuvel van zand langs de kust. Hij houdt het water tegen.' },
  { term: 'kust', def: 'De strook land langs de zee.' },
  { term: 'zeearm', def: 'De plek waar de zee als een brede rivier het land in stroomt.' },
  { term: 'stormvloedkering', def: 'Een speciaal soort dam die open en dicht kan. Alleen als het nodig is, gaat hij dicht en houdt hij het water tegen.' },
  { term: 'dam', def: 'Een door mensen gemaakte verhoging die dwars in een zeearm, rivier of meer ligt. Hij houdt het water tegen.' },
  { term: 'Zuiderzee', def: 'De zee in het noorden van Nederland die na het bouwen van de Afsluitdijk het IJsselmeer werd.' },
  { term: 'inpoldering', def: 'Het maken van polders door dijken rond een meer te leggen en het daarna leeg te pompen. Zo maak je van water land.' },
  { term: 'inrichting', def: 'De manier waarop iets is ingedeeld.' },
  { term: 'kavel', def: 'Een stuk grond.' }
];

const SUMMARY = [
  '<b>Les 1 – Pas op voor de zee.</b> Vroeger bouwden mensen hun boerderijen en dorpen op <b>terpen</b>. Bij hoogwater vluchtten mensen en dieren naar deze woonheuvels.',
  'Nu beschermt een lang lint van <b>duinen</b> en <b>dijken</b> langs de <b>kust</b> ons tegen de zee. Daardoor kunnen mensen ook wonen in delen die <b>onder de zeespiegel</b> liggen.',
  'In sommige <b>zeearmen</b> liggen <b>stormvloedkeringen</b>. Ze staan meestal <b>open</b> om rivierwater en schepen door te laten. Bij <b>hoogwater of harde wind</b> gaan ze <b>dicht</b>.',
  '<b>Les 2 – Nieuw land.</b> Door de <b>Afsluitdijk</b> werd de <b>Zuiderzee</b> het <b>IJsselmeer</b>. Een meer is kalmer dan de zee, dus er zijn bijna geen overstromingen meer.',
  '<b>Inpolderen:</b> eerst een dijk bouwen, dan het water eruit pompen. Zo ontstonden de <b>Noordoostpolder</b> en de <b>Flevopolders</b>.',
  '<b>Inrichting van de polder:</b> de stad in het midden, de dorpen eromheen. De <b>kavels</b> zijn groot en rechthoekig. Op elke kavel staat een boerderij, en lange rechte wegen lopen naar de dorpen.',
  '<b>Denk het uit.</b> Les 1: kijk naar de oplossingen van anderen. Les 2: leef je in de wensen van anderen (helpt bij je plan). Les 3: laat je inspireren door plaatjes en beschrijf wat je ziet.'
];

/* ---------------- KENNISVRAGEN ---------------- */
// Elk item heeft varianten. mc = meerkeuze, open = zelf typen (keywords = trefwoorden die erin moeten zitten)
const KNOWLEDGE = [
  { id: 'k-terp', variants: [
    { type: 'mc', q: 'Waarom bouwden mensen vroeger hun boerderijen op terpen?', a: 'Om veilig te zijn voor overstromingen', w: ['Omdat je daar mooi uitzicht had', 'Omdat het daar warmer was', 'Om de dieren binnen te houden', 'Omdat er geen bomen stonden'] },
    { type: 'open', mode: 'keywords', q: 'Waarom woonden mensen vroeger op terpen? Leg het kort uit.', groups: [['overstrom', 'water', 'zee', 'vloed', 'nat', 'droog', 'veilig']], model: 'Om veilig te zijn voor overstromingen (er waren nog geen dijken).' }
  ] },
  { id: 'k-hoogwater', variants: [
    { type: 'mc', q: 'Wat deden mensen en dieren vroeger bij hoogwater?', a: 'Ze vluchtten naar de terpen', w: ['Ze gingen zwemmen', 'Ze bouwden snel een stormvloedkering', 'Ze gingen naar de duinen in Zeeland', 'Ze gingen met de trein weg'] }
  ] },
  { id: 'k-bescherming', variants: [
    { type: 'mc', q: 'Wat beschermt Nederland tegenwoordig tegen de zee?', a: 'Een lang lint van duinen en dijken langs de kust', w: ['Een grote muur van beton', 'Terpen in elk dorp', 'Bomen langs het strand', 'Grote zandzakken'] },
    { type: 'open', mode: 'keywords', q: 'Wat ligt er langs de kust om Nederland te beschermen tegen de zee? Noem er twee.', groups: [['duin'], ['dijk']], model: 'Duinen en dijken.' }
  ] },
  { id: 'k-zeespiegel', variants: [
    { type: 'mc', q: 'Hoe kan het dat mensen kunnen wonen in delen van Nederland die onder de zeespiegel liggen?', a: 'Duinen en dijken houden het zeewater tegen', w: ['Het water stroomt vanzelf weg', 'De huizen staan op palen', 'Er komt nooit hoogwater', 'De zee is daar heel ondiep'] }
  ] },
  { id: 'k-kering-open', variants: [
    { type: 'mc', q: 'Waarom staat een stormvloedkering meestal open?', a: 'Om rivierwater en schepen door te laten', w: ['Omdat hij kapot is', 'Zodat vissen kunnen zwemmen', 'Om de wind tegen te houden', 'Omdat dicht doen te duur is'] },
    { type: 'open', mode: 'keywords', q: 'Een stormvloedkering staat meestal open. Waarom?', groups: [['schip', 'schepen', 'boot', 'boten', 'rivier', 'water door']], model: 'Om rivierwater en schepen door te laten.' }
  ] },
  { id: 'k-kering-dicht', variants: [
    { type: 'mc', q: 'Wanneer gaat een stormvloedkering dicht?', a: 'Bij hoogwater of harde wind', w: ['Elke nacht', 'Als het regent', 'In de zomer', 'Als er een schip aankomt'] },
    { type: 'open', mode: 'keywords', q: 'Wanneer gaat een stormvloedkering dicht?', groups: [['hoogwater', 'hoog water', 'wind', 'storm', 'vloed', 'hoog']], model: 'Bij hoogwater of harde wind.' }
  ] },
  { id: 'k-afsluitdijk', variants: [
    { type: 'mc', q: 'Wat werd de Zuiderzee na het bouwen van de Afsluitdijk?', a: 'Het IJsselmeer', w: ['Het Markermeer', 'De Noordzee', 'De Waddenzee', 'De Oosterschelde'] },
    { type: 'open', mode: 'topo', q: 'Door de Afsluitdijk werd de Zuiderzee een meer. Hoe heet dat meer? (let op de hoofdletters!)', answer: 'IJsselmeer' }
  ] },
  { id: 'k-kalm', variants: [
    { type: 'mc', q: 'Waarom zijn er bij het IJsselmeer bijna geen overstromingen meer?', a: 'Omdat een meer kalmer is dan de zee', w: ['Omdat er niemand meer woont', 'Omdat het meer helemaal leeggepompt is', 'Omdat het daar nooit regent', 'Omdat er terpen zijn gebouwd'] },
    { type: 'open', mode: 'keywords', q: 'Waarom zijn er bijna geen overstromingen meer sinds de Zuiderzee een meer is?', groups: [['kalm', 'rustig', 'golven', 'minder wild', 'geen zee']], model: 'Een meer is kalmer dan de zee.' }
  ] },
  { id: 'k-polder-maken', variants: [
    { type: 'mc', q: 'Hoe maak je een polder (inpolderen)?', a: 'Eerst een dijk bouwen, dan het water eruit pompen', w: ['Eerst het water eruit pompen, dan een dijk bouwen', 'Zand in het meer gooien tot het vol is', 'Wachten tot het water opdroogt', 'Een stormvloedkering bouwen'] },
    { type: 'open', mode: 'keywords', q: 'Leg uit hoe je van een meer land maakt.', groups: [['dijk'], ['pomp', 'leeg', 'weg']], model: 'Je bouwt een dijk om een stuk meer en pompt het water eruit.' }
  ] },
  { id: 'k-welke-polders', variants: [
    { type: 'mc', q: 'Welke polders zijn gemaakt door stukken van het IJsselmeer in te polderen?', a: 'De Noordoostpolder en de Flevopolders', w: ['Walcheren en Zeeuws-Vlaanderen', 'Texel en Vlieland', 'Neeltje Jans en Urk', 'De Veluwe en de Achterhoek'] }
  ] },
  { id: 'k-stad-midden', variants: [
    { type: 'mc', q: 'Waar kwam de stad bij de inrichting van de nieuwe polders?', a: 'In het midden, met de dorpen eromheen', w: ['Aan de rand, bij de dijk', 'Op een terp', 'Buiten de polder', 'Helemaal in het noorden'] },
    { type: 'open', mode: 'keywords', q: 'Waar in de polder werd de stad gebouwd?', groups: [['midden']], model: 'In het midden (de dorpen eromheen).' }
  ] },
  { id: 'k-kavels', variants: [
    { type: 'mc', q: 'Hoe zien de kavels in de polders eruit?', a: 'Groot en rechthoekig', w: ['Klein en rond', 'Krom en smal', 'Driehoekig', 'Allemaal verschillend van vorm'] },
    { type: 'open', mode: 'keywords', q: 'Beschrijf de kavels in de polder: hoe groot zijn ze en welke vorm hebben ze?', groups: [['groot'], ['rechthoek', 'recht', 'vierkant']], model: 'Groot en rechthoekig.' }
  ] },
  { id: 'k-boerderij', variants: [
    { type: 'mc', q: 'Wat staat er op elke kavel in de polder?', a: 'Een boerderij', w: ['Een kerk', 'Een windmolen', 'Een school', 'Een vuurtoren'] },
    { type: 'open', mode: 'word', q: 'Op elke kavel in de polder staat een …', answers: ['boerderij'] }
  ] },
  { id: 'k-wegen', variants: [
    { type: 'mc', q: 'Hoe lopen de wegen in de polder?', a: 'Lang en recht, van de boerderij naar de dorpen', w: ['Kronkelend langs het water', 'In rondjes om de stad', 'Er zijn geen wegen, alleen sloten', 'Alleen over de dijken'] }
  ] },
  { id: 'k-natuur', variants: [
    { type: 'mc', q: 'Welke van deze is NIET door mensen gemaakt, maar door de natuur?', a: 'Een duin', w: ['Een dijk', 'Een dam', 'Een terp', 'Een stormvloedkering'] }
  ] },
  { id: 'k-dam-kering', variants: [
    { type: 'mc', q: 'Wat is het verschil tussen een dam en een stormvloedkering?', a: 'Een stormvloedkering kan open en dicht, een dam niet', w: ['Een dam kan open en dicht, een stormvloedkering niet', 'Een dam is gemaakt door de natuur', 'Er is geen verschil', 'Een stormvloedkering ligt altijd in een meer'] }
  ] },
  { id: 'k-tf1', variants: [{ type: 'mc', q: 'Waar of niet waar? Een terp is gemaakt door de natuur.', a: 'Niet waar', w: ['Waar'], fixed: true, explain: 'Een terp is door mensen gemaakt. Een duin is door de natuur gemaakt.' }] },
  { id: 'k-tf2', variants: [{ type: 'mc', q: 'Waar of niet waar? Een stormvloedkering is meestal dicht.', a: 'Niet waar', w: ['Waar'], fixed: true, explain: 'Hij staat meestal open en gaat alleen dicht als het nodig is.' }] },
  { id: 'k-tf3', variants: [{ type: 'mc', q: 'Waar of niet waar? Een kavel is een stuk grond.', a: 'Waar', w: ['Niet waar'], fixed: true }] },
  { id: 'k-tf4', variants: [{ type: 'mc', q: 'Waar of niet waar? Lelystad ligt in Zeeland.', a: 'Niet waar', w: ['Waar'], fixed: true, explain: 'Lelystad is de hoofdstad van Flevoland.' }] },
  { id: 'k-tf5', variants: [{ type: 'mc', q: 'Waar of niet waar? Een dam ligt dwars in een zeearm, rivier of meer.', a: 'Waar', w: ['Niet waar'], fixed: true }] }
];

const THINK = [
  { id: 'd-les1', variants: [
    { type: 'mc', q: 'Denk het uit (les 1): wat kun je doen om op een goed idee te komen?', a: 'Kijken naar de oplossingen van anderen', w: ['Alles alleen bedenken zonder rond te kijken', 'Altijd het eerste idee nemen', 'Wachten tot iemand anders het oplost'] },
    { type: 'mc', q: 'Je kijkt hoe anderen een probleem hebben opgelost. Waarom helpt dat?', a: 'Dan kom je makkelijker op een goed idee', w: ['Dan hoef je zelf niets meer te doen', 'Dan mag je hun idee precies overschrijven', 'Dat helpt niet'] }
  ] },
  { id: 'd-les2', variants: [
    { type: 'mc', q: 'Denk het uit (les 2): wat helpt je bij het maken van een plan?', a: 'Je inleven in de wensen van anderen', w: ['Alleen aan jezelf denken', 'Zo snel mogelijk beginnen zonder na te denken', 'Plaatjes overtekenen'] },
    { type: 'mc', q: 'Je maakt een plan voor een nieuwe speeltuin. Wat is volgens "Denk het uit" slim?', a: 'Bedenken wat de kinderen die er gaan spelen willen', w: ['Alleen kiezen wat jij zelf leuk vindt', 'Het plan van een andere speeltuin precies namaken', 'Niemand iets vragen'] }
  ] },
  { id: 'd-les3', variants: [
    { type: 'mc', q: 'Denk het uit (les 3): hoe kunnen plaatjes je helpen?', a: 'Je laten inspireren door plaatjes en beschrijven wat je ziet', w: ['Plaatjes precies natekenen', 'Plaatjes helpen nooit', 'Alleen plaatjes met tekst erbij gebruiken'] }
  ] }
];

/* ---------------- HULPFUNCTIES ---------------- */
const $ = s => document.querySelector(s);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function norm(s) {
  return String(s).replace(/Ĳ/g, 'IJ').replace(/ĳ/g, 'ij').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}
function stripArticle(s) { return s.replace(/^(de|het|een|'t)\s+/i, ''); }

function lev(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

/* ---------------- OPSLAG ---------------- */
const STORE = 'kapiteinPolder_v1';
function load() {
  try { return Object.assign({ history: [], wrong: {}, sound: true }, JSON.parse(localStorage.getItem(STORE) || '{}')); }
  catch { return { history: [], wrong: {}, sound: true }; }
}
function save() { try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* geen opslag */ } }
let data = load();

/* ---------------- GELUID ---------------- */
let ctx;
function beep(notes) {
  if (!data.sound) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    let t = ctx.currentTime;
    notes.forEach(([f, dur, type]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + dur);
      t += dur * .8;
    });
  } catch { /* geen geluid */ }
}
const sndGood = () => beep([[660, .12], [880, .12], [1175, .2]]);
const sndBad = () => beep([[300, .18, 'sawtooth'], [220, .25, 'sawtooth']]);
const sndWin = () => beep([[523, .15], [659, .15], [784, .15], [1047, .35]]);

function updateSoundBtn() { $('#soundBtn').textContent = data.sound ? '🔊' : '🔇'; }
$('#soundBtn').onclick = () => { data.sound = !data.sound; save(); updateSoundBtn(); };
updateSoundBtn();

/* ---------------- KAART TEKENEN ---------------- */
function renderMap(mapId, opts = {}) {
  const M = MAPS[mapId];
  const places = TOPO.filter(t => t.map === mapId && !t.province && (opts.plus !== false || !t.plus));
  let s = `<svg viewBox="${M.viewBox}" xmlns="http://www.w3.org/2000/svg" class="${opts.clickable ? 'clickable' : ''}">`;
  const [, , w, h] = M.viewBox.split(' ').map(Number);
  s += `<rect width="${w}" height="${h}" fill="#a9dcfa"/>`;
  // golfjes
  for (let i = 0; i < 14; i++) {
    const x = (i * 97) % w, y = (i * 151) % h;
    s += `<text x="${x}" y="${y}" class="waves" font-size="18">~</text>`;
  }
  M.others.forEach(o => { s += `<polygon class="other" points="${o.pts}"/>`; });
  M.land.forEach(p => { s += `<polygon class="land" points="${p}"/>`; });
  M.dikes.forEach(d => { s += `<line class="dike${d.thin ? ' thin' : ''}" x1="${d.from[0]}" y1="${d.from[1]}" x2="${d.to[0]}" y2="${d.to[1]}"/>`; });
  M.others.forEach(o => { s += `<text class="other-label" x="${o.label[0]}" y="${o.label[1]}">${esc(o.name)}</text>`; });
  M.extraLabels.forEach(l => { s += `<text class="other-label" x="${l.at[0]}" y="${l.at[1]}">${esc(l.text)}</text>`; });

  // Op een smal scherm (telefoon) wordt de kaart kleiner: stippen, tik-vlak en namen groter maken
  const scale = Math.min(1, (Math.min(window.innerWidth, 760) - 60) / w);
  const small = scale < .8;
  const dotR = small ? Math.round(7 / scale) : 8;
  const hitR = small ? Math.round(16 / scale) : 20;
  const font = small ? Math.round(13 / scale) : 15;
  places.forEach(p => {
    const show = opts.labels === true || (Array.isArray(opts.labels) && opts.labels.includes(p.id));
    const anchorEnd = p.x > w - 130;
    s += `<g class="marker ${p.kind}" data-id="${p.id}">`;
    s += `<circle class="hit" cx="${p.x}" cy="${p.y}" r="${hitR}"/>`;
    if (opts.highlight === p.id) s += `<circle class="ring" cx="${p.x}" cy="${p.y}" r="${dotR + 10}"/>`;
    s += `<circle class="dot" cx="${p.x}" cy="${p.y}" r="${dotR}"/>`;
    if (show) s += `<text class="name" style="font-size:${font}px" x="${anchorEnd ? p.x - dotR - 4 : p.x + dotR + 4}" y="${p.y + 5}" text-anchor="${anchorEnd ? 'end' : 'start'}">${esc(p.name)}${p.plus ? ' +' : ''}</text>`;
    s += `</g>`;
  });
  s += '</svg>';
  return s;
}

/* ---------------- VRAGEN MAKEN ---------------- */
function mcOptions(correct, wrongPool, n = 3) {
  return shuffle([correct, ...shuffle(wrongPool.filter(x => x !== correct)).slice(0, n)]);
}

function topoQuestion(t, plus, forceStyle) {
  const others = TOPO.filter(o => o.map === t.map && !o.province && o.id !== t.id && (plus || !o.plus));
  // 5 namen waaruit het kind er één moet opschrijven
  const bank = shuffle([t.name, ...shuffle(others.map(o => o.name)).slice(0, 4)]);
  if (t.province) {
    const style = forceStyle || pick(['type', 'mc']);
    const q = { key: t.id, topic: 'Topo · provincie', map: t.map, mapLabels: false };
    if (style === 'type') return { ...q, type: 'open', mode: 'topo', answer: t.name, bank: shuffle(['Flevoland', 'Zeeland', 'Noord-Holland', 'Friesland', 'Zuid-Holland']), q: 'Welke provincie zie je in het groen op deze kaart? Schrijf de naam goed!' };
    return { ...q, type: 'mc', q: 'Welke provincie zie je in het groen op deze kaart?', options: mcOptions(t.name, ['Flevoland', 'Zeeland', 'Noord-Holland', 'Friesland', 'Zuid-Holland', 'Utrecht']), answer: t.name };
  }
  const styles = ['click', 'click', 'nameOnMap', 'whichOnMap', 'desc', 'spell', 'what'];
  if (t.kind === 'plaats' || t.kind === 'gebied') styles.push('province');
  const style = forceStyle || pick(styles);
  const base = { key: t.id, topic: 'Topo · ' + MAPS[t.map].title, map: t.map, plus };
  switch (style) {
    case 'click':
      return { ...base, type: 'click', target: t.id, q: `Waar ligt <b>${esc(t.name)}</b>? Tik op de goede stip.` };
    case 'nameOnMap':
      return { ...base, type: 'open', mode: 'topo', answer: t.name, bank, highlight: t.id, q: `Hoe heet ${t.what} bij de <b>knipperende gele cirkel</b>? Schrijf het goed, met hoofdletter!` };
    case 'whichOnMap':
      return { ...base, type: 'mc', highlight: t.id, answer: t.name, options: mcOptions(t.name, others.map(o => o.name)), q: 'Wat ligt er bij de <b>knipperende gele cirkel</b>?' };
    case 'desc':
      return { ...base, map: null, type: 'open', mode: 'topo', answer: t.name, bank, q: esc(t.q) + ' <small class="muted">(let op hoofdletters!)</small>', showAfter: t.map };
    case 'spell':
      return { ...base, map: null, type: 'mc', answer: t.name, options: mcOptions(t.name, t.spell.concat([t.name.toLowerCase()])), q: `Welke schrijfwijze is <b>goed</b>? <br><small class="muted">${esc(t.q)}</small>` };
    case 'what':
      return { ...base, map: null, type: 'mc', answer: t.what, options: mcOptions(t.what, WHAT_OPTIONS.filter(w => !(t.what === 'een stad' && w === 'een plaats') && !(t.what === 'een plaats' && w === 'een stad'))), q: `Wat is <b>${esc(t.name)}</b>?`, showAfter: t.map };
    case 'province':
      return { ...base, map: null, type: 'mc', answer: MAPS[t.map].title, options: mcOptions(MAPS[t.map].title, ['Flevoland', 'Zeeland', 'Noord-Holland', 'Friesland', 'Zuid-Holland']), q: `In welke provincie ligt <b>${esc(t.name)}</b>?`, showAfter: t.map };
  }
}

function wordQuestion(w) {
  const style = pick(['defToTerm', 'termToDef']);
  const base = { key: 'b-' + w.term, topic: 'Begrippen' };
  const article = w.term === 'Zuiderzee' ? 'de ' : 'de ';
  if (style === 'defToTerm')
    return { ...base, type: 'mc', q: `Welk woord hoort bij deze uitleg?<br><i>"${esc(w.def)}"</i>`, answer: w.term, options: mcOptions(w.term, WORDS.map(x => x.term)) };
  if (style === 'termToDef')
    return { ...base, type: 'mc', q: `Wat betekent <b>${article}${esc(w.term)}</b>?`, answer: w.def, options: mcOptions(w.def, WORDS.map(x => x.def)) };
  return { ...base, type: 'open', mode: 'word', answers: [w.term], q: `Welk woord hoort bij deze uitleg? Typ het woord.<br><i>"${esc(w.def)}"</i>` };
}

function itemQuestion(item, topic) {
  const v = pick(item.variants.filter(x => x.type === 'mc'));
  const q = { ...v, key: item.id, topic };
  if (v.type === 'mc') {
    q.answer = v.a;
    q.options = v.fixed ? [v.a, ...v.w].sort((a, b) => (a === 'Waar' ? -1 : b === 'Waar' ? 1 : 0)) : mcOptions(v.a, v.w);
  }
  return q;
}

/* gewogen trekken: fout gemaakte vragen komen vaker */
function weightedSample(items, n, keyOf) {
  const pool = items.slice(), out = [];
  while (out.length < n && pool.length) {
    const weights = pool.map(it => 1 + 3 * (data.wrong[keyOf(it)] || 0));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    let i = 0;
    while (r > weights[i]) { r -= weights[i]; i++; }
    out.push(pool.splice(Math.min(i, pool.length - 1), 1)[0]);
  }
  return out;
}

function buildTest(n, plus, topoOnly) {
  const topoItems = TOPO.filter(t => plus || !t.plus);
  let qs = [];
  if (topoOnly) {
    // elk topo-item minstens 1x als het past, aanwijzen extra vaak
    let items = weightedSample(topoItems, Math.min(n, topoItems.length), t => t.id);
    while (items.length < n) items = items.concat(weightedSample(topoItems, Math.min(n - items.length, topoItems.length), t => t.id));
    qs = items.map(t => topoQuestion(t, plus));
  } else {
    const nTopo = Math.round(n * 0.45), nWord = Math.round(n * 0.22), nThink = Math.max(1, Math.round(n * 0.08));
    const nKnow = n - nTopo - nWord - nThink;
    qs = qs.concat(weightedSample(topoItems, nTopo, t => t.id).map(t => topoQuestion(t, plus)));
    qs = qs.concat(weightedSample(WORDS, nWord, w => 'b-' + w.term).map(wordQuestion));
    qs = qs.concat(weightedSample(KNOWLEDGE, nKnow, k => k.id).map(k => itemQuestion(k, 'Pas op voor de zee & Nieuw land')));
    qs = qs.concat(weightedSample(THINK, nThink, k => k.id).map(k => itemQuestion(k, 'Denk het uit')));
  }
  // nooit twee keer exact dezelfde vraag achter elkaar
  return shuffle(qs);
}

function rebuildFromKey(key, plus) {
  const t = TOPO.find(x => x.id === key);
  if (t) return topoQuestion(t, plus);
  const w = WORDS.find(x => 'b-' + x.term === key);
  if (w) return wordQuestion(w);
  const k = KNOWLEDGE.find(x => x.id === key);
  if (k) return itemQuestion(k, 'Pas op voor de zee & Nieuw land');
  const d = THINK.find(x => x.id === key);
  if (d) return itemQuestion(d, 'Denk het uit');
}

/* ---------------- ANTWOORD CONTROLEREN ---------------- */
function checkOpen(q, input) {
  const raw = input.trim().replace(/\s+/g, ' ');
  if (!raw) return null;

  if (q.mode === 'topo') {
    const given = stripArticle(raw);
    const ans = q.answer;
    if (given === ans || given.replace(/Ĳ/g, 'IJ') === ans) return { ok: true };
    if (given.toLowerCase() === ans.toLowerCase()) {
      const ijHint = /^ij/i.test(ans) ? ' Bij <b>IJ</b> schrijf je allebei de letters met een hoofdletter.' : '';
      return { ok: false, hint: `Bijna! Let op de <b>hoofdletters</b>.${ijHint}` };
    }
    if (given.replace(/[\s-]/g, '').toLowerCase() === ans.replace(/[\s-]/g, '').toLowerCase())
      return { ok: false, hint: 'Bijna! Let op het <b>streepje of de spatie</b>.' };
    if (lev(given.toLowerCase(), ans.toLowerCase()) <= 2) return { ok: false, hint: 'Bijna! Let goed op de <b>spelling</b>.' };
    return { ok: false };
  }

  if (q.mode === 'word') {
    const given = stripArticle(norm(raw));
    for (const a of q.answers) {
      const n = norm(a);
      if (given === n) return { ok: true };
      if (n.length >= 5 && lev(given, n) <= 1) return { ok: true, hint: `Let wel op de spelling: <b>${esc(a)}</b>.` };
    }
    return { ok: false };
  }

  if (q.mode === 'keywords') {
    const given = norm(raw);
    const ok = q.groups.every(g => g.some(k => given.includes(norm(k))));
    return { ok, keywords: true };
  }
}

/* ---------------- SPEL-STATUS ---------------- */
let game = null;
let settings = { n: 20, plus: true };

function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  $('#' + id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startGame(mode, questions) {
  settings.plus = $('#plusTopo').checked;
  const qs = questions || buildTest(settings.n, settings.plus, mode === 'topo');
  game = { mode, qs, i: 0, correct: 0, points: 0, streak: 0, bestStreak: 0, log: [] };
  show('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = game.qs[game.i];
  game.sel = null;
  $('#qCounter').textContent = `Vraag ${game.i + 1} van ${game.qs.length}`;
  $('#boat').style.left = `calc(${(game.i / game.qs.length) * 88}% )`;
  $('#qTopic').textContent = q.topic;
  $('#qText').innerHTML = q.q;
  $('#feedback').className = 'feedback hidden';
  $('#overrideBtn').classList.add('hidden');
  const next = $('#nextBtn');
  next.textContent = game.i + 1 < game.qs.length ? 'Volgende ▶' : 'Inleveren 🏝️';
  next.classList.add('hidden');

  // kaart
  const mapBox = $('#qMap');
  if (q.map) {
    mapBox.classList.remove('hidden');
    mapBox.innerHTML = renderMap(q.map, { highlight: q.highlight, clickable: q.type === 'click', labels: false, plus: q.plus });
    if (q.type === 'click') {
      mapBox.querySelectorAll('.marker').forEach(m => m.addEventListener('click', () => chooseClick(m.dataset.id)));
    }
  } else {
    mapBox.classList.add('hidden');
    mapBox.innerHTML = '';
  }

  // opties
  const opts = $('#qOptions');
  opts.innerHTML = '';
  const form = $('#qOpenForm');
  form.classList.add('hidden');
  if (q.type === 'mc') {
    q.options.forEach((o, idx) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = `<span class="letter">${'ABCDE'[idx]}</span><span>${esc(o)}</span>`;
      b.onclick = () => chooseMC(o, b);
      opts.appendChild(b);
    });
  } else if (q.type === 'open') {
    if (q.bank) {
      opts.innerHTML = `<div class="bank"><span class="bank-label">Kies één van deze namen en schrijf hem precies goed over:</span>
        <div class="bank-names">${q.bank.map(n => `<span class="bank-name">${esc(n)}</span>`).join('')}</div></div>`;
    }
    form.classList.remove('hidden');
    const inp = $('#qInput');
    inp.value = ''; inp.className = ''; inp.disabled = false;
    form.querySelector('button').disabled = false;
    form.querySelector('button').textContent = game.i + 1 < game.qs.length ? 'Volgende ▶' : 'Inleveren 🏝️';
    setTimeout(() => inp.focus(), 50);
  }
}

// Kiezen mag zo vaak als je wilt; pas bij "Volgende" telt het antwoord
function chooseMC(choice, btn) {
  const q = game.qs[game.i];
  document.querySelectorAll('#qOptions .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  game.sel = { given: choice, ok: choice === q.answer };
  beep([[620, .06]]);
  $('#nextBtn').classList.remove('hidden');
}

function chooseClick(id) {
  const q = game.qs[game.i];
  const clicked = TOPO.find(t => t.id === id);
  $('#qMap').querySelectorAll('.marker').forEach(m => m.classList.toggle('selected', m.dataset.id === id));
  game.sel = { given: clicked ? clicked.name : '?', clickedId: id, ok: id === q.target };
  beep([[620, .06]]);
  const next = $('#nextBtn');
  next.classList.remove('hidden');
  next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

$('#qOpenForm').addEventListener('submit', e => {
  e.preventDefault();
  const q = game.qs[game.i];
  const inp = $('#qInput');
  const res = checkOpen(q, inp.value);
  if (!res) { inp.focus(); return; }
  game.sel = { given: inp.value.trim(), ok: res.ok, hint: res.hint };
  commitAnswer();
});

function commitAnswer() {
  const q = game.qs[game.i];
  const { ok } = game.sel;
  data.wrong[q.key] = ok ? Math.max(0, (data.wrong[q.key] || 0) - 1) : Math.min(5, (data.wrong[q.key] || 0) + 2);
  save();
  game.log.push({ q, ...game.sel });
  game.i++;
  if (game.i < game.qs.length) renderQuestion();
  else showResult();
}

$('#nextBtn').onclick = () => { if (game.sel) commitAnswer(); };

document.addEventListener('keydown', e => {
  if ($('#quiz').classList.contains('hidden') || !game) return;
  const q = game.qs[game.i];
  if (!q || q.type === 'open') return;
  if (e.key === 'Enter' && game.sel) { e.preventDefault(); commitAnswer(); return; }
  if (q.type === 'mc') {
    const idx = 'abcde'.indexOf(e.key.toLowerCase());
    const btns = document.querySelectorAll('#qOptions .opt');
    if (idx >= 0 && btns[idx]) btns[idx].click();
  }
});

// Twee keer tikken om te bevestigen (pop-ups werken niet overal)
function confirmTap(btn, askText, action) {
  if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = btn.dataset.orig; action(); return; }
  btn.dataset.orig = btn.textContent;
  btn.dataset.armed = '1';
  btn.textContent = askText;
  setTimeout(() => { if (btn.dataset.armed) { delete btn.dataset.armed; btn.textContent = btn.dataset.orig; } }, 3000);
}
$('#quitBtn').onclick = e => confirmTap(e.currentTarget, 'Zeker? Tik nog een keer ✕', goHome);

/* ---------------- EFFECTEN ---------------- */
function confetti(set = ['🎉', '⭐', '🐟', '⚓', '🌊', '🏆']) {
  const box = $('#confetti');
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    s.textContent = pick(set);
    s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDelay = Math.random() * .5 + 's';
    s.style.animationDuration = 1.2 + Math.random() * 1.2 + 's';
    box.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}
/* ---------------- RESULTAAT ---------------- */
function rightAnswer(q) {
  if (q.type === 'open') return q.mode === 'topo' ? q.answer : q.mode === 'word' ? q.answers[0] : q.model;
  if (q.type === 'click') return TOPO.find(t => t.id === q.target).name;
  return q.answer;
}

function showResult() {
  // punten en reeksen pas nu uitrekenen
  game.correct = 0; game.points = 0; game.streak = 0; game.bestStreak = 0;
  game.log.forEach(l => {
    if (l.ok) {
      game.correct++; game.streak++;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      game.points += 10 + Math.min(game.streak - 1, 5) * 2;
    } else game.streak = 0;
  });
  const total = game.qs.length;
  const grade = Math.round((1 + 9 * game.correct / total) * 10) / 10;
  const gradeStr = grade.toFixed(1).replace('.', ',');
  const pct = game.correct / total;
  show('result');

  $('#gradeNum').textContent = gradeStr;
  $('#gradeScore').textContent = `${game.correct} van de ${total} goed · 🪙 ${game.points} munten · langste reeks 🔥 ${game.bestStreak}`;
  let title, text, medal;
  if (pct >= .9) { medal = '🏆'; title = 'Kapitein van de Polder!'; text = 'Fantastisch! Jij bent er helemaal klaar voor.'; }
  else if (pct >= .75) { medal = '🥇'; title = 'Stuurman!'; text = 'Heel goed! Oefen de foutjes nog even.'; }
  else if (pct >= .55) { medal = '⛵'; title = 'Matroos'; text = 'Voldoende! Met nog wat oefenen wordt het top.'; }
  else { medal = '🛟'; title = 'Scheepsmaatje'; text = 'Nog even oefenen. Kijk de fouten na en probeer het opnieuw!'; }
  $('#medal').textContent = medal;
  $('#resultTitle').textContent = title;
  $('#gradeText').textContent = text;
  const stars = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .5 ? 1 : 0;
  $('#stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  $('#stars').style.color = '#f5b301';

  // badges
  const badges = [];
  const topoLog = game.log.filter(l => l.q.topic.startsWith('Topo'));
  if (topoLog.length >= 3 && topoLog.every(l => l.ok)) badges.push('🗺️ Topo-kampioen');
  const clickLog = game.log.filter(l => l.q.type === 'click');
  if (clickLog.length >= 2 && clickLog.every(l => l.ok)) badges.push('📍 Scherp oog');
  const wordLog = game.log.filter(l => l.q.topic === 'Begrippen');
  if (wordLog.length >= 2 && wordLog.every(l => l.ok)) badges.push('📖 Woordenkenner');
  const spellLog = game.log.filter(l => l.q.mode === 'topo');
  if (spellLog.length >= 2 && spellLog.every(l => l.ok)) badges.push('✍️ Spellingsheld');
  if (game.bestStreak >= 5) badges.push(`🔥 Reeks van ${game.bestStreak}`);
  const best = data.history.filter(h => h.mode === game.mode).reduce((m, h) => Math.max(m, h.grade), 0);
  if (data.history.length && grade > best) badges.push('🚀 Nieuw record!');
  $('#badges').innerHTML = badges.map(b => `<span class="badge">${b}</span>`).join('');

  // nakijken: alle vragen, met jouw antwoord en het goede antwoord
  $('#review').innerHTML = game.log.map((l, n) => {
    const q = l.q;
    const target = TOPO.find(t => t.id === q.key && !t.province);
    let map = '';
    if (target && (q.map || q.showAfter)) {
      const labels = [target.id];
      if (l.clickedId && l.clickedId !== target.id) labels.push(l.clickedId);
      map = `<div class="map-box review-map" data-n="${n}">${renderMap(target.map, { labels, plus: true })}</div>`;
    }
    const hint = !l.ok && l.hint ? `<div class="ans">💡 ${l.hint}</div>` : '';
    const explain = q.explain ? `<div class="ans">ℹ️ ${esc(q.explain)}</div>` : '';
    return `<li class="${l.ok ? 'r-ok' : 'r-no'}">
      <div class="r-head"><span class="${l.ok ? 'ok' : 'no'}">${l.ok ? '✔ Goed' : '✘ Fout'}</span> ${q.q.replace(/<br>.*$/s, '').replace(/<small.*$/s, '')}</div>
      <div class="ans">Jouw antwoord: <b>${esc(l.given || '–')}</b></div>
      ${l.ok ? '' : `<div class="ans good-ans">Goede antwoord: <b>${esc(rightAnswer(q))}</b></div>`}
      ${hint}${explain}${map}</li>`;
  }).join('');
  // op de kaartjes: groen = goed antwoord, rood = waar je op tikte
  game.log.forEach((l, n) => {
    const box = document.querySelector(`.review-map[data-n="${n}"]`);
    if (!box) return;
    box.querySelector(`[data-id="${l.q.key}"]`)?.classList.add('good');
    if (l.clickedId && l.clickedId !== l.q.key) box.querySelector(`[data-id="${l.clickedId}"]`)?.classList.add('bad');
  });

  game.wrongKeys = [...new Set(game.log.filter(l => !l.ok).map(l => l.q.key))];
  $('#mistakesBtn').classList.toggle('hidden', game.wrongKeys.length === 0);

  data.history.unshift({ date: new Date().toISOString(), grade, correct: game.correct, total, points: game.points, mode: game.mode });
  data.history = data.history.slice(0, 30);
  save();

  if (pct >= .55) { confetti(); sndWin(); }
}

$('#againBtn').onclick = () => startGame(game.mode === 'fouten' ? 'test' : game.mode);
$('#homeBtn').onclick = goHome;
$('#mistakesBtn').onclick = () => {
  const qs = shuffle(game.wrongKeys.map(k => rebuildFromKey(k, settings.plus)).filter(Boolean));
  startGame('fouten', qs);
};

/* ---------------- STARTSCHERM ---------------- */
const MODE_NAMES = { test: 'Oefentoets', topo: 'Topo', fouten: 'Fouten' };
function renderHistory() {
  const h = data.history;
  if (!h.length) { $('#historyBox').innerHTML = '<p class="muted">Nog geen scores. Start je eerste toets! 🚢</p>'; return; }
  const bestTest = h.filter(x => x.mode === 'test').reduce((m, x) => Math.max(m, x.grade), 0);
  const bestTopo = h.filter(x => x.mode === 'topo').reduce((m, x) => Math.max(m, x.grade), 0);
  const f = g => g.toFixed(1).replace('.', ',');
  $('#historyBox').innerHTML = `
    <div class="best">🏆 Beste cijfer oefentoets: ${bestTest ? f(bestTest) : '–'} &nbsp;·&nbsp; 📍 Beste topo: ${bestTopo ? f(bestTopo) : '–'} &nbsp;·&nbsp; ${h.length}× geoefend</div>
    <table>
      <tr><th>Wanneer</th><th>Soort</th><th>Goed</th><th>Cijfer</th><th>🪙</th></tr>
      ${h.slice(0, 8).map(x => {
        const d = new Date(x.date);
        return `<tr><td>${d.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' })} ${d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}</td>
          <td>${MODE_NAMES[x.mode] || x.mode}</td><td>${x.correct}/${x.total}</td><td><b>${f(x.grade)}</b></td><td>${x.points}</td></tr>`;
      }).join('')}
    </table>
    <p><button class="link-btn" id="resetBtn">Scores wissen</button></p>`;
  $('#resetBtn').onclick = e => confirmTap(e.currentTarget, 'Echt alles wissen? Tik nog een keer',
    () => { data.history = []; data.wrong = {}; data.adventure = {}; save(); renderHistory(); });
}

function goHome() { show('start'); renderHistory(); }

document.querySelectorAll('#lengthChoice .pill').forEach(b => b.onclick = () => {
  document.querySelectorAll('#lengthChoice .pill').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  settings.n = Number(b.dataset.n);
});

document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
  const go = b.dataset.go;
  if (go === 'adventure') openAdventure();
  else if (go === 'test') startGame('test');
  else if (go === 'topoOnly') startGame('topo');
  else if (go === 'learnTopo') { show('learnTopo'); renderLearnMap(); }
  else if (go === 'learnWords') { show('learnWords'); renderFlashcards(); }
});
document.querySelectorAll('[data-home]').forEach(b => b.onclick = goHome);

/* ---------------- TOPO LEREN ---------------- */
let learnMapId = 'flevo';
let learnSelected = null;
function renderLearnMap() {
  const plus = $('#plusTopo').checked;
  const showNames = $('#showNames').checked;
  const box = $('#learnMap');
  const labels = showNames ? true : (learnSelected ? [learnSelected] : []);
  box.innerHTML = renderMap(learnMapId, { labels, clickable: true, highlight: learnSelected, plus });
  box.querySelectorAll('.marker').forEach(m => m.addEventListener('click', () => selectLearn(m.dataset.id)));

  const items = TOPO.filter(t => t.map === learnMapId && (plus || !t.plus));
  $('#learnList').innerHTML = items.map(t =>
    `<button class="name-chip ${learnSelected === t.id ? 'active' : ''}" data-id="${t.id}">${esc(t.name)}${t.plus ? ' <b>+</b>' : ''}</button>`).join('');
  $('#learnList').querySelectorAll('.name-chip').forEach(c => c.onclick = () => selectLearn(c.dataset.id));
}
function selectLearn(id) {
  learnSelected = id;
  const t = TOPO.find(x => x.id === id);
  if (t.province) {
    $('#learnInfo').innerHTML = `<b>${esc(t.name)}</b> – de provincie die groen gekleurd is op deze kaart.`;
  } else {
    $('#learnInfo').innerHTML = `<b>${esc(t.name)}</b>${t.plus ? ' <span class="tag">+ topo</span>' : ''} – ${esc(t.what)}.<br><span class="muted">${esc(t.q.replace(/\?$/, ''))}? → <b>${esc(t.name)}</b></span>`;
  }
  beep([[740, .08]]);
  renderLearnMap();
}
document.querySelectorAll('#mapTabs .pill').forEach(b => b.onclick = () => {
  document.querySelectorAll('#mapTabs .pill').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  learnMapId = b.dataset.map; learnSelected = null;
  $('#learnInfo').textContent = 'Tik op een stip of een naam hieronder.';
  renderLearnMap();
});
$('#showNames').onchange = renderLearnMap;
$('#plusTopo').onchange = () => { if (!$('#learnTopo').classList.contains('hidden')) renderLearnMap(); };

/* ---------------- BEGRIPPEN LEREN ---------------- */
function renderFlashcards() {
  $('#flashcards').innerHTML = shuffle(WORDS).map(w => `
    <button class="flash"><div class="flash-inner">
      <div class="flash-face flash-front">${w.term === 'Zuiderzee' ? 'de Zuiderzee' : 'de ' + esc(w.term)}</div>
      <div class="flash-face flash-back">${esc(w.def)}</div>
    </div></button>`).join('');
  $('#flashcards').querySelectorAll('.flash').forEach(f => f.onclick = () => { f.classList.toggle('flipped'); beep([[520, .06]]); });
  $('#summary').innerHTML = SUMMARY.map(s => `<div>${s}</div>`).join('');
}

renderHistory();
