# Origen360 Perú — Especificación de User Stories para Codex (AV2)

**Fuente del texto de las historias:** informe `upc-pre-202610-1ASI0385-16734-Origen360-report-av1(1).pdf`, apartado 3.2 (pp. 71–107). Las descripciones y criterios se transcriben del informe, con normalización de espacios; la selección web y las dependencias de este archivo son una **propuesta de implementación**, no un texto originalmente rotulado como selección oficial en el informe.

## Reglas de trabajo

- Conservar US01–US50, títulos, Epics, descripciones y criterios; cualquier incompatibilidad debe informarse antes de cambiar requerimientos.
- Priorizar **30 historias funcionales core para landing** (tabla siguiente), sin perder de vista las otras **15 funcionales**. Las **5 no funcionales US46–US50** son transversales y se deben probar tanto en la landing como en los prototipos cuando corresponda.
- **Android Figma:** representación de las 50 historias. **iOS Figma:** selección de 12. **Landing web:** implementar y demostrar al menos 30 historias core; se puede ampliar hasta 45 funcionales si el tiempo lo permite. La landing responsive NO sustituye los prototipos móviles en Figma.
- Trabajar sobre la landing existente en `public/index.html`, CSS y JavaScript. HTML5 y CSS3 como base, JavaScript auxiliar para interacciones; **sin frameworks ni backend** a menos que haya autorización explícita. No sustituir el sitio ni borrar contenidos existentes.
- Simular backend, registros, alertas, modelos o IA con datos **rotulados como demostración académica**; no afirmar que hay datos oficiales verificados ni modelos activos. Etiquetar **declarada / verificada / oficial / predictiva** junto con fuente, fecha y limitaciones cuando aplique.
- Estilo high-fi profesional y responsive, usando el diseño actual como punto de partida: `#214F42` marca, `#2F6B57` interacción, `#AFC9B5` apoyo, `#F7F5EF` fondo, `#FFFFFF` superficie, tipografía Inter; iconos, estados, contraste y teclado accesibles. Solicitar antes imágenes o videos adicionales; optimizar peso y carga.
- **No hacer cambios todavía:** primero presentar matriz con ID, criterios, archivos afectados, dependencia, complejidad y estado real tras inspeccionar el código. No marcar «cumplida» una historia solo porque se mencione en la página.

## Selección web prioritaria (30 funcionales; propuesta de trabajo)

- **Identificación y consulta:** US01, US02, US03, US04, US07, US08 (6).
- **Pasaporte y trazabilidad:** US09, US10, US11, US13, US15 (5).
- **Controles y evidencias:** US17, US19, US20, US21 (4).
- **Alertas:** US24, US25, US26, US27, US28, US31 (6).
- **Recepción comercial:** US32, US33, US35, US39 (4).
- **Analítica preventiva e IA:** US40, US41, US42, US43, US45 (5).

> Nota: US01 y US32 exigen escaneo QR. Determinar si hay lectura real de cámara o alternativa demostrable; si la tecnología de escaneo queda fuera de las restricciones, marcarlo como riesgo/no verificado hasta confirmar con el docente.

## Ampliación: 15 funcionales restantes

US05, US06, US12, US14, US16, US18, US22, US23, US29, US30, US34, US36, US37, US38, US44.

**No funcionales transversales:** US46, US47, US48, US49, US50.

**iOS comparativo (12):** US01, US02, US03, US08, US09, US10, US13, US15, US17, US20, US24, US27.

## Orden de módulos y dependencias recomendado

| Etapa | Módulo | Historias core | Dependencia / criterio de salida |
|---|---|---|---|
| 1 | Identificación y consulta | US01, US02, US03, US04, US07, US08 | Dataset de lotes; estados válidos, inexistentes y parciales; navegación consistente por ID. |
| 2 | Pasaporte y trazabilidad | US09, US10, US11, US13, US15 | Vista de pasaporte, trazabilidad secuencial y niveles de evidencia con fuentes. |
| 3 | Controles y evidencias | US17, US19, US20, US21 | Documentos y controles de ejemplo vinculados al ID del lote. |
| 4 | Alertas | US24, US25, US26, US27, US28, US31 | Fuente, fecha, alcance; no coincidencia no significa seguridad. |
| 5 | Recepción comercial | US32, US33, US35, US39 | Contexto comerciante, registro local de revisión y alertas vinculadas. |
| 6 | Predictivo e IA explicable | US40, US41, US42, US43, US45 | Resultados simulados disparados por acción; factores explicados; separación de oficial/predictivo. |
| 7 | Calidad transversal | US46–50 | Responsive escritorio/tablet/móvil, teclado, etiquetas, estados, error y datos confiables. |

## Catálogo íntegro y literal de referencia (descripciones y criterios del AV2)

### US01 — Escanear código QR del lote

