// Origen360 Perú - JavaScript de la Landing Page.

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

// 2. Base de demostración (etapa 0). Ningún registro es oficial o verificado.
// El análisis preventivo usa una regla documental demostrativa; no hay IA o ML conectado.
function congelarDatos(objeto) {
    Object.values(objeto).forEach(function (valor) {
        if (valor !== null && typeof valor === 'object') {
            congelarDatos(valor);
        }
    });
    return Object.freeze(objeto);
}

function metadatosDemo(nivelEvidencia = 'declarada') {
    return {
        simulacion: true,
        fuente: 'Dataset local de demostración académica Origen360',
        nivelEvidencia: nivelEvidencia,
        fechaActualizacion: null,
        limitaciones: 'Datos ficticios, sin validación oficial ni garantía sanitaria.'
    };
}

const datosDemo = congelarDatos({
    version: 1,
    metadatos: metadatosDemo(),
    productores: {
        'PROD-DEMO-A': { id: 'PROD-DEMO-A', nombre: 'Productor de ejemplo A', metadatos: metadatosDemo() },
        'PROD-DEMO-B': { id: 'PROD-DEMO-B', nombre: 'Productor de ejemplo B', metadatos: metadatosDemo() }
    },
    proveedores: {
        'PROV-DEMO-A': { id: 'PROV-DEMO-A', nombre: 'Proveedor de ejemplo A (ficticio)', metadatos: metadatosDemo() },
        'PROV-DEMO-B': { id: 'PROV-DEMO-B', nombre: 'Proveedor de ejemplo B (ficticio)', metadatos: metadatosDemo() }
    },
    lotes: {
        'O360-DEMO-001': {
            id: 'O360-DEMO-001',
            producto: 'Palta Hass',
            origen: 'La Libertad, Perú (ficticio)',
            productorId: 'PROD-DEMO-A',
            proveedorId: 'PROV-DEMO-A',
            cosecha: '18/09/2026',
            estado: 'Ficha de demostración',
            metadatos: metadatosDemo()
        },
        'O360-DEMO-002': {
            id: 'O360-DEMO-002',
            producto: 'Café en grano',
            origen: 'Junín, Perú (ficticio)',
            productorId: 'PROD-DEMO-B',
            proveedorId: 'PROV-DEMO-B',
            cosecha: '05/10/2026',
            estado: 'Ficha de demostración',
            metadatos: metadatosDemo()
        }
    },
    trazabilidad: [
        { id: 'EV-DEMO-001-1', loteId: 'O360-DEMO-001', orden: 1, etapa: 'Registro', fecha: '15/09/2026', descripcion: 'Código de ejemplo creado', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-001-2', loteId: 'O360-DEMO-001', orden: 2, etapa: 'Cosecha', fecha: '18/09/2026', descripcion: 'Actividad simulada', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-001-3', loteId: 'O360-DEMO-001', orden: 3, etapa: 'Transporte', fecha: '19/09/2026', descripcion: 'Movimiento simulado', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-001-4', loteId: 'O360-DEMO-001', orden: 4, etapa: 'Entrega', fecha: '20/09/2026', descripcion: 'Recepción simulada', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-002-1', loteId: 'O360-DEMO-002', orden: 1, etapa: 'Registro', fecha: '02/10/2026', descripcion: 'Código de ejemplo creado', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-002-2', loteId: 'O360-DEMO-002', orden: 2, etapa: 'Cosecha', fecha: '05/10/2026', descripcion: 'Actividad simulada', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-002-3', loteId: 'O360-DEMO-002', orden: 3, etapa: 'Procesamiento', fecha: '07/10/2026', descripcion: 'Preparación simulada', metadatos: metadatosDemo() },
        { id: 'EV-DEMO-002-4', loteId: 'O360-DEMO-002', orden: 4, etapa: 'Distribución', fecha: '09/10/2026', descripcion: 'Envío simulado', metadatos: metadatosDemo() }
    ],
    evidencias: [
        {
            id: 'DOC-DEMO-001', loteId: 'O360-DEMO-001',
            nombre: 'Registro de procedencia de ejemplo', categoria: 'documento',
            tipo: 'Documento declarado de procedencia', disponibilidad: 'disponible',
            entidad: 'Entidad documental de ejemplo A (ficticia)', fecha: '18/09/2026',
            vigencia: 'Del 18/09/2026 al 18/12/2026 (periodo ficticio registrado)', archivo: null,
            alcance: 'Metadatos académicos de procedencia para O360-DEMO-001. No constituyen una certificación ni acreditan inocuidad.',
            metadatos: {
                ...metadatosDemo(), fuente: 'Registro documental académico simulado de Origen360',
                fechaActualizacion: '20/09/2026'
            }
        },
        {
            id: 'LAB-DEMO-001', loteId: 'O360-DEMO-001',
            nombre: 'Análisis de laboratorio de ejemplo', categoria: 'laboratorio',
            tipo: 'Registro académico de análisis', disponibilidad: 'disponible',
            entidad: 'Laboratorio didáctico de ejemplo (ficticio)', fecha: '18/09/2026',
            tipoAnalisis: 'Caracterización física de muestra (simulada)',
            resultado: 'Registro académico de caracterización. No se incluyen mediciones ni conclusiones sanitarias.',
            vigencia: null, archivo: null,
            alcance: 'Ejemplo de metadatos de un análisis asociado a O360-DEMO-001. No es un informe emitido por un laboratorio real ni valida el producto.',
            metadatos: {
                ...metadatosDemo(), fuente: 'Registro de laboratorio académico simulado de Origen360',
                fechaActualizacion: '19/09/2026'
            }
        },
        {
            id: 'DOC-DEMO-002', loteId: 'O360-DEMO-002',
            nombre: 'Referencia documental incompleta', categoria: 'documento',
            tipo: 'Registro documental parcial', disponibilidad: 'parcial',
            entidad: null, fecha: null, vigencia: null, archivo: null,
            alcance: 'Solo existe una referencia académica incompleta para O360-DEMO-002. Evidencia documental no disponible; no se acredita que se haya realizado un control.',
            metadatos: metadatosDemo()
        }
    ],
    alertas: [
        {
            id: 'AL-DEMO-001', loteId: 'O360-DEMO-001', naturaleza: 'simulacion_academica',
            titulo: 'Revisión de referencia documental (ejemplo)',
            descripcion: 'Aviso académico: la referencia de procedencia del lote de ejemplo requiere revisión de su alcance. Este registro no describe un incidente sanitario real.',
            fecha: '20/09/2026', estado: 'Aviso de revisión simulado',
            alcance: 'Solo la referencia de procedencia de O360-DEMO-001 dentro del escenario académico. No se aplica a otros lotes ni productos.',
            metadatos: { ...metadatosDemo(), fuente: 'Registro académico de avisos Origen360 (simulado)', fechaActualizacion: '20/09/2026' }
        },
        {
            id: 'AL-DEMO-002', loteId: 'O360-DEMO-001', naturaleza: 'simulacion_academica',
            titulo: 'Actualización de transporte (ejemplo)',
            descripcion: 'Aviso académico: se ha incorporado una observación de ejemplo sobre los datos de transporte de este lote. No representa una incidencia sanitaria ni una instrucción de una autoridad.',
            fecha: '19/09/2026', estado: 'Registro informativo simulado',
            alcance: 'Solo los datos de transporte de O360-DEMO-001 correspondientes al 19/09/2026 en la demostración.',
            metadatos: { ...metadatosDemo(), fuente: 'Registro académico de avisos Origen360 (simulado)', fechaActualizacion: '19/09/2026' }
        }
    ],
    estimaciones: [
        {
            id: 'EST-DEMO-001', loteId: 'O360-DEMO-001', estado: 'demostracion_disponible',
            categoria: 'revision_prioritaria',
            factores: [
                { id: 'FAC-DEMO-001-A', nombre: 'Adjunto documental pendiente', evidenciaId: 'DOC-DEMO-001', requiereRevision: true,
                    descripcion: 'El registro DOC-DEMO-001 conserva metadatos de procedencia, pero no tiene archivo adjunto.',
                    fuente: 'Registro documental académico simulado de Origen360' },
                { id: 'FAC-DEMO-001-B', nombre: 'Adjunto del análisis pendiente', evidenciaId: 'LAB-DEMO-001', requiereRevision: true,
                    descripcion: 'El registro LAB-DEMO-001 conserva metadatos académicos de un análisis, pero no tiene archivo adjunto.',
                    fuente: 'Registro de laboratorio académico simulado de Origen360' }
            ],
            fecha: '06/11/2026', modelo: 'regla_documental_demo_v1',
            metadatos: { ...metadatosDemo('predictiva'), fuente: 'Regla documental demostrativa Origen360 v1 (simulada)',
                fechaActualizacion: '06/11/2026', limitaciones: 'Solo prioriza la revisión de adjuntos en registros académicos. No mide contaminantes, no estima inocuidad y no utiliza IA ni ML real.' }
        },
        {
            id: 'EST-DEMO-002', loteId: 'O360-DEMO-002', estado: 'sin_datos_suficientes',
            categoria: null, factores: [], fecha: null, modelo: null,
            metadatos: metadatosDemo('predictiva')
        }
    ]
});

// Única identidad activa. El texto del campo no se considera un lote consultado.
let loteActivoId = null;

function normalizarCodigo(valor) {
    return typeof valor === 'string' ? valor.trim().toUpperCase() : '';
}

function obtenerLotePorCodigo(valor) {
    const id = normalizarCodigo(valor);
    return Object.prototype.hasOwnProperty.call(datosDemo.lotes, id) ? datosDemo.lotes[id] : null;
}

function ordenarEventos(eventos) {
    const ordenValido = function (evento) {
        return Number.isFinite(evento.orden) && evento.orden > 0 ? evento.orden : Infinity;
    };
    // Los eventos sin orden van al final; no se infieren fechas ni etapas ausentes.
    return eventos.slice().sort(function (a, b) {
        const primero = ordenValido(a);
        const segundo = ordenValido(b);
        return primero === segundo ? 0 : primero - segundo;
    });
}

function obtenerContextoLoteActivo() {
    const lote = obtenerLotePorCodigo(loteActivoId);
    if (!lote) return null;

    // Cada colección se filtra con la misma identidad, nunca con el campo editable.
    return congelarDatos({
        lote: lote,
        productor: datosDemo.productores[lote.productorId] || null,
        proveedor: datosDemo.proveedores[lote.proveedorId] || null,
        trazabilidad: ordenarEventos(datosDemo.trazabilidad.filter(function (evento) {
            return evento.loteId === lote.id;
        })),
        evidencias: datosDemo.evidencias.filter(function (registro) { return registro.loteId === lote.id; }),
        alertas: datosDemo.alertas.filter(function (registro) { return registro.loteId === lote.id; }),
        estimaciones: datosDemo.estimaciones.filter(function (registro) { return registro.loteId === lote.id; })
    });
}

function establecerLoteActivo(valor) {
    const lote = obtenerLotePorCodigo(valor);
    loteActivoId = lote ? lote.id : null;
    return obtenerContextoLoteActivo();
}

const formulario = document.getElementById('consulta-form');
const codigo = document.getElementById('codigo-lote');
const mensaje = document.getElementById('resultado-consulta');
const ficha = document.getElementById('pasaporte-resultado');
const recorridoLista = document.getElementById('recorrido-lote');
const resultados = document.getElementById('busqueda-resultados');
const listaResultados = document.getElementById('lista-resultados');
const confirmacion = document.getElementById('lote-confirmacion');
let modoConsulta = 'general';
let eventoActivoIndice = null;
let botonesEtapas = [];
let evidenciaActivaId = null;
let botonesEvidencias = new Map();
let codigoAlertasConsultado = null;
let alertaActivaId = null;
let botonesAlertas = new Map();
// Recepción comparte lote activo, lector y pasaporte; solo conserva su paso de navegación.
let recepcionActiva = false;
let pasoRecepcion = 1;
let guardandoRecepcion = false;
let retornoRecepcionId = 'recepcion-trazabilidad';
const prefijoRevisionRecepcion = 'origen360.recepcion.v1.';
let estimacionConsultadaId = null;
let priorizacionConsultadaId = null;

// Etapa 3.1: un único panel activo, sin cambiar el lote ni reconstruir secciones.
const pestanasPasaporte = [
    { clave: 'origen', botonId: 'pestana-origen', panelId: 'pasaporte-origen' },
    { clave: 'trazabilidad', botonId: 'pestana-trazabilidad', panelId: 'pasaporte-trazabilidad' },
    { clave: 'evidencias', botonId: 'pestana-evidencias', panelId: 'pasaporte-evidencias' },
    { clave: 'alertas', botonId: 'pestana-alertas', panelId: 'pasaporte-alertas' },
    { clave: 'analisis', botonId: 'pestana-analisis', panelId: 'pasaporte-analisis' }
];
let pestanaPasaporteActiva = 'origen';

function alinearPanelSiEsNecesario() {
    const zona = document.getElementById('pasaporte-paneles');
    const navegacion = document.getElementById('pasaporte-navegacion');
    if (ficha.hidden || typeof zona.getBoundingClientRect !== 'function' || typeof window.scrollBy !== 'function') return;
    const inicio = zona.getBoundingClientRect().top;
    const borde = navegacion.getBoundingClientRect().bottom;
    // Solo corrige el caso de estar desplazado dentro de un panel largo.
    // En la posición normal no desplaza la página ni cambia el fragmento de URL.
    if (inicio < borde - 1) window.scrollBy({ top: inicio - borde - 12, left: 0, behavior: 'instant' });
}

function activarPestanaPasaporte(clave, opciones = {}) {
    const elegida = pestanasPasaporte.find(function (pestana) { return pestana.clave === clave; });
    if (!elegida) return false;
    const cambio = pestanaPasaporteActiva !== clave;
    pestanaPasaporteActiva = clave;
    pestanasPasaporte.forEach(function (pestana) {
        const activa = pestana.clave === clave;
        const boton = document.getElementById(pestana.botonId);
        const panel = document.getElementById(pestana.panelId);
        boton.setAttribute('aria-selected', String(activa));
        boton.setAttribute('tabindex', activa ? '0' : '-1');
        panel.hidden = !activa;
        if (activa && cambio) panel.classList.add('pasaporte-panel-entrando');
        else if (!activa) panel.classList.remove('pasaporte-panel-entrando');
    });
    ficha.setAttribute('data-pestana-activa', clave);
    if (opciones.enfocar) document.getElementById(elegida.botonId).focus({ preventScroll: true });
    if (cambio && opciones.ajustarVista) alinearPanelSiEsNecesario();
    return true;
}

