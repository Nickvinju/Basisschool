/* =========================================================
   Leesraket – teksten en oefeningen (begrijpend lezen groep 6)

   Een tekst = alinea's met losse zinnen. De zinnen worden genummerd
   vanaf 0 (eerste zin van de eerste alinea) – dat nummer gebruik je bij
   vragen van het type 'zin' ("tik op de zin waarin…").

   Vraagtypes:
     mc   – meerkeuze            { t:'mc', s:<vaardigheid>, q, a, w:[fout,…] }
     tf   – waar / niet waar / staat er niet   { t:'tf', s:'wnw', q:<bewering>, a:'Waar'|'Niet waar'|'Staat er niet' }
     zin  – tik op de juiste zin  { t:'zin', s:'zoek', q, a:[zinnummer,…] }
     volg – zet in volgorde       { t:'volg', s:'volg', q, items:[goede volgorde] }
   ========================================================= */

const VAARDIGHEDEN = {
  hoofd:   { naam: 'Hoofdgedachte',        emoji: '🎯', tip: 'De hoofdgedachte is waar de héle tekst over gaat, niet één los detail.' },
  zoek:    { naam: 'Zoeken in de tekst',   emoji: '🔎', tip: 'Zoek naar een sleutelwoord uit de vraag en lees die zin goed.' },
  woord:   { naam: 'Woordbetekenis',       emoji: '🧩', tip: 'Lees de zin ervoor en erna. Daar staat vaak een aanwijzing voor wat een woord betekent.' },
  verwijs: { naam: 'Verwijswoorden',       emoji: '👉', tip: 'Een verwijswoord (hij, zij, ze, die, dit, daar) wijst terug naar iets wat al eerder genoemd is. Lees terug!' },
  signaal: { naam: 'Signaalwoorden',       emoji: '🚦', tip: 'Signaalwoorden vertellen hoe zinnen bij elkaar horen: maar/toch = tegenstelling, omdat/daardoor = oorzaak en gevolg, eerst/daarna = tijd.' },
  tussen:  { naam: 'Lezen tussen de regels', emoji: '💭', tip: 'Niet alles staat letterlijk in de tekst. Gebruik wat er wél staat en bedenk wat daaruit volgt.' },
  wnw:     { naam: 'Waar of niet waar',    emoji: '✔️', tip: '"Staat er niet" kies je als de tekst er níets over zegt, ook al is het misschien wel waar.' },
  volg:    { naam: 'Volgorde',             emoji: '🔢', tip: 'Let op tijdwoorden zoals eerst, daarna, toen en ten slotte.' },
  mening:  { naam: 'Feit of mening',       emoji: '🗣️', tip: 'Een feit kun je controleren. Een mening is wat iemand vindt (mooi, leuk, beste, eng…).' }
};

const ONDERWERPEN_LEZEN = [
  { id: 'computers', naam: 'Computers', emoji: '💻', kleur: '#3ddcff' },
  { id: 'geschiedenis', naam: 'Geschiedenis', emoji: '🏛️', kleur: '#ffb547' },
  { id: 'ruimte', naam: 'Ruimte', emoji: '🪐', kleur: '#b48cff' },
  { id: 'technologie', naam: 'Technologie', emoji: '🤖', kleur: '#5ef0a0' },
  { id: 'landen', naam: 'Landen', emoji: '🌍', kleur: '#ff7a7a' },
  { id: 'feitjes', naam: 'Feitjes', emoji: '💡', kleur: '#ffd23f' }
];

