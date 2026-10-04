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
  rsvpEndpoint: "",
  maxGuests: 6,
  contactEmail: "svatba@example.com",
};
