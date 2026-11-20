// Comprobaciones del cerebro. Solo LEE: no escribe ni corrige nada.
// Uso, desde la raíz de `docs`:  node scripts/comprobar-docs.mjs
// Sale con código 1 si encuentra algún problema, y los lista.
//
// Qué comprueba:
//   1. Números de trabajo repetidos dentro de un proyecto.
//   2. Enlaces relativos a ficheros .md que no existen (las plantillas se saltan: llevan marcadores).
//   3. Un trabajo cerrado sin informe.md.
//   4. Que cada trabajo esté en su grupo del planner de su proyecto y que el recuento coincida.
//   5. Que la tabla «En marcha» del README raíz tenga los trabajos no cerrados y no tenga los cerrados,
//      y que la columna «Activos» de cada proyecto cuadre.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { construirIndice } from './indice.mjs';

const RAIZ = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const problemas = [];
const error = (donde, texto) => problemas.push(`${donde}: ${texto}`);
const leer = (ruta) => readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n');
const rel = (ruta) => relative(RAIZ, ruta).split(sep).join('/');

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
  const m = texto.match(/^---\n([\s\S]*?)\n---/);
  const campos = {};
  if (m) for (const linea of m[1].split('\n')) {
    const i = linea.indexOf(':');
    if (i > 0) campos[linea.slice(0, i).trim()] = linea.slice(i + 1).trim();
  }
  return campos;
}

// ── Trabajos ──────────────────────────────────────────────────────────────────────────────
const GRUPO_DE = {
  borrador: 'porHacer', aprobada: 'porHacer', planificada: 'porHacer',
  'en-curso': 'enCurso', verificada: 'enCurso',
  bloqueado: 'bloqueado',
  cerrado: 'hecho', descartado: 'hecho',
};
const proyectos = existsSync(join(RAIZ, 'proyectos')) ? readdirSync(join(RAIZ, 'proyectos')) : [];
const trabajos = [];
for (const p of proyectos) {
  const dirTrabajos = join(RAIZ, 'proyectos', p, 'trabajos');
  if (!existsSync(dirTrabajos)) continue;
  const numeros = {};
  for (const nombre of readdirSync(dirTrabajos)) {
    const ruta = join(dirTrabajos, nombre);
    const m = nombre.match(/^(\d{4})(\.\d+)?-/);
    if (!m || !statSync(ruta).isDirectory()) continue;
    (numeros[m[1] + (m[2] ?? '')] ??= []).push(nombre);
    const spec = join(ruta, 'spec.md');
    if (!existsSync(spec)) { error(`proyectos/${p}/trabajos/${nombre}`, 'no tiene spec.md'); continue; }
    const estado = cabecera(leer(spec)).estado ?? '';
    trabajos.push({ proyecto: p, nombre, estado, ruta });
  }
  for (const [n, nombres] of Object.entries(numeros)) {
    if (nombres.length > 1) error(`proyectos/${p}/trabajos`, `número ${n} repetido: ${nombres.join(' y ')}`);
  }
}

for (const t of trabajos) {
  if (!(t.estado in GRUPO_DE)) error(`${t.proyecto}/${t.nombre}`, `estado «${t.estado}» desconocido`);
  if (t.estado === 'cerrado' && !existsSync(join(t.ruta, 'informe.md'))) error(`${t.proyecto}/${t.nombre}`, 'está cerrado y no tiene informe.md');
}

