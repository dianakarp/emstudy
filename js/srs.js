/* srs.js — SM-2-lite spaced-repetition scheduling shared by flashcards and
 * missed questions. Ratings: "again" | "hard" | "good" | "easy".
 * A card record: { ease, interval(days), dueDate, reps, lapses, lastSeen } */
window.App = window.App || {};

App.SRS = {
  newCard: function () {
    return { ease: 2.5, interval: 0, dueDate: App.date.today(), reps: 0, lapses: 0, lastSeen: null };
  },

  /* is this stored card due today (or overdue)? un-tracked items are "new". */
  isDue: function (card) {
    if (!card) return true;
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

    if (rating === "again") {
      card.reps = 0;
      card.lapses = (card.lapses || 0) + 1;
      card.interval = 0;                       // resurfaces in the next session
      card.ease = Math.max(1.3, card.ease - 0.2);
    } else {
      if (card.reps === 0) {
        card.interval = rating === "easy" ? 3 : 1;
      } else if (card.reps === 1) {
        card.interval = rating === "easy" ? 6 : (rating === "hard" ? 3 : 4);
      } else {
        var mult = rating === "hard" ? 0.8 : (rating === "easy" ? 1.3 : 1);
        card.interval = Math.max(1, Math.round(card.interval * card.ease * mult));
      }
      card.reps++;
      var delta = rating === "hard" ? -0.15 : (rating === "easy" ? 0.15 : 0);
      card.ease = Math.min(3.0, Math.max(1.3, card.ease + delta));
    }

    card.dueDate = App.date.addDays(today, card.interval);
    card.lastSeen = today;
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
