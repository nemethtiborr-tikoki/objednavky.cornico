# Online objednavaci system

Jednoduchy prototyp objednavacieho systemu tovaru pre zakaznikov a administratora.

## Spustenie

Ak mate v systeme nainstalovany Node.js:

```powershell
npm start
```

Ak Node.js nie je v systeme nainstalovany, v prostredi Codexu funguje prilozeny runtime:

```powershell
& 'C:\Users\referent.CORNICO\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.js
```

Potom otvorte:

```text
http://localhost:3000
```

## Databaza

System pouziva SQLite databazu v subore:

```text
data/app.sqlite
```

Pri prvom spusteni sa existujuce data z povodneho suboru `data/db.json` automaticky prenesu do SQLite. Subor `data/db.json` potom ostava len ako povodna zaloha/migracny zdroj; nove zmeny sa zapisuju do `data/app.sqlite`.

## Demo ucty

- Zakaznik: `zakaznik` / `zakaznik123`
- Administrator: `admin` / `admin123`

## Co system obsahuje

- prihlasenie zakaznika a administratora
- objednavkovy formular so zoznamom aktivneho tovaru
- mnozstva v celych kusoch a poznamka k objednavke
- vypocet celkovej hmotnosti objednavky
- historia objednavok pre zakaznika
- zakaznicky profil s firemnymi udajmi, telefonom, menom objednavajuceho a nazvom prevadzky
- administracia tovarovych poloziek
- filter a radenie zoznamu tovarovych poloziek podla stlpcov
- import tovarovych poloziek z CSV s kontrolou duplicit a moznostou prepisu
- administracia zakaznikov
- historia objednavok pre administratora
- uvodny admin prehlad so sumarom novych objednavok
- zoznam objednavok v administracii s otvorenim detailu objednavky
- rozbalitelny filter objednavok podla udajov v objednavke
- radenie zoznamu objednavok podla stlpcov
- uprava stavu, poznamky a mnozstiev v objednavke s moznostou zrusit neulozene upravy a zatvorit detail
- tlac objednavky z administracie
- zapis simulovanych e-mailov do suboru `data/emails.log`

## Tovarova polozka

Kazda polozka obsahuje:

- cislo karty
- nazov
- mernu jednotku
- hmotnost
- cenu
- aktivitu polozky

## Import tovaru z CSV

V administracii v casti `Tovarove polozky` je mozne importovat CSV subor. Podporovane hlavicky:

```csv
cislo karty;nazov;merna jednotka;hmotnost;cena;aktivna
1001;Hladka muka special;kg;1;0,89;ano
```

Duplicitne polozky sa kontroluju podla `cislo karty`. Pri importe si administrator vyberie, ci existujuce polozky preskocit alebo prepisat.

## Zakaznicky profil

Zakaznik si vie upravit:

- firemny nazov
- ICO
- DIC
- IC DPH
- telefonne cislo
- meno objednavajuceho
- nazov prevadzky
- adresu

Administrator vie v casti `Zakaznici` vytvarat novych zakaznikov, upravovat ich udaje a vymazat zakaznicke ucty.

## Stavy objednavky

Nova objednavka automaticky dostane stav `nova objednavka`. Administrator ju potom vie zmenit na:

- spracovava sa
- vybavena

## Poznamka k e-mailom

Tento prototyp zatial neodosiela skutocny e-mail cez SMTP server. Pri vytvoreni objednavky zapise obsah e-mailu pre zakaznika aj administratora do `data/emails.log`. Na realne odosielanie bude potrebne doplnit SMTP udaje vasej e-mailovej schranky alebo firemneho mail servera.
