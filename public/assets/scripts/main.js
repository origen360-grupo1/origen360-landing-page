// JavaScript sencillo, siguiendo los fundamentos de la semana 11.
// No se utilizan frameworks ni servicios externos.

const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu-principal');

menuBtn.addEventListener('click', function () {
    const abierto = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', abierto.toString());
    menuBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Mostrar menú');
});

const enlaces = menu.querySelectorAll('a');
enlaces.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Mostrar menú');
    });
});

const formulario = document.getElementById('consulta-form');
const codigo = document.getElementById('codigo-lote');
const resultado = document.getElementById('resultado-consulta');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const valor = codigo.value.trim().toUpperCase();

    if (valor === 'O360-DEMO-001') {
        resultado.textContent = 'Ejemplo encontrado: Palta Hass, origen Perú. Datos de demostración, no verificados.';
        resultado.className = 'form-message ok';
    } else {
        resultado.textContent = 'No encontramos ese código de ejemplo. Prueba con O360-DEMO-001.';
        resultado.className = 'form-message error';
    }
});

document.getElementById('anio').textContent = new Date().getFullYear();

// Videos locales: al encontrar el archivo, se muestra el reproductor.
// Solo debes copiar los MP4 en public/assets/videos con los nombres indicados.
const videos = document.querySelectorAll('.video-player');

videos.forEach(function (video) {
    video.addEventListener('loadedmetadata', function () {
        video.parentElement.classList.add('video-listo');
    });

    // Si no existe el video, se conserva la tarjeta de "Próximamente".
    video.addEventListener('error', function () {
        video.parentElement.classList.remove('video-listo');
    });

    video.load();
});
