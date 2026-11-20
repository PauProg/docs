---
tipo: tecnica
actualizado: 2026-11-12
codigo: tienda:src/catalogo/filtros.ts, tienda:src/catalogo/Catalogo.tsx
---

# Catálogo: filtro por categoría

> Ejemplo ficticio. La página del catálogo filtra por la categoría que llega en la URL (`?categoria=`). El filtrado vive en `filtrarPorCategoria`; la página solo pinta el resultado.

## Piezas
| Pieza | Qué hace |
| --- | --- |
| `Catalogo.tsx` | Lee `categoria` de la URL, pinta el selector y el mensaje de categoría vacía |
| `filtrarPorCategoria(productos, categoria)` | Devuelve los productos de esa categoría; si falta o no existe, devuelve todos |

## Casos
- Categoría sin productos: la página muestra «No hay productos en esta categoría».
- Valor con caracteres especiales: se codifica con `encodeURIComponent` al escribirlo en la URL.