- **Epic:** E01. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor de productos agrícolas frescos, deseo escanear el código QR asociado a un lote para identificarlo rápidamente y consultar su información de trazabilidad.
- **Criterios de aceptación:**
  1. Dado que estoy en la pantalla de inicio, cuando seleccione «Escanear QR», entonces la aplicación debe abrir la vista de escaneo.
  2. Dado que el QR es legible y corresponde a un lote registrado, cuando la cámara lo reconoce, entonces la aplicación debe identificar el lote y continuar al resultado.
  3. Dado que el QR no puede leerse, cuando finaliza el intento, entonces la aplicación debe mostrar una opción clara para reintentar o ingresar el código manualmente.

### US02 — Confirmar el lote reconocido

- **Epic:** E01. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ver una confirmación del lote reconocido después del escaneo para asegurarme de que consultaré el producto correcto.
- **Criterios de aceptación:**
  1. Dado que el QR fue reconocido, cuando se muestra el resultado, entonces deben visualizarse como mínimo el producto y el identificador del lote.
  2. Dado que existe información asociada al lote, cuando se muestra la confirmación, entonces debe indicarse que hay información disponible sin afirmar que el producto es «100 % seguro».
  3. Dado que el usuario desea continuar, cuando selecciona «Ver pasaporte digital», entonces debe acceder al pasaporte del mismo lote.

### US03 — Ingresar código de lote manualmente

- **Epic:** E01. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ingresar manualmente el código de un lote para consultarlo cuando no pueda escanear el QR.
- **Criterios de aceptación:**
  1. Dado que estoy en la vista de escaneo, cuando selecciono «Ingresar código», entonces debe mostrarse un campo para introducir el identificador del lote.
  2. Dado que ingreso un código con formato válido, cuando confirmo la búsqueda, entonces el sistema debe procesar la consulta y mostrar el resultado correspondiente.
  3. Dado que el código no existe o no tiene información disponible, cuando se procesa la consulta, entonces debe mostrarse un mensaje comprensible y una opción para volver a intentar.

### US04 — Buscar lotes por producto o código

- **Epic:** E07. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor o comerciante, deseo buscar lotes por código o por nombre del producto para encontrar información de trazabilidad sin depender del escaneo QR.
- **Criterios de aceptación:**
  1. Dado que ingreso un código de lote registrado, cuando selecciono «Buscar», entonces veo el resultado y puedo abrir el pasaporte correspondiente.
  2. Dado que ingreso un producto, cuando confirmo la búsqueda, entonces veo los lotes que coinciden con la información cargada.
  3. Dado que no existen coincidencias, cuando finaliza la búsqueda, entonces se presenta un estado vacío sin atribuir seguridad sanitaria al producto.

### US05 — Ver disponibilidad de información del lote

- **Epic:** E01. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo saber si existe información disponible para el lote consultado para decidir si continúo revisando su trazabilidad.
- **Criterios de aceptación:**
  1. Dado que un lote fue identificado, cuando se muestra el resultado, entonces debe indicarse si existen datos disponibles para consulta.
  2. Dado que la información es parcial, cuando se muestra el estado, entonces debe indicarse de forma visible que algunos datos pueden no estar disponibles.
  3. Dado que no hay información suficiente, cuando se muestra el estado, entonces no debe presentarse una conclusión de inocuidad o seguridad que no esté respaldada.

### US06 — Filtrar resultados de lotes

- **Epic:** E07. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor o comerciante, deseo aplicar filtros a los lotes encontrados para reducir la lista y consultar los registros relevantes.
- **Criterios de aceptación:**
  1. Dado que existen varios resultados, cuando selecciono un filtro disponible (producto, procedencia o estado de información), entonces la lista se actualiza según dicho criterio.
  2. Dado que no hay resultados bajo los filtros, cuando se aplica la selección, entonces veo el mensaje «Sin coincidencias» y la opción «Limpiar filtros».
  3. Dado que retiro los filtros, cuando vuelvo a la lista, entonces recupero los resultados originales.

### US07 — Visualizar un resumen inicial del lote

- **Epic:** E01. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ver un resumen inicial del producto, lote y procedencia después de identificarlo para confirmar rápidamente que corresponde al alimento que estoy evaluando.
- **Criterios de aceptación:**
  1. Dado que el lote fue encontrado, cuando aparece el resumen, entonces deben mostrarse el nombre del producto, el código del lote y la procedencia registrada si está disponible.
  2. Dado que algún dato no está disponible, cuando se construye el resumen, entonces debe mostrarse «Información no disponible» en lugar de inventar o completar datos.
  3. Dado que deseo más detalle, cuando seleccione la acción principal, entonces debo acceder al pasaporte digital.

### US08 — Acceder al pasaporte digital del lote

