---
name: Klára & Matěj, svatební oznámení
description: One long folded announcement card in rosemary-green ink on cotton stock, lying on its envelope, with a perforated reply slip at its foot.
colors:
  ink: "#1e3b30"
  ink-press: "#173026"
  envelope: "#1e3b30"
  envelope-deep: "#162d24"
  on-envelope: "#f1efe6"
  on-envelope-2: "#c9d3cb"
  paper: "#fbfaf5"
  paper-fold: "#f6f4ec"
  paper-insert: "#e7ede6"
  print-white: "#ffffff"
  ink-2: "#44594f"
  ink-3: "#5f7067"
  ink-wash: "rgb(30 59 48 / 0.055)"
  ink-wash-2: "rgb(30 59 48 / 0.1)"
  rule: "rgb(30 59 48 / 0.24)"
  rule-soft: "rgb(30 59 48 / 0.13)"
  danger: "#a1262e"
  envelope-night: "#13261f"
  envelope-deep-night: "#0d1b16"
  paper-night: "#ecebe4"
  paper-fold-night: "#e5e3db"
  paper-insert-night: "#d8e0d8"
  ink-3-night: "#536359"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(3.6rem, 13vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(2.2rem, 6.4vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(1.3rem, 3.6vw, 1.55rem)"
    fontWeight: 500
    lineHeight: 1.25
  formula:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(1.15rem, 3.4vw, 1.4rem)"
    fontWeight: 500
    lineHeight: 1.4
  caps:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "clamp(0.9rem, 2.6vw, 1.02rem)"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.16em"
  numeral:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.2
    fontFeature: "lnum, tnum"
  stamp:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Times New Roman, serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.18em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 700
    lineHeight: 1.6
  hint:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "0.01em"
rounded:
  printed: "2px"
  paper: "3px"
  control: "4px"
  stamp: "6px"
spacing:
  card-width: "46rem"
  page-gutter: "0.625rem"
  pad-x: "clamp(1.25rem, 6.5vw, 4.75rem)"
  pad-y: "clamp(3.25rem, 9vw, 6rem)"
  bar-height: "60px"
  form-gap: "2.25rem"
  group-gap: "0.9rem"
  field-gap: "0.45rem"
  tap-min: "44px"
  field-min: "52px"
  send-min: "58px"
components:
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    width: "min(100% - 1.25rem, 46rem)"
    padding: "clamp(3.25rem, 9vw, 6rem) clamp(1.25rem, 6.5vw, 4.75rem)"
  panel-fold:
    backgroundColor: "{colors.paper-fold}"
    textColor: "{colors.ink}"
  insert-card:
    backgroundColor: "{colors.paper-insert}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.printed}"
    width: "min(100%, 22rem)"
    padding: "1.4rem 1.5rem 1.5rem"
  print:
    backgroundColor: "{colors.print-white}"
    padding: "0.5rem"
  bar:
    textColor: "{colors.on-envelope}"
    height: "60px"
  bar-stuck:
    backgroundColor: "{colors.envelope-deep}"
    textColor: "{colors.on-envelope}"
  button-bar-reply:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.35rem 1rem"
    height: "40px"
  button-bar-reply-hover:
    backgroundColor: "{colors.print-white}"
  button-send:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.85rem 1.5rem"
    height: "58px"
    width: "100%"
  button-send-hover:
    backgroundColor: "{colors.ink-press}"
  button-code:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.5rem 0.5rem 1rem"
    height: "52px"
  button-code-hover:
    backgroundColor: "{colors.ink-wash}"
  button-code-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.paper}"
    padding: "0.45rem 0.7rem"
  link-inline:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "44px"
  tick-box:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper}"
    rounded: "{rounded.printed}"
    size: "1.6rem"
  tick-box-hover:
    backgroundColor: "{colors.ink-wash-2}"
  tick-box-checked:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tick-choice:
    textColor: "{colors.ink}"
    rounded: "{rounded.printed}"
    padding: "1rem 1rem 1.05rem"
  input-fill-in:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.printed}"
    padding: "0.75rem 0.85rem 0.6rem"
    height: "52px"
    width: "100%"
  input-fill-in-focus:
    backgroundColor: "{colors.ink-wash}"
  status-error:
    textColor: "{colors.danger}"
    rounded: "{rounded.control}"
    padding: "0.9rem 1rem"
  stamp:
    textColor: "{colors.ink}"
    typography: "{typography.stamp}"
    rounded: "{rounded.stamp}"
    padding: "0.75rem 1.3rem 0.7rem"
