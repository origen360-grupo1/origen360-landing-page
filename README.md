# Origen360 Perú

**Curso:** IHC y Tecnologías Móviles (SI385)  
**NRC:** 16734  
**Grupo:** 1

## Descripción del proyecto

Origen360 Perú es una propuesta de solución digital para consultar la trazabilidad de productos agrícolas por lote. Busca presentar de forma clara información de procedencia, productor, fechas y recorrido, mediante un pasaporte digital que facilite la consulta de datos documentados de la cadena de abastecimiento.

## Integrantes del equipo

- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Yopla Romero, Jonathan Alberto
- Castillo Bengoa, Sebastián Alejandro

## Segmentos objetivo

- **Consumidores:** personas que desean conocer la procedencia y el recorrido de los productos agrícolas antes de adquirirlos.
- **Comerciantes y responsables de abastecimiento:** personas que necesitan consultar información de origen y seguimiento de los lotes durante la recepción o comercialización de productos.

## Características principales

- Búsqueda local por código o nombre de producto, confirmación y resumen del lote.
- Lector QR nativo condicionado a la compatibilidad del navegador, con ingreso manual alternativo.
- Pasaporte digital con disponibilidad, origen, productor/proveedor diferenciados y respaldo por dato.
- Recorrido interactivo por etapas, con detalle, fuentes y estados de información faltante.
- Consulta de controles, registros documentales y análisis académicos por lote, con detalle de metadatos y limitaciones.
- Consulta de alertas simuladas por código, con coincidencias, fuentes, detalle y ausencia de resultados sin garantías sanitarias.
- Recepción de mercadería guiada: identificación, revisión del mismo pasaporte y registro interno simulado con almacenamiento local por lote.
- Análisis preventivo de demostración: estimación documental, factores, explicación local y prioridad de revisión, sin IA/ML conectado.
- Secciones informativas sobre beneficios, funcionamiento y público objetivo.
- Landing Page responsive desarrollada con HTML, CSS y JavaScript, sin frameworks CSS.

**Estado actual:** avance de implementación de la Landing Page. La consulta interactiva usa únicamente datos ficticios locales para demostrar el funcionamiento visual; no existe conexión a una base de datos ni verificación real de lotes.

## Preparación técnica de GitHub Pages — sin publicar

Se prepara [un workflow manual](.github/workflows/pages.yml) que valida y, solo cuando se solicita expresamente, publica **únicamente `public/`**. La entrada `publish` está desactivada por defecto; hacer push no inicia un despliegue. No se han creado commits, hecho push ni modificado ajustes remotos.

La [guía de preparación y pasos en GitHub](docs/github-pages.md) documenta la auditoría de Git, los archivos aún sin rastrear, las rutas bajo subdirectorio y las limitaciones. En especial, los tres MP4 todavía deben incorporarse a Git en un futuro commit autorizado.

Comprobaciones, desde la raíz y con Node disponible:

```text
node tests/run.mjs
node scripts/check-pages.mjs
```

Pasaron 35/35 pruebas mediante el entorno Node disponible y el preflight comprobó 11 archivos publicables, 60 referencias bajo dos subdirectorios y cero recursos externos. El comando `node` no estaba en PATH de PowerShell. GitHub Actions y la URL final aún no se han ejecutado/validado.

No se cambia la landing ni se añaden dependencias a la aplicación. Las pruebas y documentación permanecen fuera del artefacto de Pages; un repositorio público sigue mostrando sus archivos desde GitHub Code. La etapa 7C continúa pendiente de autorización.

## Correcciones y base de aceptación — etapa 7B (registro de su cierre)

Alcance exclusivo: correcciones técnicas y de usabilidad de la auditoría 7A, pruebas reproducibles y matriz de aceptación. No se implementan historias adicionales ni se modifican requisitos, identificadores, dataset, imágenes o videos.

### Correcciones

- **QR comercial:** entre 481 y 960 px utiliza dos columnas propias: encabezado/descripción a la izquierda y botón a la derecha. No hereda la columna de 40 px reservada al icono del acceso general. A 480 px o menos se conserva la presentación en bloque. El lector y la lógica de identificación no cambian.
- **Foco en recepción:** paneles y resultado del registro usan el verde oscuro del token `--color-focus`, con contorno de 3 px. Se comprueba contraste frente a blanco, crema y verde suave de superficie; su visibilidad real con teclado sigue pendiente.
- **Estimaciones:** se muestran por separado Fecha de registro y Última actualización de la estimación. La actualización procede exclusivamente de `metadatos.fechaActualizacion`; si falta, dice «Información no disponible». Se limpia al cambiar de lote.
- **Videos:** el estado está siempre visible junto a la descripción y usa `role="status"`. Distingue carga, información disponible, espera, error de carga/decodificación y formato o fuente no utilizable. `canPlayType` permite informar una incompatibilidad declarada, pero no garantiza reproducción. «Próximamente» se sustituye por una vista previa ilustrativa y mensajes de estado. Se conservan las fuentes, los posters y los controles nativos.

### Ejecutar las pruebas

Requisito exclusivo para pruebas: **Node.js 20 o posterior**, disponible en la terminal. La landing continúa funcionando con HTML/CSS/JavaScript sin Node, build, backend o paquetes externos.

Desde la raíz del proyecto:

```text
node tests/run.mjs
```

No se necesita `npm install`. El ejecutor es un bucle secuencial de JavaScript con aserciones de módulos nativos, sin framework. Imprime `OK` o `FAIL` y un resumen; si alguna comprobación falla, lanza un error y la ejecución por terminal termina con error. Es necesario ejecutar el punto de entrada completo, no cada archivo `.test.mjs` por separado.

Archivos de la suite:

- `tests/run.mjs`: punto de entrada y resultado global.
- `tests/functional.test.mjs`: 27 casos F01–F27 de consulta, identidad, evidencias, alertas, recepción, almacenamiento, análisis, pestañas, QR y videos.
- `tests/technical.test.mjs`: 8 controles T01–T08 de estructura, referencias, dataset, CSS del QR, contraste, recursos, requisitos y matriz.
- `tests/helpers/demo-environment.mjs`: carga los archivos reales del sitio en un contexto aislado con DOM y APIs controlados.
- `tests/helpers/test-runner.mjs`: registro y ejecución secuencial de los casos.

Las pruebas leen el proyecto y usan fixtures/almacenamiento en memoria; no escriben revisiones en el navegador, no solicitan cámara y no modifican datos o recursos del sitio. Los hashes protegen el dataset y los recursos aprobados; una modificación futura autorizada de esos elementos requerirá revisar conscientemente sus referencias de prueba. Los metadatos internos de Git no forman parte de la comparación.

### Resultado y alcance

Se ejecutó el mismo punto de entrada `tests/run.mjs` mediante el entorno Node disponible en esta sesión: **35/35 satisfactorias**, sin casos omitidos. No había un comando `node` accesible en PATH para probar su invocación desde PowerShell. No se instaló ningún runtime ni dependencia. La ejecución por terminal queda por comprobar en un equipo con Node disponible.

Son **27 pruebas funcionales con DOM/API simulados** y **8 controles técnicos**. Comprueban, entre otros, cambio de lote y bloqueo de controles antiguos, persistencia entre nuevas instancias del programa con un Map compartido, errores de almacenamiento, fechas distintas o ausentes, estados de los tres videos y conservación de las 50 historias y los nueve recursos originales.

El parser de pruebas es limitado y no constituye un navegador. No mide geometría, CSS calculado, audio, decodificación, permisos reales, recorrido nativo de Tab, lectura asistida ni durabilidad real de `localStorage`. T04 verifica estáticamente el alcance de las reglas QR en 481, 768 y 960 px; no certifica su renderizado.

### Matriz y comprobaciones pendientes

La [matriz de aceptación](docs/matriz-aceptacion.md) contiene **100 filas con criterios literales**: 90 de las 30 historias funcionales y 10 de US46–US50. Cada fila incluye escenario, resultado esperado, estado, cobertura automática y comprobación pendiente. La cobertura se identifica como parcial cuando corresponde. Todas las aceptaciones manuales permanecen pendientes.