- **Epic:** E01. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo acceder al pasaporte digital del lote identificado para revisar su trazabilidad, controles, evidencias y alertas disponibles.
- **Criterios de aceptación:**
  1. Dado que el lote fue reconocido, cuando selecciono «Ver pasaporte digital», entonces debe abrirse la vista correspondiente al mismo lote.
  2. Dado que ingreso al pasaporte, cuando carga la vista, entonces debe identificar claramente el producto y el código de lote.
  3. Dado que estoy en el pasaporte, cuando reviso las opciones, entonces deben existir accesos reconocibles a trazabilidad, controles/evidencias y alertas.

### US09 — Consultar el estado general del pasaporte digital

- **Epic:** E02. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo consultar el estado general del pasaporte digital para identificar rápidamente qué información de origen, evidencia, alertas y estimaciones está disponible.
- **Criterios de aceptación:**
  1. Dado que accedo al pasaporte, cuando se carga la vista, entonces deben mostrarse producto, lote, estado de disponibilidad y datos principales.
  2. Dado que la información proviene de diferentes fuentes, cuando se presenta el resumen, entonces debe evitarse mezclar datos declarados, verificados, oficiales y predictivos como si fueran equivalentes.
  3. Dado que deseo profundizar, cuando selecciono una sección, entonces debo navegar al detalle correspondiente.

### US10 — Consultar el origen geográfico registrado

- **Epic:** E02. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ver el origen geográfico registrado del lote para conocer de dónde proviene el alimento.
- **Criterios de aceptación:**
  1. Dado que el lote cuenta con procedencia registrada, cuando abro «Origen», entonces debe mostrarse la ubicación disponible con una etiqueta comprensible.
  2. Dado que el dato fue declarado por un actor del proceso, cuando se muestra el origen, entonces debe indicarse el tipo de fuente o nivel de evidencia.
  3. Dado que no existe ubicación disponible, cuando se abre la sección, entonces debe informarse claramente la ausencia del dato.

### US11 — Consultar productor o proveedor registrado

- **Epic:** E02. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo conocer el productor o proveedor registrado del lote para entender quién participa en su procedencia.
- **Criterios de aceptación:**
  1. Dado que existe información de productor o proveedor, cuando abro la sección de origen, entonces debe mostrarse el dato disponible.
  2. Dado que el registro solo identifica al proveedor y no al productor, cuando se muestra la información, entonces debe respetarse esa distinción.
  3. Dado que el dato no puede verificarse, cuando se presenta, entonces debe etiquetarse como declarado o registrado y no como verificado oficialmente.

### US12 — Consultar fechas relevantes del lote

- **Epic:** E02. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo revisar las fechas relevantes del lote para entender cuándo fue cosechado, registrado o recibido según la información disponible.
- **Criterios de aceptación:**
  1. Dado que existen fechas asociadas al lote, cuando abro la trazabilidad, entonces deben mostrarse en un formato legible y consistente.
  2. Dado que no todas las etapas tienen fecha, cuando se visualiza el recorrido, entonces solo deben mostrarse las fechas disponibles y señalar las faltantes.
  3. Dado que una fecha es estimada o declarada, cuando se presenta, entonces debe identificarse su naturaleza cuando corresponda.

### US13 — Visualizar la trazabilidad por etapas

- **Epic:** E02. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo visualizar la trazabilidad del lote por etapas para comprender su recorrido desde el origen hasta el punto registrado de destino o recepción.
- **Criterios de aceptación:**
  1. Dado que el lote tiene eventos de trazabilidad, cuando abro la sección, entonces deben ordenarse de forma secuencial.
  2. Dado que una etapa carece de información, cuando se construye el recorrido, entonces debe mostrarse como dato faltante sin completar información ficticia.
  3. Dado que selecciono una etapa, cuando existe detalle adicional, entonces debe mostrarse la información asociada a esa etapa.

### US14 — Consultar el destino o punto de recepción registrado

- **Epic:** E02. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo conocer el destino o punto de recepción registrado del lote para entender hasta dónde llega la trazabilidad disponible.
- **Criterios de aceptación:**
  1. Dado que existe un destino o punto de recepción registrado, cuando reviso la trazabilidad, entonces debe mostrarse como una etapa diferenciada.
  2. Dado que el dato corresponde a un registro interno o declarado, cuando se presenta, entonces debe indicarse la fuente.
  3. Dado que el recorrido no cubre etapas posteriores, cuando finaliza la línea de trazabilidad, entonces la interfaz no debe sugerir que conoce eventos no registrados.

### US15 — Distinguir el nivel de evidencia de cada dato

- **Epic:** E02. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo distinguir si un dato fue declarado, verificado por terceros, proviene de una fuente oficial o es una estimación predictiva para interpretar correctamente la información.
- **Criterios de aceptación:**
  1. Dado que visualizo un dato del pasaporte, cuando existe información sobre su procedencia, entonces debe mostrarse una etiqueta de nivel de evidencia.
  2. Dado que el dato es predictivo, cuando se presenta, entonces debe quedar explícitamente separado de certificaciones o alertas oficiales.
  3. Dado que el usuario necesita entender las etiquetas, cuando consulta la ayuda o leyenda, entonces debe recibir una explicación breve y clara de cada nivel.

