# Validación de FG Buzón

## Revisión del 13 de septiembre de 2026

Cambios: textos más concretos, imágenes adaptativas, tarjeta social y metadatos, corrección del estado público en la documentación legal y rastreo permitido para leer noindex. No se han cambiado CSS, comportamiento JavaScript ni animaciones.

- Chrome del usuario mediante la extensión de navegador: portada a 320, 390, 768 y 1440 px, claro y oscuro. Ocho combinaciones sin desbordamiento horizontal, con ambas capturas cargadas. Preferencia manual conservada tras recarga.
- En esta sesión, los anchos de contenido fueron 305, 375, 753 y 1425 px: la barra de desplazamiento de Windows ocupa los 15 px restantes.
- A 390 px, el navegador eligió desktop480 y mobile160: 35.990 bytes, frente a 235.640 de los originales (reducción del 84,7 % en estas dos imágenes). A 1440 px eligió desktop1080 y mobile390: 128.788 bytes (45,3 % menos). La selección puede cambiar con la densidad de pantalla, caché o preferencias del navegador.
- Inspección visual de la composición móvil y del inicio en escritorio, y de la tarjeta social PNG 1200 × 630 (21.804 bytes). El teléfono sigue superpuesto dentro del enlace a ADESA80.
- Menú móvil con teclado y enlace a servicios; cierre tras navegar. Pregunta de presupuesto abierta con Enter. Selector claro/oscuro, Escape y persistencia comprobados. Sin errores o avisos de consola observados.
- Acceso directo y recarga de las tres páginas legales a 390 px, con tema oscuro conservado y sin desbordamiento.
- 73 comprobaciones HTTP/archivos satisfactorias: rutas 200, metadatos únicos, canonical, noindex, tarjeta social, recursos locales y dimensiones, redirecciones legales 301, 404 reales en el servidor local, rutas inválidas 400/403, HEAD, POST 405 y robots.
- Sintaxis de los scripts JavaScript y `git diff --check` correctos. Revisión independiente del diff sin regresiones bloqueantes; precisión del texto de consentimiento incorporada.

`scripts/check-site.mjs` incluye ahora comprobaciones de variantes adaptativas, tarjeta social y rastreo compatible con noindex. **La suite automatizada completa de Chromium/WebKit no se ha vuelto a ejecutar en esta revisión.** No se presentan sus 149 resultados históricos como una ejecución nueva. Tampoco se ha repetido axe, zoom real al 200 %, las simulaciones de almacenamiento bloqueado/JavaScript desactivado ni una medición de rendimiento tras el cambio.

### Línea base pública anterior a estos cambios

[PageSpeed Insights del 13 de septiembre, 01:48 CEST](https://pagespeed.web.dev/analysis/https-fgbuzon-com/46ivxz1ltp?form_factor=mobile), Lighthouse 13.4.1:

| Perfil | Rendimiento | LCP | CLS | SEO |
| --- | --- | --- | --- | --- |
| Móvil | 100 | 1,2 s | 0 | 69 |
| Escritorio | 100 | 0,4 s | 0,001 | 69 |

No había datos CrUX de usuarios reales. SEO estaba limitado por noindex; se mantiene mientras se completa la información legal. Esta medición corresponde a la versión pública previa, no certifica el rendimiento posterior ni la accesibilidad completa.

En el dominio público se observó `__cf_bm` de Cloudflare. El inventario local sin cookies del apartado histórico no describe por sí solo el alojamiento público. Los pendientes legales y de material auténtico para la gestión están en [publicacion.md](publicacion.md).

## Archivo histórico: revisión del 12 de septiembre de 2026

12 de septiembre de 2026. Comprobaciones realizadas sobre el servidor local y el código estático preparado para la revisión privada.

## Navegación y comportamiento

- 149 comprobaciones satisfactorias en `scripts/check-site.mjs`.
- Chromium 153: 320, 390, 768 y 1440 px en claro y oscuro. WebKit 26.6: 390 y 1440 px en ambos temas. Doce combinaciones sin desbordamiento.
- Siete secciones, cinco preguntas y ausencia de antetítulos/numeración decorativa.
- Selección y persistencia de tema, cambios del sistema, almacenamiento bloqueado/inválido y sincronización entre pestañas.
- Teclado: enlace de salto, radios mediante flechas, Escape y retorno del foco. Menú, preguntas y selección mediante entrada táctil real emulada.
- Aperturas y cierres rápidos, clic externo, movimiento reducido antes y durante una transición; ampliación de texto al 200 %.
- Sin JavaScript: contenido, menú, preguntas y tema del sistema operativos; selector manual oculto.
- Contactos comprobados sin enviar mensajes: WhatsApp y texto preparado, teléfono, correo, Instagram y ADESA80.
- Rutas legales, acceso directo a index.html, recarga, redirecciones con barra, retorno al inicio y metadatos únicos. Respuestas 404, 400, 403, HEAD y método no permitido verificadas.
- Sin errores de JavaScript ni consola en la matriz de navegación.

## Accesibilidad y recursos

axe-core no detectó infracciones en las comprobaciones WCAG A/AA disponibles para la portada y las tres páginas legales en ambos temas, ni con el selector de apariencia abierto. La única comprobación incompleta fue el contraste de una flecha decorativa; usa el color principal del texto sobre el fondo de página. Esto no equivale a certificar conformidad WCAG completa.

La carga local solicita únicamente HTML, CSS, JavaScript, la fuente y las dos capturas del mismo origen. Por petición de Fernando, escritorio y móvil se muestran juntos dentro de un único enlace a ADESA80. No se crean cookies propias. El almacenamiento local permanece vacío hasta que se elige una apariencia manualmente.

El ajuste de capturas se comprobó en doce combinaciones de tamaño, tema y navegador: ambas imágenes abren ADESA80 en una pestaña nueva, el teléfono permanece dentro del enlace, no invade la leyenda y no provoca desbordamiento. El enlace también recibe foco por teclado.

En aquella revisión, el acceso privado de Sites y sus registros técnicos no formaban parte del inventario local. El sitio se publicó después; consultar el estado actualizado al principio de este documento y en `publicacion.md`.

## Rendimiento de laboratorio de la revisión 2

Estas mediciones corresponden a la versión anterior con una sola captura adaptativa. La composición actual carga ambas capturas y su transferencia total es mayor; estos valores no se presentan como una medición de la versión actual.

Chromium, caché desactivada, latencia simulada de 150 ms, descarga de 200.000 bytes/s y CPU ralentizada cuatro veces. Observaciones de una carga por tamaño, sin interacciones durante la medición:

| Pantalla | LCP     | CLS    | Transferencia aproximada |
| -------- | ------- | ------ | ------------------------ |
| 390 px   | 0,948 s | 0      | 111 KB                   |
| 1440 px  | 1,024 s | 0,0016 | 264 KB                   |

Dentro de los objetivos LCP ≤ 2,5 s y CLS ≤ 0,1 en estas condiciones locales. No son percentiles de tráfico real, puntuaciones Lighthouse ni mediciones del acceso autenticado de Sites. No se ha medido INP de usuarios reales.

Los informes y capturas se guardan en `artifacts/`, ignorado por Git. Firefox no se comprobó porque no está instalado en el entorno.
