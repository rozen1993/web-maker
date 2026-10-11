import * as fs from 'node:fs/promises';
import { constants } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const TYPES = new Set(['accion', 'decision', 'incidencia', 'verificacion', 'entrevista_completada', 'cambio_fase']);
const STATUSES = new Set(['pendiente', 'en_correccion', 'resuelto']);
const RESULTS = new Set(['aprobado', 'fallo', 'pendiente', 'no_aplica']);
const INPUT_FIELDS = new Set(['project_id', 'phase', 'type', 'summary', 'evidence', 'incident_id', 'status', 'cause', 'solution', 'lesson', 'result', 'environment', 'request_id']);
const STORED_FIELDS = new Set([...INPUT_FIELDS, 'schema_version', 'event_id', 'timestamp']);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requireText(value, name, max = 2000) {
  if (typeof value !== 'string' || !value.trim() || value.length > max || /\u0000/.test(value)) {
    throw new Error(`${name} debe ser texto no vacío de hasta ${max} caracteres.`);
  }
}

function validateEvent(event, stored) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) throw new Error('El evento debe ser un objeto JSON.');
  const fields = stored ? STORED_FIELDS : INPUT_FIELDS;
  for (const name of Object.keys(event)) {
    if (!fields.has(name)) throw new Error(`Campo de evento desconocido: ${name}.`);
  }
  if (typeof event.project_id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.project_id) || event.project_id.length > 128) {
    throw new Error('project_id debe ser el identificador válido de proyecto.json.');
  }
  if (typeof event.phase !== 'string' || !/^[a-z][a-z0-9_]{0,63}$/.test(event.phase)) throw new Error('phase debe ser un identificador ASCII, por ejemplo investigacion.');
  if (!TYPES.has(event.type)) throw new Error(`type no válido; opciones: ${[...TYPES].join(', ')}.`);
  requireText(event.summary, 'summary');
  if (event.evidence !== undefined) {
    if (!Array.isArray(event.evidence) || event.evidence.length > 50) throw new Error('evidence debe ser una lista de hasta 50 referencias.');
    event.evidence.forEach(item => requireText(item, 'evidence', 2000));
  }
  for (const key of ['cause', 'solution', 'lesson', 'environment', 'request_id']) {
    if (event[key] !== undefined) requireText(event[key], key);
  }
  if (event.type === 'incidencia') {
    if (typeof event.incident_id !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(event.incident_id)) throw new Error('Una incidencia necesita incident_id estable (letras, números, guion o guion bajo).');
    if (!STATUSES.has(event.status)) throw new Error('Una incidencia necesita status: pendiente, en_correccion o resuelto.');
    if (event.status === 'resuelto' && (!event.evidence?.length || typeof event.solution !== 'string' || event.solution.trim().length < 12)) {
      throw new Error('Cerrar una incidencia exige solution concreta (al menos 12 caracteres) y evidence de la comprobación.');
    }
  } else if (event.incident_id !== undefined || event.status !== undefined) {
    throw new Error('incident_id y status solo corresponden a type incidencia.');
  }
  if (event.type === 'verificacion') {
    if (!RESULTS.has(event.result)) throw new Error('Una verificación necesita result: aprobado, fallo, pendiente o no_aplica.');
    if (['aprobado', 'fallo'].includes(event.result) && !event.evidence?.length) throw new Error('Una verificación ejecutada necesita evidence.');
  } else if (event.result !== undefined) throw new Error('result solo corresponde a type verificacion.');
  if (stored) {
    if (event.schema_version !== 1 || !UUID.test(event.event_id ?? '')) throw new Error('El evento guardado necesita schema_version 1 y event_id UUID v4.');
    if (typeof event.timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(event.timestamp) || !Number.isFinite(Date.parse(event.timestamp)) || new Date(event.timestamp).toISOString() !== event.timestamp) {
      throw new Error('El evento guardado necesita timestamp ISO UTC válido.');
    }
  }
}

/** Registra hechos; no acepta fechas pasadas, IDs ni campos extra como entrada. */
export function createEvent(input) {
  validateEvent(input, false);
  return { schema_version: 1, event_id: randomUUID(), timestamp: new Date().toISOString(), ...structuredClone(input) };
}

function applyHistoryEvent(event, projectId, ids, incidents) {
  validateEvent(event, true);
  if (event.project_id !== projectId) throw new Error('El project_id del evento no coincide con proyecto.json.');
  if (ids.has(event.event_id)) throw new Error('event_id duplicado; comprobar el historial antes de reintentar.');
  ids.add(event.event_id);
  if (event.type === 'incidencia') {
    const previous = incidents.get(event.incident_id);
    if (!previous && event.status !== 'pendiente') throw new Error('Una incidencia nueva debe registrarse primero como pendiente.');
    if (previous === 'resuelto' && event.status !== 'pendiente') throw new Error('Una incidencia resuelta solo puede reabrirse con estado pendiente.');
    incidents.set(event.incident_id, event.status);
  }
}

async function regularFile(path, optional = false) {
  let stat;
  try { stat = await fs.lstat(path); }
  catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink > 1) throw new Error(`Se rechaza una entrada que no es un archivo regular independiente: ${path}`);
  return stat;
}

function sameFile(a, b) { return a.dev === b.dev && a.ino === b.ino && b.isFile() && b.nlink === 1; }

