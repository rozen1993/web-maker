import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm, copyFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PassThrough } from 'node:stream';
import { EventEmitter } from 'node:events';
import { spawn } from 'node:child_process';
import {
  runAssistant, interview, saveProject, projectSlug, parseBudget,
  inferModules, launchCodex, codexArguments, InterviewEnded,
} from '../scripts/asistente.mjs';

const kitRoot = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'plan-asistente-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'plantillas'));
  const template = JSON.parse(await readFile(join(kitRoot, 'plantillas', 'proyecto.json'), 'utf8'));
  template.future_field = { must_be_preserved: true };
  await writeFile(join(root, 'plantillas', 'proyecto.json'), JSON.stringify(template));
  return root;
}

function io(answers, { tty = false } = {}) {
  const input = new PassThrough();
  const output = new PassThrough();
  input.isTTY = tty;
  output.isTTY = tty;
  let text = '';
  output.on('data', chunk => { text += chunk.toString(); });
  input.end(`${answers.join('\n')}\n`);
  return { input, output, text: () => text };
}

const base = ({ name = 'Mi Web', action = '1', pages = 'Inicio, Servicios, Contacto', budget = '' } = {}) => [
  name, 'Ayudar a empresas con video', 'Empresas locales', 'Perú', 'Lima', '',
  action, pages, 'Fotos propias y servicios', 'contacto@example.test', '', '',
  '', budget,
];

test('tubería conserva todas las líneas, usa la plantilla vigente y muestra una META concreta', async t => {
  const root = await fixture(t);
  const streams = io(base());
  const result = await runAssistant({ root, ...streams, launch: () => assert.fail('No debe abrir CLI sin TTY') });
  assert.equal(result.project.idea, 'Ayudar a empresas con video');
  assert.equal(result.project.mercado.ciudad_o_zona, 'Lima');
  assert.equal(result.project.mercado.idioma, 'español');
  assert.equal(result.project.meta.cantidad_paginas, 3);
  assert.deepEqual(result.project.future_field, { must_be_preserved: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['servicios']);
  assert.equal(result.project.dataforseo.authorization, null);
  assert.equal(result.project.dataforseo.budget_usd, 0);
  assert.equal(result.project.alcance.publicacion_authorization, null);
  assert.equal(result.project.models.diseno.selection_verified, false);
  assert.match(streams.text(), /META — mi-web/);
  assert.match(streams.text(), /Publicación fuera de esta entrega/);
  assert.match(streams.text(), /Empresas locales/);
  assert.match(streams.text(), /pega exactamente/);
  assert.deepEqual((await readdir(result.directory)).sort(), ['ESTADO.md', 'INICIAR-CODEX.md', 'META.md', 'proyecto.json']);
  assert.deepEqual((await readdir(root)).sort(), ['plantillas', 'proyectos']);
});

test('EOF parcial o en la autorización no guarda archivos ni habilita pagos', async t => {
  for (const answers of [['Interrumpida', 'Idea incompleta'], base({ budget: '1' })]) {
    const root = await fixture(t);
    await assert.rejects(runAssistant({ root, ...io(answers) }), InterviewEnded);
    assert.deepEqual(await readdir(root), ['plantillas']);
  }
});

test('presupuesto requiere sí expreso al terminar y nunca escribe un registro de gastos', async t => {
  for (const [confirmation, authorized] of [['no', false], ['quizá', false], ['sí', true]]) {
    const root = await fixture(t);
    await mkdir(join(root, '.control'));
    const ledger = join(root, '.control', 'dataforseo.jsonl');
    const oldLedger = '{"historial":"no sustituir"}\n';
    await writeFile(ledger, oldLedger);
    const result = await runAssistant({ root, ...io([...base({ budget: '0,50' }), confirmation]), prepareOnly: true });
    assert.equal(Boolean(result.project.dataforseo.authorization), authorized);
    assert.equal(result.project.dataforseo.budget_usd, 0.5);
    assert.equal(result.project.dataforseo.totals_reconciled, false);
    assert.equal(result.project.dataforseo.shared_ledger_resolved_path, null);
    assert.equal(await readFile(ledger, 'utf8'), oldLedger);
  }
});

test('nombres seguros, traversal y colisiones no sobreescriben', async t => {
  for (const invalid of ['../fuera', '..\\fuera', 'C:\\fuera', '.', '..', 'CON', 'NUL.txt', 'lpt1', 'web.', 'web/otra']) {
    assert.throws(() => projectSlug(invalid), undefined, invalid);
  }
  assert.equal(projectSlug('Árbol Lima'), 'arbol-lima');
  const root = await fixture(t);
  const intake = await interview({ root, ...io(base()) });
  const first = await saveProject({ root, intake });
  const original = await readFile(join(first.directory, 'proyecto.json'), 'utf8');
  await assert.rejects(saveProject({ root, intake }), { code: 'EEXIST' });
  assert.equal(await readFile(join(first.directory, 'proyecto.json'), 'utf8'), original);
  const repeatedName = await interview({ root, ...io(['Mi Web', ...base({ name: 'Otro Nombre' })]) });
  assert.equal(repeatedName.slug, 'otro-nombre');
});

test('preguntas adaptativas de tienda y reservas conservan el pago y sus dependencias', async t => {
  const root = await fixture(t);
  const answers = base({ action: '2 y 5', pages: 'Inicio, Productos, Reservar' });
  answers.splice(12, 0, 'Proveedor en sandbox', 'Inventario servidor', 'Recogida en Lima', 'Calendario existente', 'Sí, mismo proveedor');
  const streams = io(answers);
  const result = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['tienda', 'reservas']);
  assert.equal(result.project.intake.responses.pagos.value, 'Proveedor en sandbox');
  assert.equal(result.project.intake.responses.disponibilidad.value, 'Calendario existente');
  assert.equal(result.project.intake.responses.pago_reserva.value, 'Sí, mismo proveedor');
  assert.equal(result.project.arquitectura.integraciones.length, 5);
  assert.equal(result.project.arquitectura.modulos.includes('catalogo'), false);
  assert.match(streams.text(), /modo de prueba/);
  assert.match(streams.text(), /disponibilidad y registra reservas/);
});

