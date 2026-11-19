# AGENTS.md — Director del cerebro

Memoria técnica y funcional del equipo. Lee esto primero. El detalle está en
`procedimientos/` y `plantillas/`: ábrelos solo al llegar a esa fase.

**La IA propone; el desarrollador decide y responde.** Nada se aprueba, se da por
verificado, se cierra ni se confirma sin su confirmación explícita. Nunca des por hecha
una confirmación que no has recibido.

## Mapa
```
README.md                         índice: «En marcha» y proyectos, una línea cada uno
indice.tsv                        tabla de búsqueda: una fila por documento (generada, no se edita)
proyectos/<p>/README.md           ficha del proyecto
proyectos/<p>/<tema>/             documentación técnica: README de índice y notas numeradas
proyectos/<p>/trabajos/README.md  planner del proyecto: sus trabajos por estado
proyectos/<p>/trabajos/NNNN-slug/ spec.md · plan.md · tasks.md · informe.md
sistemas/<repo>/                  Docker, despliegue, estructura del repo
sistemas/cerebro/                 por qué el cerebro funciona así
decisiones/AAAA-MM-DD-slug.md     decisiones de arquitectura o de criterio (campo `ambito`)
equipo/<usuario>.md               en qué trabaja cada persona
semanal/AAAA-Wnn.md               resumen semanal
procedimientos/ · plantillas/     pasos y formatos
```

## Leer (el mínimo)
0. **Para encontrar un documento, busca antes en `indice.tsv`** (`grep -i <palabra> indice.tsv`): cada fila trae ruta, proyecto, tipo, estado, fecha, owner, título, resumen y los ficheros de código que documenta (columna `codigo`, útil para ir de un fichero de código a su nota). No lo leas entero: pesa ~80 KB. Filtra por columna con `awk -F"	"`.
1. `README.md` → README del proyecto (o su planner, si buscas un trabajo) → cabecera de la nota. Baja al detalle solo si hace falta.
2. Lista carpetas antes de abrir ficheros: el nombre ya informa.
3. Lee las primeras líneas (cabecera y resumen) y no la nota entera.
4. **Para saber en qué punto está un trabajo**, lee su fila del planner y `tasks.md` hasta `## Hechas`. Abre la spec o el plan solo para trabajar en un criterio concreto, y solo la parte que necesites.
5. No abras sin petición expresa: trabajos cerrados, `informe.md`, `semanal/` anteriores, `plantillas/`.
6. Edita puntualmente; no reescribas ficheros.
7. Una spec cerrada describe un cambio, no el sistema actual: la verdad está en la documentación técnica.

## Antes de tocar código: clasificar
- **Trivial** (errata, comentario, formato, sin efecto en ejecución): sin SDD, commit descriptivo.
- **Cambia comportamiento, función, contrato (API, BD, config) o seguridad**: SDD completo, aunque sea una línea.
- **Duda**: SDD completo.

## Fases de un trabajo
0. **abrir**: si te piden tocar código y no es trivial, mira si el trabajo existe en
   `proyectos/<p>/trabajos/`. Si no existe, haz `git pull`, comprueba que el número no existe en `origin` y créalo (número = el último de esa carpeta + 1; si dos ramas cogen el mismo, el segundo renumera)
   y empieza siempre por la spec: no trabajes el código antes. Si el trabajo está
   `cerrado`, no lo reabras: crea una continuación.
1. **spec** (qué, por qué, criterios de aceptación). Solo pasa a `aprobada` cuando el
   desarrollador responsable lo confirma de forma explícita. Nunca la apruebes tú.
2. **plan** (cómo, leyendo el código real; incluye la tarea «actualizar documentación
   técnica afectada»). Cita los criterios por su identificador (CA1…). Pasa a `planificada`
   cuando el desarrollador lo revisa y lo confirma.
3. **tasks**: antes de empezar, comprueba que cada criterio tiene comprobación en el plan y
   al menos una tarea, y que toda tarea sirve a un criterio (salvo las de documentación
   técnica, `DOC`). Primero la comprobación de cada criterio, después la implementación.
   Marca las tareas hechas.
4. **verificar**: propón cómo comprobar cada criterio contra el comportamiento real, que la
   spec era correcta y que la documentación técnica refleja lo construido. Espera la
   confirmación del desarrollador y anota el resultado en la spec. Si algo falla, vuelve a `en-curso`.
5. **informe.md**: una hoja en lenguaje llano para el equipo. Solo al cerrar.
6. **cerrar**: pasa el trabajo a «Hecho» en el planner, quítalo de «En marcha» y actualiza `equipo/<usuario>.md`. Si el trabajo tiene una decisión en `propuesta`, resuelve la transición: la nueva a `vigente` y la que sustituye a `sustituida`, o la nueva a `descartada` (detalle en `plantillas/decision.md`).

- No escribas código sin spec aprobada y plan revisado.
- Si cambia el alcance, anótalo en «Cambios» de la spec y vuelve a aprobarla.
- Estados: `borrador → aprobada → planificada → en-curso → verificada → cerrado`, más `bloqueado` y `descartado`. Pon la fecha en la cabecera en cada cambio.
- **Planner:** en cada cambio de estado, al crear un trabajo y al marcar tareas, actualiza en el mismo cambio la línea «Siguiente:» y el recuento de `tasks.md`, `proyectos/<p>/trabajos/README.md` (grupo, recuento, «Tareas» y «Siguiente paso») y la tabla «En marcha» del `README.md` de la raíz (estado, siguiente paso y la columna «Activos» del proyecto). Grupos: **Por hacer** (`borrador`, `aprobada`, `planificada`), **En curso** (`en-curso`, `verificada`), **Bloqueado**, **Hecho** (`cerrado`, `descartado`; solo en el planner, lo último arriba). Siguiente paso por estado: `borrador` → aprobar la spec; `aprobada` → hacer el plan; `planificada` → empezar las tareas; `en-curso` → la siguiente tarea abierta; `verificada` → informe y cerrar; `bloqueado` → el motivo.

