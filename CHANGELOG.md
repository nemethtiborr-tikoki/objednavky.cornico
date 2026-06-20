# Historia zmien

Tento subor zaznamenava dokoncene funkcne a technicke zmeny. Projekt zatial nepouziva cislovane vydania; zmeny su zoskupene podla datumu a vetvy `main`.

## 2026-06-20

- Logo v hlavicke funguje ako navrat na uvodnu obrazovku podla roly pouzivatela (`51dad41`).
- Zaviedla sa trvala projektova dokumentacia: `PROJECT_STATE.md`, `CHANGELOG.md` a `TODO.md`.
- Lokalne sa nastavil `post-commit` hook pre automaticky push na GitHub; hook nie je verzovany.
- Git remote sa aktualizoval na repozitar `objednavky.cornico`.

## 2026-06-19

- Pridane informacie pre zakaznikov a administracna sprava obsahu (`3bca8cf`).
- Pridane prilohy k informaciam, pristupove kontroly a limity uploadu (`be41820`).
- Objednavka sa generuje ako PDF s lokalnymi fontmi a portretnym rozlozenim (`31e888f`).
- PDF objednavky sa priklada k e-mailom (`de74eb5`).
- Zakaznik vidi priebeznu cenu a hmotnost objednavky (`cce7f67`).
- Pridane odosielanie cez Brevo HTTPS API (`ab5a054`).
- Pridane SMTP nastavenia, test spojenia a odosielanie objednavok (`5d56dcb`).
- Zlepsene hlasenia SMTP chyb a validacia Gmail portov/TLS (`698fc3e`, `9b9c3b3`).
- Produkcna databaza sa migrovala zo SQLite na Neon PostgreSQL (`b8b053a`).
- Hesla sa ukladaju ako scrypt hash a relacie v PostgreSQL; administrator moze rotovat heslo cez `ADMIN_PASSWORD` (`9d5cf3a`).
- Pridana konfiguracia Renderu, migracny skript a zakladne automaticke testy.

## 2026-06-18

- Pridany CSV export produktov (`ae637bf`).
- Staticky server podporuje PNG a JPEG subory (`b0017b4`).
- Povodny JSON datastore bol nahradeny SQLite databazou (`2342e24`); neskor bol produkcne nahradeny PostgreSQL.

## Starsie zaklady

- Vytvorena objednavacia aplikacia s rolami administrator a zakaznik.
- Pridana sprava produktov, zakaznikov, profilov a objednavok.
- Pridane filtre, radenie, tlac a CSV import produktov.
