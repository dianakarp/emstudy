/* ui.js — rendering + interaction for all screens (vanilla DOM, no framework). */
window.App = window.App || {};

App.UI = {
  root: null,
  view: "dashboard",
  active: null, // in-progress session runtime

  /* ---------- utilities ---------- */
  esc: function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  },
  domainName: function (id) { var d = window.BCEMP_DOMAIN_MAP[id]; return d ? d.name : id; },
  toast: function (msg) {
    var t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .4s"; }, 1800);
    setTimeout(function () { t.remove(); }, 2300);
  },
  masteryClass: function (m) { return m >= 0.8 ? "bar-good" : m >= 0.55 ? "bar-mid" : m > 0 ? "bar-bad" : "bar-none"; },

  ring: function (pct, centerTop, centerBottom) {
    var r = 52, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<div class="ring-wrap"><svg width="120" height="120" viewBox="0 0 120 120">' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-elev2)" stroke-width="10"/>' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="url(#ringg)" stroke-width="10" stroke-linecap="round" ' +
      'stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" transform="rotate(-90 60 60)"/>' +
      '<defs><linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#5b8cff"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>' +
      '</svg><div class="center"><div class="lv">' + centerTop + '</div><div class="lvl">' + centerBottom + '</div></div></div>';
  },

  /* ---------- router ---------- */
  route: function (view) {
    this.view = view;
    this.active = null;
    Array.prototype.forEach.call(document.querySelectorAll("#nav button"), function (b) {
      b.classList.toggle("active", b.getAttribute("data-view") === view);
    });
    this.render();
    window.scrollTo(0, 0);
  },

  render: function () {
    if (!this.root) this.root = document.getElementById("app");
    if (this.active) return; // session screens render themselves
    if (this.view === "dashboard") this.renderDashboard();
    else if (this.view === "progress") this.renderProgress();
    else if (this.view === "settings") this.renderSettings();
  },

  /* ==================================================================
   * DASHBOARD
   * ================================================================== */
  renderDashboard: function () {
    var st = App.Store.get();
    var p = st.profile;
    var prog = App.Game.levelProgress(p.xp);
    var days = App.date.daysUntil(st.settings.examDate);
    var readiness = App.Analytics.readiness();
    var due = App.Analytics.dueCounts();
    var today = App.todayActivity();
    var goal = st.settings.dailyGoalQuestions || 10;
    var todayPct = Math.min(100, Math.round((today.questions / goal) * 100));
    var name = st.settings.name ? (", " + this.esc(st.settings.name)) : "";

    var html = "";

    // hero
    html += '<div class="card hero">' +
      this.ring(prog.pct, "Lv " + prog.level, "level") +
      '<div class="meta">' +
        '<h2>Welcome back' + name + ' 👋</h2>' +
        '<div style="color:var(--text-dim);font-size:14px">' + prog.into + " / " + prog.need + " XP to level " + (prog.level + 1) + '</div>' +
        '<div class="xpbar"><span style="width:' + prog.pct + '%"></span></div>' +
        '<div style="margin-top:8px;color:var(--text-faint);font-size:12px">Total XP: ' + p.xp + " · " + p.badges.length + " / " + App.Game.BADGES.length + ' badges</div>' +
      '</div></div>';

    // stat tiles
    html += '<div class="grid cols-3 mt">' +
      '<div class="card tile"><div class="big flame">' + p.streak + ' 🔥</div><div class="lbl">Day streak</div><div class="sub">Longest: ' + p.longestStreak + '</div></div>' +
      '<div class="card tile countdown"><div class="big">' + (days >= 0 ? days : 0) + '</div><div class="lbl">Days to exam</div><div class="sub">' + this.esc(st.settings.examDate) + '</div></div>' +
      '<div class="card tile"><div class="big">' + readiness + '%</div><div class="lbl">Exam readiness</div><div class="sub">' + App.Analytics.readinessLabel(readiness) + '</div></div>' +
    '</div>';

    // today's session
    html += '<div class="section-title">Today\'s session</div>';
    html += '<div class="card">' +
      '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">' +
        this.ring(todayPct, today.questions + "/" + goal, "goal") +
        '<div style="flex:1;min-width:220px">' +
          '<div style="font-size:15px;margin-bottom:6px">' +
            '<b>' + due.flashcards + '</b> flashcards &amp; <b>' + due.questions + '</b> questions due for review' +
          '</div>' +
          '<div style="color:var(--text-dim);font-size:13px;margin-bottom:14px">A daily session mixes spaced-repetition reviews, weak-topic drilling, and new material. Keep the streak alive!</div>' +
          '<div class="btn-row">' +
            '<button class="btn btn-primary" id="startFull">Start Full Session</button>' +
            '<button class="btn btn-ghost" id="startQuick">Quick Session</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    // focus areas
    var weak = App.Analytics.weakestDomains(3);
    if (weak.length) {
      html += '<div class="section-title">Focus areas (weakest first)</div><div class="card">';
      weak.forEach(function (d) {
        var m = App.Analytics.mastery(d.id);
        html += App.UI._domRow(d, m);
      });
      html += '</div>';
    } else {
      html += '<div class="section-title">Focus areas</div><div class="card empty">Complete a session to reveal your weakest domains — the app will then target them automatically.</div>';
    }

    // recent badges
    var earned = p.badges.slice(-4).reverse();
    if (earned.length) {
      html += '<div class="section-title">Recent badges</div><div class="badges">';
      earned.forEach(function (id) {
        var b = App.Game.BADGES.filter(function (x) { return x.id === id; })[0];
        if (b) html += '<div class="badge"><span class="ic">' + b.icon + '</span><span><span class="bn">' + b.name + '</span></span></div>';
      });
      html += '</div>';
    }

    this.root.innerHTML = html;
    document.getElementById("startFull").onclick = function () { App.UI.startSession("full"); };
    document.getElementById("startQuick").onclick = function () { App.UI.startSession("quick"); };
  },

  _domRow: function (d, mastery) {
    var pct = Math.round(mastery * 100);
    var s = App.Analytics.domainStat(d.id);
    var label = s.answered ? pct + "% · " + s.correct + "/" + s.answered : "—";
    return '<div class="dom-row"><div class="name">' + App.UI.esc(d.name) + '</div>' +
      '<div class="track"><span class="' + App.UI.masteryClass(mastery) + '" style="width:' + Math.max(3, pct) + '%"></span></div>' +
      '<div class="pct">' + label + '</div></div>';
  },

  /* ==================================================================
   * PROGRESS
   * ================================================================== */
  renderProgress: function () {
    var st = App.Store.get();
    var readiness = App.Analytics.readiness();
    var html = "";

    html += '<div class="card center">' +
      '<div style="font-size:44px;font-weight:800" class="countdown"><span class="big">' + readiness + '%</span></div>' +
      '<div style="color:var(--text-dim)">' + App.Analytics.readinessLabel(readiness) + ' · weighted across all exam domains</div>' +
      '<div style="color:var(--text-faint);font-size:12px;margin-top:6px">Overall accuracy ' + App.Analytics.overallAccuracy() + '% over ' + st.profile.totalQuestions + ' questions · ' + st.profile.totalSessions + ' sessions</div>' +
    '</div>';

    // all domains
    html += '<div class="section-title">Mastery by domain</div><div class="card">';
    (window.BCEMP_DOMAINS || []).forEach(function (d) {
      html += App.UI._domRow(d, App.Analytics.mastery(d.id));
    });
    html += '</div>';

    // heatmap
    html += '<div class="section-title">Study activity (last 30 days)</div><div class="card">';
    html += '<div class="heat">';
    App.Analytics.heatmap(30).forEach(function (c) {
      html += '<div class="cell' + (c.level ? " l" + c.level : "") + '" title="' + c.date + ": " + c.count + ' items"></div>';
    });
    html += '</div><div style="color:var(--text-faint);font-size:11px;margin-top:8px">Each square is a day; brighter = more reviews.</div></div>';

    // badges
    html += '<div class="section-title">Achievements (' + st.profile.badges.length + " / " + App.Game.BADGES.length + ')</div><div class="badges">';
    App.Game.BADGES.forEach(function (b) {
      var earned = st.profile.badges.indexOf(b.id) !== -1;
      html += '<div class="badge' + (earned ? "" : " locked") + '"><span class="ic">' + b.icon + '</span>' +
        '<span><span class="bn">' + b.name + '</span><br><span class="bd">' + App.UI.esc(b.desc) + '</span></span></div>';
    });
    html += '</div>';

    this.root.innerHTML = html;
  },

  /* ==================================================================
   * SETTINGS
   * ================================================================== */
  renderSettings: function () {
    var st = App.Store.get();
    var qCount = App.Content.questions().length, fCount = App.Content.flashcards().length;
    var custom = st.customContent.questions.length + st.customContent.flashcards.length;

    var html = "";
    html += '<div class="section-title">Your plan</div><div class="card">' +
      '<div class="field"><label>Your name (optional)</label><input id="setName" value="' + this.esc(st.settings.name) + '" placeholder="e.g. Diana"/></div>' +
      '<div class="field"><label>Exam date</label><input id="setExam" type="date" value="' + this.esc(st.settings.examDate) + '"/><div class="hint">Drives the countdown and pacing.</div></div>' +
      '<div class="field"><label>Daily question goal</label><input id="setGoal" type="number" min="4" max="60" value="' + (st.settings.dailyGoalQuestions || 10) + '"/></div>' +
      '<button class="btn btn-primary" id="saveSettings">Save plan</button>' +
      '<div id="settingsMsg"></div>' +
    '</div>';

    html += '<div class="section-title">Content library</div><div class="card">' +
      '<div style="color:var(--text-dim);font-size:14px;margin-bottom:10px">Loaded: <b>' + qCount + '</b> questions · <b>' + fCount + '</b> flashcards (' + custom + ' imported by you).</div>' +
      '<div class="field"><label>Import your own questions / flashcards (JSON or CSV)</label>' +
        '<input id="importContent" type="file" accept=".json,.csv"/>' +
        '<div class="hint">JSON must match <b>data/schema-example.json</b>. CSV headers — questions: <code>domain,difficulty,stem,optionA,optionB,optionC,optionD,correct,rationale,tags</code>; flashcards: <code>domain,front,back,tags</code>.</div>' +
      '</div>' +
      '<div id="importMsg"></div>' +
    '</div>';

    html += '<div class="section-title">Backup &amp; data</div><div class="card">' +
      '<div style="color:var(--text-dim);font-size:14px;margin-bottom:12px">Your progress lives in this browser only. Export a backup regularly so a cleared cache doesn\'t erase your streak.</div>' +
      '<div class="btn-row">' +
        '<button class="btn btn-ghost" id="exportBtn">⬇ Export progress</button>' +
        '<label class="btn btn-ghost" style="display:inline-block">⬆ Restore progress<input id="restoreInput" type="file" accept=".json" style="display:none"/></label>' +
        '<button class="btn btn-ghost" id="resetBtn" style="color:var(--bad)">Reset all data</button>' +
      '</div>' +
      '<div id="dataMsg"></div>' +
    '</div>';

    this.root.innerHTML = html;
    this._wireSettings();
  },

  _wireSettings: function () {
    var st = App.Store.get();

    document.getElementById("saveSettings").onclick = function () {
      st.settings.name = document.getElementById("setName").value.trim();
      var exam = document.getElementById("setExam").value;
      if (exam) st.settings.examDate = exam;
      var g = parseInt(document.getElementById("setGoal").value, 10);
      st.settings.dailyGoalQuestions = (g >= 4 && g <= 60) ? g : 10;
      App.Store.save();
      document.getElementById("settingsMsg").innerHTML = '<div class="notice ok">Saved. ✔</div>';
    };

    document.getElementById("importContent").onchange = function (e) {
      var file = e.target.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var msg = document.getElementById("importMsg");
        try {
          var res = file.name.toLowerCase().slice(-4) === ".csv"
            ? App.Import.fromCsv(reader.result)
            : App.Import.fromJson(reader.result);
          var out = '<div class="notice ok">Imported ' + res.addedQuestions + ' questions and ' + res.addedFlashcards + ' flashcards';
          if (res.skipped) out += ' (' + res.skipped + ' duplicates skipped)';
          out += '. ✔</div>';
          if (res.errors && res.errors.length) out += '<div class="notice err">Some rows were skipped:\n• ' + res.errors.slice(0, 12).map(App.UI.esc).join("\n• ") + '</div>';
          msg.innerHTML = out;
        } catch (err) {
          msg.innerHTML = '<div class="notice err">' + App.UI.esc(err.message) + '</div>';
        }
        e.target.value = "";
      };
      reader.readAsText(file);
    };

    document.getElementById("exportBtn").onclick = function () { App.exportProgress(); App.UI.toast("Backup downloaded"); };

    document.getElementById("restoreInput").onchange = function (e) {
      var file = e.target.files[0]; if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var msg = document.getElementById("dataMsg");
        try {
          App.importProgress(JSON.parse(reader.result));
          msg.innerHTML = '<div class="notice ok">Progress restored. ✔</div>';
          App.UI.toast("Progress restored");
          setTimeout(function () { App.UI.route("dashboard"); }, 700);
        } catch (err) {
          msg.innerHTML = '<div class="notice err">' + App.UI.esc(err.message) + '</div>';
        }
        e.target.value = "";
      };
      reader.readAsText(file);
    };

    document.getElementById("resetBtn").onclick = function () {
      if (confirm("Erase ALL progress, streaks, and imported content? This cannot be undone.")) {
        App.Store.reset();
        App.UI.toast("All data reset");
        App.UI.route("dashboard");
      }
    };
  },

  /* ==================================================================
   * SESSION FLOW
   * ================================================================== */
  startSession: function (mode) {
    var data = App.Session.build(mode);
    if (!data.flashcards.length && !data.questions.length) {
      this.toast("No content available — import some in Settings.");
      return;
    }
    this.active = {
      data: data,
      phase: data.flashcards.length ? "flashcards" : "questions",
      fIndex: 0, qIndex: 0,
      results: { correct: 0, total: 0, xp: 0, overdueCleared: 0, flashcardsDone: 0 }
    };
    this.renderSession();
  },

  _sessionHeader: function (label, pct) {
    return '<div class="session-head"><span class="pill">' + label + '</span>' +
      '<button class="pill" id="quitSession" style="cursor:pointer">✕ End</button></div>' +
      '<div class="prog"><span style="width:' + pct + '%"></span></div>';
  },

  renderSession: function () {
    if (this.active.phase === "flashcards") this._renderFlashcard();
    else this._renderQuestion();
    var q = document.getElementById("quitSession");
    if (q) q.onclick = function () {
      if (confirm("End this session now? Progress so far is kept, but the session won't be marked complete.")) {
        App.Store.save(); App.UI.route("dashboard");
      }
    };
  },

  _renderFlashcard: function () {
    var a = this.active;
    var fc = a.data.flashcards[a.fIndex];
    var totalSteps = a.data.flashcards.length + a.data.questions.length;
    var doneSteps = a.fIndex;
    var pct = Math.round((doneSteps / totalSteps) * 100);

    var html = this._sessionHeader("Warm-up · Flashcard " + (a.fIndex + 1) + "/" + a.data.flashcards.length, pct);
    html += '<div class="card flash">' +
      '<div class="q-domain">' + this.esc(this.domainName(fc.domain)) + '</div>' +
      '<div class="front">' + this.esc(fc.front) + '</div>' +
      '<div id="backWrap" style="display:none">' +
        '<div class="back">' + this.esc(fc.back) + '</div>' +
        '<div style="color:var(--text-faint);font-size:12px;margin-bottom:10px">How well did you recall this?</div>' +
        '<div class="rate-row">' +
          '<button class="rate again" data-r="again">Again<small>&lt;1d</small></button>' +
          '<button class="rate hard" data-r="hard">Hard<small>soon</small></button>' +
          '<button class="rate good" data-r="good">Good<small>days</small></button>' +
          '<button class="rate easy" data-r="easy">Easy<small>longer</small></button>' +
        '</div>' +
      '</div>' +
      '<button class="btn btn-primary" id="showBack" style="margin-top:10px">Show answer</button>' +
    '</div>';

    this.root.innerHTML = html;
    document.getElementById("showBack").onclick = function () {
      document.getElementById("backWrap").style.display = "block";
      this.style.display = "none";
    };
    Array.prototype.forEach.call(document.querySelectorAll(".rate"), function (btn) {
      btn.onclick = function () { App.UI._rateFlashcard(fc, btn.getAttribute("data-r")); };
    });
  },

  _rateFlashcard: function (fc, rating) {
    var a = this.active, st = App.Store.get();
    App.SRS.rateFlashcard(fc.id, rating);
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
    var a = this.active;
    var q = a.data.questions[a.qIndex];
    var totalSteps = a.data.flashcards.length + a.data.questions.length;
    var doneSteps = a.data.flashcards.length + a.qIndex;
    var pct = Math.round((doneSteps / totalSteps) * 100);

    var html = this._sessionHeader("Question " + (a.qIndex + 1) + "/" + a.data.questions.length, pct);
    html += '<div class="card">' +
      '<div class="q-domain">' + this.esc(this.domainName(q.domain)) + '</div>' +
      '<div class="q-stem">' + this.esc(q.stem) + '</div>' +
      '<div id="opts">';
    q.options.forEach(function (opt, i) {
      html += '<button class="opt" data-i="' + i + '">' + App.UI.esc(opt) + '</button>';
    });
    html += '</div><div id="afterQ"></div></div>';

    this.root.innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll(".opt"), function (btn) {
      btn.onclick = function () { App.UI._answerQuestion(q, parseInt(btn.getAttribute("data-i"), 10)); };
    });
  },

  _answerQuestion: function (q, choice) {
    var a = this.active, st = App.Store.get();
    var correct = choice === q.correctIndex;
    var wasOverdue = st.srs.questions[q.id] && App.SRS.isDue(st.srs.questions[q.id]) && App.SRS.overdueDays(st.srs.questions[q.id]) > 0;

    // lock & mark options
    Array.prototype.forEach.call(document.querySelectorAll(".opt"), function (btn) {
      var i = parseInt(btn.getAttribute("data-i"), 10);
      btn.disabled = true;
      if (i === q.correctIndex) btn.classList.add("correct"), btn.innerHTML += '<span class="mark">✓</span>';
      else if (i === choice) btn.classList.add("wrong"), btn.innerHTML += '<span class="mark">✕</span>';
    });

    // record
    App.recordAnswer(q.domain, correct);
    App.SRS.rateQuestion(q.id, correct ? "good" : "again");
    var xp = correct ? App.Game.XP.correct : App.Game.XP.incorrect;
    if (correct && wasOverdue) { xp += App.Game.XP.overdueBonus; a.results.overdueCleared++; }
    a.results.total++; if (correct) a.results.correct++;
    a.results.xp += xp;
    App.Game.addXp(xp);
    App.recordActivity({ questions: 1, xp: xp });
    App.Store.save();

    // rationale + next
    var after = document.getElementById("afterQ");
    after.innerHTML =
      '<div class="rationale"><b>' + (correct ? "Correct." : "Not quite.") + '</b> ' + this.esc(q.rationale) +
        '<div style="margin-top:8px;color:var(--text-faint);font-size:12px">+' + xp + ' XP' + (wasOverdue && correct ? ' · overdue review cleared' : '') + '</div>' +
      '</div>' +
      '<button class="btn btn-primary" id="nextQ">' + (a.qIndex + 1 >= a.data.questions.length ? "Finish session →" : "Next question →") + '</button>';
    document.getElementById("nextQ").onclick = function () {
      a.qIndex++;
      if (a.qIndex >= a.data.questions.length) App.UI._finishSession();
      else App.UI.renderSession();
    };
  },

  _finishSession: function () {
    var a = this.active, st = App.Store.get();
    st.profile.totalSessions++;
    var streak = App.Game.updateStreak();
    var bonusXp = App.Game.XP.sessionComplete;
    // perfect-session bonus
    var perfect = a.results.total >= 8 && a.results.correct === a.results.total;
    if (perfect) bonusXp += App.Game.XP.perfectBonus;
    a.results.xp += bonusXp;
    App.Game.addXp(bonusXp);
    App.recordActivity({ sessions: 1, xp: bonusXp });

    var newBadges = App.Game.checkBadges({ total: a.results.total, correct: a.results.correct, overdueCleared: a.results.overdueCleared });
    App.Store.save();

    this._renderSummary(streak, newBadges, perfect, bonusXp);
  },

  _renderSummary: function (streak, newBadges, perfect, bonusXp) {
    var a = this.active;
    var st = App.Store.get();
    var pct = a.results.total ? Math.round((a.results.correct / a.results.total) * 100) : 0;
    var prog = App.Game.levelProgress(st.profile.xp);

    var html = '<div class="card summary-hero">' +
      '<div style="color:var(--text-dim);font-size:13px;letter-spacing:1px;text-transform:uppercase">Session complete</div>' +
      '<div class="score">' + (a.results.total ? pct + "%" : "✓") + '</div>' +
      '<div style="color:var(--text-dim)">' + a.results.correct + " / " + a.results.total + " questions · " + a.results.flashcardsDone + ' flashcards reviewed</div>' +
      (perfect ? '<div style="color:var(--good);font-weight:700;margin-top:6px">⭐ Perfect session!</div>' : '') +
    '</div>';

    html += '<div class="reward"><span class="ic">✨</span><div><b>+' + a.results.xp + ' XP</b> earned this session' +
      '<div style="color:var(--text-faint);font-size:12px">Now level ' + prog.level + ' · ' + prog.into + '/' + prog.need + ' to next</div></div></div>';

    html += '<div class="reward"><span class="ic">🔥</span><div><b>' + st.profile.streak + '-day streak</b>' +
      (streak.graceUsed ? ' <span style="color:var(--warn)">(grace day used)</span>' : '') +
      '<div style="color:var(--text-faint);font-size:12px">' + App.date.daysUntil(st.settings.examDate) + ' days until your exam — keep it going.</div></div></div>';

    if (newBadges.length) {
      newBadges.forEach(function (b) {
        html += '<div class="reward pop-badge"><span class="ic">' + b.icon + '</span><div><b>Badge unlocked: ' + b.name + '</b>' +
          '<div style="color:var(--text-faint);font-size:12px">' + App.UI.esc(b.desc) + '</div></div></div>';
      });
    }

    // weakest domain callout
    var weak = App.Analytics.weakestDomains(1)[0];
    if (weak) {
      html += '<div class="section-title">Tomorrow\'s focus</div><div class="card">' +
        '<div style="font-size:14px">Your weakest area right now is <b>' + this.esc(weak.name) + '</b> (' + Math.round(App.Analytics.mastery(weak.id) * 100) + '% mastery). The next session will lean into it.</div></div>';
    }

    html += '<div class="btn-row mt center" style="justify-content:center">' +
      '<button class="btn btn-primary" id="anotherFull">Another session</button>' +
      '<button class="btn btn-ghost" id="toHome">Back to home</button></div>';

    this.active = null; // session over
    this.root.innerHTML = html;
    document.getElementById("anotherFull").onclick = function () { App.UI.startSession("full"); };
    document.getElementById("toHome").onclick = function () { App.UI.route("dashboard"); };
  }
};
