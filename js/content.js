/* content.js — unified access to seed + user-imported content. */
window.App = window.App || {};

App.Content = {
  questions: function () {
    var custom = App.Store.get().customContent.questions || [];
    /* Session bank = Week 2 + the 185-question practice exam. The biostats
     * drill bank (BCEMP_BIOSTATS_QUESTIONS) is deliberately NOT included here —
     * it is reachable only from the Stats tab. */
    return (window.BCEMP_QUESTIONS || [])
      .concat(window.BCEMP_EMPC24_QUESTIONS || [])
      .concat(custom);
  },
  flashcards: function () {
    var custom = App.Store.get().customContent.flashcards || [];
    return (window.BCEMP_FLASHCARDS || []).concat(custom);
  },
  questionById: function (id) {
    return this.questions().filter(function (q) { return q.id === id; })[0];
  },
  flashcardById: function (id) {
    return this.flashcards().filter(function (f) { return f.id === id; })[0];
  },
  byDomain: function (list, domainId) {
    return list.filter(function (x) { return x.domain === domainId; });
  }
};
