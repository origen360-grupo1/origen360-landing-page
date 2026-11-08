# Preparación técnica de GitHub Pages

Estado: configuración local preparada; **no publicada**. No se crearon commits, no se hizo push y no se cambiaron ajustes remotos. Esto no cierra las pruebas manuales de aceptación ni autoriza la etapa 7C.

## Auditoría del repositorio

- Repositorio: `https://github.com/origen360-grupo1/origen360-landing-page`.
- Rama local y rama predeterminada remota consultada: **main**. El repositorio remoto es público.
- Al iniciar esta preparación, HEAD local era `37e1d7981b3b4f5ca92748db25c5faa9c4147155`, igual a la referencia local del último `origin/main` conocido. No se hizo fetch; esa igualdad no garantiza sincronización actual con el servidor.
- No había entradas preparadas ni conflictos en el índice. Había cambios locales en `README.md`, `public/index.html`, CSS y JavaScript.
- No estaban rastreados los tres MP4, `Origen360_Requisitos_Codex_AV2.md`, los cinco archivos de pruebas y `docs/matriz-aceptacion.md`. Deben incluirse en la revisión del futuro commit; CI necesita las pruebas, los requisitos y la matriz aunque no se publiquen como sitio.
- Git y Node no estaban accesibles como comandos de PowerShell en esta sesión. La rama/estado se comprobaron mediante lectura de HEAD, índice v2 y objetos de Git, sin escribirlos; los programas de validación se ejecutaron mediante el entorno Node disponible.

La preparación añade el workflow, este documento y el validador de rutas. No modifica `public/`, sus datos, los requisitos o las pruebas de las 30 historias.

## Contenido y rutas

El documento principal es `public/index.html`. Sus CSS, JavaScript, favicon, imágenes y videos utilizan rutas relativas. Las referencias CSS se resuelven desde `assets/styles/styles.css`; no necesitan una ruta absoluta al dominio ni un valor `base` específico.

URL prevista con el nombre actual del repositorio:

```text
https://origen360-grupo1.github.io/origen360-landing-page/
```

Es una URL propuesta, no una publicación verificada. La URL efectiva debe tomarse del resultado del futuro despliegue. La carpeta `public/` se convierte en la raíz del artefacto: no se añade `/public/` a la URL.

El preflight comprobó **11 archivos publicables**, **60 referencias locales** en dos prefijos de repositorio y **cero dependencias de recursos externos**. Incluye las anclas del HTML, las rutas de fondos CSS y el uso exacto de mayúsculas/minúsculas. No realiza peticiones a la URL propuesta.

| Recurso | Incluido en Pages |
|---|---|
| `public/index.html` y `public/favicon.ico` | Sí, en la raíz del sitio. |
| `public/assets/scripts/`, `styles/`, `images/` y los tres MP4 | Sí, conservando sus rutas relativas. |
| `public/assets/videos/.gitkeep` | No es necesario; la acción de empaquetado excluye dotfiles. |
| `tests/`, `docs/`, README, requisitos, `.github/` y `.idea/` | No: están fuera de `public/`. |

Excluir documentación del artefacto de Pages no la convierte en privada: los archivos que se incorporen a este repositorio público seguirán siendo accesibles desde GitHub Code.

## Workflow propuesto

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

Se ejecutaron los mismos puntos de entrada mediante el entorno Node de esta sesión: **35/35 pruebas satisfactorias** y **preflight correcto**. El intento literal `node tests/run.mjs` en PowerShell falló porque `node` no estaba en PATH. No se instaló ningún runtime ni paquete.

El validador de Pages es de solo lectura y no genera un build o archivo comprimido. Comprueba:

- `index.html` en la raíz publicable y todos los recursos relativos presentes.
- Resolución de referencias con el prefijo real propuesto y otro nombre de repositorio, sin salir del subdirectorio.
- Anclas existentes y nombres sensibles a mayúsculas, incluso ejecutándolo sobre Windows.
- Ausencia de rutas ancladas a `/`, recursos HTTP mixtos, dependencias de red no previstas y enlaces simbólicos/físicos dentro de `public/`.
- Exclusión de documentación, tests y extensiones no previstas dentro del sitio. Si se autorizan nuevos tipos de recurso más adelante, debe revisarse su lista permitida.
- Archivos menores de 100 MiB y contenido total menor de 1 GiB.

