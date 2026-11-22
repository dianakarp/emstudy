/* ui.js — rendering + interaction for every screen (vanilla DOM, no framework).
 * The Library view lives in library.js. */
window.App = window.App || {};

App.UI = {
  root: null,
  view: "dashboard",
  routeOpts: {},
  active: null,          // in-progress session runtime
  compareFilter: "all",

  /* ==================================================================
   * UTILITIES
   * ================================================================== */
  esc: function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  },
  domainName: function (id) { var d = window.BCEMP_DOMAIN_MAP[id]; return d ? d.name : id; },
  masteryClass: function (m) { return m >= 0.8 ? "bar-good" : m >= 0.55 ? "bar-mid" : m > 0 ? "bar-bad" : "bar-none"; },
  reducedMotion: function () { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; },
  plural: function (n, one, many) { return n + " " + (n === 1 ? one : (many || one + "s")); },

  ICONS: {
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4.2L6 20V5a1 1 0 0 1 1-1z"/></svg>',
    chevron: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>'
  },

  toast: function (msg, opts) {
    opts = opts || {};
    var old = document.querySelector(".toast"); if (old) old.remove();
    var t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status");
    var span = document.createElement("span"); span.textContent = msg; t.appendChild(span);
    if (opts.action) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = opts.action;
      b.onclick = function () { t.remove(); if (opts.onAction) opts.onAction(); };
      t.appendChild(b);
    }
    document.body.appendChild(t);
    if (!opts.sticky) {
      setTimeout(function () { t.style.transition = "opacity .4s"; t.style.opacity = "0"; }, 2200);
      setTimeout(function () { t.remove(); }, 2700);
    }
  },

  /* in-page confirm dialog (replaces window.confirm) */
  confirm: function (o, onYes) {
    var d = document.createElement("dialog");
    if (typeof d.showModal !== "function") { if (window.confirm(o.title + "\n\n" + (o.body || ""))) onYes(); return; }
    d.className = "dlg";
    d.innerHTML = '<h2>' + this.esc(o.title) + '</h2>' + (o.body ? '<p>' + this.esc(o.body) + '</p>' : '') +
      '<div class="btn-row"><button type="button" class="btn btn-ghost" data-no>' + this.esc(o.cancelLabel || "Cancel") + '</button>' +
      '<button type="button" class="btn ' + (o.danger ? "btn-danger solid" : "btn-primary") + '" data-yes>' + this.esc(o.confirmLabel || "OK") + '</button></div>';
    document.body.appendChild(d);
    d.addEventListener("close", function () { d.remove(); });
    d.querySelector("[data-no]").onclick = function () { d.close(); };
    d.querySelector("[data-yes]").onclick = function () { d.close(); onYes(); };
    d.showModal();
    d.querySelector("[data-no]").focus();
  },

  ring: function (pct, top, bottom, label) {
    pct = Math.max(0, Math.min(100, pct || 0));
    var r = 50, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return '<div class="ring-wrap" role="img" aria-label="' + this.esc(label || (top + " " + bottom)) + '">' +
      '<svg width="116" height="116" viewBox="0 0 116 116" aria-hidden="true">' +
      '<circle class="ring-track" cx="58" cy="58" r="50" fill="none" stroke-width="9"/>' +
      '<circle class="ring-fill" cx="58" cy="58" r="50" fill="none" stroke-width="9" stroke-linecap="' + (pct > 0 ? "round" : "butt") + '" ' +
      'stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '" transform="rotate(-90 58 58)"/>' +
      '</svg><div class="center"><div class="lv">' + top + '</div><div class="lvl">' + bottom + '</div></div></div>';
  },

  bookmarkBtn: function (id) {
    var on = App.isBookmarked(id);
    return '<button type="button" class="bm-btn" data-bm="' + this.esc(id) + '" aria-pressed="' + on + '">' + this.ICONS.bookmark +
      '<span>' + (on ? "Bookmarked" : "Bookmark") + '</span></button>';
  },

  /* "where is this from" line under an answer */
  metaRow: function (item, kind) {
    var m = App.Content.meta(item);
    var html = '<div class="meta-row"><span>From: ' + this.esc(m.bank) + '</span>';
    if (m.source) html += '<span>Source: ' + this.esc(m.source) + '</span>';
    if (m.updated) html += '<span>Updated ' + this.esc(App.date.monthYear(m.updated)) + '</span>';
    if (!m.mine) html += '<a href="' + this.esc(App.Content.reportUrl(item, kind)) + '" target="_blank" rel="noopener">Report a problem</a>';
    return html + '</div>';
  },

  tile: function (big, lbl, sub) {
    return '<div class="card tile"><div class="big">' + big + '</div><div class="lbl">' + lbl + '</div>' + (sub ? '<div class="sub">' + sub + '</div>' : '') + '</div>';
  },

  /* ==================================================================
   * ROUTER
   * ================================================================== */
  route: function (view, opts) {
    var self = this;
    if (this.active && !(opts && opts.force)) {
      this.confirm({ title: "Leave this session?", body: "Your answers so far are saved, but the session won't count toward your streak.", cancelLabel: "Keep studying", confirmLabel: "Leave session" },
        function () { self.active = null; self._go(view, opts); });
      return;
    }
    this._go(view, opts);
  },

  _go: function (view, opts) {
    this.view = view;
    this.routeOpts = opts || {};
    this.active = null;
    Array.prototype.forEach.call(document.querySelectorAll("[data-view]"), function (b) {
      var on = b.getAttribute("data-view") === view;
      b.classList.toggle("active", on);
      if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    this.render();
    window.scrollTo(0, 0);
  },

  render: function () {
    if (!this.root) this.root = document.getElementById("app");
    if (this.active) return; // session screens render themselves
    if (this.view === "dashboard") this.renderDashboard();
    else if (this.view === "library") App.Library.render();
    else if (this.view === "compare") this.renderComparisons();
    else if (this.view === "stats") this.renderStats();
    else if (this.view === "progress") this.renderProgress();
    else if (this.view === "settings") this.renderSettings();
  },

  /* one delegated click handler for shared controls inside <main> */
  _onRootClick: function (e) {
    var t = e.target.closest("[data-bm],[data-go],[data-study-topic],[data-review],[data-topic]");
    if (!t || !this.root.contains(t)) return;
    if (t.hasAttribute("data-bm")) {
      var id = t.getAttribute("data-bm");
      var on = App.toggleBookmark(id);
      Array.prototype.forEach.call(this.root.querySelectorAll('[data-bm="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]'), function (b) {
        b.setAttribute("aria-pressed", on);
        b.querySelector("span").textContent = on ? "Bookmarked" : "Bookmark";
      });
      if (this.view === "library" && !this.active) App.Library.refreshCounts();
    } else if (t.hasAttribute("data-go")) {
      this.route(t.getAttribute("data-go"));
    } else if (t.hasAttribute("data-study-topic")) {
      this.startSession("full", { domains: [t.getAttribute("data-study-topic")] });
    } else if (t.hasAttribute("data-review")) {
      this.startSession("full", { only: t.getAttribute("data-review") });
    } else if (t.hasAttribute("data-topic")) {
      var st = App.Store.get(), topic = t.getAttribute("data-topic");
      var list = st.settings.topics.slice();
      if (!topic) list = [];
      else if (list.indexOf(topic) === -1) list.push(topic);
      else list.splice(list.indexOf(topic), 1);
      st.settings.topics = list;
      App.Store.save();
      this.renderDashboard();
      var p = document.getElementById("topicPicker"); if (p) p.open = true;
      var again = this.root.querySelector('[data-topic="' + topic + '"]'); if (again) again.focus();
    }
  },

  /* ==================================================================
   * HOME
   * ================================================================== */
  renderDashboard: function () {
    var st = App.Store.get(), s = st.settings, p = st.profile;
    var prog = App.Game.levelProgress(p.xp);
    var html = "";

    if (!s.onboarded) html += this._welcome();
    else {
      html += '<div class="greet"><h1>' + App.greeting() + (s.name ? ", " + this.esc(s.name) : "") + '.</h1>' +
        '<div class="greet-meta"><span>Level ' + prog.level + '</span><span>' + p.xp + ' XP</span><span>' + p.badges.length + ' of ' + App.Game.BADGES.length + ' badges</span></div></div>';
    }

    html += this._todayCard();

    // tiles
    var readiness = App.Analytics.readiness();
    var exam = App.hasExam(), days = exam ? App.date.daysUntil(s.examDate) : 0;
    var due = App.Analytics.dueToday();
    html += '<div class="grid cols-3 mt">' +
      this.tile(p.streak, p.streak === 1 ? "Day streak" : "Day streak", "Longest: " + p.longestStreak) +
      (exam
        ? this.tile(days === 0 ? "Today" : days, days === 0 ? "Exam day" : (days === 1 ? "Day to exam" : "Days to exam"), App.date.pretty(s.examDate))
        : this.tile(due, "Due today", due ? "Reviews waiting" : "All caught up")) +
      this.tile(readiness + "%", exam ? "Exam readiness" : "Mastery", App.Analytics.readinessLabel(readiness)) +
    '</div>';

    // focus areas
    var weak = App.Analytics.weakestDomains(3);
    html += '<h2 class="section-title">Focus areas</h2>';
    if (weak.length) {
      html += '<div class="card">';
      weak.forEach(function (d) { html += App.UI._domRow(d, true); });
      html += '</div>';
    } else {
      html += '<div class="card empty">Finish a session to see your weakest topics here. Sessions then lean toward them automatically.</div>';
    }

    // review shortcuts
    var missed = App.Analytics.missed(), bm = App.Analytics.bookmarked();
    var nm = missed.questions.length + missed.flashcards.length, nb = bm.questions.length + bm.flashcards.length;
    html += '<h2 class="section-title">Review</h2><div class="btn-row">' +
      (nm ? '<button class="btn btn-ghost" data-review="missed">Review missed (' + nm + ')</button>' : '') +
      (nb ? '<button class="btn btn-ghost" data-review="bookmarked">Study bookmarks (' + nb + ')</button>' : '') +
      '<button class="btn btn-ghost" data-go="library">Search the library</button>' +
    '</div>';
    if (!nm && !nb) html += '<p class="tiny muted mt">Questions you miss and items you bookmark collect here for a focused review.</p>';

    this.root.innerHTML = html;
    var self = this;
    document.getElementById("startFull").onclick = function () { self.startSession("full", { domains: s.topics }); };
    document.getElementById("startQuick").onclick = function () { self.startSession("quick", { domains: s.topics }); };
    if (!s.onboarded) this._wireWelcome();
  },

  _welcome: function () {
    return '<div class="card welcome mb">' +
      '<h1>Welcome to EM Study</h1>' +
      '<p>Board-style questions, flashcards and side-by-side comparison tables for emergency medicine pharmacotherapy. ' +
      'It\'s free, works offline, and your progress stays in this browser.</p>' +
      '<p class="choose-label">How are you using it?</p>' +
      '<div class="choice-row">' +
        '<button type="button" class="choice" id="goalExam" aria-pressed="false"><b>Preparing for an exam</b>' +
          '<span>Cram mode: you see each item once and only misses come back. Add your exam date for a countdown.</span></button>' +
        '<button type="button" class="choice" id="goalRefresh" aria-pressed="false"><b>Keeping my knowledge sharp</b>' +
          '<span>Refresh mode: items come back at growing intervals, from 1 day out to 4 months.</span></button>' +
      '</div>' +
      '<div class="exam-row" id="examRow" hidden>' +
        '<div class="field"><label for="welcomeExam">Exam date (optional)</label><input id="welcomeExam" type="date" min="' + App.date.today() + '"></div>' +
        '<button type="button" class="btn btn-primary" id="welcomeGo">Save and continue</button>' +
      '</div>' +
      '<p class="tiny muted mt">You can change this any time in Settings.</p>' +
    '</div>';
  },

  _wireWelcome: function () {
    var self = this, st = App.Store.get();
    document.getElementById("goalRefresh").onclick = function () {
      st.settings.studyMode = "refresh"; st.settings.onboarded = true; App.Store.save();
      self.renderDashboard(); self.toast("Refresh mode is on.");
    };
    document.getElementById("goalExam").onclick = function () {
      this.setAttribute("aria-pressed", "true");
      document.getElementById("goalRefresh").setAttribute("aria-pressed", "false");
      document.getElementById("examRow").hidden = false;
      document.getElementById("welcomeExam").focus();
    };
    document.getElementById("welcomeGo").onclick = function () {
      var d = document.getElementById("welcomeExam").value;
      st.settings.studyMode = "cram"; st.settings.onboarded = true;
      if (App.date.isValid(d) && App.date.daysUntil(d) >= 0) st.settings.examDate = d;
      App.Store.save();
      self.renderDashboard(); self.toast("Cram mode is on.");
    };
  },

  _todayCard: function () {
    var st = App.Store.get(), s = st.settings;
    var topics = (s.topics || []).filter(function (t) { return window.BCEMP_DOMAIN_MAP[t]; });
    var cov = App.Analytics.coverage(topics);
    var mode = App.SRS.mode();
    var today = App.todayActivity(), goal = s.dailyGoalQuestions || 10;
    var pct = Math.min(100, Math.round((today.questions / goal) * 100));

    var explain = mode === "cram"
      ? "Cram mode: you see each item once. Answer it correctly and it's cleared; misses and <b>Hard</b> come back next session."
      : "Refresh mode: items come back after 1, 3, 7, 21, 60 and 120 days. A miss starts that item over.";

    return '<h2 class="section-title">Today\'s session</h2><div class="card"><div class="today">' +
      this.ring(pct, today.questions + "/" + goal, "today", today.questions + " of " + goal + " questions answered today") +
      '<div class="today-main">' +
        '<div class="mode-line"><span class="tag mark">' + (mode === "cram" ? "Cram mode" : "Refresh mode") + '</span>' +
          '<button type="button" class="link-btn" data-go="settings">Change</button></div>' +
        this._burndown("Questions", cov.questions, mode) +
        this._burndown("Flashcards", cov.flashcards, mode) +
        this._topicPicker(topics) +
        '<p class="explain">' + explain + '</p>' +
        '<div class="btn-row">' +
          '<button class="btn btn-primary" id="startFull">Start session</button>' +
          '<button class="btn btn-ghost" id="startQuick">Quick session</button>' +
        '</div>' +
      '</div>' +
    '</div></div>';
  },

  /* done | due | new bar, in the current mode's words */
  _burndown: function (label, c, mode) {
    var pctC = c.total ? (c.done / c.total) * 100 : 0;
    var pctR = c.total ? (c.due / c.total) * 100 : 0;
    var doneWord = mode === "cram" ? "cleared" : "learned";
    var key = mode === "cram"
      ? c.due + " to review, " + c.unseen + " not seen yet"
      : c.due + " due today, " + c.unseen + " new";
    return '<div class="bd">' +
      '<div class="bd-top"><span class="bd-l">' + label + '</span>' +
      '<span class="bd-n"><b>' + c.done + '</b> of ' + c.total + ' ' + doneWord + '</span></div>' +
      '<div class="bd-track" aria-hidden="true">' +
        '<span class="bd-c" style="width:' + pctC + '%"></span>' +
        '<span class="bd-r" style="width:' + pctR + '%"></span>' +
      '</div>' +
      '<div class="bd-key">' + key + '</div>' +
    '</div>';
  },

  _topicPicker: function (topics) {
    var self = this;
    var counts = {};
    App.Content.questions().concat(App.Content.flashcards()).forEach(function (x) { counts[x.domain] = (counts[x.domain] || 0) + 1; });
    var label = !topics.length ? "All topics"
      : topics.length <= 2 ? topics.map(function (t) { return self.esc(self.domainName(t)); }).join(", ")
      : topics.length + " topics";
    var html = '<details class="topics" id="topicPicker"><summary><span>Topics:</span> <b>' + label + '</b> <span class="link-btn">Choose</span></summary>' +
      '<div class="chips"><button type="button" class="chip" data-topic="" aria-pressed="' + (!topics.length) + '">All topics</button>';
    App.Content.domainsWithContent().forEach(function (d) {
      html += '<button type="button" class="chip" data-topic="' + d.id + '" aria-pressed="' + (topics.indexOf(d.id) !== -1) + '">' +
        self.esc(d.name) + ' <span class="count">' + (counts[d.id] || 0) + '</span></button>';
    });
    return html + '</div></details>';
  },

  _domRow: function (d, withStudy) {
    var m = App.Analytics.mastery(d.id);
    var pct = Math.round(m * 100);
    var s = App.Analytics.domainStat(d.id);
    var label = s.answered ? pct + "%, " + s.correct + "/" + s.answered : "Not started";
    return '<div class="dom-row"><div class="name">' + this.esc(d.name) + '</div>' +
      '<div class="track" aria-hidden="true"><span class="' + this.masteryClass(m) + '" style="width:' + Math.max(2, pct) + '%"></span></div>' +
      '<div class="pct">' + label + '</div>' +
      (withStudy ? '<button type="button" class="btn btn-ghost btn-sm" data-study-topic="' + d.id + '" aria-label="Study ' + this.esc(d.name) + '">Study</button>' : '') +
    '</div>';
  },

  /* ==================================================================
   * PROGRESS
   * ================================================================== */
  renderProgress: function () {
    var st = App.Store.get(), p = st.profile;
    var readiness = App.Analytics.readiness();
    var exam = App.hasExam();
    var prog = App.Game.levelProgress(p.xp);
    var self = this;
    var html = '<h1 class="page-title">Progress</h1>';

    html += '<div class="grid cols-3 mt">' +
      this.tile(readiness + "%", exam ? "Exam readiness" : "Mastery", App.Analytics.readinessLabel(readiness) + ", weighted by topic") +
      this.tile(App.Analytics.overallAccuracy() + "%", "Overall accuracy", this.plural(p.totalQuestions, "question") + " answered") +
      this.tile(p.totalSessions, p.totalSessions === 1 ? "Session" : "Sessions", "Level " + prog.level + ", " + p.xp + " XP") +
    '</div>';

    html += '<h2 class="section-title">Mastery by topic</h2><div class="card">';
    var withQs = {};
    App.Content.domainsWithQuestions().forEach(function (d) { withQs[d.id] = true; });
    App.Content.domainsWithContent().forEach(function (d) { html += self._domRow(d, true); });
    html += '</div><p class="tiny muted mt">Mastery is your accuracy in a topic, scaled down until you\'ve answered 5 questions there. ' +
      'Study starts a session in that topic only.</p>';

    html += '<h2 class="section-title">Study activity, last 30 days</h2><div class="card">';
    html += '<div class="heat" role="img" aria-label="Study activity heatmap for the last 30 days">';
    var today = App.date.today();
    App.Analytics.heatmap(30).forEach(function (c) {
      html += '<div class="cell' + (c.level ? " l" + c.level : "") + (c.date === today ? " today" : "") + '" title="' + App.date.pretty(c.date) + ": " + c.count + ' items"></div>';
    });
    html += '</div><p class="tiny muted" style="margin:10px 0 0">Each square is a day; darker means more items reviewed. Today is outlined in yellow.</p></div>';

    html += '<h2 class="section-title">Badges (' + p.badges.length + " of " + App.Game.BADGES.length + ')</h2><div class="badges">';
    App.Game.BADGES.forEach(function (b) {
      var earned = p.badges.indexOf(b.id) !== -1;
      html += '<div class="badge' + (earned ? "" : " locked") + '"><span class="seal" aria-hidden="true">' + self.esc(b.seal) + '</span>' +
        '<span><span class="bn">' + self.esc(b.name) + (earned ? "" : '<span class="sr-only"> (not earned yet)</span>') + '</span><span class="bd">' + self.esc(b.desc) + '</span></span></div>';
    });
    html += '</div>';

    this.root.innerHTML = html;
  },

  /* ==================================================================
   * COMPARE (collapsible side-by-side tables)
   * ================================================================== */
  renderComparisons: function () {
    var self = this;
    var list = App.Content.comparisons();
    var opts = this.routeOpts || {};
    if (opts.open) this.compareFilter = "all";
    var filter = this.compareFilter || "all";

    var counts = {}, sections = [];
    list.forEach(function (c) { if (!counts[c.section]) { counts[c.section] = 0; sections.push(c.section); } counts[c.section]++; });
    if (filter !== "all" && !counts[filter]) filter = this.compareFilter = "all";

    var html = '<h1 class="page-title">Compare</h1>' +
      '<p class="lede">High-yield side-by-side distinctions, ' + list.length + ' tables. Open one to study it, or filter by topic.</p>';
    html += '<div class="cmp-filters" role="group" aria-label="Filter tables by topic">' +
      '<button type="button" class="chip" data-s="all" aria-pressed="' + (filter === "all") + '">All <span class="count">' + list.length + '</span></button>';
    sections.forEach(function (s) {
      html += '<button type="button" class="chip" data-s="' + self.esc(s) + '" aria-pressed="' + (s === filter) + '">' + self.esc(s) + ' <span class="count">' + counts[s] + '</span></button>';
    });
    html += '</div><div class="cmp-tools"><button type="button" class="link-btn" id="cmpOpen">Expand all</button><button type="button" class="link-btn" id="cmpClose">Collapse all</button></div>';

    list.forEach(function (c, i) {
      if (filter !== "all" && c.section !== filter) return;
      html += '<details class="cmp" data-i="' + i + '"' + (opts.open === c.title ? " open" : "") + '>' +
        '<summary>' + self.ICONS.chevron +
          '<span class="cmp-headtext"><span class="cmp-title">' + self.esc(c.title) + '</span>' +
          (c.tagline ? '<span class="cmp-tag">' + self.esc(c.tagline) + '</span>' : '') + '</span>' +
          '<span class="cmp-sec">' + self.esc(c.section) + '</span>' +
        '</summary><div class="cmp-body"><div class="cmp-scroll"><table class="cmp-table"><thead><tr><th class="cmp-rl"><span class="sr-only">Feature</span></th>';
      c.cols.forEach(function (col) { html += '<th scope="col">' + self.esc(col) + '</th>'; });
      html += '</tr></thead><tbody>';
      c.rows.forEach(function (row) {
        html += '<tr><th scope="row" class="cmp-rl">' + self.esc(row[0]) + '</th>';
        for (var j = 1; j < row.length; j++) html += '<td data-label="' + self.esc(c.cols[j - 1]) + '">' + self.esc(row[j]) + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table></div>' +
        '<div class="meta-row"><span>Updated Jul 2026</span><a href="' + self.esc(App.Content.reportUrl(c, "table")) + '" target="_blank" rel="noopener">Report a problem</a></div>' +
        '</div></details>';
    });

    this.root.innerHTML = html;
    Array.prototype.forEach.call(this.root.querySelectorAll(".cmp-filters .chip"), function (btn) {
      btn.onclick = function () { self.compareFilter = btn.getAttribute("data-s"); self.routeOpts = {}; self.renderComparisons(); };
    });
    document.getElementById("cmpOpen").onclick = function () { Array.prototype.forEach.call(self.root.querySelectorAll("details.cmp"), function (d) { d.open = true; }); };
    document.getElementById("cmpClose").onclick = function () { Array.prototype.forEach.call(self.root.querySelectorAll("details.cmp"), function (d) { d.open = false; }); };

    if (opts.open) {
      var target = this.root.querySelector("details.cmp[open]");
      if (target) {
        target.classList.add("flash-target");
        target.scrollIntoView({ block: "start", behavior: this.reducedMotion() ? "auto" : "smooth" });
        setTimeout(function () { target.classList.remove("flash-target"); }, 1600);
      }
      this.routeOpts = {};
    }
  },

  /* ==================================================================
   * BIOSTATS (drill + cheat sheet)
   * ================================================================== */
  renderStats: function () {
    var self = this;
    var B = window.BCEMP_BIOSTATS || { formulas: [], tables: [], terms: [], pearls: [] };
    var st = App.Store.get();
    var pool = App.Content.drillQuestions();
    var c = App.Analytics.tally(pool, st.srs.questions);
    var mode = App.SRS.mode();
    var html = '<h1 class="page-title">Biostatistics</h1>' +
      '<p class="lede">A question drill for calculations, test selection and study appraisal, plus the reference sheet: equations, 2×2 tables, test selection and definitions.</p>';

    html += '<div class="card">' +
      '<h2 class="section-title" style="margin-top:0">Practice drill</h2>' +
      '<p class="small" style="color:var(--ink-2)">' + pool.length + ' exam-style questions. This bank is separate: it never enters your daily session or the counts on Home.</p>' +
      this._burndown("Drill questions", c, mode) +
      '<div class="btn-row mt">' +
        '<button class="btn btn-primary" id="drill15">Drill 15 questions</button>' +
        '<button class="btn btn-ghost" id="drill30">Drill 30</button>' +
      '</div>' +
      (c.unseen === 0 && c.due === 0 && pool.length ? '<p class="tiny muted mt">Nothing new or due, so drills now repeat questions you\'ve already answered.</p>' : '') +
    '</div>';

    html += '<h2 class="section-title">Core equations</h2><div class="fx-grid">';
    (B.formulas || []).forEach(function (f) {
      html += '<div class="fx"><div class="fx-n">' + self.esc(f.n) + '</div>' +
        '<div class="fx-eq">' + self.esc(f.eq) + '</div>' +
        '<div class="fx-d">' + self.esc(f.d) + '</div>' +
        (f.ex && f.ex !== "—" ? '<div class="fx-ex">e.g. ' + self.esc(f.ex) + '</div>' : '') + '</div>';
    });
    html += '</div>';

    html += '<h2 class="section-title">The 2×2 tables</h2>';
    (B.tables || []).forEach(function (t) {
      html += '<div class="card"><h3 class="cmp-title">' + self.esc(t.title) + '</h3>';
      html += '<div class="cmp-scroll" style="margin-top:10px"><table class="stat-table"><thead><tr>';
      (t.head || []).forEach(function (h, i) { html += '<th' + (i === 0 ? ' class="cmp-rl"' : '') + ' scope="col">' + self.esc(h) + '</th>'; });
      html += '</tr></thead><tbody>';
      (t.rows || []).forEach(function (r) {
        html += '<tr><th scope="row" class="cmp-rl">' + self.esc(r[0]) + '</th>';
        for (var i = 1; i < r.length; i++) html += '<td>' + self.esc(r[i]) + '</td>';
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      if (t.note) html += '<div class="fx-note">' + self.esc(t.note) + '</div>';
      html += '</div>';
    });

    if (B.tests && B.tests.length) {
      html += '<h2 class="section-title">Choosing a statistical test</h2>' +
        '<p class="lede">Ask in this order: what type of data is the outcome, how many groups, and are they paired?</p>';
      B.tests.forEach(function (g) {
        html += '<div class="card"><h3 class="tg">' + self.esc(g.group) + '</h3>';
        html += '<div class="cmp-scroll" style="margin-top:10px"><table class="stat-table"><thead><tr>';
        g.head.forEach(function (h, i) { html += '<th' + (i === 0 ? ' class="cmp-rl"' : '') + ' scope="col">' + self.esc(h) + '</th>'; });
        html += '</tr></thead><tbody>';
        g.rows.forEach(function (r) {
          html += '<tr><th scope="row" class="cmp-rl">' + self.esc(r[0]) + '</th>';
          for (var i = 1; i < r.length; i++) html += '<td' + (i === 1 ? ' class="tg-test"' : '') + '>' + self.esc(r[i]) + '</td>';
          html += '</tr>';
        });
        html += '</tbody></table></div></div>';
      });
    }

    html += '<h2 class="section-title">Definitions</h2><div class="card">';
    (B.terms || []).forEach(function (x, i) {
      html += '<div class="term' + (i === 0 ? " first" : "") + '"><div class="term-t">' + self.esc(x.t) + '</div><div class="term-d">' + self.esc(x.d) + '</div></div>';
    });
    html += '</div>';

    html += '<h2 class="section-title">Interpretation pearls</h2><div class="card"><ul class="pearls">';
    (B.pearls || []).forEach(function (p) { html += '<li>' + self.esc(p) + '</li>'; });
    html += '</ul></div>';

    this.root.innerHTML = html;
    document.getElementById("drill15").onclick = function () { self.startDrill(15); };
    document.getElementById("drill30").onclick = function () { self.startDrill(30); };
  },

  /* ==================================================================
   * SETTINGS
   * ================================================================== */
  renderSettings: function () {
    var st = App.Store.get(), s = st.settings;
    var qCount = App.Content.questions().length, fCount = App.Content.flashcards().length;
    var custom = st.customContent.questions.length + st.customContent.flashcards.length;
    var theme = App.getTheme();
    var mode = App.SRS.mode();
    var html = '<h1 class="page-title">Settings</h1>';

    html += '<h2 class="section-title">Study plan</h2><div class="card">' +
      '<div class="field"><label for="setName">Your name (optional)</label><input id="setName" type="text" autocomplete="given-name" value="' + this.esc(s.name) + '" /></div>' +
      '<div class="field"><span class="label" id="modeLbl">Study mode</span><div class="radios" role="radiogroup" aria-labelledby="modeLbl">' +
        '<label class="radio"><input type="radio" name="mode" value="refresh"' + (mode === "refresh" ? " checked" : "") + '><span><b>Refresh</b><span>For keeping knowledge sharp. Items come back after 1, 3, 7, 21, 60 and 120 days; a miss starts that item over.</span></span></label>' +
        '<label class="radio"><input type="radio" name="mode" value="cram"' + (mode === "cram" ? " checked" : "") + '><span><b>Cram</b><span>For an exam in the next few weeks. You see each item once; only misses and Hard come back.</span></span></label>' +
      '</div><div class="hint">Switching modes keeps all your progress.</div></div>' +
      '<div class="field"><label for="setExam">Exam date (optional)</label>' +
        '<div class="row"><input id="setExam" type="date" value="' + this.esc(s.examDate) + '" style="flex:1;min-width:180px" />' +
        '<button type="button" class="btn btn-ghost btn-sm" id="clearExam">Clear</button></div>' +
        '<div class="hint">Shows a countdown on Home. Leave it blank if you\'re not preparing for an exam.</div></div>' +
      '<div class="field"><label for="setGoal">Daily question goal</label><input id="setGoal" type="number" inputmode="numeric" min="4" max="60" value="' + (s.dailyGoalQuestions || 10) + '"/></div>' +
      '<button class="btn btn-primary" id="saveSettings">Save plan</button>' +
      '<div id="settingsMsg" aria-live="polite"></div>' +
    '</div>';

    html += '<h2 class="section-title">Appearance</h2><div class="card">' +
      '<div class="field" style="margin:0"><span class="label" id="themeLbl">Theme</span><div class="radios" role="radiogroup" aria-labelledby="themeLbl">' +
        ['system', 'light', 'dark'].map(function (t) {
          var label = { system: "Match my device", light: "Light", dark: "Dark" }[t];
          return '<label class="radio"><input type="radio" name="theme" value="' + t + '"' + (theme === t ? " checked" : "") + '><span><b>' + label + '</b></span></label>';
        }).join("") +
      '</div></div></div>';

    html += '<h2 class="section-title">Keyboard shortcuts</h2><div class="card"><table class="kbd-table"><tbody>' +
      '<tr><td>Answer a question</td><td><kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd></td></tr>' +
      '<tr><td>Next question</td><td><kbd>Enter</kbd> or <kbd>→</kbd></td></tr>' +
      '<tr><td>Show a flashcard\'s answer</td><td><kbd>Space</kbd> or <kbd>Enter</kbd></td></tr>' +
      '<tr><td>Rate a flashcard</td><td><kbd>1</kbd> Again, <kbd>2</kbd> Hard, <kbd>3</kbd> Good, <kbd>4</kbd> Easy</td></tr>' +
    '</tbody></table></div>';

    html += '<h2 class="section-title">Your content</h2><div class="card">' +
      '<p class="small">Loaded: <b>' + qCount + '</b> session questions, <b>' + App.Content.drillQuestions().length + '</b> biostatistics drill questions and <b>' + fCount + '</b> flashcards (' + custom + ' imported by you).</p>' +
      '<div class="field"><label for="importContent">Import your own questions or flashcards (JSON or CSV)</label>' +
        '<input id="importContent" type="file" accept=".json,.csv"/>' +
        '<div class="hint">JSON must match <a href="data/schema-example.json" target="_blank" rel="noopener">data/schema-example.json</a>. CSV headers for questions: <code>domain,difficulty,stem,optionA,optionB,optionC,optionD,correct,rationale,tags</code>; for flashcards: <code>domain,front,back,tags</code>. ' +
        'See <a href="data/sample-import.csv" target="_blank" rel="noopener">a sample file</a>.</div>' +
      '</div>' +
      '<div id="importMsg" aria-live="polite"></div>' +
    '</div>';

    html += '<h2 class="section-title">Backup and data</h2><div class="card">' +
      '<p class="small">Your progress lives in this browser only. Export a backup now and then so clearing your browser data doesn\'t erase it.</p>' +
      '<div class="btn-row">' +
        '<button class="btn btn-ghost" id="exportBtn">Export progress</button>' +
        '<input id="restoreInput" type="file" accept=".json" class="sr-only file-proxy"/><label class="btn btn-ghost" for="restoreInput">Restore from backup</label>' +
        '<button class="btn btn-danger" id="resetBtn">Reset all data</button>' +
      '</div>' +
      '<div id="dataMsg" aria-live="polite"></div>' +
    '</div>';

    html += '<h2 class="section-title">About</h2><div class="card small">' +
      '<p>EM Study is a free study aid for emergency medicine pharmacotherapy, including the BCEMP exam. Questions, flashcards and tables were last updated in July 2026.</p>' +
      '<p style="margin:0">Spotted an error? Every answer has a <b>Report a problem</b> link, or you can <a href="' + App.Content.REPO + '/issues" target="_blank" rel="noopener">open an issue on GitHub</a>.</p>' +
    '</div>';

    this.root.innerHTML = html;
    this._wireSettings();
  },

  _wireSettings: function () {
    var self = this, st = App.Store.get();

    document.getElementById("clearExam").onclick = function () { document.getElementById("setExam").value = ""; };
    document.getElementById("saveSettings").onclick = function () {
      st.settings.name = document.getElementById("setName").value.trim();
      var exam = document.getElementById("setExam").value;
      st.settings.examDate = App.date.isValid(exam) ? exam : "";
      var m = document.querySelector('input[name="mode"]:checked');
      if (m) st.settings.studyMode = m.value;
      var g = parseInt(document.getElementById("setGoal").value, 10);
      st.settings.dailyGoalQuestions = (g >= 4 && g <= 60) ? g : 10;
      st.settings.onboarded = true;
      App.Store.save();
      document.getElementById("settingsMsg").innerHTML = '<div class="notice ok">Saved.</div>';
    };

    Array.prototype.forEach.call(document.querySelectorAll('input[name="theme"]'), function (r) {
      r.onchange = function () { App.setTheme(r.value); };
    });

    document.getElementById("importContent").onchange = function (e) {
      var file = e.target.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var msg = document.getElementById("importMsg");
        try {
          var res = file.name.toLowerCase().slice(-4) === ".csv" ? App.Import.fromCsv(reader.result) : App.Import.fromJson(reader.result);
          var out = '<div class="notice ok">Imported ' + self.plural(res.addedQuestions, "question") + ' and ' + self.plural(res.addedFlashcards, "flashcard");
          if (res.skipped) out += ' (' + res.skipped + ' duplicates skipped)';
          out += '.</div>';
          if (res.errors && res.errors.length) out += '<div class="notice err">Some rows were skipped:\n• ' + res.errors.slice(0, 12).map(App.UI.esc).join("\n• ") + '</div>';
          msg.innerHTML = out;
        } catch (err) {
          msg.innerHTML = '<div class="notice err">' + App.UI.esc(err.message) + '</div>';
        }
        e.target.value = "";
      };
      reader.readAsText(file);
    };

    document.getElementById("exportBtn").onclick = function () { App.exportProgress(); self.toast("Backup downloaded"); };

    document.getElementById("restoreInput").onchange = function (e) {
      var file = e.target.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var msg = document.getElementById("dataMsg");
        try {
          App.importProgress(JSON.parse(reader.result));
          msg.innerHTML = '<div class="notice ok">Progress restored.</div>';
          self.toast("Progress restored");
          setTimeout(function () { self.route("dashboard"); }, 700);
        } catch (err) {
          msg.innerHTML = '<div class="notice err">' + App.UI.esc(err.message) + '</div>';
        }
        e.target.value = "";
      };
      reader.readAsText(file);
    };

    document.getElementById("resetBtn").onclick = function () {
      self.confirm({ title: "Reset all data?", body: "This erases all progress, streaks, bookmarks and imported content in this browser. It can't be undone; export a backup first if you might want it back.", confirmLabel: "Reset everything", danger: true },
        function () { App.Store.reset(); self.toast("All data reset"); self.route("dashboard"); });
    };
  },

  /* ==================================================================
   * SESSION FLOW
   * ================================================================== */
  startSession: function (size, opts) {
    opts = opts || {};
    var st = App.Store.get();
    var data = App.Session.build(size, opts);
    if (!data.flashcards.length && !data.questions.length) {
      var msg = opts.only === "missed" ? "Nothing missed right now."
        : opts.only === "bookmarked" ? "No bookmarks yet. Use Bookmark on any question or flashcard."
        : App.SRS.mode() === "cram" ? "Everything here is cleared. Switch to Refresh mode in Settings to keep reviewing."
        : "Nothing is due or new here right now.";
      this.toast(msg);
      return;
    }
    if (!st.settings.onboarded) { st.settings.onboarded = true; App.Store.save(); }
    var label = opts.only === "missed" ? "Missed review" : opts.only === "bookmarked" ? "Bookmarks"
      : opts.domains && opts.domains.length === 1 ? this.domainName(opts.domains[0]) : "";
    this._begin(data.flashcards, data.questions, { label: label });
  },

  _begin: function (flashcards, questions, o) {
    o = o || {};
    this.active = {
      data: { flashcards: flashcards, questions: questions },
      label: o.label || "", drill: !!o.drill,
      phase: flashcards.length ? "flashcards" : "questions",
      fIndex: 0, qIndex: 0, revealed: false, answered: false, order: null,
      missedQ: [], missedF: [],
      results: { correct: 0, total: 0, xp: 0, overdueCleared: 0, flashcardsDone: 0 }
    };
    this.renderSession();
    window.scrollTo(0, 0);
  },

  /* Biostats drill: a SEPARATE bank (never in the daily session pool or Home counts).
   * Due items first, then unseen, then everything else so a drill never runs dry. */
  startDrill: function (count) {
    var st = App.Store.get();
    var pool = App.Content.drillQuestions();
    if (!pool.length) { this.toast("No biostatistics questions found."); return; }
    var due = [], unseen = [], rest = [];
    pool.forEach(function (q) {
      var c = st.srs.questions[q.id];
      if (!c) unseen.push(q);
      else if (App.SRS.isDue(c)) due.push(q);
      else rest.push(q);
    });
    var S = App.Session;
    var ordered = S._shuffle(due).concat(S._shuffle(unseen)).concat(S._shuffle(rest));
    this._begin([], ordered.slice(0, count), { label: "Biostatistics drill", drill: true });
  },

  _sessionHeader: function (where, pct) {
    var a = this.active;
    return '<div class="session-head"><span class="where">' + (a.label ? this.esc(a.label) + ": " + where.charAt(0).toLowerCase() + where.slice(1) : where) + '</span>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="quitSession">End session</button></div>' +
      '<div class="prog" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>';
  },

  renderSession: function () {
    var self = this;
    if (this.active.phase === "flashcards") this._renderFlashcard();
    else this._renderQuestion();
    var q = document.getElementById("quitSession");
    if (q) q.onclick = function () {
      self.confirm({ title: "End this session?", body: "Your answers so far are saved, but the session won't count toward your streak.", cancelLabel: "Keep studying", confirmLabel: "End session" },
        function () { App.Store.save(); self.active = null; self._go("dashboard"); });
    };
  },

  _renderFlashcard: function () {
    var a = this.active, self = this;
    var fc = a.data.flashcards[a.fIndex];
    var total = a.data.flashcards.length + a.data.questions.length;
    var pct = Math.round((a.fIndex / total) * 100);
    var card = App.Store.get().srs.flashcards[fc.id];
    a.revealed = false;

    var rates = [["again", "Again"], ["hard", "Hard"], ["good", "Good"], ["easy", "Easy"]];
    var html = this._sessionHeader((a.label ? "Flashcard " : "Warm-up flashcard ") + (a.fIndex + 1) + " of " + a.data.flashcards.length, pct);
    html += '<div class="card flash">' +
      '<div class="q-top"><span class="q-domain">' + this.esc(this.domainName(fc.domain)) + '</span>' + this.bookmarkBtn(fc.id) + '</div>' +
      '<div class="front">' + this.esc(fc.front) + '</div>' +
      '<div id="backWrap" hidden>' +
        '<div class="back">' + this.esc(fc.back) + '</div>' +
        this.metaRow(fc, "flashcard") +
        '<div class="rate-prompt" id="ratePrompt">How well did you recall it?</div>' +
        '<div class="rate-row" role="group" aria-labelledby="ratePrompt">' +
          rates.map(function (r) {
            return '<button type="button" class="rate ' + r[0] + '" data-r="' + r[0] + '">' + r[1] + '<small>' + App.SRS.preview(card, r[0]) + '</small></button>';
          }).join("") +
        '</div>' +
      '</div>' +
      '<button class="btn btn-primary" id="showBack">Show answer</button>' +
      '<div class="kbd-hint">Shortcuts: <kbd>Space</kbd> shows the answer, then <kbd>1</kbd>–<kbd>4</kbd> rates it.</div>' +
    '</div>';

    this.root.innerHTML = html;
    document.getElementById("showBack").onclick = function () { self._showBack(); };
    Array.prototype.forEach.call(this.root.querySelectorAll(".rate"), function (btn) {
      btn.onclick = function () { self._rateFlashcard(fc, btn.getAttribute("data-r")); };
    });
  },

  _showBack: function () {
    var a = this.active;
    if (!a || a.phase !== "flashcards" || a.revealed) return;
    a.revealed = true;
    document.getElementById("backWrap").hidden = false;
    var b = document.getElementById("showBack"); if (b) b.hidden = true;
  },

  _rateFlashcard: function (fc, rating) {
    var a = this.active, st = App.Store.get();
    if (!a || a.phase !== "flashcards" || !a.revealed || a.data.flashcards[a.fIndex] !== fc) return;
    App.SRS.rateFlashcard(fc.id, rating);
    if (rating === "again") a.missedF.push(fc);
    st.profile.totalFlashcards++;
    var xp = App.Game.XP.flashcard;
    a.results.xp += xp; a.results.flashcardsDone++;
    App.Game.addXp(xp);
    App.recordActivity({ flashcards: 1, xp: xp });
    App.Store.save();

    a.fIndex++;
    if (a.fIndex >= a.data.flashcards.length) {
      a.phase = a.data.questions.length ? "questions" : "done";
      if (a.phase === "done") return this._finishSession();
    }
    this.renderSession();
  },

  _renderQuestion: function () {
    var a = this.active, self = this;
    var q = a.data.questions[a.qIndex];
    var total = a.data.flashcards.length + a.data.questions.length;
    var pct = Math.round(((a.data.flashcards.length + a.qIndex) / total) * 100);
    a.answered = false;
    // options are shuffled every time (like the real exam) so position never gives the answer away;
    // data-i keeps the ORIGINAL index so scoring against q.correctIndex stays right
    a.order = App.Session._shuffle(q.options.map(function (_, i) { return i; }));
    var letters = "ABCDEFGH";

    var html = this._sessionHeader("Question " + (a.qIndex + 1) + " of " + a.data.questions.length, pct);
    html += '<div class="card">' +
      '<div class="q-top"><span class="q-domain">' + this.esc(this.domainName(q.domain)) + '</span>' + this.bookmarkBtn(q.id) + '</div>' +
      '<p class="q-stem">' + this.esc(q.stem) + '</p>' +
      '<div class="opts" role="group" aria-label="Answer choices">' +
        a.order.map(function (oi, k) {
          return '<button type="button" class="opt" data-i="' + oi + '"><span class="opt-key" aria-hidden="true">' + letters[k] + '</span>' +
            '<span class="opt-text">' + self.esc(q.options[oi]) + '</span></button>';
        }).join("") +
      '</div>' +
      '<div id="afterQ" aria-live="polite"></div>' +
      '<div class="kbd-hint" id="qHint">Shortcuts: <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd> to answer, <kbd>Enter</kbd> for the next question.</div>' +
    '</div>';

    this.root.innerHTML = html;
    Array.prototype.forEach.call(this.root.querySelectorAll(".opt"), function (btn) {
      btn.onclick = function () { self._answerQuestion(q, parseInt(btn.getAttribute("data-i"), 10)); };
    });
  },

  _answerQuestion: function (q, choice) {
    var a = this.active, st = App.Store.get(), self = this;
    if (!a || a.phase !== "questions" || a.answered || a.data.questions[a.qIndex] !== q) return;
    a.answered = true;
    var correct = choice === q.correctIndex;
    var prev = st.srs.questions[q.id];
    var wasOverdue = prev && App.SRS.isDue(prev) && App.SRS.overdueDays(prev) > 0;

    Array.prototype.forEach.call(this.root.querySelectorAll(".opt"), function (btn) {
      var i = parseInt(btn.getAttribute("data-i"), 10);
      btn.disabled = true;
      var mark = "";
      if (i === q.correctIndex) { btn.classList.add("correct"); mark = i === choice ? "✓ Your answer" : "✓ Correct answer"; }
      else if (i === choice) { btn.classList.add("wrong"); mark = "✕ Your answer"; }
      else btn.classList.add("dim");
      if (mark) btn.insertAdjacentHTML("beforeend", '<span class="opt-mark">' + mark + '</span>');
    });

    App.recordAnswer(q.domain, correct);
    App.SRS.rateQuestion(q.id, correct ? "good" : "again");
    if (!correct) a.missedQ.push(q);
    var xp = correct ? App.Game.XP.correct : App.Game.XP.incorrect;
    if (correct && wasOverdue) { xp += App.Game.XP.overdueBonus; a.results.overdueCleared++; }
    a.results.total++; if (correct) a.results.correct++;
    a.results.xp += xp;
    App.Game.addXp(xp);
    App.recordActivity({ questions: 1, xp: xp });
    App.Store.save();

    var last = a.qIndex + 1 >= a.data.questions.length;
    var after = document.getElementById("afterQ");
    after.innerHTML =
      '<div class="rationale"><span class="verdict ' + (correct ? "ok" : "no") + '">' + (correct ? "Correct." : "Not quite.") + '</span> ' + this.esc(q.rationale) +
        this.metaRow(q, "question") +
        '<div class="xp-line">+' + xp + ' XP' + (wasOverdue && correct ? ', overdue review cleared' : '') + '</div>' +
      '</div>' +
      '<div class="next-row"><button class="btn btn-primary" id="nextQ">' + (last ? "Finish session" : "Next question") + '</button></div>';
    var hint = document.getElementById("qHint"); if (hint) hint.innerHTML = "Shortcut: <kbd>Enter</kbd> for " + (last ? "the summary." : "the next question.");
    var idx = a.qIndex;
    var next = document.getElementById("nextQ");
    next.onclick = function () { if (self.active === a && a.qIndex === idx) self._next(); };
    next.focus({ preventScroll: true });
    var r = after.getBoundingClientRect();
    if (r.bottom > window.innerHeight) after.scrollIntoView({ block: "nearest", behavior: this.reducedMotion() ? "auto" : "smooth" });
  },

  _next: function () {
    var a = this.active;
    if (!a || a.phase !== "questions" || !a.answered) return;
    a.qIndex++;
    if (a.qIndex >= a.data.questions.length) this._finishSession();
    else { this.renderSession(); window.scrollTo(0, 0); }
  },

  _finishSession: function () {
    var a = this.active, st = App.Store.get();
    st.profile.totalSessions++;
    var streak = App.Game.updateStreak();
    var bonusXp = App.Game.XP.sessionComplete;
    var perfect = a.results.total >= 8 && a.results.correct === a.results.total;
    if (perfect) bonusXp += App.Game.XP.perfectBonus;
    a.results.xp += bonusXp;
    App.Game.addXp(bonusXp);
    App.recordActivity({ sessions: 1, xp: bonusXp });
    var newBadges = App.Game.checkBadges({ total: a.results.total, correct: a.results.correct, overdueCleared: a.results.overdueCleared });
    App.Store.save();
    this._renderSummary(streak, newBadges, perfect);
  },

  _renderSummary: function (streak, newBadges, perfect) {
    var a = this.active, self = this;
    var st = App.Store.get(), s = st.settings;
    var pct = a.results.total ? Math.round((a.results.correct / a.results.total) * 100) : null;
    var prog = App.Game.levelProgress(st.profile.xp);

    var html = '<div class="card summary-hero"><h1>Session complete</h1>' +
      '<div class="score">' + (pct === null ? "Done" : pct + "%") + '</div>' +
      '<div class="score-sub">' + (a.results.total ? a.results.correct + " of " + this.plural(a.results.total, "question") + " correct" : "") +
        (a.results.total && a.results.flashcardsDone ? ", " : "") +
        (a.results.flashcardsDone ? this.plural(a.results.flashcardsDone, "flashcard") + " reviewed" : "") + '</div>' +
      (perfect ? '<p class="mt" style="margin-bottom:0"><span class="hl">Perfect session.</span></p>' : '') +
    '</div>';

    html += '<ul class="facts">';
    html += '<li><span class="k">XP</span><span class="v">+' + a.results.xp + ' XP<small>Level ' + prog.level + ', ' + prog.into + ' of ' + prog.need + ' XP to the next level</small></span></li>';
    html += '<li><span class="k">Streak</span><span class="v">' + this.plural(st.profile.streak, "day") + (streak.graceUsed ? '<small>Grace day used: one missed day per week is forgiven.</small>' : '') + '</span></li>';
    if (App.hasExam()) {
      var days = App.date.daysUntil(s.examDate);
      html += '<li><span class="k">Exam</span><span class="v">' + (days === 0 ? "Today" : "In " + this.plural(days, "day")) + '<small>' + App.date.pretty(s.examDate) + '</small></span></li>';
    }
    newBadges.forEach(function (b) {
      html += '<li><span class="k">New badge</span><span class="v">' + self.esc(b.name) + '<small>' + self.esc(b.desc) + '</small></span></li>';
    });
    var weak = App.Analytics.weakestDomains(1)[0];
    if (weak) {
      html += '<li><span class="k">Focus next</span><span class="v">' + this.esc(weak.name) +
        '<small>' + Math.round(App.Analytics.mastery(weak.id) * 100) + '% mastery. Your next session leans toward it.</small></span></li>';
    }
    html += '</ul>';

    var nMissed = a.missedQ.length + a.missedF.length;
    var wasDrill = a.drill;
    html += '<div class="btn-row mt" style="justify-content:center">' +
      (nMissed ? '<button class="btn btn-primary" id="reviewNow">Review the ' + nMissed + ' you missed</button>' : '') +
      '<button class="btn ' + (nMissed ? "btn-ghost" : "btn-primary") + '" id="another">' + (wasDrill ? "Another drill" : "Another session") + '</button>' +
      '<button class="btn btn-ghost" id="toHome">Back to home</button></div>';

    var missedQ = a.missedQ.slice(), missedF = a.missedF.slice();
    this.active = null; // session over
    this.root.innerHTML = html;
    window.scrollTo(0, 0);
    if (nMissed) document.getElementById("reviewNow").onclick = function () { self._begin(missedF, missedQ, { label: "Missed review" }); };
    document.getElementById("another").onclick = function () { if (wasDrill) self.startDrill(15); else self.startSession("full", { domains: s.topics }); };
    document.getElementById("toHome").onclick = function () { self.route("dashboard"); };
  },

  /* ==================================================================
   * KEYBOARD (sessions only; ignored while typing or in a dialog)
   * ================================================================== */
  handleKey: function (e) {
    var a = this.active;
    if (!a || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
    if (document.querySelector("dialog[open]")) return;
    var onControl = tag === "BUTTON" || tag === "A" || tag === "SUMMARY";
    var k = e.key;

    if (a.phase === "flashcards") {
      if (!a.revealed) {
        if ((k === " " || k === "Enter") && !onControl) { e.preventDefault(); this._showBack(); }
        return;
      }
      var map = { "1": "again", "2": "hard", "3": "good", "4": "easy" };
      if (map[k]) { e.preventDefault(); this._rateFlashcard(a.data.flashcards[a.fIndex], map[k]); }
      return;
    }
    if (a.phase === "questions") {
      if (!a.answered) {
        if (k.length !== 1) return;
        var idx = "12345678".indexOf(k);
        if (idx === -1) idx = "abcdefgh".indexOf(k.toLowerCase());
        if (idx >= 0 && a.order && idx < a.order.length) { e.preventDefault(); this._answerQuestion(a.data.questions[a.qIndex], a.order[idx]); }
        return;
      }
      if ((k === "Enter" || k === "ArrowRight" || k === "n" || k === "N") && !onControl) { e.preventDefault(); this._next(); }
    }
  }
};
