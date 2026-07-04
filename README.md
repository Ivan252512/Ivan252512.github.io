# Carlos Iván Pineda Santiago — Portfolio

Sitio personal / portafolio con estética **Matrix** (verde sobre negro, estilo terminal).
En vivo en **[ivan31416neda.com](https://ivan31416neda.com)** (y en https://ivan252512.github.io).

Es un sitio **estático hecho a mano** con HTML, CSS y JavaScript puro — **sin frameworks
ni paso de compilación**. Editar los archivos y hacer `git push` = desplegar.

---

## Estructura

```
.
├── index.html                 # Toda la página (una sola página, secciones con anclas)
├── CNAME                       # Dominio propio: ivan31416neda.com
├── manifest.json               # PWA / metadatos
├── robots.txt
├── icons/                      # Favicons / iconos de app
├── assets/
│   ├── css/style.css           # Todos los estilos (tema Matrix, responsive)
│   ├── js/
│   │   ├── matrix.js           # Lluvia de código de fondo (canvas)
│   │   └── main.js             # Boot, typewriter, menú móvil, scroll-reveal, limpieza de caché
│   ├── img/                    # Foto de perfil, og-image, logos de empresas, logo QuantCoder (SVG)
│   ├── cv/                     # PDFs del CV que descargan los botones (EN / ES)
│   └── certs/                  # Diplomas alojados (PDF)
└── cv/
    └── src/                    # Fuentes LaTeX del CV (resume.tex EN, resume_es.tex ES)
```

---

## Correr el sitio localmente

No requiere build. Solo necesitas servir la carpeta con cualquier servidor estático
(las rutas usan `/` absoluto, así que **sí** hace falta un servidor, no abrir el archivo directo).

Elige una opción:

```bash
# Opción A — Node (recomendada)
npx -y serve -l 4173 .
# luego abre http://localhost:4173

# Opción B — Python
python -m http.server 4173
# luego abre http://localhost:4173
```

También sirve la extensión **Live Server** de VS Code (clic derecho en `index.html` → "Open with Live Server").

---

## Editar el contenido

Casi todo el contenido vive en **`index.html`**, organizado por secciones (`<section id="...">`):

| Sección        | Qué editar                                                        |
|----------------|-------------------------------------------------------------------|
| `#hero`        | Nombre, subtítulo, botones de CV, redes                           |
| `#about`       | Foto (`assets/img/profile.webp`) y bloque `const engineer = {…}`  |
| `#skills`      | Tarjetas de habilidades e íconos (devicon)                        |
| `#experience`  | Línea de tiempo de empleos (QuantCoder destacado arriba)          |
| `#projects`    | Tarjetas de proyectos                                             |
| `#education`   | Estudios y **certificaciones** (con enlace al diploma)            |
| `#contact`     | Correo y enlaces                                                  |

- **Colores del tema:** variables CSS al inicio de `assets/css/style.css` (`:root { --green, --bg, … }`).
- **Iconos de tecnología:** usan [devicon](https://devicon.dev) por clase (ej. `devicon-python-plain`).
  Ojo: no todos existen en la *fuente* de iconos; verifica que rendericen.
- **Imagen de previsualización** (Google / redes al compartir): etiquetas `og:image` y
  `twitter:image` en el `<head>`, apuntando a `assets/img/og-image.jpg`.

---

## Desplegar

Es un **User Pages** de GitHub servido desde la rama `master` de este repo. No hay build de Jekyll
personalizado; **al hacer push, GitHub Pages publica automáticamente**.

```bash
git add -A
git commit -m "descripción del cambio"
git push origin master
```

En ~1–2 min queda en vivo. Recarga con **Ctrl+Shift+R** para saltar la caché del navegador.

### Si "no se actualiza" tras el push
1. Revisa que el despliegue no haya fallado:
   ```bash
   gh run list --repo Ivan252512/Ivan252512.github.io -L 3
   ```
2. Si el último aparece como `failure` (a veces GitHub Pages da un error transitorio
   *"Deployment failed, try again later"*), reintenta ese mismo run:
   ```bash
   gh run rerun <RUN_ID> --repo Ivan252512/Ivan252512.github.io
   ```
3. La caché del CDN puede tardar hasta ~10 min. Para **archivos** (PDF, imágenes) que cambian
   pero conservan el nombre, conviene **versionar el nombre** (ej. `..._CV_2026.pdf`) para forzar
   una URL nueva y evitar servir la versión cacheada.

---

## Regenerar el CV (LaTeX)

Las fuentes están en `cv/src/` (`resume.tex` = inglés, `resume_es.tex` = español).
Se compilan con **[Tectonic](https://tectonic-typesetting.github.io)** (motor LaTeX autocontenido,
descarga los paquetes solo).

```bash
# instalar tectonic una vez (ej. con conda)
conda install -c conda-forge tectonic

# compilar
tectonic cv/src/resume.tex        # genera resume.pdf
tectonic cv/src/resume_es.tex     # genera resume_es.pdf
```

Luego copia los PDF a `assets/cv/` con nombre versionado y actualiza los enlaces en `index.html`:

```bash
cp cv/src/resume.pdf    assets/cv/Carlos_Ivan_Pineda_Santiago_CV_2026.pdf
cp cv/src/resume_es.pdf assets/cv/Carlos_Ivan_Pineda_Santiago_CV_ES_2026.pdf
```

Notas del CV:
- Diseño en **blanco y negro**, una-dos páginas, con las certificaciones **clicables**.
- No usa `fontawesome5` (hace crashear a Tectonic en algunos entornos) ni fuentes del sistema.

---

## Notas técnicas

- `assets/js/main.js` **desregistra el service worker** y **limpia la caché** del build de React
  anterior, para que visitantes recurrentes reciban siempre la versión más reciente.
- Respeta `prefers-reduced-motion` (desactiva glitch y baja la intensidad de la lluvia).
- El dominio propio (`CNAME`) hace que `ivan252512.github.io` redirija (301) a `ivan31416neda.com`.
