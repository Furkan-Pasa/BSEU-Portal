// Furkan "Paşa" Çelik

// Varsayılan arayüz pozisyonu 0=BŞEÜ & 1=BM
var index = 0;

if (index == 0) {
    console.log("Index değeri 0 olarak ayarlandı.");
}
else if (index == 1) {
    console.log("Index değeri 1 olarak ayarlandı.");
}
else {
    console.log("Index değeri 0 ve 1 değeri dışında bir değer almış. Değer: " + index);
    console.log("Index değeri varsayılan değer olan 0 olarak ayarlandı.");
    index = 0;
}






/* ----------------   Body için Varsayılan Değerler   ------------------- */

// arkaplan1 varsayılan değerleri belirleme
var arkaplan1 = ["-45deg, rgba(238,119,82,1) 0%, rgba(231,25,205,1) 27%, rgba(255,111,66,1) 50%, rgba(231,25,205,1) 75%, rgba(238,119,82,1) 100%", "-45deg, rgba(231,25,205,1) 12%, rgba(114,82,238,1) 30%, rgba(200,10,249,1) 45%, rgba(200,10,249,1) 55%, rgba(114,82,238,1) 70%, rgba(231,25,205,1) 88%"];

// arkaplan2 varsayılan değerleri belirleme
var arkaplan2 = ["../img/BSEU_Wallpaper.jpg", "../img/BM_Wallpaper.jpg"];



/* ---------------   Header için Varsayılan Değerler   ------------------ */

// headerLogo varsayılan değerleri belirleme
var headerLogo = ["img/BSEU_Logo.png", "img/BM_Logo.png"];
// headerText varsayılan değerleri belirleme
var headerText = ["BŞEÜ Web Portal [BETA]", "BŞEÜ BM Web Portal [BETA]"];



/* ----------------   Main için Varsayılan Değerler   ------------------- */

var BSEU_DIV = document.getElementById('BSEU-DIV');
var BM_DIV = document.getElementById('BM-DIV');

// Varsayılan Main içeriği değiştirme

if (index == 1) {
    document.getElementById("BSEU-DIV").classList.toggle("hidden");
    document.getElementById("BM-DIV").classList.toggle("hidden");
} else { }



/* -----------------   Nav için Varsayılan Değerler   ------------------- */

const firstNav = document.getElementById("firstNav");
const secondNav = document.getElementById("secondNav");
if (index == 1) {
    document.getElementById("BSEU-DIV").classList.toggle("active");
    document.getElementById("BM-DIV").classList.toggle("active");
} else { }






sayfaUpdate();

function sayfaUpdate() {

    var yeniArkaplan1 = arkaplan1[index];
    document.documentElement.style.setProperty('--yeniArkaplan1', 'linear-gradient(' + yeniArkaplan1 + ')');
    var yeniArkaplan2 = arkaplan2[index];
    document.documentElement.style.setProperty('--yeniArkaplan2', 'url(' + yeniArkaplan2 + ')');

    document.getElementById("header_logo").src = headerLogo[index];
    document.getElementById("header_text").textContent = headerText[index];
}


function gecisYap() {

    // Index değerini 0 veya 1 arasında değiştirir
    index = (index + 1) % 2;

    sayfaUpdate();

    // Main içeriği değiştirme
    document.getElementById("BSEU-DIV").classList.toggle("hidden");
    document.getElementById("BM-DIV").classList.toggle("hidden");

    // Nav bar class değiştirme
    firstNav.classList.toggle("active");
    secondNav.classList.toggle("active");

}


function gecisBSEU() {

    index = 0;

    sayfaUpdate();

    // Main içerik değiştirme
    document.getElementById("BSEU-DIV").classList.remove("hidden");
    document.getElementById("BM-DIV").classList.add("hidden");

    // Nav bar class değiştirme
    firstNav.classList.add("active");
    secondNav.classList.remove("active");

}

function gecisBM() {

    index = 1;

    sayfaUpdate();

    // Main içerik değiştirme
    document.getElementById("BSEU-DIV").classList.add("hidden");
    document.getElementById("BM-DIV").classList.remove("hidden");

    // Nav bar class değiştirme
    firstNav.classList.remove("active");
    secondNav.classList.add("active");

}







function toggleDiv_old() {

    const firstButton = document.getElementById("firstButton");
    const secondButton = document.getElementById("secondButton");

    // Belirli bir sınıfı değişkene atama
    var divsClass = 'divler';
    // var div_BSEU = 'BSEU-DIV';
    // var div_BM = 'BM-DIV';

    // Değişkenin içindeki sınıfa sahip olan tüm div elementlerini bulma
    var divler = document.querySelectorAll('.' + divsClass);
    // var div_BSEU_ALL = document.querySelectorAll('.' + div_BSEU);
    // var div_BM_ALL = document.querySelectorAll('.' + div_BM);

    // Her bir div elementini gezerek görünürlük sınıfını değiştirme
    divler.forEach(function (div) {
        if (div.classList.contains('visible')) {
            div.classList.remove('visible');
            div.classList.add('hidden');
        }
        else if (div.classList.contains('hidden')) {
            div.classList.remove('hidden');
            div.classList.add('visible');
        }
        else {
            console.log("Div Toggle da Hata Var");
        }
    });
}