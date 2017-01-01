
var CACHE = 'play';

 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

 
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');

 
  evt.respondWith(fromCache(evt.request));

 
  evt.waitUntil(update(evt.request));
});

 
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './',
      './index.html',
      './videos/',
      './videos/index.html',
      './videos/2/',
      './videos/2/index.html',
      './videos/3/',
      './videos/3/index.html',
      './videos/4/',
      './videos/4/index.html',
      './tags/',
      './tags/index.html',
      './css/estilo.css',
      './img/logo.png',
      './img/loading.jpg',
      './img/loading-video.svg',
      './img/facebook.svg',
      './img/website.svg',
      './js/loadCSS.js',
      './js/cssrelpreload.js',
      './scripts/search.js',
      './js/turbolinks.min.js',
      './js/jquery.min.js',
      './js/echo.min.js',
      './js/remodal.min.js',
      './js/jquery-lang.js',
      './js/langpack/en.json',
      './js/jekyll-search.js'
    ]);
  });
}

 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

 
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}