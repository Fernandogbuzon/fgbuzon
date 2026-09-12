# FG Buzón · Requisitos para publicación pública

Estado: **revisión privada**. No cambiar la audiencia del alojamiento ni habilitar indexación hasta completar esta lista. Los textos actuales muestran claramente su condición de borrador.

## Datos que debe aportar o confirmar Fernando

- Nombre y apellidos del titular, NIF y domicilio apto para la identificación legal. La localidad no sustituye al domicilio. Confirmar la forma real de ejercer la actividad y registros solamente si aplican.
- Gmail personal o Google Workspace, proveedor de correo saliente y reglas reales de Cloudflare Email Routing; confirmar que no hay otros destinos ni Email Workers.
- WhatsApp personal o Business; accesos compartidos, sincronización de contactos y copias de seguridad que afecten a consultas profesionales.
- Criterios de eliminación de consultas sin contratación, mensajes y copias; conservación de encargos conforme a las obligaciones que correspondan, y procedimiento de atención de derechos.

## Comprobaciones de proveedores

Identificar el acuerdo de ChatGPT Sites aplicable a la cuenta, datos técnicos tratados, registros accesibles, conservación, subencargados y transferencias. Verificar las entidades, funciones y condiciones de Cloudflare y Google correspondientes a las cuentas utilizadas. No asumir residencia exclusiva en Europa ni una duración de conservación sin comprobarla.

Fuentes consultadas:

- [LSSI, artículo 10](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10).
- [RGPD, artículos 6 y 13](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679).
- [Guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf).
- [Privacidad de ChatGPT Sites](https://help.openai.com/en/articles/20001341).
- [DPA de ChatGPT Sites](https://openai.com/policies/chatgpt-sites-data-processing-addendum/).
- [Condiciones de Cloudflare Email Routing](https://www.cloudflare.com/service-specific-terms-developer-platform/).
- [DPA de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).
- [Política de privacidad de Google](https://policies.google.com/privacy?hl=es).

## Preparación ya realizada

- Aviso legal y condiciones de uso en `/aviso-legal/`.
- Privacidad en `/privacidad/`, con enlace junto al contacto.
- Información sobre preferencias y cookies en `/cookies/`; sin banner para la preferencia solicitada expresamente.
- Canonical y sitemap con el destino solicitado `https://fgbuzon.com`. **El dominio todavía no está conectado.**
- Metadatos de título y descripción propios de cada página, también para enlaces compartidos.
- Meta robots `noindex, nofollow` en todos los HTML; `robots.txt` impide el rastreo durante la revisión. Estas medidas no sustituyen al acceso privado del alojamiento.

## Secuencia de lanzamiento

1. Completar datos y prácticas reales; revisar bases jurídicas, conservación, destinatarios y garantías de transferencias. Incorporarlos a los documentos y retirar los avisos de revisión.
2. Confirmar que el dominio público será `https://fgbuzon.com`; si cambia, actualizar todos los canonical, og:url, sitemap y referencia de robots.
3. Conectar el dominio en el alojamiento elegido y verificar HTTPS, redirecciones, rutas legales y 404 sin convertirlas en respuestas 200.
4. Revisar cookies, almacenamiento y solicitudes en un navegador limpio en el origen definitivo. Actualizar las políticas según ese resultado. Si se añaden tecnologías sujetas a consentimiento, bloquearlas hasta obtenerlo y ofrecer aceptar/rechazar de forma equivalente.
5. Con los requisitos resueltos, habilitar la audiencia pública y la indexación: sustituir `noindex, nofollow` por `index, follow` en páginas reales; conservar noindex en 404; cambiar `Disallow: /` por `Allow: /`. El servidor local seguirá enviando noindex.
6. Repetir la verificación de navegación y enlaces en el alojamiento definitivo. Medir rendimiento real cuando haya tráfico; las mediciones locales no acreditan experiencia de usuarios reales.

La web no admite pagos ni contratación online. Alcance, precio e impuestos, pagos, entregas, derechos, alojamiento y mantenimiento se concretan en cada propuesta y contrato antes de empezar.
