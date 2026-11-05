# Guía de entrega — Challenge: Landing Page Work-in-progress

**SI385 · NRC 16734 · Grupo 1 · Origen360 Perú**

## A. Abrir en WebStorm y probar

1. Extrae `Origen360_LandingPage_MEJORADO.zip` y abre su carpeta principal en **WebStorm → Open**.
2. Abre `public/index.html` en el navegador.
3. Revisa la página en computadora y con la ventana estrecha; abre y cierra el menú móvil.
4. En **Explora un pasaporte digital**, prueba `O360-DEMO-001` y `O360-DEMO-002`. Cada código muestra una ficha ficticia; prueba también un código incorrecto.
5. Comprueba los espacios de video; si todavía no tienes MP4, las portadas son intencionales.

## B. GitFlow local

El ZIP contiene `.git`, con ramas `main`, `develop` y `feature/...`. En la terminal de WebStorm:

```bash
git status
git branch
git log --all --oneline --graph
```

Para trabajar nuevas funciones en equipo, crea las ramas desde develop:

```bash
git switch develop
git switch -c feature/nombre-descriptivo
# editar y probar archivos
git add .
git commit -m "feat: descripcion del cambio"
```

Cada integrante debe registrar sus aportes propios; los commits iniciales del ZIP son preparación de la práctica.

## C. Crear el repositorio personal y subir ramas

1. En GitHub crea `origen360-landing-page` (preferiblemente **Public** para que el profesor pueda abrirlo).
2. No agregues otro README ni `.gitignore`: ya están incluidos.
3. En WebStorm ejecuta, reemplazando TU_USUARIO:

```bash
git remote add origin https://github.com/TU_USUARIO/origen360-landing-page.git
git push -u origin main
git push -u origin develop
# Sube cada rama feature por separado (ver 'git branch')
git push origin feature/landing-page-inicial
```

**Nota:** repite `git push origin feature/nombre` con cada rama que aparezca en `git branch` (incluidas las nuevas). Si el remoto ya existe, usa `git remote set-url origin URL_CORRECTA`.

## D. Crear organización y transferir

1. GitHub → foto de perfil → Settings → Organizations → New organization.
2. Invita a tus compañeros.
3. En el repositorio personal → Settings → General → Danger Zone → Transfer ownership, selecciona la organización.
4. Copia la URL final: `https://github.com/ORGANIZACION/origen360-landing-page`.
5. Actualiza el remoto local:

```bash
git remote set-url origin https://github.com/ORGANIZACION/origen360-landing-page.git
git remote -v
```

La organización debe ser dueña del repositorio, no basta con crearla.

## E. Publicación web opcional con GitHub Pages

Esto NO es obligatorio en el texto del challenge, que solo exige publicar el repositorio.

La carpeta exigida `public` no se puede elegir directamente en Pages → Deploy from a branch. Para usarla sin reorganizar nada:

1. Publica primero el repositorio con la rama `main`.
2. En GitHub → **Settings → Pages**, selecciona **Source: GitHub Actions**.
3. En **Actions**, busca **Publicar Origen360 en GitHub Pages** y pulsa **Run workflow** para la rama `main`.
4. Revisa el resultado de la ejecución y visita la URL que GitHub muestre. La primera publicación puede requerir activar Pages y autorizar Actions en la organización.

El archivo del workflow ya está en `.github/workflows/publicar-pages.yml` y despliega solo `public/`. No se ha ejecutado ni publicado desde aquí.

## F. Capturas y documento PDF

El profesor pide enviar el enlace del repositorio y un PDF con una captura del avance (menciona Insights de GitHub). Para cubrirlo:

- Captura del encabezado del Landing Page y su contenido en el navegador.
- Captura de GitHub → **Insights → Network** mostrando ramas y merges, si esa vista está disponible.
- Recomendado: captura de la pestaña **Branches** mostrando `main`, `develop` y ramas feature.

En la plantilla `PLANTILLA_ENTREGA_Origen360.docx` reemplaza los campos pendientes por la URL real y las capturas. Exporta a PDF y envía ambos elementos antes de la hora indicada.

**Nombre recomendado:** `Challenge_LandingPage_WorkInProgress_Grupo1_Origen360.pdf`

## G. Qué está listo y qué falta

**Listo:** estructura exigida, HTML, CSS, JavaScript, logo, favicon, demos accesibles, espacios de videos, README, GitFlow local, workflow opcional Pages.

**Pendiente del equipo:** descargar MP4 de Pexels (si desean incluirlos), crear repositorio GitHub, subir ramas, crear organización y transferir, ejecutar Pages si les interesa, tomar captura real de GitHub Insights y generar el PDF final.

**No instalar frameworks CSS:** el challenge solo permite HTML, CSS y JavaScript. Google Fonts y bibliotecas autorizadas son opcionales; el sitio no las necesita.