const TEKSTEN = [
  /* ---------------- COMPUTERS ---------------- */
  {
    id: 'eniac', onderwerp: 'computers', emoji: '🖥️', titel: 'Een computer zo groot als een huis',
    alineas: [
      ['Heb jij weleens bedacht hoe de eerste computers eruitzagen?', 'In 1946 lieten twee uitvinders in Amerika de ENIAC zien.', 'Het was een van de eerste elektronische computers ter wereld.'],
      ['De ENIAC was gigantisch.', 'Hij vulde een hele zaal en woog ongeveer 27.000 kilo.', 'Dat is zwaarder dan vier olifanten bij elkaar!', 'In de computer zaten bijna 18.000 radiobuizen.', 'Dat zijn glazen lampjes die stroom aan en uit kunnen zetten.', 'Ze werden zo warm dat de zaal flink gekoeld moest worden.'],
      ['Een programma typen kon nog niet.', 'Wie de computer een nieuwe opdracht wilde geven, moest honderden kabels en schakelaars verzetten.', 'Daar waren mensen soms dagen mee bezig.'],
      ['Toch was de ENIAC voor die tijd supersnel.', 'Hij kon in één seconde 5000 sommen maken.', 'Maar de telefoon in jouw broekzak is nog miljoenen keren sneller, en hij past gewoon in je hand.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst vooral over?', a: 'Hoe een van de eerste computers eruitzag en werkte', w: ['Hoe je zelf een computer programmeert', 'Waarom olifanten zo zwaar zijn', 'Hoe een moderne telefoon werkt'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat hoe zwaar de ENIAC was.', a: [4] },
      { t: 'mc', s: 'woord', q: '"De ENIAC was <b>gigantisch</b>." Wat betekent gigantisch?', a: 'heel erg groot', w: ['heel erg oud', 'heel erg snel', 'heel erg duur'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Ze</b> werden zo warm dat de zaal flink gekoeld moest worden." Wat zijn "ze"?', a: 'de radiobuizen', w: ['de uitvinders', 'de olifanten', 'de schakelaars'] },
      { t: 'mc', s: 'signaal', q: 'De laatste alinea begint met "<b>Toch</b>". Wat voor signaalwoord is dat?', a: 'tegenstelling', w: ['opsomming', 'tijd', 'voorbeeld'] },
      { t: 'mc', s: 'tussen', q: 'Waarom moest de zaal van de ENIAC gekoeld worden?', a: 'Omdat de radiobuizen heel warm werden', w: ['Omdat het in Amerika altijd heel heet is', 'Omdat de olifanten het warm hadden', 'Omdat de kabels anders gingen smelten van de kou'] },
      { t: 'tf', s: 'wnw', q: 'Op de ENIAC kon je een programma typen.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'De ENIAC kon 5000 sommen per seconde maken.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'De ENIAC kostte heel veel geld.', a: 'Staat er niet' }
    ]
  },
  {
    id: 'bug', onderwerp: 'computers', emoji: '🐛', titel: 'De mot in de computer',
    alineas: [
      ['Als een computerspel vastloopt, zeggen we vaak dat er een bug in zit.', 'Bug is Engels voor insect.', 'Maar wat heeft een insect met een computer te maken?'],
      ['In 1947 werkte een groep onderzoekers in Amerika aan een enorme computer, de Mark II.', 'Op een dag deed de computer het ineens niet meer goed.', 'De onderzoekers gingen op zoek naar de oorzaak.', 'Uiteindelijk vonden ze een mot die klem zat tussen twee onderdelen.'],
      ['Ze haalden het beestje voorzichtig weg en plakten het met plakband in hun logboek.', 'Ernaast schreven ze dat ze voor het eerst een echte bug hadden gevonden.', 'Een van de bekendste mensen in dat team was Grace Hopper.', 'Zij werd later een beroemde computerpionier.'],
      ['Het woord bug werd al eerder gebruikt voor foutjes in machines.', 'Toch maakte dit grappige verhaal het woord wereldberoemd.', 'Het logboek met de mot ligt nu in een museum.', 'Programmeurs noemen het zoeken naar fouten nog steeds debuggen: letterlijk ont-buggen.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte van deze tekst?', a: 'Een echt insect in een computer maakte het woord bug beroemd', w: ['Grace Hopper was de eerste programmeur ter wereld', 'Motten eten graag computerkabels', 'Computerspellen lopen vaak vast'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat waar het logboek nu ligt.', a: [13] },
      { t: 'volg', s: 'volg', q: 'Zet het verhaal in de goede volgorde.', items: ['De computer deed het niet meer goed', 'De onderzoekers zochten naar de oorzaak', 'Ze vonden een mot tussen twee onderdelen', 'Ze plakten de mot in hun logboek'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Zij</b> werd later een beroemde computerpionier." Wie is "zij"?', a: 'Grace Hopper', w: ['de mot', 'de Mark II', 'de groep onderzoekers'] },
      { t: 'mc', s: 'woord', q: 'Wat betekent <b>debuggen</b>?', a: 'fouten zoeken en weghalen uit een programma', w: ['een computer schoonmaken', 'insecten vangen', 'een nieuw spel maken'] },
      { t: 'mc', s: 'tussen', q: 'Waarom noemt de schrijver het verhaal "grappig"?', a: 'Omdat er echt een insect (een bug) de fout veroorzaakte', w: ['Omdat de onderzoekers grapjes maakten', 'Omdat motten er grappig uitzien', 'Omdat de computer begon te lachen'] },
      { t: 'tf', s: 'wnw', q: 'Het woord bug werd in 1947 voor het allereerst gebruikt.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Bug is Engels voor insect.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'De mot leefde nog toen ze hem vonden.', a: 'Staat er niet' }
    ]
  },

  /* ---------------- GESCHIEDENIS ---------------- */
  {
    id: 'piramides', onderwerp: 'geschiedenis', emoji: '🔺', titel: 'De piramides van Egypte',
    alineas: [
      ['In de woestijn van Egypte staan al duizenden jaren enorme piramides.', 'De grootste is de piramide van Choefoe, ook wel Cheops genoemd.', 'Hij werd ongeveer 4500 jaar geleden gebouwd.'],
      ['Een piramide was een graf voor een farao, een koning van het oude Egypte.', 'De Egyptenaren geloofden dat de farao na zijn dood verder leefde.', 'Daarom kreeg hij spullen mee in zijn graf, zoals eten, sieraden en meubels.'],
      ['De Grote Piramide bestaat uit meer dan twee miljoen stenen blokken.', 'Sommige blokken zijn zwaarder dan een auto.', 'Hoe kregen ze die zonder kranen naar boven?', 'Waarschijnlijk sleepten ze de blokken op sleeën over hellingen van zand en klei.'],
      ['Lange tijd dachten mensen dat slaven de piramides bouwden.', 'Maar onderzoekers vonden in de buurt huizen, bakkerijen en graven van de bouwers.', 'Daardoor weten we nu dat het vooral betaalde arbeiders waren.', 'Ze kregen onder andere brood en bier als loon.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst vooral over?', a: 'Waarom en hoe de Egyptenaren de piramides bouwden', w: ['Hoe je farao kunt worden', 'Waarom het in de woestijn zo heet is', 'Wat de Egyptenaren graag aten'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin die vertelt waarvoor een piramide diende.', a: [3] },
      { t: 'mc', s: 'verwijs', q: '"Daarom kreeg <b>hij</b> spullen mee in zijn graf." Wie is "hij"?', a: 'de farao', w: ['een bouwer', 'een slaaf', 'een onderzoeker'] },
      { t: 'mc', s: 'signaal', q: '"<b>Daardoor</b> weten we nu dat het vooral betaalde arbeiders waren." Wat voor signaalwoord is daardoor?', a: 'oorzaak en gevolg', w: ['tegenstelling', 'opsomming', 'tijd'] },
      { t: 'mc', s: 'tussen', q: 'Waarom kreeg een farao eten mee in zijn graf?', a: 'Omdat de Egyptenaren geloofden dat hij na zijn dood verder leefde', w: ['Omdat de bouwers honger hadden', 'Omdat eten in de piramide nooit bederft', 'Omdat er geen keuken in de piramide was'] },
      { t: 'mc', s: 'mening', q: 'Welke zin is een <b>mening</b>?', a: 'De piramides zijn de mooiste gebouwen ter wereld.', w: ['De piramides staan in Egypte.', 'De Grote Piramide is ongeveer 4500 jaar oud.', 'Een farao was een koning van het oude Egypte.'] },
      { t: 'tf', s: 'wnw', q: 'De piramides werden vooral door slaven gebouwd.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Sommige blokken van de Grote Piramide zijn zwaarder dan een auto.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'In Egypte staan meer dan honderd piramides.', a: 'Staat er niet' }
    ]
  },
  {
    id: 'romeinen', onderwerp: 'geschiedenis', emoji: '🛡️', titel: 'Romeinen aan de Rijn',
    alineas: [
      ['Ongeveer 2000 jaar geleden kwamen de Romeinen naar ons land.', 'Ze hadden een gigantisch rijk, met Rome als hoofdstad.', 'De rivier de Rijn werd de noordgrens van dat rijk.'],
      ['Langs de Rijn bouwden de Romeinen een rij forten met soldaten.', 'Die grens heet de limes.', 'De soldaten hielden in de gaten wie de rivier over wilde.'],
      ['Bij de forten ontstonden dorpen en later steden.', 'Nijmegen noemt zichzelf daarom de oudste stad van Nederland.', 'Ook Utrecht en Maastricht begonnen als Romeinse plaats.'],
      ['De Romeinen brachten veel nieuwe dingen mee.', 'Ze legden stevige wegen aan en bouwden badhuizen met warm water.', 'Ook betaalden ze met munten, terwijl veel mensen hier spullen ruilden.', 'Archeologen vinden nog steeds Romeinse munten, scherven en zelfs schoenen in de grond.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte?', a: 'De Romeinen woonden 2000 jaar geleden in ons land en lieten veel achter', w: ['Nijmegen is de mooiste stad van Nederland', 'Romeinse soldaten konden goed zwemmen', 'Archeologen vinden graag schoenen'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat hoe de Romeinse grens heet.', a: [4] },
      { t: 'mc', s: 'woord', q: 'Wat doen <b>archeologen</b>?', a: 'Ze zoeken en onderzoeken spullen van vroeger in de grond', w: ['Ze bouwen nieuwe wegen', 'Ze bewaken de grens', 'Ze maken munten'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Die</b> grens heet de limes." Welke grens wordt bedoeld?', a: 'de rij forten langs de Rijn', w: ['de grens van Nijmegen', 'de grens tussen Nederland en België', 'de muren van Rome'] },
      { t: 'mc', s: 'tussen', q: 'Waarom noemt Nijmegen zichzelf de oudste stad van Nederland?', a: 'Omdat er al in de Romeinse tijd een plaats ontstond bij een fort', w: ['Omdat er de oudste mensen wonen', 'Omdat de Romeinen er een badhuis bouwden', 'Omdat Nijmegen de hoofdstad van het rijk was'] },
      { t: 'tf', s: 'wnw', q: 'Utrecht begon als Romeinse plaats.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'De Romeinen betaalden niet met geld, maar ruilden spullen.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'De Romeinen hadden olifanten bij zich in ons land.', a: 'Staat er niet' }
    ]
  },

  /* ---------------- RUIMTE ---------------- */
  {
    id: 'maan', onderwerp: 'ruimte', emoji: '🌕', titel: 'Een stap op de maan',
    alineas: [
      ['Op 20 juli 1969 keken honderden miljoenen mensen naar hun televisie.', 'Ze zagen iets wat nog nooit was gebeurd: mensen landden op de maan.'],
      ['De raket heette Apollo 11 en vertrok vier dagen eerder uit Amerika.', 'Aan boord zaten drie astronauten: Neil Armstrong, Buzz Aldrin en Michael Collins.', 'Collins bleef in het ruimteschip rond de maan vliegen.', 'Armstrong en Aldrin daalden af in een kleine maanlander.'],
      ['Neil Armstrong zette als eerste mens een voet op de maan.', 'Daarna volgde Buzz Aldrin.', "Samen plantten ze een vlag, maakten ze foto's en verzamelden ze stenen.", 'Ze bleven ongeveer tweeënhalf uur buiten.'],
      ['Hun voetafdrukken staan er waarschijnlijk nog steeds.', 'Op de maan waait namelijk geen wind en regent het nooit.', 'Er is dus niets dat de afdrukken kan wegvegen.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst over?', a: 'De eerste keer dat mensen op de maan liepen', w: ['Hoe een raket wordt gebouwd', 'Waarom het op de maan nooit regent', 'Hoe je astronaut wordt'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat wie er in het ruimteschip bleef.', a: [4] },
      { t: 'volg', s: 'volg', q: 'Zet in de goede volgorde.', items: ['Apollo 11 vertrok uit Amerika', 'Armstrong en Aldrin daalden af in de maanlander', 'Armstrong zette als eerste een voet op de maan', 'Aldrin stapte ook op de maan'] },
      { t: 'mc', s: 'verwijs', q: '"Er is dus niets dat de <b>afdrukken</b> kan wegvegen." Welke afdrukken?', a: 'de voetafdrukken van de astronauten', w: ['de foto\'s', 'de afdrukken van de raket', 'de vingerafdrukken op de vlag'] },
      { t: 'mc', s: 'signaal', q: '"Op de maan waait <b>namelijk</b> geen wind." Wat vertelt het woord namelijk?', a: 'Er komt een uitleg of reden', w: ['Er komt een tegenstelling', 'Er komt een opsomming', 'Er komt een tijd'] },
      { t: 'mc', s: 'tussen', q: 'Waarom bleef Collins rond de maan vliegen, denk je?', a: 'Zodat het ruimteschip klaar was om de anderen weer op te halen', w: ['Omdat hij bang was', 'Omdat er geen plek was in de raket', 'Omdat hij de maan niet interessant vond'] },
      { t: 'tf', s: 'wnw', q: 'Er gingen drie astronauten mee, maar maar twee liepen op de maan.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Michael Collins liep als tweede op de maan.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Neil Armstrong was een beetje zenuwachtig.', a: 'Staat er niet' }
    ]
  },
  {
    id: 'mars', onderwerp: 'ruimte', emoji: '🔴', titel: 'Mars, de rode planeet',
    alineas: [
      ["Als je 's nachts goed kijkt, zie je soms een rood puntje aan de hemel.", 'Dat is Mars, de vierde planeet vanaf de zon.'],
      ['Mars is rood door roest.', 'Op de bodem ligt stof met veel ijzer erin, en dat ijzer is gaan roesten.', 'Daardoor ziet de hele planeet er roodbruin uit.'],
      ['Op Mars staat de hoogste vulkaan die we kennen: Olympus Mons.', 'Hij is ongeveer 22 kilometer hoog.', 'Dat is meer dan twee keer zo hoog als de Mount Everest, de hoogste berg op aarde.'],
      ['Wonen op Mars kan nog niet.', 'Het is er gemiddeld zo\'n 60 graden onder nul en je kunt er niet ademen.', 'Toch rijden er al robots rond, zoals de Marswagen Perseverance.', 'Hij boort in stenen en zoekt naar sporen van leven van heel lang geleden.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte?', a: 'Mars is een bijzondere, rode planeet die we met robots onderzoeken', w: ['Op Mars wonen al mensen', 'De Mount Everest is de hoogste berg', 'Roest is slecht voor fietsen'] },
      { t: 'zin', s: 'zoek', q: 'Tik op een zin die uitlegt waarom Mars rood is.', a: [2, 3, 4] },
      { t: 'mc', s: 'woord', q: '"Hij zoekt naar <b>sporen</b> van leven." Wat betekent sporen hier?', a: 'kleine aanwijzingen dat er iets geweest is', w: ['treinrails', 'voetstappen van mensen', 'stenen die glimmen'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Hij</b> boort in stenen." Wie of wat is "hij"?', a: 'de Marswagen Perseverance', w: ['Olympus Mons', 'de Mount Everest', 'een astronaut'] },
      { t: 'mc', s: 'signaal', q: '"<b>Toch</b> rijden er al robots rond." Wat voor signaalwoord is toch?', a: 'tegenstelling', w: ['oorzaak en gevolg', 'opsomming', 'tijd'] },
      { t: 'mc', s: 'tussen', q: 'Waarom sturen we wel robots naar Mars, maar nog geen mensen?', a: 'Omdat mensen er niet kunnen ademen en het er heel koud is', w: ['Omdat robots meer zin hebben', 'Omdat mensen niet van rood houden', 'Omdat Mars te dichtbij is'] },
      { t: 'tf', s: 'wnw', q: 'Olympus Mons is hoger dan de Mount Everest.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Er wonen al een paar mensen op Mars.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Een dag op Mars duurt ongeveer even lang als op aarde.', a: 'Staat er niet' }
    ]
  },

  /* ---------------- TECHNOLOGIE ---------------- */
  {
    id: 'robot', onderwerp: 'technologie', emoji: '🤖', titel: 'Wie verzon het woord robot?',
    alineas: [
      ['Robots zijn overal.', "Ze bouwen auto's in fabrieken, stofzuigen huizen en rijden zelfs rond op Mars."],
      ['Maar het woord robot is pas ongeveer honderd jaar oud.', 'Het werd bedacht voor een toneelstuk uit 1920 van de Tsjechische schrijver Karel Čapek.', 'In dat toneelstuk maakt een fabriek kunstmatige arbeiders die al het werk doen.', 'Aan het einde komen ze in opstand tegen de mensen.'],
      ['Het idee voor de naam kwam van Karels broer Josef.', 'Hij bedacht het woord robot, van het Tsjechische woord robota.', 'Dat betekent zwaar werk of dwangarbeid.'],
      ['Echte robots zijn heel anders dan die in het toneelstuk.', 'Ze kunnen alleen doen waarvoor ze geprogrammeerd zijn.', 'Een stofzuigrobot kan bijvoorbeeld prima stofzuigen, maar geen boterham smeren.', 'Ik vind dat eigenlijk best een geruststellende gedachte!']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst vooral over?', a: 'Waar het woord robot vandaan komt', w: ['Hoe je een stofzuigrobot bouwt', 'Wat er op Mars rondrijdt', 'Hoe een toneelstuk werkt'] },
      { t: 'zin', s: 'zoek', s2: 'mening', q: 'Tik op de zin waarin de schrijver zijn eigen <b>mening</b> geeft.', a: [12] },
      { t: 'mc', s: 'woord', q: '"kunstmatige arbeiders" – wat betekent <b>kunstmatig</b>?', a: 'door mensen gemaakt, niet echt geboren', w: ['heel kunstig en mooi', 'heel sterk', 'heel lui'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Hij</b> bedacht het woord robot." Wie is "hij"?', a: 'Josef, de broer van Karel', w: ['Karel Čapek', 'een robot', 'de fabriek'] },
      { t: 'mc', s: 'signaal', q: '"Een stofzuigrobot kan <b>bijvoorbeeld</b> prima stofzuigen." Wat vertelt bijvoorbeeld?', a: 'Er komt een voorbeeld', w: ['Er komt een tegenstelling', 'Er komt een tijd', 'Er komt een samenvatting'] },
      { t: 'mc', s: 'tussen', q: 'Waarom vindt de schrijver het geruststellend dat robots alleen doen waarvoor ze geprogrammeerd zijn?', a: 'Omdat ze dan niet, zoals in het toneelstuk, in opstand kunnen komen', w: ['Omdat hij graag zelf boterhammen smeert', 'Omdat robots dan goedkoper zijn', 'Omdat hij niet van stofzuigen houdt'] },
      { t: 'tf', s: 'wnw', q: 'Karel Čapek bedacht zelf het woord robot.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Het woord robot is ongeveer honderd jaar oud.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Het toneelstuk werd ook in Nederland gespeeld.', a: 'Staat er niet' }
    ]
  },
  {
    id: 'gps', onderwerp: 'technologie', emoji: '🛰️', titel: 'Hoe weet je telefoon waar je bent?',
    alineas: [
      ['Je opent een kaart op je telefoon en meteen zie je een blauw stipje: dat ben jij!', 'Maar hoe weet je telefoon dat eigenlijk?'],
      ['Hoog boven de aarde draaien tientallen GPS-satellieten rond.', 'Ze vliegen op ongeveer 20.000 kilometer hoogte.', 'Elke satelliet zendt steeds een signaal uit met de precieze tijd erin.'],
      ['Je telefoon vangt die signalen op.', 'Hij rekent uit hoe lang elk signaal onderweg was.', 'Zo weet hij hoe ver weg elke satelliet is.', 'Met de signalen van minstens vier satellieten kan hij precies uitrekenen waar jij staat.'],
      ['GPS werd eerst gemaakt voor het leger van Amerika.', "Nu gebruiken miljarden mensen het, bijvoorbeeld in auto's, vliegtuigen en sporthorloges.", 'Binnen in een gebouw werkt GPS vaak minder goed, omdat muren en daken de signalen tegenhouden.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte?', a: 'Je telefoon weet waar je bent dankzij signalen van satellieten', w: ['Satellieten zijn heel duur', 'Het leger van Amerika is groot', 'Kaarten op papier zijn ouderwets'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat hoeveel satellieten je telefoon minstens nodig heeft.', a: [8] },
      { t: 'volg', s: 'volg', q: 'Hoe werkt GPS? Zet in de goede volgorde.', items: ['Een satelliet zendt een signaal met de tijd', 'Je telefoon vangt het signaal op', 'Je telefoon rekent uit hoe lang het onderweg was', 'Je telefoon berekent waar je bent'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Ze</b> vliegen op ongeveer 20.000 kilometer hoogte." Wie of wat zijn "ze"?', a: 'de GPS-satellieten', w: ['vliegtuigen', 'de mensen met een telefoon', 'de soldaten'] },
      { t: 'mc', s: 'signaal', q: '"…<b>omdat</b> muren en daken de signalen tegenhouden." Wat voor signaalwoord is omdat?', a: 'oorzaak en gevolg', w: ['tegenstelling', 'opsomming', 'tijd'] },
      { t: 'mc', s: 'tussen', q: 'Waarom kan de navigatie in een lange tunnel de weg kwijtraken?', a: 'Omdat de signalen van de satellieten de tunnel niet in komen', w: ['Omdat het in een tunnel donker is', 'Omdat auto\'s in tunnels sneller rijden', 'Omdat satellieten niet van tunnels houden'] },
      { t: 'tf', s: 'wnw', q: 'GPS werd eerst gemaakt voor het leger.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Binnen in een gebouw werkt GPS altijd extra goed.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Een GPS-satelliet is zo groot als een bus.', a: 'Staat er niet' }
    ]
  },

  /* ---------------- LANDEN ---------------- */
  {
    id: 'japan', onderwerp: 'landen', emoji: '🗾', titel: 'Japan: treinen en vulkanen',
    alineas: [
      ['Japan is een land in Azië dat bestaat uit duizenden eilanden.', 'De hoofdstad is Tokio, een van de grootste steden ter wereld.'],
      ['Japan is beroemd om de Shinkansen, de kogeltrein.', 'Die rijdt soms meer dan 300 kilometer per uur.', 'De treinen zijn ook bijna altijd op tijd.', 'Als een trein een minuut te laat is, bieden de medewerkers soms zelfs hun excuses aan.'],
      ['In Japan staan veel vulkanen.', 'De bekendste is de berg Fuji, met 3776 meter de hoogste berg van het land.', 'Ook zijn er vaak aardbevingen.', 'Daarom worden gebouwen er zo gemaakt dat ze een beetje mee kunnen bewegen.'],
      ['Op veel Japanse scholen maken de leerlingen zelf hun klas schoon.', 'Een schoonmaker is er vaak niet, maar dat vinden de kinderen heel normaal.', 'Zo leren ze dat je samen zorgt voor je eigen spullen.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst vooral over?', a: 'Een paar bijzondere dingen over het land Japan', w: ['Hoe je een kogeltrein bestuurt', 'Hoe je je klas schoonmaakt', 'Waarom vulkanen uitbarsten'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat hoe hoog de berg Fuji is.', a: [7] },
      { t: 'mc', s: 'woord', q: '"…bieden de medewerkers hun <b>excuses</b> aan." Wat betekent dat?', a: 'Ze zeggen sorry', w: ['Ze geven een cadeautje', 'Ze worden boos', 'Ze rijden harder'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Die</b> rijdt soms meer dan 300 kilometer per uur." Wat is "die"?', a: 'de kogeltrein', w: ['de berg Fuji', 'Tokio', 'een auto'] },
      { t: 'mc', s: 'signaal', q: '"<b>Daarom</b> worden gebouwen zo gemaakt dat ze mee kunnen bewegen." Waarom dan?', a: 'Omdat er vaak aardbevingen zijn', w: ['Omdat Japanners van dansen houden', 'Omdat het er vaak waait', 'Omdat de treinen zo hard rijden'] },
      { t: 'mc', s: 'mening', q: 'Welke zin is een <b>mening</b>?', a: 'Japan is het leukste land om op vakantie te gaan.', w: ['Japan ligt in Azië.', 'De hoofdstad van Japan is Tokio.', 'De berg Fuji is 3776 meter hoog.'] },
      { t: 'tf', s: 'wnw', q: 'Op veel scholen in Japan maken de kinderen zelf hun klas schoon.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Tokio is de hoogste berg van Japan.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'In Japan eten de meeste mensen elke dag sushi.', a: 'Staat er niet' }
    ]
  },
  {
    id: 'ijsland', onderwerp: 'landen', emoji: '🌋', titel: 'IJsland: vuur en ijs',
    alineas: [
      ['IJsland is een eiland in het noorden van de Atlantische Oceaan.', 'Er wonen maar ongeveer 400.000 mensen, minder dan in de stad Amsterdam.'],
      ['IJsland wordt het land van vuur en ijs genoemd.', 'Er liggen grote gletsjers, maar er zijn ook meer dan dertig actieve vulkanen.', 'Diep onder de grond is het daardoor erg heet.'],
      ['Die warmte gebruiken de IJslanders slim.', 'Heet water uit de grond verwarmt hun huizen en zwembaden.', 'Op sommige plekken spuit het hete water zelfs met kracht omhoog.', 'Zo\'n spuitende bron heet een geiser, naar de bron Geysir in IJsland.'],
      ['Nog een gek feitje: in IJsland leven geen muggen.', 'Wetenschappers weten nog niet precies waarom.', 'In de winter kun je er wel iets prachtigs zien: het noorderlicht, groene lichtslierten aan de hemel.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte?', a: 'IJsland is een bijzonder land met vulkanen, ijs en warm water uit de grond', w: ['In IJsland leven geen muggen', 'Amsterdam is groter dan IJsland', 'Het noorderlicht is groen'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin die uitlegt waar het woord geiser vandaan komt.', a: [8] },
      { t: 'mc', s: 'woord', q: 'Wat zijn <b>gletsjers</b>?', a: 'dikke lagen ijs op het land die heel langzaam bewegen', w: ['hete bronnen', 'kleine vulkanen', 'grote golven in de zee'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Die warmte</b> gebruiken de IJslanders slim." Welke warmte?', a: 'de hitte diep onder de grond', w: ['de warmte van de zon', 'de warmte van de zwembaden', 'de warmte van het noorderlicht'] },
      { t: 'mc', s: 'signaal', q: '"Diep onder de grond is het <b>daardoor</b> erg heet." Waardoor?', a: 'door de vulkanen', w: ['door de gletsjers', 'door de muggen', 'door de zon'] },
      { t: 'mc', s: 'tussen', q: 'Waarom hoeven veel IJslanders hun huis niet met gas te verwarmen, denk je?', a: 'Omdat ze heet water uit de grond kunnen gebruiken', w: ['Omdat het er altijd warm is', 'Omdat ze in iglo\'s wonen', 'Omdat er geen mensen wonen'] },
      { t: 'tf', s: 'wnw', q: 'In IJsland wonen meer mensen dan in Amsterdam.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Wetenschappers weten nog niet precies waarom er geen muggen zijn.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'IJsland heeft een koning.', a: 'Staat er niet' }
    ]
  },

  /* ---------------- FEITJES ---------------- */
  {
    id: 'lichaam', onderwerp: 'feitjes', emoji: '🦴', titel: 'Rare feitjes over je lichaam',
    alineas: [
      ['Je lichaam zit vol verrassingen.', 'Hier zijn een paar feitjes die je misschien nog niet wist.'],
      ['Een baby wordt geboren met bijna 300 botten.', 'Een volwassene heeft er maar 206.', 'Dat komt doordat sommige botten tijdens het groeien aan elkaar vast gaan zitten.'],
      ['Het kleinste botje zit in je oor.', 'Het heet de stijgbeugel en is nog kleiner dan een rijstkorrel.', 'Het helpt je om geluid te horen.'],
      ["'s Ochtends ben je ongeveer een centimeter langer dan 's avonds.", 'Overdag drukt je gewicht de kussentjes tussen je ruggenwervels een beetje plat.', "Als je 's nachts ligt, zetten ze weer uit.", 'Meet jezelf maar eens als je net wakker bent!']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Waar gaat deze tekst over?', a: 'Verrassende weetjes over het menselijk lichaam', w: ['Hoe je groter wordt door veel te slapen', 'Waarom baby\'s huilen', 'Hoe je oren werken'] },
      { t: 'zin', s: 'zoek', q: "Tik op de zin die uitlegt waarom je 's avonds een beetje korter bent.", a: [9] },
      { t: 'mc', s: 'woord', q: 'Wat is een <b>volwassene</b>?', a: 'iemand die helemaal is uitgegroeid, een grote mens', w: ['een baby', 'een dokter', 'iemand die veel botten heeft'] },
      { t: 'mc', s: 'verwijs', q: '"Als je \'s nachts ligt, zetten <b>ze</b> weer uit." Wat zijn "ze"?', a: 'de kussentjes tussen je ruggenwervels', w: ['je botten in je oor', 'de baby\'s', 'je ogen'] },
      { t: 'mc', s: 'signaal', q: '"Dat komt <b>doordat</b> sommige botten aan elkaar vast gaan zitten." Wat voor signaalwoord is doordat?', a: 'oorzaak en gevolg', w: ['tegenstelling', 'tijd', 'opsomming'] },
      { t: 'mc', s: 'tussen', q: 'Wanneer kun je jezelf het beste meten als je zo lang mogelijk wilt zijn?', a: 'Meteen na het wakker worden', w: ['Na het avondeten', 'Na de gymles', 'Vlak voor het slapengaan'] },
      { t: 'tf', s: 'wnw', q: 'Een baby heeft meer botten dan een volwassene.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'De stijgbeugel zit in je voet.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: "Je haar groeit 's nachts sneller dan overdag.", a: 'Staat er niet' }
    ]
  },
  {
    id: 'octopus', onderwerp: 'feitjes', emoji: '🐙', titel: 'De octopus: slimmer dan je denkt',
    alineas: [
      ['De octopus is een van de vreemdste dieren in de zee.', 'Hij heeft acht armen, drie harten en blauw bloed.'],
      ['Elke arm zit vol zuignappen.', 'Daarmee kan een octopus niet alleen grijpen, maar ook proeven.', 'Een groot deel van zijn zenuwen zit zelfs in zijn armen, en niet in zijn hoofd.'],
      ['Octopussen zijn heel slim.', 'In proeven leerden ze potjes met een schroefdeksel openmaken om bij een krab te komen.', 'Sommige octopussen in aquariums ontsnapten zelfs uit hun bak.'],
      ['Als een octopus gevaar ziet, kan hij binnen een seconde van kleur veranderen.', 'Zo valt hij bijna niet op tussen de stenen.', 'Lukt dat niet, dan spuit hij een wolk inkt en zwemt hij snel weg.']
    ],
    vragen: [
      { t: 'mc', s: 'hoofd', q: 'Wat is de hoofdgedachte?', a: 'De octopus is een bijzonder en slim dier', w: ['Octopussen eten graag krab', 'In aquariums is het saai', 'Inkt is blauw'] },
      { t: 'zin', s: 'zoek', q: 'Tik op de zin waarin staat hoeveel harten een octopus heeft.', a: [1] },
      { t: 'mc', s: 'woord', q: '"In <b>proeven</b> leerden ze potjes openmaken." Wat betekent proeven hier?', a: 'onderzoeken of tests', w: ['eten keuren met je tong', 'koekjes bakken', 'zwemwedstrijden'] },
      { t: 'mc', s: 'verwijs', q: '"<b>Daarmee</b> kan een octopus ook proeven." Waarmee?', a: 'met de zuignappen', w: ['met zijn drie harten', 'met zijn blauwe bloed', 'met de inkt'] },
      { t: 'volg', s: 'volg', q: 'Wat doet een octopus bij gevaar? Zet in de goede volgorde.', items: ['Hij ziet gevaar', 'Hij verandert van kleur', 'Als dat niet lukt, spuit hij inkt', 'Hij zwemt snel weg'] },
      { t: 'mc', s: 'tussen', q: 'Waarom verandert een octopus van kleur als hij gevaar ziet?', a: 'Zodat vijanden hem niet zien', w: ['Omdat hij boos wordt', 'Omdat hij het koud krijgt', 'Om andere octopussen te roepen'] },
      { t: 'tf', s: 'wnw', q: 'Een octopus heeft blauw bloed.', a: 'Waar' },
      { t: 'tf', s: 'wnw', q: 'Octopussen kunnen geen potjes openmaken.', a: 'Niet waar' },
      { t: 'tf', s: 'wnw', q: 'Een octopus kan wel vijftig jaar oud worden.', a: 'Staat er niet' }
    ]
  }
];

/* ---------------- TRAININGSKAMP (mini-spellen) ---------------- */
const SIGNAALWOORDEN = {
  bakken: ['⏰ Tijd', '⚖️ Tegenstelling', '🔗 Oorzaak & gevolg', '➕ Opsomming'],
  woorden: [
    ['eerst', 0], ['daarna', 0], ['toen', 0], ['vervolgens', 0], ['ten slotte', 0], ['later', 0],
    ['maar', 1], ['toch', 1], ['echter', 1], ['hoewel', 1], ['ondanks', 1],
    ['omdat', 2], ['doordat', 2], ['daardoor', 2], ['dus', 2], ['want', 2], ['daarom', 2],
    ['ook', 3], ['bovendien', 3], ['daarnaast', 3], ['verder', 3], ['tevens', 3]
  ]
};

const FEIT_MENING = [
  ['De maan draait om de aarde.', 0], ['Japan ligt in Azië.', 0], ['Een octopus heeft acht armen.', 0],
  ['De eerste maanlanding was in 1969.', 0], ['Mars is de vierde planeet vanaf de zon.', 0], ['Een computer werkt op stroom.', 0],
  ['In IJsland zijn vulkanen.', 0], ['De Romeinen bouwden forten langs de Rijn.', 0], ['Tokio is de hoofdstad van Japan.', 0],
  ['GPS gebruikt satellieten.', 0], ['De piramides staan in Egypte.', 0], ['Een volwassene heeft 206 botten.', 0],
  ['Minecraft is het leukste spel dat er bestaat.', 1], ['Geschiedenis is het interessantste vak.', 1], ['Octopussen zijn eng.', 1],
  ['Robots zijn cooler dan dinosaurussen.', 1], ['Japan is het mooiste land van de wereld.', 1], ['Een tablet is beter dan een laptop.', 1],
  ['Astronaut is het gaafste beroep.', 1], ['De Romeinen hadden het lekkerste eten.', 1], ['IJsland is veel te koud om te wonen.', 1], ['Programmeren is makkelijk.', 1]
];

const WOORD_DETECTIVE = [
  { zin: 'De astronaut droeg een ruimtepak, omdat er op de maan geen <b>zuurstof</b> is.', a: 'het gas dat je nodig hebt om te ademen', w: ['water om te drinken', 'een soort maansteen', 'brandstof voor de raket'] },
  { zin: 'De archeoloog groef voorzichtig een <b>eeuwenoude</b> munt op.', a: 'honderden jaren oud', w: ['heel glanzend', 'van goud gemaakt', 'een beetje vies'] },
  { zin: 'De computer was zo <b>traag</b> dat Sam heel lang moest wachten tot zijn spel geladen was.', a: 'langzaam', w: ['nieuw', 'luid', 'kapot'] },
  { zin: 'Het land heeft een <b>mild</b> klimaat: het is er nooit heel koud en nooit heel heet.', a: 'zacht, niet extreem', w: ['heel nat', 'heel streng', 'heel droog'] },
  { zin: 'De <b>ontdekkingsreiziger</b> bereikte na maanden varen eindelijk een onbekende kust.', a: 'iemand die reist om nieuwe plekken te vinden', w: ['iemand die vis vangt', 'iemand die schepen bouwt', 'iemand die kaarten verkoopt'] },
  { zin: 'Deze koptelefoon is <b>draadloos</b>: er zit geen snoer aan.', a: 'zonder snoer', w: ['heel zacht', 'waterdicht', 'heel duur'] },
  { zin: 'Het computervirus verspreidde zich <b>razendsnel</b> over alle laptops van de school.', a: 'heel erg snel', w: ['heel boos', 'heel langzaam', 'per ongeluk'] },
  { zin: 'De ridder droeg een <b>harnas</b> om zich te beschermen tegen zwaarden.', a: 'een pak van metaal', w: ['een grote mantel', 'een paard', 'een schild van hout'] },
  { zin: 'Het ruimtestation draait in een <b>baan</b> om de aarde.', a: 'de route waarlangs het rond de aarde draait', w: ['een plek waar je werkt', 'een strook op de atletiekbaan', 'een weg van asfalt'] },
  { zin: 'In de woestijn is water <b>schaars</b>: er is bijna niets van.', a: 'er is heel weinig van', w: ['het is heel vies', 'het is heel koud', 'het is overal'] },
  { zin: 'De wetenschapper deed een <b>experiment</b> om te testen of haar idee klopte.', a: 'een proef of test', w: ['een feestje', 'een uitvinding die al klaar is', 'een tekening'] },
  { zin: 'De piloot moest een <b>noodlanding</b> maken, omdat een motor kapotging.', a: 'een landing die snel moet omdat er iets mis is', w: ['een landing op het water', 'een heel zachte landing', 'een landing met veel passagiers'] }
];

const VERWIJS_JACHT = [
  { zin: 'Lisa kreeg een nieuwe laptop. <b>Hij</b> was zilver en heel licht.', a: 'de laptop', w: ['Lisa', 'de winkel', 'de vader van Lisa'] },
  { zin: 'De astronauten stapten in de raket. Even later vertrokken <b>ze</b> naar het ruimtestation.', a: 'de astronauten', w: ['de sterren', 'de mensen op aarde', 'de raketten'] },
  { zin: 'Opa vertelde over de Tweede Wereldoorlog. <b>Dat</b> vond ik heel spannend om te horen.', a: 'wat opa over de oorlog vertelde', w: ['opa zelf', 'de Tweede Wereldoorlog zelf', 'het luisteren naar muziek'] },
  { zin: 'In Egypte staan piramides. <b>Daar</b> is het bijna altijd warm.', a: 'in Egypte', w: ['in de piramides', 'in Nederland', 'op de maan'] },
  { zin: 'Tom en Ayoub bouwden een robot. <b>Hun</b> robot kon zelfs dansen.', a: 'van Tom en Ayoub', w: ['van de juf', 'van de robot', 'van de klas'] },
  { zin: 'De vulkaan barstte uit. <b>Hierdoor</b> moesten de mensen hun dorp verlaten.', a: 'doordat de vulkaan uitbarstte', w: ['doordat het regende', 'doordat het dorp te klein was', 'doordat er een feest was'] },
  { zin: 'Japan heeft veel snelle treinen. <b>Deze</b> rijden soms meer dan 300 kilometer per uur.', a: 'de snelle treinen', w: ['de Japanners', 'de auto\'s', 'de vulkanen'] },
  { zin: 'Emma typte een lange code. Toen <b>zij</b> op enter drukte, ging de robot bewegen.', a: 'Emma', w: ['de robot', 'de code', 'de juf'] },
  { zin: 'Columbus zeilde in 1492 over de oceaan. <b>Hij</b> dacht dat hij in Indië was aangekomen.', a: 'Columbus', w: ['de oceaan', 'het schip', 'de koning'] },
  { zin: 'De satelliet stuurt een signaal naar de aarde. <b>Dit</b> gebeurt elke seconde opnieuw.', a: 'het sturen van een signaal', w: ['de aarde die draait', 'de satelliet die valt', 'het regenen'] }
];

const SPELLEN = [
  { id: 'signaal', naam: 'Signaalwoorden-sorteer', emoji: '🚦', uitleg: 'Sorteer de signaalwoorden in de goede bak.' },
  { id: 'mening', naam: 'Feit of mening?', emoji: '🗣️', uitleg: 'Kun je het controleren, of vindt iemand het?' },
  { id: 'woord', naam: 'Woord-detective', emoji: '🕵️', uitleg: 'Ontdek wat een moeilijk woord betekent.' },
  { id: 'verwijs', naam: 'Verwijswoord-jacht', emoji: '👉', uitleg: 'Waar wijst hij, zij, die of dit naar?' }
];