### US16 — Consultar historial de lotes visitados

- **Epic:** E07. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor o comerciante, deseo consultar el historial reciente de lotes para recuperar registros ya revisados sin repetir una búsqueda.
- **Criterios de aceptación:**
  1. Dado que he consultado varios lotes, cuando abro «Mis lotes > Historial», entonces se muestra su identificador, producto y fecha de consulta.
  2. Dado que selecciono un lote del historial, cuando se abre el pasaporte, entonces corresponde al mismo identificador.
  3. Dado que todavía no hay consultas, cuando abro el historial, entonces veo un estado vacío comprensible.

### US17 — Consultar la lista de controles asociados al lote

- **Epic:** E03. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ver los controles asociados al lote para saber qué registros o evidencias están disponibles antes de comprar.
- **Criterios de aceptación:**
  1. Dado que el lote tiene controles asociados, cuando abro «Controles y evidencias», entonces debe mostrarse una lista de elementos disponibles.
  2. Dado que existen diferentes tipos de controles, cuando se listan, entonces deben identificarse por nombre y estado de disponibilidad.
  3. Dado que selecciono un control, cuando existe detalle, entonces debo acceder a su evidencia correspondiente.

### US18 — Consultar evidencia de recepción

- **Epic:** E03. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo consultar la evidencia de recepción asociada al lote para conocer si existe un registro de su ingreso o verificación en una etapa comercial.
- **Criterios de aceptación:**
  1. Dado que existe un registro de recepción, cuando selecciono ese control, entonces debe mostrarse la evidencia disponible.
  2. Dado que el registro incluye fecha o responsable/entidad, cuando se presenta, entonces esos datos deben mostrarse si están disponibles.
  3. Dado que la evidencia es solo un registro y no una certificación sanitaria, cuando se visualiza, entonces la interfaz no debe presentarla como garantía de inocuidad.

### US19 — Consultar certificaciones o documentos registrados

- **Epic:** E03. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo revisar certificaciones o documentos registrados para conocer qué respaldo documental está asociado al lote.
- **Criterios de aceptación:**
  1. Dado que existe un documento asociado, cuando abro su tarjeta, entonces deben mostrarse su tipo, entidad y fecha si están disponibles.
  2. Dado que el documento tiene vigencia registrada, cuando se muestra, entonces debe indicarse esa vigencia sin inferir validez fuera de la información disponible.
  3. Dado que no hay documento, cuando reviso la sección, entonces debe indicarse «Evidencia no disponible» y no ocultarse la ausencia.

### US20 — Consultar análisis de laboratorio asociado

- **Epic:** E03. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo revisar un análisis de laboratorio asociado al lote para conocer qué evidencia técnica está disponible.
- **Criterios de aceptación:**
  1. Dado que existe un análisis vinculado al lote, cuando lo selecciono, entonces debe mostrarse el código o identificador, fecha, entidad y tipo de análisis si están disponibles.
  2. Dado que la interfaz resume el documento, cuando se presenta el resultado, entonces no debe convertirlo en una afirmación médica o sanitaria distinta de lo registrado.
  3. Dado que el análisis proviene de un tercero, cuando se muestra, entonces debe identificarse la fuente correspondiente.

### US21 — Ver detalle de una evidencia

- **Epic:** E03. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo abrir el detalle de una evidencia para comprender qué documento es, quién lo emitió y a qué lote está asociado.
- **Criterios de aceptación:**
  1. Dado que selecciono una evidencia, cuando se abre el detalle, entonces debe mantenerse visible el vínculo con el lote consultado.
  2. Dado que existen metadatos del documento, cuando se muestra el detalle, entonces deben presentarse de forma estructurada.
  3. Dado que la evidencia tiene un alcance limitado, cuando se presenta, entonces debe incluirse una explicación breve que evite interpretaciones absolutas.

### US22 — Seguir lotes de interés

- **Epic:** E07. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor o comerciante, deseo marcar un lote para seguimiento a fin de recuperarlo y revisar posteriormente si existen novedades.
- **Criterios de aceptación:**
  1. Dado que estoy en un pasaporte, cuando selecciono «Seguir lote», entonces el lote queda en la sección «Mis lotes > Seguidos».
  2. Dado que ya sigo el lote, cuando selecciono «Dejar de seguir», entonces se elimina de los seguidos sin borrar su historial de consultas.
  3. Dado que no sigo ningún lote, cuando abro «Seguidos», entonces se indica que la lista está vacía.

### US23 — Identificar evidencia faltante o no disponible

- **Epic:** E03. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo saber cuándo una evidencia esperada no está disponible para no asumir que la ausencia significa que el control fue realizado.
- **Criterios de aceptación:**
  1. Dado que una evidencia no está disponible, cuando reviso la lista, entonces debe mostrarse un estado «No disponible» o equivalente.
  2. Dado que el dato está pendiente o incompleto, cuando se presenta, entonces debe diferenciarse de un documento verificado.
  3. Dado que la información es incompleta, cuando el usuario revisa el pasaporte, entonces la interfaz no debe rellenar el vacío con una conclusión de seguridad.

