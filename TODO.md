# Plan dalsieho vyvoja

Aktualizovane: 2026-06-20

## P0 - Pred dalsim rozsirenim produkcie

- [ ] Zaviest pravidelne zalohy Neon databazy a zdokumentovat/testovat obnovu.
- [ ] Zasifrovat Brevo API kluc a SMTP heslo v databaze pomocou tajneho kluca ulozeneho iba v Render Environment.
- [ ] Overit limity bezplatneho Neon planu pre databazu a prilohy; pri vacsom objeme presunut prilohy do objektoveho uloziska.
- [ ] Pridat produkcny monitoring chyb a upozornenie pri zlyhani e-mailu.

## P1 - Integracia MRP K/S

- [ ] Zistit presnu verziu MRP K/S, licencovane moduly a umiestnenie instalacie.
- [ ] Ziskat ukazku alebo oficialnu specifikaciu importu prijatych objednavok z pouzivanej verzie MRP.
- [ ] Potvrdit, ci sa zakaznik mapuje podla ICO alebo interneho MRP kodu.
- [ ] Potvrdit, ci `cardNumber` produktu presne zodpoveda kodu skladovej karty MRP.
- [ ] Doplnit produktom sadzbu DPH a podla potreby MRP kod, sklad a stredisko.
- [ ] Doplnit zakaznikom volitelny interny MRP kod.
- [ ] Doplnit objednavkam stav prenosu, datum, MRP cislo dokladu, chybovu spravu a pocet pokusov.
- [ ] Implementovat najprv rucny CSV/XML export do podporovaneho formatu MRP.
- [ ] Otestovat import na kopii/testovacej firme v MRP a overit ceny, DPH, zaokruhlenie a duplicity.
- [ ] Az po overeni rucneho toku vytvorit lokalny Windows konektor, ktory bude nacitavat cakajuce objednavky cez HTTPS a odovzdavat vysledok aplikacii.
- [ ] Nezapisovat priamo do internych tabuliek databazy MRP bez oficialne podporovaneho rozhrania.

## P2 - Kvalita a prevadzka

- [ ] Pridat integracne testy databazovych operacii proti testovaciemu PostgreSQL.
- [ ] Pridat end-to-end test hlavneho toku: prihlasenie, objednavka, e-mail a PDF.
- [ ] Pripnut produkcnu verziu Node.js na podporovanu LTS vetvu namiesto rozsahu `>=22`.
- [ ] Zjednotit build prikazy Renderu a `render.yaml`, aby nove sluzby nepouzili Yarn omylom.
- [ ] Pridat administracnu zmenu hesla a obnovu zabudnuteho hesla.
- [ ] Pridat audit log administracnych zmien a exportov.

## P3 - Funkcne napady

- [ ] Zvazit synchronizaciu stavov objednavok z MRP spat do aplikacie.
- [ ] Zvazit automaticku synchronizaciu skladovych kariet a cien z MRP.
- [ ] Doriesit vlastnu domenu/subdomenu a dokumentovat jej DNS nastavenie.
