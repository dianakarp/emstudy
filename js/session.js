/* session.js — assembles a study session: due flashcards as a warm-up, then a
 * mix of due reviews, weak-topic questions and new questions.
 * Options narrow it to chosen topics, or to missed / bookmarked items only. */
window.App = window.App || {};

App.Session = {
  SIZES: {
    quick: { flashcards: 8,  questions: 8,  label: "Quick session" },
    full:  { flashcards: 25, questions: 20, label: "Full session" }
  },

  _shuffle: function (arr) {
    arr = arr.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  },

  /* size: "quick" | "full"; opts: { domains: [ids], only: "missed" | "bookmarked" } */
  build: function (size, opts) {
    opts = opts || {};
    var cfg = this.SIZES[size] || this.SIZES.full;
    var st = App.Store.get();
    var domains = opts.domains && opts.domains.length ? opts.domains : null;
    var inTopics = function (x) { return !domains || domains.indexOf(x.domain) !== -1; };

    /* ---------- focused review: missed or bookmarked items only ---------- */
    if (opts.only === "missed" || opts.only === "bookmarked") {
      var src = opts.only === "missed" ? App.Analytics.missed() : App.Analytics.bookmarked();
      return {
        size: size, only: opts.only,
        flashcards: this._shuffle(src.flashcards.filter(inTopics)).slice(0, 30),
        questions: this._shuffle(src.questions.filter(inTopics)).slice(0, 30)
      };
    }

    /* ---------- warm-up flashcards (due first, then new) ---------- */
    var dueF = [], newF = [];
    App.Content.flashcards().filter(inTopics).forEach(function (f) {
      var c = st.srs.flashcards[f.id];
      if (!c) newF.push(f);
      else if (App.SRS.isDue(c)) dueF.push(f);
    });
    dueF.sort(function (a, b) {
      return App.SRS.overdueDays(st.srs.flashcards[b.id]) - App.SRS.overdueDays(st.srs.flashcards[a.id]);
    });
    var flashcards = dueF.concat(this._shuffle(newF)).slice(0, cfg.flashcards);

    /* ---------- questions: due review + weak-topic + new ---------- */
    var dueQ = [], newQ = [];
    App.Content.questions().filter(inTopics).forEach(function (q) {
      var c = st.srs.questions[q.id];
      if (!c) newQ.push(q);
      else if (App.SRS.isDue(c)) dueQ.push(q);
    });
    dueQ.sort(function (a, b) {
      return App.SRS.overdueDays(st.srs.questions[b.id]) - App.SRS.overdueDays(st.srs.questions[a.id]);
    });

    var picked = [], usedIds = {};
    function add(list, n) {
      for (var i = 0; i < list.length && n > 0; i++) {
        if (!usedIds[list[i].id]) { usedIds[list[i].id] = true; picked.push(list[i]); n--; }
      }
    }

    // 1. reviews you owe come back first
    add(dueQ, cfg.questions);

    // 2. then unseen questions, weighted toward your two weakest topics
    var weak = App.Analytics.weakestDomains(2).map(function (d) { return d.id; })
      .filter(function (id) { return !domains || domains.indexOf(id) !== -1; });
    if (weak.length) {
      var weakPool = this._shuffle(newQ.filter(function (q) { return weak.indexOf(q.domain) !== -1; }));
      add(weakPool, Math.ceil(cfg.questions * 0.3));
    }

    // 3. fill the rest with unseen questions, roughly proportional to exam weight
    add(this._weightByDomain(this._shuffle(newQ)), cfg.questions - picked.length);

    return { size: size, domains: domains, flashcards: flashcards, questions: this._shuffle(picked).slice(0, cfg.questions) };
  },

  /* order a list so higher-weight topics appear earlier (roughly proportional) */
  _weightByDomain: function (list) {
    return list.slice().sort(function (a, b) {
      var wa = (window.BCEMP_DOMAIN_MAP[a.domain] || { weight: 1 }).weight;
      var wb = (window.BCEMP_DOMAIN_MAP[b.domain] || { weight: 1 }).weight;
      return (wb - wa) + (Math.random() - 0.5) * 6; // weight-biased with jitter
    });
  }
};