pestanasPasaporte.forEach(function (pestana, indice) {
    const boton = document.getElementById(pestana.botonId);
    boton.addEventListener('click', function () {
        activarPestanaPasaporte(pestana.clave, { enfocar: true, ajustarVista: true });
    });
    boton.addEventListener('focus', function () {
        if (pestanaPasaporteActiva !== pestana.clave) activarPestanaPasaporte(pestana.clave, { ajustarVista: true });
    });
    boton.addEventListener('keydown', function (evento) {
        if (evento.altKey || evento.ctrlKey || evento.metaKey) return;
        let destino;
        if (evento.key === 'ArrowRight') destino = (indice + 1) % pestanasPasaporte.length;
        else if (evento.key === 'ArrowLeft') destino = (indice + pestanasPasaporte.length - 1) % pestanasPasaporte.length;
        else if (evento.key === 'Home') destino = 0;
        else if (evento.key === 'End') destino = pestanasPasaporte.length - 1;
        else if (evento.key === 'Enter' || evento.key === ' ') destino = indice;
        else return; // Tab, Shift+Tab y flechas verticales conservan su función nativa.
        evento.preventDefault();
        activarPestanaPasaporte(pestanasPasaporte[destino].clave, { enfocar: true, ajustarVista: true });
    });
});
activarPestanaPasaporte('origen');

document.getElementById('abrir-leyenda-pasaporte').addEventListener('click', function () {
    document.getElementById('leyenda-evidencia').open = true;
});

function textoDisponible(valor) {
    return typeof valor === 'string' && valor.trim() ? valor : 'Información no disponible';
}

function resumirLote(lote) {
    const campos = [lote.producto, lote.origen];
    const disponibles = campos.filter(function (valor) {
        return typeof valor === 'string' && valor.trim();
    }).length;
    return {
        id: textoDisponible(lote.id),
        producto: textoDisponible(lote.producto),
        origen: textoDisponible(lote.origen),
        disponibilidad: disponibles === campos.length ? 'Información de demostración disponible' :
            disponibles ? 'Información parcial de demostración disponible' : 'Información descriptiva no disponible para este lote'
    };
}

function normalizarTexto(valor) {
    return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
}

// Formato de los identificadores de esta demostración; no es un estándar oficial.
function esCodigoLote(valor) {
    return /^O360-DEMO-\d{3}$/.test(normalizarCodigo(valor));
}

