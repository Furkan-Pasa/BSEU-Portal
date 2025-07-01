// Furkan "Paşa" Çelik

document.addEventListener('DOMContentLoaded', function () {
    // Resim yükleme durumunu kontrol et
    const img = document.getElementById('loadImage');
    const loading = document.getElementById('loading');
    const container = document.getElementById('container');
    const error = document.getElementById('error');

    img.onload = function () {
        loading.style.display = 'none';
        container.style.display = 'flex';

        // Mobilde scroll pozisyonunu en sola ayarla
        if (window.innerWidth <= 768) {
            const imageWrapper = document.querySelector('.image-wrapper');
            setTimeout(() => {
                imageWrapper.scrollLeft = 0;
            }, 100);
        }
    };

    img.onerror = function () {
        loading.style.display = 'none';
        error.style.display = 'flex';
    };

    // Eğer resim zaten yüklenmişse (cache'den geliyorsa) manuel tetikle
    if (img.complete && img.naturalWidth > 0) {
        img.onload();
    }

    // Sayfa yüklendiğinde scroll pozisyonunu sıfırla ve sol tarafa hizala
    const imageWrapper = document.querySelector('.image-wrapper');

    // Mobil cihazlarda scroll pozisyonunu en sola ayarla
    if (window.innerWidth <= 768) {
        imageWrapper.scrollLeft = 0;
    }
    window.scrollTo(0, 0);

    // Sayfa yeniden boyutlandırıldığında scroll pozisyonunu ayarla
    window.addEventListener('resize', function () {
        const imageWrapper = document.querySelector('.image-wrapper');
        if (window.innerWidth <= 768) {
            imageWrapper.scrollLeft = 0;
        }
    });

    // Çift tıklama ile zoom özelliği
    let isZoomed = false;
    img.addEventListener('dblclick', function () {
        if (isZoomed) {
            this.style.transform = 'scale(1)';
            this.style.cursor = 'default';
            isZoomed = false;
        } else {
            this.style.transform = 'scale(1.5)';
            this.style.cursor = 'move';
            this.style.transformOrigin = 'center';
            this.style.transition = 'transform 0.3s ease';
            isZoomed = true;
        }
    });

    // Touch events için zoom desteği
    let initialDistance = 0;
    let scale = 1;

    img.addEventListener('touchstart', function (e) {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
        }
    });

    img.addEventListener('touchmove', function (e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );

            scale = Math.max(0.5, Math.min(3, (currentDistance / initialDistance) * scale));
            this.style.transform = `scale(${scale})`;
        }
    });
});