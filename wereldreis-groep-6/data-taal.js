/* =========================================================
   Wereldreis groep 6 – TAALVERZORGING (spelling, leestekens, ontleden)
   Zelfde soort vragen als in Leerling in beeld (Cito) / IEP.
   ========================================================= */

/* --- 1. Welk woord is goed gespeld? ---
   'zin met * | goed | fout | fout | fout' */
const GOED_GESPELD = `
Water uit de douche komt in het * terecht.|riool|rieool|rijool|riejool
Diertjes in de bodem houden de grond *.|vruchtbaar|vrugtbaar|vruchbaar|vrugbaar
Olly * een gat in de muur.|boorde|borde|boorte|borte
Het * van de piramide duurde jaren.|bouwen|bauwen|bouwwen|bouen
De ridder reed op een * paard.|zwart|swart|zwarrt|zwardt
In het museum ligt een echte *.|mummie|mumie|mummi|mummiee
Mijn opa vertelt graag over de *.|oorlog|oorloch|orlog|oorlogh
De astronaut stapte in de *.|capsule|kapsule|capsuul|kapsuul
In de winter is het in Noorwegen lang *.|donker|donkker|dongker|donkerr
Het vliegtuig maakte een zachte *.|landing|lannding|landink|landding
Mijn zus is heel * over haar tekening.|tevreden|teevreden|tevreeden|tefreden
De vlag wappert in de *.|wind|wint|windt|wiend
Het schip voer over de *.|oceaan|osiaan|oseaan|ocejaan
De Vikingen waren * zeevaarders.|dappere|dapere|dapperre|dappre
Ik heb een * ruimteschip van lego gebouwd.|gigantisch|gigantiesch|gigantis|gigantich
De * in de film was heel spannend.|muziek|musiek|muzik|muuziek
De koning zat op zijn gouden *.|troon|tron|trroon|throon
Er hangt een * aan de muur van de klas.|wereldkaart|wereltkaart|wereldkart|weerldkaart
De robot kan heel * rekenen.|snel|snell|snehl|snelt
Het noorderlicht is * mooi.|ontzettend|onzettend|ontsettend|ontzetend
We gingen met de * naar Parijs.|trein|trijn|treijn|trien
Hij kreeg een * voor zijn verjaardag.|horloge|horlogie|horlosje|orloge
De bouwers tilden de stenen op met een *.|katrol|kattrol|katrrol|catrol
Dat is een heel * verhaal.|vreemd|freemd|vreemt|vremd
Het * uit de vulkaan was gloeiend heet.|vuur|fuur|vuurr|vuhr
De ridders verdedigden hun *.|burcht|burgt|burch|burrcht
Mijn broer is heel * op zijn nieuwe fiets.|zuinig|zuinug|zuinich|zuinieg
Het was een * dag op het strand.|heerlijke|heerluke|herlijke|heerlijkke
De piraat zocht de verborgen *.|schat|sgat|schatt|schadt
Er staat een grote * op het dak.|antenne|antene|anttenne|antennne
De luchtballon steeg op in de *.|lucht|lugt|luch|luucht
Ik eet in de vakantie elke dag een *.|ijsje|eisje|ijssje|ijsjen
We maakten een lange * door het bos.|wandeling|wanndeling|wandelling|wandelink
Mijn vader werkt bij de *.|politie|polietie|politsie|pollitie
Welke * heeft de vlag van Italië?|kleuren|kleueren|kluren|kleurren
We hebben * een toets over Romeinen.|vandaag|vanndaag|fandaag|vandaach
Ik kreeg een * voor mijn spreekbeurt.|voldoende|foldoende|voldoene|voldoeende
In de bibliotheek staan duizenden *.|boeken|boekken|boecken|bouken
De * jongen won de quiz.|slimme|slime|slimmen|slimmme
De dinosaurussen leefden * jaren geleden.|miljoenen|mieljoenen|miljounen|miljoennen
De reus had enorme *.|voeten|foeten|voetten|vouten
Er vloog een * over de haven.|meeuw|meeuww|meuw|mieuw
Ik kreeg een * fiets voor mijn verjaardag.|nieuwe|niewe|nieuwwe|neuwe
Hij keek * naar de sterren.|nieuwsgierig|nieuwsgierich|niewsgierig|nieuwschierig
Het * vertrok precies om acht uur.|vliegtuig|vliechtuig|vliegtuich|vlietuig
De zon is eigenlijk een *.|ster|sterr|stur|stehr
Het schaap heeft een dikke *.|vacht|vagt|vach|fagt
Ik wil later * worden.|uitvinder|uitfinder|uitvindder|uidvinder
De keizer van Rome was heel *.|machtig|magtig|machtich|machtug
We gingen naar het * in Leiden.|museum|museeum|muzeum|musseum
In het * zag ik een acrobaat.|circus|sirkus|circkus|cirkus
De boer heeft een grote *.|boerderij|boerderei|boerdereij|boederij
Ik heb om vier uur een * met Sem.|afspraak|afsprak|afsbraak|afspraag
De kapitein stond aan het *.|roer|roerr|rour|roehr
Het harnas van de ridder was heel *.|zwaar|swaar|zwaarr|zwar
Het oude schip had drie *.|masten|massten|mastten|maasten
De maan draait om de *.|aarde|aarrde|arde|aardde
Je moet je fiets op * zetten.|slot|slott|sloot|slodt
Mijn oom woont in een * in Frankrijk.|dorp|dorrp|dorb|dorpp
De soldaten liepen in een lange *.|rij|rei|rhij|rijj
De astronaut droeg een wit *.|ruimtepak|ruimtebak|ruimdepak|ruimtepakk
Op de * van Japan staat een rode cirkel.|vlag|vlach|vlagh|flag
Het * van de computer is kapot.|toetsenbord|toetsenbort|toesenbord|toetsebord
Het * duurde de hele dag.|feest|veest|feeest|fesst
Achter de wolken * de zon.|schijnt|schijn|schijndt|scheint
We bekeken de planeten door een *.|telescoop|teleskoop|telescop|tellescoop
`.trim().split('\n').map(r => { const [zin, a, ...w] = r.split('|'); return { zin, a, w: [...new Set(w)].filter(x => x !== a) }; });

