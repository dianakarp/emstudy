/* sw.js — offline service worker for EM Study.
 *
 * Stale-while-revalidate: every request is answered from the cache at once (so the
 * app opens with no signal, e.g. on the subway) while a fresh copy is fetched in
 * the background for next time. Content fixes therefore reach returning readers on
 * their next visit even without a version bump. Bump CACHE when the list of files
 * changes; the page then offers a "Reload" toast.
 * All URLs are relative so it works under a GitHub Pages project subpath. */
var CACHE = "emstudy-v11";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2",
  "./fonts/atkinson-hyperlegible-next-latin-wght-italic.woff2",
  "./fonts/atkinson-hyperlegible-mono-latin-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-mono-latin-600-normal.woff2",
  "./fonts/source-serif-4-latin-600-normal.woff2",
  "./fonts/source-serif-4-latin-600-italic.woff2",
  "./data/domains.js",
  "./data/empc24-questions.js",
  "./data/biostats-questions.js",
  "./data/flashcards.js",
  "./data/quiz-flashcards.js",
  "./data/comparisons.js",
  "./data/comparisons-bp.js",
  "./data/biostats.js",
  "./js/state.js",
  "./js/srs.js",
  "./js/content.js",
  "./js/analytics.js",
  "./js/gamification.js",
  "./js/session.js",
  "./js/import.js",
  "./js/ui.js",
  "./js/library.js",
  "./js/app.js",
  "./favicon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
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

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // background refresh: revalidate with the server (ETag), store the fresh copy
  var network = fetch(req, { cache: "no-cache" }).then(function (resp) {
    if (!resp || !resp.ok || resp.type !== "basic") return resp;
    var copy = resp.clone();
    return caches.open(CACHE).then(function (c) { return c.put(req, copy); }).then(function () { return resp; });
  });

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || network.catch(function () {
        return req.mode === "navigate" ? caches.match("./index.html") : Response.error();
      });
    })
  );
  e.waitUntil(network.then(function () {}, function () {}));
});