async function readRegular(path, stat) {
  const handle = await fs.open(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0));
  try {
    if (!sameFile(stat, await handle.stat())) throw new Error(`El archivo cambió durante la lectura: ${path}`);
    return await handle.readFile({ encoding: 'utf8' });
  } finally { await handle.close(); }
}

/**
 * Anexa bajo lock exclusivo entre escritores de este helper. Nunca trunca ni
 * repara el historial. No es un registro inviolable ni intercepta otras acciones.
 */
export async function appendEvent(projectDir, input) {
  const event = structuredClone(input);
  validateEvent(event, true);
  const requested = resolve(projectDir);
  const directoryStat = await fs.lstat(requested);
  if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) throw new Error('El directorio del proyecto debe ser una carpeta real, no un enlace.');
  const directory = await fs.realpath(requested);
  const projectPath = join(directory, 'proyecto.json');
  const project = JSON.parse(await readRegular(projectPath, await regularFile(projectPath)));
  if (!project || typeof project !== 'object' || Array.isArray(project) || project.project_id !== event.project_id) {
    throw new Error('El project_id del evento no coincide con proyecto.json.');
  }
  const lockPath = join(directory, '.bitacora.lock');
  let lock;
  try { lock = await fs.open(lockPath, 'wx', 0o600); }
  catch (error) {
    if (error.code === 'EEXIST') throw Object.assign(new Error('Bitácora bloqueada por .bitacora.lock. Verificar el proceso y el historial antes de retirar un bloqueo huérfano; no se elimina automáticamente.'), { code: 'BITACORA_BLOQUEADA' });
    throw error;
  }
  const ownedLock = await lock.stat();
  let operationError;
  try {
    await lock.writeFile(JSON.stringify({ pid: process.pid, timestamp: new Date().toISOString(), event_id: event.event_id }) + '\n');
    const logPath = join(directory, 'BITACORA.jsonl');
    const previousStat = await regularFile(logPath, true);
    const raw = previousStat ? await readRegular(logPath, previousStat) : '';
    if (raw && !raw.endsWith('\n')) throw new Error('BITACORA.jsonl está incompleta: falta el salto final. Conservar y revisar antes de continuar.');
    const ids = new Set();
    const incidents = new Map();
    const lines = raw ? raw.slice(0, -1).split('\n') : [];
    for (let i = 0; i < lines.length; i += 1) {
      try { applyHistoryEvent(JSON.parse(lines[i]), project.project_id, ids, incidents); }
      catch (error) { throw new Error(`Historial inválido en BITACORA.jsonl, línea ${i + 1}: ${error.message}`, { cause: error }); }
    }
    applyHistoryEvent(event, project.project_id, ids, incidents);
    const flags = constants.O_WRONLY | constants.O_APPEND | (constants.O_NOFOLLOW ?? 0) |
      (previousStat ? 0 : constants.O_CREAT | constants.O_EXCL);
    const output = await fs.open(logPath, flags, 0o600);
    try {
      const currentStat = await output.stat();
      if (previousStat ? !sameFile(previousStat, currentStat) : !currentStat.isFile() || currentStat.nlink !== 1) {
        throw new Error('La bitácora cambió mientras se preparaba la escritura.');
      }
      await output.writeFile(JSON.stringify(event) + '\n');
      await output.sync();
    } finally { await output.close(); }
    return { path: logPath, event_id: event.event_id, events: lines.length + 1 };
  } catch (error) {
    operationError = error;
    throw error;
  } finally {
    try {
      await lock.close();
      const currentLock = await regularFile(lockPath);
      if (!sameFile(ownedLock, currentLock)) throw new Error('El bloqueo cambió; se conserva para revisión.');
      await fs.unlink(lockPath);
    } catch (cleanupError) {
      if (operationError) operationError.cleanupError = cleanupError;
      else throw cleanupError;
    }
  }
}

const HELP = `Uso: node scripts/bitacora.mjs <directorio-proyecto> <archivo-evento.json>
     node scripts/bitacora.mjs --help

El JSON contiene project_id, phase, type y summary; evidence es una lista opcional.
Tipos: ${[...TYPES].join(', ')}.
El helper añade fecha UTC e ID, valida proyecto.json e historial y anexa una línea.
Incidencia: incident_id + status; al cerrar, solution y evidence son obligatorios.
Verificación: result; aprobado/fallo requieren evidence.
No modifica ESTADO.md ni MEJORAS.md, no ejecuta servicios y no autoriza gastos.
Lee BITACORA.md para el contrato completo y las limitaciones.
`;

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) process.stdout.write(HELP);
  else if (args.length !== 2 || args.some(arg => arg.startsWith('--'))) {
    process.stderr.write(HELP);
    process.exitCode = 1;
  } else {
    try {
      const input = JSON.parse(await fs.readFile(resolve(args[1]), 'utf8'));
      const result = await appendEvent(args[0], createEvent(input));
      process.stdout.write(`Evento ${result.event_id} registrado en ${result.path}\n`);
    } catch (error) {
      process.stderr.write(`No se pudo registrar el evento: ${error.message}\n`);
      if (error.cleanupError) process.stderr.write(`El bloqueo requiere revisión: ${error.cleanupError.message}\n`);
      process.exitCode = 1;
    }
  }
}
