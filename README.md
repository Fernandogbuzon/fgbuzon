# FG Buzón

Landing de Fernando: webs y herramientas de gestión para negocios y entidades, desde Sanlúcar de Barrameda. Siete secciones, contacto directo y temas que siguen al sistema o recuerdan una elección manual.

## Desarrollo

Node.js 22 o posterior. Sin dependencias de ejecución ni paso de compilación.

```sh
npm run dev
```

La previsualización se sirve en http://127.0.0.1:4173. La variable PORT cambia el puerto. El servidor resuelve directorios e index.html, redirige a las rutas con barra y devuelve una página 404 con el estado HTTP correspondiente.

## Estructura

- `dist/`: archivos públicos editables y versionados; no es una carpeta generada.
- `dist/assets/`: CSS, JavaScript, fuente Geist local con licencia y capturas reales de ADESA80.
- `dist/aviso-legal/`, `dist/privacidad/`, `dist/cookies/`: documentos públicos con información pendiente de completar.
- `scripts/preview.mjs`: servidor local sin dependencias.
- `scripts/check-site.mjs`: comprobaciones de navegación, temas, fallbacks, rutas y tamaños con Playwright.
- [Contenido](docs/landing-copy.md), [dirección visual](docs/direccion-visual.md) y [requisitos para publicar](docs/publicacion.md).

## Verificación de navegador

El script usa Playwright como herramienta externa; no se envía al navegador ni se exige para servir la web. Puede resolver `playwright` instalado en el entorno o una URL de módulo indicada mediante `PLAYWRIGHT_MODULE`. Requiere los navegadores Chromium y WebKit instalados por Playwright. Ejecutar con el servidor local en marcha:

```sh
node scripts/check-site.mjs
```

`SITE_TEST_URL` permite seleccionar otro servidor local compatible. El informe queda en `artifacts/qa-results.json`, ignorado por Git. Las pruebas no envían mensajes ni abren los enlaces de contacto externos.

## Publicación y privacidad

La web está publicada en [fgbuzon.com](https://fgbuzon.com), alojada en ChatGPT Sites. Se conserva `noindex, nofollow` mientras se completa la información legal. `robots.txt` permite el rastreo para que los buscadores puedan leer esa directiva; noindex no convierte el sitio en privado.

**Las páginas legales todavía no están completas.** Faltan identificación completa, NIF, domicilio y verificaciones de proveedores, conservación y transferencias. Los avisos de revisión señalan estas carencias, pero no las subsanan. Ver [publicacion.md](docs/publicacion.md).

El código propio no incorpora formularios, analítica, píxeles ni contenidos externos incrustados. Los enlaces de contacto abren el canal elegido. El JavaScript propio solo guarda `fgbuzon-theme`, después de una selección manual. Se ha observado además la cookie técnica `__cf_bm` de Cloudflare en el alojamiento público; está documentada en cookies. Los registros y condiciones de los proveedores requieren su propia verificación.

Las capturas muestran la web pública de [ADESA80](https://adesa80.com/), tomadas el 12 de septiembre de 2026 y usadas con autorización confirmada. Las capacidades de gestión interna proceden del brief de Fernando; no se simulan capturas de su panel privado.

Repositorio: [Fernandogbuzon/fgbuzon](https://github.com/Fernandogbuzon/fgbuzon).

## Preparación de imágenes

Las imágenes listas para servir se versionan en `dist/assets`; no requieren compilación para desplegar. `scripts/prepare-responsive-assets.mjs` genera variantes WebP desde las capturas originales. `scripts/prepare-social-image.mjs` usa Geist para generar la tarjeta social, con su SVG de trazados en `assets/reference/og-fgbuzon.svg`.

Para regenerarlas: Sharp 0.35.4 disponible como `sharp` o mediante `SHARP_MODULE` (ruta del paquete). La tarjeta social requiere además Python con fontTools 4.61.1 y Brotli 1.2.0; `PYTHON` permite elegir el ejecutable y `PYTHONPATH` un directorio de paquetes aislado.

```sh
node scripts/prepare-responsive-assets.mjs
node scripts/prepare-social-image.mjs
```