### US24 — Consultar alertas desde la aplicación

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo acceder a una sección de alertas para consultar si existe información relevante relacionada con los lotes que me interesan.
- **Criterios de aceptación:**
  1. Dado que estoy en la pantalla principal o en el pasaporte, cuando selecciono «Alertas», entonces debo acceder a la sección correspondiente.
  2. Dado que existen alertas registradas en las fuentes disponibles, cuando abro la sección, entonces deben mostrarse de forma ordenada.
  3. Dado que la información proviene de una fuente oficial o dato de demostración, cuando se presenta, entonces debe identificarse la fuente.

### US25 — Buscar un lote dentro de alertas

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo buscar el código de un lote en la sección de alertas para verificar si existe alguna coincidencia registrada.
- **Criterios de aceptación:**
  1. Dado que estoy en Alertas, cuando ingreso un código de lote, entonces el sistema debe buscar coincidencias en la información disponible.
  2. Dado que existe una coincidencia, cuando finaliza la búsqueda, entonces debe mostrarse el lote y el acceso al detalle de la alerta.
  3. Dado que no existe coincidencia, cuando finaliza la búsqueda, entonces debe mostrarse un mensaje que indique que no se encontró una coincidencia en las fuentes consultadas, sin afirmar que el producto es completamente seguro.

### US26 — Visualizar coincidencia entre lote y alerta

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo ver claramente cuando un lote coincide con una alerta registrada para identificar que debo revisar más información.
- **Criterios de aceptación:**
  1. Dado que existe una coincidencia, cuando se muestra el resultado, entonces debe destacarse el código del lote y la alerta relacionada.
  2. Dado que la coincidencia depende de una fuente, cuando se presenta, entonces debe mostrarse la fuente y la fecha disponibles.
  3. Dado que deseo conocer el contexto, cuando selecciono la coincidencia, entonces debo acceder al detalle de la alerta.

### US27 — Consultar el detalle de una alerta

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo consultar el detalle de una alerta relacionada con un lote para comprender qué información se reportó y qué alcance tiene.
- **Criterios de aceptación:**
  1. Dado que selecciono una alerta, cuando se abre el detalle, entonces debe mostrarse su descripción, fecha, estado y fuente si están disponibles.
  2. Dado que el alcance aplica a un lote, producto o periodo específico, cuando se presenta, entonces debe identificarse claramente.
  3. Dado que la aplicación resume la información, cuando se muestra el detalle, entonces no debe ampliar ni modificar el significado de la fuente original.

### US28 — Identificar la fuente de una alerta

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo identificar la fuente de una alerta para diferenciar información oficial de estimaciones o registros internos.
- **Criterios de aceptación:**
  1. Dado que una alerta proviene de una autoridad o fuente oficial, cuando se muestra, entonces debe etiquetarse como oficial.
  2. Dado que se utiliza información de demostración o controlada, cuando se presenta, entonces debe indicarse de forma explícita que es una simulación académica.
  3. Dado que existe un indicador predictivo, cuando se visualiza junto a alertas, entonces debe mantenerse separado y rotulado como estimación.

### US29 — Revisar avisos de cambios de lotes seguidos

- **Epic:** E07. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor o comerciante, deseo revisar avisos sobre cambios relevantes de los lotes seguidos para decidir si necesito volver a consultar su evidencia o alertas.
- **Criterios de aceptación:**
  1. Dado que sigo un lote y existe un cambio registrado en los datos de demostración, cuando abro «Mis lotes > Avisos», entonces veo el lote, tipo de cambio, fecha y fuente disponibles.
  2. Dado que selecciono un aviso, cuando se abre el detalle, entonces accedo al pasaporte o la alerta del mismo lote.
  3. Dado que el aviso contiene información simulada, cuando se presenta, entonces se identifica explícitamente su alcance académico.

### US30 — Recibir orientación sobre qué información revisar ante una alerta

- **Epic:** E04. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como consumidor, deseo recibir una orientación breve sobre qué información del lote revisar cuando exista una alerta para tomar una decisión informada.
- **Criterios de aceptación:**
  1. Dado que un lote coincide con una alerta, cuando se muestra el detalle, entonces deben sugerirse acciones informativas como revisar lote, fuente, fecha y alcance.
  2. Dado que la aplicación ofrece orientación, cuando se presenta, entonces no debe reemplazar instrucciones oficiales de la autoridad sanitaria.
  3. Dado que existe una fuente oficial asociada, cuando es posible, entonces debe priorizarse su referencia dentro del detalle.

### US31 — Interpretar una búsqueda sin coincidencias de alerta

