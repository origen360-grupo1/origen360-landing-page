# Preparación técnica de GitHub Pages

Configuración de publicación del sitio estático. La publicación se realiza únicamente mediante el workflow manual descrito abajo; este documento no registra una ejecución. Las pruebas manuales de aceptación se documentan en `docs/matriz-aceptacion.md`.

## Repositorio

- Repositorio: `https://github.com/origen360-grupo1/origen360-landing-page`.
- Rama predeterminada: **main**. El repositorio es público.
- La validación en CI necesita en el repositorio las pruebas, los requisitos y la matriz de aceptación, aunque no se publiquen como parte del sitio.

El workflow, este documento y el validador de rutas no modifican `public/`, sus datos, los requisitos ni las pruebas.

## Contenido y rutas

El documento principal es `public/index.html`. Sus CSS, JavaScript, favicon, imágenes y videos utilizan rutas relativas. Las referencias CSS se resuelven desde `assets/styles/styles.css`; no necesitan una ruta absoluta al dominio ni un valor `base` específico.

URL prevista con el nombre actual del repositorio:

```text
https://origen360-grupo1.github.io/origen360-landing-page/
```

Es una URL propuesta, no una publicación verificada. La URL efectiva debe tomarse del resultado del futuro despliegue. La carpeta `public/` se convierte en la raíz del artefacto: no se añade `/public/` a la URL.

En la última comprobación local, el preflight verificó **20 archivos publicables**, **68 referencias locales** en dos prefijos de repositorio y **cero dependencias de recursos externos**. Incluye las anclas del HTML, las rutas de fondos CSS y el uso exacto de mayúsculas/minúsculas. No realiza peticiones a la URL propuesta.

| Recurso | Incluido en Pages |
|---|---|
| `public/index.html` y `public/favicon.ico` | Sí, en la raíz del sitio. |
| `public/assets/scripts/`, `styles/`, `images/` y los tres MP4 | Sí, conservando sus rutas relativas. |
| `public/assets/videos/.gitkeep` | No es necesario; la acción de empaquetado excluye dotfiles. |
| `tests/`, `docs/`, README, requisitos, `.github/` y `.idea/` | No: están fuera de `public/`. |

Excluir documentación del artefacto de Pages no la convierte en privada: los archivos que se incorporen a este repositorio público seguirán siendo accesibles desde GitHub Code.

## Workflow

