# Aktualny stav projektu

Aktualizovane: 2026-06-20

## Produkcny stav

- Aplikacia je nasadena ako Render Web Service.
- Produkcne data su v PostgreSQL databaze Neon.
- Zdrojovy repozitar: `https://github.com/nemethtiborr-tikoki/objednavky.cornico.git`.
- Produkcna URL je spravovana v Render Dashboarde; kontrolny endpoint je `/api/health`.
- Vetva nasadenia je `main`.
- Lokalne je nastaveny Git `post-commit` hook, ktory po commite automaticky vykona push aktualnej vetvy na `origin`.
- Hook plati iba pre tento lokalny klon a tento pocitac; nie je sucastou repozitara.

## Architektura

- Backend: Node.js, nativny HTTP server v `server.js`.
- Databazova vrstva: PostgreSQL cez `pg` v `database.js`.
- Frontend: HTML, CSS a vanilla JavaScript v adresari `public/`.
- Autentifikacia: scrypt hash hesiel, nahodne session tokeny, ich SHA-256 odtlacky v databaze a `HttpOnly` cookie.
- Produkcne HTTPS ukoncuje Render; pri `NODE_ENV=production` ma session cookie priznak `Secure`.
- PDF objednavky generuje `order-pdf.js`.
- E-maily zabezpecuje `email.js` cez Brevo HTTPS API alebo SMTP.

## Implementovane funkcie

- Prihlasenie administratora a zakaznikov, sedemdnovove databazove relacie.
- Sprava zakaznikov a ich firemnych/profilovych udajov.
- Sprava produktov, CSV import a export, aktivne/neaktivne polozky.
- Vytvorenie objednavky, priebezne sumy, historia a administracne spracovanie.
- Stavy objednavky: nova, spracovava sa, vybavena.
- PDF objednavka vhodna na tlac a automaticka PDF priloha e-mailu.
- E-mail zakaznikovi a firme cez Brevo alebo SMTP, vratane overenia nastavenia.
- Informacie pre zakaznikov s textom a prilohami.
- Prilohy informacii v PostgreSQL; najviac 10 suborov, 30 MB/subor a 100 MB spolu.
- Admin prehlad, filtre a radenie objednavok a produktov.
- Kliknutie na logo vracia administratora alebo zakaznika na jeho uvodnu obrazovku.

## Databazove tabulky

- `settings`
- `users`
- `products`
- `orders`
- `order_items`
- `sessions`
- `order_counters`
- `announcements`
- `announcement_attachments`

Povodna SQLite databaza v `data/app.sqlite` je iba lokalny migracny zdroj a nie je verzovana v Gite.

## Konfiguracia

Povinne produkcne premenne v Renderi:

- `DATABASE_URL`
- `NODE_ENV=production`
- `ADMIN_PASSWORD`

Dalsie podporovane premenne:

- `ADMIN_USERNAME`
- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `OWNER_EMAIL`
- `COMPANY_NAME`

Tajne hodnoty sa nesmu zapisat do Git repozitara ani do tychto dokumentov.

## Overenie

- `pnpm run check` kontroluje syntax hlavnych suborov.
- `pnpm test` spusta testy autentifikacie, e-mailov a PDF.
- Posledna znama kontrola: 2026-06-20, 11 testov preslo.
- Produkcny health endpoint po migracii na PostgreSQL vratil HTTP 200 a `{"ok":true}`.

## Zname obmedzenia a rizika

- Bezplatny Render moze sluzbu uspat; prva poziadavka po necinnosti moze byt pomala.
- E-mailove heslo alebo Brevo API kluc su aktualne ulozene v databazovych nastaveniach bez aplikacneho sifrovania; pristup k Neonu preto musi byt prisne chraneny.
- Prilohy su ulozene priamo v PostgreSQL a spotrebuvavaju databazovy priestor.
- Nie je zavedena automaticka produkcna zaloha ani pravidelny test obnovy.
- Integracia s MRP K/S este nie je implementovana.
- Presny importny format MRP K/S zavisi od instalovanej verzie a dostupnych modulov.

## Pravidlo aktualizacie

Po kazdej vyznamnej zmene:

1. Aktualizovat datum a dotknute casti v tomto subore.
2. Zapisat dokoncenu zmenu do `CHANGELOG.md`.
3. Odstranit alebo upravit splnenu polozku v `TODO.md`.
4. Spustit kontroly a zaznamenat nove zname obmedzenia.
