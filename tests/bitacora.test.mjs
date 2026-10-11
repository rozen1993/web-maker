import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createEvent, appendEvent } from '../scripts/bitacora.mjs';

const cli = fileURLToPath(new URL('../scripts/bitacora.mjs', import.meta.url));
const input = {
  project_id: 'mi-web', phase: 'brief', type: 'entrevista_completada',
  summary: 'Entrevista guardada con sus declaraciones originales.', evidence: ['proyecto.json'],
};

async function fixture(t) {
  const temporaryRoot = await fs.realpath(tmpdir());
  const root = await fs.mkdtemp(join(temporaryRoot, 'plan-bitacora-test-'));
  t.after(async () => {
    assert.equal(dirname(resolve(root)), temporaryRoot);
    await fs.rm(root, { recursive: true, force: true });
  });
  const projectDir = join(root, 'carpeta-portable');
  await fs.mkdir(projectDir);
  await fs.writeFile(join(projectDir, 'proyecto.json'), JSON.stringify({ project_id: 'mi-web' }));
  return { root, projectDir, log: join(projectDir, 'BITACORA.jsonl'), lock: join(projectDir, '.bitacora.lock') };
}

test('createEvent asigna identidad/fecha actuales y copia la entrada sin permitir metadatos impuestos', () => {
  const source = structuredClone(input);
  const before = Date.now();
  const event = createEvent(source);
  assert.equal(event.schema_version, 1);
  assert.match(event.event_id, /^[0-9a-f-]{36}$/);
  assert.ok(Date.parse(event.timestamp) >= before && Date.parse(event.timestamp) <= Date.now());
  source.evidence.push('otro.txt');
  assert.deepEqual(event.evidence, ['proyecto.json']);
  for (const extra of [{ timestamp: '2020-01-01T00:00:00.000Z' }, { event_id: event.event_id }, { secreto: 'no guardar' }]) {
    assert.throws(() => createEvent({ ...input, ...extra }), /desconocido/);
  }
});

test('rechaza entradas mal formadas antes de registrar', () => {
  for (const invalid of [
    null, [], { ...input, project_id: '../otro' }, { ...input, phase: 'Fase con espacios' },
    { ...input, type: 'desconocido' }, { ...input, summary: '' }, { ...input, evidence: 'informe.md' },
    { ...input, evidence: [''] }, { ...input, status: 'resuelto' }, { ...input, result: 'aprobado' },
    { ...input, type: 'verificacion' }, { ...input, type: 'verificacion', result: 'aprobado', evidence: [] },
    { ...input, type: 'incidencia', incident_id: 'I-1', status: 'resuelto', solution: 'arreglado', evidence: ['prueba.txt'] },
    { ...input, type: 'incidencia', incident_id: 'I-1', status: 'resuelto', solution: 'Se recuperó la ruta pública original.', evidence: [] },
  ]) assert.throws(() => createEvent(invalid));
});

test('añade eventos sin cambiar los bytes previos y preserva identidad al mover la carpeta', async t => {
  const { projectDir, log, lock } = await fixture(t);
  const first = createEvent(input);
  const result = await appendEvent(projectDir, first);
  assert.equal(result.events, 1);
  const before = await fs.readFile(log, 'utf8');
  assert.equal(before, JSON.stringify(first) + '\n');
  const second = createEvent({ ...input, phase: 'meta', type: 'cambio_fase', summary: 'De brief a meta: se concretaron páginas y funciones solicitadas.' });
  await appendEvent(projectDir, second);
  assert.equal(await fs.readFile(log, 'utf8'), before + JSON.stringify(second) + '\n');
  await assert.rejects(fs.lstat(lock), { code: 'ENOENT' });
});

test('rechaza otro project_id y un event_id duplicado sin alterar el historial', async t => {
  const { projectDir, log } = await fixture(t);
  const first = createEvent(input);
  await appendEvent(projectDir, first);
  const before = await fs.readFile(log, 'utf8');
  await assert.rejects(appendEvent(projectDir, createEvent({ ...input, project_id: 'otro-proyecto' })), /no coincide/);
  await assert.rejects(appendEvent(projectDir, first), /duplicado/);
  assert.equal(await fs.readFile(log, 'utf8'), before);
});

test('la incidencia debe existir antes de cerrarse y puede reabrirse con evidencia nueva', async t => {
  const { projectDir, log } = await fixture(t);
  const incident = { project_id: 'mi-web', phase: 'construccion', type: 'incidencia', incident_id: 'URL-1', summary: 'Ruta original devuelve 404.', status: 'pendiente' };
  const closure = { ...incident, summary: 'Ruta recuperada y comprobada en preview.', status: 'resuelto', solution: 'Se recuperó la ruta original y su contenido equivalente.', evidence: ['evidencias/ruta-http.txt'] };
  await assert.rejects(appendEvent(projectDir, createEvent(closure)), /primero como pendiente/);
  await assert.rejects(fs.lstat(log), { code: 'ENOENT' });
  await appendEvent(projectDir, createEvent(incident));
  await appendEvent(projectDir, createEvent({ ...incident, status: 'en_correccion', solution: 'Restaurar la ruta y comprobar respuesta HTTP.' }));
  await appendEvent(projectDir, createEvent(closure));
  const before = await fs.readFile(log, 'utf8');
  await assert.rejects(appendEvent(projectDir, createEvent(closure)), /reabrirse/);
  assert.equal(await fs.readFile(log, 'utf8'), before);
  await appendEvent(projectDir, createEvent({ ...incident, summary: 'La ruta falla en público: se reabre tras nueva comprobación.', evidence: ['evidencias/ruta-publica.txt'] }));
  assert.equal((await fs.readFile(log, 'utf8')).trim().split('\n').length, 4);
});

