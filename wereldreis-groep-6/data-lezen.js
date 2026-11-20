/* =========================================================
   Wereldreis groep 6 – LEZEN
   Teksten in de stijl van Leerling in beeld (Cito) / IEP.

   Een tekst = alinea's (strings). De app knipt ze in regels met
   regelnummers. In een vraag kun je {regel:stukje tekst} schrijven;
   dat wordt automatisch "regel 5" of "regel 5 - 6".

   Vraag:  { t:'mc', vt:<vraagtype>, q, a:<goed>, w:[fout,…], u:<uitleg> }
           { t:'open', vt:'open', q, model:<voorbeeldantwoord> }
   ========================================================= */

const VRAAGTYPES = {
  soort: {
    naam: 'Soort tekst', emoji: '📰',
    herken: '"Wat voor soort tekst is dit?"',
    aanpak: [
      'Kijk naar de vorm: is er een kop, een datum, "van onze verslaggever"? → krantenbericht.',
      'Gebeurt er iets met personen, is het verzonnen? → verhaal.',
      'Leer je feiten over een onderwerp? → informatieve tekst.',
      'Staan er stappen of een lijstje "wat heb je nodig"? → instructie.',
      'Wil iemand dat je iets koopt of ergens heen gaat? → reclame.',
      'Begint het met "Hoi" of "Beste" en eindigt het met een groet? → brief of e-mail.',
      'Staan er vragen en antwoorden tussen twee personen? → interview.'
    ]
  },
  doel: {
    naam: 'Doel van de schrijver', emoji: '🎯',
    herken: '"Waarom heeft de schrijver deze tekst geschreven?" of "Wat wil de schrijver?"',
    aanpak: [
      'Informeren = je iets vertellen of uitleggen (informatieve tekst, krant).',
      'Overtuigen = je iets laten doen of vinden (reclame, mening).',
      'Amuseren / vermaken = je laten genieten van een verhaal.',
      'Instrueren = je uitleggen hoe je iets moet doen (stappenplan, recept).'
    ]
  },
  woord: {
    naam: 'Woordbetekenis', emoji: '🧩',
    herken: '"Wat betekent … ?" of "Wat is een ander woord voor … ?"',
    aanpak: [
      'Zoek het woord op in de tekst (kijk naar de regel die genoemd wordt).',
      'Lees de hele zin, en ook de zin ervoor en erna.',
      'Vul elk antwoord in op de plek van het woord. Welk antwoord past het best in de zin?'
    ]
  },
  uitdrukking: {
    naam: 'Uitdrukking / wat wordt bedoeld', emoji: '💬',
    herken: '"Wat wordt bedoeld met …?" of "Wat betekent … in deze zin?"',
    aanpak: [
      'Een uitdrukking betekent bijna nooit precies wat er staat (figuurlijk).',
      'Pas op voor het antwoord dat het letterlijk neemt: dat is meestal fout!',
      'Bedenk: wat zou de persoon in deze situatie bedoelen?'
    ]
  },
  zoek: {
    naam: 'Opzoeken in de tekst', emoji: '🔎',
    herken: '"Wie is …?", "Waar …?", "Wanneer …?", "Hoeveel …?"',
    aanpak: [
      'Zoek een belangrijk woord (naam, getal) uit de vraag op in de tekst.',
      'Lees die zin heel goed.',
      'Het antwoord staat letterlijk in de tekst, maar soms met andere woorden.'
    ]
  },
  samenvatten: {
    naam: 'Samenvatten / titel', emoji: '🧺',
    herken: '"Welke zin vat de tekst het beste samen?" of "Welke titel past het best?"',
    aanpak: [
      'Een samenvatting gaat over de HELE tekst, niet over één stukje.',
      'Fout zijn meestal: een detail (te klein) of iets wat niet in de tekst staat.',
      'Vraag jezelf: waar gaat het van begin tot eind over?'
    ]
  },
  waarom: {
    naam: 'Waarom / oorzaak en gevolg', emoji: '❓',
    herken: '"Waarom …?" of "Wat is het gevolg van …?"',
    aanpak: [
      'Zoek in de tekst naar woorden als omdat, doordat, want, daardoor, dus.',
      'Lees de zin voor en na het stukje waar de vraag over gaat.',
      'Soms staat het niet letterlijk: wat kun je logisch afleiden?'
    ]
  },
  gevoel: {
    naam: 'Personen en gevoelens', emoji: '🙂',
    herken: '"Hoe voelt … zich?", "Wat voor iemand is …?" of "Hoe verandert …?"',
    aanpak: [
      'Let op wat iemand doet, zegt en hoe hij kijkt.',
      'Woorden als zuchten, glimlachen, trillen of roepen vertellen veel over gevoel.',
      'Gevoelens kunnen veranderen in een verhaal: kijk naar begin, midden en eind.'
    ]
  },
  verwijs: {
    naam: 'Verwijswoorden', emoji: '👉',
    herken: '"Wat wordt bedoeld met \'hij / ze / dit / daar\' in regel …?"',
    aanpak: [
      'Een verwijswoord wijst (meestal) terug naar iets wat al eerder genoemd is.',
      'Lees de zin ervoor.',
      'Vul het antwoord in op de plek van het verwijswoord: klopt de zin dan nog?'
    ]
  },
  signaal: {
    naam: 'Signaalwoorden', emoji: '🚦',
    herken: '"Wat geeft het woord \'maar / daardoor / ten eerste\' aan?"',
    aanpak: [
      'Tegenstelling: maar, toch, echter, hoewel.',
      'Oorzaak / gevolg: omdat, doordat, want, daardoor, dus.',
      'Tijd / volgorde: eerst, daarna, toen, ten slotte.',
      'Opsomming: ook, bovendien, ten eerste, verder.',
      'Voorbeeld: bijvoorbeeld, zoals.'
    ]
  },
  feit: {
    naam: 'Feit of mening', emoji: '🗣️',
    herken: '"Welke zin is een mening?" of "Welke zin is een feit?"',
    aanpak: [
      'Een feit kun je controleren (meten, tellen, opzoeken).',
      'Een mening is wat iemand vindt: mooi, leuk, gaaf, beste, eng, saai, lekker…',
      'Ook "ik vind", "volgens mij" en "zeker weten de leukste" zijn mening-woorden.'
    ]
  },
  bron: {
    naam: 'Waar vind je deze tekst?', emoji: '📚',
    herken: '"Waar zou je deze tekst kunnen vinden?"',
    aanpak: [
      'Krant: nieuws van gisteren of vandaag.',
      'Informatieboek / encyclopedie: uitleg en feiten.',
      'Folder / reclame: prijzen, openingstijden, "kom snel!".',
      'Verhalenboek: verzonnen verhaal met personen.'
    ]
  },
  opzoeken: {
    naam: 'Informatie opzoeken', emoji: '🗂️',
    herken: 'Een website, woordenboek, inhoudsopgave, register, tabel of dienstregeling.',
    aanpak: [
      'Lees eerst goed WAT je moet vinden.',
      'Kijk dan pas naar het plaatje of de tabel.',
      'Woordenboek: alfabetisch. Let op de 2e en 3e letter!',
      'Inhoudsopgave = voorin, hoofdstukken. Register = achterin, trefwoorden op alfabet.'
    ]
  },
  open: {
    naam: 'Open vraag', emoji: '✍️',
    herken: 'Er zijn geen antwoorden A t/m D; je schrijft zelf het antwoord.',
    aanpak: [
      'Zoek het stukje in de tekst op.',
      'Antwoord in een hele zin en gebruik je eigen woorden.',
      'Wordt er naar twee dingen gevraagd? Noem er dan ook echt twee!'
    ]
  }
};

