import { test } from './helpers/test-runner.mjs';
import assert from 'node:assert/strict';
import { createDemo, withDataset, findButton } from './helpers/demo-environment.mjs';

const ids = ['O360-DEMO-001', 'O360-DEMO-002'];
const key = id => 'origen360.recepcion.v1.' + id;
const analysis = async (demo, id = ids[0]) => { await demo.openPassport(id); await demo.emit('pestana-analisis'); };

test('F01 — búsqueda por código/producto y errores de entrada', async () => {
    const demo = createDemo();
    for (const [value, state, count] of [[ids[0], 'encontrado', 1], [' o360-demo-002 ', 'encontrado', 1], ['Palta', 'encontrado', 1], ['CAFE', 'encontrado', 1], ['a', 'encontrado', 2], ['', 'entrada-invalida', 0], ['!!!', 'entrada-invalida', 0], ['O360-DEMO-01', 'formato-invalido', 0], ['O360-DEMO-999', 'sin-resultados', 0], ['Tomate', 'sin-resultados', 0]]) {
        const result = demo.api.resolverBusqueda(value, 'general');
        assert.equal(result.estado, state, value); assert.equal(result.lotes.length, count, value);
    }
    demo.elements.get('codigo-lote').value = 'a'; await demo.emit('consulta-form', 'submit');
    assert.equal(demo.elements.get('lista-resultados').children.length, 2);
    assert.equal(demo.writes.length, 0);
});

test('F02 — resumen, pasaporte y regreso corresponden al lote seleccionado', async () => {
    const demo = createDemo();
    for (const id of ids) {
        demo.api.mostrarConfirmacion(id);
        assert.equal(demo.text('resumen-codigo'), id);
        await demo.emit('ver-pasaporte');
        assert.equal(demo.text('pasaporte-contexto-lote'), id);
        assert.equal(demo.text('resultado-titulo'), demo.api.datosDemo.lotes[id].producto);
        assert.equal(demo.elements.get('pasaporte-resultado').getAttribute('data-lote-id'), id);
        await demo.emit('volver-resumen'); assert.equal(demo.focus.id, 'lote-confirmacion');
    }
});

test('F03 — datos ausentes y roles separados sin atribuir verificación', async () => {
    const demo = createDemo({ script: withDataset(data => Object.assign(data.lotes[ids[1]], { origen: null, productorId: null, cosecha: null })) });
    demo.api.mostrarConfirmacion(ids[1]); assert.equal(demo.text('resumen-origen'), 'Información no disponible');
    await demo.emit('ver-pasaporte');
    assert.equal(demo.text('dato-origen'), 'Información no disponible');
    assert.equal(demo.text('dato-productor'), 'Información no disponible');
    assert.match(demo.text('dato-proveedor'), /Proveedor de ejemplo B/);
    assert.match(demo.text('actores-disponibilidad'), /Solo hay información del proveedor/);
    assert.match(demo.text('respaldo-proveedor'), /Declarada/);
    assert.match(demo.text('respaldo-proveedor'), /Simulado/);
});

test('F04 — trazabilidad ordenada, faltantes y retorno del foco', async () => {
    const demo = createDemo({ script: withDataset(data => {
        const events = data.trazabilidad.filter(event => event.loteId === ids[0]);
        data.trazabilidad = data.trazabilidad.filter(event => event.loteId !== ids[0]).concat(events.reverse());
        events.find(event => event.orden === 2).fecha = null;
    }) });
    await demo.openPassport(); await demo.emit('pestana-trazabilidad');
    assert.deepEqual(Array.from(demo.api.obtenerContextoLoteActivo().trazabilidad, event => event.orden), [1, 2, 3, 4]);
    const button = findButton(demo.elements.get('recorrido-lote'), 'Cosecha');
    await demo.emit(button); assert.equal(demo.text('detalle-evento-fecha'), 'Información no disponible');
    assert.equal(demo.elements.get('detalle-etapa').getAttribute('data-lote-id'), ids[0]);
    await demo.emit('volver-etapas'); assert.equal(demo.focus, button);
});

