# FG Buzón · Estado de publicación y tareas pendientes

Revisión del 13 de septiembre de 2026.

La web **ya es pública en https://fgbuzon.com**, con HTTPS y alojamiento ChatGPT Sites. El dominio también utiliza Cloudflare. La documentación anterior que la describía como una revisión privada estaba desactualizada. Mantener la audiencia actual del sitio en los siguientes despliegues.

**La información legal no está completa.** Los avisos de revisión continúan visibles porque faltan datos reales y verificaciones de las cuentas utilizadas. Un aviso de revisión no subsana esas carencias. No se ha confirmado la condición de autónomo o sociedad ni se han rellenado datos ficticios.

## Información necesaria para cerrar la revisión legal

- Nombre y apellidos del titular, NIF y domicilio de la actividad. Sanlúcar no sustituye al domicilio. Confirmar la forma real de ejercer la actividad y registros/autorizaciones solamente si aplican.
- Gmail personal o Google Workspace, cuenta y proveedor desde los que se responde, y reglas reales de Cloudflare Email Routing. Confirmar si hay otros destinos o Email Workers.
- WhatsApp personal o Business; personas con acceso, sincronización de contactos y copias de seguridad que afecten a las consultas profesionales.
- Criterios efectivos de conservación/eliminación de consultas sin contratación, mensajes, encargos y copias; procedimiento para atender derechos.
- Condiciones de las cuentas de OpenAI, Cloudflare, Google y Meta: entidades y funciones, tratamiento de datos técnicos, conservación, subencargados y garantías de transferencias. Las políticas generales no prueban qué acuerdo o configuración aplica a una cuenta concreta.

Estas preguntas se han trasladado a Fernando. No se necesita acceso a contraseñas ni al contenido de sus conversaciones para completar la información.

## Correcciones realizadas

- Textos del proyecto, Fernando, servicios y presupuesto más concretos. WhatsApp sigue siendo el contacto principal; no se han añadido precios ni resultados inventados.
- Capturas originales de escritorio y móvil juntas, dentro de un enlace a ADESA80, con variantes WebP adaptativas.
- Imagen social propia de 1200 × 630 y metadatos Open Graph/Twitter en la portada y las tres páginas legales.
- Referencias a una supuesta web privada sustituidas por el estado público real.
- Cookie técnica `__cf_bm` observada en el dominio añadida a la política; preferencia local `fgbuzon-theme` documentada. No se han añadido analítica, píxeles ni servicios incrustados.
- `robots.txt` permite rastrear para que los buscadores puedan leer el `noindex` del HTML. **Noindex no restringe el acceso público ni garantiza que una URL desaparezca inmediatamente.**

## Indexación pendiente

Se conserva `noindex, nofollow` en todos los HTML mientras se completa la información legal. El canonical y el sitemap están preparados con el dominio real; no se ha solicitado su indexación ni enviado el sitemap a Search Console.

Cuando se complete la revisión:

1. Incorporar la identificación, bases jurídicas, criterios de conservación y proveedores reales a los documentos. Revisarlos y retirar los avisos de revisión.
2. Revisar las cookies y solicitudes del dominio en un navegador limpio y confirmar los tratamientos del alojamiento y el correo. Si se incorporan tecnologías sujetas a consentimiento, bloquearlas hasta obtenerlo y ofrecer aceptar/rechazar de forma equivalente.
3. Sustituir `noindex, nofollow` por `index, follow` en la portada y las páginas reales; conservar noindex en 404. Mantener `Allow: /` y verificar sitemap, canonical, HTTPS y redirecciones.
4. Actualizar las expectativas de indexación y estado legal en las comprobaciones de `scripts/check-site.mjs`.
5. Publicar, comprobar el HTML y cabeceras servidos en el dominio y solicitar indexación cuando se disponga de Search Console.

## Demostración de gestión de ADESA80 pendiente

La composición actual muestra la web pública, como indica su leyenda. Para demostrar un flujo de gestión hacen falta una captura auténtica con autorización de publicación o una demo accesible con datos ficticios. No se ha creado un panel que pueda confundirse con trabajo real ni se han expuesto datos de socios, pagos o menores. Se añadirá el material debajo de la composición actual cuando esté disponible.

## Fuentes para la revisión

- [LSSI, artículo 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10).
- [RGPD, artículos 6 y 13](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679).
- [Guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf).
- [Documentación de cookies de Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/).
- [Google: permitir rastreo para leer noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=es).
- [Privacidad de ChatGPT Sites](https://help.openai.com/en/articles/20001341).
- [DPA de ChatGPT Sites](https://openai.com/policies/chatgpt-sites-data-processing-addendum/).
- [Condiciones de Cloudflare Email Routing](https://www.cloudflare.com/service-specific-terms-developer-platform/).
- [DPA de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).
- [Política de privacidad de Google](https://policies.google.com/privacy?hl=es).

La web no admite pagos ni contratación online. Alcance, precio e impuestos, pagos, entregas, derechos, alojamiento y mantenimiento se concretan en cada propuesta y contrato antes de empezar.
