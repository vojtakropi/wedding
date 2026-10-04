(() => {
  "use strict";

  const config = Object.assign(
    { rsvpEndpoint: "", maxGuests: 6, contactEmail: "svatba@example.com" },
    window.WEDDING_CONFIG || {}
  );
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  // Czech plural forms: 1 den, 2-4 dny, 0 / 5+ dní.
  const plural = (n, one, few, many) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);
  const czDate = (d) => `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
  const scrollBehavior = () => (reduceMotion.matches ? "auto" : "smooth");

  // Storage can throw (private mode, blocked cookies); never let it break the page.
  const store = {
    get(key) {
      try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch { /* ignore */ }
    },
  };

  /* ---------------------------------------------------------------- Bar */
  function initNav() {
    const nav = $("[data-nav]");
    const toggle = $("[data-menu-toggle]");
    const menu = $("[data-menu]");
    if (!nav) return;

    // The bar turns solid once the card scrolls under it.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle("is-stuck", !entry.isIntersecting);
    }).observe(sentinel);

    if (!toggle || !menu) return;
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    };
    toggle.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* --------------------------------------------------------- Copy code */
  function initCopy() {
    $$("[data-copy]").forEach((btn) => {
      const label = $("[data-copy-label]", btn);
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const tmp = document.createElement("textarea");
          tmp.value = text;
          tmp.setAttribute("readonly", "");
          tmp.style.cssText = "position:fixed;opacity:0";
          document.body.appendChild(tmp);
          tmp.select();
          try { document.execCommand("copy"); } catch { /* ignore */ }
          tmp.remove();
        }
        if (label) {
          label.textContent = "Zkopírováno";
          clearTimeout(btn._t);
          btn._t = setTimeout(() => { label.textContent = "Kopírovat"; }, 1800);
        }
      });
    });
  }

  /* --------------------------------------------------------------- RSVP */
  const DRAFT_KEY = "km-rsvp-draft-v2";
  const SENT_KEY = "km-rsvp-sent-v2";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function initRsvp() {
    const form = $("[data-rsvp-form]");
    if (!form) return;

    const els = {
      section: $("#rsvp"),
      slip: $("[data-slip]"),
      name: $("#f-name", form),
      email: $("#f-email", form),
      song: $("#f-song", form),
      message: $("#f-message", form),
      website: $("#f-website", form),
      conditional: $("[data-when-attending]", form),
      guests: $("[data-guests]", form),
      addGuest: $("[data-add-guest]", form),
      status: $("[data-form-status]", form),
      submit: $("[data-submit]", form),
      submitLabel: $("[data-submit-label]", form),
      success: $("[data-success]"),
      successTitle: $("[data-success-title]"),
      successText: $("[data-success-text]"),
      successSummary: $("[data-success-summary]"),
      stamp: $(".stamp"),
      stampDate: $("[data-stamp-date]"),
      reset: $("[data-reset-form]"),
      template: $("#guest-template"),
      quick: $$("[data-quick-reply]"),
    };
    const attendFieldset = $('input[name="attending"]', form).closest("fieldset");
    const eventsFieldset = $('input[name="events"]', form).closest("fieldset");
    const eventsError = document.createElement("p");
    eventsError.className = "field__error";
    eventsError.id = "f-events-err";
    eventsError.setAttribute("aria-live", "polite");
    eventsFieldset.appendChild(eventsError);
    eventsFieldset.setAttribute("aria-describedby", eventsError.id);

    let guestSeq = 0;
    let triedSubmit = false;
    let sending = false;

    /* ----- guests ----- */
    function guestCards() { return $$("[data-guest]", els.guests); }

    function addGuest(data = {}, { primary = false, focus = false } = {}) {
      if (guestCards().length >= config.maxGuests) return null;
      const n = ++guestSeq;
      const frag = els.template.content.cloneNode(true);
      const card = $("[data-guest]", frag);
      card.dataset.primary = String(primary);

      $$("[data-field]", card).forEach((input) => {
        const key = input.dataset.field;
        input.id = `g${n}-${key}`;
        const label = $(`[data-for="${key}"]`, card);
        if (label) label.htmlFor = input.id;
        const err = $(`[data-error="${key}"]`, card);
        if (err) { err.id = `g${n}-${key}-err`; input.setAttribute("aria-describedby", err.id); }
        if (data[key]) input.value = data[key];
      });
      $$("[data-diet] input", card).forEach((cb) => {
        cb.name = `g${n}-diet`;
        cb.checked = Array.isArray(data.dietary) && data.dietary.includes(cb.value);
      });

      if (primary) {
        $(".guest__row", card).hidden = true;
        $("[data-remove-guest]", card).remove();
      } else {
        $("[data-remove-guest]", card).addEventListener("click", () => {
          card.remove();
          renumberGuests();
          saveDraft();
          els.addGuest.focus({ preventScroll: true });
        });
      }
      els.guests.appendChild(frag);
      renumberGuests();
      if (focus) $('[data-field="name"]', card).focus();
      return card;
    }

    function renumberGuests() {
      const cards = guestCards();
      cards.forEach((card, i) => {
        const label = $("[data-guest-label]", card);
        const isPrimary = card.dataset.primary === "true";
        const nm = els.name.value.trim();
        label.textContent = isPrimary ? (nm ? `Vy (${nm.split(/\s+/)[0]})` : "Vy") : `Host ${i + 1}`;
        $(".guest__diet", card).setAttribute("aria-label", `Stravovací omezení: ${label.textContent}`);
        const remove = $("[data-remove-guest]", card);
        if (remove) remove.setAttribute("aria-label", `Odebrat: ${label.textContent}`);
      });
      const full = cards.length >= config.maxGuests;
      els.addGuest.disabled = full;
      $("[data-add-label]", els.addGuest).textContent = full
        ? `Nejvýš ${config.maxGuests} ${plural(config.maxGuests, "host", "hosté", "hostů")} na formulář`
        : "Přidat hosta";
    }

    /* ----- attending ----- */
    function attendingValue() {
      const checked = $('input[name="attending"]:checked', form);
      return checked ? checked.value : "";
    }
    function syncAttending() {
      const value = attendingValue();
      els.conditional.hidden = value !== "yes";
      els.submitLabel.textContent = value === "no" ? "Odeslat omluvu" : "Odeslat odpověď";
      els.quick.forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.quickReply === value)));
    }

    // The stub on the front of the card starts the reply in place.
    els.quick.forEach((btn) => {
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => {
        const radio = $(`input[name="attending"][value="${btn.dataset.quickReply}"]`, form);
        radio.checked = true;
        radio.dispatchEvent(new Event("change", { bubbles: true }));
        els.section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        if (!form.hidden) (els.name.value ? els.email : els.name).focus({ preventScroll: true });
      });
    });

    /* ----- collect ----- */
    function collect() {
      const attending = attendingValue();
      const guests = guestCards().map((card) => {
        const isPrimary = card.dataset.primary === "true";
        return {
          name: isPrimary ? els.name.value.trim() : $('[data-field="name"]', card).value.trim(),
          age: isPrimary ? "Dospělý" : $('[data-field="age"]', card).value,
          dietary: $$("[data-diet] input:checked", card).map((cb) => cb.value),
          notes: $('[data-field="notes"]', card).value.trim(),
          primary: isPrimary,
        };
      });
      return {
        name: els.name.value.trim(),
        email: els.email.value.trim(),
        attending,
        events: attending === "yes" ? $$('input[name="events"]:checked', form).map((cb) => cb.value) : [],
        guests: attending === "yes" ? guests : [],
        song: attending === "yes" ? els.song.value.trim() : "",
        message: els.message.value.trim(),
        website: els.website.value,
      };
    }

    /* ----- validation (in reading order, so focus lands on the first problem) ----- */
    function setError(input, errEl, msg) {
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (errEl) errEl.textContent = msg || "";
      return !msg;
    }

    function validate() {
      const data = collect();
      const invalid = [];

      const attendErr = $("#f-attend-err");
      attendFieldset.classList.toggle("is-invalid", !data.attending);
      attendErr.textContent = data.attending ? "" : "Dejte nám prosím vědět, jestli dorazíte.";
      if (!data.attending) invalid.push($('input[name="attending"]', form));

      if (!setError(els.name, $("#f-name-err"), data.name.length < 2 ? "Napište nám prosím své jméno." : "")) invalid.push(els.name);
      const emailMsg = !data.email ? "Bez e-mailu vám odpověď nepotvrdíme." : !EMAIL_RE.test(data.email) ? "Tenhle e-mail nevypadá úplně správně." : "";
      if (!setError(els.email, $("#f-email-err"), emailMsg)) invalid.push(els.email);

      if (data.attending === "yes") {
        eventsError.textContent = data.events.length ? "" : "Vyberte aspoň jednu část víkendu.";
        if (!data.events.length) invalid.push($('input[name="events"]', form));

        guestCards().forEach((card) => {
          if (card.dataset.primary === "true") return;
          const input = $('[data-field="name"]', card);
          const ok = setError(input, $('[data-error="name"]', card), input.value.trim().length < 2 ? "Doplňte jméno hosta, nebo ho odeberte." : "");
          if (!ok) invalid.push(input);
        });
      } else {
        eventsError.textContent = "";
      }
      return { data, invalid };
    }

    /* ----- drafts ----- */
    let draftTimer;
    function saveDraft() {
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => {
        const { website, ...draft } = collect();
        draft.guests = guestCards().map((card) => ({
          name: $('[data-field="name"]', card).value,
          age: $('[data-field="age"]', card).value,
          dietary: $$("[data-diet] input:checked", card).map((cb) => cb.value),
          notes: $('[data-field="notes"]', card).value,
          primary: card.dataset.primary === "true",
        }));
        draft.events = $$('input[name="events"]:checked', form).map((cb) => cb.value);
        store.set(DRAFT_KEY, draft);
      }, 250);
    }

    function restoreDraft(draft) {
      els.name.value = draft.name || "";
      els.email.value = draft.email || "";
      els.song.value = draft.song || "";
      els.message.value = draft.message || "";
      const radio = draft.attending && $(`input[name="attending"][value="${draft.attending}"]`, form);
      if (radio) radio.checked = true;
      if (Array.isArray(draft.events)) {
        $$('input[name="events"]', form).forEach((cb) => { cb.checked = draft.events.includes(cb.value); });
      }
      const guests = Array.isArray(draft.guests) ? draft.guests : [];
      const primary = guests.find((g) => g.primary) || {};
      addGuest(primary, { primary: true });
      guests.filter((g) => !g.primary).slice(0, config.maxGuests - 1).forEach((g) => addGuest(g));
    }

    function resetForm() {
      form.reset();
      els.guests.innerHTML = "";
      guestSeq = 0;
      triedSubmit = false;
      $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
      $$(".field__error", form).forEach((el) => { el.textContent = ""; });
      attendFieldset.classList.remove("is-invalid");
      addGuest({}, { primary: true });
      syncAttending();
      showStatus("");
    }

    /* ----- status ----- */
    function showStatus(html) {
      els.status.hidden = !html;
      els.status.innerHTML = html || "";
    }

    function setSending(on) {
      sending = on;
      els.submit.disabled = on;
      els.submit.setAttribute("aria-busy", String(on));
      if (on) els.submitLabel.textContent = "Odesílám...";
      else syncAttending();
    }

    /* ----- the tear-off: the slip drops away and the stub is stamped ----- */
    async function tearOff() {
      const slip = els.slip;
      if (!reduceMotion.matches && slip.animate) {
        slip.style.transformOrigin = "14% 0";
        const tear = slip.animate([
          { transform: "translateY(0) rotate(0deg)", opacity: 1, filter: "blur(0px)" },
          { transform: "translateY(6px) rotate(-0.8deg)", opacity: 1, filter: "blur(0px)", offset: 0.22 },
          { transform: "translateY(72px) rotate(2.6deg)", opacity: 0, filter: "blur(2px)" },
        ], { duration: 640, easing: "cubic-bezier(0.77, 0, 0.175, 1)", fill: "forwards" });
        await tear.finished.catch(() => {});
        slip.hidden = true;
        tear.cancel();
      } else if (slip.animate) {
        const fade = slip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: "ease", fill: "forwards" });
        await fade.finished.catch(() => {});
        slip.hidden = true;
        fade.cancel();
      } else {
        slip.hidden = true;
      }
    }

    function pressStamp() {
      if (!els.stamp.animate) return;
      const frames = reduceMotion.matches
        ? [{ opacity: 0 }, { opacity: 0.88 }]
        : [
            { transform: "rotate(-7deg) scale(1.45)", opacity: 0 },
            { transform: "rotate(-7deg) scale(0.97)", opacity: 0.92, offset: 0.7 },
            { transform: "rotate(-7deg) scale(1)", opacity: 0.88 },
          ];
      els.stamp.animate(frames, { duration: reduceMotion.matches ? 160 : 280, delay: 60, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
    }

    function renderSuccess(sent) {
      const yes = sent.attending === "yes";
      els.successTitle.textContent = yes ? "Grazie! Uvidíme se v Toskánsku." : "Děkujeme za odpověď. Budete nám chybět.";
      els.successText.textContent = yes
        ? `Vaši odpověď jsme uložili${sent.demo ? " (ukázkový režim, nic se neodeslalo)" : ""}. Shrnutí najdete níže. Kdyby se něco změnilo, pošlete prostě novou odpověď a my použijeme tu nejnovější.`
        : `Vaši odpověď jsme uložili${sent.demo ? " (ukázkový režim, nic se neodeslalo)" : ""}. V den svatby si na vás připijeme.`;
      const when = new Date(sent.submittedAt || Date.now());
      els.stampDate.textContent = czDate(isNaN(when) ? new Date() : when);

      const rows = [];
      if (yes) {
        rows.push(["Dorazí na", sent.events.join(", ")]);
        sent.guests.forEach((g) => {
          const diet = [g.dietary.join(", "), g.notes].filter(Boolean).join("; ");
          rows.push([g.name || "Host", `${g.age}${diet ? `, ${diet}` : ", bez omezení"}`]);
        });
        if (sent.song) rows.push(["Písnička", sent.song]);
      } else {
        rows.push(["Odpověď", "Nedorazí"]);
      }
      els.successSummary.replaceChildren(...rows.map(([k, v]) => {
        const li = document.createElement("li");
        const a = document.createElement("span");
        const b = document.createElement("span");
        a.textContent = k;
        b.textContent = v;
        li.append(a, b);
        return li;
      }));

      els.slip.hidden = true;
      form.hidden = true;
      els.success.hidden = false;
    }

    /* ----- send ----- */
    async function send(payload) {
      if (!config.rsvpEndpoint) {
        await new Promise((r) => setTimeout(r, 900));
        console.info("[RSVP ukázkový režim] V assets/js/config.js chybí rsvpEndpoint. Data:", payload);
        return { ok: true, demo: true };
      }
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 20000);
      try {
        // text/plain keeps this a "simple" CORS request (no preflight), which Apps Script requires.
        const res = await fetch(config.rsvpEndpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
          redirect: "follow",
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        if (!body.ok) throw new Error(body.error || "Server odpověď odmítl.");
        return body;
      } finally {
        clearTimeout(timer);
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sending) return;
      triedSubmit = true;
      showStatus("");
      const { data, invalid } = validate();
      if (invalid.length) {
        invalid[0].focus({ preventScroll: true });
        invalid[0].scrollIntoView({ behavior: scrollBehavior(), block: "center" });
        return;
      }
      setSending(true);
      let sent;
      try {
        const payload = { ...data, submittedAt: new Date().toISOString() };
        const result = await send(payload);
        sent = { ...payload, demo: !!result.demo };
        delete sent.website;
        store.set(SENT_KEY, sent);
        store.remove(DRAFT_KEY);
      } catch (err) {
        console.error("[RSVP] send failed:", err);
        const mail = `mailto:${config.contactEmail}?subject=${encodeURIComponent("Odpověď na pozvánku: " + data.name)}`;
        showStatus(`Odpověď se teď nepodařilo odeslat. Zkontrolujte prosím připojení a zkuste to znovu, nebo nám napište na <a href="${mail}">${config.contactEmail}</a>.`);
        setSending(false);
        return;
      }
      setSending(false);
      els.section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      await tearOff();
      renderSuccess(sent);
      pressStamp();
      els.success.focus({ preventScroll: true });
    });

    form.addEventListener("input", (e) => {
      if (e.target === els.name) renumberGuests();
      if (triedSubmit) validate();
      saveDraft();
    });
    form.addEventListener("change", (e) => {
      if (e.target.name === "attending") syncAttending();
      if (triedSubmit) validate();
      saveDraft();
    });
    els.addGuest.addEventListener("click", () => {
      addGuest({}, { focus: true });
      saveDraft();
    });
    els.reset.addEventListener("click", () => {
      store.remove(SENT_KEY);
      resetForm();
      els.success.hidden = true;
      els.slip.hidden = false;
      form.hidden = false;
      els.section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      $('input[name="attending"]', form).focus({ preventScroll: true });
    });

    /* ----- boot ----- */
    const sent = store.get(SENT_KEY);
    const draft = store.get(DRAFT_KEY);
    if (draft && typeof draft === "object") restoreDraft(draft);
    else addGuest({}, { primary: true });
    syncAttending();
    if (sent && typeof sent === "object" && sent.name) renderSuccess(sent);
  }

  /* --------------------------------------------------------------- Boot */
  initNav();
  initCopy();
  initRsvp();
})();