- **Epic:** E04. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor, deseo entender correctamente cuando no se encuentra una alerta asociada a un lote para no confundir la ausencia de coincidencias con una certificación de seguridad.
- **Criterios de aceptación:**
  1. Dado que la búsqueda no encuentra coincidencias, cuando se muestra el resultado, entonces debe decir «No se encontraron coincidencias en las fuentes consultadas» o equivalente.
  2. Dado que no hay coincidencias, cuando se presenta el mensaje, entonces no debe afirmarse «producto seguro» o «libre de riesgos».
  3. Dado que el usuario desea continuar, cuando selecciona una acción disponible, entonces debe poder volver al pasaporte o realizar otra consulta.

### US32 — Escanear un lote al recibir mercadería

- **Epic:** E05. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como comerciante, deseo escanear el QR de un lote al recibir mercadería para identificarlo y verificar rápidamente la información registrada.
- **Criterios de aceptación:**
  1. Dado que estoy recibiendo mercadería, cuando selecciono «Escanear QR», entonces debe abrirse el lector.
  2. Dado que el lote se reconoce, cuando se muestra el resultado, entonces deben visualizarse los datos clave de identificación.
  3. Dado que el código no se reconoce, cuando falla el escaneo, entonces debo poder reintentar o ingresar el código manualmente.

### US33 — Revisar datos clave del lote durante la recepción

- **Epic:** E05. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como comerciante, deseo revisar producto, lote, procedencia, proveedor y fechas disponibles durante la recepción para contrastar la mercadería recibida con la información registrada.
- **Criterios de aceptación:**
  1. Dado que el lote fue identificado, cuando abro su información, entonces deben mostrarse los datos clave disponibles para la recepción.
  2. Dado que alguno de los datos está ausente, cuando se presenta la vista, entonces debe indicarse «No disponible».
  3. Dado que deseo más detalle, cuando selecciono trazabilidad o controles, entonces debo acceder a la sección correspondiente.

### US34 — Contrastar mercadería recibida con datos registrados

- **Epic:** E05. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como comerciante, deseo contrastar la mercadería recibida con los datos registrados del lote para detectar diferencias que requieran revisión.
- **Criterios de aceptación:**
  1. Dado que tengo el lote identificado, cuando reviso los datos registrados, entonces debo poder compararlos con la información física o documental recibida.
  2. Dado que detecto una diferencia, cuando marco la revisión, entonces la interfaz debe permitir registrar que existe una discrepancia sin declarar automáticamente un problema sanitario.
  3. Dado que no detecto diferencias, cuando finalizo la revisión, entonces puedo continuar con la consulta de controles o alertas.

### US35 — Registrar una verificación de recepción

- **Epic:** E05. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como comerciante, deseo registrar que revisé un lote recibido para mantener evidencia interna de la verificación realizada.
- **Criterios de aceptación:**
  1. Dado que terminé de revisar un lote, cuando selecciono «Registrar verificación», entonces debe registrarse un estado de revisión.
  2. Dado que registro la verificación, cuando vuelvo a consultar el lote, entonces debe mostrarse la fecha o estado de revisión disponible.
  3. Dado que el registro es interno del comerciante, cuando se presenta, entonces debe diferenciarse de una certificación o validación oficial.

### US36 — Consultar trazabilidad para responder a un cliente

- **Epic:** E05. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como comerciante, deseo consultar rápidamente la trazabilidad de un lote para responder preguntas de un cliente sobre origen, proveedor y controles.
- **Criterios de aceptación:**
  1. Dado que un cliente pregunta por un producto, cuando busco o escaneo el lote, entonces debo acceder rápidamente a su pasaporte.
  2. Dado que existe información disponible, cuando reviso el pasaporte, entonces debo poder identificar origen, proveedor y controles sin recorrer pantallas innecesarias.
  3. Dado que falta información, cuando respondo al cliente, entonces la interfaz debe mostrar la ausencia del dato en lugar de inferirlo.

### US37 — Compartir un resumen de trazabilidad

- **Epic:** E05. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como comerciante, deseo compartir un resumen de la trazabilidad de un lote para brindar al cliente acceso a la información disponible.
- **Criterios de aceptación:**
  1. Dado que estoy en el pasaporte de un lote, cuando selecciono «Compartir», entonces debe mostrarse una opción para compartir el enlace o referencia del lote.
  2. Dado que se comparte el resumen, cuando otra persona lo consulta, entonces debe mantener el identificador del mismo lote.
  3. Dado que el resumen contiene información predictiva, cuando se comparte, entonces debe conservarse su etiqueta de estimación y no presentarse como certificación.

### US38 — Consultar lotes revisados recientemente

- **Epic:** E05. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como comerciante, deseo consultar los lotes revisados recientemente para recuperar rápidamente información durante la atención o recepción.
- **Criterios de aceptación:**
  1. Dado que he consultado lotes previamente, cuando abro «Consultas recientes», entonces deben mostrarse los últimos lotes revisados.
  2. Dado que selecciono un lote reciente, cuando se abre, entonces debo acceder al pasaporte correcto.
  3. Dado que no existen consultas recientes, cuando abro la sección, entonces debe mostrarse un estado vacío comprensible.

