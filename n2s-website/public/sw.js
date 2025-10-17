const CACHE_NAME = 'n2s-digital-v1';
const urlsToCache = [
  '/',
  '/src/main.jsx',
  '/src/index.css',
  '/src/assets/logoN2S.png',
  '/public/arco.png',
  '/public/arco2.png',
  '/public/asteroides.png',
  '/public/banner-cta.png',
  '/public/banner-cta2.png',
  '/public/banner-cta3.png',
  '/public/correntes.png',
  '/public/estela.png',
  '/public/liquidos.png',
  '/public/love.png',
  '/public/noise.png',
  '/public/nuvens-baixo.png',
  '/public/nuvens-cima.png',
  '/public/pattern.png',
  '/public/planeta.png',
  'https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@200..700&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
