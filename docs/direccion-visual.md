# FG Buzón · Dirección visual implementada

Revisión del 12 de septiembre de 2026.

## Identidad y composición

Logotipo tipográfico «fgbuzon.» en minúsculas, peso alto y punto verde. Geist variable local. Fondo marfil en claro y negro verdoso en oscuro.

Presentación en dos columnas en escritorio y una en móvil; titular con límite de 88 px. En móvil el titular usa 40–48 px y puede ocupar más líneas en pantallas estrechas. Textos habituales de 16–18 px; notas secundarias de 14 px.

El recorrido conserva presentación, ADESA80, Fernando, servicios, proceso, preguntas y contacto. No hay antetítulos ni numeración decorativa. ADESA80 usa una única captura legible: escritorio o móvil mediante picture/source, con dimensiones reservadas. No se inclina ni se mueve la captura.

Servicios en una cuadrícula 2 × 2 que pasa a una columna. El bloque de Fernando se integra entre separadores; el contacto concentra la superficie verde suave. El logotipo del pie tiene un límite de 144 px.

## Tokens de color

| Uso                      | Claro             | Oscuro            |
| ------------------------ | ----------------- | ----------------- |
| Fondo / texto            | #F6F5F0 / #102019 | #0B1410 / #F4F7F4 |
| Superficie               | #FFFFFF           | #14231B           |
| Texto secundario         | #536359           | #A6B7AC           |
| Botón / texto            | #16794F / #FFFFFF | #75DDA7 / #0B1410 |
| Botón hover              | #10623F           | #94E8BB           |
| Superficie suave / texto | #E2EEE5 / #185C3E | #243C2E / #D9F3E2 |
| Borde de control         | #708379           | #82988A           |
| Separador                | #D6DFD6           | #2C4133           |

## Tema y accesibilidad

El sistema decide la apariencia inicial. El control de 44 × 44 px abre opciones nativas de radio Sistema/Claro/Oscuro. La elección se recuerda y se sincroniza entre pestañas; en Sistema responde a los cambios del dispositivo. El tema se aplica antes de pintar. Si el almacenamiento falla, la selección sigue funcionando durante la visita.

El control aparece solo si el JavaScript se inicializa. Sin JavaScript, CSS sigue al sistema y siguen funcionando navegación, contenido y preguntas nativas.

Hay enlace para saltar al contenido, foco visible, controles de al menos 44 px en las acciones principales, encabezados semánticos y textos alternativos. La lista de proceso conserva su semántica aunque no tenga marcadores visibles.

## Movimiento

| Antes                                        | Después                                          | Propósito                       |
| -------------------------------------------- | ------------------------------------------------ | ------------------------------- |
| Capturas inclinadas con transición de 500 ms | Capturas estables                                | Leer el proyecto sin movimiento |
| Botones sin presión definida                 | Escala 0,98, 100 ms al pulsar y 160 ms al soltar | Confirmar interacción           |
| Giro del icono FAQ                           | Opacidad de la barra vertical, 120 ms            | Expresar apertura               |
| Menú inmediato sin transición                | Apertura de 160 ms y 4 px, cierre inmediato      | Relacionar control y panel      |
| Desplazamiento suave global                  | Navegación directa                               | Respuesta predecible            |

Curva común `cubic-bezier(.23, 1, .32, 1)`. Hover solo con puntero fino; las flechas se desplazan 2 px. La selección local de tema cambia únicamente la opacidad del fondo del radio durante 120 ms. Cambios de teclado, sistema y otras pestañas son inmediatos.

Movimiento reducido elimina desplazamientos, escalados y transiciones, y cancela animaciones activas. Sin bucles, parallax, librerías de movimiento ni contenido oculto esperando al scroll.