const TEKSTEN = [
  /* ============ 1. KRANTENBERICHT – geschiedenis ============ */
  {
    id: 'zwaard', thema: 'Geschiedenis', emoji: '⚔️', soort: 'krantenbericht',
    titel: 'Zwaard van 700 jaar oud gevonden in de Maas',
    alineas: [
      'Van onze verslaggever – Bij werkzaamheden aan de oever van de Maas bij Roermond heeft een kraanmachinist gisteren een bijzondere vondst gedaan. In de modder lag een ijzeren zwaard dat ongeveer 700 jaar oud is.',
      '"Eerst dacht ik dat het een oude ijzeren paal was," vertelt machinist Erik Smeets. "Maar toen ik het handvat zag, wist ik meteen dat het iets bijzonders was."',
      'Archeoloog Mira Jansen is erg enthousiast. "Zwaarden uit de middeleeuwen vinden we niet vaak. IJzer roest namelijk snel weg. Omdat dit zwaard diep in de natte klei lag, kwam er bijna geen zuurstof bij. Daardoor is het zo goed bewaard gebleven."',
      'Het zwaard is bijna een meter lang. Waarschijnlijk was het van een ridder of een rijke soldaat. Hoe het in de rivier terechtkwam, weet niemand. "Misschien is het tijdens een gevecht in het water gevallen," zegt Jansen. "Maar sommige mensen gooiden vroeger ook expres kostbare spullen in de rivier, als geschenk."',
      'Het zwaard wordt de komende maanden schoongemaakt. Volgend jaar is het te zien in het museum van Roermond.'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een krantenbericht', w: ['een verhaal', 'een instructie', 'een reclametekst'], u: '"Van onze verslaggever" en "gisteren" laten zien dat het nieuws is uit de krant.' },
      { t: 'mc', vt: 'zoek', q: 'Wie is Mira Jansen?', a: 'een archeoloog', w: ['de kraanmachinist', 'de verslaggever', 'de baas van het museum'], u: 'In {regel:Archeoloog Mira Jansen} staat: "Archeoloog Mira Jansen".' },
      { t: 'mc', vt: 'woord', q: 'Lees {regel:erg enthousiast}. Wat betekent "enthousiast"?', a: 'heel blij en vol interesse', w: ['een beetje boos', 'heel erg moe', 'bang en onzeker'], u: 'Ze vertelt vol plezier over de vondst. Enthousiast = blij en vol interesse.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom is het zwaard zo goed bewaard gebleven?', a: 'Het lag in natte klei, waar bijna geen zuurstof bij kwam.', w: ['Het was gemaakt van goud in plaats van ijzer.', 'De ridder had het goed schoongemaakt.', 'Het lag in een kist in de rivier.'], u: 'In {regel:Daardoor is het zo goed} staat: geen zuurstof → daardoor goed bewaard.' },
      { t: 'mc', vt: 'signaal', q: 'Lees {regel:Daardoor is het zo goed}. Wat geeft het woord "daardoor" aan?', a: 'een gevolg', w: ['een tegenstelling', 'een opsomming', 'een voorbeeld'], u: 'Daardoor = signaalwoord voor oorzaak en gevolg. Weinig zuurstof (oorzaak) → goed bewaard (gevolg).' },
      { t: 'mc', vt: 'samenvatten', q: 'Welke zin vat deze tekst het beste samen?', a: 'In de Maas is een zwaard van 700 jaar oud gevonden dat straks in een museum komt.', w: ['Erik Smeets dacht eerst dat hij een ijzeren paal had gevonden.', 'IJzer roest snel weg als er zuurstof bij komt.', 'Vroeger gooiden mensen spullen in de rivier als geschenk.'], u: 'De andere zinnen zijn details. De samenvatting vertelt de hele tekst in het kort.' },
      { t: 'mc', vt: 'zoek', q: 'Wat weet NIEMAND zeker over het zwaard?', a: 'hoe het in de rivier terechtkwam', w: ['hoe oud het is', 'hoe lang het is', 'waar het te zien komt'], u: 'Er staat: "Hoe het in de rivier terechtkwam, weet niemand."' },
      { t: 'mc', vt: 'bron', q: 'Waar zou je deze tekst kunnen vinden?', a: 'in de krant', w: ['in een kookboek', 'in een sprookjesboek', 'in een woordenboek'], u: 'Het is nieuws: een krantenbericht.' },
      { t: 'open', vt: 'open', q: 'Lees {regel:Misschien is het tijdens}. Noem twee manieren waarop het zwaard in de rivier terecht kan zijn gekomen.', model: '1. Het is tijdens een gevecht in het water gevallen. 2. Iemand heeft het expres in de rivier gegooid als geschenk.' }
    ]
  },

  /* ============ 2. INFORMATIEF – ruimte ============ */
  {
    id: 'iss', thema: 'Ruimte', emoji: '🛰️', soort: 'informatieve tekst',
    titel: 'Het ISS: een huis in de ruimte',
    alineas: [
      'Kijk op een heldere avond eens goed naar de lucht. Soms zie je een fel lichtje dat snel voorbijschuift, zonder te knipperen. Grote kans dat dit het ISS is: het Internationale Ruimtestation.',
      'Het ISS cirkelt op ongeveer 400 kilometer hoogte om de aarde. Het gaat ontzettend snel: in anderhalf uur is het al een keer rond de aarde. Daardoor zien de astronauten aan boord elke dag zestien keer de zon opkomen.',
      'Het ruimtestation is niet in één keer gebouwd. Raketten brachten de onderdelen een voor een naar boven. Daar werden ze als een soort bouwpakket aan elkaar gekoppeld. Landen als Amerika, Rusland, Japan, Canada en een groep Europese landen werkten hierbij samen.',
      'Aan boord wonen meestal zes of zeven astronauten. Zij doen proeven die op aarde niet kunnen. Ze onderzoeken bijvoorbeeld hoe planten groeien zonder zwaartekracht. Ook kijken ze wat een lang verblijf in de ruimte met je lichaam doet. Spieren en botten worden namelijk zwakker als je steeds zweeft. Daarom moeten de astronauten elke dag ongeveer twee uur sporten.',
      'Het ISS wordt over een aantal jaar gesloten. Maar de ruimtevaart stopt niet: er worden alweer nieuwe ruimtestations ontworpen.'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een informatieve tekst', w: ['een verhaal', 'een krantenbericht', 'een interview'], u: 'Je leert feiten over het ISS. Er is geen verhaal met personen en geen nieuws van gisteren.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe lang doet het ISS erover om één keer rond de aarde te gaan?', a: 'anderhalf uur', w: ['een hele dag', 'zestien uur', 'twee uur'], u: 'In {regel:anderhalf uur} staat: "in anderhalf uur is het al een keer rond de aarde".' },
      { t: 'mc', vt: 'waarom', q: 'Waarom zien de astronauten zestien keer per dag de zon opkomen?', a: 'Omdat het ISS heel snel rond de aarde draait.', w: ['Omdat de zon in de ruimte vaker opkomt.', 'Omdat het ISS heel dicht bij de zon staat.', 'Omdat de astronauten heel kort slapen.'], u: '"Daardoor" in {regel:Daardoor zien de astronauten} verwijst naar de hoge snelheid.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Daar werden ze als}. Waar verwijst "daar" naar?', a: 'naar boven, in de ruimte', w: ['naar Amerika', 'naar de raketfabriek', 'naar de aarde'], u: 'De zin ervoor: "Raketten brachten de onderdelen … naar boven." Daar = boven in de ruimte.' },
      { t: 'mc', vt: 'woord', q: 'Lees {regel:als een soort bouwpakket}. Wat betekent "gekoppeld"?', a: 'aan elkaar vastgemaakt', w: ['uit elkaar gehaald', 'opnieuw geverfd', 'naar beneden gegooid'], u: 'Een bouwpakket zet je in elkaar. Gekoppeld = aan elkaar vastgemaakt.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom moeten de astronauten elke dag sporten?', a: 'Omdat hun spieren en botten anders zwakker worden.', w: ['Omdat ze anders te dik worden van het ruimtevoedsel.', 'Omdat ze een sportwedstrijd moeten winnen.', 'Omdat sporten een proef is met planten.'], u: 'Lees {regel:Spieren en botten}. "Daarom" laat het gevolg zien.' },
      { t: 'mc', vt: 'samenvatten', q: 'Welke titel past ook goed bij deze tekst?', a: 'Wonen en werken in het ruimtestation', w: ['Planten kweken in je tuin', 'Hoe je een raket bouwt', 'De zon komt zestien keer op'], u: 'De tekst gaat over het hele ISS: wat het is en wat astronauten er doen.' },
      { t: 'mc', vt: 'doel', q: 'Waarom heeft de schrijver deze tekst geschreven?', a: 'om de lezer te informeren over het ISS', w: ['om de lezer over te halen astronaut te worden', 'om een spannend verhaal te vertellen', 'om uit te leggen hoe je een ruimtestation bouwt'], u: 'De tekst geeft informatie (feiten). Doel = informeren.' },
      { t: 'open', vt: 'open', q: 'Noem twee soorten onderzoek die de astronauten in het ISS doen.', model: 'Ze onderzoeken hoe planten groeien zonder zwaartekracht, en wat een lang verblijf in de ruimte met je lichaam doet.' }
    ]
  },

  /* ============ 3. VERHAAL – vlaggen ============ */
  {
    id: 'vlagverhaal', thema: 'Landen & vlaggen', emoji: '🇮🇩', soort: 'verhaal',
    titel: 'De verkeerde vlag',
    alineas: [
      'Over twee weken was het landendag op school. Iedereen moest een land kiezen en daar een spreekbeurt over houden. Bram had meteen zijn vinger opgestoken. "Indonesië!" riep hij. Zijn opa was daar geboren, dus Bram wist er al heel veel over.',
      'Thuis ging hij direct aan de slag. Hij plakte foto\'s van vulkanen en rijstvelden op een groot vel. Bovenaan tekende hij trots de vlag: een rode baan boven een witte baan. Het was een makkie, vond hij.',
      'De dag van de spreekbeurt brak aan. Bram stond voor de klas en wees naar zijn poster. "Dit is de vlag van Indonesië," begon hij zelfverzekerd. Opeens stak Noor haar hand op. "Dat is toch de vlag van Monaco?" vroeg ze. "Die heb ik op vakantie gezien."',
      'Bram voelde zijn wangen warm worden. Een paar kinderen begonnen te giechelen. Had hij een fout gemaakt? Hij keek hulpzoekend naar juf Fatima.',
      'De juf glimlachte. "Jullie hebben allebei gelijk," zei ze. "De vlaggen van Indonesië en Monaco zijn bijna hetzelfde. Alleen is de vlag van Monaco iets minder lang. En weet je welke vlag precies andersom is? Die van Polen: wit boven en rood onder."',
      'Bram haalde opgelucht adem. Hij pakte een stift en schreef onder zijn tekening: "Let op: lijkt op Monaco!" Na afloop kwam Noor naar hem toe. "Volgende keer doen we samen een spreekbeurt over vlaggen," zei ze. Bram grijnsde. Dat leek hem een topidee.'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een verhaal', w: ['een informatieve tekst', 'een krantenbericht', 'een instructie'], u: 'Er zijn personen (Bram, Noor, juf Fatima) en er gebeurt iets. Dat is een verhaal.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom koos Bram voor Indonesië?', a: 'Omdat zijn opa daar geboren is en hij er al veel over wist.', w: ['Omdat de juf dat land voor hem had gekozen.', 'Omdat hij er op vakantie was geweest.', 'Omdat Noor dat ook had gekozen.'], u: 'In {regel:Zijn opa was daar} staat het antwoord: "dus" laat het gevolg zien.' },
      { t: 'mc', vt: 'uitdrukking', q: 'Lees {regel:Het was een makkie}. Wat bedoelt Bram met "een makkie"?', a: 'Het was heel makkelijk.', w: ['Het was heel moeilijk.', 'Het was een klein tekeningetje.', 'Het was een spelletje.'], u: 'Een makkie = iets wat heel makkelijk is.' },
      { t: 'mc', vt: 'gevoel', q: 'Lees {regel:Bram voelde zijn wangen}. Hoe voelt Bram zich op dat moment?', a: 'Hij schaamt zich en is onzeker.', w: ['Hij is boos op Noor.', 'Hij is trots en blij.', 'Hij verveelt zich.'], u: 'Warme wangen, giechelende kinderen en "hulpzoekend kijken" laten zien dat hij zich schaamt.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Die heb ik op vakantie}. Wat bedoelt Noor met "die"?', a: 'de vlag van Monaco', w: ['de poster van Bram', 'het land Indonesië', 'de vulkanen'], u: 'In de zin ervoor noemt Noor "de vlag van Monaco".' },
      { t: 'mc', vt: 'zoek', q: 'Wat is het verschil tussen de vlag van Indonesië en die van Monaco?', a: 'De vlag van Monaco is iets minder lang.', w: ['Bij Monaco is wit boven en rood onder.', 'De vlag van Monaco heeft een ster.', 'Er is helemaal geen verschil.'], u: 'De juf zegt: "Alleen is de vlag van Monaco iets minder lang." Wit boven = Polen!' },
      { t: 'mc', vt: 'gevoel', q: 'Hoe verandert het gevoel van Bram in het verhaal?', a: 'zelfverzekerd → onzeker → opgelucht', w: ['bang → boos → verdrietig', 'blij → verdrietig → boos', 'onzeker → zelfverzekerd → bang'], u: 'Eerst "zelfverzekerd", dan warme wangen (onzeker), aan het eind "opgelucht".' },
      { t: 'mc', vt: 'samenvatten', q: 'Welke zin past het best bij de afloop van het verhaal?', a: 'Bram leert iets nieuws en krijgt er een vriendin bij.', w: ['Bram krijgt straf omdat hij een fout maakte.', 'Noor lacht Bram uit en Bram gaat huilen.', 'De juf vindt dat Bram een nieuwe poster moet maken.'], u: 'Aan het eind wil Noor samen een spreekbeurt doen en Bram grijnst.' },
      { t: 'open', vt: 'open', q: 'Waarom schrijft Bram onder zijn tekening: "Let op: lijkt op Monaco!"?', model: 'Omdat hij nu weet dat de vlag van Indonesië bijna hetzelfde is als die van Monaco, en hij wil dat andere mensen dat ook weten.' }
    ]
  },

  /* ============ 4. INFORMATIEF – vlaggen ============ */
  {
    id: 'vlaggen', thema: 'Landen & vlaggen', emoji: '🚩', soort: 'informatieve tekst',
    titel: 'Vlaggen vertellen een verhaal',
    alineas: [
      'Elk land heeft een eigen vlag. Toch zijn vlaggen meer dan alleen een mooi stuk stof. De kleuren en tekens hebben vaak een betekenis.',
      'Neem de vlag van Canada. Daarop staat een rood esdoornblad. De esdoorn is een boom die veel in Canada groeit. Van het sap van deze boom maken de Canadezen ahornsiroop, die ze graag over hun pannenkoeken gieten. Op de vlag van Japan staat een rode cirkel. Die stelt de zon voor. Japan wordt daarom ook wel "het land van de rijzende zon" genoemd.',
      'De meeste vlaggen zijn rechthoekig. Er zijn een paar uitzonderingen. De vlaggen van Zwitserland en Vaticaanstad zijn vierkant. De vlag van Nepal is zelfs helemaal geen rechthoek: hij bestaat uit twee driehoeken boven elkaar. Het is de enige landsvlag ter wereld met die vorm.',
      'Welke vlag is het oudst? Veel mensen denken dat dit de vlag van Denemarken is: een wit kruis op een rode achtergrond. Volgens een oude legende viel deze vlag in het jaar 1219 uit de hemel, midden in een veldslag. Dat is natuurlijk niet echt gebeurd, maar de Deense vlag wordt wel al honderden jaren gebruikt.',
      'Ook de Nederlandse vlag heeft een geschiedenis. Eerst was de bovenste baan niet rood, maar oranje. Die kleur kwam van Willem van Oranje. Oranje verf verkleurde op zee snel, en rood was beter te zien. Daardoor werd de oranje baan na verloop van tijd rood.'
    ],
    vragen: [
      { t: 'mc', vt: 'samenvatten', q: 'Wat is de hoofdgedachte van deze tekst?', a: 'Vlaggen hebben vaak een betekenis en een geschiedenis.', w: ['De vlag van Nepal heeft een bijzondere vorm.', 'Canadezen eten graag pannenkoeken met ahornsiroop.', 'De Deense vlag viel uit de hemel.'], u: 'De hoofdgedachte staat vaak in de eerste alinea en gaat over de hele tekst.' },
      { t: 'mc', vt: 'zoek', q: 'Wat stelt de rode cirkel op de vlag van Japan voor?', a: 'de zon', w: ['een esdoornblad', 'een rode bal', 'de maan'], u: 'Lees {regel:Die stelt de zon voor}.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Die stelt de zon voor}. Wat wordt bedoeld met "die"?', a: 'de rode cirkel', w: ['de vlag van Canada', 'het land Japan', 'de esdoorn'], u: 'In de zin ervoor staat "een rode cirkel".' },
      { t: 'mc', vt: 'woord', q: 'Lees {regel:Er zijn een paar uitzonderingen}. Wat is een "uitzondering"?', a: 'iets wat anders is dan de rest', w: ['iets wat heel oud is', 'iets wat precies hetzelfde is', 'iets wat verboden is'], u: 'De meeste vlaggen zijn rechthoekig; een paar NIET. Die zijn de uitzondering.' },
      { t: 'mc', vt: 'zoek', q: 'Welke vlag bestaat uit twee driehoeken?', a: 'de vlag van Nepal', w: ['de vlag van Zwitserland', 'de vlag van Vaticaanstad', 'de vlag van Denemarken'], u: 'Lees {regel:De vlag van Nepal}.' },
      { t: 'mc', vt: 'signaal', q: 'Lees {regel:Dat is natuurlijk niet echt gebeurd, maar}. Wat geeft het woord "maar" hier aan?', a: 'een tegenstelling', w: ['een oorzaak', 'een opsomming', 'een tijd'], u: 'Maar = tegenstelling: het is niet echt gebeurd, MAAR de vlag is wel heel oud.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom werd de oranje baan van de Nederlandse vlag rood?', a: 'Oranje verf verkleurde snel op zee en rood was beter te zien.', w: ['Willem van Oranje vond rood mooier.', 'Er was geen oranje stof meer te koop.', 'De Denen hadden ook een rode vlag.'], u: 'Lees {regel:Oranje verf verkleurde}. "Daardoor" geeft het gevolg aan.' },
      { t: 'mc', vt: 'feit', q: 'Welke zin uit de tekst is GEEN feit?', a: 'In 1219 viel de Deense vlag uit de hemel.', w: ['De vlag van Zwitserland is vierkant.', 'Op de vlag van Canada staat een esdoornblad.', 'De Nederlandse vlag was eerst oranje-wit-blauw.'], u: 'Dat is een legende; de tekst zegt zelf "Dat is natuurlijk niet echt gebeurd".' },
      { t: 'open', vt: 'open', q: 'Noem twee vlaggen uit de tekst die NIET rechthoekig zijn.', model: 'Bijvoorbeeld: de vlag van Zwitserland (vierkant), de vlag van Vaticaanstad (vierkant) of de vlag van Nepal (twee driehoeken).' }
    ]
  },

  /* ============ 5. INSTRUCTIE – technologie ============ */
  {
    id: 'waterraket', thema: 'Technologie', emoji: '🚀', soort: 'instructie',
    titel: 'Bouw je eigen waterraket',
    alineas: [
      'Wil jij een raket laten opstijgen? Met een lege fles, water en een fietspomp lukt dat! Vraag wel altijd een volwassene om te helpen.',
      'Wat heb je nodig? • een lege plastic fles van 1,5 liter • een kurk die precies in de flessenhals past • een fietspomp met een naaldventiel (zo\'n naald voor een voetbal) • stevig karton en plakband • water',
      'Stap 1: Knip uit het karton drie of vier vinnen. Plak ze rond de flessenhals. Let op: de flessenhals wijst straks naar beneden, dus de vinnen zitten onderaan je raket.',
      'Stap 2: Prik met de naald van de pomp een gat dwars door de kurk. Laat de naald in de kurk zitten.',
      'Stap 3: Vul de fles voor ongeveer een derde met water. Druk de kurk stevig in de flessenhals.',
      'Stap 4: Zet de raket op een open grasveld, met de kurk naar beneden. Je kunt hem tegen een paar stenen laten leunen. Ga zelf op flinke afstand staan.',
      'Stap 5: Pomp lucht in de fles. De druk in de fles wordt steeds groter. Op een gegeven moment schiet de kurk eruit. Het water spuit dan naar beneden en de fles schiet omhoog!',
      'Hoe werkt het? Het water wordt met grote kracht naar beneden geduwd. Daardoor krijgt de fles een duw de andere kant op. Echte raketten werken op dezelfde manier, alleen spuiten zij hete gassen naar beneden.'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een instructie', w: ['een verhaal', 'een krantenbericht', 'een brief'], u: 'Er staat "Wat heb je nodig?" en stappen. Dat is een instructie (handleiding).' },
      { t: 'mc', vt: 'doel', q: 'Wat is het doel van deze tekst?', a: 'uitleggen hoe je iets moet maken', w: ['de lezer overhalen een fietspomp te kopen', 'een spannend verhaal vertellen', 'nieuws vertellen over raketten'], u: 'Een instructie legt uit hoe je iets doet. Doel = instrueren.' },
      { t: 'mc', vt: 'zoek', q: 'Hoeveel water doe je in de fles?', a: 'ongeveer een derde van de fles', w: ['de hele fles vol', 'de helft van de fles', '1,5 liter'], u: 'Stap 3: "Vul de fles voor ongeveer een derde met water."' },
      { t: 'mc', vt: 'zoek', q: 'Wat doe je NA het vullen van de fles met water?', a: 'De kurk stevig in de flessenhals drukken.', w: ['Vinnen uit karton knippen.', 'Een gat in de kurk prikken.', 'Gaan pompen.'], u: 'Dat staat ook in stap 3, direct na het vullen.' },
      { t: 'mc', vt: 'woord', q: 'Lees {regel:De druk in de fles}. Wat betekent "druk" hier?', a: 'de kracht waarmee de lucht duwt', w: ['een heel drukke klas', 'een afdruk van je vinger', 'haast hebben'], u: 'Je pompt steeds meer lucht in de fles; die lucht duwt steeds harder. Dat is druk.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom schiet de fles omhoog?', a: 'Het water spuit naar beneden en duwt de fles de andere kant op.', w: ['De fietspomp gooit de fles omhoog.', 'De kartonnen vinnen laten de fles vliegen.', 'Het water is lichter dan lucht.'], u: 'Lees {regel:Het water wordt met grote kracht}.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom moet je op flinke afstand gaan staan?', a: 'Omdat de raket plotseling hard wegschiet en water spuit.', w: ['Omdat je de raket anders niet ziet.', 'Omdat de pomp anders kapotgaat.', 'Omdat de fles anders niet opstijgt.'], u: 'Dit staat er niet letterlijk; je moet het afleiden. De kurk schiet er opeens uit!' },
      { t: 'open', vt: 'open', q: 'Wat is het verschil tussen een waterraket en een echte raket?', model: 'Een waterraket spuit water naar beneden, een echte raket spuit hete gassen naar beneden.' }
    ]
  },

  /* ============ 6. INTERVIEW – ruimte ============ */
  {
    id: 'interview', thema: 'Ruimte', emoji: '👩‍🚀', soort: 'interview',
    titel: 'Op bezoek bij astronaut Sanne',
    alineas: [
      'Sanne Bakker (38) is astronaut. Vorig jaar woonde ze een half jaar in het ruimtestation. Leerlingen van groep 6 van basisschool De Komeet mochten haar vragen stellen.',
      'Daan: "Wat was het eerste wat je deed toen je in het ruimtestation aankwam?" Sanne: "Ik heb heel hard gelachen! Je zweeft daar de hele tijd. Ik stootte meteen mijn hoofd tegen het plafond. Gelukkig zijn de wanden zacht."',
      'Lina: "Hoe ga je naar de wc in de ruimte?" Sanne: "Haha, die vraag krijg ik altijd! De wc werkt als een soort stofzuiger. Alles wordt weggezogen, anders zou het gaan zweven. Het is best even wennen."',
      'Mees: "Wat vond je het mooiste?" Sanne: "Het uitzicht, zonder twijfel. Ik keek elke avond naar de aarde. Je ziet de lichtjes van grote steden en soms het noorderlicht. Nederland is van boven heel klein. Ik vind het de mooiste planeet die er is."',
      'Fenna: "Was je weleens bang?" Sanne: "Bij de lancering wel een beetje. De raket trilt enorm en je wordt hard in je stoel gedrukt. Maar ik had jaren getraind. Daardoor wist ik precies wat ik moest doen."',
      'Daan: "Wil je nog een keer?" Sanne: "Ik zou zo weer gaan! Misschien zelfs naar de maan."'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een interview', w: ['een verhaal', 'een instructie', 'een reclametekst'], u: 'Kinderen stellen vragen en Sanne geeft antwoord. Dat is een interview.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe lang woonde Sanne in het ruimtestation?', a: 'een half jaar', w: ['een jaar', '38 dagen', 'een week'], u: 'In {regel:een half jaar} staat het antwoord. 38 is haar leeftijd!' },
      { t: 'mc', vt: 'waarom', q: 'Waarom werkt de wc in de ruimte als een stofzuiger?', a: 'Omdat alles anders gaat zweven.', w: ['Omdat er geen water is.', 'Omdat het dan sneller gaat.', 'Omdat het lekker stil is.'], u: 'Lees {regel:Alles wordt weggezogen}.' },
      { t: 'mc', vt: 'feit', q: 'Welke zin van Sanne is een mening?', a: '"Ik vind het de mooiste planeet die er is."', w: ['"Je zweeft daar de hele tijd."', '"De raket trilt enorm."', '"Vorig jaar woonde ze een half jaar in het ruimtestation."'], u: '"Ik vind" en "mooiste" zijn mening-woorden. Je kunt dat niet controleren.' },
      { t: 'mc', vt: 'uitdrukking', q: 'Lees {regel:Ik zou zo weer gaan}. Wat bedoelt Sanne?', a: 'Ze zou meteen weer willen gaan.', w: ['Ze gaat op dezelfde manier weer.', 'Ze wil eigenlijk niet meer.', 'Ze gaat volgende week weer.'], u: '"Ik zou zo weer gaan" = ik zou het meteen weer doen.' },
      { t: 'mc', vt: 'gevoel', q: 'Hoe voelde Sanne zich bij de lancering?', a: 'een beetje bang, maar ze wist wat ze moest doen', w: ['heel erg bang en ze wilde terug', 'helemaal niet bang', 'ze verveelde zich'], u: 'Lees {regel:Bij de lancering wel een beetje}.' },
      { t: 'mc', vt: 'signaal', q: 'Lees {regel:Daardoor wist ik precies}. Wat geeft "daardoor" aan?', a: 'een gevolg van het trainen', w: ['een tegenstelling met het trainen', 'een voorbeeld van trainen', 'iets wat daarna gebeurde'], u: 'Omdat ze jaren trainde (oorzaak), wist ze wat ze moest doen (gevolg).' },
      { t: 'open', vt: 'open', q: 'Noem twee dingen die Sanne vanuit het ruimtestation kon zien.', model: 'De lichtjes van grote steden en het noorderlicht (ook goed: Nederland / de aarde).' }
    ]
  },

  /* ============ 7. RECLAME – technologie/ruimte ============ */
  {
    id: 'sterrenstad', thema: 'Technologie', emoji: '🎟️', soort: 'reclame',
    titel: 'Kom naar Ruimtepark Sterrenstad!',
    alineas: [
      'Altijd al astronaut willen zijn? Kom dan naar Ruimtepark Sterrenstad, het gaafste uitje van het jaar!',
      'Wat kun je allemaal doen? • Stap in onze echte raketcapsule. • Zweef in de zwaartekrachtmachine. • Bouw en programmeer je eigen robot in het Robotlab. • Bekijk de sterrenshow in ons koepeltheater.',
      'Sterrenshow: elke dag om 11.00 uur, 13.30 uur en 15.30 uur. De show duurt 40 minuten. Let op: in het weekend is er ook een show om 17.00 uur.',
      'Openingstijden: dinsdag tot en met zondag van 10.00 tot 18.00 uur. Op maandag zijn we gesloten, behalve in de schoolvakanties.',
      'Prijzen: kinderen (4 tot 12 jaar) € 14,50 • volwassenen € 19,50 • kinderen onder de 4 jaar gratis. Koop je kaartjes online, dan krijg je € 2 korting per kaartje!',
      'Wacht niet te lang: het wordt superdruk! Je vindt ons naast station Sterrenstad. Tot snel!'
    ],
    vragen: [
      { t: 'mc', vt: 'doel', q: 'Wat wil de schrijver met deze tekst?', a: 'mensen overhalen om naar het ruimtepark te gaan', w: ['uitleggen hoe een raket werkt', 'een verhaal vertellen over een astronaut', 'vertellen wat er gisteren gebeurd is'], u: 'Reclame wil je overtuigen: "Kom naar…", "het gaafste uitje", "Wacht niet te lang".' },
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een reclametekst', w: ['een informatieve tekst', 'een verhaal', 'een interview'], u: 'Prijzen, openingstijden en "Kom naar…": een reclame of folder.' },
      { t: 'mc', vt: 'zoek', q: 'Op welke dag is het ruimtepark buiten de schoolvakanties dicht?', a: 'maandag', w: ['dinsdag', 'zondag', 'zaterdag'], u: 'Lees {regel:Op maandag zijn we gesloten}.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe laat is de laatste sterrenshow op een woensdag afgelopen?', a: 'om 16.10 uur', w: ['om 15.30 uur', 'om 17.40 uur', 'om 18.00 uur'], u: 'Op een doordeweekse dag is de laatste show om 15.30 uur. Plus 40 minuten = 16.10 uur. (17.00 uur is alleen in het weekend.)' },
      { t: 'mc', vt: 'zoek', q: 'Oliver (9 jaar) koopt online een kaartje. Hoeveel betaalt hij?', a: '€ 12,50', w: ['€ 14,50', '€ 16,50', '€ 17,50'], u: 'Kind: € 14,50. Online € 2 korting: 14,50 − 2 = € 12,50.' },
      { t: 'mc', vt: 'feit', q: 'Welke zin is een mening?', a: 'Het is het gaafste uitje van het jaar.', w: ['De sterrenshow duurt 40 minuten.', 'Kinderen onder de 4 jaar zijn gratis.', 'Het park ligt naast station Sterrenstad.'], u: '"Gaafste" is wat de schrijver vindt. Dat kun je niet controleren.' },
      { t: 'mc', vt: 'bron', q: 'Waar zou je deze tekst kunnen vinden?', a: 'in een folder', w: ['in een geschiedenisboek', 'in een woordenboek', 'in een verhalenbundel'], u: 'Reclame met prijzen en tijden vind je in een folder (of op een website).' },
      { t: 'open', vt: 'open', q: 'Mama (volwassene) en Oliver (9) kopen hun kaartjes bij de kassa. Hoeveel betalen ze samen? Laat zien hoe je rekent.', model: '€ 19,50 + € 14,50 = € 34,00 (geen korting, want ze kopen niet online).' }
    ]
  },

  /* ============ 8. INFORMATIEF – geschiedenis/technologie ============ */
  {
    id: 'drukpers', thema: 'Geschiedenis', emoji: '📜', soort: 'informatieve tekst',
    titel: 'Gutenberg en de drukpers',
    alineas: [
      'Tegenwoordig kun je in een paar seconden duizend bladzijden printen. Maar zo\'n zeshonderd jaar geleden was dat ondenkbaar. Elk boek moest toen met de hand worden overgeschreven.',
      'Dat werk werd vaak gedaan door monniken in kloosters. Zij schreven met een ganzenveer en inkt, letter voor letter. Over één dik boek deden ze soms meer dan een jaar. Boeken waren daardoor zeldzaam en heel duur. Alleen rijke mensen en kloosters hadden er een paar.',
      'Rond het jaar 1450 bedacht de Duitser Johannes Gutenberg een slimme oplossing. Hij maakte losse letters van metaal. Die kon hij in een rij naast elkaar zetten, zodat er woorden en zinnen ontstonden. Daarna smeerde hij er inkt op en drukte er met een grote pers een vel papier tegenaan. Zo had hij in één keer een hele bladzijde gedrukt. Na het drukken kon hij de letters weer gebruiken voor een volgende bladzijde.',
      'Met de drukpers ging het maken van boeken veel sneller. Boeken werden goedkoper, en steeds meer mensen leerden lezen. Nieuws en nieuwe ideeën verspreidden zich veel sneller dan vroeger.',
      'Daarom noemen sommige mensen de drukpers een van de belangrijkste uitvindingen ooit. Zonder Gutenberg had jij dit misschien nooit kunnen lezen!'
    ],
    vragen: [
      { t: 'mc', vt: 'woord', q: 'Lees {regel:was dat ondenkbaar}. Wat betekent "ondenkbaar"?', a: 'zo vreemd dat niemand het zich kon voorstellen', w: ['heel normaal', 'heel duur', 'verboden'], u: '"On" betekent "niet". Ondenkbaar = je kunt het niet bedenken / voorstellen.' },
      { t: 'mc', vt: 'zoek', q: 'Wie schreven vroeger vaak boeken over?', a: 'monniken in kloosters', w: ['rijke mensen', 'Johannes Gutenberg', 'kinderen op school'], u: 'Lees {regel:Dat werk werd vaak gedaan}.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom waren boeken vroeger zo duur?', a: 'Omdat het overschrijven heel lang duurde.', w: ['Omdat papier van goud was.', 'Omdat bijna niemand wilde lezen.', 'Omdat de drukpers zo duur was.'], u: 'Meer dan een jaar werk per boek → "daardoor" zeldzaam en duur.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Die kon hij in een rij}. Wat wordt bedoeld met "die"?', a: 'de losse letters van metaal', w: ['de monniken', 'de boeken', 'de vellen papier'], u: 'De zin ervoor: "Hij maakte losse letters van metaal."' },
      { t: 'mc', vt: 'signaal', q: 'In de derde alinea staan de woorden "daarna" en "zo". Wat laten ze vooral zien?', a: 'de volgorde van de stappen', w: ['een tegenstelling', 'een mening', 'een voorbeeld'], u: '"Daarna" is een signaalwoord van tijd/volgorde.' },
      { t: 'mc', vt: 'zoek', q: 'Wat was het slimme van de losse letters?', a: 'Je kon ze steeds opnieuw gebruiken.', w: ['Ze waren gemaakt van ganzenveren.', 'Ze konden vanzelf schrijven.', 'Ze waren heel licht.'], u: 'Lees {regel:Na het drukken kon hij}.' },
      { t: 'mc', vt: 'samenvatten', q: 'Welke zin vat de tekst het best samen?', a: 'Door de drukpers van Gutenberg werden boeken sneller en goedkoper gemaakt.', w: ['Monniken schreven boeken met een ganzenveer.', 'Gutenberg was een Duitser die in 1450 leefde.', 'Tegenwoordig kun je heel snel printen.'], u: 'De rest zijn details uit een deel van de tekst.' },
      { t: 'open', vt: 'open', q: 'Noem twee gevolgen van de uitvinding van de drukpers.', model: 'Boeken werden goedkoper, meer mensen leerden lezen, nieuws en ideeën verspreidden zich sneller. (Twee hiervan.)' }
    ]
  },

  /* ============ 9. E-MAIL – landen/geschiedenis ============ */
  {
    id: 'egypte', thema: 'Landen & vlaggen', emoji: '🐫', soort: 'e-mail',
    titel: 'Groeten uit Egypte',
    alineas: [
      'Van: Jesse • Aan: Oliver • Onderwerp: Ik heb een piramide gezien!!!',
      'Hoi Oliver,',
      'Hoe is het in Nederland? Hier is het superwarm: gisteren was het 36 graden! We zitten nu al vijf dagen in Egypte, en ik moet je echt van alles vertellen.',
      'Op dinsdag zijn we naar de piramides van Gizeh geweest. Ze zijn nog veel groter dan ik dacht. De grootste is ongeveer 4500 jaar geleden gebouwd, als graf voor farao Cheops. Onze gids vertelde dat de bouwers geen kranen hadden. Ze sleepten de zware stenen over zand dat ze nat maakten. Zo gleden de stenen makkelijker. Slim hè?',
      'Daarna hebben we op een kameel gereden. Die van mij heette Bob en hij boerde de hele tijd. Mijn zus vond het vies, maar ik lag dubbel.',
      'Morgen gaan we met een boot over de Nijl. Dat is de langste rivier van Afrika. Papa zegt dat we misschien krokodillen zien. Ik hoop het!',
      'Ik heb een sleutelhanger met hiërogliefen voor je gekocht. Dat is het oude schrift van de Egyptenaren, met plaatjes in plaats van letters.',
      'Tot over een week! Groetjes, Jesse'
    ],
    vragen: [
      { t: 'mc', vt: 'soort', q: 'Wat voor soort tekst is dit?', a: 'een e-mail', w: ['een krantenbericht', 'een informatieve tekst', 'een instructie'], u: '"Van", "Aan", "Onderwerp", "Hoi Oliver" en "Groetjes": een e-mail.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe lang is Jesse al in Egypte als hij de e-mail schrijft?', a: 'vijf dagen', w: ['een week', 'twee dagen', '36 dagen'], u: 'Lees {regel:al vijf dagen}.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe kregen de bouwers de zware stenen makkelijker vooruit?', a: 'Ze sleepten ze over nat zand.', w: ['Ze gebruikten grote kranen.', 'Kamelen droegen de stenen.', 'Ze vervoerden ze met een boot.'], u: 'Lees {regel:Ze sleepten de zware stenen}.' },
      { t: 'mc', vt: 'uitdrukking', q: 'Lees {regel:ik lag dubbel}. Wat bedoelt Jesse met "ik lag dubbel"?', a: 'Ik moest heel hard lachen.', w: ['Ik viel van de kameel.', 'Ik had buikpijn.', 'Ik lag twee keer op de grond.'], u: '"Dubbel liggen" = heel erg lachen. Niet letterlijk!' },
      { t: 'mc', vt: 'gevoel', q: 'Hoe kijkt Jesse uit naar de boottocht over de Nijl?', a: 'Hij heeft er zin in en hoopt krokodillen te zien.', w: ['Hij is bang voor de krokodillen.', 'Hij heeft er geen zin in.', 'Hij vindt het vies.'], u: '"Ik hoop het!" laat zien dat hij er zin in heeft.' },
      { t: 'mc', vt: 'woord', q: 'Wat zijn hiërogliefen?', a: 'het oude schrift van de Egyptenaren', w: ['een soort sleutelhanger', 'Egyptische kamelen', 'stenen van de piramide'], u: 'Lees {regel:Dat is het oude schrift}.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Die van mij heette Bob}. Wat bedoelt Jesse met "die"?', a: 'de kameel', w: ['de gids', 'de piramide', 'zijn zus'], u: 'In de zin ervoor: "op een kameel gereden".' },
      { t: 'open', vt: 'open', q: 'Waarom bouwden de Egyptenaren de grootste piramide?', model: 'Als graf voor farao Cheops.' }
    ]
  },

  /* ============ 10. VERHAAL – geschiedenis (Romeinen) ============ */
  {
    id: 'romein', thema: 'Geschiedenis', emoji: '🛡️', soort: 'verhaal',
    titel: 'Wacht bij de rivier',
    alineas: [
      'Het was koud en mistig op de wachttoren bij de Rijn. Marcus trok zijn wollen mantel dichter om zich heen. Hij was pas zestien en het was zijn eerste nacht als wachter bij het Romeinse fort.',
      '"Blijf goed naar de overkant kijken," had de oude soldaat Titus gezegd. "Daar wonen de Germanen. Je weet nooit wat ze van plan zijn." Daarna was Titus gaan slapen. Nu stond Marcus er helemaal alleen.',
      'Elk geluid liet hem schrikken. Een vogel die opvloog. Water dat tegen de kant klotste. Zijn hart bonsde in zijn keel. Toen hoorde hij het: het zachte geplons van roeispanen. Er kwam een boot aan!',
      'Marcus greep zijn hoorn. Moest hij alarm slaan? Als hij het fort voor niets wakker maakte, zou iedereen hem uitlachen. Maar als er echt vijanden kwamen…',
      'Hij kneep zijn ogen tot spleetjes. Langzaam werd een klein bootje zichtbaar. Er zat één persoon in, met een grote mand. Het was Aelia, de vrouw die elke week vis kwam ruilen voor graan.',
      '"Je bent vroeg," riep Marcus naar beneden. Zijn stem trilde nog een beetje. Aelia lachte. "De beste vis vang je voor de zon opkomt, jongen."',
      'Toen Titus later wakker werd, vertelde Marcus wat er gebeurd was. Titus knikte tevreden. "Goed dat je eerst gekeken hebt. Een echte wachter blaast niet bij elk geluidje op zijn hoorn."'
    ],
    vragen: [
      { t: 'mc', vt: 'zoek', q: 'Waar speelt dit verhaal zich af?', a: 'op een wachttoren bij een Romeins fort aan de Rijn', w: ['in een Germaans dorp', 'op een boot op de Rijn', 'in een kasteel in Rome'], u: 'Lees de eerste alinea.' },
      { t: 'mc', vt: 'gevoel', q: 'Lees {regel:Elk geluid liet hem schrikken}. Hoe voelt Marcus zich?', a: 'gespannen en bang', w: ['vrolijk', 'boos', 'slaperig en verveeld'], u: 'Schrikken van elk geluid en een bonzend hart: hij is gespannen en bang.' },
      { t: 'mc', vt: 'uitdrukking', q: 'Wat betekent "zijn hart bonsde in zijn keel"?', a: 'Hij was heel zenuwachtig.', w: ['Hij had keelpijn.', 'Hij had hard gerend.', 'Hij was aan het zingen.'], u: 'Dat zeg je als je heel erg schrikt of zenuwachtig bent. Niet letterlijk!' },
      { t: 'mc', vt: 'waarom', q: 'Waarom twijfelt Marcus of hij alarm moet slaan?', a: 'Hij wil niet uitgelachen worden als het voor niets is.', w: ['Hij weet niet hoe de hoorn werkt.', 'Hij wil dat de Germanen het fort veroveren.', 'Titus heeft gezegd dat het niet mag.'], u: 'Lees {regel:Als hij het fort voor niets}.' },
      { t: 'mc', vt: 'zoek', q: 'Wie zat er in het bootje?', a: 'Aelia, die vis kwam ruilen voor graan', w: ['een groep Germanen', 'de oude soldaat Titus', 'een Romeinse generaal'], u: 'Lees {regel:Het was Aelia}.' },
      { t: 'mc', vt: 'woord', q: 'Lees {regel:Zijn stem trilde}. Wat laat dat zien?', a: 'Marcus is nog een beetje geschrokken.', w: ['Marcus heeft het koud.', 'Marcus is boos op Aelia.', 'Marcus moet lachen.'], u: 'De schrik zit er nog in: "nog een beetje".' },
      { t: 'mc', vt: 'gevoel', q: 'Wat vindt Titus van wat Marcus deed?', a: 'Hij vindt het goed dat Marcus eerst keek.', w: ['Hij is boos dat Marcus niet blies.', 'Hij lacht Marcus uit.', 'Hij vindt dat Marcus moet stoppen.'], u: '"Titus knikte tevreden. Goed dat je eerst gekeken hebt."' },
      { t: 'mc', vt: 'samenvatten', q: 'Wat is de les van dit verhaal?', a: 'Kijk eerst goed voordat je in paniek raakt.', w: ['Je moet altijd meteen alarm slaan.', 'Vis vang je het best in de middag.', 'Romeinen hielden niet van Germanen.'], u: 'Titus zegt het aan het eind: niet bij elk geluidje op je hoorn blazen.' },
      { t: 'open', vt: 'open', q: 'Hoe verandert het gevoel van Marcus van het begin tot het eind van het verhaal?', model: 'Eerst is hij gespannen en bang, als hij ziet dat het Aelia is, is hij opgelucht, en aan het eind is hij trots/blij omdat Titus tevreden is.' }
    ]
  },

  /* ============ 11. INFORMATIEF – landen ============ */
  {
    id: 'noorwegen', thema: 'Landen & vlaggen', emoji: '🇳🇴', soort: 'informatieve tekst',
    titel: 'Noorwegen: fjorden en noorderlicht',
    alineas: [
      'Noorwegen ligt in het noorden van Europa. Het land is ongeveer acht keer zo groot als Nederland. Toch wonen er veel minder mensen: zo\'n vijfeneenhalf miljoen. In Nederland wonen er bijna achttien miljoen.',
      'Noorwegen is beroemd om zijn fjorden. Een fjord is een lange, smalle inham van de zee tussen hoge bergen. Fjorden zijn heel lang geleden ontstaan. In de ijstijd schoven enorme gletsjers langzaam naar de zee. Zij sleten diepe dalen uit in de bergen. Toen het ijs smolt, stroomde het zeewater die dalen in.',
      'In het noorden van Noorwegen gebeurt in de winter iets bijzonders. Dan komt de zon wekenlang niet boven de horizon uit. Dat heet de poolnacht. In de zomer is het juist andersom: dan gaat de zon zelfs \'s nachts niet onder. Daarom wordt Noorwegen ook wel "het land van de middernachtzon" genoemd.',
      'In de lange winternachten kun je met wat geluk het noorderlicht zien. Groene en paarse lichten dansen dan langs de hemel. Ze ontstaan doordat deeltjes van de zon botsen op de lucht rond de aarde.',
      'De Noren houden van buiten zijn. Veel kinderen kunnen al skiën voordat ze naar school gaan. Er is zelfs een Noors gezegde: "Er bestaat geen slecht weer, alleen slechte kleding."'
    ],
    vragen: [
      { t: 'mc', vt: 'zoek', q: 'Hoeveel mensen wonen er ongeveer in Noorwegen?', a: 'vijfeneenhalf miljoen', w: ['achttien miljoen', 'acht miljoen', 'een half miljoen'], u: 'Lees {regel:vijfeneenhalf miljoen}. Achttien miljoen is Nederland!' },
      { t: 'mc', vt: 'woord', q: 'Wat is een fjord?', a: 'een lange, smalle inham van de zee tussen hoge bergen', w: ['een grote gletsjer', 'een hoge berg met sneeuw', 'een Noorse boot'], u: 'De tekst legt het zelf uit in {regel:Een fjord is een lange}.' },
      { t: 'mc', vt: 'zoek', q: 'Zet in de goede volgorde: hoe ontstond een fjord?', a: 'gletsjers schuiven → dalen worden uitgesleten → ijs smelt → zeewater stroomt erin', w: ['ijs smelt → gletsjers schuiven → zeewater stroomt erin → dalen ontstaan', 'zeewater stroomt erin → ijs smelt → gletsjers schuiven → dalen ontstaan', 'dalen ontstaan → zeewater stroomt erin → gletsjers schuiven → ijs smelt'], u: 'Volg de tweede alinea: eerst gletsjers, dan dalen, "toen het ijs smolt", zeewater.' },
      { t: 'mc', vt: 'verwijs', q: 'Lees {regel:Zij sleten diepe dalen}. Wie of wat zijn "zij"?', a: 'de gletsjers', w: ['de Noren', 'de bergen', 'de fjorden'], u: 'In de zin ervoor: "schoven enorme gletsjers…".' },
      { t: 'mc', vt: 'woord', q: 'Wat is de poolnacht?', a: 'een periode waarin de zon wekenlang niet opkomt', w: ['een nacht met noorderlicht', 'de langste nacht van het jaar in Nederland', 'een nacht waarin de zon niet ondergaat'], u: 'Lees {regel:Dat heet de poolnacht}. Pas op: middernachtzon is juist andersom!' },
      { t: 'mc', vt: 'signaal', q: 'Lees {regel:In de zomer is het juist andersom}. Welk soort signaalwoord is "juist andersom"?', a: 'tegenstelling', w: ['opsomming', 'voorbeeld', 'oorzaak'], u: 'Winter: geen zon. Zomer: de hele tijd zon. Dat is een tegenstelling.' },
      { t: 'mc', vt: 'uitdrukking', q: 'Wat bedoelen de Noren met "Er bestaat geen slecht weer, alleen slechte kleding"?', a: 'Met de juiste kleren kun je altijd naar buiten.', w: ['In Noorwegen is het altijd mooi weer.', 'Noorse kleding is van slechte kwaliteit.', 'Bij slecht weer moet je binnen blijven.'], u: 'Het weer maakt niet uit, als je je maar goed aankleedt.' },
      { t: 'open', vt: 'open', q: 'Waarom wordt Noorwegen "het land van de middernachtzon" genoemd?', model: 'Omdat de zon in de zomer (in het noorden) zelfs \'s nachts niet ondergaat.' }
    ]
  },

  /* ============ 12. INFORMATIEF – technologie/geschiedenis ============ */
  {
    id: 'wright', thema: 'Technologie', emoji: '✈️', soort: 'informatieve tekst',
    titel: 'Twaalf seconden die de wereld veranderden',
    alineas: [
      'Op 17 december 1903 stond er een harde wind op het strand bij Kitty Hawk, in Amerika. Twee broers, Orville en Wilbur Wright, sleepten een vreemd toestel naar buiten. Het was gemaakt van hout en stof en had een kleine motor.',
      'De broers hadden een fietsenwinkel. Maar hun grote droom was vliegen. Jarenlang hadden ze proeven gedaan met vliegers en zweefvliegtuigen. Ze keken ook goed naar vogels. Zo ontdekten ze hoe je in de lucht kunt sturen: door de vleugels een beetje te draaien.',
      'Die ochtend ging Orville op de onderste vleugel liggen. De motor ronkte en het toestel kwam langzaam in beweging. Wilbur rende ernaast. Toen gebeurde het: het vliegtuig kwam los van de grond! Na twaalf seconden landde het weer, zo\'n 37 meter verderop.',
      'Dat lijkt misschien niet veel. Een schoolplein is vaak al langer. Toch was het een wereldrecord: het was de eerste keer dat een mens met een vliegtuig met een motor had gevlogen én zelf kon sturen. Diezelfde dag maakten de broers nog drie vluchten. De langste duurde bijna een minuut.',
      'Tegenwoordig vliegen er elke dag meer dan honderdduizend vliegtuigen over de wereld. En het begon allemaal met twaalf seconden op een winderig strand.'
    ],
    vragen: [
      { t: 'mc', vt: 'zoek', q: 'Wanneer vond de eerste vlucht plaats?', a: 'op 17 december 1903', w: ['op 12 december 1903', 'op 17 december 1937', 'in 1937'], u: 'Lees de eerste zin. 12 en 37 zijn de seconden en meters!' },
      { t: 'mc', vt: 'zoek', q: 'Wat was het beroep van de broers Wright?', a: 'Ze hadden een fietsenwinkel.', w: ['Ze waren piloten.', 'Ze bouwden schepen.', 'Ze werkten op het strand.'], u: 'Lees {regel:De broers hadden een fietsenwinkel}.' },
      { t: 'mc', vt: 'signaal', q: 'Lees {regel:Maar hun grote droom}. Wat geeft "maar" aan?', a: 'een tegenstelling tussen hun werk en hun droom', w: ['een oorzaak', 'een volgorde', 'een voorbeeld'], u: 'Ze werkten met fietsen, MAAR ze droomden van vliegen.' },
      { t: 'mc', vt: 'zoek', q: 'Hoe ontdekten de broers hoe je in de lucht kunt sturen?', a: 'door goed naar vogels te kijken en proeven te doen', w: ['door het in een boek te lezen', 'door met een fiets te oefenen', 'door het aan andere piloten te vragen'], u: 'Lees {regel:Ze keken ook goed naar vogels}.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom schrijft de schrijver "Een schoolplein is vaak al langer"?', a: 'om te laten zien hoe kort de eerste vlucht eigenlijk was', w: ['om te vertellen dat de broers op een schoolplein vlogen', 'om te zeggen dat schoolpleinen te klein zijn', 'om uit te leggen hoe groot een vliegtuig is'], u: 'Hij vergelijkt de 37 meter met iets wat jij kent.' },
      { t: 'mc', vt: 'waarom', q: 'Waarom was de vlucht toch een wereldrecord?', a: 'Het was de eerste keer dat iemand met een motorvliegtuig vloog en zelf kon sturen.', w: ['Omdat de vlucht heel lang duurde.', 'Omdat het vliegtuig heel hoog vloog.', 'Omdat het heel hard waaide.'], u: 'Lees {regel:Toch was het een wereldrecord}.' },
      { t: 'mc', vt: 'samenvatten', q: 'Welke titel past ook goed bij deze tekst?', a: 'De eerste vlucht van de gebroeders Wright', w: ['Hoe je een fietsenwinkel begint', 'Vogels kijken op het strand', 'Honderdduizend vliegtuigen per dag'], u: 'De tekst gaat over de eerste vlucht van de broers.' },
      { t: 'open', vt: 'open', q: 'Hoe lang duurde de langste vlucht op 17 december 1903?', model: 'Bijna een minuut.' }
    ]
  }
];

