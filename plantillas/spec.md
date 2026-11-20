---
tipo: spec
estado: borrador
impacto: comportamiento | contrato | seguridad
owner: <usuario-github>
borrador: AAAA-MM-DD
aprobada:
planificada:
en-curso:
verificada:
cerrado:
---

# <Título: qué se hace, en una frase>

> Guía: al rellenar, borra todas las líneas que empiecen por «Guía:». La spec dice QUÉ y POR QUÉ, nunca CÓMO.
> Guía: un objetivo, una verificación y una entrega en producción (`AGENTS.md`, «Tamaño de un trabajo»). Con más de ~10 criterios, ~20 tareas o ~150 líneas, o en el segundo cambio de alcance, para y pregunta si hay que partirla.
> Guía: si es una continuación (`NNNN.n`): añade `origen: <proyecto>/NNNN` a la cabecera, sustituye «Problema» y «Objetivo» por «Criterio incumplido» y «Qué ocurre y qué se esperaba», y borra «Alcance», «Dudas abiertas» y «Cambios».

> Resumen en 3 líneas como máximo: qué se hace y por qué.

## Problema
> Guía: qué falla o qué falta y a quién afecta. Sin proponer solución.

## Objetivo
> Guía: qué debe ser cierto cuando el trabajo termine.

## Alcance
- **Dentro:**
- **Fuera:**

## Criterios de aceptación
> Guía: cada criterio lleva un identificador `CAn` que citan el plan y las tareas. «Cómo se comprobó» es el **único** sitio de la evidencia: una línea con fecha, entorno y resultado; las tareas y las notas no la repiten. Se pueden agrupar criterios con `###`, con las mismas columnas. Un criterio retirado se queda en su tabla con `no aplica` y el motivo. Formato «Cuando <situación>, entonces <resultado observable>». Incluye errores y casos límite, no solo el camino feliz. Resultado: `pendiente`, `cumple` o `no cumple`.

| ID | Criterio | Resultado | Cómo se comprobó |
| --- | --- | --- | --- |
| CA1 | Cuando <situación>, entonces <resultado> | pendiente | |

## Documentación técnica afectada
> Guía: rutas en `proyectos/` o `sistemas/` que cambian, o «ninguna».

-

## Dudas abiertas
> Guía: preguntas sin responder. Se vacía antes de aprobar.

## Cambios
> Guía: solo si cambia el alcance tras aprobar. Hay que volver a aprobar. Una frase por cambio: qué cambió y por qué.

| Fecha | Qué cambió y por qué |
| --- | --- |

## Verificación
- **¿La spec era correcta?** ¿Lo construido resuelve el problema real?
- **Documentación técnica actualizada:** sí / no, y dónde.
- **Confirmado por:** <usuario-github>, AAAA-MM-DD
