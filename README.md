# Cerebro del equipo

Documentación, trabajos y decisiones de los proyectos. La IA lee primero [AGENTS.md](AGENTS.md).

## En marcha
| Trabajo | Estado | Owner | Siguiente paso |
| --- | --- | --- | --- |

## ¿Qué busco?
| Quiero… | Voy a |
| --- | --- |
| Saber qué se está haciendo | La tabla «En marcha», arriba |
| Ver los trabajos de un proyecto por estado | Su planner: `proyectos/<proyecto>/trabajos/README.md` |
| Entender cómo funciona algo hoy | `proyectos/<proyecto>/`, sus notas técnicas |
| Saber por qué se hizo un cambio | La spec o el informe: `proyectos/<proyecto>/trabajos/NNNN-slug/` |
| Entender por qué el cerebro funciona así | [Diseño del cerebro](sistemas/cerebro/README.md) |

Si vienes de Jira: un **trabajo** es la incidencia (su clave es `proyecto/NNNN`), los **criterios** son los de aceptación, el **planner** es el tablero, los **estados** son el flujo (`borrador → … → cerrado`) y `tasks.md` son las subtareas.

## Proyectos
| Proyecto | Qué es | Planner | Activos |
| --- | --- | --- | --- |
| [ejemplo-tienda](proyectos/ejemplo-tienda/README.md) | Ejemplo ficticio; se borra al crear el primero real | [Planner](proyectos/ejemplo-tienda/trabajos/README.md) | 0 |

## Primer proyecto
1. Crea `proyectos/<proyecto>/README.md` desde `plantillas/proyecto.md`.
2. Crea su planner en `proyectos/<proyecto>/trabajos/README.md` desde `plantillas/trabajos.md`.
3. Añade la fila a «Proyectos» con su recuento de «Activos».
4. `node scripts/generar-indice.mjs` y después `node scripts/comprobar-docs.mjs`.

## Más
[Equipo](equipo/) · [Decisiones](decisiones/) · [Diseño del cerebro](sistemas/cerebro/README.md) · [Sistemas](sistemas/) · [Plantillas](plantillas/) · [Cómo se trabaja](#cómo-se-trabaja)

## Cómo se trabaja
1. Los repos de código y este se clonan como carpetas hermanas y se abren juntos en un workspace de VS Code.
2. Todo cambio de código que altere comportamiento, función, contrato o seguridad sigue el flujo **spec → plan → tareas → verificación → informe**. Las plantillas están en `plantillas/` y las reglas en [AGENTS.md](AGENTS.md).
3. **La IA propone; el desarrollador decide y responde.** La IA no hace commits: el desarrollador revisa el diff, hace el commit y lo sube.

## Reglas básicas
- Nunca secretos en este repo: ni contraseñas, ni tokens, ni contenido de `.env`.
- Un trabajo cerrado no se reabre: si falla lo entregado, se crea una continuación.
- Una spec cerrada describe un cambio, no el sistema actual. La verdad sobre cómo es el sistema está en la documentación técnica.