test('historial corrupto, incompleto, mezclado o con IDs duplicados bloquea sin reparar', async t => {
  const first = createEvent(input);
  const variants = [
    '{malformed}\n', JSON.stringify(first), JSON.stringify(first) + '\n\n',
    JSON.stringify(createEvent({ ...input, project_id: 'otro-proyecto' })) + '\n',
    JSON.stringify(first) + '\n' + JSON.stringify(first) + '\n',
    JSON.stringify({ ...first, timestamp: '2026-02-30T00:00:00.000Z' }) + '\n',
  ];
  for (const content of variants) {
    const { projectDir, log, lock } = await fixture(t);
    await fs.writeFile(log, content);
    await assert.rejects(appendEvent(projectDir, createEvent(input)), /Historial inválido|incompleta/);
    assert.equal(await fs.readFile(log, 'utf8'), content);
    await assert.rejects(fs.lstat(lock), { code: 'ENOENT' });
  }
});

test('un bloqueo existente impide escribir y se conserva para revisión', async t => {
  const { projectDir, log, lock } = await fixture(t);
  await fs.writeFile(lock, 'bloqueo anterior: conservar');
  await assert.rejects(appendEvent(projectDir, createEvent(input)), { code: 'BITACORA_BLOQUEADA' });
  assert.equal(await fs.readFile(lock, 'utf8'), 'bloqueo anterior: conservar');
  await assert.rejects(fs.lstat(log), { code: 'ENOENT' });
});

test('dos escritores concurrentes no mezclan eventos; el bloqueado puede reintentar', async t => {
  const { projectDir, log } = await fixture(t);
  const events = [createEvent(input), createEvent(input)];
  const results = await Promise.allSettled(events.map(event => appendEvent(projectDir, event)));
  assert.ok(results.some(result => result.status === 'fulfilled'));
  // El planificador puede serializar las operaciones; solo las que se solapen
  // tienen que fallar por el lock, nunca por contenido mezclado o corrupción.
  for (let i = 0; i < results.length; i += 1) {
    if (results[i].status === 'rejected') {
      assert.equal(results[i].reason.code, 'BITACORA_BLOQUEADA');
      await appendEvent(projectDir, events[i]);
    }
  }
  const stored = (await fs.readFile(log, 'utf8')).trim().split('\n').map(line => JSON.parse(line));
  assert.equal(stored.length, 2);
  assert.deepEqual(new Set(stored.map(event => event.event_id)), new Set(events.map(event => event.event_id)));
});

test('no sigue enlaces de BITACORA ni altera sus destinos', async t => {
  const { root, projectDir, log } = await fixture(t);
  const other = join(root, 'otro');
  await fs.mkdir(other);
  await fs.writeFile(join(other, 'conservar.txt'), 'contenido original');
  await fs.symlink(other, log, process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(appendEvent(projectDir, createEvent(input)), /archivo regular/);
  assert.equal((await fs.lstat(log)).isSymbolicLink(), true);
  assert.equal(await fs.readFile(join(other, 'conservar.txt'), 'utf8'), 'contenido original');
});

test('no modifica un archivo de bitácora compartido por enlace duro', async t => {
  const { root, projectDir, log } = await fixture(t);
  const other = join(root, 'otra-bitacora.jsonl');
  const original = JSON.stringify(createEvent(input)) + '\n';
  await fs.writeFile(other, original);
  await fs.link(other, log);
  await assert.rejects(appendEvent(projectDir, createEvent(input)), /archivo regular/);
  assert.equal(await fs.readFile(other, 'utf8'), original);
});

test('CLI registra entrada JSON, muestra ayuda y falla sin inventar historial', async t => {
  const { root, projectDir, log } = await fixture(t);
  const entry = join(root, 'evento.json');
  await fs.writeFile(entry, JSON.stringify(input));
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', timeout: 10000 });
  const help = run('--help');
  assert.equal(help.status, 0);
  assert.match(help.stdout, /No modifica ESTADO.md/);
  await assert.rejects(fs.lstat(log), { code: 'ENOENT' });
  const success = run(projectDir, entry);
  assert.equal(success.status, 0, success.stderr);
  assert.match(success.stdout, /registrado/);
  const before = await fs.readFile(log, 'utf8');
  await fs.writeFile(entry, JSON.stringify({ ...input, timestamp: '2020-01-01T00:00:00.000Z' }));
  const failure = run(projectDir, entry);
  assert.equal(failure.status, 1);
  assert.match(failure.stderr, /desconocido/);
  assert.equal(await fs.readFile(log, 'utf8'), before);
});