El conector de navegador volvió a informar que su host no estaba disponible. Falta comprobar en navegador real:

1. QR comercial a **481, 768 y 960 px**, además de 320, 375, 480 y 1280 px, zoom y orientación horizontal; verificar título, texto y botón sin superposición ni desbordamiento.
2. Foco de teclado en cada paso de recepción y en el resultado de guardado, retorno desde detalles y lectura de mensajes mediante lector de pantalla.
3. Fecha de registro y actualización de Palta, ausencia de actualización en Café y limpieza al alternar lotes.
4. Carga, controles, espera y reproducción de los tres videos; errores de conexión y compatibilidad, audio y eventual necesidad de subtítulos. Las pruebas de eventos no validan los archivos con un decodificador real.
5. QR físico de US01/US02/US32, permisos, errores, alternativa manual y apagado de cámara.
6. Registro US35, recarga real en el mismo origen y recuperación independiente de ambos lotes; almacenamiento bloqueado y modos privados cuando corresponda.
7. Los escenarios completos de las 30 historias, responsive y prototipos móviles correspondientes a US49.

La incorporación efectiva de Inter, fotografías de producto, PDF académicos y optimización de videos continúan como decisiones separadas. No se añaden esos recursos en 7B. No se crean commits ni se publica. La etapa 7C requiere autorización posterior.

## Análisis preventivo — etapa 6 (registro de su cierre)

Alcance exclusivo: **US40, US41, US42, US43 y US45**. Se incorpora una quinta pestaña al mismo pasaporte, conservando un único panel activo, contexto del lote, teclado, foco, transición de 180 ms y movimiento reducido. No se implementan las quince historias de ampliación, patrones históricos agregados ni la etapa 7. No se añaden frameworks, backend, APIs, imágenes, videos o fuentes.

### Acciones disponibles

- **Solicitar estimación del lote:** muestra «Estimación predictiva» y «Simulación académica», una categoría documental explicada o «Estimación no disponible · Sin datos suficientes». El resultado no aparece al abrir la pestaña sin solicitarlo.
- **¿Por qué esta estimación?:** responde a «¿Por qué veo este resultado?» mediante factores del registro, con descripción literal, referencia documental y fuente. Si son insuficientes o incoherentes, se explica la limitación sin inventar causas. La acción se habilita después de consultar la estimación, incluso si esta no está disponible.
- **Solicitar explicación simulada:** construye texto en el navegador, separando información conocida, datos ausentes y estimación. Reconoce los faltantes de origen, actores, fechas o fuente sin completarlos. Si la estimación no se ha solicitado, lo indica y no añade una categoría. Se identifica como explicación simulada, no generada por una IA conectada.
- **Consultar prioridad de lotes:** muestra los lotes estimables ordenados y un grupo separado sin prioridad asignada para los insuficientes. Cada tarjeta abre el mismo pasaporte del lote elegido en Análisis preventivo. Los resultados anteriores se limpian al cambiar de lote; los controles antiguos no pueden recuperar un contexto ajeno.
- **Consultar alertas del mismo lote:** reutiliza la sección de la etapa 4. Sus avisos académicos, fuente y detalle permanecen separados de la estimación. La interfaz muestra «Una estimación no constituye una alerta sanitaria oficial» y «No es una alerta oficial».

Los factores y explicaciones son desplegables con estado accesible y gestión del foco. Cambiar de pestaña conserva la consulta dentro del mismo lote. Cambiar de lote, editar o reiniciar la consulta elimina el análisis anterior. El acceso desde recepción mantiene su contexto comercial y sus registros locales.

### Dataset y regla demostrativa

Solo se amplía **EST-DEMO-001**, conservando su ID y su relación con **O360-DEMO-001**. Se añaden dos factores: ausencia de archivo adjunto en **DOC-DEMO-001** y **LAB-DEMO-001**, coherentes con sus metadatos existentes. Ambos conservan la fuente académica del registro asociado. La regla y sus metadatos se identifican como simulados, con fecha de ejemplo 06/11/2026.

**EST-DEMO-002** permanece intacto y sin factores suficientes para **O360-DEMO-002**. Productores, proveedores, lotes, trazabilidad, evidencias y alertas no cambian. Las revisiones locales de recepción no intervienen en la prioridad.

La regla `regla_documental_demo_v1` sirve exclusivamente para demostrar revisión documental:

1. Requiere al menos **dos factores distintos y válidos**. Cada uno debe tener nombre, descripción, fuente, una evidencia del mismo lote y una señal coherente con la referencia de archivo. No se cuenta dos veces la misma evidencia.
2. Un adjunto nulo o vacío representa una señal de revisión. Una referencia no vacía representa ausencia de esa señal según el registro; **no prueba que un archivo exista, pueda abrirse o sea auténtico**. El módulo no abre ni genera documentos.
3. Dos o más señales: **Revisión prioritaria**. Una: **Revisión programada**. Cero: **Revisión habitual**. Estos umbrales son una decisión de demostración, no criterios sanitarios ni requisitos añadidos a las User Stories.
4. La estimación requiere estado disponible, regla reconocida y fuente predictiva identificada como simulación. Una categoría registrada contradictoria o factores incompletos, duplicados o ajenos impiden asignar prioridad.
5. Los estimables se ordenan por cantidad de señales descendente; los empates se resuelven por código. Los insuficientes aparecen **sin posición ni prioridad predictiva** en un grupo aparte. Esto no implica menor necesidad de revisión humana.

En los datos del sitio, Palta muestra dos señales y revisión prioritaria; Café muestra «Sin datos suficientes». No hay mediciones de contaminantes, porcentajes de riesgo, entrenamiento, patrones históricos calculados ni IA/ML real. No se deduce inocuidad, causalidad ni incumplimiento sanitario.

### Estado de las cinco historias

«Completa en pruebas locales» indica implementación dentro del alcance académico autorizado y comprobación de lógica/renderizado con DOM controlado. No equivale a validación visual en navegador real.

| Historia | Estado | Criterios comprobados |
|---|---|---|
| US40 | Completa en pruebas locales | Solicitud, etiqueta predictiva, categoría/significado y estado insuficiente sin conclusión sanitaria. |
| US41 | Completa en pruebas locales | Factores disponibles con referencia/fuente, limitaciones explícitas y ausencia de causas inventadas. |
| US42 | Completa en el alcance simulado, con pruebas locales | Resumen de datos existentes, reconocimiento de ausencias y estimación diferenciada. Explicación local expresamente simulada, sin IA conectada. |
| US43 | Completa en pruebas locales | Etiquetas y jerarquía separadas, advertencias, fuente de avisos y ausencia de atribución oficial ficticia. |
| US45 | Completa en pruebas locales | Orden transparente, desempate, grupo sin prioridad y acceso al pasaporte del lote seleccionado. |

### Comprobaciones ejecutadas

Pasaron **45 pruebas funcionales locales**. Cubren el caso disponible e insuficiente; categorías de dos, una y cero señales; factores parciales, duplicados, ajenos o incoherentes; fuentes/reglas ausentes; explicación antes y después de solicitar estimación; datos ausentes; distinción de avisos y predicciones; orden entre varios lotes estimables; empate y ausencia de estimaciones; selección/cambio de lote; controles antiguos; teclado y panel único entre cinco pestañas; y renderizado de contenido como texto.

Los casos alternativos usan fixtures en memoria: no añaden archivos ni cambian los datos publicados. La regresión incluye búsqueda, resumen, origen/actores, trazabilidad, documentos/laboratorio, alertas, recepción, persistencia e idempotencia con almacenamiento controlado, menú, eventos de video y QR con mocks. Se comprueba también que el análisis no escriba ni elimine revisiones locales.

Pasaron **18 comprobaciones estáticas** de sintaxis, estructura HTML/CSS, relaciones ARIA, IDs, cinco pestañas/paneles, referencias locales, reglas, preservación de requisitos, colecciones ajenas a estimaciones, recepción, lógica previa y hashes de los nueve recursos originales. No se crean archivos ni dependencias.