---

# Design System: Klára & Matěj, svatební oznámení

## Overview

**Creative North Star: "One Ink on Cotton Stock"**

The site is a printed Czech wedding announcement (svatební oznámení) unfolded into one long leporello card. A single sheet of bright cotton card stock lies on a deep rosemary-green envelope, and everything on it is printed in one ink, the same green. Panels are divided by fold creases, photographs are tipped-in prints held by photo corners, the hotel code is a loose insert card, the weekend is a printed programme with dotted leaders, and the RSVP is a perforated reply slip (odpovědní lístek) that tears off and gets rubber-stamped "Odesláno". Every device on the page has to exist on a real piece of stationery; if it couldn't be printed, folded, tipped in, torn or stamped, it doesn't belong.

The density is a letter's, not an app's. One centred column (46rem) carries everything, with generous panel padding and 18px reading text for older guests on phones. Engraved Didone type (Bodoni Moda) carries the announcement voice: names, headings, the formula, spaced-caps dates, times and the stamp. Atkinson Hyperlegible Next carries everything a guest reads at length, taps or types. Controls are printed reply-card boxes and fill-in boxes: an empty box is a printed outline, a chosen box is filled with ink.

Motion behaves like ink on paper: quick ease-out presses and ticks, one deliberate tear, nothing that loops. Night mode dims the stock and deepens the envelope, but the card always stays paper. The world rejects the wedding-template stack (full-bleed couple photo hero, script-font names, countdown, grids of detail cards).

**Key Characteristics:**
- One ink (rosemary green) on cotton stock, laid on an envelope of the same green.
- Didone engraving for the announcement voice, a hyperlegible sans for reading and replying.
- Stationery components only: fold creases, perforation, tick boxes, fill-in boxes, tipped-in prints, insert card, dotted leaders, rubber stamp.
- Real paper physics for depth: soft drop shadows only where paper lies on paper.
- Small paper corners (2-4px), never pills.
- Ink-on-paper motion: ticks draw in 200ms, presses scale to 0.97, one 640ms tear-off, a 280ms stamp press.
- Large text, 44px targets, full meaning with no hover or motion.

## Colors

One pigment in three densities (solid ink, wash, rule) on three paper stocks, with a single functional red kept for errors.

### Primary
- **Rosemary Ink** (`ink`): the only printing colour. All headings, names, body emphasis, tick-box outlines and fills, fill-in borders, the send button, the stamp, photo corners and perforation holes. Contrast on paper is 11.7:1.
- **Pressed Ink** (`ink-press`): the hover state of solid-ink buttons, as if the plate pressed harder. Never used at rest.
- **Envelope Green** (`envelope`): the page ground behind the card, the same hex as the ink on purpose. It also fills the perforation holes, the half-moon notches and the photo corners, because those are cut through to the envelope or made from the same dark stock.
- **Envelope Shadow** (`envelope-deep`): the sticky bar once the card scrolls under it, and the open mobile menu.

### Neutral
- **Cotton Stock** (`paper`): the card itself, the reply slip and every tick box's empty fill.
- **Folded Stock** (`paper-fold`): even-numbered panels, which sit at a different angle to the light on a folded card. It always alternates with Cotton Stock and is never used on its own.
- **Sage Insert** (`paper-insert`): the loose insert card only, a second, slightly greener stock tucked into the fold.
- **Print White** (`print-white`): the white border of the tipped-in photographs and the hover state of the light bar button. It is brighter than the card on purpose, because photographic paper is brighter than cotton.
- **Secondary Ink** (`ink-2`): ledes, notes, column copy, insert copy and the "a" between the names. 7.2:1 on paper.
- **Hint Ink** (`ink-3`): hints, "nepovinné" markers, placeholders, summary keys and the scissors mark. 5.0:1 on paper and 4.8:1 on folded stock.
- **Ink Washes** (`ink-wash`, `ink-wash-2`): the focus fill of a fill-in box, the hover of the code button, and the hover of an empty tick box (the stronger wash).
- **Rules** (`rule`, `rule-soft`): `rule` for dotted leaders, dotted guest dividers, structural top rules and the resting underline of text links. `rule-soft` for secondary dividers (between travel columns, between FAQ rows).
- **On-Envelope Cream** (`on-envelope`, `on-envelope-2`): text and focus rings on the envelope (bar mark, menu links), with `on-envelope-2` for resting nav links. 7.9:1 and up.

