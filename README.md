# Origen360 Perú — Landing Page (Work-in-progress)

**Proyecto académico:** IHC y Tecnologías Móviles (SI385) · NRC 16734 · Grupo 1 · UPC.  
**Estado:** avance de implementación con HTML, CSS y JavaScript (sin frameworks CSS).  
**Importante:** todas las fichas de lotes de esta página son ficticias; no existe conexión con una base de datos, sistema QR real, certificaciones ni un motor de inteligencia artificial.

## ¿Qué es Origen360 Perú?

Origen360 Perú es una propuesta de **pasaporte digital de productos agrícolas por lote**, que busca reunir su origen, recorrido y evidencias documentadas para consultas claras en la cadena de abastecimiento.

## Integrantes — Grupo 1

- Gaviria Huaman, Gian Franco
- Paredes Ortega, Cristhian
- Rojas Tutushima, Jaden Gabriel
- Yopla Romero, Jonathan Alberto
- Castillo Bengoa, Sebastián Alejandro

> Estos nombres corresponden a los integrantes declarados en el informe del proyecto. Los commits de preparación no atribuyen trabajo nuevo a quienes no lo realizaron.

## Segmentos objetivo

- **Consumidores de productos agrícolas frescos:** necesitan comprender la procedencia del alimento y consultar su recorrido antes de comprar.
- **Comerciantes y personal de recepción/abastecimiento:** necesitan consultar códigos de lote, datos de origen y respaldos de la mercadería recibida.

## Características principales propuestas

- Búsqueda manual o futura lectura QR de códigos de lote.
- Pasaporte digital con producto, origen, fechas y etapas de trazabilidad.
- Evidencia documentada por lote y alertas contextualizadas según sus fuentes.
- Explicaciones claras para consumidores y comerciantes.
- Analítica preventiva futura, diferenciada de certificaciones oficiales.

## Lo que ya funciona en este avance

1. **Landing Page responsive** con navegación, presentación, beneficios, pasos de uso, públicos objetivo y tecnología futura.
2. **Logo oficial y favicon** de Origen360 Perú.
3. **Consulta interactiva local**, con dos códigos de ejemplo que muestran un pasaporte y cuatro etapas de recorrido.
4. **Mensajes de error claros** cuando se consulta un código inexistente.
5. **Accesibilidad básica:** enlace para saltar contenido, etiquetas HTML, navegación con teclado, menú móvil cerrable con Escape y mensajes anunciados mediante `aria-live`.
6. **Galería de tres videos** con portadas ilustrativas; cuando se colocan los archivos MP4 se muestran los reproductores HTML5.
7. Diseño implementado con **HTML5 + CSS3 (Flexbox, Grid, media queries) + JavaScript puro**, tal como se pide en el challenge.

## Probar la consulta

En WebStorm abre `public/index.html` con el navegador. Busca **Explora un pasaporte digital** y usa uno de estos códigos:

- `O360-DEMO-001` → Palta Hass, datos totalmente simulados.
- `O360-DEMO-002` → Café en grano, datos totalmente simulados.

La ficha se genera con objetos de JavaScript en `public/assets/scripts/main.js`. No se utiliza servidor ni API externa.

## Carpetas (según las instrucciones del challenge)

```text
Origen360_LandingPage_MEJORADO/
├── README.md
├── COMIENZA_AQUI.txt
├── GUIA_ENTREGA.md
├── ANALYTICS_OPCIONAL.md
├── .gitignore
├── .github/
│   └── workflows/
│       └── publicar-pages.yml   (publicación opcional, manual)
└── public/
    ├── index.html
    ├── favicon.ico
    └── assets/
        ├── styles/
        │   └── styles.css
        ├── images/
        │   ├── logo-origen360.png
        │   ├── referencia-mockup-origen360.png
        │   └── portada-cosecha.svg, portada-distribucion.svg, portada-mercado.svg
        ├── scripts/
        │   └── main.js
        └── videos/
            └── COMO_AGREGAR_VIDEOS.txt (coloca aquí los MP4)
```

Los nombres de carpetas son los establecidos por el challenge, aunque en la práctica del profesor se utilizaron `css`, `Imagenes`, `js` y `videos` directamente junto a `index.html`.

## Cómo añadir los videos

Descarga los clips adecuados de Pexels o de otra fuente con licencia de uso y guárdalos en `public/assets/videos/`, con estos nombres exactos:

| Video | Archivo |
|---|---|
| Cultivo y cosecha | `campo-cosecha.mp4` |
| Distribución y entrega | `distribucion.mp4` |
| Mercado y consumidor | `mercado.mp4` |

Los posters ilustrativos se muestran incluso si todavía no has descargado MP4. Sigue `public/assets/videos/COMO_AGREGAR_VIDEOS.txt`. Los videos no constituyen evidencias reales sobre productos del proyecto.

## Git y GitFlow

El proyecto incluye historial Git **local**. Rama de producción `main`, de integración `develop` y ramas `feature/...` creadas desde `develop`. Los cambios nuevos deben hacerse primero en una rama de feature; después se integran a `develop` y luego a `main`.

```bash
git branch
git log --all --oneline --graph
```

> **Repositorio remoto:** todavía no se ha creado ni transferido. Completa estos pasos desde la cuenta del equipo, según `GUIA_ENTREGA.md`.

## GitHub Pages (opcional)

El challenge solicita el enlace al **repositorio**. Si quieres publicar también la web, se ha preparado `.github/workflows/publicar-pages.yml`: un workflow manual de GitHub Actions que publica solo la carpeta `public`, respetando la estructura exigida. Debes crear el repositorio, elegir **Settings → Pages → Source: GitHub Actions** y ejecutar el workflow desde Actions. El sitio NO se ha publicado desde este ZIP.

## Web Analytics

Google Analytics **no está activo**. No se incorpora código de seguimiento ni cookies en la demo por defecto; faltan una cuenta/ID de medición del equipo y la configuración de privacidad. En `ANALYTICS_OPCIONAL.md` se explica cómo incorporarlo correctamente después de la publicación, si el curso lo requiere.

## Referencia de diseño y observaciones

La vista general parte del mock-up de la sección 4.3.2 del informe de Origen360. La implementación se realiza mediante HTML/CSS reales y contenido propio del proyecto. Los videos y las portadas son ilustrativos, no testimonios ni verificaciones. El contenido definitivo, la seguridad y la exactitud de la trazabilidad deberán validarse en futuras entregas.

**Repositorio:** pendiente de GitHub. **Organización:** pendiente de GitHub.