Archivo: [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

1. Solo se inicia mediante **workflow_dispatch**. No hay despliegues automáticos al hacer push.
2. La entrada **publish** es booleana y su valor por defecto es **false**.
3. Con `publish=false`, solo valida. No configura Pages, sube artefactos ni ejecuta el job de despliegue.
4. La validación usa Ubuntu y Node 24, sin `npm install`: ejecuta `node tests/run.mjs` y `node scripts/check-pages.mjs`.
5. Con `publish=true`, solo permite la rama predeterminada del repositorio, actualmente `main`. Otra rama produce error antes de publicar.
6. El job de despliegue depende de la validación y obtiene exactamente el mismo SHA del evento. Usa `configure-pages`, `upload-pages-artifact` con `path: public/` y `deploy-pages`.
7. Solo el job de publicación tiene `pages: write` e `id-token: write`; la validación utiliza `contents: read`. No se requiere un PAT ni secretos adicionales.
8. Se utiliza el entorno `github-pages` y una sola ejecución concurrente. El flujo no activa Pages por sí mismo (`enablement: false`).

No hay build de aplicación, Jekyll, rama `gh-pages`, dominio propio ni servicios de backend. No hace falta trasladar el proyecto a `/docs` ni a la raíz del repositorio.

## Comprobaciones locales

Con Node 20 o posterior disponible, desde la raíz:

```text
node tests/run.mjs
node scripts/check-pages.mjs
```

Resultado actual: **44/44 pruebas satisfactorias** (36 funcionales y 8 técnicas) y **preflight correcto**. Una ejecución anterior de esta configuración, con 27 pruebas funcionales y 8 técnicas, dio 35/35.

El validador de Pages es de solo lectura y no genera un build o archivo comprimido. Comprueba:

- `index.html` en la raíz publicable y todos los recursos relativos presentes.
- Resolución de referencias con el prefijo real propuesto y otro nombre de repositorio, sin salir del subdirectorio.
- Anclas existentes y nombres sensibles a mayúsculas, incluso ejecutándolo sobre Windows.
- Ausencia de rutas ancladas a `/`, recursos HTTP mixtos, dependencias de red no previstas y enlaces simbólicos/físicos dentro de `public/`.
- Exclusión de documentación, tests y extensiones no previstas dentro del sitio. Si se autorizan nuevos tipos de recurso más adelante, debe revisarse su lista permitida.
- Archivos menores de 100 MiB y contenido total menor de 1 GiB.

El YAML se revisó estáticamente con las definiciones oficiales de las acciones. Este documento no registra una ejecución en GitHub Actions: la validación definitiva del workflow corresponde a su ejecución real.

## Pasos en GitHub

1. **Subir la rama de trabajo con un cliente Git**, incluyendo el sitio, los tres MP4, requisitos, matriz, pruebas y este documento, e integrarla siguiendo GitFlow (`feature/*` hacia `develop` y luego hacia `main`). Revisar antes `git status --short --branch`. No subir solamente el YAML: la validación necesita el resto de los archivos.
2. Incorporar los cambios a **main**, siguiendo las reglas o PR del repositorio. El botón manual del workflow aparece cuando el archivo existe en la rama predeterminada.
3. En el repositorio, abrir **Settings → Actions → General** y comprobar que las acciones oficiales de GitHub estén permitidas. No es necesario habilitar permisos globales de escritura ni crear un PAT.
4. Abrir **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**.
5. Revisar las reglas del entorno **github-pages**, si existen: deben permitir desplegar desde `main`. Si requieren aprobación, la publicación esperará esa aprobación.
6. Abrir **Actions → Preparar y publicar Origen360 en Pages → Run workflow**. Seleccionar `main` y dejar **publish desmarcado**. Comprobar que `validate` finalice correctamente y `deploy` figure omitido.
7. Para publicar, ejecutar de nuevo el mismo workflow en `main`, marcando **publish**. Comprobar las validaciones, cualquier aprobación del entorno y el resultado de `deploy`.
8. Tomar la URL de salida del despliegue o de **Settings → Pages**. Abrirla con su barra final, comprobar **Enforce HTTPS** cuando esté disponible y verificar recursos, videos, consulta y recepción.

No seleccionar una carpeta de publicación de rama: la carpeta `public/` la decide `path` del artefacto del workflow.

## Multimedia, HTTPS y limitaciones

El sitio completo suma unos **63,4 MB**. Los videos ocupan aproximadamente 36,24 MB, 19,52 MB y 6,25 MB; dos son 4K. Los archivos individuales están por debajo del límite de 100 MiB de Git y el sitio por debajo de 1 GiB, pero su reproducción consume ancho de banda. No se optimizaron ni sustituyeron.

El primer MP4 supera 25 MiB: no podrá añadirse mediante la carga de archivos del navegador de GitHub. Debe incorporarse usando un cliente Git. No se necesita Git LFS para los tamaños actuales.

No se encontraron recursos HTTP ni configuraciones que exijan HTTP. La dirección `http://www.w3.org/2000/svg` de los SVG es un identificador XML y no una carga de red. HTTPS permite cumplir el requisito de contexto seguro de la cámara, pero no garantiza soporte de `BarcodeDetector`, permisos o lectura física.

Las revisiones de recepción son locales al navegador y origen. Los registros de `file:` o `localhost` no se trasladan automáticamente al origen de GitHub Pages. No hay sincronización ni verificación oficial. Inter continúa dependiendo de su instalación local o de las alternativas del sistema.

Quedan por verificar tras el despliegue: la ejecución real de Actions, los permisos efectivos de Pages, la reproducción y carga por HTTPS, el comportamiento responsive, el lector de pantalla, la cámara física y la recarga/persistencia en el origen final. Las 44 pruebas automáticas usan DOM y APIs controlados.

Referencias oficiales consultadas: [workflows personalizados de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [límites de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [archivos grandes](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).