test('F05 — documentos y laboratorio conservan metadatos y contenido literal', async () => {
    const demo = createDemo(); await demo.openPassport(); await demo.emit('pestana-evidencias');
    for (const [list, id] of [['evidencias-documentos-lista', 'DOC-DEMO-001'], ['evidencias-laboratorio-lista', 'LAB-DEMO-001']]) {
        const record = demo.api.datosDemo.evidencias.find(item => item.id === id);
        const button = findButton(demo.elements.get(list), 'Ver detalle'); await demo.emit(button);
        assert.equal(demo.text('evidencia-id'), id); assert.equal(demo.text('evidencia-lote'), ids[0]);
        assert.equal(demo.text('evidencia-fecha'), record.fecha);
        assert.equal(demo.text('evidencia-fuente'), record.metadatos.fuente);
        assert.equal(demo.text('evidencia-alcance'), record.alcance);
        if (record.categoria === 'laboratorio') assert.equal(demo.text('evidencia-analisis-resultado'), record.resultado);
        assert.match(demo.text('evidencia-archivo'), /Sin archivo adjunto/);
        await demo.emit('volver-evidencias'); assert.equal(demo.focus, button);
    }
});

test('F06 — evidencias parciales y ausencia de controles explícitas', async () => {
    const demo = createDemo(); await demo.openPassport(ids[1]); await demo.emit('pestana-evidencias');
    assert.equal(demo.elements.get('evidencias-laboratorio-vacios').hidden, false);
    await demo.emit(findButton(demo.elements.get('evidencias-documentos-lista'), 'Consultar registro parcial'));
    assert.equal(demo.text('evidencia-entidad'), 'Información no disponible');
    const empty = createDemo({ script: withDataset(data => { data.evidencias = []; }) });
    await empty.openPassport(); assert.equal(empty.elements.get('evidencias-vacias').hidden, false);
    assert.match(empty.text('evidencias-vacias'), /Evidencia no disponible/);
});

test('F07 — alertas por código, detalle literal, ausencia y regreso', async () => {
    const demo = createDemo(); await demo.openPassport(); await demo.emit('pestana-alertas');
    assert.equal(demo.elements.get('alertas-lista').children.length, 2);
    const button = findButton(demo.elements.get('alertas-lista'), 'Consultar detalle'); await demo.emit(button);
    const record = demo.api.datosDemo.alertas[0];
    for (const [field, value] of [['alerta-lote', ids[0]], ['alerta-descripcion', record.descripcion], ['alerta-fecha', record.fecha], ['alerta-fuente', record.metadatos.fuente], ['alerta-alcance', record.alcance]]) assert.equal(demo.text(field), value);
    await demo.emit('alertas-volver-listado'); assert.equal(demo.focus, button);
    demo.elements.get('alertas-codigo').value = ids[1]; await demo.emit('alertas-form', 'submit');
    assert.equal(demo.api.state.loteActivoId, ids[1]);
    assert.match(demo.text('alertas-mensaje'), /No se encontraron coincidencias en las fuentes consultadas/);
    assert.match(demo.text('alertas-mensaje'), /no constituye una garantía de inocuidad/);
    await demo.emit('alertas-volver-pasaporte'); assert.equal(demo.api.state.pestanaPasaporteActiva, 'origen');
});

test('F08 — código desconocido y predictivos no se mezclan con alertas', async () => {
    const demo = createDemo({ script: withDataset(data => data.alertas.push({ ...data.alertas[0], id: 'PRED-TEST', loteId: ids[1], naturaleza: 'predictiva' })) });
    await demo.openPassport(ids[1]); await demo.emit('pestana-alertas');
    assert.equal(demo.elements.get('alertas-lista').children.length, 0);
    demo.elements.get('alertas-codigo').value = 'O360-DEMO-999'; await demo.emit('alertas-form', 'submit');
    assert.equal(demo.api.state.loteActivoId, ids[1]); assert.match(demo.text('alertas-contexto-pasaporte'), /sigue siendo O360-DEMO-002/);
    await demo.emit('alertas-nueva-consulta'); assert.equal(demo.focus.id, 'alertas-codigo');
});