### Pruebas manuales pendientes y límites

El conector de navegador volvió a informar que el host de acceso no estaba disponible. No se completaron pruebas visuales ni de dispositivos reales durante esta etapa. Falta comprobar:

1. Abrir ambos lotes, entrar a Análisis preventivo y solicitar su estimación: Palta debe mostrar revisión prioritaria y Café el estado insuficiente, conservando producto/código.
2. Desplegar/cerrar factores y explicación mediante teclado. Contrastar descripciones/fuentes y revisar que la explicación distinga datos conocidos, actualización ausente y estimación. Repetir antes de solicitar una estimación.
3. Consultar prioridad, abrir el otro lote y comprobar la eliminación del resultado, factores y explicación anteriores. Desde recepción, comprobar que volver conserve el lote recién seleccionado.
4. Revisar la separación visual entre estimación y avisos académicos; abrir los detalles de alertas y comprobar fecha, fuente y alcance del mismo lote.
5. Recorrer las cinco pestañas con flechas, Inicio/Fin, Enter/Espacio, Tab y Shift+Tab; comprobar panel único, foco y anuncios con lector de pantalla.
6. Revisar 320, 375, 480, 768, 960 y 1280 px, zoom y orientación horizontal. Escritorio utiliza cinco columnas; móvil dos columnas y la quinta pestaña ocupa la fila completa. Comprobar ausencia de desbordamiento y barra fija sin ocultar contenido, así como movimiento reducido.
7. Repetir las funcionalidades previas, registro/recarga real de recepción y reproducción real de videos. US01, US02 y US32 continúan pendientes de validación física con cámara y QR.

La estimación es una regla determinista local de dos ejemplos académicos, no una predicción validada. Los varios lotes estimables y categorías alternativas se comprueban solo con fixtures; el dataset del sitio conserva un caso positivo y uno insuficiente. La explicación no utiliza un modelo de lenguaje ni consulta servidores. Inter conserva su disponibilidad local y alternativas del sistema.

Se modifican únicamente `public/index.html`, `public/assets/scripts/main.js`, `public/assets/styles/styles.css` y este README. No se necesitan recursos gráficos adicionales ni gráficos complejos para estos criterios. No se crean commits, no se publica y no se avanza a la etapa 7.

## Recepción de mercadería — etapa 5 (registro de su cierre)

Alcance exclusivo: **US32, US33, US35 y US39**. Se reutilizan el dataset de la etapa 0, el lector de US01 y el pasaporte de las etapas anteriores. No se implementan discrepancias, historial de consultas, recepción oficial ni analítica predictiva; la etapa 6 permanece pendiente.

### Flujo disponible

El selector visible **Recepción de mercadería**, junto a Consultar un lote, abre una experiencia con un solo paso visible cada vez:

1. **Identificar lote:** ingreso manual por código o apertura del lector QR compartido. Se diferencian entradas vacías, formato incorrecto y código válido inexistente. La alternativa manual, los reintentos, permisos, errores y plazos del lector conservan el contexto de recepción.
2. **Revisar información:** producto y código permanecen en el contexto del lote recibido. Se muestran procedencia, proveedor, productor y fecha de cosecha registrados; los faltantes dicen «No disponible». Productor y proveedor se mantienen como roles distintos. Trazabilidad, controles y alertas abren los mismos paneles del pasaporte, con una acción visible para volver a recepción y recuperar el foco del acceso utilizado.
3. **Registrar revisión:** la acción **Registrar verificación** conserva una revisión interna simulada del lote. Se muestran el estado y la fecha/hora disponibles. No se certifica el producto ni se aprueba la mercadería. El resultado del guardado recibe foco; los errores se anuncian sin confirmar un registro que no se haya podido recuperar.

Los avisos coincidentes se destacan como simulaciones académicas e invitan a revisar **lote, fecha, alcance y fuente**, sin sustituir instrucciones oficiales. Su detalle conserva la información de la etapa 4. Café muestra la ausencia de coincidencias y advierte que no garantiza inocuidad. Las estimaciones predictivas no se incluyen como alertas.

La selección conserva una única identidad canónica. Cambiar de lote o editar el código limpia datos y detalles anteriores; consultar otro lote registrado desde las alertas del pasaporte también actualiza la recepción. Cambiar al modo de consulta general descarta la selección, pero conserva las revisiones ya guardadas.

### Persistencia y recuperación

Se utiliza una clave de `localStorage` por lote: `origen360.recepcion.v1.<identificador>`. Cada registro contiene exclusivamente:

- `loteId`: identificador original del lote.
- `fechaHora`: fecha/hora ISO en UTC, mostrada según la zona horaria del navegador.
- `estado`: `revision_interna_simulada`.

No se almacenan nombres, datos personales, documentos, certificados, imágenes ni resultados sanitarios. Se conserva una única revisión por lote; un registro válido ya existente se recupera y no se duplica ni cambia su fecha ante clics repetidos. La revisión aparece al identificar nuevamente el lote, incluso en una nueva instancia de la página cuando el navegador conserva el almacenamiento del mismo origen. No se restaura automáticamente la selección del lote al cargar.

Se validan esquema, identificador, estado y fecha ISO antes de presentar un registro. JSON inválido, campos adicionales y datos de otro lote no se aceptan como revisión. Se gestionan errores de acceso, cuota y escrituras no confirmadas. Los datos inválidos no se sobrescriben: existe una acción con confirmación explícita para descartar únicamente la clave inválida del lote actual. Las demás claves no se eliminan. Los cambios de almacenamiento en otra pestaña actualizan el estado mostrado del mismo lote.

### Estado de las historias

«Completa en pruebas locales» indica implementación y comprobación con DOM y almacenamiento controlados; las verificaciones en navegador real se detallan aparte.

| Historia | Estado | Cobertura |
|---|---|---|
| US32 | Parcial: pendiente de cámara real | Lector compartido desde recepción, identificación y datos clave, reintento/ingreso manual y liberación de cámara comprobados con mocks. No se afirma funcionamiento en dispositivos físicos. |
| US33 | Completa en pruebas locales | Datos y fechas disponibles, productor/proveedor separados, «No disponible» y acceso a trazabilidad/controles del mismo lote. |
| US35 | Completa en pruebas locales | Estado interno explícito, registro y recuperación por lote, fecha/hora, persistencia con almacenamiento controlado, idempotencia y gestión de errores/datos inválidos. Recarga real pendiente. |
| US39 | Completa en pruebas locales | Advertencia coincidente, naturaleza simulada, acceso al detalle y orientación sobre lote/fecha/alcance/fuente; ausencia sin garantía sanitaria. |

### Comprobaciones ejecutadas

Pasaron **59 pruebas funcionales locales**. Incluyen ambos lotes, campos ausentes, pasos exclusivos, foco, acceso/retorno desde el pasaporte, coincidencias y ausencia de avisos, registros predictivos excluidos, almacenamiento bloqueado/ausente, cuota, escritura descartada, datos inválidos, descarte confirmado, clics repetidos, cambios entre lotes y sincronización entre pestañas simulada.

La recuperación después de recargar se comprobó creando una nueva instancia aislada del programa con el mismo almacenamiento controlado. Esta prueba valida lectura y recuperación del registro; no sustituye cerrar o recargar un navegador real. Los casos QR usan cámara, detector y reloj simulados: reconocimiento de ambos IDs, incompatibilidad, permisos denegados, errores, lectura no válida, plazos, resultados tardíos y liberación del flujo.

La regresión cubre búsquedas por código/producto, resumen, pasaporte, origen/actores, trazabilidad, evidencias, alertas, cuatro pestañas/teclado, menú y eventos de los tres videos. Los fixtures se mantienen en memoria y no cambian el dataset del sitio.

También pasaron **19 comprobaciones estáticas**: sintaxis, estructura HTML/CSS, referencias locales/ARIA, IDs originales, paneles únicos, esquema de persistencia y preservación de requisitos, dataset, secciones informativas, estilos anteriores y archivos multimedia. No se añaden archivos ni dependencias.

