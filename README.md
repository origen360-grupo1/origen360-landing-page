# Origen360 Perú — Landing Page (Work-in-progress)

> **Para empezar en WebStorm:** abre la carpeta del proyecto y luego `public/index.html`. Las carpetas son similares a la práctica `16734` del profesor: `styles` equivale a `css`, `images` a `Imagenes` y `scripts` a `js`. La carpeta `videos` está creada como espacio opcional. Lee `COMIENZA_AQUI.txt` para verlo paso a paso. Conservamos la ruta `public/assets/` porque es obligatoria para el challenge.

## Información del proyecto
Proyecto académico del curso **IHC y Tecnologías Móviles (SI385)**, NRC **16734**, de la Universidad Peruana de Ciencias Aplicadas (UPC). Startup: **Origen360 Perú**.

Origen360 Perú es una propuesta de pasaporte digital por lote para facilitar la consulta del origen, la trazabilidad y la evidencia disponible sobre productos agrícolas frescos. Busca que los usuarios comprendan la procedencia del producto, los respaldos documentados y la diferencia entre información registrada, oficial y estimaciones algorítmicas.

> **Estado actual:** Landing Page en desarrollo para el challenge de participación. Las vistas, códigos y datos utilizados en la demostración son ilustrativos. No existe conexión con una base de datos, reconocimiento QR real, certificados reales ni motor de Machine Learning en este avance.

## Autores — Grupo 1
Integrantes identificados en el informe del proyecto proporcionado por el equipo:
- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Yopla Romero, Jonathan Alberto
- Castillo Bengoa, Sebastián Alejandro

## Segmentos objetivo
1. **Consumidores de productos agrícolas frescos:** necesitan consultar información clara sobre procedencia, recorrido y respaldo de un lote durante la compra.
2. **Comerciantes y responsables de recepción/abastecimiento:** necesitan comprobar rápidamente el origen, proveedor y evidencia vinculados a la mercadería.

## Principales características propuestas
- Consulta de lotes por código manual o QR (en desarrollo).
- Pasaporte digital con información de origen y producto.
- Visualización de etapas de trazabilidad.
- Consulta de evidencia y controles, diferenciando su nivel de respaldo.
- Alertas por lote, con fuente y alcance.
- Analítica preventiva como estimación, sin presentarla como certificación oficial.

## Contenido implementado en este avance
- Encabezado con navegación por secciones.
- Hero con propuesta de valor y tarjeta demostrativa del pasaporte digital.
- Sección del problema, cuatro beneficios, tres pasos de funcionamiento.
- Segmentos objetivo, tecnologías propuestas, llamado a la acción y pie de página.
- Diseño adaptable a escritorio, tablet y móvil (CSS media queries).
- Menú móvil y formulario de consulta de un **lote ficticio** usando JavaScript.

## Tecnologías utilizadas
- HTML5
- CSS3 (Flexbox, Grid y media queries)
- JavaScript (sin frameworks)

No se utiliza Bootstrap, Materialize, Foundation ni otros frameworks CSS.

## Estructura del proyecto
```text
Origen360_LandingPage_Challenge/
├── README.md
├── COMIENZA_AQUI.txt
├── .gitignore
└── public/
    ├── index.html
    ├── favicon.ico
    └── assets/
        ├── styles/
        │   └── styles.css
        ├── images/
        │   └── referencia-mockup-origen360.png
        ├── scripts/
        │   └── main.js
        └── videos/
            └── .gitkeep (carpeta opcional, sin videos todavía)
```

## Cómo ejecutar
1. Abrir esta carpeta en WebStorm.
2. Abrir `public/index.html` en el navegador (clic derecho → Open in Browser).
3. Verificar que carguen los estilos y el menú móvil.
4. Para probar la demostración, ir a **Ver demostración** y consultar `O360-DEMO-001`.

## GitFlow
- `main`: rama principal.
- `develop`: rama de integración.
- `feature/landing-page-inicial`: implementación de la estructura HTML.
- `feature/diseno-responsive`: estilos y adaptabilidad.
- `feature/interacciones-basicas`: navegación y demostración de JavaScript.

**Convención:** cada nueva funcionalidad se crea con `feature/nombre-descriptivo` desde `develop`; luego se integra en `develop` mediante merge o pull request.

## Referencia de diseño
El archivo `public/assets/images/referencia-mockup-origen360.png` proviene del mock-up de la sección **4.3.2 Landing Page Mock-up** del informe del proyecto. Se usa únicamente como referencia de diseño; el sitio se implementa mediante elementos reales HTML y CSS.

## Repositorio y organización
Completar una vez publicada la entrega:
- URL del repositorio: `PENDIENTE_DE_GITHUB`
- Organización: `PENDIENTE_DE_GITHUB`

## Observación
Este repositorio representa un avance académico. No debe interpretarse como un producto disponible ni como un sistema de verificación de inocuidad operativo.


## Logo del proyecto

El logotipo oficial `public/assets/images/logo-origen360.png` se utiliza en el encabezado y en el pie de página. El `favicon.ico` se ha actualizado utilizando el ícono del mismo logotipo.