function resolverBusqueda(entrada, modo = 'general', lotes = Object.values(datosDemo.lotes)) {
    const valor = typeof entrada === 'string' ? entrada.trim() : '';
    if (!valor) return { estado: 'entrada-invalida', lotes: [], mensaje: 'Escribe un producto o un código para continuar.' };
    if (valor.length > 80) return { estado: 'entrada-invalida', lotes: [], mensaje: 'Usa un máximo de 80 caracteres y vuelve a intentar.' };

    if (modo === 'codigo' || /\d/.test(valor) || /^O360/i.test(valor)) {
        if (!esCodigoLote(valor)) return {
            estado: 'formato-invalido', lotes: [],
            mensaje: 'Formato incorrecto. Usa O360-DEMO seguido de tres dígitos, por ejemplo O360-DEMO-001.'
        };
        const coincidencias = lotes.filter(function (lote) { return lote.id === normalizarCodigo(valor); });
        return {
            estado: coincidencias.length ? 'encontrado' : 'sin-resultados', lotes: coincidencias,
            mensaje: coincidencias.length ? 'Lote encontrado. Revisa el resumen antes de abrir su pasaporte.' :
                'El código tiene un formato válido, pero no está registrado en esta demostración. Corrígelo o intenta con otro código.'
        };
    }
    if (!/^[\p{L}\p{M}\s'-]+$/u.test(valor)) return {
        estado: 'entrada-invalida', lotes: [], mensaje: 'Escribe un nombre de producto o un código con formato O360-DEMO-001.'
    };
    const palabras = normalizarTexto(valor).split(' ');
    const coincidencias = lotes.filter(function (lote) {
        const nombre = normalizarTexto(typeof lote.producto === 'string' ? lote.producto : '');
        return palabras.every(function (palabra) { return nombre.includes(palabra); });
    });
    return {
        estado: coincidencias.length ? 'encontrado' : 'sin-resultados', lotes: coincidencias,
        mensaje: coincidencias.length ? 'Selecciona un lote para confirmar sus datos.' :
            'No encontramos coincidencias en los datos de demostración. Prueba con Palta Hass, Café o un código de ejemplo.'
    };
}

function actualizarMensaje(texto, estado = '') {
    mensaje.textContent = texto;
    mensaje.className = 'form-message' + (estado ? ' ' + estado : '');
}

function actualizarPaso(paso) {
    ['paso-identificar', 'paso-confirmar', 'paso-pasaporte'].forEach(function (id, indice) {
        const elemento = document.getElementById(id);
        if (indice === paso - 1) elemento.setAttribute('aria-current', 'step');
        else elemento.removeAttribute('aria-current');
    });
}

function mostrarDato(id, texto) {
    document.getElementById(id).textContent = textoDisponible(texto);
}

function limpiarLoteActivo() {
    establecerLoteActivo(null);
    limpiarVistaRecepcion();
    ficha.hidden = true;
    activarPestanaPasaporte('origen');
    ficha.removeAttribute('data-lote-id');
    confirmacion.hidden = true;
    confirmacion.removeAttribute('data-lote-id');
    resultados.hidden = true;
    listaResultados.replaceChildren();
    ['dato-codigo', 'dato-producto', 'dato-origen', 'dato-productor', 'dato-proveedor', 'dato-cosecha', 'dato-estado'].forEach(function (id) {
        document.getElementById(id).textContent = '—';
    });
    document.getElementById('resultado-titulo').textContent = 'Ficha de lote';
    document.getElementById('pasaporte-codigo').textContent = '';
    ['confirmacion-producto', 'resumen-codigo', 'resumen-origen', 'resumen-disponibilidad'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    recorridoLista.replaceChildren();
    limpiarDetalleEtapa();
    limpiarEvidencias();
    limpiarConsultaAlertas();
    limpiarAnalisisPreventivo();
    botonesEtapas = [];
    ['pasaporte-contexto-producto', 'pasaporte-contexto-lote', 'pasaporte-disponibilidad', 'pasaporte-disponibilidad-detalle',
        'cobertura-origen', 'cobertura-trazabilidad', 'cobertura-evidencias', 'cobertura-alertas', 'cobertura-analisis', 'actores-disponibilidad'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    ['respaldo-codigo', 'respaldo-producto', 'respaldo-cosecha', 'respaldo-estado', 'respaldo-origen',
        'respaldo-productor', 'respaldo-proveedor', 'pasaporte-niveles'].forEach(function (id) {
        const elemento = document.getElementById(id);
        elemento.replaceChildren();
        elemento.removeAttribute('data-nivel');
    });
    document.getElementById('traza-vacia').hidden = true;
    actualizarPaso(1);
}

function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

function mostrarConfirmacion(id, origen = 'busqueda') {
    limpiarLoteActivo();
    const contexto = establecerLoteActivo(id);
    if (!contexto) {
        actualizarMensaje('El lote no está disponible. Realiza otra consulta.', 'error');
        codigo.focus();
        return;
    }
    const resumen = resumirLote(contexto.lote);
    if (recepcionActiva) {
        mostrarRecepcionIdentificada(contexto, origen);
        return;
    }
    mostrarDato('confirmacion-producto', resumen.producto);
    mostrarDato('resumen-codigo', resumen.id);
    mostrarDato('resumen-origen', resumen.origen);
    mostrarDato('resumen-disponibilidad', resumen.disponibilidad);
    document.getElementById('confirmacion-contexto').textContent = origen === 'qr' ? 'LOTE RECONOCIDO POR QR' : 'LOTE SELECCIONADO';
    confirmacion.setAttribute('data-lote-id', contexto.lote.id);
    confirmacion.hidden = false;
    actualizarPaso(2);
    actualizarMensaje('Lote identificado. Confirma el producto y el código antes de continuar.', 'ok');
    confirmacion.focus();
}

function mostrarResultados(respuesta) {
    listaResultados.replaceChildren();
    const entradaInvalida = respuesta.estado === 'entrada-invalida' || respuesta.estado === 'formato-invalido';
    codigo.setAttribute('aria-invalid', entradaInvalida.toString());
    document.getElementById('resultados-titulo').textContent = entradaInvalida ? 'Revisa tu búsqueda' : 'Resultados de búsqueda';
    document.getElementById('resultados-total').textContent = entradaInvalida ? 'Entrada no válida' :
        respuesta.lotes.length + (respuesta.lotes.length === 1 ? ' lote' : ' lotes');
    document.getElementById('consulta-vacia').hidden = respuesta.lotes.length > 0;
    document.getElementById('consulta-vacia-titulo').textContent = entradaInvalida ? 'Corrige la entrada para continuar' : 'Sin coincidencias';
    document.getElementById('consulta-vacia-texto').textContent = respuesta.mensaje;
    respuesta.lotes.forEach(function (lote, indice) {
        const resumen = resumirLote(lote);
        const item = crearElemento('li', 'consulta-result-item');
        const numero = crearElemento('span', 'consulta-result-numero', String(indice + 1).padStart(2, '0'));
        numero.setAttribute('aria-hidden', 'true');
        const contenido = crearElemento('div', 'consulta-result-info');
        contenido.appendChild(crearElemento('p', 'consulta-identificador', resumen.id));
        contenido.appendChild(crearElemento('h4', '', resumen.producto));
        contenido.appendChild(crearElemento('p', 'consulta-result-origen', 'Procedencia: ' + resumen.origen));
        contenido.appendChild(crearElemento('p', 'consulta-result-disponibilidad', resumen.disponibilidad));
        const boton = crearElemento('button', 'secondary-btn', 'Ver resumen');
        boton.type = 'button';
        boton.setAttribute('aria-label', 'Ver resumen de ' + resumen.producto + ', lote ' + resumen.id);
        boton.addEventListener('click', function () { mostrarConfirmacion(lote.id); });
        item.appendChild(numero);
        item.appendChild(contenido);
        item.appendChild(boton);
        listaResultados.appendChild(item);
    });
    resultados.hidden = false;
    actualizarMensaje(respuesta.mensaje, entradaInvalida ? 'error' : respuesta.lotes.length ? 'ok' : '');
    if (entradaInvalida) codigo.focus();
    else resultados.focus();
}

// Etapa 2: respaldo por dato. La leyenda no asigna niveles al dataset.
const nivelesEvidencia = congelarDatos({
    declarada: { texto: 'Declarada', icono: '▤' },
    verificada: { texto: 'Verificada por terceros', icono: '▦' },
    oficial: { texto: 'Oficial', icono: '▣' },
    predictiva: { texto: 'Predictiva', icono: '⌕' },
    'no-determinado': { texto: 'Nivel no determinado', icono: '?' },
    'no-disponible': { texto: 'No disponible', icono: '?' }
});

function tieneTexto(valor) {
    return typeof valor === 'string' && valor.trim().length > 0;
}

function metadatosDeDato(registro, campo) {
    if (!registro) return null;
    // Una ausencia explícita por campo no se sustituye por metadatos generales.
    if (registro.metadatosCampos && Object.prototype.hasOwnProperty.call(registro.metadatosCampos, campo)) {
        return registro.metadatosCampos[campo];
    }
    return registro.metadatos || null;
}

function describirRespaldo(valor, metadatos) {
    const meta = metadatos && typeof metadatos === 'object' ? metadatos : {};
    const nivelReconocido = ['declarada', 'verificada', 'oficial', 'predictiva'].includes(meta.nivelEvidencia);
    const clave = !tieneTexto(valor) ? 'no-disponible' :
        nivelReconocido && tieneTexto(meta.fuente) ? meta.nivelEvidencia : 'no-determinado';
    return {
        clave: clave,
        texto: nivelesEvidencia[clave].texto,
        icono: nivelesEvidencia[clave].icono,
        fuente: textoDisponible(meta.fuente),
        actualizacion: textoDisponible(meta.fechaActualizacion),
        limitaciones: textoDisponible(meta.limitaciones)
    };
}

function crearEtiquetaRespaldo(respaldo) {
    const etiqueta = crearElemento('span', 'nivel-etiqueta nivel-' + respaldo.clave);
    const icono = crearElemento('span', 'nivel-icono', respaldo.icono);
    icono.setAttribute('aria-hidden', 'true');
    etiqueta.appendChild(icono);
    etiqueta.appendChild(crearElemento('span', '', respaldo.texto));
    return etiqueta;
}

function pintarRespaldo(id, valor, metadatos, abierto = false) {
    const contenedor = document.getElementById(id);
    const respaldo = describirRespaldo(valor, metadatos);
    contenedor.replaceChildren();
    contenedor.setAttribute('data-nivel', respaldo.clave);
    const etiquetas = crearElemento('div', 'respaldo-etiquetas');
    etiquetas.appendChild(crearEtiquetaRespaldo(respaldo));
    // Todo el dataset de esta aplicación es académico, incluso en fixtures de otros niveles.
    etiquetas.appendChild(crearElemento('span', 'nivel-demo', 'Simulado'));
    contenedor.appendChild(etiquetas);
    if (respaldo.clave === 'predictiva') {
        contenedor.appendChild(crearElemento('p', 'respaldo-predictivo', 'Estimación predictiva. No es una certificación ni una alerta oficial.'));
    }
    const detalles = crearElemento('details', 'dato-fuente');
    detalles.open = abierto;
    const resumenFuente = crearElemento('summary', '', 'Fuente y alcance');
    const nombres = {
        'respaldo-codigo': 'código del lote', 'respaldo-producto': 'producto',
        'respaldo-cosecha': 'fecha de cosecha', 'respaldo-estado': 'estado del registro',
        'respaldo-origen': 'origen', 'respaldo-productor': 'productor', 'respaldo-proveedor': 'proveedor',
        'respaldo-evento-etapa': 'nombre de la etapa', 'respaldo-evento-fecha': 'fecha del evento',
        'respaldo-evento-descripcion': 'información del evento'
    };
    resumenFuente.setAttribute('aria-label', 'Fuente y alcance: ' + nombres[id]);
    detalles.appendChild(resumenFuente);
    const lista = crearElemento('dl', 'fuente-metadatos');
    [['Fuente', respaldo.fuente], ['Actualización', respaldo.actualizacion], ['Limitaciones', respaldo.limitaciones]].forEach(function (dato) {
        const fila = crearElemento('div');
        fila.appendChild(crearElemento('dt', '', dato[0]));
        fila.appendChild(crearElemento('dd', '', dato[1]));
        lista.appendChild(fila);
    });
    detalles.appendChild(lista);
    contenedor.appendChild(detalles);
    return respaldo;
}

function pintarDato(id, respaldoId, valor, registro, campo, abierto = false) {
    mostrarDato(id, valor);
    return pintarRespaldo(respaldoId, valor, metadatosDeDato(registro, campo), abierto);
}

function limpiarDetalleEtapa() {
    eventoActivoIndice = null;
    const detalle = document.getElementById('detalle-etapa');
    detalle.hidden = true;
    detalle.removeAttribute('data-lote-id');
    detalle.removeAttribute('data-evento-id');
    ['detalle-etapa-titulo', 'detalle-etapa-lote', 'detalle-evento-id', 'detalle-evento-fecha', 'detalle-evento-descripcion'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    ['respaldo-evento-etapa', 'respaldo-evento-fecha', 'respaldo-evento-descripcion'].forEach(function (id) {
        document.getElementById(id).replaceChildren();
        document.getElementById(id).removeAttribute('data-nivel');
    });
    document.getElementById('traza-sin-seleccion').hidden = false;
}

function seleccionarEtapa(indice, loteEsperadoId) {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto || ficha.hidden || contexto.lote.id !== loteEsperadoId || !Number.isInteger(indice)) return;
    const evento = contexto.trazabilidad[indice];
    if (!evento) return;
    activarPestanaPasaporte('trazabilidad');
    eventoActivoIndice = indice;
    botonesEtapas.forEach(function (boton, posicion) { boton.setAttribute('aria-pressed', String(posicion === indice)); });
    mostrarDato('detalle-etapa-titulo', evento.etapa);
    mostrarDato('detalle-evento-id', evento.id);
    document.getElementById('detalle-etapa-lote').textContent = textoDisponible(contexto.lote.producto) + ' · ' + contexto.lote.id;
    pintarDato('detalle-evento-fecha', 'respaldo-evento-fecha', evento.fecha, evento, 'fecha');
    pintarDato('detalle-evento-descripcion', 'respaldo-evento-descripcion', evento.descripcion, evento, 'descripcion');
    pintarRespaldo('respaldo-evento-etapa', evento.etapa, metadatosDeDato(evento, 'etapa'));
    const detalle = document.getElementById('detalle-etapa');
    detalle.setAttribute('data-lote-id', contexto.lote.id);
    if (tieneTexto(evento.id)) detalle.setAttribute('data-evento-id', evento.id);
    else detalle.removeAttribute('data-evento-id');
    document.getElementById('traza-sin-seleccion').hidden = true;
    detalle.hidden = false;
    detalle.focus();
}

function pintarRecorrido(contexto) {
    limpiarDetalleEtapa();
    botonesEtapas = [];
    recorridoLista.replaceChildren();
    document.getElementById('traza-vacia').hidden = contexto.trazabilidad.length > 0;
    document.getElementById('traza-sin-seleccion').hidden = contexto.trazabilidad.length === 0;
    contexto.trazabilidad.forEach(function (evento, indice) {
        const item = crearElemento('li');
        const boton = crearElemento('button', 'traza-evento');
        boton.type = 'button';
        boton.setAttribute('aria-pressed', 'false');
        boton.setAttribute('aria-controls', 'detalle-etapa');
        boton.setAttribute('aria-describedby', 'trayecto-ayuda');
        const ordenConocido = Number.isFinite(evento.orden) && evento.orden > 0;
        const numero = crearElemento('span', 'traza-numero', ordenConocido ? String(evento.orden).padStart(2, '0') : '?');
        numero.setAttribute('aria-hidden', 'true');
        const contenido = crearElemento('span', 'traza-evento-contenido');
        contenido.appendChild(crearElemento('strong', '', textoDisponible(evento.etapa)));
        contenido.appendChild(crearElemento('span', 'traza-fecha', textoDisponible(evento.fecha)));
        contenido.appendChild(crearEtiquetaRespaldo(describirRespaldo(evento.etapa, metadatosDeDato(evento, 'etapa'))));
        if (!ordenConocido || ![evento.etapa, evento.fecha, evento.descripcion].every(tieneTexto)) {
            contenido.appendChild(crearElemento('span', 'traza-dato-faltante', !ordenConocido ? 'Orden no disponible' : 'Hay datos no disponibles'));
        }
        boton.appendChild(numero);
        boton.appendChild(contenido);
        boton.addEventListener('click', function () { seleccionarEtapa(indice, contexto.lote.id); });
        item.appendChild(boton);
        recorridoLista.appendChild(item);
        botonesEtapas.push(boton);
    });
}

// Etapa 3: controles documentales como metadatos, sin generar archivos adjuntos.
function esEvidenciaConsultable(registro) {
    return tieneTexto(registro.id) && registro.disponibilidad !== 'no_disponible' &&
        [registro.nombre, registro.tipo, registro.entidad, registro.fecha, registro.alcance, registro.tipoAnalisis, registro.resultado].some(tieneTexto);
}

function estadoEvidencia(registro) {
    if (!esEvidenciaConsultable(registro)) return { clave: 'no-disponible', texto: 'Evidencia no disponible' };
    const completo = [registro.nombre, registro.tipo, registro.entidad, registro.fecha].every(tieneTexto);
    return registro.disponibilidad === 'disponible' && completo ?
        { clave: 'disponible', texto: 'Registro disponible' } : { clave: 'parcial', texto: 'Información parcial' };
}

function respaldoDeEvidencia(registro) {
    return describirRespaldo(esEvidenciaConsultable(registro) ? registro.nombre || registro.tipo || registro.id : null, registro.metadatos);
}

function textoAdjunto(registro) {
    return tieneTexto(registro.archivo) ? 'Referencia de archivo registrada. La apertura de adjuntos no está habilitada en esta etapa.' :
        'Sin archivo adjunto. Solo se consultan los datos registrados.';
}

function etiquetasEvidencia(registro) {
    const grupo = crearElemento('div', 'respaldo-etiquetas');
    grupo.appendChild(crearEtiquetaRespaldo(respaldoDeEvidencia(registro)));
    grupo.appendChild(crearElemento('span', 'nivel-demo', 'Simulado'));
    return grupo;
}

function limpiarDetalleEvidencia() {
    evidenciaActivaId = null;
    const detalle = document.getElementById('evidencia-detalle');
    detalle.hidden = true;
    detalle.removeAttribute('data-lote-id');
    detalle.removeAttribute('data-evidencia-id');
    ['evidencia-detalle-titulo', 'evidencia-producto', 'evidencia-lote', 'evidencia-disponibilidad', 'evidencia-id', 'evidencia-tipo',
        'evidencia-entidad', 'evidencia-fecha', 'evidencia-vigencia', 'evidencia-fuente', 'evidencia-actualizacion',
        'evidencia-analisis-tipo', 'evidencia-analisis-resultado', 'evidencia-alcance', 'evidencia-limitaciones', 'evidencia-archivo'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    const nivel = document.getElementById('evidencia-nivel');
    nivel.replaceChildren();
    nivel.removeAttribute('data-nivel');
    document.getElementById('evidencia-laboratorio').hidden = true;
    document.getElementById('evidencia-predictiva').hidden = true;
    document.getElementById('evidencias-vista-lista').hidden = false;
}

function limpiarEvidencias() {
    limpiarDetalleEvidencia();
    botonesEvidencias = new Map();
    ['evidencias-documentos-lista', 'evidencias-laboratorio-lista'].forEach(function (id) { document.getElementById(id).replaceChildren(); });
    ['evidencias-resumen', 'evidencias-total'].forEach(function (id) { document.getElementById(id).textContent = ''; });
    document.getElementById('pasaporte-evidencias').removeAttribute('data-lote-id');
    document.getElementById('evidencias-vacias').hidden = true;
    document.getElementById('evidencias-documentos-vacios').hidden = true;
    document.getElementById('evidencias-laboratorio-vacios').hidden = true;
    document.getElementById('evidencias-grupos').hidden = false;
}

function crearTarjetaEvidencia(registro, loteId) {
    const estado = estadoEvidencia(registro);
    const item = crearElemento('li');
    const tarjeta = crearElemento('article', 'evidencia-tarjeta');
    const cabecera = crearElemento('div', 'evidencia-tarjeta-cabecera');
    const icono = crearElemento('span', 'evidencia-icono', registro.categoria === 'laboratorio' ? '▦' : '▤');
    icono.setAttribute('aria-hidden', 'true');
    const identificacion = crearElemento('div');
    identificacion.appendChild(crearElemento('p', 'consulta-identificador', textoDisponible(registro.id)));
    identificacion.appendChild(crearElemento('h6', '', textoDisponible(registro.nombre)));
    cabecera.appendChild(icono);
    cabecera.appendChild(identificacion);
    tarjeta.appendChild(cabecera);
    tarjeta.appendChild(crearElemento('p', 'evidencia-disponibilidad estado-' + estado.clave, estado.texto));
    tarjeta.appendChild(etiquetasEvidencia(registro));
    const metadatos = crearElemento('dl', 'evidencia-tarjeta-datos');
    const campos = [['Tipo', registro.tipo], ['Entidad', registro.entidad], ['Fecha', registro.fecha], ['Vigencia registrada', registro.vigencia]];
    if (registro.categoria === 'laboratorio') campos.push(['Tipo de análisis', registro.tipoAnalisis]);
    campos.forEach(function (dato) {
        const fila = crearElemento('div');
        fila.appendChild(crearElemento('dt', '', dato[0]));
        fila.appendChild(crearElemento('dd', '', textoDisponible(dato[1])));
        metadatos.appendChild(fila);
    });
    tarjeta.appendChild(metadatos);
    tarjeta.appendChild(crearElemento('p', 'evidencia-tarjeta-fuente', 'Fuente: ' + textoDisponible(registro.metadatos && registro.metadatos.fuente)));
    if (estado.clave === 'parcial') tarjeta.appendChild(crearElemento('p', 'evidencia-parcial-ayuda', 'Evidencia documental no disponible o incompleta. Consulta qué datos faltan en el registro.'));
    tarjeta.appendChild(crearElemento('p', 'evidencia-sin-archivo', textoAdjunto(registro)));
    if (esEvidenciaConsultable(registro)) {
        const boton = crearElemento('button', 'secondary-btn', estado.clave === 'parcial' ? 'Consultar registro parcial' : 'Ver detalle del registro');
        boton.type = 'button';
        boton.setAttribute('aria-label', 'Consultar ' + textoDisponible(registro.nombre) + ', lote ' + loteId);
        boton.setAttribute('aria-controls', 'evidencia-detalle');
        boton.addEventListener('click', function () { seleccionarEvidencia(registro.id, loteId); });
        botonesEvidencias.set(registro.id, boton);
        tarjeta.appendChild(boton);
    } else {
        tarjeta.appendChild(crearElemento('p', 'evidencia-sin-detalle', 'Sin detalle disponible. La ausencia de evidencia no acredita un control realizado.'));
    }
    item.appendChild(tarjeta);
    return item;
}

function pintarEvidencias(contexto) {
    limpiarEvidencias();
    const registros = contexto.evidencias;
    document.getElementById('pasaporte-evidencias').setAttribute('data-lote-id', contexto.lote.id);
    const consultables = registros.filter(esEvidenciaConsultable).length;
    document.getElementById('evidencias-total').textContent = registros.length + (registros.length === 1 ? ' control asociado' : ' controles asociados');
    document.getElementById('evidencias-resumen').textContent = consultables ?
        consultables + (consultables === 1 ? ' registro consultable' : ' registros consultables') + '. Revisa su disponibilidad y alcance.' : 'Evidencia no disponible para consulta en este lote.';
    document.getElementById('evidencias-vacias').hidden = registros.length > 0;
    document.getElementById('evidencias-grupos').hidden = registros.length === 0;
    const documentos = registros.filter(function (registro) { return registro.categoria !== 'laboratorio'; });
    const analisis = registros.filter(function (registro) { return registro.categoria === 'laboratorio'; });
    [['evidencias-documentos-lista', 'evidencias-documentos-vacios', documentos], ['evidencias-laboratorio-lista', 'evidencias-laboratorio-vacios', analisis]].forEach(function (grupo) {
        grupo[2].forEach(function (registro) { document.getElementById(grupo[0]).appendChild(crearTarjetaEvidencia(registro, contexto.lote.id)); });
        document.getElementById(grupo[1]).hidden = grupo[2].length > 0;
    });
}

function seleccionarEvidencia(id, loteEsperadoId) {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto || ficha.hidden || contexto.lote.id !== loteEsperadoId) return;
    const registro = contexto.evidencias.find(function (evidencia) { return evidencia.id === id; });
    if (!registro || !esEvidenciaConsultable(registro)) return;
    activarPestanaPasaporte('evidencias');
    limpiarDetalleEvidencia();
    evidenciaActivaId = registro.id;
    const estado = estadoEvidencia(registro);
    const respaldo = respaldoDeEvidencia(registro);
    const datos = {
        'evidencia-detalle-titulo': registro.nombre, 'evidencia-producto': contexto.lote.producto, 'evidencia-lote': contexto.lote.id,
        'evidencia-disponibilidad': estado.texto, 'evidencia-id': registro.id, 'evidencia-tipo': registro.tipo,
        'evidencia-entidad': registro.entidad, 'evidencia-fecha': registro.fecha, 'evidencia-vigencia': registro.vigencia,
        'evidencia-fuente': respaldo.fuente, 'evidencia-actualizacion': respaldo.actualizacion,
        'evidencia-analisis-tipo': registro.tipoAnalisis, 'evidencia-analisis-resultado': registro.resultado,
        'evidencia-alcance': registro.alcance, 'evidencia-limitaciones': respaldo.limitaciones
    };
    Object.entries(datos).forEach(function (dato) { mostrarDato(dato[0], dato[1]); });
    document.getElementById('evidencia-disponibilidad').className = 'evidencia-disponibilidad estado-' + estado.clave;
    const nivel = document.getElementById('evidencia-nivel');
    nivel.appendChild(etiquetasEvidencia(registro));
    nivel.setAttribute('data-nivel', respaldo.clave);
    document.getElementById('evidencia-predictiva').hidden = respaldo.clave !== 'predictiva';
    document.getElementById('evidencia-laboratorio').hidden = registro.categoria !== 'laboratorio';
    document.getElementById('evidencia-archivo').textContent = textoAdjunto(registro);
    const detalle = document.getElementById('evidencia-detalle');
    detalle.setAttribute('data-lote-id', contexto.lote.id);
    detalle.setAttribute('data-evidencia-id', registro.id);
    document.getElementById('evidencias-vista-lista').hidden = true;
    detalle.hidden = false;
    detalle.focus();
}

function volverAListaEvidencias() {
    const contexto = obtenerContextoLoteActivo();
    const detalle = document.getElementById('evidencia-detalle');
    if (!contexto || ficha.hidden || detalle.getAttribute('data-lote-id') !== contexto.lote.id) return;
    activarPestanaPasaporte('evidencias');
    const boton = botonesEvidencias.get(evidenciaActivaId);
    limpiarDetalleEvidencia();
    if (boton) boton.focus();
    else document.getElementById('pasaporte-evidencias').focus();
}

// Etapa 4: consulta local de avisos. Las predicciones no forman parte de alertas.
function esAvisoPredictivo(registro) {
    return registro.naturaleza === 'predictiva' || (registro.metadatos && registro.metadatos.nivelEvidencia === 'predictiva');
}

function fechaOrdenAlerta(valor) {
    const partes = typeof valor === 'string' && /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(valor);
    if (!partes) return null;
    const dia = Number(partes[1]), mes = Number(partes[2]), anio = Number(partes[3]);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    return fecha.getUTCFullYear() === anio && fecha.getUTCMonth() === mes - 1 && fecha.getUTCDate() === dia ? fecha.getTime() : null;
}

function buscarAlertasPorCodigo(entrada, registros = datosDemo.alertas) {
    const id = normalizarCodigo(entrada);
    if (!id) return { codigo: '', estado: 'entrada-invalida', coincidencias: [], mensaje: 'Ingresa un código de lote para consultar alertas.' };
    if (!esCodigoLote(id)) return { codigo: id, estado: 'entrada-invalida', coincidencias: [], mensaje: 'Formato incorrecto. Usa O360-DEMO seguido de tres dígitos, por ejemplo O360-DEMO-001.' };
    const coincidencias = registros.filter(function (registro) { return registro.loteId === id && !esAvisoPredictivo(registro); }).slice().sort(function (a, b) {
        const primera = fechaOrdenAlerta(a.fecha), segunda = fechaOrdenAlerta(b.fecha);
        if (primera === null && segunda !== null) return 1;
        if (segunda === null && primera !== null) return -1;
        if (primera !== segunda) return segunda - primera;
        return String(a.id || '').localeCompare(String(b.id || ''));
    });
    return {
        codigo: id, estado: coincidencias.length ? 'coincidencias' : 'sin-coincidencias', coincidencias: coincidencias,
        mensaje: coincidencias.length ? coincidencias.length + (coincidencias.length === 1 ? ' coincidencia de demostración encontrada.' : ' coincidencias de demostración encontradas.') :
            'No se encontraron coincidencias en las fuentes consultadas (dataset académico local). Esto no constituye una garantía de inocuidad.'
    };
}

function fuenteDeAlerta(registro) {
    const meta = registro.metadatos || {};
    // Todo el dataset es simulado. Una categoría oficial de prueba nunca es una alerta auténtica.
    const oficial = meta.nivelEvidencia === 'oficial' && tieneTexto(meta.fuente);
    return {
        clase: oficial ? 'oficial-simulada' : 'demostracion',
        naturaleza: oficial ? 'Oficial (simulada): ejemplo académico, no una alerta auténtica' : 'Fuente de demostración · Simulación académica',
        etiqueta: oficial ? 'Oficial (simulada)' : 'Fuente de demostración',
        fuente: textoDisponible(meta.fuente), actualizacion: textoDisponible(meta.fechaActualizacion), limitaciones: textoDisponible(meta.limitaciones)
    };
}

function mensajeAlertas(texto, error = false) {
    const mensajeAlerta = document.getElementById('alertas-mensaje');
    mensajeAlerta.textContent = texto;
    mensajeAlerta.className = 'form-message' + (error ? ' error' : '');
}

function limpiarDetalleAlerta() {
    alertaActivaId = null;
    const detalle = document.getElementById('alerta-detalle');
    detalle.hidden = true;
    detalle.removeAttribute('data-lote-id');
    detalle.removeAttribute('data-alerta-id');
    ['alerta-detalle-titulo', 'alerta-producto', 'alerta-lote', 'alerta-descripcion', 'alerta-id', 'alerta-fecha',
        'alerta-estado', 'alerta-fuente', 'alerta-naturaleza', 'alerta-actualizacion', 'alerta-alcance', 'alerta-limitaciones'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    document.getElementById('alertas-vista-lista').hidden = false;
}

function limpiarConsultaAlertas(conservarEntrada = false) {
    codigoAlertasConsultado = null;
    botonesAlertas = new Map();
    limpiarDetalleAlerta();
    const entrada = document.getElementById('alertas-codigo');
    if (!conservarEntrada) entrada.value = '';
    entrada.removeAttribute('aria-invalid');
    document.getElementById('alertas-lista').replaceChildren();
    document.getElementById('alertas-resultados').hidden = true;
    document.getElementById('alertas-resultados').removeAttribute('data-codigo-consultado');
    document.getElementById('alertas-sin-coincidencias').hidden = true;
    ['alertas-contexto-consulta', 'alertas-contexto-pasaporte', 'alertas-vacio-codigo', 'alertas-total'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    mensajeAlertas('');
}

function crearTarjetaAlerta(registro) {
    const item = crearElemento('li');
    const tarjeta = crearElemento('article', 'alerta-tarjeta');
    tarjeta.appendChild(crearElemento('p', 'alerta-coincidencia', 'Coincidencia de demostración'));
    tarjeta.appendChild(crearElemento('p', 'consulta-identificador', textoDisponible(registro.loteId) + ' · ' + textoDisponible(registro.id)));
    tarjeta.appendChild(crearElemento('h6', '', textoDisponible(registro.titulo)));
    const fuente = fuenteDeAlerta(registro);
    const etiquetas = crearElemento('div', 'alerta-etiquetas');
    etiquetas.appendChild(crearElemento('span', 'alerta-tipo-fuente fuente-' + fuente.clase, fuente.etiqueta));
    etiquetas.appendChild(crearElemento('span', 'alerta-simulacion', 'Simulación académica'));
    tarjeta.appendChild(etiquetas);
    const metadatos = crearElemento('dl', 'alerta-tarjeta-metadatos');
    [['Fecha', registro.fecha], ['Fuente', fuente.fuente], ['Estado', registro.estado]].forEach(function (dato) {
        const fila = crearElemento('div');
        fila.appendChild(crearElemento('dt', '', dato[0]));
        fila.appendChild(crearElemento('dd', '', textoDisponible(dato[1])));
        metadatos.appendChild(fila);
    });
    tarjeta.appendChild(metadatos);
    if (tieneTexto(registro.id) && obtenerLotePorCodigo(registro.loteId)) {
        const boton = crearElemento('button', 'secondary-btn', 'Consultar detalle');
        boton.type = 'button';
        boton.setAttribute('aria-label', 'Consultar ' + textoDisponible(registro.titulo) + ', lote ' + registro.loteId);
        boton.setAttribute('aria-controls', 'alerta-detalle');
        boton.addEventListener('click', function () { seleccionarAlerta(registro.id, registro.loteId); });
        botonesAlertas.set(registro.id, boton);
        tarjeta.appendChild(boton);
    } else {
        tarjeta.appendChild(crearElemento('p', 'pasaporte-ayuda', 'Detalle no disponible: falta un identificador o un pasaporte de demostración asociado.'));
    }
    item.appendChild(tarjeta);
    return item;
}

function pintarResultadosAlertas(respuesta, enfocar = false) {
    limpiarDetalleAlerta();
    botonesAlertas = new Map();
    const lista = document.getElementById('alertas-lista');
    lista.replaceChildren();
    codigoAlertasConsultado = respuesta.codigo;
    const contexto = obtenerContextoLoteActivo();
    const lote = obtenerLotePorCodigo(respuesta.codigo);
    document.getElementById('alertas-contexto-consulta').textContent = 'Lote consultado: ' + respuesta.codigo + ' · ' + textoDisponible(lote && lote.producto);
    document.getElementById('alertas-contexto-pasaporte').textContent = lote ? 'Resultados asociados al pasaporte de ' + lote.id + '.' :
        'Este código no está registrado entre los lotes de ejemplo. El pasaporte activo sigue siendo ' + (contexto ? contexto.lote.id : 'Información no disponible') + '.';
    document.getElementById('alertas-total').textContent = respuesta.coincidencias.length + (respuesta.coincidencias.length === 1 ? ' coincidencia' : ' coincidencias');
    respuesta.coincidencias.forEach(function (registro) { lista.appendChild(crearTarjetaAlerta(registro)); });
    document.getElementById('alertas-sin-coincidencias').hidden = respuesta.coincidencias.length > 0;
    document.getElementById('alertas-vacio-codigo').textContent = respuesta.codigo;
    document.getElementById('alertas-volver-pasaporte').textContent = 'Volver al pasaporte' + (contexto ? ' ' + contexto.lote.id : '');
    const region = document.getElementById('alertas-resultados');
    region.setAttribute('data-codigo-consultado', respuesta.codigo);
    region.hidden = false;
    document.getElementById('alertas-codigo').removeAttribute('aria-invalid');
    mensajeAlertas(respuesta.mensaje);
    if (enfocar) region.focus();
}

function inicializarAlertas(contexto) {
    limpiarConsultaAlertas();
    document.getElementById('alertas-codigo').value = contexto.lote.id;
    pintarResultadosAlertas(buscarAlertasPorCodigo(contexto.lote.id));
}

function consultarAlertas() {
    const respuesta = buscarAlertasPorCodigo(document.getElementById('alertas-codigo').value);
    if (respuesta.estado === 'entrada-invalida') {
        limpiarConsultaAlertas(true);
        document.getElementById('alertas-codigo').setAttribute('aria-invalid', 'true');
        mensajeAlertas(respuesta.mensaje, true);
        document.getElementById('alertas-codigo').focus();
        return;
    }
    const contexto = obtenerContextoLoteActivo();
    const nuevoLote = obtenerLotePorCodigo(respuesta.codigo);
    if (!contexto || ficha.hidden) return;
    if (nuevoLote && contexto.lote.id !== nuevoLote.id) {
        // Se reutiliza la selección canónica; se descartan todos los detalles del lote anterior.
        codigo.value = nuevoLote.id;
        codigo.removeAttribute('aria-invalid');
        mostrarConfirmacion(nuevoLote.id);
        mostrarLoteActivo();
    }
    activarPestanaPasaporte('alertas');
    document.getElementById('alertas-codigo').value = respuesta.codigo;
    pintarResultadosAlertas(respuesta, true);
}

function seleccionarAlerta(id, loteEsperadoId) {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto || ficha.hidden || contexto.lote.id !== loteEsperadoId || codigoAlertasConsultado !== contexto.lote.id) return;
    const registro = contexto.alertas.find(function (alerta) { return alerta.id === id && !esAvisoPredictivo(alerta); });
    if (!registro) return;
    limpiarDetalleAlerta();
    alertaActivaId = registro.id;
    activarPestanaPasaporte('alertas');
    const fuente = fuenteDeAlerta(registro);
    const datos = {
        'alerta-detalle-titulo': registro.titulo, 'alerta-producto': contexto.lote.producto, 'alerta-lote': contexto.lote.id,
        'alerta-descripcion': registro.descripcion, 'alerta-id': registro.id, 'alerta-fecha': registro.fecha,
        'alerta-estado': registro.estado, 'alerta-fuente': fuente.fuente, 'alerta-naturaleza': fuente.naturaleza,
        'alerta-actualizacion': fuente.actualizacion, 'alerta-alcance': registro.alcance, 'alerta-limitaciones': fuente.limitaciones
    };
    Object.entries(datos).forEach(function (dato) { mostrarDato(dato[0], dato[1]); });
    const detalle = document.getElementById('alerta-detalle');
    detalle.setAttribute('data-lote-id', contexto.lote.id);
    detalle.setAttribute('data-alerta-id', registro.id);
    document.getElementById('alertas-vista-lista').hidden = true;
    detalle.hidden = false;
    detalle.focus();
}

function volverAListaAlertas() {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto || ficha.hidden || document.getElementById('alerta-detalle').getAttribute('data-lote-id') !== contexto.lote.id) return;
    const boton = botonesAlertas.get(alertaActivaId);
    limpiarDetalleAlerta();
    if (boton) boton.focus();
    else document.getElementById('alertas-resultados').focus();
}

// Etapa 6: regla transparente de revisión documental. No es IA ni un modelo sanitario.
const reglaPreventivaDemo = congelarDatos({
    id: 'regla_documental_demo_v1', minimoFactores: 2,
    categorias: {
        revision_prioritaria: { titulo: 'Revisión prioritaria', significado: 'La regla propone revisar primero los adjuntos de los registros documentales de este lote.' },
        revision_programada: { titulo: 'Revisión programada', significado: 'La regla propone programar una revisión del adjunto pendiente en los registros de este lote.' },
        revision_habitual: { titulo: 'Revisión habitual', significado: 'Los factores registrados no señalan adjuntos ausentes. Esto no verifica autenticidad ni acredita inocuidad.' }
    }
});

function evaluarEstimacionPreventiva(loteId) {
    const registros = datosDemo.estimaciones.filter(function (registro) { return registro.loteId === loteId; });
    const registro = registros.length === 1 ? registros[0] : null;
    const factores = [];
    const respuesta = { loteId: loteId, estado: 'sin_datos_suficientes', categoria: null, senales: null, factores: factores,
        registro: registro, motivo: 'No hay un registro único de estimación disponible para este lote.' };
    if (!obtenerLotePorCodigo(loteId) || !registro) return respuesta;
    const ids = new Set(), evidencias = new Set();
    let inconsistentes = !Array.isArray(registro.factores);
    (Array.isArray(registro.factores) ? registro.factores : []).forEach(function (factor) {
        if (!factor || typeof factor !== 'object' || !tieneTexto(factor.id) || !tieneTexto(factor.nombre) ||
            !tieneTexto(factor.descripcion) || !tieneTexto(factor.fuente) || typeof factor.requiereRevision !== 'boolean') { inconsistentes = true; return; }
        const asociados = datosDemo.evidencias.filter(function (evidencia) { return evidencia.loteId === loteId && evidencia.id === factor.evidenciaId; });
        const evidencia = asociados.length === 1 ? asociados[0] : null;
        if (!evidencia || !Object.prototype.hasOwnProperty.call(evidencia, 'archivo') ||
            (evidencia.archivo !== null && typeof evidencia.archivo !== 'string') ||
            factor.requiereRevision !== !tieneTexto(evidencia.archivo) || ids.has(factor.id) || evidencias.has(factor.evidenciaId)) {
            inconsistentes = true; return;
        }
        ids.add(factor.id);
        evidencias.add(factor.evidenciaId);
        factores.push(factor);
    });
    if (inconsistentes) { respuesta.motivo = 'Hay factores incompletos, duplicados o no coherentes con las evidencias de este lote. No se asigna una prioridad.'; return respuesta; }
    if (factores.length < reglaPreventivaDemo.minimoFactores) {
        respuesta.motivo = 'Sin datos suficientes: se requieren al menos dos factores documentales distintos y válidos; hay ' + factores.length + ' disponibles.';
        return respuesta;
    }
    const meta = registro.metadatos || {};
    if (registro.estado !== 'demostracion_disponible' || registro.modelo !== reglaPreventivaDemo.id ||
        meta.simulacion !== true || meta.nivelEvidencia !== 'predictiva' || !tieneTexto(meta.fuente)) {
        respuesta.motivo = 'El estado, la regla o la procedencia del registro no permiten aplicar esta demostración. Estimación no disponible.';
        return respuesta;
    }
    const senales = factores.filter(function (factor) { return factor.requiereRevision; }).length;
    const categoria = senales >= 2 ? 'revision_prioritaria' : senales === 1 ? 'revision_programada' : 'revision_habitual';
    if (tieneTexto(registro.categoria) && registro.categoria !== categoria) {
        respuesta.motivo = 'La categoría registrada no coincide con la regla documental. No se presenta una estimación inconsistente.';
        return respuesta;
    }
    return { loteId: loteId, estado: 'disponible', categoria: categoria, senales: senales, factores: factores, registro: registro, motivo: '' };
}

function obtenerPrioridadPreventiva(lotes = Object.values(datosDemo.lotes)) {
    return lotes.map(function (lote) { return { lote: lote, estimacion: evaluarEstimacionPreventiva(lote.id) }; }).sort(function (a, b) {
        const disponibleA = a.estimacion.estado === 'disponible', disponibleB = b.estimacion.estado === 'disponible';
        if (disponibleA !== disponibleB) return disponibleA ? -1 : 1;
        if (disponibleA && a.estimacion.senales !== b.estimacion.senales) return b.estimacion.senales - a.estimacion.senales;
        return a.lote.id.localeCompare(b.lote.id);
    });
}

function contextoAnalisisVisible() {
    const contexto = obtenerContextoLoteActivo();
    return contexto && !ficha.hidden && pestanaPasaporteActiva === 'analisis' && document.getElementById('pasaporte-analisis').getAttribute('data-lote-id') === contexto.lote.id ? contexto : null;
}

function mensajeAnalisis(texto) { document.getElementById('analisis-mensaje').textContent = texto; }

function limpiarAnalisisPreventivo() {
    estimacionConsultadaId = priorizacionConsultadaId = null;
    document.getElementById('pasaporte-analisis').removeAttribute('data-lote-id');
    ['analisis-resultado', 'analisis-factores', 'analisis-explicacion', 'analisis-prioridades'].forEach(function (id) {
        document.getElementById(id).hidden = true;
        document.getElementById(id).removeAttribute('data-lote-id');
    });
    ['analisis-producto', 'analisis-lote', 'analisis-categoria', 'analisis-significado', 'analisis-recuento', 'analisis-registro', 'analisis-modelo',
        'analisis-fecha', 'analisis-actualizacion', 'analisis-fuente', 'analisis-limitaciones', 'analisis-factores-estado', 'analisis-explicacion-estimacion',
        'analisis-alertas-resumen', 'analisis-alertas-fuente', 'analisis-prioridades-resumen'].forEach(function (id) { document.getElementById(id).textContent = ''; });
    ['analisis-factores-lista', 'analisis-conocido', 'analisis-ausente', 'analisis-prioridad-lista', 'analisis-prioridad-sin-datos'].forEach(function (id) {
        document.getElementById(id).replaceChildren();
    });
    ['analisis-ver-factores', 'analisis-explicar'].forEach(function (id) { document.getElementById(id).setAttribute('aria-expanded', 'false'); });
    document.getElementById('analisis-ver-factores').disabled = true;
    document.getElementById('analisis-solicitar').textContent = 'Solicitar estimación del lote';
    document.getElementById('analisis-resultado').className = 'analisis-resultado';
    ['analisis-sin-prioridad', 'analisis-prioridades-vacias', 'analisis-sin-lotes'].forEach(function (id) { document.getElementById(id).hidden = true; });
    mensajeAnalisis('');
}

function inicializarAnalisisPreventivo(contexto) {
    limpiarAnalisisPreventivo();
    document.getElementById('pasaporte-analisis').setAttribute('data-lote-id', contexto.lote.id);
    mostrarDato('analisis-producto', contexto.lote.producto);
    mostrarDato('analisis-lote', contexto.lote.id);
    const avisos = contexto.alertas.filter(function (alerta) { return !esAvisoPredictivo(alerta); });
    document.getElementById('analisis-alertas-resumen').textContent = avisos.length ? avisos.length + ' coincidencia(s) de demostración. Son avisos académicos, no alertas oficiales auténticas.' :
        'No se encontraron coincidencias en las fuentes consultadas (dataset académico local). Esto no garantiza inocuidad.';
    const fuentes = Array.from(new Set(avisos.map(function (aviso) { return textoDisponible(aviso.metadatos && aviso.metadatos.fuente); })));
    document.getElementById('analisis-alertas-fuente').textContent = fuentes.length ? 'Fuentes de los avisos: ' + fuentes.join('; ') + '.' : 'No hay una fuente de alerta asociada a este lote en el dataset.';
    mensajeAnalisis('Solicita la estimación o una explicación simulada de los datos del lote.');
}

function solicitarEstimacionPreventiva() {
    const contexto = contextoAnalisisVisible();
    if (!contexto) return;
    const resultado = evaluarEstimacionPreventiva(contexto.lote.id);
    estimacionConsultadaId = contexto.lote.id;
    const disponible = resultado.estado === 'disponible';
    document.getElementById('analisis-categoria').textContent = disponible ? reglaPreventivaDemo.categorias[resultado.categoria].titulo : 'Estimación no disponible · Sin datos suficientes';
    document.getElementById('analisis-significado').textContent = disponible ? reglaPreventivaDemo.categorias[resultado.categoria].significado + ' Es una simulación académica de prioridad documental, no un diagnóstico sanitario.' : resultado.motivo;
    document.getElementById('analisis-recuento').textContent = disponible ? resultado.senales + ' señal(es) de revisión entre ' + resultado.factores.length + ' factores registrados. No es una probabilidad de riesgo sanitario.' : 'Sin prioridad predictiva asignada. La revisión humana sigue siendo necesaria.';
    const registro = resultado.registro || {}, meta = registro.metadatos || {};
    [['analisis-registro', registro.id], ['analisis-modelo', registro.modelo], ['analisis-fecha', registro.fecha],
        ['analisis-actualizacion', meta.fechaActualizacion], ['analisis-fuente', meta.fuente], ['analisis-limitaciones', meta.limitaciones]].forEach(function (campo) { mostrarDato(campo[0], campo[1]); });
    const region = document.getElementById('analisis-resultado');
    region.className = 'analisis-resultado' + (disponible ? ' estimacion-disponible' : ' estimacion-insuficiente');
    region.setAttribute('data-lote-id', contexto.lote.id);
    region.hidden = false;
    document.getElementById('analisis-ver-factores').disabled = false;
    document.getElementById('analisis-solicitar').textContent = 'Consultar de nuevo la estimación';
    // Una nueva solicitud descarta explicaciones anteriores y sus factores desplegados.
    ['analisis-factores', 'analisis-explicacion'].forEach(function (id) { document.getElementById(id).hidden = true; });
    ['analisis-ver-factores', 'analisis-explicar'].forEach(function (id) { document.getElementById(id).setAttribute('aria-expanded', 'false'); });
    mensajeAnalisis(disponible ? 'Estimación predictiva de demostración disponible para ' + contexto.lote.id + '.' : 'Estimación no disponible para ' + contexto.lote.id + '. Revisa la limitación indicada.');
    region.focus();
}

function alternarFactoresPreventivos() {
    const contexto = contextoAnalisisVisible();
    if (!contexto || estimacionConsultadaId !== contexto.lote.id) return;
    const region = document.getElementById('analisis-factores');
    const abrir = region.hidden;
    const boton = document.getElementById('analisis-ver-factores');
    boton.setAttribute('aria-expanded', String(abrir));
    region.hidden = !abrir;
    if (!abrir) { boton.focus({ preventScroll: true }); return; }
    const resultado = evaluarEstimacionPreventiva(contexto.lote.id);
    const lista = document.getElementById('analisis-factores-lista');
    lista.replaceChildren();
    resultado.factores.forEach(function (factor) {
        const item = crearElemento('li', 'analisis-factor');
        item.appendChild(crearElemento('h6', '', factor.nombre));
        item.appendChild(crearElemento('p', '', factor.descripcion));
        item.appendChild(crearElemento('p', 'analisis-factor-senal', factor.requiereRevision ? 'Señal documental: adjunto pendiente' : 'Sin señal de adjunto pendiente según el registro'));
        item.appendChild(crearElemento('p', 'analisis-ayuda', 'Referencia: ' + factor.evidenciaId + ' · Fuente: ' + factor.fuente + ' · Simulación académica'));
        lista.appendChild(item);
    });
    document.getElementById('analisis-factores-estado').textContent = resultado.estado === 'disponible' ? resultado.factores.length + ' factores válidos de demostración. Cada adjunto ausente suma una señal de revisión documental.' :
        resultado.motivo + ' Los factores disponibles no bastan para justificar una categoría; no se inventan causas.';
    region.setAttribute('data-lote-id', contexto.lote.id);
    region.focus();
}

function construirExplicacionPreventiva(contexto, resultado) {
    const conocidos = [], ausentes = [];
    [['Código', contexto.lote.id], ['Producto', contexto.lote.producto], ['Procedencia registrada', contexto.lote.origen],
        ['Productor declarado', contexto.productor && contexto.productor.nombre], ['Proveedor registrado', contexto.proveedor && contexto.proveedor.nombre],
        ['Fecha de cosecha registrada', contexto.lote.cosecha], ['Fuente del lote', contexto.lote.metadatos && contexto.lote.metadatos.fuente],
        ['Fecha de actualización del lote', contexto.lote.metadatos && contexto.lote.metadatos.fechaActualizacion]].forEach(function (campo) {
        if (tieneTexto(campo[1])) conocidos.push(campo[0] + ': ' + campo[1]);
        else ausentes.push(campo[0] + ': No disponible');
    });
    conocidos.push(contexto.trazabilidad.length + ' eventos de trazabilidad y ' + contexto.evidencias.length + ' registros de controles/evidencias en el dataset académico. Su cantidad no acredita verificación sanitaria.');
    let estimacion = 'La estimación predictiva todavía no se ha solicitado para este lote. No se añade una categoría a esta explicación.';
    if (resultado) estimacion = resultado.estado === 'disponible' ? 'Estimación predictiva: ' + reglaPreventivaDemo.categorias[resultado.categoria].titulo + '. La regla cuenta ' + resultado.senales + ' señal(es) de adjunto pendiente en ' + resultado.factores.length + ' factores documentales. Sirve únicamente para ordenar una revisión; no determina inocuidad.' :
        'Estimación predictiva no disponible. ' + resultado.motivo + ' No se deduce una categoría ni una causa sanitaria.';
    return { conocidos: conocidos, ausentes: ausentes, estimacion: estimacion };
}

function alternarExplicacionPreventiva() {
    const contexto = contextoAnalisisVisible();
    if (!contexto) return;
    const region = document.getElementById('analisis-explicacion');
    const abrir = region.hidden;
    const boton = document.getElementById('analisis-explicar');
    boton.setAttribute('aria-expanded', String(abrir));
    region.hidden = !abrir;
    if (!abrir) { boton.focus({ preventScroll: true }); return; }
    const texto = construirExplicacionPreventiva(contexto, estimacionConsultadaId === contexto.lote.id ? evaluarEstimacionPreventiva(contexto.lote.id) : null);
    [['analisis-conocido', texto.conocidos], ['analisis-ausente', texto.ausentes.length ? texto.ausentes : ['No se identificaron faltantes en los campos resumidos. Esto no implica que el pasaporte esté completo ni verificado.']]].forEach(function (grupo) {
        const lista = document.getElementById(grupo[0]);
        lista.replaceChildren();
        grupo[1].forEach(function (frase) { lista.appendChild(crearElemento('li', '', frase)); });
    });
    document.getElementById('analisis-explicacion-estimacion').textContent = texto.estimacion;
    region.setAttribute('data-lote-id', contexto.lote.id);
    mensajeAnalisis('Explicación simulada construida con datos locales de ' + contexto.lote.id + '. No interviene una IA conectada.');
    region.focus();
}

function crearTarjetaPrioridadPreventiva(item, posicion, loteOrigenId) {
    const fila = crearElemento('li', 'analisis-lote-card');
    fila.appendChild(crearElemento('p', 'consulta-identificador', item.lote.id + (item.lote.id === loteOrigenId ? ' · Lote activo' : '')));
    fila.appendChild(crearElemento('h6', '', textoDisponible(item.lote.producto)));
    const disponible = item.estimacion.estado === 'disponible';
    fila.appendChild(crearElemento('p', 'analisis-prioridad-categoria', disponible ? posicion + '. ' + reglaPreventivaDemo.categorias[item.estimacion.categoria].titulo : 'Sin datos suficientes · Sin prioridad asignada'));
    fila.appendChild(crearElemento('p', 'analisis-ayuda', disponible ? item.estimacion.senales + ' señal(es) documentales entre ' + item.estimacion.factores.length + ' factores. Estimación predictiva · Simulación académica.' : item.estimacion.motivo + ' No se infiere una prioridad.'));
    const boton = crearElemento('button', 'secondary-btn', 'Abrir pasaporte');
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Abrir pasaporte de ' + textoDisponible(item.lote.producto) + ', lote ' + item.lote.id);
    boton.addEventListener('click', function () { abrirLoteDesdePrioridad(item.lote.id, loteOrigenId); });
    fila.appendChild(boton);
    return fila;
}

function consultarPrioridadPreventiva() {
    const contexto = contextoAnalisisVisible();
    if (!contexto) return;
    const orden = obtenerPrioridadPreventiva();
    priorizacionConsultadaId = contexto.lote.id;
    const disponibles = orden.filter(function (item) { return item.estimacion.estado === 'disponible'; });
    const insuficientes = orden.filter(function (item) { return item.estimacion.estado !== 'disponible'; });
    [['analisis-prioridad-lista', disponibles], ['analisis-prioridad-sin-datos', insuficientes]].forEach(function (grupo) {
        const lista = document.getElementById(grupo[0]);
        lista.replaceChildren();
        grupo[1].forEach(function (item, indice) { lista.appendChild(crearTarjetaPrioridadPreventiva(item, indice + 1, contexto.lote.id)); });
    });
    document.getElementById('analisis-prioridades-resumen').textContent = disponibles.length + ' lote(s) con estimación disponible; ' + insuficientes.length + ' sin datos suficientes. Orden: más señales documentales primero, desempate por código. Sin datos no equivale a menor necesidad de revisión.';
    document.getElementById('analisis-prioridades-vacias').hidden = disponibles.length > 0 || orden.length === 0;
    document.getElementById('analisis-sin-prioridad').hidden = insuficientes.length === 0;
    document.getElementById('analisis-sin-lotes').hidden = orden.length > 0;
    const region = document.getElementById('analisis-prioridades');
    region.setAttribute('data-lote-id', contexto.lote.id);
    region.hidden = false;
    mensajeAnalisis('Prioridad documental de demostración consultada. No es un diagnóstico sanitario.');
    region.focus();
}

function abrirLoteDesdePrioridad(loteId, loteOrigenId) {
    const contexto = contextoAnalisisVisible();
    if (!contexto || contexto.lote.id !== loteOrigenId || priorizacionConsultadaId !== loteOrigenId || !obtenerLotePorCodigo(loteId)) return;
    if (loteId !== contexto.lote.id) {
        codigo.value = loteId;
        codigo.removeAttribute('aria-invalid');
        mostrarConfirmacion(loteId);
        mostrarLoteActivo();
    }
    activarPestanaPasaporte('analisis', { enfocar: true });
    mensajeAnalisis('Pasaporte de ' + loteId + ' seleccionado. Puedes solicitar su estimación o explicación simulada.');
}

document.getElementById('analisis-solicitar').addEventListener('click', solicitarEstimacionPreventiva);
document.getElementById('analisis-ver-factores').addEventListener('click', alternarFactoresPreventivos);
document.getElementById('analisis-explicar').addEventListener('click', alternarExplicacionPreventiva);
document.getElementById('analisis-priorizar').addEventListener('click', consultarPrioridadPreventiva);
document.getElementById('analisis-ver-alertas').addEventListener('click', function () {
    const contexto = contextoAnalisisVisible();
    if (!contexto) return;
    document.getElementById('alertas-codigo').value = contexto.lote.id;
    consultarAlertas();
});

function pintarEstadoPasaporte(contexto, respaldos) {
    const lote = contexto.lote;
    const campos = [lote.producto, lote.origen, lote.cosecha, contexto.productor && contexto.productor.nombre, contexto.proveedor && contexto.proveedor.nombre];
    const presentes = campos.filter(tieneTexto).length;
    mostrarDato('pasaporte-disponibilidad', presentes === campos.length ? 'Información básica disponible' :
        presentes ? 'Información básica parcial' : 'Información básica no disponible');
    document.getElementById('pasaporte-disponibilidad-detalle').textContent = 'Origen, recorrido, documentos, avisos y análisis preventivo de demostración. Las estimaciones usan una regla académica; revisa el alcance de cada fuente.';
    mostrarDato('cobertura-analisis', evaluarEstimacionPreventiva(lote.id).estado === 'disponible' ? 'Demostración disponible bajo solicitud' : 'Sin datos suficientes');
    mostrarDato('cobertura-origen', [lote.origen, contexto.productor && contexto.productor.nombre, contexto.proveedor && contexto.proveedor.nombre].every(tieneTexto) ? 'Datos disponibles' : 'Información parcial o no disponible');
    mostrarDato('cobertura-trazabilidad', contexto.trazabilidad.length ? contexto.trazabilidad.length + ' eventos registrados' : 'Información no disponible');
    const avisos = contexto.alertas.filter(function (registro) { return !esAvisoPredictivo(registro); }).length;
    mostrarDato('cobertura-alertas', avisos ? avisos + (avisos === 1 ? ' coincidencia simulada' : ' coincidencias simuladas') : 'Sin coincidencias en la demo');
    const consultables = contexto.evidencias.filter(esEvidenciaConsultable).length;
    const parciales = contexto.evidencias.filter(function (registro) { return estadoEvidencia(registro).clave === 'parcial'; }).length;
    mostrarDato('cobertura-evidencias', !consultables ? 'Evidencia no disponible' : parciales === consultables ?
        parciales + (parciales === 1 ? ' registro parcial' : ' registros parciales') :
        consultables + (consultables === 1 ? ' registro consultable' : ' registros consultables') + (parciales ? ' · ' + parciales + ' parcial(es)' : ''));
    const niveles = document.getElementById('pasaporte-niveles');
    niveles.replaceChildren();
    const mostrados = new Set();
    respaldos.forEach(function (respaldo) {
        if (!mostrados.has(respaldo.clave)) niveles.appendChild(crearEtiquetaRespaldo(respaldo));
        mostrados.add(respaldo.clave);
    });
}

function mostrarLoteActivo() {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto) return;
    const lote = contexto.lote;
    const respaldos = [
        pintarDato('dato-codigo', 'respaldo-codigo', lote.id, lote, 'id'),
        pintarDato('dato-producto', 'respaldo-producto', lote.producto, lote, 'producto'),
        pintarDato('dato-cosecha', 'respaldo-cosecha', lote.cosecha, lote, 'cosecha'),
        pintarDato('dato-estado', 'respaldo-estado', lote.estado, lote, 'estado'),
        pintarDato('dato-origen', 'respaldo-origen', lote.origen, lote, 'origen', true),
        pintarDato('dato-productor', 'respaldo-productor', contexto.productor && contexto.productor.nombre, contexto.productor, 'nombre'),
        pintarDato('dato-proveedor', 'respaldo-proveedor', contexto.proveedor && contexto.proveedor.nombre, contexto.proveedor, 'nombre')
    ];
    contexto.trazabilidad.forEach(function (evento) {
        ['etapa', 'fecha', 'descripcion'].forEach(function (campo) {
            respaldos.push(describirRespaldo(evento[campo], metadatosDeDato(evento, campo)));
        });
    });
    contexto.evidencias.forEach(function (registro) {
        respaldos.push(respaldoDeEvidencia(registro));
    });
    pintarEstadoPasaporte(contexto, respaldos);
    pintarRecorrido(contexto);
    pintarEvidencias(contexto);
    inicializarAlertas(contexto);
    inicializarAnalisisPreventivo(contexto);
    const productorDisponible = contexto.productor && tieneTexto(contexto.productor.nombre);
    const proveedorDisponible = contexto.proveedor && tieneTexto(contexto.proveedor.nombre);
    mostrarDato('actores-disponibilidad', productorDisponible && proveedorDisponible ? 'Productor y proveedor son roles registrados por separado; no implican verificación oficial.' :
        proveedorDisponible ? 'Solo hay información del proveedor. El productor no está disponible y no se deduce de ese registro.' :
            productorDisponible ? 'Solo hay información del productor. El proveedor no está disponible.' : 'Información no disponible para productor y proveedor.');
    mostrarDato('pasaporte-contexto-producto', lote.producto);
    mostrarDato('pasaporte-contexto-lote', lote.id);

    mostrarDato('resultado-titulo', lote.producto);
    document.getElementById('pasaporte-codigo').textContent = lote.id;
    confirmacion.hidden = true;
    confirmacion.removeAttribute('data-lote-id');
    ficha.setAttribute('data-lote-id', lote.id);
    activarPestanaPasaporte('origen');
    ficha.hidden = false;
    document.getElementById('recepcion-comercial').hidden = true;
    document.getElementById('volver-recepcion').hidden = !recepcionActiva;
    document.getElementById('volver-resumen').textContent = recepcionActiva ? '← Volver a recepción' : '← Volver al resumen del lote';
    actualizarPaso(3);
    actualizarMensaje('Pasaporte de ' + lote.id + ' abierto. Los datos son ficticios y no han sido verificados.', 'ok');
    ficha.focus();
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    limpiarLoteActivo();
    formulario.setAttribute('aria-busy', 'true');
    mostrarResultados(resolverBusqueda(codigo.value, modoConsulta));
    formulario.setAttribute('aria-busy', 'false');
});

codigo.addEventListener('input', function () {
    limpiarLoteActivo();
    codigo.removeAttribute('aria-invalid');
    actualizarMensaje('Búsqueda modificada. Pulsa Buscar lote para continuar.');
});

// También se descarta el contexto si la validación nativa impide enviar el formulario.
codigo.addEventListener('invalid', limpiarLoteActivo);
formulario.addEventListener('reset', function () {
    limpiarLoteActivo();
    codigo.removeAttribute('aria-invalid');
    actualizarMensaje('Escribe un producto o un código para comenzar.');
});

// Accesos directos a dos códigos para probar sin tener que escribirlos.
document.querySelectorAll('.codigo-sugerido').forEach(function (boton) {
    boton.addEventListener('click', function () {
        limpiarLoteActivo();
        codigo.value = boton.getAttribute('data-codigo');
        codigo.focus();
        codigo.removeAttribute('aria-invalid');
        actualizarMensaje('Código de ejemplo cargado. Pulsa Buscar lote para continuar.');
    });
});

function configurarBusqueda(modo) {
    limpiarLoteActivo();
    modoConsulta = modo;
    codigo.value = '';
    codigo.removeAttribute('aria-invalid');
    document.getElementById('consulta-label').textContent = modo === 'codigo' ? 'Código de lote' : 'Producto o código de lote';
    document.getElementById('codigo-ayuda').textContent = modo === 'codigo' ?
        'Formato de demostración: O360-DEMO-001 u O360-DEMO-002. Escribe los tres dígitos finales.' :
        'Prueba con Palta Hass, Café u O360-DEMO-001.';
    codigo.placeholder = modo === 'codigo' ? 'O360-DEMO-001' : 'Escribe un producto o código';
    document.getElementById('buscar-producto').hidden = modo !== 'codigo';
    actualizarMensaje(modo === 'codigo' ? 'Ingresa el código y pulsa Buscar lote. Puedes corregirlo y volver a intentar.' : 'Busca entre los dos lotes de demostración.');
    codigo.focus();
}

document.getElementById('alertas-form').addEventListener('submit', function (evento) { evento.preventDefault(); consultarAlertas(); });
document.getElementById('alertas-codigo').addEventListener('input', function () {
    limpiarConsultaAlertas(true);
    mensajeAlertas('Código modificado. Pulsa Buscar alertas para realizar una nueva consulta.');
});
document.getElementById('alertas-nueva-consulta').addEventListener('click', function () {
    limpiarConsultaAlertas();
    mensajeAlertas('Ingresa otro código de lote para consultar.');
    document.getElementById('alertas-codigo').focus();
});
document.getElementById('alertas-lote-actual').addEventListener('click', function () {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto || ficha.hidden) return;
    document.getElementById('alertas-codigo').value = contexto.lote.id;
    consultarAlertas();
});
document.getElementById('alertas-volver-pasaporte').addEventListener('click', function () {
    if (obtenerContextoLoteActivo() && !ficha.hidden) activarPestanaPasaporte('origen', { enfocar: true, ajustarVista: true });
});
document.getElementById('alertas-volver-listado').addEventListener('click', volverAListaAlertas);
document.getElementById('alertas-volver-listado-arriba').addEventListener('click', volverAListaAlertas);
document.getElementById('buscar-producto').addEventListener('click', function () { configurarBusqueda('general'); });
document.getElementById('ver-pasaporte').addEventListener('click', mostrarLoteActivo);
document.getElementById('volver-evidencias').addEventListener('click', volverAListaEvidencias);
document.getElementById('volver-evidencias-arriba').addEventListener('click', volverAListaEvidencias);
document.getElementById('volver-etapas').addEventListener('click', function () {
    if (!ficha.hidden && eventoActivoIndice !== null && botonesEtapas[eventoActivoIndice]) {
        activarPestanaPasaporte('trazabilidad');
        botonesEtapas[eventoActivoIndice].focus();
    }
});
document.getElementById('otra-consulta').addEventListener('click', function () { configurarBusqueda('general'); });
document.getElementById('corregir-busqueda').addEventListener('click', function () { codigo.focus(); });
document.getElementById('volver-resumen').addEventListener('click', function () {
    if (recepcionActiva) { volverARecepcion(); return; }
    if (!obtenerContextoLoteActivo()) return;
    ficha.hidden = true;
    ficha.removeAttribute('data-lote-id');
    confirmacion.setAttribute('data-lote-id', loteActivoId);
    confirmacion.hidden = false;
    actualizarPaso(2);
    actualizarMensaje('Resumen de ' + loteActivoId + '. Puedes volver a abrir su pasaporte.');
    confirmacion.focus();
});

