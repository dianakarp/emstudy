/* srs.js — CRAM scheduling (exam is days away, not months).
 *
 * Rule: you see an item ONCE. If you get it right ("good"/"easy", or a correct
 * MCQ answer) it is RETIRED and never resurfaces. If you miss it ("again") or
 * flag it ("hard") it stays in the pool and comes back in the next session.
 *
 * This deliberately replaces the old SM-2 spacing, which kept re-showing
 * already-mastered material — useless with only days left.
 *
 * A card record: { retired, interval(days), dueDate, reps, lapses, lastSeen, ease } */
window.App = window.App || {};

App.SRS = {
  RETIRE_DAYS: 3650, // effectively forever

  newCard: function () {
    return { ease: 2.5, interval: 0, dueDate: App.date.today(), reps: 0, lapses: 0, lastSeen: null, retired: false };
  },

  /* a cleared item — answered correctly / rated good or easy */
  isRetired: function (card) {
    if (!card) return false;
    if (card.retired) return true;
    // legacy SM-2 cards: a future due date means it was answered correctly before
    return App.date.diffDays(App.date.today(), card.dueDate) < 0;
  },

  /* due = still owed a review. Untracked items are "new" (available, not due). */
  isDue: function (card) {
    if (!card) return true;             // never seen
    if (this.isRetired(card)) return false;
    return App.date.diffDays(App.date.today(), card.dueDate) >= 0;
  },
  overdueDays: function (card) {
    if (!card || !card.dueDate) return 0;
    return Math.max(0, App.date.diffDays(App.date.today(), card.dueDate));
  },

  /* apply a rating, return the updated card */
  rate: function (card, rating) {
    card = card || this.newCard();
    var today = App.date.today();
    card.reps = (card.reps || 0) + 1;
    card.lastSeen = today;

    if (rating === "again" || rating === "hard") {
      // keep it in rotation — back in the next session
      card.retired = false;
      card.interval = 0;
      card.dueDate = today;
      if (rating === "again") card.lapses = (card.lapses || 0) + 1;
    } else {
      // "good" or "easy" — cleared, do not show again
      card.retired = true;
      card.interval = this.RETIRE_DAYS;
      card.dueDate = App.date.addDays(today, this.RETIRE_DAYS);
    }
    return card;
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
