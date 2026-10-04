# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Wedding guests: Czech family and friends of every age, grandparents included. Most open the site from a link sent to their phone (messaging app or email), read the essentials once, and come back later to check the schedule or travel details. Their job: understand when and where, decide whether they can come, and reply with who is coming and what each person can eat.

The couple (site owners) are a secondary audience: they read the replies in a Google Sheet and hand dietary needs to the caterer.

## Product Purpose

A single-page wedding website that tells guests everything they need for the weekend and collects RSVPs. Success: every invited household replies before the deadline, with complete guest names and dietary needs, without phoning the couple to ask anything the page already answers.

## Positioning

A personal invitation, not a template: one couple, one weekend, one place. The RSVP is per guest, so the kitchen gets a clean list of who eats what (one Sheet row per person, live totals per dietary need).

## Operating Context

- Opened on phones in all kinds of light, often by people who rarely use modern web apps.
- Language: Czech only (lang="cs"), following Czech typographic conventions (non-breaking space after single-letter prepositions and conjunctions, Czech date formats and plural forms).
- Replies land in a Google Sheet via a Google Apps Script web app; the couple reviews them there.
- Deployed as static files on Cloudflare (Pages or Workers static assets), folder `public/`.

## Capabilities and Constraints

- Plain static HTML/CSS/JS, no build step (existing codebase; Cloudflare deploy).
- RSVP data contract must stay: name, email, attending yes/no, events (Páteční aperitivo, Sobotní svatba, Nedělní brunch), guests (name, age group Dospělý / Dítě (do 12 let), dietary tags, allergy notes), song, message, honeypot `website`. Posted as `text/plain` JSON to the Apps Script `/exec` URL; `apps-script/Code.gs` validates against the same option lists.
- Up to 6 guests per reply. Drafts persist locally; demo mode when no endpoint is configured.
- Page is `noindex` (private event).
- Section content (story, three-day programme, venue and travel, FAQ, RSVP copy) stays as written in Czech.

## Evidence on Hand

- All couple and event details are placeholders (Klára & Matěj, 12. 6. 2027, Villa Le Cipressaie, Val d'Orcia, Toskánsko). The couple will replace them later.
- Photos in `public/assets/img/` are Unsplash-licensed placeholders (via picsum.photos); no real photos of the couple exist yet. Do not present stock people as the couple.
- No testimonials, registry, or vendor claims exist; do not invent any.

## Product Principles

1. The guest should never have to ask: date, place, schedule, travel and dress code are findable in seconds on a phone.
2. Replying is the main action and must be effortless for a grandparent on a small screen.
3. Dietary needs are captured per person, precisely, because a caterer acts on them.
4. Personal over generic: it should feel like this couple's invitation, not a wedding template.
5. Easy for the couple to edit later: content and options live in obvious places.

## Accessibility & Inclusion

Older guests are a core audience: generous text size and contrast, large tap targets, plain labels, no reliance on hover or motion, full keyboard and screen-reader support, and reduced-motion respected.