### Pruebas manuales pendientes

El conector de navegador no estuvo disponible durante esta etapa. Falta comprobar:

1. Abrir Recepción de mercadería, identificar ambos códigos y revisar que solo se muestre un paso, con producto/código coherentes y los roles separados.
2. Probar vacío, formato incorrecto y `O360-DEMO-999`; corregir la entrada y continuar sin datos de un lote anterior.
3. Consultar trazabilidad, documentos, laboratorio y alertas en el pasaporte; revisar detalles y volver a recepción, comprobando foco e identidad.
4. Registrar Palta, repetir clics, volver a consultar y recargar la página. Identificar nuevamente Palta y comprobar la misma fecha/estado. Registrar Café y recuperar ambos registros independientemente.
5. Revisar permisos/cuota de almacenamiento y los mensajes de error, sin presentar éxito falso. La recuperación de datos inválidos debe limitarse a la clave de recepción del lote mostrado y requerir confirmación explícita.
6. Abrir la misma página en dos pestañas del mismo origen y comprobar la actualización del estado local.
7. En un origen seguro y dispositivo compatible, leer QR físicos de ambos lotes desde recepción. Verificar permisos denegados, reintento, QR ilegible, ingreso manual, cierre y apagado del indicador de cámara. US01/US02 también conservan su validación física pendiente.
8. Revisar teclado, lector de pantalla, anuncios, resultado del guardado y retorno del foco. Comprobar 320, 375, 480, 768, 960 y 1280 px, zoom, orientación horizontal y movimiento reducido.
9. Repetir el flujo de consulta general, las cuatro pestañas, menú y reproducción real de videos.

### Limitaciones y recursos

El registro pertenece al navegador y origen actuales. Puede perderse al limpiar datos o al finalizar una sesión privada; no se sincroniza con otros dispositivos, no autentica al comerciante y no constituye una auditoría fiable. La fecha depende del reloj local. No hay transacciones entre pestañas ni bloqueo distribuido; las claves separadas impiden sobrescribir el registro del otro lote. La persistencia de páginas abiertas mediante `file:` depende del navegador; conviene verificarla con un mismo origen local estable y usar un contexto seguro para cámara.

El reconocimiento físico sigue condicionado a `BarcodeDetector`, formato `qr_code`, permisos y dispositivo. No se incorporan librerías alternativas ni se simula lectura en la interfaz. El dataset y las fuentes siguen siendo ficticios; no hay integración oficial.

Se modifican únicamente `public/index.html`, `public/assets/scripts/main.js`, `public/assets/styles/styles.css` y este README. No se necesitan imágenes, videos ni iconos nuevos. Inter mantiene su disponibilidad local y alternativas del sistema. No se crean commits ni se publica el proyecto; no se avanza a la etapa 6.

## Consulta de alertas — etapa 4 (registro de su cierre)

Alcance exclusivo: **US24, US25, US26, US27, US28 y US31**, junto con la corrección visual de las pestañas. Se integra el módulo en el pasaporte existente; no se añaden páginas, dependencias, servicios ni recursos multimedia. Recepción comercial y analítica predictiva permanecen pendientes.

### Navegación y consulta

- Las pestañas muestran únicamente **Origen y actores**, **Trazabilidad**, **Controles y evidencias** y **Alertas**. Se retiran los textos visibles «Activa» y «Módulo pendiente» de los botones. Fondo, peso tipográfico, borde/indicador y `aria-selected` identifican la selección. Se conservan teclado, foco, panel único, transición de 180 ms y movimiento reducido.
- Abrir Alertas muestra los registros del lote activo, ordenados por fecha descendente; las fechas ausentes o no interpretables quedan al final. El buscador específico admite el código de demostración, normaliza espacios exteriores/mayúsculas y diferencia una entrada inválida de una consulta sin coincidencias.
- Consultar el otro lote registrado actualiza todo el pasaporte mediante su mecanismo de selección existente y mantiene abierta Alertas. Se descartan detalles anteriores de recorrido, documentos y alertas. Consultar un código válido desconocido conserva el pasaporte y diferencia expresamente el código consultado del lote activo, sin asignarle información ajena.
- Las tarjetas muestran código, identificador de alerta, título, fecha, estado, fuente y naturaleza simulada. El detalle reproduce descripción y alcance registrados, mantiene producto/código e incorpora fuente, fecha, estado, actualización y limitaciones. Los metadatos ausentes se indican sin completarlos.
- Ambas acciones para volver al listado restauran el foco del botón correspondiente. Editar la consulta, iniciar otra o cambiar de lote limpia el detalle y bloquea selecciones antiguas. Hay acciones para consultar el lote activo, realizar otra consulta y volver al origen del pasaporte.
- El estado vacío dice «No se encontraron coincidencias en las fuentes consultadas» y precisa que se consulta únicamente el dataset académico local. No encontrar coincidencias no constituye una garantía de inocuidad.

### Datos y fuentes

`O360-DEMO-001` conserva `AL-DEMO-001`, enriquecido como aviso académico de revisión de referencia documental, y añade `AL-DEMO-002`, un aviso de ejemplo sobre datos de transporte. Ambos incluyen descripción, fecha, estado, alcance limitado al mismo lote y metadatos de fuente ficticia. `O360-DEMO-002` no tiene alertas y demuestra el estado sin coincidencias.

Los dos registros son **simulaciones académicas**; no describen incidentes sanitarios reales ni se atribuyen a SENASA, laboratorios o autoridades. No hay consultas oficiales ni actualización en tiempo real. La categoría de presentación «Oficial (simulada)», comprobada únicamente con un fixture en memoria, nunca presenta un registro ficticio como alerta auténtica. Los indicadores predictivos se excluyen de la consulta de alertas y se explica su separación; no se implementan cálculos ni analítica.

Las demás colecciones del dataset, los identificadores de los lotes, los requisitos y los recursos originales se conservan.

### Estado y validación

«Completa en pruebas locales» significa que los criterios tienen implementación y comprobación de lógica/renderizado mediante DOM simulado; no equivale a una revisión visual en navegador real.

| Historia | Estado | Criterios comprobados |
|---|---|---|
| US24 | Completa en pruebas locales | Acceso desde el pasaporte, lista ordenada y fuente/simulación explícitas. |
| US25 | Completa en pruebas locales | Consulta por código, coincidencias con detalle y estado sin coincidencias sin garantías sanitarias. |
| US26 | Completa en pruebas locales | Código/alerta, fecha/fuente disponibles y selección del detalle. |
| US27 | Completa en pruebas locales | Descripción, fecha, estado, fuente y alcance literales, contexto del lote y retorno. |
| US28 | Completa en pruebas locales | Diferenciación de fuente de demostración, categoría oficial siempre simulada en los fixtures y separación predictiva. No se conecta una fuente oficial real. |
| US31 | Completa en pruebas locales | Mensaje cuidadoso, ausencia de conclusiones de seguridad y opciones para consultar de nuevo o regresar. |

Se ejecutaron **38 comprobaciones funcionales locales**, todas satisfactorias, con DOM, foco, cámara y detector controlados. Cubren coincidencias, códigos inválidos/desconocidos, lote sin alertas, fechas desordenadas/ausentes, metadatos incompletos, texto sin interpretación HTML, fuente oficial simulada, exclusión predictiva, selección/retorno de foco, limpieza de detalles y cambio de lote. La regresión incluye las cuatro pestañas y teclado, búsqueda por código/producto, resumen, origen/actores, trazabilidad, evidencias, menú, eventos de video y QR con mocks. Los fixtures no modifican los datos del sitio.

Pasaron además **17 comprobaciones estáticas** de sintaxis JavaScript, estructura HTML/CSS, relaciones ARIA, etiquetas de pestañas, referencias locales, preservación de requisitos, colecciones ajenas a alertas y hashes de los nueve recursos originales. Las secciones HTML de origen, trazabilidad y evidencias se compararon con la versión anterior y permanecen intactas.

