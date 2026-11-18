# CIMAS – Confederación Interamericana de Masonería Simbólica

Rediseño del sitio [cimas-masoneria.com](https://cimas-masoneria.com) (antes WordPress + Elementor) en **Next.js 16** (App Router), **Tailwind CSS 4** y TypeScript, listo para desplegarse en **AWS Amplify Hosting**.

El contenido, las URLs y la estructura del sitio original se conservaron: la portada, 9 páginas y 19 artículos en `/<slug>/`.

## Por qué exportación estática

El sitio es 100 % contenido: no hay base de datos ni páginas que dependan de la petición. Se usa `output: "export"` (`next.config.ts`), que genera HTML/CSS/JS en `out/`, y Amplify lo sirve como sitio estático.

Esto también esquiva una limitación: la documentación de Amplify solo declara SSR gestionado hasta Next.js 15 ([fuente](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html)), y este proyecto usa la 16.

Consecuencias: no hay optimizador de imágenes en runtime (un *loader* propio elige entre variantes preparadas de antemano, ver *Imágenes*) ni rutas de API; el formulario de contacto funciona sin servidor (ver *Variables de entorno*).

## Estilos

Tailwind CSS 4 se integra con **`@tailwindcss/postcss`** (`postcss.config.mjs`), que es lo que recomienda la documentación de Next.js. El proyecto nació con el cargador experimental `@tailwindcss/turbopack`, que no volvía a escanear las clases cuando solo cambiaba un archivo TSX: las clases nuevas no llegaban al CSS (ni en `dev` ni en `build`). Si ve estilos que no aparecen, revise que no se haya reintroducido ese cargador en `next.config.ts`.

## Comandos

```bash
npm install
npm run dev              # desarrollo en http://localhost:3000
npm run build            # genera el sitio estático en ./out
npm run lint
npm run typecheck
npm run check:content    # integridad de assets, enlaces y manifiesto (corre también en Amplify)
npm run images:manifest  # regenera el manifiesto de dimensiones tras agregar imágenes
```

Requiere Node ≥ 20.9 (se fija Node 22 en `.nvmrc`).

## Dónde editar cada cosa

| Qué | Dónde |
| --- | --- |
| Menú y datos del sitio | `src/content/site.ts` |
| Portada (carrusel, textos) | `src/app/page.tsx` |
| Declaración y Principios / Reglamento General | `src/content/declaracion-y-principios.json`, `reglamento-general.json` (campo `body`) |
| Miembros, Directorio, Presidentes, Consejo Supervisor | `src/content/miembros.json` |
| Ingresos | `src/content/ingresos.json` |
| Capacitación (seminarios, transmisiones) | `src/content/seminarios.json` |
| Publicaciones | `src/content/publicaciones.json` |
| Tarjetas de Noticias y Coloquios | `src/content/listing-noticias.json`, `listing-coloquios.json` |
| Artículos (URL `/<slug>/`) | `src/content/articles/<slug>.json` |
| Estilos del contenido largo | `.prose-cimas` en `src/app/globals.css` |

El campo `body` de los textos largos es HTML semántico con un vocabulario pequeño de clases (`center`, `accent`, `box`, `indent`, `btn`, y para enumeraciones `item` / `item sub` / `item art`, ver *Notas de diseño*) definido en `.prose-cimas`; es contenido propio del repo (no entrada de usuarios), por eso se inyecta con `dangerouslySetInnerHTML`.

**Para agregar un artículo:** crear `src/content/articles/<slug>.json` (copiar uno existente) y una tarjeta en el listado que corresponda. Aparece automáticamente en el sitemap.

## Imágenes y documentos

- `public/images/` y `public/documentos/` contienen todos los archivos del sitio original, descargados para no depender del WordPress anterior.
- Las imágenes pesadas ya están optimizadas: los PNG de captura y el banner de contacto se pasaron a WebP, y los JPEG de más de 200 KB también (sin cambiar resolución). De ~30 MB a ~14 MB, incluidas las variantes.
- **Variantes responsivas.** Las imágenes de más de 1400 px de ancho (banners, portadas) tienen una copia `<nombre>-1280.webp`. El *loader* de `next/image` (`src/lib/image-loader.ts`) la sirve cuando el navegador pide un ancho de hasta 1280 px (celulares, también con pantallas de alta densidad) y el original en el resto. Un banner que pesaba 188 KB baja a 72 KB en un celular. Para una imagen grande nueva: `magick entrada.jpg -resize 1280x -quality 78 nombre-1280.webp` junto al original, y luego `npm run images:manifest`.
- Al agregar una imagen: copiarla a `public/images/`, ejecutar `npm run images:manifest` y usar `<Photo src="/images/archivo.webp" alt="…" />`. Si olvida el paso del manifiesto, el build falla con un mensaje claro.
- `npm run check:content` detecta archivos truncados (JPG/PNG/WebP/PDF/ZIP), referencias a archivos que no existen y enlaces internos rotos.

## Despliegue en AWS Amplify

1. Subir el repositorio a GitHub/GitLab/Bitbucket/CodeCommit (este directorio aún no es un repo git).
2. En la consola de Amplify: **Create new app → Host web app**, elegir el repo y la rama. Amplify toma `amplify.yml` (instala con `npm ci`, ejecuta `check:content` y `build`, y publica `out/`).
3. Si Amplify detecta la app como "Next.js – SSR" (`WEB_COMPUTE`) y falla buscando `.next`, cambiar la plataforma a estática: `aws amplify update-app --app-id <ID> --platform WEB`.
4. **Hosting → Custom headers**: Amplify lee `customHttp.yml` de la raíz (seguridad y caché de `/_next/static`).
5. **Hosting → Rewrites and redirects → Open text editor**: pegar el contenido de `amplify-redirects.json`. Redirige las URLs antiguas de PDF/ZIP de WordPress (`/wp-content/uploads/...`, `/PDF/...`) a `/documentos/...` y define la página 404.
6. Conectar el dominio `cimas-masoneria.com` en **Hosting → Custom domains**.

**A verificar tras el primer despliegue** (no se pueden comprobar sin Amplify): que `/miembros` sin barra final resuelva (si da 404, agregar una redirección `/miembros` → `/miembros/` y probar que no genere un bucle); que se apliquen las cabeceras de `customHttp.yml`; y que la 404 personalizada funcione.

## Variables de entorno (opcionales)

Ver `.env.example`. Se definen en Amplify (*Hosting → Environment variables*) y se fijan en el build.

- `NEXT_PUBLIC_SITE_URL`: URL pública para canonical, sitemap y Open Graph (por defecto `https://cimas-masoneria.com`).
- `NEXT_PUBLIC_CONTACT_ENDPOINT`: si se define, el formulario de contacto hace `POST` JSON `{nombre, email, mensaje}` a ese endpoint (Formspree, API Gateway + Lambda/SES, etc.).
- `NEXT_PUBLIC_CONTACT_EMAIL`: sin endpoint, el formulario abre el cliente de correo del visitante dirigido a esta dirección (por defecto `secretario@cimas-masoneria.com`, tomada del Directorio del sitio).

> El formulario del sitio original no enviaba nada (`action="#"`). Definir el destino real de los mensajes es una decisión pendiente de la organización.

## Notas de diseño

- **Tipografía.** Títulos y textos largos en **Libre Caslon** (la letra de los documentos fundacionales de las Américas; el corte *Display*, más fino, solo para los tamaños mayores) y texto e interfaz en **Public Sans**. Se autoalojan con `next/font`. La escala es fluida (`text-display`, `text-title`, `text-section`, `text-heading`, `text-lead`, definidas en `globals.css`): crece con el ancho de pantalla, los títulos grandes llevan tracking negativo y los encabezados usan `text-wrap: balance`. Los textos largos (Declaración, Reglamento, artículos) se componen en Caslon con ~66 caracteres por línea, interlineado 1.7 y, desde tablet, justificado con guionado automático; en móvil quedan alineados a la izquierda. Las mayúsculas se reservan para pocos títulos cortos, con espaciado propio.
- **Enumeraciones.** Un número nunca es texto plano: hay un sistema único de "medalla" (círculo blanco, doble aro dorado, numeral en Caslon; clase `.numeral` y, dentro de textos largos, `.item > .num`). Se aplica así:
  - *Textos normativos* (Declaración, Reglamento): puntos numerados con medalla y sangría francesa (el texto no vuelve debajo del número); `item art` para "Art. N°" / "Artículo N°" como píldora (en móvil va sobre el texto); `item sub` para incisos a), b)… como ficha pequeña. Marcado: `<p class="item"><span class="num">1</span><span class="txt">…</span></p>`. El número se escribe sin punto ni paréntesis: el estilo los reemplaza.
  - *Listas dentro de los artículos*: `<ol>` con medalla (contador CSS) y `<ul>` con rombos dorados.
  - *Datos*: pasos de Ingresos (medallas unidas por una línea), obediencias y Consejo Supervisor (medalla junto al nombre), presidentes (cronología con puntos dorados), galería de ex presidentes (medalla con el orden 1 a 8 sobre la foto), módulos de Capacitación (número en círculo dentro del botón) y encuentros numerados de Coloquios (ficha "10.º" sobre la imagen, calculada con `parseOrdinal` en `src/content/articles.ts`).
  - Los rangos de años usan raya (2002 – 2003) y las cifras son tabulares.
