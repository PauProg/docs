// Regenera `indice.tsv` desde las cabeceras. Es lo único que escribe este directorio.
// Uso, desde la raíz de `docs`:  node scripts/generar-indice.mjs
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { construirIndice } from './indice.mjs';

const RAIZ = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const texto = construirIndice(RAIZ);
writeFileSync(join(RAIZ, 'indice.tsv'), texto);
console.log(`indice.tsv: ${texto.split('\n').length - 2} documentos.`);
