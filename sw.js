/* sw.js — offline service worker for BCEMP Trainer.
 * Caches the full app shell so it loads with no signal (e.g. on the subway).
 * All URLs are relative so it works under a GitHub Pages project subpath. */
var CACHE = "bcemp-v5";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./data/domains.js",
  "./data/questions.js",
  "./data/flashcards.js",
  "./data/quiz-flashcards.js",
  "./data/comparisons.js",
  "./js/state.js",
  "./js/srs.js",
  "./js/content.js",
  "./js/analytics.js",
  "./js/gamification.js",
  "./js/session.js",
  "./js/import.js",
  "./js/ui.js",
  "./js/app.js",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* cache-first for app assets; network fallback keeps it fresh when online */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (resp) {
        return caches.open(CACHE).then(function (c) {
          try { c.put(e.request, resp.clone()); } catch (err) {}
          return resp;
        });
      }).catch(function () { return caches.match("./index.html"); });
    })
  );
});
