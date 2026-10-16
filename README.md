# Vojtěch & Simona · svatební web

Jednostránkový svatební web s formulářem pro potvrzení účasti, který každého hosta (včetně stravovacích omezení a alergií) zapíše do Google Tabulky. Čisté HTML, CSS a JavaScript: žádný build, žádné závislosti, připraveno pro Cloudflare.

Jména a místa jsou skutečná (obřad v kapli sv. Anny v Horním Údolí u Zlatých Hor, hostina v restauraci Kovárna v Horní Lipové). Datum, časy programu a termín odpovědi jsou zatím **ukázkové**. Viz [Přizpůsobení](#přizpůsobení).

```
public/                      vše, co se nasazuje
  index.html                 hlavní strana: oznámení, náš den, odpovědní lístek
  program/index.html         program svatby
  doprava/index.html         místo, doprava, ubytování
  dotazy/index.html          dobré vědět (časté dotazy)
  404.html                   stránka pro neexistující adresu
  assets/css/styles.css      design (barvy, písma, zaoblení) na začátku souboru
  assets/js/config.js        sem patří adresa pro odesílání odpovědí
  assets/js/main.js          odpočet, menu, galerie, logika formuláře
  assets/img/                fotky (Wikimedia Commons, licence CC, autoři v .json a na webu)
  assets/fonts/              vlastní hosting písem Bodoni Moda + Atkinson Hyperlegible Next
  assets/img/texture/        textura papíru a obálky (generovaná, viz poznámky)
  assets/vojtech-simona-svatba.ics   soubor pro "Přidat do kalendáře"
  _headers                   bezpečnostní hlavičky a cache pro Cloudflare
apps-script/Code.gs          Google Apps Script, který přijímá odpovědi
wrangler.jsonc               nastavení Cloudflare Workers (statické soubory)
```

## Spuštění na počítači

Stačí jakýkoli statický server, například:

```bash
npx serve public
# nebo
python -m http.server 8080 --directory public
```

Dokud nevyplníte adresu pro odesílání, formulář běží v **ukázkovém režimu**: vše zkontroluje, zobrazí poděkování (s poznámkou „ukázkový režim“) a data vypíše do konzole prohlížeče.

## Propojení formuláře s Google Tabulkami

1. Otevřete svou tabulku: https://docs.google.com/spreadsheets/d/1WrF2YSgkZgrkZVT27Fm5Trc4ZuIZhV2wE8zL6bHYLLQ/edit (její ID je už v `Code.gs` jako `SPREADSHEET_ID`; pro jinou tabulku ho tam přepište).
2. V tabulce otevřete **Rozšíření → Apps Script**. Smažte ukázkový kód, vložte obsah `apps-script/Code.gs` a uložte.
3. V nabídce funkcí vyberte **`setup`** a klikněte na **Spustit**. Potvrďte oprávnění (je to váš vlastní skript). Vzniknou dva listy:
   - **Odpovědi**: jeden řádek na hosta: jméno, věk, stravovací omezení, poznámky k alergiím, dny (pátek s přespáním, sobota, neděle s přespáním), písnička, vzkaz.
   - **Přehled**: živé součty (kolik hostů dorazí, dospělí/děti, kdo nedorazí, počty hostů na jednotlivé dny a na každé stravovací omezení).
4. **Nasadit → Nové nasazení →** typ **Webová aplikace**
   - *Spustit jako:* **Já**
   - *Kdo má přístup:* **Kdokoli**
5. Zkopírujte **adresu webové aplikace** (končí na `/exec`) do `public/assets/js/config.js`:
   ```js
   rsvpEndpoint: "https://script.google.com/macros/s/AKfy.../exec",
   ```
6. Vyzkoušejte: otevřete adresu `/exec` v prohlížeči, měli byste vidět `{"ok":true,"service":"wedding-rsvp"}`. Pak odešlete formulář na webu a sledujte, jak se v tabulce objeví řádek.

**Upravujete `Code.gs` později?** Použijte **Nasadit → Spravovat nasazení → Upravit → Verze: Nová verze**. Adresa zůstane stejná. *Nové nasazení* by vytvořilo novou adresu, kterou byste museli znovu vložit.

**E-mail při každé odpovědi (volitelné):** vyplňte `NOTIFY_EMAIL` na začátku `Code.gs`, znovu spusťte `setup` (kvůli oprávnění) a nasaďte novou verzi.

**Duplicitní odpovědi:** když domácnost odpoví dvakrát, zůstanou obě (každá má *ID odpovědi* a čas). Seřaďte podle sloupce *Odesláno* a u každého e-mailu použijte nejnovější.

### Ochrana

- Kontrola na webu i na serveru (skript povolí jen známé dny, stravovací omezení a věkové skupiny a omezuje délku textu i počet hostů).
- Skryté pole (past na roboty) tiše zahodí jednoduchý spam.
- Text začínající `=`, `+`, `-` nebo `@` se upraví, aby nikdo nemohl do tabulky vložit vzorec.
- Data se posílají jako `text/plain`, takže prohlížeč nepotřebuje CORS preflight (Apps Script ho neumí obsloužit).

## Nasazení na Cloudflare

Web tvoří jen složka `public/`. Dvě možnosti:

**Cloudflare Pages (nejjednodušší, přes Git)**
1. Nahrajte repozitář na GitHub nebo GitLab.
2. Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → vyberte repozitář.
3. Framework preset: **None**. Build command: *(nechte prázdné)*. Build output directory: **`public`**.
4. Nasaďte. Vlastní doménu přidáte v **Custom domains**.

**Cloudflare Workers (statické soubory)**
```bash
npx wrangler deploy
```
`wrangler.jsonc` už ukazuje na `./public`. Repozitář můžete připojit i přes **Workers & Pages → Create → Import a repository** (build command nechte prázdný).

Obě varianty načtou `public/_headers`, který nastavuje bezpečnostní hlavičky (včetně Content Security Policy, která povoluje jen adresy Google Apps Script) a cache.

> Pokud upravíte inline `<script>` v `<head>` souboru `index.html`, aktualizujte jeho hash `sha256-...` v `_headers`, jinak ho prohlížeč zablokuje.

### Soukromí

Stránka je nastavená jako `noindex` (meta značka, hlavička `X-Robots-Tag` a `robots.txt`), aby se neobjevovala ve vyhledávání. Pokud ji chcete mít ve vyhledávačích, všechny tři smažte.

## Přizpůsobení

| Co | Kde |
|---|---|
| Jména, datum, náš den, odpovědní lístek | `public/index.html` |
| Program svatby | `public/program/index.html` |
| Místo, doprava, ubytování | `public/doprava/index.html` |
| Časté dotazy | `public/dotazy/index.html` |
| Odkazy v menu | lišta `<header class="bar">` ve všech čtyřech stránkách (+ `404.html`) |
| Pozvánka do kalendáře | `public/assets/vojtech-simona-svatba.ics` (časy v UTC) |
| Kontaktní e-mail | patička všech stránek, `dotazy/index.html` + `config.js` |
| Termín pro odpověď | `index.html` (přední strana + úvod odpovědního lístku) |
| Dny na výběr (pátek / sobota / neděle) | volby v `index.html` **a** `EVENT_OPTIONS` v `Code.gs` |
| Stravovací omezení | volby v `#guest-template` **a** `DIETARY_OPTIONS` v `Code.gs` |
| Max. hostů na odpověď | `maxGuests` v `config.js` **a** `MAX_GUESTS` v `Code.gs` |
| Barvy, písma, zaoblení | proměnné na začátku `styles.css` (světlý i tmavý režim) |
| Náhledový obrázek pro sdílení | `public/assets/img/og.jpg` (1200 × 630) |

**Fotky:** nahraďte soubory v `public/assets/img/` vlastními se stejnými názvy (nebo upravte `src`/`srcset` v `index.html`). Dvě fotky v sekci Náš den se ořezávají na 4:5, fotka kaple na stránce Doprava na 12:7. Exportujte do WebP ve dvou velikostech (`-800` a `-1600`, kaple `-1200` a `-2400`). Současné fotky jsou z Wikimedia Commons pod licencemi CC BY-SA 4.0 a CC BY 3.0: autor a odkaz jsou v souboru `.json` vedle každé fotky a licence vyžaduje, aby zůstal uvedený i na webu (řádek `.credits`). Když fotku nahradíte vlastní, řádek s autorem smažte.

## Poznámky k designu

Web je **svatební oznámení**: jedna dlouhá skládaná karta (leporelo) na zelené obálce, s perforovaným odpovědním lístkem na konci.

- **Přední strana:** slepotiskový monogram, jména jako rytina, klasická formulace „si dovolují oznámit“, datum a místo v proložených verzálkách. Pod perforací je hned otázka „Přijedete?“ se dvěma zaškrtávacími políčky, která rovnou začnou odpověď.
- **Barvy:** jedna barva tisku (rozmarýnově zelená) na bavlněném papíře, obálka ve stejné zelené. Chyby jsou jediné místo s červenou. V tmavém režimu zůstává karta papírem, jen ztlumeným.
- **Písmo:** Bodoni Moda (rytý didot, jako na tištěných oznámeních) pro nadpisy a jména; Atkinson Hyperlegible Next (navržené pro slabozraké) pro text a formulář, aby ho pohodlně přečetli i prarodiče. Obě včetně české diakritiky.
- **Detaily papíru:** přehyby mezi částmi, fotky vlepené do rožků, program s tečkovanými vodítky, vložená kartička s rezervačním kódem.
- **Formulář:** vypadá jako tištěný odpovědní lístek: zaškrtávací políčka a řádky k vyplnění, velké plochy pro dotek.
- **Pohyb:** krátké, rychlé reakce na stisk a zaškrtnutí; jediný větší okamžik je odtržení lístku po odeslání a razítko „Odesláno“ s datem. Při „omezit pohyb“ se vše změní na jemné prolnutí.
- **Textury:** papír i obálka jsou rastrové PNG vytvořené skriptem (vlákna bavlny), ne filtry v CSS.
- **Figma:** https://www.figma.com/design/lkH866cF5HGpdd8iArJ9fX