### Error
- **Correction Red** (`danger`): validation errors, invalid tick-choice outlines, the error banner (red at 8% fill with a 35% inset outline) and the hover of "Odebrat". 7.1:1 on paper. It is never decorative.

### Night (prefers-color-scheme: dark)
Only six tokens change. `envelope` becomes `envelope-night`, `envelope-deep` becomes `envelope-deep-night`, `paper` becomes `paper-night`, `paper-fold` becomes `paper-fold-night`, `paper-insert` becomes `paper-insert-night`, and `ink-3` darkens to `ink-3-night` so hints keep 5.3:1 on the dimmed stock. Ink, washes, rules and red stay the same.

### Named Rules
**The One Ink Rule.** Everything printed is Rosemary Ink or a transparency of it. There is no second accent, no gold and no blush. Correction Red appears only when something is wrong.

**The Paper Stays Paper Rule.** Night mode dims the stock and deepens the envelope. It never inverts the card into light-on-dark, because an announcement is paper at any hour.

**The Hint Floor Rule.** Hint Ink sits only on Cotton Stock or Folded Stock. On the Sage Insert it drops to 4.4:1, so insert copy uses Secondary Ink.

## Typography

**Display Font:** Bodoni Moda, variable 400-900 with optical sizes, roman and italic (fallbacks Didot, Bodoni 72, Times New Roman, serif)
**Body Font:** Atkinson Hyperlegible Next, variable 200-800, roman and italic (fallbacks Segoe UI, system-ui, -apple-system, sans-serif)

Both are self-hosted as woff2 in latin and latin-ext subsets (latin-ext covers č, ř, ě, ů and the rest of Czech) with `font-display: swap`. The latin files for Bodoni roman, Bodoni italic and Atkinson are preloaded. `font-optical-sizing: auto` is on, so Bodoni's hairlines thicken at small sizes and sharpen at display sizes.

**Character:** An engraver and a reader. Bodoni Moda is the copperplate of the printed oznámení: high contrast, formal, best large or in spaced caps. Atkinson Hyperlegible Next was designed for low-vision legibility and does all the work a grandparent has to do on a phone.

