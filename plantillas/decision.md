---
tipo: decision
estado: propuesta | vigente | sustituida | descartada
fecha: AAAA-MM-DD
owner: <usuario-gitlab>
ambito: <proyecto> | <proyecto>, <proyecto> | transversal
origen:
relacionado:
sustituye:
sustituida_por:
---

# <La decisión, en una frase con verbo: «Autenticar…», «Usar…»>

> Guía: va en `decisiones/AAAA-MM-DD-slug.md` (fecha de la decisión, slug de 2-5 palabras). Una decisión por fichero. Recoge el QUÉ y el POR QUÉ; el CÓMO detallado vive en la documentación técnica, que se enlaza. Borra las líneas que empiecen por «Guía:» y los campos de cabecera vacíos.
> Guía: `estado`: `propuesta` hasta que el owner la confirma; `vigente` mientras se aplica; `sustituida` cuando otra la reemplaza (rellena `sustituida_por`); `descartada` si no se adopta. Una decisión vigente no se reescribe: si cambia, se crea otra y esta pasa a `sustituida`.
> Guía: `origen`: el trabajo o la conversación de la que sale (`crm/0004-…`). `relacionado`: trabajos o decisiones que la tocan.
> Guía: **transición.** Si un trabajo plantea cambiar una decisión vigente, la nueva se crea en ese momento como `propuesta` con `sustituye: <la vigente>`, y la vigente gana `relacionado: <la nueva>` y una línea «En revisión» en «Cuándo revisarla», sin cambiar de estado. Mientras dure, en «Consecuencias» de la propuesta se dice dónde se aplica ya y dónde no. Al cerrar el trabajo: si se aplica en todas partes, la nueva pasa a `vigente` y la antigua a `sustituida` (con `sustituida_por`); si se abandona, la nueva pasa a `descartada` y la antigua sigue `vigente` sin la línea «En revisión».

> Resumen en 3 líneas como máximo: qué se decide, por qué y cuándo se revisaría.

## Contexto
> Guía: el problema o la necesidad, y las restricciones que limitan las opciones. Hechos, no opiniones.

## Decisión
> Guía: lo decidido, en una lista corta. Enlaza la nota técnica que lo detalla en vez de copiarla.

## Alternativas descartadas
| Alternativa | Por qué no |
| --- | --- |
| | |

## Consecuencias
> Guía: lo que se gana, los riesgos que se aceptan y lo que obliga a hacer (mantenimiento, rotaciones, límites).

## Cuándo revisarla
> Guía: la condición concreta que obligaría a reabrir la decisión. «No se prevé» si no hay ninguna.
