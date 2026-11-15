# Origen360 Perú

Plataforma académica de trazabilidad alimentaria por lotes: una landing page interactiva que muestra cómo un «pasaporte digital» podría reunir el origen, el recorrido y las evidencias de un alimento. **Todos los datos son ficticios.**

> Proyecto universitario desarrollado para el Challenge *Landing Page Work-in-progress*. No es un servicio real ni certifica la inocuidad de ningún producto.

## 1. Problema y objetivo

**Problema.** Durante una compra o la recepción de mercadería, conocer el origen y las evidencias de un lote no siempre es sencillo: la información suele estar dispersa en registros separados.

**Objetivo.** Mostrar, con una demostración funcional, cómo consultar un lote y leer en un solo lugar su procedencia, recorrido, evidencias, alertas y un análisis preventivo, dejando siempre visibles la fuente de cada dato y sus límites.

## 2. Organización

- **Universidad:** Universidad Peruana de Ciencias Aplicadas (UPC).
- **Curso:** IHC y Tecnologías Móviles (SI385).
- **NRC:** 16734.
- **Organización:** [origen360-grupo1](https://github.com/origen360-grupo1).
- **Repositorio:** [origen360-landing-page](https://github.com/origen360-grupo1/origen360-landing-page).
- **Sitio (GitHub Pages):** [Visitar Origen360 Perú](https://origen360-grupo1.github.io/origen360-landing-page/).

## 3. Integrantes

- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Yopla Romero, Jonathan Alberto
- Castillo Bengoa, Sebastián Alejandro

*Lista tomada del README anterior; su confirmación definitiva está pendiente.*

## 4. Segmentos objetivo

- **Consumidores:** consultan el origen y el recorrido de un producto, diferenciando datos declarados, simulados y ausentes.
- **Comerciantes y responsables de abastecimiento:** revisan un lote durante la recepción y guardan una revisión interna simulada en su navegador.

## 5. Funcionalidades

- **Consulta de lotes** por código o nombre de producto, con ejemplos directos y confirmación del lote antes de abrir su pasaporte.
- **Escaneo de QR** mediante la cámara cuando el navegador lo permite, con ingreso manual del código como alternativa (ver sección 9).
- **Pasaporte digital** de cinco paneles: origen, trazabilidad, evidencias, alertas y análisis preventivo.
- **Trazabilidad** por etapas del recorrido, con fecha, fuente y nivel de cada evento.
- **Alertas de demostración** con fuente y alcance; la ausencia de coincidencias no se presenta como garantía.
- **Análisis preventivo simulado**, con factores y explicación. No usa IA ni modelos conectados.
- **Recepción comercial** guiada en tres pasos, con registro de revisión interna guardado localmente (`localStorage`).
- **Videos ilustrativos** (cosecha, distribución y mercado), que solo se descargan al reproducirlos.
- **Diseño responsive** que se adapta a pantallas de móvil, tableta y escritorio.

La sección «Nuestra visión tecnológica» de la página describe capacidades futuras (Big Data, Machine Learning, IA aplicada). **No están implementadas.**

### Accesibilidad

Medidas aplicadas en el código:

- Enlace para saltar al contenido, idioma de la página declarado y estructura de encabezados.
- Navegación por teclado, con foco visible, pestañas del pasaporte accesibles con flechas, `Inicio` y `Fin`, y menú móvil que se cierra con `Escape`.
- Pestañas con roles ARIA y mensajes de estado (por ejemplo, los de carga de video) anunciados mediante regiones `aria-live`.
- Controles táctiles de al menos 48 px y texto de apoyo de 14 px o más.
- Respeto de la preferencia de movimiento reducido y de los colores forzados del sistema.
- Videos con controles nativos y carga bajo demanda.

Estas medidas se revisaron con pruebas automáticas y en un navegador de escritorio. **No se declara cumplimiento integral de WCAG**: no se han hecho pruebas con lectores de pantalla, dispositivos físicos ni personas usuarias.

## 6. Lotes de demostración

| Código | Producto |
|---|---|
| `O360-DEMO-001` | Palta Hass |
| `O360-DEMO-002` | Café en grano |

Sus datos, fuentes y evidencias son inventados para la demostración. El segundo lote incluye registros parciales o ausentes para ilustrar cómo se comunican esos casos.

## 7. Tecnologías

- **HTML5, CSS3 y JavaScript nativo.** Sin frameworks, sin dependencias de ejecución y sin servidor propio.
- **Git, GitHub, GitHub Actions y GitHub Pages** para versionado y publicación.
- **Node.js** (solo para desarrollo) para ejecutar las pruebas automáticas y el preflight de publicación.

## 8. Ejecutar localmente

1. Clonar el repositorio.
2. Servir la carpeta `public/` con cualquier servidor estático y abrir la dirección local. Por ejemplo, con Python 3:

   ```bash
   python -m http.server 8080 --directory public
   ```

   y abrir `http://localhost:8080`. También puede abrirse `public/index.html` directamente; el escaneo con cámara solo está disponible en `localhost` o HTTPS.
3. Las revisiones de recepción se guardan en el navegador y origen en uso: no se comparten entre equipos ni entre `file:`, `localhost` y GitHub Pages.

**Pruebas** (Node.js 20 o superior):

```bash
node tests/run.mjs            # pruebas funcionales y técnicas
node scripts/check-pages.mjs  # preflight de publicación en GitHub Pages
```

## 9. Limitaciones académicas

- Datos y registros **ficticios**; no hay verificaciones sanitarias oficiales ni certificaciones.
- Sin backend, base de datos ni sincronización: las revisiones de recepción viven solo en el navegador.
- El escaneo de QR depende de `getUserMedia`, `BarcodeDetector` y un contexto seguro (HTTPS o `localhost`). Si no están disponibles, se muestra un mensaje y se puede escribir el código.
- Los videos son ilustrativos: muestran actividades agrícolas generales y no documentan los lotes de ejemplo. Pesan en conjunto unos 62 MB.
- **Imágenes:** las fotografías de las tarjetas «Comerciantes» y «Consumidores» son imágenes conceptuales **generadas con IA**; no representan lotes, productores ni personas reales, y la página lo indica junto a cada una. Las portadas de los videos son fotogramas de los propios clips.

## 10. Estructura del proyecto

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

Solo `public/` se publica en GitHub Pages. La documentación técnica se conserva en [docs/](docs/).

## 11. Flujo de trabajo en Git

El proyecto sigue la convención GitFlow:

- `main`: versión estable y publicable.
- `develop`: rama de integración.
- `feature/*`: una rama por tarea, que se integra primero en `develop`.
- `develop` se lleva a `main` en cada entrega.

Flujo previsto para la siguiente integración: una rama `feature/*` hacia `develop`, y después `develop` hacia `main`, mediante Pull Requests.

## 12. Publicación

El workflow `.github/workflows/pages.yml` se ejecuta manualmente: con `publish` desmarcado solo valida (pruebas y preflight) y con `publish` marcado despliega únicamente `public/` desde `main`. Detalles en [docs/github-pages.md](docs/github-pages.md).