### Pruebas manuales pendientes y límites

El navegador de esta sesión no estuvo disponible. Falta verificar en navegador real:

1. Abrir Palta y Café, consultar sus alertas y alternar entre ambos códigos desde Alertas. Revisar identidad, coincidencias, estado vacío y limpieza de detalles previos.
2. Probar código vacío, formato inválido y `O360-DEMO-999`; comprobar mensajes, nueva consulta, consulta del lote activo y retorno al pasaporte.
3. Abrir ambos avisos, contrastar descripción/fecha/fuente/alcance y regresar por ambos controles, comprobando el retorno del foco.
4. Recorrer las cuatro pestañas y el formulario mediante teclado y lector de pantalla. Comprobar los nombres visibles sin textos concatenados, anuncios de resultados, foco y panel único.
5. Revisar 320, 375, 480, 768, 960 y 1280 px, zoom y orientación horizontal: tarjetas, metadatos, barra fija, ausencia de desbordamiento y movimiento reducido.
6. Repetir búsqueda, resumen, recorrido, evidencias, menú y reproducción real de videos. US01/US02 siguen pendientes de validación física de cámara y QR.

Inter continúa usando la instalación local o las alternativas del sistema. No se añaden imágenes, iconos como archivos, fuentes ni videos; no son necesarios para estos criterios. Incorporar Inter como archivo local requeriría autorización previa. No se implementa la etapa 5.

## Navegación del pasaporte — etapa 3.1 (registro de su cierre)

Refinamiento exclusivo de usabilidad antes de la etapa 4. Se reutilizan las mismas secciones y sus IDs; no se duplican paneles ni se modifican el dataset, las User Stories o sus criterios. Alertas continúa mostrando únicamente su aviso de módulo pendiente.

### Comportamiento

- Cuatro pestañas: **Origen y actores**, **Trazabilidad**, **Controles y evidencias** y **Alertas**. Solo un panel está visible y disponible para interacción cada vez.
- El producto y el identificador comparten una barra fija con las cuatro pestañas. El estado seleccionado se distingue por fondo, borde/indicador, texto «Activa» y `aria-selected`.
- La leyenda se conserva como ayuda común antes de las pestañas. El enlace de ayuda la abre. Los datos principales se reubican dentro de Origen, manteniendo sus elementos y funcionalidades.
- Cambiar de apartado no cambia el lote ni el fragmento de URL, y no vuelve a generar el contenido. Los detalles abiertos de trazabilidad/evidencia se conservan al cambiar de pestaña dentro del mismo lote.
- En la posición habitual, cambiar de pestaña no desplaza la página. Si se estaba dentro de un panel largo y el inicio del contenido queda por encima de la barra fija, se ajusta únicamente lo necesario para mostrar el comienzo del nuevo panel, sin desplazamiento animado.
- Al cambiar o descartar el lote, se limpian los detalles anteriores y se selecciona Origen. Reabrir el pasaporte desde el resumen también comienza en Origen.
- Las acciones internas de etapas y evidencias activan su panel antes de enfocar el detalle. Los botones para volver al recorrido/listado mantienen su funcionamiento y recuperan el foco del control correspondiente.

### Accesibilidad y presentación

Se aplica el patrón de pestañas de [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/): `tablist`, cuatro botones `tab`, cuatro secciones `tabpanel`, relaciones `aria-controls`/`aria-labelledby` y un único tabulador de pestaña con `tabindex="0"`.

- Flechas izquierda/derecha: cambian y activan la pestaña, con recorrido circular.
- Inicio/Fin: primera/última pestaña. Enter/Espacio también permiten activarla.
- Tab y Shift+Tab conservan su recorrido nativo. Tab sale de la lista hacia el panel activo; las flechas verticales no se interceptan porque la lista es horizontal.
- Los paneles inactivos usan `hidden`; su contenido queda fuera del recorrido de foco y del árbol accesible. El foco de una pestaña se establece sin desplazamiento automático.
- La entrada del panel usa un desvanecimiento de **180 ms**, sin animar alturas ni posiciones. `prefers-reduced-motion` desactiva la animación y las transiciones de las pestañas.
- Escritorio: cuatro columnas. Móvil/tablet estrecha: dos columnas con celdas flexibles y texto ajustable para evitar desbordamiento. En orientación horizontal de poca altura se compacta la barra usando cuatro columnas cuando hay ancho suficiente. Su presentación real queda pendiente de revisión visual.

### Validación realizada

Se ejecutaron **35 comprobaciones funcionales locales** con DOM, foco, geometría y cámara controlados. Incluyen cambios sucesivos, panel único, estados ARIA y tabulación, flechas/Inicio/Fin/Enter/Espacio, conservación del foco, ajuste de vista solo cuando es necesario, detalles y retorno, cambio de lote y controles antiguos. La regresión cubre consultas, resumen, origen, actores, recorrido, niveles, evidencias, menú, videos y QR con mock.

Se comprueban además sintaxis, estructura HTML/CSS, referencias, unicidad de IDs y conservación de requisitos y recursos. El dataset se compara íntegramente con la base de la etapa 3.

### Pruebas manuales pendientes de esta etapa

El conector del navegador no estuvo disponible; las comprobaciones anteriores no sustituyen la revisión real de escritorio, móvil o tecnologías de asistencia.

1. Abrir ambos lotes y cambiar por las cuatro pestañas, comprobando un único panel y la identidad fija del lote.
2. Recorrer la lista con Tab, flechas, Inicio/Fin y Enter/Espacio. Verificar salida con Tab al panel, retorno con Shift+Tab y anuncios con lector de pantalla.
3. Seleccionar etapas, abrir evidencias y cambiar de pestaña; comprobar conservación dentro del mismo lote y retorno correcto del foco al recorrido/listado.
4. Cambiar de Palta a Café y volver; comprobar reinicio en Origen y ausencia de datos o detalles del lote anterior.
5. Revisar 320, 375, 480, 768, 960 y 1280 px, zoom y orientación horizontal: sin desbordamiento, controles legibles y contexto fijo sin tapar contenido.
6. Cambiar a un panel corto estando al comienzo y también dentro de uno largo: no debe haber desplazamiento innecesario ni quedar el contenido fuera de vista.
7. Probar movimiento reducido, la leyenda común y regresión de menú, consulta y reproducción real de videos. La validación física de cámara de US01/US02 sigue pendiente.

Se modifican únicamente HTML, CSS, JavaScript y este README. No se añaden recursos, dependencias ni servicios; no se implementa la etapa 4.

## Controles y evidencias — etapa 3 (registro de su cierre)

Alcance exclusivo: **US17, US19, US20 y US21**. Se integra la consulta documental en el pasaporte existente y se conserva el lote activo. No se modifican las User Stories ni se implementan alertas, recepción comercial o analítica predictiva.

### Casos de demostración

Los dos IDs originales se conservan. Se enriquecen únicamente las evidencias del dataset de la etapa 0; lotes, actores, trazabilidad, alertas y estimaciones mantienen sus datos anteriores.

| Lote | Registro | Disponibilidad | Archivo |
|---|---|---|---|
| O360-DEMO-001 | DOC-DEMO-001: documento declarado de procedencia | Metadatos disponibles: tipo, entidad ficticia, fecha, periodo de vigencia ficticio, fuente y alcance. | Sin archivo adjunto. |
| O360-DEMO-001 | LAB-DEMO-001: registro académico de análisis | ID, fecha, laboratorio didáctico ficticio, tipo de análisis y fuente disponibles. No contiene mediciones ni conclusiones sanitarias. | Sin archivo adjunto. |
| O360-DEMO-002 | DOC-DEMO-002: referencia documental incompleta | Información parcial. Entidad, fecha y vigencia no disponibles; la ausencia documental se indica expresamente. | Sin archivo adjunto. |
| O360-DEMO-002 | Análisis de laboratorio | No hay registro asociado: se muestra el estado de ausencia. | No disponible. |

