# Origen360 Perú

Landing page académica de **trazabilidad alimentaria por lotes**. Muestra cómo un «pasaporte digital» puede reunir el origen, el recorrido y las evidencias de un alimento para que consumidores y comerciantes lo consulten en un solo lugar.

> Proyecto universitario del Challenge *Landing Page Work-in-progress* (UPC). **Todos los datos son ficticios.** No es un servicio real ni certifica la inocuidad de ningún producto.

**Repositorio:** [origen360-grupo1/origen360-landing-page](https://github.com/origen360-grupo1/origen360-landing-page) · **Sitio:** [origen360-grupo1.github.io/origen360-landing-page](https://origen360-grupo1.github.io/origen360-landing-page/)

## Contenido

1. [Equipo y contexto académico](#1-equipo-y-contexto-académico)
2. [Problema y solución](#2-problema-y-solución)
3. [Segmentos objetivo](#3-segmentos-objetivo)
4. [Funcionalidades](#4-funcionalidades)
5. [Tecnologías y arquitectura](#5-tecnologías-y-arquitectura)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Ejecución local](#7-ejecución-local)
8. [Pruebas](#8-pruebas)
9. [Datos académicos y limitaciones](#9-datos-académicos-y-limitaciones)
10. [Créditos, procedencia y uso de IA](#10-créditos-procedencia-y-uso-de-ia)
11. [Flujo de trabajo y despliegue](#11-flujo-de-trabajo-y-despliegue)

## 1. Equipo y contexto académico

- **Universidad:** Universidad Peruana de Ciencias Aplicadas (UPC).
- **Curso:** IHC y Tecnologías Móviles (SI385) · **NRC:** 16734 · **Grupo:** 1.
- **Organización de GitHub:** [origen360-grupo1](https://github.com/origen360-grupo1).

**Integrantes**

- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Castillo Bengoa, Sebastián Alejandro

Las contribuciones de cada integrante pueden consultarse en el historial de commits y en GitHub Insights.

## 2. Problema y solución

**Problema.** Durante una compra o la recepción de mercadería, conocer el origen y las evidencias de un lote no siempre es sencillo: la información suele estar dispersa en registros separados.

**Solución.** Una demostración funcional que permite buscar un lote, confirmarlo y abrir su pasaporte digital: procedencia, trazabilidad, evidencias, alertas y un análisis preventivo simulado. En cada dato se indican su fuente, su alcance y las ausencias, sin presentar la falta de coincidencias como garantía.

## 3. Segmentos objetivo

- **Consumidores:** consultan el origen y el recorrido de un producto, diferenciando datos declarados, simulados y ausentes.
- **Comerciantes y responsables de abastecimiento:** revisan un lote durante la recepción y guardan una revisión interna simulada en su navegador.

## 4. Funcionalidades

- **Consulta de lotes** por código o nombre de producto, con ejemplos directos y confirmación del lote antes de abrir su pasaporte.
- **Escaneo de QR** con la cámara cuando el navegador lo permite, con ingreso manual del código como alternativa.
- **Pasaporte digital** de cinco paneles: origen, trazabilidad, evidencias, alertas y análisis preventivo.
- **Trazabilidad** por etapas del recorrido, con fecha, fuente y nivel de cada evento.
- **Alertas de demostración** con fuente y alcance.
- **Análisis preventivo simulado** con factores y explicación (regla documental, sin IA ni modelos).
- **Recepción comercial** guiada en tres pasos, con registro de revisión interna guardado en `localStorage`.
- **Videos ilustrativos** (cosecha, distribución y mercado), que solo se descargan al reproducirlos.
- **Diseño responsive** para móvil, tableta y escritorio.

**Lotes de demostración**

| Código | Producto |
|---|---|
| `O360-DEMO-001` | Palta Hass |
| `O360-DEMO-002` | Café en grano |

El segundo lote incluye registros parciales o ausentes para ilustrar cómo se comunican esos casos.

**Accesibilidad.** Enlace para saltar al contenido, idioma declarado, navegación por teclado con foco visible (pestañas con flechas, `Inicio` y `Fin`, menú con `Escape`), roles ARIA y regiones `aria-live` para mensajes de estado, controles táctiles de al menos 48 px, texto de apoyo de 14 px o más, y respeto de la preferencia de movimiento reducido y de colores forzados. No se declara cumplimiento integral de WCAG: no se han hecho pruebas con lectores de pantalla, dispositivos físicos ni personas usuarias.

La sección «Nuestra visión tecnológica» describe capacidades futuras (Big Data, Machine Learning, IA aplicada). **No están implementadas.**

## 5. Tecnologías y arquitectura

- **HTML5, CSS3 y JavaScript nativo.** Sin frameworks, sin dependencias de ejecución y sin servidor propio.
- **Git, GitHub, GitHub Actions y GitHub Pages** para versionado, validación y publicación.
- **Node.js** (solo desarrollo) para las pruebas automáticas y el preflight de publicación.

**Arquitectura.** Es una aplicación estática de una sola página:

- `public/index.html`: estructura y contenido de la landing, la consulta, el pasaporte y la recepción.
- `public/assets/styles/styles.css`: estilos, con colores, tipografía y espaciados definidos como variables CSS.
- `public/assets/scripts/main.js`: datos de demostración, búsqueda y confirmación, pasaporte y sus paneles, recepción, escaneo QR y estados de los videos.
- Sin backend: los datos son un conjunto fijo dentro de `main.js` y las revisiones de recepción se guardan en `localStorage` del navegador.

## 6. Estructura del proyecto

```text
origen360-landing-page/
├── .github/
│   └── workflows/
│       └── pages.yml
├── docs/
│   ├── github-pages.md
│   └── matriz-aceptacion.md
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       ├── scripts/
│       │   └── main.js
│       ├── styles/
│       │   └── styles.css
│       └── videos/
├── scripts/
│   └── check-pages.mjs
├── tests/
│   ├── helpers/
│   ├── functional.test.mjs
│   ├── technical.test.mjs
│   └── run.mjs
├── .gitattributes
├── .gitignore
├── Origen360_Requisitos_Codex_AV2.md
└── README.md
```

Solo `public/` se publica en GitHub Pages. `Origen360_Requisitos_Codex_AV2.md` contiene las historias de usuario y sus criterios; `docs/matriz-aceptacion.md` los relaciona con las pruebas.

## 7. Ejecución local

1. Clonar el repositorio.
2. Servir `public/` con cualquier servidor estático. Por ejemplo, con Python 3:

   ```bash
   python -m http.server 8080 --directory public
   ```

   y abrir `http://localhost:8080`. También puede abrirse `public/index.html` directamente; el escaneo con cámara solo está disponible en `localhost` o HTTPS.
3. Las revisiones de recepción se guardan en el navegador y origen en uso: no se comparten entre equipos ni entre `file:`, `localhost` y GitHub Pages.

## 8. Pruebas

Requieren Node.js 20 o superior:

```bash
node tests/run.mjs            # 44 pruebas: 36 funcionales y 8 técnicas
node scripts/check-pages.mjs  # preflight de publicación en GitHub Pages
```

- **Funcionales (36):** ejecutan `main.js` en un entorno DOM simulado y cubren búsqueda y confirmación, pasaporte y sus cinco paneles, evidencias y ausencias, alertas, análisis, recepción y persistencia, QR con detector simulado, menú y estados de video (incluida la carga bajo demanda).
- **Técnicas (8):** sintaxis y estructura HTML, referencias locales y ARIA, integridad del conjunto de datos, reglas responsive del QR, contraste del foco, integridad de los recursos originales y de las historias de usuario, y cobertura de la matriz de aceptación.
- **Preflight:** comprueba que todo lo publicado usa rutas relativas válidas bajo un subdirectorio, sin dependencias externas.
- **Pendiente de verificación manual:** lectores de pantalla, dispositivos físicos, cámara real y otros navegadores. Las pruebas automáticas no sustituyen esas revisiones.

## 9. Datos académicos y limitaciones

- Datos y registros **ficticios**; no hay verificaciones sanitarias oficiales ni certificaciones.
- Sin backend, base de datos ni sincronización.
- El escaneo de QR depende de `getUserMedia`, `BarcodeDetector` y un contexto seguro (HTTPS o `localhost`); si no están disponibles, se puede escribir el código.
- Los videos son ilustrativos: muestran actividades agrícolas generales y no documentan los lotes de ejemplo. Pesan en conjunto unos 62 MB.
- Las funcionalidades de «visión tecnológica» son propuestas futuras.

## 10. Créditos, procedencia y uso de IA

- **Logo oficial y videos ilustrativos:** son recursos del proyecto y se usan con fines académicos. El repositorio no incluye un registro de su autoría ni de su licencia; si se reutilizan fuera de este contexto, deben confirmarse sus derechos.
- **Portadas de los videos:** son fotogramas de los propios clips.
- **Imágenes de las tarjetas «Comerciantes» y «Consumidores»:** imágenes conceptuales **generadas con IA**; no representan lotes, productores ni personas reales. La página lo indica junto a cada una.
- **Herramientas de IA:** se utilizaron asistentes de IA como apoyo en partes del desarrollo, las pruebas y la documentación. Los commits correspondientes lo indican con `Co-Authored-By`.

## 11. Flujo de trabajo y despliegue

**Git.** Convención GitFlow: `main` (versión estable), `develop` (integración) y ramas `feature/*` por tarea, integradas primero en `develop` y luego en `main`.

**Publicación.** El workflow `.github/workflows/pages.yml` se ejecuta manualmente: con `publish` desmarcado solo valida (pruebas y preflight); con `publish` marcado despliega únicamente `public/` desde `main`. Detalles en [docs/github-pages.md](docs/github-pages.md).