test('F09 — recepción guiada, datos faltantes y detalles del mismo pasaporte', async () => {
    const demo = createDemo({ script: withDataset(data => { data.lotes[ids[0]].cosecha = null; }) });
    await demo.identify(); assert.equal(demo.api.state.pasoRecepcion, 2);
    assert.equal(demo.text('recepcion-lote'), ids[0]); assert.equal(demo.text('recepcion-cosecha'), 'No disponible');
    assert.match(demo.text('recepcion-proveedor'), /Proveedor/); assert.match(demo.text('recepcion-productor'), /Productor/);
    for (const word of ['lote', 'fecha', 'alcance', 'fuente']) assert(demo.text('recepcion-alertas-orientacion').includes(word));
    await demo.emit('recepcion-controles'); assert.equal(demo.api.state.pestanaPasaporteActiva, 'evidencias');
    await demo.emit('volver-recepcion'); assert.equal(demo.focus.id, 'recepcion-controles');
    assert.deepEqual(demo.hiddenFocus, []);
});

test('F10 — recepción persiste en almacenamiento simulado y evita duplicados', async () => {
    const storage = new Map(), demo = createDemo({ storage });
    for (const id of ids) {
        await demo.identify(id); await demo.emit('recepcion-continuar'); await demo.emit('recepcion-guardar');
        const saved = storage.get(key(id)); await demo.emit('recepcion-guardar');
        assert.equal(storage.get(key(id)), saved);
        assert.deepEqual(Object.keys(JSON.parse(saved)).sort(), ['estado', 'fechaHora', 'loteId']);
        assert.equal(JSON.parse(saved).estado, 'revision_interna_simulada');
    }
    assert.equal(demo.writes.length, 2);
    const recreated = createDemo({ storage }); await recreated.identify(); await recreated.emit('recepcion-continuar');
    assert.equal(recreated.elements.get('recepcion-guardar').disabled, true);
    assert.match(recreated.text('recepcion-registro-estado'), /Revisión interna simulada registrada/);
    assert.equal(recreated.writes.length, 0); // Nueva instancia, no una recarga real de navegador.
});

test('F11 — bloqueo, cuota y escrituras descartadas no confirman éxito', async () => {
    for (const mode of [{ get: true }, { set: true }, { silent: true }, { missing: true }]) {
        const demo = createDemo({ storageMode: mode }); await demo.identify(); await demo.emit('recepcion-continuar'); await demo.emit('recepcion-guardar');
        assert.equal(demo.storage.size, 0); assert(demo.elements.get('recepcion-mensaje').classList.contains('error'));
        assert.equal(demo.elements.get('recepcion-registro-fecha').hidden, true);
    }
});

test('F12 — registro local inválido se descarta solo con confirmación', async () => {
    const storage = new Map([[key(ids[0]), '{'], ['otra-clave', 'conservar']]);
    const demo = createDemo({ storage }); await demo.identify(); await demo.emit('recepcion-continuar');
    assert.equal(demo.elements.get('recepcion-guardar').disabled, true);
    await demo.emit('recepcion-confirmar-borrado'); assert.equal(demo.removes.length, 0);
    await demo.emit('recepcion-descartar-invalido'); await demo.emit('recepcion-confirmar-borrado');
    assert.deepEqual(demo.removes, [key(ids[0])]); assert.equal(storage.get('otra-clave'), 'conservar');
    await demo.emit('recepcion-guardar'); assert.equal(JSON.parse(storage.get(key(ids[0]))).loteId, ids[0]);
});

test('F13 — controles antiguos no recuperan datos de otro lote', async () => {
    const demo = createDemo(); await demo.openPassport();
    const buttons = [findButton(demo.elements.get('recorrido-lote'), 'Registro'), findButton(demo.elements.get('evidencias-documentos-lista'), 'Ver detalle'), findButton(demo.elements.get('alertas-lista'), 'Consultar detalle')];
    await demo.openPassport(ids[1]); for (const button of buttons) await demo.emit(button);
    for (const id of ['detalle-etapa', 'evidencia-detalle', 'alerta-detalle']) assert.equal(demo.elements.get(id).hidden, true);
    assert.equal(demo.api.state.loteActivoId, ids[1]);
});