// Etapa 5: recepción guiada y revisión interna simulada, sin certificación sanitaria.
function mensajeRecepcion(texto, error = false) {
    const region = document.getElementById('recepcion-mensaje');
    region.textContent = texto;
    region.className = 'form-message recepcion-mensaje' + (error ? ' error' : '');
}

function mostrarPasoRecepcion(paso, enfocar = true) {
    const contexto = obtenerContextoLoteActivo();
    if (paso !== 1 && !contexto) paso = 1;
    pasoRecepcion = paso;
    ['recepcion-identificar', 'recepcion-revisar', 'recepcion-registrar'].forEach(function (id, indice) {
        const panel = document.getElementById(id);
        panel.hidden = indice !== paso - 1;
        panel.classList.remove('pasaporte-panel-entrando');
        if (!panel.hidden) panel.classList.add('pasaporte-panel-entrando');
        const indicador = document.getElementById('recepcion-paso-' + (indice + 1));
        if (indice === paso - 1) indicador.setAttribute('aria-current', 'step');
        else indicador.removeAttribute('aria-current');
    });
    if (enfocar) document.getElementById(['recepcion-identificar', 'recepcion-revisar', 'recepcion-registrar'][paso - 1]).focus();
}

function cerrarConfirmacionDescarte() {
    document.getElementById('recepcion-confirmar-descarte').hidden = true;
    document.getElementById('recepcion-descartar-invalido').setAttribute('aria-expanded', 'false');
}

