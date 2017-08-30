var CACHE_NAME = 'cache-v1';


var urlsToCache = [
  '/',
  '/index.html',
  '/favicon/manifest.json',
  '/css/typography.css',
  '/css/font-awesome.min.css',
  '/css/main.css',
  '/css/main-layout.css',
  '/css/skel.css',
  '/css/style.css',
  '/css/style-mobile.css',
  '/css/style-mobilep.css',
  '/css/style-normal.css',
  '/css/style-noscript.css',
  '/css/style-wide.css',
  '/css/main-layout.css',
  '/css/style.css',
  '/css/images/bg.jpg',
  '/css/images/overlay-pattern.png',
  '/css/images/overlay.svg',
  '/assets/images/andrew-bevan.png',
  '/js/skel.min.js',
  '/js/init.js',
  '/js/html5shiv.js'
];





self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});


self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['cache-v1', 'cache-v2'];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
