/* session.js — assembles the daily study session: due flashcards (warm-up),
 * then a weighted mix of due-review + new + weak-topic questions. */
window.App = window.App || {};

App.Session = {
  MODES: {
    quick: { flashcards: 8,  questions: 8,  label: "Quick (~10 min)" },
    full:  { flashcards: 25, questions: 20, label: "Full cram (~25 min)" }
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
    var dueQ = [], newQ = [];   // retired questions are deliberately dropped
    allQ.forEach(function (q) {
      var c = st.srs.questions[q.id];
      if (!c) newQ.push(q);
      else if (App.SRS.isDue(c)) dueQ.push(q);
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

    // 1. everything you missed or flagged hard comes back first
    add(dueQ, cfg.questions);

    // 2. then unseen questions, weighted toward your two weakest domains
    var weak = App.Analytics.weakestDomains(2).map(function (d) { return d.id; });
    if (weak.length) {
      var weakPool = this._shuffle(newQ.filter(function (q) { return weak.indexOf(q.domain) !== -1; }));
      add(weakPool, Math.ceil(cfg.questions * 0.3));
    }

    // 3. fill the rest with unseen questions, proportional to exam weight.
    //    Nothing already cleared is ever added back - the session just gets
    //    shorter as you burn down the bank.
    add(this._weightByDomain(this._shuffle(newQ)), cfg.questions - picked.length);

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
