const CACHE_NAME = 'pwa-tarefas-v1';
const ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/db.js',
    './js/app.js',
    './manifest.json',
    './images/icons/icon-192x192.png',
    './images/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    console.log('Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache aberto');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker ativado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => {
            console.log('Falha ao buscar recurso:', event.request.url);
        })
    );
});
