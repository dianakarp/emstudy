/* state.js — localStorage persistence, schema, migration, date helpers, export/import.
 * Everything hangs off the global `App` namespace (no modules, works on file://). */
window.App = window.App || {};

/* The key keeps its original name so progress saved by the BCEMP Trainer
 * build carries straight over. */
App.STORAGE_KEY = "bcemp_state_v1";
App.THEME_KEY = "emstudy_theme";            // read in <head> before first paint
App.LEGACY_DEFAULT_EXAM_DATE = "2026-07-24"; // the old build's hard-coded default

/* ---------- date helpers (local time, YYYY-MM-DD) ---------- */
App.date = {
  MONTHS: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  today: function () { return App.date.fmt(new Date()); },
  fmt: function (d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  },
  parse: function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +(p[2] || 1)); },
  addDays: function (s, n) { var d = App.date.parse(s); d.setDate(d.getDate() + n); return App.date.fmt(d); },
  diffDays: function (a, b) { // a - b in whole days
    return Math.round((App.date.parse(a).getTime() - App.date.parse(b).getTime()) / 86400000);
  },
  daysUntil: function (target) { return App.date.diffDays(target, App.date.today()); },
  isValid: function (s) { return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s); },
  pretty: function (s) { var d = App.date.parse(s); return App.date.MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(); },
  monthYear: function (s) { var p = String(s).split("-"); return App.date.MONTHS[(+p[1] || 1) - 1] + " " + p[0]; }
};

/* ---------- default state ---------- */
App.defaultState = function () {
  return {
    version: 2,
    settings: {
      examDate: "",            // optional; countdown only shows when set and not past
      dailyGoalQuestions: 10,
      name: "",
      studyMode: "refresh",    // "refresh" (long-term spacing) | "cram" (see once, repeat misses)
      onboarded: false,        // first-visit welcome card answered
      topics: []               // empty = all topics
    },
    profile: {
      xp: 0, level: 1, streak: 0, longestStreak: 0,
      lastSessionDate: null, graceUsedDate: null,
      badges: [], totalQuestions: 0, totalCorrect: 0,
      totalFlashcards: 0, totalSessions: 0
    },
    srs: { questions: {}, flashcards: {} },
    domainStats: {}, // { domainId: { answered, correct } }
    activity: {},    // { "YYYY-MM-DD": { sessions, questions, flashcards, xp } }
    customContent: { questions: [], flashcards: [] },
    bookmarks: {}    // { itemId: "YYYY-MM-DD" }
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
      try { this._state = App.migrate(JSON.parse(raw)); }
      catch (e) { this._state = App.defaultState(); }
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

/* fill in missing keys, then upgrade version-1 data (the BCEMP Trainer build) */
App.migrate = function (s) {
  if (!s || typeof s !== "object") return App.defaultState();
  var fromV1 = !s.version || s.version < 2;
  var hadMode = s.settings ? s.settings.studyMode : undefined; // read before defaults fill it in
  var usedBefore = !!(s.profile && (s.profile.totalSessions > 0 || s.profile.totalQuestions > 0 || s.profile.totalFlashcards > 0));

  function merge(target, source) {
    Object.keys(source).forEach(function (k) {
      if (target[k] === undefined || target[k] === null && source[k] !== null) target[k] = source[k];
      else if (source[k] && typeof source[k] === "object" && !Array.isArray(source[k]) && typeof target[k] === "object") merge(target[k], source[k]);
    });
    return target;
  }
  merge(s, App.defaultState());

  if (fromV1) {
    if (usedBefore) {
      // existing studiers keep the cram scheduling they were using and skip the welcome card
      if (hadMode === undefined) s.settings.studyMode = "cram";
      s.settings.onboarded = true;
    } else if (s.settings.examDate === App.LEGACY_DEFAULT_EXAM_DATE) {
      s.settings.examDate = ""; // never chosen by this visitor; it was the old built-in default
    }
    s.version = 2;
  }
  if (!App.date.isValid(s.settings.examDate)) s.settings.examDate = "";
  if (!Array.isArray(s.settings.topics)) s.settings.topics = [];
  if (App.SRS && App.SRS.upgradeState) App.SRS.upgradeState(s);
  return s;
};

/* ---------- small derived helpers ---------- */
App.hasExam = function () {
  var d = App.Store.get().settings.examDate;
  return App.date.isValid(d) && App.date.daysUntil(d) >= 0;
};

App.greeting = function () {
  var h = new Date().getHours();
  return h < 5 ? "Good evening" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
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

/* ---------- bookmarks ---------- */
App.isBookmarked = function (id) { return !!App.Store.get().bookmarks[id]; };
App.toggleBookmark = function (id) {
  var b = App.Store.get().bookmarks;
  if (b[id]) delete b[id]; else b[id] = App.date.today();
  App.Store.save();
  return !!b[id];
};

/* ---------- theme (System / Light / Dark) ---------- */
App.getTheme = function () {
  try { var t = localStorage.getItem(App.THEME_KEY); return t === "light" || t === "dark" ? t : "system"; } catch (e) { return "system"; }
};
App.setTheme = function (t) {
  try { if (t === "light" || t === "dark") localStorage.setItem(App.THEME_KEY, t); else localStorage.removeItem(App.THEME_KEY); } catch (e) {}
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
};

/* ---------- backup export / import ---------- */
App.exportProgress = function () {
  var data = JSON.stringify(App.Store.get(), null, 2);
  var blob = new Blob([data], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "emstudy-progress-" + App.date.today() + ".json";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
};

App.importProgress = function (obj) {
  if (!obj || typeof obj !== "object" || !obj.profile) throw new Error("This file doesn't look like an EM Study (or BCEMP Trainer) progress backup.");
  App.Store._state = App.migrate(obj);
  App.Store.save();
};
