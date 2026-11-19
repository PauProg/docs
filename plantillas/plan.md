---
tipo: plan
---

# Plan: <título del trabajo>

> Guía: al rellenar, borra las líneas que empiecen por «Guía:» y las secciones que no apliquen. El plan dice CÓMO, a partir de la spec aprobada y del código real: lee el código antes de escribirlo. Se escribe **en presente**: cómo se hace ahora. Lo superado se borra; la historia la guardan git y «Cambios» de la spec. Máximo ~100 líneas.

> Enfoque en 3 líneas como máximo.

## Reglas aplicables
> Guía: reglas del proyecto que este cambio debe cumplir (negocio, estilo, seguridad), con enlace. «Ninguna» si no hay.

## Código afectado
> Guía: ficheros y funciones que se tocan, con ruta `repo:ruta`.

| Ruta | Qué cambia | Por qué |
| --- | --- | --- |
| | | |

## Enfoque
> Guía: cómo se resuelve. Si había alternativas, di cuál se descarta y por qué, en presente («se descarta X porque…»). Si el enfoque cambia durante el trabajo sin cambiar el alcance, se reescribe la parte afectada y la opción abandonada queda aquí como descartada, con su motivo: el plan no guarda historia, pero sí el porqué.

## Contrato
> Guía: solo si `impacto` es `contrato`; si no, borra la sección. Estado antes y después de endpoints, payloads o esquema de datos.

## Cómo se comprobará cada criterio
> Guía: una fila por criterio de la spec (CA1, CA2…), con la comprobación decidida antes de implementar.

| Criterio | Comprobación |
| --- | --- |
| CA1 | test automático o prueba manual: <cuál> |

## Impacto operativo
> Guía: despliegue, configuración nueva (sin valores secretos), datos afectados y cómo se revierte.

## Riesgos
| Riesgo | Mitigación |
| --- | --- |
| | |

## Documentación técnica
> Guía: qué cambia en cada documento que la spec lista como afectado. Será una tarea de `tasks.md`.
