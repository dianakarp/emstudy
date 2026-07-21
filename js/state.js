/* state.js — localStorage persistence, schema, date helpers, export/import.
 * Everything hangs off the global `App` namespace (no modules, works on file://). */
window.App = window.App || {};

App.STORAGE_KEY = "bcemp_state_v1";
App.DEFAULT_EXAM_DATE = "2026-07-24"; // exam day (Friday); editable in Settings

/* ---------- date helpers (local time, YYYY-MM-DD) ---------- */
App.date = {
  today: function () { return App.date.fmt(new Date()); },
  fmt: function (d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  },
  parse: function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); },
  addDays: function (s, n) { var d = App.date.parse(s); d.setDate(d.getDate() + n); return App.date.fmt(d); },
  diffDays: function (a, b) { // a - b in whole days
    return Math.round((App.date.parse(a).getTime() - App.date.parse(b).getTime()) / 86400000);
  },
  daysUntil: function (target) { return App.date.diffDays(target, App.date.today()); }
};

/* ---------- default state ---------- */
App.defaultState = function () {
  return {
    version: 1,
    settings: { examDate: App.DEFAULT_EXAM_DATE, dailyGoalQuestions: 10, name: "" },
    profile: {
      xp: 0, level: 1, streak: 0, longestStreak: 0,
      lastSessionDate: null, graceUsedDate: null,
      badges: [], totalQuestions: 0, totalCorrect: 0,
      totalFlashcards: 0, totalSessions: 0
    },
    srs: { questions: {}, flashcards: {} },
    domainStats: {}, // { domainId: { answered, correct } }
    activity: {},    // { "YYYY-MM-DD": { sessions, questions, xp } }
    customContent: { questions: [], flashcards: [] }
  };
};

/* ---------- load / save ---------- */
App.Store = {
  _state: null,
  load: function () {
    if (this._state) return this._state;
    var raw = null;
    try { raw = localStorage.getItem(App.STORAGE_KEY); } catch (e) { /* private mode */ }
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        this._state = App.migrate(parsed);
      } catch (e) { this._state = App.defaultState(); }
    } else {
      this._state = App.defaultState();
    }
    return this._state;
  },
  save: function () {
    try { localStorage.setItem(App.STORAGE_KEY, JSON.stringify(this._state)); }
    catch (e) { console.warn("Could not persist state:", e); }
  },
  get: function () { return this.load(); },
  reset: function () { this._state = App.defaultState(); this.save(); return this._state; }
};

/* fill in any missing keys from newer versions */
App.migrate = function (s) {
  var def = App.defaultState();
  function merge(target, source) {
    Object.keys(source).forEach(function (k) {
      if (target[k] === undefined) target[k] = source[k];
      else if (source[k] && typeof source[k] === "object" && !Array.isArray(source[k])) merge(target[k], source[k]);
    });
    return target;
  }
  return merge(s, def);
};

/* ---------- domain stat helper ---------- */
App.recordAnswer = function (domainId, correct) {
  var st = App.Store.get();
  if (!st.domainStats[domainId]) st.domainStats[domainId] = { answered: 0, correct: 0 };
  st.domainStats[domainId].answered++;
  if (correct) st.domainStats[domainId].correct++;
  st.profile.totalQuestions++;
  if (correct) st.profile.totalCorrect++;
};

App.recordActivity = function (d) {
  var st = App.Store.get();
  var day = App.date.today();
  if (!st.activity[day]) st.activity[day] = { sessions: 0, questions: 0, flashcards: 0, xp: 0 };
  var a = st.activity[day];
  a.sessions += d.sessions || 0;
  a.questions += d.questions || 0;
  a.flashcards += d.flashcards || 0;
  a.xp += d.xp || 0;
};

App.todayActivity = function () {
  var a = App.Store.get().activity[App.date.today()];
  return a || { sessions: 0, questions: 0, flashcards: 0, xp: 0 };
};

/* ---------- backup export / import ---------- */
App.exportProgress = function () {
  var data = JSON.stringify(App.Store.get(), null, 2);
  var blob = new Blob([data], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "bcemp-progress-" + App.date.today() + ".json";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

App.importProgress = function (obj) {
  if (!obj || typeof obj !== "object" || !obj.profile) throw new Error("This does not look like a BCEMP progress backup.");
  App.Store._state = App.migrate(obj);
  App.Store.save();
};
