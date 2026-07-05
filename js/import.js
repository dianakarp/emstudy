/* import.js — parse & validate user-supplied questions/flashcards (JSON or CSV)
 * and merge them into custom content. Returns a summary; throws on hard errors. */
window.App = window.App || {};

App.Import = {
  validDomains: function () { return (window.BCEMP_DOMAINS || []).map(function (d) { return d.id; }); },

  _uid: function (prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  },

  /* ---------- JSON ---------- */
  fromJson: function (text) {
    var obj;
    try { obj = JSON.parse(text); } catch (e) { throw new Error("Invalid JSON: " + e.message); }
    var questions = obj.questions || [];
    var flashcards = obj.flashcards || [];
    if (!Array.isArray(questions) || !Array.isArray(flashcards)) {
      throw new Error("Expected 'questions' and/or 'flashcards' arrays.");
    }
    return this._merge(questions, flashcards);
  },

  /* ---------- CSV ---------- */
  /* Questions CSV header: domain,difficulty,stem,optionA,optionB,optionC,optionD,correct(1-4 or A-D),rationale,tags
     Flashcards CSV header: domain,front,back,tags
     Type is auto-detected from the header row. */
  fromCsv: function (text) {
    var rows = this._parseCsv(text);
    if (rows.length < 2) throw new Error("CSV appears to be empty.");
    var header = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var isFlash = header.indexOf("front") !== -1 && header.indexOf("back") !== -1;
    var questions = [], flashcards = [];

    for (var r = 1; r < rows.length; r++) {
      var row = rows[r];
      if (row.length === 1 && row[0].trim() === "") continue; // blank line
      var rec = {};
      header.forEach(function (h, i) { rec[h] = (row[i] || "").trim(); });

      if (isFlash) {
        flashcards.push({ domain: rec.domain, front: rec.front, back: rec.back, tags: this._tags(rec.tags) });
      } else {
        var opts = [rec.optiona, rec.optionb, rec.optionc, rec.optiond].filter(function (o) { return o !== undefined && o !== ""; });
        questions.push({
          domain: rec.domain,
          difficulty: parseInt(rec.difficulty, 10) || 2,
          stem: rec.stem,
          options: opts,
          correctIndex: this._parseCorrect(rec.correct),
          rationale: rec.rationale || "",
          tags: this._tags(rec.tags)
        });
      }
    }
    return this._merge(questions, flashcards);
  },

  _parseCorrect: function (v) {
    if (v === undefined || v === "") return 0;
    v = String(v).trim().toUpperCase();
    var letters = { A: 0, B: 1, C: 2, D: 3, E: 4 };
    if (letters[v] !== undefined) return letters[v];
    var n = parseInt(v, 10);
    return isNaN(n) ? 0 : n - 1; // 1-based in CSV -> 0-based
  },
  _tags: function (v) { return v ? v.split(/[;|]/).map(function (t) { return t.trim(); }).filter(Boolean) : []; },

  /* minimal RFC-4180-ish CSV parser (handles quotes, commas, newlines) */
  _parseCsv: function (text) {
    var rows = [], row = [], field = "", inQuotes = false;
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    for (var i = 0; i < text.length; i++) {
      var c = text.charAt(i);
      if (inQuotes) {
        if (c === '"') {
          if (text.charAt(i + 1) === '"') { field += '"'; i++; } else { inQuotes = false; }
        } else field += c;
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
        else field += c;
      }
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  },

  /* validate + assign ids + dedupe + persist */
  _merge: function (questions, flashcards) {
    var valid = this.validDomains();
    var errors = [];
    var st = App.Store.get();
    var existingQ = {}, existingF = {};
    App.Content.questions().forEach(function (q) { existingQ[(q.stem || "").trim().toLowerCase()] = true; });
    App.Content.flashcards().forEach(function (f) { existingF[(f.front || "").trim().toLowerCase()] = true; });

    var addedQ = 0, addedF = 0, skipped = 0;
    var self = this;

    questions.forEach(function (q, idx) {
      if (!q.stem || !q.domain) { errors.push("Question row " + (idx + 1) + ": missing stem or domain."); return; }
      if (valid.indexOf(q.domain) === -1) { errors.push("Question row " + (idx + 1) + ": unknown domain '" + q.domain + "'."); return; }
      if (!Array.isArray(q.options) || q.options.length < 2) { errors.push("Question row " + (idx + 1) + ": needs at least 2 options."); return; }
      if (typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
        errors.push("Question row " + (idx + 1) + ": correct answer index out of range."); return;
      }
      if (existingQ[q.stem.trim().toLowerCase()]) { skipped++; return; }
      q.id = q.id || self._uid("cq");
      q.difficulty = q.difficulty || 2;
      q.tags = q.tags || [];
      st.customContent.questions.push(q);
      existingQ[q.stem.trim().toLowerCase()] = true;
      addedQ++;
    });

    flashcards.forEach(function (f, idx) {
      if (!f.front || !f.back || !f.domain) { errors.push("Flashcard row " + (idx + 1) + ": missing front, back, or domain."); return; }
      if (valid.indexOf(f.domain) === -1) { errors.push("Flashcard row " + (idx + 1) + ": unknown domain '" + f.domain + "'."); return; }
      if (existingF[f.front.trim().toLowerCase()]) { skipped++; return; }
      f.id = f.id || self._uid("cf");
      f.tags = f.tags || [];
      st.customContent.flashcards.push(f);
      existingF[f.front.trim().toLowerCase()] = true;
      addedF++;
    });

    App.Store.save();
    return { addedQuestions: addedQ, addedFlashcards: addedF, skipped: skipped, errors: errors };
  }
};
