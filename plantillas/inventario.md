---
tipo: inventario
comprobado: AAAA-MM-DD
fuente: <de dónde sale: consulta, API, panel…>
---

# Inventario: <qué se registra>

> Guía: un inventario registra cosas que existen fuera del código y no se pueden regenerar a partir de él (webhooks en un servicio externo, ids, URLs). Va junto a la nota técnica de su tema, con número como cualquier nota; la nota explica cómo funciona y enlaza el inventario. Borra las líneas que empiecen por «Guía:».
> Guía: **sí lleva** fecha de alta y estado de cada elemento, y en la cabecera `comprobado` (última vez que se contrastó con la realidad, no la última edición). **No lleva** prosa de evidencias, referencias a trabajos ni explicaciones de funcionamiento. Una frase por celda.
> Guía: las bajas, una vez confirmadas, se borran de la tabla: las guarda git. El inventario muestra lo que existe hoy.

> Resumen en 3 líneas como máximo: qué se registra, por qué no se puede sacar del código y dónde se usa.

## Qué se registra y por qué
> Guía: qué es cada elemento y qué no se puede obtener de otro modo (por ejemplo, el servicio externo no devuelve la URL).

## <Entorno o grupo>
> Guía: una tabla por entorno o grupo, con las mismas columnas. Ajusta las columnas al tipo de elemento, pero conserva «Alta» y «Estado».

| Id | Qué es | Dónde | Alta | Estado |
| --- | --- | --- | --- | --- |
| | | | AAAA-MM-DD | |

## Cómo mantenerlo
- **Alta:** <de dónde se copian los datos al crear un elemento>.
- **Baja:** <cómo se confirma antes de borrar la fila>.
- **Comprobación:** <qué consulta se hace y con qué se compara>; al terminar, actualiza `comprobado`.
