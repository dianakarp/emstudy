/* content.js — unified access to the built-in banks + content the reader imported,
 * plus where each item came from (shown under answers) and "report a problem" links. */
window.App = window.App || {};

App.Content = {
  REPO: "https://github.com/dianakarp/emstudy",

  /* where each item comes from, keyed by id prefix */
  BANKS: [
    { prefix: "pe24-", name: "Practice questions", credit: "written by Diana Karp", updated: "2026-07" },
    { prefix: "bs-",   name: "Biostatistics drill", updated: "2026-07" },
    { prefix: "fc-",   name: "Core flashcards", updated: "2026-07" },
    { prefix: "qc-",   name: "Study-notes flashcards", updated: "2026-07" },
    { prefix: "cq-",   name: "Imported by you", mine: true },
    { prefix: "cf-",   name: "Imported by you", mine: true }
  ],

  /* Session bank = the original practice questions + anything imported.
   * The biostats drill bank stays separate (Biostats tab only). */
  questions: function () {
    var custom = App.Store.get().customContent.questions || [];
    return (window.BCEMP_EMPC24_QUESTIONS || []).concat(custom);
  },
  drillQuestions: function () { return window.BCEMP_BIOSTATS_QUESTIONS || []; },
  allQuestions: function () { return this.questions().concat(this.drillQuestions()); },
  flashcards: function () {
    var custom = App.Store.get().customContent.flashcards || [];
    return (window.BCEMP_FLASHCARDS || []).concat(custom);
  },
  comparisons: function () { return window.BCEMP_COMPARISONS || []; },

  questionById: function (id) { return this.allQuestions().filter(function (q) { return q.id === id; })[0]; },
  flashcardById: function (id) { return this.flashcards().filter(function (f) { return f.id === id; })[0]; },
  byDomain: function (list, domainId) { return list.filter(function (x) { return x.domain === domainId; }); },

  /* topics that have at least one question in the session bank */
  domainsWithQuestions: function () {
    var have = {};
    this.questions().forEach(function (q) { have[q.domain] = true; });
    return (window.BCEMP_DOMAINS || []).filter(function (d) { return have[d.id]; });
  },
  /* topics with anything to study (questions or flashcards) */
  domainsWithContent: function () {
    var have = {};
    this.questions().concat(this.flashcards()).forEach(function (x) { have[x.domain] = true; });
    return (window.BCEMP_DOMAINS || []).filter(function (d) { return have[d.id]; });
  },

  bank: function (id) {
    id = String(id || "");
    for (var i = 0; i < this.BANKS.length; i++) if (id.indexOf(this.BANKS[i].prefix) === 0) return this.BANKS[i];
    return { name: "Built-in content", updated: null };
  },

  /* the "where is this from" line: bank, optional per-item source, last update */
  meta: function (item) {
    var custom = App.Store.get().customContent;
    var imported = item && (custom.questions.indexOf(item) !== -1 || custom.flashcards.indexOf(item) !== -1);
    var b = imported ? { name: "Imported by you", mine: true } : this.bank(item && item.id);
    return {
      bank: b.name + (b.credit ? ", " + b.credit : ""),
      source: item && item.source ? String(item.source) : "",
      updated: (item && item.updated) || b.updated || "",
      mine: !!b.mine
    };
  },

  /* prefilled GitHub issue so readers can flag an error with the exact item */
  reportUrl: function (item, kind) {
    var label = kind === "flashcard" ? "flashcard" : kind === "table" ? "comparison table" : "question";
    var text = kind === "flashcard" ? item.front : kind === "table" ? item.title : item.stem;
    text = String(text || "").replace(/\s+/g, " ").trim();
    var ref = item.id || item.title || "";
    var title = "Content problem: " + ref;
    var body = "**Item:** " + ref + " (" + label + ")\n" +
      "**Text:** " + text.slice(0, 180) + (text.length > 180 ? "…" : "") + "\n\n" +
      "**What's wrong?**\n\n\n" +
      "**Source or guideline that supports the fix (if you have one):**\n";
    return this.REPO + "/issues/new?title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body);
  }
};