El YAML se revisó estáticamente con las definiciones oficiales de las acciones. No se ejecutó GitHub Actions, no se subió un artefacto y no se comprobó la URL desplegada. No había un parser YAML instalado; no se añadió una dependencia para ello. La validación definitiva del workflow corresponde a su primera ejecución en GitHub.

## Pasos exactos en GitHub — únicamente después de autorizar los cambios remotos

1. **Preparar y subir el futuro commit con un cliente Git**, incluyendo el sitio actualizado, los tres MP4, requisitos, matriz, pruebas y los archivos de esta preparación. Revisar antes `git status --short --branch`. No subir solamente el YAML: la validación necesita el resto de los archivos de trabajo. Este documento no ejecuta ese commit o push.
2. Incorporar los cambios a **main**, siguiendo las reglas o PR del repositorio. El botón manual del workflow aparece cuando el archivo existe en la rama predeterminada.
3. En el repositorio, abrir **Settings → Actions → General** y comprobar que las acciones oficiales de GitHub estén permitidas. No es necesario habilitar permisos globales de escritura ni crear un PAT.
4. Abrir **Settings → Pages → Build and deployment → Source** y seleccionar **GitHub Actions**.
5. Revisar las reglas del entorno **github-pages**, si existen: deben permitir desplegar desde `main`. Si requieren aprobación, la publicación esperará esa aprobación.
6. Abrir **Actions → Preparar y publicar Origen360 en Pages → Run workflow**. Seleccionar `main` y dejar **publish desmarcado**. Comprobar que `validate` finalice correctamente y `deploy` figure omitido.
7. **Solo con autorización expresa para publicar**, ejecutar de nuevo el mismo workflow en `main`, marcando **publish**. Comprobar las validaciones, cualquier aprobación del entorno y el resultado de `deploy`.
8. Tomar la URL de salida del despliegue o de **Settings → Pages**. Abrirla con su barra final, comprobar **Enforce HTTPS** cuando esté disponible y verificar recursos, videos, consulta y recepción. No se ha realizado este paso durante la preparación.

No seleccionar una carpeta de publicación de rama: la carpeta `public/` la decide `path` del artefacto del workflow.

## Multimedia, HTTPS y limitaciones

El sitio completo suma **62,85 MB**. Los videos ocupan aproximadamente 36,24 MB, 19,52 MB y 6,25 MB; dos son 4K. Los archivos individuales están por debajo del límite de 100 MiB de Git y el sitio por debajo de 1 GiB, pero su reproducción consume ancho de banda. No se optimizaron ni sustituyeron.

El primer MP4 supera 25 MiB: no podrá añadirse mediante la carga de archivos del navegador de GitHub. Debe incorporarse usando un cliente Git. No se necesita Git LFS para los tamaños actuales.

No se encontraron recursos HTTP ni configuraciones que exijan HTTP. La dirección `http://www.w3.org/2000/svg` de los SVG es un identificador XML y no una carga de red. HTTPS permite cumplir el requisito de contexto seguro de la cámara, pero no garantiza soporte de `BarcodeDetector`, permisos o lectura física.

Las revisiones de recepción son locales al navegador y origen. Los registros de `file:` o `localhost` no se trasladan automáticamente al origen de GitHub Pages. No hay sincronización ni verificación oficial. Inter continúa dependiendo de su instalación local o de las alternativas del sistema.

Siguen pendientes la ejecución real de Actions, permisos efectivos de Pages, reproducción y carga por HTTPS, responsive, lector de pantalla, cámara física y recarga/persistencia en el origen final. Las 35 pruebas siguen usando DOM y APIs controlados.

Referencias oficiales consultadas: [workflows personalizados de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [fuente de publicación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [límites de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [archivos grandes](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).
