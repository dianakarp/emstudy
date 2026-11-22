/* gamification.js — XP, levels, streaks (with a grace day), and badges. */
window.App = window.App || {};

App.Game = {
  XP: { correct: 10, incorrect: 4, flashcard: 5, sessionComplete: 25, overdueBonus: 3, perfectBonus: 20 },

  /* ---------- levels: gently escalating cumulative thresholds ---------- */
  xpForLevel: function (level) { // total XP required to REACH this level
    // level 1 = 0, 2 = 100, 3 = 250, 4 = 450, ... (+50 each step)
    var total = 0;
    for (var l = 1; l < level; l++) total += 100 + (l - 1) * 50;
    return total;
  },
  levelForXp: function (xp) {
    var level = 1;
    while (xp >= this.xpForLevel(level + 1)) level++;
    return level;
  },
  levelProgress: function (xp) {
    var level = this.levelForXp(xp);
    var floor = this.xpForLevel(level);
    var next = this.xpForLevel(level + 1);
    return { level: level, into: xp - floor, need: next - floor, pct: Math.round(((xp - floor) / (next - floor)) * 100) };
  },

  addXp: function (amount) {
    var p = App.Store.get().profile;
    var before = p.level;
    p.xp += amount;
    p.level = this.levelForXp(p.xp);
    return { gained: amount, leveledUp: p.level > before, level: p.level };
  },

  /* ---------- streak (called once per completed session) ---------- */
  updateStreak: function () {
    var p = App.Store.get().profile;
    var today = App.date.today();
    var result = { changed: false, streak: p.streak, graceUsed: false };

    if (p.lastSessionDate === today) { result.streak = p.streak; return result; } // already counted today

    if (!p.lastSessionDate) {
      p.streak = 1;
    } else {
      var gap = App.date.diffDays(today, p.lastSessionDate);
      if (gap === 1) {
        p.streak += 1;
      } else if (gap === 2 && this._graceAvailable(p, today)) {
        p.streak += 1;               // forgive a single missed day
        p.graceUsedDate = today;
        result.graceUsed = true;
      } else {
        p.streak = 1;                // streak broken
      }
    }
    p.lastSessionDate = today;
    if (p.streak > p.longestStreak) p.longestStreak = p.streak;
    result.changed = true;
    result.streak = p.streak;
    return result;
  },
  _graceAvailable: function (p, today) {
    // at most one grace day per rolling 7 days
    if (!p.graceUsedDate) return true;
    return App.date.diffDays(today, p.graceUsedDate) >= 7;
  },

  /* ---------- badges (a short "seal" label instead of an emoji) ---------- */
  BADGES: [
    { id: "first-session", seal: "1st",  name: "First steps", desc: "Complete your first study session." },
    { id: "streak-3",      seal: "3d",   name: "Warming up", desc: "Reach a 3-day streak." },
    { id: "streak-7",      seal: "7d",   name: "One week strong", desc: "Reach a 7-day streak." },
    { id: "streak-14",     seal: "14d",  name: "Fortnight focus", desc: "Reach a 14-day streak." },
    { id: "streak-30",     seal: "30d",  name: "Month of discipline", desc: "Reach a 30-day streak." },
    { id: "q-100",         seal: "100",  name: "Century", desc: "Answer 100 practice questions." },
    { id: "q-500",         seal: "500",  name: "Question machine", desc: "Answer 500 practice questions." },
    { id: "perfect",       seal: "100%", name: "Flawless", desc: "Score 100% on a session of 8 or more questions." },
    { id: "mastery",       seal: "85%",  name: "Topic master", desc: "85% or better over 15+ questions in any topic." },
    { id: "full-syllabus", seal: "All",  name: "Full sweep", desc: "Answer a question in every topic that has questions." },
    { id: "comeback",      seal: "10+",  name: "Comeback", desc: "Clear 10+ overdue reviews in one session." },
    { id: "level-5",       seal: "L5",   name: "Rising", desc: "Reach level 5." }
  ],

  /* evaluate all badges against current state; returns newly-earned badge objects */
  checkBadges: function (sessionResult) {
    var st = App.Store.get();
    var p = st.profile;
    var earned = [];
    var self = this;

    function award(id) {
      if (p.badges.indexOf(id) === -1) {
        p.badges.push(id);
        earned.push(self.BADGES.filter(function (b) { return b.id === id; })[0]);
      }
    }

    if (p.totalSessions >= 1) award("first-session");
    if (p.streak >= 3) award("streak-3");
    if (p.streak >= 7) award("streak-7");
    if (p.streak >= 14) award("streak-14");
    if (p.streak >= 30) award("streak-30");
    if (p.totalQuestions >= 100) award("q-100");
    if (p.totalQuestions >= 500) award("q-500");
    if (p.level >= 5) award("level-5");

    if (sessionResult) {
      if (sessionResult.total >= 8 && sessionResult.correct === sessionResult.total) award("perfect");
      if (sessionResult.overdueCleared >= 10) award("comeback");
    }

    (window.BCEMP_DOMAINS || []).forEach(function (d) {
      var s = st.domainStats[d.id];
      if (s && s.answered >= 15 && (s.correct / s.answered) >= 0.85) award("mastery");
    });

    // full sweep counts only topics that have questions to answer
    var withQs = App.Content.domainsWithQuestions();
    var covered = withQs.length > 0 && withQs.every(function (d) {
      var s = st.domainStats[d.id]; return s && s.answered > 0;
    });
    if (covered) award("full-syllabus");

    return earned;
  }
};
