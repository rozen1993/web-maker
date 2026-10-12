import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { abrirProyectoChat } from '../scripts/iniciar-chat.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'plan-chat-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'plantillas'));
  for (const file of ['proyecto.json', 'MEJORAS.md']) {
    await copyFile(fileURLToPath(new URL(`../plantillas/${file}`, import.meta.url)), join(root, 'plantillas', file));
  }
  await mkdir(join(root, '.control'));
  await writeFile(join(root, '.control', 'dataforseo.jsonl'), 'historial de prueba que debe conservarse\n');
  await mkdir(join(root, 'out'));
  await writeFile(join(root, 'out', '.gitkeep'), '');
  return root;
}

test('chat abre brief parcial sin permisos, resultados ni selección de modelos inventados', async t => {
  const root = await fixture(t);
  const { project, directory, resumed } = await abrirProyectoChat({ root, name: 'Brújula Azul' });
  assert.equal(resumed, false);
  assert.equal(project.project_id, 'brujula-azul');
  assert.equal(project.status, 'brief_en_curso');
  assert.equal(project.workflow.phase, 'brief');
  assert.equal(project.intake.source, 'chat');
  assert.equal(project.intake.completed_at, null);
  assert.equal(project.workspace.site_root, 'out');
  assert.equal(project.dataforseo.exploracion.authorization, null);
  assert.equal(project.dataforseo.investigacion.authorization, null);
  assert.equal(project.models.entrevista.selection_verified, false);
  const event = JSON.parse(await readFile(join(directory, 'BITACORA.jsonl'), 'utf8'));
  assert.equal(event.type, 'accion');
  assert.equal(await readFile(join(root, '.control', 'dataforseo.jsonl'), 'utf8'), 'historial de prueba que debe conservarse\n');
});

test('retoma sin sobrescribir respuestas, autorizaciones, código ni bitácora', async t => {
  const root = await fixture(t);
  const first = await abrirProyectoChat({ root, name: 'Mi Web' });
  first.project.intake.responses.idea = { value: 'Dato real' };
  first.project.dataforseo.exploracion.authorization = { text: 'autorizacion de prueba' };
  const content = JSON.stringify(first.project);
  await writeFile(join(first.directory, 'proyecto.json'), content);
  await writeFile(join(root, 'out', 'web.txt'), 'código de prueba');
  const log = await readFile(join(first.directory, 'BITACORA.jsonl'), 'utf8');
  const resumed = await abrirProyectoChat({ root, name: 'Mi Web' });
  assert.equal(resumed.resumed, true);
  assert.equal(await readFile(join(first.directory, 'proyecto.json'), 'utf8'), content);
  assert.equal(await readFile(join(first.directory, 'BITACORA.jsonl'), 'utf8'), log);
  assert.equal(await readFile(join(root, 'out', 'web.txt'), 'utf8'), 'código de prueba');
});

test('rechaza segundo proyecto y dos inicios concurrentes de nombres distintos', async t => {
  const root = await fixture(t);
  const results = await Promise.allSettled(['Uno', 'Dos'].map(name => abrirProyectoChat({ root, name })));
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal((await readdir(join(root, 'proyectos'))).length, 1);
  await assert.rejects(abrirProyectoChat({ root, name: 'Tercero' }), /un solo proyecto/);
});

test('out huérfano bloquea ficha nueva sin borrar su contenido', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'out', 'package.json'), '{"name":"anterior"}');
  await assert.rejects(abrirProyectoChat({ root, name: 'Nueva' }), /out ya contiene/);
  assert.equal(await readFile(join(root, 'out', 'package.json'), 'utf8'), '{"name":"anterior"}');
  assert.deepEqual(await readdir(join(root, 'proyectos')), []);
});

test('identidad inválida o carpeta sin ficha no se reemplazan', async t => {
  const root = await fixture(t);
  const result = await abrirProyectoChat({ root, name: 'Mi Web' });
  await writeFile(join(result.directory, 'proyecto.json'), '{"project_id":"otro"}');
  await assert.rejects(abrirProyectoChat({ root, name: 'Mi Web' }), /identidad/);
  await assert.rejects(abrirProyectoChat({ root, name: '../escape' }), /nombre/);
});
