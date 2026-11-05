// Origen360 Perú - interacciones sencillas basadas en JavaScript Foundation.
// No utiliza frameworks ni servicios externos.

// 1. Menú para pantallas pequeñas.
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu-principal');

function cerrarMenu() {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Mostrar menú');
}

menuBtn.addEventListener('click', function () {
    const abierto = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', abierto.toString());
    menuBtn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Mostrar menú');
});

menu.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
});

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('open')) {
        cerrarMenu();
        menuBtn.focus();
    }
});

// 2. Consulta de lotes: datos INVENTADOS, guardados en objetos de JavaScript.
const lotesEjemplo = {
    'O360-DEMO-001': {
        producto: 'Palta Hass',
        origen: 'La Libertad, Perú (ficticio)',
        productor: 'Productor de ejemplo A',
        cosecha: '18/09/2026',
        estado: 'Ficha de demostración',
        recorrido: [
            ['Registro', '15/09/2026 · Código de ejemplo creado'],
            ['Cosecha', '18/09/2026 · Actividad simulada'],
            ['Transporte', '19/09/2026 · Movimiento simulado'],
            ['Entrega', '20/09/2026 · Recepción simulada']
        ]
    },
    'O360-DEMO-002': {
        producto: 'Café en grano',
        origen: 'Junín, Perú (ficticio)',
        productor: 'Productor de ejemplo B',
        cosecha: '05/10/2026',
        estado: 'Ficha de demostración',
        recorrido: [
            ['Registro', '02/10/2026 · Código de ejemplo creado'],
            ['Cosecha', '05/10/2026 · Actividad simulada'],
            ['Procesamiento', '07/10/2026 · Preparación simulada'],
            ['Distribución', '09/10/2026 · Envío simulado']
        ]
    }
};

const formulario = document.getElementById('consulta-form');
const codigo = document.getElementById('codigo-lote');
const mensaje = document.getElementById('resultado-consulta');
const ficha = document.getElementById('pasaporte-resultado');
const recorridoLista = document.getElementById('recorrido-lote');

function mostrarDato(id, texto) {
    document.getElementById(id).textContent = texto;
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const valor = codigo.value.trim().toUpperCase();
    const lote = lotesEjemplo[valor];

    if (!lote) {
        ficha.hidden = true;
        mensaje.textContent = 'Código no disponible en esta demo. Prueba O360-DEMO-001 u O360-DEMO-002.';
        mensaje.className = 'form-message error';
        return;
    }

    mostrarDato('dato-codigo', valor);
    mostrarDato('dato-producto', lote.producto);
    mostrarDato('dato-origen', lote.origen);
    mostrarDato('dato-productor', lote.productor);
    mostrarDato('dato-cosecha', lote.cosecha);
    mostrarDato('dato-estado', lote.estado);

    // Construir los pasos con elementos HTML, sin insertar texto como código.
    recorridoLista.innerHTML = '';
    lote.recorrido.forEach(function (paso, indice) {
        const elemento = document.createElement('li');
        const titulo = document.createElement('strong');
        const descripcion = document.createElement('span');
        titulo.textContent = paso[0] + ': ';
        descripcion.textContent = paso[1];
        elemento.setAttribute('data-paso', (indice + 1).toString());
        elemento.appendChild(titulo);
        elemento.appendChild(descripcion);
        recorridoLista.appendChild(elemento);
    });

    document.getElementById('resultado-titulo').textContent = lote.producto;
    ficha.hidden = false;
    mensaje.textContent = 'Se mostró una ficha de ejemplo. Los datos no han sido verificados.';
    mensaje.className = 'form-message ok';
    ficha.focus();
});

// Accesos directos a dos códigos para probar sin tener que escribirlos.
document.querySelectorAll('.codigo-sugerido').forEach(function (boton) {
    boton.addEventListener('click', function () {
        codigo.value = boton.getAttribute('data-codigo');
        codigo.focus();
        mensaje.textContent = 'Código cargado. Pulsa Consultar para ver el pasaporte.';
        mensaje.className = 'form-message';
    });
});

// 3. Año del pie de página.
document.getElementById('anio').textContent = new Date().getFullYear();

// 4. Videos HTML5: se muestran cuando se hayan copiado los MP4 a la carpeta.
const videos = document.querySelectorAll('.video-player');
videos.forEach(function (video) {
    const contenedor = video.parentElement;
    video.addEventListener('loadedmetadata', function () {
        contenedor.classList.add('video-listo');
    });
    video.addEventListener('error', function () {
        contenedor.classList.remove('video-listo');
    });
    const origen = video.querySelector('source');
    origen.addEventListener('error', function () {
        contenedor.classList.remove('video-listo');
    });
    video.load();
});
