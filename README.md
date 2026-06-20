# Online objednavaci system

Objednavacia aplikacia pre zakaznikov a administratora. Produkcne data uklada do PostgreSQL databazy (odporucany Neon) a aplikacia moze bezat na Renderi.

## Projektova dokumentacia

- `README.md` - stabilny popis projektu, instalacia a prevadzka
- `PROJECT_STATE.md` - aktualny technicky a prevadzkovy stav
- `CHANGELOG.md` - historia dokoncenych zmien
- `TODO.md` - prioritizovany plan dalsieho vyvoja

Pri kazdej vyznamnej zmene treba v rovnakom commite aktualizovat prislusne zaznamy v `PROJECT_STATE.md`, `CHANGELOG.md` a `TODO.md`. Tieto subory su zdrojom kontextu pre dalsiu pracu.

## Poziadavky

- Node.js 22 alebo novsi
- PostgreSQL databaza
- pnpm

## Premenne prostredia

Podla `.env.example` nastavte najma:

- `DATABASE_URL` - PostgreSQL connection string z Neonu
- `ADMIN_PASSWORD` - pociatocne heslo administratora, minimalne 10 znakov
- `ADMIN_USERNAME`, `ADMIN_EMAIL`, `OWNER_EMAIL`, `COMPANY_NAME`
- `NODE_ENV=production` - zapne bezpecny session cookie cez HTTPS

`ADMIN_PASSWORD` vytvori prveho administratora a pri dalsom starte bezpecne zosynchronizuje jeho heslo. Zmena tejto premennej na Renderi preto sluzi aj na rotaciu hesla. Heslo sa uklada ako scrypt hash, nie v citatelnom tvare.

## Lokalny start

```powershell
pnpm install
$env:DATABASE_URL="postgresql://..."
$env:ADMIN_PASSWORD="dlhe-jedinecne-heslo"
pnpm start
```

Aplikacia bude dostupna na `http://localhost:3000`.

## Informacie pre zakaznikov

Administrator moze v sekcii `Obsah pre zakaznikov` zverejnovat texty, obrazky a ine prilohy. Podporovane su bezne obrazky, PDF, DOCX, XLSX, CSV a dalsie typy suborov. Overene obrazky sa zakaznikom zobrazia ako male nahlady; kazdu prilohu je mozne stiahnut v povodnej kvalite.

Jedna priloha moze mat najviac 30 MB. K jednej informacii je mozne vlozit najviac 10 priloh s celkovou velkostou do 100 MB. Prilohy su ulozene v PostgreSQL databaze a stiahnut ich moze iba prihlaseny pouzivatel, ktory ma pristup k danej informacii.

## Prenos existujucej SQLite databazy do Neonu

Migracia cielovu PostgreSQL databazu vymaze a nahradi obsahom `data/app.sqlite`. Pred spustenim preto skontrolujte `DATABASE_URL`.

```powershell
$env:DATABASE_URL="postgresql://...neon.tech/...?..."
pnpm run migrate:neon -- --confirm
```

Migracia prenesie nastavenia, pouzivatelov, tovary, objednavky a polozky objednavok. Povodne hesla pri prenose automaticky zahashuje.

## Render

Repozitar obsahuje `render.yaml`. V nastaveniach Renderu pridajte tajne premenne:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_EMAIL`
- `OWNER_EMAIL`
- `COMPANY_NAME`

Build command je `pnpm install --frozen-lockfile`, start command `pnpm start` a kontrolna adresa `/api/health`.

## Kontroly

```powershell
pnpm run check
pnpm test
```

## Poznamka k e-mailom

Administrator nastavi e-mailovu sluzbu priamo v sekcii `Nastavenia`. Odporucane Brevo API komunikuje cez HTTPS a funguje aj na bezplatnom Renderi. Alternativne je mozne pouzit SMTP na hostingu, ktory neblokuje e-mailove porty. Tlacidlo `Overit sluzbu` skontroluje ulozene nastavenie pred jeho pouzitim.

Po zapnuti odosielania sa nova objednavka odosle zakaznikovi aj na firemny e-mail. Ku kazdej sprave sa automaticky prilozi PDF objednavky s udajmi zakaznika, polozkami, hmotnostou a cenou. Brevo API kluc ani heslo SMTP sa z API nikdy neposielaju spat do prehliadaca; prazdne tajne pole pri neskorsej uprave ponecha povodnu ulozenu hodnotu.
