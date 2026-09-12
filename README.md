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
- `dist/aviso-legal/`, `dist/privacidad/`, `dist/cookies/`: páginas legales de revisión privada.
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

La revisión se aloja de forma privada en Sites. Se mantiene `noindex, nofollow` y robots desactivado. El canonical y el sitemap preparan el destino solicitado `https://fgbuzon.com`; eso no conecta el dominio ni habilita indexación.

**Las páginas legales son borradores privados, no documentos listos para una publicación pública.** Faltan identificación completa, NIF, domicilio y verificaciones de proveedores, conservación y transferencias. Ver [publicacion.md](docs/publicacion.md).

El código propio no incorpora formularios, analítica, píxeles ni contenidos externos incrustados. Los enlaces de contacto abren el canal elegido. Solo se guarda `fgbuzon-theme`, después de una selección manual. El acceso privado y los registros del alojamiento deben evaluarse por separado; no se afirma que el servicio completo esté libre de cookies o tratamientos.

Las capturas muestran la web pública de [ADESA80](https://adesa80.com/), tomadas el 12 de septiembre de 2026 y usadas con autorización confirmada. Las capacidades de gestión interna proceden del brief de Fernando; no se simulan capturas de su panel privado.

Repositorio: [Fernandogbuzon/fgbuzon](https://github.com/Fernandogbuzon/fgbuzon).
