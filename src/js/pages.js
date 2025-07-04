// Furkan "Paşa" Çelik

document.addEventListener('DOMContentLoaded', function () {
    // DOM elementleri
    const img = document.getElementById('loadImage');
    const loading = document.getElementById('loading');
    const container = document.getElementById('container');

    // Element kontrolü
    if (!img || !loading || !container) {
        console.error('Gerekli elementler bulunamadı');
        return;
    }

    // İçeriği göster
    function showContent() {
        loading.style.display = 'none';
        container.style.display = 'flex';
    }

    // Resim yüklendiğinde
    img.addEventListener('load', showContent);

    // Cache'den yüklenmişse
    if (img.complete && img.naturalWidth > 0) {
        showContent();
    }
});