Los tres registros están **declarados y simulados**. No representan certificaciones auténticas, laboratorios reales ni autoridades. «Registro disponible» describe la posibilidad de consultar metadatos; no equivale a disponer de un documento adjunto, comprobar su autenticidad o certificar el producto.

### Flujo y metadatos

- «Controles y evidencias» lleva a la sección funcional del mismo pasaporte. La cobertura distingue registros consultables, parciales y evidencia no disponible.
- Las tarjetas se agrupan en certificaciones/documentos y análisis. Muestran nombre, tipo, identificador, estado, respaldo, fuente, entidad, fecha y vigencia registrada, con faltantes explícitos.
- Los registros con información tienen acceso al detalle. Los que están marcados no disponibles o carecen de datos suficientes no presentan un botón de consulta engañoso.
- El detalle mantiene producto/código del lote y muestra identificador, tipo, entidad, fecha, vigencia, fuente, nivel, actualización, alcance y limitaciones. «Información no disponible» sustituye únicamente valores ausentes; no se completan datos.
- Los análisis muestran el tipo y contenido registrados literalmente, con identificación académica. No se deducen conclusiones sanitarias a partir de su disponibilidad o resultado.
- La vigencia se presenta como texto registrado, sin cálculos ni afirmaciones automáticas de validez.
- Hay dos acciones para regresar al listado; devuelven el foco al botón que abrió el registro. Cambiar o editar el lote limpia el detalle y sus metadatos. Las selecciones se validan contra las evidencias del lote activo, incluso si se intenta usar un botón antiguo.
- Se reutilizan los niveles de la etapa 2, con texto, iconografía y «Simulado». Los registros predictivos de pruebas aisladas se diferencian expresamente de certificaciones/alertas; no se calculan estimaciones.
- No se generan, descargan ni abren archivos. Una referencia de archivo futura tampoco habilita su apertura automáticamente; requiere una decisión y autorización posterior.

### Archivos y presentación

Se modifican `public/index.html`, `public/assets/scripts/main.js`, `public/assets/styles/styles.css` y este README. Se reutilizan los tokens de color, tipografía, tarjetas, etiquetas de respaldo y contexto fijo del pasaporte. La nueva sección añade jerarquía documental, estados textuales, tarjetas responsive, metadatos estructurados y navegación por teclado, sin nuevos recursos gráficos ni dependencias.

### Estado por historia

«Completa en pruebas locales» indica implementación y validación de lógica/renderizado mediante un DOM simulado; no implica pruebas realizadas en un navegador real.

| Historia | Estado | Criterios comprobados |
|---|---|---|
| US17 | Completa en pruebas locales | Lista filtrada por lote, controles por nombre/tipo/disponibilidad y acceso a su evidencia. Casos sin controles y sin detalle suficiente. |
| US19 | Completa en pruebas locales | Tipo, entidad, fecha y vigencia literal; evidencia ausente y referencia parcial claramente identificadas, sin atribuir validez sanitaria. |
| US20 | Completa en pruebas locales | ID, fecha, entidad, tipo y fuente de análisis; reproducción literal del contenido, identificación académica y lote sin análisis. |
| US21 | Completa en pruebas locales | Contexto del lote, metadatos estructurados, alcance/limitaciones, retorno al listado y eliminación del detalle anterior. |

Se ejecutaron **40 comprobaciones funcionales locales** con DOM, cámara y reloj controlados. Incluyen los datos de demostración reales del sitio y fixtures aislados de ausencia de documentos/controles, registro vacío, metadatos insuficientes, vigencia pasada, categorías de respaldo, contenido como texto y referencia de archivo sin apertura. La regresión cubre consulta manual, búsqueda, resumen, pasaporte, origen, actores, recorrido, niveles, menú, eventos de video y QR con detector mock.

También se comprueban sintaxis JavaScript, estructura HTML/CSS, referencias accesibles, anclas, conservación de requisitos y hashes de imágenes/videos. Las colecciones ajenas a evidencias se comparan con la base aprobada para asegurar que no cambian.

### Pruebas manuales pendientes y límites

El conector del navegador no estuvo disponible durante esta etapa. Se debe verificar en navegador:

1. Abrir la palta, entrar a controles y consultar DOC-DEMO-001 y LAB-DEMO-001. Contrastar el ID con la barra fija y revisar fuente, fechas, alcance y «Sin archivo adjunto».
2. Volver al listado por ambas acciones y comprobar el retorno del foco. Alternar documento y laboratorio; el panel del análisis no debe permanecer visible en un documento.
3. Abrir el café y comprobar la referencia parcial, sus faltantes y el estado de análisis no disponible. Volver a la palta sin conservar un detalle ajeno.
4. Navegar por teclado y lector de pantalla; revisar nombres de botones, foco, etiquetas, metadatos y avisos de simulación.
5. Revisar tarjetas y detalle a 320, 375, 480, 768, 960 y 1280 px, zoom y orientación horizontal. Comprobar que el contexto fijo no cubra el destino de las anclas.
6. Mantener pendientes las pruebas de cámara física de US01/US02 y reproducción real de los MP4. Los tests con mocks no las sustituyen.

La consulta es local, sin autenticación, persistencia ni validación documental externa. Inter continúa dependiendo de su instalación local. No se han creado PDF, imágenes documentales, certificados ni descargas; no se requieren para estos criterios. Como mejora opcional, un juego de iconos SVG locales de 24–32 px podría sustituir los símbolos tipográficos, previa autorización. Los recursos originales no se alteran.

## Pasaporte interactivo — etapa 2 (registro de su cierre)

Alcance exclusivo: **US09, US10, US11, US13 y US15**. Se amplía el pasaporte existente, sin cambiar las historias, los dos identificadores ni el dataset académico de la etapa 0. Controles documentales, alertas y analítica predictiva permanecen pendientes. US01 y US02 conservan su estado parcial, pendiente de validación con cámara real.

### Funcionalidades disponibles

- El encabezado mantiene producto e identificador. Una barra de contexto del mismo lote permanece visible al recorrer el pasaporte.
- El estado distingue información básica disponible, parcial y no disponible. La cobertura indica origen/actores y cantidad de eventos; para controles, alertas y estimaciones muestra «Módulo pendiente», sin interpretar los registros preparados como servicios activos.
- Los accesos llevan a origen y actores, trazabilidad, o los avisos de módulos pendientes, conservando el lote seleccionado.
- La procedencia muestra únicamente el valor registrado. Productor y proveedor aparecen como roles separados, cada uno con su propia fuente. Si solo hay proveedor, el productor permanece no disponible.
- Los eventos se ordenan mediante el orden registrado. Los eventos sin orden conocido se sitúan al final y lo indican; no se deducen fechas ni etapas que no figuren en los datos.
- Cada etapa es un botón seleccionable. El panel muestra la información existente, su identificador y fecha, la procedencia de los datos y el lote al que pertenece. «Volver al recorrido» devuelve el foco a la etapa seleccionada.
- Cambiar de lote o editar la consulta limpia valores, respaldo y selección anteriores. Los controles de un lote anterior no pueden abrir detalles en el lote nuevo.

### Niveles y procedencia

Cada dato principal, actor y detalle de etapa tiene etiqueta textual e iconografía tipográfica reutilizada, identificación «Simulado» y ayuda «Fuente y alcance». Esa ayuda presenta fuente, actualización y limitaciones. Las fechas desconocidas siguen mostrándose como «Información no disponible».

Se utilizan los metadatos del registro. El renderer también respeta una eventual entrada explícita por campo (`metadatosCampos`), sin modificar el dataset actual; una ausencia explícita en ese campo no hereda otro nivel como sustituto.

Los niveles admitidos son declarada, verificada por terceros, oficial y predictiva. La leyenda desplegable explica su alcance y el estado no disponible/no determinado. Sin valor se muestra «No disponible»; sin nivel reconocido o sin fuente suficiente se muestra «Nivel no determinado». No se completa el respaldo por inferencia.