function limpiarVistaRecepcion() {
    document.getElementById('recepcion-comercial').removeAttribute('data-lote-id');
    document.getElementById('recepcion-contexto').hidden = true;
    document.getElementById('volver-recepcion').hidden = true;
    ['recepcion-producto', 'recepcion-lote', 'recepcion-origen', 'recepcion-proveedor', 'recepcion-productor', 'recepcion-cosecha',
        'recepcion-alertas-titulo', 'recepcion-alertas-resumen', 'recepcion-alertas-orientacion', 'recepcion-revision-previa',
        'recepcion-registro-estado', 'recepcion-registro-detalle', 'recepcion-registro-fecha'].forEach(function (id) {
        document.getElementById(id).textContent = '';
    });
    document.getElementById('recepcion-registro-fecha').hidden = true;
    document.getElementById('recepcion-registro-fecha').removeAttribute('datetime');
    document.getElementById('recepcion-codigo').value = '';
    document.getElementById('recepcion-codigo').removeAttribute('aria-invalid');
    document.getElementById('recepcion-recuperacion').hidden = true;
    document.getElementById('recepcion-guardar').disabled = false;
    document.getElementById('recepcion-guardar').textContent = 'Registrar verificación';
    cerrarConfirmacionDescarte();
    retornoRecepcionId = 'recepcion-trazabilidad';
    mensajeRecepcion('');
    mostrarPasoRecepcion(1, false);
    document.getElementById('recepcion-comercial').hidden = !recepcionActiva;
}

