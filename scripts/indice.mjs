// Construye el texto de `indice.tsv`: una fila por documento, con las columnas de su cabecera.
// Lo usan `generar-indice.mjs` (escribe el fichero) y `comprobar-docs.mjs` (solo comprueba que está al día).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const EXCLUIDOS = ['plantillas/', 'semanal/'];
export const COLUMNAS = ['ruta', 'proyecto', 'tipo', 'estado', 'fecha', 'owner', 'titulo', 'resumen', 'codigo'];

function listarMd(dir, salida = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules' || e.name === '.claude') continue;
    const ruta = join(dir, e.name);
    if (e.isDirectory()) listarMd(ruta, salida);
    else if (e.name.endsWith('.md')) salida.push(ruta);
  }
  return salida;
}

function cabecera(texto) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
  const campos = {};
  if (!m) return { campos, cuerpo: texto };
  for (const linea of m[1].split('\n')) {
    const i = linea.indexOf(':');
    if (i > 0) campos[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
  }
  return { campos, cuerpo: texto.slice(m[0].length) };
}

const limpia = (s, max) => {
  const t = (s ?? '').replace(/[\t\n\r]+/g, ' ').replace(/\s+/g, ' ').replace(/\*\*|`/g, '').trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
};

export function construirIndice(raiz) {
  const filas = [];
  for (const f of listarMd(raiz)) {
    const ruta = relative(raiz, f).split(sep).join('/');
    if (EXCLUIDOS.some((x) => ruta.startsWith(x))) continue;
    const { campos, cuerpo } = cabecera(readFileSync(f, 'utf8').replace(/\r\n/g, '\n'));
    const partes = ruta.split('/');
    const proyecto = partes[0] === 'proyectos' ? partes[1] : partes[0].replace(/\.md$/, '');
    const titulo = cuerpo.match(/^# (.+)$/m)?.[1] ?? '';
    // Resumen: la primera cita (`> …`) del documento; las specs y los planners no la tienen y quedan vacíos.
    const resumen = cuerpo.match(/^> (.+)$/m)?.[1] ?? '';
    const fecha = campos.actualizado || campos[campos.estado] || campos.fecha || '';
    filas.push([ruta, proyecto, campos.tipo ?? '', campos.estado ?? '', fecha, campos.owner ?? '',
      limpia(titulo, 120), limpia(resumen, 200), limpia(campos.codigo, 300)]);
  }
  filas.sort((a, b) => (a[0] < b[0] ? -1 : 1));
  return [COLUMNAS, ...filas].map((f) => f.join('\t')).join('\n') + '\n';
}