### Hierarchy
- **Display** (Bodoni italic 500, `display` clamp, line-height 1, -0.02em): the couple's names on the front panel, stacked, with a smaller "a" (0.42em, roman 400, Secondary Ink) between them. This is always the largest type on the page. The back panel repeats the names smaller (clamp(2.6rem, 9vw, 4rem)).
- **Headline** (Bodoni roman 500, `headline` clamp, 1.06, -0.015em, balanced wrap): one per panel. A single word may be set in italic 400 for an engraved accent ("Deset lét, *jeden* dlouhý stůl"). The sent-state heading uses the same voice smaller (clamp(1.9rem, 5vw, 2.5rem), 1.1).
- **Title** (Bodoni 500, 1.3-2rem): FAQ questions (`title` clamp), form legends (1.55rem), the stub question "Přijedete?" (clamp(1.45rem, 4.2vw, 1.75rem)), day headings in italic (clamp(1.6rem, 4.4vw, 2rem)), and guest labels, column heads and insert heads (italic or roman, 1.35-1.45rem).
- **Formula** (Bodoni 500, `formula` clamp, 1.4, Secondary Ink): the announcement sentence under the names ("si dovolují oznámit, že si řeknou své ano").
- **Spaced Caps** (Bodoni 600, uppercase, 0.16em, `caps` clamp, 1.7): the date and place lines on the front, day sub-labels (0.85rem) and the back meta line (0.9rem). Tracking drops to 0.1em at 520px and below.
- **Numerals** (Bodoni 600, 1.35rem, lining and tabular): programme times, with key events (the ceremony) promoted to Bodoni 600 1.5rem. Story years are Bodoni italic 1.65rem with lining figures. The reservation code is Bodoni 700 1.1rem at 0.1em.
- **Body** (Atkinson 400, 1.125rem / 18px, 1.6): all reading text. Ledes max out at 36ch, programme notes at 52ch, FAQ answers at 58ch and the sent message at 46ch. Secondary copy (notes, columns, insert) runs 1-1.05rem.
- **Label** (Atkinson 700, 1.02rem): field labels and guest diet legends. Buttons and quick replies are Atkinson 700 from 1rem (bar) to 1.15rem (send), and tick-choice titles are 1.125rem.
- **Hint** (Atkinson 400, 0.98rem, Hint Ink): field hints and "nepovinné". Errors use the same size at 700 in Correction Red.
- **Monogram** (Bodoni italic 600, 2.6rem, paper colour): the blind-embossed K&M, legible only through its light and shadow edges.
- **Stamp** (Bodoni 700, uppercase, 1.15rem, 0.18em): "ODESLÁNO", with the Czech date beneath at 0.72rem, 0.14em, weight 600.

### Named Rules
**The Engraver and the Reader Rule.** Bodoni Moda speaks for the couple: names, headings, formula, spaced caps, times, monogram and stamp. Atkinson Hyperlegible Next serves the guest: every paragraph, label, hint, error, button and form value. Bodoni never sets a paragraph or a form field, and never goes below 0.72rem (the stamp date only).

**The Short Caps Rule.** Uppercase is only for single short lines in spaced Bodoni caps (a date, a place, a day label, the stamp). It never wraps past two lines and never applies to Atkinson.

**The Letterpress Rule.** Large Bodoni (headlines, names, back names, the stub question) carries a two-edge text shadow (`0 1px 0` white at 75%, `0 -0.5px 0` ink at 18%) so the type reads as pressed into the stock. Small type never gets it.

### Czech Typesetting
- **Non-breaking spaces** follow every single-letter preposition and conjunction (k, s, v, z, o, u, a, i, and capitals at sentence start): `v&nbsp;sobotu`, `S&nbsp;radostí přijedu`, `a&nbsp;slib`. In HTML this is `&nbsp;`. In JS-injected copy it is a literal U+00A0. A number and its unit are also tied: `45&nbsp;minut`, `1&nbsp;h 45&nbsp;min`, `27&nbsp;°C`.
- **Dates** in prose are day, period, non-breaking space, month in the genitive, year: `12.&nbsp;června 2027`, `1.&nbsp;března 2027`. The compact numeric form keeps spaces: `12. 6. 2027` (title, stamp). Generated dates use `d. m. yyyy`.
- **Times**: the formal announcement uses the Czech period form (`v&nbsp;15.30`). The programme timetable uses the colon form (`15:30`) with tabular figures so the column aligns.
- **Plurals** use Czech three-way forms: 1, 2-4, and 0 or 5+ (`host / hosté / hostů`). Never append a suffix to a count.
- **Quotes** are Czech low-high quotes („s&nbsp;doprovodem“).

## Layout

The layout is one centred card column. The card is `min(100% - 1.25rem, 46rem)` wide, which leaves a 0.625rem sliver of envelope on each side on phones, and grows to 46rem on desktop with envelope all around. It sits 0.5-1.25rem below the bar and 2-5rem above the page end (clamped). The bar's inner row is wider, `min(100% - 2rem, 72rem)`, so the monogram and the reply button sit out on the envelope.

Each panel is padded `pad-y` by `pad-x`. The front panel tightens its top to clamp(2rem, 5vw, 3.25rem) and drops its bottom padding so the stub runs to the fold. The slip adds 0.5rem above for the perforation. Reading measure is set per element in ch (see Typography), not by a grid.

