// 5 Kasım 2026
// Furkan "Paşa" Çelik - BŞEÜ Web Portal Service Worker

const CACHE_NAME = "bseu-portal-v2.4.1";
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
    "./img/BSEU_Wallpaper.jpg",
    "./img/BM_Wallpaper.jpg",
    "./img/logo-yuvarlak.ico",
    "./fonts/AgenorNeue-Regular.otf",
    "./fonts/OpenSans-Medium.ttf",
    "./pages/akademik_takvim.html",
    "./pages/sinav_programi1.html",
    "./pages/sinav_programi2.html",
    "./pages/sinav_programi3.html",
    "./pages/yemek_listesi.html",
    "./pages/akademik_takvim.webp",
    "./pages/sinav_programi.webp",
    "./pages/yemek_listesi.webp"
];

// Tüm dosyaları kontrol edip güncel hallerini önbelleğe kaydeder
function updateAllAssets() {
    return caches.open(CACHE_NAME).then((cache) =>
        Promise.allSettled(
            ASSETS.map((url) =>
                fetch(url).then((response) => {
                    if (response && response.status === 200) {
                        return cache.put(url, response);
                    }
                })
            )
        )
    );
}

self.addEventListener("install", (event) => {
    event.waitUntil(updateAllAssets());
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

    const url = new URL(event.request.url);
    const isHomePage = event.request.mode === "navigate" &&
        (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html"));

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                if (isHomePage) {
                    event.waitUntil(updateAllAssets());
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