/* =========================================================
   INFORMATIE OPZOEKEN – met plaatje (html) erbij
   ========================================================= */
const OPZOEK = [
  {
    html: `<div class="web"><div class="bar">🔒 www.ruimtemuseum-oliehaven.nl</div><div class="nav"><span>Home</span><span>Tentoonstellingen</span><span>Tickets</span><span>Openingstijden</span><span>Route</span><span>Vacatures</span><span>Contact</span></div><div class="body">Welkom bij het Ruimtemuseum! Ontdek raketten, planeten en echte maanstenen.</div></div>`,
    q: 'Thijs wil weten hoe laat het museum op zaterdag dichtgaat. Op welke link moet hij klikken?', a: 'Openingstijden', w: ['Tickets', 'Route', 'Contact'], u: 'Hoe laat iets open of dicht is, vind je bij openingstijden.'
  },
  {
    html: `<div class="web"><div class="bar">🔒 www.ruimtemuseum-oliehaven.nl</div><div class="nav"><span>Home</span><span>Tentoonstellingen</span><span>Tickets</span><span>Openingstijden</span><span>Route</span><span>Vacatures</span><span>Contact</span></div><div class="body">Welkom bij het Ruimtemuseum! Ontdek raketten, planeten en echte maanstenen.</div></div>`,
    q: 'Meneer De Boer wil graag in het museum komen werken als rondleider. Op welke link klikt hij?', a: 'Vacatures', w: ['Tentoonstellingen', 'Contact', 'Home'], u: 'Een vacature is een baan die vrij is.'
  },
  {
    html: `<div class="web"><div class="bar">🔒 www.ruimtemuseum-oliehaven.nl</div><div class="nav"><span>Home</span><span>Tentoonstellingen</span><span>Tickets</span><span>Openingstijden</span><span>Route</span><span>Vacatures</span><span>Contact</span></div><div class="body">Welkom bij het Ruimtemuseum! Ontdek raketten, planeten en echte maanstenen.</div></div>`,
    q: 'Saar wil weten hoe ze met de fiets bij het museum komt. Op welke link klikt ze?', a: 'Route', w: ['Openingstijden', 'Tickets', 'Vacatures'], u: 'De route vertelt hoe je ergens komt.'
  },
  {
    html: `<div class="lemma"><b>as·tro·naut</b> (de; m, v; mv: astronauten) persoon die met een ruimteschip een reis door de ruimte maakt</div>`,
    q: 'Mila wil weten wat het meervoud is van "astronaut". Jens wil weten wat het woord betekent. Wie kan het antwoord vinden in dit stukje van het woordenboek?', a: 'Mila en Jens', w: ['alleen Mila', 'alleen Jens', 'geen van beiden'], u: '"mv: astronauten" is het meervoud en daarachter staat de betekenis. Allebei!'
  },
  {
    html: `<div class="lemma"><b>ka·ta·pult</b> (de; m; mv: katapulten)</div>`,
    q: 'Ruben wil weten in welke lettergrepen "katapult" is verdeeld. Lotte wil weten wat een katapult is. Wie vindt het antwoord?', a: 'alleen Ruben', w: ['alleen Lotte', 'Ruben en Lotte', 'geen van beiden'], u: 'De puntjes (ka·ta·pult) laten de lettergrepen zien. Een betekenis staat er niet.'
  },
  {
    html: `<div class="toc"><b>Inhoud – Alles over de ruimte</b><div><span>1. Ons zonnestelsel</span><span></span><span>4</span></div><div><span>2. De maan</span><span></span><span>12</span></div><div><span>3. Mars, de rode planeet</span><span></span><span>20</span></div><div><span>4. Raketten en ruimteschepen</span><span></span><span>28</span></div><div><span>5. Leven in de ruimte</span><span></span><span>36</span></div><div><span>6. Sterren en sterrenbeelden</span><span></span><span>44</span></div></div>`,
    q: 'Op welke bladzijde begint het hoofdstuk over Mars?', a: '20', w: ['3', '12', '28'], u: 'Hoofdstuk 3 "Mars, de rode planeet" begint op bladzijde 20.'
  },
  {
    html: `<div class="toc"><b>Inhoud – Alles over de ruimte</b><div><span>1. Ons zonnestelsel</span><span></span><span>4</span></div><div><span>2. De maan</span><span></span><span>12</span></div><div><span>3. Mars, de rode planeet</span><span></span><span>20</span></div><div><span>4. Raketten en ruimteschepen</span><span></span><span>28</span></div><div><span>5. Leven in de ruimte</span><span></span><span>36</span></div><div><span>6. Sterren en sterrenbeelden</span><span></span><span>44</span></div></div>`,
    q: 'Wouter wil lezen hoe astronauten slapen en eten in het ruimtestation. In welk hoofdstuk kijkt hij het best?', a: 'hoofdstuk 5', w: ['hoofdstuk 1', 'hoofdstuk 4', 'hoofdstuk 6'], u: 'Slapen en eten in de ruimte = "Leven in de ruimte".'
  },
  {
    html: `<div class="toc"><b>Register</b><div><span>Apollo 11</span><span></span><span>14, 15</span></div><div><span>Armstrong, Neil</span><span></span><span>15</span></div><div><span>komeet</span><span></span><span>9</span></div><div><span>maanlanding</span><span></span><span>14-16</span></div><div><span>raket</span><span></span><span>28-31</span></div><div><span>zwart gat</span><span></span><span>47</span></div></div>`,
    q: 'Op welke bladzijden lees je over de maanlanding?', a: '14 tot en met 16', w: ['15', '28 tot en met 31', '14 en 15'], u: 'Zoek "maanlanding" in het register: 14-16.'
  },
  {
    html: `<div class="toc"><b>Register</b><div><span>Apollo 11</span><span></span><span>14, 15</span></div><div><span>Armstrong, Neil</span><span></span><span>15</span></div><div><span>komeet</span><span></span><span>9</span></div><div><span>maanlanding</span><span></span><span>14-16</span></div><div><span>raket</span><span></span><span>28-31</span></div><div><span>zwart gat</span><span></span><span>47</span></div></div>`,
    q: 'Waar in een boek vind je meestal een register?', a: 'achterin het boek', w: ['voorin het boek', 'in het midden van het boek', 'op de kaft'], u: 'Inhoudsopgave = voorin. Register = achterin, op alfabet.'
  },
  {
    html: `<table class="data"><tr><th>Trein naar Utrecht</th><th>vertrek Amersfoort</th><th>aankomst Utrecht</th></tr><tr><td>Intercity</td><td>9:03</td><td>9:17</td></tr><tr><td>Sprinter</td><td>9:15</td><td>9:44</td></tr><tr><td>Intercity</td><td>9:33</td><td>9:47</td></tr><tr><td>Sprinter</td><td>9:45</td><td>10:14</td></tr></table>`,
    q: 'Noa moet om 10:00 uur in Utrecht zijn. Welke trein is de laatste die ze kan nemen?', a: 'de Intercity van 9:33', w: ['de Sprinter van 9:45', 'de Intercity van 9:03', 'de Sprinter van 9:15'], u: 'De Sprinter van 9:45 komt pas om 10:14 aan: te laat! De Intercity van 9:33 komt om 9:47 aan.'
  },
  {
    html: `<table class="data"><tr><th>Trein naar Utrecht</th><th>vertrek Amersfoort</th><th>aankomst Utrecht</th></tr><tr><td>Intercity</td><td>9:03</td><td>9:17</td></tr><tr><td>Sprinter</td><td>9:15</td><td>9:44</td></tr><tr><td>Intercity</td><td>9:33</td><td>9:47</td></tr><tr><td>Sprinter</td><td>9:45</td><td>10:14</td></tr></table>`,
    q: 'Hoeveel minuten doet de Sprinter over de reis van Amersfoort naar Utrecht?', a: '29 minuten', w: ['14 minuten', '30 minuten', '44 minuten'], u: 'Van 9:15 tot 9:44 = 29 minuten.'
  },
  {
    html: `<table class="data"><tr><th>Land</th><th>Hoofdstad</th><th>Inwoners</th><th>Vlag</th></tr><tr><td>België</td><td>Brussel</td><td>11,8 miljoen</td><td>🇧🇪</td></tr><tr><td>Duitsland</td><td>Berlijn</td><td>84 miljoen</td><td>🇩🇪</td></tr><tr><td>Frankrijk</td><td>Parijs</td><td>68 miljoen</td><td>🇫🇷</td></tr><tr><td>Luxemburg</td><td>Luxemburg</td><td>0,7 miljoen</td><td>🇱🇺</td></tr></table>`,
    q: 'Welk land in de tabel heeft de minste inwoners?', a: 'Luxemburg', w: ['België', 'Frankrijk', 'Duitsland'], u: '0,7 miljoen is minder dan 1 miljoen. Dat is het kleinste getal.'
  },
  {
    html: `<table class="data"><tr><th>Land</th><th>Hoofdstad</th><th>Inwoners</th><th>Vlag</th></tr><tr><td>België</td><td>Brussel</td><td>11,8 miljoen</td><td>🇧🇪</td></tr><tr><td>Duitsland</td><td>Berlijn</td><td>84 miljoen</td><td>🇩🇪</td></tr><tr><td>Frankrijk</td><td>Parijs</td><td>68 miljoen</td><td>🇫🇷</td></tr><tr><td>Luxemburg</td><td>Luxemburg</td><td>0,7 miljoen</td><td>🇱🇺</td></tr></table>`,
    q: 'Wat is de hoofdstad van het land met de meeste inwoners?', a: 'Berlijn', w: ['Parijs', 'Brussel', 'Luxemburg'], u: 'Duitsland heeft de meeste inwoners (84 miljoen). De hoofdstad is Berlijn.'
  },
  {
    html: `<table class="data"><tr><th>Tijd</th><th>Programma Ruimtedag</th><th>Zaal</th></tr><tr><td>10:00</td><td>Raketten bouwen</td><td>Werkplaats</td></tr><tr><td>11:15</td><td>Sterrenshow</td><td>Koepel</td></tr><tr><td>13:00</td><td>Robots programmeren</td><td>Lab</td></tr><tr><td>14:30</td><td>Sterrenshow</td><td>Koepel</td></tr><tr><td>15:45</td><td>Quiz: Wie wordt astronaut?</td><td>Aula</td></tr></table>`,
    q: 'Kim komt om 12:00 uur binnen en wil de sterrenshow zien. Hoe laat moet ze in de Koepel zijn?', a: 'om 14:30', w: ['om 11:15', 'om 13:00', 'om 15:45'], u: 'De show van 11:15 is dan al voorbij. De volgende is om 14:30.'
  },
  {
    html: '',
    q: 'Je wilt meer te weten komen over de vlag van Brazilië. Welke zoekwoorden typ je het best in een zoekmachine?', a: 'vlag Brazilië', w: ['Brazilië', 'vlaggen', 'mooie vlag'], u: 'Gebruik de belangrijkste woorden: waar gaat het precies over? "vlag" én "Brazilië".'
  },
  {
    html: '',
    q: 'Welk woord komt het EERST in het woordenboek?', a: 'planeet', w: ['plank', 'plas', 'pleister'], u: 'pla-n-e, pla-n-k, pla-s, ple: vergelijk letter voor letter. e komt voor k.'
  },
  {
    html: '',
    q: 'Welk woord komt het LAATST in het woordenboek?', a: 'romein', w: ['raket', 'ridder', 'robot'], u: 'ra – ri – rob – rom: b komt vóór m, dus romein staat als laatste.'
  },
  {
    html: '',
    q: 'In welke rij staan de woorden op alfabetische volgorde?', a: 'kasteel – keizer – kist – koning', w: ['keizer – kasteel – kist – koning', 'kasteel – kist – keizer – koning', 'koning – kist – keizer – kasteel'], u: 'Kijk naar de 2e letter: a – e – i – o.'
  }
];