/* --- 2. Vul de juiste letter(s) in: 'woord met _ | letters' --- */
const LETTERS = `
o_eaan|c
_entrum|c
a_tronaut|s
pira_ide|m
ri_ier|v
ho_dstad|oo
bur_t|ch
koni_|ng
pl_neet|a
r_imte|ui
ra_et|k
zw_rd|aa
bi_liotheek|b
politi_|e
tr_n|ei
k_zer|ei
p_leis|a
l_cht|u
woest_n|ij
oorl_g|o
v_lkaan|u
compu_er|t
te_nologie|ch
sa_elliet|t
kom_t|ee
gl_tsjer|e
gev_cht|e
ve_tig|er
mach_ig|t
vri_ndelijk|e
gev_arlijk|a
hu_s|i
s_lim|l
ka_teel|s
_ircus|c
avon_uur|t
ontde_king|k
uitvi_der|n
nieuwsgier_g|i
vl_gtuig|ie
`.trim().split('\n').map(r => { const [woord, a] = r.split('|'); return { woord, a }; });

/* --- 3. Verkleinwoorden: 'zin met * | grondwoord | verkleinwoord' --- */
const VERKLEIN = `
Damian schrijft een * voor zijn oma.|rijm|rijmpje
In de tuin staat een klein *.|boom|boompje
Door het * zie je de maan.|raam|raampje
Op de vlag van Amerika staan vijftig *.|ster|sterretjes
Ik eet soep uit een *.|kom|kommetje
Ze draagt een gouden *.|ring|ringetje
De hond speelt met een *.|bal|balletje
Op de taart staat een *.|vlag|vlaggetje
Mijn broertje speelt met een *.|auto|autootje
Mijn * bakt de lekkerste koekjes.|oma|omaatje
Ik maak een * van de zonsondergang.|foto|fotootje
Ik stuur opa een * uit Egypte.|kaart|kaartje
Op de kermis kun je in een * zitten.|raket|raketje
Het * kwispelt met zijn staart.|hond|hondje
Ik lees een * over ridders.|boek|boekje
Er loopt een * door de tuin.|kip|kipje
Het smalle * loopt naar de rivier.|weg|weggetje
De prins woont in een klein *.|koning|koninkje
Er kronkelt een * door het gras.|slang|slangetje
Kijk, daar komt het * tevoorschijn!|zon|zonnetje
Er staat een groen * op het stoplicht.|man|mannetje
In het verhaal praat het * met de sterren.|maan|maantje
Op de computer kijken we een *.|film|filmpje
Mijn baby-zusje heeft een heel klein *.|arm|armpje
Ik pluk een * voor mijn moeder.|bloem|bloempje
Hij steekt zijn * op.|duim|duimpje
Mijn nichtje draagt een roze *.|rok|rokje
De pop zit op een *.|stoel|stoeltje
In de muur zit een klein *.|deur|deurtje
Ik eet een gekookt *.|ei|eitje
Er zwemt een * in de kom.|vis|visje
De vogels nemen een *.|bad|badje
Ik schrijf met een blauw *.|pen|pennetje
Het * vaart over de rivier.|schip|scheepje
Wil je een * water?|glas|glaasje
Door het bos loopt een smal *.|pad|paadje
De ridder had een klein *.|zwaard|zwaardje
Op het eiland staat een *.|huis|huisje
Ik krijg een * van mijn oma.|kus|kusje
De robot heeft een * op zijn hoofd.|lamp|lampje
`.trim().split('\n').map(r => { const [zin, grond, a] = r.split('|'); return { zin, grond, a }; });

