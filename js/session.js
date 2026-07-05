/* session.js — assembles the daily study session: due flashcards (warm-up),
 * then a weighted mix of due-review + new + weak-topic questions. */
window.App = window.App || {};

App.Session = {
  MODES: {
    quick: { flashcards: 3, questions: 6, label: "Quick (~15 min)" },
    full:  { flashcards: 5, questions: 12, label: "Full (~25–30 min)" }
  },

  _shuffle: function (arr) {
    arr = arr.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  },

  build: function (mode) {
    var cfg = this.MODES[mode] || this.MODES.full;
    var st = App.Store.get();

    /* ---------- warm-up flashcards (due first, then new) ---------- */
    var allF = App.Content.flashcards();
    var dueF = [], newF = [];
    allF.forEach(function (f) {
      var c = st.srs.flashcards[f.id];
      if (!c) newF.push(f);
      else if (App.SRS.isDue(c)) dueF.push(f);
    });
    // prioritize most-overdue
    dueF.sort(function (a, b) {
      return App.SRS.overdueDays(st.srs.flashcards[b.id]) - App.SRS.overdueDays(st.srs.flashcards[a.id]);
    });
    var flashcards = dueF.concat(this._shuffle(newF)).slice(0, cfg.flashcards);

    /* ---------- questions: due review + weak-topic + new ---------- */
    var allQ = App.Content.questions();
    var dueQ = [], newQ = [], seenQ = [];
    allQ.forEach(function (q) {
      var c = st.srs.questions[q.id];
      if (!c) newQ.push(q);
      else if (App.SRS.isDue(c)) dueQ.push(q);
      else seenQ.push(q);
    });
    dueQ.sort(function (a, b) {
      return App.SRS.overdueDays(st.srs.questions[b.id]) - App.SRS.overdueDays(st.srs.questions[a.id]);
    });

    var picked = [];
    var usedIds = {};
    function add(list, n) {
      for (var i = 0; i < list.length && n > 0; i++) {
        if (!usedIds[list[i].id]) { usedIds[list[i].id] = true; picked.push(list[i]); n--; }
      }
    }

    // ~40% due reviews (spaced repetition priority)
    add(dueQ, Math.ceil(cfg.questions * 0.4));

    // ~30% weighted toward the two weakest domains
    var weak = App.Analytics.weakestDomains(2).map(function (d) { return d.id; });
    if (weak.length) {
      var weakPool = this._shuffle(newQ.concat(seenQ).filter(function (q) { return weak.indexOf(q.domain) !== -1; }));
      add(weakPool, Math.ceil(cfg.questions * 0.3));
    }

    // fill remainder with new questions, proportional to domain exam weight
    var weightedNew = this._weightByDomain(this._shuffle(newQ));
    add(weightedNew, cfg.questions - picked.length);

    // last resort: any not-yet-used seen questions
    add(this._shuffle(seenQ), cfg.questions - picked.length);

    return {
      mode: mode,
      flashcards: flashcards,
      questions: this._shuffle(picked).slice(0, cfg.questions)
    };
  },

  /* order a list so higher-weight domains appear earlier (roughly proportional) */
  _weightByDomain: function (list) {
    return list.slice().sort(function (a, b) {
      var wa = (window.BCEMP_DOMAIN_MAP[a.domain] || { weight: 1 }).weight;
      var wb = (window.BCEMP_DOMAIN_MAP[b.domain] || { weight: 1 }).weight;
      return (wb - wa) + (Math.random() - 0.5) * 6; // weight-biased with jitter
    });
  }
};