test('catálogo pregunta recepción de pedidos sin convertirlo en tienda', async t => {
  const root = await fixture(t);
  const answers = base({ action: '3' });
  answers.splice(12, 0, 'WhatsApp y lista actualizada por el equipo');
  const streams = io(answers);
  const result = await runAssistant({ root, ...streams, prepareOnly: true });
  assert.ok(result.project.arquitectura.modulos.includes('catalogo'));
  assert.ok(!result.project.arquitectura.modulos.includes('tienda'));
  assert.equal(result.project.intake.responses.pagos, undefined);
  assert.match(streams.text(), /Cómo se recibe un pedido/);
});

test('límites numéricos rechazan valores desconocidos y cuentas solo explícitas', () => {
  assert.equal(parseBudget(''), 0);
  assert.equal(parseBudget('1'), 1);
  for (const invalid of ['no sé', '-1', '2', '0.1e1', 'Infinity', '1.01']) assert.throws(() => parseBudget(invalid));
  assert.deepEqual(inferModules('leer artículos', 'Blog'), ['blog']);
  assert.deepEqual(inferModules('contactar', 'Inicio, panel CMS'), ['servicios']);
  assert.ok(inferModules('contactar', 'cuentas de clientes').includes('cuentas'));
  assert.deepEqual(inferModules('contactar', 'Inicio, sin tienda ni cuentas ni reservas'), ['servicios']);
  assert.deepEqual(inferModules('comprar online', 'Inicio, productos, carrito, checkout'), ['tienda']);
  assert.deepEqual(inferModules('comprar en línea', 'Inicio, tienda sin cuentas, no reservas'), ['tienda']);
});

test('texto libre comprar online pide pagos y stock; las negaciones no activan módulos', async t => {
  const root = await fixture(t);
  const answers = base({ action: 'comprar online', pages: 'Inicio, productos, carrito, checkout, sin cuentas ni reservas' });
  answers.splice(12, 0, 'por elegir', 'pendiente', 'pendiente');
  const result = await runAssistant({ root, ...io(answers), prepareOnly: true });
  assert.deepEqual(result.project.arquitectura.modulos, ['tienda']);
  assert.ok(result.project.intake.responses.pagos);
  assert.ok(result.project.intake.responses.stock);
  assert.equal(result.project.intake.responses.disponibilidad, undefined);
});

test('publicación conserva solicitud y solo un sí explícito con destino registra autorización', async t => {
  for (const [confirmation, authorized] of [['no', false], ['sí', true]]) {
    const root = await fixture(t);
    const answers = base();
    answers[12] = 'Autorizo publicar en mi dominio existente';
    answers.splice(13, 0, 'https://ejemplo.test, proyecto existente', confirmation);
    const streams = io(answers);
    const result = await runAssistant({ root, ...streams, prepareOnly: true });
    assert.equal(result.project.alcance.entrega_solicitada, 'Autorizo publicar en mi dominio existente');
    assert.equal(Boolean(result.project.alcance.publicacion_authorization), authorized);
    assert.equal(result.project.alcance.entrega_prevista, authorized ? 'publicada_verificada' : 'publicacion_solicitada_pendiente_autorizacion');
    assert.equal(result.project.calidad.publicacion_verificada, false);
    if (authorized) {
      assert.equal(result.project.alcance.publicacion_authorization.target, 'https://ejemplo.test, proyecto existente');
      assert.match(streams.text(), /Publicación autorizada expresamente/);
      assert.equal(result.project.alcance.publicacion_authorization.contract_services, false);
    }
  }
});