function cambiarContextoConsulta(paraRecepcion) {
    cerrarEscaner();
    if (recepcionActiva === paraRecepcion) {
        if (paraRecepcion && !ficha.hidden) volverARecepcion();
        else if (paraRecepcion) mostrarPasoRecepcion(pasoRecepcion);
        else codigo.focus();
        return;
    }
    recepcionActiva = paraRecepcion;
    limpiarLoteActivo();
    codigo.value = '';
    codigo.removeAttribute('aria-invalid');
    document.getElementById('consulta-publica').hidden = paraRecepcion;
    document.getElementById('abrir-recepcion').setAttribute('aria-pressed', String(paraRecepcion));
    document.getElementById('abrir-consulta-publica').setAttribute('aria-pressed', String(!paraRecepcion));
    if (paraRecepcion) {
        mensajeRecepcion('Paso 1 de 3. Identifica el lote recibido mediante código o QR.');
        document.getElementById('recepcion-codigo').focus();
    } else configurarBusqueda('general');
}

function identificarLoteRecepcion() {
    if (!recepcionActiva) return;
    const valor = document.getElementById('recepcion-codigo').value;
    const respuesta = resolverBusqueda(valor, 'codigo');
    limpiarLoteActivo();
    document.getElementById('recepcion-codigo').value = valor;
    if (respuesta.lotes.length !== 1) {
        const invalido = respuesta.estado === 'entrada-invalida' || respuesta.estado === 'formato-invalido';
        document.getElementById('recepcion-codigo').setAttribute('aria-invalid', String(invalido));
        mensajeRecepcion(respuesta.mensaje, true);
        document.getElementById('recepcion-codigo').focus();
        return;
    }
    codigo.value = respuesta.lotes[0].id;
    mostrarConfirmacion(respuesta.lotes[0].id, 'manual');
}

