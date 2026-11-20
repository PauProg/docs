---
tipo: plan
---

# Plan: Filtrar el catálogo por categoría

> La categoría elegida vive en el parámetro `categoria` de la URL y una función pura filtra los productos; la página solo pinta. Así recargar y compartir enlaces funciona sin estado extra.

## Reglas aplicables
Ninguna.

## Código afectado
| Ruta | Qué cambia | Por qué |
| --- | --- | --- |
| `tienda:src/catalogo/filtros.ts` | Nueva función `filtrarPorCategoria` | CA1, CA3, CA4 |
| `tienda:src/catalogo/Catalogo.tsx` | Lee `categoria` de la URL, pinta el selector y el mensaje de categoría vacía | CA1 a CA4 |

## Enfoque
Se descarta guardar la categoría en estado local del navegador porque se pierde al recargar (CA2).

## Cómo se comprobará cada criterio
| Criterio | Comprobación |
| --- | --- |
| CA1 | Test automático de `filtrarPorCategoria` con 3 categorías |
| CA2 | Prueba manual: recargar con una categoría elegida |
| CA3 | Test automático: categoría sin productos |
| CA4 | Test automático: categoría inexistente devuelve todos |

## Impacto operativo
Sin configuración nueva ni datos afectados. Se revierte desplegando la versión anterior.

## Riesgos
| Riesgo | Mitigación |
| --- | --- |
| Una categoría con caracteres especiales rompe la URL | Codificar el valor con `encodeURIComponent` |

## Documentación técnica
`proyectos/ejemplo-tienda/catalogo.md`: describir el parámetro `categoria` y `filtrarPorCategoria`.