test('saveProject revalida el slug y rechaza proyectos enlazados fuera del kit', async t => {
  const root = await fixture(t);
  const intake = await interview({ root, ...io(base()) });
  await assert.rejects(saveProject({ root, intake: { ...intake, slug: '../fuera' } }), /carpeta|rutas/);
  const outside = await mkdtemp(join(tmpdir(), 'plan-asistente-outside-'));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await symlink(outside, join(root, 'proyectos'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(saveProject({ root, intake }), /fuera de la raíz/);
  assert.deepEqual(await readdir(outside), []);
});

test('arranque TTY solicita Sol high con argumentos separados y sin shell; stub, no CLI real', async t => {
  const root = await fixture(t);
  const streams = io(base(), { tty: true });
  let invocation;
  const result = await runAssistant({
    root, ...streams, find: async () => 'C:\\fake\\codex.exe',
    launch: args => launchCodex({ ...args, spawnImpl: (command, args, options) => {
      invocation = { command, args, options };
      const child = new EventEmitter();
      queueMicrotask(() => child.emit('exit', 0, null));
      return child;
    } }),
  });
  assert.equal(result.launched, true);
  assert.equal(invocation.command, 'C:\\fake\\codex.exe');
  assert.deepEqual(invocation.args.slice(0, 6), ['-C', resolve(root), '-m', 'gpt-6.1-sol', '-c', 'model_reasoning_effort="high"']);
  assert.deepEqual(invocation.args, codexArguments(root, 'mi-web'));
  assert.equal(invocation.options.shell, false);
  assert.equal(invocation.options.stdio, 'inherit');
  assert.equal(result.project.models.produccion.selection_verified, false);
  assert.equal(result.project.models.diseno.reasoning, 'ultra');
  assert.match(invocation.args.at(-1), /rol disenador/);
});

test('--solo-preparar omite discovery y lanzamiento incluso con TTY', async t => {
  const root = await fixture(t);
  const result = await runAssistant({ root, ...io(base(), { tty: true }), prepareOnly: true,
    find: () => assert.fail('No debe buscar Codex'), launch: () => assert.fail('No debe abrir Codex') });
  assert.equal(result.launched, false);
});

test('fallo de Codex entrega el prompt de IDE y conserva la ficha; stub sin sesión real', async t => {
  const root = await fixture(t);
  const streams = io(base(), { tty: true });
  const result = await runAssistant({ root, ...streams,
    find: async () => 'C:\\fake\\codex.exe', launch: async () => ({ code: 1, signal: null }) });
  assert.equal(result.launched, false);
  assert.equal(result.launch_result.code, 1);
  assert.equal(result.fallback_prompt, true);
  assert.match(streams.text(), /Codex terminó sin completar el inicio/);
  assert.match(streams.text(), /pega exactamente/);
  assert.match(streams.text(), /Inicia el proyecto proyectos\/mi-web/);
  assert.ok((await readdir(result.directory)).includes('proyecto.json'));
});

test('entrypoint CLI funciona con stdin en un kit temporal y --solo-preparar', async t => {
  const root = await fixture(t);
  await mkdir(join(root, 'scripts'));
  await copyFile(join(kitRoot, 'iniciar.mjs'), join(root, 'iniciar.mjs'));
  await copyFile(join(kitRoot, 'scripts', 'asistente.mjs'), join(root, 'scripts', 'asistente.mjs'));
  const output = await new Promise((resolveResult, reject) => {
    const child = spawn(process.execPath, [join(root, 'iniciar.mjs'), '--solo-preparar'], { shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
    let text = '';
    child.stdout.on('data', chunk => { text += chunk; });
    child.stderr.on('data', chunk => { text += chunk; });
    child.once('error', reject);
    child.once('exit', code => code === 0 ? resolveResult(text) : reject(new Error(`Código ${code}: ${text}`)));
    child.stdin.end(`${base().join('\n')}\n`);
  });
  assert.match(output, /Ficha guardada/);
  assert.match(output, /Preparación terminada/);
  assert.ok((await readdir(join(root, 'proyectos', 'mi-web'))).includes('META.md'));
});
