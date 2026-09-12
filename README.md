# FG Buzón

Landing de Fernando para fgbuzon.com. Siete secciones, contacto directo y temas claro/oscuro que siguen al sistema o recuerdan la elección del visitante.

## Desarrollo local

Requiere Node.js 22 o posterior. No hay dependencias de ejecución ni instalación necesaria.

```sh
npm run dev
```

La vista previa se sirve en `http://127.0.0.1:4173`. Se puede cambiar el puerto con la variable `PORT`.

## Estructura

- `dist/index.html`: contenido, estructura semántica y aplicación inicial del tema.
- `dist/assets/site.css`: diseño y comportamiento responsive.
- `dist/assets/site.js`: preferencia de tema y menú móvil.
- `dist/assets/`: fuente Geist alojada localmente, licencia y capturas reales de ADESA80.
- `scripts/preview.mjs`: servidor local de desarrollo, sin dependencias.
- [Copy y propuestas de hero](docs/landing-copy.md).
- [Dirección visual y paleta](docs/direccion-visual.md).

`dist/` contiene los archivos fuente públicos listos para servir. No es una carpeta generada: se versiona y se edita directamente. Puede publicarse en cualquier alojamiento estático que respete sus rutas. `.openai/hosting.json` identifica la publicación privada de revisión en Sites; el dominio comercial se configura por separado en el alojamiento definitivo.

## Contenido y privacidad

Los enlaces de WhatsApp, llamada, email e Instagram abren el canal elegido por el visitante. No hay formularios, analítica, cookies de seguimiento ni servicios externos al cargar la página. La única preferencia guardada localmente es `fgbuzon-theme`.

Las capturas muestran la web pública de [ADESA80](https://adesa80.com/), tomadas el 12 de septiembre de 2026. Las capacidades de la gestión interna proceden del brief de Fernando. No se han simulado capturas del panel privado.

Repositorio: [Fernandogbuzon/fgbuzon](https://github.com/Fernandogbuzon/fgbuzon).
