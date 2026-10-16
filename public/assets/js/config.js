/*
 * Nastavení webu. Kvůli propojení formuláře stačí upravit jen tento soubor.
 *
 * rsvpEndpoint: adresa webové aplikace Google Apps Script (končí na /exec).
 *               Postup najdete v README.md, sekce "Propojení formuláře s Google Tabulkami".
 *               Když ji necháte prázdnou, formulář běží v ukázkovém režimu: vše se
 *               zkontroluje a vypíše do konzole prohlížeče, ale nic se neodešle.
 * maxGuests:    nejvyšší počet hostů v jednom formuláři (musí sedět s MAX_GUESTS v Code.gs).
 */
window.WEDDING_CONFIG = {
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycby7XHsMzQt55rr__aE558Vwu9Eto_2vgJpYF1pboOs4idzpM-FjOqWqH6aRC7wnhh_j/exec",
  maxGuests: 6,
  contactEmail: "vojta.se@seznam.cz",
};
