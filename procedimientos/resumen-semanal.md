---
tipo: procedimiento
actualizado: 2026-11-20
---

# Generar el resumen semanal

> Deja en `semanal/AAAA-Wnn.md` lo que avanzó el equipo en una semana, con enlace a cada trabajo. Se usa solo cuando alguien lo pide.

## Cuándo
Cuando el desarrollador pide el resumen de una semana concreta. Nunca por iniciativa de la IA.

## Lee
- Los planners `proyectos/<p>/trabajos/README.md` de los proyectos con movimiento.
- Las cabeceras de las specs que cambiaron de estado en las fechas de la semana (campos `borrador`, `aprobada`… con fecha).
- `git log --since=<desde> --until=<hasta> --name-only` (solo lectura) para contrastar.
- No abras informes, trabajos cerrados fuera de la semana ni resúmenes anteriores.

## Pasos
1. Calcula el rango `desde`/`hasta` (lunes a domingo, fechas ISO) de la semana pedida.
2. Lista los trabajos que cambiaron de estado o avanzaron tareas en ese rango.
3. Crea `semanal/AAAA-Wnn.md` desde `plantillas/semanal.md`: tabla por proyecto y tabla por persona.
4. Rellena «No cuadra» con las discrepancias entre los trabajos y `git log`, o «Nada».
5. Ejecuta `node scripts/generar-indice.mjs` y después `node scripts/comprobar-docs.mjs`.

## Resultado
Un fichero `semanal/AAAA-Wnn.md` con la [plantilla semanal](../plantillas/semanal.md). Sin commit: lo revisa y lo confirma una persona.

## Si algo falla
Si un trabajo no tiene fecha de estado o no hay commits que lo respalden, anótalo en «No cuadra». No inventes avances ni fechas.