// ── Planner de cada proyecto ──────────────────────────────────────────────────────────────
const ENCABEZADOS = { porHacer: /^## .*Por hacer/m, enCurso: /^## .*En curso/m, bloqueado: /^## .*Bloqueado/m, hecho: /^## .*Hecho/m };
for (const p of proyectos) {
  const planner = join(RAIZ, 'proyectos', p, 'trabajos', 'README.md');
  if (!existsSync(planner)) continue;
  const texto = leer(planner);
  const secciones = {};
  const orden = Object.entries(ENCABEZADOS)
    .map(([grupo, re]) => ({ grupo, i: texto.search(re) }))
    .filter((s) => s.i >= 0).sort((a, b) => a.i - b.i);
  orden.forEach((s, k) => { secciones[s.grupo] = texto.slice(s.i, orden[k + 1]?.i ?? texto.length); });

  const propios = trabajos.filter((t) => t.proyecto === p);
  const contados = { porHacer: 0, enCurso: 0, bloqueado: 0, hecho: 0 };
  for (const t of propios) {
    const grupo = GRUPO_DE[t.estado];
    if (!grupo) continue;
    contados[grupo]++;
    if (!(secciones[grupo] ?? '').includes(`](${t.nombre}/`)) {
      const donde = Object.entries(secciones).find(([, s]) => s.includes(`](${t.nombre}/`))?.[0];
      error(`proyectos/${p}/trabajos/README.md`, `${t.nombre} (${t.estado}) no está en su grupo${donde ? `; está en «${donde}»` : '; no aparece'}`);
    }
  }
  const m = texto.match(/^\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|$/m);
  if (m) {
    const esperado = [contados.porHacer, contados.enCurso, contados.bloqueado, contados.hecho];
    const real = m.slice(1, 5).map(Number);
    if (esperado.join() !== real.join()) error(`proyectos/${p}/trabajos/README.md`, `recuento ${real.join(' | ')} y los trabajos dan ${esperado.join(' | ')}`);
  }
}

// ── README raíz: «En marcha» y «Activos» ──────────────────────────────────────────────────
const readme = leer(join(RAIZ, 'README.md'));
const enMarcha = readme.match(/## En marcha\n([\s\S]*?)\n## /)?.[1] ?? '';
const abiertos = trabajos.filter((t) => !['cerrado', 'descartado'].includes(t.estado));
for (const t of trabajos) {
  const clave = `proyectos/${t.proyecto}/trabajos/${t.nombre}/`;
  const esta = enMarcha.includes(clave);
  const abierto = abiertos.includes(t);
  if (abierto && !esta) error('README.md', `«En marcha» no tiene ${t.proyecto}/${t.nombre} (${t.estado})`);
  if (!abierto && esta) error('README.md', `«En marcha» todavía tiene ${t.proyecto}/${t.nombre}, que está ${t.estado}`);
}
for (const fila of readme.matchAll(/^\| \[([\w-]+)\]\(proyectos\/[\w-]+\/README\.md\) \|.*\| (\d+) \|$/gm)) {
  const esperado = abiertos.filter((t) => t.proyecto === fila[1]).length;
  if (Number(fila[2]) !== esperado) error('README.md', `«Activos» de ${fila[1]} es ${fila[2]} y hay ${esperado} trabajos abiertos`);
}

// ── Enlaces relativos rotos ───────────────────────────────────────────────────────────────
let enlaces = 0;
for (const f of listarMd(RAIZ)) {
  if (rel(f).startsWith('plantillas/')) continue;
  const texto = leer(f).replace(/```[\s\S]*?```/g, '');
  for (const m of texto.matchAll(/\]\(([^)#\s]+\.md)(#[^)]*)?\)/g)) {
    const destino = m[1];
    if (/^[a-z]+:/i.test(destino) || /[<>]/.test(destino)) continue;
    enlaces++;
    if (!existsSync(resolve(dirname(f), decodeURI(destino)))) error(rel(f), `enlace roto → ${destino}`);
  }
}

// ── Índice de búsqueda ────────────────────────────────────────────────────────────────────
const rutaIndice = join(RAIZ, 'indice.tsv');
if (!existsSync(rutaIndice)) error('indice.tsv', 'no existe: ejecuta node scripts/generar-indice.mjs');
else if (leer(rutaIndice) !== construirIndice(RAIZ)) error('indice.tsv', 'está desfasado: ejecuta node scripts/generar-indice.mjs');

if (problemas.length === 0) {
  console.log(`Sin problemas: ${trabajos.length} trabajos, ${enlaces} enlaces relativos.`);
} else {
  console.log(`${problemas.length} problema(s):`);
  for (const p of problemas) console.log(` - ${p}`);
  process.exitCode = 1;
}
