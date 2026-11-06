// 6 Kasım 2026
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

    // Hata durumunda mesaj göster
    function showError() {
        loading.style.padding = '20px';
        loading.style.textAlign = 'center';
        loading.textContent = 'Görsel yüklenemedi. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyin.';
    }

    // Resim yüklendiğinde veya hata verdiğinde
    img.addEventListener('load', showContent);
    img.addEventListener('error', showError);

    // Cache'den yüklenmişse veya yükleme tamamlanmışsa
    if (img.complete) {
        if (img.naturalWidth > 0) {
            showContent();
        } else {
            showError();
        }
    }
});
