/* Case Law for the Street — offline service worker — ROOT copy for GitHub Pages.
   This file sits beside index.html so its scope covers the page;
   index.html registers it as 'sw.js'. Paths rewritten from the
   retained assets copy (paths rewritten for root placement).
   Versioned cache: bump CACHE_NAME on every published update.
   The old cache is deleted on activation, and navigations are
   network-first, so corrections and new cards reach phones on the
   next online open — nobody is stranded on a stale copy. Offline,
   the cached copy is served cache-first. */
var CACHE_NAME = 'case-law-street-v15-2026-11-24';
var CORE = [
  './index.html',
  './',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name !== CACHE_NAME) return caches.delete(name);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Cornell etc. go to network

  if (req.mode === 'navigate') {
    // Network-first for the page itself: online opens always get the
    // newest published version and refresh the cache; offline opens
    // fall back to the saved copy.
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html', { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match(req, { ignoreSearch: true });
        });
      })
    );
    return;
  }

  // Static assets (manifest, icons): cache-first, refresh in background.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || network;
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
