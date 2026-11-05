# Guía de entrega — Challenge: Landing Page Work-in-progress

**Curso:** IHC y Tecnologías Móviles (SI385) · **NRC:** 16734 · **Grupo:** 1 · **Proyecto:** Origen360 Perú

## 1. Abrir el proyecto en WebStorm

1. Extrae el ZIP completo en una carpeta de tu computadora.
2. Abre **WebStorm → Open** y selecciona la carpeta `Origen360_LandingPage_Challenge` (la carpeta que contiene `README.md` y `public`).
3. Abre `public/index.html` con el navegador desde WebStorm.
4. Verifica que aparezcan los estilos verdes, las tarjetas y el pasaporte de muestra.
5. Cambia el tamaño de la ventana: el menú debe adaptarse a celular.
6. Prueba el formulario con el código `O360-DEMO-001`: mostrará un resultado **ficticio**, no una consulta real.

## 2. Revisar Git y GitFlow (ya configurado localmente)

Este ZIP **incluye la carpeta oculta `.git`**, con historial y ramas creados para la práctica. En la terminal de WebStorm, ejecuta:

```bash
git status
git branch
git log --oneline --graph --all
```

Deben verse:

- `main`: rama principal, con el avance integrado.
- `develop`: rama de integración.
- `feature/landing-page-inicial`: estructura HTML.
- `feature/diseno-responsive`: CSS responsive.
- `feature/interacciones-basicas`: JavaScript.

**Importante:** Los commits del ZIP son el trabajo inicial de preparación. Cuando un compañero haga cambios nuevos debe configurar su nombre/correo en Git y hacer sus propios commits. No atribuyan commits iniciales a otra persona.

Para crear otra feature desde `develop`:

```bash
git switch develop
git pull origin develop
git switch -c feature/nombre-de-la-tarea
# Modificar archivos y verificar los cambios
git add .
git commit -m "feat: descripcion del cambio"
git push -u origin feature/nombre-de-la-tarea
```

El comando `git pull` corresponde a **después** de crear el repositorio remoto. Si aún no lo has publicado, omite esa línea.

## 3. Crear un repositorio personal en GitHub y publicar el proyecto

1. En GitHub, elige **New repository**.
2. Nombre sugerido: `origen360-landing-page`.
3. Elige **Public** si el profesor necesita verlo sin solicitar acceso.
4. **No** marques `Add README`, `.gitignore` ni licencia: ya existen archivos e historial Git local.
5. Copia la URL HTTPS de tu repositorio.
6. En la terminal de WebStorm, dentro del proyecto, ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/origen360-landing-page.git
git push -u origin main
git push -u origin develop
git push origin feature/landing-page-inicial
git push origin feature/diseno-responsive
git push origin feature/interacciones-basicas
```

**Reemplaza `TU_USUARIO`** por tu usuario real. GitHub puede pedir inicio de sesión mediante el navegador o token; no escribas contraseñas en el código.

Si `git remote add origin` indica que `origin` ya existe, usa:

```bash
git remote set-url origin https://github.com/TU_USUARIO/origen360-landing-page.git
```

## 4. Crear la organización y transferir el repositorio

1. En GitHub: foto de perfil → **Settings → Organizations → New organization**.
2. Elige un nombre disponible (ejemplo: `origen360-grupo1`, si no está ocupado).
3. Invita a los integrantes del equipo.
4. En el **repositorio personal**, ve a **Settings → General → Danger Zone → Transfer ownership**.
5. Indica la organización como propietario nuevo y confirma el traslado.
6. Comprueba que ahora el repositorio tenga una URL parecida a:

   `https://github.com/NOMBRE_ORGANIZACION/origen360-landing-page`

7. Actualiza el remoto en WebStorm:

```bash
git remote set-url origin https://github.com/NOMBRE_ORGANIZACION/origen360-landing-page.git
git remote -v
```

**No basta con crear la organización:** el repositorio debe pertenecer realmente a ella.

## 5. Obtener las capturas para el documento de entrega

Debes sacar **capturas reales** después de la publicación:

- **Captura 1 (Landing Page):** abre `public/index.html` en el navegador y haz una captura que muestre el encabezado y el avance visual (preferentemente escritorio).
- **Captura 2 (GitHub Insights):** abre el repositorio ya transferido, selecciona **Insights**; entra a **Network** para mostrar el trabajo con ramas y merges, o a **Contributors** si el profesor pide contribuciones. Toma una captura donde se vea el nombre de la organización y del repositorio.
- **Captura 3 (opcional):** menú **Branches** de GitHub mostrando `main`, `develop` y las tres ramas `feature/...`.

El enunciado menciona expresamente «Screenshot del avance de la Landing Page (sección Insights de GitHub)». Como puede interpretarse de dos formas, **incluye tanto la captura del avance visual como una captura de Insights** en el mismo PDF para evitar omisiones.

## 6. Preparar y entregar el PDF

1. Abre el archivo de apoyo `PLANTILLA_ENTREGA_Origen360.docx` (se entrega fuera del ZIP).
2. Sustituye el texto `PENDIENTE` por la URL real del repositorio en la organización.
3. Pega la captura real del Landing Page y la captura real de **Insights**.
4. Elimina las instrucciones para completar y exporta el documento **como PDF**.
5. Entrega **el enlace al repositorio de la organización y el PDF** antes de la hora indicada por el profesor.

**Nombre recomendado del PDF:** `Challenge_LandingPage_WorkInProgress_Grupo1_Origen360.pdf`.

## 7. Posible publicación con GitHub Pages (opcional)

El challenge exige publicar el **repositorio**; no exige expresamente publicar una página con GitHub Pages. Además, los archivos HTML están en `public/`, como pide la actividad. GitHub Pages mediante `Deploy from a branch` solo permite publicar desde `/(root)` o `/docs`; **no desde `/public` directamente**. Para publicar la web en una URL sin alterar esta estructura, se puede usar un workflow de **GitHub Actions** que despliegue `public/`. Eso es trabajo adicional al mínimo solicitado.

## 8. Qué está hecho y qué falta

**Hecho en el ZIP:** estructura de carpetas, `index.html`, `favicon.ico`, CSS, JS, README, Git inicializado, `main`, `develop`, tres features creadas desde `develop`, commits y merges de trabajo, Landing Page responsive con demostración.

**Pendiente en tu cuenta:** crear repositorio GitHub, subir ramas, crear organización, transferir el repositorio, tomar capturas reales de GitHub Insights, completar PDF y enviarlo al profesor.
