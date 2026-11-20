---
tipo: informe
---

# Ahora se puede filtrar el catálogo por categoría

> Quien compra ya puede quedarse solo con una categoría del catálogo. La elección va en la dirección de la página, así que sobrevive a una recarga y se puede compartir.

## El problema
El catálogo era una lista única de más de 200 productos. Para llegar a una categoría había que recorrerla entera.

## Qué se hizo
Se añadió un selector de categoría. Al elegir una, la página muestra solo sus productos. La categoría queda escrita en la dirección de la página (`?categoria=…`).

## Por qué así
Guardar la elección solo en el navegador se perdía al recargar. Escribirla en la dirección lo resuelve y permite pasar el enlace a otra persona.

## Qué cambia
Quien compra ve un selector nuevo en el catálogo. Si elige una categoría sin productos, ve un aviso. Si la dirección trae una categoría que no existe, ve el catálogo completo.

## Lo que salió distinto de lo previsto
Nada.

## Para quien lo toque después
La nota técnica `proyectos/ejemplo-tienda/catalogo.md` explica cómo funciona hoy. Quedaron fuera los filtros por precio o marca y elegir varias categorías a la vez.
