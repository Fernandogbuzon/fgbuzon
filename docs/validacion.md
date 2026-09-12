# Validación de la revisión

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

El acceso privado de Sites y sus registros técnicos no forman parte de este inventario local. Deben revisarse con la configuración final de alojamiento antes del lanzamiento público, tal como se indica en las páginas legales y en `publicacion.md`.

## Rendimiento de laboratorio de la revisión 2

Estas mediciones corresponden a la versión anterior con una sola captura adaptativa. La composición actual carga ambas capturas y su transferencia total es mayor; estos valores no se presentan como una medición de la versión actual.

Chromium, caché desactivada, latencia simulada de 150 ms, descarga de 200.000 bytes/s y CPU ralentizada cuatro veces. Observaciones de una carga por tamaño, sin interacciones durante la medición:

| Pantalla | LCP     | CLS    | Transferencia aproximada |
| -------- | ------- | ------ | ------------------------ |
| 390 px   | 0,948 s | 0      | 111 KB                   |
| 1440 px  | 1,024 s | 0,0016 | 264 KB                   |

Dentro de los objetivos LCP ≤ 2,5 s y CLS ≤ 0,1 en estas condiciones locales. No son percentiles de tráfico real, puntuaciones Lighthouse ni mediciones del acceso autenticado de Sites. No se ha medido INP de usuarios reales.

Los informes y capturas se guardan en `artifacts/`, ignorado por Git. Firefox no se comprobó porque no está instalado en el entorno.