## Tamaño de un trabajo
- **Un trabajo = un objetivo, una verificación y una entrega.** La entrega es **producción**: dev es una copia de producción para probar sin riesgo, no un destino. Lo que solo funciona en dev no está terminado.
- **Antes de añadir un criterio, una tarea o un cambio de alcance, pregúntate: «¿el objetivo se cumple sin esto?».** Si sí, es otro trabajo (`relacionado`); propónlo, no lo añadas.
- **Señales de alarma:** más de ~10 criterios, más de ~20 tareas, spec de más de ~150 líneas, más de dos semanas en el mismo estado, o un segundo cambio de alcance. Al ver una, para y pregunta si hay que partir el trabajo, con una propuesta. Decide el desarrollador. Solo se parte lo que se puede entregar por separado.
- **Lo pendiente no es alcance.** La spec no tiene sección «Pendiente»: lo que no entra va a «Dudas abiertas» o a un trabajo nuevo.

## Nombres
- Trabajo: `<proyecto>/NNNN-slug` (2-5 palabras), p. ej. `crm/0007-auth-webhooks`. `NNNN` es correlativo por proyecto y no se reutiliza.
- Un trabajo `cerrado` no se reabre. Si falla lo entregado: continuación `NNNN.n-<clave1>-<clave2>`, p. ej. `crm/0007.1-firma-jwt`. Si es algo nuevo: número nuevo con `relacionado`.
- Cabeceras de enlace: `origen`, `continuado_en`, `relacionado`.
- Rama: `feature/<proyecto>-<nombre del trabajo>`, una por trabajo. El nombre del trabajo ya identifica la rama: no se anota en la spec.
- Minúsculas, guiones, sin tildes. Fechas ISO. Personas por su usuario de GitLab.

## Escribir
- **Norma estricta: todo documento que se cree, se mueva, se renombre o se borre se refleja en `indice.tsv` en el mismo cambio.** No se edita a mano: se ejecuta `node scripts/generar-indice.mjs`. Sin esa fila, el documento no existe para quien busca. El índice se alimenta de la cabecera (`tipo`, `estado`, `codigo`…) y del resumen en cita bajo el título, así que una cabecera incompleta deja una fila inútil. Si no está al día, `comprobar-docs.mjs` avisa de que está desfasado: se ejecuta antes de pedir el commit.
- Todo documento sale de su plantilla ([plantillas/README.md](plantillas/README.md)), con la cabecera completa y un resumen de 3 líneas arriba. La plantilla manda: no copies el formato de otro documento. Si el tipo no tiene plantilla, créala antes (y pide confirmación).
- Tamaño máximo: nota ~200 líneas, índice ~50, spec ~150, plan ~100, `tasks.md` ~20 tareas abiertas. Si crece, divídela (un trabajo, con un trabajo nuevo y `relacionado`).
- **Cada hecho, en un solo sitio**; los demás enlazan:
  - la evidencia de una comprobación, en «Cómo se comprobó» de la spec, en una línea (fecha, entorno, resultado);
  - una tarea hecha, en una línea (~150 caracteres) que cita su criterio, sin evidencia;
  - el plan, en presente: cómo se hace. Lo superado se borra (lo guardan git y «Cambios»);
  - la nota técnica, cómo funciona hoy, sin fechas, pruebas ni referencias a trabajos o criterios;
  - un inventario (cosas que existen fuera del código y no se pueden regenerar: webhooks, ids, URLs), con su plantilla: fecha de alta y estado de cada elemento, y las bajas confirmadas se borran;
  - la decisión y el planner, el enlace y una frase.
- Enlaza, no copies. **Nada de prosa en tablas:** una frase por celda (~200 caracteres); si hace falta más, una lista debajo. Prosa solo para el porqué. En español.
- `equipo/<usuario>.md` es mínimo (proyecto, trabajo, «ahora», bloqueos). El **proyecto** lo dice el usuario: no lo deduzcas; si no lo sabes, pregúntalo. Actualízalo solo al cambiar de proyecto o de trabajo, o al aparecer o desaparecer un bloqueo.
- Resumen semanal: solo si te lo piden, siguiendo `procedimientos/resumen-semanal.md`.

## Git
- **Nunca ejecutes `commit`, `push` ni `merge`.** Deja los cambios sin confirmar: el desarrollador revisa el diff y hace el commit.
- Puedes proponer el mensaje: `<proyecto>/NNNN: qué se hizo`.
- Nada lo impide técnicamente: el desarrollador revisa el diff y comprueba que la IA lo cumple.
- **Antes de pedir el commit**, ejecuta `node scripts/generar-indice.mjs` (regenera `indice.tsv`; si dos ramas lo tocan y hay conflicto, se vuelve a generar, no se resuelve a mano) y después `node scripts/comprobar-docs.mjs`. El comprobador solo lee: avisa de números repetidos, enlaces rotos, planners y «En marcha» desfasados, trabajos cerrados sin informe e `indice.tsv` desfasado.

## Prohibido
- Secretos: contraseñas, tokens, cadenas de conexión, contenido de `.env`. Documenta dónde están, nunca su valor.
- Inventar avances, fechas, personas o fuentes. Todo trabajo cerrado tiene su rama `feature/<proyecto>-<trabajo>`.
- Reescribir el informe de un trabajo cerrado. Solo se le añade `continuado_en`.

## Ante la duda
Pregunta antes de escribir.
