// Furkan "Paşa" Çelik - BŞEÜ Web Portal Service Worker

const CACHE_NAME = "bseu-portal-v2";
const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/output.css",
    "./css/pages.css",
    "./js/main.js",
    "./js/pages.js",
    "./img/BSEU_Logo.png",
    "./img/BM_Logo.png",
    "./img/logo-yuvarlak.ico",
    "./fonts/AgenorNeue-Regular.otf",
    "./fonts/OpenSans-Medium.ttf"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Network-First: İnternet varsa her zaman güncel dosyayı çek ve önbelleği güncelle; internet yoksa önbellekten göster
self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