Vertical rhythm inside panels: the headline sits 1.25rem above its lede. Programme days are separated by clamp(2.25rem, 6vw, 3rem) and items by 0.95rem. Form groups are `form-gap` apart, controls in a group `group-gap` apart, and a label sits `field-gap` above its box.

Responsive behaviour:
- **≤760px:** nav links collapse into a 44px menu button. The menu opens as a full-width envelope-deep sheet under the bar with Bodoni 1.6rem links.
- **≤680px:** the three travel columns stack, and vertical rules become top rules.
- **≤520px:** the two attendance choices stack, the guest name and age row stacks, programme notes lose their 4.2rem hanging indent, and spaced-caps tracking drops to 0.1em.
- **≤420px:** sent-summary rows stack key over value.
- **Short desktop (≥761px wide, ≤860px tall):** the front panel compresses (monogram 2.2rem, names min(4.6rem, 13vw), tighter margins) so the names, date, place and the stub's two tick boxes all fit in the first viewport.

The sticky bar is 60px. Anchored scrolling offsets by the bar plus 16px. Horizontal overflow is clipped on html and body so the rotated prints never create sideways scroll.

## Elevation & Depth

Depth here is physical paper, not interface layering. The envelope is the floor. The card lies on it with a soft three-layer shadow. Tipped-in prints and the insert card lift a little off the card. Everything printed on the card (boxes, fill-ins, buttons, rules) is flat ink, with no shadow. Fold creases and the embossed monogram are drawn with light, not with elevation.

### Shadow Vocabulary
- **Card on envelope** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.22), 0 3px 6px -2px rgb(0 0 0 / 0.25), 0 30px 60px -24px rgb(0 0 0 / 0.55)`): the card sheet only.
- **Tipped-in print** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.16), 0 10px 22px -12px rgb(0 0 0 / 0.45)`): photographs mounted on the card.
- **Insert card** (`box-shadow: 0 1px 1px rgb(0 0 0 / 0.14), 0 14px 28px -16px rgb(0 0 0 / 0.5)`): the loose insert tucked into the fold.
- **Stuck bar** (`box-shadow: 0 1px 0 rgb(0 0 0 / 0.25), 0 8px 24px -12px rgb(0 0 0 / 0.5)`): only once the card has scrolled under the bar.
- **Menu sheet** (`box-shadow: 0 16px 32px -16px rgb(0 0 0 / 0.6)`): the open mobile menu.
- **Send button bevel** (`box-shadow: 0 1px 0 rgb(0 0 0 / 0.25), inset 0 1px 0 rgb(255 255 255 / 0.08)`): a hairline press edge on the one solid-ink button. It is not a lift.
- **Fold crease** (background, not shadow): every panel after the first starts with a 30px valley (`linear-gradient` from ink at 14% through 4% at 6px to 0 at 30px) under a 1px highlight line of white at 95%.
- **Blind emboss** (text-shadow on paper-coloured type: `0 1.5px 0` white, `0 -1px 0` ink at 38%, `0 -1px 2px` ink at 20%): the monogram only.

### Textures
Three grayscale-plus-alpha PNGs give the stock and the ink their grain. They are tiled as backgrounds or masks over the flat token colours, so the page reads correctly even if they never load.
- **cotton.png** (320 × 320, `--tex-paper`): cotton fibre, tiled at 320px over Cotton Stock on the card, over Folded Stock (layered under the crease gradients) on even panels, and over Sage Insert on the insert card.
- **envelope.png** (320 × 320, `--tex-envelope`): laid-paper grain on the body's Envelope Green, tiled at 320px from 0 0.
- **stamp-ink.png** (480 × 200): an uneven-ink mask stretched to 100% × 100% over the stamp (`mask-image`), so the rubber stamp prints patchy.

### Named Rules
**The Paper Physics Rule.** Only paper resting on paper casts a shadow: the card on the envelope, a print or insert on the card. Printed controls never lift, never glow, and never gain a shadow on hover.

**The Light, Not Lines Rule.** Folds and the monogram are drawn with highlight and shade gradients, never with a border or a hard rule.

## Shapes

