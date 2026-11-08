# Origen360 Perú

## 1. Descripción del proyecto

Origen360 Perú es una plataforma académica de trazabilidad alimentaria por lotes.
Su propuesta de pasaporte digital reúne la procedencia, los actores y el recorrido
de un producto para facilitar la consulta de información durante su compra o recepción.

La demostración utiliza datos simulados: no certifica la inocuidad de los productos
ni representa verificaciones sanitarias oficiales.

## 2. Organización

- **Universidad:** Universidad Peruana de Ciencias Aplicadas (UPC).
- **Curso:** IHC y Tecnologías Móviles (SI385).
- **NRC:** 16734.
- **Organización:** [origen360-grupo1](https://github.com/origen360-grupo1).
- **Repositorio:** [origen360-landing-page](https://github.com/origen360-grupo1/origen360-landing-page).
- **Landing:** [Visitar Origen360 Perú](https://origen360-grupo1.github.io/origen360-landing-page/).

## 3. Autores

- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Yopla Romero, Jonathan Alberto
- Castillo Bengoa, Sebastián Alejandro

## 4. Segmentos objetivo

- **Consumidores:** personas que buscan conocer la procedencia y el recorrido de los alimentos.
- **Comerciantes o responsables de abastecimiento:** personas que consultan lotes durante la recepción y comercialización de mercadería.

## 5. Características principales

- Consulta de lotes por identificador o nombre de producto.
- Escaneo QR nativo según la compatibilidad del navegador, con alternativa manual.
- Pasaporte digital con resumen, origen, productor y proveedor diferenciados.
- Trazabilidad interactiva por etapas del recorrido del lote.
- Consulta de controles, evidencias documentales y registros de laboratorio académicos.
- Alertas de demostración con fuente, alcance y detalle asociado al lote.
- Recepción comercial guiada y registro de revisión interna simulada en el navegador.
- Análisis preventivo simulado con factores, explicaciones y prioridades de revisión.

Las estimaciones son demostraciones académicas, sin IA conectada ni valor de alerta sanitaria oficial.

## 6. Tecnologías utilizadas

**HTML5, CSS3 y JavaScript nativo** para la interfaz, sin frameworks ni backend.
**Git, GitHub, GitHub Actions y GitHub Pages** para versionado y despliegue;
**Node.js** para ejecutar las pruebas y comprobaciones del proyecto.

## 7. Estructura del proyecto

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
├── .gitignore
├── Origen360_Requisitos_Codex_AV2.md
└── README.md
```

La documentación técnica se conserva en [docs/](docs/).