function mostrarRecepcionIdentificada(contexto, origen) {
    const lote = contexto.lote;
    document.getElementById('recepcion-comercial').setAttribute('data-lote-id', lote.id);
    document.getElementById('recepcion-contexto').hidden = false;
    document.getElementById('recepcion-codigo').value = lote.id;
    const datos = {
        'recepcion-producto': lote.producto, 'recepcion-lote': lote.id, 'recepcion-origen': lote.origen,
        'recepcion-proveedor': contexto.proveedor && contexto.proveedor.nombre,
        'recepcion-productor': contexto.productor && contexto.productor.nombre, 'recepcion-cosecha': lote.cosecha
    };
    Object.entries(datos).forEach(function (dato) { mostrarDato(dato[0], tieneTexto(dato[1]) ? dato[1] : 'No disponible'); });
    const respuesta = buscarAlertasPorCodigo(lote.id);
    const hayAlertas = respuesta.coincidencias.length > 0;
    document.getElementById('recepcion-alertas').className = 'recepcion-alertas' + (hayAlertas ? ' con-coincidencias' : '');
    document.getElementById('recepcion-alertas-titulo').textContent = hayAlertas ? 'Atención: coincidencias de demostración' : 'Sin coincidencias en la consulta';
    document.getElementById('recepcion-alertas-resumen').textContent = hayAlertas ?
        respuesta.coincidencias.length + (respuesta.coincidencias.length === 1 ? ' aviso académico asociado a ' : ' avisos académicos asociados a ') + lote.id + '. Son simulaciones, no alertas oficiales auténticas.' : respuesta.mensaje;
    document.getElementById('recepcion-alertas-orientacion').textContent = hayAlertas ?
        'Revisa el lote, la fecha, el alcance y la fuente de cada coincidencia antes de registrar tu revisión. Esta orientación no sustituye instrucciones oficiales.' :
        'Solo se ha consultado el dataset académico local; la ausencia de avisos no certifica la mercadería.';
    pintarRevisionRecepcion();
    mostrarPasoRecepcion(2);
    mensajeRecepcion((origen === 'qr' ? 'Lote reconocido por QR. ' : 'Lote identificado. ') + 'Paso 2 de 3. Revisa la información disponible y sus limitaciones.');
}

function abrirDetalleDesdeRecepcion(clave, activadorId) {
    const contexto = obtenerContextoLoteActivo();
    if (!recepcionActiva || !contexto || document.getElementById('recepcion-comercial').getAttribute('data-lote-id') !== contexto.lote.id) return;
    retornoRecepcionId = activadorId;
    mostrarLoteActivo();
    activarPestanaPasaporte(clave, { enfocar: true });
}

function volverARecepcion() {
    const contexto = obtenerContextoLoteActivo();
    if (!recepcionActiva || !contexto) return;
    ficha.hidden = true;
    ficha.removeAttribute('data-lote-id');
    document.getElementById('volver-recepcion').hidden = true;
    document.getElementById('recepcion-comercial').hidden = false;
    pintarRevisionRecepcion();
    mostrarPasoRecepcion(2, false);
    mensajeRecepcion('De vuelta en la recepción de ' + contexto.lote.id + '. Puedes continuar al registro.');
    document.getElementById(retornoRecepcionId).focus();
}

function esRevisionRecepcionValida(registro, loteId) {
    if (!registro || typeof registro !== 'object' || Array.isArray(registro)) return false;
    const campos = Object.keys(registro).sort();
    if (campos.join(',') !== 'estado,fechaHora,loteId' || registro.loteId !== loteId || registro.estado !== 'revision_interna_simulada') return false;
    if (typeof registro.fechaHora !== 'string') return false;
    const fecha = new Date(registro.fechaHora);
    return Number.isFinite(fecha.getTime()) && fecha.toISOString() === registro.fechaHora;
}

function leerRevisionRecepcion(loteId) {
    if (!obtenerLotePorCodigo(loteId)) return { estado: 'invalido', registro: null };
    try {
        const valor = window.localStorage.getItem(prefijoRevisionRecepcion + loteId);
        if (valor === null) return { estado: 'sin-registro', registro: null };
        if (typeof valor !== 'string' || valor.length > 1000) return { estado: 'invalido', registro: null };
        let registro;
        try { registro = JSON.parse(valor); } catch (error) { return { estado: 'invalido', registro: null }; }
        return esRevisionRecepcionValida(registro, loteId) ? { estado: 'guardado', registro: registro } : { estado: 'invalido', registro: null };
    } catch (error) {
        return { estado: 'error', registro: null };
    }
}

function formatearFechaRecepcion(fechaHora) {
    // La fecha se almacena en UTC y se muestra en la zona horaria del navegador.
    return new Date(fechaHora).toLocaleString('es-PE', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
}

function pintarRevisionRecepcion(lectura) {
    const contexto = obtenerContextoLoteActivo();
    if (!contexto) return;
    lectura = lectura || leerRevisionRecepcion(contexto.lote.id);
    const guardado = lectura.estado === 'guardado';
    const invalido = lectura.estado === 'invalido';
    const error = lectura.estado === 'error';
    const fecha = document.getElementById('recepcion-registro-fecha');
    fecha.hidden = !guardado;
    fecha.textContent = guardado ? formatearFechaRecepcion(lectura.registro.fechaHora) : '';
    if (guardado) fecha.setAttribute('datetime', lectura.registro.fechaHora);
    else fecha.removeAttribute('datetime');
    document.getElementById('recepcion-registro').className = 'recepcion-registro' + (guardado ? ' registrada' : error || invalido ? ' registro-error' : '');
    document.getElementById('recepcion-registro-estado').textContent = guardado ? 'Revisión interna simulada registrada' :
        invalido ? 'Registro local inválido' : error ? 'Almacenamiento local no disponible' : 'Revisión aún no registrada';
    document.getElementById('recepcion-registro-detalle').textContent = guardado ? 'Registro recuperado para ' + contexto.lote.id + ' en este navegador. No es una certificación sanitaria.' :
        invalido ? 'No se puede recuperar una revisión válida. Puedes descartar expresamente el registro inválido para este lote.' :
            error ? 'No pudimos leer el almacenamiento del navegador. Puedes volver a intentar; no se confirma ningún registro guardado.' : 'Al seleccionar Registrar verificación se guardará la constancia interna simulada de este lote.';
    document.getElementById('recepcion-revision-previa').textContent = guardado ? 'Revisión interna simulada previa: ' + formatearFechaRecepcion(lectura.registro.fechaHora) + '. Disponible en este navegador.' :
        invalido ? 'La revisión local no puede recuperarse: contiene datos inválidos. Revisa las opciones en Registrar revisión.' :
            error ? 'No se pudo comprobar si hay una revisión previa: almacenamiento local no disponible.' : 'Este lote aún no tiene una revisión interna registrada en este navegador.';
    const boton = document.getElementById('recepcion-guardar');
    boton.disabled = guardado || invalido || guardandoRecepcion;
    boton.textContent = guardado ? 'Revisión ya registrada' : error ? 'Reintentar registro' : 'Registrar verificación';
    document.getElementById('recepcion-recuperacion').hidden = !invalido;
    cerrarConfirmacionDescarte();
}

function registrarRevisionRecepcion() {
    const contexto = obtenerContextoLoteActivo();
    if (!recepcionActiva || pasoRecepcion !== 3 || !contexto || guardandoRecepcion || !ficha.hidden ||
        document.getElementById('recepcion-comercial').getAttribute('data-lote-id') !== contexto.lote.id) return;
    const anterior = leerRevisionRecepcion(contexto.lote.id);
    if (anterior.estado !== 'sin-registro') {
        pintarRevisionRecepcion(anterior);
        mensajeRecepcion(anterior.estado === 'guardado' ? 'Este lote ya tiene una revisión interna simulada registrada; no se ha duplicado.' : 'No se pudo registrar la revisión. Revisa el estado del almacenamiento local.', anterior.estado !== 'guardado');
        return;
    }
    guardandoRecepcion = true;
    document.getElementById('recepcion-guardar').disabled = true;
    document.getElementById('recepcion-registro').setAttribute('aria-busy', 'true');
    let errorGuardado = false;
    try {
        const registro = { loteId: contexto.lote.id, fechaHora: new Date().toISOString(), estado: 'revision_interna_simulada' };
        window.localStorage.setItem(prefijoRevisionRecepcion + contexto.lote.id, JSON.stringify(registro));
        const comprobacion = leerRevisionRecepcion(contexto.lote.id);
        if (comprobacion.estado !== 'guardado' || comprobacion.registro.fechaHora !== registro.fechaHora) throw new Error('Registro no confirmado');
        mensajeRecepcion('Revisión interna simulada registrada para ' + contexto.lote.id + '. Guardada en este navegador; no constituye certificación sanitaria.');
    } catch (error) {
        errorGuardado = true;
        mensajeRecepcion('No pudimos confirmar que la revisión quedara guardada. Comprueba el almacenamiento del navegador y reintenta.', true);
    } finally {
        guardandoRecepcion = false;
        document.getElementById('recepcion-registro').setAttribute('aria-busy', 'false');
        pintarRevisionRecepcion();
        if (errorGuardado && !document.getElementById('recepcion-guardar').disabled) document.getElementById('recepcion-guardar').textContent = 'Reintentar registro';
        if (!errorGuardado) document.getElementById('recepcion-registro').focus();
    }
}

document.getElementById('abrir-recepcion').addEventListener('click', function () { cambiarContextoConsulta(true); });
document.getElementById('abrir-consulta-publica').addEventListener('click', function () { cambiarContextoConsulta(false); });
document.getElementById('recepcion-form').addEventListener('submit', function (evento) { evento.preventDefault(); identificarLoteRecepcion(); });
document.getElementById('recepcion-codigo').addEventListener('input', function () {
    const entrada = document.getElementById('recepcion-codigo').value;
    limpiarLoteActivo();
    document.getElementById('recepcion-codigo').value = entrada;
    mensajeRecepcion('Código modificado. Pulsa Identificar lote para continuar.');
});
document.getElementById('recepcion-escanear').addEventListener('click', function () { abrirEscaner('recepcion'); });
document.getElementById('recepcion-cambiar-lote').addEventListener('click', function () {
    limpiarLoteActivo();
    mensajeRecepcion('Identifica otro lote. Los registros internos guardados se conservan en este navegador.');
    document.getElementById('recepcion-codigo').focus();
});
document.getElementById('recepcion-trazabilidad').addEventListener('click', function () { abrirDetalleDesdeRecepcion('trazabilidad', 'recepcion-trazabilidad'); });
document.getElementById('recepcion-controles').addEventListener('click', function () { abrirDetalleDesdeRecepcion('evidencias', 'recepcion-controles'); });
document.getElementById('recepcion-ver-alertas').addEventListener('click', function () { abrirDetalleDesdeRecepcion('alertas', 'recepcion-ver-alertas'); });
document.getElementById('volver-recepcion').addEventListener('click', volverARecepcion);
document.getElementById('recepcion-continuar').addEventListener('click', function () {
    if (!recepcionActiva || !obtenerContextoLoteActivo()) return;
    pintarRevisionRecepcion();
    mostrarPasoRecepcion(3);
    mensajeRecepcion('Paso 3 de 3. Registra únicamente que realizaste una revisión interna simulada.');
});
document.getElementById('recepcion-volver-revisar').addEventListener('click', function () {
    if (!recepcionActiva || !obtenerContextoLoteActivo()) return;
    pintarRevisionRecepcion();
    mostrarPasoRecepcion(2);
    mensajeRecepcion('Paso 2 de 3. Revisa los datos y las fuentes del lote recibido.');
});
document.getElementById('recepcion-guardar').addEventListener('click', registrarRevisionRecepcion);
document.getElementById('recepcion-descartar-invalido').addEventListener('click', function () {
    const contexto = obtenerContextoLoteActivo();
    if (!recepcionActiva || pasoRecepcion !== 3 || !contexto || leerRevisionRecepcion(contexto.lote.id).estado !== 'invalido') return;
    document.getElementById('recepcion-confirmar-descarte').hidden = false;
    this.setAttribute('aria-expanded', 'true');
    document.getElementById('recepcion-confirmar-borrado').focus();
});
document.getElementById('recepcion-cancelar-borrado').addEventListener('click', function () {
    cerrarConfirmacionDescarte();
    document.getElementById('recepcion-descartar-invalido').focus();
});
document.getElementById('recepcion-confirmar-borrado').addEventListener('click', function () {
    const contexto = obtenerContextoLoteActivo();
    if (!recepcionActiva || pasoRecepcion !== 3 || !contexto || document.getElementById('recepcion-confirmar-descarte').hidden) return;
    try {
        if (leerRevisionRecepcion(contexto.lote.id).estado === 'invalido') window.localStorage.removeItem(prefijoRevisionRecepcion + contexto.lote.id);
        pintarRevisionRecepcion();
        mensajeRecepcion('Se comprobó el registro local. Solo se descarta si sigue siendo inválido. Puedes revisar su estado antes de continuar.');
    } catch (error) {
        pintarRevisionRecepcion();
        mensajeRecepcion('No se pudo descartar el registro local. Comprueba los permisos de almacenamiento.', true);
    }
    document.getElementById('recepcion-registrar').focus();
});
window.addEventListener('storage', function (evento) {
    const contexto = obtenerContextoLoteActivo();
    if (recepcionActiva && contexto && (evento.key === null || evento.key === prefijoRevisionRecepcion + contexto.lote.id)) {
        pintarRevisionRecepcion();
        mensajeRecepcion('El almacenamiento local cambió en otra pestaña. Se ha actualizado el estado de revisión de este lote.');
    }
});

// Lector nativo: no hay bibliotecas, reconocimiento simulado ni envío de imágenes.
const escaner = document.getElementById('escaner-lote');
const camaraQr = document.getElementById('camara-qr');
const activarCamaraBtn = document.getElementById('activar-camara');
let sesionEscaner = 0;
let flujoCamara = null;
let detectorQr = null;
let siguienteFotograma = null;
let plazoEscaneo = null;
let plazoPermiso = null;

function detenerEscaneo() {
    // Invalida también promesas pendientes: un permiso tardío no reabre la cámara.
    sesionEscaner += 1;
    clearTimeout(siguienteFotograma);
    clearTimeout(plazoEscaneo);
    clearTimeout(plazoPermiso);
    siguienteFotograma = plazoEscaneo = plazoPermiso = null;
    if (flujoCamara) {
        flujoCamara.getTracks().forEach(function (pista) {
            pista.onended = null;
            pista.stop();
        });
    }
    flujoCamara = null;
    detectorQr = null;
    camaraQr.srcObject = null;
    camaraQr.hidden = true;
    document.getElementById('escaner-espera').hidden = false;
    document.getElementById('escaner-visor').setAttribute('aria-busy', 'false');
}

function estadoEscaner(texto, error = false, permitirIntento = true) {
    const estado = document.getElementById('escaner-estado');
    estado.textContent = texto;
    estado.className = 'escaner-estado' + (error ? ' error' : '');
    activarCamaraBtn.disabled = !permitirIntento;
    activarCamaraBtn.textContent = error ? (permitirIntento ? 'Reintentar' : 'Lector no disponible') :
        permitirIntento ? 'Activar cámara' : 'Preparando…';
}

async function crearDetectorQr() {
    if (!window.isSecureContext) throw new Error('Abre la página mediante HTTPS o un origen local seguro para usar la cámara. Puedes ingresar el código manualmente.');
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
        throw new Error('Este navegador no ofrece acceso a cámara. Utiliza Ingresar código.');
    }
    if (typeof window.BarcodeDetector !== 'function' || typeof window.BarcodeDetector.getSupportedFormats !== 'function') {
        throw new Error('Este navegador no permite reconocer QR de forma nativa. Puedes consultar el lote con Ingresar código.');
    }
    let formatos;
    try {
        formatos = await window.BarcodeDetector.getSupportedFormats();
    } catch (error) {
        throw new Error('No pudimos comprobar la compatibilidad del lector nativo. Utiliza Ingresar código.');
    }
    if (!formatos.includes('qr_code')) throw new Error('El lector nativo de este navegador no admite QR. Utiliza Ingresar código.');
    try {
        return new window.BarcodeDetector({ formats: ['qr_code'] });
    } catch (error) {
        throw new Error('El lector QR nativo no pudo iniciarse en este dispositivo. Utiliza Ingresar código.');
    }
}

