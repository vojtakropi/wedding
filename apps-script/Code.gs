/**
 * Příjem odpovědí z formuláře na svatebním webu.
 *
 * Nastavení (5 minut, podrobně v README.md):
 *   1. Vytvořte novou Google Tabulku a otevřete Rozšíření > Apps Script.
 *   2. Nahraďte výchozí kód tímto souborem a uložte.
 *   3. Jednou spusťte funkci `setup` (a povolte přístup, až se zeptá).
 *   4. Nasadit > Nové nasazení > Webová aplikace
 *        Spustit jako: Já
 *        Kdo má přístup: Kdokoli
 *   5. Zkopírujte adresu končící na /exec do public/assets/js/config.js (rsvpEndpoint).
 *
 * Každý host má vlastní řádek, takže kuchyně může stravovací omezení
 * rovnou filtrovat a sčítat. List "Přehled" počítá součty automaticky.
 */

// Tabulka, kam se odpovědi zapisují (ID z adresy docs.google.com/spreadsheets/d/<ID>/edit).
// Díky tomu funguje skript vložený přímo do tabulky i samostatný projekt Apps Script.
const SPREADSHEET_ID = '1WrF2YSgkZgrkZVT27Fm5Trc4ZuIZhV2wE8zL6bHYLLQ';

const SHEET_NAME = 'Odpovědi';
const SUMMARY_NAME = 'Přehled';

// Volitelné: e-mail při každé nové odpovědi. Prázdné = vypnuto.
const NOTIFY_EMAIL = '';

const HEADERS = [
  'Odesláno',
  'ID odpovědi',
  'Kontaktní osoba',
  'E-mail',
  'Účast',
  'Části víkendu',
  'Host č.',
  'Jméno hosta',
  'Věk',
  'Stravovací omezení',
  'Alergie / poznámky',
  'Písnička',
  'Vzkaz',
];

// Musí odpovídat volbám v public/index.html (#guest-template a výběr částí víkendu).
const DIETARY_OPTIONS = [
  'Vegetariánská', 'Veganská', 'Pescetariánská', 'Bez lepku', 'Bez laktózy',
  'Alergie na ořechy', 'Alergie na korýše', 'Halal', 'Košer',
];
const EVENT_OPTIONS = ['Páteční aperitivo', 'Sobotní svatba', 'Nedělní brunch'];
const AGE_OPTIONS = ['Dospělý', 'Dítě (do 12 let)'];
const MAX_GUESTS = 6;

/** Kontrola: otevřete adresu /exec v prohlížeči a uvidíte {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'wedding-rsvp' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (err) {
    return json_({ ok: false, error: 'Server je vytížený, zkuste to prosím za chvíli.' });
  }

  try {
    const data = parse_(e);

    // Past na roboty: člověk toto pole nikdy nevyplní. Robotům předstíráme úspěch.
    if (data.website) return json_({ ok: true });

    const clean = validate_(data);
    const sheet = getSheet_();
    const now = new Date();
    const replyId = Utilities.getUuid().slice(0, 8).toUpperCase();
    const events = clean.events.join(', ');

    let rows;
    if (clean.attending === 'Ano') {
      rows = clean.guests.map((g, i) => [
        now, replyId, clean.name, clean.email, 'Ano', events,
        i + 1, g.name, g.age, g.dietary.join(', '), g.notes,
        i === 0 ? clean.song : '', i === 0 ? clean.message : '',
      ]);
    } else {
      rows = [[now, replyId, clean.name, clean.email, 'Ne', '', '', clean.name, '', '', '', '', clean.message]];
    }

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length)
      .setValues(rows.map((r) => r.map(safeCell_)));

    if (NOTIFY_EMAIL) notify_(clean, replyId);

    return json_({ ok: true, id: replyId, guests: rows.length });
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  } finally {
    lock.releaseLock();
  }
}

/** Spusťte jednou z editoru: vytvoří listy "Odpovědi" a "Přehled". */
function setup() {
  const ss = getSpreadsheet_();
  const sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#17203d').setFontColor('#f4f4f0');
  sheet.setFrozenRows(1);
  sheet.getRange('A:A').setNumberFormat('d. m. yyyy h:mm');
  sheet.setColumnWidths(1, HEADERS.length, 150);
  sheet.setColumnWidth(10, 220);
  sheet.setColumnWidth(11, 260);
  sheet.setColumnWidth(13, 320);

  let summary = ss.getSheetByName(SUMMARY_NAME);
  if (!summary) summary = ss.insertSheet(SUMMARY_NAME);
  summary.clear();
  // Vzorce zadané přes Apps Script se vždy píší anglicky a s čárkami, bez ohledu na jazyk tabulky.
  const r = `'${SHEET_NAME}'!`;
  const lines = [
    ['Přehled', ''],
    ['Hosté, kteří dorazí', `=COUNTIF(${r}E:E,"Ano")`],
    ['Dospělí', `=COUNTIFS(${r}E:E,"Ano",${r}I:I,"Dospělý")`],
    ['Děti', `=COUNTIFS(${r}E:E,"Ano",${r}I:I,"Dítě*")`],
    ['Domácnosti, které nedorazí', `=COUNTIF(${r}E:E,"Ne")`],
    ['', ''],
    ['Části víkendu (počet hostů)', ''],
    ...EVENT_OPTIONS.map((ev) => [ev, `=COUNTIFS(${r}E:E,"Ano",${r}F:F,"*${ev}*")`]),
    ['', ''],
    ['Stravovací omezení (počet hostů)', ''],
    ...DIETARY_OPTIONS.map((d) => [d, `=COUNTIFS(${r}E:E,"Ano",${r}J:J,"*${d}*")`]),
    ['S poznámkou o alergii', `=COUNTIFS(${r}E:E,"Ano",${r}K:K,"<>")`],
  ];
  summary.getRange(1, 1, lines.length, 2).setValues(lines);
  summary.setColumnWidth(1, 260);
  ['Přehled', 'Části víkendu (počet hostů)', 'Stravovací omezení (počet hostů)'].forEach((title) => {
    const idx = lines.findIndex((l) => l[0] === title);
    summary.getRange(idx + 1, 1).setFontWeight('bold');
  });
  ss.setActiveSheet(sheet);
}

