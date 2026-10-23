/* =========================================================
   Woorden blok 2 – woordenlijst (Taal, blok 2, les 1 t/m 9)

   Elk woord: week, soort, woord, betekenis, voorbeeldzin.
   In de zin staat het woord tussen [haken]. Zo kan het spel
   het woord in de zin vet maken of er een gat van maken.
   ========================================================= */

const WEKEN = [
  { id: 1, naam: 'Les 1-2-3' },
  { id: 2, naam: 'Les 4-5-6' },
  { id: 3, naam: 'Les 7-8-9' }
];

const W = (week, soort, woord, betekenis, zin) => ({ week, soort, woord, betekenis, zin });

const WOORDEN = [
  // ---------- Les 1-2-3 ----------
  W(1, 'zelfstandig naamwoord', 'het detail', 'een klein deel van iets groters', 'Een leuk [detail] van het schilderij is dat hondje onder de tafel.'),
  W(1, 'zelfstandig naamwoord', 'de kern', 'het belangrijkste, dat waar het om gaat', 'De [kern] van het verhaal is dat Fabian erachter komt dat hij veel vrienden heeft.'),
  W(1, 'zelfstandig naamwoord', 'de poging', 'de keer dat je iets probeert', 'De poes doet een [poging] om op de tafel te springen, maar die mislukt.'),
  W(1, 'zelfstandig naamwoord', 'het voertuig', 'iets waarmee je kunt rijden, zoals een auto of een fiets', 'Fietsen, bussen en scooters zijn [voertuigen].'),
  W(1, 'zelfstandig naamwoord', 'het advies', 'een tip over wat je zou kunnen doen', 'Een goed [advies]: eet elke dag groente en fruit.'),
  W(1, 'zelfstandig naamwoord', 'het bevel', 'een opdracht die je echt moet doen', 'De politie geeft het [bevel] weg te gaan bij de brand.'),
  W(1, 'zelfstandig naamwoord', 'de plicht', 'wat je hoort te doen', 'Het is je [plicht] om te stoppen voor rood licht.'),
  W(1, 'zelfstandig naamwoord', 'de bijfiguur', 'het personage in een verhaal dat minder belangrijk is', 'In het boek over Thomas is zijn zusje de [bijfiguur].'),
  W(1, 'zelfstandig naamwoord', 'de croissant', 'een broodje van bladerdeeg in de vorm van een halve maan', 'Veel mensen vinden een [croissant] bij het ontbijt lekker.'),
  W(1, 'zelfstandig naamwoord', 'de schemer', 'de tijd van de dag dat het halfdonker is, net voordat het dag of avond wordt', 'Ik vind wandelen in de [schemer] altijd wel spannend!'),
  W(1, 'werkwoord', 'bestuderen', 'heel goed lezen of bekijken', 'Ze [bestuderen] de foto een tijdje en ontdekken samen steeds meer.'),
  W(1, 'werkwoord', 'schrappen', 'doorstrepen, niet meer gebruiken', 'Van die tien zinnen kun je er zeker drie [schrappen].'),
  W(1, 'werkwoord', 'vermijden', 'zorgen dat je er niets mee te maken krijgt, dat iets niet gebeurt', 'We [vermijden] die drukke weg; we nemen liever de rustige weg naar school.'),
  W(1, 'werkwoord', 'beperken', 'zorgen dat iets niet te groot of te veel wordt', 'Er kunnen maar tien kinderen meedoen, we moeten de groep [beperken].'),
  W(1, 'werkwoord', 'krimpen', 'kleiner worden', 'Als je kleren te heet wast, [krimpen] ze.'),
  W(1, 'werkwoord', 'uitbreiden', 'groter maken', 'Ze gaan de speeltuin in onze buurt flink [uitbreiden].'),
  W(1, 'werkwoord', 'kokkerellen', 'met plezier eten klaarmaken', 'Als mijn oom bij ons komt [kokkerellen], eten we altijd erg lekker!'),
  W(1, 'bijvoeglijk naamwoord', 'overzichtelijk', 'zo duidelijk dat je gemakkelijk en snel kunt zien wat er is', 'Op die [overzichtelijke] tekening zien we meteen hoe we de toren moeten bouwen.'),
  W(1, 'bijvoeglijk naamwoord', 'passief', 'als je niets doet', 'De kinderen zitten in een [passieve] houding te wachten tot ze mee mogen doen.'),
  W(1, 'uitdrukking', 'tijd in beslag nemen', 'tijd kosten', 'Leren pianospelen [neemt] veel [tijd in beslag].'),

  // ---------- Les 4-5-6 ----------
  W(2, 'zelfstandig naamwoord', 'de bediening', 'de mensen die in een restaurant het eten en drinken brengen', 'De [bediening] is heel goed: we hoeven niet lang op ons eten te wachten.'),
  W(2, 'zelfstandig naamwoord', 'de boodschap', 'wat je ermee duidelijk wilt maken', 'De [boodschap] van het verhaal is: zorg goed voor elkaar.'),
  W(2, 'zelfstandig naamwoord', 'de buffel', 'een soort koe met grote hoorns en lange haren', 'De boer heeft [buffels] in plaats van koeien.'),
  W(2, 'zelfstandig naamwoord', 'de interesse', 'als je ergens veel over wilt weten', 'De [interesse] van Saïda voor tijgers is heel groot, ze leest er alles over.'),
  W(2, 'zelfstandig naamwoord', 'het niveau', 'hoe goed je iets weet of kunt', 'Mila turnt op hoog [niveau], ze is heel goed.'),
  W(2, 'zelfstandig naamwoord', 'het portret', 'een tekening, schilderij of foto van iemand van dichtbij', 'Er komt een fotograaf op school om van iedereen een [portret] te maken.'),
  W(2, 'zelfstandig naamwoord', 'de ruimtevaart', 'het reizen van de mens buiten de aarde', 'Door de [ruimtevaart] kunnen mensen naar de maan.'),
  W(2, 'zelfstandig naamwoord', 'de sorbet', 'een ijsje in een glas, met vruchten en siroop en soms ook slagroom erbij', 'In de zomer op een terras een [sorbet] eten is heerlijk!'),
  W(2, 'zelfstandig naamwoord', 'het element', 'een belangrijk deel van iets', 'Het optreden heeft meerdere [elementen]: zang, dans en toneel.'),
  W(2, 'zelfstandig naamwoord', 'een happy end', 'de goede afloop van een verhaal', 'Met de eerste prijs voor Youri heeft het verhaal een [happy end].'),
  W(2, 'zelfstandig naamwoord', 'de realiteit', 'dat wat echt gebeurt', 'In verhalen gebeuren soms dingen die in de [realiteit] niet kunnen.'),
  W(2, 'zelfstandig naamwoord', 'de verbeelding', 'de fantasie, dingen die je bedenkt maar die niet echt gebeuren', 'In mijn [verbeelding] ben ik een beroemde filmster.'),
  W(2, 'zelfstandig naamwoord', 'het roofdier', 'een dier dat andere dieren doodmaakt en opeet', 'Tijgers zijn [roofdieren]. Ze eten alleen maar vlees.'),
  W(2, 'werkwoord', 'bevallen', 'zijn zoals iemand graag wil', 'Deze jas is erg zacht en lekker warm. Ik weet zeker dat hij u zal [bevallen].'),
  W(2, 'werkwoord', 'opensperren', 'wijd opendoen', 'De jonge vogeltjes [sperren] hun bekjes wijd [open] als hun moeder hen voedt.'),
  W(2, 'bijvoeglijk naamwoord', 'flut-', 'waardeloos', 'Dit is een [flut]speeltuin. Alle toestellen zijn kapot.'),
  W(2, 'uitdrukking', 'afstemmen op', 'aanpassen aan iets of iemand', 'Als je geen vlees eet, [stemmen] we de maaltijd daarop [af].'),
  W(2, 'uitdrukking', 'ergens niet uitkomen', 'een probleem niet kunnen oplossen', 'Ik wil tekenen maar Floor wil buitenspelen. We [komen] er [niet uit] wat we gaan doen.'),
  W(2, 'uitdrukking', 'iets hebben met', 'iets leuk vinden', 'Dirk [heeft iets met] dinosaurussen. Zijn kamer hangt vol met posters van die dieren.'),
  W(2, 'uitdrukking', 'in de huid kruipen van', 'bedenken hoe iemand anders denkt of voelt', 'Voor die rol [kruip] ik [in de huid van] een fotomodel.'),

  // ---------- Les 7-8-9 ----------
  W(3, 'zelfstandig naamwoord', 'de centrale', 'de plaats waar alles bij elkaar komt', 'Alle telefoontjes komen binnen bij de [centrale].'),
  W(3, 'zelfstandig naamwoord', 'het geheugen', 'het deel van je hersenen waarmee je dingen onthoudt', 'Als je nog veel van vroeger weet, heb je een goed [geheugen].'),
  W(3, 'werkwoord', 'afleveren', 'bezorgen', 'Wilt u het pakje [afleveren] op nummer 35?'),
  W(3, 'werkwoord', 'spreiden', 'uit elkaar doen', 'Mijn grootouders [spreiden] hun armen als ze me aan zien komen. Ze willen me een knuffel geven.'),
  W(3, 'bijvoeglijk naamwoord', 'diverse', 'verschillende', 'In de etalage kun je [diverse] jassen bekijken.'),
  W(3, 'bijvoeglijk naamwoord', 'fijn', 'licht en zacht', 'Dit gordijn is gemaakt van een heel [fijne] stof.'),
  W(3, 'bijvoeglijk naamwoord', 'stokoud', 'heel erg oud', 'Die [stokoude] man is al honderd jaar!'),
  W(3, 'uitdrukking', 'het is een komen en gaan', 'het is druk met mensen die in- en uitlopen', 'In de hal is het [een komen en gaan] van mensen.'),
  W(3, 'uitdrukking', 'iets niet aankunnen', 'als iets te veel of te moeilijk is om te doen', 'In de zomer [kan] de ijssalon de drukte [niet aan]. Het ijs is uitverkocht.'),
  W(3, 'uitdrukking', 'in alle soorten en maten', 'heel veel verschillende', 'In de winkel hebben ze T-shirts [in alle soorten en maten].'),
  W(3, 'uitdrukking', 'je ergens bij neerleggen', 'het goed vinden dat het zo is, maar er niet blij mee zijn', 'Ryan [legt zich erbij neer] dat hij niet meer zakgeld krijgt.'),
  W(3, 'uitdrukking', 'op goed geluk', 'zomaar, zonder plan', 'We gaan [op goed geluk] naar de bioscoop. We zien wel of er een leuke film draait.'),
  W(3, 'uitdrukking', 'wakker schieten', 'ineens wakker worden', 'Midden in de enge droom [schiet] ik gelukkig [wakker].'),
  W(3, 'overig', 'tenzij', 'behalve als', 'Ik ga mee buitenspelen, [tenzij] het erg warm is.'),
  W(3, 'overig', 'tevergeefs', 'zonder resultaat, voor niks', 'De postbode belt [tevergeefs] aan. Er is niemand thuis.')
];
WOORDEN.forEach((w, i) => { w.id = i; });

