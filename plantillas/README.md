# Plantillas

Todo documento del cerebro sale de una de estas plantillas: la plantilla manda sobre cualquier documento existente. Si hace falta un tipo nuevo, primero se crea su plantilla.

| Plantilla | `tipo` | Dónde va |
| --- | --- | --- |
| [proyecto](proyecto.md) | `proyecto` | `proyectos/<p>/README.md` |
| [trabajos](trabajos.md) | `planner` | `proyectos/<p>/trabajos/README.md` |
| [spec](spec.md) | `spec` | `proyectos/<p>/trabajos/NNNN-slug/spec.md` |
| [plan](plan.md) | `plan` | `…/NNNN-slug/plan.md` |
| [tasks](tasks.md) | `tasks` | `…/NNNN-slug/tasks.md` |
| [informe](informe.md) | `informe` | `…/NNNN-slug/informe.md`, solo al cerrar |
| [tecnica](tecnica.md) | `tecnica` | `proyectos/<p>/<tema>/NN-nombre.md` y `sistemas/<repo>/` |
| [tecnica-indice](tecnica-indice.md) | `tecnica` | `proyectos/<p>/<tema>/README.md` |
| [inventario](inventario.md) | `inventario` | `proyectos/<p>/<tema>/NN-nombre.md`, junto a la nota técnica de su tema |
| [definicion](definicion.md) | `definicion` | `proyectos/<p>/definiciones/` |
| [decision](decision.md) | `decision` | `decisiones/AAAA-MM-DD-slug.md` |
| [equipo](equipo.md) | `equipo` | `equipo/<usuario>.md` |
| [semanal](semanal.md) | `semanal` | `semanal/AAAA-Wnn.md` |
| [procedimiento](procedimiento.md) | `procedimiento` | `procedimientos/<slug>.md` |

Formato común: cabecera YAML con `tipo`, título, resumen de 3 líneas como máximo y secciones fijas. Las líneas «Guía:» se borran al rellenar.
