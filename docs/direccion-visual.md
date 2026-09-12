# FG Buzón · Dirección visual

Propuesta para la futura implementación · 12 de septiembre de 2026

## Marca y criterio general

Conservar el logotipo tipográfico «fgbuzon.» de la imagen aportada: minúsculas, peso alto, espaciado compacto y punto verde. La referencia está en [assets/reference/brand-instagram.jpg](../assets/reference/brand-instagram.jpg).

La web debe mostrar poco texto por bloque, una jerarquía clara y detalle en las proporciones, el espaciado y el uso del proyecto real. La versión web del logotipo se preparará a partir de la marca cuando se implemente; el JPG actual se conserva como referencia.

FG Buzón es la marca pública principal. FGB Studio es el nombre del estudio indicado en el brief; no necesita otra presencia visual que compita con la marca.

## Dos temas, una identidad

- Primera visita: usar la preferencia del sistema.
- Selector persistente en la cabecera: «Sistema», «Claro» y «Oscuro».
- Guardar la elección manual entre visitas. «Sistema» vuelve a seguir la apariencia del dispositivo.
- Cuando el usuario esté en «Sistema», responder a cambios de apariencia del dispositivo.
- Aplicar el tema antes del primer pintado de la página para evitar un destello del tema opuesto.
- Conservar exactamente el contenido, el orden y la jerarquía en ambos temas.
- Nombre accesible del control: «Apariencia». Identificar la opción seleccionada con texto o estado semántico, además del color.

El tema claro combina marfil con verde profundo. El oscuro combina un fondo casi negro con matiz verde y un acento verde suave más luminoso.

## Paleta semántica

Propuesta propia inspirada en la referencia; los colores no se presentan como una extracción exacta del JPG.

| Uso, fondo y su texto asociado | Tema claro | Tema oscuro |
| --- | --- | --- |
| Fondo / texto | #F6F5F0 / #102019 | #0B1410 / #F4F7F4 |
| Superficie / texto | #FFFFFF / #102019 | #14231B / #F4F7F4 |
| Superficie tenue / texto secundario | #EAF0E9 / #536359 | #1B2E22 / #A6B7AC |
| Botón principal / texto | #16794F / #FFFFFF | #75DDA7 / #0B1410 |
| Botón principal al pasar el cursor / texto | #10623F / #FFFFFF | #94E8BB / #0B1410 |
| Botón secundario / texto | #E2EEE5 / #185C3E | #243C2E / #D9F3E2 |
| Enlace / fondo general | #16794F / #F6F5F0 | #75DDA7 / #0B1410 |
| Borde de control | #708379 | #617369 |
| Separador decorativo | #D6DFD6 | #2C4133 |
| Indicador de foco | #16794F | #75DDA7 |

Usar el verde para el punto del logotipo, el CTA, enlaces y pequeños indicadores. Los enlaces dentro de texto tienen subrayado. Los separadores suaves son decorativos; los controles que necesitan un borde reconocible usan el token de borde de control.

Escala auxiliar del verde, generada variando luminosidad y saturación:

| Tono | Hex |
| --- | --- |
| 50 | #F3FCF8 |
| 100 | #E7F8F1 |
| 200 | #CAF1E1 |
| 300 | #98E7C5 |
| 400 | #5EDEA8 |
| 500 | #26CF87 |
| 600 | #1FAD71 |
| 700 | #1A8E5D |
| 800 | #15754C |
| 900 | #105638 |
| 950 | #082B1C |

Los tokens semánticos de la tabla principal prevalecen sobre esta escala. El verde principal claro es #16794F y el acento oscuro #75DDA7.

## Tipografía