**Todos los registros visibles actuales siguen siendo declarados y simulados.** Las categorías restantes son capacidades de presentación y explicaciones de la leyenda; no constituyen comprobaciones oficiales de los ejemplos. En las pruebas aisladas, un dato marcado como predictivo se diferencia mediante su etiqueta y aviso propio: «No es una certificación ni una alerta oficial». No se calculan ni consultan estimaciones en esta etapa.

### Diseño y accesibilidad

Se conservan los tokens verdes/crema, Inter local y los componentes anteriores. El pasaporte incorpora tarjetas de estado y cobertura, agrupación de actores, fuentes desplegables nativas, línea de recorrido con botones y panel de detalle, leyenda y estados vacíos.

Los botones de etapa usan `aria-pressed` y `aria-controls`; los iconos decorativos se ocultan a tecnologías de asistencia y siempre están acompañados por texto. El detalle recibe foco y permite volver a su botón. Los resúmenes de fuentes tienen nombres accesibles que identifican el dato. Se mantienen foco visible, adaptación a escritorio/tablet/móvil y preferencia de movimiento reducido.

### Estado de las cinco historias

«Completa en comprobaciones locales» indica que los criterios funcionales tienen implementación y pruebas de lógica/renderizado con DOM simulado. No implica revisión visual ni ejecución en navegador real.

| Historia | Estado | Criterios comprobados |
|---|---|---|
| US09 | Completa en comprobaciones locales | Producto, ID y disponibilidad; separación de niveles; cuatro accesos al detalle/avisos del mismo pasaporte. |
| US10 | Completa en comprobaciones locales | Procedencia registrada, fuente/nivel y ausencia explícita de ubicación. |
| US11 | Completa en comprobaciones locales | Roles diferenciados, caso de solo proveedor y datos declarados sin atribución de verificación oficial. |
| US13 | Completa en comprobaciones locales | Orden secuencial, faltantes y eventos vacíos; selección y detalle contextual del mismo lote. |
| US15 | Completa en comprobaciones locales | Etiquetas con icono/texto, leyenda de niveles, estado indeterminado, identificación académica y separación explícita de lo predictivo. |

Se ejecutaron **28 comprobaciones funcionales locales**, incluyendo regresión de US03, US04, US07 y US08, alternancia entre lotes, fuentes, foco, menú y eventos de video. Los casos de solo proveedor, metadatos insuficientes, categorías distintas, ubicación ausente y eventos incompletos/desordenados se prueban con fixtures en memoria, sin alterar el dataset publicado. También se verifican sintaxis JavaScript, estructura HTML/CSS, referencias accesibles, enlaces y conservación de los recursos.

### Validación manual pendiente

El conector del navegador no estuvo disponible durante esta etapa. Queda pendiente:

1. Buscar y abrir ambos lotes; recorrer los cuatro accesos del pasaporte y comprobar producto/ID en el contexto fijo.
2. Abrir «Fuente y alcance» de datos y actores, y desplegar la leyenda mediante teclado y lector de pantalla.
3. Seleccionar varias etapas con ratón y teclado; verificar fechas, descripción, nivel, foco del detalle y retorno al recorrido.
4. Cambiar de lote, volver al resumen y editar la búsqueda; confirmar que no quedan fuentes ni detalles del lote anterior.
5. Revisar distribución, barra fija y destino de anclas a 320, 375, 480, 768, 960 y 1280 px, con zoom y orientación horizontal.
6. Mantener las pruebas de cámara real de US01/US02 y reproducción real de los MP4 como pendientes; su implementación no se ha modificado.

No se han añadido imágenes, iconos como archivos, fuentes, librerías ni servicios. No se necesitan recursos nuevos para estos criterios. Las fotografías opcionales de producto de 480 × 480 px siguen siendo una propuesta sujeta a autorización.

## Identificación y consulta — etapa 1 (registro de su cierre)

Alcance: US01, US02, US03, US04, US07 y US08. No se modifican sus criterios y no se implementan los módulos de las etapas posteriores.

### Flujo disponible

1. Buscar un producto o un código, o abrir «Escanear QR».
2. Seleccionar «Ver resumen» en los resultados. Un QR reconocido de un lote registrado conduce directamente a la confirmación.
3. Revisar producto, código, procedencia y disponibilidad de información de demostración.
4. Seleccionar «Ver pasaporte digital». El pasaporte conserva el mismo identificador y permite volver al resumen.

El formulario diferencia entrada vacía/inválida, formato de código incorrecto y código válido no registrado. El formato de esta demostración es `O360-DEMO-` seguido de tres dígitos; se conservan `O360-DEMO-001` y `O360-DEMO-002`. La búsqueda por producto ignora mayúsculas y tildes y permite coincidencias parciales por palabras. Una búsqueda sin resultados nunca se presenta como prueba de seguridad sanitaria.

Desde el escáner, «Ingresar código» cierra la cámara, muestra el formulario en modo de identificador y lo enfoca. «Buscar por producto o código» permite volver al modo general. Los campos ausentes se presentan como «Información no disponible». Los ejemplos mantienen sus datos completos; los casos de datos faltantes se verifican con fixtures aislados de prueba, sin alterar los lotes del sitio.

El pasaporte mantiene el recorrido ilustrativo existente. Los accesos a «Controles y evidencias» y «Alertas» llevan a avisos explícitos de módulos pendientes; no consultan esas colecciones ni representan funcionalidades terminadas. No se han añadido filtros, historial, recepción comercial, almacenamiento, modelos ni IA.

### Cámara y QR

- Abrir el diálogo comprueba contexto seguro, acceso a cámara, existencia de `BarcodeDetector` y soporte de `qr_code`. No solicita cámara hasta pulsar «Activar cámara».
- Se reconocen QR reales mediante la API nativa cuando el dispositivo lo permite. El contenido admitido es el identificador literal, por ejemplo `O360-DEMO-001`; no se abren enlaces contenidos en QR.
- Hay mensajes para permiso denegado, ausencia/cámara ocupada, errores de reproducción o decodificación, código no registrado y contenido de QR no admitido. La alternativa manual permanece disponible.
- El intento de lectura termina después de 20 segundos sin identificación; la preparación/espera de permisos tiene un límite de 30 segundos. Se ofrece reintento.
- Se detienen las pistas de cámara al cerrar, cancelar con Escape, elegir ingreso manual, identificar un lote, fallar la lectura, ocultar la página o abandonarla. Los resultados y permisos tardíos se invalidan y cualquier flujo recibido después de cerrar se detiene.
- No hay reconocimiento simulado en la interfaz, librerías externas ni transmisión de imágenes. El escaneo nativo no está disponible de forma uniforme entre sistemas y navegadores; la matriz de referencia de la etapa 0 sigue siendo aplicable.

### Estado de las seis historias y evidencia de aceptación

«Completa» indica que los tres criterios tienen implementación y comprobaciones locales; las pruebas visuales y de dispositivos reales se listan por separado. Las historias dependientes de lectura física permanecen parciales hasta verificar ese recorrido.

| Historia | Estado | Criterios y comprobaciones |
|---|---|---|
| US01 | Parcial | C1: diálogo accesible desde el módulo. C2: integración `getUserMedia` + `BarcodeDetector.detect`, comprobada con mocks; lectura de QR físico pendiente. C3: recuperación ante error/tiempo agotado con reintento y alternativa manual, comprobada con mocks. |
| US02 | Parcial | Confirmación con producto, código y disponibilidad, sin afirmaciones sanitarias; acción al pasaporte del mismo ID. Flujo completo comprobado con detector mock para ambos lotes; falta validación posterior a lectura física real. |
| US03 | Completa | Ingreso manual desde el diálogo, formato válido procesado, mensajes distintos para errores y código no registrado y acciones para corregir/reintentar. Fixture sin datos descriptivos informa la ausencia y permite elegir otro lote. |
| US04 | Completa | Consulta por código, coincidencias por producto seleccionables y estado vacío. Probados nombres con/sin tilde, mayúsculas, coincidencias parciales y múltiples resultados. |
| US07 | Completa | Resumen con producto, ID y procedencia; texto explícito para faltantes comprobado con fixture; acción principal al pasaporte del lote seleccionado. |
| US08 | Completa | Producto/ID visibles y coherentes con la selección; accesos a trazabilidad y a avisos de evidencias/alertas pendientes. Alternancia entre lotes y regreso al resumen comprobados. |

