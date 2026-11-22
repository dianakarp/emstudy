/* srs.js — scheduling for two study modes.
 *
 *  Refresh (default): long-term spaced review. A correct answer moves an item up
 *    the ladder below, so it comes back after 1, 3, 7, 21, 60, then 120 days.
 *    A miss starts that item over (back in the next session).
 *
 *  Cram (exam soon): see each item once. A correct answer clears it for good;
 *    a miss or "Hard" brings it back in the next session.
 *
 * Both modes update the same card record, so switching modes never loses data:
 *   { v:2, step, dueDate, reps, lapses, lastSeen, lastCorrect, cleared } */
window.App = window.App || {};

App.SRS = {
  LADDER: [1, 3, 7, 21, 60, 120],

  mode: function () { return App.Store.get().settings.studyMode === "cram" ? "cram" : "refresh"; },

  newCard: function () {
    return { v: 2, step: 0, dueDate: App.date.today(), reps: 0, lapses: 0, lastSeen: null, lastCorrect: null, cleared: false };
  },

  /* version-1 cards (cram / SM-2 era) -> v2 */
  upgrade: function (card) {
    if (!card || card.v === 2) return card;
    var today = App.date.today();
    var wasCleared = !!card.retired || (App.date.isValid(card.dueDate) && App.date.diffDays(today, card.dueDate) < 0);
    var seen = App.date.isValid(card.lastSeen) ? card.lastSeen : today;
    card.v = 2;
    card.cleared = wasCleared;
    card.lastCorrect = wasCleared ? true : !(card.lapses > 0);
    card.step = wasCleared ? 1 : 0;
    card.dueDate = wasCleared ? App.date.addDays(seen, this.LADDER[0]) : (App.date.isValid(card.dueDate) ? card.dueDate : today);
    delete card.retired; delete card.interval; delete card.ease;
    return card;
  },
  upgradeState: function (st) {
    var self = this;
    ["questions", "flashcards"].forEach(function (k) {
      var map = (st.srs && st.srs[k]) || {};
      Object.keys(map).forEach(function (id) { map[id] = self.upgrade(map[id]); });
    });
  },

  /* due = owed a review now. Unseen items are "new", not due. */
  isDue: function (card) {
    if (!card) return false;
    if (this.mode() === "cram") return !card.cleared;
    return App.date.diffDays(App.date.today(), card.dueDate) >= 0;
  },
  overdueDays: function (card) {
    if (!card || !card.dueDate) return 0;
    return Math.max(0, App.date.diffDays(App.date.today(), card.dueDate));
  },
  isMissed: function (card) { return !!card && card.lastCorrect === false; },

  _rung: function (i) { return this.LADDER[Math.max(0, Math.min(i, this.LADDER.length - 1))]; },

  /* apply a rating ("again" | "hard" | "good" | "easy"), return the updated card */
  rate: function (card, rating) {
    card = this.upgrade(card) || this.newCard();
    var today = App.date.today();
    card.reps = (card.reps || 0) + 1;
    card.lastSeen = today;

    if (rating === "again") {
      card.cleared = false; card.lastCorrect = false;
      card.lapses = (card.lapses || 0) + 1;
      card.step = 0; card.dueDate = today;
    } else if (rating === "hard") {
      card.cleared = false; card.lastCorrect = true;          // recalled, with effort
      card.dueDate = App.date.addDays(today, 1);
    } else {
      var jump = rating === "easy" ? 1 : 0;
      var interval = this._rung((card.step || 0) + jump);
      card.cleared = true; card.lastCorrect = true;
      card.step = Math.min((card.step || 0) + 1 + jump, this.LADDER.length);
      card.dueDate = App.date.addDays(today, interval);
    }
    return card;
  },

  /* what each flashcard button will do, for its small label */
  preview: function (card, rating) {
    if (this.mode() === "cram") return rating === "again" || rating === "hard" ? "comes back" : "cleared";
    if (rating === "again") return "next session";
    if (rating === "hard") return "1 day";
    var step = (card && card.step) || 0;
    var d = this._rung(step + (rating === "easy" ? 1 : 0));
    return d === 1 ? "1 day" : d + " days";
  },

  /* convenience wrappers that persist into the store */
  rateFlashcard: function (id, rating) {
    var st = App.Store.get();
    st.srs.flashcards[id] = this.rate(st.srs.flashcards[id], rating);
    return st.srs.flashcards[id];
  },
  rateQuestion: function (id, rating) {
    var st = App.Store.get();
    st.srs.questions[id] = this.rate(st.srs.questions[id], rating);
    return st.srs.questions[id];
  }
};