/* --- 4a. Voltooid deelwoord: 'zin met * | hele werkwoord | vd | uitleg' --- */
const VD = `
De tomatenplanten zijn al flink *.|groeien|gegroeid|stam groei, eindigt niet op een kofschip-letter → d
Ik heb de hele dag *.|fietsen|gefietst|stam fiets eindigt op s (kofschip) → t
De Romeinen hebben hier een fort *.|bouwen|gebouwd|stam bouw → geen kofschip-letter → d
Wij hebben een raket *.|maken|gemaakt|stam maak eindigt op k (kofschip) → t
De astronauten zijn veilig *.|landen|geland|stam land eindigt al op d → geen extra d
Hij heeft lang met zijn opa *.|praten|gepraat|stam praat eindigt al op t → geen extra t
Wij zijn vorig jaar *.|verhuizen|verhuisd|stam verhuis (van verhuizen: z!) → d. Geen ge- want ver- staat er al
Je hebt het me *.|beloven|beloofd|stam beloof (van beloven: v!) → d
We hebben een uur op de trein *.|wachten|gewacht|stam wacht eindigt op t → geen extra t
Ik heb de fles goed *.|schudden|geschud|stam schud eindigt op d → geen extra d
Mama heeft koffie *.|zetten|gezet|stam zet eindigt op t → geen extra t
De dinosaurussen hebben miljoenen jaren geleden *.|leven|geleefd|stam leef (van leven: v!) → d
Wij hebben door heel Europa *.|reizen|gereisd|stam reis (van reizen: z!) → d
Iemand heeft op de deur *.|kloppen|geklopt|stam klop eindigt op p (kofschip) → t
Ik heb de foto's in mijn schrift *.|plakken|geplakt|stam plak eindigt op k (kofschip) → t
De bus is bij de halte *.|stoppen|gestopt|stam stop eindigt op p (kofschip) → t
Papa heeft de schuur blauw *.|verven|geverfd|stam verf (van verven: v!) → d
Het kasteel heeft dagenlang *.|branden|gebrand|stam brand eindigt op d → geen extra d
Heb je oma al *?|bellen|gebeld|stam bel → geen kofschip-letter → d
Ik heb de bus net *.|missen|gemist|stam mis eindigt op s (kofschip) → t
Columbus heeft Amerika niet als eerste *.|ontdekken|ontdekt|stam ontdek eindigt op k → t. Geen ge- want ont- staat er al
De ridders hebben het kasteel goed *.|verdedigen|verdedigd|stam verdedig → geen kofschip-letter → d
De Romeinen hebben veel landen *.|veroveren|veroverd|stam verover → d
Wij hebben de vulkaan *.|filmen|gefilmd|stam film → d
Het publiek heeft hard *.|juichen|gejuicht|stam juich eindigt op ch (kofschip) → t
Ik heb mijn tas *.|pakken|gepakt|stam pak eindigt op k → t
De les is al *.|beginnen|begonnen|dit is een sterk werkwoord: begonnen
Wij hebben een robot *.|programmeren|geprogrammeerd|stam programmeer → d
Zij heeft het hele boek *.|lezen|gelezen|sterk werkwoord: gelezen
De piraten hebben de schat *.|begraven|begraven|sterk werkwoord: begraven
Wie heeft de drukpers *?|uitvinden|uitgevonden|sterk werkwoord: uitgevonden
Het vliegtuig is net *.|opstijgen|opgestegen|sterk werkwoord: opgestegen
Hij heeft de bal over het hek *.|schoppen|geschopt|stam schop eindigt op p → t
Ik heb mijn kamer *.|opruimen|opgeruimd|stam ruim → d
We hebben samen een tent *.|opzetten|opgezet|stam zet eindigt op t → geen extra t
`.trim().split('\n').map(r => { const [zin, ww, a, u] = r.split('|'); return { zin, ww, a, u }; });