Small, tight paper corners throughout. The card has 3px corners, like a die-cut sheet. Printed boxes (tick boxes, tick choices, fill-in boxes, the insert card) have 2px corners. Interactive controls (send, bar reply, code button, menu button, remove button, error banner, skip link) have 4px corners. The code button's inner ink chip and the focus outline have 3px. The rubber stamp is the one larger corner at 6px, with a double frame (3px ink border, 3px paper gap, 1.5px inner ink line). The only circles are the perforation holes (2.1px dots on an 11 × 8px repeat) and the 20px half-moon notches where the perforation meets the card edges. Pills never appear.

Borders are printed lines: 1.5px solid ink for tick boxes and fill-in boxes, 1.5px dashed ink for the code button, a 1px inset ink outline for tick choices (2px when chosen), 2px dotted `rule` for leaders and guest dividers, and 1px `rule` or `rule-soft` for structural dividers.

Prints and the insert are rotated as if tipped in by hand: the story prints at -1.6deg and 2.4deg (the second offset -12% / 14% to overlap), the venue print at -0.6deg, the insert at 1.4deg, and the stamp at -7deg. Nothing else on the card is rotated.

### Named Rules
**The Paper Corner Rule.** Paper 3px, printed boxes 2px, controls 4px, stamp 6px. Circles exist only as perforation holes and edge notches. Nothing is ever a pill.

## Components

Every component is a piece of stationery: tactile, printed and quiet at rest.

### Buttons
- **Shape:** gently squared (4px).
- **Primary, Send:** full-width solid Rosemary Ink with Cotton Stock text, Atkinson 700 1.15rem, min-height 58px, padding 0.85rem × 1.5rem, with the send bevel and a trailing arrow icon. Its label switches to "Odeslat omluvu" for a "no" reply and "Odesílám..." while sending (`aria-busy`, label at 75% opacity, progress cursor).
- **Hover (fine pointers only):** background moves to Pressed Ink and the arrow slides 3px right (200ms ease-out).
- **Active:** scale(0.97), 160ms ease-out.
- **Bar reply ("Odpovědět"):** Cotton Stock on the envelope with ink text, Atkinson 700 1rem, 4px corners. On hover it brightens to Print White.
- **Text actions (add guest, send another reply, inline links):** Atkinson 700 ink, underlined in `rule` with the underline darkening to full ink on hover (160ms). Min-height 44px. Add guest also presses to 0.97. When disabled it turns Hint Ink with no underline, and its label states the limit with a Czech plural.
- **Remove guest:** Secondary Ink with an × icon, 44px tall. On hover it turns Correction Red over a red wash at 8%.

### Printed Tick Boxes (checkbox, radio, quick reply)
- **Box:** 1.6rem square, 1.5px ink outline, 2px corners, Cotton Stock fill. The real input is stretched invisibly over the whole label, so the full row is the target (min-height 44px).
- **Chosen:** the box fills with ink and a paper-coloured tick (2.6 stroke, round caps) draws in by animating `stroke-dashoffset` from 22 to 0 over 200ms ease-out. The fill change takes 160ms.
- **Pressed:** the box scales to 0.92 (140ms ease-out).
- **Hover (fine pointers only):** an empty box takes the stronger wash. A chosen box stays ink.
- **Focus:** 2px ink outline, 3px offset, on the box.
- **Quick reply (front stub):** the same box as a button with `aria-pressed`. Choosing it selects the matching radio in the slip and scrolls there.
- **Tick choice (attendance):** a larger printed panel (1px inset ink outline, 2px corners, padding 1rem) with a bold title and a Secondary Ink sub-line. Chosen thickens the outline to 2px. Invalid shows a 1.5px red outline.

### Fill-in Boxes (text, email, select, textarea)
- **Style:** transparent over the stock, 1.5px ink border, 2px corners, min-height 52px, padding 0.75rem × 0.85rem × 0.6rem, Atkinson 1.125rem. Placeholders use Hint Ink at full opacity. Textareas start at 6.5rem and resize vertically. Selects hide the native arrow and show a caret icon.
- **Focus:** a faint ink wash inside plus a 2px paper gap and a 2px ink ring outside (`0 0 0 2px paper, 0 0 0 4px ink`), 160ms.
- **Error:** red border plus a 1px inset red line. The message sits below in Atkinson 700 0.98rem red, announced politely. On submit, focus moves to the first problem in reading order.