test('F14 — estimación disponible e insuficiente requieren solicitud', async () => {
    const demo = createDemo(); await analysis(demo); assert.equal(demo.elements.get('analisis-resultado').hidden, true);
    await demo.emit('analisis-solicitar'); assert.equal(demo.text('analisis-categoria'), 'Revisión prioritaria');
    assert.match(demo.text('analisis-significado'), /simulación académica/);
    await analysis(demo, ids[1]); await demo.emit('analisis-solicitar');
    assert.match(demo.text('analisis-categoria'), /no disponible.*Sin datos suficientes/);
    assert.equal(demo.api.evaluarEstimacionPreventiva(ids[1]).categoria, null);
});

test('F15 — factores y explicación separan datos conocidos y ausentes', async () => {
    const demo = createDemo(); await analysis(demo); await demo.emit('analisis-solicitar'); await demo.emit('analisis-ver-factores');
    assert.equal(demo.elements.get('analisis-factores-lista').children.length, 2);
    assert.match(demo.text('analisis-factores-lista'), /DOC-DEMO-001/);
    await demo.emit('analisis-explicar');
    assert.match(demo.text('analisis-conocido'), /Palta Hass/);
    assert.match(demo.text('analisis-ausente'), /Fecha de actualización del lote: No disponible/);
    assert.match(demo.text('analisis-explicacion-estimacion'), /Estimación predictiva/);
    assert.match(demo.text('analisis-explicacion'), /No lo genera una IA conectada/);
    await analysis(demo, ids[1]); await demo.emit('analisis-solicitar'); await demo.emit('analisis-ver-factores');
    assert.equal(demo.elements.get('analisis-factores-lista').children.length, 0);
    assert.match(demo.text('analisis-factores-estado'), /no se inventan causas/);
});

test('F16 — prioridad, grupo insuficiente y cambio de pasaporte coherentes', async () => {
    const demo = createDemo(); await analysis(demo); await demo.emit('analisis-priorizar');
    assert.deepEqual(Array.from(demo.api.obtenerPrioridadPreventiva(), item => item.lote.id), ids);
    assert.equal(demo.elements.get('analisis-prioridad-lista').children.length, 1);
    assert.equal(demo.elements.get('analisis-prioridad-sin-datos').children.length, 1);
    const old = findButton(demo.elements.get('analisis-prioridad-lista'), 'Abrir pasaporte');
    await demo.emit(findButton(demo.elements.get('analisis-prioridad-sin-datos'), 'Abrir pasaporte'));
    assert.equal(demo.api.state.loteActivoId, ids[1]); assert.equal(demo.text('analisis-lote'), ids[1]);
    assert.equal(demo.elements.get('analisis-prioridades').hidden, true);
    await demo.emit(old); assert.equal(demo.api.state.loteActivoId, ids[1]);
});

test('F17 — regla ordena varios estimables y desempata por código', async () => {
    const demo = createDemo({ script: withDataset(data => {
        const extra = { ...data.evidencias[0], id: 'DOC-TEST', loteId: ids[1], archivo: 'referencia-simulada' };
        data.evidencias.push(extra); data.evidencias.find(item => item.id === 'DOC-DEMO-002').archivo = 'referencia-simulada';
        const estimate = data.estimaciones[1];
        Object.assign(estimate, { estado: 'demostracion_disponible', categoria: 'revision_habitual', modelo: 'regla_documental_demo_v1', factores: ['DOC-DEMO-002', 'DOC-TEST'].map((id, index) => ({ id: 'F-TEST-' + index, nombre: 'Factor simulado', descripcion: 'Referencia de archivo registrada', evidenciaId: id, requiereRevision: false, fuente: 'Fuente académica simulada' })) });
    }) });
    const order = demo.api.obtenerPrioridadPreventiva();
    assert.equal(order[0].lote.id, ids[0]); assert.equal(order[0].estimacion.senales, 2); assert.equal(order[1].estimacion.senales, 0);
    const tied = createDemo({ script: withDataset(data => {
        data.evidencias.push({ ...data.evidencias[0], id: 'DOC-TEST', loteId: ids[1] });
        Object.assign(data.estimaciones[1], { ...data.estimaciones[0], id: 'EST-DEMO-002', loteId: ids[1], factores: data.estimaciones[0].factores.map((factor, index) => ({ ...factor, id: 'F-TEST-' + index, evidenciaId: index ? 'DOC-TEST' : 'DOC-DEMO-002' })) });
    }) });
    assert.deepEqual(Array.from(tied.api.obtenerPrioridadPreventiva(), item => item.lote.id), ids);
});