/* --- 4b. Tegenwoordige tijd: 'zin met * | hele werkwoord | goed | uitleg' --- */
const TT = `
Hij * elke dag naar school.|fietsen|fietst|hij → stam + t
Ik * elke dag naar school.|fietsen|fiets|ik → alleen de stam
De raket * op de maan.|landen|landt|de raket = hij → stam (land) + t
Ik * morgen op de maan.|landen|land|ik → alleen de stam
Jij * een mooie tekening.|maken|maakt|jij → stam + t
* jij ook een tekening?|maken|Maak|jij staat ACHTER het werkwoord → geen t
Zij * het antwoord niet.|vinden|vindt|zij (één persoon) → stam (vind) + t
Ik * het antwoord niet.|vinden|vind|ik → alleen de stam
Mijn broer * later astronaut.|worden|wordt|mijn broer = hij → stam (word) + t
* jij later astronaut?|worden|Word|jij staat achter het werkwoord → geen t
Wij * een kasteel van zand.|bouwen|bouwen|wij → hele werkwoord
De ridders * met zwaarden.|vechten|vechten|de ridders = zij (meer) → hele werkwoord
Opa * over vroeger.|vertellen|vertelt|opa = hij → stam + t
Het vliegtuig * boven de wolken.|vliegen|vliegt|het vliegtuig = het → stam + t
Jullie * heel hard.|lopen|lopen|jullie → hele werkwoord
Ik * je morgen.|bellen|bel|ik → alleen de stam
Waarom * jij zo hard?|lachen|lach|jij staat achter het werkwoord → geen t
Jij * heel hard.|lachen|lacht|jij → stam + t
De computer * heel snel.|rekenen|rekent|de computer = hij → stam + t
Het meisje * een brief aan haar oma.|schrijven|schrijft|het meisje = zij → stam + t
`.trim().split('\n').map(r => { const [zin, ww, a, u] = r.split('|'); return { zin, ww, a, u }; });

/* --- 5a. Welk leesteken hoort achter de zin? 'zin | teken' --- */
const LEESTEKEN = `
Vigo wil graag weten hoeveel die knikkers kosten|.
Hoeveel kost die raket|?
Pas op, er komt een auto aan|!
Weet jij hoe laat het is|?
Ik vraag me af wanneer de trein komt|.
Wat een prachtige vlag|!
Hij vroeg of ik mee wilde naar het museum|.
Ga je mee naar het museum|?
Help, de boot zinkt|!
Wie heeft de drukpers uitgevonden|?
Mama vraagt waar mijn jas is|.
Wanneer landde de eerste mens op de maan|?
De juf wil weten wie er jarig is|.
Hoera, we hebben gewonnen|!
Kun jij de hoofdstad van Japan noemen|?
Sem weet niet welke vlag bij Polen hoort|.
Wat is het noorderlicht mooi|!
Waarom is de lucht blauw|?
Ik weet niet waarom de lucht blauw is|.
Hoe heet de langste rivier van Afrika|?
`.trim().split('\n').map(r => { const [zin, a] = r.split('|'); return { zin, a }; });