/* Woorden die zo op elkaar lijken dat ze nooit samen als keuze verschijnen */
const LIJKEN_OP = [
  ['diverse', 'in alle soorten en maten'],
  ['het detail', 'het element'],
  ['het bevel', 'de plicht'],
  ['krimpen', 'beperken'],
  ['de kern', 'de boodschap'],
  ['de verbeelding', 'de realiteit']
];

/* Woordclusters: een kopwoord met de woorden die erbij horen.
   Clusters met hetzelfde 'paar' staan in het boek tegenover elkaar. */
const CLUSTERS = [
  { week: 1, paar: 'groot', kop: 'uitbreiden', leden: ['groeien', 'meer'] },
  { week: 1, paar: 'groot', kop: 'beperken', leden: ['krimpen', 'minder'] },
  { week: 1, paar: 'regel', kop: 'het advies', leden: ['de tip', 'de goede raad'] },
  { week: 1, paar: 'regel', kop: 'de wet', leden: ['de plicht', 'het bevel'] },
  { week: 2, paar: 'echt', kop: 'de verbeelding', leden: ['de fantasie', 'dat wat je bedenkt terwijl het niet gebeurt'] },
  { week: 2, paar: 'echt', kop: 'de realiteit', leden: ['de werkelijkheid', 'dat wat echt gebeurt'] },
  { week: 2, paar: 'prent', kop: 'een prentenboekverhaal', leden: ['terugkerende elementen', 'herkenbaar', 'een happy end'] }
];