### Card Panels and Fold Creases
- **Corner Style:** 3px on the sheet. Panels inside have no corners of their own.
- **Background:** Cotton Stock with cotton.png. Even panels use Folded Stock. Every panel after the first opens with the fold-crease valley and highlight.
- **Shadow Strategy:** only the sheet casts a shadow (card on envelope).
- **Internal Padding:** `pad-y` by `pad-x`.
- **Front panel:** centred, with the embossed monogram, display names, formula, spaced-caps date and place, an "add to calendar" link, and the stub.

### Perforation and Front Stub
- **Perforation:** a row of envelope-green holes (2.1px radius dots on an 11 × 8px repeat-x) straddling the slip's top edge, half-moon notches cut into both card edges, and a small scissors mark in Hint Ink set 1.5-4rem in from the left.
- **Front stub:** the same hole row across the foot of the front panel, bleeding to the card edges (negative `pad-x` margins). It holds the Bodoni question "Přijedete?", the Atkinson reply-by line, and two quick-reply tick boxes.

### Tipped-in Prints
White photographic mount (0.5rem border) with the print shadow. Four triangular photo corners in envelope green (13px legs on a 26px square, 92% opacity) sit 5px outside each corner. Story prints are 4:5 and overlap in a 1.35fr / 1fr pair. The venue print is 12:7. Images are lazy-loaded and placeholders show an ink wash while loading.

### Insert Card
The insert is a loose second stock (Sage Insert with cotton.png, 2px corners, 22rem max, rotated 1.4deg, insert shadow) aligned to the right. It holds a Bodoni head, Secondary Ink copy, and the code button: a dashed 1.5px ink frame (52px tall, 4px corners) with the code in spaced Bodoni and a solid-ink "Kopírovat" chip on the right that briefly reads "Zkopírováno" for 1.8s. It presses to 0.97 and washes on hover.

### Programme Lines
Each item is one baseline row: a Bodoni time (tabular, 3.6rem min width), a dotted leader that fills the gap (2px dotted `rule`, lifted 0.3em to sit at x-height), and the event name right-aligned in Atkinson 700 (max 70%). The note below is Secondary Ink 1.05rem with a 4.2rem hanging indent. Key items set the name in Bodoni 600 1.5rem. Day headings are Bodoni italic with a spaced-caps date beside them.

### Navigation
The bar sits transparent on the envelope with the Bodoni monogram "K & M" (1.35rem, 0.04em) on the left, Atkinson 1rem nav links in `on-envelope-2` (cream with an underline on hover), and the bar reply button. Once the card scrolls beneath it, the bar fills with Envelope Shadow and gains the stuck shadow (200ms). On the envelope, focus rings switch to cream. On mobile, see Layout. Escape closes the menu and returns focus to the toggle.

### FAQ Rows
Native details/summary rows between a `rule` top line and `rule-soft` dividers. The summary is a Bodoni title with a plus icon that rotates 45deg into an × (200ms ease-out). It is at least 3.75rem tall. Answers settle in (opacity plus 4px drop, 240ms ease-out) only when motion is allowed.

### Stamp ("Odesláno")
After a successful reply, the stub shows a rubber stamp: a double-framed 6px box in ink, Bodoni 700 spaced caps with the Czech date beneath, masked by stamp-ink.png, rotated -7deg at 88% opacity. Below it sit the Bodoni thank-you heading, a Secondary Ink message, and a dotted-ruled summary of what was sent (keys in Hint Ink).