test('F18 — cinco pestañas conservan panel único y navegación de teclado', async () => {
    const demo = createDemo(); await demo.openPassport(); const tabs = ['origen', 'trazabilidad', 'evidencias', 'alertas', 'analisis'];
    for (const tab of tabs) {
        await demo.emit('pestana-' + tab);
        for (const current of tabs) {
            assert.equal(demo.elements.get('pasaporte-' + current).hidden, current !== tab);
            assert.equal(demo.elements.get('pestana-' + current).getAttribute('aria-selected'), String(current === tab));
        }
    }
    await demo.emit('pestana-analisis', 'keydown', { key: 'ArrowRight' }); assert.equal(demo.focus.id, 'pestana-origen');
    await demo.emit('pestana-origen', 'keydown', { key: 'End' }); assert.equal(demo.focus.id, 'pestana-analisis');
    assert.equal((await demo.emit('pestana-analisis', 'keydown', { key: 'Tab' })).defaultPrevented, undefined);
    assert.deepEqual(demo.hiddenFocus, []);
});

test('F19 — QR público con detector simulado confirma el mismo lote', async () => {
    const demo = createDemo({ camera: { detected: ids[1] } });
    await demo.emit('abrir-escaner'); await demo.emit('activar-camara'); await demo.flush();
    assert.equal(demo.text('resumen-codigo'), ids[1]); await demo.emit('ver-pasaporte');
    assert.equal(demo.text('pasaporte-contexto-lote'), ids[1]); assert.equal(demo.streams[0].getTracks()[0].stopped, true);
});

test('F20 — QR de recepción y permisos denegados conservan contexto', async () => {
    const demo = createDemo({ camera: { detected: ids[0] } });
    await demo.emit('abrir-recepcion'); await demo.emit('recepcion-escanear'); await demo.emit('activar-camara'); await demo.flush();
    assert.equal(demo.api.state.recepcionActiva, true); assert.equal(demo.text('recepcion-lote'), ids[0]);
    const denied = createDemo({ camera: { error: 'NotAllowedError' } });
    await denied.emit('abrir-recepcion'); await denied.emit('recepcion-escanear'); await denied.emit('activar-camara');
    assert.match(denied.text('escaner-estado'), /permiso/); await denied.emit('ingresar-codigo');
    assert.equal(denied.focus.id, 'recepcion-codigo'); await denied.identify(ids[1]); assert.equal(denied.api.state.loteActivoId, ids[1]);
});

test('F21 — lector incompatible o tiempo agotado ofrece ingreso manual', async () => {
    const unsupported = createDemo({ camera: { detector: false } }); await unsupported.emit('abrir-escaner');
    assert.equal(unsupported.elements.get('activar-camara').disabled, true); await unsupported.emit('ingresar-codigo'); assert.equal(unsupported.focus.id, 'codigo-lote');
    const demo = createDemo(); await demo.emit('abrir-escaner'); await demo.emit('activar-camara'); await demo.fireTimer(20000);
    assert.match(demo.text('escaner-estado'), /No se pudo leer/); assert.equal(demo.streams[0].getTracks()[0].stopped, true);
});

test('F22 — actualización de estimación diferenciada, ausente y limpiada al cambiar lote', async () => {
    const demo = createDemo({ script: withDataset(data => { data.estimaciones[0].fecha = '01/11/2026'; data.estimaciones[0].metadatos.fechaActualizacion = '06/11/2026'; }) });
    await analysis(demo); await demo.emit('analisis-solicitar');
    assert.equal(demo.text('analisis-fecha'), '01/11/2026'); assert.equal(demo.text('analisis-actualizacion'), '06/11/2026');
    await demo.openPassport(ids[1]); assert.equal(demo.text('analisis-actualizacion'), '');
    await demo.emit('pestana-analisis'); await demo.emit('analisis-solicitar');
    assert.equal(demo.text('analisis-actualizacion'), 'Información no disponible');
});