/* ----------------------------------------------------------- pomocné funkce */

function parse_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Prázdný požadavek.');
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('Neplatná data (JSON).');
  }
}

function str_(v, max) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
}

function validate_(d) {
  const name = str_(d.name, 120);
  const email = str_(d.email, 160);
  if (name.length < 2) throw new Error('Chybí jméno.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error('Chybí platný e-mail.');

  const attending = d.attending === 'yes' ? 'Ano' : d.attending === 'no' ? 'Ne' : '';
  if (!attending) throw new Error('Chybí odpověď, zda dorazíte.');

  const message = String(d.message == null ? '' : d.message).trim().slice(0, 1000);
  if (attending === 'Ne') return { name, email, attending, events: [], guests: [], song: '', message };

  const events = (Array.isArray(d.events) ? d.events : []).filter((ev) => EVENT_OPTIONS.indexOf(ev) !== -1);
  if (!events.length) throw new Error('Vyberte aspoň jednu část víkendu.');

  const rawGuests = Array.isArray(d.guests) ? d.guests.slice(0, MAX_GUESTS) : [];
  const guests = rawGuests.map((g, i) => ({
    name: i === 0 ? name : str_(g && g.name, 120),
    age: AGE_OPTIONS.indexOf(g && g.age) !== -1 ? g.age : 'Dospělý',
    dietary: (Array.isArray(g && g.dietary) ? g.dietary : []).filter((x) => DIETARY_OPTIONS.indexOf(x) !== -1),
    notes: str_(g && g.notes, 300),
  }));
  if (!guests.length) guests.push({ name, age: 'Dospělý', dietary: [], notes: '' });
  if (guests.some((g) => g.name.length < 2)) throw new Error('Každý host musí mít jméno.');

  return { name, email, attending, events, guests, song: str_(d.song, 160), message };
}

/** Zabrání vložení vzorce do tabulky přes text z formuláře. */
function safeCell_(v) {
  if (typeof v === 'string' && /^[=+\-@\t\r]/.test(v)) return "'" + v;
  return v;
}

function getSpreadsheet_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(c, id) {
  const lines = [
    `${c.name} <${c.email}> odpověděl(a): ${c.attending === 'Ano' ? 'dorazí' : 'nedorazí'}`,
    `ID odpovědi: ${id}`,
  ];
  if (c.attending === 'Ano') {
    lines.push(`Části víkendu: ${c.events.join(', ')}`, '');
    c.guests.forEach((g, i) => {
      lines.push(`${i + 1}. ${g.name} (${g.age})${g.dietary.length ? ' | ' + g.dietary.join(', ') : ''}${g.notes ? ' | ' + g.notes : ''}`);
    });
    if (c.song) lines.push('', `Písnička: ${c.song}`);
  }
  if (c.message) lines.push('', `Vzkaz: ${c.message}`);
  MailApp.sendEmail(NOTIFY_EMAIL, `Odpověď na pozvánku: ${c.name} (${c.attending})`, lines.join('\n'));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