- **Vidrio (glassmorphism).** Solo donde hay algo que se vea detrás: header (sobre el contenido al hacer scroll), menú móvil, controles del carrusel y placa del título de los artículos (`.glass`, `.glass-strong`, `.glass-dark`). En listas largas (tarjetas de Miembros) se usa `.glass-card`, que es translúcida pero sin `backdrop-filter`: el filtro es caro de pintar, con 23 tarjetas llevó el rendimiento móvil de 95 a 64. Sin soporte de `backdrop-filter` todo cae a un fondo casi sólido.
- **Movimiento.** Un momento orquestado (fundido entre páginas con View Transitions, en `src/app/template.tsx`, y el header que se compacta) más respuesta a acciones (menú, pulsaciones). El revelado al hacer scroll (`<Reveal>`) se limita a cuadrículas y secciones bajo el primer pliegue. Todo se desactiva con `prefers-reduced-motion`, y sin JS el contenido es visible.
- **Mobile-first.** Header de 56 px, banners que se ven completos en móvil sobre una copia desenfocada de sí mismos (el título va dentro de la imagen), carrusel con swipe, áreas de toque ≥ 44 px, `dvh` y áreas seguras de iPhone (`viewport-fit=cover`). Los banners pasan a recortarse (`cover`) desde 1024 px.
- Colores: se añadieron azul noche `#0e1b33` y dorado `#b8914a`, tomados de los banners; el dorado solo en filetes finos e indicadores. El azul de marca `#447FD3` se conserva en títulos grandes y decoración. Para texto pequeño y fondos con texto blanco se usa `#386fc1` (`--color-cimas-blue-aa`), que cumple contraste WCAG AA; con el azul original esos elementos quedaban en 3.9–4.0:1.
- Se omitieron artefactos de WordPress: el contador "0 Comentario", un texto suelto bajo el encabezado de los artículos y los botones "Volver" con `history.back()` (ahora enlazan al listado correspondiente).
- El texto se mantiene tal cual el original, incluidas erratas (p. ej. "FRANCMASONERíA", "Elbio Laxare Terra" en el Directorio vs "Laxalte" en otras secciones). Conviene revisarlas con la organización.