test('F23 — videos distinguen carga, espera, disponibilidad y error de fuente', async () => {
    const demo = createDemo();
    for (const video of demo.context.document.querySelectorAll('.video-player')) {
        const media = video.parentElement, status = media.parentElement.querySelector('.video-estado');
        assert.equal(video.loadCount, 1); assert.equal(media.getAttribute('data-estado-video'), 'cargando');
        assert.equal(status.getAttribute('role'), 'status'); assert.notEqual(video.getAttribute('controls'), null);
        await demo.emit(video, 'loadedmetadata'); assert.equal(media.classList.contains('video-listo'), true);
        await demo.emit(video, 'waiting'); assert.equal(media.getAttribute('aria-busy'), 'true'); assert.equal(media.classList.contains('video-listo'), true);
        await demo.emit(video, 'canplay'); assert.equal(media.getAttribute('aria-busy'), 'false');
        await demo.emit(video.querySelector('source'), 'error'); assert.equal(media.getAttribute('data-estado-video'), 'error');
        assert.match(status.textContent, /No se pudo cargar/); assert(!status.textContent.includes('Próximamente'));
        await demo.emit(video, 'loadstart'); assert.equal(media.getAttribute('data-estado-video'), 'cargando');
        await demo.emit(video, 'canplay'); assert.equal(media.classList.contains('video-listo'), true);
    }
});

test('F24 — formato no soportado y errores nativos de video tienen mensajes diferenciados', async () => {
    const unsupported = createDemo({ media: { compatibility: '' } });
    for (const video of unsupported.context.document.querySelectorAll('.video-player')) {
        assert.equal(video.loadCount, 0); assert.equal(video.parentElement.getAttribute('data-estado-video'), 'incompatible');
        assert.match(video.parentElement.parentElement.querySelector('.video-estado').textContent, /no indica compatibilidad/);
    }
    const demo = createDemo(), video = demo.context.document.querySelectorAll('.video-player')[0];
    for (const [code, text, state] of [[1, /interrumpió/, 'error'], [2, /conexión/, 'error'], [3, /decodificar/, 'error'], [4, /fuente o formato/, 'incompatible']]) {
        video.error = { code }; await demo.emit(video, 'error');
        assert.equal(video.parentElement.getAttribute('data-estado-video'), state);
        assert.match(video.parentElement.parentElement.querySelector('.video-estado').textContent, text);
    }
});

test('F25 — menú y Escape mantienen su funcionamiento', async () => {
    const demo = createDemo(); await demo.emit('menu-btn'); assert.equal(demo.elements.get('menu-btn').getAttribute('aria-expanded'), 'true');
    await demo.documentEvent('keydown', { key: 'Escape' }); assert.equal(demo.elements.get('menu-btn').getAttribute('aria-expanded'), 'false');
    assert.equal(demo.focus.id, 'menu-btn');
});

test('F26 — niveles y categoría oficial de prueba permanecen simulados', async () => {
    for (const level of ['declarada', 'verificada', 'oficial', 'predictiva']) {
        const demo = createDemo({ script: withDataset(data => { data.lotes[ids[0]].metadatos.nivelEvidencia = level; data.alertas[0].metadatos.nivelEvidencia = 'oficial'; }) });
        await demo.openPassport(); assert.equal(demo.elements.get('respaldo-origen').getAttribute('data-nivel'), level);
        assert.match(demo.text('respaldo-origen'), /Simulado/);
        await demo.emit('abrir-leyenda-pasaporte'); assert.equal(demo.elements.get('leyenda-evidencia').open, true);
        await demo.emit('pestana-alertas'); assert.match(demo.text('alertas-lista'), /Oficial \(simulada\)/);
        if (level === 'predictiva') assert.match(demo.text('respaldo-origen'), /No es una certificación ni una alerta oficial/);
    }
});

test('F27 — alertas ordenadas por fecha y entrada inválida diferenciada', async () => {
    const demo = createDemo({ script: withDataset(data => data.alertas.reverse()) });
    await demo.openPassport(); await demo.emit('pestana-alertas');
    assert(demo.elements.get('alertas-lista').children[0].textContent.includes('AL-DEMO-001'));
    assert(demo.elements.get('alertas-lista').children[1].textContent.includes('AL-DEMO-002'));
    demo.elements.get('alertas-codigo').value = '!!!'; await demo.emit('alertas-form', 'submit');
    assert.equal(demo.elements.get('alertas-codigo').getAttribute('aria-invalid'), 'true');
    assert.equal(demo.elements.get('alertas-resultados').hidden, true);
});
