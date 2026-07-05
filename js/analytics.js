/* analytics.js — per-domain accuracy, mastery, exam-readiness, activity heatmap. */
window.App = window.App || {};

App.Analytics = {
  MIN_ATTEMPTS: 5, // attempts before a domain's mastery is considered "established"

  domainStat: function (domainId) {
    var s = App.Store.get().domainStats[domainId] || { answered: 0, correct: 0 };
    var accuracy = s.answered ? s.correct / s.answered : 0;
    return { answered: s.answered, correct: s.correct, accuracy: accuracy };
  },

  /* mastery blends accuracy with a confidence penalty for low sample size */
  mastery: function (domainId) {
    var s = this.domainStat(domainId);
    if (s.answered === 0) return 0;
    var confidence = Math.min(1, s.answered / this.MIN_ATTEMPTS);
    return s.accuracy * confidence; // 0..1
  },

  /* domains sorted weakest-first; only those with at least one attempt */
  weakestDomains: function (limit) {
    var self = this;
    var attempted = App.BCEMP_DOMAINS_WITH_ATTEMPTS();
    attempted.sort(function (a, b) { return self.mastery(a.id) - self.mastery(b.id); });
    return limit ? attempted.slice(0, limit) : attempted;
  },

  /* weighted readiness estimate (0..100). Untouched domains count as 0 so that
   * coverage matters — you can't be "ready" in a domain you've never practiced. */
  readiness: function () {
    var self = this;
    var totalW = 0, acc = 0;
    (window.BCEMP_DOMAINS || []).forEach(function (d) {
      totalW += d.weight;
      acc += d.weight * self.mastery(d.id);
    });
    return totalW ? Math.round((acc / totalW) * 100) : 0;
  },

  readinessLabel: function (pct) {
    if (pct >= 80) return "Exam-ready";
    if (pct >= 65) return "On track";
    if (pct >= 45) return "Building";
    if (pct >= 20) return "Getting started";
    return "Just beginning";
  },

  /* activity map for the last `days` days -> [{date, count, level(0-4)}] */
  heatmap: function (days) {
    var st = App.Store.get();
    var out = [];
    for (var i = days - 1; i >= 0; i--) {
      var d = App.date.addDays(App.date.today(), -i);
      var a = st.activity[d];
      var q = a ? (a.questions + (a.flashcards || 0)) : 0;
      var level = q === 0 ? 0 : q < 5 ? 1 : q < 12 ? 2 : q < 25 ? 3 : 4;
      out.push({ date: d, count: q, level: level });
    }
    return out;
  },

  overallAccuracy: function () {
    var p = App.Store.get().profile;
    return p.totalQuestions ? Math.round((p.totalCorrect / p.totalQuestions) * 100) : 0;
  },

  /* number of question/flashcard reviews due today */
  dueCounts: function () {
    var st = App.Store.get();
    var qDue = 0, fDue = 0;
    App.Content.questions().forEach(function (q) {
      var c = st.srs.questions[q.id];
      if (c && App.SRS.isDue(c)) qDue++;
    });
    App.Content.flashcards().forEach(function (f) {
      var c = st.srs.flashcards[f.id];
      if (c && App.SRS.isDue(c)) fDue++;
    });
    return { questions: qDue, flashcards: fDue };
  }
};

/* small helper so weakestDomains stays readable */
App.BCEMP_DOMAINS_WITH_ATTEMPTS = function () {
  var st = App.Store.get();
  return (window.BCEMP_DOMAINS || []).filter(function (d) {
    var s = st.domainStats[d.id];
    return s && s.answered > 0;
  });
};