Elegir [Geist Sans, de Vercel](https://vercel.com/font), para titulares, párrafos, botones y navegación. Es una propuesta de tipografía para la web; no se identifica como la fuente exacta del logotipo de referencia.

- Titular principal: aproximadamente 44–52 px en móvil y 72–88 px en escritorio; peso 600–650, interlineado 1,05 y espaciado de letras ligeramente negativo.
- Títulos de sección: 30–48 px según ancho de pantalla.
- Cuerpo: 17–18 px, interlineado 1,5–1,6; párrafos de hasta unas 55–65 letras por línea.
- Metadatos y rótulos: 13–14 px con contraste suficiente.
- Controles: 15–16 px y texto explícito.
- Evitar reducir el titular hasta perder presencia para hacerlo caber en una sola línea.

## Composición

Ancho general máximo de unos 1200 px. Márgenes laterales de 24 px en móvil y 40 px en escritorio. Espacio entre secciones de 64–80 px en móvil y 96–120 px en escritorio, ajustado para mantener una lectura ágil.

Hero alineado a la izquierda. La captura del proyecto puede ocupar aproximadamente un 40 % de la composición en escritorio. ADESA80 recibe la mayor superficie visual de toda la landing.

Servicios en una cuadrícula de dos columnas con separadores; proceso como lista de cuatro pasos; FAQ como acordeón; contacto como un bloque final sencillo con un solo CTA principal.

El cuidado visual procede de la tipografía, las capturas reales, las superficies y las alineaciones. La página conserva una lectura rápida y todos sus enlaces se pueden utilizar con teclado.

## ADESA80: contenido y prueba

La web pública [adesa80.com](https://adesa80.com/) identifica al club de Sanlúcar de Barrameda y acredita «Diseño y desarrollo: fgbuzon» en el pie. Esta presencia pública se consultó el 12 de septiembre de 2026. La descripción de pagos, roles, gestión interna, datos en tiempo real y arquitectura preparada para otros clubes procede del brief de Fernando; no se presenta como una auditoría independiente del sistema.

Elementos visuales previstos:

1. Captura auténtica de la web pública, reconocible también a tamaño móvil.
2. Captura de gestión de horarios por zonas o instalaciones, preparada con datos de demostración.
3. Rótulos «Web pública» y «Gestión del club», con pies breves que expliquen la utilidad de cada vista.

El panel interno no se ha inspeccionado en este trabajo y sus capturas quedan por aportar al implementar. No inventar paneles, cifras, testimonios, resultados económicos ni una adopción por varios clubes. La arquitectura se presenta como preparada para incorporar otros clubes.

## Contacto y navegación

CTA principal repetido en hero y cierre: WhatsApp al +34 674 036 944.

Mensaje precompletado: «Hola, Fernando. Quiero comentarte un proyecto web para mi negocio.»

La llamada usa tel:+34674036944. El correo usa mailto:rrss@fgbuzon.com. Instagram enlaza a https://www.instagram.com/fgbuzon/. Son accesos que abre el visitante; esta preparación no envía mensajes.

La cabecera enlaza a Proyecto, Servicios y Cómo trabajo. El botón «Hablemos» lleva al bloque de contacto. Hero y CTA final abren directamente WhatsApp. No hace falta un formulario en esta propuesta.

## Verificación de contraste de la propuesta

Se han calculado las relaciones entre colores sólidos con luminancia relativa sRGB. Los pares de texto enumerados superan 4,5:1; bordes de control e indicadores de foco superan 3:1 frente a las superficies comprobadas. Esto valida estos pares de color, no constituye una auditoría de una web implementada.

| Tema | Par semántico | Relación calculada |
| --- | --- | --- |
| Claro | foreground / background | 15.48:1 |
| Claro | cardForeground / card | 16.90:1 |
| Claro | mutedForeground / background | 5.84:1 |
| Claro | mutedForeground / muted | 5.50:1 |
| Claro | mutedForeground / card | 6.37:1 |
| Claro | primaryForeground / primary | 5.41:1 |
| Claro | primaryForeground / primaryHover | 7.39:1 |
| Claro | secondaryForeground / secondary | 6.67:1 |
| Claro | primary / background | 4.96:1 |
| Claro | primary / card | 5.41:1 |
| Claro | border / background | 3.69:1 |
| Claro | border / card | 4.03:1 |
| Claro | focus / background | 4.96:1 |
| Claro | focus / card | 5.41:1 |
| Oscuro | foreground / background | 17.35:1 |
| Oscuro | cardForeground / card | 15.13:1 |
| Oscuro | mutedForeground / background | 8.91:1 |
| Oscuro | mutedForeground / muted | 6.84:1 |
| Oscuro | mutedForeground / card | 7.77:1 |
| Oscuro | primaryForeground / primary | 11.28:1 |
| Oscuro | primaryForeground / primaryHover | 12.94:1 |
| Oscuro | secondaryForeground / secondary | 10.15:1 |
| Oscuro | primary / background | 11.28:1 |
| Oscuro | primary / card | 9.84:1 |
| Oscuro | border / background | 3.71:1 |
| Oscuro | border / card | 3.24:1 |
| Oscuro | focus / background | 11.28:1 |
| Oscuro | focus / card | 9.84:1 |

Al implementar se revisarán también foco visible, nombres accesibles, navegación por teclado, zoom, anchos pequeños y legibilidad de las capturas.

## Condiciones comerciales por concretar

Fernando no tiene todavía plazos habituales, tarifas ni un plan de mantenimiento definidos. El copy ofrece un proceso para acordar alcance, presupuesto, fecha y soporte en cada propuesta comercial. Las respuestas de FAQ son una propuesta editorial de ese proceso.

La entrega actual consiste en copy y especificación visual. La construcción de la web, el diseño vectorial de marca, las capturas privadas y la publicación quedan para la fase de implementación.