### Motion Grammar
Ink on paper: quick ease-out presses and ticks, one deliberate tear, nothing that loops, and nothing triggered by scrolling.
- **Easings:** `--ease-out` cubic-bezier(0.23, 1, 0.32, 1) for presses, ticks, reveals and the stamp. `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1) for the tear only. Plain `ease` for colour fades.
- **Press:** scale(0.97), 160ms ease-out (send, bar reply, code, add). Tick boxes press to 0.92 over 140ms.
- **Tick draw:** stroke-dashoffset 22 to 0, 200ms ease-out. Box fill 160ms ease.
- **Colour and underline fades:** 160ms ease. Bar fill 200ms ease.
- **Reveals:** FAQ answer 240ms (opacity, -4px). The attending section 240ms and each added guest 220ms (opacity, +6px, via `@starting-style`).
- **Tear-off (WAAPI):** the slip pivots from 14% 0 and runs 640ms in `--ease-in-out`. At 22% it is down 6px and turned -0.8deg. At the end it is down 72px, turned 2.6deg, at opacity 0 with a 2px blur. Then it is hidden.
- **Stamp press (WAAPI):** 280ms ease-out after a 60ms delay. It starts at scale 1.45 and opacity 0, reaches scale 0.97 and opacity 0.92 at 70%, and settles at scale 1 and opacity 0.88, always at -7deg.
- **Reduced motion:** smooth scrolling becomes instant (CSS and JS), the tick appears without drawing, reveals are skipped, the tear becomes a 160ms opacity fade, and the stamp becomes a 160ms fade-in.

### Accessibility Floor
- Every tappable thing is at least 44px tall (tick rows, links, menu button, remove). Fill-ins are 52px, the code button 52px and send 58px.
- Body text is 18px, and secondary text never goes below 0.95rem except the stamp date.
- Hover is only an enhancement and is gated to `(hover: hover) and (pointer: fine)`. Every state is readable without it.
- Focus is always visible: 2px ink outline at 3px offset (cream on the envelope), or the paper-gap ring on fill-ins.
- Errors use text plus colour plus a thicker outline, never colour alone. They are announced politely, and focus goes to the first problem.
- There is a skip link to the card, a single h1 (the names), and decorative monogram, stamp, perforation and leaders are hidden from assistive tech.

## Do's and Don'ts

### Do:
- **Do** print everything in Rosemary Ink or its washes and rules on Cotton, Folded or Sage stock, and keep Correction Red for errors only.
- **Do** alternate Cotton Stock and Folded Stock panel by panel, and open every panel after the first with the fold-crease valley.
- **Do** set the couple's voice in Bodoni Moda (names in italic as the largest type, headings in roman with at most one italic word, dates and places in spaced caps) and everything a guest reads, taps or types in Atkinson Hyperlegible Next at 1.125rem or larger for body.
- **Do** build controls as printed stationery: 1.5px ink outlines, 2px corners, empty means outline and chosen means ink fill.
- **Do** mount photographs as tipped-in prints with a white border, envelope-green photo corners and a slight rotation (within about ±2.5deg).
- **Do** set times as tabular Bodoni numerals with dotted leaders running to the event name.
- **Do** tie every single-letter preposition or conjunction to the next word with a non-breaking space, write dates as `12.&nbsp;června 2027`, and use Czech three-form plurals.
- **Do** keep every target at least 44px, gate hover to fine pointers, and give every motion a reduced-motion path that is opacity-only and 160ms or shorter.
- **Do** keep motion to ease-out presses and ticks of 280ms or less, with the 640ms tear as the only long movement.

### Don't:
- **Don't** add a second accent colour, gradient fills, or tinted section backgrounds beyond the three stocks.
- **Don't** invert the card in night mode. Only dim the stock and deepen the envelope.
- **Don't** set paragraphs, labels, hints or form values in Bodoni, or Atkinson in uppercase.
- **Don't** use uppercase for anything longer than a short spaced-caps line.
- **Don't** give printed controls shadows, glows or lift on hover. Shadows belong only to paper resting on paper.
- **Don't** round anything into a pill, and don't exceed 4px on controls (the 6px stamp is the only exception).
- **Don't** put Hint Ink on the Sage Insert.
- **Don't** add looping, scroll-triggered or parallax motion.
- **Don't** reach for the wedding-template stack: a full-bleed couple photo hero, script-font names, a countdown, or grids of detail cards.
- **Don't** add small-caps kicker or eyebrow labels above headings. Each panel opens on its Bodoni headline.
