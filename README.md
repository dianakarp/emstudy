# BCEMP Trainer 🚑💊

A gamified, spaced-repetition study tool for the **Board Certified Emergency Medicine Pharmacist (BCEMP)** exam. Built for a focused ~20–30 minute daily session over your final month of prep. Runs entirely in your browser — no install, no account, works offline, and your progress is saved on your own machine.

## How to open it
**Just double-click `index.html`** — it opens in your default browser and runs locally. Nothing else to install.

> Tip: pin the tab or bookmark it. To make daily use effortless, do the session first thing each day to protect your streak.

## What a daily session looks like
1. **Warm-up flashcards** — a few due cards to prime recall (rate each Again / Hard / Good / Easy).
2. **Practice questions** — board-style vignettes with immediate rationales. The mix is ~40% spaced-repetition reviews, ~30% weighted toward your weakest domains, and the rest new material.
3. **Summary** — XP earned, streak, any new badges, and tomorrow's focus area.

Choose **Quick (~15 min)** on busy days or **Full (~25–30 min)** when you have time. Either one keeps your streak alive.

## Why it works (the study science)
- **Active recall** — you retrieve answers, not just reread them.
- **Spaced repetition (SM-2)** — missed questions and hard flashcards resurface sooner; mastered ones stretch out, so you spend time where it counts.
- **Weak-topic targeting** — the app tracks per-domain accuracy and automatically drills your lowest domains.
- **Habit mechanics** — streaks (with one built-in grace day), XP, levels, a daily goal ring, badges, and an exam countdown keep you coming back daily.

## Progress, backups & settings (Settings tab)
- **Exam date / name / daily goal** — set your countdown and pacing.
- **⬇ Export progress** — download a JSON backup. Do this occasionally: your data lives in the browser's local storage, so clearing site data would erase it. **⬆ Restore progress** loads a backup back.
- **Reset all data** — wipe everything and start fresh.

## Adding your own content
The app ships with a seed bank across all exam domains, and you can grow it via **Settings → Import**:

- **JSON** — match the structure in [`data/schema-example.json`](data/schema-example.json).
- **CSV** —
  - Questions: `domain,difficulty,stem,optionA,optionB,optionC,optionD,correct,rationale,tags`
    (`correct` may be `1–4` or `A–D`; `tags` separated by `;` or `|`)
  - Flashcards: `domain,front,back,tags`
  - A ready-to-edit example is in [`data/sample-import.csv`](data/sample-import.csv).

Valid `domain` ids: `cv, resus, tox, neuro, id, trauma, resp, pain, endo, env, special, safety, pmr` (see [`data/domains.js`](data/domains.js)).

Imported items merge into your library, are de-duplicated by stem/front, and persist locally.

## Project layout
```
index.html        app shell (loads everything)
css/styles.css    theme + gamification visuals
js/               state, srs, content, analytics, gamification, session, import, ui, app
data/             domains, seed questions, seed flashcards, import templates
```

## ⚠️ Disclaimer
This is a **study aid**. Content is authored for exam prep and may contain simplifications or errors. Always verify dosing and management against current guidelines, primary literature, and your institution's protocols before applying to patient care. **Not medical advice.**
