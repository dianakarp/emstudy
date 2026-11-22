/* library.js — search and browse every question, flashcard and comparison table.
 * Items open in place to show the answer, explanation and source. */
window.App = window.App || {};

App.Library = {
  state: { q: "", kind: "all", topic: "", only: "", limit: 40 },
  _items: [],

  /* flatten all content into one searchable list */
  _build: function () {
    var items = [];
    function low(parts) { return parts.join(" \n ").toLowerCase(); }
    App.Content.questions().forEach(function (q) {
      items.push({ kind: "question", item: q, id: q.id, domain: q.domain, title: q.stem,
        hay: low([q.stem, (q.options || []).join(" "), q.rationale || "", (q.tags || []).join(" "), q.id]) });
    });
    App.Content.drillQuestions().forEach(function (q) {
      items.push({ kind: "question", drill: true, item: q, id: q.id, domain: q.domain, title: q.stem,
        hay: low([q.stem, (q.options || []).join(" "), q.rationale || "", (q.tags || []).join(" "), q.id, "biostatistics drill"]) });
    });
    App.Content.flashcards().forEach(function (f) {
      items.push({ kind: "flashcard", item: f, id: f.id, domain: f.domain, title: f.front,
        hay: low([f.front, f.back, (f.tags || []).join(" "), f.id]) });
    });
    App.Content.comparisons().forEach(function (c) {
      var rows = (c.rows || []).map(function (r) { return r.join(" "); }).join(" ");
      items.push({ kind: "table", item: c, id: null, domain: null, title: c.title,
        hay: low([c.title, c.tagline || "", c.section || "", (c.cols || []).join(" "), rows]) });
    });
    this._items = items;
  },

  render: function () {
    var UI = App.UI, s = this.state, self = this;
    this._build();
    var missed = App.Analytics.missed(), bm = App.Analytics.bookmarked();
    var nm = missed.questions.length + missed.flashcards.length, nb = bm.questions.length + bm.flashcards.length;

    var html = '<h1 class="page-title">Library</h1>' +
      '<p class="lede">Search every question, flashcard and comparison table. Open an item to see the answer, the explanation and where it comes from.</p>' +
      '<div class="search">' + UI.ICONS.search +
        '<input type="search" id="libQ" placeholder="Search, e.g. naloxone, DKA, NNT" aria-label="Search the library" autocomplete="off" value="' + UI.esc(s.q) + '"></div>' +
      '<div class="lib-filters">' +
        '<div class="chips" role="group" aria-label="Type">' +
          [["all", "All"], ["question", "Questions"], ["flashcard", "Flashcards"], ["table", "Tables"]].map(function (k) {
            return '<button type="button" class="chip" data-kind="' + k[0] + '" aria-pressed="' + (s.kind === k[0]) + '">' + k[1] + '</button>';
          }).join("") +
        '</div>' +
        '<select id="libTopic" aria-label="Topic"><option value="">All topics</option>' +
          App.Content.domainsWithContent().map(function (d) {
            return '<option value="' + d.id + '"' + (s.topic === d.id ? " selected" : "") + '>' + UI.esc(d.name) + '</option>';
          }).join("") +
        '</select>' +
        '<div class="chips" role="group" aria-label="Show only">' +
          '<button type="button" class="chip" data-only="bookmarked" aria-pressed="' + (s.only === "bookmarked") + '">Bookmarked <span class="count">' + nb + '</span></button>' +
          '<button type="button" class="chip" data-only="missed" aria-pressed="' + (s.only === "missed") + '">Missed <span class="count">' + nm + '</span></button>' +
        '</div>' +
      '</div>' +
      ((nm || nb) ? '<div class="btn-row mb">' +
        (nm ? '<button class="btn btn-ghost btn-sm" data-review="missed">Review missed (' + nm + ')</button>' : '') +
        (nb ? '<button class="btn btn-ghost btn-sm" data-review="bookmarked">Study bookmarks (' + nb + ')</button>' : '') +
      '</div>' : '') +
      '<div id="libResults"></div>';

    UI.root.innerHTML = html;

    var timer = null, input = document.getElementById("libQ");
    input.oninput = function () {
      clearTimeout(timer);
      timer = setTimeout(function () { s.q = input.value; s.limit = 40; self.renderResults(); }, 120);
    };
    Array.prototype.forEach.call(UI.root.querySelectorAll("[data-kind]"), function (b) {
      b.onclick = function () { s.kind = b.getAttribute("data-kind"); s.limit = 40; self._syncChips(); self.renderResults(); };
    });
    Array.prototype.forEach.call(UI.root.querySelectorAll("[data-only]"), function (b) {
      b.onclick = function () { var v = b.getAttribute("data-only"); s.only = s.only === v ? "" : v; s.limit = 40; self._syncChips(); self.renderResults(); };
    });
    document.getElementById("libTopic").onchange = function () { s.topic = this.value; s.limit = 40; self.renderResults(); };
    this.renderResults();
  },

  /* keep the Bookmarked / Missed chip counts current after a bookmark toggles */
  refreshCounts: function () {
    var missed = App.Analytics.missed(), bm = App.Analytics.bookmarked();
    var n = { bookmarked: bm.questions.length + bm.flashcards.length, missed: missed.questions.length + missed.flashcards.length };
    Array.prototype.forEach.call(App.UI.root.querySelectorAll("[data-only] .count"), function (c) {
      c.textContent = n[c.parentNode.getAttribute("data-only")];
    });
  },

  _syncChips: function () {
    var s = this.state;
    Array.prototype.forEach.call(App.UI.root.querySelectorAll("[data-kind]"), function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-kind") === s.kind); });
    Array.prototype.forEach.call(App.UI.root.querySelectorAll("[data-only]"), function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-only") === s.only); });
  },

  _filter: function () {
    var s = this.state, st = App.Store.get();
    var terms = s.q.toLowerCase().split(/\s+/).filter(Boolean);
    var out = [];
    this._items.forEach(function (it) {
      if (s.kind !== "all" && it.kind !== s.kind) return;
      if (s.topic && it.domain !== s.topic) return;
      if (s.only === "bookmarked" && !(it.id && st.bookmarks[it.id])) return;
      if (s.only === "missed") {
        var map = it.kind === "flashcard" ? st.srs.flashcards : st.srs.questions;
        if (!it.id || it.kind === "table" || !App.SRS.isMissed(map[it.id])) return;
      }
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        if (it.hay.indexOf(terms[i]) === -1) return;
        score += it.title.toLowerCase().indexOf(terms[i]) !== -1 ? 2 : 1;
      }
      out.push({ it: it, score: score });
    });
    if (terms.length) out.sort(function (a, b) { return b.score - a.score; });
    return { list: out.map(function (x) { return x.it; }), terms: terms };
  },

  /* escape text and wrap search terms in <mark> */
  _hl: function (text, terms) {
    text = String(text || "");
    if (!terms.length) return App.UI.esc(text);
    var re = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "ig");
    return text.split(re).map(function (part, i) { return i % 2 ? "<mark>" + App.UI.esc(part) + "</mark>" : App.UI.esc(part); }).join("");
  },

  renderResults: function () {
    var UI = App.UI, s = this.state, self = this, st = App.Store.get();
    var res = this._filter(), list = res.list, terms = res.terms;
    var box = document.getElementById("libResults");
    if (!box) return;
    var kinds = { question: "Question", flashcard: "Flashcard", table: "Table" };

    var html = '<p class="lib-count" aria-live="polite">' + (list.length ? UI.plural(list.length, "item") + (s.q ? ' match "' + UI.esc(s.q) + '"' : "") : "") + '</p>';
    if (!list.length) {
      html += '<div class="card empty">' + (s.only === "bookmarked" ? "No bookmarks here yet. Use Bookmark on any question or flashcard."
        : s.only === "missed" ? "Nothing missed here. Questions and flashcards you get wrong show up in this list."
        : "No matches. Try a drug name, a condition or an abbreviation.") + '</div>';
      box.innerHTML = html;
      return;
    }

    html += '<div class="lib-list">';
    list.slice(0, s.limit).forEach(function (it, n) {
      var sub = it.kind === "table" ? UI.esc(it.item.section)
        : UI.esc(UI.domainName(it.domain)) + (it.drill ? ", biostatistics drill" : "");
      var flags = "";
      if (it.id && st.bookmarks[it.id]) flags += '<span class="tag mark">Bookmarked</span>';
      var card = it.id && (it.kind === "flashcard" ? st.srs.flashcards[it.id] : st.srs.questions[it.id]);
      if (App.SRS.isMissed(card)) flags += '<span class="tag">Missed</span>';
      html += '<details class="lib-item" data-n="' + n + '"><summary>' +
        '<span class="lib-kind">' + kinds[it.kind] + '</span>' +
        '<span class="lib-main"><span class="lib-title lib-clamp">' + self._hl(it.title, terms) + '</span><span class="lib-sub">' + sub + '</span></span>' +
        (flags ? '<span class="lib-flags">' + flags + '</span>' : '') +
        '</summary><div class="lib-body"></div></details>';
    });
    html += '</div>';
    if (list.length > s.limit) html += '<div class="lib-more"><button type="button" class="btn btn-ghost" id="libMore">Show ' + Math.min(40, list.length - s.limit) + ' more</button></div>';
    box.innerHTML = html;

    // bodies render on first open, so long result lists stay light
    Array.prototype.forEach.call(box.querySelectorAll("details.lib-item"), function (d) {
      d.addEventListener("toggle", function () {
        if (!d.open || d.getAttribute("data-built")) return;
        d.setAttribute("data-built", "1");
        d.querySelector(".lib-body").innerHTML = self._body(list[+d.getAttribute("data-n")], terms);
        var open = d.querySelector("[data-open-compare]");
        if (open) open.onclick = function () { UI.route("compare", { open: list[+d.getAttribute("data-n")].item.title }); };
      });
    });
    var more = document.getElementById("libMore");
    if (more) more.onclick = function () { s.limit += 40; self.renderResults(); };
  },

  _body: function (it, terms) {
    var UI = App.UI, self = this, x = it.item;
    if (it.kind === "question") {
      var letters = "ABCDEFGH";
      return '<p class="q-stem">' + self._hl(x.stem, terms) + '</p>' +
        '<ol class="lib-opts">' + x.options.map(function (o, i) {
          var ok = i === x.correctIndex;
          return '<li' + (ok ? ' class="correct"' : '') + '><span class="opt-key">' + letters[i] + '</span><span>' + self._hl(o, terms) + '</span>' +
            (ok ? '<span class="opt-mark">✓ Correct answer</span>' : '') + '</li>';
        }).join("") + '</ol>' +
        '<div class="rationale">' + self._hl(x.rationale, terms) + UI.metaRow(x, "question") + '</div>' +
        '<div class="row mt">' + UI.bookmarkBtn(x.id) + '</div>';
    }
    if (it.kind === "flashcard") {
      return '<div class="rationale" style="margin-top:0">' + self._hl(x.back, terms) + UI.metaRow(x, "flashcard") + '</div>' +
        '<div class="row mt">' + UI.bookmarkBtn(x.id) + '</div>';
    }
    return (x.tagline ? '<p style="color:var(--ink-2)">' + self._hl(x.tagline, terms) + '</p>' : '') +
      '<p class="small">' + UI.esc((x.cols || []).join(" vs ")) + ', ' + UI.plural((x.rows || []).length, "row") + '.</p>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-open-compare>Open in Compare</button>';
  }
};