### US39 — Detectar una alerta asociada a mercadería recibida

- **Epic:** E05. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como comerciante, deseo saber si un lote recibido coincide con una alerta registrada para revisar la mercadería y consultar la fuente correspondiente.
- **Criterios de aceptación:**
  1. Dado que reviso un lote recibido, cuando existe una coincidencia con una alerta disponible, entonces debe mostrarse una señal visible y el acceso al detalle.
  2. Dado que la coincidencia proviene de una fuente oficial o simulada, cuando se presenta, entonces debe identificarse su naturaleza.
  3. Dado que existe una coincidencia, cuando el comerciante revisa la alerta, entonces la aplicación debe orientar a verificar lote, fecha, alcance y fuente sin sustituir instrucciones oficiales.

### US40 — Visualizar una estimación predictiva del lote

- **Epic:** E06. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor o comerciante, deseo visualizar una estimación predictiva asociada al lote para identificar si requiere una revisión adicional sin interpretarla como una alerta oficial.
- **Criterios de aceptación:**
  1. Dado que existe una estimación generada con datos históricos o de demostración, cuando se muestra el indicador, entonces debe rotularse como «Estimación predictiva».
  2. Dado que el indicador tiene un nivel o categoría, cuando se presenta, entonces debe acompañarse de una explicación simple y no de una conclusión sanitaria absoluta.
  3. Dado que no existen datos suficientes, cuando se intenta calcular el indicador, entonces debe mostrarse que la estimación no está disponible.

### US41 — Consultar factores asociados a la estimación predictiva

- **Epic:** E06. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor o comerciante, deseo conocer los factores que influyen en una estimación predictiva para comprender por qué el sistema muestra ese resultado.
- **Criterios de aceptación:**
  1. Dado que existe una estimación, cuando selecciono «¿Por qué veo este resultado?», entonces deben mostrarse factores explicativos disponibles.
  2. Dado que los factores provienen de patrones históricos, cuando se presentan, entonces debe indicarse que no constituyen una certificación ni una alerta oficial.
  3. Dado que la información es insuficiente, cuando no se puede explicar un factor, entonces la interfaz no debe inventar una causa.

### US42 — Recibir una explicación asistida por IA en lenguaje claro

- **Epic:** E06. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor o comerciante, deseo recibir una explicación asistida por IA en lenguaje claro para comprender la información disponible del lote sin interpretar datos técnicos complejos.
- **Criterios de aceptación:**
  1. Dado que existen datos disponibles del lote, cuando solicito una explicación, entonces el módulo de explicación asistida por IA debe resumir únicamente la información disponible.
  2. Dado que hay datos predictivos, cuando la IA los explica, entonces debe mantener la etiqueta de estimación y diferenciarlos de fuentes oficiales.
  3. Dado que faltan datos, cuando la IA genera el resumen, entonces debe reconocer la ausencia en lugar de completar información no registrada.

### US43 — Distinguir predicción de alerta oficial

- **Epic:** E06. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como consumidor o comerciante, deseo distinguir visualmente una estimación predictiva de una alerta oficial para evitar interpretaciones equivocadas.
- **Criterios de aceptación:**
  1. Dado que una pantalla muestra una predicción y una alerta, cuando ambas aparecen, entonces deben utilizar etiquetas y jerarquías diferentes.
  2. Dado que la predicción no proviene de una autoridad, cuando se presenta, entonces debe indicar explícitamente «No es una alerta oficial».
  3. Dado que existe una alerta oficial o simulada, cuando se visualiza, entonces debe mostrar su fuente y mantenerse separada del indicador predictivo.

### US44 — Consultar patrones históricos agregados

- **Epic:** E06. **Tipo/alcance:** Funcional — Ampliación.
- **Descripción:** Como comerciante, deseo consultar patrones históricos agregados de lotes comparables para identificar tendencias que me ayuden a priorizar una revisión.
- **Criterios de aceptación:**
  1. Dado que existen datos históricos o simulados suficientes, cuando abro «Patrones históricos», entonces debe mostrarse un resumen comprensible.
  2. Dado que el análisis agrupa información de múltiples registros, cuando se presenta, entonces debe indicarse que se trata de un análisis agregado.
  3. Dado que el patrón no implica causalidad o incumplimiento, cuando se muestra, entonces la interfaz debe evitar afirmaciones concluyentes.

### US45 — Priorizar lotes para revisión mediante una estimación

