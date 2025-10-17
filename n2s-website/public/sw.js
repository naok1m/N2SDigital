<<<<<<< HEAD
// Service Worker para cache de assets
const CACHE_NAME = 'n2s-digital-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Adicionar outros assets críticos conforme necessário
];

// Instalar Service Worker
=======
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
>>>>>>> origin/souzadev
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
<<<<<<< HEAD
        console.log('Service Worker: Cache aberto');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.error('Service Worker: Erro ao cachear assets', error);
=======
        return cache.addAll(urlsToCache);
>>>>>>> origin/souzadev
      })
  );
});

<<<<<<< HEAD
// Ativar Service Worker
=======
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
>>>>>>> origin/souzadev
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
<<<<<<< HEAD
            console.log('Service Worker: Removendo cache antigo', cacheName);
=======
>>>>>>> origin/souzadev
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
<<<<<<< HEAD

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  // Ignorar requisições de extensões do Chrome e outros esquemas não suportados
  if (event.request.url.startsWith('chrome-extension://') || 
      event.request.url.startsWith('moz-extension://') ||
      event.request.url.startsWith('safari-extension://') ||
      event.request.url.startsWith('ms-browser-extension://')) {
    return;
  }
  
  // Estratégia Cache First para assets estáticos
  if (event.request.destination === 'image' || 
      event.request.destination === 'script' || 
      event.request.destination === 'style') {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request).then((response) => {
            // Verificar se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar a resposta
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
        })
    );
  }
  
  // Estratégia Network First para páginas HTML
  else if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Verificar se a resposta é válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar a resposta
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // Fallback para cache se a rede falhar
          return caches.match(event.request);
        })
    );
  }
});

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notificar sobre atualizações
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
=======
>>>>>>> origin/souzadev
