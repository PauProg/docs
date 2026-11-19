---
tipo: tecnica
actualizado: AAAA-MM-DD
codigo: <repo>:<ruta>, <ruta>
---

# <Tema>: <qué parte del tema cubre esta nota>

> Guía: una nota describe UN tema del sistema tal como funciona HOY, escrita a partir del código (la documentación antigua solo orienta). Sin fases, personas, fechas de proyecto, pruebas ni referencias a trabajos o criterios: eso vive en la spec del trabajo. Máximo ~200 líneas: si crece, divídela en una carpeta de notas con su índice (`plantillas/tecnica-indice.md`). Borra las líneas que empiecen por «Guía:».
> Guía: `codigo`: las rutas que describe; si el código cambia después de `actualizado`, la nota puede estar vieja. Actualiza `actualizado` cada vez que la toques.

> Resumen en 3 líneas como máximo: qué es, qué hace y dónde encaja.

## <Sección>
> Guía: secciones libres según el tema. Tablas y listas, sin relleno; prosa solo para el porqué. Cita funciones y ficheros con su nombre exacto. Enlaza otras notas, no copies su contenido.

## Observaciones del código
> Guía: opcional. Comportamientos llamativos o posibles fallos vistos al leer el código, con su ubicación (`fichero.ts:línea`) y si están probados o no. Si un hallazgo pasa a trabajo, enlázalo. Borra la sección si no hay ninguna.