- **Epic:** E06. **Tipo/alcance:** Funcional — Web prioritario.
- **Descripción:** Como comerciante, deseo priorizar qué lotes revisar primero usando una estimación de riesgo para enfocar mi atención sin reemplazar la verificación humana.
- **Criterios de aceptación:**
  1. Dado que existen varios lotes con estimaciones disponibles, cuando consulto la prioridad de revisión, entonces deben ordenarse o destacarse según el criterio definido.
  2. Dado que la prioridad es predictiva, cuando se presenta, entonces debe indicarse que sirve para priorización y no para declarar un lote como inseguro.
  3. Dado que no existen datos suficientes para un lote, cuando aparece en la lista, entonces debe mostrarse sin una prioridad predictiva o con estado «Sin datos suficientes».

### US46 — Mantener accesibilidad visual y operativa

- **Epic:** E08. **Tipo/alcance:** No funcional — Transversal.
- **Descripción:** Como usuario de Origen360, deseo que la interfaz sea perceptible y operable mediante textos legibles, controles identificables y estados comprensibles para consultar la información sin barreras innecesarias.
- **Criterios de aceptación:**
  1. Dado que el usuario visualiza una pantalla principal, cuando consulta textos, botones o tarjetas, entonces los elementos deben mantener una jerarquía legible y controles claramente identificables.
  2. Dado que un estado utiliza color para diferenciarse, cuando se muestra información declarada, verificada, oficial o predictiva, entonces el estado debe acompañarse también de texto o iconografía y no depender únicamente del color.

### US47 — Mantener consistencia visual y de navegación

- **Epic:** E08. **Tipo/alcance:** No funcional — Transversal.
- **Descripción:** Como usuario de Origen360, deseo encontrar patrones visuales y de navegación consistentes para comprender rápidamente cómo interactuar con la aplicación.
- **Criterios de aceptación:**
  1. Dado que el usuario navega entre las secciones principales, cuando encuentra botones, cards, etiquetas o acciones equivalentes, entonces estos elementos deben conservar una representación y comportamiento consistentes.
  2. Dado que el usuario regresa a una sección anterior, cuando utiliza los controles de navegación, entonces debe conservarse una estructura predecible acorde con el Design System definido.

### US48 — Recibir retroalimentación oportuna del sistema

- **Epic:** E08. **Tipo/alcance:** No funcional — Transversal.
- **Descripción:** Como usuario de Origen360, deseo recibir retroalimentación visible durante las consultas y acciones para conocer el estado del sistema y evitar incertidumbre.
- **Criterios de aceptación:**
  1. Dado que el usuario realiza un escaneo, búsqueda o consulta, cuando la acción está siendo procesada, entonces la interfaz debe mostrar un estado visible de procesamiento o respuesta.
  2. Dado que una operación finaliza con éxito, error o ausencia de resultados, cuando el sistema responde, entonces debe mostrarse un mensaje comprensible y, cuando corresponda, una acción para continuar.

### US49 — Adaptar la experiencia a plataforma y tamaño de pantalla

- **Epic:** E08. **Tipo/alcance:** No funcional — Transversal.
- **Descripción:** Como usuario de Origen360, deseo que la interfaz se adapte correctamente al dispositivo y plataforma utilizados para mantener una experiencia comprensible y usable.
- **Criterios de aceptación:**
  1. Dado que el producto se visualiza en diferentes tamaños de pantalla, cuando cambia el espacio disponible, entonces el contenido debe reorganizarse sin perder información esencial ni legibilidad.
  2. Dado que una funcionalidad se representa en la plataforma móvil principal y secundaria, cuando se adapta el componente, entonces debe respetar las convenciones visuales y de interacción definidas para cada plataforma.

### US50 — Preservar confiabilidad y transparencia de la información

- **Epic:** E08. **Tipo/alcance:** No funcional — Transversal.
- **Descripción:** Como usuario de Origen360, deseo que la información conserve su fuente, estado, fecha de actualización y nivel de evidencia para interpretar los datos sin confundir registros, estimaciones o información oficial.
- **Criterios de aceptación:**
  1. Dado que se muestra información de un lote, cuando el dato dispone de fuente, nivel de evidencia o fecha de actualización, entonces la interfaz debe conservar esa procedencia y diferenciar si es declarada, verificada, oficial o predictiva.
  2. Dado que un dato, su fecha de actualización o su nivel de verificación no están disponibles, cuando se presenta la sección correspondiente, entonces el sistema debe indicar la ausencia o limitación y no completar información no registrada.

## Formato de respuesta que debe entregar Codex (antes de implementar)

1. Diagnóstico por historia (las 30 web, una fila por ID): implementada / parcial / pendiente / bloqueada; prueba y evidencia de código; no inventar resultados.
2. Desglose de componentes reutilizables y archivos que se modificarían.
3. Dependencias y riesgos (QR, datos simulados, persistencia local, navegador móvil, predictivo y accesibilidad).
4. Plan por etapas que permita revisar diffs y probar cada grupo antes de continuar.
5. Lista de recursos gráficos o videos opcionales que aporten valor, con ubicación, dimensiones aproximadas y propósito.
6. Esperar autorización antes de editar.