Se ejecutaron **38 comprobaciones locales** con JavaScript nativo en un entorno aislado de DOM, cámara, detector y reloj controlados. Incluyen los casos anteriores, la liberación de cámara, concesión/detección tardías, permisos sin respuesta, recuperación por reintento y regresión del menú y los eventos de los tres videos. Los mocks prueban el comportamiento del programa, no el hardware, los permisos reales ni la decodificación de un QR impreso. También se comprueban sintaxis JavaScript, estructura HTML/CSS, enlaces, referencias accesibles y conservación de recursos.

### Pruebas manuales pendientes

El conector de navegación no estuvo disponible en esta sesión, por lo que no se completó revisión visual ni interacción real en navegador.

1. Servir la página en un origen seguro para las pruebas de cámara (HTTPS o localhost admitido por el navegador). No se necesita backend de aplicación. No asumir que una dirección HTTP de red local es un contexto seguro.
2. Buscar `O360-DEMO-001`, ` o360-demo-002 `, `Palta`, `cafe` y `a`. Esta última búsqueda permite seleccionar entre los dos lotes.
3. Probar vacío, `!!!`, `O360-DEMO-01`, `O360-DEMO-999` y `Tomate`; comprobar diferencias entre validación, inexistencia y ausencia de coincidencias.
4. Abrir ambos resúmenes y pasaportes, regresar, editar la búsqueda y elegir otro ejemplo; comprobar que no queda información del lote anterior.
5. Recorrer los accesos del pasaporte y comprobar que los módulos pendientes se identifican como tales.
6. En un navegador compatible, presentar desde otra pantalla o una impresión un QR cuyo contenido literal sea cada uno de los dos IDs. Verificar la confirmación y el ID del pasaporte. Estos recursos de prueba no se han generado ni añadido al proyecto.
7. Probar permiso permitido/denegado, cámara ausente u ocupada, QR ilegible, cierre/Escape, ingreso manual y reintento. Confirmar que el indicador de uso de cámara se apaga al salir.
8. En un navegador sin reconocimiento nativo, comprobar el mensaje y completar el flujo manual sin simular escaneo.
9. Revisar foco y lectura de mensajes con teclado/lector de pantalla, el diálogo modal y el retorno del foco. Comprobar anchos de 320, 375, 480, 768, 960 y 1280 px, zoom y orientación horizontal.
10. Comprobar navegación informativa y reproducción real de los tres MP4 originales.

No se han añadido imágenes ni fuentes nuevas. Inter sigue usando la disponibilidad local del sistema. Fotografías de producto opcionales de aproximadamente 480 × 480 px podrían acompañar las tarjetas en una futura revisión; no son necesarias para el flujo y requieren autorización antes de incorporarse.

## Preparación técnica y visual — etapa 0 (registro de su cierre)

Esta etapa conserva la página y sus interacciones existentes. No implementa los módulos de las etapas 1–7 ni modifica las historias de usuario.

### Datos y lote activo

- `public/assets/scripts/main.js` contiene `datosDemo`: lotes, productores y proveedores por identificador; eventos de trazabilidad, evidencias, alertas y estimaciones relacionados mediante `loteId`.
- Se conservan `O360-DEMO-001` (Palta Hass) y `O360-DEMO-002` (Café en grano), sus datos visibles y sus cuatro etapas respectivas.
- Los registros incluyen metadatos de simulación, fuente, nivel de evidencia, fecha de actualización y limitaciones. Las fechas de actualización desconocidas permanecen en `null`.
- Las evidencias son registros de estructura sin archivos ni documentos disponibles. El aviso de alerta es ficticio y las estimaciones están sin datos suficientes, sin categorías, factores o modelos calculados. Estas colecciones no tienen vistas ni acciones activas todavía.
- El dataset está congelado para evitar modificaciones accidentales. `loteActivoId` mantiene una única selección; `obtenerContextoLoteActivo()` reúne exclusivamente sus relaciones.
- Editar el código, seleccionar otro ejemplo, enviar un código inexistente, reiniciar el formulario o fallar su validación descarta la selección y limpia la ficha anterior. El atributo `data-lote-id` identifica únicamente la ficha consultada visible.
- El estado permanece en memoria: no se añade almacenamiento local, seguimiento de usuarios ni llamadas a servidores.

### Estilos compartidos

`public/assets/styles/styles.css` centraliza colores, espaciados, radios, sombras y transiciones en propiedades personalizadas de `:root`. Se mantienen la composición, secciones y breakpoints existentes (1100, 960, 768 y 480 px).

La paleta usa `#214F42`, `#2F6B57`, `#AFC9B5`, `#F7F5EF` y `#FFFFFF`. Los botones y tarjetas reutilizan estos valores. El foco tiene un contorno oscuro sobre superficies claras y una variante clara en el pie de página; las transiciones y la elevación de tarjetas respetan la preferencia de movimiento reducido.

La familia tipográfica declara **Inter**, seguida de alternativas del sistema. Inter se utiliza si está instalada en el equipo del visitante. No se ha añadido un archivo de fuente ni una petición a un proveedor externo; garantizar Inter en todos los equipos requiere autorización para incorporar ese recurso local.

### Viabilidad del QR mediante cámara

Evaluación documental al **5 de noviembre de 2026**. No se ha implementado un lector ni se solicitan permisos de cámara en esta etapa. Matriz de referencia para planificar las pruebas; los navegadores y versiones finales de evaluación deben confirmarse.

| Navegador / plataforma | Viabilidad de reconocimiento nativo con `BarcodeDetector` |
|---|---|
| Chrome en Android | Candidato viable según los datos de compatibilidad; debe comprobarse en el dispositivo que `getSupportedFormats()` incluya `qr_code`. |
| Chrome / Edge de escritorio | Soporte condicionado por el sistema operativo. Los datos de MDN limitan Chrome a ChromeOS/macOS y Edge a macOS; no se debe asumir disponibilidad estándar en Windows. |
| Safari / iOS | Figura sujeto a una preferencia experimental; no es una base fiable para prometer funcionamiento con la configuración habitual. |
| Firefox / Firefox en Android | La API no figura soportada en los datos de compatibilidad consultados. |

Acceder a cámara y reconocer QR son capacidades distintas. Una futura implementación debe detectar ambas, trabajar en un contexto seguro (HTTPS o un origen local considerado seguro), gestionar permisos denegados o cámara no disponible, ofrecer reintento/entrada manual y liberar la cámara al salir. La entrada manual no demuestra el criterio de reconocimiento de US01/US32.

No se añade ninguna librería como alternativa: cualquier dependencia o sustitución del escaneo por una simulación requiere una decisión posterior. Para revisión visual básica puede abrirse `public/index.html`; las futuras pruebas de cámara deben realizarse en un contexto seguro y en dispositivos reales.

Fuentes: [API BarcodeDetector](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector), [compatibilidad publicada por MDN](https://github.com/mdn/browser-compat-data/blob/main/api/BarcodeDetector.json) y [acceso a cámara con getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

### Verificación de la etapa

- Se verifican la sintaxis JavaScript, las relaciones del dataset, la separación entre lotes, las referencias locales y la conservación de recursos.
- La regresión de eventos se comprueba con un DOM simulado: consultas, sugerencias, limpieza de contexto, menú, Escape y estados de video. Esto no verifica distribución visual, permisos, decodificación multimedia ni interacción real del navegador.
- La revisión visual automatizada no pudo completarse: la herramienta de uso del equipo se detuvo al no poder confirmar la URL de Edge para aplicar su política de acceso.
- Quedan pendientes pruebas manuales de navegación por anclas, foco/teclado, responsive, apariencia tipográfica y reproducción de los tres MP4. No se considera completada ninguna historia adicional por esta preparación.
