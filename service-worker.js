'use strict';

const PREFIX = 'play';
const HASH = '424c85f6'; // Calculated when running `gulp`.
const OFFLINE_CACHE = `${ PREFIX }-${ HASH }`;
const OFFLINE_URL = '/offline/index.html';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then(function(cache) {
      return cache.addAll([
        OFFLINE_URL,
        '/css/estilo.css',
        '/img/logo.png',
        '/img/loading.jpg',
        '/img/loading-video.svg',
        '/img/facebook.svg',
        '/img/website.svg',
        '/js/loadCSS.js',
        '/js/cssrelpreload.js',
        '/scripts/search.js',
        '/js/turbolinks.min.js',
        '/js/jquery.min.js',
        '/js/echo.min.js',
        '/js/remodal.min.js',
        '/js/jquery-lang.js',
        '/js/langpack/en.json',
        '/js/jekyll-search.js',
        '/search.json',
        '/feeds/feed.json'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  // Delete old asset caches.
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key != OFFLINE_CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode == 'navigate') {
    console.log(`Handling fetch event for ${ event.request.url }`);
    event.respondWith(
      fetch(event.request).catch(function(exception) {
        // The `catch` is only triggered if `fetch()` throws an exception,
        // which most likely happens due to the server being unreachable.
        console.error(
          'Fetch failed; returning offline page instead.',
          exception
        );
        return caches.open(OFFLINE_CACHE).then(function(cache) {
          return cache.match(OFFLINE_URL);
        });
      })
    );
  } else {
    // It’s not a request for an HTML document, but rather for a CSS or SVG
    // file or whatever…
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }

});