// Service Worker para cache de assets
const CACHE_NAME = 'n2s-digital-v3'; // Atualizado para limpar cache antigo
const MAX_CACHE_SIZE = 10 * 1024 * 1024; // 10MB máximo de cache
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Adicionar outros assets críticos conforme necessário
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Função para verificar tamanho da resposta antes de cachear
async function getResponseSize(response) {
  const clonedResponse = response.clone();
  const blob = await clonedResponse.blob();
  return blob.size;
}

// Função para verificar se deve fazer cache do recurso
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Não fazer cache de requisições externas (APIs, analytics, etc)
  if (url.origin !== self.location.origin) {
    return false;
  }
  
  // Não fazer cache de imagens (mesmo que sejam pequenas)
  if (request.destination === 'image') {
    return false;
  }
  
  // Fazer cache apenas de recursos estáticos essenciais
  const cacheableTypes = [
    'script',
    'style',
    'font',
    'manifest'
  ];
  
  // Verificar se é um tipo cacheável
  if (cacheableTypes.includes(request.destination)) {
    return true;
  }
  
  // Fazer cache apenas de HTML (páginas)
  if (request.destination === 'document') {
    return true;
  }
  
  // NÃO fazer cache de outros recursos automaticamente
  
  return false;
}

// Interceptação de requisições - Estratégia Network First
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorar requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Se não deve fazer cache, apenas busca da rede
  if (!shouldCache(request)) {
    event.respondWith(fetch(request));
    return;
  }
  
  // Estratégia Network First para recursos cacheáveis
  event.respondWith(
    fetch(request)
      .then(async (response) => {
        // Verifica se recebeu uma resposta válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Verifica tamanho antes de cachear (limite de 500KB por arquivo)
        const size = await getResponseSize(response);
        const MAX_FILE_SIZE = 500 * 1024; // 500KB
        
        if (size > MAX_FILE_SIZE) {
          // Arquivo muito grande, não cachear
          return response;
        }

        // Clona a resposta para cache
        const responseToCache = response.clone();

        // Adiciona ao cache (sem bloquear a resposta)
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(request, responseToCache);
          })
          .catch(() => {
            // Ignora erros de cache silenciosamente
          });

        return response;
      })
      .catch(() => {
        // Se falhar na rede, tenta buscar do cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Se for uma página e não tiver no cache, retorna index.html
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
          
          // Retorna erro se não encontrar nada
          return new Response('Recurso não disponível offline', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// Mensagens do Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notificações push (opcional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da N2S Digital',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('N2S Digital', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Sincronização em background (opcional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implementar lógica de sincronização em background
  return Promise.resolve();
}

// Função para limpar cache antigo e manter tamanho controlado
async function cleanOldCache() {
  try {
    const cacheNames = await caches.keys();
    
    // Remove caches antigos
    await Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log('Removendo cache antigo:', cacheName);
          return caches.delete(cacheName);
        }
      })
    );
    
    // Verifica tamanho do cache atual e limpa se necessário
    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    
    // Se tiver muitos itens, remove os mais antigos
    if (keys.length > 50) {
      // Remove os 10 itens mais antigos
      const itemsToRemove = keys.slice(0, 10);
      await Promise.all(
        itemsToRemove.map(key => cache.delete(key))
      );
    }
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
  }
}

// Limpeza de cache antigo na ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      cleanOldCache(),
      self.clients.claim()
    ])
  );
});