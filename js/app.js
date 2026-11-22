/* app.js — bootstrap: load state, wire navigation + keyboard, render the first screen. */
(function () {
  function boot() {
    App.Store.load();
    App.UI.root = document.getElementById("app");

    // header nav + settings button
    Array.prototype.forEach.call(document.querySelectorAll("[data-view]"), function (btn) {
      btn.addEventListener("click", function () { App.UI.route(btn.getAttribute("data-view")); });
    });
    // shared controls inside <main> (bookmarks, study-a-topic, review buttons, topic chips)
    App.UI.root.addEventListener("click", function (e) { App.UI._onRootClick(e); });
    // session shortcuts
    document.addEventListener("keydown", function (e) { App.UI.handleKey(e); });

    App.UI.route("dashboard", { force: true });

    // dev helper: App.debugAdvanceDay(n) shifts stored dates back n days so
    // reviews/streaks can be tested without changing the system clock.
    App.debugAdvanceDay = function (n) {
      n = n || 1;
      var st = App.Store.get();
      function shift(map) {
        Object.keys(map).forEach(function (id) {
          if (map[id] && map[id].dueDate) map[id].dueDate = App.date.addDays(map[id].dueDate, -n);
          if (map[id] && map[id].lastSeen) map[id].lastSeen = App.date.addDays(map[id].lastSeen, -n);
        });
      }
      shift(st.srs.questions); shift(st.srs.flashcards);
      if (st.profile.lastSessionDate) st.profile.lastSessionDate = App.date.addDays(st.profile.lastSessionDate, -n);
      App.Store.save();
      App.UI.route("dashboard", { force: true });
      console.log("Advanced " + n + " day(s): reviews should now be due.");
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