let destinoEscaner = 'consulta';

async function abrirEscaner(destino = 'consulta') {
    if (escaner.open) return;
    destinoEscaner = destino === 'recepcion' && recepcionActiva ? 'recepcion' : 'consulta';
    document.getElementById('escaner-contexto').textContent = destinoEscaner === 'recepcion' ? 'RECEPCIÓN · IDENTIFICACIÓN POR CÁMARA' : 'IDENTIFICACIÓN POR CÁMARA';
    document.getElementById('escaner-titulo').textContent = destinoEscaner === 'recepcion' ? 'Identifica el lote recibido' : 'Escanea el QR del lote';
    if (typeof escaner.showModal !== 'function') {
        ingresarCodigoDesdeEscaner();
        if (recepcionActiva) mensajeRecepcion('Este navegador no admite la vista de escaneo. Ingresa el código manualmente.', true);
        else actualizarMensaje('Este navegador no admite la vista de escaneo. Ingresa el código manualmente.', 'error');
        return;
    }
    detenerEscaneo();
    escaner.showModal();
    const sesion = sesionEscaner;
    estadoEscaner('Comprobando compatibilidad del navegador…', false, false);
    try {
        await crearDetectorQr();
        if (sesion !== sesionEscaner || !escaner.open) return;
        estadoEscaner('Lector QR nativo disponible. Pulsa Activar cámara y permite su uso. También puedes ingresar el código.');
    } catch (error) {
        if (sesion !== sesionEscaner || !escaner.open) return;
        estadoEscaner(error.message || 'No pudimos comprobar el lector QR. Utiliza Ingresar código.', true, false);
    }
}

function cerrarEscaner() {
    detenerEscaneo();
    if (escaner.open) escaner.close();
}

function errorDeCamara(error) {
    const errores = {
        NotAllowedError: 'No se concedió permiso para usar la cámara. Revisa el permiso del navegador y reintenta, o ingresa el código.',
        SecurityError: 'El navegador bloqueó el acceso a cámara. Usa un contexto seguro o ingresa el código.',
        NotFoundError: 'No encontramos una cámara disponible. Conecta una cámara y reintenta, o ingresa el código.',
        NotReadableError: 'No se puede utilizar la cámara. Puede estar ocupada por otra aplicación. Reintenta o ingresa el código.',
        OverconstrainedError: 'La cámara no admite la configuración solicitada. Reintenta o ingresa el código.',
        AbortError: 'Se interrumpió el acceso a cámara. Reintenta o ingresa el código.'
    };
    return errores[error.name] || 'No pudimos iniciar la cámara o leer el QR. Reintenta o ingresa el código manualmente.';
}

function fallarEscaneo(texto) {
    detenerEscaneo();
    estadoEscaner(texto, true);
}

function procesarQrReconocido(valor) {
    if ((destinoEscaner === 'recepcion') !== recepcionActiva) return;
    // Se aceptan identificadores literales. Nunca se abre una URL recibida por QR.
    if (!esCodigoLote(valor)) {
        fallarEscaneo('El QR fue leído, pero no contiene un código con formato O360-DEMO-001. Reintenta con un QR de demostración o ingresa el código.');
        return;
    }
    const lote = obtenerLotePorCodigo(valor);
    if (!lote) {
        fallarEscaneo('El QR contiene un código válido que no está registrado en esta demostración. Reintenta o ingresa otro código.');
        return;
    }
    cerrarEscaner();
    codigo.value = lote.id;
    codigo.removeAttribute('aria-invalid');
    mostrarConfirmacion(lote.id, 'qr');
}

async function analizarFotograma(sesion) {
    if (sesion !== sesionEscaner || !escaner.open) return;
    try {
        if (camaraQr.readyState >= 2) {
            const codigos = await detectorQr.detect(camaraQr);
            if (sesion !== sesionEscaner || !escaner.open) return;
            if (codigos.length) {
                procesarQrReconocido(codigos[0].rawValue);
                return;
            }
        }
        siguienteFotograma = setTimeout(function () { analizarFotograma(sesion); }, 250);
    } catch (error) {
        if (sesion !== sesionEscaner || !escaner.open) return;
        fallarEscaneo('El lector no pudo analizar la imagen. Mejora la iluminación y reintenta, o ingresa el código.');
    }
}

async function iniciarEscaneo() {
    if (!escaner.open || activarCamaraBtn.disabled) return;
    detenerEscaneo();
    const sesion = sesionEscaner;
    estadoEscaner('Preparando cámara…', false, false);
    document.getElementById('escaner-visor').setAttribute('aria-busy', 'true');
    // Incluye la comprobación de soporte y la espera de permisos para evitar bloqueos.
    plazoPermiso = setTimeout(function () {
        if (sesion === sesionEscaner && escaner.open) {
            fallarEscaneo('No recibimos acceso a cámara a tiempo. Puedes reintentar o ingresar el código.');
        }
    }, 30000);
    try {
        const detector = await crearDetectorQr();
        if (sesion !== sesionEscaner || !escaner.open) return;
        estadoEscaner('Permite el acceso a cámara para continuar. Puedes elegir Ingresar código en cualquier momento.', false, false);
        const flujo = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
        if (sesion !== sesionEscaner || !escaner.open) {
            flujo.getTracks().forEach(function (pista) { pista.stop(); });
            return;
        }
        clearTimeout(plazoPermiso);
        plazoPermiso = null;
        flujoCamara = flujo;
        detectorQr = detector;
        flujo.getVideoTracks().forEach(function (pista) {
            pista.onended = function () {
                if (sesion === sesionEscaner && escaner.open) fallarEscaneo('La cámara se desconectó o su permiso fue revocado. Reintenta o ingresa el código.');
            };
        });
        camaraQr.srcObject = flujo;
        camaraQr.muted = true;
        camaraQr.hidden = false;
        document.getElementById('escaner-espera').hidden = true;
        plazoEscaneo = setTimeout(function () {
            if (sesion === sesionEscaner && escaner.open) {
                fallarEscaneo('No se pudo leer un QR en este intento. Acerca el código, mejora la iluminación y reintenta, o ingresa el código.');
            }
        }, 20000);
        await camaraQr.play();
        if (sesion !== sesionEscaner || !escaner.open) return;
        document.getElementById('escaner-visor').setAttribute('aria-busy', 'false');
        estadoEscaner('Cámara activa. Mantén el QR visible y estable. El intento finaliza en 20 segundos.', false, false);
        activarCamaraBtn.textContent = 'Leyendo QR…';
        analizarFotograma(sesion);
    } catch (error) {
        if (sesion !== sesionEscaner || !escaner.open) return;
        fallarEscaneo(errorDeCamara(error));
    }
}

document.getElementById('abrir-escaner').addEventListener('click', function () { abrirEscaner('consulta'); });
document.getElementById('cerrar-escaner').addEventListener('click', cerrarEscaner);
activarCamaraBtn.addEventListener('click', iniciarEscaneo);
function ingresarCodigoDesdeEscaner() {
    const paraRecepcion = destinoEscaner === 'recepcion' && recepcionActiva;
    cerrarEscaner();
    if (paraRecepcion) {
        mostrarPasoRecepcion(1);
        mensajeRecepcion('Ingresa el código del lote recibido. Puedes corregirlo y reintentar.');
        document.getElementById('recepcion-codigo').focus();
    } else configurarBusqueda('codigo');
}

document.getElementById('ingresar-codigo').addEventListener('click', ingresarCodigoDesdeEscaner);
escaner.addEventListener('cancel', detenerEscaneo);
escaner.addEventListener('close', detenerEscaneo);
camaraQr.addEventListener('error', function () {
    if (escaner.open && flujoCamara) fallarEscaneo('La vista de cámara falló. Reintenta o ingresa el código.');
});
document.addEventListener('visibilitychange', function () {
    if (document.hidden && escaner.open) fallarEscaneo('Escaneo pausado al salir de la página. Reintenta o ingresa el código.');
});
window.addEventListener('pagehide', function () {
    detenerEscaneo();
    if (escaner.open) estadoEscaner('Escaneo detenido al salir de la página. Reintenta o ingresa el código.', true);
});

// 3. Año del pie de página.
document.getElementById('anio').textContent = new Date().getFullYear();

// 4. Reproductores HTML5: estados locales, sin cambiar archivos ni controles nativos.
function mostrarEstadoVideo(video, estado, texto) {
    const contenedor = video.parentElement;
    const aviso = contenedor.parentElement.querySelector('.video-estado');
    contenedor.setAttribute('data-estado-video', estado);
    contenedor.setAttribute('aria-busy', String(estado === 'cargando' || estado === 'esperando'));
    contenedor.classList.toggle('video-listo', estado === 'listo' || estado === 'esperando');
    aviso.className = 'video-estado estado-' + estado;
    aviso.textContent = texto;
}

function informarErrorVideo(video) {
    const codigoError = video.error && video.error.code;
    if (codigoError === 4) {
        mostrarEstadoVideo(video, 'incompatible', 'El navegador no pudo utilizar esta fuente o formato de video. Prueba otro navegador o recarga la página.');
    } else if (codigoError === 3) {
        mostrarEstadoVideo(video, 'error', 'No se pudo decodificar el video. Prueba otro navegador o recarga la página.');
    } else if (codigoError === 1) {
        mostrarEstadoVideo(video, 'error', 'La carga del video se interrumpió. Recarga la página para volver a intentarlo.');
    } else {
        mostrarEstadoVideo(video, 'error', 'No se pudo cargar el video. Revisa la conexión y recarga la página para volver a intentarlo.');
    }
}

const videos = document.querySelectorAll('.video-player');
videos.forEach(function (video) {
    video.addEventListener('loadstart', function () {
        mostrarEstadoVideo(video, 'cargando', 'Cargando información del video…');
    });
    video.addEventListener('loadedmetadata', function () {
        mostrarEstadoVideo(video, 'listo', 'Información del video cargada. Usa los controles para reproducirlo.');
    });
    video.addEventListener('canplay', function () {
        mostrarEstadoVideo(video, 'listo', 'Video disponible. Usa sus controles para reproducirlo.');
    });
    video.addEventListener('waiting', function () {
        mostrarEstadoVideo(video, 'esperando', 'Esperando datos para continuar. Los controles del video permanecen disponibles.');
    });
    video.addEventListener('stalled', function () {
        mostrarEstadoVideo(video, video.readyState >= 1 ? 'esperando' : 'cargando', 'La carga está tardando. Comprueba la conexión; puedes esperar o recargar la página.');
    });
    video.addEventListener('playing', function () { mostrarEstadoVideo(video, 'listo', 'Reproduciendo video.'); });
    video.addEventListener('ended', function () { mostrarEstadoVideo(video, 'listo', 'Video finalizado. Puedes volver a reproducirlo con sus controles.'); });
    video.addEventListener('error', function () { informarErrorVideo(video); });
    const origen = video.querySelector('source');
    if (origen) origen.addEventListener('error', function () { informarErrorVideo(video); });
    const tipo = origen && origen.getAttribute('type');
    if (typeof video.canPlayType !== 'function' || (tipo && video.canPlayType(tipo) === '')) {
        mostrarEstadoVideo(video, 'incompatible', 'Este navegador no indica compatibilidad con el formato del video. Usa otro navegador para intentar reproducirlo.');
        return;
    }
    mostrarEstadoVideo(video, 'cargando', 'Cargando información del video…');
    video.load();
});
