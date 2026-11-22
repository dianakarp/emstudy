/* analytics.js — per-topic accuracy, mastery, readiness, coverage, activity heatmap. */
window.App = window.App || {};

App.Analytics = {
  MIN_ATTEMPTS: 5, // attempts before a topic's mastery is considered "established"

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

  /* topics sorted weakest-first; only those with at least one attempt */
  weakestDomains: function (limit) {
    var self = this;
    var st = App.Store.get();
    var attempted = (window.BCEMP_DOMAINS || []).filter(function (d) {
      var s = st.domainStats[d.id]; return s && s.answered > 0;
    });
    attempted.sort(function (a, b) { return self.mastery(a.id) - self.mastery(b.id); });
    return limit ? attempted.slice(0, limit) : attempted;
  },

  /* weighted readiness (0..100) over the topics that actually have questions,
   * so a topic with nothing to practice can't hold the score down.
   * Untouched topics count as 0: you can't be ready in a topic you never practiced. */
  readiness: function () {
    var self = this, totalW = 0, acc = 0;
    App.Content.domainsWithQuestions().forEach(function (d) {
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

  /* activity for the last `days` days -> [{date, count, level(0-4)}] */
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

  /* how much of a list is done / due / new, in the current mode's terms.
   * cram:    done = cleared,             due = seen but not cleared
   * refresh: done = seen, not due today, due = due today or overdue */
  tally: function (items, map) {
    var done = 0, due = 0, unseen = 0;
    items.forEach(function (it) {
      var c = map[it.id];
      if (!c) unseen++;
      else if (App.SRS.isDue(c)) due++;
      else done++;
    });
    var total = items.length;
    return { total: total, done: done, due: due, unseen: unseen, pct: total ? Math.round((done / total) * 100) : 0 };
  },

  coverage: function (domains) {
    var st = App.Store.get();
    var inTopics = function (x) { return !domains || !domains.length || domains.indexOf(x.domain) !== -1; };
    return {
      questions: this.tally(App.Content.questions().filter(inTopics), st.srs.questions),
      flashcards: this.tally(App.Content.flashcards().filter(inTopics), st.srs.flashcards)
    };
  },

  /* items you got wrong last time you saw them */
  missed: function () {
    var st = App.Store.get();
    return {
      questions: App.Content.allQuestions().filter(function (q) { return App.SRS.isMissed(st.srs.questions[q.id]); }),
      flashcards: App.Content.flashcards().filter(function (f) { return App.SRS.isMissed(st.srs.flashcards[f.id]); })
    };
  },

  bookmarked: function () {
    var b = App.Store.get().bookmarks;
    return {
      questions: App.Content.allQuestions().filter(function (q) { return b[q.id]; }),
      flashcards: App.Content.flashcards().filter(function (f) { return b[f.id]; })
    };
  },

  dueToday: function () {
    var c = this.coverage();
    return c.questions.due + c.flashcards.due;
  }
};