/* --- 5b. Waar moet de punt? 'tekst zonder punt | woord waarachter de punt moet' --- */
const PUNT = `
Wekenlang werkt Sam al aan zijn werkstuk over de ruimte hij maakt zelfs een raket na.|ruimte
De Romeinen bouwden forten langs de Rijn daar hielden soldaten de wacht.|Rijn
Oliver kijkt naar de sterren hij ziet een vallende ster.|sterren
In Noorwegen is het in de winter lang donker soms zie je dan het noorderlicht.|donker
De ridder trok zijn zwaard de draak vluchtte het bos in.|zwaard
Mijn opa komt uit Indonesië hij vertelt vaak over de vulkanen daar.|Indonesië
De trein vertrekt om acht uur we moeten dus op tijd zijn.|uur
Gutenberg vond de drukpers uit daardoor werden boeken goedkoper.|uit
Lisa bouwt een robot van lego de robot kan zelfs lopen.|lego
Het vliegtuig landde op Schiphol alle passagiers klapten.|Schiphol
De piramides zijn heel oud ze zijn meer dan 4000 jaar geleden gebouwd.|oud
Op de maan is geen lucht astronauten dragen daarom een ruimtepak.|lucht
`.trim().split('\n').map(r => { const [tekst, a] = r.split('|'); return { tekst, a }; });

/* --- 5c. Hoofdletters: 'zin (kleine letters) | woord dat óók een hoofdletter krijgt | uitleg' --- */
const HOOFD = `
Volgende week gaan we op vakantie naar frankrijk.|frankrijk|namen van landen krijgen een hoofdletter
Mijn beste vriend heet daan.|daan|namen van personen krijgen een hoofdletter
De eiffeltoren staat in parijs.|parijs|namen van steden krijgen een hoofdletter (en Eiffeltoren ook!)
Op dinsdag hebben we gym bij meester ahmed.|ahmed|namen van personen wel, dagen van de week NIET
In de zomer zwemmen we in de noordzee.|noordzee|namen van zeeën krijgen een hoofdletter
Neil armstrong liep als eerste op de maan.|armstrong|achternamen krijgen ook een hoofdletter
Mijn oma spreekt vloeiend duits.|duits|talen krijgen een hoofdletter
De langste rivier van afrika is de Nijl.|afrika|werelddelen krijgen een hoofdletter
In maart gaan we naar het museum in amsterdam.|amsterdam|steden wel, maanden NIET
Onze hond heet max en hij is drie jaar.|max|namen van dieren krijgen een hoofdletter
De Romeinen kwamen uit italië.|italië|namen van landen krijgen een hoofdletter
Het schip van columbus heette de Santa Maria.|columbus|namen van personen krijgen een hoofdletter
`.trim().split('\n').map(r => { const [zin, a, u] = r.split('|'); return { zin, a, u }; });

/* --- 6a. Persoonsvorm: 'stuk|*pv|stuk|stuk' --- */
const PV = `
Liam|*moet|het konijnenhok|schoonmaken
De astronaut|*zweeft|door|het ruimtestation
Morgen|*gaan|wij|naar het museum
De Romeinen|*bouwden|een fort|aan de Rijn
*Heb|jij|de vlag van Brazilië|gezien
Mijn opa|*vertelde|een spannend verhaal|over de oorlog
In de winter|*is|het|lang donker in Noorwegen
De ridders|*hebben|het kasteel|verdedigd
*Wil|jij|een robot|bouwen
Het vliegtuig|*landt|om drie uur|op Schiphol
Gisteren|*keken|we|naar de sterren
Sanne|*kan|heel goed|tekenen
De piramides|*zijn|heel lang geleden|gebouwd
Volgende week|*houdt|Bram|zijn spreekbeurt
Waarom|*schijnt|de zon|niet
De trein|*vertrekt|over vijf minuten|naar Utrecht
`.trim().split('\n').map(r => { const delen = r.split('|'); return { delen: delen.map(d => d.replace('*', '')), a: delen.find(d => d.startsWith('*')).slice(1) }; });

/* --- 6b. Onderwerp: 'stuk|*onderwerp|stuk' --- */
const OW = `
*De astronaut|zweeft|door het ruimtestation
Morgen|gaan|*wij|naar het museum
*Mijn opa|vertelde|een verhaal
Op de maan|staat|*een vlag
*De ridders|verdedigden|het kasteel
Gisteren|zag|*Oliver|een vallende ster
*Het vliegtuig|landt|op Schiphol
In Noorwegen|groeien|*veel bomen
*De Vikingen|voeren|over de zee
Heeft|*de juf|de toetsen|nagekeken
`.trim().split('\n').map(r => { const delen = r.split('|'); return { delen: delen.map(d => d.replace('*', '')), a: delen.find(d => d.startsWith('*')).slice(1) }; });
