---
tipo: spec
estado: cerrado
impacto: comportamiento
owner: usuario-ejemplo
borrador: 2026-11-09
aprobada: 2026-11-09
planificada: 2026-11-10
en-curso: 2026-11-10
verificada: 2026-11-12
cerrado: 2026-11-12
---

# Filtrar el catálogo por categoría

> Quien compra no puede acotar el catálogo a una categoría y tiene que recorrerlo entero. Se añade un filtro por categoría para que encuentre antes lo que busca.

## Problema
El catálogo muestra todos los productos en una sola lista. Con más de 200 productos, quien compra recorre la lista completa para llegar a su categoría.

## Objetivo
Cuando alguien elige una categoría, el catálogo muestra solo sus productos y la elección sobrevive a una recarga.

## Alcance
- **Dentro:** filtro por una categoría en la página del catálogo; la categoría va en la URL.
- **Fuera:** filtros por precio o marca; elegir varias categorías a la vez.

## Criterios de aceptación
| ID | Criterio | Resultado | Cómo se comprobó |
| --- | --- | --- | --- |
| CA1 | Cuando se elige una categoría, entonces solo se muestran productos de esa categoría | cumple | 2026-11-12, producción, prueba manual con 3 categorías: correcto |
| CA2 | Cuando se recarga la página con una categoría elegida, entonces la categoría sigue elegida | cumple | 2026-11-12, producción, recarga y enlace copiado: correcto |
| CA3 | Cuando se elige una categoría sin productos, entonces aparece «No hay productos en esta categoría» | cumple | 2026-11-12, test automático: correcto |
| CA4 | Cuando la URL trae una categoría que no existe, entonces se muestra el catálogo completo | cumple | 2026-11-12, test automático: correcto |

## Documentación técnica afectada
- `proyectos/ejemplo-tienda/catalogo.md`

## Verificación
- **¿La spec era correcta?** Sí: resuelve el problema real y no hizo falta cambiar ningún criterio.
- **Documentación técnica actualizada:** sí, en `proyectos/ejemplo-tienda/catalogo.md`.
- **Confirmado por:** usuario-ejemplo, 2026-11-12
